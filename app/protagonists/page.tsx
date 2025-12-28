"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, User, Award, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransition } from "@/context/TransitionContext";
import { ImageWithLoader } from "@/components/ui/image-with-loader";
import { getAssetUrl } from "@/lib/assets";

const veterans = [
  {
    id: 3,
    name: "Félix Alberto Sam Niego Órdenes",
    role: "Capitán CBP",
    image: "/assets/images/protagonists/3.webp",
    badge: "Bombero Veterano",
    bio: "Bombero Veterano de la Benemérita Compañía Italiana de Bomberos Italia N° 5.",
  },
  {
    id: 4,
    name: "Juan Carlos Castillo Díaz",
    role: "Brigadier CBP",
    image: "/assets/images/protagonists/4.webp",
    badge: "Bombero Veterano",
    bio: "Bombero Veterano de la Benemérita Compañía Italiana de Bomberos Italia N° 5.",
  },
  {
    id: 5,
    name: "Rodolfo Germán Quevedo Pacheco",
    role: "Tnt Brigadier CBP",
    image: "/assets/images/protagonists/5.webp",
    badge: "Bombero Veterano",
    bio: "Bombero Veterano de la Benemérita Compañía Italiana de Bomberos Italia N° 5.",
  },
  {
    id: 1,
    name: "Raquel Azucena Pareja Bancayan",
    role: "Capitán CBP",
    image: "/assets/images/protagonists/1.webp",
    badge: "Bombero",
    bio: "Bombero de la Benemérita Compañía Italiana de Bomberos Italia N° 5.",
  },
  {
    id: 6,
    name: "José Del Carmen Sarmiento Huayamares",
    role: "Brigadier CBP",
    image: "/assets/images/protagonists/6.webp",
    badge: "Bombero Veterano",
    bio: "Siempre con nosotros José. Que Dios te tenga en su gloria.",
  },
  {
    id: 2,
    name: "Juan José Martinez Selis",
    role: "Seccionario CBP",
    image: "/assets/images/protagonists/2.webp",
    badge: "Bombero",
    bio: "Bombero de la Benemérita Compañía Italiana de Bomberos Italia N° 5.",
  },
];

export default function ProtagonistsPage() {
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
        className="fixed mt-6 left-6 z-50 text-white bg-black/40 hover:bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithLoader
            src={getAssetUrl("/assets/images/protagonists/protagonists-hero-1.webp")}
            alt="Nuestros Veteranos"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background"></div>
        </div>
        <div className="relative z-10 px-4 md:px-6 max-w-4xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium mb-2">
            <Award className="w-4 h-4" />
            <span>Legado Vivo</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-xl">
            Nuestros Protagonistas
          </h1>
          <p className="text-lg md:text-xl text-zinc-200 max-w-2xl mx-auto font-medium">
            Honramos a quienes con su vida y ejemplo forjaron la historia de la
            Benemérita Compañía Italiana de Bomberos Italia N° 5.
          </p>
        </div>
      </section>

      {/* Veterans Grid */}
      <main className="container mx-auto px-4 md:px-6 py-16 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {veterans.map((vet) => (
            <div
              key={vet.id}
              className="group bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <ImageWithLoader
                  src={getAssetUrl(vet.image)}
                  alt={vet.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                
                <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 text-red-500 font-bold text-sm mb-1">
                    <Shield className="w-4 h-4" />
                    <span>{vet.badge}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white leading-tight mb-2">
                    {vet.name}
                  </h3>
                  <p className="text-zinc-400 font-medium">{vet.role}</p>
                </div>
              </div>
              <div className="p-6 pt-4 border-t border-white/5 bg-zinc-900/80 flex-grow">
                 <p className="text-zinc-300 leading-relaxed text-sm">
                    &quot;{vet.bio}&quot;
                 </p>
              </div>
            </div>
          ))}
        </div>
      </main>

       {/* Footer / CTA Frame */}
      <section className="py-16 text-center border-t border-white/10 bg-zinc-950">
        <div className="container mx-auto px-4">
             <h2 className="text-2xl font-bold text-white mb-4">Un Legado que Perdura</h2>
             <p className="text-zinc-400 max-w-2xl mx-auto">
                 Su sacrificio y entrega continúan inspirando a las nuevas generaciones de bomberos en nuestra compañía.
             </p>
        </div>
      </section>
    </div>
  );
}
