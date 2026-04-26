figma.showUI(__html__, { width: 520, height: 760 });

const FONT_OPTIONS = [
  { family: "Inter", style: "Regular" },
  { family: "Inter", style: "Medium" },
  { family: "Inter", style: "Bold" },
  { family: "Roboto", style: "Regular" },
  { family: "Roboto", style: "Medium" },
  { family: "Roboto", style: "Bold" },
  { family: "Open Sans", style: "Regular" },
  { family: "Open Sans", style: "Semibold" },
  { family: "Open Sans", style: "Bold" },
  { family: "Montserrat", style: "Regular" },
  { family: "Montserrat", style: "Medium" },
  { family: "Montserrat", style: "Bold" },
  { family: "Playfair Display", style: "Regular" },
  { family: "Playfair Display", style: "Bold" },
  { family: "Lato", style: "Regular" },
  { family: "Lato", style: "Bold" },
  { family: "Poppins", style: "Regular" },
  { family: "Poppins", style: "Medium" },
  { family: "Poppins", style: "Bold" },
  { family: "Nunito", style: "Regular" },
  { family: "Nunito", style: "Bold" },
  { family: "Raleway", style: "Regular" },
  { family: "Raleway", style: "Bold" },
  { family: "Merriweather", style: "Regular" },
  { family: "Merriweather", style: "Bold" },
  { family: "Oswald", style: "Regular" },
  { family: "Oswald", style: "Medium" },
  { family: "Oswald", style: "Bold" },
  { family: "Source Sans Pro", style: "Regular" },
  { family: "Source Sans Pro", style: "Semibold" },
  { family: "Source Sans Pro", style: "Bold" },
  { family: "Work Sans", style: "Regular" },
  { family: "Work Sans", style: "Medium" },
  { family: "Work Sans", style: "Bold" },
  { family: "DM Sans", style: "Regular" },
  { family: "DM Sans", style: "Medium" },
  { family: "DM Sans", style: "Bold" },
  { family: "Manrope", style: "Regular" },
  { family: "Manrope", style: "Medium" },
  { family: "Manrope", style: "Bold" },
  { family: "Figtree", style: "Regular" },
  { family: "Figtree", style: "Medium" },
  { family: "Figtree", style: "Bold" },
  { family: "Plus Jakarta Sans", style: "Regular" },
  { family: "Plus Jakarta Sans", style: "Medium" },
  { family: "Plus Jakarta Sans", style: "Bold" },
  { family: "Space Grotesk", style: "Regular" },
  { family: "Space Grotesk", style: "Medium" },
  { family: "Space Grotesk", style: "Bold" },
  { family: "Archivo", style: "Regular" },
  { family: "Archivo", style: "Medium" },
  { family: "Archivo", style: "Bold" },
  { family: "IBM Plex Sans", style: "Regular" },
  { family: "IBM Plex Sans", style: "Medium" },
  { family: "IBM Plex Sans", style: "Bold" },
  { family: "Rubik", style: "Regular" },
  { family: "Rubik", style: "Medium" },
  { family: "Rubik", style: "Bold" },
  { family: "Karla", style: "Regular" },
  { family: "Karla", style: "Bold" },
  { family: "Mulish", style: "Regular" },
  { family: "Mulish", style: "Bold" },
  { family: "Quicksand", style: "Regular" },
  { family: "Quicksand", style: "Bold" },
  { family: "Cabin", style: "Regular" },
  { family: "Cabin", style: "Bold" },
  { family: "Bebas Neue", style: "Regular" },
  { family: "Barlow", style: "Regular" },
  { family: "Barlow", style: "Medium" },
  { family: "Barlow", style: "Bold" },
  { family: "PT Sans", style: "Regular" },
  { family: "PT Sans", style: "Bold" },
  { family: "Libre Baskerville", style: "Regular" },
  { family: "Libre Baskerville", style: "Bold" },
  { family: "Crimson Text", style: "Regular" },
  { family: "Crimson Text", style: "Bold" },
  { family: "Cormorant Garamond", style: "Regular" },
  { family: "Cormorant Garamond", style: "Bold" },
  { family: "Abril Fatface", style: "Regular" },
  { family: "Anton", style: "Regular" },
  { family: "Archivo Black", style: "Regular" },
  { family: "Josefin Sans", style: "Regular" },
  { family: "Josefin Sans", style: "Bold" },
  { family: "Urbanist", style: "Regular" },
  { family: "Urbanist", style: "Medium" },
  { family: "Urbanist", style: "Bold" },
  { family: "Sora", style: "Regular" },
  { family: "Sora", style: "Bold" },
  { family: "Outfit", style: "Regular" },
  { family: "Outfit", style: "Medium" },
  { family: "Outfit", style: "Bold" },
  { family: "Titillium Web", style: "Regular" },
  { family: "Titillium Web", style: "Bold" },
  { family: "Exo 2", style: "Regular" },
  { family: "Exo 2", style: "Bold" },
  { family: "Hind", style: "Regular" },
  { family: "Hind", style: "Bold" },
  { family: "Teko", style: "Regular" },
  { family: "Teko", style: "Medium" },
  { family: "Teko", style: "Bold" }
];

