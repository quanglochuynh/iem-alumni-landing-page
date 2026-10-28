'use client';

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { AuroraBackground } from '@/components/ui/aurora-background';

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 60000 * 5,
      gcTime: 60000 * 10,
    },
  },
});

export default function ApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuroraBackground>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuroraBackground>
  );
}
