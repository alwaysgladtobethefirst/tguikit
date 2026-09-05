---
"tguikit": minor
---

New component: Popover, an anchored/positioned overlay for menus, pickers, and other transient chrome.

- `Popover` / `Popover.Trigger` / `Popover.Content` as siblings — the trigger clones your control, the content portals out and positions itself against it with an 8-way `placement` (side + optional `-start`/`-end` alignment)
- flips to the opposite side when it would clip the viewport, clamps on the cross axis
- focus-trapped while open (loops within content, returns to the trigger on close), dismisses on `Escape`, an outside click, or focus leaving the content
- first library component built on a few small Radix UI primitives (`@radix-ui/react-focus-scope`, `@radix-ui/react-dismissable-layer`, `@radix-ui/react-presence`) for the accessibility-critical plumbing — positioning and all visuals are still hand-rolled, no `@radix-ui/react-popper` (measured and rejected at ~11.5 kB; the three primitives actually used add ~5.3 kB combined)
