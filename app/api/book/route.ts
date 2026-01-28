import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Use dynamic import of Resend SDK here to avoid requiring in environments without it
async function getResendClient() {
  const { Resend } = await import('resend')
  return new Resend(process.env.RESEND_API_KEY)
}

async function sendEmailWithRetriesViaSDK(payload: any, apiKey: string, maxRetries = 3) {
  const Resend = (await import('resend')).Resend
  const client = new Resend(apiKey)
  let attempt = 0
  let lastError: any = null

  while (attempt < maxRetries) {
    try {
      const r = await client.emails.send(payload)
      return { ok: true, result: r }
    } catch (err) {
      lastError = err
      attempt++
      if (attempt < maxRetries) {
        const waitMs = 300 * Math.pow(2, attempt)
        await new Promise((r) => setTimeout(r, waitMs))
      }
    }
  }

  return { ok: false, error: lastError }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const {
      fullName,
      email,
      company,
      phone,
      projectType,
      otherProjectName,
      budget,
      goals,
      preferredDate,
      preferredTime,
      notes,
    } = data

    if (!fullName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY

    if (!RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY env variable')
      return NextResponse.json({ error: 'Mail sender not configured' }, { status: 500 })
    }

    const subject = `New booking from ${fullName} — ${projectType || otherProjectName || 'Project'}`

    // Build react template props
    const reactProps = {
      fullName,
      email,
      company,
      phone,
      projectType,
      otherProjectName,
      budget,
      goals,
      preferredDate,
      preferredTime,
      notes,
    }

    // Select sender. Honor USE_RESEND_DEV to allow using Resend's verified test sender in production.
    const DEV_FROM = 'Acme <onboarding@resend.dev>'
    const DEFAULT_FROM = 'Insalink <no-reply@insalink.com>'
    const FROM = process.env.USE_RESEND_DEV === 'true'
      ? DEV_FROM
      : (process.env.BOOKING_SENDER_EMAIL || DEFAULT_FROM)

    // Fixed recipient for production as requested (do not rely on env for recipient)
    const RECIPIENT = 'bitumeena25@gmail.com'

    // Build HTML directly (avoid importing components/server rendering in the route)
    const html = `<!doctype html>
      <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color: #0f172a;">
        <h2>New booking request</h2>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ''}
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
        <p><strong>Project type:</strong> ${escapeHtml(projectType || otherProjectName || '—')}</p>
        ${otherProjectName ? `<p><strong>Project name:</strong> ${escapeHtml(otherProjectName)}</p>` : ''}
        ${budget ? `<p><strong>Budget:</strong> ${escapeHtml(budget)}</p>` : ''}
        <p><strong>Goals:</strong><br/>${escapeHtml(goals || '—').replace(/\n/g, '<br/>')}</p>
        <p><strong>Preferred:</strong> ${escapeHtml(preferredDate || '—')} ${preferredTime ? `at ${escapeHtml(preferredTime)}` : ''}</p>
        ${notes ? `<p><strong>Notes:</strong><br/>${escapeHtml(notes).replace(/\n/g, '<br/>')}</p>` : ''}
        <hr />
        <p style="font-size:12px;color:#6b7280;">This email was sent from the Digitomedia booking form.</p>
      </div>`

    const payload = {
      from: FROM,
      to: [RECIPIENT],
      reply_to: email,
      subject,
      html,
    }

    const result = await sendEmailWithRetriesViaSDK(payload, RESEND_API_KEY, 3)

    if (!result.ok) {
      console.error('Failed to send via Resend SDK after retries', result.error)

      let detailStr = ''
      try {
        if (typeof result.error === 'string') {
          detailStr = result.error
        } else {
          detailStr = JSON.stringify(result.error, Object.getOwnPropertyNames(result.error), 2)
        }
      } catch (stringifyErr) {
        try {
          detailStr = String(result.error)
        } catch (_) {
          detailStr = '[unknown error]'
        }
      }

      try {
        const logDir = path.join(process.cwd(), 'bookings')
        if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true })
        const logFile = path.join(logDir, 'failed-bookings.log')
        const entry = {
          when: new Date().toISOString(),
          payload: data,
          error: detailStr,
        }
        fs.appendFileSync(logFile, JSON.stringify(entry) + '\n')
      } catch (fsErr) {
        console.error('Failed to write fallback booking log', fsErr)
      }

      return NextResponse.json({ error: 'Failed to send email', detail: detailStr }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

function escapeHtml(str: unknown) {
  if (str == null) return ''
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}
