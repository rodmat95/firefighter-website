export interface Hotspot {
  yaw: number;
  pitch: number;
  targetSceneId: string;
  text: string;
  type: "arrow" | "info";
}

export interface Scene {
  id: string;
  name: string;
  image: string;
  hotspots: Hotspot[];
  coordinates?: { x: number; y: number }; // For minimap (0-100%)
  northOffset?: number; // Radians
}

export interface TourGraphNode {
  x: number;
  y: number;
  next: number[];
}

// 🧭 CALIBRACIÓN DE NORTE
// Usa http://localhost:3000/north-offset-editor para generar estos valores
export const northOffsets: Record<string, number> = {
  "scene-01": -0.16262002090843097,
  "scene-01-1": 1.8928634837338407,
  "scene-02": 0.12589937102587534,
  "scene-03": 0.12065356389980053,
  "scene-04": 0.0779377058731523,
  "scene-05": 0.07943650790918433,
  "scene-06": 1.0693261347982919,
  "scene-07": 0.5005998800314817,
  "scene-08": 0.9204709852834334,
  "scene-09": -0.5596909847896328,
  "scene-09-1": -1.415326417424133,
  "scene-10": 2.0286318230827884,
  "scene-11": 1.7890068272623942,
  "scene-12": 2.0917552392755496,
  "scene-13": 0.49257201787519733,
  "scene-14": -0.34402947995978295,
  "scene-A-01": -3.0663670964353145,
  "scene-A-02": -2.7453582584367364,
  "scene-A-03": -3.103078358556438,
  "scene-A-04": 2.8001953014685483,
  "scene-A-04-1": -3.078186639364974,
  "scene-A-05": 2.1691055682950076,
  "scene-A-06": 0.10087789893872312,
  "scene-B-01": -3.091899124463602,
  "scene-B-02": -2.7592746617189086,
  "scene-B-02-1": -3.0156996450396925,
  "scene-B-03": 0.1431355944401318,
  "scene-C-01": -1.2781849709594546,
  "scene-C-01-1": -1.7918666174558435,
  "scene-C-02": 1.6296819101388813,
  "scene-C-03": 1.6196879232889785,
  "scene-C-04": -0.927734679930424,
  "scene-C-05": 0.9154051822069214,
  "scene-C-06": -1.4405796816540333,
  "scene-C-07": -3.013037165804189,
  "scene-D-01": 1.6832913546861334,
  "scene-D-02": 0.42791417494449746,
  "scene-D-03": 3.012003992538883,
  "scene-D-04": -3.0881330144226347,
  "scene-D-04-1": 1.4894274325154395,
  "scene-D-05": -2.954401098039689,
  "scene-E-01": 1.6021712587445478,
  "scene-E-01-1": 1.5779052005965006,
  "scene-E-02": -1.3690781678051778,
  "scene-E-03": -1.1638823056612821,
  "scene-E-03-1": 0.08326435501561136,
  "scene-E-04": -1.165411866182044,
  "scene-E-05": -1.3090910047701882,
  "scene-E-06": -2.948987734175816,
};

// 🎯 AJUSTE MANUAL DE FLECHAS
// Usa http://localhost:3000/hotspot-editor para generar estos valores

