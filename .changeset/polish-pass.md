---
"tguikit": patch
---

Polish pass across the component set:

- Checkbox: clicking directly on the box now toggles it (it was only reachable through a wrapping label)
- iOS Input and Select are filled fields; base keeps the outlined look
- iOS List / Section groups now read as raised cards on a grouped background
- Checkbox and TabBar transitions respect `prefers-reduced-motion`
- `--tgui--secondary_fill` is a touch stronger so bezeled buttons and the TabBar selected pill read better
- Card ambient scrim uses the black/white tokens
