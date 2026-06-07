import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi'
import { getAllProducts, getCategories, categoryEmoji } from '../data/api'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'
import QuickViewModal from '../components/QuickViewModal'

export default function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [quick, setQuick] = useState(null)

  useEffect(() => {
    let alive = true
    Promise.all([getAllProducts(), getCategories()])
      .then(([p, c]) => { if (alive) { setProducts(p); setCategories(c) } })
      .finally(() => alive && setLoading(false))
    return () => { alive = false }
  }, [])

  const featured  = products.slice(0, 4)
  const trending  = [...products].sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)).slice(0, 8)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-purple-50">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div className="animate-slide-up">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 text-brand-700 mb-4">
              ✨ New Season — Up to 40% Off
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight text-balance">
              Discover a better way to <span className="text-brand-600">shop</span>.
            </h1>
            <p className="mt-5 text-lg text-slate-600 max-w-lg text-balance">
              Curated essentials, fair prices, fast delivery. ShopZen brings the store to your fingertips.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn-primary px-6 py-3 text-base">
                Shop Now <FiArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/shop?cat=electronics" className="btn-secondary px-6 py-3 text-base">
                Explore Electronics
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { v: '10K+', l: 'Products' },
                { v: '50K+', l: 'Customers' },
                { v: '4.8★',  l: 'Rated' }
              ].map(s => (
                <div key={s.l}>
                  <div className="text-2xl font-bold text-slate-900">{s.v}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-slide-up">
            <div className="grid grid-cols-2 gap-4">
              {trending.slice(0, 4).map((p, i) => (
                <div
                  key={p.id}
                  className={`bg-white rounded-2xl shadow-card overflow-hidden ${i % 2 ? 'mt-8' : ''}`}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="aspect-square object-cover w-full"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400/e2e8f0/94a3b8?text=Product' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { icon: <FiTruck className="w-5 h-5" />,         t: 'Free Shipping',  d: 'On orders over $50' },
            { icon: <FiShield className="w-5 h-5" />,        t: 'Secure Payment', d: '100% protected' },
            { icon: <FiRefreshCw className="w-5 h-5" />,     t: 'Easy Returns',   d: '30-day return policy' },
            { icon: <FiHeadphones className="w-5 h-5" />,    t: '24/7 Support',   d: 'Dedicated help' }
          ].map(f => (
            <div key={f.t} className="card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
                {f.icon}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-800">{f.t}</div>
                <div className="text-xs text-slate-500 truncate">{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Shop by Category</h2>
            <p className="text-slate-500 mt-1">Browse our most popular collections</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.filter(c => c !== 'all').map(c => (
            <Link
              key={c}
              to={`/shop?cat=${encodeURIComponent(c)}`}
              className="group card p-5 sm:p-6 text-center hover:shadow-card hover:-translate-y-1 transition-all"
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{categoryEmoji(c)}</div>
              <div className="text-sm font-semibold text-slate-800 capitalize">{c}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Featured Products</h2>
            <p className="text-slate-500 mt-1">Hand-picked for you</p>
          </div>
          <Link to="/shop" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
            View all <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : featured.map(p => <ProductCard key={p.id} product={p} onQuickView={setQuick} />)
          }
        </div>
      </section>

      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 to-purple-600 p-8 sm:p-12 text-white">
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-white/10 rounded-full" />
          <div className="absolute -right-10 -bottom-20 w-72 h-72 bg-white/5 rounded-full" />
          <div className="relative max-w-xl">
            <h2 className="text-2xl sm:text-4xl font-bold mb-3 text-balance">Mega Sale Weekend!</h2>
            <p className="text-white/90 mb-6">Up to 50% off on selected items. Limited time only.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-6 py-3 rounded-lg hover:bg-slate-100 transition">
              Shop the Sale <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Trending Now</h2>
            <p className="text-slate-500 mt-1">Top-rated products loved by customers</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : trending.map(p => <ProductCard key={p.id} product={p} onQuickView={setQuick} />)
          }
        </div>
      </section>

      {quick && <QuickViewModal product={quick} onClose={() => setQuick(null)} />}
    </div>
  )
}
