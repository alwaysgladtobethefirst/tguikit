'use client';

import { DismissableLayer } from '@radix-ui/react-dismissable-layer';
import { FocusScope } from '@radix-ui/react-focus-scope';
import { Presence } from '@radix-ui/react-presence';
import {
  type CSSProperties,
  type HTMLAttributes,
  type Ref,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '../../shared/lib/cn';
import {
  computeFloatingPosition,
  type FloatingPlacement,
  type FloatingPosition,
} from '../../shared/lib/floatingPosition';
import { Portal } from '../Portal';
import { PopoverContext } from './context';
import styles from './Popover.module.css';

export interface PopoverContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  ref?: Ref<HTMLDivElement>;
  placement?: FloatingPlacement;
  gap?: number;
  container?: Element | DocumentFragment | null;
  className?: string;
}

export function PopoverContent({
  ref,
  placement = 'bottom-start',
  gap = 8,
  container,
  className,
  children,
  ...rest
}: PopoverContentProps) {
  const { open, setOpen, triggerRef, contentId } = useContext(PopoverContext);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const [contentNode, setContentNode] = useState<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<FloatingPosition | null>(null);
  const [visible, setVisible] = useState(false);

  const reposition = useCallback(() => {
    const trigger = triggerRef.current;
    const node = nodeRef.current;
    if (!trigger || !node) return;
    setPosition(
      computeFloatingPosition(
        trigger.getBoundingClientRect(),
        node.getBoundingClientRect(),
        placement,
        gap,
      ),
    );
  }, [placement, gap, triggerRef]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: contentNode re-runs this once Presence actually mounts the div, one render after `open` flips
  useLayoutEffect(() => {
    if (!open) {
      setVisible(false);
      return;
    }
    reposition();
  }, [open, reposition, contentNode]);

  useEffect(() => {
    if (!open || !position) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    const onScrollOrResize = () => reposition();
    window.addEventListener('resize', onScrollOrResize);
    window.addEventListener('scroll', onScrollOrResize, true);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onScrollOrResize);
      window.removeEventListener('scroll', onScrollOrResize, true);
    };
  }, [open, position, reposition]);

  return (
    <Portal container={container}>
      <Presence present={open}>
        <FocusScope
          asChild
          trapped
          loop
          onUnmountAutoFocus={(event) => {
            event.preventDefault();
            triggerRef.current?.focus();
          }}
        >
          <DismissableLayer
            asChild
            deferPointerDownOutside
            onEscapeKeyDown={() => setOpen(false)}
            onPointerDownOutside={() => setOpen(false)}
            onFocusOutside={() => setOpen(false)}
          >
            <div
              ref={(node) => {
                nodeRef.current = node;
                setContentNode(node);
                if (typeof ref === 'function') ref(node);
                else if (ref) (ref as { current: HTMLDivElement | null }).current = node;
              }}
              id={contentId}
              role="dialog"
              data-side={position?.side}
              className={cn(styles.content, visible && styles['content--visible'], className)}
              style={
                position
                  ? { top: position.top, left: position.left }
                  : ({ top: 0, left: 0, visibility: 'hidden' } as CSSProperties)
              }
              {...rest}
            >
              {children}
            </div>
          </DismissableLayer>
        </FocusScope>
      </Presence>
    </Portal>
  );
}

PopoverContent.displayName = 'PopoverContent';
