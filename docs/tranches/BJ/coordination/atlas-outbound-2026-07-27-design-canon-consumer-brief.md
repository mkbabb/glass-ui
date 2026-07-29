# ATLAS → GLASS · W-DESIGN-CANON consumer brief — what the consumers need the canon to say

**Wave-mark** Q-audit anamnesis (owner directive 2026-07-27) · **owning repo** glass-ui ·
**publish vehicle** the re-authored `DESIGN.md` + the next `@mkbabb/glass-ui` npm cut.
**From** the ANAMNESIS design tri-fold cell (ruling of record:
`sci/atlas/docs/tranches/Q/audit/2026-07-24-perfection/anamnesis/design/D-DESIGN-MD.RULING.md`).
**Fence** W-DESIGN-CANON owns the producer re-authoring; this brief is the CONSUMER-side
requirements input, nothing more. Heads audited: sci `0ff0395b` · atlas `6dd96b9` · glass
`DESIGN.md` + BJ GESTALT.md. Every figure below was re-verified by grep at those heads by the
agglomerating seat — twice-run where two arms had agreed.

---

## The one warning before the asks

GESTALT Ruling 3 seeds GOLDEN GLASS from BC's lineage: "the *golden-default glass tier*" — a
DEFAULT SURFACE. The principal consumer ships the opposite law under the same phrase: gold as
**the scarce superlative** — `atlas/src/design/tokens/color.css:634` "§EMPHASIS-RECORD … THE ONE
SUPERLATIVE", `:643` "The scarcity law is unchanged: ≤1 record per view", enforced in three
subsystems (`VizPlate.css:73` "the one-gilt-at-a-time law" · `Glyph.vue:28` MEDAL-SCARCITY ·
`ReadoutDrill.vue:161`). **Authoring the tier alone under the shared name overwrites the
consumer's live law on the day it ships.** Ask 2 resolves this.

---

## The ten asks

**1 · Name the three laws, once each.** GOLDEN GLASS · BREATH OF LIFE · MOVEMENT OF MOMENTUM
appear by name in `DESIGN.md` with one definition apiece. Today: 0/0/0 in 1,781 lines (grep,
re-verified); the nearest is `:113` "Liquid Weight." Downstream, the consumers' 3,008-line Q
design corpus names them 0 times across all 8 rulings — the laws are not in the adjudication
vocabulary, so adjudication cannot enforce them. Acceptance needs a producer sentence to accept
against.

