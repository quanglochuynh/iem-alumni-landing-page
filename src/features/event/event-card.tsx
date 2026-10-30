'use client';

import { Ticket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { apiClient } from '@/components/providers/api-provider/api-client';
import { authStore } from '@/components/providers/auth-provider/auth.store';
import { DateFormat, getDateFormatted } from '@/lib/date.util';

type Props = {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  startDate: Date;
  endDate: Date | null;
  href: string;
  rspvHref: string;
};

export default function EventCard({
  slug,
  title,
  description,
  imageUrl,
  location,
  startDate,
  endDate,
  href,
  rspvHref,
}: Props) {
  const userSession = authStore((state) => state.userSession);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isCheckingRegisterStatus, setIsCheckingRegisterStatus] =
    useState(false);

  useEffect(() => {
    if (!userSession) {
      setIsRegistered(false);
      setIsCheckingRegisterStatus(false);
      return;
    }

    let isMounted = true;
    setIsCheckingRegisterStatus(true);

    apiClient
      .get<{ registered: boolean }>(
        `/api/protected/event/${encodeURIComponent(slug)}/rsvp-status`,
      )
      .then(({ data }) => {
        if (isMounted) {
          setIsRegistered(Boolean(data.registered));
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsRegistered(false);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsCheckingRegisterStatus(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug, userSession]);

  return (
    <Card className="pt-0">
      <Link href={href}>
        <Image
          className="rounded-t-xl"
          src={imageUrl}
          alt=""
          width={500}
          height={300}
        />
        <CardContent className="p-5">
          <h5 className="mb-2 font-bold text-2xl text-gray-900 tracking-tight dark:text-white">
            {title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
          <p className="mb-2 text-gray-500 text-sm dark:text-gray-400">
            {location}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {getDateFormatted(startDate, DateFormat.DATETIME)}
            {endDate
              ? ` - ${getDateFormatted(endDate, DateFormat.DATETIME)}`
              : ''}
          </p>
        </CardContent>
      </Link>

      <CardFooter>
        {isRegistered ? (
          <p className="text-muted-foreground text-sm">
            You already registered for this event.
          </p>
        ) : isCheckingRegisterStatus ? (
          <p className="text-muted-foreground text-sm">Checking RSVP status...</p>
        ) : (
          <Link href={rspvHref}>
            <Button>
              <Ticket className="size-4" />
              RSVP
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
