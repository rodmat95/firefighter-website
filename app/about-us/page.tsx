"use client";

import { useRouter } from "next/navigation";
import { X, Target, History, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransition } from "@/context/TransitionContext";
import Image from "next/image";
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
      <Button
        variant="ghost"
        size="icon"
        className="absolute mt-6 right-6 z-20 text-primary-foreground bg-primary/20 hover:bg-primary/50"
        onClick={handleClose}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={getAssetUrl("/placeholder.svg")}
            alt="Utama Team"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute" />
        </div>
        <div className="relative z-10 px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary-foreground">
            Utama Producciones
          </h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            "Nuestro Hogar" - Donde nacen las historias.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-16">
        {/* Intro / Meaning */}
        <div className="mb-16 text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">¿Qué es Utama?</h2>
          <p className="text-muted-foreground text-lg">
            El nombre de Utama proviene del aimara y significa “Nuestro Hogar”. Representa el espacio compartido donde nacen ideas, se construyen historias y se expresan emociones a través del lenguaje audiovisual.
          </p>
          <p className="text-muted-foreground text-lg">
            Utama es una productora creada por estudiantes del Instituto Toulouse Lautrec, apasionados por narrar historias que inspiren y generen impacto. Su objetivo es desarrollar contenido original que trascienda la imagen, conecte emocionalmente y permanezca en la memoria del público.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <Target className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold">Misión</h2>
            </div>
            <p className="text-muted-foreground text-lg">
              Crear proyectos audiovisuales de alto valor basados en creatividad, innovación y responsabilidad social. Desarrollamos contenido transmedia que genere experiencias únicas y vínculos auténticos con la audiencia.
            </p>
          </div>

          {/* Vision */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <History className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold">Visión</h2>
            </div>
            <p className="text-muted-foreground text-lg">
              Convertirnos en una productora referente en Comunicación Audiovisual, destacando por contenido transmedia de alto impacto narrativo, cultural y social.
            </p>
          </div>
        </div>
      </main>

      {/* Team Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="bg-primary/10 text-primary p-3 rounded-full">
              <Users className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold">Nuestro Equipo</h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Somos un equipo de profesionales dedicados y voluntarios
            apasionados, unidos por el compromiso de servir y proteger a nuestra
            comunidad.
          </p>
          <div className="mt-8">
            <Button size="lg" onClick={() => router.push("/team")}>
              Conoce a los miembros
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
