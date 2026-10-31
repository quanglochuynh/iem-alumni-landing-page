'use client';

import { type FormEvent, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCommonTranslation } from '@/hooks';
import { Link } from '@/i18n/navigation';
import { AppRoute } from '@/interfaces';

type Props = {
  eventId: string;
};

type FormStatus =
  | 'idle'
  | 'checking'
  | 'registered'
  | 'submitting'
  | 'success'
  | 'duplicate'
  | 'unauthorized'
  | 'unavailable'
  | 'error';

const statusMessages = {
  success: 'RSVP success',
  duplicate: 'RSVP duplicate',
  registered: 'RSVP already registered',
  unauthorized: 'RSVP login required',
  unavailable: 'RSVP unavailable',
  error: 'RSVP error',
} as const satisfies Partial<Record<FormStatus, string>>;

export default function RSVPForm({ eventId }: Props) {
  const commonT = useCommonTranslation();
  const [status, setStatus] = useState<FormStatus>('checking');
  const isSubmitting = status === 'submitting';
  const isComplete = status === 'success' || status === 'registered';
  const statusMessage = statusMessages[status];

  useEffect(() => {
    let isMounted = true;

    async function checkRegistrationStatus() {
      try {
        const response = await fetch(
          `/api/protected/event/${encodeURIComponent(eventId)}/rsvp-status`,
          { method: 'GET', headers: { Accept: 'application/json' } },
        );

        if (!isMounted) {
          return;
        }

        if (response.status === 200) {
          const data = (await response.json()) as { registered?: boolean };
          setStatus(data.registered ? 'registered' : 'idle');
          return;
        }

        if (response.status === 401) {
          setStatus('unauthorized');
          return;
        }

        if (response.status === 404) {
          setStatus('unavailable');
          return;
        }

        setStatus('idle');
      } catch {
        if (isMounted) {
          setStatus('idle');
        }
      }
    }

    void checkRegistrationStatus();

    return () => {
      isMounted = false;
    };
  }, [eventId]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch(
        `/api/event/${encodeURIComponent(eventId)}/rsvp`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        },
      );

      if (response.status === 201) {
        setStatus('success');
      } else if (response.status === 409) {
        setStatus('duplicate');
      } else if (response.status === 401) {
        setStatus('unauthorized');
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
      {status !== 'registered' &&
        status !== 'duplicate' &&
        status !== 'success' && (
          <Button disabled={isSubmitting || isComplete} type="submit">
            {commonT(isSubmitting ? 'RSVP submitting' : 'Submit RSVP')}
          </Button>
        )}

      {statusMessage && (
        <p
          aria-live={
            status === 'success' || status === 'registered'
              ? 'polite'
              : 'assertive'
          }
          className={
            status === 'success' || status === 'registered'
              ? 'text-green-700 text-sm dark:text-green-400'
              : 'text-destructive text-sm'
          }
          role={
            status === 'success' || status === 'registered' ? 'status' : 'alert'
          }
        >
          {commonT(statusMessage)}
          {status === 'unauthorized' && (
            <>
              {' '}
              <Link className="underline" href={AppRoute.LOGIN}>
                {commonT('RSVP sign in')}
              </Link>
            </>
          )}
        </p>
      )}
    </form>
  );
}
