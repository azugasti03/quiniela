import { fetchAllMatches, KNOCKOUT_ROUNDS, EspnMatch } from '@/lib/espn'
import { participantes } from '@/data/quiniela'
import Image from 'next/image'

export const revalidate = 120

const ROUND_ORDER = ['Round of 32', 'Round of 16', 'Quarterfinal', 'Semifinal', 'Final']
const ROUND_LABELS: Record<string, string> = {
  'Round of 32': 'Ronda de 32',
  'Round of 16': 'Octavos de Final',
  'Quarterfinal': 'Cuartos de Final',
  'Semifinal': 'Semifinal',
  'Final': 'Gran Final',
}

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

function BracketMatch({ m, isFinal = false }: { m: EspnMatch; isFinal?: boolean }) {
  const enVivo = m.statusState === 'in'
  const finalizado = m.statusState === 'post'

  const homeScore = Number(m.home.score)
  const awayScore = Number(m.away.score)
  const homeWin = finalizado && m.home.score !== null && homeScore > awayScore
  const awayWin = finalizado && m.away.score !== null && awayScore > homeScore

  function TeamRow({ side }: { side: 'home' | 'away' }) {
    const t = m[side]
    const wins = side === 'home' ? homeWin : awayWin
    const d = duenos(t.quinielaName)
    return (
      <div className={`flex items-center justify-between gap-2 px-3 py-2.5 ${
        side === 'home' ? 'border-b border-gray-100' : ''
      } ${wins ? 'bg-green-50' : ''}`}>
        <div className="flex items-center gap-2.5 min-w-0">
          {t.logo
            ? <Image src={t.logo} alt={t.name} width={26} height={26} className="shrink-0 rounded-sm" unoptimized />
            : <span className="text-base shrink-0">🏳️</span>}
          <div className="min-w-0">
            <p className={`text-sm font-semibold truncate ${wins ? 'text-green-700' : t.name ? 'text-gray-900' : 'text-gray-300'}`}>
              {t.name || 'Por definir'}
            </p>
            {d.length > 0 && <p className="text-green-600 text-xs truncate">{d.join(', ')}</p>}
          </div>
        </div>
        {(finalizado || enVivo) && (
          <span className={`text-base font-bold tabular-nums shrink-0 ${wins ? 'text-green-600' : 'text-gray-400'}`}>
            {t.score ?? '–'}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`rounded-2xl overflow-hidden border ${
      isFinal
        ? 'border-yellow-300 shadow-yellow-100 shadow-md'
        : enVivo
        ? 'border-red-200 shadow-sm'
        : 'border-gray-100 shadow-sm'
    } bg-white`}>
      {/* Date / status bar */}
      <div className={`px-3 py-1 text-xs font-medium flex items-center justify-between ${
        enVivo ? 'bg-red-50 text-red-500' :
        isFinal ? 'bg-yellow-50 text-yellow-700' :
        'bg-gray-50 text-gray-400'
      }`}>
        <span>{enVivo ? `🔴 EN VIVO · ${m.displayClock ?? ''}` : formatDate(m.date)}</span>
        {finalizado && <span className="text-gray-400">Finalizado</span>}
      </div>
      <TeamRow side="home" />
      <TeamRow side="away" />
    </div>
  )
}

export default async function BracketPage() {
  const allMatches = await fetchAllMatches()
  const knockout = allMatches.filter((m) =>
    KNOCKOUT_ROUNDS.some((r) => m.round.toLowerCase().includes(r.toLowerCase().split(' ')[0]))
  )

  const byRound: Record<string, EspnMatch[]> = {}
  for (const m of knockout) {
    const key = ROUND_ORDER.find((r) =>
      m.round.toLowerCase().includes(r.toLowerCase().split(' ')[0])
    ) ?? m.round
    if (!byRound[key]) byRound[key] = []
    byRound[key].push(m)
  }

  const hayEnVivo = knockout.some((m) => m.statusState === 'in')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-12 pb-5">
        <p className="text-green-600 text-xs font-bold tracking-widest uppercase text-center">⚽ Mundial 2026</p>
        <h1 className="text-2xl font-bold text-gray-900 text-center mt-1">Bracket</h1>
        {hayEnVivo && (
          <p className="text-center mt-2 text-red-500 text-xs font-semibold animate-pulse">🔴 Hay partidos en vivo</p>
        )}
      </div>

      <div className="px-4 py-4 space-y-8">
        {knockout.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
            <p className="text-4xl mb-3">🏆</p>
            <p className="text-gray-900 font-semibold">Fase eliminatoria</p>
            <p className="text-gray-500 text-sm mt-1.5">Los partidos aparecerán aquí a partir del 29 de junio.</p>
          </div>
        )}

        {ROUND_ORDER.map((round) => {
          const matches = byRound[round]
          if (!matches?.length) return null
          const isFinal = round === 'Final'
          const champion = isFinal && matches[0]?.statusState === 'post'
            ? (Number(matches[0].home.score) > Number(matches[0].away.score) ? matches[0].home : matches[0].away)
            : null

          return (
            <div key={round}>
              <div className="flex items-center gap-2 mb-3 px-1">
                <h2 className="text-gray-900 font-bold text-base">{ROUND_LABELS[round] ?? round}</h2>
                <span className="text-gray-400 text-sm">({matches.length})</span>
              </div>

              {isFinal ? (
                <div className="max-w-sm mx-auto space-y-4">
                  <BracketMatch m={matches[0]} isFinal />
                  {champion && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 text-center">
                      {champion.logo && (
                        <Image src={champion.logo} alt={champion.name} width={56} height={56} className="mx-auto mb-2" unoptimized />
                      )}
                      <p className="text-2xl font-bold text-gray-900">{champion.name}</p>
                      <p className="text-yellow-600 font-semibold mt-1">🏆 Campeón del Mundo</p>
                      <div className="mt-2 text-green-600 text-sm">
                        {duenos(champion.quinielaName).join(', ')}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {matches.map((m) => <BracketMatch key={m.id} m={m} />)}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
