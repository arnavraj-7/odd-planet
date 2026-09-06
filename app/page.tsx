import { BrandMarquee } from "@/components/brand-marquee";
import { Contact } from "@/components/contact";
import { CreatorCoverflow } from "@/components/creator-coverflow";
import { ErrorBoundary } from "@/components/error-boundary";
import { Hero } from "@/components/hero";
import { IntroCurtain } from "@/components/intro-curtain";
import { MediaCoverage } from "@/components/media-coverage";
import { Services } from "@/components/services";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StatBand } from "@/components/stat-band";
import { WorkPinned } from "@/components/work-pinned";

/**
 * Section order is fixed by the client. Only Work and Creators scroll
 * horizontally — everything else is vertical. Do not add more.
 */
export default function Home() {
  return (
    <>
      <IntroCurtain />
      <SiteHeader />
      <main>
        <Hero />
        <BrandMarquee />
        <StatBand />
        <MediaCoverage />
        <Services />
        <ErrorBoundary>
          <WorkPinned />
        </ErrorBoundary>
        <ErrorBoundary>
          <CreatorCoverflow />
        </ErrorBoundary>
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
