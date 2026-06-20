"use client";

import { useEffect, useState } from "react";

// Renders a Mermaid diagram from its text source. Mermaid needs the browser
// DOM, so this is a client component and the library is imported lazily inside
// the effect — it never runs on the server and ships as its own chunk.
export function Mermaid({ chart }: { chart: string }) {
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "strict",
        });
        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(id, chart);
        if (active) setSvg(svg);
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Could not render diagram");
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [chart]);

  if (error) {
    return (
      <pre className="not-prose my-6 overflow-x-auto rounded-xl border border-red-900 bg-red-950/40 p-4 text-sm text-red-200">
        {error}
        {"\n\n"}
        {chart}
      </pre>
    );
  }

  if (!svg) {
    return <div className="my-6 text-sm text-stone-500">Rendering diagram…</div>;
  }

  // `not-prose` keeps Tailwind Typography from restyling the SVG. The HTML is
  // produced by Mermaid in strict mode from our own seed content.
  return (
    <div
      className="not-prose my-6 flex justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
