// Data layer for ShopZen — talks to fakestoreapi.com
// Includes a graceful fallback to local mock data if the network fails.

import { FALLBACK_PRODUCTS, FALLBACK_CATEGORIES } from './fallback'

const BASE = 'https://fakestoreapi.com'

async function safeFetch(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout?.(8000) })
    if (!res.ok) throw new Error('Network error')
    return await res.json()
  } catch {
    return null
  }
}

export async function getAllProducts() {
  const data = await safeFetch(`${BASE}/products`)
  if (data && Array.isArray(data) && data.length) return data
  return FALLBACK_PRODUCTS
}

export async function getCategories() {
  const data = await safeFetch(`${BASE}/products/categories`)
  if (data && Array.isArray(data) && data.length) {
    return ['all', ...data]
  }
  return FALLBACK_CATEGORIES
}

export async function getProduct(id) {
  const data = await safeFetch(`${BASE}/products/${id}`)
  if (data && data.id) return data
  return FALLBACK_PRODUCTS.find(p => String(p.id) === String(id)) || null
}

export async function getProductsByCategory(cat) {
  if (!cat || cat === 'all') return getAllProducts()
  const data = await safeFetch(`${BASE}/products/category/${encodeURIComponent(cat)}`)
  if (data && data.length) return data
  return FALLBACK_PRODUCTS.filter(p => p.category === cat)
}

export function sortProducts(list, sortBy) {
  const arr = [...list]
  switch (sortBy) {
    case 'price-asc':  return arr.sort((a, b) => a.price - b.price)
    case 'price-desc': return arr.sort((a, b) => b.price - a.price)
    case 'name-asc':   return arr.sort((a, b) => a.title.localeCompare(b.title))
    case 'name-desc':  return arr.sort((a, b) => b.title.localeCompare(a.title))
    case 'rating':     return arr.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
    default:           return arr
  }
}

export function filterByPrice(list, maxPrice) {
  if (!maxPrice) return list
  return list.filter(p => p.price <= maxPrice)
}

export function searchProducts(list, query) {
  if (!query) return list
  const q = query.toLowerCase().trim()
  return list.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  )
}

export function categoryEmoji(cat) {
  return {
    electronics: '💻',
    jewelery:    '💎',
    "men's clothing": '👔',
    "women's clothing": '👗',
    all: '🛍️'
  }[cat] || '🛍️'
}

export const formatPrice = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
