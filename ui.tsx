import { h, render } from "preact";
import { useEffect, useState } from "preact/hooks";

function App() {
  const [status, setStatus] = useState("Select one text layer, then click Mutate.");
  const [mutation, setMutation] = useState({
    font: "—",
    color: "—",
    effect: "—",
    preview: "",
    text: ""
  });

  useEffect(() => {
    window.onmessage = (event: MessageEvent) => {
      const msg = event.data.pluginMessage;
      if (!msg) return;

      if (msg.type === "mutation-result") {
        setMutation({
          font: msg.font || "—",
          color: msg.color || "—",
          effect: msg.effect || "—",
          preview: msg.preview || "",
          text: msg.text || ""
        });
        setStatus("Mutation generated.");
      }

      if (msg.type === "error") {
        setStatus(msg.message || "Something went wrong.");
      }
    };
  }, []);

  const sendMutate = () => {
    setStatus("Generating mutation...");
    parent.postMessage({ pluginMessage: { type: "mutate-text" } }, "*");
  };

  const sendRefresh = () => {
    setStatus("Refreshing selection...");
    parent.postMessage({ pluginMessage: { type: "refresh-selection" } }, "*");
  };

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        padding: 24,
        background: "#f3f3f3",
        minHeight: "100vh",
        boxSizing: "border-box",
        color: "#111"
      }}
    >
      <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1, marginBottom: 14 }}>
        Fontive
      </div>

      <div style={{ fontSize: 18, color: "#555", marginBottom: 28 }}>
        Generate a new text mutation every click.
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
        <button
          onClick={sendMutate}
          style={{
            border: "none",
            borderRadius: 20,
            padding: "18px 28px",
            background: "#111",
            color: "#fff",
            fontSize: 18,
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          Mutate
        </button>

        <button
          onClick={sendRefresh}
          style={{
            border: "none",
            borderRadius: 20,
            padding: "18px 28px",
            background: "#e6e6e6",
            color: "#111",
            fontSize: 18,
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          Refresh selection
        </button>
      </div>

      <div style={{ fontSize: 16, color: "#555", marginBottom: 20 }}>
        {status}
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 28,
          padding: 24,
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          marginBottom: 24
        }}
      >
        <div
          style={{
            fontSize: 14,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#888",
            fontWeight: 700,
            marginBottom: 16
          }}
        >
          Live Preview
        </div>

        <div
          style={{
            minHeight: 240,
            borderRadius: 20,
            background: "#f7f7f7",
            border: "1px solid #ececec",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            padding: 16,
            boxSizing: "border-box"
          }}
        >
          {mutation.preview ? (
            <img
              src={mutation.preview}
              alt="Live preview"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                display: "block",
                objectFit: "contain"
              }}
            />
          ) : (
            <div style={{ color: "#777", fontSize: 16, textAlign: "center" }}>
              Select a text layer and mutate it to see the preview.
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: 14,
            fontSize: 14,
            color: "#666"
          }}
        >
          {mutation.text ? `Previewing: "${mutation.text}"` : "No selected text content yet."}
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 28,
          padding: 28,
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
        }}
      >
        <div
          style={{
            fontSize: 14,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#888",
            fontWeight: 700,
            marginBottom: 18
          }}
        >
          Current Mutation
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #e7e7e7" }}>
          <div style={{ fontSize: 22, color: "#666" }}>Font</div>
          <div style={{ fontSize: 22, fontWeight: 700, textAlign: "right", marginLeft: 20 }}>{mutation.font}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #e7e7e7" }}>
          <div style={{ fontSize: 22, color: "#666" }}>Color</div>
          <div style={{ fontSize: 22, fontWeight: 700, textAlign: "right", marginLeft: 20 }}>{mutation.color}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}>
          <div style={{ fontSize: 22, color: "#666" }}>Effect</div>
          <div style={{ fontSize: 22, fontWeight: 700, textAlign: "right", marginLeft: 20 }}>{mutation.effect}</div>
        </div>
      </div>
    </div>
  );
}

render(<App />, document.getElementById("app")!);