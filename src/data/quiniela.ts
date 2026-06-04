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
  { id: '1',  nombre: 'Alan',           pagado: true,  foto: '/fotos/alan.jpg',     fotoPosition: 'center 20%', bombo1: '', bombo2: '', bombo3: '', bombo4: '' },
  { id: '2',  nombre: 'David',          pagado: true,  foto: '/fotos/david.jpg',    bombo1: '', bombo2: '', bombo3: '', bombo4: '' },
  { id: '3',  nombre: 'Mulato',         pagado: false, foto: '/fotos/mulato.jpg',   bombo1: '', bombo2: '', bombo3: '', bombo4: '' },
  { id: '4',  nombre: 'Juanca',         pagado: false, foto: '/fotos/juanca.jpg',   bombo1: '', bombo2: '', bombo3: '', bombo4: '' },
  { id: '5',  nombre: 'Guzmi',          pagado: true,  foto: '/fotos/guzmi.jpg',    bombo1: '', bombo2: '', bombo3: '', bombo4: '' },
  { id: '6',  nombre: 'Edgi',           pagado: false, foto: '/fotos/edgar.jpg',    bombo1: '', bombo2: '', bombo3: '', bombo4: '' },
  { id: '7',  nombre: 'Ruben',          pagado: false, foto: '/fotos/ruben.jpg',    bombo1: '', bombo2: '', bombo3: '', bombo4: '' },
  { id: '8',  nombre: 'Guillen',        pagado: true, foto: '/fotos/guillen.jpg',  bombo1: '', bombo2: '', bombo3: '', bombo4: '' },
  { id: '9',  nombre: 'Angel',          pagado: true,  foto: '/fotos/angel.jpg',    bombo1: '', bombo2: '', bombo3: '', bombo4: '' },
  { id: '10', nombre: 'Ruiz',           pagado: false, foto: '/fotos/ruiz.jpg',     bombo1: '', bombo2: '', bombo3: '', bombo4: '' },
  { id: '11', nombre: 'Parrilla',       pagado: false, foto: '/fotos/parrilla.jpg', bombo1: '', bombo2: '', bombo3: '', bombo4: '' },
  { id: '12', nombre: 'Diego',          pagado: false, foto: '/fotos/diego.jpg',    bombo1: '', bombo2: '', bombo3: '', bombo4: '' },
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
  'Argentina':       { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Francia':         { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Brasil':          { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'España':          { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Portugal':        { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Alemania':        { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Países Bajos':    { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Bélgica':         { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Inglaterra':      { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Croacia':         { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Uruguay':         { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'USA':             { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  // — BOMBO 2 (Competitivos) —
  'México':          { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Canadá':          { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Colombia':        { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Dinamarca':       { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Austria':         { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Suiza':           { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Japón':           { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Marruecos':       { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Senegal':         { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Australia':       { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Corea del Sur':   { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Turquía':         { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  // — BOMBO 3 (Regulares) —
  'Ecuador':         { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Polonia':         { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Serbia':          { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Irán':            { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Túnez':           { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Ghana':           { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Costa Rica':      { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Nigeria':         { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Venezuela':       { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Escocia':         { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Arabia Saudita':  { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Panamá':          { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  // — BOMBO 4 (Longshots) —
  'Bolivia':         { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Indonesia':       { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Honduras':        { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Jamaica':         { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Albania':         { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Georgia':         { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Irak':            { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Jordania':        { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Nueva Zelanda':   { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Costa de Marfil': { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Qatar':           { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
  'Eslovenia':       { victoriasGrupos: 0, clasifico: false, cuartos: false, semis: false, final: false, campeon: false },
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
