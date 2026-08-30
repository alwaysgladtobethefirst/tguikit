import { type PointerEvent, useCallback, useEffect, useRef, useState } from 'react';

// so a quick scroll doesn't leave a wave behind
const PRESS_DELAY = 70;
// fallback for when animationend never fires (reduced motion)
const WAVE_FALLBACK = 600;

export interface Wave {
  id: number;
  x: number;
  y: number;
}

type Timer = ReturnType<typeof setTimeout>;

export function useRipple() {
  const [waves, setWaves] = useState<Wave[]>([]);
  const nextId = useRef(0);
  const pressTimers = useRef(new Map<number, Timer>());
  const waveTimers = useRef(new Set<Timer>());

  useEffect(() => {
    const press = pressTimers.current;
    const wave = waveTimers.current;
    return () => {
      for (const timer of press.values()) clearTimeout(timer);
      for (const timer of wave) clearTimeout(timer);
    };
  }, []);

  const removeWave = useCallback((id: number) => {
    setWaves((current) => current.filter((wave) => wave.id !== id));
  }, []);

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const { top, left } = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - left;
      const y = event.clientY - top;
      const { pointerId } = event;

      const press = setTimeout(() => {
        pressTimers.current.delete(pointerId);
        const id = nextId.current++;
        setWaves((current) => [...current, { id, x, y }]);

        const fallback = setTimeout(() => {
          waveTimers.current.delete(fallback);
          removeWave(id);
        }, WAVE_FALLBACK);
        waveTimers.current.add(fallback);
      }, PRESS_DELAY);

      pressTimers.current.set(pointerId, press);
    },
    [removeWave],
  );

  const onPointerCancel = useCallback((event: PointerEvent<HTMLElement>) => {
    const press = pressTimers.current.get(event.pointerId);
    if (press) {
      clearTimeout(press);
      pressTimers.current.delete(event.pointerId);
    }
  }, []);

  return { waves, onPointerDown, onPointerCancel, removeWave };
}
