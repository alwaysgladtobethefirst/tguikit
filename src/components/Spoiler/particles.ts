export interface Particle {
  x0: number;
  y0: number;
  vx: number;
  vy: number;
  life: number;
  respawn: number;
  phase: number;
  size: number;
  square: boolean;
}

const TAU = Math.PI * 2;
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

// particle grows in over `up` seconds, holds, shrinks over `down` seconds
function trapezoid(life: number, up: number, down: number, t: number) {
  const hold = Math.max(up, life - down);
  if (t < up) return Math.max(0, t / up);
  if (t > hold) return Math.max(0, 1 - (t - hold) / (life - hold));
  return 1;
}

export function createParticles(w: number, h: number, density: number): Particle[] {
  const count = Math.round(Math.min(1800, Math.max(12, density * w * h)));
  const particles: Particle[] = [];
  for (let i = 0; i < count; i += 1) {
    const speed = 2 + Math.random() * 10;
    const angle = Math.random() * TAU;
    const life = 0.3 + Math.random() * 1.2;
    const respawn = Math.random();
    particles.push({
      x0: Math.random() * w,
      y0: Math.random() * h,
      vx: speed * Math.cos(angle),
      vy: speed * Math.sin(angle),
      life,
      respawn,
      phase: Math.random() * (life + respawn),
      size: 1 + Math.random() * 0.7,
      square: Math.random() > 0.5,
    });
  }
  return particles;
}

// paints one frame; `stop` is the loop time (s) at which the reveal began, or null
export function paintParticles(
  ctx: CanvasRenderingContext2D,
  pixelW: number,
  pixelH: number,
  dpr: number,
  particles: Particle[],
  color: readonly [number, number, number],
  time: number,
  stop: number | null,
  fade: number,
) {
  ctx.clearRect(0, 0, pixelW, pixelH);
  const w = pixelW / dpr;
  const h = pixelH / dpr;
  const [r, g, b] = color;
  const n = particles.length;

  for (let i = 0; i < n; i += 1) {
    const p = particles[i];
    const period = p.life + p.respawn;

    if (stop != null) {
      const spawned = Math.floor((time + p.phase) / period);
      const lastAllowed = Math.floor((stop + p.phase) / period);
      if (spawned > lastAllowed) continue;
    }

    const local = (time + p.phase) % period;
    if (local >= p.life) continue;

    let x = (p.x0 + p.vx * local) % w;
    if (x < 0) x += w;
    let y = (p.y0 + p.vy * local) % h;
    if (y < 0) y += h;

    const visible = trapezoid(p.life, 0.15, 0.3, local);
    let alpha = visible * (0.45 + 0.55 * (1 - local / p.life));

    if (stop != null && fade > 0) {
      const fadeStart = stop + ((2 / 3) * fade * i) / n;
      const progress = clamp01((time - fadeStart) / ((1 / 3) * fade));
      alpha *= easeOutCubic(1 - progress);
    }

    if (alpha <= 0.01) continue;

    const size = Math.max(0.5, p.size * visible) * dpr;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
    ctx.beginPath();
    if (p.square) {
      ctx.rect(x * dpr, y * dpr, size, size);
    } else {
      ctx.arc(x * dpr, y * dpr, size / 2, 0, TAU);
    }
    ctx.fill();
  }
}
