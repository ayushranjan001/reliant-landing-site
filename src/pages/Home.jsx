import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, CheckCircle2, ChevronLeft, ChevronRight, GraduationCap, House, ShieldCheck, Sparkles, Star, Target, Users, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import StatCounter from '../components/StatCounter';
import { courses } from '../data/courses';
import { results } from '../data/results';
import { testimonials } from '../data/testimonials';
import heroImageUrl from '../../Media/tuitionservice.png';

const features = [
  [Users, 'Small, focused learning', 'One student, one tutor, one plan — built around the learner rather than a generic timetable.'],
  [ShieldCheck, 'Verified tutor matching', 'Profiles and requirements are matched thoughtfully, with clear parent communication.'],
  [Target, 'Doubt-clearing support', 'Students get space to ask the questions they may not ask in a crowded classroom.'],
  [Zap, 'Progress that is visible', 'Regular practice and assessments help students and parents see where effort is turning into improvement.'],
];

export default function Home() {
  const [resultIndex, setResultIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setResultIndex((i) => (i + 1) % results.length);
      setTestimonialIndex((i) => (i + 1) % testimonials.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  const result = results[resultIndex];
  const testimonial = testimonials[testimonialIndex];

  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="absolute inset-0 section-grid opacity-45" />
        <div className="absolute -right-28 top-10 h-80 w-80 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute left-[-5rem] top-44 h-72 w-72 rounded-full bg-accent-400/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-16 sm:px-6 lg:grid-cols-[1.06fr_.94fr] lg:px-8 lg:pb-24">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/75 px-4 py-2 text-sm font-bold text-brand-800 shadow-sm backdrop-blur">
              <Sparkles size={15} className="text-accent-600" /> Personalised learning, at home
            </div>
            <h1 className="text-balance mt-6 max-w-3xl font-display text-5xl font-bold tracking-[-0.055em] text-brand-950 sm:text-6xl lg:text-7xl">Where every student finds their <span className="relative inline-block text-brand-700">A+<svg aria-hidden="true" className="absolute -bottom-2 left-0 h-3 w-full text-accent-500" viewBox="0 0 140 12" fill="none"><path d="M3 7c31-6 65-5 134 1" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/></svg></span></h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">One-to-one home tuition built around a child's class, subjects, pace and goals — with thoughtful tutor matching and focused academic support.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 font-bold text-brand-950 shadow-lg shadow-accent-500/20 transition hover:-translate-y-0.5 hover:bg-accent-400">Book Free Demo Class <ArrowRight size={18} /></Link>
              <Link to="/courses" className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-200 bg-white px-6 py-3.5 font-bold text-brand-900 transition hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50">View Courses</Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-slate-600">
              {['1-to-1 attention', 'Flexible scheduling', 'Parent-friendly updates'].map((item) => <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-600" />{item}</span>)}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7, delay: .12 }} className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-4 rounded-[2rem] border border-brand-100 bg-brand-50/50" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-2 shadow-2xl shadow-brand-950/10">
              <img src={heroImageUrl} alt="Tutor helping a student learn at home" fetchPriority="high" className="aspect-[4/4.2] w-full rounded-[1.6rem] object-cover" />
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }} className="absolute -bottom-7 left-4 hidden w-64 rounded-2xl border border-slate-100 bg-white p-4 card-shadow sm:block">
              <div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-100 text-brand-700"><GraduationCap size={22} /></div><div><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Learning plan</p><p className="font-display text-sm font-bold text-brand-950">Built for your child</p></div></div>
            </motion.div>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }} className="absolute right-0 top-7 hidden rounded-2xl border border-slate-100 bg-white px-4 py-3 card-shadow sm:flex sm:items-center sm:gap-2"><Star size={18} className="fill-accent-500 text-accent-500" /><span className="text-sm font-bold text-brand-950">Personal attention</span></motion.div>
          </motion.div>
        </div>
        <div className="relative border-y border-brand-100 bg-white/70 backdrop-blur">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4 sm:px-6 lg:px-8">
            <StatCounter value={12} suffix="+" label="Years of experience" />
            <StatCounter value={2500} suffix="+" label="Students taught" />
            <StatCounter value={92} suffix="%" label="Academic success" />
            <StatCounter value={80} suffix="+" label="Faculty & tutors" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading eyebrow="Why families choose us" title="A better fit between student, tutor and learning goal." copy="Home tuition works best when the teaching adapts to the student. Our approach keeps that relationship at the centre." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(([Icon, title, copy], index) => <motion.article key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: index * .08 }} whileHover={{ y: -6 }} className="rounded-3xl border border-brand-100 bg-white p-6 card-shadow"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-100 text-brand-700"><Icon size={22} /></div><h3 className="mt-6 font-display text-lg font-bold text-brand-950">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{copy}</p></motion.article>)}
        </div>
      </section>

      <section id="courses" className="bg-brand-950 scroll-mt-28">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading dark eyebrow="Courses preview" title="Study support that fits the next step." copy="From school fundamentals to focused exam preparation. Replace the placeholders with your final course catalogue." />
            <button type="button" onClick={() => navigate("/courses")} className="inline-flex shrink-0 items-center gap-2 font-bold text-accent-300 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-brand-950">View all courses <ArrowRight size={18} /></button>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {courses.slice(0, 4).map((course, index) => <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} whileHover={{ y: -5 }} className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl shadow-black/10 backdrop-blur"><div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-accent-300">{course.category}</div><h3 className="mt-5 font-display text-xl font-bold text-white">{course.subject}</h3><p className="mt-2 text-sm leading-6 text-white/70">{course.tag}</p><div className="mt-6 flex items-end justify-between gap-3"><span className="text-sm text-white/70">{course.duration}</span><span className="font-bold text-accent-300">{course.fee}</span></div></motion.div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div><SectionHeading eyebrow="Top results" title="Celebrate progress, not just percentages." copy="Placeholder achievements are shown here until the final result records and student permissions are supplied." /><Link to="/results" className="mt-6 inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-white px-5 py-3 font-bold text-brand-900 hover:bg-brand-50">See results <ArrowRight size={18} /></Link></div>
          <div className="relative overflow-hidden rounded-[2rem] border border-brand-100 bg-white p-7 card-shadow">
            <motion.div key={result.name + result.year} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .4 }} className="min-h-[250px]">
              <div className="flex items-center justify-between"><span className={`rounded-full px-3 py-1 text-xs font-bold ${result.accent}`}>{result.year}</span><span className="text-sm font-semibold text-slate-400">{result.exam}</span></div>
              <div className="mt-10 flex items-end justify-between"><div><p className="text-sm font-semibold text-slate-500">{result.subject}</p><h3 className="mt-1 font-display text-3xl font-bold text-brand-950">{result.name}</h3></div><div className="font-display text-6xl font-bold tracking-[-.06em] text-brand-700">{result.score}</div></div>
              <div className="mt-9 h-3 overflow-hidden rounded-full bg-brand-100"><motion.div initial={{ width: 0 }} animate={{ width: result.score }} transition={{ duration: .9 }} className="h-full rounded-full bg-accent-500" /></div>
            </motion.div>
            <div className="mt-6 flex justify-end gap-2"><button type="button" onClick={() => setResultIndex((i) => (i - 1 + results.length) % results.length)} aria-label="Previous result" className="grid h-10 w-10 place-items-center rounded-full border border-brand-200 text-brand-800"><ChevronLeft size={18} /></button><button type="button" onClick={() => setResultIndex((i) => (i + 1) % results.length)} aria-label="Next result" className="grid h-10 w-10 place-items-center rounded-full border border-brand-200 text-brand-800"><ChevronRight size={18} /></button></div>
          </div>
        </div>
      </section>

      <section className="bg-[#efeade]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-24">
          <div><SectionHeading eyebrow="Parents & students" title="The experience should feel supportive, not transactional." copy="Placeholder testimonials are intentionally easy to replace with approved reviews later." /><div className="mt-7 flex items-center gap-2 text-sm font-bold text-brand-800"><Star size={17} className="fill-accent-500 text-accent-500" /> 5.0 average placeholder rating</div></div>
          <div className="rounded-[2rem] border border-brand-100 bg-white p-7 soft-shadow sm:p-10">
            <motion.div key={testimonial.name} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="min-h-[230px]">
              <div className="flex gap-1 text-accent-500">{Array.from({ length: testimonial.rating }).map((_, i) => <Star key={i} size={18} fill="currentColor" />)}</div>
              <blockquote className="mt-7 font-display text-2xl font-semibold leading-10 text-brand-950 sm:text-3xl">“{testimonial.quote}”</blockquote>
              <div className="mt-8 flex items-center gap-3"><img src={testimonial.image} loading="lazy" alt="" className="h-12 w-12 rounded-full object-cover" /><div><p className="font-bold text-brand-950">{testimonial.name}</p><p className="text-sm text-slate-500">{testimonial.role}</p></div></div>
            </motion.div>
            <div className="mt-8 flex gap-2"><button type="button" onClick={() => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length)} aria-label="Previous testimonial" className="grid h-10 w-10 place-items-center rounded-full border border-brand-200 text-brand-800"><ChevronLeft size={18} /></button><button type="button" onClick={() => setTestimonialIndex((i) => (i + 1) % testimonials.length)} aria-label="Next testimonial" className="grid h-10 w-10 place-items-center rounded-full border border-brand-200 text-brand-800"><ChevronRight size={18} /></button></div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-brand-900 px-6 py-12 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-14">
          <div><p className="text-sm font-bold uppercase tracking-[0.18em] text-accent-300">Ready when you are</p><h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-[-.04em] sm:text-4xl">Ready to boost your grades?</h2><p className="mt-3 max-w-2xl text-white/65">Book a free demo conversation and tell us what your child needs.</p></div>
          <Link to="/contact" className="mt-7 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 font-bold text-brand-950 hover:bg-accent-400 lg:mt-0">Book Free Demo Class <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}
