export type AgentEventKind = 'prompt' | 'reasoning' | 'skill_discovered' | 'skill_loaded' | 'mcp_connected' | 'tool_discovered' | 'tool_call' | 'tool_result' | 'search_started' | 'search_result' | 'file_read' | 'function_call' | 'patch_applied' | 'test_started' | 'test_failed' | 'retry' | 'test_passed' | 'memory_written' | 'context_compacted';
export type AgentZone = 'context' | 'think' | 'skills' | 'mcp' | 'search' | 'repo' | 'tools' | 'test' | 'memory';
export type AgentEventMetrics = { inputTokens?: number; outputTokens?: number; resultBytes?: number; durationMs?: number; fileCount?: number; lineCount?: number; diffLines?: number; contextAccepted?: boolean };
export type AgentEvent = { id: string; at: number; kind: AgentEventKind; title: string; detail: string; target: AgentZone; parentId?: string; metrics?: AgentEventMetrics };
export type EventMaterial = { zone: AgentZone; effect: string; color: string };