const COLOR_OPTIONS = [
  "#FF4D6D","#6C5CE7","#00B894","#F39C12","#0984E3","#111111","#E84393","#2D3436",
  "#00CEC9","#FAB1A0","#A29BFE","#55EFC4","#FF7675","#74B9FF","#FFEAA7","#81ECEC",
  "#FD79A8","#636E72","#E17055","#00A8FF","#9C88FF","#4CD137","#FBC531","#487EB0",
  "#8C7AE6","#E84118","#273C75","#44BD32","#C23616","#192A56","#718093","#7F8FA6",
  "#ECCC68","#FF6B81","#70A1FF","#7BED9F","#5352ED","#FF6348","#2ED573","#1E90FF",
  "#FFA502","#FF4757","#3742FA","#2F3542","#A4B0BE","#57606F","#CED6E0","#DFE4EA",
  "#FF9FF3","#F368E0","#EE5253","#0ABDE3","#10AC84","#222F3E","#5F27CD","#01A3A4",
  "#54A0FF","#C8D6E5","#576574","#B33771","#3B3B98","#FD7272","#9AECDB","#D6A2E8",
  "#F8EFBA","#BDC581","#82589F","#B8E994","#78E08F","#60A3BC","#0A3D62","#3C6382",
  "#38ADA9","#E58E26","#B71540","#6A89CC","#82CCDD","#F6B93B","#FA983A","#EB2F06",
  "#1B9CFC","#FC427B","#BDC3C7","#2ECC71","#3498DB","#9B59B6","#34495E","#16A085",
  "#27AE60","#2980B9","#8E44AD","#2C3E50","#F1C40F","#E67E22","#E74C3C","#95A5A6",
  "#7D5FFF","#7158E2","#3AE374","#67E6DC","#17C0EB","#FFB8B8","#FF3838","#FFB142",
  "#FFDA79","#7EFFF5","#32FF7E","#18DCFF","#7DCEA0","#F5B041","#EC7063","#AF7AC5",
  "#5DADE2","#48C9B0","#F1948A","#F7DC6F","#85C1E9","#58D68D","#A569BD","#F8C471",
  "#D2B4DE","#AED6F1","#A3E4D7","#F9E79F","#F5CBA7","#EDBB99","#D7BDE2","#A9CCE3",
  "#A2D9CE","#FAD7A0","#F5B7B1","#D5DBDB","#C39BD3","#7FB3D5","#73C6B6","#F7DC6F",
  "#F0B27A","#EB984E","#DC7633","#D35400","#C0392B","#922B21","#7B241C","#641E16",
  "#1ABC9C","#76D7C4","#45B39D","#148F77","#117A65","#0E6655","#E8F8F5","#D1F2EB"
];

const EFFECT_OPTIONS = [
  "none",
  "drop-shadow",
  "inner-shadow",
  "layer-blur",
  "background-blur"
];

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return {
    r: ((num >> 16) & 255) / 255,
    g: ((num >> 8) & 255) / 255,
    b: (num & 255) / 255
  };
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildEffects(effectName) {
  if (effectName === "none") return [];

  if (effectName === "drop-shadow") {
    return [
      {
        type: "DROP_SHADOW",
        color: { r: 0, g: 0, b: 0, a: 0.28 },
        offset: { x: 0, y: 6 },
        radius: 8,
        spread: 0,
        visible: true,
        blendMode: "NORMAL"
      }
    ];
  }

  if (effectName === "inner-shadow") {
    return [
      {
        type: "INNER_SHADOW",
        color: { r: 0, g: 0, b: 0, a: 0.22 },
        offset: { x: 0, y: 2 },
        radius: 4,
        spread: 0,
        visible: true,
        blendMode: "NORMAL"
      }
    ];
  }

  if (effectName === "layer-blur") {
    return [
      {
        type: "LAYER_BLUR",
        radius: 1.2,
        visible: true
      }
    ];
  }

  if (effectName === "background-blur") {
    return [
      {
        type: "BACKGROUND_BLUR",
        radius: 3,
        visible: true
      }
    ];
  }

  return [];
}

