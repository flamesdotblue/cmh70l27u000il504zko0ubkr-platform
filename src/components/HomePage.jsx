import React from 'react';

export default function HomePage({ onShopNow }) {
  return (
    <section>
      <Hero onShopNow={onShopNow} />
      <Highlights />
      <BlogPreview />
      <ContactAndNewsletter />
    </section>
  );
}

function Hero({ onShopNow }) {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-14 sm:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-emerald-900">
            Elevate your wellness with trusted vitamins, teas, and supplements
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            Thoughtfully curated, quality-tested essentials to support immunity, energy, sleep, and more.
          </p>
          <div className="mt-6 flex gap-3">
            <button onClick={onShopNow} className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700">
              Shop Featured
            </button>
            <a href="#blog" className="px-6 py-3 rounded-lg border hover:bg-white">Read Wellness Tips</a>
          </div>
          <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2"><span className="inline-flex h-5 w-5 items-center justify-center rounded bg-emerald-100">✔</span>GMP Certified</div>
            <div className="flex items-center gap-2"><span className="inline-flex h-5 w-5 items-center justify-center rounded bg-emerald-100">✔</span>Third-Party Tested</div>
            <div className="flex items-center gap-2"><span className="inline-flex h-5 w-5 items-center justify-center rounded bg-emerald-100">✔</span>Fast Shipping</div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-emerald-200 to-emerald-50 border shadow-inner" />
          <img
            src="/images/hero-bottles.png"
            alt="Assorted wellness products"
            className="absolute -bottom-6 -right-6 w-[70%] max-w-sm drop-shadow-xl hidden sm:block"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        </div>
      </div>
    </div>
  );
}

function Highlights() {
  const features = [
    { title: 'Featured', text: 'Explore customer-favorite essentials handpicked by our nutrition team.' },
    { title: 'Bestsellers', text: 'Shop our most-loved formulas with thousands of 5-star reviews.' },
    { title: 'New Arrivals', text: 'Discover the latest in herbal wellness and clean-label nutrition.' },
  ];
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-3 gap-6">
      {features.map((f) => (
        <div key={f.title} className="rounded-2xl border p-5 bg-white/70 backdrop-blur hover:shadow-sm transition">
          <div className="h-10 w-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-semibold mb-3">
            {f.title[0]}
          </div>
          <h3 className="font-semibold text-lg">{f.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{f.text}</p>
        </div>
      ))}
    </div>
  );
}

function BlogPreview() {
  const posts = [
    {
      id: 'b1',
      title: '7 Everyday Habits to Boost Immunity',
      excerpt: 'Small, consistent choices for a stronger immune system.',
      tag: 'Health Tips',
    },
    {
      id: 'b2',
      title: 'Herbal Teas for Calm and Focus',
      excerpt: 'Chamomile, peppermint, and more for mindful moments.',
      tag: 'Herbal',
    },
    {
      id: 'b3',
      title: 'Magnesium: The Mineral Most of Us Need',
      excerpt: 'Why magnesium glycinate is gentle yet effective.',
      tag: 'Minerals',
    },
  ];

  return (
    <section id="blog" className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">From the Wellness Blog</h2>
          <p className="text-gray-600">Evidence-backed guidance for everyday health.</p>
        </div>
        <a href="#" className="text-emerald-700 hover:underline">View all</a>
      </div>
      <div className="grid sm:grid-cols-3 gap-6">
        {posts.map((p) => (
          <article key={p.id} className="rounded-2xl border p-5 bg-white/70">
            <div className="text-xs inline-flex px-2 py-1 rounded-full bg-emerald-50 text-emerald-800">{p.tag}</div>
            <h3 className="mt-3 font-semibold text-lg">{p.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{p.excerpt}</p>
            <a className="text-sm text-emerald-700 mt-3 inline-block" href="#">Read more →</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactAndNewsletter() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-8">
      <div className="rounded-2xl border bg-white/70 p-6">
        <h3 className="text-xl font-semibold">Contact Us</h3>
        <p className="text-gray-600 text-sm">Questions or feedback? Were here to help.</p>
        <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
          <input className="w-full border rounded px-3 py-2" placeholder="Your name" />
          <input className="w-full border rounded px-3 py-2" placeholder="Email address" type="email" />
          <textarea className="w-full border rounded px-3 py-2" placeholder="How can we help?" rows={4} />
          <button className="bg-emerald-600 text-white rounded-lg px-4 py-2">Send Message</button>
        </form>
        <div className="mt-3 text-xs text-gray-600 flex items-center gap-2">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded bg-emerald-100">✉</span>
          support@leafandlift.com
        </div>
      </div>
      <div className="rounded-2xl border bg-gradient-to-br from-emerald-100 to-white p-6">
        <h3 className="text-xl font-semibold">Get wellness tips and offers</h3>
        <p className="text-gray-600 text-sm">Join our newsletter for research-backed insights and early promos.</p>
        <form className="mt-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
          <input className="flex-1 border rounded px-3 py-2" placeholder="Enter your email" type="email" />
          <button className="bg-emerald-700 text-white rounded-lg px-4">Subscribe</button>
        </form>
        <p className="text-xs text-gray-600 mt-2">By subscribing, you agree to our privacy policy.</p>
      </div>
    </section>
  );
}
