# AP audit — lane DELTA: architectural transpositions

Read-only survey at HEAD (AO close, v3.0.0 staged). The mandate: architectural
transpositions for elegance, simplicity, and performance — gestalt re-architecture,
no patches, no workarounds. These rank as AP's candidate headline.

AO did the honest-measurement pass (the gate now reads the real ~75 KiB cascade)
and a CONSERVATIVE consolidation (~6.5 KiB reclaim, dock dedup + `:where()` hoists +
prose trim) and explicitly LEFT the deeper structural candidates. This lane hunts
those: the ones that need a gestalt move, not a careful trim.

Measurements at HEAD: `dist/styles/index.css` resolved draw 74928 gzip / 308645 raw
(90.8% of the re-based 82500 ceiling); `tokens.css` 1339 lines / 405 custom props /
~26 KiB gzip source; `theme.css` 362 lines / 198 `var()` bridge declarations;
`dock.css` 43 KB source (the single largest cascade file).

---

## Ranked candidate table

| # | Prio | Transposition | Axis | Rough reclaim / effort |
|---|------|---------------|------|------------------------|
| T1 | P0 | **The two-layer token system: tokens.css ⊕ theme.css is a 198-line hand-mirror.** | simplicity / perf | ~3-5 KiB gzip + the whole drift class; 1 wave |
| T2 | P0 | **The glass-tier ladder + the four-state control recipe are copy-paste, not composed.** A `@utility`/var-driven single source collapses 5 glass blocks + ~6 dock-control state groups. | simplicity / perf | ~4-7 KiB gzip; 1 wave |
| T3 | P1 | **Aurora suspend has 3 uncoordinated owners of one `running` boolean.** Refcount the suspend-source set. | correctness / perf | small; the gestalt fix AO patched around |
| T4 | P1 | **proof-consumers-static descends sibling-repo `.claude/worktrees/`.** Scan-scope defect + a self-erasing drift baseline in profile-bundle. | correctness | small; 2 false-witness gates |
| T5 | P2 | **The 405-property token surface is over-broad** — per-consumer dialects (timeline-segment-gradient-*, configurator-row-*, metric-row clamps) live in the library's identity layer. | simplicity | audit-gated; modest |
| T6 | P2 | The 76-entry `src/<flat>.ts` mirror layer (AO D7, still open). | simplicity | refactor-only |

**AP headline candidate: T1+T2 as one coherent "cascade gestalt" wave** — the token
system and the recipe layer are the same disease (hand-maintained mirroring of a thing
that should derive). Together they are the deepest reclaim AND the biggest simplicity
win, and they are exactly what AO's conservative pass deferred.

---

## T1 — P0 — the two-layer token system is a 198-line hand-mirror

**WHAT.** Every visual token is declared TWICE. `tokens.css` `:root` declares the raw
custom property (`--border: var(--neutral-4)`, `--radius-xs: 4px`, `--success: hsl(...)`,
…); then `theme.css` `@theme` re-declares a parallel Tailwind-namespaced alias that
`var()`-bridges straight back (`--color-border: var(--border)`,
`--color-success: var(--success)`, …). `theme.css` carries **198 such bridge lines**
(`grep -cE ':\s*var\(--' theme.css`). The radius block is worse — theme.css:209-216
RE-LITERALS the primitives (`--radius-xs: 4px`, `--radius-md: 6px`, `--radius-2xl: 1rem`)
that tokens.css:270-276 already declare, so the same six magic numbers live at two sites
(the adjacent semantic aliases at theme.css:219-226 DO `var()`, proving the literal-dup is
avoidable — the comment "no self-reference" is the rationale, but `var(--radius-xs)` would
work exactly as `var(--color-border)` does two sections up).

