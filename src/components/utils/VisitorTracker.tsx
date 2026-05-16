'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const logVisit = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        await fetch(`${apiUrl}/admin/log-visit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: pathname,
            referrer: document.referrer || 'Direct',
          }),
        });
      } catch (err) {
        // Fail silently to not disturb user experience
      }
    };

    logVisit();
  }, [pathname]);

  return null;
}
