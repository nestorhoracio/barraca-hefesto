# Prompt de continuación — Proyecto Barraca Hefesto
## Contexto para nuevo chat

---

## Quién soy

Soy **Néstor Horacio (NH)**, diseñador y desarrollador frontend freelance basado en Uruguay. Mi stack principal es HTML/CSS avanzado, WordPress/Divi, Figma y UI/UX, con JS y PHP básico. Trabajo en VS Code. Tengo experiencia con Astro (proyectos completados: **252plaza** y **Santa Isabel FM**). Busco ampliar mi práctica freelance y construir mi marca personal en nestorhoracio.com.

---

## Contexto del proyecto — Barraca Hefesto

Sitio web oficial de **Barraca Hefesto**, barraca de materiales de construcción ubicada en **Paso de los Toros, Uruguay**, en la esquina de **18 de Julio y Pedro María Chiesa**.

### El negocio
- **Rubro:** Materiales de construcción — barraca completa
- **Especialidades:** Chapas y caños, aberturas, pinturería, andamios
- **Servicio adicional:** Alquiler de herramientas y alquiler de carpas
- **Clientes:** Particulares y constructores de la región
- **Red social activa:** Instagram `@barraca.hefesto`
- **Correo:** hefesto@hefesto.com.uy
- **Horarios:** Lunes a viernes 8:00–18:00 / Sábados 8:00–13:00

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

## Estado actual del proyecto — mayo/junio 2026

### Completado ✅
1. **Análisis de mercado** — cero competencia digital local
2. **Estructura Astro** — proyecto en GitHub y deployado en Netlify
3. **Archivos base**: Layout, Header, Footer, global.css, index.astro
4. **Hero** — banner real como fondo con overlay magenta
5. **Dark mode** — toggle en header, tokens CSS, persistencia localStorage
6. **Servicios** — 7 cards con íconos SVG reales del cliente (fill:currentColor)
7. **Calculadora de materiales** — chapas, ladrillos, pintura con tipos y fórmulas, TypeScript tipado
8. **Alquiler** — 3 cards + sección ¿Cómo funciona?
9. **Galería** — fotos reales del Instagram en mosaico (gestión estática)
10. **Marcas** — 5 placeholders en grilla, grayscale con hover a color
11. **Nosotros** — texto placeholder + 3 stats (esperando contenido real)
12. **Contacto** — info + mapa Google Maps con ubicación exacta
13. **Asistente IA** — widget flotante, historial multi-turno, calcula cantidades, pide datos del cliente, arma mensaje WhatsApp
14. **Logo real** — Hefesto_Logo.png con mix-blend-mode:multiply en light mode
15. **Colores reales** — #D55CE7 fucsia / #F6E209 amarillo en global.css
16. **Tipografías reales** — Impact y Calibri como fuentes locales woff2

### Assets del cliente recibidos
- Logo color: `src/assets/images/Hefesto_Logo.png`
- Logo blanco: `src/assets/images/Hefesto_LogoBlanco.png`
- Íconos SVG: `src/assets/icons/` (Andamio, Camion, Excavadora, Forma_Hefesto, Martillo, Mezcladora, Pared, Puerta, Rodillo, Trabajador)
- Tipografías: `src/assets/fonts/` (impact.woff2, calibri.woff2, calibrib.woff2)
- Imagen presentación: `src/assets/images/Presentacion_MaterialBlanca.jpg`

### Pendiente ⏳ — esperando contenido del cliente
- **Logos de marcas** — 5 logos para reemplazar los placeholders en sección Marcas
- **Foto y texto real** en sección Nosotros
- **Número WhatsApp real** del negocio → actualizar en Netlify Environment Variables
- **Conectar dominio hefesto.com.uy** (ver instrucciones abajo)

---

## Modo de trabajo acordado
**NH escribe el código, Claude explica qué hacer y por qué.** Solo se pasan bloques completos cuando es código repetitivo o muy mecánico.

---

## Notas técnicas importantes
- `lucide-astro` instalado para íconos (algunos componentes aún lo usan)
- `@anthropic-ai/sdk` en dependencias
- `.btn-whatsapp` y `.btn-wa-chat` en `global.css`
- Función serverless en `netlify/functions/asistente.js` (raíz del repo)
- `ANTHROPIC_API_KEY` configurada en Netlify Environment Variables
- Número WhatsApp demo: `59899543876`
- Asistente usa `claude-haiku-4-5-20251001`
- SVGs procesados con `fill:currentColor` para responder a CSS

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
**NO cambiar nameservers** — el cliente usa correo hefesto@hefesto.com.uy.

**Paso 1 — En Netlify (NH):**
- Domain management → Add a domain → hefesto.com.uy

**Paso 2 — En ANTEL (cliente en nic.com.uy con sus credenciales):**
```
Tipo: A      | Nombre: @   | Valor: 75.2.60.5
Tipo: A      | Nombre: @   | Valor: 99.83.231.61
Tipo: CNAME  | Nombre: www | Valor: barraca-hefesto.netlify.app
```
El correo hefesto@hefesto.com.uy no esta funcionando se asesorara al cliente en un estapa aparte del diseño de su web.
Propagación DNS: 1 a 4 horas con ANTEL Uruguay.

---

*Proyecto iniciado: mayo 2026 — NH Freelance · Uruguay*
