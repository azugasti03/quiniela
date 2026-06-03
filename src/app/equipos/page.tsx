import { participantes, equiposStats } from '@/data/quiniela'
import { fetchAllMatches, derivarEquiposStats } from '@/lib/espn'
import EquiposGrid from '@/components/EquiposGrid'

export default async function EquiposPage() {
  const matches = await fetchAllMatches()
  const liveStats = derivarEquiposStats(matches)
  const mergedStats = { ...equiposStats, ...liveStats }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-4 pt-12 pb-5">
        <p className="text-green-600 text-xs font-bold tracking-widest uppercase text-center">⚽ Mundial 2026</p>
        <h1 className="text-2xl font-bold text-gray-900 text-center mt-1">Equipos</h1>
        <p className="text-gray-400 text-sm text-center mt-1">{participantes.length} participantes · Toca una tarjeta para ver detalle</p>
      </div>

      <div className="px-4 py-4">
        <EquiposGrid participantes={participantes} equiposStats={mergedStats} />
      </div>
    </div>
  )
}
