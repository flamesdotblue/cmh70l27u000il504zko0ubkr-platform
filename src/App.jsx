import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import HomePage from './components/HomePage.jsx';
import ProductSection from './components/ProductSection.jsx';
import Footer from './components/Footer.jsx';

const initialProducts = [
  {
    id: 'v1',
    name: 'Vitamin C 1000mg',
    category: 'Vitamins',
    price: 14.99,
    images: ['/images/vitamin-c.jpg'],
    rating: 4.6,
    reviews: [
      { id: 'r1', user: 'Alex', rating: 5, text: 'Great boost to my immune system.' },
      { id: 'r2', user: 'Priya', rating: 4, text: 'Easy to swallow and effective.' },
    ],
    description:
      'High-potency Vitamin C to support immune health, collagen production, and antioxidant protection.',
    benefits: [
      'Supports immune function',
      'Promotes collagen synthesis',
      'Antioxidant support',
    ],
    ingredients: 'Ascorbic Acid (Vitamin C), Citrus Bioflavonoids, Vegetarian Capsule',
    usage: 'Take 1 capsule daily with food or as directed by a healthcare professional.',
  },
  {
    id: 's1',
    name: 'Omega-3 Fish Oil',
    category: 'Supplements',
    price: 24.0,
    images: ['/images/omega-3.jpg'],
    rating: 4.7,
    reviews: [
      { id: 'r1', user: 'Jordan', rating: 5, text: 'No fishy aftertaste, great quality.' },
    ],
    description:
      'Premium omega-3 fish oil to support heart, brain, and joint health with high EPA/DHA.',
    benefits: ['Heart and brain support', 'Joint comfort', 'Purity tested'],
    ingredients: 'Fish Oil Concentrate, Gelatin (capsule), Glycerin, Purified Water',
    usage: 'Take 2 softgels daily with meals or as directed by a healthcare professional.',
  },
  {
    id: 'h1',
    name: 'Organic Chamomile Tea',
    category: 'Herbal Teas',
    price: 8.5,
    images: ['/images/chamomile.jpg'],
    rating: 4.5,
    reviews: [
      { id: 'r1', user: 'Taylor', rating: 5, text: 'Calming and aromatic before bed.' },
    ],
    description:
      'Soothing organic chamomile blossoms for calm evenings and restful sleep.',
    benefits: ['Relaxation', 'Digestive comfort', 'Caffeine-free'],
    ingredients: '100% Organic Chamomile Blossoms',
    usage: 'Steep 1 bag in hot water for 5-7 minutes. Enjoy warm.',
  },
  {
    id: 'm1',
    name: 'Magnesium Glycinate',
    category: 'Minerals',
    price: 18.99,
    images: ['/images/magnesium.jpg'],
    rating: 4.8,
    reviews: [
      { id: 'r1', user: 'Sam', rating: 5, text: 'Improved sleep and reduced muscle cramps.' },
    ],
    description:
      'Highly bioavailable magnesium glycinate for muscle relaxation, sleep, and nerve health.',
    benefits: ['Sleep support', 'Muscle relaxation', 'Gentle on stomach'],
    ingredients: 'Magnesium Glycinate, Vegetarian Capsule',
    usage: 'Take 2 capsules in the evening or as directed by a healthcare professional.',
  },
];

export default function App() {
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((p) => {
      const categoryMatch = category === 'All' || p.category === category;
      const searchMatch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.benefits.join(' ').toLowerCase().includes(query);
      return categoryMatch && searchMatch;
    });
  }, [products, search, category]);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  function addToCart(product, qty = 1) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty }];
    });
  }

  function updateQty(id, qty) {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-gray-900">
      <Navbar
        cartCount={cartCount}
        onSearch={setSearch}
        onSelectCategory={setCategory}
        activeCategory={category}
        onOpenCheckout={() => setShowCheckout(true)}
      />

      <main>
        <HomePage onShopNow={() => window.scrollTo({ top: 560, behavior: 'smooth' })} />

        <ProductSection
          products={filtered}
          allProducts={products}
          onAddToCart={(p) => addToCart(p, 1)}
          onSelectProduct={setSelectedProduct}
          selectedProduct={selectedProduct}
          onCloseProduct={() => setSelectedProduct(null)}
        />
      </main>

      <Footer />

      {showCheckout && (
        <CheckoutModal
          cart={cart}
          products={products}
          onClose={() => setShowCheckout(false)}
          updateQty={updateQty}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />
      )}
    </div>
  );
}

