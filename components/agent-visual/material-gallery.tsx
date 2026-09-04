'use client';

import { useState } from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

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
  return <div className="min-h-screen bg-[#03050d] text-slate-100"><header className="fixed inset-x-0 top-0 z-20 flex h-11 items-center justify-between border-b border-blue-200/10 bg-slate-950/75 px-[18px] backdrop-blur-md"><a href="/" className="text-[11px] tracking-[.16em]"><span className="text-blue-300">AGENT</span>VISUAL <span className="text-slate-500">/ material library</span></a><a href="/" className="flex items-center gap-1 text-[10px] tracking-wide text-slate-400 hover:text-blue-100">EXECUTION <ArrowUpRight size={13} /></a></header><main className="flex min-h-screen pt-11"><aside className="material-list"><p>SCENE MATERIALS</p>{scenes.map((scene, index) => <button key={scene.id} onClick={() => setSelected(scene)} className={selected.id === scene.id ? 'active' : ''}><span>0{index + 1}</span><b>{scene.title}</b><ChevronRight size={13} /></button>)}</aside><section className="material-showcase"><div className="material-copy"><p>{selected.kicker}</p><h1>{selected.title}</h1><div>{selected.note}</div></div><div className={`scene-frame ${selected.className}`}><SceneVisual id={selected.id} /></div></section></main></div>;
}

function SceneVisual({ id }: { id: string }) {
  if (id === 'orbit') return <div className="visual orbit-visual"><i className="matter core" /><i className="orbit-ring ring-one" /><i className="orbit-ring ring-two" /><i className="orbiter a" /><i className="orbiter b" /><i className="orbiter c" /><i className="dust" /></div>;
  if (id === 'launch') return <div className="visual launch-visual"><i className="source" />{Array.from({ length: 9 }, (_, i) => <i key={i} className={`launch-path path-${i}`} />)}<i className="confluence" /></div>;
  if (id === 'burst') return <div className="visual burst-visual"><i className="burst-core" /><i className="burst-wave wave-a" /><i className="burst-wave wave-b" />{Array.from({ length: 36 }, (_, i) => <i key={i} className={`burst-particle p-${i % 9}`} />)}</div>;
  if (id === 'beam') return <div className="visual beam-visual"><i className="beam-origin" /><i className="beam-line" /><i className="beam-head" /><i className="beam-target" />{Array.from({ length: 11 }, (_, i) => <i key={i} className={`return-dot dot-${i}`} />)}</div>;
  return <div className="visual repair-visual"><i className="repair-source" /><i className="repair-break" /><i className="repair-curve" /><i className="repair-packet" /><i className="repair-settle" /></div>;
}
