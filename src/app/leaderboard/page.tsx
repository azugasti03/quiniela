import { participantes, equiposStats } from '@/data/quiniela'
import { calcularLeaderboard, getFlag } from '@/lib/scoring'

const MEDAL = ['🥇', '🥈', '🥉']

export default function LeaderboardPage() {
  const leaderboard = calcularLeaderboard(participantes, equiposStats)
  const maxPuntos = leaderboard[0]?.puntos ?? 0

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="bg-gradient-to-b from-green-900 to-slate-900 px-4 pt-10 pb-6">
        <p className="text-green-400 text-sm font-semibold tracking-widest uppercase text-center">Mundial 2026</p>
        <h1 className="text-2xl font-bold text-white text-center mt-1">Posiciones</h1>
      </div>

      <div className="px-4 pb-4 space-y-3 mt-2">
        {leaderboard.map((p, i) => {
          const teams = [p.bombo1, p.bombo2, p.bombo3, p.bombo4].filter(Boolean)
          const barPct = maxPuntos > 0 ? (p.puntos / maxPuntos) * 100 : 0
          const isLeader = i === 0 && p.puntos > 0

          return (
            <div
              key={p.id}
              className={`rounded-xl p-4 border ${
                isLeader
                  ? 'bg-gradient-to-r from-yellow-900/40 to-slate-800 border-yellow-600/50'
                  : 'bg-slate-800 border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl w-7 text-center shrink-0">
                  {i < 3 ? MEDAL[i] : <span className="text-slate-500 font-bold text-base">{i + 1}</span>}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-white truncate">{p.nombre}</p>
                    <p className={`text-xl font-bold tabular-nums ${isLeader ? 'text-yellow-400' : 'text-green-400'}`}>
                      {p.puntos}
                      <span className="text-xs font-normal text-slate-500 ml-1">pts</span>
                    </p>
                  </div>

                  {maxPuntos > 0 && (
                    <div className="h-1.5 bg-slate-700 rounded-full mt-2 mb-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isLeader ? 'bg-yellow-400' : 'bg-green-500'}`}
                        style={{ width: `${barPct}%` }}
                      />
                    </div>
                  )}

                  {teams.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {teams.map((t) => (
                        <span key={t} className="text-xs bg-slate-700 text-slate-300 rounded-md px-2 py-0.5">
                          {getFlag(t)} {t}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 mt-1">Equipos por asignar</p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