export const manualHotspotYaws: Record<string, number> = {
  "scene-01-scene-02": -0.17620039118389386,
  "scene-01-scene-01-1": 0.9695990058201875,
  "scene-01-1-scene-01": 1.8198996023060587, // 02->01 becomes 01.1->01
  "scene-02-scene-03": -0.12449781180748687, // 03->04 becomes 02->03
  "scene-02-scene-01-1": 2.998177206477277, // 03->02 becomes 02->01.1
  "scene-03-scene-04": -0.12780162903968062, // 04->05 becomes 03->04
  "scene-03-scene-02": 2.972266376960059, // 04->03 becomes 03->02
  "scene-04-scene-05": -0.07752171809126196, // 05->06 becomes 04->05
  "scene-04-scene-03": 2.9945734795509384, // 05->04 becomes 04->03
  "scene-05-scene-04": 2.9864120020964195, // 06->05 becomes 05->04
  "scene-05-scene-C-01": 0.8484572575950597, // 06->C-01 becomes 05->C-01
  "scene-05-scene-D-01": 2.1393827263806315, // 06->D-01 becomes 05->D-01
  "scene-05-scene-A-01": -1.635339201019228, // 06->A-01 becomes 05->A-01
  "scene-05-scene-06": 0.3381151643293965, // 06->07 becomes 05->06
  "scene-06-scene-07": -0.8129658145775078, // 07->08 becomes 06->07
  "scene-06-scene-05": -2.952643409812538, // 07->06 becomes 06->05
  "scene-07-scene-08": -0.3342310816391638, // 08->09 becomes 07->08
  "scene-07-scene-06": 2.3344149387684663, // 08->07 becomes 07->06
  "scene-08-scene-07": 2.044633274782184, // 09->08 becomes 08->07
  "scene-08-scene-09": -3.028852766949921, // 09->10 becomes 08->09
  "scene-09-scene-08": 1.5170754887707174, // 10->09 becomes 09->08
  "scene-09-scene-09-1": -0.9998114434967604, // 10->10.1 becomes 09->09.1
  "scene-09-scene-10": 0.5618522992896082, // 10->11 becomes 09->10
  "scene-10-scene-09": 1.0700360412601455, // 11->10 becomes 10->09
  "scene-10-scene-11": -2.0380412118490447, // 11->12 becomes 10->11
  "scene-11-scene-10": 1.374414715546921, // 12->11 becomes 11->10
  "scene-11-scene-12": -1.7088801013365789, // 12->13 becomes 11->12
  "scene-12-scene-11": 1.1869276366852564, // 13->12 becomes 12->11
  "scene-12-scene-13": -3.0092171798067433, // 13->14 becomes 12->13
  "scene-13-scene-12": 1.5946412101067837, // 14->13 becomes 13->12
  "scene-13-scene-14": -1.3202631452910154, // 14->15 becomes 13->14
  "scene-14-scene-13": 2.559484578142648, // 15->14 becomes 14->13
  "scene-A-01-scene-A-02": -0.08481520184832192,
  "scene-A-01-scene-05": -1.6846304950488697, // A-01->06 becomes A-01->05
  "scene-A-01-scene-B-01": 1.4488431570859586,
  "scene-B-01-scene-B-02": 0.0188441119394831,
  "scene-A-02-scene-A-03": -0.3259945650531293,
  "scene-A-02-scene-A-01": 2.7623411005901133,
  "scene-A-03-scene-A-04": -0.0029929022617594114,
  "scene-A-03-scene-A-02": -3.139805233225232,
  "scene-A-04-scene-A-03": -2.7878454397033536,
  "scene-A-04-scene-A-04-1": -0.22749258798623728,
  "scene-A-04-scene-A-05": 0.3354366255787422,
  "scene-A-05-scene-A-04": -2.1953930412852607,
  "scene-A-05-scene-A-06": 1.7169378027119349,
  "scene-B-01-scene-A-01": -1.5355543129163998,
  "scene-B-02-scene-B-01": 2.798869464376569,
  "scene-B-02-scene-B-03": -0.34355381345087466,
  "scene-B-02-scene-B-02-1": 0.5488902096025541,
  "scene-B-02-1-scene-B-02": 3.1368730296695535,
  "scene-B-03-scene-B-02": -0.12985198450234137,
  "scene-09-scene-B-01": -2.3493400008092458,
  "scene-B-01-scene-09": -2.8795713693462535,
  "scene-C-01-scene-05": -0.18225618143582345, // C-01->06 becomes C-01->05
  "scene-C-01-1-scene-C-01": 1.9113602548392814,
  "scene-C-01-scene-C-01-1": -1.7093135880303656,
  "scene-C-01-scene-C-02": 1.8039361818741035,
  "scene-C-02-scene-C-01": 1.7338087994394789,
  "scene-C-03-scene-C-02": 0.9131708749085234,
  "scene-C-02-scene-C-03": -1.8519537171142186,
  "scene-C-04-scene-C-03": 2.8365395272102365,
  "scene-C-03-scene-C-04": -2.8703611073605853,
  "scene-C-05-scene-C-06": 2.698775114246992,
  "scene-C-04-scene-C-05": 0.04722369919447189,
  "scene-C-05-scene-C-04": 1.325097238451967,
  "scene-C-06-scene-C-05": 2.6408176949051256,
  "scene-C-07-scene-C-06": -1.8300896360688022,
  "scene-D-01-scene-05": 2.7958012669316172, // D-01->06 becomes D-01->05
  "scene-D-01-scene-D-02": -3.0055644686006335,
  "scene-D-02-scene-D-01": 1.2100112923557127,
  "scene-D-02-scene-E-01": -0.40609031370899196,
  "scene-D-02-scene-D-03": 2.7369881217916046,
  "scene-D-03-scene-D-02": -2.9816151587468056,
  "scene-D-03-scene-D-04": 0.1478998697906917,
  "scene-D-04-scene-D-03": 3.13212090252604,
  "scene-D-04-scene-D-05": -0.07957395558518421,
  "scene-D-04-scene-D-04-1": -1.9547010306985655,
  "scene-D-04-1-scene-D-04": -3.1135971108084544,
  "scene-D-05-scene-D-04": 3.0023272475522447,
  "scene-E-01-scene-D-02": 1.5605437020475597,
  "scene-E-01-scene-E-01-1": -0.03510888862087391,
  "scene-E-01-scene-E-02": -3.139658019613213,
  "scene-E-01-1-scene-E-01": 3.0763910268551236,
  "scene-E-02-scene-E-03": -0.21807461346292456,
  "scene-E-02-scene-E-01": 2.9840348775115775,
  "scene-E-03-scene-E-02": 2.723945539835495,
  "scene-E-03-scene-E-04": -0.43521022731584935,
  "scene-E-03-scene-E-03-1": 0.4976724793806788,
  "scene-E-04-scene-E-05": -0.4397794406362099,
  "scene-E-04-scene-E-03": 2.6933463251232173,
  "scene-E-05-scene-E-06": -0.06710367843185416,
  "scene-E-05-scene-E-04": 2.8587431873446114,
  "scene-E-06-scene-E-05": -1.8364332786126205
};

