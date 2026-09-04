import type { ButtonHTMLAttributes, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './SegmentedControl.module.css';

export interface SegmentedControlItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
  selected?: boolean;
}

export function SegmentedControlItem({
  ref,
  selected = false,
  className,
  ...rest
}: SegmentedControlItemProps) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: a button in a radiogroup is the segmented-control ARIA pattern; a native radio can't hold arbitrary content
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={selected}
      tabIndex={selected ? 0 : -1}
      data-selected={selected || undefined}
      className={cn(styles.item, className)}
      {...rest}
    />
  );
}

SegmentedControlItem.displayName = 'SegmentedControlItem';
