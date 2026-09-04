# Project rule snapshot

This is a sanitized, repository-safe snapshot of the constraints applied during the current AgentVisual implementation session. It deliberately excludes system prompts, credentials, hidden instructions and unrelated workspace data.

## Product and visual rules

- Build a Next.js application that can be deployed to Vercel later.
- The Material Lab uses an English-only, small-typography, low-saturation particle-field aesthetic.
- Execution artifacts persist: a completed action becomes a dim satellite instead of disappearing.
- Every visual effect must have an event meaning: mass, beam, absorption, orbit, history and field tilt are stateful visualizations.

## Engineering rules

- Use the FinanceList stack as the baseline: Next App Router, Tailwind, lucide-react, shadcn-style UI primitives, Recharts and Zod.
- Keep provider protocols outside UI components. Codex, Claude, Gemini and MCP map into provider-neutral `AgentEvent` records.
- Separate app shell, UI primitives, visual feature, event domain, execution-field rules and utilities.
- Use direct imports, no font weight above 700, and validate with `pnpm typecheck && pnpm build`.

## Evaluation fixture policy

- Evaluation data records visible, task-relevant tool outcomes only.
- Never store system messages, credentials, local paths outside the repository, or tool output not needed for the visual replay.
- `eval/current-session.events.json` is an event fixture, not an exact model chain-of-thought transcript.
