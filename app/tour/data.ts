export interface Hotspot {
  yaw: number;
  pitch: number;
  targetSceneId: string;
  text: string;
  type: "arrow" | "info" | "multimedia" | "link";
  link?: string;
  media?: {
    title: string;
    description: string;
    url?: string;
    type: "image" | "video";
  };
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
  "scene-01-1-scene-01": 1.9441130738975474,
  "scene-01-scene-01-1": 0.9537402166772537,
  "scene-01-scene-02": -0.19342755930858146,

  "scene-02-scene-01": 3.0051791981037645,
  "scene-02-scene-03": -0.14477247405818616,

  "scene-03-scene-02": 3.0193367015674326,
  "scene-03-scene-04": -0.1393885893500748,

  "scene-04-scene-03": 3.0253062120534224,
  "scene-04-scene-05": -0.10078606793760514,

  "scene-05-scene-04": 3.002492651621681,
  "scene-05-scene-06": 0.36065380000536607,
  "scene-05-scene-A-01": -1.6550912820426014,
  "scene-05-scene-C-01": 0.8782156554354756,
  "scene-05-scene-D-01": 2.1201872568567293,

  "scene-06-scene-07": -0.9073618262581284,

  "scene-07-scene-06": 2.706115238954535,

  "scene-08-scene-07": 2.271199624041664,
  "scene-08-scene-09": -2.9987611371988905,

  "scene-09-1-scene-09": -2.996225533736851,
  "scene-09-scene-08": 1.5060763461059619,
  "scene-09-scene-09-1": -0.9457437226231136,
  "scene-09-scene-B-01": -2.3510900430762085,

  "scene-10-scene-09": 1.1616403031751439,

  "scene-11-scene-10": 1.4076896972315343,
  "scene-11-scene-12": -1.462290132989665,

  "scene-12-scene-11": 1.2602934041624696,
  "scene-12-scene-13": -2.9606174320609693,

  "scene-13-scene-12": 1.7376082507863684,
  "scene-13-scene-14": -1.3332027053226412,

  "scene-14-scene-13": 2.548689461757421,

  "scene-A-01-scene-05": -1.6945979780517284,
  "scene-A-01-scene-A-01": -1.5865317129466021,
  "scene-A-01-scene-A-02": -0.07639439936225223,
  "scene-A-01-scene-B-01": 1.445948535973872,

  "scene-A-02-scene-A-01": 2.811105666594834,
  "scene-A-02-scene-A-03": -0.3304858489429563,

  "scene-A-03-scene-A-02": -3.1330832008863894,
  "scene-A-03-scene-A-04": -0.013031953083732617,

  "scene-A-04-1-scene-A-04": 1.706292784428653,
  "scene-A-04-scene-A-03": -2.7775655957265393,
  "scene-A-04-scene-A-04-1": -0.226672667332263,
  "scene-A-04-scene-A-05": 0.34588431870029446,

  "scene-A-05-scene-A-04": -2.1555013291252454,
  "scene-A-05-scene-A-06": 0.9047204808895106,

  "scene-A-06-scene-A-05": -0.6525250060977594,

  "scene-B-01-scene-09": -2.815739741724034,
  "scene-B-01-scene-A-01": -1.5815219443108965,
  "scene-B-01-scene-B-02": 0.01912988241731739,

  "scene-B-02-1-scene-B-02": 3.133436601545119,
  "scene-B-02-scene-B-01": 2.749065549330286,
  "scene-B-02-scene-B-02-1": 0.5518282880548142,
  "scene-B-02-scene-B-03": -0.35596131420641086,

  "scene-B-03-scene-B-02": -0.14537212707881686,

  "scene-C-03-scene-C-04": -2.713814394646711,
  "scene-C-04-scene-C-05": 0.07119309671104723,
  "scene-C-05-scene-C-06": 2.6285476630974483,
  "scene-C-06-scene-C-05": 2.6475456404219013,

  "scene-D-01-scene-05": 2.791235135334059,
  "scene-D-01-scene-D-02": -3.024460422384994,

  "scene-D-02-scene-D-01": 1.2185287587600957,
  "scene-D-02-scene-D-03": 2.7359898870185244,
  "scene-D-02-scene-E-01": -0.4167074670442439,

  "scene-D-03-scene-D-02": -2.980030873383246,
  "scene-D-03-scene-D-04": 0.14763169018423206,

  "scene-D-04-scene-D-03": 3.1363535577025434,
  "scene-D-04-scene-D-05": -0.07342745454843502,
  "scene-D-04-1-scene-D-04": -3.1022837349059014,

  "scene-D-05-scene-D-04": 3.0060141032904664,

  "scene-E-01-scene-D-02": 1.570773558165639,
  "scene-E-01-scene-E-02": -3.133641982221439,
  "scene-E-01-1-scene-E-01": 3.036001108715663,
  "scene-E-01-scene-E-01-1": -0.23716208791007176,

  "scene-E-02-scene-E-01": 2.9163721381805825,
  "scene-E-02-scene-E-03": -0.22471295748117903,

  "scene-E-03-scene-E-02": 2.7151756009929713,
  "scene-E-03-scene-E-03-1": 0.504190612133895,
  "scene-E-03-1-scene-E-03": 3.050519115818309,
  "scene-E-03-scene-E-04": -0.40726978015633897,

  "scene-E-04-scene-E-03": 2.712805117239265,
  "scene-E-04-scene-E-05": -0.4231872808232282,

  "scene-E-05-scene-E-04": 2.8073936289877146,
  "scene-E-05-scene-E-06": -0.13043468266550207,

  "scene-E-06-scene-E-05": -1.8855897675001714,


  "scene-08-multimedia-trigger": 0.058991297479821014,
  "scene-D-05-multimedia-trigger": -0.1114269267056045,
  "scene-E-06-multimedia-trigger": -0.9908810098089873,
  "scene-E-01-1-multimedia-trigger": -0.08801306798912023,
  "scene-A-05-multimedia-trigger": -0.3305385398472609,
  "scene-12-multimedia-trigger": -0.4361042862622355,
  "scene-C-06-multimedia-trigger": -0.46912127043477625,
  "scene-B-02-1-multimedia-trigger": -0.3670569620966617,
  "scene-D-04-1-multimedia-trigger": -0.05899129747983167,
};

