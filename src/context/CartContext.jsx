import { createContext, useContext, useState, useMemo } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // { id, name, price, image, size, qty }

  function addItem(product, size, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.size === size)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.size === size ? { ...i, qty: i.qty + qty } : i
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          qty,
        },
      ]
    })
  }

  function removeItem(id, size) {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)))
  }

  function updateQty(id, size, qty) {
    if (qty < 1) return
    setItems((prev) =>
      prev.map((i) => (i.id === id && i.size === size ? { ...i, qty } : i))
    )
  }

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.qty * i.price, 0),
    [items]
  )

  const value = { items, addItem, removeItem, updateQty, count, subtotal }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
