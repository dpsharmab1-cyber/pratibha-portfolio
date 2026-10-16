# Pratibha Devi — Portfolio 2026

Static portfolio site for Pratibha Devi, graphic designer (Hyderabad).
Built from the Figma frames (Landing, About Me, Content, Contact) with every illustration taken from the **Emotions Grain Pack** (stipple-grain WebPs, grain baked in).

- **Fonts:** Allura (script), Montserrat (UI/body), Inter (cards) — Google Fonts, as used in the Figma SVGs
- **Motion:** GSAP + ScrollTrigger, Lenis smooth scroll, a film-grain overlay, floating dust motes, a sparkle cursor trail (desktop), floating crystals/orbs, rotating sun rays, beads drifting on their threads, script titles that "write" themselves in
- **Responsive:** phone (≤ 760px), tablet (≤ 1100px), desktop. The portrait always keeps its native 1100 × 1468 proportions.
- **Layered portrait:** `portrait-grain.svg` is split into 26 grain layers (`assets/portrait/`) that animate on their own — the sun rises, the rays sway, the flower blooms, the earrings swing, the figure breathes, the beads glide, the eyes glint — and drift at different depths with the mouse. Rebuild the markup with `python _src/build_portrait.py`.
- **Reduced motion** is respected.

## Projects (card fan)

Edit `js/projects.js`. Each project has a name, category, year, role, tools, story text and deliverables.
To show real work, add images to `assets/projects/<slug>/` and list them in that project's `images` array — until then the project page shows grain mood tiles.

Cards: swipe/drag, arrow keys, the ← → buttons, or tap a side card to bring it forward. Tap the front card to open the project.

## Run locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000

## Deploy (GitHub Pages)

Push to a GitHub repo → Settings → Pages → Deploy from branch → `main` / root.

## Contact form

The form opens the visitor's email app with the message pre-filled (to pratibha10121999@gmail.com). No backend needed.
