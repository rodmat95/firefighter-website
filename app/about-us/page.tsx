"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Target, History, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransition } from "@/context/TransitionContext";
import { ImageWithLoader } from "@/components/ui/image-with-loader";
import { getAssetUrl } from "@/lib/assets";

export default function AboutUsPage() {
  const router = useRouter();
  const { setAnimations } = useTransition();

  const handleClose = () => {
    setAnimations("none", "down");
    router.push("/");
  };

  return (
    <div className="dark bg-background text-foreground min-h-screen">
      {/* Floating Back Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed mt-6 left-6 z-50 text-white bg-black/40 hover:bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithLoader
            src={getAssetUrl("/assets/images/about/hero-about.png")}
            alt="Fondo Sobre Nosotros"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background"></div>
        </div>
        <div className="relative z-10 px-4 md:px-6 max-w-4xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium mb-2">
            <Users className="w-4 h-4" />
            <span>Nuestra Identidad</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-xl">
            Utama Producciones
          </h1>
          <p className="text-lg md:text-xl text-zinc-200 max-w-2xl mx-auto font-medium">
            &quot;Nuestro Hogar&quot; - Donde nacen las historias.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-16 -mt-20 relative z-20">
        <div className="grid gap-8">
            {/* Intro Card */}
            <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-xl">
                 <h2 className="text-3xl font-bold mb-6 text-white border-b border-white/10 pb-4">¿Qué es Utama?</h2>
                 <div className="space-y-4 text-zinc-300 leading-relaxed text-lg">
                    <p>
                        El nombre de Utama proviene del aimara y significa “Nuestro Hogar”. Representa el espacio compartido donde nacen ideas, se construyen historias y se expresan emociones a través del lenguaje audiovisual.
                    </p>
                    <p>
                        Utama es una productora creada por estudiantes del Instituto Toulouse Lautrec, apasionados por narrar historias que inspiren y generen impacto. Su objetivo es desarrollar contenido original que trascienda la imagen, conecte emocionalmente y permanezca en la memoria del público.
                    </p>
                 </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Mission */}
                <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl hover:border-red-500/30 transition-colors group">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-red-500/10 text-red-500 p-3 rounded-full group-hover:bg-red-500/20 transition-colors">
                            <Target className="h-8 w-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Misión</h2>
                    </div>
                    <p className="text-zinc-300 text-lg leading-relaxed">
                        Crear proyectos audiovisuales de alto valor basados en creatividad, innovación y responsabilidad social. Desarrollamos contenido transmedia que genere experiencias únicas y vínculos auténticos con la audiencia.
                    </p>
                </div>

                {/* Vision */}
                <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl hover:border-red-500/30 transition-colors group">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-red-500/10 text-red-500 p-3 rounded-full group-hover:bg-red-500/20 transition-colors">
                            <History className="h-8 w-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Visión</h2>
                    </div>
                    <p className="text-zinc-300 text-lg leading-relaxed">
                        Convertirnos en una productora referente en Comunicación Audiovisual, destacando por contenido transmedia de alto impacto narrativo, cultural y social.
                    </p>
                </div>
            </div>
        </div>
      </main>

      {/* Team CTA Section */}
      <section className="py-16 bg-zinc-950 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
             <Users className="h-8 w-8 text-red-500" />
             <h2 className="text-3xl font-bold text-white">Nuestro Equipo</h2>
          </div>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto mb-8">
            Somos un equipo de estudiantes y profesionales apasionados, unidos por el compromiso de narrar historias con impacto y valor social.
          </p>
          <Button 
            size="lg" 
            onClick={() => router.push("/members")}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-8 rounded-xl shadow-lg hover:shadow-red-900/20"
          >
            Conoce a los miembros
          </Button>
        </div>
      </section>
    </div>
  );
}
