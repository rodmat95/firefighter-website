"use client";

import Image from "next/image";
import { getAssetUrl } from "@/lib/assets";
import { useState, useRef, MouseEvent, useEffect } from "react";
import { scenes } from "../tour/data";

interface Point {
  x: number;
  y: number;
}

export default function PathEditorPage() {
  const [points, setPoints] = useState<Point[]>([]);
  const [connections, setConnections] = useState<[number, number][]>([]);
  const [selectedPointIndex, setSelectedPointIndex] = useState<number | null>(null);

  // Initialize from existing scenes
  useEffect(() => {
    if (scenes.length > 0 && points.length === 0) {
      // Load points
      const initialPoints = scenes.map(s => ({
        x: s.coordinates?.x || 50,
        y: s.coordinates?.y || 50
      }));
      setPoints(initialPoints);

      // Load connections from hotspots
      const initialConnections: [number, number][] = [];
      scenes.forEach((scene, fromIndex) => {
        scene.hotspots.forEach(h => {
          if (h.type === "arrow") {
            const targetIndex = scenes.findIndex(s => s.id === h.targetSceneId);
            if (targetIndex !== -1) {
              // Check if connection already exists (undirected check for UI simplicity, or directed?)
              // The editor treats connections as directed in the export logic.
              // Let's add it.
              const exists = initialConnections.some(
                ([from, to]) => from === fromIndex && to === targetIndex
              );
              if (!exists) {
                initialConnections.push([fromIndex, targetIndex]);
              }
            }
          }
        });
      });
      setConnections(initialConnections);
    }
  }, []);

  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<number | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper to get label from scene ID
  const getPointLabel = (index: number) => {
    if (!scenes[index]) return `${index + 1}`;
    const id = scenes[index].id;
    // scene-01 -> 01
    // scene-A-01 -> A-01
    return id.replace("scene-", "").replace("-", ".");
  };

  // Helper to get color by route
  const getPointColor = (index: number) => {
    if (!scenes[index]) return "#22c55e"; // Default Green
    const id = scenes[index].id;
    if (id.includes("scene-A")) return "#3b82f6"; // Blue
    if (id.includes("scene-B")) return "#a855f7"; // Purple
    if (id.includes("scene-C")) return "#f97316"; // Orange
    if (id.includes("scene-D")) return "#ef4444"; // Red
    if (id.includes("scene-E")) return "#ec4899"; // Pink
    return "#22c55e"; // Root Green
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>, index: number) => {
    e.stopPropagation(); // Prevent map click
    setSelectedPointIndex(index);
    dragRef.current = index;
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || dragRef.current === null || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

    const newPoints = [...points];
    newPoints[dragRef.current] = { x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 };
    setPoints(newPoints);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    dragRef.current = null;
  };

  // Only for background click (deselect)
  const handleBackgroundClick = () => {
    if (!isDragging) {
      setSelectedPointIndex(null);
    }
  };

  const handleCopy = () => {
    // Generate graph structure
    // We need to map connections to "next" arrays
    const graphNodes = points.map((p, i) => {
      const nextIndices = connections
        .filter(([from, _]) => from === i)
        .map(([_, to]) => to);
        
      return { ...p, next: nextIndices };
    });

    // We only export the coordinates array for now since connections are automatic in data.ts
    // But wait, the user wants to update the coordinates in data.ts.
    // data.ts uses a hardcoded array or a function.
    // We should export the array of coordinates to replace the empty tourPath or the getCoordinates logic.
    // Actually, data.ts currently has `export const tourPath = []`. We should populate that.
    
    // Let's export a JSON object that maps ID to coordinate, or just the array if order is preserved.
    // Order IS preserved because we loaded from scenes array.
    
    const code = `export const tourPath = [\n${points.map(p => `  { x: ${p.x}, y: ${p.y} },`).join('\n')}\n];`;
    navigator.clipboard.writeText(code);
    alert("¡Coordenadas copiadas! Pégalas en app/tour/data.ts reemplazando 'export const tourPath = ...'");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8" onMouseUp={handleMouseUp}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">📍 Editor de Ruta (Arrastrar y Soltar)</h1>
        <p className="text-gray-400 mb-6">
          Arrastra los puntos a su ubicación real en el plano. Los puntos están coloreados por ruta.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Área del plano */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-4">
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onClick={handleBackgroundClick}
                className="relative w-full aspect-square cursor-default bg-black rounded-lg overflow-hidden border-2 border-blue-500 select-none"
              >
                <Image
                  src={getAssetUrl("/tour/floorplan.png")}
                  alt="Plano de la estación"
                  fill
                  className="object-contain pointer-events-none"
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement;
                    setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
                  }}
                />
                
                {/* SVG overlay para mostrar la ruta */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Conexiones (Líneas) */}
                  {connections.map(([from, to], i) => {
                    const p1 = points[from];
                    const p2 = points[to];
                    return (
                      <line
                        key={`conn-${i}`}
                        x1={p1.x}
                        y1={p1.y}
                        x2={p2.x}
                        y2={p2.y}
                        stroke="#555"
                        strokeWidth="0.3"
                        strokeDasharray="1 0.5"
                      />
                    );
                  })}
                  
                  {/* Puntos marcados */}
                  {points.map((point, index) => (
                    <g 
                      key={index} 
                      className="pointer-events-auto cursor-grab active:cursor-grabbing hover:opacity-80 transition-opacity"
                      onMouseDown={(e) => handleMouseDown(e as any, index)}
                    >
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r={selectedPointIndex === index ? "2" : "1.5"}
                        fill={getPointColor(index)}
                        stroke="#ffffff"
                        strokeWidth="0.3"
                      />
                      <text
                        x={point.x}
                        y={point.y - 2.5}
                        fontSize="1.5"
                        fill={getPointColor(index)}
                        textAnchor="middle"
                        className="font-bold"
                        style={{ textShadow: '0 0 2px black' }}
                      >
                        {getPointLabel(index)}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
              
              <div className="flex gap-3 mt-4">
                 <div className="text-xs text-gray-400 flex gap-4">
                    <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-green-500"></div> Principal</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Ruta A</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-purple-500"></div> Ruta B</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-orange-500"></div> Ruta C</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-500"></div> Ruta D</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-pink-500"></div> Ruta E</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Panel lateral de coordenadas */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-4 sticky top-8">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Puntos ({points.length})
              </h2>
              
              {/* Lista de puntos */}
              <div className="bg-gray-900 rounded-lg p-3 mb-4 max-h-64 overflow-y-auto">
                  <ul className="space-y-1 text-xs font-mono">
                    {points.map((point, index) => (
                      <li key={index} className={`${selectedPointIndex === index ? 'text-yellow-400 font-bold' : 'text-gray-400'}`}>
                        {getPointLabel(index)}: {`{ x: ${point.x.toFixed(1)}, y: ${point.y.toFixed(1)} }`}
                      </li>
                    ))}
                  </ul>
              </div>

              {/* Código para exportar */}
              {points.length > 0 && (
                <>
                  <div className="bg-gray-900 rounded-lg p-3 mb-4 max-h-48 overflow-y-auto">
                    <pre className="text-xs text-gray-300 whitespace-pre-wrap">
{`export const tourPath = [
${points.map((p, i) => `  { x: ${p.x}, y: ${p.y} }, // ${getPointLabel(i)}`).join('\n')}
];`}
                    </pre>
                  </div>
                  
                  <button
                    onClick={handleCopy}
                    className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    📋 Copiar Coordenadas
                  </button>
                </>
              )}
              
              {/* Instrucciones */}
              <div className="mt-6 p-3 bg-blue-900/30 border border-blue-500/50 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-300">💡 Instrucciones</h3>
                <ol className="text-xs space-y-1 text-gray-300">
                  <li>1. Arrastra los puntos a su ubicación en el mapa.</li>
                  <li>2. Los puntos están coloreados por ruta.</li>
                  <li>3. Copia el código generado.</li>
                  <li>4. Pégalo en <code>app/tour/data.ts</code>.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
