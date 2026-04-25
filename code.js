figma.showUI(__html__, { width: 360, height: 420 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === "mutate-text") {
    const node = figma.currentPage.selection[0];

    if (!node || node.type !== "TEXT") {
      figma.ui.postMessage({
        type: "error",
        message: "Select exactly one text layer."
      });
      return;
    }

    figma.ui.postMessage({
      type: "mutation-result",
      font: "Test Font",
      color: "#FF4D6D",
      effect: "shadow"
    });
  }
};