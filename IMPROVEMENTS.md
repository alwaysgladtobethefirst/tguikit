# Improvements over `@telegram-apps/telegram-ui`

This package is a from-scratch reimplementation of [`@telegram-apps/telegram-ui`](https://github.com/telegram-mini-apps-dev/TelegramUI). It keeps the visual language of the original (which mirrors Telegram's iOS client) but rebuilds the internals on a modern baseline and fixes the recurring problems that went unaddressed upstream.

`#NN` refers to an issue or PR on `telegram-mini-apps-dev/TelegramUI`.

## Systemic

These hold across every component, not case by case.

- **React 19 baseline.** `ref` is a plain prop everywhere – no `forwardRef`, no `as X` casts. Upstream was missing ref forwarding across most of the set (#60, #64, #73, #80, #81, #86) and each was patched one component at a time.
- **`className` / `style` from the consumer always win.** Every component composes `cn(base, ...modifiers, className)` with the consumer class last and spreads `{...rest}` (so `style`) last. The original's single biggest complaint cluster was styles being replaced instead of merged (#43, #30, #45, #72, #88, #90, #105).
- **No raw colours in component CSS.** Every colour is a `--tgui--*` token that traces to a `--tg-theme-*` variable (or a `color-mix()` of one), so components track the user's Telegram theme and custom themes (#2, #24, #42, #53, #59, #83, #114).
- **Hover is guarded for touch.** Every `:hover` rule sits behind `@media (hover: hover) and (pointer: fine)`, so styles don't stick after a tap on mobile (#45, #52).
- **Motion respects `prefers-reduced-motion`.** Ripples, transitions and springs degrade to instant state changes.
- **Nothing is rebuilt on every render.** Platform-adaptive subcomponents are defined at module level, never inside render via `useCallback` / inline definitions – the original churned component identity and thrashed the DOM (#86).
- **Complete public exports.** `src/components/index.ts` exports every component and subcomponent (`TabBar.Item`, `Section.Header`, `Section.Footer`, …) (#14, #17, #32, #63).
- **SSR-safe.** Platform / appearance / Telegram detection is `typeof window` guarded; the provider follows the theme through `useSyncExternalStore`, so no hydration flash (#12, #13, #16, #76). No `:root` selectors leak – all tokens are scoped to the provider element (#13).
- **Real package.** ESM `exports` map, bundled `.d.ts`, `sideEffects` limited to the CSS, React externalised as a peer dependency, `publint` + `arethetypeswrong` clean. The original's packaging broke repeatedly (#3, #22, #107, #108, PR #6). One stylesheet at `tguikit/styles.css`.

## Correctness

- **`TguiProvider`** – fixes the conditional-hook bug in the old `usePlatform` (it called `useContext` after an early `return`). Drops the `isRendered` context-flag hack: the portal container lives in state, so consumers re-render when it mounts. `useTgui()` throws a clear error outside a provider instead of silently returning defaults.
- **`Tappable`** – ripple waves self-remove on `animationend` with a fallback timer, so CSS owns the duration and the JS timer can't cut the animation short. Wave keys come from a counter, not `Date.now()` (which collides on fast taps). All pending timers are cleared on unmount. Forwards the consumer's `onPointerDown` / `onPointerCancel` (#103).
- **`Button`** – `loading` blocks input via `pointer-events: none` + `aria-busy`; the original's loading state still fired `onClick`. `type="button"` is only set on a real `<button>`, never on `<a>` or a router link. Forwards pointer handlers through `Tappable` (#102).
- **`Select`** – `ref` is typed `HTMLSelectElement`. The original declared `forwardRef<HTMLInputElement>` on a `<select>` (#75). Keeps the native OS picker on mobile (`appearance: none` on the element only).
- **`Checkbox` / `Switch`** – a CSS-drawn control over a visually-hidden **native** input, so both stay keyboard-focusable and form-associated with no `VisuallyHidden` or SVG-file dependency. `Checkbox` reflects `indeterminate` onto the real input, so form libraries read the right state. A `Checkbox` row can be wrapped in `<Cell Component="label">` for a full-row hit target.
- **`Cell` / `Tappable`** – hover and ripple only appear when the element is actually interactive (`onClick` / `href` / `a` / `button` / `label`), so static rows don't read as tappable.
- **`Section`** – `SectionFooter` text uses `--tgui--hint_color`, not the section-header colour (#109, PR #110 was never merged). `SectionHeaderProps` extends `HTMLAttributes<HTMLElement>`; the original had `HTMLHeadElement` (that's `<head>`).
- **`Divider`** – `border: none` + `border-block-start`, instead of the original's `border-top: none` plus orphaned `border-width` / `border-color` that relied on the `<hr>` user-agent border.

## API

- **`Typography` family** – drops the `plain` prop, which defaulted to `true`, meant "no margin", and was an opt-*out* despite its name. Variant classes come from `cva`.
- **`Headline`** defaults to semibold (`weight="2"`). The original took Apple's "Headline" name but not its weight, leaving a 19px regular that was indistinguishable from body `Text` (#49). `LargeTitle` defaults to bold with tightened tracking.
- **`Input`** – no hardcoded, non-overridable wrapper `padding` / `gap`. The original's `.wrapper { padding: 12px 16px; gap: 12px }` swallowed consumer styles (PR #113, #72, #90). `FormInput` is inlined – no two-layer abstraction for a single consumer. Focus / blur handlers merge with the consumer's rather than overwriting them. On base it is a self-contained field; on iOS it is a borderless row for a `Section`.
- **`Card`** – no `as CardWithComponents` cast; context value is a plain `useMemo`, not a custom `useObjectMemo` hook.
- **`List`** – polymorphic `Component` typed through `HTMLAttributes<HTMLElement>`; the original pinned `HTMLDivElement` even though `Component` accepts anything.
- **`TabBar`** – renamed from `Tabbar` / `Tabbar.Item` for casing consistency with `IconButton`, `AvatarStack`, `SegmentedControl`. Renders a `<nav>` with `aria-current="page"` on the selected item. Not `position: fixed` – no `FixedLayout` dependency, the consumer places it, with `env(safe-area-inset-bottom)` handled (#78, #91).

## Design

- The type scale is Apple's iOS text styles, with weight semantics restored (`Headline` semibold, `LargeTitle` bold) and a Storybook reference page that shows each step's job.
- iOS `Switch` off-track uses a translucent `systemFill` grey that reads on both themes, instead of a token that sat near the background colour.
- Neutral surface tokens (`--tgui--card_bg_color`, `--tgui--tertiary_bg_color`, `--tgui--quartenary_bg_color`, `--tgui--segmented_control_active_bg`) are derived from the live theme with `color-mix()`, with solid fallbacks. The original shipped fixed greys (`#2a2a2a`, `#2f2f2f`, …) that clashed with Telegram's blue-grey dark theme (#114, #53, #59).

## Documentation

- Every component has a Storybook story with an "in context" example and a prose description – the original's stories rarely explained usage (#10, #49, #78, #88, #105, #106).

## Bundle size

Both packages built the same way: React (and other shared deps) externalised, `esbuild --minify`, then gzipped.

| | `@telegram-apps/telegram-ui` 2.1.13 | this package |
| --- | --- | --- |
| components | ~60 | 22 |
| JS – whole kit | 209 kB → **67.5 kB gzip** | 16 kB → **5.6 kB gzip** |
| JS – smallest usable import (a button + the provider) | 31 kB → 6.4 kB gzip | *(one 5.6 kB gzip bundle)* |
| CSS – one file, always loaded in full | 46 kB → **10.8 kB gzip** | 21 kB → **4.7 kB gzip** |
| runtime dependencies | 4 (`@floating-ui/react-dom`, `@xelene/vaul-with-scroll-fix`, `@swc/helpers`, `@twa-dev/types`) | 2 (`clsx`, `class-variance-authority` – together under 2 kB) |
| npm install | 8.2 MB, 1918 files (ships a second CJS build and a bundled Storybook) | 143 kB, 6 files |
| React | 18 (peer) | 19 (peer) |

The kits aren't the same size – 22 components against ~60. The comparison that holds regardless: **this entire kit (5.6 kB JS + 4.7 kB CSS gzip) is smaller than the legacy library's single smallest usable import** (6.4 kB JS + its full 10.8 kB CSS, because that stylesheet is monolithic and always ships whole). As Phase 2 components land this package grows too – from a much lower floor, and with leaner per-component CSS (no dead custom properties, theme-derived tokens).

The components use CSS Modules, not Tailwind – `tailwind-merge` was dropped once it was clear nothing needed it, which roughly halved the JavaScript. `cn` is now a thin `clsx` wrapper. `size-limit` holds the bundle to a budget in CI.
