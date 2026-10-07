// Use relative URL in production (same server), localhost in dev
const API_BASE = import.meta.env.DEV ? 'http://localhost:8000' : '';

export async function fetchAllData() {
  const res = await fetch(`${API_BASE}/api/all`);
  if (!res.ok) throw new Error('Failed to fetch portfolio data');
  return res.json();
}

export async function submitContact(data) {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
}
