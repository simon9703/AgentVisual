# AgentVisual

An interactive, no-build MVP for visualising a coding agent's execution as a sparse particle field that evolves into retained event systems.

Run `pnpm install && pnpm dev`, then open `http://localhost:3000`.

## What is in this MVP

- **Material Lab**: search bursts, request beams, rotating/warping orbits, satellite growth, field tilt, result absorption and retained history.
- **Portable semantic event layer** in `features/agent-events/`: prompt, reasoning, skill, MCP, tool, search, read, patch, test, retry, context and memory events.
- **Replayable mock run**: prompt → reasoning → skill/MCP discovery → search → read → patch → test failure → retry → pass → memory write.

## Adapter direction

Raw provider events should be mapped into the event kinds rather than rendered directly. The same visual vocabulary can cover Codex CLI, Gemini CLI, Claude Code, or custom MCP clients.

See [`agent.md`](agent.md) for the feature boundaries, visual semantics and adapter contract.

| Source event | Semantic event |
| --- | --- |
| MCP `tools/list` | `tool_discovered` |
| MCP `tools/call` request/result | `tool_call` / `tool_result` |
| shell `rg`, `grep`, glob | `search_started` / `search_result` |
| file read/write | `file_read` / `patch_applied` |
| skill load | `skill_loaded` |
| compaction | `context_compacted` |
