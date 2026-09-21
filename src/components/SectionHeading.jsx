import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, copy, align = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55 }}
      className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}
    >
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-700">{eyebrow}</p>
      <h2 className="font-display text-3xl font-bold tracking-[-0.04em] text-brand-950 sm:text-4xl lg:text-5xl">{title}</h2>
      {copy && <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{copy}</p>}
    </motion.div>
  );
}
