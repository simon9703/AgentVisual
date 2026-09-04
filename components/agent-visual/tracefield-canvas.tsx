'use client';

import { useEffect, useRef } from 'react';
import { AgentZone, currentSessionEvents, eventKinds } from '@/features/agent-events';
import { eventLinks, fieldZones } from '@/features/execution-field/config';

const zones = fieldZones;
const rgb = (hex: string) => `${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)}`;

export function TracefieldCanvas({ cursor }: { cursor: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const context = canvas.getContext('2d'); if (!context) return;
    let width = 0, height = 0, frame = 0, start = performance.now();
    const stars = Array.from({ length: 380 }, (_, index) => ({ x: ((index * 71) % 997) / 997, y: ((index * 137) % 991) / 991, r: .25 + index % 3 * .22, phase: index * .71 }));
    const resize = () => { const box = canvas.getBoundingClientRect(), ratio = Math.min(devicePixelRatio, 2); width = box.width; height = box.height; canvas.width = width * ratio; canvas.height = height * ratio; context.setTransform(ratio, 0, 0, ratio, 0, 0); };
    const observer = new ResizeObserver(resize); observer.observe(canvas); resize();
    const draw = (now: number) => {
      const t = (now - start) / 1000, shown = currentSessionEvents.slice(0, Math.max(1, cursor + 1));
      context.clearRect(0, 0, width, height);
      for (const star of stars) { const a = .13 + (Math.sin(t * .4 + star.phase) + 1) * .1; context.fillStyle = `rgba(184,204,255,${a})`; context.fillRect(star.x * width, star.y * height, star.r, star.r); }
      const active = new Set<AgentZone>(shown.map((event) => event.target));
      const density = shown.reduce<Record<string, number>>((all, event) => ({ ...all, [event.target]: (all[event.target] ?? 0) + 1 }), {});
      for (const [name, position] of Object.entries(zones) as [AgentZone, typeof zones[AgentZone]][]) {
        if (!active.has(name)) continue;
        const x = position.x / 100 * width, y = position.y / 100 * height, count = density[name] ?? 1, color = position.rgb, radius = 36 + count * 8;
        const haze = context.createRadialGradient(x, y, 1, x, y, radius * 2.3); haze.addColorStop(0, `rgba(${color},.25)`); haze.addColorStop(.28, `rgba(${color},.11)`); haze.addColorStop(1, `rgba(${color},0)`); context.fillStyle = haze; context.beginPath(); context.arc(x, y, radius * 2.3, 0, Math.PI * 2); context.fill();
        for (let particle = 0; particle < 18 + count * 8; particle++) { const phase = particle * 2.399 + t * (.18 + count * .014), orbit = radius * (.28 + (particle % 8) / 9); const px = x + Math.cos(phase) * orbit * (1 + Math.sin(t * .4 + particle) * .14), py = y + Math.sin(phase * 1.13) * orbit * .54; context.fillStyle = `rgba(${color},${.16 + (particle % 5) * .11})`; context.beginPath(); context.arc(px, py, .55 + particle % 3 * .28, 0, Math.PI * 2); context.fill(); }
        context.strokeStyle = `rgba(${color},${.13 + Math.min(count, 5) * .025})`; context.lineWidth = .65; context.beginPath(); context.ellipse(x, y, radius * 1.12, radius * (.52 + count * .02), t * .14 + count, .25, Math.PI * 1.62); context.stroke();
        context.fillStyle = `rgb(${color})`; context.shadowBlur = 20; context.shadowColor = `rgb(${color})`; context.beginPath(); context.arc(x, y, 3.4 + Math.min(count, 4) * .5, 0, Math.PI * 2); context.fill(); context.shadowBlur = 0; context.font = '10px system-ui'; context.fillStyle = `rgba(220,230,255,.72)`; context.fillText(name.toUpperCase(), x - 18, y + radius + 19);
      }
      shown.slice(-5).forEach((event, index) => { const edge = eventLinks[event.kind]; if (!edge) return; const source = zones[edge[0]], target = zones[edge[1]], sx = source.x / 100 * width, sy = source.y / 100 * height, tx = target.x / 100 * width, ty = target.y / 100 * height, curve = ((index % 2 ? 1 : -1) * 44); context.strokeStyle = `rgba(${rgb(eventKinds[event.kind].color)},${.15 + index * .04})`; context.lineWidth = 1; context.beginPath(); context.moveTo(sx, sy); context.quadraticCurveTo((sx + tx) / 2 + curve, (sy + ty) / 2 - curve, tx, ty); context.stroke(); const p = (t * .46 + index * .22) % 1, qx = (1 - p) ** 2 * sx + 2 * (1 - p) * p * ((sx + tx) / 2 + curve) + p ** 2 * tx, qy = (1 - p) ** 2 * sy + 2 * (1 - p) * p * ((sy + ty) / 2 - curve) + p ** 2 * ty; context.fillStyle = eventKinds[event.kind].color; context.shadowBlur = 14; context.shadowColor = eventKinds[event.kind].color; context.beginPath(); context.arc(qx, qy, 2.2, 0, Math.PI * 2); context.fill(); context.shadowBlur = 0; });
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw); return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [cursor]);
  return <canvas ref={ref} className="absolute inset-0 size-full" aria-label="Execution tracefield" />;
}
