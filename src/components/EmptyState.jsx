export default function EmptyState({ icon = '🛍️', title, message, action }) {
  return (
    <div className="text-center py-16 px-4">
      <div className="text-6xl mb-4">{icon}</div>
      <h2 className="text-xl font-bold text-slate-800 mb-2">{title}</h2>
      {message && <p className="text-slate-500 mb-6 max-w-md mx-auto">{message}</p>}
      {action}
    </div>
  )
}
