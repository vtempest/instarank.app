import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Button variant="ghost" className="mb-8" asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="prose prose-gray max-w-none dark:prose-invert">
        <h1>Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing or using InstaRank ("Service"), you agree to be bound by these Terms of Service ("Terms").
          If you disagree with any part of the terms, then you may not access the Service.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          InstaRank provides AI-powered Amazon optimization and marketing automation services, including but not
          limited to competitor analysis, keyword research, content generation, and listing optimization.
        </p>

        <h2>3. User Accounts</h2>
        <p>
          When you create an account with us, you must provide information that is accurate, complete, and current
          at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination
          of your account on our Service.
        </p>
        <p>
          You are responsible for safeguarding the password that you use to access the Service and for any activities
          or actions under your password. You agree not to disclose your password to any third party.
        </p>

        <h2>4. Subscription and Billing</h2>
        <ul>
          <li>
            <strong>Subscription Plans:</strong> We offer various subscription plans with different features and
            pricing. Details of each plan are available on our pricing page.
          </li>
          <li>
            <strong>Billing:</strong> Subscription fees are billed in advance on a monthly or annual basis depending
            on your chosen plan. All fees are non-refundable except as required by law.
          </li>
          <li>
            <strong>Auto-Renewal:</strong> Your subscription will automatically renew at the end of each billing
            period unless you cancel it before the renewal date.
          </li>
          <li>
            <strong>Cancellation:</strong> You may cancel your subscription at any time through your account settings.
            Cancellation will take effect at the end of your current billing period.
          </li>
        </ul>

        <h2>5. Acceptable Use</h2>
        <p>You agree not to use the Service:</p>
        <ul>
          <li>In any way that violates any applicable national or international law or regulation.</li>
          <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent.</li>
          <li>To impersonate or attempt to impersonate InstaRank, an InstaRank employee, another user, or any other person or entity.</li>
          <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful.</li>
          <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service.</li>
        </ul>

        <h2>6. Intellectual Property</h2>
        <p>
          The Service and its original content, features, and functionality are and will remain the exclusive property
          of InstaRank and its licensors. The Service is protected by copyright, trademark, and other laws of both
          the United States and foreign countries. Our trademarks and trade dress may not be used in connection with
          any product or service without the prior written consent of InstaRank.
        </p>

        <h2>7. User Content</h2>
        <p>
          Our Service may allow you to post, link, store, share and otherwise make available certain information,
          text, graphics, or other material ("Content"). You are responsible for the Content that you post to the
          Service, including its legality, reliability, and appropriateness.
        </p>
        <p>
          By posting Content to the Service, you grant us the right and license to use, modify, publicly perform,
          publicly display, reproduce, and distribute such Content on and through the Service.
        </p>

        <h2>8. AI-Generated Content</h2>
        <p>
          Our Service uses artificial intelligence to generate content and recommendations. While we strive for
          accuracy, we do not guarantee that AI-generated content will be error-free, complete, or suitable for your
          specific purposes. You are responsible for reviewing and verifying all AI-generated content before use.
        </p>

        <h2>9. Third-Party Services</h2>
        <p>
          Our Service may contain links to third-party websites or services (including Amazon) that are not owned or
          controlled by InstaRank. We have no control over, and assume no responsibility for, the content, privacy
          policies, or practices of any third-party websites or services.
        </p>

        <h2>10. Limitation of Liability</h2>
        <p>
          In no event shall InstaRank, nor its directors, employees, partners, agents, suppliers, or affiliates, be
          liable for any indirect, incidental, special, consequential or punitive damages, including without
          limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access
          to or use of or inability to access or use the Service.
        </p>

        <h2>11. Disclaimer</h2>
        <p>
          Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE"
          basis. The Service is provided without warranties of any kind, whether express or implied, including, but
          not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement
          or course of performance.
        </p>

        <h2>12. Termination</h2>
        <p>
          We may terminate or suspend your account immediately, without prior notice or liability, for any reason
          whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the
          Service will immediately cease.
        </p>

        <h2>13. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
          is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
        </p>

        <h2>14. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of the State of California, United
          States, without regard to its conflict of law provisions.
        </p>

        <h2>15. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <p>
          Email: legal@instarank.com
          <br />
          Address: InstaRank, 123 Commerce Street, Suite 100, San Francisco, CA 94102
        </p>
      </div>
    </div>
  )
}
