"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  Flame,
  AlertTriangle,
  Users,
  Heart,
  Building,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";

export default function Home() {
  const router = useRouter();
  const [showHistory, setShowHistory] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const handleShowHistory = () => {
    setIsFading(true);
    setTimeout(() => {
      setShowHistory(!showHistory);
      setIsFading(false);
    }, 300);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section (centered variant with red gradient overlay) */}
      <section className="relative h-[90vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Bomberos en acción"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-6 text-card">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              Protegiendo Nuestra Comunidad Con Valentía
            </h1>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-destructive/90">
              «Colegas y amigos, bienvenidos a la página Oficial de
              «Código 10-32». En nuestra web, encontrarán información relacionada
              con el día a día de los miembros de la Compañía.»
            </p>
            <div className="mt-4">
              <button
                onClick={() => router.push("/tour")}
                aria-label="Entrar al recorrido virtual"
                className="dark mt-4 bg-muted text-card px-4 py-2 rounded-md font-medium"
              >
                Entrar al recorrido
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Nosotros section (inserted at start) */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <h2
                  className={cn(
                    "text-3xl md:text-4xl font-bold tracking-tight transition-opacity duration-300 ease-in-out",
                    isFading && "text-muted text-lg opacity-0"
                  )}
                >
                  {showHistory ? "Nuestra Historia" : "Sobre Nosotros"}
                </h2>
                <p
                  className={cn(
                    "text-muted text-lg transition-opacity duration-300 ease-in-out",
                    isFading && "opacity-0"
                  )}
                >
                  {showHistory
                    ? "Historia y legado de la Compañía"
                    : "Más de 150 años de servicio y compromiso con nuestra comunidad."}
                </p>
              </div>
              <div
                className={cn(
                  "transition-opacity duration-300 ease-in-out",
                  isFading && "opacity-0"
                )}
              >
                {showHistory ? (
                  <>
                    <p className="text-muted">
                      La compañía fue fundada el 28 de octubre de 1868 en la
                      provincia constitucional del Callao, con el nombre de
                      “Bellavista”, por miembros destacados de la colonia
                      italiana en el Perú: Giovanni Bollo, Tomaso Rada vero,
                      Francesco Ametis, Andrea Dall’Orso, Michiele Canessa,
                      Modesto Barabino, Faustino Piaggio, Eliggio Dodero, entre
                      otros.
                    </p>
                    <p className="text-muted">
                      Su primer equipo contra incendios fue donado por el
                      alcalde del Callao, “Señor Guegorio Real”: incluía
                      herramientas y una bomba manual que hoy es considerada una
                      reliquia. En noviembre de 1868 ya participaba en
                      emergencias, como el incendio en la calle Constitución,
                      junto a la Compañía Unión Chalaca N° 1.
                    </p>
                    <p className="text-muted">
                      Además de combatir incendios, los voluntarios cumplieron
                      funciones de orden público, guardia urbana, atención de
                      emergencias médicas y salvataje.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-muted">
                      Código 10-32 fue fundada en 1868 en el
                      Callao, Perú. Desde entonces, hemos servido
                      ininterrumpidamente, protegiendo vidas y propiedades con
                      valentía y dedicación.
                    </p>
                    <p className="text-muted">
                      Nuestra historia está forjada en el coraje de voluntarios
                      que, a lo largo de generaciones, han enfrentado incendios,
                      desastres y emergencias, convirtiéndose en un pilar de
                      seguridad y confianza para la comunidad.
                    </p>
                  </>
                )}
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => router.push("/team")}
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Conoce al Equipo
                </button>
                <button
                  onClick={handleShowHistory}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-3 rounded-md font-medium transition-colors"
                >
                  {showHistory ? "Sobre Nosotros" : "Nuestra Historia"}
                </button>
              </div>
            </div>
            <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Equipo de bomberos"
                layout="fill"
                objectFit="cover"
                className="brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white text-2xl font-bold">
                  Unidos por la Vocación de Servir
                </h3>
                <p className="text-white/90 mt-2">
                  Comprometidos con la seguridad y el bienestar de nuestra
                  gente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-secondary">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-card">
              Nuestros Servicios
            </h2>
            <p className="mt-4 text-lg text-muted max-w-3xl mx-auto">
              Ofrecemos una amplia gama de servicios de emergencia y prevención
              para mantener segura a nuestra comunidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card: Prevención */}
            <div className="rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
              <div className="h-36 bg-destructive flex items-center justify-center rounded-t-lg">
                <ShieldCheck className="h-12 w-12 text-card" />
              </div>
              <div className="bg-card p-6 rounded-b-lg">
                <h3 className="text-xl font-bold text-card">Prevención</h3>
                <p className="mt-2 text-muted">
                  Inspecciones de seguridad, campañas educativas y asesoramiento
                  para reducir riesgos en hogares y empresas.
                </p>
                <button
                  onClick={() => router.push("/services?service=prevencion")}
                  className="mt-4 bg-muted text-card px-4 py-2 rounded-md font-medium"
                >
                  Más Información
                </button>
              </div>
            </div>

            {/* Card: Preparación */}
            <div className="rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
              <div className="h-36 bg-destructive flex items-center justify-center rounded-t-lg">
                <Flame className="h-12 w-12 text-card" />
              </div>
              <div className="bg-card p-6 rounded-b-lg">
                <h3 className="text-xl font-bold text-card">Preparación</h3>
                <p className="mt-2 text-muted">
                  Capacitaciones, simulacros y entrenamiento para que la
                  comunidad esté lista ante cualquier emergencia.
                </p>
                <button
                  onClick={() => router.push("/services?service=preparacion")}
                  className="mt-4 bg-muted text-card px-4 py-2 rounded-md font-medium"
                >
                  Más Información
                </button>
              </div>
            </div>

            {/* Card: Respuesta a Emergencias */}
            <div className="rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
              <div className="h-36 bg-destructive flex items-center justify-center rounded-t-lg">
                <AlertTriangle className="h-12 w-12 text-card" />
              </div>
              <div className="bg-card p-6 rounded-b-lg">
                <h3 className="text-xl font-bold text-card">
                  Respuesta a Emergencias
                </h3>
                <p className="mt-2 text-muted">
                  Respuesta rápida a incendios, rescates y emergencias médicas
                  con personal y equipamiento especializado.
                </p>
                <button
                  onClick={() => router.push("/services?service=respuesta")}
                  className="mt-4 bg-muted text-card px-4 py-2 rounded-md font-medium"
                >
                  Más Información
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voluntarios section: layout matches provided design */}
      {/* <section className="py-16 bg-card">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-card">
              Voluntarios
            </h2>
            <p className="mt-2 text-sm text-muted">
              Únete a nuestro equipo y marca la diferencia en tu comunidad.
            </p>
            <div className="mt-3 mx-auto h-1 w-16 bg-destructive rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <h3 className="text-2xl font-semibold text-card mb-6">
                Beneficios de ser Voluntario
              </h3>

              <ul className="space-y-6 text-muted">
                <li className="flex items-start">
                  <span className="flex-shrink-0 mt-1 mr-4">
                    <ShieldCheck className="h-5 w-5 text-surface" />
                  </span>
                  <div>
                    <p className="font-semibold text-card">
                      Capacitación Profesional
                    </p>
                    <p className="text-sm text-muted">
                      Recibirás formación especializada en extinción de
                      incendios, rescate y primeros auxilios.
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <span className="flex-shrink-0 mt-1 mr-4">
                    <Users className="h-5 w-5 text-surface" />
                  </span>
                  <div>
                    <p className="font-semibold text-card">
                      Sentido de Comunidad
                    </p>
                    <p className="text-sm text-muted">
                      Formarás parte de un equipo unido por valores como el
                      compañerismo y la solidaridad.
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <span className="flex-shrink-0 mt-1 mr-4">
                    <Heart className="h-5 w-5 text-surface" />
                  </span>
                  <div>
                    <p className="font-semibold text-card">
                      Desarrollo Personal
                    </p>
                    <p className="text-sm text-muted">
                      Desarrollarás habilidades de liderazgo, trabajo en equipo
                      y resolución bajo presión.
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <span className="flex-shrink-0 mt-1 mr-4">
                    <Flame className="h-5 w-5 text-surface" />
                  </span>
                  <div>
                    <p className="font-semibold text-card">Impacto Real</p>
                    <p className="text-sm text-muted">
                      Tendrás la oportunidad de salvar vidas y proteger a tu
                      comunidad de manera directa.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-8">
                <button
                  onClick={() => router.push("/volunteer")}
                  className="bg-destructive hover:bg-destructive-80 text-destructive px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Más Información
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div>
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Jefe de la Compañía"
                  width={400}
                  height={400}
                  className="w-full h-64 md:h-80 rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Contact Preview */}
      <section className="py-16 bg-secondary">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-card">
              Contáctanos
            </h2>
            <p className="mt-4 text-lg text-muted max-w-3xl mx-auto">
              ¿Tienes preguntas o necesitas información? Comunícate con nosotros
              a través de cualquiera de estos canales.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 bg-secondary rounded-lg text-center">
              <div className="h-12 w-12 rounded-full bg-surface-10 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-surface" />
              </div>
              <h3 className="text-xl font-bold text-card">Teléfono</h3>
              <p className="mt-2 text-muted">Emergencias: 911</p>
              <p className="text-muted">No emergencias: (555) 123-4567</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-secondary rounded-lg text-center">
              <div className="h-12 w-12 rounded-full bg-surface-10 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-surface" />
              </div>
              <h3 className="text-xl font-bold text-card">Email</h3>
              <p className="mt-2 text-muted">info@bomberositalia5.org</p>
              <p className="text-muted">voluntarios@bomberositalia5.org</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-secondary rounded-lg text-center">
              <div className="h-12 w-12 rounded-full bg-surface-10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-surface" />
              </div>
              <h3 className="text-xl font-bold text-card">Ubicación</h3>
              <p className="mt-2 text-muted">Calle Principal 123</p>
              <p className="text-muted">Ciudad Ejemplo, 12345</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => router.push("/contact")}
              className="bg-destructive hover:bg-destructive-80 text-destructive px-6 py-3 rounded-md font-medium transition-colors"
            >
              Contáctanos
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
