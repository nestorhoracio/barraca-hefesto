# ROADMAP — Barraca Hefesto

Este archivo se actualiza al final de cada sesión de trabajo. Para stack/convenciones fijas ver [CLAUDE.md](CLAUDE.md).

## Estado actual

One-pager completo: las 9 secciones del sitio están implementadas y funcionando en producción (`barraca-hefesto.netlify.app`). Lo que falta no es desarrollo, es **contenido real del cliente** (ver "En curso / Pendiente" abajo).

## Hecho

- **Estructura base**: proyecto Astro en GitHub, deployado en Netlify, Layout/Header/Footer/global.css/index.astro
- **Hero**: banner real con overlay magenta + slogan "Construyendo ideas"
- **Dark mode**: toggle en header, tokens CSS, persistencia en `localStorage`
- **Servicios**: 7 cards con íconos SVG propios del cliente
- **Calculadora de materiales** (TypeScript tipado):
  - *Chapas*: 4 tipos reales (Ondulada/Trapezoidal × Calibre 26/30), input de **ancho + largo + dirección de caída** (no solo m², porque la orientación cambia la cantidad real necesaria), select de longitud dinámico por calibre, vuelo de 40 cm descontado (20 cm por extremo), fórmula `ceil(m² / ((longitud − 0,40) × 1,0))`, empalme de 2 o 3 chapas con cruce seguro de 30 cm cuando no alcanza una sola pieza, campo opcional de altura de caída (Pitágoras: `√(bajada² + altura²)`) para pendiente, y derivación a WhatsApp si ni con empalme alcanza
  - *Ladrillos y bloques*: Ladrillo de campo 23×11,5×5 (173 u/m²), Bloque Común 40×20×12 (12,5 u/m²), Ticholo 25×25×12 (16 u/m², pallet 384 u), Ticholo 25×25×17 (16 u/m², pallet 165 u)
  - *Pintura*: tipos genéricos (rendimientos reales pendientes, ver abajo)
  - Mensajes de WhatsApp en primera persona ("Necesito..."), pantalla mantiene "Necesitás"
- **Alquiler**: 3 cards (herramientas, carpas, andamios) + sección "¿Cómo funciona?"
- **Galería**: fotos reales del Instagram, gestión estática (ver workflow en CLAUDE.md)
- **Marcas**: Sinteplast, Urumix, Becam, Truper, EMTOP — grid grayscale→color al hover. Equus, Crisoles y Qualyvinil se sacaron por pedido del cliente
- **Nosotros**: foto real del equipo (`equipo.jpg`, `object-fit: cover`, `aspect-ratio: 4/3`); texto sigue siendo placeholder
- **Contacto**: dirección, horarios y contacto reales + mapa de Google Maps
- **Asistente IA**: widget flotante con historial multi-turno; flujo en 3 pasos (datos técnicos → nombre y teléfono → RESUMEN + MENSAJE_WA); catálogo cerrado de chapas (no inventa variantes); burbujas de chat diferenciadas visualmente (cola izquierda/derecha)
- **Assets e identidad**: logo real (`Hefesto_Logo.png`, `mix-blend-mode: multiply` en light mode), colores reales (`#D55CE7` / `#F6E209`), tipografías reales (Impact/Calibri locales), sistema de íconos SVG unificado (`lucide-astro` eliminado)
- **WhatsApp unificado**: `59899096947` en todo el sitio, número demo eliminado por completo

## En curso / Pendiente

Esperando contenido del cliente:

- **Texto real de "Nosotros"** — historia, fundadores, diferencial, año de fundación (foto ya está, falta el texto)
- **Pintura** — marcas y rendimientos reales (los tipos actuales en la Calculadora son genéricos)
- **Alquiler** — condiciones reales de herramientas, carpas y andamios
- **Políticas del Asistente IA** — envíos, precios, crédito, tarjeta (sin datos aún)
- **Confirmar `WHATSAPP_NUMBER`** en Netlify Environment Variables (ya actualizado en el código a `59899096947`, falta verificar la variable en Netlify)

## Próximo (priorizado)

