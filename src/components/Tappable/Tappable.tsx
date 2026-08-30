'use client';

import type { AllHTMLAttributes, ElementType, PointerEvent, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import { useTgui } from '../TguiProvider/useTgui';
import { Ripple } from './Ripple';
import styles from './Tappable.module.css';
import { useRipple } from './useRipple';

export interface TappableProps extends AllHTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  Component?: ElementType;
  // 'background' plays a material ripple on the base platform; 'opacity' dims on press
  interactiveAnimation?: 'background' | 'opacity';
}

export function Tappable({
  ref,
  Component = 'div',
  interactiveAnimation = 'background',
  className,
  children,
  onPointerDown,
  onPointerCancel,
  ...rest
}: TappableProps) {
  const { platform } = useTgui();
  const ripple = useRipple();
  const disabled = Boolean(rest.disabled);
  const readOnly = Boolean(rest.readOnly);

  const hasRipple =
    platform === 'base' && interactiveAnimation === 'background' && !readOnly && !disabled;

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (hasRipple) ripple.onPointerDown(event);
    onPointerDown?.(event);
  };

  const handlePointerCancel = (event: PointerEvent<HTMLElement>) => {
    if (hasRipple) ripple.onPointerCancel(event);
    onPointerCancel?.(event);
  };

  return (
    <Component
      ref={ref}
      className={cn(
        styles.tappable,
        platform === 'ios' && styles['tappable--ios'],
        interactiveAnimation === 'opacity' && styles['tappable--opacity'],
        className,
      )}
      data-readonly={readOnly || undefined}
      data-disabled={disabled || undefined}
      aria-disabled={disabled || undefined}
      onPointerDown={handlePointerDown}
      onPointerCancel={handlePointerCancel}
      {...rest}
    >
      {hasRipple && <Ripple waves={ripple.waves} onWaveEnd={ripple.removeWave} />}
      {children}
    </Component>
  );
}

Tappable.displayName = 'Tappable';
