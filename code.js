figma.showUI(__html__, { width: 460, height: 700 });

const FONT_OPTIONS = [
  { family: "Inter", style: "Regular" },
  { family: "Roboto", style: "Regular" },
  { family: "Open Sans", style: "Regular" },
  { family: "Montserrat", style: "Regular" },
  { family: "Playfair Display", style: "Regular" }
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

async function exportPreview(node) {
  const bytes = await node.exportAsync({
    format: "PNG",
    constraint: { type: "SCALE", value: 2 }
  });

  const base64 = figma.base64Encode(bytes);
  return `data:image/png;base64,${base64}`;
}

async function mutateSelectedText() {
  const node = figma.currentPage.selection[0];

  if (!node || node.type !== "TEXT") {
    figma.ui.postMessage({
      type: "error",
      message: "Select a text layer"
    });
    return;
  }

  const fontChoice = randomItem(FONT_OPTIONS);
  const colorChoice = randomItem(COLOR_OPTIONS);
  const effectChoice = randomItem(["none", "shadow", "outline"]);

  try {
    await figma.loadFontAsync(fontChoice);

    node.fontName = fontChoice;
    node.fills = [
      {
        type: "SOLID",
        color: hexToRgb(colorChoice.hex)
      }
    ];

    if (effectChoice === "none") {
      node.effects = [];
    }

    if (effectChoice === "shadow") {
      node.effects = [
        {
          type: "DROP_SHADOW",
          color: { r: 0, g: 0, b: 0, a: 0.3 },
          offset: { x: 0, y: 4 },
          radius: 6,
          spread: 0,
          visible: true,
          blendMode: "NORMAL"
        }
      ];
    }

    if (effectChoice === "outline") {
      node.effects = [
        {
          type: "DROP_SHADOW",
          color: { r: 0, g: 0, b: 0, a: 1 },
          offset: { x: 1, y: 1 },
          radius: 0,
          spread: 0,
          visible: true,
          blendMode: "NORMAL"
        },
        {
          type: "DROP_SHADOW",
          color: { r: 0, g: 0, b: 0, a: 1 },
          offset: { x: -1, y: 1 },
          radius: 0,
          spread: 0,
          visible: true,
          blendMode: "NORMAL"
        },
        {
          type: "DROP_SHADOW",
          color: { r: 0, g: 0, b: 0, a: 1 },
          offset: { x: 1, y: -1 },
          radius: 0,
          spread: 0,
          visible: true,
          blendMode: "NORMAL"
        },
        {
          type: "DROP_SHADOW",
          color: { r: 0, g: 0, b: 0, a: 1 },
          offset: { x: -1, y: -1 },
          radius: 0,
          spread: 0,
          visible: true,
          blendMode: "NORMAL"
        }
      ];
    }

    const preview = await exportPreview(node);

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
      message: "Font failed to load"
    });
  }
}

figma.ui.onmessage = async (msg) => {
  if (msg.type === "mutate-text") {
    await mutateSelectedText();
  }
};