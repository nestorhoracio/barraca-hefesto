# Prompt de continuación — Proyecto Barraca Hefesto
## Contexto para nuevo chat

---

## Quién soy

Soy **Néstor Horacio (NH)**, diseñador y desarrollador frontend freelance basado en Uruguay. Mi stack principal es HTML/CSS avanzado, WordPress/Divi, Figma y UI/UX, con JS y PHP básico. Trabajo en VS Code. Tengo experiencia con Astro (proyectos completados: **252plaza** y **Santa Isabel FM**). Busco ampliar mi práctica freelance y construir mi marca personal en nestorhoracio.com.

---

## Contexto del proyecto — Barraca Hefesto

Sitio web oficial de **Barraca Hefesto**, barraca de materiales de construcción ubicada en **Paso de los Toros, Uruguay**, en la esquina de **18 de Julio 1097 y Pedro María Chiesa**.

### El negocio
- **Rubro:** Materiales de construcción — barraca completa
- **Especialidades:** Chapas y caños, aberturas, pinturería, andamios
- **Servicio adicional:** Alquiler de herramientas y alquiler de carpas
- **Clientes:** Particulares y constructores de la región
- **Red social activa:** Instagram `@barraca.hefesto` / Facebook `Barraca Hefesto`
- **Correo:** `hefestobarraca@gmail.com`
- **WhatsApp real:** `59899096947`
- **Horarios:** Lunes a viernes 8:00–18:30 / Sábados 8:00–12:00 / Domingos y feriados no laborables: Cerrado / Feriados laborables: horario habitual
- **Slogan:** CONSTRUYENDO IDEAS

### Paleta de marca real
- **Fucsia principal**: `#D55CE7`
- **Amarillo**: `#F6E209`
- **Blanco**: fondo y texto del logo
- **Tipografías**: Impact (títulos), Calibri (cuerpo), Georgia Bold (logo)
- Logo: cuadrado redondeado fucsia con H serif blanca + "HEFESTO" serif blanco debajo

---

## Stack técnico
- **Framework**: Astro v4.16.19
- **Deploy**: Netlify — URL actual: `barraca-hefesto.netlify.app`
- **Repo**: `github.com/nestorhoracio/barraca-hefesto`
- **Workflow**: VS Code → git commit → git push → Netlify autodeploy
- **Nota PowerShell**: usar comandos separados, no `&&`

---

## Estado actual del proyecto — junio 2026

### Completado ✅
1. **Análisis de mercado** — cero competencia digital local
2. **Estructura Astro** — proyecto en GitHub y deployado en Netlify
3. **Archivos base**: Layout, Header, Footer, global.css, index.astro
4. **Hero** — banner real como fondo con overlay magenta + slogan "Construyendo ideas"
5. **Dark mode** — toggle en header, tokens CSS, persistencia localStorage
6. **Servicios** — 7 cards con íconos SVG reales del cliente (fill:currentColor)
7. **Calculadora de materiales** — chapas, ladrillos, pintura con tipos y fórmulas, TypeScript tipado. Chapas: select de tipo + select de longitud dinámico por calibre + vuelo 20cm/extremo descontado del cálculo.
8. **Alquiler** — 3 cards (herramientas, carpas, andamios) + sección ¿Cómo funciona?
9. **Galería** — fotos reales del Instagram en mosaico (gestión estática)
10. **Marcas** — Sinteplast (PNG), Urumix (SVG), Becam (SVG oficial de becam.com.uy), Truper (SVG de worldvectorlogo), EMTOP (PNG de emtop.com). Grilla 4 col grayscale con hover a color. Equus, Crisoles y Qualyvinil eliminados por pedido del cliente.
11. **Nosotros** — texto placeholder + 3 stats (esperando contenido real)
12. **Contacto** — dirección real, horarios reales, email, WhatsApp, Instagram, Facebook + mapa Google Maps
13. **Asistente IA** — widget flotante, historial multi-turno, calcula cantidades, pide datos del cliente, arma mensaje WhatsApp
14. **Logo real** — Hefesto_Logo.png con mix-blend-mode:multiply en light mode
15. **Colores reales** — #D55CE7 fucsia / #F6E209 amarillo en global.css
16. **Tipografías reales** — Impact y Calibri como fuentes locales woff2
17. **Sistema de íconos unificado** — todos los SVG vienen de `src/assets/icons/` importados con `?raw` y renderizados con `set:html`. `lucide-astro` eliminado.
18. **Footer** — crédito completo: "Diseño & Desarrollo Frontend por Néstor Horacio" con link a nestorhoracio.com
19. **Calculadora** — mensajes WhatsApp en primera persona ("Necesito") para los tres materiales (chapas, ladrillos, pintura). Texto en pantalla mantiene "Necesitás". Cada `calcular()` devuelve `{ display, wa }`.
20. **WhatsApp unificado** — número `59899096947` en todos los componentes: Header, Footer, Contacto, Alquiler, Asistente, Calculadora. El número demo `59899543876` fue eliminado del proyecto completo.
21. **Asistente IA mejorado** — flujo en 3 pasos: primero recaba datos técnicos, luego pide nombre y teléfono, recién entonces genera RESUMEN + MENSAJE_WA. El MENSAJE_WA incluye toda la info de la conversación (superficie, material, estado, cantidades, complementarios). Regex del cliente corregido a greedy para captura robusta. Fallback eliminado (ya no envía el último mensaje del usuario si el formato falla).

