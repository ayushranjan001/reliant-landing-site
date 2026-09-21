import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar, Box, Button, Card, CardContent, Chip, Container, Divider, Drawer,
  Grid, IconButton, Link, MenuItem, Paper, Stack, TextField, Toolbar, Typography,
} from '@mui/material';
import {
  ArrowForward, AutoAwesome, BookOutlined, CheckCircle, Close, EmojiEvents,
  Menu, PersonSearch, Phone, School, Send, ShieldOutlined, Star, WhatsApp,
} from '@mui/icons-material';
import { submitEnquiryRequest } from './store';

const WA_NUMBER = '917766911938';

function Reveal({ children, delay = 0, sx }) {
  const [visible, setVisible] = useState(false);
  const ref = React.useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <Box ref={ref} className={`reveal ${visible ? 'visible' : ''}`} sx={{ transitionDelay: `${delay}ms`, ...sx }}>{children}</Box>;
}

function App() {
  const dispatch = useDispatch();
  const enquiryStatus = useSelector((state) => state.enquiry.status);
  const [drawer, setDrawer] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', classLevel: '', subject: '', city: '', message: '' });

  const subjects = useMemo(() => ['Mathematics', 'Science', 'English', 'Physics', 'Chemistry', 'Biology', 'All subjects'], []);

  const navTo = (id) => {
    setDrawer(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const submit = (event) => {
    event.preventDefault();
    dispatch(submitEnquiryRequest(form));
    const text = [
      'Hello Reliant India Home Tuition, I would like to enquire about a home tutor.',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Class: ${form.classLevel}`,
      `Subject: ${form.subject}`,
      `City/Area: ${form.city}`,
      form.message ? `Requirement: ${form.message}` : '',
    ].filter(Boolean).join('\\n');
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box sx={{ overflow: 'hidden', color: 'text.primary' }}>
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: 'rgba(248,250,252,.78)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(15,23,42,.06)', color: 'text.primary' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 72, justifyContent: 'space-between' }}>
            <Stack direction="row" alignItems="center" spacing={1.25}>
              <Box component="img" src="/Media/favi.png" alt="Reliant India" sx={{ width: 38, height: 38, objectFit: 'contain' }} />
              <Box>
                <Typography sx={{ fontWeight: 800, fontFamily: 'Plus Jakarta Sans', lineHeight: 1 }}>Reliant India</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>Home Tuition</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={3} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
              {['Why us', 'How it works', 'Subjects', 'Contact'].map((item) => (
                <Link key={item} component="button" underline="none" color="text.secondary" onClick={() => navTo(item.toLowerCase().replace(' ', '-'))} sx={{ fontWeight: 600, bgcolor: 'transparent', border: 0, cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>{item}</Link>
              ))}
              <Button variant="contained" onClick={() => navTo('contact')} endIcon={<ArrowForward />}>Find a tutor</Button>
            </Stack>
            <IconButton onClick={() => setDrawer(true)} sx={{ display: { md: 'none' } }}><Menu /></IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={drawer} onClose={() => setDrawer(false)}>
        <Box sx={{ width: 280, p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography fontWeight={800}>Menu</Typography>
            <IconButton onClick={() => setDrawer(false)}><Close /></IconButton>
          </Stack>
          <Stack spacing={1}>
            {['Why us', 'How it works', 'Subjects', 'Contact'].map((item) => (
              <Button key={item} fullWidth sx={{ justifyContent: 'flex-start', py: 1.5 }} onClick={() => navTo(item.toLowerCase().replace(' ', '-'))}>{item}</Button>
            ))}
          </Stack>
        </Box>
      </Drawer>

      <Box component="main">
        <Box sx={{ pt: { xs: 13, md: 15 }, pb: { xs: 8, md: 12 }, position: 'relative', background: 'radial-gradient(circle at 78% 18%, rgba(6,182,212,.14), transparent 28%), radial-gradient(circle at 15% 10%, rgba(79,70,229,.12), transparent 32%), #f8fafc' }}>
          <Box className="hero-orb" sx={{ width: 320, height: 320, bgcolor: 'rgba(79,70,229,.08)', right: -100, top: 100 }} />
          <Container maxWidth="lg">
            <Grid container spacing={{ xs: 5, md: 7 }} alignItems="center">
              <Grid size={{ xs: 12, md: 7 }}>
                <Reveal>
                  <Chip icon={<AutoAwesome />} label="Personalised learning at home" color="primary" variant="outlined" sx={{ mb: 2.5, bgcolor: 'rgba(255,255,255,.6)', fontWeight: 700 }} />
                  <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '4.8rem' }, lineHeight: 1.03, maxWidth: 760 }}>
                    The right tutor can change the way a child <span className="gradient-text">learns.</span>
                  </Typography>
                  <Typography sx={{ mt: 3, fontSize: { xs: '1.05rem', md: '1.2rem' }, lineHeight: 1.75, color: 'text.secondary', maxWidth: 650 }}>
                    One-to-one home tuition built around your child’s class, subjects, pace and goals — with verified tutors and focused academic support.
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} mt={4}>
                    <Button size="large" variant="contained" onClick={() => navTo('contact')} endIcon={<ArrowForward />}>Find a home tutor</Button>
                    <Button size="large" variant="outlined" component="a" href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer" startIcon={<WhatsApp />}>Talk on WhatsApp</Button>
                  </Stack>
                  <Stack direction="row" spacing={3} mt={4} flexWrap="wrap" useFlexGap>
                    {['1-to-1 attention', 'Verified tutors', 'Flexible scheduling'].map((x) => <Stack key={x} direction="row" spacing={.7} alignItems="center"><CheckCircle color="primary" sx={{ fontSize: 18 }} /><Typography variant="body2" fontWeight={600}>{x}</Typography></Stack>)}
                  </Stack>
                </Reveal>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <Reveal delay={120}>
                  <Box sx={{ position: 'relative', maxWidth: 520, mx: 'auto' }}>
                    <Paper elevation={0} sx={{ p: 1.5, borderRadius: 7, background: 'linear-gradient(145deg, rgba(255,255,255,.96), rgba(238,242,255,.86))', boxShadow: '0 30px 80px rgba(15,23,42,.12)', border: '1px solid rgba(255,255,255,.9)' }}>
                      <Box component="img" src="/Media/tuitionservice.png" alt="Home tuition with a student and tutor" sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 5 }} />
                    </Paper>
                    <Paper className="float-card" elevation={0} sx={{ position: 'absolute', left: -28, bottom: 38, p: 1.5, borderRadius: 3, display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1.2, boxShadow: '0 18px 50px rgba(15,23,42,.13)', border: '1px solid #fff' }}>
                      <Box sx={{ width: 42, height: 42, borderRadius: 2, bgcolor: 'rgba(79,70,229,.1)', display: 'grid', placeItems: 'center' }}><School color="primary" /></Box>
                      <Box><Typography variant="caption" color="text.secondary">Learning plan</Typography><Typography fontWeight={800}>Built for your child</Typography></Box>
                    </Paper>
                    <Paper className="float-card delay" elevation={0} sx={{ position: 'absolute', right: -18, top: 32, p: 1.4, borderRadius: 3, display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1, boxShadow: '0 18px 50px rgba(15,23,42,.13)', border: '1px solid #fff' }}>
                      <Star sx={{ color: '#f59e0b' }} /><Typography fontWeight={800}>Personal attention</Typography>
                    </Paper>
                  </Box>
                </Reveal>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box id="why-us" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fff' }}>
          <Container maxWidth="lg">
            <Reveal><Typography color="primary" fontWeight={800} textTransform="uppercase" letterSpacing=".12em" variant="caption">Why families choose us</Typography><Typography variant="h2" sx={{ mt: 1, fontSize: { xs: '2.2rem', md: '3.2rem' }, maxWidth: 720 }}>Tuition that feels personal, not generic.</Typography></Reveal>
            <Grid container spacing={2} mt={4}>
              {[
                [PersonSearch, 'Verified tutor matching', 'We help match the student’s needs with an appropriate tutor profile instead of treating every learner the same.'],
                [BookOutlined, 'Curriculum-aligned support', 'From homework and concept clarity to exam preparation, sessions can be shaped around the student’s academic requirements.'],
                [ShieldOutlined, 'A trusted home-learning experience', 'Clear communication, focused one-to-one sessions and a process designed around parents and students.'],
              ].map(([Icon, title, text], i) => <Grid key={title} size={{ xs: 12, md: 4 }}><Reveal delay={i * 90}><Card elevation={0} sx={{ height: '100%', p: 1.5, border: '1px solid #e5e7eb', borderRadius: 4, '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 20px 50px rgba(15,23,42,.08)' }, transition: 'all .25s' }}><CardContent><Box sx={{ width: 52, height: 52, borderRadius: 2.5, bgcolor: 'rgba(79,70,229,.1)', display: 'grid', placeItems: 'center', mb: 2 }}><Icon color="primary" /></Box><Typography variant="h6" fontWeight={800}>{title}</Typography><Typography color="text.secondary" sx={{ mt: 1.2, lineHeight: 1.7 }}>{text}</Typography></CardContent></Card></Reveal></Grid>)}
            </Grid>
          </Container>
        </Box>

        <Box id="how-it-works" sx={{ py: { xs: 8, md: 12 }, background: '#f1f5f9' }}>
          <Container maxWidth="lg">
            <Reveal><Typography color="primary" fontWeight={800} textTransform="uppercase" letterSpacing=".12em" variant="caption">Simple process</Typography><Typography variant="h2" sx={{ mt: 1, fontSize: { xs: '2.2rem', md: '3.2rem' } }}>From enquiry to first class.</Typography></Reveal>
            <Grid container spacing={2} mt={4}>
              {[
                ['01', 'Tell us what you need', 'Share your child’s class, subject, location and learning goals.'],
                ['02', 'We understand the requirement', 'We discuss the preferred schedule and the kind of academic support you are looking for.'],
                ['03', 'Get started with a tutor', 'Move ahead with a suitable tutor arrangement and a learning plan for the student.'],
              ].map(([n, title, text], i) => <Grid key={n} size={{ xs: 12, md: 4 }}><Reveal delay={i * 90}><Paper elevation={0} sx={{ p: 3, height: '100%', borderRadius: 4, bgcolor: '#fff' }}><Typography sx={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '2.6rem', color: 'primary.main', opacity: .22 }}>{n}</Typography><Typography variant="h6" fontWeight={800}>{title}</Typography><Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.7 }}>{text}</Typography></Paper></Reveal></Grid>)}
            </Grid>
          </Container>
        </Box>

        <Box id="subjects" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fff' }}>
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <Reveal><Typography color="primary" fontWeight={800} textTransform="uppercase" letterSpacing=".12em" variant="caption">Academic support</Typography><Typography variant="h2" sx={{ mt: 1, fontSize: { xs: '2.2rem', md: '3.1rem' } }}>Support across school subjects and levels.</Typography><Typography color="text.secondary" sx={{ mt: 2, lineHeight: 1.8 }}>Choose the subjects your child needs help with. The current service is designed for personalised home tuition, from regular curriculum support to focused exam preparation.</Typography><Stack direction="row" flexWrap="wrap" gap={1} mt={3}>{subjects.map((s) => <Chip key={s} label={s} sx={{ bgcolor: '#eef2ff', color: '#3730a3', fontWeight: 700 }} />)}</Stack></Reveal>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Reveal delay={100}><Paper elevation={0} sx={{ p: 3, borderRadius: 5, background: 'linear-gradient(135deg,#0f172a,#1e1b4b)', color: '#fff' }}><EmojiEvents sx={{ fontSize: 42, color: '#67e8f9' }} /><Typography variant="h4" fontWeight={800} mt={2}>A learning plan should fit the learner.</Typography><Typography sx={{ mt: 1.5, color: 'rgba(255,255,255,.72)', lineHeight: 1.8 }}>The goal is not simply to add another class to the timetable. It is to create focused time where a student can ask questions, practise concepts and build confidence.</Typography><Button variant="contained" color="secondary" sx={{ mt: 3 }} onClick={() => navTo('contact')} endIcon={<ArrowForward />}>Discuss your requirement</Button></Paper></Reveal>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box id="contact" sx={{ py: { xs: 8, md: 12 }, background: 'linear-gradient(180deg,#eef2ff,#f8fafc)' }}>
          <Container maxWidth="lg">
            <Grid container spacing={5} alignItems="start">
              <Grid size={{ xs: 12, md: 5 }}>
                <Reveal><Typography color="primary" fontWeight={800} textTransform="uppercase" letterSpacing=".12em" variant="caption">Start here</Typography><Typography variant="h2" sx={{ mt: 1, fontSize: { xs: '2.3rem', md: '3.3rem' } }}>Tell us what your child needs.</Typography><Typography color="text.secondary" sx={{ mt: 2, lineHeight: 1.8 }}>Send the basics and we’ll continue the conversation on WhatsApp.</Typography><Stack spacing={1.5} mt={4}><Stack direction="row" spacing={1.5} alignItems="center"><Phone color="primary" /><Box><Typography variant="caption" color="text.secondary">Call</Typography><Typography fontWeight={700}>+91 77669 11938</Typography></Box></Stack><Stack direction="row" spacing={1.5} alignItems="center"><WhatsApp color="success" /><Box><Typography variant="caption" color="text.secondary">WhatsApp</Typography><Typography fontWeight={700}>Available for enquiries</Typography></Box></Stack></Stack></Reveal>
              </Grid>
              <Grid size={{ xs: 12, md: 7 }}>
                <Reveal delay={100}><Paper component="form" onSubmit={submit} elevation={0} sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 5, border: '1px solid #e2e8f0', boxShadow: '0 25px 70px rgba(15,23,42,.08)' }}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}><TextField required label="Parent / student name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Grid>
                    <Grid size={{ xs: 12, sm: 6 }}><TextField required label="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Grid>
                    <Grid size={{ xs: 12, sm: 6 }}><TextField required select label="Class / level" value={form.classLevel} onChange={(e) => setForm({ ...form, classLevel: e.target.value })}>{['Class 1–5','Class 6–8','Class 9–10','Class 11–12','Other'].map((x) => <MenuItem key={x} value={x}>{x}</MenuItem>)}</TextField></Grid>
                    <Grid size={{ xs: 12, sm: 6 }}><TextField required select label="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>{subjects.map((x) => <MenuItem key={x} value={x}>{x}</MenuItem>)}</TextField></Grid>
                    <Grid size={{ xs: 12 }}><TextField label="City / area" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></Grid>
                    <Grid size={{ xs: 12 }}><TextField multiline minRows={4} label="What would you like help with?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></Grid>
                    <Grid size={{ xs: 12 }}><Button type="submit" size="large" fullWidth variant="contained" color="success" startIcon={<WhatsApp />} disabled={enquiryStatus === 'submitting'}>{enquiryStatus === 'submitting' ? 'Preparing your enquiry…' : 'Continue on WhatsApp'}</Button></Grid>
                    {enquiryStatus === 'success' && <Grid size={{ xs: 12 }}><Typography color="success.main" variant="body2">Your enquiry details are ready in WhatsApp. Send the message there to contact Reliant India.</Typography></Grid>}
                  </Grid>
                </Paper></Reveal>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>

      <Box component="footer" sx={{ bgcolor: '#0b1220', color: '#fff', py: 5 }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={3}>
            <Box><Stack direction="row" spacing={1.2} alignItems="center"><Box component="img" src="/Media/favi.png" alt="" sx={{ width: 34, height: 34, objectFit: 'contain' }} /><Typography fontWeight={800}>Reliant India Home Tuition</Typography></Stack><Typography variant="body2" sx={{ mt: 1.5, color: 'rgba(255,255,255,.58)', maxWidth: 480 }}>Personalised home tuition and academic support for students and families.</Typography></Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}><Button color="inherit" href="tel:+917766911938" startIcon={<Phone />}>+91 77669 11938</Button><Button color="inherit" href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer" startIcon={<WhatsApp />}>WhatsApp</Button></Stack>
          </Stack>
          <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,.1)' }} />
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,.45)' }}>© {new Date().getFullYear()} Reliant India Group. All rights reserved.</Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default App;