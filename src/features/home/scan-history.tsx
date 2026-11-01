import DynamicAvatar from '@/components/common/overridden/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useConnections } from '@/features/contact/contact.hook';
import { useCommonTranslation, useErrorTranslation } from '@/hooks';
import { Link } from '@/i18n/navigation';
import { AppRoute } from '@/interfaces';
import { getR2ImageUrl } from '@/lib/cloudflare.helper';
import type { ConnectionUser } from '@/types/user.types';

function PeopleList({
  title,
  people,
}: {
  title: string;
  people: ConnectionUser[];
}) {
  const t = useCommonTranslation();
  return (
    <div>
      <h3 className="mb-3 font-semibold text-lg">{title}</h3>
      {people.length === 0 ? (
        <p className="text-muted-foreground">{t('No one yet')}</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {people.map((p) => (
            <li key={p.id}>
              <Link
                href={`${AppRoute.MY_CONTACT}?code=${encodeURIComponent(p.clientCode)}`}
              >
                <Card className="py-4">
                  <CardContent className="flex items-center gap-3 px-4">
                    <DynamicAvatar
                      size="lg"
                      name={p.name}
                      src={
                        p.avatar ? getR2ImageUrl(p.avatar.thumbnailPath) : null
                      }
                    />
                    <div className="min-w-0">
                      <p className="truncate font-medium">{p.name}</p>
                      <p className="truncate text-muted-foreground text-sm">
                        {p.studentId}
                        {p.company ? ` · ${p.company}` : ''}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ScanHistory() {
  const { data, isLoading, isError } = useConnections();
  const t = useCommonTranslation();
  const errorT = useErrorTranslation();

  if (isLoading) return <Spinner />;
  if (isError || !data)
    return (
      <p className="text-muted-foreground">
        {errorT('Failed to load scan history')}
      </p>
    );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <PeopleList title={t('People I scanned')} people={data.scanned} />
      <PeopleList title={t('People who scanned me')} people={data.scannedBy} />
    </div>
  );
}
