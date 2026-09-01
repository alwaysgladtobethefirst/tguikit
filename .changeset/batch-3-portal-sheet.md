---
"tguikit": minor
---

New components: Portal, Sheet. Completes the Phase 2 component set.

- **Portal** – renders children through `createPortal` into the `TguiProvider` wrapper (or an explicit `container`); SSR-safe, renders nothing until the target exists
- **Sheet** – a bottom sheet on Portal: scrim + background dim, focus trap with restore, body scroll lock, close on `Escape` / scrim tap / header button / downward drag past a threshold or flick. `dismissable={false}` removes every implicit close. Reduced motion swaps the slide for a fade. Height follows content, capped at `--tgui--sheet--max-height` (default half the scrim); pass a `container` to scope it to a box instead of the viewport.

Button's hover wash now follows the button's corner radius instead of overhanging it.
