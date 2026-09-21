// Proposed launch pricing hypotheses. Validate before publishing as final commercial pricing.
export const teacherPlans = [
  {
    id: 'verified',
    name: 'Verified',
    price: 2999,
    period: 'year',
    label: 'For teachers starting on Reliant',
    features: ['Verified public profile', 'Marketplace access', 'Limited lead credits', 'Basic profile analytics'],
    cta: 'Start as a teacher',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 5999,
    period: 'year',
    label: 'For teachers building a steady student pipeline',
    features: ['Everything in Verified', 'Higher lead allowance', 'Priority profile visibility', 'Response and booking analytics'],
    featured: true,
    cta: 'Choose Pro',
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 9999,
    period: 'year',
    label: 'For established educators',
    features: ['Everything in Pro', 'Highest lead allowance', 'Featured placement eligibility', 'Priority support'],
    cta: 'Choose Elite',
  },
];

export const parentPlans = [
  {
    id: 'standard',
    name: 'Standard',
    priceFrom: 2999,
    sessions: '8 × 60-minute sessions / month',
    note: 'For consistent school support.',
  },
  {
    id: 'plus',
    name: 'Plus',
    priceFrom: 4499,
    sessions: '12 × 60-minute sessions / month',
    note: 'For stronger exam and subject support.',
  },
  {
    id: 'custom',
    name: 'Custom',
    priceFrom: null,
    sessions: 'Multi-subject / intensive plans',
    note: 'Priced after matching class, subject, mode and schedule.',
  },
];
