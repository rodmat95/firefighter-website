"use client";


import { useTransition } from "@/context/TransitionContext";
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
import { ImageWithLoader } from "@/components/ui/image-with-loader";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";

export default function Home() {
  const router = useRouter();
  const { setAnimations } = useTransition();
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
        className="relative h-[100dvh] flex items-center justify-center text-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <ImageWithLoader
            src={getAssetUrl("/placeholder.svg?height=1080&width=1920")}
            alt="Producción en acción"
            fill
            className="object-cover brightness-50"
            priority
            sizes="100vw"
          />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 text-card animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1
              id="hero-title"
              className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight drop-shadow-lg"
            >
              UTAMA PRODUCCIONES
            </h1>
            <p
              id="hero-subtitle"
              className="text-lg sm:text-2xl md:text-3xl font-bold text-destructive/90 drop-shadow-md"
            >
              CÓDIGO 10-32
            </p>
            <p
              id="hero-description"
              className="max-w-xl md:max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-card/90 font-medium drop-shadow-sm"
            >
              "Nuestro hogar, donde nacen las historias."
            </p>
            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-destructive/90 italic drop-shadow-sm hidden sm:block">
              Un documental sobre la Benemérita y Sesquicentenaria Compañía Italiana de Bomberos Italia N° 5.
            </p>
            <div className="pt-4 md:pt-6">
              <button
                id="hero-cta-tour"
                onClick={() => router.push("/tour")}
                aria-label="Entrar al recorrido virtual"
                className="bg-destructive hover:bg-destructive/90 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                <MapPin className="w-5 h-5" />
                Entrar al recorrido
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nosotros (Utama Producciones) */}
      <section id="about-section" className="py-12 md:py-24 bg-card">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 order-2 md:order-1">
              <div className="space-y-3">
                <h2
                  id="about-title"
                  className="text-2xl md:text-4xl font-bold tracking-tight text-foreground"
                >
                  Sobre Nosotros
                </h2>
                <p className="text-muted-foreground text-lg font-medium">
                  Utama: "Nuestro Hogar"
                </p>
              </div>
              <div id="about-content" className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  El nombre de Utama proviene del aimara y significa “Nuestro Hogar”. Representa el espacio compartido donde nacen ideas, se construyen historias y se expresan emociones a través del lenguaje audiovisual.
                </p>
                <p>
                  Utama es una productora creada por estudiantes del Instituto Toulouse Lautrec, apasionados por narrar historias que inspiren y generen impacto. Su objetivo es desarrollar contenido original que trascienda la imagen, conecte emocionalmente y permanezca en la memoria del público.
                </p>
                <p className="hidden md:block">
                  En Utama creemos que lo audiovisual es un lenguaje capaz de conectar profundamente y transmitir verdades. Trabajamos temas sociales y humanos, guiados por la pasión, la empatía y la responsabilidad.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  id="about-cta-team"
                  onClick={() => {
                    setAnimations("up", "none");
                    router.push("/members");
                  }}
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-6 py-3 rounded-md font-medium transition-colors text-center shadow-md"
                >
                  Conoce al Equipo
                </button>
                <button
                  id="about-cta-more"
                  onClick={() => router.push("/about-us")}
                  className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-6 py-3 rounded-md font-medium transition-colors text-center border border-input shadow-sm"
                >
                  Más sobre Utama
                </button>
              </div>
            </div>
            <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl order-1 md:order-2 ring-1 ring-border/10">
              <ImageWithLoader
                src={getAssetUrl("/placeholder.svg?height=800&width=800")}
                alt="Equipo Utama"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white text-xl md:text-2xl font-bold drop-shadow-md">
                  Narrando Historias que Impactan
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Protagonistas: Italia N° 5 (History) */}
      <section id="protagonists-section" className="py-12 md:py-24 bg-zinc-950 border-y border-white/5 relative overflow-hidden text-zinc-100">
         {/* Background pattern or subtle gradient to make it distinct */}
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-destructive/20 via-zinc-950 to-zinc-950 opacity-40 z-0"></div>
         
         <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
             <div className="w-full md:w-1/3 space-y-6">
                <div>
                  <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-2">
                    Nuestros Protagonistas
                  </h2>
                  <h3 className="text-lg md:text-xl font-medium text-zinc-400">
                    Benemérita Compañía de Bomberos Italia N° 5
                  </h3>
                </div>
                
                <div className="relative h-64 md:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl mt-6 ring-1 ring-white/10 group">
                  <ImageWithLoader
                    src={getAssetUrl("/placeholder.svg?height=800&width=600")}
                    alt="Foto grupal Bomberos Italia 5"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white text-sm font-medium">
                    Foto Grupal Compañía Italia 5
                  </div>
                </div>
                <div className="pt-2">
                    <button
                        onClick={() => {
                          setAnimations("up", "none");
                          router.push("/team");
                        }}
                        className="w-full bg-red-700 hover:bg-red-600 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-red-900/20 flex items-center justify-center gap-2"
                    >
                        <Users className="h-5 w-5" />
                        Ver Integrantes
                    </button>
                </div>
             </div>
             <div className="w-full md:w-2/3 space-y-6 text-zinc-300 leading-relaxed md:pt-2">
                <div className="prose prose-invert max-w-none text-zinc-300">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
                    <History className="h-5 w-5 text-red-500" />
                    Historia y Legado
                  </h4>
                  <p className="mb-4 text-base md:text-lg">
                    La historia de la Compañía Italiana de Bomberos Bellavista (hoy Italia N° 5) comienza en 1866, en plena tensión previa al ataque de la escuadra española al Callao. Ante el riesgo de incendios, un grupo de ciudadanos italianos —Giovanni Bollo, Tomasso Radavero, Faustino Piaggio, Andrea Dall’Orso, Michele Canessa, Eligio Dodero, Modesto Barabino, Francesco Ametis y Alejandro Gabrielli— se organizó para formar una compañía de bomberos voluntarios. Su valor durante el Combate del 2 de Mayo les dio reconocimiento popular, aunque la compañía se desactivó tras el conflicto.
                  </p>
                  <p className="mb-4 text-base md:text-lg">
                    En 1868, los mismos fundadores se reunieron nuevamente y reorganizaron la institución. El 18 de octubre recibieron una bomba a brazo y equipo básico, y el 28 de octubre se oficializó la fundación con autoridades peruanas e italianas. La primera Junta Directiva fue liderada por Giovanni Bollo como Capitán. Desde entonces, su misión fue clara: proteger vidas, atender incendios y servir a la comunidad con vocación y disciplina.
                  </p>
                  <p className="text-base md:text-lg">
                    La compañía creció a través del tiempo, convirtiéndose en un símbolo de unión entre la colonia italiana y el pueblo chalaco. Evolucionó, permaneció y se consolidó como Italia N° 5, institución que continúa activa hasta hoy gracias al compromiso voluntario de generaciones que honran un legado nacido en 1866 y reafirmado en 1868.
                  </p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Contact Preview */}
      <section id="contact-preview-section" className="py-12 md:py-20 bg-secondary/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
              Contáctanos
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              ¿Tienes preguntas o necesitas información? Comunícate con nosotros.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
            <div
              id="contact-card-phone"
              className="flex flex-col items-center p-6 bg-background rounded-xl shadow-sm text-center border border-border"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold">Teléfono</h3>
              <p className="mt-2 text-sm text-muted-foreground">Emergencias: 116</p>
              <p className="text-sm text-muted-foreground">Central: (01) 429-0318</p>
            </div>

            <div
              id="contact-card-email"
              className="flex flex-col items-center p-6 bg-background rounded-xl shadow-sm text-center border border-border"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold">Email</h3>
              <p className="mt-2 text-sm text-muted-foreground break-all">utamaitalia5@gmail.com</p>
            </div>

            <div
              id="contact-card-location"
              className="flex flex-col items-center p-6 bg-background rounded-xl shadow-sm text-center border border-border"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold">Ubicación</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Av. Alejandro Granda s/n
              </p>
              <p className="text-sm text-muted-foreground">
                Bellavista, Callao
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              id="contact-cta-page"
              onClick={() => router.push("/contact")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-medium transition-colors shadow-lg"
            >
              Ir a la página de Contacto
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
