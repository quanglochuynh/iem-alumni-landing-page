import EventDetailPage from '@/features/event/event-detail.page';
import '../../../../../../(nav)/event/[slug]/md.scss';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import RSVPForm from '@/features/event/rsvp-form';
import { getCommonTranslation } from '@/hooks';
import { AppRoute } from '@/interfaces';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const commonT = await getCommonTranslation(locale);
  return (
    <EventDetailPage
      locale={locale}
      slug={slug}
      basePaths={[{ name: commonT('Home'), href: AppRoute.HOME }]}
      renderRSVPForm={(eventId) => (
        <Card>
          <CardHeader>
            <CardTitle>RSVP</CardTitle>
            <CardDescription>
              Let us know if you'll be attending the event.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RSVPForm eventId={eventId} />
          </CardContent>
        </Card>
      )}
    />
  );
}
