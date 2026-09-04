# AgentVisual engineering guide

## Product boundary

AgentVisual observes and replays coding-agent executions. It does not execute tools itself. Provider adapters emit semantic events and the UI renders a persistent, inspectable execution field.

## Layers

| Layer | Location | Responsibility |
| --- | --- | --- |
| App shell | `app/` | routes, metadata, global visual primitives |
| UI primitives | `components/ui/` | reusable controls; no agent-domain knowledge |
| Visual feature | `components/agent-visual/` | replay interaction and presentation |
| Event domain | `features/agent-events/` | provider-neutral types, material catalog, mocks and future adapters |
| Field rules | `features/execution-field/` | zones and event-to-event topology |
| Utilities | `lib/` | framework-agnostic helpers |

## Event contract

Adapters map raw provider payloads to `AgentEvent`. Do not add Codex, Claude, Gemini or MCP protocol fields directly to rendering components.

| Source action | Semantic event |
| --- | --- |
| MCP `tools/list` | `tool_discovered` |
| MCP `tools/call` request/result | `tool_call` / `tool_result` |
| shell grep/glob | `search_started` / `search_result` |
| file read/write | `file_read` / `patch_applied` |
| skill load | `skill_loaded` |
| context compaction | `context_compacted` |

## Visual semantics

- Satellite: retained child event.
- Mass: cumulative usage controls radius, density and orbital complexity.
- Beam: request crossing system boundaries.
- Absorption: result arrival grows the target cluster.
- Completed history stays inspectable but becomes dimmer.
- Every visual material is mapped in `eventKinds`; no decoration without event meaning.

## Conventions

- MVP is English with 10–12px default UI typography.
- Use `components/ui` primitives for shared controls; no font weights above 700.
- Keep animation/replay code in client components only.
- Verify with `pnpm typecheck && pnpm build` before commit.
