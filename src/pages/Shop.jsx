import { useState } from 'react'
import products from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

const SIZES = ['L', 'XL', '2XL', '3XL']

function ProductCard({ product }) {
  const { addItem } = useCart()
  const [size, setSize] = useState('M')
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem(product, size, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <div className="bg-white border border-line rounded-2xl overflow-hidden flex flex-col">
      <div className="aspect-square bg-paper">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
            <p className="text-sm text-stone">{product.color}</p>
          </div>
          <p className="font-semibold">${product.price}</p>
        </div>

        <p className="text-sm text-stone leading-relaxed">{product.description}</p>

        <div className="mt-auto flex flex-col gap-3 pt-2">
          <div className="flex gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`w-9 h-9 rounded-full text-xs font-medium border transition-colors ${
                  size === s
                    ? 'bg-ink text-paper border-ink'
                    : 'border-line text-ink hover:border-ink'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            onClick={handleAdd}
            className="w-full py-2.5 rounded-full bg-ink text-paper text-sm font-medium hover:bg-accent transition-colors"
          >
            {added ? 'Added ✓' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Shop() {
  return (
    <main>
      <section className="max-w-5xl mx-auto px-6 pt-14 pb-10 text-center">
        <p className="text-xs uppercase tracking-widest text-stone mb-3">
          New arrival
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          The Everyday Sweatshirt
        </h1>
        <p className="text-stone max-w-md mx-auto">
          One relaxed, oversized fit. Heavyweight brushed fleece. Available in
          six colorways.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </main>
  )
}
