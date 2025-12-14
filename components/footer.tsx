import Link from "next/link";
import { ImageWithLoader } from "@/components/ui/image-with-loader";
import { getAssetUrl } from "@/lib/assets";
import { Facebook, Instagram, Youtube, Phone, MessageCircle, Mail } from "lucide-react";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
  return (
    <footer
      id="main-footer"
      className="dark bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]"
    >
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link
              id="footer-brand-link"
              href="/"
              className="flex items-center space-x-3"
            >
              <ImageWithLoader
                src={getAssetUrl("/logo.svg")}
                alt="Logo"
                width={40}
                height={40}
                className="brightness-0 invert"
                showSpinner={false}
              />
              <div>
                <div className="text-lg font-bold">Código 10.32</div>
              </div>
            </Link>
            <p
              id="footer-description"
              className="mt-2 text-sm text-muted max-w-sm"
            >
              Somos Código 10.32, comprometidos con la seguridad y el bienestar
              de la comunidad. Estamos disponibles 24/7 para responder a
              cualquier emergencia.
            </p>

            <div id="footer-social-links" className="flex space-x-3 mt-4">
              <Link
                id="footer-social-tiktok"
                href="https://www.tiktok.com/@codigo10.32"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-surface-10 flex items-center justify-center text-muted"
              >
                <SiTiktok className="h-4 w-4" />
                <span className="sr-only">TikTok</span>
              </Link>
              <Link
                id="footer-social-instagram"
                href="https://www.instagram.com/codigo10.32"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-surface-10 flex items-center justify-center text-muted"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div id="footer-quick-links">
            <h3 className="text-sm font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-muted">
              <li>
                <Link
                  id="footer-link-home"
                  href="/"
                  className="hover:text-card transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  id="footer-link-about"
                  href="/about-us"
                  className="hover:text-card transition-colors"
                >
                  Nosotros
                </Link>
              </li>
              {/* <li>
                <Link
                  id="footer-link-services"
                  href="/services"
                  className="hover:text-card transition-colors"
                >
                  Servicios
                </Link>
              </li> */}
              <li>
                <Link
                  id="footer-link-protagonists"
                  href="/protagonists"
                  className="hover:text-card transition-colors"
                >
                  Protagonistas
                </Link>
              </li>
              <li>
                <Link
                  id="footer-link-members"
                  href="/members"
                  className="hover:text-card transition-colors"
                >
                  Integrantes
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
                  id="footer-link-contact"
                  href="/contact"
                  className="hover:text-card transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          {/* <div id="footer-services-list">
            <h3 className="text-sm font-bold mb-4">Servicios</h3>
            <ul className="space-y-2 text-muted">
              <li>Prevención de Incendios</li>
              <li>Capacitación</li>
              <li>Respuesta a Emergencias</li>
              <li>Rescate</li>
              <li>Primeros Auxilios</li>
            </ul>
          </div> */}

          {/* Contact */}
          <div id="footer-contact-info">
            <h3 className="text-sm font-bold mb-4">Contacto</h3>
            <ul className="space-y-3 text-muted text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                <span>+51 902 853 013</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-3 w-3" />
                <a href="https://wa.me/51902853013" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Chat WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                <a href="mailto:utamaproduccionesof@gmail.com" className="hover:text-white transition-colors">
                  utamaproduccionesof@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <div className="h-px bg-[hsl(var(--border))] opacity-60"></div>
        </div>

        {/* Copyright row */}
        <div
          id="footer-copyright"
          className="mt-6 flex items-center justify-between text-muted text-sm"
        >
          <div>
            © {new Date().getFullYear()} Código 10.32. Todos los derechos
            reservados.
          </div>
          <div className="hidden md:flex space-x-4">
            <Link
              id="footer-link-terms"
              href="#"
              className="hover:text-card transition-colors"
            >
              Términos y Condiciones
            </Link>
            <Link
              id="footer-link-privacy"
              href="#"
              className="hover:text-card transition-colors"
            >
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
