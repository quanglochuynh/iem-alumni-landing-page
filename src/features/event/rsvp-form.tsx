'use client';

import { type FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCommonTranslation } from '@/hooks';

type Props = {
  eventId: string;
};

type FormStatus =
  | 'idle'
  | 'submitting'
  | 'success'
  | 'duplicate'
  | 'invalid'
  | 'passwordMismatch'
  | 'unavailable'
  | 'error';

const statusMessages = {
  success: 'RSVP success',
  duplicate: 'RSVP duplicate',
  invalid: 'RSVP invalid',
  passwordMismatch: 'RSVP password mismatch',
  unavailable: 'RSVP unavailable',
  error: 'RSVP error',
} as const satisfies Partial<Record<FormStatus, string>>;

export default function RSVPForm({ eventId }: Props) {
  const commonT = useCommonTranslation();
  const [status, setStatus] = useState<FormStatus>('idle');
  const isSubmitting = status === 'submitting';
  const isComplete = status === 'success';
  const statusMessage = statusMessages[status];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get('password') ?? '');
    const confirmPassword = String(formData.get('confirmPassword') ?? '');

    if (password !== confirmPassword) {
      setStatus('passwordMismatch');
      return;
    }

    setStatus('submitting');
    const bio = String(formData.get('bio') ?? '').trim();
    const facebookProfile = String(
      formData.get('facebookProfile') ?? '',
    ).trim();
    const linkedinProfile = String(
      formData.get('linkedinProfile') ?? '',
    ).trim();
    const payload = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      phone: String(formData.get('phone') ?? '').trim(),
      studentId: String(formData.get('studentId') ?? '').trim(),
      password,
      confirmPassword,
      ...(bio ? { bio } : {}),
      ...(facebookProfile ? { facebookProfile } : {}),
      ...(linkedinProfile ? { linkedinProfile } : {}),
    };

    try {
      const response = await fetch(
        `/api/event/${encodeURIComponent(eventId)}/rsvp`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );

      if (response.status === 201) {
        setStatus('success');
      } else if (response.status === 409) {
        setStatus('duplicate');
      } else if (response.status === 400) {
        setStatus('invalid');
      } else if (response.status === 404) {
        setStatus('unavailable');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <form
      className="max-w-xl space-y-5"
      onSubmit={handleSubmit}
      aria-busy={isSubmitting}
    >
      <div className="space-y-2">
        <label className="block font-medium text-sm" htmlFor="rsvp-name">
          {commonT('RSVP name')}
        </label>
        <input
          autoComplete="name"
          className="h-10 w-full rounded-md border bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          disabled={isSubmitting || isComplete}
          id="rsvp-name"
          maxLength={100}
          minLength={1}
          name="name"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium text-sm" htmlFor="rsvp-email">
          {commonT('RSVP email')}
        </label>
        <input
          autoComplete="email"
          className="h-10 w-full rounded-md border bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          disabled={isSubmitting || isComplete}
          id="rsvp-email"
          name="email"
          required
          type="email"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium text-sm" htmlFor="rsvp-phone">
          {commonT('RSVP phone')}
        </label>
        <input
          autoComplete="tel"
          className="h-10 w-full rounded-md border bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          disabled={isSubmitting || isComplete}
          id="rsvp-phone"
          maxLength={15}
          minLength={10}
          name="phone"
          required
          type="tel"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium text-sm" htmlFor="rsvp-student-id">
          {commonT('RSVP student ID')}
        </label>
        <input
          autoComplete="username"
          className="h-10 w-full rounded-md border bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          disabled={isSubmitting || isComplete}
          id="rsvp-student-id"
          maxLength={20}
          minLength={1}
          name="studentId"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium text-sm" htmlFor="rsvp-bio">
          {commonT('RSVP bio')}
        </label>
        <textarea
          className="min-h-24 w-full rounded-md border bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          disabled={isSubmitting || isComplete}
          id="rsvp-bio"
          maxLength={500}
          name="bio"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium text-sm" htmlFor="rsvp-facebook">
          {commonT('RSVP facebook profile')}
        </label>
        <input
          className="h-10 w-full rounded-md border bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          disabled={isSubmitting || isComplete}
          id="rsvp-facebook"
          name="facebookProfile"
          type="url"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium text-sm" htmlFor="rsvp-linkedin">
          {commonT('RSVP linkedin profile')}
        </label>
        <input
          className="h-10 w-full rounded-md border bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          disabled={isSubmitting || isComplete}
          id="rsvp-linkedin"
          name="linkedinProfile"
          type="url"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium text-sm" htmlFor="rsvp-password">
          {commonT('RSVP password')}
        </label>
        <input
          autoComplete="new-password"
          className="h-10 w-full rounded-md border bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          disabled={isSubmitting || isComplete}
          id="rsvp-password"
          maxLength={100}
          minLength={6}
          name="password"
          required
          type="password"
        />
      </div>

      <div className="space-y-2">
        <label
          className="block font-medium text-sm"
          htmlFor="rsvp-confirm-password"
        >
          {commonT('RSVP confirm password')}
        </label>
        <input
          autoComplete="new-password"
          className="h-10 w-full rounded-md border bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          disabled={isSubmitting || isComplete}
          id="rsvp-confirm-password"
          maxLength={100}
          minLength={6}
          name="confirmPassword"
          required
          type="password"
        />
      </div>

      <Button disabled={isSubmitting || isComplete} type="submit">
        {commonT(isSubmitting ? 'RSVP submitting' : 'Submit RSVP')}
      </Button>

      {statusMessage && (
        <p
          aria-live={status === 'success' ? 'polite' : 'assertive'}
          className={
            status === 'success'
              ? 'text-green-700 text-sm dark:text-green-400'
              : 'text-destructive text-sm'
          }
          role={status === 'success' ? 'status' : 'alert'}
        >
          {commonT(statusMessage)}
        </p>
      )}
    </form>
  );
}
