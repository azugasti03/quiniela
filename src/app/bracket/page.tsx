import { fetchAllMatches, KNOCKOUT_ROUNDS, EspnMatch } from '@/lib/espn'
import { participantes } from '@/data/quiniela'
import Image from 'next/image'

export const revalidate = 120

const ROUND_ORDER = ['Round of 32', 'Round of 16', 'Quarterfinal', 'Semifinal', 'Final']
const ROUND_LABELS: Record<string, string> = {
  'Round of 32': 'Ronda de 32',
  'Round of 16': 'Octavos',
  'Quarterfinal': 'Cuartos de Final',
  'Semifinal': 'Semifinal',
  'Final': 'Final',
}
const ROUND_EMOJI: Record<string, string> = {
  'Round of 32': '🏅',
  'Round of 16': '⚔️',
  'Quarterfinal': '🔥',
  'Semifinal': '💥',
  'Final': '🏆',
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
  const showScore = enVivo || finalizado

  const homeWin = finalizado && m.home.score !== null && m.away.score !== null
    && Number(m.home.score) > Number(m.away.score)
  const awayWin = finalizado && !homeWin && m.home.score !== null

  function Team({ side }: { side: 'home' | 'away' }) {
    const t = m[side]
    const wins = side === 'home' ? homeWin : awayWin
    const d = duenos(t.quinielaName)
    return (
      <div className={`flex items-center justify-between gap-2 px-3 py-2 ${
        wins ? 'bg-green-900/30' : ''
      } ${side === 'home' ? 'border-b border-slate-700' : ''}`}>
        <div className="flex items-center gap-2 min-w-0">
          {t.logo
            ? <Image src={t.logo} alt={t.name} width={28} height={28} className="shrink-0 rounded-sm" unoptimized />
            : <span className="text-base shrink-0">🏳️</span>}
          <div className="min-w-0">
            <p className={`text-sm font-semibold truncate ${wins ? 'text-green-400' : 'text-white'}`}>
              {t.name || 'Por definir'}
            </p>
            {d.length > 0 && (
              <p className="text-green-400 text-xs truncate">{d.join(', ')}</p>
            )}
          </div>
        </div>
        {showScore && (
          <span className={`text-lg font-bold tabular-nums shrink-0 ${wins ? 'text-green-400' : 'text-slate-400'}`}>
            {t.score ?? '–'}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`rounded-xl overflow-hidden border ${
      isFinal
        ? 'border-yellow-600/60 bg-gradient-to-br from-yellow-900/30 to-slate-800'
        : enVivo
        ? 'border-red-700/60 bg-red-950/20'
        : 'border-slate-700 bg-slate-800'
    }`}>
      {(enVivo || !finalizado) && (
        <div className={`px-3 py-1 text-xs ${enVivo ? 'bg-red-900/60 text-red-300 animate-pulse' : 'bg-slate-700/60 text-slate-400'}`}>
          {enVivo ? `🔴 EN VIVO · ${m.displayClock ?? ''}` : `${formatDate(m.date)}`}
        </div>
      )}
      <Team side="home" />
      <Team side="away" />
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
    const roundKey = ROUND_ORDER.find((r) => m.round.toLowerCase().includes(r.toLowerCase().split(' ')[0])) ?? m.round
    if (!byRound[roundKey]) byRound[roundKey] = []
    byRound[roundKey].push(m)
  }

  const hayEnVivo = knockout.some((m) => m.statusState === 'in')

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="bg-gradient-to-b from-green-900 to-slate-900 px-4 pt-10 pb-6">
        <p className="text-green-400 text-sm font-semibold tracking-widest uppercase text-center">Mundial 2026</p>
        <h1 className="text-2xl font-bold text-white text-center mt-1">Bracket</h1>
        {hayEnVivo && (
          <p className="text-center mt-2 text-red-400 text-sm font-semibold animate-pulse">🔴 Hay partidos en vivo</p>
        )}
      </div>

      <div className="px-4 pb-4 space-y-8">
        {knockout.length === 0 && (
          <div className="rounded-xl bg-slate-800 border border-slate-700 p-8 text-center mt-4">
            <p className="text-4xl mb-3">🏆</p>
            <p className="text-white font-semibold">Fase eliminatoria</p>
            <p className="text-slate-400 text-sm mt-2">Los partidos aparecerán aquí cuando comience la fase de eliminación directa.</p>
            <p className="text-slate-500 text-xs mt-1">Inicia el 29 de junio de 2026</p>
          </div>
        )}

        {ROUND_ORDER.map((round) => {
          const matches = byRound[round]
          if (!matches || matches.length === 0) return null
          const isFinal = round === 'Final'

          return (
            <div key={round}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{ROUND_EMOJI[round]}</span>
                <h2 className="text-white font-bold text-lg">{ROUND_LABELS[round] ?? round}</h2>
                <span className="text-slate-500 text-sm">({matches.length} partidos)</span>
              </div>

              {isFinal ? (
                // Final gets a special layout
                <div className="max-w-sm mx-auto">
                  <BracketMatch m={matches[0]} isFinal />
                  {matches[0].statusState === 'post' && (
                    <div className="text-center mt-4">
                      <p className="text-3xl">🏆</p>
                      <p className="text-yellow-400 font-bold text-lg mt-1">
                        {Number(matches[0].home.score) > Number(matches[0].away.score)
                          ? matches[0].home.name
                          : matches[0].away.name}
                      </p>
                      <p className="text-slate-400 text-sm">¡Campeón del Mundo!</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {matches.map((m) => (
                    <BracketMatch key={m.id} m={m} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
