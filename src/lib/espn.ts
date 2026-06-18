import { EquipoStats } from './types'

export interface EspnTeam {
  name: string
  quinielaName: string
  logo: string
  score: string | null
}

export interface EspnMatch {
  id: string
  date: string
  statusState: 'pre' | 'in' | 'post'
  displayClock?: string
  home: EspnTeam
  away: EspnTeam
  round: string
  group?: string
  venue?: string
}

// ESPN (English) → quiniela.ts (Spanish) mapping
export const ESPN_TO_QUINIELA: Record<string, string> = {
  Argentina: 'Argentina',
  Brazil: 'Brasil',
  France: 'Francia',
  Spain: 'España',
  Portugal: 'Portugal',
  Germany: 'Alemania',
  Netherlands: 'Países Bajos',
  Belgium: 'Bélgica',
  England: 'Inglaterra',
  Croatia: 'Croacia',
  Uruguay: 'Uruguay',
  USA: 'USA',
  'United States': 'USA',
  Mexico: 'México',
  Canada: 'Canadá',
  Colombia: 'Colombia',
  Denmark: 'Dinamarca',
  Austria: 'Austria',
  Switzerland: 'Suiza',
  Japan: 'Japón',
  Morocco: 'Marruecos',
  Senegal: 'Senegal',
  Australia: 'Australia',
  'South Korea': 'Corea del Sur',
  Turkey: 'Turquía',
  Ecuador: 'Ecuador',
  Poland: 'Polonia',
  Serbia: 'Serbia',
  Iran: 'Irán',
  Tunisia: 'Túnez',
  Ghana: 'Ghana',
  'Costa Rica': 'Costa Rica',
  Nigeria: 'Nigeria',
  Venezuela: 'Venezuela',
  Scotland: 'Escocia',
  'Saudi Arabia': 'Arabia Saudita',
  Panama: 'Panamá',
  Bolivia: 'Bolivia',
  Indonesia: 'Indonesia',
  Honduras: 'Honduras',
  Jamaica: 'Jamaica',
  Albania: 'Albania',
  Georgia: 'Georgia',
  Iraq: 'Irak',
  Jordan: 'Jordania',
  'New Zealand': 'Nueva Zelanda',
  "Côte d'Ivoire": 'Costa de Marfil',
  'Ivory Coast': 'Costa de Marfil',
  Qatar: 'Qatar',
  Slovenia: 'Eslovenia',
  'South Africa': 'Sudáfrica',
  Czechia: 'República Checa',
  'Czech Republic': 'República Checa',
  Romania: 'Rumania',
  Ukraine: 'Ucrania',
  Greece: 'Grecia',
  Hungary: 'Hungría',
  Slovakia: 'Eslovaquia',
  // Equipos de la quiniela que ESPN muestra en inglés
  Sweden: 'Suecia',
  Algeria: 'Argelia',
  Egypt: 'Egipto',
  Norway: 'Noruega',
  Uzbekistan: 'Uzbekistán',
  Haiti: 'Haití',
  'Cape Verde': 'Cabo Verde',
  'Cabo Verde': 'Cabo Verde',
  Curacao: 'Curazao',
  'Curaçao': 'Curazao',
  'Bosnia & Herzegovina': 'Bosnia',
  'Bosnia and Herzegovina': 'Bosnia',
  'Bosnia-Herzegovina': 'Bosnia',
  'Congo DR': 'RD Congo',
  'DR Congo': 'RD Congo',
  'Democratic Republic of Congo': 'RD Congo',
  'Congo, DR': 'RD Congo',
  'Korea Republic': 'Corea del Sur',
  'Republic of Korea': 'Corea del Sur',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseEvent(e: any): EspnMatch | null {
  const comp = e.competitions?.[0]
  if (!comp) return null
  const home = comp.competitors?.find((c: any) => c.homeAway === 'home')
  const away = comp.competitors?.find((c: any) => c.homeAway === 'away')
  if (!home || !away) return null

  const homeName: string = home.team?.displayName ?? ''
  const awayName: string = away.team?.displayName ?? ''
  const state: string = e.status?.type?.state ?? 'pre'

  return {
    id: e.id,
    date: e.date,
    statusState: state as 'pre' | 'in' | 'post',
    displayClock: e.status?.displayClock,
    home: {
      name: homeName,
      quinielaName: ESPN_TO_QUINIELA[homeName] ?? homeName,
      logo: home.team?.logo ?? '',
      score: home.score ?? null,
    },
    away: {
      name: awayName,
      quinielaName: ESPN_TO_QUINIELA[awayName] ?? awayName,
      logo: away.team?.logo ?? '',
      score: away.score ?? null,
    },
    round: comp.type?.text ?? 'Group Stage',
    group: comp.groups?.[0]?.name,
    venue: comp.venue?.fullName,
  }
}

function worldCupDates(): string[] {
  const dates: string[] = []
  const curr = new Date('2026-06-11')
  const end = new Date('2026-07-19')
  while (curr <= end) {
    dates.push(curr.toISOString().slice(0, 10).replace(/-/g, ''))
    curr.setDate(curr.getDate() + 1)
  }
  return dates
}

async function fetchDay(yyyymmdd: string): Promise<EspnMatch[]> {
  try {
    const res = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=${yyyymmdd}`,
      { next: { revalidate: 120 } }
    )
    if (!res.ok) return []
    const data = await res.json()
    return ((data.events ?? []) as any[]).map(parseEvent).filter(Boolean) as EspnMatch[]
  } catch {
    return []
  }
}

export async function fetchAllMatches(): Promise<EspnMatch[]> {
  const dates = worldCupDates()
  const batches = await Promise.all(dates.map(fetchDay))
  return batches.flat().sort((a, b) => a.date.localeCompare(b.date))
}

export function groupMatchesByRound(matches: EspnMatch[]) {
  const order = ['Group Stage', 'Round of 32', 'Round of 16', 'Quarterfinal', 'Semifinal', '3rd Place', 'Final']
  const map: Record<string, EspnMatch[]> = {}
  for (const m of matches) {
    const key = m.round
    if (!map[key]) map[key] = []
    map[key].push(m)
  }
  return Object.entries(map).sort(([a], [b]) => {
    const ai = order.findIndex((r) => a.includes(r.split(' ')[0]))
    const bi = order.findIndex((r) => b.includes(r.split(' ')[0]))
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
  })
}

export const KNOCKOUT_ROUNDS = ['Round of 32', 'Round of 16', 'Quarterfinal', 'Semifinal', 'Final']

export function derivarEquiposStats(matches: EspnMatch[]): Record<string, EquipoStats> {
  const stats: Record<string, EquipoStats> = {}

  function get(name: string): EquipoStats {
    if (!stats[name]) {
      stats[name] = { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false }
    }
    return stats[name]
  }

  for (const match of matches) {
    const home = match.home.quinielaName
    const away = match.away.quinielaName
    const finished = match.statusState === 'post'
    const round = match.round

    const r = round.toLowerCase()

    if (r.includes('group')) {
      if (finished) {
        const hs = parseInt(match.home.score ?? '')
        const as_ = parseInt(match.away.score ?? '')
        if (!isNaN(hs) && !isNaN(as_)) {
          if (hs > as_) get(home).victoriasGrupos++
          else if (as_ > hs) get(away).victoriasGrupos++
        }
      }
    } else if (r.includes('round of 32') || r.includes('round of 16') || r.includes('round of 48')) {
      get(home).clasifico = true
      get(away).clasifico = true
    } else if (r.includes('quarter')) {
      get(home).clasifico = true
      get(away).clasifico = true
      get(home).cuartos = true
      get(away).cuartos = true
    } else if (r.includes('semi')) {
      get(home).clasifico = true
      get(away).clasifico = true
      get(home).cuartos = true
      get(away).cuartos = true
      get(home).semis = true
      get(away).semis = true
    } else if (r.includes('3rd') || r.includes('third') || r.includes('tercer') || r.includes('place')) {
      // Perdieron la semi, no llegan a la final
      get(home).clasifico = true
      get(away).clasifico = true
      get(home).cuartos = true
      get(away).cuartos = true
      get(home).semis = true
      get(away).semis = true
    } else if (r === 'final' || r.includes('world cup final')) {
      get(home).clasifico = true
      get(away).clasifico = true
      get(home).cuartos = true
      get(away).cuartos = true
      get(home).semis = true
      get(away).semis = true
      get(home).final = true
      get(away).final = true
      if (finished) {
        const hs = parseInt(match.home.score ?? '')
        const as_ = parseInt(match.away.score ?? '')
        if (!isNaN(hs) && !isNaN(as_)) {
          if (hs > as_) get(home).campeon = true
          else if (as_ > hs) get(away).campeon = true
        }
      }
    }
  }

  return stats
}
