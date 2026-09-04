# tguikit

## 0.3.0

### Minor Changes

- 95ff962: 18 new components, landing the Phase 2 tail and all of Phase 3 in one release.
  
  - **Portal** – renders children through `createPortal` into the `TguiProvider` wrapper or an explicit `container`; SSR-safe
  - **Sheet** – bottom sheet on Portal: scrim, focus trap with restore, scroll lock, close on `Escape` / scrim tap / header button / downward drag past a threshold or flick. Height follows content, capped at half the scrim; `container` scopes it to a box
  - **Chip** – compact removable tag, `mode` outline / filled, optional leading media and remove button
  - **SegmentedControl** – sliding-pill tab switcher, controlled or uncontrolled, keyboard arrows
  - **Banner** – inline notice with `type` section / inline, header, subheader, actions, optional background image and close
  - **FixedLayout** – pins content to the top or bottom edge with safe-area padding
  - **AvatarStack** – overlapping avatar row with a `+n` overflow count
  - **Rating** – star rating, read-only or interactive, half-step support
  - **Slider** – single or range track, `step`, ticks, keyboard control, imperative thumb drag
  - **PinInput** – fixed-length code entry, paste-aware, masked option
  - **Snackbar** – transient bottom toast, auto-dismiss, optional action and description
  - **Tooltip** – pointer/focus tooltip with placement, solid on dark
  - **Accordion** – `Accordion` + `AccordionItem` disclosure, single or `multiple`, controlled or uncontrolled; panel animates via `grid-template-rows`, closed panels `inert`
  - **Image** – framed `<img>` with shimmer placeholder, `fallback` on error, `size` / `fit` / `radius` / `bordered`
  - **Link** – themed `<a>`; `target="_blank"` fills a safe `rel` and appends an outbound arrow
  - **Blockquote** – quoted block with an accent bar and optional `author`
  - **Spoiler** – blur-to-reveal inline text on a deterministic particle field; index-ordered dissolve on reveal, static behind `prefers-reduced-motion`
  - **HorizontalScroll** – edge-fade scroller with mouse drag-to-scroll over native touch, optional `snap`
  
  Button's hover wash now follows the corner radius instead of overhanging it. Neutral surface tokens for chip / banner / avatarstack / tooltip read correctly on dark.

## 0.2.0

### Minor Changes

- 215bed5: New components: Spinner, IconButton, Radio, Badge, Skeleton.
  
  - **Spinner** — indeterminate ring, `size` s/m/l, follows `currentColor`
  - **IconButton** — icon-only button on Tappable, `mode` (plain / bezeled / gray / outline), `size`, `circle`
  - **Radio** — single choice over a native radio input, groups by `name`
  - **Badge** — count pill or status dot, `mode` (primary / critical / secondary / gray / white), `large`
  - **Skeleton** — loading placeholder with a shimmer sweep; a sized block or a content wrapper via `visible`
  
  Button's `loading` state now renders the standalone `Spinner`. `--tgui--skeleton` opacity bumped so it reads on both themes.
- 3a2972f: New components: Avatar, Textarea, Progress, CircularProgress.
  
  - **Avatar** – image with a fallback chain (image → `acronym` initials → person icon), fixed `size` scale (20 / 24 / 28 / 40 / 48 / 96), circular, children slot for a status dot
  - **Textarea** – multi-line sibling of Input, same platform container / `header` / `status`, optional `autoGrow` up to `maxRows`
  - **Progress** – linear determinate bar, `value` 0–100, `role="progressbar"`
  - **CircularProgress** – determinate SVG ring, `value` 0–100, `size` s / m / l
  
  Input's field container is factored into an internal `FormField` shared with Textarea; Input's markup and API are unchanged.

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
