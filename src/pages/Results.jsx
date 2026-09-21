import { useMemo, useState } from 'react';
import { Download, Share2, Trophy } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { results } from '../data/results';

export default function Results() {
  const [year, setYear] = useState('All');
  const years = ['All', ...new Set(results.map((item) => item.year))];
  const visible = useMemo(() => year === 'All' ? results : results.filter((item) => item.year === year), [year]);

  const share = async (item) => {
    const text = `${item.name} scored ${item.score} in ${item.exam} with Reliant India Home Tuition.`;
    if (navigator.share) await navigator.share({ title: 'Reliant India result', text });
    else await navigator.clipboard?.writeText(text);
  };

  return (
    <>
      <section className="pt-32 sm:pt-36"><div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16"><SectionHeading eyebrow="Results & achievements" title="A snapshot of the outcomes worth celebrating." copy="These result cards are placeholders until the client supplies verified marks, ranks, years and student permissions." /><div className="mt-8 flex flex-wrap gap-2">{years.map((item) => <button key={item} type="button" onClick={() => setYear(item)} className={`rounded-full border px-4 py-2.5 text-sm font-bold ${year === item ? 'border-brand-700 bg-brand-700 text-white' : 'border-brand-200 bg-white text-brand-800'}`}>{item}</button>)}</div></div></section>
      <section className="bg-white"><div className="mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8 lg:py-20">{visible.map((item) => <article key={item.name + item.year} className="rounded-[2rem] border border-brand-100 bg-paper p-6 card-shadow"><div className="flex items-center justify-between"><span className={`rounded-full px-3 py-1 text-xs font-bold ${item.accent}`}>{item.year}</span><Trophy size={20} className="text-accent-500" /></div><div className="mt-8 rounded-2xl bg-white p-6"><div className="text-5xl font-display font-bold tracking-[-.06em] text-brand-700">{item.score}</div><p className="mt-3 font-display text-xl font-bold text-brand-950">{item.name}</p><p className="mt-1 text-sm text-slate-500">{item.exam} · {item.subject}</p></div><div className="mt-5 flex gap-2"><button type="button" onClick={() => share(item)} className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm font-bold text-brand-800"><Share2 size={16} /> Share</button><button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-xl bg-brand-900 px-4 py-2.5 text-sm font-bold text-white"><Download size={16} /> Save</button></div></article>)}</div></section>
    </>
  );
}
