'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ThemeManager() {
  const pathname = usePathname();

  const isDarkModePage = [
    '/about-us',
    '/contact',
    '/facilities',
    '/services',
    '/team',
  ].includes(pathname);

  useEffect(() => {
    if (isDarkModePage) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkModePage]);

  return null;
}
