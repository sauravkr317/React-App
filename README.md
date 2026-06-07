# ShopZen — Advanced Responsive E-commerce (React + Vite + Tailwind)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff.svg)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8.svg)](https://tailwindcss.com)

A modern, fully responsive e-commerce web app built with **React 18**, **Vite**, **Tailwind CSS**, and **React Router**. Designed mobile-first with a clean, component-driven architecture.

## ✨ Features

- 🛍️ **Product catalog** powered by the [Fake Store API](https://fakestoreapi.com/) — 100+ real products across multiple categories
- 🛒 **Shopping cart** with `localStorage` persistence — add / remove / update quantities across page reloads
- ❤️ **Wishlist** — save favorites with a single click
- 🔍 **Search & filtering** — by category, price range, sort order (price, name, rating)
- 👀 **Quick view modal** — see product details without leaving the page
- 📦 **Product detail pages** with description / reviews / shipping tabs and "you may also like" suggestions
- 💳 **Multi-step checkout** with order confirmation screen
- 📱 **Fully responsive** — optimized layouts for mobile, tablet, and desktop
- 🎨 **Beautiful UI** — gradient hero, animated cards, glass-effect navbar, skeleton loaders, toast notifications
- 🛟 **Offline fallback** — works without network using bundled local mock data
- ♿ **Accessible** — keyboard navigation, ARIA labels, semantic HTML, focus-visible rings

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the URL printed in the terminal (default: http://localhost:3000)
```

### Production build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
shopzen/
├── public/                 # Static assets (favicon, etc.)
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── QuickViewModal.jsx
│   │   ├── SkeletonCard.jsx
│   │   ├── RatingStars.jsx
│   │   ├── EmptyState.jsx
│   │   └── Toast.jsx
│   ├── context/            # State management
│   │   ├── CartContext.jsx
│   │   ├── WishlistContext.jsx
│   │   └── ToastContext.jsx
│   ├── pages/              # Route-level pages
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Checkout.jsx
│   │   └── NotFound.jsx
│   ├── data/               # Data layer
│   │   ├── api.js          # Fake Store API + helpers
│   │   └── fallback.js     # Offline mock data
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css           # Tailwind + design tokens
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## 🧰 Tech Stack

| Concern        | Tool                         |
|----------------|------------------------------|
| UI Framework   | React 18                     |
| Bundler        | Vite 5                       |
| Styling        | Tailwind CSS 3               |
| Routing        | React Router v6              |
| Icons          | react-icons (Feather set)    |
| Data source    | Fake Store API + local fallback |

## 🎯 Design Notes

- **Mobile-first** breakpoints: `sm` 640, `md` 768, `lg` 1024, `xl` 1280
- **Cart & Wishlist** are React-Context + `useReducer` with auto-persistence to `localStorage`
- **Filtering state** is encoded in the URL query string — shareable & back-button friendly
- **Image fallbacks** — broken images are replaced by generated placeholders
- **A11y** — `aria-label`, `aria-modal`, semantic landmarks, keyboard-friendly quick view (Esc to close)

## 🧪 Test It

Try these flows once the dev server is up:

1. Browse the **Home** page → click a product → use the **Quick View** button on any card
2. On the **Shop** page, switch categories, change price, and try a search query
3. Add a few items to **Cart** — refresh the page — your cart persists
4. Toggle a few **Wishlist** hearts
5. Go to **Cart** → **Checkout** → fill the form → see the success screen

---

Built with care. Happy shopping! 🛍️
