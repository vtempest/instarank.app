import { Resend } from "resend"

let resendClient: Resend | null = null

function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[v0] RESEND_API_KEY not configured - email functionality disabled")
    return null
  }
  
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY)
  }
  
  return resendClient
}

export async function sendWelcomeEmail(email: string, name: string) {
  const resend = getResendClient()
  
  if (!resend) {
    console.log("[v0] Skipping welcome email - Resend not configured")
    return { success: false, error: "Email service not configured" }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "InstaRank <onboarding@instarank.com>",
      to: email,
      subject: "Welcome to InstaRank!",
      html: `
        <h1>Welcome to InstaRank, ${name}!</h1>
        <p>Thank you for signing up. Your 14-day free trial has started.</p>
        <p>Get started by:</p>
        <ul>
          <li>Adding your first Amazon store</li>
          <li>Tracking your competitors</li>
          <li>Discovering high-value keywords</li>
          <li>Generating AI-powered listings</li>
        </ul>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Best regards,<br>The InstaRank Team</p>
      `,
    })

    if (error) {
      console.error("[v0] Error sending welcome email:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error("[v0] Failed to send welcome email:", error)
    return { success: false, error }
  }
}

export async function sendTrialEndingEmail(email: string, name: string, daysLeft: number) {
  const resend = getResendClient()
  
  if (!resend) {
    console.log("[v0] Skipping trial ending email - Resend not configured")
    return { success: false, error: "Email service not configured" }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "InstaRank <notifications@instarank.com>",
      to: email,
      subject: `Your InstaRank trial ends in ${daysLeft} days`,
      html: `
        <h1>Hi ${name},</h1>
        <p>Your 14-day free trial of InstaRank will end in ${daysLeft} days.</p>
        <p>To continue using InstaRank and keep all your data, please upgrade to a paid plan.</p>
        <p><a href="https://instarank.com/dashboard/billing">Upgrade Now</a></p>
        <p>Best regards,<br>The InstaRank Team</p>
      `,
    })

    if (error) {
      console.error("[v0] Error sending trial ending email:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error("[v0] Failed to send trial ending email:", error)
    return { success: false, error }
  }
}
