import type { Metadata } from "next";

import { isAdminSignedIn } from "@/lib/admin-auth";
import { fetchEnquiries } from "@/lib/enquiries";

export const metadata: Metadata = {
  title: "Enquiries — Odd Planet",
  // Never let this into an index, whatever the password does.
  robots: { index: false, follow: false, nocache: true },
};

// The list must reflect the sheet on every load, not a build-time snapshot.
export const dynamic = "force-dynamic";

const LABEL =
  "font-mono text-[10px] leading-none font-medium tracking-[0.14em] uppercase text-ink-550";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const signedIn = await isAdminSignedIn();
  const { error } = await searchParams;

  if (!signedIn) return <SignIn error={error} />;

  const result = await fetchEnquiries();

  return (
    <main className="mx-auto max-w-[1000px] px-gutter py-[clamp(40px,6vw,88px)]">
      <header className="mb-[clamp(28px,4vw,44px)] flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b border-ink-300 pb-6">
        <div>
          <div className="op-eyebrow mb-4">Odd Planet</div>
          <h1 className="op-h2">Enquiries</h1>
        </div>
        <div className="flex items-center gap-5">
          {result.status === "ok" ? (
            <span className={LABEL}>
              {String(result.enquiries.length).padStart(2, "0")} received
            </span>
          ) : null}
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="cursor-pointer rounded-full border border-ink-400 bg-transparent px-4 py-2.5 font-mono text-[10px] leading-none font-medium tracking-[0.14em] uppercase text-ink-600 transition-[color,border-color] duration-200 ease-out hover:border-blue-500 hover:text-ink-900"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      {result.status === "unconfigured" ? (
        <Note title="Not connected yet">
          <code className="text-blue-200">SHEETS_WEBHOOK_URL</code> is not set,
          so there is no sheet to read from. Add it and{" "}
          <code className="text-blue-200">SHEETS_WEBHOOK_TOKEN</code>, then
          redeploy — see <code>docs/google-sheet-webhook.md</code>.
        </Note>
      ) : result.status === "error" ? (
        <Note title="Could not read the sheet">
          {result.reason}. The Apps Script needs the <code>doGet</code> handler
          from <code>docs/google-sheet-webhook.md</code>, re-deployed as a new
          version.
        </Note>
      ) : result.enquiries.length === 0 ? (
        <Note title="No enquiries yet">
          Briefs submitted through the contact form will appear here, newest
          first.
        </Note>
      ) : (
        <ol className="m-0 flex list-none flex-col gap-3 p-0">
          {result.enquiries.map((enquiry, i) => (
            <li
              key={`${enquiry.email}-${enquiry.receivedAt}-${i}`}
              className="rounded-lg border border-ink-300 p-[clamp(18px,2vw,26px)] transition-[border-color] duration-200 ease-out hover:border-ink-400"
            >
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-grotesk text-[17px] leading-none font-semibold text-ink-900">
                    {enquiry.name || "—"}
                  </span>
                  <a
                    href={`mailto:${enquiry.email}`}
                    className="font-mono text-xs tracking-[0.04em] text-blue-200"
                  >
                    {enquiry.email}
                  </a>
                </div>
                <span className={LABEL}>{formatWhen(enquiry.receivedAt)}</span>
              </div>

              <p className="m-0 font-grotesk text-[15px] leading-[1.65] whitespace-pre-wrap text-ink-600">
                {enquiry.message}
              </p>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}

function formatWhen(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value || "—";
  return date.toLocaleString("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function Note({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-ink-300 p-[clamp(20px,2.4vw,32px)]">
      <div className="mb-3 font-grotesk text-[15px] font-semibold text-ink-900">
        {title}
      </div>
      <p className="m-0 font-grotesk text-sm leading-[1.65] text-ink-600">
        {children}
      </p>
    </div>
  );
}

function SignIn({ error }: { error?: string }) {
  return (
    <main className="mx-auto flex min-h-svh max-w-[420px] flex-col justify-center px-gutter">
      <div className="op-eyebrow mb-4">Odd Planet</div>
      <h1 className="op-h2 mb-2">Enquiries</h1>
      <p className="mt-0 mb-8 font-grotesk text-sm leading-[1.65] text-ink-600">
        This page is private.
      </p>

      <form
        action="/api/admin/login"
        method="post"
        className="flex flex-col gap-4"
      >
        <label className="flex flex-col gap-2.5">
          <span className={LABEL}>Password</span>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="op-input"
          />
        </label>

        {error === "unset" ? (
          <p className="m-0 font-mono text-[10px] leading-[1.6] tracking-[0.1em] uppercase text-[#ff9b9b]">
            ADMIN_PASSWORD is not set on this deployment
          </p>
        ) : error ? (
          <p className="m-0 font-mono text-[10px] leading-[1.6] tracking-[0.1em] uppercase text-[#ff9b9b]">
            That password did not match
          </p>
        ) : null}

        <button type="submit" className="op-btn w-full px-6 py-[18px] text-[15px]">
          Sign in
        </button>
      </form>
    </main>
  );
}
