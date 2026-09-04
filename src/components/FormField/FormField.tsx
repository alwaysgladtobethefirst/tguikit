import type { ReactNode, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './FormField.module.css';

export type FormFieldStatus = 'default' | 'error' | 'focused';

export interface FormFieldProps {
  ref?: Ref<HTMLDivElement>;
  ios?: boolean;
  status?: FormFieldStatus;
  disabled?: boolean;
  alignStart?: boolean;
  header?: ReactNode;
  before?: ReactNode;
  after?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function FormField({
  ref,
  ios = false,
  status = 'default',
  disabled = false,
  alignStart = false,
  header,
  before,
  after,
  className,
  children,
}: FormFieldProps) {
  return (
    <div
      ref={ref}
      className={cn(
        ios ? styles.ios : styles.base,
        status === 'error' && styles.error,
        status === 'focused' && styles.focused,
        disabled && styles.disabled,
        alignStart && styles['align-start'],
        className,
      )}
      aria-disabled={disabled || undefined}
    >
      {/* biome-ignore lint/a11y/noLabelWithoutControl: the control is the field passed in as children */}
      <label className={styles.body}>
        {before != null ? <span className={styles.before}>{before}</span> : null}
        {children}
        {after != null ? <span className={styles.after}>{after}</span> : null}
      </label>
      {header != null && !ios ? <span className={styles.header}>{header}</span> : null}
    </div>
  );
}

FormField.displayName = 'FormField';
