const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://fdrpgbqnerfhlyviqygf.supabase.co';

const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_B1IPZHcvph2xUs-x2TqrdQ_jAg5vTqM';

const SESSION_KEY = 'reliant_auth_session';

async function authRequest(path, options = {}) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.msg || payload.error_description || payload.message || 'Authentication request failed.');
  }

  return payload;
}

export async function signUp({ email, password, fullName, role }) {
  const session = await authRequest('signup', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      data: {
        full_name: fullName,
        role,
      },
    }),
  });

  if (session?.access_token) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  return session;
}

export async function signIn({ email, password }) {
  const session = await authRequest('token?grant_type=password', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export async function refreshSession() {
  const stored = getStoredSession();

  if (!stored?.refresh_token) {
    return null;
  }

  try {
    const session = await authRequest('token?grant_type=refresh_token', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: stored.refresh_token }),
    });

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function getStoredSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  } catch {
    return null;
  }
}

export function getStoredUser() {
  return getStoredSession()?.user || null;
}

export async function signOut() {
  const session = getStoredSession();

  if (session?.access_token) {
    await authRequest('logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    }).catch(() => {});
  }

  localStorage.removeItem(SESSION_KEY);
}

export function getAuthEventName() {
  return 'reliant-auth-changed';
}