import React, { useMemo, useState } from 'react';

export default function ProductSection({ products, allProducts, onAddToCart, onSelectProduct, selectedProduct, onCloseProduct }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <header className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Shop Products</h2>
          <p className="text-gray-600">Vitamins, supplements, herbal teas, and essential minerals.</p>
        </div>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={() => onAddToCart(p)} onOpen={() => onSelectProduct(p)} />
        ))}
        {products.length === 0 && (
          <div className="col-span-full text-center text-gray-600">No products match your search.</div>
        )}
      </div>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={onCloseProduct}
          onAdd={() => onAddToCart(selectedProduct)}
        />
      )}

      <AssuranceBanner />
    </section>
  );
}

function ProductCard({ product, onAdd, onOpen }) {
  return (
    <div className="group rounded-2xl border bg-white/70 overflow-hidden hover:shadow-sm transition">
      <div className="aspect-[4/3] bg-emerald-50 flex items-center justify-center">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 200\"><rect width=\"100%\" height=\"100%\" fill=\"#ecfdf5\"/><text x=\"50%\" y=\"50%\" dominant-baseline=\"middle\" text-anchor=\"middle\" fill=\"#047857\" font-size=\"16\">${product.category}</text></svg>`);
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold">{product.name}</h3>
            <div className="text-sm text-gray-600">{product.category}</div>
          </div>
          <div className="font-semibold">${product.price.toFixed(2)}</div>
        </div>
        <div className="mt-2 flex items-center gap-1 text-amber-500 text-sm" aria-label={`${product.rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{i < Math.round(product.rating) ? '★' : '☆'}</span>
          ))}
          <span className="ml-1 text-gray-600">{product.rating.toFixed(1)}</span>
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={onOpen} className="flex-1 rounded-lg border px-3 py-2 hover:bg-emerald-50">View</button>
          <button onClick={onAdd} className="flex-1 rounded-lg bg-emerald-600 text-white px-3 py-2 hover:bg-emerald-700">Add</button>
        </div>
      </div>
    </div>
  );
}

function ProductDetail({ product, onClose, onAdd }) {
  const [qty, setQty] = useState(1);
  const [question, setQuestion] = useState('');

  function submitQuestion(e) {
    e.preventDefault();
    if (!question.trim()) return;
    alert('Question submitted! Our team will reply via email.');
    setQuestion('');
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-3xl rounded-2xl overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2">
          <div className="bg-emerald-50 p-6 flex items-center justify-center">
            <img
              src={product.images[0]}
              alt={product.name}
              className="max-h-64 object-contain"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <button onClick={onClose} className="text-gray-500">✕</button>
            </div>
            <div className="text-sm text-gray-600">{product.category}</div>
            <div className="mt-2 text-2xl font-bold text-emerald-700">${product.price.toFixed(2)}</div>

            <p className="mt-3 text-gray-700">{product.description}</p>
            <ul className="mt-3 text-sm list-disc list-inside text-gray-700 space-y-1">
              {product.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="mt-3 text-sm text-gray-600">
              <span className="font-medium text-gray-800">Ingredients:</span> {product.ingredients}
            </div>
            <div className="mt-1 text-sm text-gray-600">
              <span className="font-medium text-gray-800">Usage:</span> {product.usage}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                className="w-20 border rounded px-2 py-2"
              />
              <button onClick={() => onAdd(product, qty)} className="flex-1 bg-emerald-600 text-white rounded-lg px-4 py-2">
                Add to Cart
              </button>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold">Customer Reviews</h4>
              <div className="mt-2 space-y-2 max-h-28 overflow-auto pr-1">
                {product.reviews.map((r) => (
                  <div key={r.id} className="text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{r.user}</span>
                      <span className="text-amber-500">{'★'.repeat(r.rating)}</span>
                    </div>
                    <p className="text-gray-700">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={submitQuestion} className="mt-6">
              <label className="block text-sm font-medium">Ask a question</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={3}
                className="mt-1 w-full border rounded px-3 py-2"
                placeholder="What would you like to know about this product?"
              />
              <button className="mt-2 px-3 py-2 rounded-lg border hover:bg-emerald-50">Submit Question</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function AssuranceBanner() {
  const pillars = [
    { title: 'Secure Payments', text: 'Encrypted checkout and data protection.', icon: '🔒' },
    { title: 'Fast Shipping', text: 'Free delivery over $50.', icon: '🚚' },
    { title: 'Quality Assured', text: 'Third-party tested ingredients.', icon: '🧪' },
  ];
  return (
    <div className="mt-10 grid sm:grid-cols-3 gap-4">
      {pillars.map((p) => (
        <div key={p.title} className="rounded-2xl border p-4 bg-white/70 flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center text-lg">{p.icon}</div>
          <div>
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm text-gray-600">{p.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
