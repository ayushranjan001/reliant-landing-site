import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

export default function SiteLayout({ children }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <ScrollToTop />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
