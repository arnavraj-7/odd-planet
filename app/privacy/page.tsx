import type { Metadata } from "next";

import { LegalList, LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy — Odd Planet",
  description:
    "How Odd Planet LLP collects, uses, stores and protects the personal information you share through our website.",
  alternates: { canonical: "/privacy" },
};

const LEGAL_EMAIL = "business@oddplanet.in";

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="September 2026"
      intro={
        <>
          <p className="m-0">
            Odd Planet LLP (“Odd Planet”, “we”, “us”, or “our”) respects your
            privacy and is committed to protecting the personal information you
            share with us.
          </p>
          <p className="m-0">
            This Privacy Policy explains how we collect, use, store, and protect
            information when you visit or interact with our website (the
            “Website”).
          </p>
          <p className="m-0">
            By using the Website, you acknowledge the practices described in this
            Privacy Policy.
          </p>
        </>
      }
    >
      <LegalSection index={1} heading="Information We Collect">
        <p className="m-0">
          Depending on how you interact with our Website, we may collect the
          following information:
        </p>

        <p className="m-0 font-semibold text-ink-900">
          Information you provide to us
        </p>
        <p className="m-0">
          When you submit an enquiry, contact form, partnership request, or other
          communication through the Website, we may collect:
        </p>
        <LegalList
          items={[
            "Name",
            "Email address",
            "Phone number",
            "Company/organisation name",
            "Designation or role",
            "Information included in your message or enquiry",
            "Any other information you voluntarily provide",
          ]}
        />

        <p className="m-0 font-semibold text-ink-900">
          Information collected automatically
        </p>
        <p className="m-0">
          When you visit our Website, certain technical information may be
          collected automatically, including:
        </p>
        <LegalList
          items={[
            "IP address",
            "Browser type and version",
            "Device type",
            "Operating system",
            "Pages visited",
            "Time spent on the Website",
            "Referring website or source",
            "General usage and interaction information",
          ]}
        />
        <p className="m-0">
          This information may be collected through cookies, analytics tools, or
          similar technologies.
        </p>
      </LegalSection>

      <LegalSection index={2} heading="How We Use Your Information">
        <p className="m-0">We may use the information collected to:</p>
        <LegalList
          items={[
            "Respond to enquiries and requests",
            "Communicate with you regarding our services",
            "Understand and improve our Website and services",
            "Provide information requested by you",
            "Evaluate potential business, partnership, creator, or client opportunities",
            "Maintain Website security and prevent misuse",
            "Analyse Website traffic and user behaviour",
            "Comply with applicable laws and legal obligations",
          ]}
        />
        <p className="m-0">
          We will not use your personal information for purposes materially
          different from those described above without appropriate notice or,
          where required, your consent.
        </p>
      </LegalSection>

      <LegalSection index={3} heading="Cookies and Analytics">
        <p className="m-0">
          Our Website may use cookies and similar technologies to improve
          functionality, understand Website usage, and analyse traffic.
        </p>
        <p className="m-0">
          We may use third-party analytics or tracking services for these
          purposes. These services may collect information about your device and
          Website activity in accordance with their own privacy policies.
        </p>
        <p className="m-0">
          You may be able to control or disable cookies through your browser
          settings. Disabling certain cookies may affect the functionality of
          parts of the Website.
        </p>
      </LegalSection>

      <LegalSection index={4} heading="Sharing of Information">
        <p className="m-0">
          We do not sell or rent your personal information.
        </p>
        <p className="m-0">
          We may share information with trusted third-party service providers
          where reasonably necessary to operate our Website or business,
          including hosting providers, analytics providers, technology providers,
          and communication tools.
        </p>
        <p className="m-0">We may also disclose information:</p>
        <LegalList
          items={[
            "When required by applicable law or legal process",
            "To protect our rights, property, or safety",
            "To investigate fraud, security issues, or misuse of the Website",
            "In connection with a merger, acquisition, restructuring, or transfer of business assets",
          ]}
        />
        <p className="m-0">
          Third-party service providers may process information on our behalf and
          are expected to handle such information appropriately.
        </p>
      </LegalSection>

      <LegalSection index={5} heading="Data Security">
        <p className="m-0">
          We take reasonable technical and organisational measures to protect
          personal information against unauthorised access, alteration,
          disclosure, loss, or misuse.
        </p>
        <p className="m-0">
          However, no method of transmitting or storing information online can be
          guaranteed to be completely secure. Accordingly, we cannot guarantee
          absolute security of your information.
        </p>
      </LegalSection>

      <LegalSection index={6} heading="Data Retention">
        <p className="m-0">
          We retain personal information only for as long as reasonably necessary
          for the purposes described in this Privacy Policy, including responding
          to enquiries, maintaining business records, complying with legal
          obligations, resolving disputes, and enforcing agreements.
        </p>
        <p className="m-0">
          The retention period may vary depending on the nature of the
          information and the purpose for which it was collected.
        </p>
      </LegalSection>

      <LegalSection index={7} heading="Third-Party Websites">
        <p className="m-0">
          Our Website may contain links to third-party websites, social media
          platforms, or other online services.
        </p>
        <p className="m-0">
          We are not responsible for the privacy practices, security, or content
          of third-party websites. We encourage you to review their respective
          privacy policies before providing them with personal information.
        </p>
      </LegalSection>

      <LegalSection index={8} heading="Your Rights">
        <p className="m-0">
          Subject to applicable law, you may have rights regarding your personal
          information, including the right to:
        </p>
        <LegalList
          items={[
            "Request access to personal information held by us",
            "Request correction of inaccurate information",
            "Request deletion of information where legally applicable",
            "Withdraw consent where processing is based on consent",
            "Raise concerns regarding the handling of your personal information",
          ]}
        />
        <p className="m-0">
          To exercise any applicable rights or raise a privacy-related concern,
          you may contact us using the details provided below.
        </p>
      </LegalSection>

      <LegalSection index={9} heading="Children’s Privacy">
        <p className="m-0">
          The Website is intended for a general audience and is not specifically
          directed towards children.
        </p>
        <p className="m-0">
          We do not knowingly collect personal information from children where
          such collection is prohibited by applicable law.
        </p>
      </LegalSection>

      <LegalSection index={10} heading="Changes to This Privacy Policy">
        <p className="m-0">
          We may update this Privacy Policy from time to time to reflect changes
          in our practices, technology, legal requirements, or services.
        </p>
        <p className="m-0">
          Any updated version will be published on this page with a revised “Last
          Updated” date.
        </p>
      </LegalSection>

      <LegalSection index={11} heading="Contact Us">
        <p className="m-0">
          If you have questions, concerns, or requests relating to this Privacy
          Policy or the handling of your personal information, please contact us:
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
