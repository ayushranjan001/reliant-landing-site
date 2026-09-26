import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import SiteLayout from './components/SiteLayout';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Faculty from './pages/Faculty';
import Results from './pages/Results';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import FindTutor from './pages/FindTutor';
import FindStudents from './pages/FindStudents';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';

const meta = {
  '/': ['Reliant India Home Tuition | Personalised Home Tutors', 'Personalised home tuition with flexible learning support, tutor matching and academic guidance from Reliant India.'],
  '/about': ['About Reliant India Home Tuition', 'Learn about Reliant India Home Tuition\'s mission, values and learning approach.'],
  '/courses': ['Home Tuition Courses | Reliant India', 'Explore personalised academic support for Classes 6–8, 9–10, 11–12 and competitive exams.'],
  '/faculty': ['Faculty & Tutors | Reliant India', 'Meet placeholder faculty profiles for the Reliant India Home Tuition experience.'],
  '/results': ['Results & Achievements | Reliant India', 'Explore placeholder student results and academic achievements.'],
  '/testimonials': ['Parent & Student Testimonials | Reliant India', 'Read placeholder stories from parents and students about home tuition support.'],
  '/contact': ['Book a Free Demo Class | Reliant India', 'Contact Reliant India Home Tuition to discuss a personalised learning plan.'],
};

function MetaController() {
  const { pathname } = useLocation();
  useEffect(() => {
    const [title, description] = meta[pathname] || meta['/'];
    document.title = title;
    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute('content', description);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <SiteLayout>
      <MetaController />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/results" element={<Results />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/find-tutor" element={<FindTutor />} />
        <Route path="/find-students" element={<FindStudents />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteLayout>
  );
}
