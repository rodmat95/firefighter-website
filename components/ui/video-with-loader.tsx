import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface VideoWithLoaderProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  containerClassName?: string;
  showSpinner?: boolean;
}

export function VideoWithLoader({
  className,
  containerClassName,
  showSpinner = true,
  children,
  ...props
}: VideoWithLoaderProps) {
  // State to track if the video is still loading
  const [isLoading, setIsLoading] = useState(true);
  // State to track if we should show the spinner (to avoid flicker on fast loads)
  const [showSpinnerInternal, setShowSpinnerInternal] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if video is already ready on mount (e.g. from cache)
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Only set a timeout to show the spinner if we are still loading
    let timeoutId: NodeJS.Timeout;
    if (isLoading && showSpinner) {
      timeoutId = setTimeout(() => {
        setShowSpinnerInternal(true);
      }, 150); // 150ms grace period
    } else {
      setShowSpinnerInternal(false);
    }
    return () => clearTimeout(timeoutId);
  }, [isLoading, showSpinner]);

  return (
    <div className={cn(
      "relative overflow-hidden", 
      containerClassName
    )}>
      {isLoading && showSpinnerInternal && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/20 backdrop-blur-sm z-10 transition-all duration-500">
          <Loader2 className="h-8 w-8 animate-spin text-white/80" />
        </div>
      )}
      <video
        ref={videoRef}
        className={cn(
          "transition-all duration-700",
          isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100",
          className
        )}
        onCanPlay={() => setIsLoading(false)}
        onLoadedData={() => setIsLoading(false)}
        {...props}
      >
        {children}
      </video>
    </div>
  );
}
