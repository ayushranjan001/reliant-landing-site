import { useMemo, useState } from 'react';
import { CheckCircle2, CreditCard, LockKeyhole, ShieldCheck, Smartphone, WalletCards } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import { tutors } from '../data/marketplace';

const PRODUCTS = {
  demo: { title:'Free Demo Session', price:0, note:'Experience the match before committing.' },
  'teacher-pro': { title:'Teacher Pro — Lead Access', price:999, note:'Demo pricing — replace with approved commercial plan.' },
};

export default function Checkout() {
  const [params] = useSearchParams();
  const tutor = tutors.find((item)=>item.id===params.get('tutor'));
  const product = params.get('product') || (tutor ? 'tutor' : 'demo');
  const selected = product === 'tutor' ? { title:`1:1 session with ${tutor.name}`, price:parseInt(tutor.rate.replace(/\D/g,''),10), note:`${tutor.subject} • ${tutor.mode}` } : PRODUCTS[product] || PRODUCTS.demo;
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [message,setMessage] = useState('');
  const paymentConfigured = Boolean(import.meta.env.VITE_RAZORPAY_PAYMENT_LINK_URL);

  const total = useMemo(()=>selected.price,[selected.price]);

  const handlePay = (event)=>{
    event.preventDefault();
    if(!email || !phone) {
      setMessage('Enter your email and phone number to continue.');
      return;
    }
    if(total === 0) {
      setMessage('Free booking request captured. The final booking backend can confirm your demo slot.');
      return;
    }
    if(!paymentConfigured) {
      setMessage('Checkout UI is ready. Add VITE_RAZORPAY_PAYMENT_LINK_URL in Netlify to activate live payments.');
      return;
    }
    window.location.assign(import.meta.env.VITE_RAZORPAY_PAYMENT_LINK_URL);
  };

  return (
    <main className="bg-paper pt-28 sm:pt-32">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8 lg:py-20">
        <div><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Secure checkout</p><h1 className="mt-3 font-display text-4xl font-bold tracking-[-.04em] text-brand-950 sm:text-5xl">Complete your Reliant booking.</h1><p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">The commercial experience ends here: choose the service, enter your details and pay from the platform instead of leaving for a manual enquiry.</p><div className="mt-8 grid gap-3 text-sm"><div className="flex items-center gap-3 rounded-2xl bg-white p-4 border border-brand-100"><LockKeyhole className="text-brand-700"/><span><strong className="text-brand-950">Secure checkout flow</strong><br/><span className="text-slate-500">Payment provider credentials are kept outside the browser.</span></span></div><div className="flex items-center gap-3 rounded-2xl bg-white p-4 border border-brand-100"><ShieldCheck className="text-emerald-600"/><span><strong className="text-brand-950">Transparent pricing</strong><br/><span className="text-slate-500">No hidden fields or offline payment instructions.</span></span></div></div></div>
        <form onSubmit={handlePay} className="rounded-[2rem] border border-brand-100 bg-white p-6 card-shadow sm:p-8">
          <div className="flex items-start justify-between gap-4 border-b border-brand-100 pb-6"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-slate-400">Order</p><h2 className="mt-2 font-display text-2xl font-bold text-brand-950">{selected.title}</h2><p className="mt-1 text-sm text-slate-500">{selected.note}</p></div><p className="font-display text-3xl font-extrabold text-brand-700">₹{total.toLocaleString('en-IN')}</p></div>
          <div className="mt-6 grid gap-5"><label className="grid gap-2 text-sm font-bold text-brand-950">Email<input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required placeholder="you@example.com" className="rounded-xl border border-brand-200 px-4 py-3.5 font-normal outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-100"/></label><label className="grid gap-2 text-sm font-bold text-brand-950">Phone<input value={phone} onChange={(e)=>setPhone(e.target.value)} inputMode="numeric" required placeholder="10-digit mobile number" className="rounded-xl border border-brand-200 px-4 py-3.5 font-normal outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-100"/></label></div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3"><div className="rounded-xl border border-brand-100 bg-paper p-4 text-center"><CreditCard className="mx-auto text-brand-700"/><p className="mt-2 text-xs font-bold">Cards</p></div><div className="rounded-xl border border-brand-100 bg-paper p-4 text-center"><Smartphone className="mx-auto text-brand-700"/><p className="mt-2 text-xs font-bold">UPI</p></div><div className="rounded-xl border border-brand-100 bg-paper p-4 text-center"><WalletCards className="mx-auto text-brand-700"/><p className="mt-2 text-xs font-bold">Wallets</p></div></div>
          <button type="submit" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-4 font-bold text-brand-950 hover:bg-accent-400"><CheckCircle2 size={19}/>{total ? 'Proceed to secure payment' : 'Confirm free booking'}</button>
          {message && <p role="status" className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800">{message}</p>}
          <p className="mt-4 text-center text-xs leading-5 text-slate-400">Live payment activation requires Reliant India’s approved Razorpay payment link or gateway credentials. No secret key is stored in this page.</p>
          <Link to="/" className="mt-5 block text-center text-sm font-bold text-brand-700">Back to Reliant India</Link>
        </form>
      </section>
    </main>
  );
}
