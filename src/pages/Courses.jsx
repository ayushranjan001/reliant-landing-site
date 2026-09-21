import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Clock3, IndianRupee, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import { courseCategories, courses } from '../data/courses';

export default function Courses() {
  const [category, setCategory] = useState('All');
  const [openId, setOpenId] = useState(courses[0].id);
  const filtered = useMemo(() => category === 'All' ? courses : courses.filter((item) => item.category === category), [category]);

  return (
    <>
      <section className="pt-32 sm:pt-36"><div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16"><SectionHeading eyebrow="Courses" title="Choose the academic support your child needs next." copy="These are realistic placeholders designed to make the page useful now. Replace names, fees, timings and syllabi with your final catalogue." /><div className="mt-8 flex flex-wrap gap-2">{courseCategories.map((item) => <button key={item} type="button" onClick={() => { setCategory(item); setOpenId(''); }} className={`rounded-full border px-4 py-2.5 text-sm font-bold transition ${category === item ? 'border-brand-700 bg-brand-700 text-white' : 'border-brand-200 bg-white text-brand-800 hover:bg-brand-50'}`}>{item}</button>)}</div></div></section>
      <section className="bg-white"><div className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8 lg:py-20">
        {filtered.map((course, index) => <motion.article layout key={course.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .04 }} className="rounded-3xl border border-brand-100 bg-paper p-6 card-shadow">
          <div className="flex items-start justify-between gap-4"><span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-bold text-accent-700">{course.tag}</span><Sparkles size={18} className="text-accent-500" /></div>
          <p className="mt-5 text-sm font-bold text-brand-700">{course.category}</p><h3 className="mt-1 font-display text-2xl font-bold text-brand-950">{course.subject}</h3>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm"><div className="rounded-2xl bg-white p-3"><Clock3 size={15} className="text-brand-600" /><p className="mt-2 font-semibold text-slate-600">{course.duration}</p><p className="text-xs text-slate-400">{course.timing}</p></div><div className="rounded-2xl bg-white p-3"><IndianRupee size={15} className="text-brand-600" /><p className="mt-2 font-semibold text-slate-600">{course.fee}</p></div></div>
          <button type="button" onClick={() => setOpenId(openId === course.id ? '' : course.id)} className="mt-5 flex w-full items-center justify-between rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm font-bold text-brand-900"><span>View syllabus</span><ChevronDown size={18} className={`transition ${openId === course.id ? 'rotate-180' : ''}`} /></button>
          <AnimatePresence>{openId === course.id && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden"><ul className="space-y-2 pt-4">{course.syllabus.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-slate-600"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />{item}</li>)}</ul></motion.div>}</AnimatePresence>
          <Link to="/contact" className="mt-5 inline-flex items-center gap-2 font-bold text-brand-700">Enroll / enquire <ArrowRight size={16} /></Link>
        </motion.article>)}
      </div></section>
    </>
  );
}
