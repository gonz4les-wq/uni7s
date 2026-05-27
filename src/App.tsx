import { useState } from "react";

export default function App() {
  const [ready] = useState(true);

  return (
    <main className="app">
      <div className="card">
        <h1>uni7s</h1>
        <p className="subtitle">
          PWA-Grundlage steht. Läuft im Browser, auf Vercel und GitHub Pages –
          installierbar auf dem iPhone.
        </p>
        <ul className="checklist">
          <li>Vite + React + TypeScript</li>
          <li>Service Worker &amp; offline-fähig</li>
          <li>Web App Manifest (Add to Home Screen)</li>
          <li>Bereit für deinen App-Prompt</li>
        </ul>
        <span className={ready ? "badge ok" : "badge"}>bereit</span>
      </div>
    </main>
  );
}