**WHY it matters.** This is the structural cost of the token-first invariant expressed as
boilerplate: a token cannot exist without a human adding it in two files in lockstep, and
the §4 radius dup means a value cannot CHANGE without editing two files. The 198 bridges
are pure indirection — `bg-success` resolves `--color-success` → `--success` → `hsl(...)`,
one hop longer than necessary, and every hop ships in the gzip cascade. tokens.css §0 even
carries a "THEME BRIDGE FALLBACKS" block (lines 14-45) of NON-Tailwind shadow names
(`--type-leading-*`, `--font-stack-*`) that exist ONLY to feed theme.css without
self-reference — a third mirror arm.

**GESTALT transposition.** Collapse the two layers into one source of truth. Tailwind v4
`@theme` IS the token-declaration mechanism — a `@theme` variable is simultaneously a CSS
custom property at `:root` AND a utility-namespace registration. The raw `--border`/`--success`/
`--radius-*` values can live DIRECTLY in `@theme` as `--color-*`/`--radius-*`, and the
handful of places that consume the un-namespaced name (`var(--foreground)` in scoped SFC
CSS, `var(--glass-bg-resting)` in glass.css) read the `@theme`-published name or a thin
deliberate alias. The split today exists because the codebase grew tokens.css FIRST
(shadcn-vue `:root` convention) and bolted `@theme` on top; the gestalt is to invert —
`@theme` is primary, tokens.css holds only the genuinely non-Tailwind compositional
intermediates (the `--glass-bg-*` color-mix recipes, the spring `linear()` curves, the
`@property` registrations) that have no utility namespace. Net: ~198 bridge lines + the §0
shadow block + the §4 radius dup retire; one edit site per token; the cascade sheds the
indirection hop. **Reclaim: ~3-5 KiB gzip** (the bridge declarations + dup), and the entire
two-files-must-agree drift class disappears.

**RISK.** Medium-high — touches the consumer override contract (consumers override
`--glass-opacity-resting` at `:root`; that name must survive). Sequence carefully and lean
on `proof:theme` (it already asserts every rung ships). The override surface is the
load-bearing constraint, not the namespace — keep the consumer-facing names, retire the
internal mirror.

---

## T2 — P0 — the glass-tier ladder and the control four-state recipe are copy-paste

**WHAT (glass ladder).** `glass.css:20-70` declares five `.glass-{wash,quiet,resting,
floating,overlay}` blocks. Each is the IDENTICAL five-property recipe —
`position: relative; background: var(--glass-bg-TIER); backdrop-filter: var(--glass-blur-TIER);
border: 1px solid var(--glass-border-TIER); box-shadow: …var(--glass-shadow-TIER)` — varying
only the `TIER` suffix in the token name. The `::after` grain overlay then re-lists all five
selectors (lines 73-77), the dark variant re-lists all five again (90-94), and the
`@supports` fallback re-lists all five a fourth time (258-272). Five tiers × four selector
groups = the same ladder spelled out ~20 times.

**WHAT (control four-state).** `dock.css` repeats the `:hover:not(:disabled)` /
`:active:not(:disabled)` / `:focus-visible` / `:is(.is-active, [aria-pressed="true"], …)`
four-state contract verbatim across `.dock-icon-button`, `.dock-tab-button`,
`.dock-select-trigger`, `.dock-dropdown-trigger`, `.dark-mode-toggle-button` (the selectors
at dock.css:32-43, 656-688, 801-817, 943-949, 725-736…). AO hoisted the `:focus-visible` +
`:disabled` pair to two shared `:where()` rules (W4) but LEFT the hover/active/active-state
arms per-selector. The same four-state contract also recurs in `glass.css` (`.glass-btn`
148-159, `.btn-pill`, `.input-pill`) and across `ui/*` CVA strings.

**WHY it matters.** A glass tier is DATA (an opacity rung, a blur rung, a border rung, a
shadow rung) wearing a CSS-block costume. Spelling it out five times means adding a sixth
tier is a 4-site edit and a tier-recipe change (e.g. the AL-W10 under-shadow wiring) is a
five-block edit — which is exactly what the file's history shows. Same for the control
recipe: the dock controls are one button archetype with five skins, copy-pasted.

