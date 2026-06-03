import { partidos, participantes } from '@/data/quiniela'
import { getFlag } from '@/lib/scoring'
import { Fase } from '@/lib/types'

function formatDate(fecha: string) {
  if (!fecha) return ''
  const [y, m, d] = fecha.split('-')
  const months = ['', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  return `${parseInt(d)} ${months[parseInt(m)]}`
}

function duenos(equipo: string) {
  return participantes
    .filter((p) => [p.bombo1, p.bombo2, p.bombo3, p.bombo4].includes(equipo))
    .map((p) => p.nombre)
}

export default function PartidosPage() {
  const sorted = [...partidos].sort((a, b) =>
    a.fecha !== b.fecha ? a.fecha.localeCompare(b.fecha) : a.hora.localeCompare(b.hora)
  )

  const byDate: Record<string, typeof sorted> = {}
  sorted.forEach((p) => {
    if (!byDate[p.fecha]) byDate[p.fecha] = []
    byDate[p.fecha].push(p)
  })

  const FASES: Fase[] = ['Grupos', 'Octavos', 'Cuartos', 'Semifinal', 'Final']
  const hayEnVivo = partidos.some((p) => p.status === 'en_vivo')

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="bg-gradient-to-b from-green-900 to-slate-900 px-4 pt-10 pb-6">
        <p className="text-green-400 text-sm font-semibold tracking-widest uppercase text-center">Mundial 2026</p>
        <h1 className="text-2xl font-bold text-white text-center mt-1">Partidos</h1>
        {hayEnVivo && (
          <p className="text-center mt-2 text-red-400 text-sm font-semibold animate-pulse">🔴 Hay partidos en vivo</p>
        )}
      </div>

      <div className="px-4 pb-4 space-y-6">
        {Object.keys(byDate).length === 0 && (
          <div className="rounded-xl bg-slate-800 border border-slate-700 p-8 text-center mt-4">
            <p className="text-3xl mb-3">⚽</p>
            <p className="text-slate-400 text-sm">Los partidos aparecerán aquí.</p>
            <p className="text-slate-500 text-xs mt-1">El admin los agrega en <code className="text-green-400">src/data/quiniela.ts</code></p>
          </div>
        )}

        {Object.entries(byDate).map(([fecha, ps]) => (
          <div key={fecha}>
            <p className="text-slate-400 text-sm font-semibold mb-3 px-1">{formatDate(fecha)}</p>
            <div className="space-y-3">
              {ps.map((partido) => {
                const enVivo = partido.status === 'en_vivo'
                const finalizado = partido.status === 'finalizado'
                const dLocal = duenos(partido.equipoLocal)
                const dVisitante = duenos(partido.equipoVisitante)

                return (
                  <div
                    key={partido.id}
                    className={`rounded-xl border p-4 ${
                      enVivo ? 'bg-red-950/30 border-red-800/50' : 'bg-slate-800 border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        enVivo ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-400'
                      }`}>
                        {enVivo ? '🔴 EN VIVO' : finalizado ? 'Finalizado' : partido.hora}
                      </span>
                      <span className="text-xs text-slate-500">
                        {partido.fase}{partido.grupo ? ` · Grupo ${partido.grupo}` : ''}
                        {!enVivo && finalizado === false && ` · ${partido.hora}`}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 text-center">
                        <p className="text-2xl">{getFlag(partido.equipoLocal)}</p>
                        <p className="text-white font-semibold text-sm leading-tight mt-0.5">{partido.equipoLocal}</p>
                        {dLocal.length > 0 && (
                          <p className="text-green-400 text-xs mt-0.5">{dLocal.join(', ')}</p>
                        )}
                      </div>

                      <div className="text-center px-3 shrink-0">
                        {finalizado || enVivo ? (
                          <p className="text-white font-bold text-2xl tabular-nums">
                            {partido.golesLocal ?? '–'} <span className="text-slate-500">·</span> {partido.golesVisitante ?? '–'}
                          </p>
                        ) : (
                          <p className="text-slate-500 font-bold text-xl">vs</p>
                        )}
                      </div>

                      <div className="flex-1 text-center">
                        <p className="text-2xl">{getFlag(partido.equipoVisitante)}</p>
                        <p className="text-white font-semibold text-sm leading-tight mt-0.5">{partido.equipoVisitante}</p>
                        {dVisitante.length > 0 && (
                          <p className="text-green-400 text-xs mt-0.5">{dVisitante.join(', ')}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
