# Tranche AP — PATH-FORWARD synthesis

The 6-lane AP.W0 audit (ALPHA prompt-coverage · BETA deferral-inventory · GAMMA empirical-state · DELTA transpositions · EPSILON keystone · OMEGA cross-repo) over the post-AO glass-ui state (v3.0.0 staged, HEAD `e3ac16d`). This synthesis is the binding basis for the AP plan.

## § The two load-bearing facts

1. **AO under-folded the speedtest-AQ consumer request — by two items.** Four independent lanes (ALPHA, BETA, EPSILON, OMEGA) converged: the AQ handoff was a SEVEN-item request (R0G-1..7), but the coordination doc glass-ui committed (`CONSUMER-REQUEST-speedtest-AQ.md`) captured only five — R0G-6 + R0G-7 surfaced later in AQ's R2 strand and never reached the handoff, so AO never dispositioned them. Both are real, measured, consumer-driven, and consumer-unfixable: **R0G-6** (DockIconButton has no coarse-pointer 44px touch-target floor — measured 40×40 in `dock.css`) and **R0G-7** (the `/motion` barrel mixes keyframes-FREE leaves like `useIntersectionPause` with the keyframes-BEARING `useAnimatedNumber` family, so a cheap import eager-pulls the ~125 KB keyframes engine). This is a **P inv 28 zero-deferral breach** AP repairs — the two survivors fold into AP or get a formal disposition.

2. **The cascade duplicates itself — the gestalt re-architecture AO's conservative pass deferred.** DELTA found the CSS is hand-mirrored, not derived: the token system declares every token twice (raw in `tokens.css` `:root`, re-bridged in `theme.css` `@theme` via `var()` — 198 bridge lines, the §4 radius primitives literal-duplicated), and the five `.glass-{tier}` blocks + the dock four-state contract are copy-pasted ~20×. The CSS draw sits at **74995 gzip = 90.9% of the 82500 cap** (GAMMA) — so this is not only elegance: deriving instead of duplicating reclaims ~7-12 KiB (a 10-15% cut, back to ~80% utilization) AND kills three drift classes no byte count captures.

## § Thesis

**AO made the library's self-measurement TRUE. AP makes the library DERIVE rather than DUPLICATE.** The token cascade derives from a single `@theme` source instead of a 198-line hand-mirror; the glass tiers and the control four-state derive from shared recipes instead of ~20 copy-paste blocks; the `/motion` barrel's keyframes-free leaves derive their own chunk instead of eager-pulling the engine (R0G-7); and the proof gates measure the real working tree instead of stale worktrees (the false-witness coda). The two consumer items AO deferred ride this same close — R0G-7 IS a derivation (the SCC carve), R0G-6 is its a11y companion — repairing the zero-deferral gap.

"Derive, don't duplicate" is the dual of AO's "measure what's real": both replace a hand-maintained mirror with a single derived truth.

## § The resolved findings

1. **The two deferred consumer items (the survivors).** R0G-7 — carve the `/motion` barrel into a keyframes-FREE leaf surface (`useIntersectionPause`, `installDarkModeSync`, `useRAFLoop`, the IO/visibility helpers) and the keyframes-BEARING surface (`useNumericTransition`/`useAnimatedNumber` family), mirroring the L.W1 vueuse-FREE root-barrel SCC closure — a consumer importing a cheap helper stops statically reaching the 125 KB engine. R0G-6 — add the coarse-pointer 44px touch-target floor to `DockIconButton` (a `@media (pointer: coarse)` min-size), investigate-then-confirm against the measured 40×40. Both ride AP.W3. EPSILON named R0G-7 the architectural keystone; AP frames both as the zero-deferral repair + the SCC-carve derivation.

2. **The cascade-derives-itself re-architecture (the headline — DELTA T1+T2).** T1: make `@theme` the single token source; `tokens.css` keeps only the non-namespaced compositional intermediates. CAUTION (binding): the raw HSL-channel split (`--primary: 222.2 47.4% 11.2%` consumed as `hsl(var(--primary) / alpha)`) is load-bearing for alpha composition — the W1 design must investigate the exact Tailwind v4 `@theme` alpha mechanism BEFORE deduping; this is investigate-then-derive, NOT a naive total merge. T2: a token-suffix `@utility` for the five glass tiers + a shared `dock-control` four-state base, collapsing the ~20 copy-paste repetitions (dock.css is the 43 KB cascade mass). ~7-12 KiB gzip reclaim. Rides AP.W2. The candidates AO explicitly LEFT (rainbow family, configurator-row tokens, btn-audacious-gold, the disco-glyph hook) stay overfitting-audit-gated — T1+T2 is structural derivation, not rung-retirement.

3. **The false-witness coda (DELTA T4 + GAMMA).** Two more self-measurement defects, the tail of AO's thesis: `scripts/proof-consumers-static.mjs` `ignoredDirs` lacks `.claude`/`worktrees`, so the gate walks dozens of abandoned `speedtest/.claude/worktrees/agent-*` copies (78 violations, 100% stale-worktree noise per GAMMA) — a one-line exclusion turns the gate green locally with zero signal loss; and `scripts/profile-bundle.mjs` reads its D5 drift baseline from the same `W4-bundle-profile.json` path it overwrites (a self-erasing baseline). Both ride AP.W4 — cheap, exactly on the AO self-measurement-truth thesis.

