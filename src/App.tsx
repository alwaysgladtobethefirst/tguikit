import { TguiProvider, useTgui } from './service/TguiProvider';

function Readout() {
  const { platform, appearance } = useTgui();

  return (
    <p style={{ fontFamily: 'var(--tgui--font-family)', color: 'var(--tgui--text_color)' }}>
      platform: <b>{platform}</b> — appearance: <b>{appearance}</b>
    </p>
  );
}

export function App() {
  return (
    <TguiProvider>
      <Readout />
    </TguiProvider>
  );
}
