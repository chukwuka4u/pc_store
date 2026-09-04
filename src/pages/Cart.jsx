import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'

function CartRow({ item }) {
  const { updateQty, removeItem } = useCart()

  return (
    <div className="flex items-center gap-4 py-5 border-b border-line">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 rounded-xl object-cover bg-white border border-line"
      />

      <div className="flex-1">
        <p className="font-semibold">{item.name}</p>
        <p className="text-sm text-stone">Size {item.size}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQty(item.id, item.size, item.qty - 1)}
          className="w-8 h-8 rounded-full border border-line hover:border-ink transition-colors"
        >
          −
        </button>
        <span className="w-6 text-center">{item.qty}</span>
        <button
          onClick={() => updateQty(item.id, item.size, item.qty + 1)}
          className="w-8 h-8 rounded-full border border-line hover:border-ink transition-colors"
        >
          +
        </button>
      </div>

      <p className="w-16 text-right font-semibold">
        ${(item.price * item.qty).toFixed(2)}
      </p>

      <button
        onClick={() => removeItem(item.id, item.size)}
        className="text-stone hover:text-red-500 text-sm ml-2"
        aria-label={`Remove ${item.name}`}
      >
        Remove
      </button>
    </div>
  )
}

export default function Cart() {
  const { items, subtotal } = useCart()
  const [placed, setPlaced] = useState(false)

  const shipping = items.length === 0 ? 0 : 6
  const total = subtotal + shipping

  if (placed) {
    return (
      <main className="max-w-md mx-auto px-6 py-28 text-center">
        <h1 className="text-3xl font-extrabold mb-3">Order placed ✓</h1>
        <p className="text-stone mb-8">
          Thanks for shopping with Poshcady. A confirmation would normally be
          sent to your email.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-full bg-ink text-paper font-medium hover:bg-accent transition-colors"
        >
          Back to shop
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-stone mb-6">Your cart is empty.</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-full bg-ink text-paper font-medium hover:bg-accent transition-colors"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <div>
            {items.map((item) => (
              <CartRow key={`${item.id}-${item.size}`} item={item} />
            ))}
          </div>

          <div className="mt-8 space-y-2 max-w-sm ml-auto">
            <div className="flex justify-between text-stone">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t border-line">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => setPlaced(true)}
              className="w-full mt-4 py-3 rounded-full bg-ink text-paper font-medium hover:bg-accent transition-colors"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </main>
  )
}