async function exportPreview(node) {
  const bytes = await node.exportAsync({
    format: "PNG",
    constraint: { type: "SCALE", value: 2 }
  });
  const base64 = figma.base64Encode(bytes);
  return `data:image/png;base64,${base64}`;
}

async function pickLoadableFont() {
  const pool = [...FONT_OPTIONS];

  while (pool.length > 0) {
    const index = Math.floor(Math.random() * pool.length);
    const candidate = pool.splice(index, 1)[0];

    try {
      await figma.loadFontAsync(candidate);
      return candidate;
    } catch (e) {}
  }

  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  return { family: "Inter", style: "Regular" };
}

async function mutateSelectedText() {
  const node = figma.currentPage.selection[0];

  if (!node || node.type !== "TEXT") {
    figma.ui.postMessage({
      type: "error",
      message: "Select exactly one text layer."
    });
    return;
  }

  const fontChoice = await pickLoadableFont();
  const colorChoice = randomItem(COLOR_OPTIONS);
  const effectChoice = randomItem(EFFECT_OPTIONS);

  try {
    node.fontName = fontChoice;
    node.fills = [
      {
        type: "SOLID",
        color: hexToRgb(colorChoice)
      }
    ];
    node.effects = buildEffects(effectChoice);

    let preview = "";
    try {
      preview = await exportPreview(node);
    } catch (e) {
      preview = "";
    }

    figma.ui.postMessage({
      type: "mutation-result",
      font: `${fontChoice.family} ${fontChoice.style}`,
      color: colorChoice,
      effect: effectChoice,
      preview,
      text: node.characters
    });
  } catch (err) {
    figma.ui.postMessage({
      type: "error",
      message: "Could not apply this mutation."
    });
  }
}

async function refreshSelection() {
  const node = figma.currentPage.selection[0];

  if (!node || node.type !== "TEXT") {
    figma.ui.postMessage({
      type: "error",
      message: "Select exactly one text layer."
    });
    return;
  }

  let preview = "";
  try {
    preview = await exportPreview(node);
  } catch (e) {
    preview = "";
  }

  let fontLabel = "Unknown";
  const fontName = node.fontName;
  if (fontName && fontName !== figma.mixed) {
    fontLabel = `${fontName.family} ${fontName.style}`;
  }

  let colorLabel = "Mixed";
  if (Array.isArray(node.fills) && node.fills.length > 0 && node.fills[0].type === "SOLID") {
    const fill = node.fills[0];
    const r = Math.round(fill.color.r * 255).toString(16).padStart(2, "0");
    const g = Math.round(fill.color.g * 255).toString(16).padStart(2, "0");
    const b = Math.round(fill.color.b * 255).toString(16).padStart(2, "0");
    colorLabel = `#${r}${g}${b}`.toUpperCase();
  }

  let effectLabel = "none";
  if (Array.isArray(node.effects) && node.effects.length > 0) {
    const first = node.effects[0];
    if (first.type === "DROP_SHADOW") effectLabel = "drop-shadow";
    if (first.type === "INNER_SHADOW") effectLabel = "inner-shadow";
    if (first.type === "LAYER_BLUR") effectLabel = "layer-blur";
    if (first.type === "BACKGROUND_BLUR") effectLabel = "background-blur";
  }

  figma.ui.postMessage({
    type: "mutation-result",
    font: fontLabel,
    color: colorLabel,
    effect: effectLabel,
    preview,
    text: node.characters
  });
}

figma.ui.onmessage = async (msg) => {
  if (msg.type === "mutate-text") {
    await mutateSelectedText();
  }

  if (msg.type === "refresh-selection") {
    await refreshSelection();
  }
};