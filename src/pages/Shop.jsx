import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiFilter, FiX, FiSearch } from 'react-icons/fi'
import {
  getAllProducts, getCategories, getProductsByCategory,
  searchProducts, sortProducts, filterByPrice, categoryEmoji
} from '../data/api'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'
import QuickViewModal from '../components/QuickViewModal'
import EmptyState from '../components/EmptyState'

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const [all, setAll] = useState([])
  const [loading, setLoading] = useState(true)
  const [quick, setQuick] = useState(false)
  const [mobileFilters, setMobileFilters] = useState(false)

  const cat = params.get('cat') || 'all'
  const q   = params.get('q')   || ''
  const sort = params.get('sort') || 'default'
  const max = Number(params.get('max') || 0)

  useEffect(() => {
    let alive = true
    setLoading(true)
    getProductsByCategory(cat)
      .then(d => alive && setAll(d))
      .finally(() => alive && setLoading(false))
    return () => { alive = false }
  }, [cat])

  const filtered = useMemo(() => {
    let r = searchProducts(all, q)
    r = filterByPrice(r, max)
    r = sortProducts(r, sort)
    return r
  }, [all, q, sort, max])

  const update = (k, v) => {
    const next = new URLSearchParams(params)
    if (v === '' || v == null || (k === 'cat' && v === 'all') || (k === 'sort' && v === 'default') || (k === 'max' && v === 0)) {
      next.delete(k)
    } else {
      next.set(k, v)
    }
    setParams(next, { replace: true })
  }

  const FiltersPanel = (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-slate-800 mb-3">Categories</h3>
        <div className="flex flex-col gap-2">
          {['all', 'electronics', 'jewelery', "men's clothing", "women's clothing"].map(c => (
            <button
              key={c}
              onClick={() => update('cat', c)}
              className={`flex items-center gap-2 text-left px-3 py-2 rounded-lg text-sm transition ${
                cat === c
                  ? 'bg-brand-50 text-brand-700 font-medium'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{categoryEmoji(c)}</span>
              <span className="capitalize">{c}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-slate-800 mb-3">Max Price: ${max || 1500}</h3>
        <input
          type="range"
          min="0"
          max="1500"
          step="10"
          value={max || 1500}
          onChange={e => update('max', Number(e.target.value) === 1500 ? 0 : Number(e.target.value))}
          className="w-full accent-brand-600"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>$0</span>
          <span>$1500</span>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-slate-800 mb-3">Sort by</h3>
        <select
          value={sort}
          onChange={e => update('sort', e.target.value)}
          className="input"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A → Z</option>
          <option value="name-desc">Name: Z → A</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Shop</h1>
        <p className="text-slate-500 mt-1">{filtered.length} products{q && ` matching "${q}"`}</p>
      </div>

      <div className="lg:hidden mb-4 flex gap-2">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            value={q}
            onChange={e => update('q', e.target.value)}
            placeholder="Search..."
            className="input pl-10"
          />
        </div>
        <button onClick={() => setMobileFilters(true)} className="btn-secondary">
          <FiFilter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar - desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 card p-5">
            {FiltersPanel}
          </div>
        </aside>

        {/* Products */}
        <div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="No products found"
              message="Try adjusting your search or filters."
              action={
                <button onClick={() => setParams({})} className="btn-primary">
                  Clear filters
                </button>
              }
            />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {filtered.map(p => <ProductCard key={p.id} product={p} onQuickView={setQuick} />)}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFilters && (
        <div className="lg:hidden fixed inset-0 z-[60] flex" onClick={() => setMobileFilters(false)}>
          <div className="absolute inset-0 bg-slate-900/60" />
          <div
            className="relative ml-auto w-80 max-w-[85vw] bg-white h-full p-5 overflow-y-auto animate-slide-in-r"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Filters</h2>
              <button onClick={() => setMobileFilters(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            {FiltersPanel}
            <button
              onClick={() => setMobileFilters(false)}
              className="btn-primary w-full mt-6"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}

      {quick && <QuickViewModal product={quick} onClose={() => setQuick(false)} />}
    </div>
  )
}
