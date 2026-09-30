const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export type ApiOptions = RequestInit & { json?: any };

export async function api(path: string, opts: ApiOptions = {}) {
  const { json, headers, ...rest } = opts;
  const init: RequestInit = {
    credentials: "include",
    headers: {
      ...(json ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    ...rest,
    ...(json ? { body: JSON.stringify(json) } : {}),
  };

  const res = await fetch(`${API_BASE}${path}`, init);
  let data: any = null;
  try {
    data = await res.json();
  } catch {}

  // 🚨 Traitement spécial pour /user : jamais lever d'erreur
  if (path === "/user" && res.status === 401) {
    return { data: null }; // silencieux, pas d'exception
  }

  if (!res.ok) {
    const msg = data?.error || data?.message || res.statusText;
    const err = new Error(msg);
    (err as any).status = res.status;
    (err as any).data = data;
    throw err;
  }

  return data;
}



