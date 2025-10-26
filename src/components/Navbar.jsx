import React, { useState } from 'react';

export default function Navbar({ cartCount, onSearch, onSelectCategory, activeCategory, onOpenCheckout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const categories = ['All', 'Vitamins', 'Supplements', 'Herbal Teas', 'Minerals'];

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border"
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <a href="#" className="text-emerald-700 font-extrabold text-xl tracking-tight">Leaf&Lift</a>

        <nav className="hidden md:flex items-center gap-1 ml-4">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => onSelectCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-sm ${activeCategory === c ? 'bg-emerald-600 text-white' : 'hover:bg-emerald-50'}`}
            >
              {c}
            </button>
          ))}
        </nav>

        <div className="flex-1" />

        <div className="relative hidden md:block w-full max-w-md">
          <input
            type="search"
            placeholder="Search vitamins, teas, minerals..."
            className="w-full pl-10 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onChange={(e) => onSearch(e.target.value)}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
        </div>

        <button
          onClick={onOpenCheckout}
          className="relative ml-3 inline-flex items-center gap-2 rounded-lg border px-3 py-2 hover:bg-emerald-50"
        >
          <span>🛒</span>
          <span className="text-sm">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t">
          <div className="px-4 py-3 space-y-2">
            <div className="relative">
              <input
                type="search"
                placeholder="Search products"
                className="w-full pl-10 pr-3 py-2 rounded-lg border"
                onChange={(e) => onSearch(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    onSelectCategory(c);
                    setMenuOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-sm ${activeCategory === c ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
