---
"tguikit": minor
---

New components: Avatar, Textarea, Progress, CircularProgress.

- **Avatar** – image with a fallback chain (image → `acronym` initials → person icon), fixed `size` scale (20 / 24 / 28 / 40 / 48 / 96), circular, children slot for a status dot
- **Textarea** – multi-line sibling of Input, same platform container / `header` / `status`, optional `autoGrow` up to `maxRows`
- **Progress** – linear determinate bar, `value` 0–100, `role="progressbar"`
- **CircularProgress** – determinate SVG ring, `value` 0–100, `size` s / m / l

Input's field container is factored into an internal `FormField` shared with Textarea; Input's markup and API are unchanged.
