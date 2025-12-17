import type React from "react";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import PageTransition from "@/components/PageTransition";
import { TransitionProvider } from "@/context/TransitionContext";
import ThemeManager from "@/components/ThemeManager";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Código 10.32",
  description:
    "Bienvenidos al proyecto transmedia «Código 10.32», un homenaje documental producido por Utama dedicado a la historia y valor de la Benemérita Compañía de Bomberos Italia N° 5.",
  icons: {
    icon: "/assets/images/branding/logo_color.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={outfit.className}>
        <TransitionProvider>
          <ConditionalNavbar />
          <PageTransition>{children}</PageTransition>
        </TransitionProvider>
      </body>
    </html>
  );
}
