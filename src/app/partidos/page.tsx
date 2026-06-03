import { fetchAllMatches, KNOCKOUT_ROUNDS, EspnMatch } from '@/lib/espn'
import { participantes } from '@/data/quiniela'
import Image from 'next/image'

export const revalidate = 120

function duenos(quinielaName: string) {
  return participantes
    .filter((p) => [p.bombo1, p.bombo2, p.bombo3, p.bombo4].includes(quinielaName))
    .map((p) => p.nombre)
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]}`
}

function formatTime(iso: string) {
  const d = new Date(iso)
  return `${d.getUTCHours().toString().padStart(2,'0')}:${d.getUTCMinutes().toString().padStart(2,'0')} UTC`
}

function TeamBlock({ team, align }: { team: EspnMatch['home']; align: 'left' | 'right' }) {
  const d = duenos(team.quinielaName)
  const isRight = align === 'right'
  return (
    <div className={`flex-1 flex flex-col items-center text-center`}>
      {team.logo
        ? <Image src={team.logo} alt={team.name} width={44} height={44} className="mx-auto" unoptimized />
        : <span className="text-3xl">🏳️</span>}
      <p className="text-gray-900 font-semibold text-sm leading-tight mt-1.5">{team.name}</p>
      {d.length > 0 && (
        <p className="text-green-600 text-xs font-medium mt-0.5">{d.join(', ')}</p>
      )}
    </div>
  )
}

function MatchCard({ m }: { m: EspnMatch }) {
  const enVivo = m.statusState === 'in'
  const finalizado = m.statusState === 'post'

  return (
    <div className={`bg-white rounded-2xl border overflow-hidden ${
      enVivo ? 'border-red-200 shadow-red-100 shadow-sm' : 'border-gray-100 shadow-sm'
    }`}>
      {/* Top bar */}
      <div className={`flex items-center justify-between px-3 py-1.5 text-xs ${
        enVivo ? 'bg-red-50' : 'bg-gray-50'
      }`}>
        <span className={`font-semibold ${enVivo ? 'text-red-500' : 'text-gray-400'}`}>
          {enVivo ? `🔴 EN VIVO ${m.displayClock ?? ''}` : finalizado ? 'Finalizado' : formatTime(m.date)}
        </span>
        <span className="text-gray-400">{m.venue?.split(',')[0] ?? ''}</span>
      </div>

      {/* Match body */}
      <div className="flex items-center gap-2 px-4 py-4">
        <TeamBlock team={m.home} align="left" />

        <div className="shrink-0 text-center px-2">
          {finalizado || enVivo ? (
            <p className="text-gray-900 font-bold text-2xl tabular-nums">
              {m.home.score ?? '–'}<span className="text-gray-300 mx-1">:</span>{m.away.score ?? '–'}
            </p>
          ) : (
            <p className="text-gray-300 font-bold text-xl">vs</p>
          )}
        </div>

        <TeamBlock team={m.away} align="right" />
      </div>
    </div>
  )
}

export default async function PartidosPage() {
  const matches = await fetchAllMatches()
  const groupStage = matches.filter(
    (m) => !KNOCKOUT_ROUNDS.some((r) => m.round.toLowerCase().includes(r.toLowerCase().split(' ')[0]))
  )
  const hayEnVivo = matches.some((m) => m.statusState === 'in')

  // Group by group name, then by date within each group
  const byGroup: Record<string, Record<string, EspnMatch[]>> = {}
  for (const m of groupStage) {
    const grp = m.group ?? 'Otros'
    const day = formatDate(m.date)
    if (!byGroup[grp]) byGroup[grp] = {}
    if (!byGroup[grp][day]) byGroup[grp][day] = []
    byGroup[grp][day].push(m)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-12 pb-5">
        <p className="text-green-600 text-xs font-bold tracking-widest uppercase text-center">⚽ Mundial 2026</p>
        <h1 className="text-2xl font-bold text-gray-900 text-center mt-1">Partidos</h1>
        {hayEnVivo
          ? <p className="text-center mt-2 text-red-500 text-xs font-semibold">🔴 Hay partidos en vivo</p>
          : <p className="text-center mt-2 text-gray-400 text-xs">Se actualiza cada 2 min automáticamente</p>
        }
      </div>

      <div className="px-4 py-4 space-y-6">
        {matches.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center shadow-sm">
            <p className="text-3xl mb-3">⚽</p>
            <p className="text-gray-500 text-sm">Cargando partidos desde ESPN…</p>
          </div>
        )}

        {Object.entries(byGroup)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([group, byDate]) => (
            <div key={group}>
              <p className="text-green-700 text-xs font-bold uppercase tracking-widest mb-3 px-1">{group}</p>
              <div className="space-y-4">
                {Object.entries(byDate).map(([date, ms]) => (
                  <div key={date}>
                    <p className="text-gray-400 text-xs mb-2 px-1">{date}</p>
                    <div className="space-y-2.5">
                      {ms.map((m) => <MatchCard key={m.id} m={m} />)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
