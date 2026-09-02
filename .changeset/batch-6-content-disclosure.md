---
"tguikit": minor
---

New components: Accordion, Image, Link, Blockquote, Spoiler, HorizontalScroll.

- **Accordion** – `Accordion` + `AccordionItem` disclosure sections, single or `multiple` open, controlled or uncontrolled. Panel height animates via `grid-template-rows: 0fr → 1fr`; a closed panel is `inert`. Headers are `<button>` with `aria-expanded` / `aria-controls`
- **Image** – framed `<img>` with a shimmer placeholder until `load`, a `fallback` on `error`, and `size` / `width` / `height` / `aspectRatio`, `fit`, `radius`, `bordered`
- **Link** – themed `<a>`; `target="_blank"` fills a safe `rel` and appends an outbound arrow
- **Blockquote** – quoted block with a `--tgui--link_color` bar and an optional `author` line
- **Spoiler** – Telegram-style blur-to-reveal for inline text; toggles on click / Enter / Space, shimmer behind `prefers-reduced-motion`, content `aria-hidden` while concealed
- **HorizontalScroll** – edge-fade scroller (`mask-image` on whichever side has more content), mouse drag-to-scroll on top of native touch, optional `snap`
