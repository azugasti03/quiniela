import { participantes, equiposStats } from '@/data/quiniela'
import { calcularLeaderboard, getFlag } from '@/lib/scoring'

const MEDALS = ['🥇', '🥈', '🥉']
const POSITION_STYLE = [
  'border-l-4 border-yellow-400',
  'border-l-4 border-gray-400',
  'border-l-4 border-amber-600',
]

export default function LeaderboardPage() {
  const leaderboard = calcularLeaderboard(participantes, equiposStats)
  const maxPuntos = leaderboard[0]?.puntos ?? 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-12 pb-5">
        <p className="text-green-600 text-xs font-bold tracking-widest uppercase text-center">⚽ Mundial 2026</p>
        <h1 className="text-2xl font-bold text-gray-900 text-center mt-1">Posiciones</h1>
      </div>

      <div className="px-4 py-4 space-y-2.5">
        {leaderboard.map((p, i) => {
          const teams = [p.bombo1, p.bombo2, p.bombo3, p.bombo4].filter(Boolean)
          const barPct = maxPuntos > 0 ? (p.puntos / maxPuntos) * 100 : 0
          const isTop3 = i < 3

          return (
            <div
              key={p.id}
              className={`bg-white rounded-2xl shadow-sm overflow-hidden ${isTop3 ? POSITION_STYLE[i] : 'border border-gray-100'}`}
            >
              <div className="px-4 py-3">
                <div className="flex items-center gap-3">
                  {/* Position */}
                  <span className="text-xl w-7 text-center shrink-0">
                    {i < 3
                      ? MEDALS[i]
                      : <span className="text-sm font-bold text-gray-400">{i + 1}</span>
                    }
                  </span>

                  {/* Name + bar */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="font-semibold text-gray-900 truncate">{p.nombre}</p>
                      <p className={`text-xl font-bold tabular-nums ml-2 ${i === 0 && p.puntos > 0 ? 'text-yellow-500' : 'text-green-600'}`}>
                        {p.puntos}
                        <span className="text-xs font-normal text-gray-400 ml-1">pts</span>
                      </p>
                    </div>

                    {/* Bar */}
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${i === 0 && p.puntos > 0 ? 'bg-yellow-400' : 'bg-green-500'}`}
                        style={{ width: `${barPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Teams */}
                {teams.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 ml-10">
                    {teams.map((t) => (
                      <span key={t} className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 rounded-full px-2.5 py-1">
                        {getFlag(t)} {t}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 mt-2 ml-10 italic">Equipos por asignar</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