export const manualHotspotPitches: Record<string, number> = {


  "scene-01-1-scene-01": 0.22723859057433415,
  "scene-01-scene-01-1": -0.006034892583759444,
  "scene-01-scene-02": -0.0017242550239338073,

  "scene-02-scene-01": 0.09761280924737648,
  "scene-02-scene-03": 0.01979456402354529,

  "scene-03-scene-02": 0.04329111720781853,
  "scene-03-scene-04": 0.03362297296650496,

  "scene-04-scene-03": 0.033555763584530496,
  "scene-04-scene-05": 0.03267292116128928,

  "scene-05-scene-04": 0.006357244082682456,
  "scene-05-scene-06": 0.12123023775717101,
  "scene-05-scene-A-01": 0.01717431238593292,
  "scene-05-scene-C-01": 0.1035243389119529,
  "scene-05-scene-D-01": 0.09114665106166342,

  "scene-06-scene-07": 0.28930258557033994,

  "scene-07-scene-06": 0.1645977485038692,

  "scene-08-scene-07": 0.3082703366784436,
  "scene-08-scene-09": 0.09662550271237436,

  "scene-09-1-scene-09": 0.2193271337811975,
  "scene-09-scene-08": 0.10887540106115523,
  "scene-09-scene-09-1": 0.12373303736464258,
  "scene-09-scene-B-01": 0.1373046948433263,

  "scene-10-scene-09": 0.24749029322126503,

  "scene-11-scene-10": 0.2991451002782348,
  "scene-11-scene-12": 0.2490644470850647,

  "scene-12-scene-11": 0.29697728374104315,
  "scene-12-scene-13": 0.03394730264380641,

  "scene-13-scene-12": 0.2767073247439349,
  "scene-13-scene-14": 0.040445623696339084,

  "scene-14-scene-13": 0.18792938292719796,

  "scene-A-01-scene-05": 0.027206532062006517,
  "scene-A-01-scene-A-01": 0.017509028794417958,
  "scene-A-01-scene-A-02": -0.01662293786197111,
  "scene-A-01-scene-B-01": 0.026396745361919827,

  "scene-A-02-scene-A-01": 0.013980627520250977,
  "scene-A-02-scene-A-03": -0.02327744282298383,

  "scene-A-03-scene-A-02": 0.002225379983016751,
  "scene-A-03-scene-A-04": -0.01876096543800898,

  "scene-A-04-1-scene-A-04": 0.5838504026827724,
  "scene-A-04-scene-A-03": -0.015504805173808478,
  "scene-A-04-scene-A-04-1": -0.052517247321961946,
  "scene-A-04-scene-A-05": -0.012672100491641913,

  "scene-A-05-scene-A-04": -0.013168937508867273,
  "scene-A-05-scene-A-06": 0.051905677910704995,

  "scene-A-06-scene-A-05": 0.023300294977595115,

  "scene-B-01-scene-09": 0.19732435676987237,
  "scene-B-01-scene-A-01": 0.21889453707111883,
  "scene-B-01-scene-B-02": 0.01698880438749839,

  "scene-B-02-1-scene-B-02": 0.11215741316353878,
  "scene-B-02-scene-B-01": 0.05677071448699422,
  "scene-B-02-scene-B-02-1": 0.017907878701285185,
  "scene-B-02-scene-B-03": -0.006030096072453972,

  "scene-B-03-scene-B-02": 0.02413957033489922,

  "scene-C-03-scene-C-04": 0.036197819748810645,
  "scene-C-04-scene-C-05": -0.1387983506922854,
  "scene-C-05-scene-C-06": 0.09007616202900337,
  "scene-C-06-scene-C-05": 0.1582105176318258,

  "scene-D-01-scene-05": 0.7040462105995537,
  "scene-D-01-scene-D-02": 0.026166086824551016,

  "scene-D-02-scene-D-01": 0.6877035568083727,
  "scene-D-02-scene-D-03": 0.3120827736852725,
  "scene-D-02-scene-E-01": 0.39875574336820563,

  "scene-D-03-scene-D-02": 0.35572772159989796,
  "scene-D-03-scene-D-04": 0.06638381842109098,

  "scene-D-04-scene-D-03": 0.3152093752580072,
  "scene-D-04-scene-D-05": 0.11400195250007172,
  "scene-D-04-1-scene-D-04": 0.05800626129286002,

  "scene-D-05-scene-D-04": 0.4101827794233017,

  "scene-E-01-scene-D-02": 0.3456826199701375,
  "scene-E-01-scene-E-02": 0.2788502638655199,
  "scene-E-01-1-scene-E-01": 0.43351385612903925,
  "scene-E-01-scene-E-01-1": 0.4504032955568391,

  "scene-E-02-scene-E-01": 0.4156770807191634,
  "scene-E-02-scene-E-03": 0.373603061641095,

  "scene-E-03-scene-E-02": 0.4127697762151499,
  "scene-E-03-scene-E-03-1": 0.11057422589695776,
  "scene-E-03-scene-E-04": 0.3093260806729674,
  "scene-E-03-1-scene-E-03": 0.33307543773653947,

  "scene-E-04-scene-E-05": 0.38570865218097694,
  "scene-E-04-scene-E-03": 0.5015642594297418,

  "scene-E-05-scene-E-04": 0.369833297916605,
  "scene-E-05-scene-E-06": 0.21413498921728724,

  "scene-E-06-scene-E-05": 0.4922090705853073,
  "scene-08-multimedia-trigger": 0.22280429204337437,
  "scene-12-multimedia-trigger": 0.07969267664071822,
  "scene-A-05-multimedia-trigger": 0.16362460916159804,
  "scene-B-02-1-multimedia-trigger": 0.297107842951327,
  "scene-C-06-multimedia-trigger": 0.1894979170860296,
  "scene-D-04-1-multimedia-trigger": 0.1883835960742175,
  "scene-D-05-multimedia-trigger": 0.12594788994676165,
  "scene-E-01-1-multimedia-trigger": 0.30680631256521096,
  "scene-E-06-multimedia-trigger": 0.14593961850972548,
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

// 🎥 CONTENIDO MULTIMEDIA (Videos)
// Mapeo de SceneID -> Contenido
const multimediaContent: Record<string, { title: string; description: string; url: string; delay?: number }> = {
  // Documentales
  "scene-D-05": {
    title: "Documental: Alberto",
    description: "Historia y legado de Alberto en el cuerpo de bomberos.",
    url: "https://youtu.be/oEdwx2jUHGU"
  },
  "scene-E-06": {
    title: "Documental: Rodolfo",
    description: "Conoce la historia de Rodolfo.",
    url: "https://youtu.be/nYEwDB5c364"
  },
  "scene-E-01-1": {
    title: "Documental: Castillo",
    description: "Historia sobre el Castillo.",
    url: "https://youtu.be/ozA8WJ1nOvs"
  },

  // Juanjo
  "scene-A-05": {
    title: "Juanjo: Parte 1",
    description: "Primera parte del recorrido con Juanjo.",
    url: "https://youtu.be/G2_CkPew2wM"
  },
  "scene-12": {
    title: "Juanjo: Parte 2",
    description: "Segunda parte del recorrido con Juanjo.",
    url: "https://youtu.be/Y-MVITZ7i4c"
  },
  "scene-C-06": {
    title: "Juanjo: Parte 3",
    description: "Tercera parte del recorrido con Juanjo.",
    url: "https://youtu.be/roCOe_NZb8o"
  },

  // Raquel
  "scene-08": {
    title: "Raquel: Parte 1",
    description: "Primera parte de la historia de Raquel.",
    url: "https://youtu.be/Gtt7RXFHVYg"
  },
  "scene-B-02-1": {
    title: "Raquel: Parte 2",
    description: "Segunda parte de la historia de Raquel.",
    url: "https://youtu.be/jIa58FBDW7c"
  },
  "scene-D-04-1": {
    title: "Raquel: Parte 3",
    description: "Tercera parte de la historia de Raquel.",
    url: "https://youtu.be/KOug8elLuWY"
  },
};

// 🎯 RUTA PERSONALIZADA: Grafo de navegación (Placeholder para evitar errores en Minimap)
// TODO: Reconstruir grafo basado en hotspots si se desea mostrar líneas
export const tourGraph: TourGraphNode[] = [];

// --- DEFINICIÓN DE ARCHIVOS ---
// Lista plana de todos los archivos encontrados en la estructura de carpetas
const rawFiles = [
  // RUTA (Raíz)
  "RUTA/01.png", "RUTA/01.1.png", "RUTA/02.png", "RUTA/03.png", "RUTA/04.png", "RUTA/05.png", "RUTA/06.png", "RUTA/07.png", "RUTA/08.png", "RUTA/09.png", "RUTA/09.1.png", "RUTA/10.png", "RUTA/11.png", "RUTA/12.png", "RUTA/13.png", "RUTA/14.png",
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
  // Examples: "01.jpg", "10.1.jpg", "RUTA A/A-01.jpg", "RUTA B/B-02.1.jpg"
  const parts = filepath.split("/");
  const filename = parts[parts.length - 1];
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");

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

const getHotspotYaw = (currentSceneId: string, targetSceneId: string, currentCoords: { x: number, y: number }, targetCoords: { x: number, y: number }, northOffset: number, defaultYaw: number = 0) => {
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

const getHotspotPitch = (currentSceneId: string, targetSceneId: string) => {
  const key = `${currentSceneId}-${targetSceneId}`;
  if (manualHotspotPitches[key] !== undefined) {
    return manualHotspotPitches[key];
  }
  return 0.1; // Default pitch
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
        pitch: getHotspotPitch(id, next.id),
        targetSceneId: next.id,
        text: getNavigationText(getSceneTitle(next.group, next.number, next.decimal)),
        type: "arrow"
      });
    }
    if (prev) {
      hotspots.push({
        yaw: getHotspotYaw(id, prev.id, currentCoords, currentCoords, northOffset, Math.PI), // Default Back
        pitch: getHotspotPitch(id, prev.id),
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
        pitch: getHotspotPitch(id, main.id),
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
        pitch: getHotspotPitch(id, decimalNode.id),
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
      pitch: getHotspotPitch(id, routeA.id),
      targetSceneId: routeA.id,
      text: getNavigationText(getSceneTitle(routeA.group, routeA.number, routeA.decimal)),
      type: "arrow"
    });
    if (routeC) hotspots.push({
      yaw: getHotspotYaw(id, routeC.id, currentCoords, currentCoords, northOffset, Math.PI / 2),
      pitch: getHotspotPitch(id, routeC.id),
      targetSceneId: routeC.id,
      text: getNavigationText(getSceneTitle(routeC.group, routeC.number, routeC.decimal)),
      type: "arrow"
    });
    if (routeD) hotspots.push({
      yaw: getHotspotYaw(id, routeD.id, currentCoords, currentCoords, northOffset, Math.PI / 2 + 0.5),
      pitch: getHotspotPitch(id, routeD.id),
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
      pitch: getHotspotPitch(id, routeB.id),
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
      pitch: getHotspotPitch(id, routeE.id),
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
      pitch: getHotspotPitch(id, root05.id),
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
      pitch: getHotspotPitch(id, root05.id),
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
      pitch: getHotspotPitch(id, a01.id),
      targetSceneId: a01.id,
      text: `Volver a ${getSceneTitle(a01.group, a01.number, a01.decimal)}`,
      type: "arrow"
    });

    // New: B-01 -> 09
    const root09 = findScene("ROOT", 9);
    if (root09) hotspots.push({
      yaw: getHotspotYaw(id, root09.id, currentCoords, currentCoords, northOffset, 0), // Default yaw, calibrate manually
      pitch: getHotspotPitch(id, root09.id),
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
      pitch: getHotspotPitch(id, d02.id),
      targetSceneId: d02.id,
      text: `Volver a ${getSceneTitle(d02.group, d02.number, d02.decimal)}`,
      type: "arrow"
    });
  }

  // --- LINK CONTENT INJECTION ---
  const linkContent: Record<string, { title: string; link: string; text?: string }> = {
    "scene-13": { title: "Kick: codigo1032", link: "https://kick.com/codigo1032", text: "Ver Kick" },
    "scene-10": { title: "Concurso", link: "https://forms.gle/fBeB7Zv9yVu33hDs6", text: "Ir a Concurso" },
    "scene-A-04-1": { title: "Comic: Emergencia Confirmada", link: "https://www.webtoons.com/es/canvas/1025-emergencia-confirmada/list?title_no=1098787", text: "Leer Comic" },
    "scene-09-1": { title: "Audiodrama", link: "https://open.spotify.com/show/5zFyJWpSzdhxS5LP6yEIBZ?si=34b2331d17ab4fa6", text: "Escuchar" }
  };

  if (linkContent[id]) {
    const info = linkContent[id];
    hotspots.push({
      yaw: 0,
      pitch: 0,
      targetSceneId: "link-trigger",
      text: info.text || "Info",
      type: "link",
      link: info.link
    });
  }

  // --- MULTIMEDIA INJECTION ---
  if (multimediaContent[id]) {
    const media = multimediaContent[id];
    hotspots.push({
      yaw: 0, // Default yaw, user must position it in Editor
      pitch: 0,
      targetSceneId: "multimedia-trigger", // Dummy ID used by Overlay trigger
      text: "Ver Video",
      type: "multimedia",
      media: {
        title: media.title,
        description: media.description,
        type: "video",
        url: media.url // YouTube link
      }
    });
  }

  return {
    id,
    name: getSceneTitle(group, number, decimal),
    // URL for tiled structure: tour-tiles/{path_without_ext}/output
    image: getAssetUrl(`assets/tour/tiles/${ps.filename.replace(/\.[^/.]+$/, "")}/output`),
    hotspots,
    coordinates: currentCoords,
    northOffset,
  };
});