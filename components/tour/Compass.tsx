import { Compass as CompassIcon } from "lucide-react";

interface CompassProps {
  yaw: number; // Radians
  onReset: () => void;
}

export function Compass({ yaw, onReset }: CompassProps) {
  return (
    <button
      onClick={onReset}
      className="bg-black/60 p-2 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors group"
      title="Restablecer vista (Norte)"
    >
      <div
        className="transition-transform duration-100"
        style={{ transform: `rotate(${-yaw * (180 / Math.PI)}deg)` }}
      >
        <CompassIcon size={32} className="text-white group-hover:text-blue-400" />
        {/* North Indicator */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1 w-1 h-1 bg-red-500 rounded-full" />
      </div>
    </button>
  );
}
