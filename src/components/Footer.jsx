import { Link } from 'react-router-dom'
import { FiMail, FiTwitter, FiInstagram, FiGithub, FiSend } from 'react-icons/fi'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const subscribe = (e) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setDone(true)
    setEmail('')
    setTimeout(() => setDone(false), 3000)
  }

  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold">S</div>
            <span className="text-xl font-bold text-white">ShopZen</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Curated products, fair prices. Built for a smooth shopping experience on any device.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="#" aria-label="Twitter"   className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-600 flex items-center justify-center transition"><FiTwitter className="w-4 h-4" /></a>
            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-600 flex items-center justify-center transition"><FiInstagram className="w-4 h-4" /></a>
            <a href="#" aria-label="GitHub"    className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-600 flex items-center justify-center transition"><FiGithub className="w-4 h-4" /></a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop"                  className="hover:text-white transition">All Products</Link></li>
            <li><Link to="/shop?cat=electronics"  className="hover:text-white transition">Electronics</Link></li>
            <li><Link to="/shop?cat=jewelery"     className="hover:text-white transition">Jewelry</Link></li>
            <li><Link to="/shop?cat=men's clothing"   className="hover:text-white transition">Men's Clothing</Link></li>
            <li><Link to="/shop?cat=women's clothing" className="hover:text-white transition">Women's Clothing</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
            <li><a href="#" className="hover:text-white transition">Press</a></li>
            <li><a href="#" className="hover:text-white transition">Sustainability</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Stay in the loop</h3>
          <p className="text-sm text-slate-400 mb-3">Get exclusive deals & new arrivals in your inbox.</p>
          <form onSubmit={subscribe} className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-12 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 transition"
            />
            <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-brand-600 hover:bg-brand-700 text-white transition" aria-label="Subscribe">
              <FiSend className="w-4 h-4" />
            </button>
          </form>
          {done && <p className="text-xs text-emerald-400 mt-2">Thanks for subscribing! 🎉</p>}
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ShopZen. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
