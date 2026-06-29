export type Fase = 'Grupos' | 'Octavos' | 'Cuartos' | 'Semifinal' | 'Final'
export type MatchStatus = 'pendiente' | 'en_vivo' | 'finalizado'

export interface Participante {
  id: string
  nombre: string
  pagado: boolean
  foto: string           // URL de foto o ruta en /public/fotos/nombre.jpg — deja '' para usar iniciales
  fotoPosition?: string  // CSS object-position, ej: 'top', 'center', '50% 20%'
  bombo1: string
  bombo2: string
  bombo3: string
  bombo4: string
}

export interface EquipoStats {
  victoriasGrupos: number
  clasifico: boolean  // pasó grupos → Ronda de 32 (+3)
  octavos: boolean    // ganó Ronda de 32 → Ronda de 16 (+3)
  cuartos: boolean    // ganó Ronda de 16 → Cuartos (+5)
  semis: boolean      // ganó Cuartos → Semis (+8)
  final: boolean      // ganó Semis → Final (+10)
  campeon: boolean    // ganó Final (+15)
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
