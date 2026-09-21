import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function StatCounter({ value, suffix = '', label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame;
    let start;
    const duration = 1200;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
      <div className="font-display text-3xl font-bold text-brand-950 sm:text-4xl">{count}{suffix}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:text-sm">{label}</div>
    </motion.div>
  );
}
