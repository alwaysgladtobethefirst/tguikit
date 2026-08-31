export type TguiPlatform = 'ios' | 'base';

export type Appearance = 'light' | 'dark';

export interface TguiContextValue {
  platform: TguiPlatform;
  appearance: Appearance;
  portalContainer: HTMLElement | null;
}
