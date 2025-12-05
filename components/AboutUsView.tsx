"use client";

import { useRouter } from "next/navigation";
import { Target, History, Users } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function AboutUsView() {
  const router = useRouter();

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.jpg"
            alt="Our Team"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute" />
        </div>
        <div className="relative z-10 px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary-foreground">
            Sobre Nosotros
          </h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Conoce nuestra historia, misión y los valores que nos unen como
            equipo.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Our Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <Target className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold">Nuestra Misión</h2>
            </div>
            <p className="text-muted-foreground text-lg">
              Proteger vidas y bienes a través de la prevención de incendios,
              respuesta a emergencias y educación comunitaria. Estamos
              comprometidos con la seguridad y el bienestar de cada persona en
              nuestra jurisdicción.
            </p>
          </div>

          {/* Our History */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <History className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold">Nuestra Historia</h2>
            </div>
            <p className="text-muted-foreground text-lg">
              Fundada en 1868, nuestra compañía de bomberos ha servido con
              orgullo a la comunidad durante más de 150 años. Desde nuestros
              humildes comienzos, hemos crecido y evolucionado, adaptándonos a
              los nuevos desafíos y mejorando continuamente nuestros servicios
              para garantizar la máxima protección.
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
    </>
  );
}
