# tguikit

## 0.1.1

### Patch Changes

- e26111a: Polish pass across the component set:
  
  - Checkbox: clicking directly on the box now toggles it (it was only reachable through a wrapping label)
  - iOS Input and Select are filled fields; base keeps the outlined look
  - iOS List / Section groups now read as raised cards on a grouped background
  - Checkbox and TabBar transitions respect `prefers-reduced-motion`
  - `--tgui--secondary_fill` is a touch stronger so bezeled buttons and the TabBar selected pill read better
  - Card ambient scrim uses the black/white tokens

## 0.1.0

### Minor Changes

- dce4cc1: First public release.
  
  A from-scratch reimplementation of `@telegram-apps/telegram-ui` on React 19 — 22 components (TguiProvider, the typography scale, Tappable, Button, Cell/Section/List/Divider, Card, Placeholder, Input/Select/Checkbox/Switch, TabBar), ESM-only, one stylesheet, `ref` as a plain prop everywhere, every colour a theme token, every `:hover` guarded for touch. See `IMPROVEMENTS.md` for the full list of what it fixes.
