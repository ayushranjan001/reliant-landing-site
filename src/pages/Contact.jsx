import { useState } from 'react';
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const WA_NUMBER = '917766911938';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', classLevel: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) next.phone = 'Please enter a valid 10-digit phone number.';
    if (!form.classLevel) next.classLevel = 'Select a class or grade.';
    if (!form.subject) next.subject = 'Select a subject.';
    setErrors(next);
    if (Object.keys(next).length) return;

    // TODO: replace this WhatsApp handoff with the final backend/email integration.
    const text = ['Hello Reliant India, I would like to book a free demo class.', `Name: ${form.name}`, `Phone: ${form.phone}`, `Class: ${form.classLevel}`, `Subject: ${form.subject}`, form.message && `Message: ${form.message}`].filter(Boolean).join('\n');
    setSubmitted(true);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <section className="pt-32 sm:pt-36"><div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16"><SectionHeading eyebrow="Contact & book a demo" title="Let’s build the right learning plan." copy="Tell us the essentials. The form validates the details in your browser and currently hands the enquiry to WhatsApp. A backend/email service can replace that handoff later." /></div></section>
      <section className="bg-white"><div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[.72fr_1.28fr] lg:px-8 lg:py-20">
        <div className="rounded-[2rem] bg-brand-950 p-7 text-white sm:p-8"><p className="text-sm font-bold uppercase tracking-[0.18em] text-accent-300">Talk to Reliant</p><div className="mt-8 grid gap-5"><a href="tel:+917766911938" className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10"><Phone size={18} /></span><span><span className="block text-xs font-semibold uppercase tracking-wider text-white/40">Phone</span><span className="mt-1 block font-bold">+91 77669 11938</span></span></a><a href="mailto:reliantindiagroup4u@gmail.com" className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10"><Mail size={18} /></span><span><span className="block text-xs font-semibold uppercase tracking-wider text-white/40">Email</span><span className="mt-1 block break-all font-bold">reliantindiagroup4u@gmail.com</span></span></a><div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10"><MapPin size={18} /></span><span><span className="block text-xs font-semibold uppercase tracking-wider text-white/40">Address</span><span className="mt-1 block font-bold leading-6">Near IIT Bihta, Patna – 801103</span></span></div></div><a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-accent-500 px-5 py-3 font-bold text-brand-950"><MessageCircle size={18} /> WhatsApp us</a></div>
        <div className="grid gap-6">
          <form onSubmit={submit} noValidate className="rounded-[2rem] border border-brand-100 bg-paper p-6 card-shadow sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {[['name','Name','text','e.g. Priya Sharma'],['phone','Phone','tel','10-digit mobile number']].map(([key,label,type,placeholder]) => <label key={key} className="grid gap-2 text-sm font-bold text-brand-950">{label}<input value={form[key]} onChange={(e) => update(key, e.target.value)} type={type} placeholder={placeholder} aria-invalid={Boolean(errors[key])} className="rounded-xl border border-brand-200 bg-white px-4 py-3.5 font-normal outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-brand-100" />{errors[key] && <span className="font-normal text-sm text-red-600">{errors[key]}</span>}</label>)}
              <label className="grid gap-2 text-sm font-bold text-brand-950">Class / Grade<select value={form.classLevel} onChange={(e) => update('classLevel', e.target.value)} aria-invalid={Boolean(errors.classLevel)} className="rounded-xl border border-brand-200 bg-white px-4 py-3.5 font-normal outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-100"><option value="">Choose one</option><option>Class 1–5</option><option>Class 6–8</option><option>Class 9–10</option><option>Class 11–12</option><option>Competitive Exam</option></select>{errors.classLevel && <span className="font-normal text-sm text-red-600">{errors.classLevel}</span>}</label>
              <label className="grid gap-2 text-sm font-bold text-brand-950">Subject Interested<select value={form.subject} onChange={(e) => update('subject', e.target.value)} aria-invalid={Boolean(errors.subject)} className="rounded-xl border border-brand-200 bg-white px-4 py-3.5 font-normal outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-100"><option value="">Choose one</option><option>Mathematics</option><option>Science</option><option>English</option><option>Physics</option><option>Chemistry</option><option>Biology</option><option>All Subjects</option></select>{errors.subject && <span className="font-normal text-sm text-red-600">{errors.subject}</span>}</label>
              <label className="grid gap-2 text-sm font-bold text-brand-950 sm:col-span-2">Message<textarea value={form.message} onChange={(e) => update('message', e.target.value)} rows="5" placeholder="Tell us about your goals, preferred timing or area." className="rounded-xl border border-brand-200 bg-white px-4 py-3.5 font-normal outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-100" /></label>
            </div>
            <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 font-bold text-brand-950 shadow-lg shadow-accent-500/15 transition hover:bg-accent-400"><Send size={18} /> Book Free Demo Class</button>
            {submitted && <p role="status" className="mt-4 rounded-xl bg-brand-100 px-4 py-3 text-sm font-semibold text-brand-800">Your enquiry is prepared. Complete the WhatsApp message to contact Reliant India.</p>}
          </form>

          <div className="overflow-hidden rounded-[2rem] border border-brand-100 bg-white"><iframe title="Reliant India location map" loading="lazy" className="h-80 w-full border-0" src="https://www.google.com/maps?q=Near%20IIT%20Bihta%2C%20Patna%20801103&output=embed" /></div>
        </div>
      </div></section>
    </>
  );
}
