// ================================================================
//  QUINIELA MUNDIAL 2026 — ARCHIVO DE DATOS
//  Edita este archivo para actualizar todo el sitio.
//  Después haz: git add . && git commit -m "update" && git push
//  Vercel despliega automáticamente en ~30 segundos.
// ================================================================

import { Participante, EquipoStats, Partido } from '@/lib/types'

// ----------------------------------------------------------------
//  PARTICIPANTES
//  pagado: cambia a true cuando alguien pague
//  bombo1 = Potencia, bombo2 = Competitivo, bombo3 = Regular, bombo4 = Longshot
//  Deja el campo vacío ("") hasta que se haga el sorteo
// ----------------------------------------------------------------
export const participantes: Participante[] = [
  { id: '1',  nombre: 'Alan',    pagado: true,  foto: '/fotos/alan.jpg',     fotoPosition: 'center 20%', bombo1: 'Francia',       bombo2: 'Japón',          bombo3: 'Suecia',          bombo4: 'Curazao'       },
  { id: '2',  nombre: 'David',   pagado: true,  foto: '/fotos/david.jpg',                                bombo1: 'Argentina',     bombo2: 'Turquía',        bombo3: 'Paraguay',        bombo4: 'Nueva Zelanda' },
  { id: '3',  nombre: 'Mulato',  pagado: true,  foto: '/fotos/mulato.jpg',                               bombo1: 'Marruecos',     bombo2: 'Irán',           bombo3: 'Canadá',          bombo4: 'Bosnia'        },
  { id: '4',  nombre: 'Juanca',  pagado: true,  foto: '/fotos/juanca.jpg',                               bombo1: 'Bélgica',       bombo2: 'Corea del Sur',  bombo3: 'Egipto',          bombo4: 'Irak'          },
  { id: '5',  nombre: 'Guzmi',   pagado: true,  foto: '/fotos/guzmi.jpg',                                bombo1: 'Croacia',       bombo2: 'Australia',      bombo3: 'Escocia',         bombo4: 'Haití'         },
  { id: '6',  nombre: 'Edgi',    pagado: true,  foto: '/fotos/edgar.jpg',                                bombo1: 'España',        bombo2: 'USA',            bombo3: 'RD Congo',        bombo4: 'Jordania'      },
  { id: '7',  nombre: 'Ruben',   pagado: true,  foto: '/fotos/ruben.jpg',                                bombo1: 'Alemania',      bombo2: 'Austria',        bombo3: 'Argelia',         bombo4: 'Sudáfrica'     },
  { id: '8',  nombre: 'Guillen', pagado: true,  foto: '/fotos/guillen.jpg',                              bombo1: 'Brasil',        bombo2: 'México',         bombo3: 'Túnez',           bombo4: 'Ghana'         },
  { id: '9',  nombre: 'Angel',   pagado: true,  foto: '/fotos/angel.jpg',                                bombo1: 'Países Bajos',  bombo2: 'Ecuador',        bombo3: 'Noruega',         bombo4: 'Qatar'         },
  { id: '10', nombre: 'Chris',   pagado: true,  foto: '/fotos/chris.jpg',                                bombo1: 'Portugal',      bombo2: 'Suiza',          bombo3: 'Panamá',          bombo4: 'Cabo Verde'    },
  { id: '11', nombre: 'Mau',     pagado: true,  foto: '/fotos/mau.jpg',                                  bombo1: 'Colombia',      bombo2: 'Uruguay',        bombo3: 'Costa de Marfil', bombo4: 'Uzbekistán'    },
  { id: '12', nombre: 'Diego',   pagado: true,  foto: '/fotos/diego.jpg',                                bombo1: 'Inglaterra',    bombo2: 'Senegal',        bombo3: 'República Checa', bombo4: 'Arabia Saudita'},
]

// ----------------------------------------------------------------
//  ESTADÍSTICAS POR EQUIPO
//  Actualiza después de cada partido / ronda eliminatoria.
//  victoriasGrupos: cuántas victorias tuvo en fase de grupos (0–3)
//  clasifico: pasó la fase de grupos
//  cuartos / semis / final / campeon: avanzó a esa ronda
// ----------------------------------------------------------------
export const equiposStats: Record<string, EquipoStats> = {
  // — BOMBO 1 (Potencias) —
  'Francia':           { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'España':            { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Argentina':         { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Inglaterra':        { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Portugal':          { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Brasil':            { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Países Bajos':      { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Marruecos':         { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Bélgica':           { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Alemania':          { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Croacia':           { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Colombia':          { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  // — BOMBO 2 (Competitivos) —
  'Senegal':           { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'México':            { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'USA':               { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Uruguay':           { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Japón':             { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Suiza':             { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Irán':              { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Turquía':           { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Ecuador':           { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Austria':           { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Corea del Sur':     { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Australia':         { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  // — BOMBO 3 (Regulares) —
  'Argelia':           { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Egipto':            { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Canadá':            { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Noruega':           { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Panamá':            { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Costa de Marfil':   { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Suecia':            { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Paraguay':          { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'República Checa':   { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Escocia':           { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Túnez':             { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'RD Congo':          { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  // — BOMBO 4 (Longshots) —
  'Uzbekistán':        { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Qatar':             { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Irak':              { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Sudáfrica':         { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Arabia Saudita':    { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Jordania':          { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Bosnia':            { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Cabo Verde':        { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Ghana':             { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Curazao':           { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Haití':             { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Nueva Zelanda':     { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
}

// ----------------------------------------------------------------
//  PARTIDOS
//  status: 'pendiente' | 'en_vivo' | 'finalizado'
//  golesLocal / golesVisitante: null mientras no se juegue
//  grupo: solo en fase de grupos (A, B, C, ...)
// ----------------------------------------------------------------
export const partidos: Partido[] = [
  // Agrega los partidos aquí. Ejemplo:
  // {
  //   id: '1',
  //   fecha: '2026-06-11',
  //   hora: '12:00',
  //   equipoLocal: 'México',
  //   equipoVisitante: 'Ecuador',
  //   golesLocal: null,
  //   golesVisitante: null,
  //   fase: 'Grupos',
  //   grupo: 'B',
  //   status: 'pendiente',
  // },
]
