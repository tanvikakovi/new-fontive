figma.showUI(__html__, { width: 360, height: 420 });

type MutationEffect = "none" | "shadow" | "outline";

type UIMessage =
  | { type: "ui-ready" }
  | { type: "mutate-text" }
  | { type: "refresh-selection" }
  | { type: "reset-text" };

const FONT_OPTIONS: FontName[] = [
  { family: "Inter", style: "Regular" },
  { family: "Inter", style: "Bold" }
  // Add more only after confirming they are available:
  // { family: "Roboto", style: "Regular" }
];

const COLOR_OPTIONS = [
  { hex: "#FF4D6D", name: "Flamingo" },
  { hex: "#6C5CE7", name: "Deep Violet" },
  { hex: "#00B894", name: "Mint" },
  { hex: "#F39C12", name: "Amber" },
  { hex: "#0984E3", name: "Cobalt" },
  { hex: "#111111", name: "Jet Black" },
  { hex: "#E84393", name: "Pink" },
  { hex: "#2D3436", name: "Charcoal" }
] as const;

function hexToRgb(hex: string): RGB {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);

  return {
    r: ((num >> 16) & 255) / 255,
    g: ((num >> 8) & 255) / 255,
    b: (num & 255) / 255
  };
}

function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function randomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getSelectedTextNode(): TextNode | null {
  const selection = figma.currentPage.selection;

  if (selection.length !== 1) {
    return null;
  }

  const node = selection[0];
  return node.type === "TEXT" ? node : null;
}

async function loadFontsForTextNode(node: TextNode): Promise<void> {
  if (node.fontName !== figma.mixed) {
    await figma.loadFontAsync(node.fontName as FontName);
    return;
  }

  const segments = node.getStyledTextSegments(["fontName"]);
  const seen = new Set<string>();

  for (const segment of segments) {
    const font = segment.fontName as FontName;
    const key = `${font.family}__${font.style}`;

    if (!seen.has(key)) {
      seen.add(key);
      await figma.loadFontAsync(font);
    }
  }
}

function getEffects(effectChoice: MutationEffect): Effect[] {
  switch (effectChoice) {
    case "none":
      return [];

    case "shadow":
      return [
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

    case "outline":
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
}

async function mutateSelectedText(): Promise<void> {
  const node = getSelectedTextNode();

  if (!node) {
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
    await loadFontsForTextNode(node);
    await figma.loadFontAsync(fontChoice);

    node.fontName = fontChoice;
    node.fills = [
      {
        type: "SOLID",
        color: hexToRgb(colorChoice.hex)
      } as SolidPaint
    ];
    node.effects = getEffects(effectChoice);

    figma.ui.postMessage({
      type: "mutation-result",
      font: `${fontChoice.family} ${fontChoice.style}`,
      fontLabel: `${fontChoice.family} ${fontChoice.style}`,
      color: colorChoice.hex,
      colorLabel: colorChoice.name,
      effect: effectChoice,
      effectLabel: titleCase(effectChoice)
    });
  } catch (error) {
    console.error("mutateSelectedText failed", error);
    figma.ui.postMessage({
      type: "error",
      message: "Could not apply the selected font or style."
    });
  }
}

async function refreshSelection(): Promise<void> {
  const node = getSelectedTextNode();

  if (!node) {
    figma.ui.postMessage({
      type: "error",
      message: "Select exactly one text layer."
    });
    return;
  }

  let preview = "";
  try {
    preview = await exportPreview(node);
  } catch (error) {
    preview = "";
  }

  let fontLabel = "Unknown";
  const fontName = node.fontName;
  if (fontName !== figma.mixed) {
    fontLabel = `${fontName.family} ${fontName.style}`;
  }

  let colorLabel = "Mixed";
  let colorValue = "#111111";
  if (Array.isArray(node.fills) && node.fills.length > 0 && node.fills[0].type === "SOLID") {
    const fill = node.fills[0];
    const r = Math.round(fill.color.r * 255)
      .toString(16)
      .padStart(2, "0");
    const g = Math.round(fill.color.g * 255)
      .toString(16)
      .padStart(2, "0");
    const b = Math.round(fill.color.b * 255)
      .toString(16)
      .padStart(2, "0");
    colorValue = `#${r}${g}${b}`.toUpperCase();
    colorLabel = colorValue;
  }

  let effectLabel = "None";
  let effectType: MutationEffect = "none";
  if (Array.isArray(node.effects) && node.effects.length > 0) {
    const first = node.effects[0];
    if (first.type === "DROP_SHADOW") {
      effectLabel = "Drop Shadow";
      effectType = "shadow";
    }
    if (first.type === "INNER_SHADOW") {
      effectLabel = "Inner Shadow";
      effectType = "shadow";
    }
    if (first.type === "LAYER_BLUR") {
      effectLabel = "Layer Blur";
      effectType = "shadow";
    }
    if (first.type === "BACKGROUND_BLUR") {
      effectLabel = "Background Blur";
      effectType = "shadow";
    }
  }

  figma.ui.postMessage({
    type: "mutation-result",
    font: fontLabel,
    fontLabel,
    color: colorValue,
    colorLabel,
    effect: effectType,
    effectLabel,
    preview,
    text: node.characters
  });
}

async function resetSelectedText(): Promise<void> {
  const node = getSelectedTextNode();

  if (!node) {
    figma.ui.postMessage({
      type: "error",
      message: "Select exactly one text layer."
    });
    return;
  }

  try {
    await loadFontsForTextNode(node);
    node.effects = [];

    figma.ui.postMessage({
      type: "reset-done"
    });
  } catch (error) {
    console.error("resetSelectedText failed", error);
    figma.ui.postMessage({
      type: "error",
      message: "Could not reset the selected text."
    });
  }
}

figma.ui.onmessage = async (msg: UIMessage) => {
  switch (msg.type) {
    case "ui-ready":
      figma.notify("UI loaded");
      break;

    case "mutate-text":
      await mutateSelectedText();
      break;

    case "refresh-selection":
      await refreshSelection();
      break;

    case "reset-text":
      await resetSelectedText();
      break;
  }
};