# Tranche AP — Derive, don't duplicate (cascade derivation + the AQ-contract completion)

AP is glass-ui's post-AO consolidation tranche. AO closed the **self-measurement shape** — the budget gate, the build, the surface-contract proof, and the last legacy alias all made true. AP closes the **derivation shape** — the library derives its truths from a single source instead of hand-mirroring them: the token cascade derives from `@theme`, the glass tiers and the control four-state derive from shared recipes, the `/motion` barrel's cheap leaves derive their own chunk, the aurora loop derives its run-state from a suspend-source set, and the proof gates measure the real tree. The two consumer items AO deferred (the under-folded speedtest-AQ R0G-6 + R0G-7) ride the same close, repairing the zero-deferral gap.

AP is in DEVELOPMENT now. W0-W1 formulate the tranche; W2-W5 are authored-now-run-later — the implementation phase opens only on explicit user authorization. The dev/impl boundary sits between W1 and W2.

## § Thesis

The 6-lane AP.W0 audit found two load-bearing facts. First, AO under-folded the speedtest-AQ request: it was a seven-item ask (R0G-1..7), but the committed handoff captured only five — **R0G-6** (DockIconButton has no coarse-pointer 44px touch-target floor; measured 40×40) and **R0G-7** (the `/motion` barrel mixes keyframes-free leaves with the keyframes-bearing engine, so a cheap import eager-pulls ~125 KB) surfaced later and were never dispositioned — a P-inv-28 zero-deferral breach. Second, the CSS cascade hand-mirrors itself: the token system declares every token twice (raw `:root` + `@theme` bridge, 198 lines), and the glass tiers + dock four-state are copy-pasted ~20×, with the draw at 90.9% of cap.

**AO made the library's self-measurement true; AP makes the library DERIVE rather than DUPLICATE** — the dual move. Every AP item replaces a hand-maintained mirror with a single derived truth: `@theme` as the one token source, a tier `@utility` + four-state base recipe, a keyframes-free motion subpath, a suspend-source set, a proof that walks only the live tree. The two deferred consumer items are themselves derivations (R0G-7 is the SCC carve) and ride the close.

## § Binding question

Can glass-ui derive instead of duplicate — a token cascade where `@theme` is the single source and `tokens.css` keeps only the compositional intermediates (with the load-bearing HSL-channel alpha-composition form preserved, investigated before any merge); glass tiers and the dock four-state expressed as one shared recipe each instead of ~20 copy-paste blocks; a `/motion` barrel split so a keyframes-free leaf import never statically reaches the keyframes engine (R0G-7); a DockIconButton that meets the 44px coarse-pointer floor (R0G-6); an aurora loop whose run-state derives from a suspend-source set instead of three racing toggles; and proof gates that measure the live working tree instead of stale worktrees — all with `proof:theme` byte-clean, the visual canon + the motion primitives unregressed, and the result folded into the unpublished 3.0.0 cut?

## § Goal criterion

AP succeeds when the library derives its truths from single sources:

- **The cascade derives from `@theme`.** The token hand-mirror is collapsed — `@theme` is the single source of the namespaced design tokens; `tokens.css` keeps only the non-namespaced compositional intermediates; the load-bearing raw HSL-channel form (alpha composition) is preserved (investigated, not assumed). `proof:theme` byte-clean; the rendered CSS is canon-equivalent (visual π re-probe).
- **The tiers and four-state derive from recipes.** The five `.glass-{tier}` blocks collapse to a token-suffix `@utility`; the dock control four-state contract collapses to one shared `dock-control` base. ~7-12 KiB gzip reclaimed against the 74995 draw; the cascade falls well under the re-based ceiling.
- **The cheap motion leaves derive their own chunk (R0G-7).** The `/motion` barrel splits so a keyframes-FREE leaf import (`useIntersectionPause` et al.) does not statically reach `@mkbabb/keyframes.js`; the keyframes-bearing surface stays reachable on its own subpath. No symbol deleted-and-aliased — relocations are clean (no-backwards-compat), consumers rename at the call site. The speedtest sourcemap acceptance gate (the cheap import no longer pulls the engine) is met.
- **DockIconButton meets the 44px floor (R0G-6).** A `@media (pointer: coarse)` min-size lands the 44×44 touch target (confirmed against the measured 40×40); the fine-pointer rendering is unchanged.
- **The aurora loop derives its run-state.** `running` derives from a suspend-source set (visibility · public pause · intersection) rather than three uncoordinated toggles; resume-while-still-suspended is structurally unreachable.
- **The gates measure the live tree.** `proof:consumers:static` excludes `.claude`/worktrees (green locally, zero signal loss); the D5 drift baseline no longer self-erases.
- **Hygiene clears.** Stray root scratch deleted + `.gitignore`d; the `keyframes.js` pin-floor bumped; CLAUDE.md §Build + the cherry-pick-count prose reconciled.
- **The release stays one cut.** AP folds into the unpublished 3.0.0 changeset (or bumps if W5 finds cause); the publish leg is user-domain.

