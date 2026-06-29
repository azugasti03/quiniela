# Quiniela Mundial 2026

App web en Next.js para seguir una quiniela del Mundial 2026 entre amigos.

## Repo y deploy
- GitHub: https://github.com/azugasti03/quiniela
- Vercel (producción): https://quiniela-green.vercel.app
- Para publicar cambios: `git add . && git commit -m "update" && git push`

## Cómo funciona
Todo el contenido está en **un solo archivo**: `src/data/quiniela.ts`
- Edítalo para actualizar participantes, pagos, equipos asignados y estadísticas de equipos
- Vercel redespliega automáticamente en ~30 segundos tras cada push

## Participantes (12)
Alan, David, Mulato, Juanca, Guzmi, Edgi, Ruben, Guillen, Angel, Ruiz, Parrilla, Diego

## Mecánica de puntos (Mundial 2026 con 48 equipos)
- Victoria en grupos: +1 por cada una
- Clasificar grupos → Ronda de 32: +3 (`clasifico`)
- Ganar Ronda de 32 → Ronda de 16 (Octavos): +3 (`octavos`)
- Ganar Ronda de 16 → Cuartos: +5 (`cuartos`)
- Ganar Cuartos → Semifinal: +8 (`semis`)
- Ganar Semifinal → Final: +10 (`final`)
- Campeón: +15 (`campeon`)

Los puntos se calculan automáticamente desde ESPN API — no editar equiposStats manualmente.

## Páginas
- `/leaderboard` — ranking en tiempo real con fotos y modal de detalle
- `/equipos` — todos los participantes con sus 4 equipos, clickeable para ver detalle
- `/partidos` — partidos jalados automáticamente desde ESPN API, se actualiza cada 2 min
- `/bracket` — fase eliminatoria con resultados en vivo
- `/pagos` — quién pagó y quién no
- `/admin` — panel para ver estado actual

## Estructura de quiniela.ts
```typescript
participantes: [
  { id, nombre, pagado: bool, foto: '/fotos/nombre.jpg', fotoPosition?, bombo1, bombo2, bombo3, bombo4 }
]

equiposStats: {
  'Nombre del equipo': { victoriasGrupos: 0, clasifico: false, octavos: false, cuartos: false, semis: false, final: false, campeon: false }
}
// NOTA: equiposStats ya no se usa para el ranking — los stats vienen de ESPN automáticamente vía derivarEquiposStats()

partidos: [] // no se usa, los partidos vienen de ESPN automáticamente
```

## Cambios frecuentes que puede pedir el usuario
- "X ya pagó" → `pagado: true` en participantes
- "Asignar equipos: Alan tiene Brasil, México, Marruecos, Bolivia" → actualizar bombo1-4
- "Brasil ganó 2 en grupos y clasificó" → equiposStats['Brasil'] con victoriasGrupos: 2, clasifico: true
- "Agregar participante Y" → nuevo objeto en participantes
- Ajuste de foto → cambiar fotoPosition (CSS object-position, ej: 'center 20%')
