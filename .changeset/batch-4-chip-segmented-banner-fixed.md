---
"tguikit": minor
---

New components: Chip, SegmentedControl, Banner, FixedLayout.

- **Chip** – a pill token: `mode` `elevated` / `outline`, `before` / `after` slots, `onClick` for a selectable chip, `onRemove` for a trailing clear button
- **SegmentedControl** – an iOS-style switcher (`SegmentedControl` + `SegmentedControlItem`) with a pill that measures and slides to the selected segment, roving tabindex, Left/Right arrows; reduced motion drops the slide
- **Banner** – a prominent inline message: `type` `section` or full-bleed `image`, with `before` / `callout` / `header` / `subheader` / `description` / `actions` slots and an optional close button
- **FixedLayout** – pins content to the `top` or `bottom` viewport edge with the matching `env(safe-area-inset-*)` padding
