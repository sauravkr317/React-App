import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiArrowLeft, FiCheck, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi'
import { getProduct, formatPrice, getAllProducts } from '../data/api'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'
import RatingStars from '../components/RatingStars'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('description')
  const [loading, setLoading] = useState(true)

  const { addItem } = useCart()
  const { has, toggle } = useWishlist()
  const { show } = useToast()

  useEffect(() => {
    let alive = true
    setLoading(true); setProduct(null)
    Promise.all([getProduct(id), getAllProducts()])
      .then(([p, all]) => {
        if (!alive) return
        setProduct(p)
        setRelated(all.filter(x => x.category === p?.category && x.id !== p.id).slice(0, 4))
      })
      .finally(() => alive && setLoading(false))
    return () => { alive = false }
  }, [id])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-2 gap-10">
        <div className="aspect-square bg-slate-200 rounded-2xl animate-pulse" />
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-slate-200 rounded w-1/4" />
          <div className="h-8 bg-slate-200 rounded w-3/4" />
          <div className="h-4 bg-slate-200 rounded w-1/2" />
          <div className="h-12 bg-slate-200 rounded w-1/3" />
          <div className="h-24 bg-slate-200 rounded" />
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-bold mb-2">Product not found</h1>
        <Link to="/shop" className="btn-primary mt-4">Back to shop</Link>
      </div>
    )
  }

  const isFav = has(product.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 mb-6">
        <FiArrowLeft className="w-4 h-4" /> Back to shop
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="aspect-square bg-slate-50 flex items-center justify-center p-6">
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full max-h-full object-contain"
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x600/e2e8f0/94a3b8?text=Product' }}
            />
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="text-xs uppercase tracking-wider text-brand-600 font-semibold">
            {product.category}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mt-2 mb-3 text-balance">
            {product.title}
          </h1>
          <div className="flex items-center gap-3 mb-4">
            <RatingStars value={product.rating?.rate} count={product.rating?.count} size={16} />
            <span className="text-sm text-emerald-600 inline-flex items-center gap-1">
              <FiCheck className="w-4 h-4" /> In stock
            </span>
          </div>
          <div className="text-4xl font-bold text-slate-900 mb-6">{formatPrice(product.price)}</div>
          <p className="text-slate-600 leading-relaxed mb-6">{product.description}</p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-slate-700">Quantity</span>
            <div className="inline-flex items-center border border-slate-200 rounded-lg overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 hover:bg-slate-50">−</button>
              <span className="w-12 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty(q => Math.min(99, q + 1))} className="w-10 h-10 hover:bg-slate-50">+</button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => { addItem(product, qty); show('Added to cart') }}
              className="btn-primary flex-1 min-w-[180px] py-3 text-base"
            >
              <FiShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <button
              onClick={() => { toggle(product.id); show(isFav ? 'Removed from wishlist' : 'Added to wishlist ❤️', isFav ? 'info' : 'success') }}
              className={`btn-secondary py-3 px-4 ${isFav ? 'text-rose-500' : ''}`}
            >
              <FiHeart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Perks */}
          <div className="grid sm:grid-cols-3 gap-3 mt-8">
            {[
              { i: <FiTruck className="w-4 h-4" />,     t: 'Free Shipping' },
              { i: <FiRefreshCw className="w-4 h-4" />, t: '30-Day Returns' },
              { i: <FiShield className="w-4 h-4" />,    t: 'Secure Checkout' }
            ].map(p => (
              <div key={p.t} className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-2.5 rounded-lg">
                <span className="text-brand-600">{p.i}</span>
                <span className="font-medium">{p.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="border-b border-slate-200 flex gap-1 overflow-x-auto no-scrollbar">
          {['description', 'reviews', 'shipping'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-sm font-medium capitalize border-b-2 transition ${
                tab === t ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="py-6 text-slate-600 leading-relaxed max-w-3xl">
          {tab === 'description' && <p>{product.description}</p>}
          {tab === 'reviews' && (
            <div>
              <p className="mb-3">Customer rating: <strong>{product.rating?.rate}</strong> from {product.rating?.count} reviews.</p>
              <div className="space-y-3">
                {[
                  { n: 'Alex M.', t: 'Exceeded my expectations! Quality is top-notch and shipping was fast.' },
                  { n: 'Priya S.', t: 'Looks exactly like the photo. Very happy with this purchase.' },
                  { n: 'Jordan T.', t: 'Great value for the price. Would buy again.' }
                ].map((r, i) => (
                  <div key={i} className="card p-4">
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-slate-800">{r.n}</strong>
                      <RatingStars value={5} size={12} />
                    </div>
                    <p className="text-sm">{r.t}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'shipping' && (
            <ul className="space-y-2 list-disc pl-5">
              <li>Free standard shipping on orders over $50.</li>
              <li>Express shipping (2-3 days) available at checkout.</li>
              <li>30-day hassle-free returns.</li>
              <li>International shipping to 50+ countries.</li>
            </ul>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}
