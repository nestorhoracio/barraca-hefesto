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
- **`netlify dev` recarga el módulo de cada function en cada request** — cualquier estado en memoria a nivel de módulo (contadores, caches, un `Map`) nunca se acumula entre requests en local, aunque el código esté bien escrito. Confirmado el 2026-07-25 con un `console.log` de diagnóstico en un rate limiter casero que probé y descarté: 17 requests seguidos mostraron `mapSize=1` todas las veces. No es un bug — es que el simulador local prioriza hot-reload de código por sobre imitar la reutilización de contenedor "warm" que sí ocurre en producción. Este tipo de lógica solo se puede validar de verdad probando después de un deploy real.
- **Rate limiting de `/api/asistente`**: se usa el rate limiting nativo de Netlify (campo `rateLimit` en el `config` exportado de `asistente.js`, no un `Map` en memoria) — funciona en cualquier plan, se aplica a nivel de plataforma antes de que corra la función, y por eso tampoco se puede probar con `netlify dev` (Netlify solo lo valida/activa en el post-processing del deploy). `windowSize` tiene un máximo de 180 segundos impuesto por Netlify. Para cambiar el límite, editar ese mismo objeto — no hace falta tocar el cuerpo de la función.
- **Asistente IA**: catálogo cerrado de 4 tipos de chapa (Ondulada/Trapezoidal Aluminizada × Calibre 26/30) y de caños/perfiles de hierro (cuadrado, rectangular, redondo, Perfil C, ángulos, planchuela lisa/perforada, varilla lisa/tratada — todo x barra de 6m, sin fraccionar) — no debe ofrecer ni inventar otras variantes. Caños y perfiles nunca lleva precio, ni aproximado (a diferencia del resto de las categorías) — el hierro cambia de precio muy seguido.
- **Endpoint `/api/asistente` — validación server-side** (2026-07-25): chequea `Origin`/`Referer` contra un allowlist (403 si no matchea), valida forma y longitud de `mensajes` (400 si no cumple, corta el historial a los últimos 20 y cada mensaje a 2000 caracteres), y el frontend (`Asistente.astro`) escapa el HTML del bloque de RESUMEN antes de insertarlo con `innerHTML` (antes había un XSS acotado ahí). No sacar estos chequeos sin agregar un reemplazo — el endpoint queda expuesto públicamente en `hefesto.com.uy`.
- **Regex de extracción del mensaje WhatsApp** en el cliente: `/MENSAJE_WA:\s*([\s\S]+)/` (greedy, captura hasta fin de string). Si falla, se muestra error al usuario — no hay fallback que mande el último mensaje tal cual.
- **`@astrojs/sitemap` pinneado a `3.2.1` exacto (sin `^`)** en `package.json` — versiones más nuevas (3.3.0+) se compilan contra Astro 5/6 y usan el hook de integración `astro:routes:resolved`, que no dispara igual en Astro 4.16 (versión actual del proyecto): rompe el build en `astro:build:done` con `Cannot read properties of undefined (reading 'reduce')`. No correr `npm update`/`npm install @astrojs/sitemap` sin fijar la versión, salvo que se suba Astro a la vez.
- **No mezclar `aspect-ratio` + `max-height` + `object-fit` en un elemento reemplazado (`<img>`/`<Image>`)**: en `Nosotros.astro` esa combinación en el mismo `<img>` causó que en mobile (ancho angosto) el navegador ignorara el `aspect-ratio` calculado (más chico) y forzara la altura hasta el `max-height` del media query, angostando la caja y haciendo que `object-fit:cover` recortara los costados de la foto — un `max-height` no debería nunca *aumentar* una altura ya menor, pero en este caso sí. Confirmado con medición real en Playwright (viewport mobile), no solo por inspección visual. Patrón correcto: poner `aspect-ratio`/`max-height`/`width:100%` en el `<div>` contenedor (no reemplazado, con `overflow:hidden`) y dejar el `<img>` solo con `width:100%; height:100%; object-fit:cover`.
- **`astro:assets` (`<Image>`) vs `<img>` plano**: usar `<Image>` para fotos importadas desde `src/assets/images/` (ya migrado en `Nosotros.astro`, `Galeria.astro`). **Excepción**: `Marcas.astro` usa logos en `public/marcas/` referenciados por string (`/marcas/x.png`) — `astro:assets` no optimiza archivos de `public/` (no pasan por el pipeline de build), así que ahí el fix de CLS es `width`/`height` explícitos por logo en vez de migrar a `<Image>`. No mover esos archivos a `src/` sin necesidad — son assets de marca provistos por terceros.

## Rendimiento y SEO (mobile-first)

- **SSG obligatorio**: Astro debe mantenerse en modo estático (sin `output: 'server'` en `astro.config.mjs`) — todo el contenido semántico principal se renderiza en build, sin depender de JS en cliente para que Googlebot lo indexe. Motivo puntual: Googlebot indexa en dos fases (HTML crudo primero, renderizado JS después, con cola y demora) — depender del CSR arriesga contenido no indexado o indexado tarde.
- **TBT**: JS de cliente mínimo, vanilla y encapsulado por componente (mismo patrón que ya usan el Asistente y el toggle de dark mode) — no sumar librerías pesadas de interactividad.
- **LCP**: imágenes de producción en WebP/AVIF, no PNG/JPEG pesados en elementos críticos (hero, logo). Preferir `astro:assets` (`<Image>`/`<Picture>`) sobre `<img src={x.src}>` plano para optimización automática.
  - `Nosotros.astro` y `Galeria.astro` ya usan `astro:assets` (`<Image>`, conversión automática a WebP). Pendiente: hero (`banner.jpg` en `index.astro`) y logo (`Header.astro`/`Footer.astro`), que siguen en `.jpg`/`.png` sin convertir.
- **CLS**: todo `<img>` debe declarar `width`/`height` explícitos para reservar espacio y evitar saltos visuales.
  - Ya resuelto en `Nosotros.astro`/`Galeria.astro` (vía `astro:assets`, que los infiere) y en `Marcas.astro` (`width`/`height` explícitos por logo, calculados a partir de las dimensiones reales de cada imagen). Sigue así en `Header.astro`, `Footer.astro`, `Asistente.astro`.
- **SEO técnico ya implementado** (`Layout.astro` / `astro.config.mjs`): canonical dinámico vía `Astro.site`, JSON-LD `HardwareStore`/`LocalBusiness` (dirección, geo, horarios, redes — hardcodeado ahí mismo, mismo patrón que `Contacto.astro`, sin archivo de datos separado), `og:image`/`twitter:image` en URL absoluta, sitemap automático (`@astrojs/sitemap`, ver gotcha de versión arriba), `public/robots.txt`. Todo deriva de `Astro.site`, así que la migración de dominio (ver `ROADMAP.md`) solo requiere cambiar ese valor — **excepto `robots.txt`**, que tiene la URL del sitemap hardcodeada a mano.

## Componentes Astro — arquitectura

- Modularizar con `interface Props` tipada cuando el componente reciba datos variables (hoy solo `Layout.astro` la usa — nuevos componentes o refactors que acepten props deben declararla).
- CSS scoped por componente para evitar fugas de estilo (ver gotcha de reglas globales arriba).
- Renderizado condicional limpio (`{condicion && <Elemento />}`) para elementos opcionales — ej. futuros badges de certificaciones o marcas.

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
