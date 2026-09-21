import React from 'react';
import { ArrowRight, BriefcaseBusiness, CheckCircle2, IndianRupee, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { studentRequests as fallbackRequests } from '../data/marketplace';
import { getOpenStudentRequirements } from '../lib/supabase';

export default function FindStudents() {
  const [requests, setRequests] = React.useState(fallbackRequests);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    getOpenStudentRequirements()
      .then((rows) => setRequests(rows.map((r) => ({ ...r, title: `${r.class_level} ${r.subject}`, place: [r.location, r.mode].filter(Boolean).join(' • '), budget: r.budget, timing: r.schedule, posted: new Date(r.created_at).toLocaleDateString(), urgency: r.status === 'open' ? 'Open' : r.status }))))
      .catch(() => setRequests(fallbackRequests))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="bg-paper pt-28 sm:pt-32">
      <section className="bg-brand-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[.2em] text-accent-300">Teacher marketplace</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-[-.045em] sm:text-6xl">Find students. Build your teaching business. Get paid.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">Create a professional teaching profile, discover student requirements and choose the opportunities that fit your subjects, location, schedule and pricing.</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 font-bold text-brand-950">Create teacher profile <ArrowRight size={18}/></Link><Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 py-3.5 font-bold text-white">How teacher plans work</Link></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
          <div><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Fresh student demand</p><h2 className="mt-2 font-display text-3xl font-bold text-brand-950 sm:text-4xl">{loading ? 'Loading student requirements…' : 'See real requirements before you connect.'}</h2><p className="mt-4 leading-7 text-slate-600">The marketplace should let educators filter by subject, grade, location, teaching mode, timing and budget — then unlock the opportunities they actually want.</p><div className="mt-7 grid gap-3"><div className="flex items-start gap-3 rounded-2xl bg-white p-4 border border-brand-100"><Users className="mt-0.5 text-brand-700"/><div><p className="font-bold text-brand-950">Qualified demand</p><p className="mt-1 text-sm text-slate-600">Profiles and requests can be verified before they enter the paid marketplace flow.</p></div></div><div className="flex items-start gap-3 rounded-2xl bg-white p-4 border border-brand-100"><IndianRupee className="mt-0.5 text-brand-700"/><div><p className="font-bold text-brand-950">Transparent opportunity</p><p className="mt-1 text-sm text-slate-600">Show the learner’s budget or fee expectation before the teacher commits time.</p></div></div></div></div>
          <div className="grid gap-4">
            {requests.map((request,index)=>(
              <motion.article key={request.id} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.07}} className="rounded-3xl border border-brand-100 bg-white p-6 card-shadow">
                <div className="flex flex-wrap items-start justify-between gap-3"><div><span className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-800">{request.urgency}</span><h3 className="mt-3 font-display text-xl font-bold text-brand-950">{request.title}</h3><p className="mt-2 text-sm text-slate-500">{request.place}</p></div><p className="text-xs font-semibold text-slate-400">{request.posted}</p></div>
                <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2"><div className="rounded-xl bg-paper p-3"><span className="text-slate-400">Budget</span><p className="mt-1 font-bold text-brand-950">{request.budget}</p></div><div className="rounded-xl bg-paper p-3"><span className="text-slate-400">Preferred timing</span><p className="mt-1 font-bold text-brand-950">{request.timing}</p></div></div>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700"><CheckCircle2 size={16}/> Requirement verified placeholder</span><Link to="/checkout?product=teacher-pro" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-950 px-4 py-3 text-sm font-bold text-white hover:bg-brand-900">Unlock & apply <ArrowRight size={16}/></Link></div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white"><div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Teacher monetization</p><h2 className="mt-2 max-w-3xl font-display text-3xl font-bold text-brand-950 sm:text-4xl">Give teachers a business model they can understand.</h2><div className="mt-8 grid gap-5 lg:grid-cols-3"><div className="rounded-[1.8rem] border border-brand-100 bg-paper p-7"><p className="text-sm font-bold text-brand-700">Free</p><h3 className="mt-2 font-display text-2xl font-bold text-brand-950">Build your profile</h3><p className="mt-3 text-sm leading-6 text-slate-600">Create a profile, list subjects, add credentials and define availability.</p></div><div className="rounded-[1.8rem] border-2 border-accent-400 bg-white p-7 shadow-xl shadow-accent-500/10"><p className="text-sm font-bold text-accent-700">Pro</p><h3 className="mt-2 font-display text-2xl font-bold text-brand-950">Unlock student leads</h3><p className="mt-3 text-sm leading-6 text-slate-600">Pay for access to high-intent student requirements and enhanced profile visibility.</p><Link to="/checkout?product=teacher-pro" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent-500 px-5 py-3 font-bold text-brand-950">View Pro checkout <ArrowRight size={17}/></Link></div><div className="rounded-[1.8rem] border border-brand-100 bg-paper p-7"><p className="text-sm font-bold text-brand-700">Professional</p><h3 className="mt-2 font-display text-2xl font-bold text-brand-950">Priority visibility</h3><p className="mt-3 text-sm leading-6 text-slate-600">Higher profile visibility, response insights and additional lead credits.</p></div></div></div></section>

      <section className="px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl rounded-[2rem] bg-brand-900 p-8 text-white sm:p-10"><div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"><div><div className="flex items-center gap-2 text-accent-300"><BriefcaseBusiness size={18}/><span className="text-sm font-bold uppercase tracking-[.18em]">Built for educators</span></div><h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Teaching should be a career platform, not just a classifieds listing.</h2></div><Link to="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3.5 font-bold text-brand-950">Start as a teacher <ArrowRight size={18}/></Link></div></div></section>
    </div>
  );
}
