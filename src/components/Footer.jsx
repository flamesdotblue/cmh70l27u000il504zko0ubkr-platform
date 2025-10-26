import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-4 gap-8 text-sm">
        <div className="sm:col-span-2">
          <a href="#" className="text-emerald-700 font-extrabold text-xl tracking-tight">Leaf&Lift</a>
          <p className="mt-3 text-gray-600">
            Your trusted shop for vitamins, supplements, herbal teas, and minerals. We prioritize science-backed formulas and a smooth shopping experience.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-2">Shop</div>
          <ul className="space-y-1 text-gray-700">
            <li><a href="#" className="hover:underline">Vitamins</a></li>
            <li><a href="#" className="hover:underline">Supplements</a></li>
            <li><a href="#" className="hover:underline">Herbal Teas</a></li>
            <li><a href="#" className="hover:underline">Minerals</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Support</div>
          <ul className="space-y-1 text-gray-700">
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#" className="hover:underline">Shipping & Returns</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} Leaf&Lift. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1"><span className="inline-flex h-4 w-4 items-center justify-center rounded bg-emerald-100">✔</span>SSL Secure</span>
            <span className="inline-flex items-center gap-1"><span className="inline-flex h-4 w-4 items-center justify-center rounded bg-emerald-100">✔</span>GDPR Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
