"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { scenes, Scene } from "./data";
import { Minimap } from "../../components/tour/Minimap";
import { Compass } from "../../components/tour/Compass";
import { LogOut, Info, PlayCircle } from "lucide-react";
import { MultimediaOverlay } from "../../components/tour/MultimediaOverlay";

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
        stageType: "webgl", // Force WebGL for performance
        controls: {
          mouseViewMode: "drag",
          touchViewMode: "drag", // Ensure touch works
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
  const [activeMedia, setActiveMedia] = useState<{ title: string, description: string, url?: string, type: "image" | "video" } | null>(null);

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
          // New Tiled Source Logic using Sharp/Google layout structure
          const urlPrefix = currentScene.image;
          const source = Marzipano.ImageUrlSource.fromString(
            `${urlPrefix}/{z}.webp`,
            { cubeMapPreviewUrl: null }
          );

          // Define multi-resolution levels matching Sharp output (512, 1024, 2048, 4096, 8192)
          const geometry = new Marzipano.EquirectGeometry([
            { width: 512 },
            { width: 1024 },
            { width: 2048 },
            { width: 4096 },
            { width: 8192 }
          ]);

          const limiter = Marzipano.RectilinearView.limit.traditional(4096, 100 * Math.PI / 180);
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
              element.className = "floor-hotspot opacity-0 transition-opacity duration-500 transform-gpu";
              element.innerHTML = `
                <div class="relative group cursor-pointer transform transition-transform active:scale-95 md:hover:scale-110">
                  <div class="w-16 h-16 flex items-center justify-center">
                    <div class="absolute inset-0 bg-white/80 rounded-full blur-md opacity-50 md:group-hover:opacity-80 transition-opacity"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-white drop-shadow-lg transform rotate-0 shadow-black">
                      <path d="M12 2L12 22M12 2L5 9M12 2L19 9" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                    </svg>
                  </div>
                  <div class="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                    ${hotspot.text || "Ir aquí"}
                  </div>
                </div>
              `;
            } else if (hotspot.type === "multimedia") {
              // Multimedia Hotspot (Icon or Invisible)
              // For now, let's make it a distinct icon
              element.className = "hotspot opacity-0 transition-opacity duration-500 transform-gpu";
              element.innerHTML = `
                <div class="w-12 h-12 bg-blue-600/90 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)] cursor-pointer hover:scale-110 transition-transform text-white border-2 border-white/80 animate-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                </div>
                <div class="mt-2 px-3 py-1.5 bg-blue-900/80 text-white text-xs font-bold rounded-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none text-center shadow-lg border border-blue-500/30">
                  ${hotspot.text || "Ver Multimedia"}
                </div>
              `;
            } else {
              // Standard info hotspot
              element.className = "hotspot opacity-0 transition-opacity duration-500 transform-gpu";
              element.innerHTML = `
                <div class="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer active:scale-95 md:hover:scale-110 transition-transform text-primary border-2 border-white/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7-7 7 7"/></svg>
                </div>
                <div class="mt-2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none text-center">
                  ${hotspot.text || "Info"}
                </div>
              `;
            }

            element.addEventListener("click", () => {
              if (hotspot.type === "multimedia") {
                // Trigger Overlay Sync
                if (hotspot.media) {
                  setActiveMedia(hotspot.media);
                }
              } else {
                const target = scenes.find((s) => s.id === hotspot.targetSceneId);
                if (target) {
                  // Determine if we are going back
                  const isBack = hotspot.text?.includes("Regresar") || hotspot.text?.includes("Volver");
                  setIsBacktracking(!!isBack);
                  setCurrentScene(target);
                }
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

        // IMPROVED PRELOADING: Correctly create Image objects to force browser cache
        const preloadScenes = () => {
          currentScene.hotspots.forEach(hotspot => {
            const targetId = hotspot.targetSceneId;
            const targetScene = scenes.find(s => s.id === targetId);
            if (targetScene && targetScene.image) {
              // console.log("DEBUG: Preloading target", targetScene.id, targetScene.image);
              // Use core Image constructor to prefetch resource into browser disk cache
              // Tiled update: Preload the low-res preview tile (Level 0, tile 0,0)
              const img = new window.Image();
              img.crossOrigin = "anonymous";
              img.src = `${targetScene.image}/0.webp`;
            } else {
              console.warn("DEBUG: Skipping preload for", hotspot.targetSceneId, targetScene);
            }
          });
        };

        // Delay preloading slightly to prioritize current scene render
        setTimeout(preloadScenes, 1500);

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
    <div id="tour-container" className="fixed inset-0 w-full h-full bg-black flex flex-col z-50">
      {/* Mobile Warning Overlay */}
      <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black p-8 text-center md:hidden">
        <div className="max-w-xs space-y-6">
          <p className="text-lg text-white font-medium leading-relaxed">
            Actualmente, el recorrido está disponible únicamente en su versión para escritorio. La compatibilidad con dispositivos móviles estará disponible próximamente.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            Volver al Inicio
          </button>
        </div>
      </div>

      {/* Multimedia Overlay Layer */}
      <MultimediaOverlay
        isOpen={!!activeMedia}
        onClose={() => setActiveMedia(null)}
        data={activeMedia}
      />

      {/* Viewer Container */}
      <div id="tour-viewer-wrapper" className="relative w-full h-full overflow-hidden">
        <div id="pano-container" ref={panoRef} className="absolute inset-0 w-full h-full" />

        {/* Top Overlay */}
        <div id="tour-overlay" className="absolute top-4 left-4 z-10 bg-black/60 text-white p-3 md:p-4 rounded-xl backdrop-blur-md border border-white/10 max-w-[80%] md:max-w-md shadow-2xl">
          <h1 id="tour-scene-name" className="text-xl md:text-2xl font-bold truncate leading-tight">{currentScene.name}</h1>
          <p id="tour-instructions" className="text-xs md:text-sm opacity-80 mt-1 hidden md:block">Arrastra para explorar • Clic en flechas para moverte</p>
          <button
            id="tour-exit-btn"
            onClick={() => router.push("/")}
            className="mt-3 flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg text-xs md:text-sm transition-colors active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            Salir
          </button>
        </div>

        {/* Compass */}
        <div id="tour-compass-container" className="absolute top-4 right-4 z-10 opacity-80 hover:opacity-100 transition-opacity">
          <Compass yaw={viewParams.yaw + (currentScene.northOffset || 0)} onReset={handleResetView} />
        </div>

        {/* Minimap (Bottom Right) - Collapsible on mobile could be better, but hidden on smaller mobile is safe for now unless user asks */}
        <div id="tour-minimap-container" className="absolute bottom-4 right-4 z-10 hidden md:block opacity-90 hover:opacity-100 transition-opacity">
          <Minimap
            scenes={scenes}
            currentScene={currentScene}
            yaw={viewParams.yaw + (currentScene.northOffset || 0)}
          />
        </div>
      </div>

      {/* Global Styles for Hotspots */}
      <style jsx global>{`
        .floor-hotspot {
          transform: rotateX(60deg); /* Perspective effect for floor */
        }
      `}</style>
    </div>
  );
}