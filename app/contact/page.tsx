"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTransition } from "@/context/TransitionContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  CheckCircle2,
  X,
} from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getAssetUrl } from "@/lib/assets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
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

  return (
    <div
      id="contact-page"
      className="dark bg-background text-foreground min-h-screen"
    >
      <Button
        id="contact-close-btn"
        variant="ghost"
        size="icon"
        className="absolute mt-6 right-6 z-20 text-primary-foreground bg-primary/20 hover:bg-primary/50"
        onClick={handleClose}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Hero Section */}
      <section
        id="contact-hero"
        className="relative h-96 flex items-center justify-center text-center"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={getAssetUrl("/placeholder.svg")}
            alt="Contact Us"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute" />
        </div>
        <div className="relative z-10 px-4 md:px-6">
          <h1
            id="contact-hero-title"
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary-foreground"
          >
            Contáctanos
          </h1>
          <p
            id="contact-hero-subtitle"
            className="mt-4 text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto"
          >
            ¿Tienes preguntas o necesitas información? Estamos aquí para
            ayudarte.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact-content"
        className="container mx-auto px-4 md:px-6 py-16"
      >
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card id="contact-form-card" className="bg-card">
              <CardHeader>
                <CardTitle>Ponte en Contacto</CardTitle>
              </CardHeader>
              <CardContent>
                {formSubmitted ? (
                  <div id="contact-success-message" className="text-center p-8">
                    <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">
                      ¡Mensaje Enviado!
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      Gracias por contactarnos. Hemos recibido tu mensaje y te
                      responderemos lo antes posible.
                    </p>
                    <Button
                      id="contact-send-another-btn"
                      onClick={() => setFormSubmitted(false)}
                      variant="outline"
                    >
                      Enviar Otro Mensaje
                    </Button>
                  </div>
                ) : (
                  <form
                    id="contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nombre</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Asunto</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="¿Cómo podemos ayudarte?"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Mensaje</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tu mensaje..."
                        rows={5}
                        required
                      />
                    </div>
                    <Button
                      id="contact-submit-btn"
                      type="submit"
                      className="w-full"
                    >
                      Enviar Mensaje
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div id="contact-info-section" className="space-y-8">
              <Card id="contact-details-card" className="bg-card">
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-bold">Teléfono</h3>
                      <p className="text-muted-foreground">Emergencias: 116</p>
                      <p className="text-muted-foreground">
                        Central: (01) 429-0318
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-bold">Ubicación</h3>
                      <p className="text-muted-foreground">
                        Av. Alejandro Granda s/n, Mz. E, Lt. 3, Urb. Stella
                        Maris, Bellavista, Callao, Perú
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-bold">Correo Electrónico</h3>
                      <a
                        id="contact-email-link"
                        href="mailto:utamaitalia5@gmail.com"
                        className="text-muted-foreground hover:text-primary"
                      >
                        utamaitalia5@gmail.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card id="contact-social-card" className="bg-card">
                <CardHeader>
                  <CardTitle>Síguenos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <a
                      id="contact-social-instagram"
                      href="https://www.instagram.com/codigo10.32"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a
                      id="contact-social-tiktok"
                      href="https://www.tiktok.com/@codigo10.32"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <SiTiktok className="h-6 w-6" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
