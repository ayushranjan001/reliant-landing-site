import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';

export default function SiteLayout({ children }) {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main key={location.pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
