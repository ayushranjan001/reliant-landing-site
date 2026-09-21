import { MessageCircle } from 'lucide-react';

const WA_NUMBER = '917766911938';

export default function WhatsAppFloat() {
  return (
    <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hello Reliant India, I would like to book a free demo class.')}`} target="_blank" rel="noreferrer" aria-label="Chat with Reliant India on WhatsApp" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-900/25 ring-4 ring-white/80 transition hover:scale-105">
      <span className="absolute inset-0 rounded-full border-4 border-white/35 animate-ping" />
      <MessageCircle size={26} fill="currentColor" />
    </a>
  );
}
