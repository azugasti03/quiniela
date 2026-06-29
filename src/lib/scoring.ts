import { EquipoStats, Participante, ParticipanteConPuntos } from './types'

export function calcularPuntosEquipo(stats: EquipoStats): number {
  let pts = stats.victoriasGrupos * 1
  if (stats.clasifico) pts += 3   // pasó grupos → Ronda de 32
  if (stats.octavos)   pts += 3   // ganó Ronda de 32 → Ronda de 16
  if (stats.cuartos)   pts += 5   // ganó Ronda de 16 → Cuartos
  if (stats.semis)     pts += 8
  if (stats.final)     pts += 10
  if (stats.campeon)   pts += 15
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

const ESPN = 'https://a.espncdn.com/i/teamlogos/countries/500'

export const FLAG_URLS: Record<string, string> = {
  // Bombo 1
  Francia:          `${ESPN}/fra.png`,
  España:           `${ESPN}/esp.png`,
  Argentina:        `${ESPN}/arg.png`,
  Inglaterra:       `${ESPN}/eng.png`,
  Portugal:         `${ESPN}/por.png`,
  Brasil:           `${ESPN}/bra.png`,
  'Países Bajos':   `${ESPN}/ned.png`,
  Marruecos:        `${ESPN}/mar.png`,
  Bélgica:          `${ESPN}/bel.png`,
  Alemania:         `${ESPN}/ger.png`,
  Croacia:          `${ESPN}/cro.png`,
  Colombia:         `${ESPN}/col.png`,
  // Bombo 2
  Senegal:          `${ESPN}/sen.png`,
  México:           `${ESPN}/mex.png`,
  USA:              `${ESPN}/usa.png`,
  Uruguay:          `${ESPN}/uru.png`,
  Japón:            `${ESPN}/jpn.png`,
  Suiza:            `${ESPN}/sui.png`,
  Irán:             `${ESPN}/irn.png`,
  Turquía:          `${ESPN}/tur.png`,
  Ecuador:          `${ESPN}/ecu.png`,
  Austria:          `${ESPN}/aut.png`,
  'Corea del Sur':  `${ESPN}/kor.png`,
  Australia:        `${ESPN}/aus.png`,
  // Bombo 3
  Argelia:          `${ESPN}/alg.png`,
  Egipto:           `${ESPN}/egy.png`,
  Canadá:           `${ESPN}/can.png`,
  Noruega:          `${ESPN}/nor.png`,
  Panamá:           `${ESPN}/pan.png`,
  'Costa de Marfil':`${ESPN}/civ.png`,
  Suecia:           `${ESPN}/swe.png`,
  Paraguay:         `${ESPN}/par.png`,
  'República Checa':`${ESPN}/cze.png`,
  Escocia:          `${ESPN}/sco.png`,
  Túnez:            `${ESPN}/tun.png`,
  'RD Congo':       `${ESPN}/cod.png`,
  // Bombo 4
  Uzbekistán:       `${ESPN}/uzb.png`,
  Qatar:            `${ESPN}/qat.png`,
  Irak:             `${ESPN}/irq.png`,
  Sudáfrica:        `${ESPN}/rsa.png`,
  'Arabia Saudita': `${ESPN}/ksa.png`,
  Jordania:         `${ESPN}/jor.png`,
  Bosnia:           `${ESPN}/bih.png`,
  'Cabo Verde':     `${ESPN}/cpv.png`,
  Ghana:            `${ESPN}/gha.png`,
  Curazao:          `${ESPN}/cur.png`,
  Haití:            `${ESPN}/hai.png`,
  'Nueva Zelanda':  `${ESPN}/nzl.png`,
}

export function getFlagUrl(team: string): string | null {
  return FLAG_URLS[team] ?? null
}

export function getFlag(team: string): string {
  return getFlagUrl(team) ?? '🏳️'
}
