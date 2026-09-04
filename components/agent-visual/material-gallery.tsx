'use client';

import { useState } from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { MaterialCanvas, MaterialKind, MaterialSettings } from './material-canvas';

type Scene = { id: string; title: string; kicker: string; note: string; className: string };
const scenes: Scene[] = [
  { id: 'orbit', title: 'Adaptive orbit', kicker: 'PERSISTENCE / CHILD EVENTS', note: 'A field begins almost empty. Each execution adds a retained satellite and slightly warps the orbital path.', className: 'scene-orbit' },
  { id: 'launch', title: 'Launch and confluence', kicker: 'FAN OUT / CONVERGENCE', note: 'One action splits into fast packets, then the packets slowly converge at the next semantic boundary.', className: 'scene-launch' },
  { id: 'burst', title: 'Search burst', kicker: 'QUERY / DISCOVERY', note: 'A query expands from a dense core. Returned file fragments condense into a smaller, stable local cloud.', className: 'scene-burst' },
  { id: 'beam', title: 'MCP request beam', kicker: 'CROSS-SYSTEM CALL', note: 'A request is a narrow high-energy beam; its result returns as a distributed stream rather than a second beam.', className: 'scene-beam' },
  { id: 'repair', title: 'Repair wave', kicker: 'FAILURE / RETRY / SETTLING', note: 'A failed test creates a short red instability, bends the path backwards, and settles to a cool stable trace after pass.', className: 'scene-repair' },
];

export function MaterialGallery() {
  const [selected, setSelected] = useState(scenes[0]);
  const [settings, setSettings] = useState<MaterialSettings>({ density: 90, speed: 1, glow: 1, scale: 1 });
  const change = (key: keyof MaterialSettings, value: number) => setSettings((state) => ({ ...state, [key]: value }));
  return <div className="min-h-screen bg-[#03050d] text-slate-100"><header className="fixed inset-x-0 top-0 z-20 flex h-11 items-center justify-between border-b border-blue-200/10 bg-slate-950/75 px-[18px] backdrop-blur-md"><a href="/" className="text-[11px] tracking-[.16em]"><span className="text-blue-300">AGENT</span>VISUAL <span className="text-slate-500">/ material library</span></a><a href="/" className="flex items-center gap-1 text-[10px] tracking-wide text-slate-400 hover:text-blue-100">EXECUTION <ArrowUpRight size={13} /></a></header><main className="flex min-h-screen pt-11"><aside className="material-list"><p>SCENE MATERIALS</p>{scenes.map((scene, index) => <button key={scene.id} onClick={() => setSelected(scene)} className={selected.id === scene.id ? 'active' : ''}><span>0{index + 1}</span><b>{scene.title}</b><ChevronRight size={13} /></button>)}</aside><section className="material-showcase"><div className="material-copy"><p>{selected.kicker}</p><h1>{selected.title}</h1><div>{selected.note}</div></div><div className="scene-frame"><MaterialCanvas kind={selected.id as MaterialKind} settings={settings} /></div></section><aside className="material-controls"><p>SCENE CONFIG</p><Control label="particle density" value={settings.density} min={24} max={180} step={1} onChange={(v) => change('density', v)} /><Control label="motion speed" value={settings.speed} min={.3} max={2.4} step={.1} onChange={(v) => change('speed', v)} /><Control label="glow" value={settings.glow} min={.2} max={2} step={.1} onChange={(v) => change('glow', v)} /><Control label="camera scale" value={settings.scale} min={.7} max={1.5} step={.05} onChange={(v) => change('scale', v)} /></aside></main></div>;
}
function Control({ label, value, min, max, step, onChange }: { label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void }) { return <label><span>{label}<b>{value}</b></span><input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} /></label>; }
