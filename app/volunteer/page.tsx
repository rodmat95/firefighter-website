"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTransition } from "@/context/TransitionContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCircle2,
  ShieldCheck,
  HeartHandshake,
  Users,
  TrendingUp,
  Send,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function VolunteerPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const router = useRouter();
  const { setAnimations } = useTransition();

  const handleClose = () => {
    setAnimations("none", "down");
    router.push("/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
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

      {/* Application Form Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            ¿Listo para Unirte?
          </h2>
          <Card className="max-w-2xl mx-auto bg-card">
            <CardContent className="pt-6">
              {formSubmitted ? (
                <div className="text-center p-8">
                  <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">
                    ¡Solicitud Recibida!
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Gracias por tu interés. Hemos recibido tu solicitud y nos
                    pondremos en contacto contigo en un plazo de 5 a 7 días
                    hábiles.
                  </p>
                  <Button
                    onClick={() => setFormSubmitted(false)}
                    variant="outline"
                  >
                    Enviar Otra Solicitud
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="why">
                      ¿Por qué quieres ser voluntario?
                    </Label>
                    <Textarea
                      id="why"
                      placeholder="Cuéntanos tu motivación..."
                      required
                    />
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm">
                      He leído y entiendo los requisitos y el compromiso de
                      tiempo.
                    </Label>
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Solicitud
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
