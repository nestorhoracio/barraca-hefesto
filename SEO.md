# SEO — Barraca Hefesto

Plan estratégico de posicionamiento orgánico para `hefesto.com.uy`. Documento vivo — se actualiza al final de cada sesión de trabajo de SEO, igual que [ROADMAP.md](ROADMAP.md). Para gotchas técnicos de SEO/rendimiento ver [CLAUDE.md](CLAUDE.md); para el análisis original que dio origen a este documento ver [respuestas-seo-IAs.md](respuestas-seo-IAs.md) (evaluación de ChatGPT, Claude.ai y Gemini, agosto 2026).

## Diagnóstico

El SEO técnico del sitio ya está resuelto: **100/100 en SEO según PageSpeed Insights real**, confirmado en producción (ver `ROADMAP.md`). Ese no es el problema. Las tres IAs consultadas, y de forma independiente el diagnóstico que ya hizo este proyecto el 29/7, coinciden en tres frenos reales, ninguno de código:

1. **El sitio es un one-pager** — una sola URL (`index.astro`) con secciones por ancla (`#servicios`, `#calculadora`, etc.), no páginas propias por producto/servicio. No puede competir en Google por intenciones de búsqueda distintas ("venta de chapas", "alquiler de andamios", "calculadora de materiales"...) con la misma URL para todas.
2. **Google Business Profile con muy pocas reseñas** — para búsquedas locales tipo "Barraca Paso de los Toros", lo que más pesa es el 3-pack de mapas, no el sitio web. La ficha real de Hefesto tenía 5.0★ pero solo 2 reseñas frente a competidores de la zona con 70-250+ (ChatGPT citó "Barraca La Cabaña" 4.5★/72 reseñas y "Barraca Agropaso" 4.2★/256 reseñas).
3. **Poca autoridad de dominio** — `hefesto.com.uy` se migró recién el 27/7/2026, sin backlinks ni citas locales todavía.

Puntos en común entre las tres IAs: arquitectura por URLs específicas, GBP como palanca #1, NAP consistente en directorios, schema.org `LocalBusiness` reforzado, contenido específico (guías, calculadora como landing) por sobre contenido genérico o keyword stuffing.

**Nota sobre confiabilidad de las respuestas**: ChatGPT y Claude.ai investigaron el sitio y el negocio real (ChatGPT incluso citó reseñas reales de competidores con nombre y puntaje). Gemini dio una respuesta más genérica, con ejemplos que no corresponden al negocio real (rejas, portones, herrería en Montevideo — Hefesto vende materiales de construcción en Paso de los Toros, no hace herrería). Tratar las sugerencias de Gemini con más cautela que las otras dos.

## Decisión abierta: ¿one-pager reforzado o expansión a multi-página?

Todavía no decidido con NH — pros, contras y esfuerzo estimado de cada camino:

| | Mantener one-pager + reforzar | Expandir a multi-página |
|---|---|---|
| **Qué implica** | Reforzar GBP/reseñas, schema.org, copy interno de la página única | Crear landings propias (`/chapas-y-perfiles/`, `/alquiler-de-herramientas/`, `/calculadora-de-materiales/`, etc.) manteniendo la home como página madre |
| **Esfuerzo** | Bajo — la mayoría son acciones fuera de código o cambios chicos | Alto — nuevas rutas, contenido único por página, enlazado interno, mantener consistencia de diseño en cada una |
| **Impacto esperado según las 3 IAs** | El de mayor impacto a corto plazo (GBP pesa más que la arquitectura para búsquedas locales) | El de mayor impacto a mediano/largo plazo (permite rankear por keywords específicas, más superficie indexable) |
| **Riesgo** | Ninguno — no cambia nada de la experiencia actual | Diluir el "todo en un scroll" que hoy funciona bien para conversión por WhatsApp; requiere mantenimiento de más páginas a futuro |

Criterio sugerido: priorizar primero las acciones de bajo esfuerzo/alto impacto (GBP, schema, directorios) y revisar el ranking después de 2-4 semanas antes de comprometerse a la expansión a multi-página — evita construir páginas nuevas sin saber todavía si el freno real era la autoridad/GBP.

## Plan de acción priorizado

### Código (Claude)

