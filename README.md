# Reliant India Home Tuition

Premium, responsive Home Tuition website for Reliant India Group.

## Stack
- React 19 + Vite
- Tailwind CSS 4
- Framer Motion
- React Router
- Lucide React

## Run locally
```bash
npm install
npm run dev
```

Production build:
```bash
npm run build
npm run preview
```

## Where to edit content
- `src/data/courses.js` — courses, fees, timings and syllabus
- `src/data/faculty.js` — faculty profiles and photos
- `src/data/results.js` — result cards
- `src/data/testimonials.js` — approved testimonials
- `src/index.css` — colors, fonts and global styling
- `src/components/Navbar.jsx` / `Footer.jsx` — navigation and branding
- `index.html` — SEO title, description, favicon and fonts

Placeholder content is marked with TODO comments. Replace it with verified client content before production.

## Enquiries
The contact form validates in-browser and currently hands the enquiry to WhatsApp. The form contains a TODO for the eventual backend/email integration.
