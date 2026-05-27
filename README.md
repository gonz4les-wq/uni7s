# uni7s

PWA-Grundlage: Vite + React + TypeScript. Läuft im Browser, deploybar auf
**Vercel** und **GitHub Pages**, installierbar als App auf dem **iPhone**
(Add to Home Screen) – offline-fähig über einen Service Worker.

## Lokal entwickeln

```bash
npm install
npm run dev      # Dev-Server auf http://localhost:5173
npm run build    # Produktions-Build nach dist/
npm run preview  # Build lokal testen
npm run icons    # PWA-Icons neu generieren (public/)
```

## Deployment

### Vercel
Repo in Vercel importieren – Framework wird als Vite erkannt. Build-Command
`npm run build`, Output `dist`. Konfiguration liegt in `vercel.json`.

### GitHub Pages
Der Workflow `.github/workflows/deploy-pages.yml` baut bei jedem Push auf
`main` und veröffentlicht nach Pages. Einmalig aktivieren:
**Settings → Pages → Source: GitHub Actions**.

Da Pages unter `https://<user>.github.io/<repo>/` ausliefert, setzt der
Workflow `BASE_PATH=/<repo>/` automatisch. Vercel nutzt `/`.

### iPhone installieren
Seite in Safari öffnen → Teilen → „Zum Home-Bildschirm".

## Struktur

```
index.html                   App-Einstieg + iOS/PWA-Meta-Tags
vite.config.ts               Vite + vite-plugin-pwa (Manifest, Service Worker)
src/main.tsx                 React-Mount
src/App.tsx                  Platzhalter-UI – hier kommt deine App rein
src/index.css                Styles
public/                      favicon.svg + generierte PWA-Icons
scripts/generate-icons.mjs   Icon-Generator (ohne externe Abhängigkeiten)
```

Die UI in `src/App.tsx` ist ein Platzhalter und kann durch die gewünschte
App ersetzt werden.
