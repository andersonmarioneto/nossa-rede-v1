// lib/api.ts
const API = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(path: string, opts: RequestInit = {}) {
  const url = `${API}${path}`;
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  // Se houver token em localStorage (teste), anexar
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const headers: any = { ...defaultHeaders, ...(opts.headers || {}) };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url, { ...opts, headers, credentials: "include" });
  if (!res.ok) {
    const text = await res.text();
    let json;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    try { json = JSON.parse(text); } catch (e) { json = { error: text }; }
    throw json;
  }
  return res.json();
}
export const apiFetchAuth = apiFetch;
export default API;
