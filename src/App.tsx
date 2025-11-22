import { useEffect, useState } from "react";
import { parseMarkdown } from "../lib/markdown.tsx";
import exampleMd from "./example.md?raw";

export default function App() {
  const [html, setHtml] = useState("");
  const [fm, setFm] = useState<any>({});
  const [components, setComponents] = useState<Record<string, React.ReactNode>>({});

  // Initial parse of exampleMd
  useEffect(() => {
    parseMarkdown(exampleMd).then((r) => {
      setHtml(r.html);
      setFm(r.frontmatter);
      setComponents(r.components);
    });
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000/ws");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const msg = event.data || exampleMd; // fallback if message empty
      parseMarkdown(msg).then((r) => {
        setHtml(r.html);
        setFm(r.frontmatter);
        setComponents(r.components);
      });
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => socket.close();
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">{fm.title}</h1>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {Object.entries(components).map(([key, Comp]) => (
        <div key={key} id={key}>
          {Comp}
        </div>
      ))}
    </div>
  );
}
