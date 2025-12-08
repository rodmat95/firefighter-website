"use client";

import { useRouter } from "next/navigation";
import { X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransition } from "@/context/TransitionContext";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { getAssetUrl } from "@/lib/assets";

// Custom Gradient for the border based on reference (Dark Red -> Beige/Gold)
const BORDER_GRADIENT = "bg-gradient-to-br from-[#7f1d1d] via-[#b91c1c] to-[#fef3c7]"; // red-900 -> red-700 -> amber-100

// Mock Data for Members
const members = [
  {
    id: 1,
    name: "Angie Burgos",
    role: "Producción",
    image: getAssetUrl("/members/Angie-Burgos.png"),
  },
  {
    id: 2,
    name: "Romina Silva",
    role: "Asist. de producción",
    image: getAssetUrl("/members/Romina-Silva.png"),
  },
  {
    id: 3,
    name: "Fabian Palomino",
    role: "Asist. de Producción",
    image: getAssetUrl("/members/Fabian-Palomino.png"),
  },
  {
    id: 4,
    name: "Rodrigo Chavez",
    role: "Dirección General",
    image: getAssetUrl("/members/Rodrigo-Chavez.png"),
  },
  {
    id: 5,
    name: "Julio Ramos",
    role: "Dirección de foto, op.cam y Gaffer",
    image: getAssetUrl("/members/Julio-Ramos.png"),
  },
  {
    id: 6,
    name: "David Aliaga",
    role: "1er asistente de foto y Postproducción",
    image: getAssetUrl("/members/David-Aliaga.png"),
  },
  {
    id: 7,
    name: "Ruth De La Cruz",
    role: "Dirección de Arte",
    image: getAssetUrl("/members/Ruth-De-La-Cruz.png"),
  },
  {
    id: 8,
    name: "Mario Romanet",
    role: "Luminotécnico, Sonido y Postproducción",
    image: getAssetUrl("/members/Mario-Romanet.png"),
  },
  {
    id: 9,
    name: "Cristhian Castillo",
    role: "Postprod., Colorización y Luminotécnico",
    image: getAssetUrl("/members/Cristhian-Castillo.png"),
  },
  {
    id: 10,
    name: "Antonio Alva",
    role: "Luminotécnico",
    image: getAssetUrl("/members/Antonio-Alva.png"),
  },
  {
    id: 11,
    name: "Deevid Siguas",
    role: "Asist. Arte",
    image: getAssetUrl("/members/Deevid-Siguas.png"),
  },
  {
    id: 12,
    name: "Gabriel Guinea",
    role: "Dirección General",
    image: getAssetUrl("/members/Gabriel-Guinea.png"),
  },
  {
    id: 13,
    name: "Stephano Gonzales",
    role: "Productor de arte Luminotécnico",
    image: getAssetUrl("/members/Stephano-Gonzales.png"),
  },
  {
    id: 14,
    name: "Giancarlo Chahua",
    role: "Asist. de Arte",
    image: getAssetUrl("/members/Giancarlo-Chahua.png"),
  },
  {
    id: 15,
    name: "Franco Calderon",
    role: "Asistente de cámara",
    image: getAssetUrl("/members/Franco-Calderon.png"),
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
      <Button
        variant="ghost"
        size="icon"
        className="absolute mt-6 right-6 z-20 text-primary-foreground bg-primary/20 hover:bg-primary/50"
        onClick={handleClose}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Hero Section */}
      <section
        id="members-hero"
        className="relative h-96 flex items-center justify-center text-center"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={getAssetUrl("/placeholder.svg")}
            alt="Integrantes Hero"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute" />
        </div>
        <div className="relative z-10 px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary-foreground">
            Nuestros Integrantes
          </h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Conoce a los hombres y mujeres que dedican su vida a servir a la
            comunidad.
          </p>
        </div>
      </section>

      {/* Members Grid */}
      <section
        id="members-grid-section"
        className="container mx-auto px-4 md:px-6 py-16"
      >
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {members.map((member) => (
              <div
                key={member.id}
                id={`member-card-${member.id}`}
                className="flex flex-col items-center text-center group"
              >
                {/* Circular Image Container with Gradient Border */}
                <div className={`relative w-48 h-48 rounded-full p-[6px] ${BORDER_GRADIENT} shadow-xl mb-6 transition-transform duration-300 group-hover:scale-105`}>
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-white border-4 border-white/20">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 192px, 192px"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-muted">
                        <User className="h-20 w-20 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="space-y-1">
                  <h3 className="font-bold text-xl tracking-tight leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground font-medium text-sm md:text-base leading-tight">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
