'use client'

import { useState, useTransition } from 'react'
import { togglePago, verifyPin } from './actions'
import { Participante } from '@/lib/types'

interface Props {
  participantes: Participante[]
}

export default function AdminPagos({ participantes }: Props) {
  const [pin, setPin] = useState('')
  const [authed, setAuthed] = useState(false)
  const [pinError, setPinError] = useState(false)
  const [pagados, setPagados] = useState<Record<string, boolean>>(
    Object.fromEntries(participantes.map((p) => [p.nombre, p.pagado]))
  )
  const [isPending, startTransition] = useTransition()
  const [loadingNombre, setLoadingNombre] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handlePinSubmit(e: React.FormEvent) {
    e.preventDefault()
    const ok = await verifyPin(pin)
    if (ok) {
      setAuthed(true)
      setPinError(false)
    } else {
      setPinError(true)
    }
  }

  function handleToggle(nombre: string) {
    const newPagado = !pagados[nombre]
    setLoadingNombre(nombre)
    setError(null)
    setSuccess(null)
    startTransition(async () => {
      try {
        await togglePago(nombre, newPagado, pin)
        setPagados((prev) => ({ ...prev, [nombre]: newPagado }))
        setSuccess(`${nombre} ${newPagado ? 'marcado como pagado' : 'desmarcado'} · Vercel despliega en ~30s`)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoadingNombre(null)
      }
    })
  }

  if (!authed) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="bg-slate-800 rounded-2xl p-6 w-full border border-slate-700">
          <p className="text-white font-semibold text-base mb-1">Gestionar pagos</p>
          <p className="text-slate-400 text-sm mb-5">Ingresa tu PIN de administrador</p>
          <form onSubmit={handlePinSubmit} className="space-y-3">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="PIN"
              className="w-full bg-slate-700 text-white rounded-xl px-4 py-3 text-sm border border-slate-600 focus:outline-none focus:border-green-500"
              autoFocus
            />
            {pinError && <p className="text-red-400 text-xs">PIN incorrecto</p>}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl py-3 text-sm transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    )
  }

  const pagadosCount = Object.values(pagados).filter(Boolean).length

  return (
    <div className="rounded-xl bg-slate-800 border border-slate-700 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-white font-semibold">Gestionar pagos</p>
        <span className="text-green-400 text-sm font-medium">{pagadosCount}/{participantes.length} pagaron</span>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-800 rounded-xl px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-900/30 border border-green-800 rounded-xl px-4 py-3 text-green-400 text-sm">
          {success}
        </div>
      )}

      <div className="space-y-1.5">
        {participantes.map((p) => {
          const isPagado = pagados[p.nombre]
          const isLoading = loadingNombre === p.nombre && isPending
          return (
            <div key={p.id} className="flex items-center justify-between bg-slate-700/50 rounded-xl px-4 py-3">
              <span className="text-white text-sm font-medium">{p.nombre}</span>
              <button
                onClick={() => handleToggle(p.nombre)}
                disabled={isPending}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer ${
                  isPagado
                    ? 'bg-green-500/20 text-green-400 hover:bg-red-500/20 hover:text-red-400'
                    : 'bg-red-500/20 text-red-400 hover:bg-green-500/20 hover:text-green-400'
                }`}
              >
                {isLoading ? '···' : isPagado ? '✓ Pagado' : '✗ Pendiente'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
