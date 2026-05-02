# Barraca Hefesto — Sitio Web

Sitio web oficial de Barraca Hefesto, Paso de los Toros, Uruguay.  
Desarrollado por [NH Freelance](https://nestorhoracio.com) — mayo 2026.

---

## Stack

- **Framework**: [Astro](https://astro.build) v4
- **Deploy**: [Netlify](https://netlify.com)
- **CSS**: Vanilla CSS con custom properties (sin framework)
- **Fuente**: Inter (Google Fonts)

---

## Setup local

```bash
# 1. Clonar repositorio
git clone https://github.com/tu-usuario/barraca-hefesto.git
cd barraca-hefesto

# 2. Instalar dependencias
npm install

# 3. Copiar variables de entorno
cp .env.example .env
# Editar .env con las claves reales

# 4. Servidor de desarrollo
npm run dev
# → http://localhost:4321
```

---

## Variables de entorno

| Variable           | Descripción                             |
|--------------------|-----------------------------------------|
| `ANTHROPIC_API_KEY`| API key de Anthropic (asistente IA)     |
| `WHATSAPP_NUMBER`  | Número WhatsApp de Hefesto (sin +)      |

> La API key de Anthropic es gestionada por NH y no se comparte con el cliente.

---

## Deploy — Netlify

El deploy es automático vía GitHub Actions al hacer push a `main`.

**Configuración manual (primera vez):**
1. Conectar repositorio en [app.netlify.com](https://app.netlify.com)
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Agregar variables de entorno en Netlify UI → Site settings → Environment variables

---

## Estructura del proyecto

```
barraca-hefesto/
├── src/
│   ├── assets/
│   │   └── images/          # Imágenes del sitio
│   ├── components/
│   │   ├── Header.astro     # Navegación principal
│   │   ├── Footer.astro     # Pie de página
│   │   ├── Hero.astro       # Sección hero (próximo)
│   │   ├── Servicios.astro  # Cards de servicios (próximo)
│   │   ├── Calculadora.astro # Calculadora interactiva (próximo)
│   │   ├── Alquiler.astro   # Sección alquiler (próximo)
│   │   ├── Galeria.astro    # Galería de fotos (próximo)
│   │   ├── Nosotros.astro   # Historia del negocio (próximo)
│   │   ├── Contacto.astro   # Mapa + WhatsApp (próximo)
│   │   └── Asistente.astro  # Widget IA flotante (próximo)
│   ├── layouts/
│   │   └── Layout.astro     # Layout base (head, meta, fonts)
│   ├── pages/
│   │   └── index.astro      # Página principal (one-pager)
│   └── styles/
│       └── global.css       # Tokens de marca + utilidades
├── public/
│   ├── favicon.svg          # Favicon
│   └── og-image.jpg         # Imagen para redes sociales
├── .env.example             # Variables de entorno (template)
├── .gitignore
├── astro.config.mjs
├── netlify.toml
├── package.json
└── tsconfig.json
```

---

## Secciones del sitio

| # | Sección       | Estado      | Notas                          |
|---|---------------|-------------|--------------------------------|
| 1 | Hero          | 🔄 En progreso | Mobile-first, fucsia/blanco   |
| 2 | Servicios     | ⏳ Pendiente | 7 cards de categorías          |
| 3 | Calculadora   | ⏳ Pendiente | Chapas, pintura, ladrillos     |
| 4 | Alquiler      | ⏳ Pendiente | Herramientas, carpas, andamios |
| 5 | Galería       | ⏳ Pendiente | Fotos del Instagram            |
| 6 | Nosotros      | ⏳ Pendiente | Historia del negocio           |
| 7 | Contacto      | ⏳ Pendiente | Mapa + horarios + WhatsApp     |
| 8 | Asistente IA  | ⏳ Pendiente | Widget flotante cotización     |

---

## Paleta de marca

| Token                  | Valor     | Uso                        |
|------------------------|-----------|----------------------------|
| `--color-brand`        | `#E91E8C` | Fucsia principal           |
| `--color-brand-dark`   | `#C4177A` | Hover / énfasis            |
| `--color-brand-light`  | `#F5A8D8` | Bordes y acentos           |
| `--color-brand-bg`     | `#FDF0F8` | Fondos suaves              |
| `--color-white`        | `#FFFFFF` | Fondo base                 |
| `--color-black`        | `#111111` | Texto principal            |

---

*NH Freelance · nestorhoracio.com · Proyecto iniciado mayo 2026*
