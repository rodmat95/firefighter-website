"use client";

import { useState } from "react";
import Link, { LinkProps } from "next/link";
import { X, Menu, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

// Define a type for the LinkComponent prop
type LinkComponentProps = React.FC<
  LinkProps & { className?: string; children: React.ReactNode }
>;

interface NavbarProps {
  LinkComponent: LinkComponentProps;
}

export default function Navbar({ LinkComponent }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 w-full bg-destructive shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Flame className="h-8 w-8 text-card mr-2" />
            <LinkComponent href="/" className="text-xl font-bold">
              Código 10-32
            </LinkComponent>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full bg-surface-10 hover:bg-surface-20 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <LinkComponent
                  href="/about-us"
                  className="px-3 py-2 rounded hover:bg-surface-10"
                >
                  Nosotros
                </LinkComponent>
              </li>
              <li>
                <LinkComponent
                  href="/services"
                  className="px-3 py-2 rounded hover:bg-surface-10"
                >
                  Servicios
                </LinkComponent>
              </li>
              <li>
                <LinkComponent
                  href="/facilities"
                  className="px-3 py-2 rounded hover:bg-surface-10"
                >
                  Instalaciones
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
      {menuOpen && (
        <div className="md:hidden bg-destructive border-t border-destructive animate-in slide-in-from-top">
          <nav className="container mx-auto px-4 py-2">
            <ul className="space-y-1">
              <li>
                <LinkComponent
                  href="/"
                  className="block w-full text-left px-3 py-2 rounded hover:bg-surface-10"
                >
                  Inicio
                </LinkComponent>
              </li>
              <li>
                <LinkComponent
                  href="/about-us"
                  className="block w-full text-left px-3 py-2 rounded hover:bg-surface-10"
                >
                  Nosotros
                </LinkComponent>
              </li>
              <li>
                <LinkComponent
                  href="/services"
                  className="block w-full text-left px-3 py-2 rounded hover:bg-surface-10"
                >
                  Servicios
                </LinkComponent>
              </li>
              <li>
                <LinkComponent
                  href="/facilities"
                  className="block w-full text-left px-3 py-2 rounded hover:bg-surface-10"
                >
                  Instalaciones
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
                  href="/contact"
                  className="block w-full text-left px-3 py-2 rounded hover:bg-surface-10"
                >
                  Contacto
                </LinkComponent>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
