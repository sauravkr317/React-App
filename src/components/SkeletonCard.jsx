export default function SkeletonCard() {
  return (
    <div className="card animate-pulse">
      <div className="aspect-square bg-slate-200" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-slate-200 rounded w-1/3" />
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-4 bg-slate-200 rounded w-2/3" />
        <div className="h-6 bg-slate-200 rounded w-1/2 mt-3" />
      </div>
    </div>
  )
}
