"use client";

import { useEffect, useState } from "react";

import { Reveal } from "@/components/reveal";
import { RibbonField } from "@/components/ribbon-field";
import { founder, site } from "@/lib/content";

const CONTACT_MASK =
  "radial-gradient(56% 44% at 26% 46%, #000 0%, rgba(0,0,0,0.34) 40%, rgba(0,0,0,0) 66%)";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-[15px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.4" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[15px]" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v11H3v-11ZM9.5 9.5h3.83v1.5h.05c.53-.95 1.83-1.96 3.77-1.96 4.03 0 4.78 2.5 4.78 5.75v5.71h-4v-5.06c0-1.21-.02-2.76-1.75-2.76-1.76 0-2.03 1.31-2.03 2.67v5.15h-4v-11Z" />
    </svg>
  );
}

function Clock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour12: false,
        }),
      );

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{time}</span>;
}

function validate(values: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(values.email.trim()))
    errors.email = "Enter a valid email address.";
  if (values.message.trim().length < 20)
    errors.message = "A little more detail helps — 20 characters minimum.";
  return errors;
}

export function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    // Honeypot: a real person never fills this.
    const trap = new FormData(event.currentTarget).get("company");
    if (typeof trap === "string" && trap.length) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const field = (key: keyof typeof values) => ({
    value: values[key],
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    "aria-invalid": errors[key] ? ("true" as const) : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });

  return (
    <section
      id="contact"
      className="relative overflow-hidden pt-[clamp(48px,7vw,110px)] pb-[clamp(40px,6vw,80px)]"
    >
      <RibbonField
        mask={CONTACT_MASK}
        className="absolute top-[-14%] left-[-12%] block h-[128%] w-[124%] opacity-[0.24] mix-blend-screen"
      />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-[clamp(30px,5vw,72px)] px-gutter">
        <Reveal>
          <div className="op-eyebrow mb-6">Contact us</div>
          <h2 className="m-0 text-ink-900">
            <span className="block font-grotesk text-contact-caps leading-[0.94] font-extrabold tracking-[-0.04em]">
              LET&apos;S
            </span>
            <span className="block font-serif text-contact-serif leading-[0.92] font-normal tracking-[-0.02em] text-blue-200 italic">
              talk.
            </span>
          </h2>
          <p className="mt-[clamp(22px,3vw,34px)] mb-[clamp(26px,3.4vw,40px)] max-w-[44ch] font-grotesk text-contact-body leading-[1.65] text-ink-600 [text-wrap:pretty]">
            Share your brief and we will respond with a strategy, a creator
            roster and a costed plan.
          </p>

          <div className="flex flex-col gap-3.5 font-mono text-xs leading-none font-medium tracking-[0.06em]">
            <a href={`mailto:${site.email}`} className="text-ink-900">
              {site.email}
            </a>
            <span className="text-ink-550">
              NEW DELHI, INDIA · <Clock /> IST
            </span>
          </div>

          <div className="mt-[clamp(26px,3.4vw,40px)] flex items-center gap-4 border-t border-ink-300 pt-[clamp(22px,3vw,32px)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={founder.image}
              alt={founder.name}
              width={56}
              height={56}
              className="block size-14 rounded-full object-cover"
            />
            <div>
              <div className="font-grotesk text-[15px] leading-[1.2] font-semibold text-ink-900">
                {founder.name}
              </div>
              <div className="mt-[7px] font-mono text-[10px] leading-[1.4] font-medium tracking-[0.12em] uppercase text-ink-600">
                {founder.title}
              </div>
              <div className="mt-3 flex items-center gap-2.5">
                {founder.instagram ? (
                  <a
                    href={founder.instagram}
                    target="_blank"
                    rel="noopener"
                    aria-label={`${founder.name} on Instagram`}
                    className="flex size-8 items-center justify-center rounded-full border border-ink-400 text-ink-600 transition-[color,border-color,background] duration-200 ease-out hover:border-blue-500 hover:bg-ink-150 hover:text-blue-200"
                  >
                    <InstagramIcon />
                  </a>
                ) : null}
                {founder.linkedin ? (
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener"
                    aria-label={`${founder.name} on LinkedIn`}
                    className="flex size-8 items-center justify-center rounded-full border border-ink-400 text-ink-600 transition-[color,border-color,background] duration-200 ease-out hover:border-blue-500 hover:bg-ink-150 hover:text-blue-200"
                  >
                    <LinkedInIcon />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="w-full">
          <form
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col gap-[18px] rounded-[14px] border border-ink-400 bg-[rgba(10,12,21,0.72)] p-[clamp(22px,3vw,38px)] backdrop-blur-[10px]"
          >
          <label className="flex flex-col gap-2.5">
            <span className="font-mono text-[10px] leading-none font-medium tracking-[0.14em] uppercase text-ink-600">
              Name
            </span>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="op-input"
              {...field("name")}
            />
            {errors.name ? (
              <span
                id="name-error"
                className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#ff9b9b]"
              >
                {errors.name}
              </span>
            ) : null}
          </label>

          <label className="flex flex-col gap-2.5">
            <span className="font-mono text-[10px] leading-none font-medium tracking-[0.14em] uppercase text-ink-600">
              Email
            </span>
            <input
              type="email"
              name="email"
              placeholder="you@company.com"
              required
              className="op-input"
              {...field("email")}
            />
            {errors.email ? (
              <span
                id="email-error"
                className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#ff9b9b]"
              >
                {errors.email}
              </span>
            ) : null}
          </label>

          <label className="flex flex-col gap-2.5">
            <span className="font-mono text-[10px] leading-none font-medium tracking-[0.14em] uppercase text-ink-600">
              Brief
            </span>
            <textarea
              name="message"
              rows={4}
              placeholder="Category, objective, timeline and budget range."
              required
              className="op-input"
              {...field("message")}
            />
            {errors.message ? (
              <span
                id="message-error"
                className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#ff9b9b]"
              >
                {errors.message}
              </span>
            ) : null}
          </label>

          {/* Honeypot — visually and semantically out of the way. */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] size-px opacity-0"
          />

          <button
            type="submit"
            disabled={status === "submitting"}
            className="op-btn w-full px-6 py-[18px] text-[15px]"
          >
            {status === "submitting"
              ? "Sending…"
              : status === "success"
                ? "Brief received ✓"
                : "Send brief"}
          </button>

          <div
            aria-live="polite"
            className={`text-center font-mono text-[10px] leading-[1.6] font-medium tracking-[0.1em] uppercase ${
              status === "success"
                ? "text-blue-200"
                : status === "error"
                  ? "text-[#ff9b9b]"
                  : "text-ink-550"
            }`}
          >
            {status === "success"
              ? "Thanks — your brief is with us"
              : status === "error"
                ? `Something went wrong — email us at ${site.email}`
                : ""}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
