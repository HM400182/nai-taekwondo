// Lightweight no-op data layer to replace Firebase/Supabase.
// This keeps the UI buildable but does NOT persist data.
// Replace with a real backend later.

export async function addRegistration(data: Record<string, any>): Promise<{ ok: true }> {
  if (typeof console !== "undefined") console.info("[noopData] addRegistration", data);
  return { ok: true };
}

export async function addMessage(data: Record<string, any>): Promise<{ ok: true }> {
  if (typeof console !== "undefined") console.info("[noopData] addMessage", data);
  return { ok: true };
}

export async function getCollection(name: string): Promise<any[]> {
  if (typeof console !== "undefined") console.info("[noopData] getCollection", name);
  return [];
}