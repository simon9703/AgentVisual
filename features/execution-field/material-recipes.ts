export type MaterialRecipeId = 'orbit' | 'absorb' | 'halo' | 'burst' | 'beam';

export type MaterialRecipe = {
  visible: readonly string[];
  positions: Record<string, readonly [number, number]>;
  eventKinds: readonly string[];
  sourceScenario: 'project-setup' | 'parallel-research';
};

// Material is a focused renderer preset. The main field combines these same primitives.
export const materialRecipes: Record<MaterialRecipeId, MaterialRecipe> = {
  orbit: { visible: ['skills'], positions: { skills: [.5, .52] }, eventKinds: ['skill_discovered', 'skill_loaded'], sourceScenario: 'project-setup' },
  absorb: { visible: ['agent', 'memory', 'context'], positions: { agent: [.2, .58], memory: [.5, .34], context: [.76, .54] }, eventKinds: ['context_assembled', 'memory_loaded'], sourceScenario: 'project-setup' },
  halo: { visible: ['context'], positions: { context: [.5, .52] }, eventKinds: ['context_assembled'], sourceScenario: 'project-setup' },
  burst: { visible: ['tools', 'repo'], positions: { tools: [.43, .52], repo: [.74, .55] }, eventKinds: ['search_started', 'search_result', 'file_read'], sourceScenario: 'parallel-research' },
  beam: { visible: ['tools', 'mcp'], positions: { tools: [.24, .56], mcp: [.76, .43] }, eventKinds: ['mcp_connected', 'tool_call', 'tool_result'], sourceScenario: 'parallel-research' },
};
