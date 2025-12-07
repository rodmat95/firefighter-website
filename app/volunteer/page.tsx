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
  UserPlus,
  Award,
  Clock,
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
            src="/placeholder.svg"
            alt="Volunteers"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute" />
        </div>
        <div className="relative z-10 px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary-foreground">
            Únete a Nuestro Equipo
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

      {/* Requirements Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            Requisitos y Proceso
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Requisitos Básicos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <UserPlus className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold">Edad y Disponibilidad</h3>
                    <p className="text-muted-foreground">
                      Tener al menos 18 años y disponibilidad para
                      entrenamientos regulares y respuesta a emergencias.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ShieldCheck className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold">Condición Física</h3>
                    <p className="text-muted-foreground">
                      Buena salud física y mental. Se requiere examen médico
                      inicial.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Award className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold">Compromiso</h3>
                    <p className="text-muted-foreground">
                      Dedicación al servicio comunitario y disposición para
                      aprender continuamente.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Proceso de Incorporación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold">1. Solicitud</h3>
                    <p className="text-muted-foreground">
                      Completa el formulario de solicitud y asiste a una sesión
                      informativa.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold">2. Evaluación</h3>
                    <p className="text-muted-foreground">
                      Entrevista personal y verificación de antecedentes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold">3. Capacitación</h3>
                    <p className="text-muted-foreground">
                      Programa de entrenamiento inicial de 12 semanas con
                      certificación.
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground pt-4">
                  Una vez completado el proceso, te convertirás en un miembro
                  activo de nuestro equipo de bomberos voluntarios.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
