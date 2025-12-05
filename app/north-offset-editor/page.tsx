"use client";

import React, { useEffect, useRef, useState } from "react";
import { scenes, Scene } from "../tour/data";
import { ChevronLeft, ChevronRight, Save, RotateCcw } from "lucide-react";

export default function NorthOffsetEditor() {
  const panoRef = useRef<HTMLDivElement | null>(null);
  const [viewer, setViewer] = useState<any>(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [offsets, setOffsets] = useState<Record<string, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentYaw, setCurrentYaw] = useState(0);

  const currentScene = scenes[currentSceneIndex];
  const scenesRef = useRef<Map<string, any>>(new Map());

  // Initialize Viewer
  useEffect(() => {
    const panoElement = panoRef.current;
    if (!panoElement) return;

    let viewerInstance: any = null;

    import("marzipano").then((Marzipano) => {
      const viewerOpts = {
        controls: { mouseViewMode: "drag" },
      };

      viewerInstance = new Marzipano.Viewer(panoElement, viewerOpts);
      setViewer(viewerInstance);
      setIsLoaded(true);

      viewerInstance.addEventListener("viewChange", () => {
        const view = viewerInstance.view();
        if (view) {
          setCurrentYaw(view.yaw());
        }
      });
    });

    return () => {
      if (viewerInstance) {
        viewerInstance.destroy();
      }
    };
  }, []);

  // Clear scenes cache when viewer changes
  useEffect(() => {
    scenesRef.current.clear();
  }, [viewer]);

  // Switch Scene
  useEffect(() => {
    if (!viewer || !isLoaded) return;

    import("marzipano").then((Marzipano) => {
      try {
        let scene = scenesRef.current.get(currentScene.id);

        if (!scene) {
          const source = Marzipano.ImageUrlSource.fromString(currentScene.image);
          const geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);
          const view = new Marzipano.RectilinearView({ yaw: 0, pitch: 0, fov: Math.PI / 4 }, null);

          scene = viewer.createScene({
            source: source,
            geometry: geometry,
            view: view,
            pinFirstLevel: true,
          });

          scenesRef.current.set(currentScene.id, scene);
        }

        try {
          scene.switchTo({ transitionDuration: 0 });
        } catch (e) {
          console.error("Error switching scene:", e);
          scenesRef.current.clear();
        }
      } catch (error) {
        console.error("Error in scene setup:", error);
      }
    });
  }, [viewer, currentScene, isLoaded]);

  const handleSetNorth = () => {
    // If user is looking at North, then the offset needed to make this 0 is -currentYaw.
    const offset = -currentYaw;
    setOffsets(prev => ({
      ...prev,
      [currentScene.id]: offset
    }));
  };

  const handleNext = () => {
    setCurrentSceneIndex((prev) => (prev + 1) % scenes.length);
  };

  const handlePrev = () => {
    setCurrentSceneIndex((prev) => (prev - 1 + scenes.length) % scenes.length);
  };

  const handleSceneSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value);
    setCurrentSceneIndex(index);
  };

  const handleCopyConfig = () => {
    const code = `export const northOffsets: Record<string, number> = ${JSON.stringify(offsets, null, 2)};`;
    navigator.clipboard.writeText(code);
    alert("Configuración copiada al portapapeles!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex-1 relative">
        <div ref={panoRef} className="absolute inset-0 w-full h-full" />
        
        {/* Center Crosshair/Line to indicate "North" target */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-0.5 h-20 bg-red-500 shadow-[0_0_10px_rgba(255,0,0,0.8)]"></div>
          <div className="absolute text-red-500 font-bold -mt-24 bg-black/50 px-2 rounded">NORTE</div>
        </div>

        {/* Controls Overlay */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
          <div className="bg-black/70 p-4 rounded-lg backdrop-blur pointer-events-auto max-w-md">
            <h1 className="text-xl font-bold mb-2">Calibrador de Norte</h1>
            <p className="text-sm text-gray-300 mb-4">
              1. Gira la vista hasta que estés mirando hacia el <strong>NORTE</strong> real (o hacia adelante en el mapa).
              <br />
              2. Pulsa "Fijar Norte Aquí".
            </p>
            
            {/* Scene Navigation */}
            <div className="flex items-center gap-2 mb-4">
              <button onClick={handlePrev} className="p-2 bg-gray-700 rounded hover:bg-gray-600"><ChevronLeft size={20} /></button>
              <select 
                value={currentSceneIndex} 
                onChange={handleSceneSelect}
                className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm flex-1 max-w-[200px]"
              >
                {scenes.map((s, i) => (
                  <option key={s.id} value={i}>
                    {i + 1}. {s.name} ({s.id})
                  </option>
                ))}
              </select>
              <button onClick={handleNext} className="p-2 bg-gray-700 rounded hover:bg-gray-600"><ChevronRight size={20} /></button>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={handleSetNorth}
                className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center justify-center gap-2 font-bold"
              >
                <RotateCcw size={18} />
                Fijar Norte Aquí
              </button>
            </div>
            
            <div className="mt-4 text-xs font-mono text-gray-400">
              Yaw Actual: {currentYaw.toFixed(4)} rad
              <br />
              Offset Guardado: {offsets[currentScene.id]?.toFixed(4) ?? "N/A"} rad
            </div>
          </div>

          <div className="bg-black/70 p-4 rounded-lg backdrop-blur pointer-events-auto">
            <button 
              onClick={handleCopyConfig}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded flex items-center gap-2 font-bold shadow-lg"
            >
              <Save size={20} />
              Copiar Configuración
            </button>
            <div className="mt-2 text-right text-xs text-gray-400">
              {Object.keys(offsets).length} escenas calibradas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
