import { fetchAllMatches, groupMatchesByRound, KNOCKOUT_ROUNDS, EspnMatch } from '@/lib/espn'
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
  const h = d.getUTCHours().toString().padStart(2, '0')
  const m = d.getUTCMinutes().toString().padStart(2, '0')
  return `${h}:${m} UTC`
}

function MatchCard({ m }: { m: EspnMatch }) {
  const enVivo = m.statusState === 'in'
  const finalizado = m.statusState === 'post'
  const dLocal = duenos(m.home.quinielaName)
  const dVisit = duenos(m.away.quinielaName)

  return (
    <div className={`rounded-xl border p-4 ${enVivo ? 'bg-red-950/30 border-red-800/50' : 'bg-slate-800 border-slate-700'}`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${enVivo ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-700 text-slate-400'}`}>
          {enVivo ? `🔴 ${m.displayClock ?? 'EN VIVO'}` : finalizado ? 'Finalizado' : formatTime(m.date)}
        </span>
        <span className="text-xs text-slate-500">
          {m.group ? `${m.group}` : m.round}
          {m.venue ? ` · ${m.venue.split(',')[0]}` : ''}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 text-center">
          {m.home.logo
            ? <Image src={m.home.logo} alt={m.home.name} width={48} height={48} className="mx-auto" unoptimized />
            : <p className="text-3xl">🏳️</p>}
          <p className="text-white font-semibold text-sm leading-tight mt-1">{m.home.name}</p>
          {dLocal.length > 0 && <p className="text-green-400 text-xs mt-0.5">{dLocal.join(', ')}</p>}
        </div>

        <div className="text-center px-3 shrink-0">
          {finalizado || enVivo ? (
            <p className="text-white font-bold text-2xl tabular-nums">
              {m.home.score ?? '–'} <span className="text-slate-500 text-lg">·</span> {m.away.score ?? '–'}
            </p>
          ) : (
            <p className="text-slate-500 font-bold text-xl">vs</p>
          )}
        </div>

        <div className="flex-1 text-center">
          {m.away.logo
            ? <Image src={m.away.logo} alt={m.away.name} width={48} height={48} className="mx-auto" unoptimized />
            : <p className="text-3xl">🏳️</p>}
          <p className="text-white font-semibold text-sm leading-tight mt-1">{m.away.name}</p>
          {dVisit.length > 0 && <p className="text-green-400 text-xs mt-0.5">{dVisit.join(', ')}</p>}
        </div>
      </div>
    </div>
  )
}

export default async function PartidosPage() {
  const matches = await fetchAllMatches()
  const groupStage = matches.filter((m) => !KNOCKOUT_ROUNDS.some((r) => m.round.includes(r.split(' ')[0])))
  const byRound = groupMatchesByRound(groupStage)

  const hayEnVivo = matches.some((m) => m.statusState === 'in')

  // Group stage: group by date within each group
  const byGroup: Record<string, EspnMatch[]> = {}
  for (const m of groupStage) {
    const key = m.group ?? 'Otros'
    if (!byGroup[key]) byGroup[key] = []
    byGroup[key].push(m)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="bg-gradient-to-b from-green-900 to-slate-900 px-4 pt-10 pb-6">
        <p className="text-green-400 text-sm font-semibold tracking-widest uppercase text-center">Mundial 2026</p>
        <h1 className="text-2xl font-bold text-white text-center mt-1">Partidos</h1>
        {hayEnVivo && (
          <p className="text-center mt-2 text-red-400 text-sm font-semibold animate-pulse">🔴 Hay partidos en vivo</p>
        )}
        <p className="text-center text-slate-500 text-xs mt-1">Actualiza cada 2 min automáticamente</p>
      </div>

      <div className="px-4 pb-4 space-y-6">
        {matches.length === 0 && (
          <div className="rounded-xl bg-slate-800 border border-slate-700 p-8 text-center mt-4">
            <p className="text-3xl mb-3">⚽</p>
            <p className="text-slate-400 text-sm">Cargando partidos desde ESPN...</p>
          </div>
        )}

        {Object.entries(byGroup)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([group, ms]) => {
            // Group matches by date
            const byDate: Record<string, EspnMatch[]> = {}
            for (const m of ms) {
              const d = formatDate(m.date)
              if (!byDate[d]) byDate[d] = []
              byDate[d].push(m)
            }
            return (
              <div key={group}>
                <p className="text-green-400 text-sm font-bold mb-3 px-1 uppercase tracking-wide">{group}</p>
                <div className="space-y-4">
                  {Object.entries(byDate).map(([date, dms]) => (
                    <div key={date}>
                      <p className="text-slate-500 text-xs mb-2 px-1">{date}</p>
                      <div className="space-y-3">
                        {dms.map((m) => <MatchCard key={m.id} m={m} />)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
