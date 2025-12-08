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
  History,
} from "lucide-react";
import { getAssetUrl } from "@/lib/assets";
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
    <main id="home-main" className="min-h-screen">
      {/* Hero Section (Utama / Código 10-32) */}
      <section
        id="hero-section"
        className="relative h-[90vh] flex items-center justify-center text-center"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={getAssetUrl("/placeholder.svg?height=1080&width=1920")}
            alt="Producción en acción"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-6 text-card">
            <h1
              id="hero-title"
              className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
            >
              UTAMA PRODUCCIONES
            </h1>
            <p
              id="hero-subtitle"
              className="text-xl md:text-2xl font-bold text-destructive/90"
            >
              CÓDIGO 10-32
            </p>
            <p
              id="hero-description"
              className="max-w-2xl mx-auto text-base md:text-lg text-card/90"
            >
              "Nuestro hogar, donde nacen las historias."
            </p>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-destructive/90 italic">
              Un documental sobre la Benemérita y Sesquicentenaria Compañía Italiana de Bomberos Italia N° 5.
            </p>
            <div className="mt-4">
              <button
                id="hero-cta-tour"
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

      {/* Sobre Nosotros (Utama Producciones) */}
      <section id="about-section" className="py-16 md:py-24 bg-card">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <h2
                  id="about-title"
                  className="text-3xl md:text-4xl font-bold tracking-tight"
                >
                  Sobre Nosotros
                </h2>
                <p className="text-muted text-lg">
                  Utama: "Nuestro Hogar"
                </p>
              </div>
              <div id="about-content" className="space-y-4 text-muted">
                <p>
                  El nombre de Utama proviene del aimara y significa “Nuestro Hogar”. Representa el espacio compartido donde nacen ideas, se construyen historias y se expresan emociones a través del lenguaje audiovisual.
                </p>
                <p>
                  Utama es una productora creada por estudiantes del Instituto Toulouse Lautrec, apasionados por narrar historias que inspiren y generen impacto. Su objetivo es desarrollar contenido original que trascienda la imagen, conecte emocionalmente y permanezca en la memoria del público.
                </p>
                <p>
                  En Utama creemos que lo audiovisual es un lenguaje capaz de conectar profundamente y transmitir verdades. Trabajamos temas sociales y humanos, guiados por la pasión, la empatía y la responsabilidad.
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  id="about-cta-team"
                  onClick={() => router.push("/team")}
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Conoce al Equipo
                </button>
                <button
                  id="about-cta-more"
                  onClick={() => router.push("/about-us")}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Más sobre Utama
                </button>
              </div>
            </div>
            <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={getAssetUrl("/placeholder.svg?height=400&width=400")}
                alt="Equipo Utama"
                layout="fill"
                objectFit="cover"
                className="brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white text-2xl font-bold">
                  Narrando Historias que Impactan
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Protagonistas: Italia N° 5 (History) */}
      <section id="protagonists-section" className="py-16 md:py-24 bg-zinc-900 border-y border-white/5 relative overflow-hidden">
         {/* Background pattern or subtle gradient to make it distinct */}
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-destructive/10 via-background to-background opacity-50 z-0"></div>
         
         <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-start">
             <div className="md:w-1/3 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                  Nuestros Protagonistas
                </h2>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-300">
                  Benemérita y Sesquicentenaria Compañía Italiana de Bomberos Italia N° 5
                </h3>
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl mt-6 ring-1 ring-white/10 group">
                  <Image
                    src={getAssetUrl("/placeholder.svg?height=600&width=400")}
                    alt="Foto grupal Bomberos Italia 5"
                    layout="fill"
                    objectFit="cover"
                    className="brightness-90 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white text-sm font-medium">
                    Foto Grupal Compañía Italia 5
                  </div>
                </div>
                <div className="pt-2">
                    <button
                        onClick={() => router.push("/members")}
                        className="w-full sm:w-auto bg-destructive hover:bg-destructive/90 text-destructive-foreground px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        <Users className="h-5 w-5" />
                        Ver Integrantes
                    </button>
                </div>
             </div>
             <div className="md:w-2/3 space-y-6 text-gray-300/90 leading-relaxed">
                <div className="prose prose-invert max-w-none text-gray-300">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <History className="h-5 w-5 text-destructive" />
                    Historia
                  </h4>
                  <p className="mb-4">
                    La historia de la Compañía Italiana de Bomberos Bellavista (hoy Italia N° 5) comienza en 1866, en plena tensión previa al ataque de la escuadra española al Callao. Ante el riesgo de incendios, un grupo de ciudadanos italianos —Giovanni Bollo, Tomasso Radavero, Faustino Piaggio, Andrea Dall’Orso, Michele Canessa, Eligio Dodero, Modesto Barabino, Francesco Ametis y Alejandro Gabrielli— se organizó para formar una compañía de bomberos voluntarios. Su valor durante el Combate del 2 de Mayo les dio reconocimiento popular, aunque la compañía se desactivó tras el conflicto.
                  </p>
                  <p className="mb-4">
                    En 1868, los mismos fundadores se reunieron nuevamente y reorganizaron la institución. El 18 de octubre recibieron una bomba a brazo y equipo básico, y el 28 de octubre se oficializó la fundación con autoridades peruanas e italianas. La primera Junta Directiva fue liderada por Giovanni Bollo como Capitán. Desde entonces, su misión fue clara: proteger vidas, atender incendios y servir a la comunidad con vocación y disciplina.
                  </p>
                  <p>
                    La compañía creció a través del tiempo, convirtiéndose en un símbolo de unión entre la colonia italiana y el pueblo chalaco. Evolucionó, permaneció y se consolidó como Italia N° 5, institución que continúa activa hasta hoy gracias al compromiso voluntario de generaciones que honran un legado nacido en 1866 y reafirmado en 1868.
                  </p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Members Preview Section */}
      {/*
      <section id="members-preview-section" className="py-16 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">
              Nuestros Integrantes
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Conoce a quienes hacen posible nuestra misión de servicio.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                <div className="aspect-[3/4] relative bg-muted">
                  <Image
                    src="/placeholder-user.jpg"
                    alt={`Integrante ${i}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                  <h3 className="font-bold text-lg">Nombre Apellido</h3>
                  <p className="text-sm opacity-90">Cargo</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              id="members-cta-view-all"
              onClick={() => router.push("/members")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-md font-medium transition-colors"
            >
              Ver Todos los Integrantes
            </button>
          </div>
        </div>
      </section>
      */}

      {/* Services Preview */}
      {/* Services Preview - Hidden temporarily
      <section id="services-preview-section" className="py-16 bg-secondary">
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
            <div id="service-card-prevention" className="rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
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
                  id="service-cta-prevention"
                  onClick={() => router.push("/services?service=prevencion")}
                  className="mt-4 bg-muted text-card px-4 py-2 rounded-md font-medium"
                >
                  Más Información
                </button>
              </div>
            </div>

            <div id="service-card-preparation" className="rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
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
                  id="service-cta-preparation"
                  onClick={() => router.push("/services?service=preparacion")}
                  className="mt-4 bg-muted text-card px-4 py-2 rounded-md font-medium"
                >
                  Más Información
                </button>
              </div>
            </div>

            <div id="service-card-response" className="rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
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
                  id="service-cta-response"
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
      */}

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
                  src={getAssetUrl("/placeholder.svg?height=400&width=400")}
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
      <section id="contact-preview-section" className="py-16 bg-secondary">
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
            <div
              id="contact-card-phone"
              className="flex flex-col items-center p-6 bg-secondary rounded-lg text-center"
            >
              <div className="h-12 w-12 rounded-full bg-surface-10 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-surface" />
              </div>
              <h3 className="text-xl font-bold text-card">Teléfono</h3>
              <p className="mt-2 text-muted">Emergencias: 116</p>
              <p className="text-muted">Central: (01) 429-0318</p>
            </div>

            <div
              id="contact-card-email"
              className="flex flex-col items-center p-6 bg-secondary rounded-lg text-center"
            >
              <div className="h-12 w-12 rounded-full bg-surface-10 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-surface" />
              </div>
              <h3 className="text-xl font-bold text-card">Email</h3>
              <p className="mt-2 text-muted">utamaitalia5@gmail.com</p>
            </div>

            <div
              id="contact-card-location"
              className="flex flex-col items-center p-6 bg-secondary rounded-lg text-center"
            >
              <div className="h-12 w-12 rounded-full bg-surface-10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-surface" />
              </div>
              <h3 className="text-xl font-bold text-card">Ubicación</h3>
              <p className="mt-2 text-muted">
                Av. Alejandro Granda s/n, Mz. E, Lt. 3
              </p>
              <p className="text-muted">
                Urb. Stella Maris, Bellavista, Callao
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              id="contact-cta-page"
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
