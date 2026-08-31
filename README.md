# tguikit

React 19 component library for Telegram Mini Apps — a modern reimplementation of [`@telegram-apps/telegram-ui`](https://github.com/telegram-mini-apps-dev/TelegramUI).

> Pre-release. The API is still moving before `1.0`.

## Install

```bash
bun add tguikit
```

`react` and `react-dom` 19 are peer dependencies.

## Use

```tsx
import { TguiProvider, Button } from 'tguikit';
import 'tguikit/styles.css';

export function App() {
  return (
    <TguiProvider>
      <Button mode="filled" size="l" stretched>
        Continue
      </Button>
    </TguiProvider>
  );
}
```

`TguiProvider` supplies the theme and platform. It follows the Telegram / system light–dark theme automatically; pass `appearance` or `platform` to pin them.

## What it fixes

See [`IMPROVEMENTS.md`](./IMPROVEMENTS.md) — ref forwarding, theme tokens, touch-safe hover, SSR, a real package build, and a bundle roughly a tenth the size of the original.

## Develop

```bash
bun install
bun run storybook
```

Storybook is the workbench — every component has a story. See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## License

MIT
