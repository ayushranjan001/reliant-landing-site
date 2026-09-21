import { ArrowRight, BookOpen, CheckCircle2, GraduationCap, Search, ShieldCheck, Sparkles, Star, Target, Users, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { learningPaths, tutors } from '../data/marketplace';

const iconMap = { BookOpen, GraduationCap, Target, Sparkles };

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-950 pt-28 text-white sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(245,158,11,.20),transparent_27%),radial-gradient(circle_at_12%_70%,rgba(59,130,246,.18),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-24 lg:pt-10">
          <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-accent-300 backdrop-blur"><Sparkles size={15}/> India's learning marketplace</div>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold tracking-[-.06em] sm:text-6xl lg:text-7xl">Find the right teacher. <span className="text-accent-400">Build the right future.</span></h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65 sm:text-xl">Reliant India connects students with trusted educators and gives teachers a professional platform to find students, build their reputation and grow their teaching business.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link to="/find-tutor" className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 font-bold text-brand-950 shadow-xl shadow-accent-500/20 hover:bg-accent-400">Find a Tutor <ArrowRight size={18}/></Link><Link to="/find-students" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 py-3.5 font-bold text-white hover:bg-white/15">I’m a Teacher <ArrowRight size={18}/></Link></div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-white/55"><span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-accent-400"/> Verified profiles</span><span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-accent-400"/> Online & home tuition</span><span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-accent-400"/> Platform-first booking</span></div>
          </motion.div>

          <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{duration:.7,delay:.1}} className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-brand-700/30 blur-2xl"/>
            <div className="relative rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-white/40">Learning dashboard</p><p className="mt-1 font-display font-bold">A smarter way to learn</p></div><span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">Live</span></div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-4 text-brand-950"><p className="text-xs font-bold text-slate-400">Tutor match</p><p className="mt-2 font-display text-lg font-bold">Ananya Sharma</p><p className="mt-1 text-sm text-slate-500">Mathematics • 4.9 ★</p><div className="mt-4 h-2 rounded-full bg-brand-100"><div className="h-full w-[88%] rounded-full bg-brand-600"/></div><p className="mt-2 text-xs font-semibold text-slate-400">88% match</p></div>
                <div className="rounded-2xl bg-brand-900 p-4"><p className="text-xs font-bold text-white/40">Weekly progress</p><p className="mt-2 font-display text-3xl font-bold">82%</p><div className="mt-4 grid grid-cols-7 items-end gap-1.5 h-14">{[30,45,38,64,52,76,82].map((v,i)=><span key={i} style={{height:`${v}%`}} className="rounded-t bg-accent-400/80"/>)}</div></div>
              </div>
              <div className="mt-3 rounded-2xl bg-white p-4 text-brand-950"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-brand-700"><Video size={18}/></div><div><p className="font-bold">Next class</p><p className="text-xs text-slate-500">Physics • Today, 6:00 PM</p></div></div><span className="rounded-xl bg-accent-100 px-3 py-2 text-xs font-bold text-accent-700">Join</span></div></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-brand-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-brand-100 sm:grid-cols-4 px-4 sm:px-6 lg:px-8">
          {[['2,500+','Students taught'],['80+','Teachers & tutors'],['12+','Years of experience'],['1','Learning marketplace']].map(([value,label])=><div key={label} className="px-4 py-7 text-center sm:py-9"><p className="font-display text-2xl font-extrabold text-brand-950 sm:text-3xl">{value}</p><p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">{label}</p></div>)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Start here</p><h2 className="mt-2 font-display text-3xl font-bold tracking-[-.04em] text-brand-950 sm:text-5xl">What are you looking for?</h2><p className="mt-4 text-lg leading-8 text-slate-600">Whether you're learning or teaching, Reliant gives you a clear path from discovery to action.</p></div>
        <div className="mt-9 grid gap-5 lg:grid-cols-2">
          <Link to="/find-tutor" className="group rounded-[2rem] bg-brand-950 p-7 text-white shadow-xl shadow-brand-950/10 sm:p-9"><div className="flex items-start justify-between"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10"><Search size={24}/></div><ArrowRight className="transition group-hover:translate-x-1" /></div><h3 className="mt-10 font-display text-3xl font-bold">I want to learn</h3><p className="mt-3 max-w-lg leading-7 text-white/60">Find teachers by subject, class, teaching mode, location, experience and price. Book the right fit.</p><span className="mt-7 inline-flex rounded-xl bg-accent-500 px-5 py-3 font-bold text-brand-950">Find a tutor</span></Link>
          <Link to="/find-students" className="group rounded-[2rem] border border-brand-200 bg-white p-7 shadow-xl shadow-brand-950/5 sm:p-9"><div className="flex items-start justify-between"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-100 text-brand-700"><Users size={24}/></div><ArrowRight className="text-brand-700 transition group-hover:translate-x-1" /></div><h3 className="mt-10 font-display text-3xl font-bold text-brand-950">I want to teach</h3><p className="mt-3 max-w-lg leading-7 text-slate-600">Create your educator profile, discover student requirements and choose opportunities that fit your expertise.</p><span className="mt-7 inline-flex rounded-xl bg-brand-950 px-5 py-3 font-bold text-white">Find students</span></Link>
        </div>
      </section>

      <section className="bg-[#efeade]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Learning paths</p><h2 className="mt-2 font-display text-3xl font-bold text-brand-950 sm:text-4xl">Built around real academic goals.</h2></div><Link to="/courses" className="inline-flex items-center gap-2 font-bold text-brand-700">Explore all programs <ArrowRight size={17}/></Link></div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{learningPaths.map((path)=>{const Icon=iconMap[path.icon]; return <Link key={path.label} to="/courses" className="group rounded-3xl border border-brand-100 bg-white p-6 card-shadow transition hover:-translate-y-1"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-100 text-brand-700"><Icon size={22}/></div><h3 className="mt-6 font-display text-lg font-bold text-brand-950">{path.label}</h3><p className="mt-1 text-sm text-slate-500">{path.copy}</p><ArrowRight size={18} className="mt-6 text-brand-700 transition group-hover:translate-x-1"/></Link>})}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
          <div><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Meet the marketplace</p><h2 className="mt-2 font-display text-3xl font-bold tracking-[-.04em] text-brand-950 sm:text-5xl">Teachers students can actually compare.</h2><p className="mt-5 text-lg leading-8 text-slate-600">Experience, subjects, ratings, teaching mode and pricing belong in the decision — not hidden behind a phone call.</p><Link to="/find-tutor" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-950 px-5 py-3.5 font-bold text-white">Browse all teachers <ArrowRight size={18}/></Link></div>
          <div className="grid gap-4 sm:grid-cols-2">{tutors.slice(0,4).map((tutor,index)=><motion.article key={tutor.id} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.06}} className="rounded-3xl border border-brand-100 bg-white p-5 card-shadow"><div className="flex gap-3"><div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl font-bold ${tutor.accent}`}>{tutor.initials}</div><div><div className="flex items-center gap-1.5"><h3 className="font-display font-bold text-brand-950">{tutor.name}</h3><CheckCircle2 size={14} className="text-emerald-600"/></div><p className="text-sm font-semibold text-brand-700">{tutor.subject}</p><p className="mt-1 text-xs text-slate-500">{tutor.experience} • {tutor.rating} ★</p></div></div><div className="mt-5 flex items-center justify-between border-t border-brand-100 pt-4 text-sm"><span className="font-semibold text-slate-500">{tutor.mode}</span><span className="font-bold text-brand-950">{tutor.rate}</span></div></motion.article>)}</div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-brand-950 p-8 text-white sm:p-12 lg:p-16"><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-accent-300">One platform. Two journeys.</p><h2 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-[-.04em] sm:text-5xl">A marketplace where learning and teaching can actually happen.</h2><p className="mt-4 max-w-2xl text-white/60">Discover. Compare. Book. Pay. Teach. Grow. The complete experience belongs inside Reliant.</p></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"><Link to="/find-tutor" className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 font-bold text-brand-950">Find a tutor <ArrowRight size={18}/></Link><Link to="/find-students" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 py-3.5 font-bold text-white">Find students <ArrowRight size={18}/></Link></div></div></div>
      </section>
    </>
  );
}
