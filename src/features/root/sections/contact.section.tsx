'use client';

import { IconMail, IconMapPin, IconPhone } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Props = HTMLAttributes<HTMLElement>;

export default function ContactSection({ className, ...props }: Props) {
  const t = useTranslations('Info');
  const commonT = useTranslations('Common');
  const landingT = useTranslations('Landing');

  const items = [
    {
      icon: IconMail,
      label: landingT('email'),
      value: t('CONTACT_US.email'),
      href: `mailto:${t('CONTACT_US.email')}`,
    },
    {
      icon: IconPhone,
      label: commonT('Phone'),
      value: t('CONTACT_US.phone'),
      href: `tel:${t('CONTACT_US.phone').replace(/\s/g, '')}`,
    },
    {
      icon: IconMapPin,
      label: commonT('Address'),
      value: t('CONTACT_US.address'),
      href: 'https://maps.app.goo.gl/BTYgnEN2cwDnSfoN8',
    },
  ];

  return (
    <section className={cn('p-4 md:p-8 lg:p-16', className)} {...props}>
      <h2 className="font-black text-6xl">{landingT('contactUs')}</h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map(({ icon: Icon, label, value, href }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            className="rounded-xl border p-6"
          >
            <Icon className="mb-4 size-8" />
            <h3 className="mb-2 font-bold text-xl">{label}</h3>
            {href ? (
              <a
                href={href}
                className="wrap-break-word hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {value}
              </a>
            ) : (
              <p>{value}</p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
