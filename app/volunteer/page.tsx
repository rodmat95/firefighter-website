"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTransition } from "@/context/TransitionContext";
import {
  ShieldCheck,
  HeartHandshake,
  Users,
  TrendingUp,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function VolunteerPage() {
  const router = useRouter();
  const { setAnimations } = useTransition();

  const handleClose = () => {
    setAnimations("none", "down");
    router.push("/");
  };

  const volunteerBenefits = [
    {
      icon: <HeartHandshake className="h-10 w-10 text-primary" />,
      title: "Sirve a tu Comunidad",
      description:
        "Genera un impacto tangible y ayuda a proteger a tus vecinos.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: "Adquiere Habilidades Valiosas",
      description:
        "Recibe formación profesional en extinción de incendios, respuesta médica y más.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Construye Lazos Duraderos",
      description:
        "Únete a un equipo unido y forma relaciones fuertes y duraderas.",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: "Crecimiento Personal",
      description:
        "Desarrolla liderazgo, resolución de problemas y resiliencia.",
    },
  ];

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
            src="/placeholder.jpg"
            alt="Volunteers"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute" />
        </div>
        <div className="relative z-10 px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary-foreground">
            Responde al Llamado
          </h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Conviértete en una parte vital de la seguridad de nuestra comunidad.
            Únete a nuestro dedicado equipo de bomberos voluntarios.
          </p>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            ¿Por Qué Ser Voluntario?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {volunteerBenefits.map((benefit, index) => (
              <Card key={index} className="text-center bg-card">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                    {benefit.icon}
                  </div>
                  <CardTitle className="mt-4">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

