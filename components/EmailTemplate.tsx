import React from 'react'

type Props = {
  fullName: string
  email: string
  company?: string
  phone?: string
  projectType?: string
  otherProjectName?: string
  budget?: string
  goals?: string
  preferredDate?: string
  preferredTime?: string
  notes?: string
}

export function EmailTemplate(props: Props) {
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
  } = props

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial', color: '#0f172a', lineHeight: 1.4 }}>
      <h2 style={{ marginBottom: 8 }}>New booking request</h2>
      <p><strong>Name:</strong> {fullName}</p>
      <p><strong>Email:</strong> {email}</p>
      {company && <p><strong>Company:</strong> {company}</p>}
      {phone && <p><strong>Phone:</strong> {phone}</p>}
      <p><strong>Project type:</strong> {projectType || otherProjectName || '—'}</p>
      {otherProjectName && <p><strong>Project name:</strong> {otherProjectName}</p>}
      {budget && <p><strong>Budget:</strong> {budget}</p>}
      <p><strong>Goals:</strong><br />{goals || '—'}</p>
      <p><strong>Preferred:</strong> {preferredDate || '—'} {preferredTime ? `at ${preferredTime}` : ''}</p>
      {notes && <p><strong>Notes:</strong><br />{notes}</p>}
      <hr style={{ marginTop: 12, marginBottom: 12, border: 0, borderTop: '1px solid #e6e6e6' }} />
      <p style={{ fontSize: 12, color: '#6b7280' }}>This email was sent from the Insalink booking form.</p>
    </div>
  )
}

export default EmailTemplate
