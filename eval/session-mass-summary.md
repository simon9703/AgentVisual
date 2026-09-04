# Current session mass summary

The sanitized project setup session has 16 semantic events: four patches, two reads, two test starts, one failed validation, one retry, one memory write, and one sync result.

It is intentionally not interpreted as equal-sized events:

- The two reference reads contribute repository load and only contribute context load when their result is accepted.
- The initial project and Tracefield patches have substantially higher repository activity/history weight than the small repair patch because they affect more files and diff lines.
- The memory write remains compact: it has high semantic value but low content volume.
- Tests mainly contribute activity and instability/success state, rather than loading content into Context.

The adapter contract records `inputTokens`, `outputTokens`, `resultBytes`, `durationMs`, `fileCount`, `lineCount`, `diffLines`, and `contextAccepted`. A real Codex adapter should populate these from tool calls and model messages; it must not equate tool invocation count with context size.