function CheckoutModal({ cart, products, onClose, updateQty, removeFromCart, clearCart }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    zip: '',
    payment: 'card',
  });

  const items = cart.map((c) => ({ ...c, product: products.find((p) => p.id === c.id) }));
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 4.99;
  const total = (subtotal + shipping).toFixed(2);

  function placeOrder() {
    // In a real app, integrate a payment gateway.
    alert('Order placed successfully!');
    clearCart();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full sm:max-w-3xl sm:rounded-2xl bg-white shadow-xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Secure Checkout</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="grid sm:grid-cols-2 gap-0">
          <div className="p-6 border-r">
            <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
              <span className={step === 1 ? 'font-semibold text-emerald-700' : ''}>1. Cart</span>
              <span>›</span>
              <span className={step === 2 ? 'font-semibold text-emerald-700' : ''}>2. Details</span>
              <span>›</span>
              <span className={step === 3 ? 'font-semibold text-emerald-700' : ''}>3. Payment</span>
            </div>
            {step === 1 && (
              <div className="space-y-4">
                {items.length === 0 && <p className="text-gray-600">Your cart is empty.</p>}
                {items.map((i) => (
                  <div key={i.id} className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded bg-emerald-50 flex items-center justify-center text-emerald-700 text-xs">
                      {i.product?.name?.split(' ').slice(0,2).join(' ')}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{i.name}</div>
                      <div className="text-sm text-gray-600">${i.price.toFixed(2)}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="number"
                          min={1}
                          className="w-16 border rounded px-2 py-1"
                          value={i.qty}
                          onChange={(e) => updateQty(i.id, Number(e.target.value))}
                        />
                        <button onClick={() => removeFromCart(i.id)} className="text-red-600 text-sm">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between border-t pt-3 text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={items.length === 0}
                    onClick={() => setStep(2)}
                    className="flex-1 bg-emerald-600 text-white rounded-lg py-2 disabled:opacity-50"
                  >
                    Continue
                  </button>
                  <button onClick={onClose} className="px-4 py-2 rounded-lg border">Close</button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-3">
                <input
                  className="w-full border rounded px-3 py-2"
                  placeholder="Email (for receipt)"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                  className="w-full border rounded px-3 py-2"
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  className="w-full border rounded px-3 py-2"
                  placeholder="Address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    className="w-full border rounded px-3 py-2"
                    placeholder="City"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                  <input
                    className="w-full border rounded px-3 py-2"
                    placeholder="ZIP / Postal code"
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                  />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setStep(1)} className="px-4 py-2 rounded-lg border">Back</button>
                  <button onClick={() => setStep(3)} className="flex-1 bg-emerald-600 text-white rounded-lg py-2">Continue</button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    id="pay-card"
                    type="radio"
                    checked={form.payment === 'card'}
                    onChange={() => setForm({ ...form, payment: 'card' })}
                  />
                  <label htmlFor="pay-card" className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-emerald-600 text-white text-[10px]">💳</span>
                    Credit/Debit Card
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="pay-paypal"
                    type="radio"
                    checked={form.payment === 'paypal'}
                    onChange={() => setForm({ ...form, payment: 'paypal' })}
                  />
                  <label htmlFor="pay-paypal" className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-white text-[10px]">PP</span>
                    PayPal
                  </label>
                </div>
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded bg-emerald-100 text-emerald-700">✔</span>
                  Payments are encrypted. We never store full card details.
                </p>
                <div className="flex gap-2">
                  <button onClick={() => setStep(2)} className="px-4 py-2 rounded-lg border">Back</button>
                  <button onClick={placeOrder} className="flex-1 bg-emerald-600 text-white rounded-lg py-2">Place Order</button>
                </div>
              </div>
            )}
          </div>
          <div className="p-6 bg-emerald-50/60">
            <h4 className="font-semibold mb-3">Order Summary</h4>
            <div className="space-y-2 max-h-64 overflow-auto pr-1">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between text-sm">
                  <span>
                    {i.name} × {i.qty}
                  </span>
                  <span>${(i.price * i.qty).toFixed(2)}</span>
                </div>
              ))}
              {items.length === 0 && <p className="text-sm text-gray-600">No items yet.</p>}
            </div>
            <div className="mt-3 border-t pt-3 text-sm space-y-1">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between font-semibold"><span>Total</span><span>${total}</span></div>
            </div>
            <div className="mt-4 text-xs text-gray-600 space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded bg-emerald-600 text-white text-[10px]">🔒</span>
                Secure checkout with SSL
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded bg-gray-800 text-white text-[10px]">GDPR</span>
                GDPR compliant data handling
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
