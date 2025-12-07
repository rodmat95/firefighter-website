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
  title: "Código 10-32",
  description:
    "Colegas y amigos, bienvenidos a la página Oficial de «Código 10-32». En nuestra web, encontrarán información relacionada con el día a día de los miembros de la Compañía.",
  icons: {
    icon: "/logo_color.png",
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
