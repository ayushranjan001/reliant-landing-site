# Reliant India — Startup Business Model (MVP)

## Positioning

Reliant India is a managed education marketplace connecting students/parents with verified educators for online and home tuition. Reliant owns the discovery, booking, payment, support, quality-control and payout workflow.

## Revenue model

### Teacher annual membership

Proposed launch hypotheses — validate with the first 25–50 paying teachers:

| Plan | Annual price | Product promise |
|---|---:|---|
| Verified | ₹2,999 | Verified profile + marketplace access + limited lead credits |
| Pro | ₹5,999 | Higher lead allowance + priority visibility + analytics |
| Elite | ₹9,999 | Highest lead allowance + featured eligibility + priority support |

These are not final prices until conversion, lead quality and renewal data support them.

### Parent tuition billing

Parents pay Reliant for a tuition plan. Reliant then schedules sessions and pays educators according to their approved payout rate.

Illustrative example only:

- Parent payment: ₹6,000/month
- Teacher payout: ₹4,200/month
- Variable payment/refund/support reserve: ₹450/month
- Contribution before acquisition and central overhead: ₹1,350/month

Formula:

**Contribution margin = parent tuition revenue − teacher payout − variable payment/refund/support costs**

### Optional expansion revenue

- Extra classes
- Additional subjects
- Exam-intensive packages
- Assessments
- Premium replacement/service guarantees
- Digital study resources after the content business exists

## Teacher relationship model

Do not automatically combine employment and paid marketplace membership.

Operate two tracks:

1. **Reliant-employed educators** — used where Reliant controls employment, schedules, supervision and payroll.
2. **Verified teaching partners** — independent educators who use Reliant's marketplace under documented commercial terms.

Final employment classification, contracts, tax treatment and local compliance should be reviewed by an Indian CA/lawyer.

## Payment flow

### Parent

Parent → Reliant checkout → payment captured → booking created → sessions delivered → payout approved → educator paid.

### Teacher

Teacher → annual membership checkout → subscription active → marketplace access enabled → renewal/expiry managed automatically.

Razorpay currently supports recurring subscription billing and annual plans. Razorpay Route supports linked accounts and transfers for marketplace-style payouts. Sensitive payment operations should stay server-side and be driven by verified webhooks.

## Marketplace trust

Teacher profiles should include:

- Identity verification status
- Qualification
- Teaching experience
- Subjects and grades
- Teaching modes
- Areas served
- Availability
- Ratings/reviews
- Response rate
- Completed classes
- Background-check status where applicable

Student requests should include guardian ownership, class/age band, subjects, goals, location, mode, schedule, budget and verification state.

The product should minimise child data and build guardian/consent controls into onboarding.

## Business metrics

### Marketplace

Verified teachers, active teachers, paying teachers, active students, match rate, match-to-booking conversion, paid-booking conversion, teacher response rate, replacement rate and refund rate.

### Revenue

Teacher subscription revenue, tuition GMV, contribution margin, average revenue per active student, teacher CAC, parent CAC, LTV and renewal rate.

### Quality

Completed sessions, on-time rate, parent satisfaction, student retention, teacher retention and complaint rate.

## First 90 days

### Days 1–30

Set up entity/payment accounts, contracts and policies. Recruit and verify the first 25–50 educators. Acquire the first 25 paying families. Match manually and log every lead, booking, payout, cancellation and refund.

### Days 31–60

Charge teacher memberships. Activate recurring parent billing. Launch teacher/parent dashboards. Add reviews, replacement workflow and payout ledger.

### Days 61–90

Automate matching, introduce lead credits, add referral mechanics and expand geographically only after the first operating cluster has repeatable positive contribution margin.

## Operating rules

1. Reliant should own the transaction whenever possible.
2. Direct contact details should not be exposed before the appropriate marketplace stage.
3. Every payment must map to an order/booking/invoice record.
4. Every payout must map to approved service records.
5. Never publish fabricated reviews, results, qualifications or verification claims.
6. No payment secret belongs in React.
7. Child data requires appropriate guardian/consent handling.
8. Measure cohorts and contribution margin, not traffic alone.
