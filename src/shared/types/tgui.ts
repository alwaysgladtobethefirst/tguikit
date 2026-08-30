export type TguiPlatform = 'ios' | 'base';

export type Appearance = 'light' | 'dark';

export interface TguiContextValue {
  platform: TguiPlatform;
  appearance: Appearance;
  // where overlay components portal into; null until the provider has mounted
  portalContainer: HTMLElement | null;
}
