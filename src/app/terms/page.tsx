import { LegalPage, LegalSection } from '@/components/layout/LegalPage';
import { site } from '@/content/site.config';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Terms of Service',
  description: `The terms that govern use of the ${site.name} website and services.`,
  path: '/terms',
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="January 1, 2026">
      <LegalSection heading="Agreement">
        <p>
          These terms govern your use of the {site.name} website and any services provided by {site.legalName}. By
          using the site or engaging our services, you agree to them. If you are accepting on behalf of a company, you
          represent that you have authority to do so.
        </p>
      </LegalSection>

      <LegalSection heading="Our services">
        <p>
          We provide configuration, hosting and support for AI-assisted lead response, CRM and marketing automation
          built on third-party platforms. Specific features, plan inclusions and fees are set out in your order form or
          service agreement, which controls if it conflicts with anything on this website.
        </p>
      </LegalSection>

      <LegalSection heading="Your responsibilities">
        <ul>
          <li>Provide accurate business information and timely access to the accounts we need to configure</li>
          <li>
            Obtain and maintain any consent required before we message your contacts, and comply with applicable law
            including the TCPA, CAN-SPAM and carrier requirements such as A2P 10DLC registration
          </li>
          <li>Review and approve automated message content before it is sent to your customers</li>
          <li>Keep account credentials secure and not share access with unauthorized people</li>
          <li>Not use the services for unlawful, deceptive or abusive messaging</li>
        </ul>
        <p>
          You are the sender of record for messages sent from your business. You are responsible for the content you
          approve and for the lawfulness of your contact lists.
        </p>
      </LegalSection>

      <LegalSection heading="AI-generated content">
        <p>
          Our services use automated systems to generate message content. These systems can produce inaccurate or
          unexpected output. You are responsible for reviewing configuration and for monitoring conversations. We do
          not warrant that automated responses will be error-free or suitable for any particular customer interaction.
        </p>
      </LegalSection>

      <LegalSection heading="Fees and billing">
        <p>
          Fees, billing frequency and setup charges are as stated in your order form. Subscription fees are billed in
          advance and are non-refundable except where required by law. Usage-based charges such as phone and messaging
          costs are billed as incurred. We may change pricing on renewal with reasonable notice.
        </p>
      </LegalSection>

      <LegalSection heading="Term and cancellation">
        <p>
          Unless your order form says otherwise, plans run month to month and either party may cancel effective at the
          end of the current billing period. Setup fees are earned when the work is performed. On termination we will
          make a reasonable effort to help you export your data.
        </p>
      </LegalSection>

      <LegalSection heading="Third-party platforms">
        <p>
          Our services depend on third-party providers, including GoHighLevel / LeadConnector and telecommunications
          carriers. Their availability, policies and pricing are outside our control, and we are not responsible for
          outages, changes or actions taken by those providers.
        </p>
      </LegalSection>

      <LegalSection heading="No guarantee of results">
        <p>
          Any figures shown on this website — including the missed-lead calculator, sample dashboards and example
          conversations — are illustrative estimates based on inputs you provide or on sample data. They are not
          projections, representations or guarantees of revenue, lead volume or business performance.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          We retain ownership of our website, configurations, templates and materials. You retain ownership of your
          business content and customer data. You grant us the limited rights needed to provide the services.
        </p>
      </LegalSection>

      <LegalSection heading="Disclaimers and limitation of liability">
        <p>
          The services are provided &ldquo;as is&rdquo; without warranties of any kind to the fullest extent permitted
          by law. To the maximum extent permitted by law, neither party is liable for indirect, incidental, special or
          consequential damages, and our total liability arising out of the services will not exceed the fees you paid
          us in the twelve months before the claim.
        </p>
      </LegalSection>

      <LegalSection heading="Indemnification">
        <p>
          You agree to indemnify us against claims arising from your contact lists, your consent practices, message
          content you approved, or your violation of applicable law.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These terms are governed by the laws of the State of {site.contact.address.region}, without regard to
          conflict-of-laws rules. Disputes will be brought in the state or federal courts located there.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