## § Completion criterion

The development half (W0-W1) completes when the 6-lane audit + path-forward synthesis + this plan + the W0-W5 wave specs are authored and the W1 design slice verifies (the T1 alpha-mechanism investigation is concrete; the motion-carve subpath shape is named; the R0G-6 measurement is confirmed; the recipe designs are specified). The implementation half (W2-W5) completes when every wave's hard gate verifies: `proof:theme` byte-clean post-derivation + a clean visual π; the cascade reclaim measured against the re-based ceiling; the keyframes-free leaf import proven engine-free; the dock floor at 44px coarse; the aurora suspend-set; the gates green on the live tree; the hygiene cleared; the close ceremony's π + ι + overfitting + AP.FINAL + the 3.0.0 amendment.

## § Inherited invariants

All standing glass-ui invariants bind unchanged (J inv 10 / L inv 8 substrate-binary; inv 47 / L inv 4 no-backwards-compat-alias + no-legacy; the vueuse-FREE root barrel; AO inv α [the gate measures the real consumer artifact] + inv β [no dist-wipe between build modes]; P inv 28 zero-deferral). The load-bearing ones for AP:

- **P inv 28 zero-deferral** — AP repairs AO's breach (the two under-folded AQ items); AP's own findings dispose within AP, with only the externally-gated watched conditions carried.
- **inv 47 / L inv 4 no-backwards-compat-alias** — gates R0G-7: the motion carve RELOCATES symbols (clean), it does NOT alias the old subpath to the new. Consumers rename at the call site.
- **J inv 10 / L inv 8 substrate-binary** — gates AP against inventing a primitive: no ≥2-consumer pattern clears the gate (inline-edit is 3 divergent shapes; dock panel-host is 1 consumer), so AP promotes nothing.

AP introduces:

- **AP inv ζ — the cascade derives from a single source.** ⟐ **RETIRED at W2 — premise refuted by measurement.** inv ζ was predicated on the DELTA finding that the cascade "hand-mirrors itself" with a ~7-12 KiB reclaim. W2 measured every form of the single-sourcing refactor (deterministic build) and found them ALL byte-NEGATIVE: full var-indirection +1665 gzip, T1-surgical +356, §radius-dedup+grain +100. The cascade is compression-saturated — gzip already folds the copy-paste, the `@theme` bridge is idiomatic Tailwind v4 namespace-registration (not a hand-mirror; the raw tokens are independently consumed + the override surface), and the §radius "duplication" is inert shadowed dead-weight. An invariant that cannot be honored without regressing the metric it serves is not an invariant; AP does NOT introduce inv ζ. See `audit/W2-cascade-derivation.md`. AP's genuine value is W3 (the zero-deferral consumer repair + the aurora T3 CONTROL-FLOW derivation, which is a correctness fix and stands) + W4. ~~A design token is defined ONCE … deriving from one source makes divergence structurally impossible.~~

## § Resolved design decisions

