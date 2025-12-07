"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { scenes, Scene } from "./data";
import { Minimap } from "../../components/tour/Minimap";
import { Compass } from "../../components/tour/Compass";
import { LogOut } from "lucide-react";

export default function Recorrido() {
  const router = useRouter();
  const panoRef = useRef<HTMLDivElement | null>(null);
  const [viewer, setViewer] = useState<any>(null);
  const [currentScene, setCurrentScene] = useState<Scene>(scenes[0]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewParams, setViewParams] = useState({ yaw: 0, pitch: 0, fov: 65 * Math.PI / 180 });

  const yawRef = useRef(0);

  // Initialize Viewer
  useEffect(() => {
    const panoElement = panoRef.current;
    if (!panoElement) return;

    let viewerInstance: any = null;

    import("marzipano").then((Marzipano) => {
      const viewerOpts = {
        controls: {
          mouseViewMode: "drag",
        },
      };

      viewerInstance = new Marzipano.Viewer(panoElement, viewerOpts);
      setViewer(viewerInstance);
      setIsLoaded(true);

      // Listen to view changes
      viewerInstance.addEventListener("viewChange", () => {
        const view = viewerInstance.view();
        if (view) {
          const currentYaw = view.yaw();
          yawRef.current = currentYaw;
          setViewParams({
            yaw: currentYaw,
            pitch: view.pitch(),
            fov: view.fov(),
          });
        }
      });
    });

    return () => {
      if (viewerInstance) {
        viewerInstance.destroy();
      }
    };
  }, []);

  const scenesRef = useRef<Map<string, any>>(new Map());

  const [isBacktracking, setIsBacktracking] = useState(false);

  // Switch Scene & Update Hotspots
  useEffect(() => {
    if (!viewer || !isLoaded) return;

    import("marzipano").then((Marzipano) => {
      try {
        let scene = scenesRef.current.get(currentScene.id);
        
        // Determine initial yaw based on entry point and navigation direction
        let targetYaw = 0;
        let priorityHotspot = null;

        if (isBacktracking) {
            // If we are going back, look for "Regresar" or "Volver" to keep the flow
            priorityHotspot = currentScene.hotspots.find(h => 
                h.text?.includes("Regresar") || h.text?.includes("Volver")
            );
        } else {
            // Default forward: Look for "Continuar", "Ir a", or "Ruta"
            priorityHotspot = currentScene.hotspots.find(h => 
                h.text === "Continuar" || h.text?.startsWith("Ir a") || h.text?.startsWith("Ruta")
            );
        }

        if (priorityHotspot) {
            targetYaw = priorityHotspot.yaw;
        } else if (currentScene.hotspots.length > 0) {
            // Fallback to any arrow if specific one not found
            targetYaw = currentScene.hotspots[0].yaw;
        }

        if (!scene) {
          const source = Marzipano.ImageUrlSource.fromString(currentScene.image);
          const geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);
          const limiter = Marzipano.RectilinearView.limit.traditional(4000, 100 * Math.PI / 180);
          const view = new Marzipano.RectilinearView(
            { yaw: targetYaw, pitch: 0, fov: 65 * Math.PI / 180 },
            limiter
          );

          scene = viewer.createScene({
            source: source,
            geometry: geometry,
            view: view,
            pinFirstLevel: true,
          });

          // Add hotspots but keep them hidden initially
          currentScene.hotspots.forEach((hotspot) => {
            const element = document.createElement("div");
            // Add a class to hide initially
            element.classList.add("opacity-0", "transition-opacity", "duration-500");
            
            if (hotspot.type === "arrow") {
              // Google Maps style floor arrow
              element.className = "floor-hotspot opacity-0 transition-opacity duration-500"; // Ensure class is set
              element.innerHTML = `
                <div class="relative group cursor-pointer transform transition-transform hover:scale-110">
                  <div class="w-16 h-16 flex items-center justify-center">
                    <div class="absolute inset-0 bg-white/80 rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-white drop-shadow-lg transform rotate-0">
                      <path d="M12 2L12 22M12 2L5 9M12 2L19 9" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                    </svg>
                  </div>
                  <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    ${hotspot.text || "Ir aquí"}
                  </div>
                </div>
              `;
            } else {
              // Standard info hotspot
              element.className = "hotspot opacity-0 transition-opacity duration-500";
              element.innerHTML = `
                <div class="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7-7 7 7"/></svg>
                </div>
                <div class="mt-2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  ${hotspot.text || "Info"}
                </div>
              `;
            }
            
            element.addEventListener("click", () => {
              const target = scenes.find((s) => s.id === hotspot.targetSceneId);
              if (target) {
                // Determine if we are going back
                const isBack = hotspot.text?.includes("Regresar") || hotspot.text?.includes("Volver");
                setIsBacktracking(!!isBack);
                setCurrentScene(target);
              }
            });

            try {
              scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
            } catch (e) {
              console.warn("Error creating hotspot:", e);
            }
          });

          scenesRef.current.set(currentScene.id, scene);
        } else {
          // If scene exists, update view to target yaw
          try {
            scene.view().setParameters({ yaw: targetYaw });
          } catch (e) {
            console.warn("Error updating view:", e);
          }
        }

        // Preload adjacent scenes
        const preloadScenes = () => {
          currentScene.hotspots.forEach(hotspot => {
            const targetId = hotspot.targetSceneId;
            const targetScene = scenes.find(s => s.id === targetId);
            if (targetScene && !scenesRef.current.has(targetId)) {
              try {
                 Marzipano.ImageUrlSource.fromString(targetScene.image);
              } catch (e) {
                 console.warn("Error preloading", targetId, e);
              }
            }
          });
        };
        
        setTimeout(preloadScenes, 1000);

        // Switch scene with error handling
        try {
          scene.switchTo({
            transitionDuration: 500,
            transitionLostContext: true
          }, () => {
            // Callback when transition completes: Show hotspots
            const container = scene.hotspotContainer();
            if (container) {
                const hotspots = container.listHotspots();
                hotspots.forEach((h: any) => {
                    if (h.domElement()) {
                        h.domElement().classList.remove("opacity-0");
                    }
                });
            }
          });
        } catch (e) {
          console.error("Error switching scene:", e);
          scenesRef.current.clear();
        }
      } catch (error) {
        console.error("Error in scene setup:", error);
        scenesRef.current.clear();
      }
    });
  }, [viewer, currentScene, isLoaded, isBacktracking]);

  const handleResetView = () => {
    if (viewer) {
      viewer.view().setParameters({ yaw: 0, pitch: 0, fov: Math.PI / 4 });
    }
  };

  return (
    <div id="tour-container" className="min-h-screen w-full bg-black flex flex-col relative">
      {/* Viewer Container */}
      <div id="tour-viewer-wrapper" className="relative w-full h-screen overflow-hidden">
        <div id="pano-container" ref={panoRef} className="absolute inset-0 w-full h-full" />
        
        {/* Top Overlay */}
        <div id="tour-overlay" className="absolute top-4 left-4 z-10 bg-black/50 text-white p-4 rounded backdrop-blur-md border border-white/10">
          <h1 id="tour-scene-name" className="text-2xl font-bold">{currentScene.name}</h1>
          <p id="tour-instructions" className="text-sm opacity-80">Arrastra para explorar • Clic en flechas para moverte</p>
          <button 
            id="tour-exit-btn"
            onClick={() => router.push("/")}
            className="mt-2 flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Salir del recorrido
          </button>
        </div>

        {/* Compass */}
        <div id="tour-compass-container" className="absolute top-4 right-4 z-10">
          <Compass yaw={viewParams.yaw + (currentScene.northOffset || 0)} onReset={handleResetView} />
        </div>

        {/* Minimap (Bottom Right) */}
        <div id="tour-minimap-container" className="absolute bottom-4 right-4 z-10 hidden md:block">
          <Minimap 
            scenes={scenes} 
            currentScene={currentScene} 
            yaw={viewParams.yaw + (currentScene.northOffset || 0)}
          />
        </div>
      </div>

      {/* Global Styles for Hotspots (could be moved to CSS file) */}
      <style jsx global>{`
        .floor-hotspot {
          transform: rotateX(60deg); /* Perspective effect for floor */
        }
      `}</style>
    </div>
  );
}
