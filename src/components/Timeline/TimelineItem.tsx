import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './Timeline.module.css';

export interface TimelineItemProps extends Omit<HTMLAttributes<HTMLLIElement>, 'title'> {
  ref?: Ref<HTMLLIElement>;
  title: ReactNode;
  description?: ReactNode;
  time?: ReactNode;
  active?: boolean;
}

export function TimelineItem({
  ref,
  title,
  description,
  time,
  active = false,
  className,
  ...rest
}: TimelineItemProps) {
  return (
    <li
      ref={ref}
      className={cn(styles.item, className)}
      data-active={active || undefined}
      {...rest}
    >
      <span className={styles.rail} aria-hidden>
        <span className={styles.connector} />
        <span className={styles.dot} />
      </span>
      <div className={styles.content}>
        <div className={styles.heading}>
          <span className={styles.title}>{title}</span>
          {time != null ? <span className={styles.time}>{time}</span> : null}
        </div>
        {description != null ? <div className={styles.description}>{description}</div> : null}
      </div>
    </li>
  );
}

TimelineItem.displayName = 'TimelineItem';
