# Barraca Hefesto — Sitio Web

Sitio web oficial de Barraca Hefesto, Paso de los Toros, Uruguay.  
Desarrollado por [NH Freelance](https://nestorhoracio.com) — mayo 2026.

---

## Sobre el negocio

Barraca Hefesto es una barraca de materiales de construcción ubicada en **18 de Julio 1097 y Pedro María Chiesa, Paso de los Toros, Uruguay**.

- **Especialidades**: chapas y caños, aberturas, pinturería, andamios
- **Servicio adicional**: alquiler de herramientas y de carpas
- **Clientes**: particulares y constructores de la región
- **Contacto**: `hefestobarraca@gmail.com` · WhatsApp `59899096947` · Instagram `@barraca.hefesto` · Facebook `Barraca Hefesto`
- **Horarios**: Lunes a viernes 8:00–18:30 · Sábados 8:00–12:00 · Domingos y feriados no laborables cerrado
- **Slogan**: "Construyendo ideas"

---

## Stack

- **Framework**: [Astro](https://astro.build) v4
- **Deploy**: [Netlify](https://netlify.com) (autodeploy al hacer push a `main`)
- **CSS**: Vanilla CSS con custom properties (sin framework)
- **Fuentes**: Inter (Google Fonts, cuerpo general) + Impact/Calibri locales (`src/assets/fonts/`, marca)
- **Asistente IA**: Netlify Function v2 (`netlify/functions/asistente.js`) + `@anthropic-ai/sdk`, modelo `claude-haiku-4-5-20251001`

---

## Setup local

```bash
# 1. Clonar repositorio
git clone https://github.com/nestorhoracio/barraca-hefesto.git
cd barraca-hefesto/hefesto

# 2. Instalar dependencias
npm install

# 3. Copiar variables de entorno
cp .env.example .env
# Editar .env con las claves reales

# 4. Servidor de desarrollo
npm run dev
# → http://localhost:4321
```

> **Asistente IA en local**: `npm run dev` (Astro dev) no sirve las Netlify Functions — `/api/asistente` da 404 así. Para probarlo en local hace falta correr con [`netlify dev`](https://cli.netlify.com/) (netlify-cli) en vez de `npm run dev`. En producción funciona normalmente porque Netlify sí monta la función.

---

## Variables de entorno

| Variable           | Descripción                             |
|--------------------|-----------------------------------------|
| `ANTHROPIC_API_KEY`| API key de Anthropic (asistente IA)     |
| `WHATSAPP_NUMBER`  | Número WhatsApp de Hefesto (sin +)      |

> La API key de Anthropic es gestionada por NH y no se comparte con el cliente. Si el asistente deja de responder, revisar primero el crédito disponible en [console.anthropic.com → Plans & Billing](https://console.anthropic.com/) antes de asumir un bug de código.

---

## Deploy — Netlify

El deploy es automático: Netlify está conectado directo al repo de GitHub y build+publica en cada push a `main`.

**Configuración (ya hecha, referencia si hay que rearmarla):**
1. Conectar repositorio en [app.netlify.com](https://app.netlify.com)
2. Build command: `npm run build` — Publish directory: `dist` (definido en `netlify.toml`)
3. Agregar `ANTHROPIC_API_KEY` y `WHATSAPP_NUMBER` en Netlify UI → Site settings → Environment variables

---

## Estructura del proyecto

```
hefesto/
├── src/
│   ├── assets/
│   │   ├── fonts/            # impact.woff2, calibri.woff2, calibrib.woff2
│   │   ├── icons/            # SVGs propios del cliente (?raw + set:html)
│   │   └── images/           # Logo, foto equipo, galería
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Servicios.astro
│   │   ├── Calculadora.astro  # Chapas (orientación+empalme+inclinación), ladrillos, pintura
│   │   ├── Alquiler.astro
│   │   ├── Galeria.astro
│   │   ├── Marcas.astro
│   │   ├── Nosotros.astro
│   │   ├── Contacto.astro
│   │   └── Asistente.astro    # Widget IA flotante
│   ├── layouts/
│   │   └── Layout.astro      # Head, meta, fonts, dark mode
│   ├── pages/
│   │   └── index.astro       # Página principal (one-pager)
│   └── styles/
│       └── global.css        # Tokens de marca (light/dark) + utilidades
├── netlify/
│   └── functions/
│       └── asistente.js      # Backend del Asistente IA (Anthropic SDK)
├── public/
│   ├── favicon.svg
│   └── marcas/                # Logos de marcas (pinturería, etc.)
├── .env.example
├── astro.config.mjs
├── netlify.toml
├── package.json
└── tsconfig.json
```

---

## Secciones del sitio

Todas las secciones del one-pager están implementadas. Lo que queda pendiente es **contenido real del cliente**, no desarrollo — ver [`ROADMAP.md`](ROADMAP.md) para el estado actualizado (texto de Nosotros, marcas/rendimientos de pintura, condiciones de alquiler, políticas del asistente).

| # | Sección       | Notas                                              |
|---|---------------|-----------------------------------------------------|
| 1 | Hero          | Banner real + overlay de marca                      |
| 2 | Servicios     | 7 cards, íconos SVG propios                         |
| 3 | Calculadora   | Chapas (ancho/largo/dirección/empalme/inclinación), ladrillos, pintura |
| 4 | Alquiler      | Herramientas, carpas, andamios                      |
| 5 | Galería       | Fotos reales, gestión estática                      |
| 6 | Marcas        | 6 marcas reales, grid grayscale→color               |
| 7 | Nosotros      | Foto real, texto placeholder (falta contenido)      |
| 8 | Contacto      | Dirección, horarios, WhatsApp, mapa                  |
| 9 | Asistente IA  | Widget flotante, calcula cantidades, arma mensaje WhatsApp |

---

## Paleta de marca

| Token                  | Valor     | Uso                        |
|------------------------|-----------|----------------------------|
| `--color-brand`        | `#D55CE7` | Fucsia principal           |
| `--color-brand-dark`   | `#B844CC` | Hover / énfasis            |
| `--color-brand-light`  | `#E8A0F0` | Bordes y acentos           |
| `--color-brand-bg`     | `#FBF0FD` | Fondos suaves              |
| `--color-yellow`       | `#F6E209` | Amarillo de marca (acentos)|
| `--color-white`        | `#FFFFFF` | Fondo base (light mode)    |
| `--color-black`        | `#111111` | Texto principal (light mode)|

Todos los tokens tienen variante para `[data-theme="dark"]` en `global.css` (dark mode con toggle en el header, persistido en `localStorage`).

**Tipografías de marca**: Impact (títulos), Calibri (cuerpo), Georgia Bold (logo).
**Logo**: cuadrado redondeado fucsia con una "H" serif blanca y "HEFESTO" serif blanco debajo.

---

## Más información

Para el estado actual del proyecto, historial de cambios y próximos pasos, ver [`ROADMAP.md`](ROADMAP.md).

---

*NH Freelance · nestorhoracio.com · Proyecto iniciado mayo 2026*
