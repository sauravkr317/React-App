import { useEffect } from 'react'
import { FiX, FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import { formatPrice } from '../data/api'
import { Link } from 'react-router-dom'

export default function QuickViewModal({ product, onClose }) {
  const { addItem } = useCart()
  const { has, toggle } = useWishlist()
  const { show } = useToast()

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!product) return null
  const isFav = has(product.id)

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center text-slate-600 hover:text-slate-900 transition"
        >
          <FiX className="w-5 h-5" />
        </button>
        <div className="grid sm:grid-cols-2 gap-0">
          <div className="bg-slate-100 aspect-square sm:aspect-auto sm:min-h-[400px]">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = `https://placehold.co/600x600/e2e8f0/94a3b8?text=Product` }}
            />
          </div>
          <div className="p-6 sm:p-8 flex flex-col">
            <span className="text-xs uppercase tracking-wider text-brand-600 font-semibold mb-1">
              {product.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 text-balance">
              {product.title}
            </h2>
            <div className="flex items-center gap-1 text-sm text-slate-500 mb-4">
              <FiStar className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-medium text-slate-700">{product.rating?.rate ?? '—'}</span>
              <span>({product.rating?.count ?? 0} reviews)</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-4">
              {product.description}
            </p>
            <div className="text-3xl font-bold text-slate-900 mb-6">
              {formatPrice(product.price)}
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              <button
                onClick={() => { addItem(product, 1); show('Added to cart'); onClose() }}
                className="btn-primary flex-1 min-w-[140px]"
              >
                <FiShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
              <button
                onClick={() => { toggle(product.id); show(isFav ? 'Removed from wishlist' : 'Added to wishlist ❤️', isFav ? 'info' : 'success') }}
                className={`btn-secondary ${isFav ? 'text-rose-500' : ''}`}
                aria-label="Toggle wishlist"
              >
                <FiHeart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
              </button>
            </div>
            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="mt-3 text-center text-sm text-brand-600 hover:text-brand-700 font-medium"
            >
              View full details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
