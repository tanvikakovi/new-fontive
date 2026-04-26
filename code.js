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
  { hex: "#FF4D6D", name: "Flamingo" },
  { hex: "#6C5CE7", name: "Deep Violet" },
  { hex: "#00B894", name: "Mint" },
  { hex: "#F39C12", name: "Amber" },
  { hex: "#0984E3", name: "Cobalt" },
  { hex: "#111111", name: "Jet Black" },
  { hex: "#E84393", name: "Pink" },
  { hex: "#2D3436", name: "Charcoal" },
  { hex: "#00CEC9", name: "Teal" },
  { hex: "#FAB1A0", name: "Peach" },
  { hex: "#A29BFE", name: "Lavender" },
  { hex: "#55EFC4", name: "Aqua" }
];

const EFFECT_OPTIONS = ["none", "shadow", "outline"];

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return {
    r: ((num >> 16) & 255) / 255,
    g: ((num >> 8) & 255) / 255,
    b: (num & 255) / 255
  };
}

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildEffects(effectName) {
  if (effectName === "none") return [];

  if (effectName === "shadow") {
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

  if (effectName === "outline") {
    return [
      {
        type: "DROP_SHADOW",
        color: { r: 0, g: 0, b: 0, a: 0.9 },
        offset: { x: 1, y: 1 },
        radius: 0,
        spread: 0,
        visible: true,
        blendMode: "NORMAL"
      },
      {
        type: "DROP_SHADOW",
        color: { r: 0, g: 0, b: 0, a: 0.9 },
        offset: { x: -1, y: 1 },
        radius: 0,
        spread: 0,
        visible: true,
        blendMode: "NORMAL"
      },
      {
        type: "DROP_SHADOW",
        color: { r: 0, g: 0, b: 0, a: 0.9 },
        offset: { x: 1, y: -1 },
        radius: 0,
        spread: 0,
        visible: true,
        blendMode: "NORMAL"
      },
      {
        type: "DROP_SHADOW",
        color: { r: 0, g: 0, b: 0, a: 0.9 },
        offset: { x: -1, y: -1 },
        radius: 0,
        spread: 0,
        visible: true,
        blendMode: "NORMAL"
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
        color: hexToRgb(colorChoice.hex)
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
      fontLabel: `${fontChoice.family} ${fontChoice.style}`,
      color: colorChoice.hex,
      colorLabel: colorChoice.name,
      effect: effectChoice,
      effectLabel: titleCase(effectChoice),
      preview
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

  let effectLabel = "None";
  let effectType = "none";
  if (Array.isArray(node.effects) && node.effects.length > 0) {
    const first = node.effects[0];
    if (first.type === "DROP_SHADOW") {
      effectLabel = "Drop Shadow";
      effectType = "shadow";
    }
    if (first.type === "INNER_SHADOW") {
      effectLabel = "Inner Shadow";
      effectType = "inner-shadow";
    }
    if (first.type === "LAYER_BLUR") {
      effectLabel = "Layer Blur";
      effectType = "layer-blur";
    }
    if (first.type === "BACKGROUND_BLUR") {
      effectLabel = "Background Blur";
      effectType = "background-blur";
    }
  }

  figma.ui.postMessage({
    type: "mutation-result",
    font: fontLabel,
    fontLabel: fontLabel,
    color: colorLabel,
    colorLabel: colorLabel,
    effect: effectType,
    effectLabel: effectLabel,
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