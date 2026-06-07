import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingCart, FiEye, FiStar } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import { formatPrice } from '../data/api'

export default function ProductCard({ product, onQuickView }) {
  const { addItem } = useCart()
  const { has, toggle } = useWishlist()
  const { show } = useToast()
  const isFav = has(product.id)

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
    show(`Added "${product.title.slice(0, 28)}..." to cart`)
  }
  const handleFav = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(product.id)
    show(isFav ? 'Removed from wishlist' : 'Added to wishlist ❤️', isFav ? 'info' : 'success')
  }
  const handleView = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onQuickView?.(product)
  }

  return (
    <div className="group card hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.currentTarget.src = `https://placehold.co/400x400/e2e8f0/94a3b8?text=${encodeURIComponent(product.title.slice(0, 12))}` }}
        />
        {product.rating?.rate >= 4.5 && (
          <span className="absolute top-2 left-2 badge bg-amber-400 text-amber-900">
            <FiStar className="w-3 h-3 mr-0.5 fill-current" /> Top
          </span>
        )}
        <div className="absolute inset-x-2 top-2 flex justify-end">
          <button
            onClick={handleFav}
            aria-label="Toggle wishlist"
            className={`w-9 h-9 rounded-full flex items-center justify-center bg-white/95 shadow transition-all ${
              isFav ? 'text-rose-500 scale-110' : 'text-slate-500 hover:text-rose-500'
            }`}
          >
            <FiHeart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>
        </div>
        <div className="absolute inset-x-2 bottom-2 flex justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleView}
            className="btn bg-white text-slate-800 shadow-card hover:bg-slate-50 text-xs px-3 py-1.5"
          >
            <FiEye className="w-3.5 h-3.5" /> Quick View
          </button>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-1">
          {product.category}
        </p>
        <Link to={`/product/${product.id}`} className="flex-1">
          <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 hover:text-brand-600 transition">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-500">
          <FiStar className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="font-medium text-slate-700">{product.rating?.rate ?? '—'}</span>
          <span>({product.rating?.count ?? 0})</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-slate-900">{formatPrice(product.price)}</span>
          <button onClick={handleAdd} className="btn-primary text-xs px-3 py-2">
            <FiShoppingCart className="w-3.5 h-3.5" /> Add
          </button>
        </div>
      </div>
    </div>
  )
}
