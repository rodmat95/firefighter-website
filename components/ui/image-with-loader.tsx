"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ImageWithLoaderProps extends ImageProps {
  containerClassName?: string;
  showSpinner?: boolean;
}

export function ImageWithLoader({
  className,
  containerClassName,
  alt,
  showSpinner = true,
  ...props
}: ImageWithLoaderProps) {
  // State to track if the image is still downloading
  const [isLoading, setIsLoading] = useState(true);
  // State to track if we should show the spinner (to avoid flicker on fast loads)
  const [showSpinnerInternal, setShowSpinnerInternal] = useState(false);

  useEffect(() => {
    // Only set a timeout to show the spinner if we are still loading
    let timeoutId: NodeJS.Timeout;
    if (isLoading && showSpinner) {
      timeoutId = setTimeout(() => {
        setShowSpinnerInternal(true);
      }, 150); // 150ms grace period: if load takes longer than this, show spinner
    } else {
      setShowSpinnerInternal(false);
    }
    return () => clearTimeout(timeoutId);
  }, [isLoading, showSpinner]);

  return (
    <div className={cn(
      "relative overflow-hidden", 
      props.fill && "w-full h-full",
      containerClassName
    )}>
      {isLoading && showSpinnerInternal && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 backdrop-blur-sm z-10 transition-all duration-500">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}
      <Image
        className={cn(
          "transition-all duration-500",
          isLoading ? "scale-105 blur-sm grayscale" : "scale-100 blur-0 grayscale-0",
          className
        )}
        alt={alt}
        onLoad={(e) => {
          setIsLoading(false);
          if (props.onLoad) {
            props.onLoad(e);
          }
        }}
        {...props}
      />
    </div>
  );
}