| Estado | Acción |
|---|---|
| ✅ | JSON-LD `HardwareStore` ampliado en `Layout.astro` con `areaServed` (Paso de los Toros, Centenario), `priceRange` (`$$`, genérico) y `hasOfferCatalog` (7 categorías reales de `Servicios.astro`/`Alquiler.astro`) — 25/8/2026 |
| ✅ ya resuelto | Alt text de la Galería — ya descriptivo por foto (`Galeria.astro`), no genérico |
| ✅ ya resuelto | Lazy-load del iframe de Google Maps — `Contacto.astro` ya tiene `loading="lazy"` |
| ⏸️ condicionado | `FAQPage` schema — no agregar todavía: no hay una sección de FAQ real y visible en el sitio hoy (el paso a paso de Alquiler es una guía, no preguntas/respuestas). Agregarlo sin contenido visible que lo respalde viola las guías de datos estructurados de Google. Revisar si se crea una sección de FAQ real. |
| ⏸️ condicionado | Landings por servicio/producto, `Product` schema por categoría — depende de la decisión de arquitectura de arriba |

### Fuera de código (NH) — en orden de impacto

1. **Google Business Profile** — la palanca de mayor impacto según las 3 IAs:
   - Confirmar categoría principal ("Tienda de materiales para construcción") + secundarias (ferretería, alquiler de equipos, pinturas).
   - Subir fotos reales (producto, local, equipo).
   - **Campaña de reseñas**: pedir la reseña por WhatsApp justo después de una compra/entrega, con el link directo a la ficha (ya armado: `https://www.google.com/maps?cid=5434458253880639823`, ver gotcha en `CLAUDE.md`). Objetivo: acercarse al piso de reseñas de la competencia local (70+).
   - No crear una segunda ficha para `@hefesto.alquileres` — manejarlo como servicio dentro de la misma ficha (Google penaliza duplicados).
2. **Google Search Console** — confirmar que existe una propiedad específica para `hefesto.com.uy` (no solo la vieja de `barraca-hefesto.netlify.app`, que es un dominio distinto) con el sitemap (`https://hefesto.com.uy/sitemap-index.xml`) enviado ahí.
3. **Directorios y citas locales (NAP idéntico)**: Páginas Amarillas, 1122.com.uy (ya figura listado — corregir la categoría "Aberturas Madera" por la real), Construex, Infopráctica, ferreteriasuy, y páginas de "encontranos en" de los proveedores (Sinteplast, Truper, EMTOP) como backlinks de calidad.
4. **No revisar ranking antes de 2-4 semanas** desde que se hagan estas acciones — es el tiempo típico para que un dominio nuevo con estas mejoras empiece a moverse.

## Ideas de contenido futuro (condicionadas a la decisión de arquitectura)

Guías prácticas específicas sugeridas por las IAs, para cuando haya páginas propias donde publicarlas (no se ejecutan mientras el sitio siga siendo one-pager):

- Cálculo de chapas según pendiente del techo (ya existe como funcionalidad en la Calculadora — candidata a landing propia, es el activo diferencial más citado por las 3 IAs).
- Ticholo vs. bloque: cuándo conviene cada uno.
- Qué andamio elegir según la altura de la obra.
- Cómo elegir línea de pintura Sinteplast según el uso.
- Arena/áridos: cuánto rinde por m³ o por obra tipo.

## Changelog

### Septiembre 2026
- **Sesión 3/9/2026**: se instaló Google Analytics 4 en el sitio (detalle técnico completo en `ROADMAP.md` y `CLAUDE.md`) — no cambia el diagnóstico ni el plan de acción de este documento, pero da una herramienta de medición nueva que sirve para evaluar el impacto de las acciones de este plan: tráfico entrante real desde Instagram/Facebook (relevante para medir si la campaña de reseñas/GBP mueve la aguja) y en qué sección del sitio la gente termina escribiendo por WhatsApp. Al revisar ranking en 2-4 semanas (ver "Plan de acción priorizado"), conviene mirar también estos datos, no solo posiciones en Google.

### Agosto 2026
- **Sesión 25/8/2026**: creación de este documento, consolidando el análisis de `respuestas-seo-IAs.md` (ChatGPT, Claude.ai, Gemini) con el diagnóstico ya existente en `ROADMAP.md`. Se amplió el JSON-LD de `Layout.astro` (`areaServed`, `priceRange`, `hasOfferCatalog`) con datos ya respaldados por contenido real del sitio. Se dejó documentada, sin resolver, la decisión sobre expandir el sitio a multi-página. Enlazado desde `CLAUDE.md`, `ROADMAP.md` y `README.md`.
