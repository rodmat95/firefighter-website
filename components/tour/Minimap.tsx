import Image from "next/image";
import { Scene, tourGraph } from "../../app/tour/data";

interface MinimapProps {
  scenes: Scene[];
  currentScene: Scene;
  yaw: number; // Current view rotation in radians
}

export function Minimap({ scenes, currentScene, yaw }: MinimapProps) {
  // Zoom level
  const ZOOM = 3;
  
  // Calculate position to center the current scene
  // We want currentScene (at x%, y%) to be in the center (50%, 50%)
  // transform-origin is top-left (0,0)
  // Translate = Center - (Position * Zoom)
  // But since we are scaling the container, we can just move the container.
  
  // Let's use a simpler approach:
  // 1. Container is fixed size (window).
  // 2. Inner content is scaled (ZOOM).
  // 3. Inner content is translated so the target point is at the center.
  
  const x = currentScene.coordinates?.x || 50;
  const y = currentScene.coordinates?.y || 50;
  
  // If map is 100x100 units. Center is 50,50.
  // Target is x,y.
  // We scale by Z.
  // New Target position is x*Z, y*Z.
  // We want x*Z, y*Z to be at Center of Viewport.
  // Viewport Center is 50% of Viewport.
  // Translate = 50% - (x * Z)%
  
  const translateX = 50 - (x * ZOOM);
  const translateY = 50 - (y * ZOOM);

  return (
    <div className="relative w-64 h-64 bg-black/80 rounded-lg overflow-hidden border border-white/20 shadow-xl">
      {/* Map Container with Zoom and Pan */}
      <div 
        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translate(${translateX}%, ${translateY}%) scale(${ZOOM})`,
          transformOrigin: "0 0", // Scale from top-left, then translate works as expected with %
          width: "100%",
          height: "100%"
        }}
      >
        {/* Floorplan Image */}
        <div className="absolute inset-0 opacity-50">
          <Image
            src={`${process.env.NEXT_PUBLIC_R2_URL || ""}/tour/floorplan.png`}
            alt="Mapa de la estación"
            fill
            className="object-contain"
          />
        </div>

        {/* Route Path (Graph) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
          {tourGraph.map((node, index) => (
            <g key={index}>
              {node.next.map((nextIndex) => {
                const nextNode = tourGraph[nextIndex];
                if (!nextNode) return null;
                return (
                  <line
                    key={`${index}-${nextIndex}`}
                    x1={node.x}
                    y1={node.y}
                    x2={nextNode.x}
                    y2={nextNode.y}
                    stroke="#3b82f6"
                    strokeWidth={1 / ZOOM}
                    strokeDasharray={`${2 / ZOOM} ${1 / ZOOM}`}
                  />
                );
              })}
            </g>
          ))}
        </svg>

        {/* Current Location Marker */}
        <div
          className="absolute w-4 h-4 -ml-2 -mt-2 bg-blue-500 rounded-full z-10 shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-500"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: `scale(${1 / ZOOM})` // Keep marker size constant visually
          }}
        />

        {/* View Cone (Radar) for current scene */}
        <div
          className="absolute w-0 h-0 border-l-[20px] border-r-[20px] border-t-[60px] border-l-transparent border-r-transparent border-t-blue-500/30 z-0 transition-transform duration-100 origin-bottom"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: `translate(-50%, -100%) rotate(${yaw * (180 / Math.PI)}deg) scale(${1 / ZOOM})`, // yaw already includes northOffset
          }}
        />
      </div>
      
      {/* Overlay Gradient for depth */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] rounded-lg"></div>
    </div>
  );
}
