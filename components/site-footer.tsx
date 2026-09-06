import { StrokeWordmark } from "@/components/stroke-wordmark";
import { footerLinks, site } from "@/lib/content";

const COLUMN_LABEL =
  "mb-5 font-mono text-[10px] leading-none font-medium tracking-[0.16em] uppercase text-ink-550";

const COLUMN_LINK =
  "font-grotesk text-sm leading-none font-medium text-blue-100";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-300">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-[clamp(26px,4vw,52px)] px-gutter pt-[clamp(40px,5.4vw,76px)] pb-[clamp(26px,3.4vw,44px)]">
        <div>
          <div className="mb-[18px] flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="block size-[9px] rounded-full bg-blue-500"
            />
            <span className="font-grotesk text-[15px] leading-none font-extrabold tracking-[0.02em] text-ink-900">
              {site.wordmark}
            </span>
          </div>
          <p className="m-0 max-w-[30ch] font-grotesk text-sm leading-[1.65] text-ink-600 [text-wrap:pretty]">
            Founded {site.founded}. Influencer, content and amplification
            partner for brands and government organisations.
          </p>
        </div>

        <div>
          <div className={COLUMN_LABEL}>Sections</div>
          <div className="flex flex-col gap-3">
            {footerLinks.sections.map((link) => (
              <a key={link.href} href={link.href} className={COLUMN_LINK}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className={COLUMN_LABEL}>Follow</div>
          <div className="flex flex-col gap-3">
            {footerLinks.follow.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener"
                className={COLUMN_LINK}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className={COLUMN_LABEL}>Enquiries</div>
          <div className="mb-[22px] flex flex-col gap-3">
            <a href={`mailto:${site.email}`} className={COLUMN_LINK}>
              {site.email}
            </a>
            <a
              href={site.phoneHref}
              target="_blank"
              rel="noopener"
              className={COLUMN_LINK}
            >
              {site.phone}
            </a>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 rounded-full border border-ink-400 px-5 py-3.5 font-grotesk text-[13px] leading-none font-semibold text-ink-900 transition-[border-color,background] duration-200 ease-out hover:border-blue-500 hover:bg-ink-150 hover:text-ink-900"
          >
            Start a brief →
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-gutter pb-[clamp(8px,1.2vw,18px)]">
        <StrokeWordmark text={site.wordmark} />
      </div>

      <div className="border-t border-ink-300">
        <div className="mx-auto flex max-w-[1400px] flex-wrap justify-between gap-x-7 gap-y-2.5 px-gutter py-[18px] font-mono text-[11px] leading-[1.6] font-medium tracking-[0.06em] text-ink-550">
          <span>
            © 2026 {site.wordmark} — {site.tagline}
          </span>
          <span className="flex gap-[22px]">
            <a href="#" className="text-ink-550">
              PRIVACY
            </a>
            <a href="#" className="text-ink-550">
              TERMS
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
