import { FiStar } from 'react-icons/fi'

export default function RatingStars({ value = 0, count, size = 14 }) {
  return (
    <div className="inline-flex items-center gap-1 text-sm text-slate-500">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(n => (
          <FiStar
            key={n}
            style={{ width: size, height: size }}
            className={n <= Math.round(value) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
          />
        ))}
      </div>
      {count != null && <span className="text-xs text-slate-500">({count})</span>}
    </div>
  )
}
