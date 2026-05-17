export const LEAD_API_URL =
  import.meta.env.VITE_LEAD_API_URL ||
  (import.meta.env.DEV ? "http://localhost:3001/api/lead" : "/api/lead");

export interface LeadPayload {
  name: string;
  contactNumber: string;
  siteLocation?: string;
  email?: string;
  remarks?: string;
  role?: string;
  material?: string;
  timeline?: string;
}

export async function submitLead(payload: LeadPayload) {
  const response = await fetch(LEAD_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const result = await response.json().catch(() => null);
    throw new Error(result?.error || "Failed to submit enquiry");
  }

  return response.json().catch(() => null);
}
