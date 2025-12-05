
'use client';

import { usePathname } from 'next/navigation';
import Footer from './footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  const showFooter = pathname !== '/tour';

  return showFooter ? <Footer /> : null;
}