// 🎯 RUTA PERSONALIZADA: Coordenadas (Generado por Path Editor)
export const tourPath = [
  { x: 69.07, y: 92.04 },
  { x: 71.77, y: 84.08 },
  { x: 63.36, y: 74.77 },
  { x: 63.54, y: 67.6 },
  { x: 63.42, y: 62.55 },
  { x: 63.21, y: 56.76 },
  { x: 65.64, y: 53.79 },
  { x: 65.62, y: 48.95 },
  { x: 65.47, y: 45.35 },
  { x: 49.4, y: 46.55 },
  { x: 42.94, y: 47.45 },
  { x: 51.35, y: 41.44 },
  { x: 51.57, y: 36.58 },
  { x: 51.5, y: 32.13 },
  { x: 43.09, y: 27.78 },
  { x: 40.99, y: 24.32 },
  { x: 54.95, y: 57.66 },
  { x: 54.8, y: 61.11 },
  { x: 54.9, y: 64.64 },
  { x: 54.95, y: 68.62 },
  { x: 58.86, y: 70.72 },
  { x: 54.95, y: 72.82 },
  { x: 58.56, y: 74.77 },
  { x: 46.85, y: 57.51 },
  { x: 46.89, y: 66.5 },
  { x: 43.93, y: 67.61 },
  { x: 47, y: 73.72 },
  { x: 78.83, y: 55.86 },
  { x: 78.83, y: 63.06 },
  { x: 78.83, y: 41.74 },
  { x: 83.48, y: 27.63 },
  { x: 69.22, y: 20.72 },
  { x: 69.22, y: 10.81 },
  { x: 59.96, y: 10.85 },
  { x: 44.79, y: 10.73 },
  { x: 67.86, y: 58.1 },
  { x: 63.51, y: 57.96 },
  { x: 63.79, y: 62.18 },
  { x: 63.51, y: 66.97 },
  { x: 66.97, y: 69.97 },
  { x: 63.36, y: 70.87 },
  { x: 63.54, y: 52.43 },
  { x: 68.1, y: 52.43 },
  { x: 60.06, y: 52.4 },
  { x: 56.46, y: 52.25 },
  { x: 56.46, y: 49.55 },
  { x: 52.1, y: 52.25 },
  { x: 48.05, y: 52.25 },
  { x: 44.14, y: 52.25 },
];

