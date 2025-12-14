"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransition } from "@/context/TransitionContext";
import { ImageWithLoader } from "@/components/ui/image-with-loader";
import { getAssetUrl } from "@/lib/assets";

// Custom Gradient for the image border (Dark Red -> Beige/Gold)
const BORDER_GRADIENT = "bg-gradient-to-br from-[#7f1d1d] via-[#b91c1c] to-[#fef3c7]";

const members = [
  {
    id: 1,
    name: "Rodrigo Chavez",
    role: "Dirección General",
    image: getAssetUrl("/members/Rodrigo-Chavez.webp"),
  },
  {
    id: 2,
    name: "Gabriel Guinea",
    role: "Asistente de Dirección",
    image: getAssetUrl("/members/Gabriel-Guinea.webp"),
  },
  {
    id: 3,
    name: "Angie Burgos",
    role: "Producción General",
    image: getAssetUrl("/members/Angie-Burgos.webp"),
  },
  {
    id: 4,
    name: "Romina Silva",
    role: "Asist. de Producción",
    image: getAssetUrl("/members/Romina-Silva.webp"),
  },
  {
    id: 5,
    name: "Fabian Palomino",
    role: "Asist. de Producción",
    image: getAssetUrl("/members/Fabian-Palomino.webp"),
  },
  {
    id: 6,
    name: "Julio Ramos",
    role: "Dirección de Fotografía",
    image: getAssetUrl("/members/Julio-Ramos.webp"),
  },
  {
    id: 7,
    name: "Cristhian Castillo",
    role: "Gaffer, Post Producción",
    image: getAssetUrl("/members/Cristhian-Castillo.webp"),
  },
  {
    id: 8,
    name: "David Aliaga",
    role: "Post Producción",
    image: getAssetUrl("/members/David-Aliaga.webp"),
  },
  {
    id: 9,
    name: "Ruth De La Cruz",
    role: "Dirección de Arte",
    image: getAssetUrl("/members/Ruth-De-La-Cruz.webp"),
  },
  {
    id: 10,
    name: "Mario Romanet",
    role: "Jefe de Producción",
    image: getAssetUrl("/members/Mario-Romanet.webp"),
  },
  {
    id: 11,
    name: "Deevid Siguas",
    role: "Asist. de Arte",
    image: getAssetUrl("/members/Deevid-Siguas.webp"),
  },
  {
    id: 12,
    name: "Antonio Alva",
    role: "Post Producción",
    image: getAssetUrl("/members/Antonio-Alva.webp"),
  },
  {
    id: 13,
    name: "Franco Calderon",
    role: "Operador de Cámara, Post Producción",
    image: getAssetUrl("/members/Franco-Calderon.webp"),
  },
  {
    id: 14,
    name: "Giancarlo Chahua",
    role: "Asist. de Arte",
    image: getAssetUrl("/members/Giancarlo-Chahua.webp"),
  },
  {
    id: 15,
    name: "Stephano Gonzales",
    role: "Productor de Arte",
    image: getAssetUrl("/members/Stephano-Gonzales.webp"),
  },
];

export default function MembersPage() {
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
          {/*
          <ImageWithLoader
            src={getAssetUrl("/placeholder.svg?height=1080&width=1920")}
            alt="Fondo Integrantes"
            fill
            className="object-cover brightness-50"
            priority
          />
          */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background"></div>
        </div>
        <div className="relative z-10 px-4 md:px-6 max-w-4xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium mb-2">
            <Users className="w-4 h-4" />
            <span>Talento Creativo</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-xl">
            Equipo de Producción
          </h1>
          <p className="text-lg md:text-xl text-zinc-200 max-w-2xl mx-auto font-medium">
            Conoce a los profesionales detrás de cada historia que contamos en Utama Producciones.
          </p>
        </div>
      </section>

      {/* Members Grid */}
      <main className="container mx-auto px-4 md:px-6 py-16 -mt-20 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {members.map((member) => (
              <div
                key={member.id}
                className="group bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:border-red-500/50 transition-all duration-300 hover:translate-y-[-5px]"
              >
                {/* Circular Image Container with Gradient Border */}
                <div className={`relative w-40 h-40 rounded-full p-[4px] ${BORDER_GRADIENT} shadow-xl mb-6 transition-transform duration-500 group-hover:scale-110`}>
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-black border-4 border-black/50">
                    {member.image ? (
                      <ImageWithLoader
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-zinc-800">
                        <User className="h-16 w-16 text-zinc-500" />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="space-y-2">
                  <h3 className="font-bold text-xl text-white tracking-tight leading-tight group-hover:text-red-500 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-zinc-400 font-medium text-sm leading-tight">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
