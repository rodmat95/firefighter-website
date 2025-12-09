"use client";

import { useState } from "react";
import Link, { LinkProps } from "next/link";
import { ImageWithLoader } from "@/components/ui/image-with-loader";
import { getAssetUrl } from "@/lib/assets";
import { X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

// Define a type for the LinkComponent prop
type LinkComponentProps = React.FC<
  LinkProps & { className?: string; children: React.ReactNode; id?: string }
>;

interface NavbarProps {
  LinkComponent: LinkComponentProps;
}

export default function Navbar({ LinkComponent }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      id="main-header"
      className="sticky top-0 left-0 w-full bg-destructive shadow-md z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <ImageWithLoader
              src={getAssetUrl("/logo.svg")}
              alt="Código 10-32"
              width={32}
              height={32}
              className="mr-2"
              showSpinner={false} 
            />
            <LinkComponent
              id="nav-brand-link"
              href="/"
              className="text-xl font-bold"
            >
              Código 10-32
            </LinkComponent>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-btn"
            className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors text-white z-50 relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <div className="relative w-6 h-5 flex flex-col justify-between items-center overflow-hidden">
                <span className={cn(
                    "w-full h-0.5 bg-black rounded-full transform transition-all duration-300 ease-in-out origin-center",
                    menuOpen ? "rotate-45 translate-y-2" : "translate-y-0"
                )} />
                <span className={cn(
                    "w-full h-0.5 bg-black rounded-full transform transition-all duration-300 ease-in-out",
                    menuOpen ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
                )} />
                <span className={cn(
                    "w-full h-0.5 bg-black rounded-full transform transition-all duration-300 ease-in-out origin-center",
                    menuOpen ? "-rotate-45 -translate-y-2.5" : "translate-y-0"
                )} />
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <LinkComponent
                  id="nav-link-about"
                  href="/about-us"
                  className="px-3 py-2 rounded hover:bg-surface-10"
                >
                  Nosotros
                </LinkComponent>
              </li>
              {/* <li>
                <LinkComponent
                  id="nav-link-services"
                  href="/services"
                  className="px-3 py-2 rounded hover:bg-surface-10"
                >
                  Servicios
                </LinkComponent>
              </li> */}
              <li>
                <LinkComponent
                  id="nav-link-facilities"
                  href="/facilities"
                  className="px-3 py-2 rounded hover:bg-surface-10"
                >
                  Instalaciones
                </LinkComponent>
              </li>
              <li>
                <LinkComponent
                  id="nav-link-members"
                  href="/members"
                  className="px-3 py-2 rounded hover:bg-surface-10"
                >
                  Integrantes
                </LinkComponent>
              </li>
              {/* <li>
                <LinkComponent
                  href="/volunteer"
                  className="px-3 py-2 rounded hover:bg-surface-10"
                >
                  Voluntarios
                </LinkComponent>
              </li> */}
              <li>
                <LinkComponent
                  id="nav-link-contact"
                  href="/contact"
                  className="px-3 py-2 rounded hover:bg-surface-10"
                >
                  Contacto
                </LinkComponent>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-destructive border-t border-destructive overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-2">
              <ul className="space-y-1">
                <li>
                  <LinkComponent
                    id="mobile-nav-link-about"
                    href="/about-us"
                    className="block w-full text-left px-3 py-2 rounded hover:bg-surface-10"
                  >
                    Nosotros
                  </LinkComponent>
                </li>
                {/* <li>
                  <LinkComponent
                    id="mobile-nav-link-services"
                    href="/services"
                    className="block w-full text-left px-3 py-2 rounded hover:bg-surface-10"
                  >
                    Servicios
                  </LinkComponent>
                </li> */}
                <li>
                  <LinkComponent
                    id="mobile-nav-link-facilities"
                    href="/facilities"
                    className="block w-full text-left px-3 py-2 rounded hover:bg-surface-10"
                  >
                    Instalaciones
                  </LinkComponent>
                </li>
                <li>
                  <LinkComponent
                    id="mobile-nav-link-members"
                    href="/members"
                    className="block w-full text-left px-3 py-2 rounded hover:bg-surface-10"
                  >
                    Integrantes
                  </LinkComponent>
                </li>
                {/* <li>
                  <LinkComponent
                    href="/volunteer"
                    className="block w-full text-left px-3 py-2 rounded hover:bg-surface-10"
                  >
                    Voluntarios
                  </LinkComponent>
                </li> */}
                <li>
                  <LinkComponent
                    id="mobile-nav-link-contact"
                    href="/contact"
                    className="block w-full text-left px-3 py-2 rounded hover:bg-surface-10"
                  >
                    Contacto
                  </LinkComponent>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
