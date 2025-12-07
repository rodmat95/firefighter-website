import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Flame } from "lucide-react";

export default function Footer() {
  return (
    <footer className="dark bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-start space-x-3">
              <Flame className="h-6 w-6 text-destructive mt-1" />
              <div>
                <div className="text-lg font-bold">
                  Código 10-32
                </div>
              </div>
            </Link>
            <p className="mt-2 text-sm text-muted max-w-sm">
              Somos Código 10-32, comprometidos con la seguridad y el
              bienestar de la comunidad. Estamos disponibles 24/7 para
              responder a cualquier emergencia.
            </p>

            <div className="flex space-x-3 mt-4">
              <Link
                href="https://www.facebook.com/CPI.Italia5"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-surface-10 flex items-center justify-center text-muted"
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-surface-10 flex items-center justify-center text-muted"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://www.instagram.com/bomberositalia5"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-surface-10 flex items-center justify-center text-muted"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-surface-10 flex items-center justify-center text-muted"
              >
                <Youtube className="h-4 w-4" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-muted">
              <li>
                <Link href="/" className="hover:text-card transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="hover:text-card transition-colors"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-card transition-colors"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="/facilities"
                  className="hover:text-card transition-colors"
                >
                  Instalaciones
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/volunteer"
                  className="hover:text-card transition-colors"
                >
                  Voluntarios
                </Link>
              </li> */}
              <li>
                <Link
                  href="/contact"
                  className="hover:text-card transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold mb-4">Servicios</h3>
            <ul className="space-y-2 text-muted">
              <li>Prevención de Incendios</li>
              <li>Capacitación</li>
              <li>Respuesta a Emergencias</li>
              <li>Rescate</li>
              <li>Primeros Auxilios</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold mb-4">Contacto</h3>
            <ul className="space-y-3 text-muted text-sm">
              <li>
                Av. Alejandro Granda, 3ra cuadra, Urb. Stella Maris, Bellavista,
                Callao
              </li>
              <li>(01) 429-0318</li>
              <li>(01) 420-9163</li>
              <li>pompaitalia@hotmail.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <div className="h-px bg-[hsl(var(--border))] opacity-60"></div>
        </div>

        {/* Copyright row */}
        <div className="mt-6 flex items-center justify-between text-muted text-sm">
          <div>
            © {new Date().getFullYear()} Código 10-32. Todos los derechos reservados.
          </div>
          <div className="hidden md:flex space-x-4">
            <Link href="#" className="hover:text-card transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="#" className="hover:text-card transition-colors">
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
