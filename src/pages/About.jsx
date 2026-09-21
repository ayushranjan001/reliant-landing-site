import { motion } from 'framer-motion';
import { BookOpen, HeartHandshake, Lightbulb, MonitorSmartphone, ShieldCheck, Sparkles, Users } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const values = [
  [HeartHandshake, 'Student-first', 'Teaching starts with the learner’s actual needs, not a fixed template.'],
  [ShieldCheck, 'Trust by design', 'Clear communication and a thoughtful matching process keep parents in the loop.'],
  [Lightbulb, 'Clarity over complexity', 'Good tutoring makes concepts feel simpler, more practical and less intimidating.'],
  [Users, 'Human connection', 'Strong tutor-student relationships create the space for better questions and better learning.'],
];

const timeline = [
  ['2014', 'Reliant begins local education support', 'TODO: replace with the verified founding milestone and story.'],
  ['2018', 'Home tuition network expands', 'TODO: replace with verified expansion details.'],
  ['2022', 'Structured tutor matching introduced', 'TODO: replace with verified service milestone.'],
  ['2026', 'A more connected learning experience', 'TODO: replace with this year’s real achievements and plans.'],
];

export default function About() {
  return (
    <>
      <section className="pt-32 sm:pt-36"><div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24"><SectionHeading eyebrow="About Reliant India" title="Warm, local guidance with the discipline of a modern learning platform." copy="We are positioning Reliant India Home Tuition as a focused academic support service: personal enough to know the student, structured enough to measure progress." /><div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><div className="rounded-[2rem] bg-brand-950 p-8 text-white sm:p-10"><Sparkles className="text-accent-400" /><h3 className="mt-6 font-display text-3xl font-bold">A tutoring relationship should feel human.</h3><p className="mt-4 max-w-2xl leading-8 text-white/65">TODO: replace this section with the final Reliant India story, mission and founder narrative. The visual structure is ready for that content.</p></div><div className="rounded-[2rem] border border-brand-100 bg-white p-8 card-shadow"><BookOpen className="text-brand-700" /><h3 className="mt-6 font-display text-2xl font-bold text-brand-950">Our mission</h3><p className="mt-3 leading-7 text-slate-600">Help students learn with more confidence by giving them access to focused teaching, consistent practice and supportive academic relationships.</p></div></div></div></section>

      <section className="bg-white"><div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24"><SectionHeading eyebrow="Vision & values" title="The principles behind every learning plan." /><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{values.map(([Icon, title, copy], i) => <motion.article key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }} className="rounded-3xl border border-brand-100 bg-paper p-6"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-100 text-brand-700"><Icon size={22} /></div><h3 className="mt-5 font-display font-bold text-brand-950">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{copy}</p></motion.article>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24"><SectionHeading eyebrow="Milestones" title="A timeline ready for the real Reliant story." /><div className="mt-12 grid gap-4">{timeline.map(([year, title, copy], i) => <motion.div key={year} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }} className="grid gap-4 rounded-3xl border border-brand-100 bg-white p-6 sm:grid-cols-[130px_1fr] sm:items-center card-shadow"><div className="font-display text-3xl font-bold text-brand-700">{year}</div><div><h3 className="font-display text-xl font-bold text-brand-950">{title}</h3><p className="mt-1 leading-7 text-slate-600">{copy}</p></div></motion.div>)}</div></section>

      <section className="bg-[#efeade]"><div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-3 lg:px-8 lg:py-24"><div><MonitorSmartphone className="text-brand-700" /><h3 className="mt-5 font-display text-xl font-bold">Smart classrooms</h3><p className="mt-2 text-sm leading-7 text-slate-600">TODO: replace with confirmed infrastructure highlights, equipment and classroom imagery.</p></div><div><BookOpen className="text-brand-700" /><h3 className="mt-5 font-display text-xl font-bold">Learning resources</h3><p className="mt-2 text-sm leading-7 text-slate-600">TODO: add verified details for libraries, worksheets, practice resources and test series.</p></div><div><Users className="text-brand-700" /><h3 className="mt-5 font-display text-xl font-bold">Tutor network</h3><p className="mt-2 text-sm leading-7 text-slate-600">TODO: replace placeholder network size and coverage with verified information.</p></div></div></section>
    </>
  );
}
