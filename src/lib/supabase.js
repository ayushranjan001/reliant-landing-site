const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://fdrpgbqnerfhlyviqygf.supabase.co';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_B1IPZHcvph2xUs-x2TqrdQ_jAg5vTqM';

async function request(table, params = '') {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}${params}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });

  if (!response.ok) throw new Error(`Supabase request failed: ${response.status}`);
  return response.json();
}

export async function getVerifiedTeachers() {
  return request('teacher_profiles', '?select=*&verified=eq.true&order=rating.desc');
}

export async function getOpenStudentRequirements() {
  return request('student_requirements', '?select=*&status=eq.open&order=created_at.desc');
}