**GESTALT transposition.** Two moves:
1. **Glass tier as a Tailwind v4 `@utility` with a parameter, or a single var-driven rule.**
   Define `@utility glass-* { background: var(--glass-bg-* ); backdrop-filter: var(--glass-blur-*);
   border: 1px solid var(--glass-border-*); box-shadow: var(--glass-shadow-*) }` keyed on the
   functional-utility suffix, so `.glass-resting` is generated from one recipe against the
   `resting` token cluster. The grain `::after`, the dark `mix-blend`, and the `@supports`
   fallback attach to a single shared `[class*="glass-"]`-or-`:where()` group instead of
   four hand-maintained five-selector lists.
2. **A shared `menuControlVariants`/`.dock-control` four-state base** the dock controls and
   `.glass-btn` compose, owning hover/active/focus/active-state once. `_shared/menuItemVariants.ts`
   already proves this pattern exists for menu items — extend it to the dock-control family.

**Reclaim: ~4-7 KiB gzip** (dock.css is the largest cascade file at 43 KB; the four-state
+ tier dedup is where its mass is). Adding a tier or a control skin becomes a one-line
data edit.

**RISK.** Medium — Tailwind v4 functional `@utility` with a token-suffix match has sharp
edges (the `@supports`/dark composition must stay correct). Prove with `proof:theme` +
`proof:phantom-classes` + the visual π re-probe AO runs at close.

---

## T3 — P1 — Aurora suspend has three uncoordinated owners of one boolean

**WHAT.** `running` (runtime.ts:164) is toggled by THREE independent suspend sources with
no coordination:
1. the runtime's OWN `document.visibilitychange` listener, added inside `arm()`
   (runtime.ts:501-508), pausing on tab-hidden;
2. the outer `pause()`/`resume()` API (runtime.ts:567-574), which the Vue wrapper drives;
3. `useIntersectionPause` in `useAurora.ts:239-242`, which ALSO listens to document-visibility
   AND viewport-intersection and calls `inst.pause()`/`inst.resume()`.

So tab-visibility is observed TWICE (source 1 inside the runtime, source 3 inside the
wrapper) and viewport-intersection once, all collapsing onto one boolean. The resume is
unconditional (`resume()` just sets `running = true` and restarts `tick`). The failure mode
is a classic un-refcounted suspend: scroll Aurora off-screen (source 3 pauses) THEN switch
tabs and back (source 1's visibilitychange fires `resume()`) → the loop resumes RAF while
the canvas is still off-screen. AO's FINAL.md §7 notes it fixed "a latent post-arm
resume-seam bug" — that was a patch on the symptom (the `if (running)` early-return ordering,
runtime.ts:561-566 carries the comment); the disease is three writers, one flag.

**WHY it matters.** The whole AO R0G-1 thesis was "Aurora is demand-driven and
visibility-paused." A suspend model that resumes off-screen on a tab-flip defeats the
power-saving goal and is impossible to reason about — the comments at runtime.ts:496-508 and
useAurora.ts:561-566 are spending real prose explaining why two visibility observers don't
fight, which is the tell.

