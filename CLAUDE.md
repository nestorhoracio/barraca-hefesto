# CLAUDE.md — Barraca Hefesto

Contexto rápido para trabajar en este repo. Para estado actual y pendientes, ver `ROADMAP.md`.

## Stack

- **Framework**: [Astro](https://astro.build) v4.16.19
- **Deploy**: [Netlify](https://netlify.com) — autodeploy al hacer push a `main`
- **CSS**: Vanilla CSS con custom properties (sin framework)
- **Fuentes**: Inter (Google Fonts, cuerpo general) + Impact/Calibri locales (`src/assets/fonts/`, marca)
- **Asistente IA**: Netlify Function v2 (`netlify/functions/asistente.js`) + `@anthropic-ai/sdk`, modelo `claude-haiku-4-5-20251001`
- **Repo**: `github.com/nestorhoracio/barraca-hefesto` — la raíz real del proyecto (git, `package.json`, `src/`) es esta carpeta, `hefesto/`

## Estructura (resumen)

- `src/components/` — un `.astro` por sección del one-pager (Header, Servicios, Calculadora, Alquiler, Galeria, Marcas, Nosotros, Contacto, Asistente, Footer)
- `src/layouts/Layout.astro` — head, meta, fonts, dark mode
- `src/pages/index.astro` — página única
- `src/styles/global.css` — tokens de marca (light/dark) + utilidades
- `src/assets/` — fonts, icons (SVG propios), images
- `netlify/functions/asistente.js` — backend del Asistente IA

Árbol completo en [README.md](README.md).

## Modo de trabajo con NH

**Claude Code sugiere el código; NH lo revisa y aprueba antes de aplicarlo.** Los cambios son incrementales — priorizar diffs chicos y explicados por sobre reescrituras grandes.

## Convenciones y gotchas técnicos

- **PowerShell**: usar comandos separados, no `&&`.
- **CSS scoped de Astro** no se aplica a elementos creados con `document.createElement()` en un `<script>` de cliente (ej. burbujas del Asistente) — hay que envolver esos selectores en `:global(...)`.
- **Reglas CSS pensadas como globales** (ej. `.section`, `.section-title`) deben vivir en `global.css`, no en el `<style>` de una página o componente. El scoping de Astro le agrega a cada regla un atributo `data-astro-cid-*` que solo matchea elementos del MISMO archivo — si `index.astro` define `.section {...}` pero el `<section class="section">` lo renderiza un componente hijo (`Servicios.astro`, `Alquiler.astro`, etc.), la regla nunca se aplica y el elemento queda con el estilo por defecto, sin avisar de ningún error. Pasó exactamente esto con el padding entre secciones (julio 2026): todas las secciones tenían `padding: 0` porque `.section` estaba en `index.astro` en vez de `global.css`.
- **Íconos**: todos los SVG propios viven en `src/assets/icons/`, se importan con `?raw` y se renderizan con `set:html`, coloreados con `fill:currentColor` / `stroke:currentColor`:
  ```astro
  import AndamioSvg from '../assets/icons/Andamio.svg?raw';
  <div class="card__icon" set:html={AndamioSvg}></div>
  ```
  `lucide-astro` fue eliminado deliberadamente (junio 2026) — no reinstalar, usar este patrón.
- **`npm run dev` no sirve las Netlify Functions** — `/api/asistente` da 404 en local. Para probar el Asistente IA local hace falta [`netlify dev`](https://cli.netlify.com/) (netlify-cli).
- **Asistente IA**: catálogo cerrado de 4 tipos de chapa (Ondulada/Trapezoidal Aluminizada × Calibre 26/30) — no debe ofrecer ni inventar otras variantes.
- **Regex de extracción del mensaje WhatsApp** en el cliente: `/MENSAJE_WA:\s*([\s\S]+)/` (greedy, captura hasta fin de string). Si falla, se muestra error al usuario — no hay fallback que mande el último mensaje tal cual.

## No tocar sin avisar

- **Nameservers DNS de `hefesto.com.uy`** (`ns1`/`ns2.anteldata.com.uy`) — el cliente usa correo `@hefesto.com.uy`. No cambiar nameservers al conectar el dominio (ver pasos en `ROADMAP.md`).
- **`ANTHROPIC_API_KEY`** — gestionada por NH, no se comparte con el cliente.
- **Número de WhatsApp** (`59899096947`) — ya unificado en todo el sitio (Header, Footer, Contacto, Alquiler, Asistente, Calculadora). El número demo anterior fue eliminado por completo.
- **Galería** es estática por decisión de diseño — no convertir en sistema dinámico sin que lo pida NH.

## Comandos útiles

```bash
npm install
npm run dev       # http://localhost:4321 — NO sirve las Netlify Functions
npm run build
npm run preview
netlify dev        # para probar /api/asistente en local (requiere netlify-cli)
```

**Deploy**: `git push` a `main` → Netlify autodeploya (build: `npm run build`, publish: `dist`, definido en `netlify.toml`).

**Agregar fotos a la galería**:
1. Guardar en `src/assets/images/galeria/foto-XX.jpg`
2. Agregar al array en `Galeria.astro`
3. `git add` → `commit` → `push`

---

Ver [ROADMAP.md](ROADMAP.md) para estado actual y próximos pasos antes de empezar cualquier tarea nueva.
