# Orchestrator note (2026-11-15 23:40): the dock entry's size. BINDING for the fix seats and the release close.

A consumer holds hard first-load budgets and dropped 11.1.0 because `dist`'s dock entry grew about 1.6 KB gzipped over 11.0.2. For 11.1.1:
1. No row may grow the dock entry. Rows 12 and 13 touch dock code: measure the built dock chunk (the file a consumer's `@mkbabb/glass-ui/dock` import resolves to, plus chunks only it pulls) gzipped before and after each, and keep the net change at or below zero; if row 13's observer cure can delete code, prefer that.
2. The close records, and the CHANGELOG states in one plain line, the dock entry's gzipped size on v11.0.2, v11.1.0 and this release, measured the same way on git-archive builds. No other entry needs a line unless it grew by more than 0.5 KB gzipped.
