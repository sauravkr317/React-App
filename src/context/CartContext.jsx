import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'shopzen_cart_v1'

const initializer = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.find(i => i.id === action.product.id)
      if (exists) {
        return state.map(i => i.id === action.product.id
          ? { ...i, qty: Math.min(i.qty + (action.qty || 1), 99) }
          : i)
      }
      return [...state, { ...action.product, qty: action.qty || 1 }]
    }
    case 'REMOVE':
      return state.filter(i => i.id !== action.id)
    case 'SET_QTY':
      return state.map(i => i.id === action.id
        ? { ...i, qty: Math.max(1, Math.min(action.qty, 99)) }
        : i)
    case 'CLEAR':
      return []
    case 'INIT':
      return action.payload
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, initializer)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) } catch {}
  }, [items])

  const value = useMemo(() => {
    const count = items.reduce((s, i) => s + i.qty, 0)
    const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0)
    return {
      items,
      count,
      subtotal,
      addItem: (product, qty = 1) => dispatch({ type: 'ADD', product, qty }),
      removeItem: id => dispatch({ type: 'REMOVE', id }),
      setQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
      clearCart: () => dispatch({ type: 'CLEAR' })
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
