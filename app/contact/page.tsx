"use client";

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
  CheckCircle2,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { useRouter } from "next/navigation";
import { ImageWithLoader } from "@/components/ui/image-with-loader";
import { getAssetUrl } from "@/lib/assets";
import { Instagram } from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { setAnimations } = useTransition();

  const handleClose = () => {
    setAnimations("none", "down");
    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormSubmitted(true);
      } else {
        alert("Hubo un error al enviar el mensaje. Por favor intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Hubo un error al enviar el mensaje. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
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
            alt="Fondo Contacto"
            fill
            className="object-cover brightness-50"
            priority
          />
          */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background"></div>
        </div>
        <div className="relative z-10 px-4 md:px-6 max-w-4xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium mb-2">
            <MessageCircle className="w-4 h-4" />
            <span>Estamos para Ayudarte</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-xl">
            Contáctanos
          </h1>
          <p className="text-lg md:text-xl text-zinc-200 max-w-2xl mx-auto font-medium">
            ¿Tienes preguntas o necesitas información? Comunícate con nosotros.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-16 -mt-20 relative z-20">
        <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Ponte en Contacto</h2>
              
              {formSubmitted ? (
                  <div className="text-center p-8 py-16">
                    <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2 text-white">
                      ¡Mensaje Enviado!
                    </h3>
                    <p className="text-lg text-zinc-400 mb-8">
                      Gracias por contactarnos. Hemos recibido tu mensaje y te
                      responderemos lo antes posible.
                    </p>
                    <Button
                      onClick={() => setFormSubmitted(false)}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Enviar Otro Mensaje
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-zinc-300">Nombre</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="Juan"
                          required
                          className="bg-black/30 border-white/10 text-white placeholder:text-zinc-500 focus:border-red-500/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-zinc-300">Apellido</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Perez"
                          required
                          className="bg-black/30 border-white/10 text-white placeholder:text-zinc-500 focus:border-red-500/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-zinc-300">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="juan.perez@correo.com"
                        required
                        className="bg-black/30 border-white/10 text-white placeholder:text-zinc-500 focus:border-red-500/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-zinc-300">Asunto</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="¿Cómo podemos ayudarte?"
                        required
                        className="bg-black/30 border-white/10 text-white placeholder:text-zinc-500 focus:border-red-500/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-zinc-300">Mensaje</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tu mensaje..."
                        rows={5}
                        required
                        className="bg-black/30 border-white/10 text-white placeholder:text-zinc-500 focus:border-red-500/50 max-h-64 overflow-y-auto"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                    </Button>
                  </form>
                )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Info Card */}
              <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
                 <h2 className="text-2xl font-bold text-white mb-6">Información de Contacto</h2>
                 <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                        <Phone className="h-6 w-6 text-red-500 mt-1" />
                        <div>
                          <h3 className="font-bold text-white">Llamadas</h3>
                          <p className="text-zinc-400">+51 902 853 013</p>
                        </div>
                    </div>
                    
                    <a 
                      href="https://wa.me/51902853013"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                    >
                        <MessageCircle className="h-6 w-6 text-red-500 mt-1" />
                        <div>
                          <h3 className="font-bold text-white">WhatsApp</h3>
                          <p className="text-zinc-400">Iniciar Chat</p>
                        </div>
                    </a>
                    {/*
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                        <MapPin className="h-6 w-6 text-red-500 mt-1" />
                        <div>
                          <h3 className="font-bold text-white">Ubicación</h3>
                          <p className="text-zinc-400">
                            Av. Alejandro Granda s/n, Mz. E, Lt. 3, Urb. Stella Maris, Bellavista, Callao, Perú
                          </p>
                        </div>
                    </div>
                    */}
                     <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                        <Mail className="h-6 w-6 text-red-500 mt-1" />
                        <div>
                          <h3 className="font-bold text-white">Correo Electrónico</h3>
                          <a
                            href="mailto:utamaitalia5@gmail.com"
                            className="text-zinc-400 hover:text-red-500 transition-colors"
                          >
                            utamaitalia5@gmail.com
                          </a>
                        </div>
                    </div>
                 </div>
              </div>

              {/* Social Card */}
              <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
                 <h2 className="text-2xl font-bold text-white mb-6">Síguenos</h2>
                 <div className="flex gap-4">
                    <a
                      href="https://www.instagram.com/codigo10.32"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-full bg-white/5 border border-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-all hover:scale-110"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a
                      href="https://www.tiktok.com/@codigo10.32"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-full bg-white/5 border border-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-all hover:scale-110"
                    >
                      <SiTiktok className="h-6 w-6" />
                    </a>
                 </div>
              </div>
            </div>
        </div>
      </main>
    </div>
  );
}
