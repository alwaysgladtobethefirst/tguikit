import styles from './Ripple.module.css';
import type { Wave } from './useRipple';

interface RippleProps {
  waves: Wave[];
  onWaveEnd: (id: number) => void;
}

export function Ripple({ waves, onWaveEnd }: RippleProps) {
  return (
    <span aria-hidden className={styles.ripple}>
      {waves.map((wave) => (
        <span
          key={wave.id}
          className={styles.wave}
          style={{ top: wave.y, left: wave.x }}
          onAnimationEnd={() => onWaveEnd(wave.id)}
        />
      ))}
    </span>
  );
}
