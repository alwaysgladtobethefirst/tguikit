---
"tguikit": minor
---

New components: Portal, Modal. Completes the Phase 2 component set.

- **Portal** – renders children through `createPortal` into the `TguiProvider` wrapper (or an explicit `container`); SSR-safe, renders nothing until the target exists
- **Modal** – bottom sheet on Portal: scrim + background dim, focus trap with restore, body scroll lock, close on `Escape` / scrim tap / header button / downward drag past a threshold or flick. `dismissable={false}` removes every implicit close. Reduced motion swaps the slide for a fade.