### Notas del asistente IA
- Flujo: técnica → nombre+teléfono → mensaje final
- Formato final: `RESUMEN:` en una línea + `MENSAJE_WA:` con plantilla completa
- Regex cliente: `/MENSAJE_WA:\s*([\s\S]+)/` (greedy, captura hasta fin de string)
- Si `matchWA` falla → muestra error al usuario, no envía mensaje basura

### Assets del cliente
- Logo color: `src/assets/images/Hefesto_Logo.png`
- Logo blanco: `src/assets/images/Hefesto_LogoBlanco.png`
- Íconos SVG propios: `src/assets/icons/` — Andamio, Camion, Carpa, Excavadora, Forma_Hefesto, Martillo, Mezcladora, Pared, Puerta, Rodillo, Trabajador
- Tipografías: `src/assets/fonts/` (impact.woff2, calibri.woff2, calibrib.woff2)
- Logos de marcas: `public/marcas/` (sinteplast.png, urumix.svg, becam.svg, truper.svg, emtop.png)

### Pendiente ⏳ — esperando contenido del cliente
- **Foto y texto real** en sección Nosotros (historia, fundadores, diferencial — sin datos aún)
- **Pintura** — marcas y rendimientos reales (sin datos aún; tipos actuales son genéricos)
- **Alquiler** — herramientas, carpas, condiciones (sin datos aún)
- **Políticas del asistente** — envíos, precios, crédito, tarjeta (sin datos aún)
- **Quiénes somos** — año de fundación, fundadores, historia
- **Charrúa** — marca mencionada por el cliente; sin presencia online identificable; pedir logo directamente
- **Número WhatsApp real** ya actualizado (`59899096947`) — confirmar en Netlify Environment Variables
- **Conectar dominio hefesto.com.uy** (ver instrucciones abajo)
- **Marcas grid** — cuando llegue logo Charrúa: agregar al array en `Marcas.astro` y pasar grid a 5 columnas

### Implementado en sesión junio 2026 ✅

#### Calculadora — Chapas (datos reales del cliente)
- 4 tipos reales: Ondulada/Trapezoidal × Calibre 26/30
- Select de **longitud dinámico** según calibre:
  - Cal. 26: 3,0 / 3,5 / 4,0 / 4,5 / 5,0 / 5,5 / 6,0 / 6,5 / 7,0 m
  - Cal. 30: 3,0 / 3,5 / 4,0 / 4,5 m
