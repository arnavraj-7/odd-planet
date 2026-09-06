import "server-only";

export type Enquiry = {
  receivedAt: string;
  name: string;
  email: string;
  message: string;
  source: string;
};

export type EnquiryResult =
  | { status: "ok"; enquiries: Enquiry[] }
  | { status: "unconfigured" }
  | { status: "error"; reason: string };

/**
 * Reads the briefs back out of the Apps Script Web App that the contact form
 * writes to. The script exposes them on doGet behind the same shared token —
 * see docs/google-sheet-webhook.md.
 */
export async function fetchEnquiries(): Promise<EnquiryResult> {
  const url = process.env.SHEETS_WEBHOOK_URL;
  const token = process.env.SHEETS_WEBHOOK_TOKEN;

  if (!url) return { status: "unconfigured" };

  try {
    const endpoint = `${url}${url.includes("?") ? "&" : "?"}token=${encodeURIComponent(
      token ?? "",
    )}`;

    const res = await fetch(endpoint, {
      redirect: "follow",
      // Always read through to the sheet; a cached list would be misleading.
      cache: "no-store",
    });

    if (!res.ok) return { status: "error", reason: `sheet responded ${res.status}` };

    const body = (await res.json()) as {
      ok?: boolean;
      error?: string;
      rows?: Enquiry[];
    };

    if (!body.ok) {
      return { status: "error", reason: body.error ?? "sheet rejected the read" };
    }

    // Newest first — the sheet appends, so it arrives oldest first.
    const rows = (body.rows ?? []).slice().reverse();
    return { status: "ok", enquiries: rows };
  } catch (error) {
    return {
      status: "error",
      reason: error instanceof Error ? error.message : "could not reach the sheet",
    };
  }
}
