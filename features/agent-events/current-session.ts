import { z } from 'zod';
import fixture from '@/eval/current-session.events.json';
import { AgentEvent, AgentEventKind, AgentZone } from './types';

const eventSchema = z.object({
  id: z.string(),
  at: z.number().nonnegative(),
  kind: z.custom<AgentEventKind>(),
  title: z.string(),
  detail: z.string(),
  target: z.custom<AgentZone>(),
  parentId: z.string().optional(),
  metrics: z.object({ inputTokens: z.number().nonnegative().optional(), outputTokens: z.number().nonnegative().optional(), resultBytes: z.number().nonnegative().optional(), durationMs: z.number().nonnegative().optional(), fileCount: z.number().nonnegative().optional(), lineCount: z.number().nonnegative().optional(), diffLines: z.number().nonnegative().optional(), contextAccepted: z.boolean().optional() }).optional(),
});

const sessionSchema = z.object({ schemaVersion: z.literal(1), fixture: z.string(), description: z.string(), events: z.array(eventSchema) });

export const currentSessionFixture = sessionSchema.parse(fixture);
export const currentSessionEvents: AgentEvent[] = currentSessionFixture.events;
