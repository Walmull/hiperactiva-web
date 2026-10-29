# Hiperactiva — landing

Sitio estático (HTML + CSS inline + JS mínimo), sin build. Publicado con GitHub Pages en https://hiperactiva.cl.

- `index.html` — la página.
- `config.js` — enlaces configurables: `instagramUrl` y `contactHref` (destino del botón "ESCRÍBENOS").
- `main.js` — aplica `config.js`, escala los embeds de Instagram de la sección Reels, y maneja el menú móvil y las flechas de los carruseles (Reels y Equipo).
- Responsive: reglas en el `<style>` de `index.html` (bloque "Responsive"), aplicadas vía atributos `data-r`. Breakpoints: ≥1281 desktop sin cambios, 1024–1280 laptop, 768–1023 tablet, ≤767 mobile, ≤379 mobile pequeño.
- `assets/` — imágenes originales del diseño. `assets/slots/` contiene las fotos de servicios y equipo extraídas del Project Archive.

Para publicar un cambio basta con hacer commit y push a `main`.
