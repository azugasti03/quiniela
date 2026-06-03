import { participantes, equiposStats, partidos } from '@/data/quiniela'
import Link from 'next/link'
import AdminPagos from './AdminPagos'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="bg-slate-800 border-b border-slate-700 px-4 pt-10 pb-4">
        <h1 className="text-xl font-bold text-white">Panel Admin</h1>
        <p className="text-slate-400 text-sm mt-1">Quiniela Mundial 2026</p>
      </div>

      <div className="px-4 py-5 space-y-5">
        {/* How to update */}
        <div className="rounded-xl bg-slate-800 border border-slate-700 p-4 space-y-3">
          <p className="text-white font-semibold">¿Cómo actualizar los datos?</p>
          <ol className="space-y-2 text-sm text-slate-300">
            <li className="flex gap-2">
              <span className="text-green-400 font-bold shrink-0">1.</span>
              Abre el archivo <code className="text-yellow-400 bg-slate-900 px-1.5 py-0.5 rounded text-xs">src/data/quiniela.ts</code> en tu editor
            </li>
            <li className="flex gap-2">
              <span className="text-green-400 font-bold shrink-0">2.</span>
              Edita los nombres, pagos, equipos o resultados
            </li>
            <li className="flex gap-2">
              <span className="text-green-400 font-bold shrink-0">3.</span>
              Guarda y ejecuta en la terminal:
            </li>
          </ol>
          <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-green-400 border border-slate-700">
            git add . &amp;&amp; git commit -m &quot;update&quot; &amp;&amp; git push
          </div>
          <p className="text-slate-500 text-xs">Vercel redespliega automáticamente en ~30 segundos.</p>
        </div>

        {/* Current state summary */}
        <div className="rounded-xl bg-slate-800 border border-slate-700 p-4 space-y-4">
          <p className="text-white font-semibold">Estado actual</p>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-700 rounded-lg p-3">
              <p className="text-2xl font-bold text-white">{participantes.length}</p>
              <p className="text-xs text-slate-400 mt-0.5">Participantes</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-3">
              <p className="text-2xl font-bold text-green-400">{participantes.filter((p) => p.pagado).length}</p>
              <p className="text-xs text-slate-400 mt-0.5">Pagaron</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-3">
              <p className="text-2xl font-bold text-blue-400">{partidos.length}</p>
              <p className="text-xs text-slate-400 mt-0.5">Partidos</p>
            </div>
          </div>

          {/* Participants list */}
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Participantes</p>
            <div className="space-y-1.5">
              {participantes.map((p) => (
                <div key={p.id} className="flex items-center justify-between bg-slate-700/50 rounded-lg px-3 py-2">
                  <div>
                    <span className="text-white text-sm">{p.nombre}</span>
                    {(p.bombo1 || p.bombo2 || p.bombo3 || p.bombo4) && (
                      <span className="text-slate-400 text-xs ml-2">
                        {[p.bombo1, p.bombo2, p.bombo3, p.bombo4].filter(Boolean).join(' · ')}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs font-medium ${p.pagado ? 'text-green-400' : 'text-red-400'}`}>
                    {p.pagado ? '✓ Pagado' : '✗ Pendiente'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Teams with progress */}
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Equipos avanzados</p>
            {Object.entries(equiposStats)
              .filter(([, s]) => s.clasifico || s.victoriasGrupos > 0)
              .length === 0 ? (
              <p className="text-slate-500 text-sm italic">Ningún equipo ha avanzado todavía.</p>
            ) : (
              <div className="space-y-1.5">
                {Object.entries(equiposStats)
                  .filter(([, s]) => s.clasifico || s.victoriasGrupos > 0)
                  .map(([equipo, stats]) => (
                    <div key={equipo} className="flex items-center justify-between bg-slate-700/50 rounded-lg px-3 py-2 text-sm">
                      <span className="text-white">{equipo}</span>
                      <span className="text-slate-400 text-xs">
                        {stats.campeon ? '🏆 Campeón' :
                         stats.final ? '🥈 Final' :
                         stats.semis ? 'Semis' :
                         stats.cuartos ? 'Cuartos' :
                         stats.clasifico ? 'Clasificó' :
                         `${stats.victoriasGrupos}V en grupos`}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        <AdminPagos participantes={participantes} />

        <div className="flex gap-3">
          <Link href="/leaderboard" className="flex-1 text-center bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl py-3 text-sm transition-colors">
            Ver posiciones
          </Link>
          <Link href="/equipos" className="flex-1 text-center bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl py-3 text-sm transition-colors">
            Ver equipos
          </Link>
        </div>
      </div>
    </div>
  )
}