**2 · GOLDEN GLASS is TWO laws — name both.**
(a) **The material**: warm-cream frosted glass, the O-2 negatives ("far too trite, shiny, and
bright"), and the consumers' lived exclusion clause promoted to producer text: *glass never sits
between the reader and the data* (`atlas/src/charts/frame/ChartFrame.css:13` names "a
backdrop-filter on the data" as the anti-pattern). Without the clause, D7's "under-suffused
surfaces are as much a defect" collides forever with the consumers' correct refusal to glass the
data.
(b) **The superlative**: gold as the scarce ≤1-per-view emphasis rung, authored FROM the
consumer's live constants — `--active-gilt: 38%` · `--active-glow: 22%` · `--active-rim-width:
1.5px` (`color.css:710-712`) — and carrying the phantom autopsy forward as the worked example
(`color.css:635-637`: `--gold-ink`/`--gold-rim` referenced 16+3 times, authored ZERO, every site
rendering hardcoded brass).

**3 · One depth-proof override knob per tier + one sanctioned full-material escape.** The
documented consumer escape is a no-op: `GalleryCard.vue:167-170` collapses `--glass-level`/
`--glass-tint-strength` and the constellation speck survives at ≈61% (the
substitution-vs-inheritance trap firing at the consumer). Turning the material OFF takes a war:
`FilterPanel.vue:531-544` — a `:global(.cp-drawer[data-filter-continuum])` selector "at a
specificity that out-ranks Glass's own snap-points fill," then `::before { display: none }`
because the specular pseudo "still paints a faint full-height edge glint" with the material
zeroed. One attribute must switch the whole material — background, border, shadow, backdrop,
specular pseudo — off or down, at any DOM depth, provably.

**4 · The ground-inheritance contract becomes public API.** Atlas re-grounds
`--background/--card/--foreground/--muted-foreground` and TRUSTS the glass tiers to follow
(`atlas/src/design/tokens/motion.css` §D: "glass-ui's glass-tier tokens read these grounds, so
the chrome warms in lockstep") — a load-bearing promise that exists only in a consumer comment.
State which host tokens each tier reads, and when.

**5 · BREATH OF LIFE = two rungs + one ration + per-surface obligations.** The engagement
substrate has zero consumer reach (ten named primitives — `useLiquidFlex`, `useStagger`,
`engageEnvelopes`, `tap-squish`, `useTouchGate`, `useSpringOrchestrator`, `useLiquidReveal`,
`data-engaged`, `glass-capsule-hover`, `useStaggerReveal` — ten greps of 0 in atlas src), so the
consumer minted its own breath with a different meaning (`atlas/src/design/overlays/breath.css`:
one `@keyframes`, zero JS, 1.5% swell over 80s, compositor-idle). Canonize:
**REST CARRIER** (compositor-idle, PRM-fenced, ornament-scoped — atlas `breath.css` is the
reference implementation; adopt it, don't let a third appear) and **ENGAGEMENT ENVELOPE**
(state-change on hover/press/focus). Lift the producer's own buried ruling
(`COMPONENT-WAVES-TERMINAL-3.md:1434` "state-change springs and rest carriers, never hover") into
`DESIGN.md`, rationed by the consumer's operational law (`OPTIONS-GRAMMAR.md:451` "**Breath is
earned, not ambient**" — idle binds to declared ornaments + ONE signature beat per route, exact
PRM terminals). The composed obligation: *a data mark owes an engagement envelope; an ornament
owes a rest carrier; nothing owes both.*

**6 · MOMENTUM's driver-only carve becomes a three-register taxonomy — and the owner mark is
consumer-blocking, not internal.** `DESIGN.md:113` covers driver motions only. Two consumer
surfaces fall outside it: (i) STATE-CHANGE continuity — the Q corpus's D6 convictions (the
usf-balance dial jump that "destroys exactly the continuity that makes it a dial"; vft-curves'
"twenty discrete snaps, no transition") are neither finger nor route motions and today have no
producer ground; (ii) the OBSERVER register — the consumer's single largest motion investment,
scroll-scrubbed native timelines (12 files / 40 `animation-timeline` declarations / 29 shipped
story beats across 8 routes; `scroll-driven.css:3-5` compositor-only, zero JS, PRM-exempt by
construction) — governed by nothing. Name **driver / state-change / observer** as registers, each
with canonical mechanism and budget (the driver register keeps liquid weight and
`--motion-weight`; the observer register canonizes `animation-timeline` scrub). The
`DESIGN.md:115` vs `ANALYSIS-SPEC.md:113` mark then resolves as a definition, not an exception.

**7 · Spring constants become trustworthy; fallbacks build-emitted or forbidden.** Every consumer
spring freezes a hand-typed bezier beside the var() — `DockNavItem.vue:160` + `VizPlate.css:62-63`
`var(--spring-snappy, cubic-bezier(0.22, 1, 0.36, 1))` — a silent degrade nobody can verify
against a canon GESTALT Ruling 8 scored 4/4 wrong on damping. Either publish the exact fallback
literal per preset via the generator (the `scheme-spring.css` model — emitted, never hand-typed)
or declare the tokens guaranteed-present and ban hand-typed fallbacks.

**8 · A consumer-seam table with semver standing.** Every custom property documented as
"override per host, never fork the utility" — the popover four (`--popover-enter-ease` et al.),
the tier knobs (`--glass-level`, `--glass-tint-strength`, `--glass-blur-*`), the ground tokens —
in ONE table, each marked stable-across-majors or not. Atlas's live popover re-point was authored
against "glass-ui 3.11" prose (`motion.css:18-19`) and rides 7.0.0 on faith. Note the seam CAN
work: `VizOptions.vue:354-355` consumes `var(--glass-blur-wash)` correctly — the lone tokened
consumer paint among four live sites (the others: bespoke `--cp-glass-*` vars, a hardcoded
`blur(10px)`, and the FilterPanel kill-war). The spread is the defect.

**9 · Every law states its CONSUMER TEST.** A law checkable only by grepping a composable name
inside glass is unenforceable at hop 1 (atlas) and invisible at hop 2 (sci — which paints zero
`backdrop-filter` and reads zero `--spring-*`). Each law ships a falsifier a consumer runs
against its own tree — e.g. MOMENTUM: *of all `transition:` declarations, what share names a
transform and what share is fade-only?* (atlas today: 15% / 25%). The laws did not fail to stick
because they were forgotten; they failed because no consumer could tell whether it was obeying
them.

**10 · The type ladder registers its basement.** `--type-micro` 11px and `--type-admin-label`
10px ship flat and unregistered (D-TYPOGRAPHY §1, verified in the shipped dist) and seed the
consumers' sub-13px epidemic (FRONTEND-PASS2: 500 desktop / 474 phone sub-13px at rest). Put the
basement on the ladder or strike it.

---

*Handoff is this file; nothing else in glass was touched. Root-repo law: every ask lands at the
producer, consumers chase the cut.*
