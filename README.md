# Poshcady — Sweatshirt Store

A very simple 2-page ecommerce site built with React, Vite, Tailwind CSS,
and React Router.

## Pages

1. **Shop** (`/`) — product grid of three sweatshirt colorways (Clay, Jet,
   Bone). Pick a size and add to cart directly from the card.
2. **Cart** (`/cart`) — review items, adjust quantity, remove items, see
   subtotal/shipping/total, and place the order (a simple confirmation
   screen — no real payment processing).

Cart state is shared between the two pages via React Context
(`src/context/CartContext.jsx`) and lives only in memory for the session.

## Getting started

Requires Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the printed local URL (default `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
sweatshirt-store/
├── index.html
├── src/
│   ├── main.jsx              App entry, router + StrictMode
│   ├── App.jsx                 Routes, Nav, footer
│   ├── index.css               Tailwind directives
│   ├── context/
│   │   └── CartContext.jsx    Cart state (add/remove/update qty)
│   ├── data/
│   │   └── products.js         The 3 sweatshirt colorways
│   ├── components/
│   │   └── Nav.jsx             Header nav with cart count
│   └── pages/
│       ├── Shop.jsx            Page 1 — product grid
│       └── Cart.jsx            Page 2 — cart & checkout
├── public/images/               Product photos
├── tailwind.config.js
└── vite.config.js
```

## Editing

- Change products, prices, or descriptions in `src/data/products.js`.
- Swap product photos in `public/images/`.
- Colors and fonts live in `tailwind.config.js`.
