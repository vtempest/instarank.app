import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Button variant="ghost" className="mb-8" asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="prose prose-gray max-w-none dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to InstaRank. We respect your privacy and are committed to protecting your personal data. This
          privacy policy will inform you about how we look after your personal data when you visit our website and tell
          you about your privacy rights and how the law protects you.
        </p>

        <h2>2. Information We Collect</h2>
        <p>We may collect, use, store and transfer different kinds of personal data about you:</p>
        <ul>
          <li>
            <strong>Identity Data:</strong> First name, last name, username or similar identifier.
          </li>
          <li>
            <strong>Contact Data:</strong> Email address and telephone numbers.
          </li>
          <li>
            <strong>Technical Data:</strong> Internet protocol (IP) address, browser type and version, time zone
            setting and location, browser plug-in types and versions, operating system and platform.
          </li>
          <li>
            <strong>Usage Data:</strong> Information about how you use our website, products and services.
          </li>
          <li>
            <strong>Marketing and Communications Data:</strong> Your preferences in receiving marketing from us and
            your communication preferences.
          </li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
        <ul>
          <li>To register you as a new customer and provide our services to you.</li>
          <li>To process and deliver your orders including managing payments and collecting money owed to us.</li>
          <li>To manage our relationship with you including notifying you about changes to our terms or privacy policy.</li>
          <li>To improve our website, products/services, marketing or customer relationships.</li>
          <li>To recommend products or services which may be of interest to you.</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally
          lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data
          to those employees, agents, contractors and other third parties who have a business need to know.
        </p>

        <h2>5. Data Retention</h2>
        <p>
          We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for,
          including for the purposes of satisfying any legal, accounting, or reporting requirements.
        </p>

        <h2>6. Your Legal Rights</h2>
        <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
        <ul>
          <li>Request access to your personal data.</li>
          <li>Request correction of your personal data.</li>
          <li>Request erasure of your personal data.</li>
          <li>Object to processing of your personal data.</li>
          <li>Request restriction of processing your personal data.</li>
          <li>Request transfer of your personal data.</li>
          <li>Right to withdraw consent.</li>
        </ul>

        <h2>7. Third-Party Links</h2>
        <p>
          Our website may include links to third-party websites, plug-ins and applications. Clicking on those links
          or enabling those connections may allow third parties to collect or share data about you. We do not control
          these third-party websites and are not responsible for their privacy statements.
        </p>

        <h2>8. Cookies</h2>
        <p>
          Our website uses cookies to distinguish you from other users of our website. This helps us to provide you
          with a good experience when you browse our website and also allows us to improve our site.
        </p>

        <h2>9. Changes to This Privacy Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify you of any changes by posting the new
          privacy policy on this page and updating the "Last updated" date.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have any questions about this privacy policy or our privacy practices, please contact us at:
        </p>
        <p>
          Email: privacy@instarank.com
          <br />
          Address: InstaRank, 123 Commerce Street, Suite 100, San Francisco, CA 94102
        </p>
      </div>
    </div>
  )
}