1. **Conseguir contenido del cliente** (texto Nosotros, pintura, alquiler, políticas del asistente) — es lo único que bloquea cerrar el proyecto
2. **Conectar dominio `hefesto.com.uy`** cuando el cliente lo pida — ver instrucciones completas abajo
3. **Confirmar `WHATSAPP_NUMBER`** en Netlify Environment Variables

## Changelog (resumido)

### Julio 2026
- Calculadora de chapas: se pasó de "superficie en m²" a ancho + largo + dirección de caída, con empalme (cruce de 30 cm) y altura de caída opcional por Pitágoras — un techo de 4×10 m da soluciones distintas según hacia dónde cae el agua
- Asistente IA: misma lógica de cálculo que la Calculadora, catálogo cerrado de los 4 tipos reales de chapa (el asistente había inventado "chapas pintadas" que Hefesto no vende)
- Fix: markdown y comentarios de despedida del modelo colándose en el mensaje de WhatsApp — prompt reforzado + `limpiarTexto()` en el frontend como defensa adicional; se agregó `console.error()` en el catch de la function (antes tragaba errores en silencio)
- Corte de servicio del Asistente (error 500) por falta de crédito en la cuenta de Anthropic, **no era bug de código** — si vuelve a pasar, revisar primero console.anthropic.com → Plans & Billing
- Widget del Asistente: colas de burbuja de chat (izquierda/derecha) para diferenciar quién escribió qué; fix del gotcha de CSS scoped de Astro con `:global()` (ver CLAUDE.md)

### Mayo–Junio 2026
- Setup inicial: Astro + Netlify, estructura de carpetas, Layout/Header/Footer/global.css
- Hero, dark mode, Servicios (7 cards SVG), Calculadora inicial (chapas/ladrillos/pintura), Alquiler, Galería, Marcas, Nosotros (foto), Contacto
- Asistente IA inicial: widget, historial, cálculo de cantidades, armado de mensaje de WhatsApp
- Identidad real: logo, colores, tipografías, sistema de íconos unificado (`lucide-astro` eliminado)
- Cambio de marcas por pedido del cliente (se sacaron Equus/Crisoles/Qualyvinil, se agregaron Becam/Truper/EMTOP)
- WhatsApp unificado a `59899096947` en todo el sitio
- Asistente IA mejorado: flujo de 3 pasos, regex de captura más robusto

## Contexto de negocio

- **Cliente**: Barraca Hefesto — materiales de construcción, Paso de los Toros, Uruguay (18 de Julio 1097 y Pedro María Chiesa)
- **Especialidades**: chapas y caños, aberturas, pinturería, andamios + alquiler de herramientas y carpas
- **Clientes del negocio**: particulares y constructores de la región
- **Contacto**: `hefestobarraca@gmail.com` · WhatsApp `59899096947` · Instagram `@barraca.hefesto` · Facebook `Barraca Hefesto`
- **Horarios**: Lunes a viernes 8:00–18:30 · Sábados 8:00–12:00 · Domingos y feriados no laborables cerrado · Feriados laborables horario habitual
- **Slogan**: "Construyendo ideas"
- **Modelo de negocio**: Desarrollo USD 350 (acordado) + Mantenimiento USD 35/mes (incluye Claude API y actualizaciones)

## Conexión del dominio hefesto.com.uy — cuando el cliente lo solicite

**Situación**: dominio registrado por el cliente en ANTEL. DNS actuales: `ns1.anteldata.com.uy` / `ns2.anteldata.com.uy`.
**No cambiar nameservers** — el cliente usa correo `hefesto@hefesto.com.uy` (aún sin funcionar, se asesorará aparte).

**Paso 1 — En Netlify (NH)**:
- Domain management → Add a domain → `hefesto.com.uy`

**Paso 2 — En ANTEL (cliente, en nic.com.uy con sus credenciales)**:
```
Tipo: A      | Nombre: @   | Valor: 75.2.60.5
Tipo: A      | Nombre: @   | Valor: 99.83.231.61
Tipo: CNAME  | Nombre: www | Valor: barraca-hefesto.netlify.app
```
Propagación DNS: 1 a 4 horas con ANTEL Uruguay.

---

*Proyecto iniciado: mayo 2026 — NH Freelance · Uruguay*
