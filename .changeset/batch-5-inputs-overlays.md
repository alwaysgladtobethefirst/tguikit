---
"tguikit": minor
---

New components: AvatarStack, Rating, Slider, PinInput, Snackbar, Tooltip.

- **AvatarStack** – overlapping row of Avatars with a configurable `overlap`; cap the row and add a trailing `+N` Avatar yourself
- **Rating** – star rating; interactive is a `radiogroup` with hover preview and arrow keys, `readOnly` is a labelled `img` with a fractional clip-path fill. `icon` and `count` configurable
- **Slider** – styled `input[type=range]` with a coloured fill, `before` / `after` label slots, controlled or uncontrolled
- **PinInput** – segmented code entry: auto-advance, backspace-to-previous, arrow nav, paste-to-fill, `type` numeric / alphanumeric, `mask`, `onComplete`
- **Snackbar** – `SnackbarProvider` + `useSnackbar()` imperative API. `show({ message, description, before, action, duration })` returns an id; auto-dismiss pauses on hover / focus, swipe to dismiss, stack capped at `max`
- **Tooltip** – hover / focus (long-press on touch) label anchored to a trigger, flips and clamps to the viewport, arrow tracks the trigger, closes on Escape / scroll

`useReducedMotion` moved to `src/shared/lib` (shared by Sheet, Snackbar, Tooltip).
