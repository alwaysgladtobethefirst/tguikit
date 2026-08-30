import {
  type HTMLAttributes,
  type Ref,
  useCallback,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';
import { getAppearance, subscribeAppearance } from '../../shared/lib/appearance';
import { cn } from '../../shared/lib/cn';
import { getPlatform } from '../../shared/lib/platform';
import type { Appearance, TguiPlatform } from '../../shared/types/tgui';
import { TguiContext } from './context';
import styles from './TguiProvider.module.css';

export interface TguiProviderProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  platform?: TguiPlatform;
  // omit to follow the telegram / system theme live; set to pin it
  appearance?: Appearance;
  portalContainer?: HTMLElement | null;
}

const getServerAppearance = (): Appearance => 'light';

export function TguiProvider({
  ref,
  platform: platformProp,
  appearance: appearanceProp,
  portalContainer: portalContainerProp,
  className,
  children,
  ...rest
}: TguiProviderProps) {
  const platform = useMemo(() => platformProp ?? getPlatform(), [platformProp]);

  const systemAppearance = useSyncExternalStore(
    subscribeAppearance,
    getAppearance,
    getServerAppearance,
  );
  const appearance = appearanceProp ?? systemAppearance;

  const [wrapper, setWrapper] = useState<HTMLDivElement | null>(null);
  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      setWrapper(node);

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  const value = useMemo(
    () => ({
      platform,
      appearance,
      portalContainer: portalContainerProp ?? wrapper,
    }),
    [platform, appearance, portalContainerProp, wrapper],
  );

  return (
    <div
      ref={setRef}
      className={cn(
        styles.wrapper,
        platform === 'ios' && styles['wrapper--ios'],
        appearance === 'dark' && styles['wrapper--dark'],
        className,
      )}
      {...rest}
    >
      <TguiContext.Provider value={value}>{children}</TguiContext.Provider>
    </div>
  );
}

TguiProvider.displayName = 'TguiProvider';
