import { useEffect, useState } from 'react'

const navLinks = ['Features', 'Pricing', 'Customers', 'FAQ']

const features = [
  { icon: '📊', bg: 'bg-indigo-50', title: 'Real-time dashboards', text: 'See every key metric update live, with charts your whole team understands.' },
  { icon: '🤖', bg: 'bg-cyan-50', title: 'AI insights', text: 'Get automatic alerts and plain-English explanations when something changes.' },
  { icon: '🔗', bg: 'bg-emerald-50', title: '50+ integrations', text: 'Connect Stripe, HubSpot, Slack and more in just a few clicks.' },
  { icon: '🔒', bg: 'bg-amber-50', title: 'Secure by default', text: 'Role-based access, SSO and encrypted data for teams of any size.' },
  { icon: '⚡', bg: 'bg-rose-50', title: 'Lightning fast', text: 'Queries return in milliseconds, even with millions of events.' },
  { icon: '📱', bg: 'bg-violet-50', title: 'Works everywhere', text: 'Check your numbers on desktop, tablet or phone, wherever you are.' },
]

const plans = [
  { name: 'Starter', monthly: 0, items: ['1 dashboard', '5k events / month', 'Email support'], cta: 'Get started' },
  { name: 'Growth', monthly: 49, items: ['Unlimited dashboards', '1M events / month', 'AI insights', 'Priority support'], cta: 'Start free trial', hot: true },
  { name: 'Scale', monthly: 199, items: ['Everything in Growth', 'SSO & audit logs', 'Dedicated manager'], cta: 'Contact sales' },
]

const faqs = [
  { q: 'Is there a free trial?', a: 'Yes. Every paid plan comes with a 14-day free trial, no credit card required.' },
  { q: 'Can I change plans later?', a: 'Of course. Upgrade, downgrade or cancel at any time from your settings.' },
  { q: 'Do you offer discounts for startups?', a: 'Early-stage startups get 50% off the Growth plan for the first year.' },
]

const bars = [35, 48, 42, 60, 55, 72, 66, 84, 78, 95]

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.15 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-100">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#" className="flex items-center gap-2 text-xl font-extrabold">
          <span className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400" />
          Nimbus
        </a>
        <ul className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
          {navLinks.map((l) => (
            <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-indigo-600">{l}</a></li>
          ))}
        </ul>
        <div className="hidden items-center gap-3 md:flex">
          <a href="#" className="text-sm font-semibold">Sign in</a>
          <a href="#pricing" className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-700">Start free trial</a>
        </div>
        <button aria-label="Menu" onClick={() => setOpen(!open)} className="rounded-lg p-2 md:hidden">
          <span className="block h-0.5 w-6 bg-slate-800" />
          <span className="mt-1.5 block h-0.5 w-6 bg-slate-800" />
          <span className="mt-1.5 block h-0.5 w-6 bg-slate-800" />
        </button>
      </nav>
      {open && (
        <div className="border-t border-slate-100 px-5 pb-5 md:hidden">
          {navLinks.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="block py-3 font-medium text-slate-700">{l}</a>
          ))}
          <a href="#pricing" className="mt-2 block rounded-xl bg-indigo-600 py-3 text-center font-bold text-white">Start free trial</a>
        </div>
      )}
    </header>
  )
}

