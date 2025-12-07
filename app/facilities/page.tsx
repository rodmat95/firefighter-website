"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTransition } from "@/context/TransitionContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  Building,
  Shield,
  Zap,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FacilitiesPage() {
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
            src="/placeholder.jpg"
            alt="Fire Station"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute" />
        </div>
        <div className="relative z-10 px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary-foreground">
            Nuestras Instalaciones
          </h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Explora nuestras estaciones de bomberos, equipos y centros de
            entrenamiento de última generación.
          </p>
        </div>
      </section>

      {/* Stations Section */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            Nuestras Instalaciones
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Estación Código 10-32</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold">Ubicación</h3>
                    <p className="text-muted-foreground">
                      Av. Alejandro Granda s/n, Mz. E Lt. 3, Urb. Stella Maris,
                      Callao
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold">Teléfonos</h3>
                    <p className="text-muted-foreground">(01) 429-0318</p>
                    <p className="text-muted-foreground">(01) 453-4945</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold">Emergencias</h3>
                    <p className="text-muted-foreground">116</p>
                  </div>
                </div>
                <p className="text-muted-foreground pt-4">
                  No cuenta con correo electrónico público. No tiene un horario
                  establecido de atención, ya que es una estación operativa.
                  Dispone de equipamiento completo.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Museo Ezio Massa Capurro</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold">Ubicación</h3>
                    <p className="text-muted-foreground">
                      Av. Alejandro Granda, 3ra. cuadra s/n, Urb. Stella Maris,
                      Callao
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold">Teléfonos</h3>
                    <p className="text-muted-foreground">(01) 429-0318</p>
                    <p className="text-muted-foreground">(01) 420-9163</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold">Correo de Contacto</h3>
                    <p className="text-muted-foreground">
                      pompaitalia@hotmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold">Horario de Atención</h3>
                    <p className="text-muted-foreground">
                      Lunes a Sábado, de 9:00 a.m. a 5:00 p.m.
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground pt-4">
                  Presenta exhibiciones históricas y una galería multimedia
                  sobre los bomberos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            Nuestro Equipo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card text-center">
              <CardHeader>
                <Building className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Camiones de Bomberos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nuestra flota incluye 4 modernos camiones de bomberos
                  equipados con la última tecnología.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Camión Escalera</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nuestro camión con escalera aérea de 100 pies nos permite
                  acceder a edificios altos.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card text-center">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Vehículo de Rescate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nuestro vehículo de rescate pesado transporta equipo
                  especializado para diversas operaciones.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
