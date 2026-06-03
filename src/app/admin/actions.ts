'use server'

const GITHUB_OWNER = 'azugaste03'
const GITHUB_REPO = 'quiniela'
const FILE_PATH = 'src/data/quiniela.ts'

export async function verifyPin(pin: string): Promise<boolean> {
  return !!process.env.ADMIN_PIN && pin === process.env.ADMIN_PIN
}

export async function togglePago(
  nombre: string,
  newPagado: boolean,
  pin: string
): Promise<{ error?: string }> {
  try {
    if (!process.env.ADMIN_PIN || pin !== process.env.ADMIN_PIN) {
      return { error: 'PIN incorrecto' }
    }

    const token = process.env.GITHUB_TOKEN
    if (!token) return { error: 'GITHUB_TOKEN no configurado en variables de entorno' }

    const getRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
        cache: 'no-store',
      }
    )
    if (!getRes.ok) return { error: 'No se pudo leer el archivo en GitHub' }
    const fileData = await getRes.json()
    const currentContent = Buffer.from(fileData.content.replace(/\n/g, ''), 'base64').toString('utf-8')

    const escapedNombre = nombre.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(nombre: '${escapedNombre}',\\s+pagado:) (true|false)`)
    if (!regex.test(currentContent)) return { error: `No se encontró a ${nombre} en el archivo` }

    const newContent = currentContent.replace(regex, `$1 ${newPagado}`)

    const putRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `${newPagado ? 'Pago registrado' : 'Pago revertido'}: ${nombre}`,
          content: Buffer.from(newContent, 'utf-8').toString('base64'),
          sha: fileData.sha,
        }),
      }
    )
    if (!putRes.ok) return { error: 'No se pudo guardar el cambio en GitHub' }

    return {}
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Error inesperado' }
  }
}
