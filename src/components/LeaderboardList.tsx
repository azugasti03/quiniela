'use client'
import { useState } from 'react'
import { Participante, EquipoStats } from '@/lib/types'
import { calcularLeaderboard } from '@/lib/scoring'
import TeamFlag from './TeamFlag'
import Avatar from './Avatar'
import ParticipanteModal from './ParticipanteModal'

const MEDALS = ['🥇', '🥈', '🥉']
const TOP3_BORDER = ['border-l-4 border-yellow-400', 'border-l-4 border-gray-400', 'border-l-4 border-amber-600']

interface Props {
  participantes: Participante[]
  equiposStats: Record<string, EquipoStats>
}

export default function LeaderboardList({ participantes, equiposStats }: Props) {
  const [selected, setSelected] = useState<Participante | null>(null)
  const leaderboard = calcularLeaderboard(participantes, equiposStats)
  const maxPuntos = leaderboard[0]?.puntos ?? 0

  return (
    <>
      <div className="space-y-2.5">
        {leaderboard.map((p, i) => {
          const teams = [p.bombo1, p.bombo2, p.bombo3, p.bombo4].filter(Boolean)
          const barPct = maxPuntos > 0 ? (p.puntos / maxPuntos) * 100 : 0
          const isTop3 = i < 3

          return (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className={`w-full text-left bg-white rounded-2xl shadow-sm overflow-hidden active:scale-[0.99] transition-transform ${
                isTop3 ? TOP3_BORDER[i] : 'border border-gray-100'
              }`}
            >
              <div className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl w-7 text-center shrink-0">
                    {i < 3 ? MEDALS[i] : <span className="text-sm font-bold text-gray-400">{i + 1}</span>}
                  </span>

                  <Avatar nombre={p.nombre} foto={p.foto} fotoPosition={p.fotoPosition} size="sm" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="font-semibold text-gray-900 truncate">{p.nombre}</p>
                      <p className={`text-xl font-bold tabular-nums ml-2 ${i === 0 && p.puntos > 0 ? 'text-yellow-500' : 'text-green-600'}`}>
                        {p.puntos}
                        <span className="text-xs font-normal text-gray-400 ml-1">pts</span>
                      </p>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${i === 0 && p.puntos > 0 ? 'bg-yellow-400' : 'bg-green-500'}`}
                        style={{ width: `${barPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {teams.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 ml-[88px]">
                    {teams.map((t) => (
                      <span key={t} className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 rounded-full px-2.5 py-1">
                        <TeamFlag team={t} /> {t}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 mt-2 ml-[88px] italic">Equipos por asignar</p>
                )}
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
