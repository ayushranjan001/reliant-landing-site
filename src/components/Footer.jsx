import { ArrowUpRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickLinks = [['Home', '/'], ['About Us', '/about'], ['Courses', '/courses'], ['Faculty', '/faculty'], ['Results', '/results'], ['Testimonials', '/testimonials'], ['Contact', '/contact']];
const courseLinks = ['Class 6–8', 'Class 9–10', 'Class 11–12', 'Competitive Exams'];

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_.8fr_.8fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 p-2"><img src="/Media/favi.png" alt="Reliant India logo" className="h-full w-full object-contain" /></span>
            <div><p className="font-display font-bold">Reliant India</p><p className="text-xs font-semibold text-white/55">Home Tuition</p></div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">Personalised academic support at home, designed to help students learn with more clarity, confidence and consistency.</p>
          <div className="mt-6 flex gap-2">
            {[['Facebook', Facebook], ['Instagram', Instagram], ['LinkedIn', Linkedin], ['Twitter', Twitter]].map(([label, Icon]) => <a key={label} href="#" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 transition hover:-translate-y-0.5 hover:bg-white/10"><Icon size={17} /></a>)}
          </div>
        </div>
        <div><h3 className="font-display text-sm font-bold">Quick links</h3><div className="mt-4 grid gap-3">{quickLinks.map(([label, href]) => <Link key={href} to={href} className="text-sm text-white/60 hover:text-white">{label}</Link>)}</div></div>
        <div><h3 className="font-display text-sm font-bold">Courses</h3><div className="mt-4 grid gap-3">{courseLinks.map((label) => <Link key={label} to="/courses" className="text-sm text-white/60 hover:text-white">{label}</Link>)}</div></div>
        <div>
          <h3 className="font-display text-sm font-bold">Stay in the loop</h3>
          <p className="mt-4 text-sm leading-6 text-white/60">Newsletter signup is ready for backend integration.</p>
          <div className="mt-4 flex rounded-2xl border border-white/10 bg-white/5 p-1.5">
            <input aria-label="Email for newsletter" placeholder="Your email" className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/35" />
            <button type="button" aria-label="Subscribe to newsletter" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-500 text-brand-950"><Send size={17} /></button>
          </div>
          <div className="mt-5 grid gap-3 text-sm text-white/65">
            <a href="tel:+917766911938" className="flex items-center gap-3 hover:text-white"><Phone size={16} /> +91 77669 11938</a>
            <a href="mailto:reliantindiagroup4u@gmail.com" className="flex items-center gap-3 break-all hover:text-white"><Mail size={16} /> reliantindiagroup4u@gmail.com</a>
            <span className="flex items-start gap-3"><MapPin className="mt-0.5 shrink-0" size={16} /> Near IIT Bihta, Patna – 801103</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 sm:px-6 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Reliant India Group. All rights reserved.</span><span className="inline-flex items-center gap-1">Built for better learning <ArrowUpRight size={13} /></span></div></div>
    </footer>
  );
}
