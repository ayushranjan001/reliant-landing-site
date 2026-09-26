import { useState } from 'react';
import { ArrowRight, BookOpen, Check, Eye, EyeOff, GraduationCap, ShieldCheck, Users, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../lib/auth';

const roles = [
  { id: 'parent', label: 'Parent', icon: Users, description: 'Manage learning for your child' },
  { id: 'student', label: 'Student', icon: GraduationCap, description: 'Build your personal learning journey' },
  { id: 'teacher', label: 'Teacher', icon: BookOpen, description: 'Teach students and grow your practice' },
];

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState(new URLSearchParams(location.search).get('mode') === 'signup' ? 'signup' : 'login');
  const [role, setRole] = useState('parent');
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');

    try {
      if (mode === 'signup') {
        const data = await signUp({ ...form, role });
        if (data.session) {
          navigate(role === 'teacher' ? '/find-students' : '/dashboard');
        } else {
          setMessage('Account created. Check your email to confirm your account, then sign in.');
        }
      } else {
        await signIn(form);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper pt-24">
      <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl lg:grid-cols-[1.05fr_.95fr]">
        <section className="hidden flex-col justify-center px-8 py-16 lg:flex lg:px-14">
          <Link to="/" className="text-sm font-bold text-brand-700">← Back to Reliant</Link>
          <p className="mt-14 text-sm font-bold uppercase tracking-[.2em] text-brand-700">Your learning, connected</p>
          <h1 className="mt-4 max-w-xl font-display text-5xl font-extrabold tracking-[-.04em] text-brand-950">
            One account for your entire Reliant journey.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
            Find tutors, manage classes, build a learning roadmap and eventually let Reliant adapt your plan around your goals.
          </p>
          <div className="mt-10 space-y-4">
            {['Verified tutor marketplace', 'Personal learning roadmap', 'Classes, progress and payments in one place'].map((item) => (
              <div key={item} className="flex items-center gap-3 font-semibold text-brand-950">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-100 text-accent-700"><Check size={16} /></span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
          <div className="w-full max-w-md rounded-[2rem] border border-brand-100 bg-white p-6 shadow-xl shadow-brand-950/5 sm:p-8">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-brand-700"><ShieldCheck size={18} /><span className="text-sm font-bold">Reliant account</span></div>
                <h2 className="mt-3 font-display text-3xl font-extrabold text-brand-950">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">{mode === 'login' ? 'Sign in to continue your learning journey.' : 'Choose how you’ll use Reliant to get started.'}</p>
              </div>
              <Link to="/" aria-label="Close" className="grid h-9 w-9 place-items-center rounded-xl bg-paper text-slate-500"><X size={17} /></Link>
            </div>

            <div className="mb-6 grid grid-cols-2 rounded-xl bg-paper p-1">
              <button type="button" onClick={() => { setMode('login'); setError(''); setMessage(''); }} className={`rounded-lg px-3 py-2.5 text-sm font-bold ${mode === 'login' ? 'bg-white text-brand-950 shadow-sm' : 'text-slate-500'}`}>Log in</button>
              <button type="button" onClick={() => { setMode('signup'); setError(''); setMessage(''); }} className={`rounded-lg px-3 py-2.5 text-sm font-bold ${mode === 'signup' ? 'bg-white text-brand-950 shadow-sm' : 'text-slate-500'}`}>Sign up</button>
            </div>

            {mode === 'signup' && (
              <div className="mb-5">
                <p className="mb-2 text-sm font-bold text-brand-950">I am joining as</p>
                <div className="grid gap-2">
                  {roles.map(({ id, label, icon: Icon, description }) => (
                    <button type="button" key={id} onClick={() => setRole(id)} className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition ${role === id ? 'border-brand-700 bg-brand-50 ring-2 ring-brand-100' : 'border-brand-100 hover:border-brand-300'}`}>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-brand-700 shadow-sm"><Icon size={18} /></span>
                      <span><span className="block text-sm font-bold text-brand-950">{label}</span><span className="block text-xs text-slate-500">{description}</span></span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={submit} className="space-y-4">
              {mode === 'signup' && (
                <label className="block"><span className="mb-2 block text-sm font-bold text-brand-950">Full name</span><input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full rounded-xl border border-brand-100 bg-paper px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100" placeholder="Your full name" /></label>
              )}
              <label className="block"><span className="mb-2 block text-sm font-bold text-brand-950">Email address</span><input required type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-brand-100 bg-paper px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100" placeholder="you@example.com" /></label>
              <label className="block"><span className="mb-2 block text-sm font-bold text-brand-950">Password</span><span className="relative block"><input required minLength={6} type={showPassword ? 'text' : 'password'} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-xl border border-brand-100 bg-paper px-4 py-3 pr-11 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100" placeholder="At least 6 characters" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label>

              {error && <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>}
              {message && <p role="status" className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{message}</p>}

              <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-950 px-5 py-3.5 font-bold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60">
                {busy ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}
                {!busy && <ArrowRight size={17} />}
              </button>
            </form>

            <p className="mt-5 text-center text-xs leading-5 text-slate-400">
              By continuing, you agree to use Reliant responsibly. Parent/guardian accounts should manage profiles for minors.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
