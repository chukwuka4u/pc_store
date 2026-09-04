import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Nav() {
  const { count } = useCart()

  return (
    <header className="border-b border-line bg-paper sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-extrabold text-xl tracking-tight">
          <img
          src={"../../public/logo.png"}
          alt="Poshcady"
          className="w-16 h-auto"
        />
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-accent transition-colors">
            Shop
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center gap-2 border border-ink px-4 py-2 rounded-full hover:bg-ink hover:text-paper transition-colors"
          >
            Cart
            {count > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs rounded-full bg-accent text-white">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
