'use client';

import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import { InlineButtonsContext } from './context';
import styles from './InlineButtons.module.css';
import type { InlineButtonsMode } from './InlineButtons.variants';
import { InlineButtonsItem } from './InlineButtonsItem';

export type { InlineButtonsMode };

export interface InlineButtonsProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  mode?: InlineButtonsMode;
}

export function InlineButtons({
  ref,
  mode = 'bezeled',
  className,
  children,
  ...rest
}: InlineButtonsProps) {
  return (
    <InlineButtonsContext.Provider value={{ mode }}>
      {/* biome-ignore lint/a11y/useSemanticElements: a row of action buttons, not a form control group; <fieldset> would add a border box and legend semantics we don't want */}
      <div ref={ref} role="group" className={cn(styles.group, className)} {...rest}>
        {children}
      </div>
    </InlineButtonsContext.Provider>
  );
}

InlineButtons.displayName = 'InlineButtons';
InlineButtons.Item = InlineButtonsItem;
