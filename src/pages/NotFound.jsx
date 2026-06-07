import { Link } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-8xl mb-4">🛒</div>
      <h1 className="text-5xl font-extrabold text-slate-900 mb-3">404</h1>
      <p className="text-xl text-slate-600 mb-8">Oops! We couldn't find that page.</p>
      <Link to="/" className="btn-primary">
        <FiHome className="w-4 h-4" /> Back to home
      </Link>
    </div>
  )
}
