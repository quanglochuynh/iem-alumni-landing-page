'use client';

import { useLogout } from '@/components/providers/auth-provider/logout.hook';
import { Button } from '@/components/ui/button';

export default function Page() {
  const { logout } = useLogout();
  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
