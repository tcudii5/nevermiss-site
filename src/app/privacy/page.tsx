import { LegalPage, LegalSection } from '@/components/layout/LegalPage';
import { site } from '@/content/site.config';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: `How ${site.name} collects, uses and protects information submitted through this website.`,
  path: '/privacy',
  noIndex: false,
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="January 1, 2026">
      <LegalSection heading="Who we are">
        <p>
          {site.legalName} (&ldquo;{site.name},&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) provides AI-assisted lead
          response, CRM and marketing automation services to businesses. This policy explains what we do with
          information collected through this website.
        </p>
      </LegalSection>

      <LegalSection heading="Information we collect">
        <ul>
          <li>
            <strong className="text-ink">Information you give us.</strong> When you request a demo we collect your
            name, business name, email address, phone number, website, industry, team size, approximate lead volume and
            anything you write in the message field.
          </li>
          <li>
            <strong className="text-ink">Automatically collected information.</strong> Pages viewed, referring URL,
            approximate location derived from IP address, device and browser type, and campaign parameters such as
            utm_source.
          </li>
          <li>
            <strong className="text-ink">Cookies and similar technologies.</strong> Used by our analytics and
            advertising providers where those are enabled. See &ldquo;Analytics and advertising&rdquo; below.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="How we use information">
        <ul>
          <li>To respond to your demo request and schedule a call</li>
          <li>To provide, configure and support our services</li>
          <li>To send information about our services where you have agreed to receive it</li>
          <li>To measure marketing performance and improve this website</li>
          <li>To meet legal, tax and record-keeping obligations</li>
        </ul>
        <p>We do not sell your personal information.</p>
      </LegalSection>

      <LegalSection heading="Text messages and calls">
        <p>
          If you provide a phone number and agree to be contacted, we may contact you by phone, email or SMS about your
          request. Message frequency varies, and message and data rates may apply. You can opt out of text messages at
          any time by replying STOP, or of email by using the unsubscribe link. Consent to receive marketing messages is
          not a condition of purchasing anything from us.
        </p>
      </LegalSection>

      <LegalSection heading="Service providers">
        <p>
          We share information with vendors who process it on our behalf, including our CRM and messaging platform
          (GoHighLevel / LeadConnector), our website host, and our analytics and advertising providers. These providers
          are permitted to use the information only to perform services for us.
        </p>
      </LegalSection>

      <LegalSection heading="Analytics and advertising">
        <p>
          Where enabled, this site uses Google Analytics, Google Ads conversion tracking and the Meta pixel to
          understand traffic and measure advertising. These tools set cookies and may allow the providers to build
          profiles across sites. You can opt out of Google Analytics using Google&rsquo;s browser add-on, and you can
          manage ad personalization in your Google and Meta account settings.
        </p>
      </LegalSection>

      <LegalSection heading="Data retention">
        <p>
          We keep demo requests and customer records for as long as needed to provide our services and to meet legal
          obligations, then delete or anonymize them. You may ask us to delete your information sooner.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          Depending on where you live, you may have the right to access, correct, delete or receive a copy of your
          personal information, to opt out of targeted advertising or the sale or sharing of personal information, and
          to appeal a decision we make about such a request. To exercise any of these rights, email{' '}
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. We will not discriminate against you for
          exercising them.
        </p>
      </LegalSection>

      <LegalSection heading="Security">
        <p>
          We use reasonable administrative and technical safeguards to protect information. No method of transmission
          or storage is completely secure, and we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection heading="Children">
        <p>Our services are for businesses. We do not knowingly collect information from anyone under 16.</p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          We may update this policy from time to time. The &ldquo;last updated&rdquo; date above reflects the most
          recent version.
        </p>
      </LegalSection>

      <LegalSection heading="Contact us">
        <p>
          {site.legalName}
          <br />
          {site.contact.address.street}
          <br />
          {site.contact.address.city}, {site.contact.address.region} {site.contact.address.postalCode}
          <br />
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