// 🎯 RUTA PERSONALIZADA: Grafo de navegación (Placeholder para evitar errores en Minimap)
// TODO: Reconstruir grafo basado en hotspots si se desea mostrar líneas
export const tourGraph: TourGraphNode[] = [];

// --- DEFINICIÓN DE ARCHIVOS ---
// Lista plana de todos los archivos encontrados en la estructura de carpetas
const rawFiles = [
  // RUTA (Raíz)
  "01.png", "01.1.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png", "08.png", "09.png", "09.1.png", "10.png", "11.png", "12.png", "13.png", "14.png",
  // RUTA A
  "RUTA A/A-01.png", "RUTA A/A-02.png", "RUTA A/A-03.png", "RUTA A/A-04.png", "RUTA A/A-04.1.png", "RUTA A/A-05.png", "RUTA A/A-06.png",
  // RUTA B
  "RUTA B/B-01.png", "RUTA B/B-02.png", "RUTA B/B-02.1.png", "RUTA B/B-03.png",
  // RUTA C
  "RUTA C/C-01.png", "RUTA C/C-01.1.png", "RUTA C/C-02.png", "RUTA C/C-03.png", "RUTA C/C-04.png", "RUTA C/C-05.png", "RUTA C/C-06.png", "RUTA C/C-07.png",
  // RUTA D
  "RUTA D/D-01.png", "RUTA D/D-02.png", "RUTA D/D-03.png", "RUTA D/D-04.png", "RUTA D/D-04.1.png", "RUTA D/D-05.png",
  // RUTA E
  "RUTA E/E-01.png", "RUTA E/E-01.1.png", "RUTA E/E-02.png", "RUTA E/E-03.png", "RUTA E/E-03.1.png", "RUTA E/E-04.png", "RUTA E/E-05.png", "RUTA E/E-06.png",
];

// --- PARSING LOGIC ---

interface ParsedScene {
  id: string;
  filename: string;
  group: string; // "ROOT", "A", "B", "C", "D", "E"
  number: number;
  decimal: number | null;
}

const parseFilename = (filepath: string): ParsedScene => {
  // Examples: "01.png", "10.1.png", "RUTA A/A-01.png", "RUTA B/B-02.1.png"
  const parts = filepath.split("/");
  const filename = parts[parts.length - 1];
  const nameWithoutExt = filename.replace(".png", "");

  let group = "ROOT";
  let numberPart = nameWithoutExt;

  if (nameWithoutExt.includes("-")) {
    const [g, n] = nameWithoutExt.split("-");
    group = g;
    numberPart = n;
  }

  let number = parseInt(numberPart);
  let decimal: number | null = null;

  if (numberPart.includes(".")) {
    const [n, d] = numberPart.split(".");
    number = parseInt(n);
    decimal = parseInt(d);
  }

  // ID construction: scene-01, scene-A-01
  // For decimals: scene-10-1
  let idSuffix = numberPart.replace(".", "-");
  // Pad single digits for better sorting/IDs if needed, but keeping simple for now
  let id = `scene-${group === "ROOT" ? "" : group + "-"}${idSuffix}`;
  
  return {
    id,
    filename: filepath,
    group,
    number,
    decimal
  };
};

const parsedScenes = rawFiles.map(parseFilename);

