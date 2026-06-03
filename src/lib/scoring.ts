import { EquipoStats, Participante, ParticipanteConPuntos } from './types'

export function calcularPuntosEquipo(stats: EquipoStats): number {
  let pts = stats.victoriasGrupos * 1
  if (stats.clasifico) pts += 3
  if (stats.cuartos) pts += 5
  if (stats.semis) pts += 8
  if (stats.final) pts += 10
  if (stats.campeon) pts += 15
  return pts
}

export function calcularLeaderboard(
  participantes: Participante[],
  equiposStats: Record<string, EquipoStats>
): ParticipanteConPuntos[] {
  return participantes
    .map((p) => {
      const teams = [p.bombo1, p.bombo2, p.bombo3, p.bombo4].filter(Boolean)
      let puntos = 0
      for (const team of teams) {
        const stats = equiposStats[team]
        if (stats) puntos += calcularPuntosEquipo(stats)
      }
      return { ...p, puntos }
    })
    .sort((a, b) => b.puntos - a.puntos)
}

export const FLAGS: Record<string, string> = {
  Argentina: '🇦🇷',
  Brasil: '🇧🇷',
  Francia: '🇫🇷',
  España: '🇪🇸',
  Alemania: '🇩🇪',
  Portugal: '🇵🇹',
  Inglaterra: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'Países Bajos': '🇳🇱',
  Bélgica: '🇧🇪',
  México: '🇲🇽',
  USA: '🇺🇸',
  Canadá: '🇨🇦',
  Uruguay: '🇺🇾',
  Colombia: '🇨🇴',
  Ecuador: '🇪🇨',
  Venezuela: '🇻🇪',
  Perú: '🇵🇪',
  Chile: '🇨🇱',
  Marruecos: '🇲🇦',
  Senegal: '🇸🇳',
  Nigeria: '🇳🇬',
  Camerún: '🇨🇲',
  Ghana: '🇬🇭',
  Egipto: '🇪🇬',
  'Costa de Marfil': '🇨🇮',
  Argelia: '🇩🇿',
  Túnez: '🇹🇳',
  'Sudáfrica': '🇿🇦',
  Japón: '🇯🇵',
  'Corea del Sur': '🇰🇷',
  Australia: '🇦🇺',
  Irán: '🇮🇷',
  'Arabia Saudita': '🇸🇦',
  Qatar: '🇶🇦',
  Irak: '🇮🇶',
  Jordania: '🇯🇴',
  Indonesia: '🇮🇩',
  Suiza: '🇨🇭',
  Croacia: '🇭🇷',
  Austria: '🇦🇹',
  Serbia: '🇷🇸',
  Dinamarca: '🇩🇰',
  Polonia: '🇵🇱',
  Turquía: '🇹🇷',
  Escocia: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  Hungría: '🇭🇺',
  'República Checa': '🇨🇿',
  Eslovaquia: '🇸🇰',
  Rumania: '🇷🇴',
  Ucrania: '🇺🇦',
  Grecia: '🇬🇷',
  Albania: '🇦🇱',
  Eslovenia: '🇸🇮',
  Georgia: '🇬🇪',
  Panamá: '🇵🇦',
  'Costa Rica': '🇨🇷',
  Honduras: '🇭🇳',
  Jamaica: '🇯🇲',
  'Nueva Zelanda': '🇳🇿',
  Bolivia: '🇧🇴',
  Paraguay: '🇵🇾',
}

export function getFlag(team: string): string {
  return FLAGS[team] ?? '🏳️'
}
