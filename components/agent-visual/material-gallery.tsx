'use client';

import { useState } from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

type Scene = { id: string; title: string; kicker: string; note: string; className: string };
const scenes: Scene[] = [
  { id: 'orbit', title: 'Orbit formation', kicker: 'SATELLITE / RING GROWTH', note: 'One capability world grows retained satellites and new orbital rings.', className: 'scene-orbit' },
  { id: 'absorb', title: 'Matter absorption', kicker: 'ARRIVAL / INTEGRATION', note: 'A receiving world absorbs incoming fragments, grows denser, then settles.', className: 'scene-absorb' },
  { id: 'halo', title: 'Halo pulse', kicker: 'CONTEXT / ACTIVATION', note: 'A single context world expands a soft halo and concentric activation rings.', className: 'scene-halo' },
  { id: 'burst', title: 'Search burst', kicker: 'QUERY / DISCOVERY', note: 'One tools world emits a search burst and condenses results into retained matter.', className: 'scene-burst' },
  { id: 'beam', title: 'MCP beam', kicker: 'CROSS-SYSTEM CALL', note: 'A request crosses between two worlds; the response comes back as a particle stream.', className: 'scene-beam' },
];

export function MaterialGallery() {
  const [selected, setSelected] = useState(scenes[0]);
  return <div className="min-h-screen bg-[#03050d] text-slate-100"><header className="fixed inset-x-0 top-0 z-20 flex h-11 items-center justify-between border-b border-blue-200/10 bg-slate-950/75 px-[18px] backdrop-blur-md"><a href="/" className="text-[11px] tracking-[.16em]"><span className="text-blue-300">AGENT</span>VISUAL <span className="text-slate-500">/ material library</span></a><a href="/" className="flex items-center gap-1 text-[10px] tracking-wide text-slate-400 hover:text-blue-100">EXECUTION <ArrowUpRight size={13} /></a></header><main className="flex min-h-screen pt-11"><aside className="material-list"><p>SCENE MATERIALS</p>{scenes.map((scene, index) => <button key={scene.id} onClick={() => setSelected(scene)} className={selected.id === scene.id ? 'active' : ''}><span>0{index + 1}</span><b>{scene.title}</b><ChevronRight size={13} /></button>)}</aside><section className="material-showcase"><div className="material-caption"><span>{selected.kicker}</span><b>{selected.title}</b><em>{selected.note}</em></div><iframe key={selected.id} title={selected.title} src={`/tracefield-reference.html?material=${selected.id}`} className="material-frame" /></section></main></div>;
}
