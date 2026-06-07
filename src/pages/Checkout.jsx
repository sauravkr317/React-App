import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiCheck, FiLock, FiCreditCard } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/api'
import EmptyState from '../components/EmptyState'

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [placing, setPlacing] = useState(false)
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '',
    address: '', city: '', zip: '', country: 'USA',
    cardNumber: '', cardName: '', expiry: '', cvc: ''
  })

  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const onChange = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const placeOrder = (e) => {
    e.preventDefault()
    if (placing || items.length === 0) return
    setPlacing(true)
    setTimeout(() => {
      const orderId = 'SZ-' + Date.now().toString().slice(-6)
      clearCart()
      navigate(`/checkout?success=${orderId}`, { replace: true })
      setPlacing(false)
    }, 1200)
  }

  // Success state
  if (new URLSearchParams(window.location.search).get('success')) {
    const orderId = new URLSearchParams(window.location.search).get('success')
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 animate-bounce-s">
          <FiCheck className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Confirmed!</h1>
        <p className="text-slate-500 mb-2">Thank you for your purchase.</p>
        <p className="text-sm text-slate-500 mb-8">Order ID: <strong className="text-slate-800">{orderId}</strong></p>
        <Link to="/shop" className="btn-primary">Continue shopping</Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <EmptyState
          icon="🛒"
          title="Nothing to checkout"
          message="Add items to your cart first."
          action={<Link to="/shop" className="btn-primary">Browse products</Link>}
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Checkout</h1>
      <form onSubmit={placeOrder} className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-6">
          <section className="card p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Contact</h2>
            <input required type="email" placeholder="Email" value={form.email} onChange={onChange('email')} className="input" />
          </section>

          <section className="card p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Shipping address</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <input required placeholder="First name" value={form.firstName} onChange={onChange('firstName')} className="input" />
              <input required placeholder="Last name"  value={form.lastName}  onChange={onChange('lastName')}  className="input" />
              <input required placeholder="Address"    value={form.address}   onChange={onChange('address')}   className="input sm:col-span-2" />
              <input required placeholder="City"       value={form.city}      onChange={onChange('city')}      className="input" />
              <input required placeholder="ZIP / Postal" value={form.zip}    onChange={onChange('zip')}       className="input" />
              <select value={form.country} onChange={onChange('country')} className="input sm:col-span-2">
                <option>USA</option><option>Canada</option><option>UK</option><option>Australia</option><option>India</option>
              </select>
            </div>
          </section>

          <section className="card p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
              <FiCreditCard /> Payment
              <span className="ml-auto inline-flex items-center gap-1 text-xs text-slate-500 font-normal">
                <FiLock className="w-3 h-3" /> Secure
              </span>
            </h2>
            <p className="text-xs text-slate-500 mb-4">Demo only — no real payment is processed.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <input required placeholder="Card number" maxLength="19" value={form.cardNumber} onChange={onChange('cardNumber')} className="input sm:col-span-2" />
              <input required placeholder="Name on card" value={form.cardName} onChange={onChange('cardName')} className="input sm:col-span-2" />
              <input required placeholder="MM/YY"   maxLength="5"  value={form.expiry} onChange={onChange('expiry')} className="input" />
              <input required placeholder="CVC"     maxLength="4"  value={form.cvc}    onChange={onChange('cvc')}    className="input" />
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 self-start">
          <div className="card p-6">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {items.map(it => (
                <div key={it.id} className="flex gap-3 text-sm">
                  <div className="w-14 h-14 bg-slate-50 rounded-lg overflow-hidden shrink-0">
                    <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="line-clamp-1 font-medium">{it.title}</p>
                    <p className="text-slate-500 text-xs">Qty: {it.qty}</p>
                  </div>
                  <div className="font-semibold whitespace-nowrap">{formatPrice(it.price * it.qty)}</div>
                </div>
              ))}
            </div>
            <dl className="space-y-2 mt-4 pt-4 border-t border-slate-200 text-sm">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd></div>
              <div className="flex justify-between"><dt>Tax</dt><dd>{formatPrice(tax)}</dd></div>
              <div className="flex justify-between text-base font-bold pt-2 border-t border-slate-200">
                <dt>Total</dt><dd>{formatPrice(total)}</dd>
              </div>
            </dl>
            <button
              type="submit"
              disabled={placing}
              className="btn-primary w-full mt-5 py-3"
            >
              {placing ? 'Placing order...' : `Pay ${formatPrice(total)}`}
            </button>
          </div>
        </aside>
      </form>
    </div>
  )
}
