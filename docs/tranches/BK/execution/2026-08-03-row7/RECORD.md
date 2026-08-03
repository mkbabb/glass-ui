# Row #7 — dock-SIGABRT constraint: execution record (2026-08-03)

Run `wf_055e4291-b39` (scout → implement → 2 challengers → Fable adjudication, `ADJUDICATION.json`
here). Verdict: **CURE-REQUIRED — code core STANDS**; cures dispatched in the consolidated
dock/drawer round (`wf_cb664a4a-5c4`, the ⊕²⁰(e) batch).

## The fence (what #47 cites — survives GF-DOCK's rewrite of morph.css)

**THE LAW, ancestor-of-lens form:** a `filter` — `blur(0px)` included — on `.glass-dock` or on any
ancestor of a backdrop-filtered box (`.dock-plate`, the active `.glass-capsule` controls) makes
that ancestor a **Backdrop Root**: the lens samples the dock instead of the page and the glass
material flattens for the whole morph, on every engine. The transient reveal-bloom was therefore
**DELETED, not retargeted** (no safe host exists — every candidate is, or contains, a
backdrop-filtered box). How GF-DOCK expresses bloom is #47/#48's design question (#48's banked
"sibling blur-resolve" stands, TERMINAL-ROSTER:198); this fence only forbids the mechanism *over
the lens*. The fence covers authored CSS; the mechanized form is the whole-tree allowlist test in
`tests/styles/stacked-url-filter.test.ts`.

## Landed bytes

- `src/components/dock/styles/morph.css` — the `.glass-dock[data-morphing]` self-blur arm +
  `--dock-reveal-blur` deleted (+7/−29), fence comment in place (reword per C3 in the cure round).
- `tests/styles/stacked-url-filter.test.ts` — the ⊕⁵ unit case (born-RED re-latch per C1/C2 in
  the cure round; no gate seat, no roster line, per the re-scope that drops "dock").

## Routed findings

- **→ #47 (SUSPICION, stated correctly):** `dock/styles/controls/icon-button.css:92`
  `filter: brightness(…)` sits on the SAME element as the capsule's `backdrop-filter`
  (`DockControl.vue:93`) — that is *not* the ancestor backdrop-root class this row cures; the real
  question is the unconditional `brightness()` making the button a permanent backdrop root for its
  own descendants, plus the `:89` "compositor-safe" reassurance. #47 adjudicates on merit.
- **→ consolidated round (C4):** the dead `--dock-reveal-blur: 0px` PRM carve in
  `adaptive-legibility.css` (zero readers after the cut) + its false comment + the `index.css`
  clause citing it.
