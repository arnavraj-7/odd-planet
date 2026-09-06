import type { Metadata } from "next";
import Link from "next/link";

import { LegalList, LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions — Odd Planet",
  description:
    "The terms governing your access to and use of the Odd Planet LLP website.",
  alternates: { canonical: "/terms" },
};

const LEGAL_EMAIL = "business@oddplanet.in";

export default function Terms() {
  return (
    <LegalPage
      title="Terms &amp; Conditions"
      updated="September 2026"
      intro={
        <>
          <p className="m-0">
            Welcome to the website of Odd Planet LLP (“Odd Planet”, “we”, “us”,
            or “our”).
          </p>
          <p className="m-0">
            These Terms &amp; Conditions (“Terms”) govern your access to and use
            of our website (the “Website”).
          </p>
          <p className="m-0">
            By accessing or using the Website, you agree to be bound by these
            Terms. If you do not agree with these Terms, please do not use the
            Website.
          </p>
        </>
      }
    >
      <LegalSection index={1} heading="About Odd Planet">
        <p className="m-0">
          Odd Planet is a marketing and creative agency providing services
          including, but not limited to:
        </p>
        <LegalList
          items={[
            "Influencer Marketing",
            "Celebrity Endorsements",
            "Social Media Marketing",
            "LinkedIn Marketing",
            "Meme Marketing",
            "Public Relations",
            "Content Production",
            "User-Generated Content",
            "Creator Partnerships",
            "Brand Campaigns",
            "Events and Experiential Marketing",
            "Other creative and marketing services",
          ]}
        />
        <p className="m-0">
          Information displayed on the Website is provided for general
          informational and business purposes.
        </p>
      </LegalSection>

      <LegalSection index={2} heading="Use of the Website">
        <p className="m-0">
          You agree to use the Website only for lawful purposes and in a manner
          that does not:
        </p>
        <LegalList
          items={[
            "Violate any applicable law or regulation",
            "Infringe the rights of Odd Planet or any third party",
            "Attempt to gain unauthorised access to the Website or its systems",
            "Introduce malicious code, viruses, or harmful material",
            "Interfere with the operation or security of the Website",
            "Use the Website for fraudulent, abusive, or misleading purposes",
          ]}
        />
        <p className="m-0">
          We reserve the right to restrict or terminate access to the Website
          where we reasonably believe these Terms have been violated.
        </p>
      </LegalSection>

      <LegalSection index={3} heading="Intellectual Property">
        <p className="m-0">
          Unless otherwise stated, all content appearing on the Website,
          including:
        </p>
        <LegalList
          items={[
            "Text",
            "Logos",
            "Branding",
            "Graphics",
            "Images",
            "Videos",
            "Designs",
            "Case studies",
            "Campaign concepts",
            "Layouts",
            "Other creative materials",
          ]}
        />
        <p className="m-0">
          is owned by, licensed to, or used by Odd Planet and is protected under
          applicable intellectual property laws.
        </p>
        <p className="m-0">
          You may not reproduce, modify, distribute, publish, sell, transmit, or
          commercially exploit Website content without prior written permission
          from Odd Planet or the applicable rights holder.
        </p>
      </LegalSection>

      <LegalSection index={4} heading="Portfolio and Client Work">
        <p className="m-0">
          The Website may display examples of campaigns, collaborations,
          projects, brands, creators, or other work undertaken by Odd Planet.
        </p>
        <p className="m-0">
          Such materials may be subject to the intellectual property,
          confidentiality, publicity, or usage rights of clients, creators,
          brands, platforms, or other third parties.
        </p>
        <p className="m-0">
          Nothing on the Website should be interpreted as granting you ownership
          or licensing rights in such materials unless expressly stated.
        </p>
      </LegalSection>

      <LegalSection index={5} heading="Information on the Website">
        <p className="m-0">
          We make reasonable efforts to ensure that information on the Website is
          accurate and up to date.
        </p>
        <p className="m-0">
          However, we do not guarantee that all information is complete,
          accurate, current, or error-free.
        </p>
        <p className="m-0">
          Service descriptions, campaign examples, statistics, results,
          timelines, and other information may change without notice.
        </p>
        <p className="m-0">
          Any performance results or examples presented on the Website are
          illustrative and should not be interpreted as a guarantee of similar
          results for every client or campaign.
        </p>
      </LegalSection>

      <LegalSection index={6} heading="Third-Party Links and Services">
        <p className="m-0">
          The Website may contain links to third-party websites, platforms,
          social media accounts, or services.
        </p>
        <p className="m-0">
          These links are provided for convenience and do not constitute an
          endorsement or guarantee by Odd Planet.
        </p>
        <p className="m-0">
          We are not responsible for the availability, accuracy, security,
          content, or practices of third-party websites or services.
        </p>
      </LegalSection>

      <LegalSection index={7} heading="Enquiries and Communications">
        <p className="m-0">
          Submitting an enquiry through the Website does not create a
          client-agency relationship, contractual relationship, partnership,
          employment relationship, or any other binding relationship between you
          and Odd Planet.
        </p>
        <p className="m-0">
          Any engagement for services will be subject to separate commercial
          terms, proposals, statements of work, agreements, purchase orders, or
          other written arrangements agreed between the relevant parties.
        </p>
      </LegalSection>

      <LegalSection index={8} heading="Confidential Information">
        <p className="m-0">
          You should not submit confidential, proprietary, sensitive, or
          commercially restricted information through publicly accessible Website
          forms unless specifically requested or appropriate safeguards have been
          established.
        </p>
        <p className="m-0">
          Information submitted through the Website may be handled in accordance
          with our{" "}
          <Link href="/privacy" className="text-blue-200">
            Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection index={9} heading="Disclaimer">
        <p className="m-0">
          The Website and its content are provided on an “as is” and “as
          available” basis, to the extent permitted by applicable law.
        </p>
        <p className="m-0">Odd Planet does not warrant that:</p>
        <LegalList
          items={[
            "The Website will always be available or uninterrupted",
            "The Website will be free from errors or defects",
            "The Website will be free from viruses or other harmful components",
            "Information available through the Website will always be accurate or complete",
          ]}
        />
        <p className="m-0">
          Nothing in these Terms excludes or limits any liability that cannot
          legally be excluded or limited under applicable law.
        </p>
      </LegalSection>

      <LegalSection index={10} heading="Limitation of Liability">
        <p className="m-0">
          To the maximum extent permitted by applicable law, Odd Planet shall not
          be liable for any indirect, incidental, consequential, special, or
          punitive loss arising from or relating to your use of, or inability to
          use, the Website or its content.
        </p>
        <p className="m-0">
          This limitation does not apply to liability that cannot be excluded or
          limited under applicable law.
        </p>
      </LegalSection>

      <LegalSection index={11} heading="Indemnification">
        <p className="m-0">
          To the extent permitted by applicable law, you agree to indemnify and
          hold harmless Odd Planet, its partners, employees, representatives, and
          affiliates from claims, losses, liabilities, damages, and expenses
          arising from:
        </p>
        <LegalList
          items={[
            "Your misuse of the Website",
            "Your violation of these Terms",
            "Your violation of applicable law",
            "Your infringement of the rights of any third party",
          ]}
        />
      </LegalSection>

      <LegalSection index={12} heading="Privacy">
        <p className="m-0">
          Your use of the Website is also subject to our{" "}
          <Link href="/privacy" className="text-blue-200">
            Privacy Policy
          </Link>
          , which explains how we collect and process personal information.
        </p>
      </LegalSection>

      <LegalSection index={13} heading="Changes to These Terms">
        <p className="m-0">
          Odd Planet may update or modify these Terms from time to time.
        </p>
        <p className="m-0">
          Updated Terms will be published on this page with a revised “Last
          Updated” date. Your continued use of the Website after such changes
          constitutes acceptance of the updated Terms, to the extent permitted by
          applicable law.
        </p>
      </LegalSection>

      <LegalSection index={14} heading="Governing Law and Jurisdiction">
        <p className="m-0">
          These Terms shall be governed by and interpreted in accordance with the
          laws of India.
        </p>
        <p className="m-0">
          Subject to applicable law, courts having jurisdiction in [New Delhi /
          Gurugram / applicable jurisdiction] shall have jurisdiction over
          disputes arising from or relating to these Terms or your use of the
          Website.
        </p>
      </LegalSection>

      <LegalSection index={15} heading="Contact Us">
        <p className="m-0">
          For questions regarding these Terms, please contact:
        </p>
        <p className="m-0">
          <span className="block font-semibold text-ink-900">Odd Planet LLP</span>
          <a
            href={`mailto:${LEGAL_EMAIL}`}
            className="font-mono text-[13px] tracking-[0.04em]"
          >
            {LEGAL_EMAIL}
          </a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