1. **The headline.** RESOLVED: **the cascade-derives-itself re-architecture (T1+T2)** is the headline — deepest reclaim (~7-12 KiB against a 90.9% draw) + the biggest simplicity win + it kills three drift classes. The motion carve (R0G-7) is the architectural keystone of the consumer-contract repair (W3), not the headline.
2. **T1 scope — investigate, don't assume.** RESOLVED: T1 is investigate-then-derive. The W1 design slice MUST establish the exact Tailwind v4 `@theme` alpha-composition mechanism before any merge; T1 collapses only what genuinely derives (the bridge duplication) and PRESERVES the raw HSL-channel form where alpha composition (`hsl(var(--x) / a)`) needs it. A naive total merge is forbidden (the one brittleness window).
3. **R0G-6 + R0G-7 — fold, repairing the breach.** RESOLVED: both fold into AP.W3 (the zero-deferral repair). R0G-7 is a clean subpath relocation (no alias — inv 47); R0G-6 is additive (a coarse-pointer floor), confirmed against the 40×40 measurement first.
4. **The false-witness coda.** RESOLVED: the proof scan-scope (`.claude`/worktrees) + the D5 self-erasing baseline fold into AP.W4 — the tail of AO's self-measurement thesis, cheap.
5. **The version.** RESOLVED: fold AP into the **unpublished 3.0.0** changeset (the version is already a major; even R0G-7's relocation rides it) so the user makes ONE release. W5 confirms; bump only if W5 finds cause. Publish is user-domain.
6. **No promotion.** RESOLVED: AP invents no primitive (J inv 10) — inline-edit (3 divergent consumers) + dock panel-host (1 consumer) stay watched; the DockLayerGroup vertical-overflow BUG (BETA, 1-consumer-surfaced) is correctness-not-promotion and is investigated in W3.

## § Wave table

| Wave | Title | Phase | Agents | Closes-on (evidence) |
|---|---|---|---|---|
| **AP.W0** | 6-lane audit + path-forward synthesis | DEV (now) | 6 audit + 1 synth | The 6 lane docs + `audit/PATH-FORWARD.md` + this AP.md + the W0-W5 wave specs + PROGRESS. |
| **AP.W1** | Design slice | DEV | 3-4 | Design docs at `design/`: `W1.1-cascade-derivation.md` (the T1 `@theme` alpha-mechanism investigation + the merge scope + the T2 tier/four-state recipe shapes, per-rung); `W1.2-motion-carve-and-dock.md` (the R0G-7 subpath split map [which leaves move, the new subpath name, the consumer rename] + the R0G-6 40×40 confirmation + the coarse-floor shape); `W1.3-aurora-and-coda.md` (the suspend-source-set design + the proof scan-scope + D5 baseline fix + the hygiene list). **END OF DEV BOUNDARY.** |
| **AP.W2** | The cascade derives itself | IMPL | 1-2 | T1 `@theme` single-source (alpha-form preserved) + T2 tier/four-state recipes. `proof:theme` byte-clean; reclaim measured vs the re-based ceiling; visual π re-probe clean. |
| **AP.W3** | Consumer-contract completion + control-flow derivation | IMPL | 2-3 (∥) | R0G-7 `/motion` SCC carve (cheap leaf import engine-free; no alias) · R0G-6 dock 44px coarse floor · aurora suspend-source set (T3) · DockLayerGroup vertical-overflow investigation. |
| **AP.W4** | False-witness coda + hygiene | IMPL | 1 | proof scan-scope excludes `.claude`/worktrees (green locally) · D5 baseline no longer self-erases · stray cleanup + `.gitignore` · keyframes.js pin bump · §Build + cherry-pick-count reconcile. |
| **AP.W5** | Close ceremony + release | IMPL (LAST) | 1 | π re-probe + ι sweep + overfitting + `AP/FINAL.md` + the 3.0.0 changeset amendment + the user-domain perimeter recorded. |

**Wave count: 6 (AP.W0-AP.W5)** — 2 DEVELOPMENT (W0 audit + W1 design) + 4 IMPLEMENTATION. Dev/impl boundary at W1|W2.

DAG — W0 first; W1 after W0; W2 (cascade CSS) ‖ W3 (motion/dock/aurora) file-disjoint, parallelize; W4 (proof scripts + hygiene) disjoint; W5 closes.

## § Folded ledger

| Audit-lane finding | AP wave |
|---|---|
| ALPHA/BETA/EPSILON/OMEGA — R0G-6 dock 44px floor (zero-deferral repair) | AP.W3 |
| ALPHA/BETA/EPSILON/OMEGA — R0G-7 motion-barrel SCC carve (zero-deferral repair) | AP.W3 |
| DELTA T1 — `@theme` single-source (token hand-mirror) | AP.W2 (inv ζ) |
| DELTA T2 — shared tier + four-state recipes (copy-paste) | AP.W2 (inv ζ) |
| DELTA T3 — aurora suspend-source set | AP.W3 |
| DELTA T4 / GAMMA — proof scan-scope + D5 self-erasing baseline | AP.W4 |
| BETA/GAMMA — stray cleanup + `.gitignore` + keyframes pin + §Build/cherry-pick prose | AP.W4 |
| BETA — DockLayerGroup vertical-overflow bug (1-consumer correctness) | AP.W3 (investigate) |
| EPSILON/BETA — inline-edit (3 divergent), dock panel-host (1 consumer), shadcn parity | NAMED-FORWARD (watched) |
| OMEGA — push / tag / publish / precepts submodule | USER-DOMAIN (perimeter) |

## § Cross-repo posture

AP is **glass-ui-internal + the AQ-contract completion**. glass-ui is 99 commits unpushed to the existing `origin`; 3.0.0 is staged-local (npm has 2.1.0). speedtest pins `^2.1.0`, is AQ-ready, and waits only on the publish. AP folds R0G-6/R0G-7 into the unpublished 3.0.0 so the user makes one release; the push + `v3.0.0` tag + `npm publish` is the single user-domain blocker (outward-facing, confirm-first). The precepts submodule stays user-domain.

## § Dev/impl boundary

W0 + W1 are DEVELOPMENT (audit + design docs; write NO source). W2-W5 are IMPLEMENTATION — authored now as binding wave specs, they RUN only on explicit user authorization. The boundary lands between W1 and W2.

## § Critical files

```
DEVELOPMENT artefacts (W0-W1 — written, no source):
  docs/tranches/AP/audit/{ALPHA,BETA,GAMMA,DELTA,EPSILON,OMEGA}-*.md   (AP.W0)
  docs/tranches/AP/audit/PATH-FORWARD.md                               (AP.W0 synthesis)
  docs/tranches/AP/AP.md                                               (this plan)
  docs/tranches/AP/PROGRESS.md                                         (execution log)
  docs/tranches/AP/waves/W{0..5}.md                                    (wave specs)
  docs/tranches/AP/design/W1.{1..3}-*.md                               (AP.W1 design slice)
  docs/tranches/AP/FINAL.md                                            (AP.W5)

IMPLEMENTATION targets (W2-W5 — authored-now-run-later):
  Owns (modify):
    src/styles/tokens.css + src/styles/theme.css   (AP.W2 — T1 @theme single-source; inv ζ; alpha-form preserved)
    src/styles/glass.css + src/styles/dock.css     (AP.W2 — T2 tier @utility + dock-control four-state base)
    src/components/ui/index.ts + src/motion.ts + the /motion subpath wiring  (AP.W3 — R0G-7 keyframes-free leaf carve)
    src/styles/dock.css + DockIconButton           (AP.W3 — R0G-6 44px coarse-pointer floor)
    src/components/custom/aurora/composables/runtime.ts  (AP.W3 — T3 suspend-source set)
    src/components/custom/dock/DockLayerGroup.vue  (AP.W3 — vertical-overflow investigation)
    scripts/proof-consumers-static.mjs             (AP.W4 — ignoredDirs += .claude/worktrees)
    scripts/profile-bundle.mjs                     (AP.W4 — D5 baseline no longer self-erases)
    package.json (keyframes.js pin) + .gitignore   (AP.W4 — pin bump + stray pattern)
    CLAUDE.md (§Build confirm + cherry-pick count)  (AP.W4 — prose reconcile)
    .changeset/ + CHANGELOG.md                     (AP.W5 — fold into the unpublished 3.0.0)
  Owns (delete):
    the untracked root scratch (jpegs + *.txt)     (AP.W4 — hygiene)
  The visual canon + the 4 motion primitives + proof:theme byte-clean are the regression bar.
```

## § Style discipline

Greenfield voice — glass-ui is the product; no migration language, no "ported from", no version history in prose. Em dashes unspaced. No grandiloquence, no epanorthosis. Every wave item carries WHAT + WHY; goal + completion criteria paired. AP DERIVES (single-source @theme, shared recipes, the SCC carve) — it does NOT add a compatibility layer or keep a mirror "for safety". The T1 merge is investigate-then-derive (the alpha-channel form is load-bearing); the motion carve is a clean relocation (no alias). AP is the library deriving its truths from single sources — the elegance/simplicity/performance transposition the audit revealed, in AO's lineage.