// Helper to find a scene
const findScene = (group: string, number: number, decimal: number | null = null) => {
  return parsedScenes.find(s => s.group === group && s.number === number && s.decimal === decimal);
};

// --- COORDINATES ---
const getCoordinates = (index: number) => {
  if (tourPath[index]) {
    return tourPath[index];
  }
  // Fallback if index out of bounds
  return { x: 50, y: 50 };
};

// --- HOTSPOT GENERATION ---

const getHotspotYaw = (currentSceneId: string, targetSceneId: string, currentCoords: {x: number, y: number}, targetCoords: {x: number, y: number}, northOffset: number, defaultYaw: number = 0) => {
  const key = `${currentSceneId}-${targetSceneId}`;
  
  // 1. Manual override
  if (manualHotspotYaws[key] !== undefined) {
    return manualHotspotYaws[key];
  }

  // 2. Automatic (if we had coordinates, which we don't really have for the new structure yet)
  // For now, return defaultYaw (which can be set based on "Left", "Right", etc.)
  return defaultYaw - northOffset; 
};

const getSceneTitle = (group: string, number: number, decimal: number | null): string => {
  // ROOT
  if (group === "ROOT") {
    if (number === 1 && decimal === null) return "Entrada";
    if (number === 1 && decimal === 1) return "Monolito";
    if (number >= 2 && number <= 5 && decimal === null) return "Pasillo";
    if (number >= 6 && number <= 8 && decimal === null) return "Cocina";
    if (number === 9 && decimal === null) return "Zona de casilleros";
    if (number === 9 && decimal === 1) return "Comunicaciones";
    if (number === 10 && decimal === null) return "Zona de EPP";
    if (number >= 11 && number <= 14 && decimal === null) return "Sala de máquinas 2";
  }

  // A
  if (group === "A") {
    if (number >= 1 && number <= 6) return "Sala de máquinas";
  }

  // B
  if (group === "B") {
    if (number >= 1 && number <= 3) return "Sala de máquinas";
  }

  // C
  if (group === "C") {
    if (number >= 1 && number <= 2) return "Jardín";
    if (number >= 3 && number <= 4) return "Pampa";
    if (number >= 5 && number <= 7) return "GYM";
  }

  // D
  if (group === "D") {
    if (number === 1) return "Escaleras";
    if (number >= 2 && number <= 5) return "Pasillo 2do piso";
  }

  // E
  if (group === "E") {
    if (number === 1) return "Sala de reuniones"; // Covers 1 and 1.1? User said "escenas e-1 al e-1.1"
    if (number === 3 && decimal === 1) return "Balcón";
    if (number >= 2) return "Museo"; // Covers rest
  }

  return group === "ROOT" ? `Punto ${number}${decimal ? `.${decimal}` : ''}` : `Ruta ${group} - ${number}${decimal ? `.${decimal}` : ''}`;
};

import { getAssetUrl } from "@/lib/assets";