**GESTALT transposition.** Replace the boolean with a **suspend-source set** (refcount).
`suspend(reason)` / `resume(reason)` add/remove a reason key (`"tab-hidden"`, `"off-screen"`,
`"manual"`); the loop runs iff the set is empty. One observer owns tab-visibility (lift it
OUT of `arm()` so it is not duplicated by the wrapper's `useIntersectionPause`), one owns
intersection, the public `pause()`/`resume()` use the `"manual"` reason. Then "resume on
tab-show while still scrolled off" is structurally impossible — the `"off-screen"` reason is
still in the set. Removes both explanatory-comment blocks; the seam can't exist.

**Effort.** Small (one runtime refactor + remove the now-redundant wrapper visibility arm).
This is the gestalt the AO patch deferred.

---

## T4 — P1 — two false-witness gates in the proof pipeline

**WHAT (a — scan-scope defect).** `proof-consumers-static.mjs:28-37` `ignoredDirs` omits
`.claude` (and `worktrees`). `walk()` (136-150) therefore descends into every sibling repo's
`.claude/worktrees/agent-*/` stale-copy tree and lints those as if they were live consumer
source — exactly the dozens-of-stale-copies noise AO's FINAL.md §"Cross-repo residuals"
documents bleeding into the report. The fix is one line (`ignoredDirs.add(".claude")`), but
the deeper point is the proof's consumer scan has no notion of "this is a worktree artifact,
not a checkout."

**WHAT (b — self-erasing drift baseline).** `profile-bundle.mjs` reads the D5 drift baseline
from `artifactPath` (line 230) and WRITES the fresh profile to the SAME `artifactPath`
(line 292). So every `profile:budget` run overwrites the baseline it just gated against —
the next run drifts against numbers this run wrote, not against a committed reference. Drift
is effectively always ~0% unless a code change happens to straddle two runs with no
intervening write (which the script structurally prevents — it always writes). The D5 gate AO
landed (W4) measures drift against a baseline that moves with it. The probe AO ran (inject a
smaller baseline → FAIL → restore) works precisely BECAUSE it hand-edited the artifact
between runs; in normal operation the gate is a no-op.

**WHY it matters.** AO's whole thesis was "the gates measure what they claim." These are two
more of exactly that class AO was hunting — (a) lints the wrong files, (b) gates against a
baseline it just clobbered. A budget gate that can't catch drift is a false witness.

**GESTALT transposition.** (a) Exclude `.claude` and treat consumers as their checked-out
`src/` only (or read each consumer's own `tsconfig`/`package.json` include set rather than
walking the whole dir). (b) Split the artifacts: a COMMITTED `W4-bundle-profile.baseline.json`
that the gate reads and that only a deliberate `--rebaseline` flag updates, vs the ephemeral
profile the run writes. The baseline becomes a reviewed git object; drift is measured against
the last reviewed point, not against self. **While here, sweep the remaining 10 proof:\* for
the same class** — does each measure what it claims? (the budget gate measured the wrong file
pre-AO; the root-surface contract was stale pre-AO; these two are the next layer.)

**Effort.** Small per fix; the sweep is the real work.

---

## T5 — P2 — the 405-property token surface carries per-consumer dialects

**WHAT.** tokens.css is 405 custom properties / 1339 lines. A meaningful fraction is
consumer-SPECIFIC vocabulary that has migrated INTO the library's identity layer: the
`--timeline-segment-gradient-{ping,download,upload,jitter}` block (tokens.css:1043-1062) is
the speedtest phase taxonomy; the `--chart-{phase}-label` oklch rungs (663-666) are a
speedtest WCAG closure; `--metric-row-value-clamp-*` (1076-1088) is one consumer's hero-poster
register; `--configurator-row-{gap,py}-{mobile,compact,comfortable,spacious}` (895-903) has a
SINGLE consumer (`ConfiguratorRow.vue` — verified, one site). The MEMORY canon is explicit:
"named themed presets live in consumers; the library's OWN default tokens evolve in
src/styles/ as the lib's identity changes." Several of these are presets wearing a default's
clothes.

**WHY it matters.** Every consumer-dialect token in tokens.css ships in the gzip cascade for
EVERY consumer (the cascade is one bundle), and dilutes the "this is the library's identity"
signal. The `ping/download/upload/jitter` taxonomy is not glass-ui's identity — it is
speedtest's domain leaking up.

**GESTALT transposition.** Run the overfitting audit (`docs/audits/overfitting-audit.md`)
against the token surface specifically. For each cluster: is it ≥ 2 consumers OR a genuine
library-identity default? The phase-taxonomy gradients and chart-labels are a generic
"4-phase process" vocabulary IF a second consumer uses them — otherwise they belong in
speedtest's consumer token override. The single-consumer `--configurator-row-*` density rungs
either earn a second consumer or collapse to the `comfortable` default inline. This is the
J-inv-10 visual-load-bearing-ness pass applied to TOKENS, which prior tranches applied to
components. **Reclaim is modest gzip but real identity-clarity.** Gated by the audit — do not
retire a rung without the zero-/single-consumer proof (the rainbow family was mis-retired and
reverted once; the guardrail is "when in doubt, leave it").

**RISK.** Medium — must not break the speedtest consumer mid-flight. The clean path is: move
the dialect to the consumer's override block AS the library retires it (the no-backwards-compat
canon allows the clean break; coordinate with the speedtest AQ tranche).

