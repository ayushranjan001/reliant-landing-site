import { useEffect, useState } from 'react';
import { ArrowUpRight, BarChart3, BookOpen, CircleDollarSign, ShieldCheck, Users, WalletCards } from 'lucide-react';
import { getDashboardMetrics } from '../lib/supabase';

const groups = {
  Supply: { icon: Users, tone: 'bg-sky-50 text-sky-700' },
  Demand: { icon: BookOpen, tone: 'bg-violet-50 text-violet-700' },
  Money: { icon: CircleDollarSign, tone: 'bg-emerald-50 text-emerald-700' },
  Quality: { icon: ShieldCheck, tone: 'bg-amber-50 text-amber-700' },
};

export default function Dashboard() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getDashboardMetrics().then(setMetrics).finally(() => setLoading(false)); }, []);
  const money = metrics.filter((m) => m.metric_group === 'Money');
  return (
    <div className="bg-paper pt-28 sm:pt-32">
      <section className="bg-brand-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div><p className="text-sm font-bold uppercase tracking-[.2em] text-accent-300">Reliant operations</p><h1 className="mt-3 font-display text-4xl font-bold tracking-[-.045em] sm:text-6xl">Marketplace command centre.</h1><p className="mt-4 max-w-2xl text-lg leading-8 text-white/60">Supply, demand, money and quality — one operating view for the education marketplace.</p></div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70"><BarChart3 size={16}/> Demo operating snapshot</div>
          </div>
        </div>
      </section>
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {Object.entries(groups).map(([group, config]) => { const Icon = config.icon; const rows = metrics.filter((m) => m.metric_group === group); return (
            <section key={group} className="rounded-[2rem] border border-brand-100 bg-white p-6 card-shadow sm:p-7">
              <div className="flex items-center gap-3"><span className={"grid h-11 w-11 place-items-center rounded-2xl " + config.tone}><Icon size={20}/></span><div><p className="text-xs font-bold uppercase tracking-[.15em] text-slate-400">{group}</p><h2 className="font-display text-xl font-bold text-brand-950">{group} health</h2></div></div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">{rows.map((row) => <div key={row.metric_key} className="rounded-2xl bg-paper p-4"><p className="text-sm font-semibold text-slate-500">{row.label}</p><p className="mt-1 font-display text-3xl font-extrabold text-brand-950">{loading ? '—' : row.display_value}</p></div>)}</div>
            </section>
          ); })}
        </div>
        <section className="mt-6 rounded-[2rem] border border-brand-100 bg-brand-950 p-7 text-white sm:p-8">
          <div className="flex items-center gap-3"><WalletCards className="text-accent-300"/><div><p className="text-xs font-bold uppercase tracking-[.15em] text-accent-300">Money flow</p><h2 className="font-display text-2xl font-bold">Revenue → payouts → contribution</h2></div></div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{money.map((m) => <div key={m.metric_key} className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-sm text-white/55">{m.label}</p><p className="mt-2 font-display text-xl font-bold">{m.display_value}</p></div>)}</div>
        </section>
        <p className="mt-6 text-xs leading-6 text-slate-500">Demo marketplace records only. Production metrics must come from authenticated users, verified transactions, approved sessions and real payout/refund records.</p>
      </main>
    </div>
  );
}