4. **The aurora suspend refcount (DELTA T3, on-thesis).** AO fixed the resume-seam SYMPTOM but the structure remains: three uncoordinated owners (the runtime `visibilitychange` listener, the public pause/resume, the wrapper's `useIntersectionPause`) toggle one `running` boolean with no refcount, so resume-while-still-scrolled-off-screen is structurally reachable. The gestalt fix is a suspend-source SET — the loop derives `running` from "is any source suspending?" rather than three racing toggles. Derive-don't-duplicate applied to control flow. Rides AP.W3.

5. **Hygiene + stale self-descriptions (BETA + GAMMA + DELTA minor).** ~2 MB of untracked root scratch (8 muster/GAMMA jpegs + `build_time.txt`/`emit_time.txt` from the heap-prefix RSS probe) → delete + a `.gitignore` pattern; the `keyframes.js ^2.0.0` pin-floor in glass-ui's own `package.json` is stale (the constellation is on 3.x) → bump; CLAUDE.md prose says the root barrel cherry-picks "7 cherry-picked custom/ packages" in one place and "6" in another (DELTA) → reconcile; confirm the AO §Build resync actually landed on disk (BETA flag). Ride AP.W4.

## § Coverage proof

ALPHA: 8 prompts recapped — 6 DELIVERED, 1 in-flight (this deep-audit directive, driving AP.W0), 1 UNADDRESSED (the under-folded AQ request = the R0G-6/R0G-7 survivors). 9/9 memory feedbacks HELD; the one invariant breach is P inv 28 (the two deferred items), which AP repairs. BETA: the AO "last alias deleted" claim VERIFIES (zero `@deprecated` / symbol-alias / TODO-FIXME / commented-code in src); 0 live chronic deferrals (the 8 GB heap prefix, the only-ever chronic, cleared at AO.W2). No legacy survives — AP is derivation + the zero-deferral repair, not a legacy purge.

## § Wave shape (Shape: 6-wave derive-don't-duplicate tranche; dev/impl boundary at W1|W2)

| Wave | Title | Phase |
|---|---|---|
| AP.W0 | 6-lane audit + path-forward synthesis | DEV (this) |
| AP.W1 | Design slice — cascade-derivation (T1+T2) + motion-SCC-carve (R0G-7) + dock-a11y (R0G-6) + aurora-suspend-set (T3) + false-witness coda + hygiene. **END OF DEV BOUNDARY.** | DEV (boundary) |
| AP.W2 | The cascade derives itself — `@theme` single-source (T1, investigate-then-derive) + shared tier/four-state recipes (T2) | IMPL |
| AP.W3 | Consumer-contract completion + control-flow derivation — `/motion` SCC carve (R0G-7) · dock 44px floor (R0G-6) · aurora suspend-source set (T3) · the DockLayerGroup vertical-overflow bug (BETA, investigate) | IMPL |
| AP.W4 | False-witness coda + hygiene — proof scan-scope (`.claude`/worktrees) · D5 self-erasing baseline · stray cleanup + `.gitignore` · keyframes.js pin · §Build + cherry-pick-count reconcile | IMPL |
| AP.W5 | Close ceremony + release — π/ι + overfitting + AP.FINAL + the 3.0.0 amendment (fold AP into the unpublished 3.0.0 changeset, or bump) | IMPL (LAST) |

DAG — W0 first; W1 after W0; W2 (cascade CSS) ‖ W3 (motion/dock/aurora) are largely file-disjoint and parallelize; W4 (proof scripts + hygiene) disjoint from both; W5 closes. W2 is the headline (deepest reclaim + simplicity); W3 repairs the zero-deferral gap; W4 is the cheap on-thesis coda.

Named-forward (not AP waves): the inline-edit primitive MOVED to 3 consumers (keyframes.js `EditableLabel` joined bbnf-buddy + words) but the three diverge intrinsically (`<input>` vs `contenteditable`, numeric vs string, click vs dblclick) — still WATCHED, not promotable (the J inv 10 trap). The dock panel-host has 1 realised consumer now (bbnf-buddy `LeftToolsDock`, was 0) — still under the 2-consumer gate. shadcn-vue parity gaps (calendar/date-picker/pagination) — speculative, 0 consumers, rejected.

## § Cross-repo posture

AP is **glass-ui-internal + the AQ-contract completion**. The cross-repo state (OMEGA): glass-ui is **99 commits unpushed** to the existing `origin` (`git@github.com:mkbabb/glass-ui.git`); `package.json` is 3.0.0 but npm carries only 2.1.0 — 3.0.0 is staged-local, a provenance liability. speedtest pins `^2.1.0`, its AQ Gate-2 is complete, and it waits ONLY on the 3.0.0 publish (the 5 shipped R0G items + the `useIdleReady` collapse; R0G-6/R0G-7 join when AP lands). The single user-domain blocker is the push + `v3.0.0` tag + `npm publish` — outward-facing, confirm-first. AP can fold R0G-6/R0G-7 into the unpublished 3.0.0 cut (the version is already a major; even R0G-7's export relocation rides it) so the user still makes ONE release. The precepts submodule (3 dirty files, no gitlink drift) stays user-domain.

## § Brittleness

AP declares ONE brittleness window: T1 (the `@theme` single-source merge) touches the alpha-composition channel split — a naive merge would break every `hsl(var(--x) / alpha)` consumption. The W1 design slice closes it by investigating the exact Tailwind v4 `@theme` alpha mechanism first and scoping T1 to what genuinely derives (the bridge duplication) while preserving the load-bearing channel form; `proof:theme` byte-clean + a visual π re-probe are the regression bar. Everything else is revertible: the tier/four-state recipes are CSS-output-equivalent, the motion carve is an additive subpath split (no symbol deleted, just relocated — verified against the no-alias invariant by a clean consumer-side rename), the dock floor is additive, the proof/hygiene fixes are config. No rename of a kept symbol (inv 43); the only irreversible op (publish) is user-domain.