---

## T6 — P2 — the 76-entry flat mirror layer (AO D7, still open)

Unchanged from AO's D7 — every subpath is a one-line `src/<flat>.ts` doing
`export * from "./components/<dir>"`, hand-synced with `package.json` exports (69 entries) +
`typesVersions`. Three parallel lists must agree. A single `subpaths.config.ts` manifest
deriving entries + exports + typesVersions removes the drift class. Refactor-only, lowest
priority, defer unless the drift bites. (Noted: a related stale self-description — `src/index.ts`
exports BOTH `instrument-chassis` AND `instrument-rail`, so the root barrel cherry-picks
**7** custom packages, but the index.ts header comment and CLAUDE.md both say "6". The
`proof-consumers-static` `rootContractFiles` correctly lists 7; only the prose is stale —
the same stale-self-description class AO closed four of.)

---

## Subpath / barrel coherence (charge 4)

The 69-entry export surface is coherent — no substrate-without-consumer subpath surfaced
(every entry maps to a `custom/` or `ui/` package with a demo story + the dock/dock-group,
glass-carousel/carousel naming pairs are deliberate boundaries documented in CLAUDE.md). The
nesting is flat-by-design (the L.W1 SCC-trap closure). No accretion finding here beyond T6's
authoring-boilerplate point. The only wrinkle is the 7-vs-6 prose drift above.

## Performance (charge 5)

Beyond Aurora (T3): no perpetual-RAF found in the component slice. `useRAFLoop`,
`useIntersectionPause`, `useIdleReady`, `useViewportReady` are the canonical demand-driven
primitives and the components route through them. `ScrollingText`, `BouncyToggle`,
`UnderlineTabs`, `DataTable` use RAF for one-shot measure-then-paint (FLIP / overflow probe),
not perpetual loops. `useResizeObserver` / `IntersectionObserver` uses are all
disconnect-on-unmount. The heavy-compute-on-mount risk (shader compile) is exactly what AO's
deferred-arm closed. Aurora's suspend tangle (T3) is the one live perf-correctness seam.

---

## Synthesis — the AP headline

**T1 + T2 are one disease and the headline candidate: hand-maintained mirroring of a thing
that should derive.** T1 mirrors every token across two files (198 bridges + the §4 dup);
T2 mirrors every glass tier five times and every control four-state across five selectors.
Both are what AO's CONSERVATIVE pass explicitly deferred ("no rung retired… when in doubt,
leave it"). Together they are the deepest reclaim (~7-12 KiB gzip combined, against the
~75 KiB cascade — a 10-15% cut) AND the largest simplicity win (a token becomes one edit; a
tier becomes one data row), and they are a true gestalt re-architecture, not a trim. Frame
AP's headline as **"the cascade derives itself"** — `@theme` is the single token source, glass
tiers + control states generate from data, and the two-files-must-agree / N-selectors-must-agree
drift classes cease to exist.

T3 (aurora refcount) is the highest-value SMALL move — it finishes the R0G-1 demand-driven
story AO started and removes a real correctness seam. T4 (false-witness gates) is the
cheap-but-load-bearing continuation of AO's self-measurement-truth thesis. T5 (token
overfitting) and T6 (mirror layer) are the slower-burn simplicity work.

**Total potential CSS reclaim: ~7-12 KiB gzip** (T1 ~3-5 + T2 ~4-7, against the 74928-gzip
resolved draw — a 10-15% cascade cut), plus the elimination of three drift classes (token
mirror, tier copy-paste, baseline self-overwrite) that no byte-count captures.
