'use client'
import { useState, useEffect } from 'react'
import { Participante, EquipoStats } from '@/lib/types'
import { calcularPuntosEquipo, getFlag } from '@/lib/scoring'
import Avatar from './Avatar'

const BOMBOS = [
  { key: 'bombo1' as const, label: 'Potencia',    dot: 'bg-yellow-400' },
  { key: 'bombo2' as const, label: 'Competitivo', dot: 'bg-blue-400' },
  { key: 'bombo3' as const, label: 'Regular',     dot: 'bg-orange-400' },
  { key: 'bombo4' as const, label: 'Longshot',    dot: 'bg-gray-400' },
]

interface Props {
  participantes: Participante[]
  equiposStats: Record<string, EquipoStats>
}

function Modal({ p, equiposStats, onClose }: { p: Participante; equiposStats: Record<string, EquipoStats>; onClose: () => void }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const puntosTotal = BOMBOS.reduce((sum, b) => {
    const stats = equiposStats[p[b.key]]
    return sum + (stats ? calcularPuntosEquipo(stats) : 0)
  }, 0)

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo header */}
        <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 pt-10 pb-6 flex flex-col items-center">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-gray-500 hover:bg-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <Avatar nombre={p.nombre} foto={p.foto} size="lg" className="ring-4 ring-white shadow-lg" />
          <h2 className="text-xl font-bold text-gray-900 mt-3">{p.nombre}</h2>
          <div className="flex items-center gap-2 mt-1.5">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              p.pagado ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-500'
            }`}>
              {p.pagado ? '✓ Pagado' : '✗ Pendiente'}
            </span>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
              {puntosTotal} pts
            </span>
          </div>
        </div>

        {/* Teams */}
        <div className="p-4 space-y-2.5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Mis equipos</p>
          {BOMBOS.map((b) => {
            const equipo = p[b.key]
            const stats = equipo ? equiposStats[equipo] : undefined
            const pts = stats ? calcularPuntosEquipo(stats) : 0
            const avanzado = stats?.clasifico || stats?.cuartos || stats?.semis || stats?.final || stats?.campeon

            return (
              <div key={b.key} className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${b.dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 font-medium">{b.label}</p>
                  {equipo ? (
                    <p className="text-gray-900 font-semibold text-sm mt-0.5">{getFlag(equipo)} {equipo}</p>
                  ) : (
                    <p className="text-gray-300 text-sm italic mt-0.5">Por asignar</p>
                  )}
                </div>
                {equipo && (
                  <div className="text-right shrink-0">
                    <p className="text-green-600 font-bold text-sm">{pts} pts</p>
                    {avanzado && (
                      <p className="text-xs text-gray-400">
                        {stats?.campeon ? '🏆' : stats?.final ? 'Final' : stats?.semis ? 'Semis' : stats?.cuartos ? 'Cuartos' : 'Clasificó'}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Scoring breakdown */}
        {puntosTotal > 0 && (
          <div className="px-4 pb-5">
            <div className="bg-green-50 rounded-2xl px-4 py-3 flex items-center justify-between">
              <p className="text-green-700 font-medium text-sm">Total acumulado</p>
              <p className="text-green-700 font-bold text-xl">{puntosTotal} pts</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function EquiposGrid({ participantes, equiposStats }: Props) {
  const [selected, setSelected] = useState<Participante | null>(null)

  const sorted = [...participantes].sort((a, b) => a.nombre.localeCompare(b.nombre))

  return (
    <>
      <div className="space-y-3">
        {sorted.map((p) => {
          const puntosTotal = BOMBOS.reduce((sum, b) => {
            const stats = equiposStats[p[b.key]]
            return sum + (stats ? calcularPuntosEquipo(stats) : 0)
          }, 0)

          return (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className="w-full text-left bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden active:scale-[0.99] transition-transform"
            >
              {/* Header row */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                <Avatar nombre={p.nombre} foto={p.foto} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{p.nombre}</p>
                  <span className={`text-xs font-medium ${p.pagado ? 'text-green-600' : 'text-red-400'}`}>
                    {p.pagado ? 'Pagado' : 'Pendiente'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 shrink-0">
                  <p className="text-green-600 font-bold tabular-nums">{puntosTotal}</p>
                  <span className="text-xs text-gray-400">pts</span>
                  <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Teams 2×2 */}
              <div className="grid grid-cols-2 divide-x divide-y divide-gray-100">
                {BOMBOS.map((b) => {
                  const equipo = p[b.key]
                  return (
                    <div key={b.key} className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${b.dot}`} />
                        <p className="text-xs text-gray-400">{b.label}</p>
                      </div>
                      {equipo
                        ? <p className="text-gray-800 text-sm font-medium">{getFlag(equipo)} {equipo}</p>
                        : <p className="text-gray-300 text-sm italic">Por asignar</p>
                      }
                    </div>
                  )
                })}
              </div>
            </button>
          )
        })}
      </div>

      {selected && (
        <Modal p={selected} equiposStats={equiposStats} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
