import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Search, ShieldCheck, Star, Video, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tutors as fallbackTutors } from '../data/marketplace';
import { getVerifiedTeachers, getFilterCatalog } from '../lib/supabase';

const LEVELS = [
  'All levels',
  'Classes 1–5',
  'Classes 6–8',
  'Classes 9–10',
  'Classes 11–12',
  'Undergraduate',
  'Graduate',
];

const CATEGORIES = [
  'All categories',
  'School',
  'High School & Competitive',
  'College & Degrees',
  'Skills & Languages',
];

const STREAMS = [
  'All streams',
  'Science',
  'Commerce',
  'Arts & Humanities',
  'Engineering',
  'Medical',
  'Management',
  'General',
];

const MODES = ['Any mode', 'Online', 'Home', 'Online + Home'];

const DEFAULT_FILTERS = {
  query: '',
  city: 'All cities',
  category: 'All categories',
  level: 'All levels',
  stream: 'All streams',
  course: 'All courses',
  mode: 'Any mode',
  minRate: '',
  maxRate: '',
};

export default function FindTutor() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [tutors, setTutors] = useState(fallbackTutors);
  const [cities, setCities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getVerifiedTeachers(),
      getFilterCatalog('marketplace_cities'),
      getFilterCatalog('marketplace_courses'),
    ])
      .then(([teacherRows, cityRows, courseRows]) => {
        setTutors(
          teacherRows.map((teacher) => ({
            ...teacher,
            students: teacher.students_taught || teacher.reviews || 0,
          })),
        );
        setCities(cityRows);
        setCourses(courseRows);
      })
      .catch(() => {
        setTutors(fallbackTutors);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      const searchableText = [
        tutor.name,
        tutor.subject,
        tutor.bio,
        tutor.city,
        tutor.category,
        tutor.stream,
        tutor.education_level,
        tutor.experience,
        ...(tutor.courses || []),
        ...(tutor.degrees || []),
        ...(tutor.languages || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const queryMatch =
        !filters.query ||
        searchableText.includes(filters.query.trim().toLowerCase());

      const cityMatch =
        filters.city === 'All cities' || tutor.city === filters.city;

      const categoryMatch =
        filters.category === 'All categories' ||
        tutor.category === filters.category;

      const levelMatch =
        filters.level === 'All levels' ||
        tutor.education_level === filters.level ||
        tutor.grades?.includes(filters.level);

      const streamMatch =
        filters.stream === 'All streams' || tutor.stream === filters.stream;

      const courseMatch =
        filters.course === 'All courses' ||
        tutor.courses?.includes(filters.course);

      const modeMatch =
        filters.mode === 'Any mode' || tutor.mode?.includes(filters.mode);

      const minRateMatch =
        !filters.minRate ||
        Number(tutor.min_rate || 0) >= Number(filters.minRate);

      const maxRateMatch =
        !filters.maxRate ||
        Number(tutor.max_rate || 999999) <= Number(filters.maxRate);

      return (
        queryMatch &&
        cityMatch &&
        categoryMatch &&
        levelMatch &&
        streamMatch &&
        courseMatch &&
        modeMatch &&
        minRateMatch &&
        maxRateMatch
      );
    });
  }, [tutors, filters]);

  return (
    <div className="bg-paper pt-28 sm:pt-32">
      <section className="bg-brand-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[.2em] text-accent-300">
            Tutor marketplace
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold sm:text-6xl">
            Find a teacher by exactly what you need.
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/60">
            Search across location, level, category, stream, course, mode and
            price.
          </p>

          <div className="mt-8 rounded-[2rem] bg-white/10 p-4">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <label className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-brand-950 md:col-span-2">
                <Search size={17} />
                <input
                  value={filters.query}
                  onChange={(event) =>
                    updateFilter('query', event.target.value)
                  }
                  placeholder="Teacher, subject, degree, language…"
                  className="min-w-0 flex-1 bg-transparent outline-none"
                />
              </label>

              <select
                value={filters.city}
                onChange={(event) =>
                  updateFilter('city', event.target.value)
                }
                className="rounded-xl bg-white px-3 py-3 text-sm font-semibold text-brand-950"
              >
                <option>All cities</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>

              <select
                value={filters.category}
                onChange={(event) =>
                  updateFilter('category', event.target.value)
                }
                className="rounded-xl bg-white px-3 py-3 text-sm font-semibold text-brand-950"
              >
                {CATEGORIES.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>

              <select
                value={filters.level}
                onChange={(event) =>
                  updateFilter('level', event.target.value)
                }
                className="rounded-xl bg-white px-3 py-3 text-sm font-semibold text-brand-950"
              >
                {LEVELS.map((level) => (
                  <option key={level}>{level}</option>
                ))}
              </select>

              <select
                value={filters.stream}
                onChange={(event) =>
                  updateFilter('stream', event.target.value)
                }
                className="rounded-xl bg-white px-3 py-3 text-sm font-semibold text-brand-950"
              >
                {STREAMS.map((stream) => (
                  <option key={stream}>{stream}</option>
                ))}
              </select>

              <select
                value={filters.course}
                onChange={(event) =>
                  updateFilter('course', event.target.value)
                }
                className="rounded-xl bg-white px-3 py-3 text-sm font-semibold text-brand-950"
              >
                <option>All courses</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.name}>
                    {course.name}
                  </option>
                ))}
              </select>

              <select
                value={filters.mode}
                onChange={(event) =>
                  updateFilter('mode', event.target.value)
                }
                className="rounded-xl bg-white px-3 py-3 text-sm font-semibold text-brand-950"
              >
                {MODES.map((mode) => (
                  <option key={mode}>{mode}</option>
                ))}
              </select>

              <input
                type="number"
                value={filters.minRate}
                onChange={(event) =>
                  updateFilter('minRate', event.target.value)
                }
                placeholder="Min ₹/hr"
                className="rounded-xl bg-white px-3 py-3 text-sm text-brand-950"
              />

              <input
                type="number"
                value={filters.maxRate}
                onChange={(event) =>
                  updateFilter('maxRate', event.target.value)
                }
                placeholder="Max ₹/hr"
                className="rounded-xl bg-white px-3 py-3 text-sm text-brand-950"
              />
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-white/70"
            >
              <X size={15} />
              Clear filters
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">
              Verified educators
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-brand-950">
              {loading ? 'Loading…' : filteredTutors.length + ' teachers match'}
            </h2>
          </div>

          <Link to="/contact" className="font-bold text-brand-700">
            Need help choosing? →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {filteredTutors.map((tutor) => (
            <motion.article
              key={tutor.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[1.7rem] border border-brand-100 bg-white p-6 card-shadow"
            >
              <div className="flex gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-100 font-bold text-brand-700">
                  {tutor.initials}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-xl font-bold text-brand-950">
                      {tutor.name}
                    </h3>
                    <CheckCircle2 size={15} className="text-emerald-600" />
                  </div>

                  <p className="font-semibold text-brand-700">
                    {tutor.subject} • {tutor.category || 'Academic'}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {tutor.experience} • {tutor.city} • {tutor.mode}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-500">
                <span className="rounded-full bg-paper px-3 py-1">
                  {tutor.stream}
                </span>
                <span className="rounded-full bg-paper px-3 py-1">
                  {tutor.education_level}
                </span>
                <span className="rounded-full bg-paper px-3 py-1">
                  {tutor.students_taught || tutor.reviews || 0} students
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-paper p-3">
                  <p className="text-xs text-slate-400">Rating</p>
                  <p className="mt-1 font-bold">
                    <Star
                      size={13}
                      className="inline fill-accent-500 text-accent-500"
                    />{' '}
                    {tutor.rating}
                  </p>
                </div>

                <div className="rounded-xl bg-paper p-3">
                  <p className="text-xs text-slate-400">Rate</p>
                  <p className="mt-1 font-bold">{tutor.rate}</p>
                </div>

                <div className="rounded-xl bg-paper p-3">
                  <p className="text-xs text-slate-400">Students</p>
                  <p className="mt-1 font-bold">
                    {tutor.students_taught || tutor.reviews || 0}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-brand-100 pt-4">
                <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                  <Video size={15} />
                  {tutor.mode}
                </span>

                <Link
                  to={'/checkout?tutor=' + tutor.id}
                  className="rounded-xl bg-accent-500 px-4 py-3 text-sm font-bold text-brand-950"
                >
                  View & book <ArrowRight size={15} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {!loading && filteredTutors.length === 0 && (
          <div className="mt-8 rounded-3xl bg-white p-10 text-center">
            <ShieldCheck className="mx-auto text-brand-700" />
            <h3 className="mt-3 font-display text-xl font-bold">
              No teachers match.
            </h3>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 rounded-xl bg-brand-950 px-5 py-3 font-bold text-white"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
