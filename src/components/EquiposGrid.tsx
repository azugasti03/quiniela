'use client'
import { useState } from 'react'
import { Participante, EquipoStats } from '@/lib/types'
import { calcularPuntosEquipo, getFlag } from '@/lib/scoring'
import Avatar from './Avatar'
import ParticipanteModal from './ParticipanteModal'

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
                <Avatar nombre={p.nombre} foto={p.foto} fotoPosition={p.fotoPosition} size="sm" />
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
        <ParticipanteModal p={selected} equiposStats={equiposStats} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
