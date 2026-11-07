'use client';

import { HouseHeart, Ticket } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { type HTMLAttributes, useEffect } from 'react';
import Button from '@/components/common/overridden/button';
import { me } from '@/components/providers/auth-provider/auth.api';
import { authStore } from '@/components/providers/auth-provider/auth.store';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { AppRoute } from '@/interfaces';
import { cn } from '@/lib/utils';

type Props = HTMLAttributes<HTMLDivElement>;

export default function HeroSection({ className, ...props }: Props) {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, 200]);
  const backgroundParallaxY = useTransform(scrollY, [0, 600], [40, -40]);
  const user = authStore((s) => s.userSession);
  const t = useTranslations('Landing');
  const isLargerThanMd = window.matchMedia('(min-width: 768px)').matches;

  useEffect(() => {
    me()
      .then((response) => {
        authStore.getState().setUserSession(response.data);
      })
      .catch(() => {});
  }, []);

  return (
    <section
      {...props}
      className={cn('relative h-svh w-full md:flex lg:h-[80svh]', className)}
    >
      <div className="absolute inset-0 z-30 overflow-hidden">
        <motion.div
          style={{ y: backgroundParallaxY }}
          className="absolute inset-0"
        >
          <Image
            src={'/I_M1A0855.webp'}
            alt={t('heroImageAlt')}
            loading="eager"
            width={1920}
            height={1080}
            className="absolute top-0 left-0 h-full w-full scale-110 object-cover"
          />
        </motion.div>
      </div>
      <div className="absolute top-0 left-0 z-40 flex h-full w-full items-center justify-center bg-black/70 p-4">
        <motion.div
          style={{ y: isLargerThanMd ? parallaxY : 0 }}
          className="text-primary-foreground"
        >
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="mb-4 font-black font-heading text-4xl md:text-6xl lg:text-5xl xl:text-8xl"
            >
              {t('heroTitleLine1')} <br />
              {t('heroTitleLine2')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="mb-6 max-w-3xl text-lg md:text-3xl"
            >
              {t('heroSubtitle')}
            </motion.p>
          </div>
          {!user && (
            <Link href={AppRoute.LOGIN}>
              <Button size={'lg'} variant={'secondary'}>
                <Ticket />
                {t('joinUs')}
              </Button>
            </Link>
          )}
          {user && (
            <>
              <p className="text-lg md:text-2xl">
                {t('welcomeBack', { name: user.name })}
              </p>
              <Link href={AppRoute.HOME}>
                <RainbowButton
                  size={'lg'}
                  variant={'outline'}
                  className="mt-4 text-md"
                >
                  <HouseHeart />
                  {t('myProfile')}
                </RainbowButton>
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
