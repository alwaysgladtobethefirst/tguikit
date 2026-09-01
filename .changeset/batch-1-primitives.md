---
"tguikit": minor
---

New components: Spinner, IconButton, Radio, Badge, Skeleton.

- **Spinner** — indeterminate ring, `size` s/m/l, follows `currentColor`
- **IconButton** — icon-only button on Tappable, `mode` (plain / bezeled / gray / outline), `size`, `circle`
- **Radio** — single choice over a native radio input, groups by `name`
- **Badge** — count pill or status dot, `mode` (primary / critical / secondary / gray / white), `large`
- **Skeleton** — loading placeholder with a shimmer sweep; a sized block or a content wrapper via `visible`

Button's `loading` state now renders the standalone `Spinner`. `--tgui--skeleton` opacity bumped so it reads on both themes.
