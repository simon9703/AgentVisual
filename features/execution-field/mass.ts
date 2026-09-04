export type MassMetrics = {
  load?: number;
  activity?: number;
  history?: number;
};

export type ZoneMassPolicy = {
  baseRadius: number;
  capacity: number;
  scale: number;
  loadWeight: number;
  activityWeight: number;
  historyWeight: number;
};

export const zoneMassPolicies = {
  agent: { baseRadius: 47, capacity: 24, scale: 20, loadWeight: .1, activityWeight: 1.25, historyWeight: .35 },
  context: { baseRadius: 41, capacity: 37, scale: 22, loadWeight: 1.35, activityWeight: .18, historyWeight: .2 },
  tools: { baseRadius: 37, capacity: 31, scale: 20, loadWeight: .28, activityWeight: 1.2, historyWeight: .55 },
  repo: { baseRadius: 35, capacity: 27, scale: 16, loadWeight: 1.1, activityWeight: .62, historyWeight: .62 },
  skills: { baseRadius: 31, capacity: 19, scale: 7, loadWeight: 1.0, activityWeight: .25, historyWeight: .55 },
  mcp: { baseRadius: 31, capacity: 22, scale: 9, loadWeight: .55, activityWeight: .9, historyWeight: .65 },
  memory: { baseRadius: 28, capacity: 17, scale: 6, loadWeight: 1.15, activityWeight: .12, historyWeight: .4 },
  test: { baseRadius: 31, capacity: 21, scale: 11, loadWeight: .18, activityWeight: 1.1, historyWeight: .55 },
  user: { baseRadius: 27, capacity: 13, scale: 8, loadWeight: .75, activityWeight: .25, historyWeight: .2 },
} as const satisfies Record<string, ZoneMassPolicy>;

export function resolveZoneMass(policy: ZoneMassPolicy, metrics: MassMetrics) {
  const score = (metrics.load ?? 0) * policy.loadWeight
    + (metrics.activity ?? 0) * policy.activityWeight
    + (metrics.history ?? 0) * policy.historyWeight;
  const saturation = 1 - Math.exp(-score / policy.scale);
  return { score, saturation, radius: policy.baseRadius + policy.capacity * saturation };
}
