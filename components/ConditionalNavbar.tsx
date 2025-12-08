'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar';
import Link, { LinkProps } from "next/link";
import { useTransition } from "@/context/TransitionContext";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const { setAnimations } = useTransition();

  const showNavbar = pathname !== '/tour';

  const navPages = [
    "/about-us",
    "/services",
    "/facilities",
    "/volunteer",
    "/contact",
    "/members",
  ];

  const handleLinkClick = (href: string) => {
    if (href === '/' || href === '/facilities/recorrido') {
      setAnimations('none', 'down');
    } else if (pathname === '/' && navPages.includes(href)) {
      setAnimations('up', 'none');
    } else if (navPages.includes(pathname) && href === '/') {
      setAnimations('none', 'down');
    } else if (navPages.includes(pathname) && navPages.includes(href)) {
      setAnimations('up', 'down');
    } else {
      setAnimations('none', 'none');
    }
  };

  const NavLink = ({ href, className, children }: LinkProps & { className?: string, children: React.ReactNode }) => (
    <Link href={href} className={className} onClick={() => handleLinkClick(href.toString())}>
      {children}
    </Link>
  );

  return showNavbar ? <Navbar LinkComponent={NavLink} /> : null;
}