export const scenes: Scene[] = parsedScenes.map((ps, index) => {
  const { id, group, number, decimal } = ps;
  const hotspots: Hotspot[] = [];
  const northOffset = northOffsets[id] || 0;
  
  // Placeholder coords
  const currentCoords = getCoordinates(index); 

  // Helper for context-aware text
  const getNavigationText = (targetTitle: string, isBackwards: boolean = false) => {
    const currentTitle = getSceneTitle(group, number, decimal);
    if (targetTitle === currentTitle) {
      return isBackwards ? "Regresar" : "Continuar";
    }
    return `Ir a ${targetTitle}`;
  };

  // --- AUTOMATIC CONNECTIONS ---

  // 1. Sequential (Next/Prev)
  // Only if no decimal involved (01 -> 02) or strictly within decimal (not handling 09.1 -> 09.2 here unless they exist)
  if (decimal === null) {
    const next = findScene(group, number + 1, null);
    const prev = findScene(group, number - 1, null);

    if (next) {
      hotspots.push({
        yaw: getHotspotYaw(id, next.id, currentCoords, currentCoords, northOffset, 0), // Default Forward
        pitch: 0.1,
        targetSceneId: next.id,
        text: getNavigationText(getSceneTitle(next.group, next.number, next.decimal)),
        type: "arrow"
      });
    }
    if (prev) {
      hotspots.push({
        yaw: getHotspotYaw(id, prev.id, currentCoords, currentCoords, northOffset, Math.PI), // Default Back
        pitch: 0.1,
        targetSceneId: prev.id,
        text: getNavigationText(getSceneTitle(prev.group, prev.number, prev.decimal), true),
        type: "arrow"
      });
    }
  }

  // 2. Decimal Branches (09 <-> 09.1)
  if (decimal !== null) {
    // We are at a decimal node (e.g., 10.1). Link back to main (10).
    const main = findScene(group, number, null);
    if (main) {
      hotspots.push({
        yaw: getHotspotYaw(id, main.id, currentCoords, currentCoords, northOffset, Math.PI),
        pitch: 0.1,
        targetSceneId: main.id,
        text: `Volver a ${getSceneTitle(main.group, main.number, main.decimal)}`, // Always "Volver" for decimal return
        type: "arrow"
      });
    }
  } else {
    // We are at a main node (e.g., 10). Check for decimals (10.1).
    const decimalNode = findScene(group, number, 1); // Assuming .1
    if (decimalNode) {
      hotspots.push({
        yaw: getHotspotYaw(id, decimalNode.id, currentCoords, currentCoords, northOffset, Math.PI / 2), // Default Right?
        pitch: 0.1,
        targetSceneId: decimalNode.id,
        text: getNavigationText(getSceneTitle(decimalNode.group, decimalNode.number, decimalNode.decimal)),
        type: "arrow"
      });
    }
  }

  // --- MANUAL BRANCHING RULES ---

  // Rule: "En 05... comienzan tres rutas: A (Izq), C (Der), D (Der)" (Updated from 06)
  if (group === "ROOT" && number === 5 && decimal === null) {
    const routeA = findScene("A", 1);
    const routeC = findScene("C", 1);
    const routeD = findScene("D", 1);

    if (routeA) hotspots.push({ 
      yaw: getHotspotYaw(id, routeA.id, currentCoords, currentCoords, northOffset, -Math.PI / 2), 
      pitch: 0, 
      targetSceneId: routeA.id, 
      text: getNavigationText(getSceneTitle(routeA.group, routeA.number, routeA.decimal)), 
      type: "arrow" 
    });
    if (routeC) hotspots.push({ 
      yaw: getHotspotYaw(id, routeC.id, currentCoords, currentCoords, northOffset, Math.PI / 2), 
      pitch: 0, 
      targetSceneId: routeC.id, 
      text: getNavigationText(getSceneTitle(routeC.group, routeC.number, routeC.decimal)), 
      type: "arrow" 
    });
    if (routeD) hotspots.push({ 
      yaw: getHotspotYaw(id, routeD.id, currentCoords, currentCoords, northOffset, Math.PI / 2 + 0.5), 
      pitch: 0, 
      targetSceneId: routeD.id, 
      text: getNavigationText(getSceneTitle(routeD.group, routeD.number, routeD.decimal)), 
      type: "arrow" 
    });
  }

  // Rule: "En A-01... comienza la ruta B hacia la izquierda"
  if (group === "A" && number === 1 && decimal === null) {
    const routeB = findScene("B", 1);
    if (routeB) hotspots.push({ 
      yaw: getHotspotYaw(id, routeB.id, currentCoords, currentCoords, northOffset, -Math.PI / 2), 
      pitch: 0, 
      targetSceneId: routeB.id, 
      text: getNavigationText(getSceneTitle(routeB.group, routeB.number, routeB.decimal)), 
      type: "arrow" 
    });
  }

  // Rule: "En D-02... comienza la ruta E"
  if (group === "D" && number === 2 && decimal === null) {
    const routeE = findScene("E", 1);
    if (routeE) hotspots.push({ 
      yaw: getHotspotYaw(id, routeE.id, currentCoords, currentCoords, northOffset, -Math.PI / 2), 
      pitch: 0, 
      targetSceneId: routeE.id, 
      text: getNavigationText(getSceneTitle(routeE.group, routeE.number, routeE.decimal)), 
      type: "arrow" 
    });
  }

  // Rule: "En 09... conexión a B-01"
  if (group === "ROOT" && number === 9 && decimal === null) {
    const routeB01 = findScene("B", 1);
    if (routeB01) hotspots.push({ 
      yaw: getHotspotYaw(id, routeB01.id, currentCoords, currentCoords, northOffset, 0), // Default yaw, calibrate manually
      pitch: 0, 
      targetSceneId: routeB01.id, 
      text: getNavigationText(getSceneTitle(routeB01.group, routeB01.number, routeB01.decimal)), 
      type: "arrow" 
    });
  }

  // Backlinks for branches (Optional but good UX)
  // A-01 -> 05 (Updated from 06)
  if (group === "A" && number === 1 && decimal === null) {
    const root05 = findScene("ROOT", 5);
    if (root05) hotspots.push({ 
      yaw: getHotspotYaw(id, root05.id, currentCoords, currentCoords, northOffset, Math.PI), 
      pitch: 0, 
      targetSceneId: root05.id, 
      text: `Volver a ${getSceneTitle(root05.group, root05.number, root05.decimal)}`, 
      type: "arrow" 
    });
  }
  // C-01 -> 05 (Updated from 06)
  if (group === "C" && number === 1 && decimal === null) {
    const root05 = findScene("ROOT", 5);
    if (root05) hotspots.push({ 
      yaw: getHotspotYaw(id, root05.id, currentCoords, currentCoords, northOffset, Math.PI), 
      pitch: 0, 
      targetSceneId: root05.id, 
      text: `Volver a ${getSceneTitle(root05.group, root05.number, root05.decimal)}`, 
      type: "arrow" 
    });
  }
  // D-01 -> 05 (Updated from 06)
  if (group === "D" && number === 1 && decimal === null) {
    const root05 = findScene("ROOT", 5);
    if (root05) hotspots.push({ 
      yaw: getHotspotYaw(id, root05.id, currentCoords, currentCoords, northOffset, Math.PI), 
      pitch: 0, 
      targetSceneId: root05.id, 
      text: `Volver a ${getSceneTitle(root05.group, root05.number, root05.decimal)}`, 
      type: "arrow" 
    });
  }
  // B-01 -> A-01
  if (group === "B" && number === 1 && decimal === null) {
    const a01 = findScene("A", 1);
    if (a01) hotspots.push({ 
      yaw: getHotspotYaw(id, a01.id, currentCoords, currentCoords, northOffset, Math.PI), 
      pitch: 0, 
      targetSceneId: a01.id, 
      text: `Volver a ${getSceneTitle(a01.group, a01.number, a01.decimal)}`, 
      type: "arrow" 
    });

    // New: B-01 -> 09
    const root09 = findScene("ROOT", 9);
    if (root09) hotspots.push({ 
      yaw: getHotspotYaw(id, root09.id, currentCoords, currentCoords, northOffset, 0), // Default yaw, calibrate manually
      pitch: 0, 
      targetSceneId: root09.id, 
      text: getNavigationText(getSceneTitle(root09.group, root09.number, root09.decimal)), 
      type: "arrow" 
    });
  }
  // E-01 -> D-02
  if (group === "E" && number === 1 && decimal === null) {
    const d02 = findScene("D", 2);
    if (d02) hotspots.push({ 
      yaw: getHotspotYaw(id, d02.id, currentCoords, currentCoords, northOffset, Math.PI), 
      pitch: 0, 
      targetSceneId: d02.id, 
      text: `Volver a ${getSceneTitle(d02.group, d02.number, d02.decimal)}`, 
      type: "arrow" 
    });
  }

  return {
    id,
    name: getSceneTitle(group, number, decimal),
    image: getAssetUrl(`tour/RUTA/${ps.filename}`),
    hotspots,
    coordinates: currentCoords,
    northOffset,
  };
});