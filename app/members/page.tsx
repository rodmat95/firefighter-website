"use client";

import { useRouter } from "next/navigation";
import { X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransition } from "@/context/TransitionContext";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

// Mock Data for Members
const members = [
  {
    id: 1,
    name: "Angie Burgos",
    role: "Producción",
    image: "/members/angie-burgos.jpg",
  },
  {
    id: 2,
    name: "Romina Silva",
    role: "Asist. de producción",
    image: "/members/romina-silva.jpg",
  },
  {
    id: 3,
    name: "Fabian Palomino",
    role: "Asist. de Producción",
    image: "/members/fabian-palomino.jpg",
  },
  {
    id: 4,
    name: "Rodrigo Chavez",
    role: "Dirección General",
    image: "/members/rodrigo-chavez.jpg",
  },
  {
    id: 5,
    name: "Julio Ramos",
    role: "Dirección de foto, op.cam y Gaffer",
    image: "/members/julio-ramos.jpg",
  },
  {
    id: 6,
    name: "David Aliaga",
    role: "1er asistente de foto y Postproducción",
    image: "/members/david-aliaga.jpg",
  },
  {
    id: 7,
    name: "Ruth De La Cruz",
    role: "Dirección de Arte",
    image: "/members/ruth-de-la-cruz.jpg",
  },
  {
    id: 8,
    name: "Mario Romanet",
    role: "Luminotécnico, Sonido y Postproducción",
    image: "/members/mario-romanet.jpg",
  },
  {
    id: 9,
    name: "Cristhian Castillo",
    role: "Postprod., Colorización y Luminotécnico",
    image: "/members/cristhian-castillo.jpg",
  },
  {
    id: 10,
    name: "Antonio Alva",
    role: "Luminotécnico",
    image: "/members/antonio-alva.jpg",
  },
  {
    id: 11,
    name: "Deevid Siguas",
    role: "Asist. Arte",
    image: "/members/deevid-siguas.jpg",
  },
  {
    id: 12,
    name: "Gabriel Guinea",
    role: "Dirección General",
    image: "/members/gabriel-guinea.jpg",
  },
  {
    id: 13,
    name: "Stephano Gonzales",
    role: "Productor de arte Luminotécnico",
    image: "/members/stephano-gonzales.jpg",
  },
  {
    id: 14,
    name: "Giancarlo Chahua",
    role: "Asist. de Arte",
    image: "/members/giancarlo-chahua.jpg",
  },
  {
    id: 15,
    name: "Franco Calderon",
    role: "Asistente de cámara",
    image: "/members/franco-calderon.jpg",
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
            src="/placeholder.svg"
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
              <Card
                key={member.id}
                id={`member-card-${member.id}`}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-64 w-full bg-muted">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <User className="h-24 w-24 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
