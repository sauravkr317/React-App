import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { getAllProducts, formatPrice } from '../data/api'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'
import { FiTrash2 } from 'react-icons/fi'

export default function Wishlist() {
  const { ids, clear, count } = useWishlist()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [quick, setQuick] = useState(null)

  useEffect(() => {
    let alive = true
    getAllProducts()
      .then(all => alive && setItems(all.filter(p => ids.includes(p.id))))
      .finally(() => alive && setLoading(false))
    return () => { alive = false }
  }, [ids])

  if (!loading && count === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <EmptyState
          icon="💖"
          title="Your wishlist is empty"
          message="Save products you love by clicking the heart icon."
          action={<Link to="/shop" className="btn-primary">Browse products</Link>}
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Wishlist</h1>
          <p className="text-slate-500 mt-1">{count} saved item{count !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={clear} className="btn-secondary text-sm">
          <FiTrash2 className="w-4 h-4" /> Clear all
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {items.map(p => <ProductCard key={p.id} product={p} onQuickView={setQuick} />)}
      </div>
    </div>
  )
}