function Dashboard() {
  return (
    <div className="rounded-2xl bg-slate-900 p-5 text-slate-200 shadow-2xl shadow-slate-900/30">
      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>Revenue overview</span><span>Last 30 days ▾</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[['MRR', '$48.2k', '▲ 12.4%'], ['Active users', '12,840', '▲ 8.1%'], ['Churn', '1.8%', '▼ 0.6%']].map(([k, v, d]) => (
          <div key={k} className="rounded-xl bg-slate-800 p-3">
            <p className="text-xs text-slate-400">{k}</p>
            <p className="mt-1 text-lg font-extrabold sm:text-2xl">{v}</p>
            <p className="text-xs font-bold text-emerald-400">{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex h-44 items-end gap-2 rounded-xl bg-slate-800 p-4">
        {bars.map((h, i) => (
          <span key={i} className="bar flex-1 rounded-t-md bg-gradient-to-b from-indigo-400 to-indigo-600" style={{ height: `${h}%`, animationDelay: `${i * 60}ms` }} />
        ))}
      </div>
    </div>
  )
}

function Pricing() {
  const [yearly, setYearly] = useState(false)
  return (
    <section id="pricing" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-5 text-center">
        <h2 className="reveal text-3xl font-black tracking-tight sm:text-4xl">Simple, transparent pricing</h2>
        <p className="reveal mt-3 text-slate-500">Start free. Upgrade when you grow.</p>
        <div className="reveal mt-6 inline-flex rounded-full bg-white p-1 shadow-sm ring-1 ring-slate-200">
          {['Monthly', 'Yearly (-20%)'].map((t, i) => (
            <button key={t} onClick={() => setYearly(i === 1)} className={`rounded-full px-4 py-2 text-sm font-semibold ${yearly === (i === 1) ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}>{t}</button>
          ))}
        </div>
        <div className="mt-12 grid gap-6 text-left md:grid-cols-3">
          {plans.map((p) => {
            const price = yearly ? Math.round(p.monthly * 0.8) : p.monthly
            return (
              <div key={p.name} className={`reveal rounded-2xl p-7 ${p.hot ? 'bg-slate-900 text-white md:-translate-y-3' : 'bg-white ring-1 ring-slate-200'}`}>
                <p className={`font-semibold ${p.hot ? 'text-indigo-300' : 'text-slate-500'}`}>{p.name}</p>
                <p className="my-3 text-5xl font-black">${price}<span className="text-base font-medium text-slate-400">/mo</span></p>
                <ul className="mb-7 space-y-2 text-sm">
                  {p.items.map((it) => <li key={it}><span className="mr-2 font-bold text-emerald-500">✓</span>{it}</li>)}
                </ul>
                <a href="#" className={`block rounded-xl py-3 text-center font-bold ${p.hot ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'ring-1 ring-slate-300 hover:bg-slate-50'}`}>{p.cta}</a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-20">
      <h2 className="reveal text-center text-3xl font-black tracking-tight sm:text-4xl">Frequently asked questions</h2>
      <div className="mt-10 divide-y divide-slate-200 rounded-2xl ring-1 ring-slate-200">
        {faqs.map((f, i) => (
          <div key={f.q} className="px-6">
            <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between py-5 text-left font-semibold">
              {f.q}<span className="text-xl text-indigo-600">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && <p className="pb-5 text-slate-600">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}

function Signup() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20">
      <div className="reveal rounded-3xl bg-gradient-to-br from-indigo-600 to-cyan-500 px-6 py-14 text-center text-white sm:px-14">
        <h2 className="text-3xl font-black sm:text-4xl">Ready to grow faster?</h2>
        <p className="mt-3 text-lg opacity-90">Join thousands of teams making better decisions with Nimbus.</p>
        {sent ? (
          <p className="mt-8 text-lg font-bold">🎉 Thanks! Check your inbox to get started.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) setSent(true) }} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="flex-1 rounded-xl px-4 py-3 text-slate-900 outline-none ring-2 ring-transparent focus:ring-white/60 bg-white" />
            <button className="rounded-xl bg-slate-900 px-6 py-3 font-bold hover:bg-slate-800">Start free trial</button>
          </form>
        )}
      </div>
    </section>
  )
}

export default function App() {
  useReveal()
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-12 lg:grid-cols-2 lg:pt-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">✨ New: AI-powered insights</span>
            <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
              Analytics that <br />
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">grow your SaaS</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">Track revenue, churn and user behavior in one beautiful dashboard. Make smarter decisions in minutes, not weeks.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#pricing" className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-700">Get started free</a>
              <a href="#features" className="rounded-xl px-6 py-3 font-bold ring-1 ring-slate-300 hover:bg-slate-50">▶ Watch demo</a>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-slate-500">
              <div className="flex -space-x-2">
                {['bg-amber-400', 'bg-emerald-500', 'bg-indigo-500', 'bg-pink-500'].map((c) => <span key={c} className={`h-8 w-8 rounded-full border-2 border-white ${c}`} />)}
              </div>
              Trusted by 4,000+ product teams
            </div>
          </div>
          <Dashboard />
        </section>

        <div id="customers" className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-12 gap-y-4 border-y border-slate-200 px-5 py-7 text-xl font-extrabold tracking-wide text-slate-400 sm:justify-between">
          {['Northwind', 'Lumen', 'Brightpath', 'Orbitly', 'Quanta', 'Fieldnote'].map((b) => <span key={b}>{b}</span>)}
        </div>

        <section id="features" className="mx-auto max-w-6xl px-5 py-20 text-center">
          <h2 className="reveal text-3xl font-black tracking-tight sm:text-4xl">Everything you need to scale</h2>
          <p className="reveal mt-3 text-slate-500">Powerful tools, simple setup. No code required.</p>
          <div className="mt-12 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="reveal rounded-2xl p-7 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
                <div className={`mb-4 grid h-12 w-12 place-items-center rounded-xl text-2xl ${f.bg}`}>{f.icon}</div>
                <h3 className="text-lg font-bold">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        <Pricing />
        <Faq />
        <Signup />
      </main>
      <footer className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-5 pb-10 text-sm text-slate-400 sm:flex-row">
        <span>© 2026 Nimbus Analytics</span><span>Privacy · Terms · Contact</span>
      </footer>
    </div>
  )
}
