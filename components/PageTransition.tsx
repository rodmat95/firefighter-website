"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTransition } from "@/context/TransitionContext";
import { cn } from "@/lib/utils";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { enterAnimation, exitAnimation } = useTransition();
  // El Navbar se oculta en /tour, por lo que no necesitamos el padding
  const showNavbar = pathname !== "/tour";

  const variants = {
    enter: (direction: "up" | "down" | "none") => ({
      y: direction === "up" ? "100vh" : direction === "down" ? "-100vh" : 0,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: "up" | "down" | "none") => ({
      y: direction === "down" ? "100vh" : direction === "up" ? "-100vh" : 0,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence
      mode="wait"
      custom={exitAnimation}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <motion.div
        key={pathname}
        custom={enterAnimation}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className={cn(
          "bg-background",
          showNavbar // Añade padding solo si el navbar está visible
        )}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
