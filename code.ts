figma.showUI(__html__, { width: 360, height: 420 });

type MutationEffect = "none" | "shadow" | "outline";

type UIMessage =
  | { type: "ui-ready" }
  | { type: "mutate-text" }
  | { type: "reset-text" };

const FONT_OPTIONS: FontName[] = [
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
  if (effectChoice === "none") {
    return [];
  }

  if (effectChoice === "shadow") {
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
  }

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
      }
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
    figma.ui.postMessage({
      type: "error",
      message: "Could not apply that font."
    });
  }
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
    figma.ui.postMessage({
      type: "error",
      message: "Could not reset the selected text."
    });
  }
}

figma.ui.postMessage({ type: "ping" });

figma.ui.onmessage = async (msg: UIMessage) => {
  if (msg.type === "ui-ready") {
    figma.notify("UI loaded");
    return;
  }

  if (msg.type === "mutate-text") {
    await mutateSelectedText();
    return;
  }

  if (msg.type === "reset-text") {
    await resetSelectedText();
  }
};