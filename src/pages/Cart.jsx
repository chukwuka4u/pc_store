import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { writeOrder } from '../lib/config/firebase/app.js'

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
        ₦{(item.price * item.qty).toFixed(2)}
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
  const [orderId, setOrderId] = useState(null)

  const shipping = items.length === 0 ? 0 : 2000
  const total = subtotal + shipping
  
  function copyToClipboard() {
        const textToCopy = orderId;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert("Text copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err);
            })
            .finally(() => close);
    };

  if (placed) {
    return (
      <main className="max-w-md mx-auto px-6 py-28 text-center">
        <h1 className="text-3xl font-extrabold mb-3">Order placed ✓</h1>
        <p className="text-stone mb-8">
          <div className="mt-4">
            <p className="text-sm">
                Your order number is: {orderId}
            </p>
            <button
                onClick={copyToClipboard}
            >
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                    </svg>
                </div>
            </button>
          </div>
          <br />
          First send your order number to: <a href="https://wa.me/07035710986" className="text-ink underline">
          Whatsapp
          </a> <br />
          then make payment and send receipt. <br />
          <span> 6370669097 </span> <br />
          Fidelity Bank <br />
          Account Name: CHUKWUKADIBIA EMMANUEL MADUABUCHUKWU <br />
          NB: all deliveries are made on weekends. 
          Thanks for shopping with Poshcady.
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
              <span>₦{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone">
              <span>Shipping</span>
              <span>₦{shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t border-line">
              <span>Total</span>
              <span>₦{total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => {
                writeOrder(items).then((id) => {
                  setPlaced(true);
                  setOrderId(id);
                });
              }}
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
