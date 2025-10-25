"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Navbar } from "@/components/navbar"
import { User, Layers, Calendar, ClipboardList, ArrowRight, ArrowLeft, Check } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

type ProjectType = "Web Development" | "Digital Marketing" | "Mobile App" | "Branding" | "Other"

type FormState = {
  fullName: string
  email: string
  company?: string
  phone?: string
  projectType: ProjectType | ""
  otherProjectName?: string
  budget?: string
  goals?: string
  preferredDate?: string
  preferredTime?: string
  notes?: string
}

export default function BookPage() {
  const [step, setStep] = useState<number>(1)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    otherProjectName: "",
    budget: "",
    goals: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  })
  const [submissionStage, setSubmissionStage] = useState<'idle' | 'sending' | 'success'>('idle')

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => ({ ...s, [key]: value }))
  }

  function validateEmail(email: string) {
    return /^\S+@\S+\.\S+$/.test(email)
  }

  function validateStep1() {
    if (!form.fullName.trim()) {
      toast({ title: "Please enter your name" })
      return false
    }
    if (!form.email.trim() || !validateEmail(form.email)) {
      toast({ title: "Please enter a valid email" })
      return false
    }
    return true
  }

  function validateStep2() {
    if (!form.projectType) {
      toast({ title: "Please select a project type" })
      return false
    }
    if (form.projectType === "Other" && !form.otherProjectName?.trim()) {
      toast({ title: "Please provide a short name for your project", description: "This helps us understand what you'll be discussing and prepare relevant questions." })
      return false
    }
    if (!form.goals?.trim()) {
      toast({ title: "Please enter a short summary of your goals" })
      return false
    }
    return true
  }

  function validateStep3() {
    if (!form.preferredDate) {
      toast({ title: "Please select a preferred date" })
      return false
    }
    return true
  }

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault()

    if (!validateStep1() || !validateStep2() || !validateStep3()) return

    setSubmitting(true)
    setSubmissionStage('sending')
    try {
      const resp = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!resp.ok) {
        // Try to parse provider/server details for a more helpful error message
        let errText = `Failed to send booking email (status ${resp.status}).`
        try {
          const json = await resp.json()
          if (json?.error) errText = String(json.error)
          if (json?.detail) errText += ` — ${String(json.detail)}`
          if (json?.status) errText += ` (provider status ${String(json.status)})`
        } catch (parseErr) {
          // fallback: include status text
          try {
            const txt = await resp.text()
            if (txt) errText += ` — ${txt}`
          } catch (_) {
            // ignore
          }
        }
        throw new Error(errText)
      }

      // indicate success with a short animation before showing toast
      setSubmissionStage('success')
      await new Promise((r) => setTimeout(r, 700))
      toast({ title: 'Booking request submitted', description: `Thanks ${form.fullName}. We'll contact ${form.email} to confirm.` })

      setForm({ fullName: '', email: '', company: '', phone: '', projectType: '', otherProjectName: '', budget: '', goals: '', preferredDate: '', preferredTime: '', notes: '' })
      setStep(1)
      setSubmissionStage('idle')
    } catch (err: any) {
      console.error(err)
      toast({ title: 'Submission failed', description: err?.message || 'Please try again later.' })
      setSubmissionStage('idle')
    } finally {
      setSubmitting(false)
    }
  }

  const progressPercent = Math.round(((step - 1) / 2) * 100)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
        <Toaster />
        {/* Submission overlay: sleek, minimal animation */}
        {submissionStage !== 'idle' && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 rounded-xl bg-card/95 border border-border p-6 shadow-2xl w-[90%] max-w-sm">
              {submissionStage === 'sending' ? (
                <>
                  <div className="p-3 rounded-full bg-primary/5">
                    <Spinner className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-lg font-semibold">Sending your booking…</div>
                  <div className="text-sm text-muted-foreground text-center">We're securely sending your details and preparing a confirmation.</div>
                </>
              ) : (
                <>
                  <div className="p-3 rounded-full bg-green-500/10">
                    <Check className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="text-lg font-semibold">Booking submitted</div>
                  <div className="text-sm text-muted-foreground text-center">Thanks — we'll reach out to confirm the meeting shortly.</div>
                </>
              )}
            </div>
          </div>
        )}
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left: Form Card */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-card shadow-lg border border-border p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="flex-shrink-0 flex items-center justify-center rounded-md bg-primary/10 p-2">
                      <ClipboardList className="h-6 w-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h1 className="text-2xl sm:text-3xl font-bold truncate">Book a Meeting</h1>
                      <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">Quick 3‑step brief — let’s get started.</p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="inline-flex items-center gap-2"><User className="h-4 w-4 opacity-70"/> Personalised call</div>
                        <div className="inline-flex items-center gap-2"><Layers className="h-4 w-4 opacity-70"/> Project-focused</div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col items-end text-right">
                    <div className="text-sm text-muted-foreground">Estimated time</div>
                    <div className="text-sm font-medium">5–10 minutes</div>
                  </div>
                </div>

                {/* Stepper */}
                <div className="mt-6">
                  <div className="flex items-center gap-6">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ring-1 ${step === s ? 'bg-foreground text-background ring-foreground/10' : step > s ? 'bg-primary text-primary-foreground ring-primary/10' : 'bg-gray-100 text-muted-foreground ring-border/60'}`}>
                          {s}
                        </div>
                        <div className="hidden sm:block text-sm text-muted-foreground leading-tight">{s === 1 ? 'Contact' : s === 2 ? 'Project' : 'Schedule'}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-primary to-foreground transition-all" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-6">
                  {/* Card body */}
                  <div className="space-y-6">
                    {/* Step 1 */}
                    {step === 1 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label>Full name *</Label>
                          <Input value={form.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder="Jane Doe" />
                        </div>

                        <div>
                          <Label>Email *</Label>
                          <Input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@company.com" />
                        </div>

                        <div>
                          <Label>Company (optional)</Label>
                          <Input value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="Acme Inc" />
                        </div>

                        <div>
                          <Label>Phone (optional)</Label>
                          <Input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+1 (555) 555-5555" />
                        </div>

                        <div className="sm:col-span-2 text-sm text-muted-foreground mt-1">We'll use this information to follow up and prepare for the meeting.</div>

                        <div className="sm:col-span-2 flex justify-end">
                          <Button variant="secondary" size="sm" className="bg-black text-white hover:bg-black/90 dark:bg-black dark:text-white shadow-sm" onClick={() => { if (validateStep1()) setStep(2) }}>
                            Next <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label>Project type *</Label>
                          <Select value={form.projectType} onValueChange={(v) => update('projectType', v as ProjectType)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Web Development">Web Development</SelectItem>
                              <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                              <SelectItem value="Mobile App">Mobile App</SelectItem>
                              <SelectItem value="Branding">Branding</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Estimated budget (optional)</Label>
                          <Select value={form.budget} onValueChange={(v) => update('budget', v)}>
                            <SelectTrigger>
                              <SelectValue placeholder="No preference" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No preference</SelectItem>
                              <SelectItem value="<$5k">&lt;$5k</SelectItem>
                              <SelectItem value="$5k-$15k">$5k-$15k</SelectItem>
                              <SelectItem value="$15k+">$15k+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="sm:col-span-2">
                          <Label>Project goals / Brief *</Label>
                          <Textarea value={form.goals} onChange={(e) => update('goals', e.target.value)} rows={4} placeholder="Short summary of objectives, key features, or campaigns." />
                        </div>

                        {/* When 'Other' is selected ask the user to name the project */}
                        {form.projectType === "Other" && (
                          <div className="sm:col-span-2">
                            <Label>Project name (short) *</Label>
                            <Input value={form.otherProjectName} onChange={(e) => update('otherProjectName', e.target.value)} placeholder="e.g. Local Marketplace Redesign" />
                            <div className="text-xs text-muted-foreground mt-1">A concise project name helps us prepare more focused questions for the meeting.</div>
                          </div>
                        )}

                        <div className="sm:col-span-2 flex items-center justify-between">
                          <Button variant="ghost" size="sm" onClick={() => setStep(1)}><ArrowLeft className="h-4 w-4 mr-2"/>Back</Button>
                          <Button variant="secondary" size="sm" className="bg-black text-white hover:bg-black/90 dark:bg-black dark:text-white shadow-sm" onClick={() => { if (validateStep2()) setStep(3) }}>Next <ArrowRight className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label>Preferred date *</Label>
                          <Input type="date" value={form.preferredDate} onChange={(e) => update('preferredDate', e.target.value)} />
                        </div>

                        <div>
                          <Label>Preferred time (optional)</Label>
                          <Input type="time" value={form.preferredTime} onChange={(e) => update('preferredTime', e.target.value)} />
                        </div>

                        <div className="sm:col-span-2">
                          <Label>Additional notes (optional)</Label>
                          <Textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} rows={3} placeholder="Anything we should know before the call?" />
                        </div>

                        <div className="sm:col-span-2 bg-gradient-to-r from-muted-foreground/6 to-muted-foreground/3 p-4 rounded-lg border border-border">
                          <h4 className="text-sm font-medium mb-2">Review</h4>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div><strong className="text-foreground">Name:</strong> <span className="ml-2">{form.fullName || '—'}</span></div>
                            <div><strong className="text-foreground">Email:</strong> <span className="ml-2">{form.email || '—'}</span></div>
                            <div><strong className="text-foreground">Company:</strong> <span className="ml-2">{form.company || '—'}</span></div>
                            <div><strong className="text-foreground">Project:</strong> <span className="ml-2">{form.projectType || '—'}</span></div>
                            <div><strong className="text-foreground">Goals:</strong> <div className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">{form.goals || '—'}</div></div>
                            <div><strong className="text-foreground">Preferred:</strong> <span className="ml-2">{form.preferredDate || '—'} {form.preferredTime ? `at ${form.preferredTime}` : ''}</span></div>
                            <div><strong className="text-foreground">Notes:</strong> <span className="ml-2">{form.notes || '—'}</span></div>
                            {form.projectType === 'Other' && form.otherProjectName && (
                              <div><strong className="text-foreground">Project name:</strong> <span className="ml-2">{form.otherProjectName}</span></div>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-2 flex items-center justify-between">
                          <Button variant="ghost" size="sm" onClick={() => setStep(2)}><ArrowLeft className="h-4 w-4 mr-2"/>Back</Button>
                          <div className="flex gap-2">
                            <Button type="submit" className="rounded-md flex items-center gap-2" disabled={submitting} onClick={(e) => { e.preventDefault(); if (validateStep3()) handleSubmit() }}>
                              {submitting ? 'Sending…' : 'Submit booking'} <Check className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Right: Summary / CTA */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-4">
                <div className="rounded-xl bg-gradient-to-tr from-primary/6 to-muted-foreground/6 p-6 border border-border shadow-lg text-left">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2"><ClipboardList className="h-5 w-5 text-primary"/></div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold leading-tight">Why a short brief helps us</h3>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Sharing goals ensures a focused and valuable meeting.</p>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground pl-5 list-disc list-inside">
                    <li>Tailored recommendations</li>
                    <li>Faster project scoping</li>
                    <li>Clear next steps after the call</li>
                  </ul>
                </div>

                <div className="rounded-xl bg-gradient-to-tr from-primary/10 to-muted-foreground/6 p-6 border border-border text-left">
                  <h4 className="text-sm font-medium leading-tight">Need immediate help?</h4>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Email us directly at <a className="text-primary underline" href="mailto:hello@digitomedia.com">hello@digitomedia.com</a></p>
                  <div className="mt-4">
                    <Link href="/" className="text-sm text-muted-foreground underline">Back home</Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
