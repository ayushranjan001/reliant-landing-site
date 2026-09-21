import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, MapPin, Search, ShieldCheck, SlidersHorizontal, Star, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tutors as fallbackTutors } from '../data/marketplace';
import { getVerifiedTeachers } from '../lib/supabase';

export default function FindTutor() {
  const [subject, setSubject] = useState('All');
  const [mode, setMode] = useState('Any');
  const [query, setQuery] = useState('');
  const [tutors, setTutors] = useState(fallbackTutors);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVerifiedTeachers()
      .then((rows) => setTutors(rows.map((t) => ({ ...t, teaches: t.grades?.join(' • ') || 'Academic support', students: `${t.reviews || 0}+ reviews`, initials: t.initials, accent: t.accent || 'bg-brand-100 text-brand-700' }))))
      .catch(() => setTutors(fallbackTutors))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => tutors.filter((tutor) => {
    const subjectMatch = subject === 'All' || tutor.subject === subject;
    const modeMatch = mode === 'Any' || tutor.mode?.includes(mode);
    const queryMatch = !query.trim() || [tutor.name, tutor.subject, tutor.teaches].join(' ').toLowerCase().includes(query.toLowerCase());
    return subjectMatch && modeMatch && queryMatch;
  }), [subject, mode, query, tutors]);

  return (
    <div className="bg-paper pt-28 sm:pt-32">
      <section className="relative overflow-hidden bg-brand-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_15%,rgba(245,158,11,.18),transparent_30%),radial-gradient(circle_at_12%_90%,rgba(59,130,246,.18),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent-300">Learner marketplace</p>
          <div className="mt-4 max-w-3xl">
            <h1 className="font-display text-4xl font-bold tracking-[-.045em] sm:text-6xl">Find the right teacher for the way you learn.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">Compare tutors, teaching experience, subjects, modes and rates. Book a demo or move straight into a paid learning plan.</p>
          </div>
          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/10 p-3 backdrop-blur-xl">
            <div className="grid gap-3 lg:grid-cols-[1.3fr_.75fr_.75fr_auto]">
              <label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-brand-950">
                <Search size={19} className="text-slate-400" /><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search teacher, subject or class" className="min-w-0 flex-1 bg-transparent outline-none" />
              </label>
              <select value={subject} onChange={(e)=>setSubject(e.target.value)} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-brand-950 outline-none"><option>All</option><option>Mathematics</option><option>Physics</option><option>Chemistry</option><option>English</option></select>
              <select value={mode} onChange={(e)=>setMode(e.target.value)} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-brand-950 outline-none"><option>Any</option><option>Online</option><option>Home</option></select>
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent-500 px-6 py-3 font-bold text-brand-950 hover:bg-accent-400"><SlidersHorizontal size={18}/> Match me</button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Recommended teachers</p><h2 className="mt-2 font-display text-3xl font-bold text-brand-950 sm:text-4xl">{loading ? 'Loading verified teachers…' : `${filtered.length} profiles match your filters`}</h2></div>
          <Link to="/contact" className="inline-flex items-center gap-2 font-bold text-brand-700">Need help choosing? Talk to us <ArrowRight size={17}/></Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {filtered.map((tutor, i) => (
            <motion.article key={tutor.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.06}} whileHover={{y:-4}} className="rounded-[1.8rem] border border-brand-100 bg-white p-6 card-shadow sm:p-7">
              <div className="flex gap-4">
                <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-lg font-extrabold ${tutor.accent}`}>{tutor.initials}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2"><h3 className="font-display text-xl font-bold text-brand-950">{tutor.name}</h3><span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700"><CheckCircle2 size={13}/> Verified</span></div>
                  <p className="mt-1 font-semibold text-brand-700">{tutor.subject}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{tutor.teaches}</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl bg-paper p-3"><p className="text-xs font-semibold text-slate-400">Experience</p><p className="mt-1 font-bold text-brand-950">{tutor.experience}</p></div>
                <div className="rounded-xl bg-paper p-3"><p className="text-xs font-semibold text-slate-400">Rating</p><p className="mt-1 inline-flex items-center gap-1 font-bold text-brand-950"><Star size={14} className="fill-accent-500 text-accent-500"/>{tutor.rating}</p></div>
                <div className="rounded-xl bg-paper p-3"><p className="text-xs font-semibold text-slate-400">Students</p><p className="mt-1 font-bold text-brand-950">{tutor.students}</p></div>
                <div className="rounded-xl bg-paper p-3"><p className="text-xs font-semibold text-slate-400">Rate</p><p className="mt-1 font-bold text-brand-950">{{tutor.rate}</p></div>
              </div>
              <div className="mt-6 flex items-center justify-between gap-3 border-t border-brand-100 pt-5">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500"><Video size={16}/> {tutor.mode}</span>
                <Link to={`/checkout?tutor=${tutor.id}`} className="inline-flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-3 text-sm font-bold text-brand-950 hover:bg-accent-400">Book with {tutor.name.split(' ')[0]} <ArrowRight size={16}/></Link>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="mt-12 rounded-[2rem] border border-brand-100 bg-brand-50 p-7 sm:p-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Can’t find the right match?</p><h3 className="mt-2 font-display text-2xl font-bold text-brand-950">Post your requirement and let teachers come to you.</h3><p className="mt-2 max-w-2xl text-slate-600">Share your class, subject, location, schedule and budget. Reliant can surface matching educators without making parents search forever.</p></div>
            <Link to="/contact" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-950 px-5 py-3.5 font-bold text-white">Post a learning request <ArrowRight size={18}/></Link>
          </div>
        </div>
      </section>

      <section className="bg-white"><div className="mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8"><div className="rounded-3xl border border-brand-100 p-6"><ShieldCheck className="text-brand-700"/><h3 className="mt-5 font-display font-bold text-brand-950">Verified profiles</h3><p className="mt-2 text-sm leading-6 text-slate-600">Verification badges, credentials and profile quality checks can make tutor selection more transparent.</p></div><div className="rounded-3xl border border-brand-100 p-6"><MapPin className="text-brand-700"/><h3 className="mt-5 font-display font-bold text-brand-950">Online or at home</h3><p className="mt-2 text-sm leading-6 text-slate-600">Match by teaching mode and location instead of forcing every student into the same format.</p></div><div className="rounded-3xl border border-brand-100 p-6"><CheckCircle2 className="text-brand-700"/><h3 className="mt-5 font-display font-bold text-brand-950">Pay inside the platform</h3><p className="mt-2 text-sm leading-6 text-slate-600">The booking path is designed to end in an on-site checkout rather than sending the learner to a separate enquiry flow.</p></div></div></section>
    </div>
  );
}
