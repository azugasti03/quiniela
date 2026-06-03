import { participantes, equiposStats } from '@/data/quiniela'
import { calcularPuntosEquipo, getFlag } from '@/lib/scoring'

const BOMBOS = [
  { key: 'bombo1' as const, label: 'Potencia',    dot: 'bg-yellow-400' },
  { key: 'bombo2' as const, label: 'Competitivo', dot: 'bg-blue-400' },
  { key: 'bombo3' as const, label: 'Regular',     dot: 'bg-orange-400' },
  { key: 'bombo4' as const, label: 'Longshot',    dot: 'bg-gray-400' },
]

export default function EquiposPage() {
  const sorted = [...participantes].sort((a, b) => a.nombre.localeCompare(b.nombre))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-12 pb-5">
        <p className="text-green-600 text-xs font-bold tracking-widest uppercase text-center">⚽ Mundial 2026</p>
        <h1 className="text-2xl font-bold text-gray-900 text-center mt-1">Equipos</h1>
        <p className="text-gray-400 text-sm text-center mt-1">{participantes.length} participantes</p>
      </div>

      <div className="px-4 py-4 space-y-3">
        {sorted.map((p) => {
          const puntosTotal = BOMBOS.reduce((sum, b) => {
            const stats = equiposStats[p[b.key]]
            return sum + (stats ? calcularPuntosEquipo(stats) : 0)
          }, 0)

          return (
            <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header row */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900">{p.nombre}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    p.pagado
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-50 text-red-500'
                  }`}>
                    {p.pagado ? 'Pagado' : 'Pendiente'}
                  </span>
                </div>
                <p className="text-green-600 font-bold text-lg tabular-nums">
                  {puntosTotal} <span className="text-xs font-normal text-gray-400">pts</span>
                </p>
              </div>

              {/* Teams 2×2 grid */}
              <div className="grid grid-cols-2 divide-x divide-y divide-gray-100">
                {BOMBOS.map((b) => {
                  const equipo = p[b.key]
                  const stats = equipo ? equiposStats[equipo] : undefined
                  const pts = stats ? calcularPuntosEquipo(stats) : 0
                  return (
                    <div key={b.key} className="px-3 py-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${b.dot}`} />
                        <p className="text-xs text-gray-400 font-medium">{b.label}</p>
                      </div>
                      {equipo ? (
                        <>
                          <p className="text-gray-900 text-sm font-semibold">{getFlag(equipo)} {equipo}</p>
                          <p className="text-green-600 text-xs font-medium mt-0.5">{pts} pts</p>
                        </>
                      ) : (
                        <p className="text-gray-300 text-sm italic mt-1">Por asignar</p>
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
