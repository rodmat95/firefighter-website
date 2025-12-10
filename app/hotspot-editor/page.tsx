"use client";

import React, { useEffect, useRef, useState } from "react";
import { scenes, Scene } from "../tour/data";
import { ChevronLeft, ChevronRight, Save, Navigation, ArrowRight, ArrowLeft } from "lucide-react";

export default function HotspotEditor() {
  const panoRef = useRef<HTMLDivElement | null>(null);
  const [viewer, setViewer] = useState<any>(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [manualYaws, setManualYaws] = useState<Record<string, number>>({});
  const [manualPitches, setManualPitches] = useState<Record<string, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentYaw, setCurrentYaw] = useState(0);
  const [currentPitch, setCurrentPitch] = useState(0);

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
          setCurrentPitch(view.pitch());
        }
      });
    });

    return () => {
      if (viewerInstance) {
        viewerInstance.destroy();
      }
    };
  }, []);

  // Clear scenes cache when viewer changes (e.g. re-mount)
  useEffect(() => {
    scenesRef.current.clear();
  }, [viewer]);

  // Switch Scene & Update Hotspots
  useEffect(() => {
    if (!viewer || !isLoaded) return;

    import("marzipano").then((Marzipano) => {
      try {
        let scene = scenesRef.current.get(currentScene.id);

        // Create scene if it doesn't exist
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

        // Update Hotspots
        const container = scene.hotspotContainer();
        
        // Safe clear of existing hotspots
        if (container) {
          try {
              const existingHotspots = container.listHotspots();
              if (existingHotspots) {
                  // Copy array to avoid modification issues during iteration
                  [...existingHotspots].forEach(h => {
                      try { container.destroyHotspot(h); } catch(e) {}
                  });
              }
          } catch (e) {
              console.warn("Error clearing hotspots:", e);
          }

          // Add new hotspots
          currentScene.hotspots.forEach((hotspot: any) => {
              const element = document.createElement("div");
              element.className = "w-10 h-10 bg-blue-500/50 rounded-full border-2 border-white flex items-center justify-center text-white font-bold shadow-lg";
              // Show target ID suffix as label (e.g. "02" or "A-01")
              const label = hotspot.targetSceneId.replace("scene-", "").replace("ROOT-", "");
              element.innerHTML = label.substring(0, 3); 
              element.title = `${hotspot.text} -> ${hotspot.targetSceneId}`;

              const key = `${currentScene.id}-${hotspot.targetSceneId}`;
              const yaw = manualYaws[key] !== undefined ? manualYaws[key] : hotspot.yaw;
              const pitch = manualPitches[key] !== undefined ? manualPitches[key] : (hotspot.pitch || 0.1);
              
              try {
                  container.createHotspot(element, { yaw: yaw, pitch: pitch });
              } catch (e) {
                  console.warn("Error creating hotspot:", e);
              }
          });
        }

        // Switch scene with error handling
        try {
          scene.switchTo({ transitionDuration: 0 });
        } catch (e) {
          console.error("Error switching scene:", e);
          // Try to recover by recreating the viewer
          scenesRef.current.clear();
        }
      } catch (error) {
        console.error("Error in scene setup:", error);
      }
    });
  }, [viewer, currentScene, isLoaded, manualYaws, manualPitches]);

  const handleSetPosition = (targetId: string) => {
    const key = `${currentScene.id}-${targetId}`;
    setManualYaws(prev => ({
      ...prev,
      [key]: currentYaw
    }));
    setManualPitches(prev => ({
        ...prev,
        [key]: currentPitch
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
    const yawsCode = `export const manualHotspotYaws: Record<string, number> = ${JSON.stringify(manualYaws, null, 2)};`;
    const pitchesCode = `export const manualHotspotPitches: Record<string, number> = ${JSON.stringify(manualPitches, null, 2)};`;
    
    navigator.clipboard.writeText(`${yawsCode}\n\n${pitchesCode}`);
    alert("Configuración (Yaws + Pitches) copiada al portapapeles!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex-1 relative">
        <div ref={panoRef} className="absolute inset-0 w-full h-full" />
        
        {/* Center Crosshair */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-1 h-10 bg-yellow-400 shadow-[0_0_10px_rgba(255,255,0,0.8)]"></div>
          <div className="w-10 h-1 bg-yellow-400 shadow-[0_0_10px_rgba(255,255,0,0.8)] -ml-5 -mt-5 absolute top-1/2 left-1/2"></div>
        </div>

        {/* Controls Overlay */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
          <div className="bg-black/70 p-4 rounded-lg backdrop-blur pointer-events-auto max-w-md max-h-[80vh] overflow-y-auto">
            <h1 className="text-xl font-bold mb-2">Editor de Flechas (Yaw + Pitch)</h1>
            <p className="text-sm text-gray-300 mb-4">
              Apunta la cruz amarilla y "Fija" la posición (Horizontal y Vertical).
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

            {/* Hotspot List */}
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-gray-400 uppercase">Conexiones Disponibles:</h3>
              {currentScene.hotspots.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No hay conexiones en esta escena.</p>
              ) : (
                currentScene.hotspots.map((h, i) => {
                    const key = `${currentScene.id}-${h.targetSceneId}`;
                    const isModified = manualYaws[key] !== undefined || manualPitches[key] !== undefined;
                    return (
                        <div key={i} className="bg-gray-800 p-2 rounded border border-gray-700">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-sm">{h.text}</span>
                                <span className="text-xs text-gray-500">{h.targetSceneId}</span>
                            </div>
                            <button 
                                onClick={() => handleSetPosition(h.targetSceneId)}
                                className={`w-full py-2 rounded text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
                                    isModified ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {isModified ? 'Actualizar Posición' : 'Fijar Posición'}
                                <Navigation size={14} className={isModified ? "" : "opacity-50"} />
                            </button>
                            {isModified && (
                                <div className="text-[10px] text-green-400 mt-1 text-right font-mono">
                                    Yaw: {manualYaws[key]?.toFixed(3)} | Pitch: {manualPitches[key]?.toFixed(3)}
                                </div>
                            )}
                        </div>
                    );
                })
              )}
            </div>
            
            <div className="mt-4 text-xs font-mono text-gray-400 border-t border-gray-700 pt-2 grid grid-cols-2">
              <div>Yaw: {currentYaw.toFixed(4)}</div>
              <div>Pitch: {currentPitch.toFixed(4)}</div>
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
              {Object.keys(manualYaws).length} ajustes guardados
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
