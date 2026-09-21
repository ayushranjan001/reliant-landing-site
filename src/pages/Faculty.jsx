import { motion } from 'framer-motion';
import { ArrowUpRight, Award, BookOpen } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { faculty } from '../data/faculty';

export default function Faculty() {
  return (
    <>
      <section className="pt-32 sm:pt-36"><div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20"><SectionHeading eyebrow="Faculty" title="Teachers who bring clarity, patience and subject depth." copy="Placeholder profiles are provided so the layout can be reviewed now. Replace them with approved teacher bios and professional photos." /><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{faculty.map((teacher, index) => <motion.article key={teacher.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: index * .06 }} className="group [perspective:1000px]"><div className="relative min-h-[420px] transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"><div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-brand-100 bg-white p-3 [backface-visibility:hidden] card-shadow"><img src={teacher.image} alt={teacher.name} loading="lazy" className="h-64 w-full rounded-[1.5rem] object-cover" /><div className="p-4"><p className="text-sm font-bold text-brand-700">{teacher.subject}</p><h3 className="mt-1 font-display text-xl font-bold text-brand-950">{teacher.name}</h3><p className="mt-2 text-sm text-slate-500">{teacher.qualification} · {teacher.experience}</p></div></div><div className="absolute inset-0 flex flex-col rounded-[2rem] bg-brand-900 p-7 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]"><Award className="text-accent-400" /><p className="mt-7 text-sm font-bold uppercase tracking-[0.16em] text-accent-300">{teacher.subject}</p><h3 className="mt-2 font-display text-2xl font-bold">{teacher.name}</h3><p className="mt-5 leading-7 text-white/65">{teacher.bio}</p><div className="mt-auto flex items-center gap-2 text-sm font-semibold text-white/80"><BookOpen size={16} /> {teacher.qualification}</div><div className="mt-4 inline-flex items-center gap-2 font-bold text-accent-300">View profile <ArrowUpRight size={16} /></div></div></div></motion.article>)}</div></div></section>
    </>
  );
}