- **Vuelo**: se descuentan 40 cm (20 cm cada extremo) de la longitud para el cálculo real
- Fórmula: `ceil(m² / ((longitud − 0,40) × 1,0))`
- El resultado muestra nota explicativa del vuelo al usuario
- Mensaje WA: en primera persona, incluye aclaración del vuelo

#### Calculadora — Ladrillos y bloques (datos reales del cliente)
| Tipo | Unidades por m² | Nota |
|---|---|---|
| Ladrillo de campo 23×11,5×5 cm | 173 u/m² | — |
| Bloque Común 40×20×12 cm | 12,5 u/m² | — |
| Ticholo 25×25×12 cm | 16 u/m² | pallet: 384 u |
| Ticholo 25×25×17 cm | 16 u/m² | pallet: 165 u |

Ticholos: se venden por unidad y por pallet.

#### Marcas (actualizado por pedido del cliente)
- **Eliminados**: Equus, Crisoles Pinturas, Qualyvinil
- **Agregados**: Becam (SVG de becam.com.uy), Truper (SVG worldvectorlogo), EMTOP (PNG de emtop.com)
- **Pendiente**: Charrúa — pedir logo al cliente
- Grid: 4 columnas mientras falte Charrúa; pasar a 5 cuando llegue
- Archivos en `public/marcas/`: sinteplast.png, urumix.svg, becam.svg, truper.svg, emtop.png

---

## Modo de trabajo acordado
**NH escribe el código, Claude explica qué hacer y por qué.** Solo se pasan bloques completos cuando es código repetitivo o muy mecánico.

---

## Notas técnicas importantes
- `@anthropic-ai/sdk` en dependencias (para asistente IA)
- `lucide-astro` **eliminado** (junio 2026) — reemplazado por SVGs propios
- `.btn-whatsapp` y `.btn-wa-chat` en `global.css`
- Función serverless en `netlify/functions/asistente.js` (raíz del repo)
- `ANTHROPIC_API_KEY` configurada en Netlify Environment Variables
- `WHATSAPP_NUMBER` en Netlify Environment Variables → actualizar a `59899096947`
- Asistente usa `claude-haiku-4-5-20251001`
- SVGs procesados con `fill:currentColor` o `stroke:currentColor` para responder a CSS

### Sistema de íconos
Todos los íconos del sitio usan el mismo patrón:
```astro
import AndamioSvg from '../assets/icons/Andamio.svg?raw';
<div class="card__icon" set:html={AndamioSvg}></div>
```
Íconos disponibles en `src/assets/icons/`: Andamio, Camion, Carpa, Excavadora, Forma_Hefesto, Martillo, Mezcladora, Pared, Puerta, Rodillo, Trabajador

### Workflow galería
Galería estática — NH la actualiza cuando el cliente manda fotos:
1. Guardar en `src/assets/images/galeria/foto-XX.jpg`
2. Agregar al array en `Galeria.astro`
3. `git add . → git commit → git push`

---

## Modelo de negocio
- **Desarrollo**: USD 350 (acordado y en curso)
- **Mantenimiento mensual**: USD 35/mes (incluye Claude API y actualizaciones)

---

## Conexión del dominio hefesto.com.uy — cuando el cliente lo solicite

**Situación:** Dominio registrado por el cliente en ANTEL.
DNS actuales: ns1.anteldata.com.uy / ns2.anteldata.com.uy
**NO cambiar nameservers** — el cliente usa correo hefesto@hefesto.com.uy (aún sin funcionar, se asesorará aparte).

**Paso 1 — En Netlify (NH):**
- Domain management → Add a domain → hefesto.com.uy

**Paso 2 — En ANTEL (cliente en nic.com.uy con sus credenciales):**
```
Tipo: A      | Nombre: @   | Valor: 75.2.60.5
Tipo: A      | Nombre: @   | Valor: 99.83.231.61
Tipo: CNAME  | Nombre: www | Valor: barraca-hefesto.netlify.app
```
Propagación DNS: 1 a 4 horas con ANTEL Uruguay.

---

*Proyecto iniciado: mayo 2026 — NH Freelance · Uruguay*
*Última actualización: junio 2026*
