figma.showUI(__html__, { width: 360, height: 420 });

figma.ui.postMessage({ type: "ping" });

figma.ui.onmessage = async (msg) => {
  if (msg.type === "ui-ready") {
    figma.notify("UI loaded");
  }
};
type MutationEffect = "none" | "shadow" | "outline";

const FONT_OPTIONS = [
  { family: "Inter", style: "Regular" },
  { family: "Roboto", style: "Regular" },
  { family: "Open Sans", style: "Regular" },
  { family: "Montserrat", style: "Regular" },
  { family: "Playfair Display", style: "Regular" }
];

const COLOR_OPTIONS = [
  "#FF4D6D",
  "#6C5CE7",
  "#00B894",
  "#F39C12",
  "#0984E3",
  "#111111",
  "#E84393",
  "#2D3436"
];

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return {
    r: ((num >> 16) & 255) / 255,
    g: ((num >> 8) & 255) / 255,
    b: (num & 255) / 255
  };
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
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

  const fontChoice = randomItem(FONT_OPTIONS);
  const colorChoice = randomItem(COLOR_OPTIONS);
  const effectChoice = randomItem<MutationEffect>(["none", "shadow", "outline"]);

  try {
    await figma.loadFontAsync(fontChoice);

    node.fontName = fontChoice;
    node.fills = [
      {
        type: "SOLID",
        color: hexToRgb(colorChoice)
      }
    ];

    if (effectChoice === "none") {
      node.effects = [];
    }

    if (effectChoice === "shadow") {
      node.effects = [
        {
          type: "DROP_SHADOW",
          color: { r: 0, g: 0, b: 0, a: 0.25 },
          offset: { x: 0, y: 4 },
          radius: 4,
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

    figma.ui.postMessage({
      type: "mutation-result",
      font: `${fontChoice.family} ${fontChoice.style}`,
      color: colorChoice,
      effect: effectChoice
    });
  } catch (err) {
    figma.ui.postMessage({
      type: "error",
      message: "Could not apply that font."
    });
  }
}

figma.ui.onmessage = async (msg) => {
  if (msg.type === "mutate-text") {
    await mutateSelectedText();
  }

  if (msg.type === "reset-text") {
    const node = figma.currentPage.selection[0];

    if (!node || node.type !== "TEXT") {
      figma.ui.postMessage({
        type: "error",
        message: "Select exactly one text layer."
      });
      return;
    }

    node.effects = [];

    figma.ui.postMessage({
      type: "reset-done"
    });
  }
};