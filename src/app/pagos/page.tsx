import { participantes } from '@/data/quiniela'

export default function PagosPage() {
  const pagados = participantes.filter((p) => p.pagado)
  const pendientes = participantes.filter((p) => !p.pagado)
  const pct = participantes.length > 0 ? (pagados.length / participantes.length) * 100 : 0

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="bg-gradient-to-b from-green-900 to-slate-900 px-4 pt-10 pb-6">
        <p className="text-green-400 text-sm font-semibold tracking-widest uppercase text-center">Mundial 2026</p>
        <h1 className="text-2xl font-bold text-white text-center mt-1">Pagos</h1>
      </div>

      <div className="px-4 pb-4 space-y-4">
        {/* Summary */}
        <div className="rounded-xl bg-slate-800 border border-slate-700 p-4">
          <div className="flex justify-between items-center mb-3">
            <p className="text-slate-400 text-sm">Recaudado</p>
            <p className="text-white font-bold">{pagados.length} / {participantes.length}</p>
          </div>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-right text-xs text-slate-500 mt-1">{Math.round(pct)}% completado</p>
        </div>

        {pagados.length > 0 && (
          <div>
            <p className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-2 px-1">Pagado ✓</p>
            <div className="space-y-2">
              {pagados.map((p) => (
                <div key={p.id} className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-green-900/50 border border-green-800 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-white font-medium">{p.nombre}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {pendientes.length > 0 && (
          <div>
            <p className="text-red-400 text-xs font-semibold uppercase tracking-widest mb-2 px-1">Pendiente ✗</p>
            <div className="space-y-2">
              {pendientes.map((p) => (
                <div key={p.id} className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-red-900/50 border border-red-800 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-slate-300 font-medium">{p.nombre}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
