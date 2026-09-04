import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import Nav from './components/Nav.jsx'
import Shop from './pages/Shop.jsx'
import Cart from './pages/Cart.jsx'

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-paper text-ink">
        <Nav />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <footer className="mt-auto border-t border-line py-6 text-center text-sm text-stone">
          © {new Date().getFullYear()} Poshcady. All rights reserved.
        </footer>
      </div>
    </CartProvider>
  )
}
