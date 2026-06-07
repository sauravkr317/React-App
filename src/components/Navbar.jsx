import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import {
  FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiX
} from 'react-icons/fi'

export default function Navbar() {
  const { count: cartCount } = useCart()
  const { count: wishCount } = useWishlist()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const submit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`)
      setOpen(false)
    }
  }

  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-colors ${
      isActive ? 'text-brand-600' : 'text-slate-700 hover:text-brand-600'
    }`

  const navLinks = [
    { to: '/',         label: 'Home' },
    { to: '/shop',     label: 'Shop' },
    { to: '/wishlist', label: 'Wishlist' },
    { to: '/cart',     label: 'Cart' }
  ]

  return (
    <header className={`sticky top-0 z-50 transition-all ${
      scrolled ? 'glass shadow-sm' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition">
              <FiShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Shop<span className="text-brand-600">Zen</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(l => (
              <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === '/'}>
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-600 rounded-full" />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Search (desktop) */}
          <form onSubmit={submit} className="hidden md:flex flex-1 max-w-xs">
            <div className="relative w-full">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-3 py-2 text-sm bg-slate-100 border border-transparent rounded-lg focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
              />
            </div>
          </form>

          {/* Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link to="/wishlist" className="relative p-2 rounded-lg hover:bg-slate-100 transition" aria-label="Wishlist">
              <FiHeart className="w-5 h-5" />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {wishCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative p-2 rounded-lg hover:bg-slate-100 transition" aria-label="Cart">
              <FiShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="hidden sm:flex p-2 rounded-lg hover:bg-slate-100 transition" aria-label="Account">
              <FiUser className="w-5 h-5" />
            </button>
            <button
              onClick={() => setOpen(o => !o)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition"
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-slate-100 py-3 animate-fade-in">
            <form onSubmit={submit} className="md:hidden mb-3">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="input pl-10"
                />
              </div>
            </form>
            <nav className="flex flex-col">
              {navLinks.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-medium ${
                      isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
