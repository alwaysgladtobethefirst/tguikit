# Contributing to tgui

## Setup

```bash
bun install
bun run storybook   # component workbench at :6006
bun run test        # vitest, watch mode
```

Uses [bun](https://bun.sh). Node is not required for development.

## Workflow

1. Branch off `main` — `your-handle/short-description`.
2. Make the change. One concern per PR.
3. Run the gate locally:
   ```bash
   bun run lint && bun run typecheck && bun run test:ci && bun run build
   ```
4. Add a changeset if the change affects the published package:
   ```bash
   bunx changeset
   ```
   Pick the bump, write one line — it becomes the changelog entry.
5. Open a PR. CI runs lint / types / tests+coverage / package build / size / storybook. All must pass.

`main` is squash-merged, so your PR becomes one commit titled by the PR title.

## Adding a component

Each component is a folder under `src/components/<Name>/`:

| file | holds |
| --- | --- |
| `Name.tsx` | render only |
| `Name.variants.ts` | cva / lookup tables, imports the `.module.css` |
| `Name.module.css` | styles — every colour a `--tgui--*` token, every `:hover` behind `@media (hover: hover)` |
| `Name.test.tsx` | a render test + one interaction test |
| `Name.stories.tsx` | a Storybook story with an in-context example |
| `index.ts` | public exports |

Then add it to `src/components/index.ts`.

Conventions, in short:

- React 19 — `ref` is a plain prop, never `forwardRef`.
- Compose classes with `cn(base, ...modifiers, className)` — the consumer's `className` and `style` always win.
- Motion behind `prefers-reduced-motion`. No raw hex in component CSS.
- Platform-adaptive pieces are module-level components, never defined in render.
- Comments only explain a non-obvious *why*; lowercase, one line.

See [`IMPROVEMENTS.md`](./IMPROVEMENTS.md) for what this package fixes versus the original, and the `apple-design` notes referenced there for the motion/typography bar.

## Reporting bugs

Use the issue templates. A runnable reproduction (StackBlitz / CodeSandbox) gets a fix far faster than a description.
