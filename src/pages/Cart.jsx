import { Link } from 'react-router-dom'
import { FiTrash2, FiPlus, FiMinus, FiArrowRight, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { formatPrice } from '../data/api'
import EmptyState from '../components/EmptyState'

export default function Cart() {
  const { items, setQty, removeItem, subtotal, count, clearCart } = useCart()
  const { show } = useToast()

  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          message="Looks like you haven't added anything yet. Let's find something great!"
          action={
            <Link to="/shop" className="btn-primary">
              <FiShoppingBag className="w-4 h-4" /> Start Shopping
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Your Cart ({count})</h1>
        <button onClick={() => { clearCart(); show('Cart cleared', 'info') }} className="text-sm text-slate-500 hover:text-rose-600">
          Clear cart
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        {/* Items */}
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="card p-3 sm:p-4 flex gap-3 sm:gap-4">
              <Link to={`/product/${item.id}`} className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/200x200/e2e8f0/94a3b8?text=Product' }}
                />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link to={`/product/${item.id}`} className="font-medium text-slate-800 hover:text-brand-600 line-clamp-2 text-sm sm:text-base">
                      {item.title}
                    </Link>
                    <p className="text-xs text-slate-500 capitalize mt-0.5">{item.category}</p>
                  </div>
                  <button
                    onClick={() => { removeItem(item.id); show('Item removed', 'info') }}
                    aria-label="Remove"
                    className="text-slate-400 hover:text-rose-500 p-1"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="inline-flex items-center border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQty(item.id, item.qty - 1)}
                      className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-slate-50"
                      aria-label="Decrease"
                    >
                      <FiMinus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                    <button
                      onClick={() => setQty(item.id, item.qty + 1)}
                      className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-slate-50"
                      aria-label="Increase"
                    >
                      <FiPlus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900 text-sm sm:text-base">
                      {formatPrice(item.price * item.qty)}
                    </div>
                    {item.qty > 1 && (
                      <div className="text-xs text-slate-500">{formatPrice(item.price)} each</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="card p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-slate-500">Subtotal</dt><dd className="font-medium">{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Shipping</dt>
                <dd className="font-medium">{shipping === 0 ? <span className="text-emerald-600">Free</span> : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between"><dt className="text-slate-500">Tax (8%)</dt><dd className="font-medium">{formatPrice(tax)}</dd></div>
              <div className="border-t border-slate-200 pt-3 flex justify-between text-base">
                <dt className="font-semibold text-slate-900">Total</dt>
                <dd className="font-bold text-slate-900">{formatPrice(total)}</dd>
              </div>
            </dl>
            {subtotal < 50 && (
              <p className="mt-4 text-xs text-slate-500 bg-amber-50 text-amber-800 px-3 py-2 rounded-lg">
                Add {formatPrice(50 - subtotal)} more for free shipping 🚚
              </p>
            )}
            <Link to="/checkout" className="btn-primary w-full mt-5 py-3">
              Checkout <FiArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/shop" className="block text-center text-sm text-brand-600 hover:text-brand-700 font-medium mt-3">
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
