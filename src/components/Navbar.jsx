import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import logoUrl from '../../Media/favi.png';

const links = [
  ['Home', '/'],
  ['About Us', '/about'],
  ['Courses', '/courses'],
  ['Testimonials', '/testimonials'],
  ['Contact', '/contact'],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const navClass = ({ isActive }) =>
    `text-sm font-semibold transition hover:text-brand-700 ${isActive ? 'text-brand-700' : 'text-slate-600'}`;

  const mobileNavClass = ({ isActive }) =>
    `rounded-xl px-4 py-3.5 text-base font-semibold transition ${isActive ? 'bg-brand-100 text-brand-800' : 'text-slate-700 hover:bg-white'}`;

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'px-3 pt-3' : 'pt-0'}`}>
        <div className={`mx-auto flex max-w-7xl items-center justify-between border-b px-4 py-3 transition-all sm:px-6 lg:px-8 ${scrolled ? 'rounded-2xl border-white/50 bg-white/80 shadow-lg shadow-brand-950/5 backdrop-blur-xl' : 'border-white/30 bg-paper/85 backdrop-blur-md'}`}>
          <NavLink to="/" end className="flex items-center gap-3" aria-label="Reliant India Home Tuition home">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-950 p-2 shadow-lg shadow-brand-950/10">
              <img src={logoUrl} alt="Reliant India logo" className="h-full w-full object-contain" />
            </span>
            <span className="hidden sm:block">
              <span className="block font-display text-sm font-bold text-brand-950">Reliant India</span>
              <span className="block text-xs font-semibold text-slate-500">Home Tuition</span>
            </span>
          </NavLink>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {links.map(([label, href]) => (
              <NavLink key={href} to={href} end={href === '/'} className={navClass}>
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <NavLink
              to="/contact"
              end
              className="hidden rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-bold text-brand-950 shadow-md shadow-accent-500/20 transition hover:-translate-y-0.5 hover:bg-accent-400 sm:inline-flex"
            >
              Book Free Demo Class
            </NavLink>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-brand-950 lg:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-label="Close menu overlay"
              className="fixed inset-0 z-[60] bg-brand-950/35 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              className="fixed right-0 top-0 z-[70] flex h-full w-[min(90vw,360px)] flex-col bg-paper p-6 shadow-2xl lg:hidden"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold text-brand-950">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-2" aria-label="Mobile primary navigation">
                {links.map(([label, href]) => (
                  <NavLink key={href} to={href} end={href === '/'} className={mobileNavClass}>
                    {label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-auto">
                <NavLink to="/contact" end className="flex items-center justify-between rounded-2xl bg-accent-500 px-5 py-4 font-bold text-brand-950">
                  Book Free Demo Class <ArrowUpRight size={20} />
                </NavLink>
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  One-to-one home tuition, flexible schedules and academic support.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
