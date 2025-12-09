"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ImageWithLoader } from "@/components/ui/image-with-loader";
import { getAssetUrl } from "@/lib/assets";
import { Button } from "@/components/ui/button";
import { useTransition } from "@/context/TransitionContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { CheckCircle2, Shield, Users, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const services = {
  prevencion: {
    title: "Prevención de Incendios",
    description:
      "Creemos que prevenir incendios es tan importante como combatirlos. Nuestros servicios de prevención ayudan a empresas y residentes a reducir los riesgos de incendio y a mantenerse seguros.",
    icon: <Shield className="h-8 w-8 text-primary" />,
    image: getAssetUrl("/placeholder.svg?height=800&width=1200"),
    alt: "Prevención de Incendios",
    features: [
      "Inspecciones de seguridad contra incendios para empresas",
      "Verificaciones de seguridad contra incendios en el hogar",
      "Aplicación del código de incendios",
      "Programas de educación sobre seguridad contra incendios",
    ],
  },
  preparacion: {
    title: "Educación Comunitaria",
    description:
      "Ofrecemos una variedad de programas educativos para ayudar a los miembros de la comunidad de todas las edades a aprender sobre seguridad contra incendios, preparación para emergencias y cómo responder en situaciones de crisis.",
    icon: <Users className="h-8 w-8 text-primary" />,
    image: getAssetUrl("/placeholder.svg?height=800&width=1200"),
    alt: "Educación Comunitaria",
    features: [
      "Programas de seguridad contra incendios en escuelas",
      "Capacitación en RCP y primeros auxilios",
      "Capacitación en el uso de extintores",
      "Talleres de preparación para emergencias",
    ],
  },
  respuesta: {
    title: "Respuesta a Emergencias",
    description:
      "Nuestro equipo proporciona una respuesta rápida a incendios, emergencias médicas y otras situaciones críticas las 24 horas del día, los 7 días de la semana.",
    icon: <AlertTriangle className="h-8 w-8 text-primary" />,
    image: getAssetUrl("/placeholder.svg?height=800&width=1200"),
    alt: "Respuesta a Emergencias",
    features: [
      "Respuesta y supresión de incendios estructurales",
      "Servicios médicos de emergencia",
      "Incidentes con materiales peligrosos",
      "Rescate acuático y en espacios confinados",
    ],
  },
};

function ServicesContent() {
  const router = useRouter();
  const { setAnimations } = useTransition();

  const handleClose = () => {
    setAnimations("none", "down");
    router.push("/");
  };
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "prevencion";

  const [selectedService, setSelectedService] = useState(initialService);

  useEffect(() => {
    if (Object.keys(services).includes(initialService)) {
      setSelectedService(initialService);
    } else {
      setSelectedService("prevencion");
    }
  }, [initialService]);

  const service = services[selectedService as keyof typeof services];

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
          <ImageWithLoader
            src={getAssetUrl("/placeholder.svg?height=1080&width=1920")}
            alt="Fondo Servicios"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="absolute" />
        <div className="relative z-10 px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary-foreground">
            Nuestros Servicios
          </h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Brindamos una gama completa de servicios de emergencia y preventivos
            para mantener segura a nuestra comunidad.
          </p>
        </div>
      </section>

      {/* Service Tabs */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {Object.keys(services).map((key) => (
              <div
                key={key}
                onClick={() => setSelectedService(key)}
                className={cn(
                  "cursor-pointer p-6 rounded-lg transition-all",
                  selectedService === key
                    ? "bg-primary/10 border border-primary"
                    : "hover:bg-muted/50"
                )}
              >
                <div className="flex items-center gap-4">
                  {services[key as keyof typeof services].icon}
                  <h3 className="text-xl font-bold">
                    {services[key as keyof typeof services].title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Content */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold tracking-tight">
                {service.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {service.description}
              </p>
              <ul className="mt-6 space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button asChild>
                  <Link href="/contact">Contáctanos</Link>
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2 relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={service.image}
                alt={service.alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
