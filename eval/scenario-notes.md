# Eval replay scenarios

`scenarios.json` uses sanitized, semantic Codex-style events rather than raw tool output. Each scenario begins with bootstrap events so a renderer can show state being assembled before the first user turn:

- `context_assembled`: instructions, request, repository facts enter context.
- `memory_loaded`: remembered constraints attach as low-energy satellites.
- `skill_loaded`, `mcp_connected`, `tool_discovered`: capability systems initialize and gain orbiting children.
- Runtime events then grow the relevant parent system. Search, function calls, and patches belong to `tools`; they are not independent planets.

The four fixtures cover current-project setup, multi-turn interaction, fan-out/fan-in parallel work, and validation repair.
