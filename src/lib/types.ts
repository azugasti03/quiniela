export type Fase = 'Grupos' | 'Octavos' | 'Cuartos' | 'Semifinal' | 'Final'
export type MatchStatus = 'pendiente' | 'en_vivo' | 'finalizado'

export interface Participante {
  id: string
  nombre: string
  pagado: boolean
  bombo1: string
  bombo2: string
  bombo3: string
  bombo4: string
}

export interface EquipoStats {
  victoriasGrupos: number
  clasifico: boolean
  cuartos: boolean
  semis: boolean
  final: boolean
  campeon: boolean
}

export interface Partido {
  id: string
  fecha: string
  hora: string
  equipoLocal: string
  equipoVisitante: string
  golesLocal: number | null
  golesVisitante: number | null
  fase: Fase
  grupo?: string
  status: MatchStatus
}

export interface ParticipanteConPuntos extends Participante {
  puntos: number
}
