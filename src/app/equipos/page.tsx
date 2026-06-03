import { participantes, equiposStats } from '@/data/quiniela'
import { calcularPuntosEquipo, getFlag } from '@/lib/scoring'

const BOMBOS = [
  { key: 'bombo1' as const, label: 'Potencia',     color: 'text-yellow-400', bg: 'bg-yellow-900/30' },
  { key: 'bombo2' as const, label: 'Competitivo',  color: 'text-blue-400',   bg: 'bg-blue-900/30' },
  { key: 'bombo3' as const, label: 'Regular',      color: 'text-orange-400', bg: 'bg-orange-900/30' },
  { key: 'bombo4' as const, label: 'Longshot',     color: 'text-slate-400',  bg: 'bg-slate-700/50' },
]

export default function EquiposPage() {
  const sorted = [...participantes].sort((a, b) => a.nombre.localeCompare(b.nombre))

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="bg-gradient-to-b from-green-900 to-slate-900 px-4 pt-10 pb-6">
        <p className="text-green-400 text-sm font-semibold tracking-widest uppercase text-center">Mundial 2026</p>
        <h1 className="text-2xl font-bold text-white text-center mt-1">Equipos</h1>
        <p className="text-slate-400 text-sm text-center mt-1">{participantes.length} participantes</p>
      </div>

      <div className="px-4 pb-4 space-y-4">
        {sorted.map((p) => {
          const puntosTotal = BOMBOS.reduce((sum, b) => {
            const stats = equiposStats[p[b.key]]
            return sum + (stats ? calcularPuntosEquipo(stats) : 0)
          }, 0)

          return (
            <div key={p.id} className="rounded-xl bg-slate-800 border border-slate-700 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-white">{p.nombre}</p>
                  {p.pagado ? (
                    <span className="text-xs bg-green-900/50 text-green-400 border border-green-800 rounded-full px-2 py-0.5">
                      Pagado
                    </span>
                  ) : (
                    <span className="text-xs bg-red-900/50 text-red-400 border border-red-800 rounded-full px-2 py-0.5">
                      Pendiente
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-bold text-lg tabular-nums">{puntosTotal}</p>
                  <p className="text-slate-500 text-xs">pts</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-slate-700">
                {BOMBOS.map((b) => {
                  const equipo = p[b.key]
                  const stats = equipo ? equiposStats[equipo] : undefined
                  const pts = stats ? calcularPuntosEquipo(stats) : 0
                  return (
                    <div key={b.key} className={`${b.bg} p-3`}>
                      <p className={`text-xs font-semibold uppercase tracking-wide ${b.color}`}>{b.label}</p>
                      {equipo ? (
                        <>
                          <p className="text-white text-sm font-medium mt-0.5">{getFlag(equipo)} {equipo}</p>
                          <p className="text-slate-400 text-xs mt-0.5">{pts} pts</p>
                        </>
                      ) : (
                        <p className="text-slate-500 text-sm mt-0.5 italic">Por asignar</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
