import { Resend } from "resend"

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

export async function sendRegistrationConfirmation({
  to,
  userName,
  event,
  ticketRef,
}: {
  to: string
  userName: string
  event: {
    title: string
    startDate: Date
    endDate: Date
    venueName?: string
    city?: string
    virtualUrl?: string
    slug: string
  }
  ticketRef: string
}) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  const eventUrl = `${appUrl}/events/${event.slug}`
  const cancelUrl = `${appUrl}/dashboard/registrations`

  const resend = getResend()
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping confirmation email")
    return
  }
  return resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "WPE Events <onboarding@resend.dev>",
    to,
    subject: `You're registered for ${event.title} — WPE`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f9f9f7; margin: 0; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e8e8e4;">
    <div style="background: #0a0a0a; padding: 32px 40px;">
      <p style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 0; letter-spacing: -0.02em;">WPE</p>
    </div>
    <div style="padding: 40px;">
      <p style="color: #6b6b6b; font-size: 14px; margin: 0 0 8px;">Registration confirmed</p>
      <h1 style="color: #0a0a0a; font-size: 24px; font-weight: 700; margin: 0 0 24px; letter-spacing: -0.02em;">${event.title}</h1>
      <div style="background: #f9f9f7; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <p style="margin: 0 0 8px; color: #6b6b6b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Ticket Reference</p>
        <p style="margin: 0; color: #0a0a0a; font-size: 16px; font-weight: 600; font-family: monospace;">${ticketRef}</p>
      </div>
      <p style="color: #6b6b6b; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">Hi ${userName}, you're all set! We look forward to seeing you at this event.</p>
      <a href="${eventUrl}" style="display: inline-block; background: #c9821a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 15px; font-weight: 600;">View Event Details</a>
      <hr style="border: none; border-top: 1px solid #e8e8e4; margin: 32px 0;">
      <p style="color: #a3a3a0; font-size: 13px; margin: 0;">Can't make it? <a href="${cancelUrl}" style="color: #c9821a;">Manage your registrations</a></p>
    </div>
  </div>
</body>
</html>`,
  })
}

export async function sendEventReminder({
  to,
  userName,
  event,
}: {
  to: string
  userName: string
  event: {
    title: string
    startDate: Date
    slug: string
    venueName?: string
    city?: string
    virtualUrl?: string
  }
}) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  const eventUrl = `${appUrl}/events/${event.slug}`

  const resend = getResend()
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping reminder email")
    return
  }
  return resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "WPE Events <onboarding@resend.dev>",
    to,
    subject: `Tomorrow: ${event.title} — WPE`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f9f9f7; margin: 0; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e8e8e4;">
    <div style="background: #0a0a0a; padding: 32px 40px;">
      <p style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 0;">WPE</p>
    </div>
    <div style="padding: 40px;">
      <p style="color: #c9821a; font-size: 14px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">Reminder — Tomorrow</p>
      <h1 style="color: #0a0a0a; font-size: 24px; font-weight: 700; margin: 0 0 16px; letter-spacing: -0.02em;">${event.title}</h1>
      <p style="color: #6b6b6b; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">Hi ${userName}, your event is tomorrow. We look forward to seeing you!</p>
      ${event.virtualUrl ? `<div style="background: #fdf3e3; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px;"><p style="margin: 0 0 4px; font-size: 13px; color: #6b6b6b;">Virtual link</p><a href="${event.virtualUrl}" style="color: #c9821a; font-weight: 600; word-break: break-all;">${event.virtualUrl}</a></div>` : ""}
      <a href="${eventUrl}" style="display: inline-block; background: #c9821a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 15px; font-weight: 600;">View Event Details</a>
    </div>
  </div>
</body>
</html>`,
  })
}
