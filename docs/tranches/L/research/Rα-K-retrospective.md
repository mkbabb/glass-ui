# Rα — K retrospective + plan-vs-actual deep audit

**Authored**: 2026-05-11 (L tranche open; K successor).
**Lane**: α — K retrospective + plan-vs-actual deep audit.
**Mode**: READ-ONLY across src/, demo/, docs/, tests/, dist/, package.json; READ-ONLY git only (no mutating subcommands).
**Baseline**: master HEAD `35cae2c` (K W8 close, 2026-05-09). Precept submodule `d4ada55`. v0.9.3 tagged + pushed.
**Author**: L-prep research agent, dispatched parallel to β/γ/δ/ε/ζ (this lane is Rα).

This audit walks K's close ceremony with a **harsher retrospective lens** than the strengthened 7-lane (α/β/γ/δ/ε/π/ι) K close audits. K W8 returned 0 P0 + 2 P1 (γ D1+D2 absorbed in cleanup) + 3 ε findings (F-ε-1/2/3 absorbed in cleanup) + 1 DEGRADED-AS-DOCUMENTED wave (WS). This re-audit re-classifies items the K close marked MET / DEGRADED-AS-DOCUMENTED / RETIRED with the J Rα classification grammar: **CANONICAL / AMENDMENT / AMENDMENT-DRIFT / DEFER-WITH-RATIONALE / DEFER-AS-RESIDUAL / EXECUTED-WITH-WORKAROUND / MISSED-SILENTLY**. Cross-repo evidence from the speedtest X.W3.c re-probe (post-K-close, 2026-05-09 at speedtest commit `eb5274d8`) is treated as authoritative for trap-persistence + typing-publication claims.

---

## §A — K close ceremony scoreboard (canonical vs. re-audit)

| Lane | K W8 verdict | Re-audit verdict | Delta |
|---|---|---|---|
| α plan-vs-actual | CLEAN | **CLEAN with 1 minor blind-spot** (WS-side cross-repo validation gap; see §B) | minor |
| β substrate + visual-load-bearing | CLEAN | **PARTIAL** — WS subpath β rows 14+15 marked PASS at 50/54-byte d.ts files; the bytes ARE the bug (see §B P0-1) | substantive |
| γ doc-drift | 2 P1 + 3 P2 (D1+D2+D5 absorbed; D3+D4 → R2) | **CLEAN** at γ's binding scope | unchanged |
| δ idiomatic-gestalt | CLEAN | **CLEAN with 1 documented wrapper-shim** (cssVar inline `readToken` is a workaround, not an idiomatic substrate; see §C P1-1) | minor |
| ε performance + dts + budget | 3 findings (F-ε-1/2/3 absorbed) | **PARTIAL — dts sub-bar** (line 113 of ε report: "harmless but unnecessary surface area" mis-classified the broken `dist/composables/{dark,keyboard}.d.ts` re-exports as cosmetic; the bytes ARE the load-bearing bug; see §B P0-1) | substantive |
| π visual-runtime | 2 P1 + 1 P3 | **2 P1 + 1 P3 (unchanged)** | none |
| ι integrity-sweep | CLEAN | **CLEAN at its own scope**; but ι did not walk cross-repo validation as a hard-gate item — see §D P2-1 | scope-limited |

K closed under the **strict-binary reading** of each invariant. The 7 audit lanes collectively under-flagged **two SILENT MISSES** that surfaced retrospectively at speedtest X.W3.c (re-probe at v0.9.3, 2026-05-09 — AFTER K close ceremony). Both are P0; both fold into L.

---

## §B — P0 SILENT MISSES (re-audit promotes; K W8 did not flag)

| ID | Item | Evidence at HEAD | K W8 disposition | Re-audit verdict | Fold-into-L wave |
|---|---|---|---|---|---|
| **P0-1** | **WS subpath typing publication is BROKEN at v0.9.3** for `./composables/dark` + `./composables/keyboard` | `dist/composables/dark.d.ts` contents: `export * from '../src/composables/dark'\nexport {}` (50 bytes). From `dist/composables/`, this resolves to `dist/src/composables/dark` — but `dist/src/` does not exist. `vue-tsc` raises `TS2305: Module '...' has no exported member 'useGlobalDark'`. Confirmed by speedtest X.W3.c migrations.md §"Glass-ui v0.9.3 typing publication gap" — 3 consumer files failed typecheck on subpath migration. **`dist/forms.d.ts` (11_702 B inlined) is fine.** Only the two `composables/*.d.ts` files carry the bug. `dist/dark.d.ts` + `dist/keyboard.d.ts` (top-level, NOT in package.json exports map) ARE properly inlined — and they are emit-side residuals that K ε called "harmless but unnecessary surface area; flag for L cleanup". The unexposed top-level dts is correct; the exposed `composables/` dts is broken. | **β row 14 MARKED PASS** ("dist/composables/dark.d.ts emit + import-resolves"); **β row 15 MARKED PASS** ("dist/composables/keyboard.d.ts emit"); **ε §2.1 NOTED 50/54-byte sizes** as "re-export only" (correct shape claim, wrong-target audit); **ε §3.1 MARKED PASS** ("resolves" — Node `require.resolve` succeeds, vue-tsc does not). β + ε both inspected the file existence + Node ESM resolution; neither walked the TS-emit semantics. ι §1 row "v0.9.3 ships additive subpath" MET-as-rg-evidence. | **MISSED-SILENTLY**. The WS β + ε + ι all marked the subpath PASS without testing consumer-side `vue-tsc`. K invariant 2 (no silent misses) was violated by the audit pattern itself: "module emits at dist + node resolves at runtime" ≠ "consumer TypeScript can import it". The bug existed at K close; only speedtest's X.W3.c (post-close) caught it. WS shipped a **typing-publication regression** under the K close ceremony's nose. | **L.W1 (P0)** — fix the dts emit via vite-plugin-dts config (force-inline subpath barrel types or rewrite the relative `../src/` re-export). Sub-fix: drop the unexposed top-level `dist/{dark,keyboard}.d.ts` (their existence is misleading — they look correct but aren't pointed at by `package.json` exports). |
| **P0-2** | **WS Phase 1 disposition ACCEPT-DEGRADED was the wrong call given Phase 1 was net-regression, not net-neutral** | WS shipped v0.9.3 with the CHANGELOG.md KNOWN LIMITATION ("Phase 1 alone does NOT close the SCC trap"). The K close ceremony framed this as **DEGRADED-AS-DOCUMENTED**. But the bundle-evidence transcript shows the **eager critical-path REGRESSED by +2_055 B + 1 extra HTTP request** under any consumer that applies the manualChunk. The WS spec's pre-disclosed risk read "the trap persists" — but the post-state is worse than the pre-state, not merely no-better. The disposition should have been **HALT-PRE-RELEASE** (don't ship v0.9.3 until Phase 2 lands), not **ACCEPT-DEGRADED**. v0.9.3 published a public surface (additive subpaths) that A) is not consumer-adoptable at v0.9.3 due to P0-1 typing publication bug and B) advertises a fix (CHANGELOG header reads "vueuse SCC trap (Phase 1: additive subpath split)") but produces a regression when used as documented. | α §"WS Phase 1 disposition" MARKED DEGRADED-AS-DOCUMENTED + "Per WS spec §Risks: this is the spec's pre-disclosed risk path; the wave closes per the documented degradation". The α-lane treated "we documented the failure" as exoneration. | **EXECUTED-WITH-WORKAROUND** + secondary **AMENDMENT-DRIFT**. Spec §Risks pre-disclosed "trap persists" — it did NOT pre-disclose "net regression + typing-bug shipped publicly under v0.9.3 tag". The K close ceremony declared "honest disclosure" but did not weigh **whether shipping the partial fix is gestalt-correct**. The spec gave the orchestrator a degrade-to-document-and-ship path; the harsher question — should v0.9.3 have been a triumvirate dispatch with user authority to gate the release — was not asked. By J Rα precept, this is a "wrap-and-rename" of a failed fix into a "documented limitation" — narrower than the original substrate-without-consumer prohibition demands. | **L.W1 — Phase 2 (BREAKING) priority-1**. Remove vueuse-bearing root-barrel re-exports; ship v1.0; let the subpaths become the **only** access for vueuse-bearing primitives. The CHANGELOG.md KNOWN LIMITATION block becomes the migration guide. |

**Net P0 count**: **2 silent misses** the K close ceremony failed to flag.

---

## §C — P1 EXECUTED-WITH-WORKAROUND items

Items that **landed in K** but with compromised gestalt — they pass the strict close-criteria reading, but are not the idiomatic substrate the user precepts (`feedback_no_backwards_compat`, `feedback_overfitting_audit`, `feedback_architectural_approach`) prescribe.

| ID | Item | Workaround shape | Idiomatic replacement | Fold-into-L wave |
|---|---|---|---|---|
| **P1-1** | `cssVar()` retire — Lane A inlined a 5-line `readToken()` helper into `BouncyToggle.vue` rather than extending `useTokenColor` to support imperative reads | W3.A proof §Step 3 documents the rationale: "BouncyToggle reads tokens at click-time only (no reactivity needed); inline a 5-line readToken(name, fallback) helper". The result: every future component that needs an imperative DOM-token-read at WAAPI click time will either (a) re-implement `readToken()` per-component (raw recipe diffusion — J's anti-pattern) or (b) lift `readToken` to `src/composables/utils/` (resurrects exactly the retired composable directory; round-trip workaround). | **Extend `useTokenColor`** with an imperative `read(name, fallback)` companion — same composable, two surfaces (reactive ref + imperative read). The K choice satisfied the strict consumer-count gate (cssVar 1-consumer → retired); it did NOT satisfy the **substrate-shape-of-the-day** prohibition that J Rα invoked against W0 §F item 6. `readToken` is now an in-file private utility; if a second consumer arises, it goes back to a shared composable — i.e. we'll re-litigate this at L or M. | **L modularization-audit lane** — fold into the `api/` sub-module review (per L findings.md directive 7). `useTokenColor` is the canonical token-read surface; the BouncyToggle inline copy retires when the imperative-read surface lands. |
| **P1-2** | Speedtest annotation cross-repo commit at `6f412d89` — K orchestrator committed an annotation to speedtest WITHOUT explicit user authorization for the cross-repo push | K-pre-close.md L30: "Speedtest commit `6f412d89` annotates `docs/tranches/W/artefacts/W3/b1/disposition.md` with K.WS Phase 1 outcome. **Uncommitted/unpushed at orchestrator's hand**; user can push speedtest-side independently." The K close ceremony FINAL.md §"Cross-repo coordination" reads "speedtest commit `6f412d89` annotates ... LANDED annotation deferred to v1.0". The commit DID land on speedtest. There is a precept asymmetry: glass-ui's K invariant 7 says "agents NEVER stage/commit/stash/checkout/reset/restore — only orchestrator owns the index" — but it is silent on **cross-repo commits**. Did K's orchestrator have authority to commit on speedtest? The user precept stream does not name an explicit consent gate for cross-repo writes. The orchestrator inferred consent from "the speedtest re-link commit closes the loop" wording in K.md §"Cross-repo coordination". | **Precept evolution**: cross-repo commits require the same user-authorization gate that publishing a tag requires. Add to AGENT_DISPATCH_TEMPLATE.md a "Cross-repo write boundary" clause: when an outbound dispatch produces a commit on a sibling repository, the orchestrator must surface this for explicit user confirmation before the commit lands. | **L.W0** — precept update lane absorbs this as a 3rd LESSONS-LEARNED entry (companion to the K W8 worktree-isolation + git-stash entries). |
| **P1-3** | The WS β row 14/15 PASS verdict and ε §2.1 "harmless but unnecessary surface area" verdict on `dist/composables/{dark,keyboard}.d.ts` — both lanes inspected file existence + Node ESM resolution but did not exercise `vue-tsc` against the dist artefact | β row 14 evidence transcript reads `cat dist/composables/dark.js` (correct JS re-export) + `dist/composables/dark.d.ts` (re-export to `'../src/composables/dark'` — broken). β did not run a downstream typecheck. ε §2.1 noted the 50/54-byte sizes but classified them as "re-export only" cosmetic surplus rather than semantic-broken types. Both audits used the rg/static-read pattern that the J β predecessor pattern established; neither extended to **dist artefact consumer-side TypeScript validation**. | **Audit pattern strengthening**: any WS-like wave (subpath split / typing-publication / breaking-change-rehearsal) must include a **synthetic-consumer typecheck probe** as a hard-gate item. The probe runs `vue-tsc` (or `tsc --noEmit`) against a fixture project that imports the dist'd subpaths via the package.json exports map. This is the dts-emission analog of the visual-runtime probe — it tests the actual consumer surface, not the source. | **L.W1 close ceremony** — add the 8th audit lane "**κ packaging-emission**" that runs the synthetic-consumer typecheck. Or fold into ε's bounded scope (already PARTIAL on this finding). |
| **P1-4** | F-ε-3 Configurator P0 absorption — Lighthouse stale-cache explanation was thorough at the artefact level but did not validate the diagnostic candidates ε §6.3 raised | ε §6.3 enumerated three diagnostic candidates for the recursion source: `motionMode` computed reads `cfg.speed` + `cfg.orbitAmplitude`; `MetaballCanvas` watcher on `canvasRef`; `<Configurator>` `scrollMode="auto"` interaction. None of these were investigated; the K cleanup pass declared the Lighthouse hit was stale dev-server cache. Re-audit: π lane §1 console-error sweep returned 0 errors at HEAD on `/motion/metaballs`; the W7 fix IS sufficient at HEAD. But ε's diagnostic candidates were named and dropped — if Lighthouse re-hits the recursion in a future tranche (or under a different reactive shape on `/motion/metaballs`), the diagnostic baseline is lost. | **Diagnostic ledger discipline**: when an audit lane enumerates diagnostic candidates against a "fix may be incomplete" hypothesis, those candidates should be persisted to a per-route diagnostic-ledger doc that survives the close commit. Lighthouse-classified P0s in particular merit a 12-month-warranty test fixture: a Vitest test that imports `<Configurator>` + drives a preset cycle + asserts no `console.error` from the Vue runtime warn-channel. | **L modularization-audit** — fold the candidate list (ε §6.3) into a `tests/diagnostics/configurator-recursion.spec.ts` test fixture. If the test fixture lands and stays green for 12 months, the diagnostic ledger retires per `feedback_overfitting_audit`. |
| **P1-5** | W7 NumberField Option B decision — K W7 closed with "Slider-only contract documented" rather than `<NumberField keep-dock-open>` consumer added | W7-proof §Step 2: "rationale: NumberField is keyboard/discrete-button driven, not continuous-pointer-drag". The decision rests on "drag is the only mode that needs keep-open"; ι §1 + δ §11 endorsed Option B as gestalt-correct. Re-audit: the user's J finding #4 framed dock-keep as "many other component types within the dock, animated, idiomatically" — i.e. the contract is **dock-aware-pointer-anchored**, not specifically drag-anchored. J Rα §A.1 already flagged this asymmetry as AMENDMENT-DRIFT for the click-anchored Popover case. K W7 closed the drag case (Slider) but left the keyboard-anchored case (NumberField up/down-arrow-hold, repeat-key-anchor) without a contract. If a consumer presses-and-holds the down arrow on a NumberField inside a dock, the dock collapses mid-input. | **`<NumberField keepDockOpen>` ships** — symmetric to `<Slider keepDockOpen>`; both inject `dockKeepOpen` from `<GlassDock>`. Or, formally retire the asymmetry: document in DESIGN.md "dock-keep is pointer-drag-anchored exclusively; keyboard / discrete-tap interactions release the dock per spec". The current state ("Slider-only contract documented") is the right *summary* but does not commit to either resolution. | **L.W2** — depends on whether L's modularization audit surfaces a NumberField-in-dock consumer. If not, formalize the retire. If yes, ship the prop. |
| **P1-6** | WP P1-1 viz-basis contrast — the W4 Lane A doc cohort signed off on WP's "text-foreground works in both modes" claim; the K W8 cleanup pass migrated to `text-zinc-900` | WP-proof claimed: "In the demo's default theme (warm-cream), `--foreground` is the canonical dark-on-light body colour; against the three viz tints (`#eb7366`, `#88a1e7`, `#ce8ee1`) this trivially clears AA." π §3 measured: light-mode ratios 3.68 / 2.63 / 3.04, dark-mode 2.36 / 2.04 / 1.98 — **all 6 cells fail AA-normal**. The W8 cleanup pass corrected to `text-zinc-900` (now at `demo/stories/primitives/buttons.vue:118`). γ doc-drift signed off W4.A's doc cohort BEFORE π measured this. The WP P1-1 disposition in the WP proof read "ABSORBED"; π re-classified to "PARTIAL". Re-audit promotes further: WP P1-1 was **MISSED-SILENTLY** at WP close (WP claimed pass with no contrast probe), partially **AMENDMENT-DRIFT** at γ/π re-discovery, and **EXECUTED-WITH-WORKAROUND** in the cleanup absorption (the `text-zinc-900` fix is the W8 cleanup-pass call, not WP's prescribed mechanism). The viz tints themselves are mid-luminance; the right gestalt fix is per-tint adaptive contrast (a `--on-viz` token or a `text-on-viz` utility), not a hardcoded slate. | **Per-tint adaptive contrast token**: define `--on-viz` resolving to a luminance-flanking foreground per viz hue. Or **darken/lighten the viz tints** to flank `--foreground` in both modes. The current `text-zinc-900` ships AA but is theme-invariant (does not respect the dark/light flip the rest of the design system honors); under dark mode it reads as "dark text on mid-tint background" while the surrounding chrome reads "light text on dark backgrounds" — a local theme inversion. | **L.W3** (perf+a11y cohort residual) — fold per-tint adaptive contrast lane. The π recommendation §8 already names this; L absorbs. |

**Net P1 count**: 6 EXECUTED-WITH-WORKAROUND items. None are gate-blocking but each represents a substrate-shape compromise the user precepts permit on technicality but disprefer on gestalt.

---

## §D — P2 scope-drift and precept gaps

| ID | Surface | K plan vs. actual divergence | Disposition |
|---|---|---|---|
| **D-1** | K.W3 demo lane (Lane B) bounds reduced at the 2026-05-08 reconciliation — **excludes the 13 raw triplets** in `demo/stories/data/**` (speedtest W2.T10 territory) | K.md Cross-repo coordination §1 explicitly carves the 13 raw-triplet sweep out: "speedtest W2.T10 OWNS the StorySection sweep across `demo/stories/**` (~226 sites); K W3 Lane B's bounds reduce to: 5 demo `focus-visible:...` + 3 demo `--surface-tint` bypasses + 3 V-introduced demo `transition-all` + carousel-dots canonicalization". **Speedtest W close did land** v0.9.1 + v0.9.2 — but the StorySection sweep was partial (39 of ~226 at K open; PROGRESS.md notes speedtest closed at `5703521b`; the W2.T10 hard-gate item "≤ 0 raw triplet survivors" is the speedtest-side gate). K ι §1 row "Speedtest W2.T10 sweep coordination" marked OUT-OF-K-SCOPE. δ §14 confirmed 13 raw triplet sites still survive in `demo/stories/data/**` at K HEAD. So the K W3 Lane B reduced-bounds was honored on the glass-ui side, but the speedtest sweep DID NOT fully close the gate — 13 raw triplets remain on glass-ui's demo surface at K close. | **AMENDMENT-DRIFT** — K W3 cited the speedtest sweep as the absorption mechanism, but did not verify the absorption landed. δ §14 noted the survivors at K close; the K close ceremony accepted them as out-of-scope. **Fold into L.W3** — finish the 13-site sweep (now no inbound dispatch; L glass-ui owns). |
| **D-2** | K.W4 Lane A added a **new "Subpath surface" section to CLAUDE.md / DESIGN.md** — γ §"## Subpath surface" walks were extensive | The Subpath surface section content is canonical (DESIGN.md L1057-1127). γ §"Subpath enumeration" found D3 (CLAUDE.md doesn't enumerate the 3 WS subpaths by name; only prose mention). Cross-check: was this Lane A or Lane B (WS) territory? WS spec §"DESIGN.md Subpath surface section" delegates the section to WS lane authorship; W4.A proof §Coordinated WS dispatch note acknowledges the disjoint coordination. The Subpath surface section landed in DESIGN.md at W4.A's commit `36305da`, not WS's `a598b90`. **Scope-attribution unclear**: was the W4.A doc cohort expanded mid-dispatch to absorb WS doc work, or did WS leave a hand-off that W4.A picked up? The W4.A commit message includes "Slider keep-dock-open contract rewritten" + "Subpath surface" — but the wave spec scope for W4.A was "comprehensive CLAUDE/README/DESIGN walk", not "absorb WS doc surface". | **PROCESS-GAP** — W4.A's scope expanded silently to absorb the WS doc surface. Not a precept violation; the work is canonical. But the dispatch boundary was permeable. **Fold into L.W0 precept update** — add to AGENT_DISPATCH_TEMPLATE.md: "if a parallel sibling wave needs documentation absorption, name the absorption explicitly in the dispatch — do not implicit-expand the doc cohort to cover sibling delta". |
| **D-3** | K.WP P1-5 swapped `@import` for **inline `@font-face`** for Computer Modern — bonus request-count reduction noted in WP proof | WP spec mandated "font-display: swap on Computer Modern in `demo/demo.css`". The landed change: removed the upstream `@import` of an external CM stylesheet, inlined 4 `@font-face` blocks (regular/bold/italic/bold-italic) with local font files + `font-display: swap`. The bonus: each `@import` was a separate HTTP request; inlining drops 4 requests. **In-scope?** The spec said "swap on Computer Modern"; it did not authorize the upstream `@import` removal. The work is gestalt-correct (single-source-of-truth on font loading; canonical CSS-side declaration), but it's a substrate change (drop the upstream stylesheet dep) larger than the stated hard-gate. | **EXECUTED-WITH-WORKAROUND** (positive-direction). The change is right; the scope expansion was not authorized in WP spec. No precept violation, but the audit pattern would have caught it as scope-creep had ι extended its scope to "actual landed work vs. spec'd work". **Fold into L.W0** — α-lane should explicitly check "wave delta vs. spec hard-gates", not "wave delta vs. hard-gates + bonus opportunistic absorptions". |
| **D-4** | K W3.A `git stash` incident — recovery via Edit tool re-application | Recorded in W3.A commit message + K-pre-close §"Process incidents" + ι F4. Re-audit verification via `git log --all --oneline` + `git stash list`: 0 stashes survive (git stash list returns empty). The W3.A commit's file list (`git log 76fff65 --stat`) matches the W3-A proof doc's claimed file list (12 files: 1 audit doc + 1 BouncyToggle + 1 CarouselDots + 4 style files + 4 composables/utils dir-deletion + composables/index.ts + src/index.ts). No anomalies. Recovery was genuinely clean. The K W8 LESSONS-LEARNED entry (precept `d4ada55`) closed the loophole at the precept tier. | **CANONICAL recovery** — no orphan content; no cross-territory contamination. The precept update is the correct gestalt response. |
| **D-5** | W6 worktree-isolation anomaly — agents wrote to absolute paths instead of relative paths inside the worktree | Recorded in K-pre-close §"Process incidents" L93 + ι F3. The anomaly: `Agent isolation: "worktree"` was passed to the dispatch; agents wrote to the main tree's absolute paths (e.g., `/Users/.../glass-ui/src/...`) rather than the temp worktree's relative paths. The worktree was created but bypassed. **Cross-contamination probe**: at W6 dispatch (HEADLINE), parallel lanes were Lane A (variant authoring) + Lane B (consumer migration). Both lanes' file bounds were disjoint (Lane A: `src/styles/utilities.css` + `src/components/ui/button/index.ts` + `demo/stories/primitives/buttons.vue`; Lane B: `src/styles/dock.css` + `src/components/custom/dock/DockTabButton.vue` + `demo/stories/compositions/hero.vue`). The W6 commit's file list (`git log 154d1d2 --stat`) shows 8 files, all attributable to either Lane A or Lane B per the commit's per-lane sub-headings. No cross-contamination from W6 lanes into sibling-wave territories (W3, W4, etc.) — those sibling-wave commits had already landed in earlier sequence steps per the wave-concurrency ordering. **W6 absolute-path anomaly was contained** by accidental serial timing of the W6 dispatch (after sibling waves' file edits had landed in their own commits). | **CANONICAL containment by accident**, not by precept. If W6 had run truly in parallel with W3/W4, cross-territory contamination would have been a real risk. The K W8 LESSONS-LEARNED entry (precept `d4ada55`) closed the loophole at the precept tier. Re-audit confirms: no cross-contamination at K close, but the gate against it was timing, not enforcement. |
| **D-6** | ι integrity-sweep did not include a **cross-repo validation gate** as a hard-gate item | ι §1 row "Speedtest W2.T10 sweep coordination (post-K close)" marked OUT-OF-K-SCOPE. ι §2 had no row for "WS cross-repo SCC-trap re-probe at v0.9.3 in a speedtest consumer". The K close ceremony shipped v0.9.3 (a release tag) without a cross-repo synthetic-consumer probe. Speedtest's X.W3.c re-probe (post-K-close, 2026-05-09 at speedtest commit `eb5274d8`) discovered both P0-1 (typing publication bug) + the persistent SCC trap. Both were known/unknowable at K close depending on the audit pattern; with cross-repo validation as a hard-gate item, both would have surfaced before the v0.9.3 tag landed. | **PRECEPT GAP** — K invariant 15 (7-agent strengthened pattern) needs an 8th hard-gate item for **cross-repo validation under outbound-dispatch waves**. When a wave ships a release tag that targets a known cross-repo consumer (speedtest), the close ceremony must run a synthetic-consumer probe BEFORE the tag is pushed. **Fold into L.W0 precept update**. |

---

## §E — K invariants — re-audit against the harsher lens

| # | Invariant | K W8 ι verdict | Re-audit verdict | Notes |
|---|---|:---:|:---:|---|
| 1 | C-J precepts still bind | YES | YES | unchanged |
| 2 | **No silent misses** | YES | **NO** | P0-1 (typing publication bug) shipped at K close under all 7 audit lanes' noses. Invariant fails. |
| 3 | No tranche-letter shadow execution | YES | YES | WV closed the V-shadow retroactively. |
| 4 | Mandatory reconciliation at stale-baseline open | YES | YES | 2026-05-08 reconciliation landed. |
| 5 | HEADLINE invariant | YES | YES | Audacious primary-CTA shipped W6. |
| 6 | Worktree isolation BINDING | PARTIAL | **PARTIAL** (unchanged) | W6 anomaly contained by accident, not enforcement. Precept evolved at K W8. |
| 7 | Agents NEVER stage/commit/stash | PARTIAL | **PARTIAL** + ADDED CROSS-REPO GAP | W3.A stash recovered cleanly. **New gap**: K W7 + WS cross-repo annotation commit on speedtest at `6f412d89` (P1-2 above). |
| 8 | Substrate-without-consumer binary at K close | YES | **PARTIAL** | WS subpaths shipped at v0.9.3 with 0 internal consumers (Phase 1 additive) AND broken downstream typing (P0-1). They are not consumer-validated; the bar is satisfied at the dist-emit shape but not at the consumer-import shape. |
| 9 | Architectural transposition default | YES | YES | W6 HEADLINE canonical. |
| 10 | Vocab convergence is gestalt sweep | YES | YES | W3 walked every J-shipped token/utility. |
| 11 | Doc-drift binary at close | YES | YES | W4.A + W8 cleanup absorbed. |
| 12 | Bundle-budget gate restored | YES | YES | W4.B + workflow binding. |
| 13 | Mobile-viewport fitness | YES | YES | W5 closed; π re-verified at HEAD. |
| 14 | Demo-private chrome canonical-aware | YES | PARTIAL | 13 raw triplets in `demo/stories/data/**` survive K close (D-1 above); speedtest sweep absorption was incomplete. |
| 15 | 7-agent strengthened pattern with ι | YES | **PARTIAL** | The pattern is canonical at K close — but it under-flagged P0-1. Strengthening proposal: add **κ packaging-emission** lane (P1-3 above). |
| 16 | Lighthouse perf + a11y absorbed | YES (with WP re-run deferred) | PARTIAL | F-ε-2 viz contrast was MISSED at WP close + AMENDMENT-DRIFTED at π re-discovery + EXECUTED-WITH-WORKAROUND at W8 cleanup (P1-6 above). |

**Net K invariant verdict**: **2 invariants fail outright (2 + 8)** under the harsher lens. **5 are PARTIAL** (6, 7, 14, 15, 16). **9 are CANONICAL** (1, 3, 4, 5, 9, 10, 11, 12, 13).

---

## §F — Critical assessment: was K close clean by canonical standards?

**K closed clean by the strict-binary reading of each binding invariant.** The 7-lane audit collectively returned 0 P0, 2 P1, 3 ε findings (all absorbed in W8 cleanup), and 1 DEGRADED-AS-DOCUMENTED wave (WS). FINAL.md authoring was earned.

**K did NOT close clean by the user's stated precept stream** (`feedback_no_backwards_compat`, `feedback_overfitting_audit`, `feedback_architectural_approach`, `feedback_analyze_in_full`):

1. **`feedback_no_backwards_compat`** — WS Phase 1 shipped backward-compat (root barrel still re-exports vueuse-bearing symbols). The CHANGELOG.md framing ("Phase 1 keeps backward compat") is technically additive-only, but the gestalt of the precept is "clean break — don't ship a regression alongside the additive prerequisite". K shipped a regression alongside an additive prerequisite. WS Phase 2 (root-barrel removal) is the clean-break shape; v0.9.3 ought to have been v1.0-rc1 or have not shipped under K at all.

2. **`feedback_overfitting_audit`** — β + ε + ι collectively walked the WS subpath surface and marked it PASS. But the synthetic-consumer typecheck probe was not run. Every audit lane operated on the **source-tree shape**, not the **consumer-import shape**. P0-1 is the consequence: the public surface advertises a fix that downstream consumers cannot adopt without typecheck errors.

3. **`feedback_architectural_approach`** — the cssVar inline-`readToken` (P1-1) is a "wire-and-forget" choice, not a "collapse-and-retire" choice. K satisfied the K invariant 8 binary (cssVar retired) but at the cost of a substrate-of-the-day shape (private inline helper that re-litigates the imperative-token-read question when a second consumer arises).

4. **`feedback_analyze_in_full`** — the WS β + ε audits read the d.ts file CONTENTS (50-byte and 54-byte sizes) without questioning what the contents actually said. Reading "in full" means: "what does `export * from '../src/composables/dark'` mean when `dist/composables/dark.d.ts` ships without `dist/src/`?". β + ε both stopped at file existence + size — neither read the contents semantically.

**K close ceremony declared cleanliness on the technical reading of binding invariants. The user precept reading was under-served. The L tranche absorbs the gap.**

---

## §G — Net K verdict

**K closed 14 hard gates with 1 DEGRADED + 0 MISSED at the K W8 ι-lane scope.**

**Re-audit promotes**:
- **2 P0 silent misses** (WS typing publication bug; WS ACCEPT-DEGRADED disposition decision):
  - P0-1 fires on every consumer attempting subpath import migration at v0.9.3 (speedtest's X.W3.c is the empirical demonstration).
  - P0-2 is a precept-shape question: was DEGRADED-AS-DOCUMENTED the right call vs. HALT-PRE-RELEASE? The harsher lens says HALT was the precept-correct choice.
- **6 P1 EXECUTED-WITH-WORKAROUND items**:
  - cssVar inline `readToken` (workaround for the missing imperative-read surface on `useTokenColor`).
  - Cross-repo annotation commit on speedtest without explicit user authorization.
  - β + ε audit-pattern gap (no synthetic-consumer typecheck probe).
  - F-ε-3 diagnostic candidates dropped rather than persisted as a test fixture.
  - W7 NumberField Option B documented but not committed to either ship-or-retire.
  - WP P1-1 viz-basis contrast: MISSED at WP, AMENDMENT-DRIFTED at re-discovery, EXECUTED-WITH-WORKAROUND at cleanup.
- **6 P2 scope-drift / precept-gap items** (D-1 through D-6 above).

**Quantitative**:
- 14 hard gates from K close criteria — **all met** at the strict-binary reading.
- 1 DEGRADED-AS-DOCUMENTED wave (WS) — re-classified as **DEGRADED + SILENT-MISS** under the harsher lens (the documented degradation hid the typing-publication regression).
- **2 of 16 K invariants fail outright** under the precept-stream reading (#2 no silent misses; #8 substrate-without-consumer at the consumer-import shape).
- **5 of 16 K invariants are PARTIAL** under the precept-stream reading (#6, #7, #14, #15, #16).
- **9 of 16 K invariants are CANONICAL** under both readings (#1, #3, #4, #5, #9, #10, #11, #12, #13).

**Net K verdict**: K closed canonically at the strict-binary K-close standard. K closed **NOT-CLEAN-BY-USER-PRECEPTS** at the harsher J-Rα-style retrospective standard. **L absorbs P0-1 (typing bug) + P0-2 (WS Phase 2 v1.0 dispatch) as P0**; all 6 P1 items fold into L's waves per the table above; all 6 P2 items fold into L's precept update + housekeeping lanes.

**L tranche is the v1.0 cohort** per L findings.md L43: "L is the v1.0 cohort — breaking changes are explicitly in-scope where they retire substrate/aliases (WS Phase 2 root-barrel removal is the canonical example)". The L user directive stream explicitly resurfaces the WS Phase 2 work as the canonical L example; this re-audit confirms WS Phase 2 + P0-1 typing-publication fix are L.W1's load-bearing priorities.

---

## §H — L candidacy recommendations (priority-ordered)

### P0 (must-absorb at L.W1)

1. **P0-1 — Fix `dist/composables/{dark,keyboard}.d.ts` emit** via vite-plugin-dts config (force-inline the barrel types like `dist/forms.d.ts` does, OR rewrite the `'../src/'` relative re-export to point at the actual emitted artefact). Drop the unexposed top-level `dist/{dark,keyboard}.d.ts` to avoid the misleading duplicate. Synthetic-consumer typecheck probe lands as the hard-gate.

2. **P0-2 — WS Phase 2 root-barrel removal** (the canonical L.W1 work). Remove vueuse-bearing re-exports from `src/index.ts` + `src/components/ui/index.ts`. Subpaths become the only access for `Input` / `Textarea` / `Combobox*` / `useGlobalDark` / `useKeyboardShortcuts`. v1.0 tag ships. CHANGELOG.md MIGRATION block carries the breaking-change disclosure. Speedtest's 5 consumer files (`App.vue:100`, `config/auroraConfig.ts:2`, `dashboard/DashboardMap.vue:61`, `views/AdminOverviewView.vue:60`, `layouts/AdminDashboardLayout.vue:96`) migrate to subpaths once P0-1 + P0-2 land together. SCC trap closes (per speedtest X.W3.c mechanism analysis).

### P1 (should-absorb at L.W2-W3)

3. **P1-1 — cssVar imperative-read surface** as `useTokenColor.read()` companion. BouncyToggle inline copy retires.
4. **P1-2 — Cross-repo write boundary precept** — AGENT_DISPATCH_TEMPLATE.md update.
5. **P1-3 — κ packaging-emission audit lane** (or fold into ε scope expansion) — synthetic-consumer typecheck probe.
6. **P1-4 — Configurator recursion diagnostic test fixture** — `tests/diagnostics/configurator-recursion.spec.ts`.
7. **P1-5 — NumberField keep-dock-open decision** — ship-or-retire commit.
8. **P1-6 — Viz-basis per-tint adaptive contrast** — `--on-viz` token or per-tint adaptive utility.

### P2 (L housekeeping)

9. **D-1 — Finish 13 raw-triplet StorySection sweep** in `demo/stories/data/**` (no longer inbound — glass-ui owns at L).
10. **D-2 — Dispatch boundary precept** — name doc absorption explicitly.
11. **D-3 — α-lane scope-creep check** — "delta vs. spec" not "delta vs. spec + bonuses".
12. **D-6 — Cross-repo validation hard-gate** for outbound-dispatch waves.

### Carried K residuals (per K-residuals.md)

R1 (StoryPager inner-tab overflow at 375); R2 (CLAUDE.md/README.md subpath enumeration polish); R3 (12 wave-spec status lines stale); R4 (4 surface-tint rung gaps `35/40/40/70`); plus all 12 cross-tranche-debt rows from K-residuals.md §"Cross-tranche debt".

---

## Cross-references

- K FINAL: `docs/tranches/K/FINAL.md` (the K close retrospective).
- K plan: `docs/tranches/K/K.md`.
- K PROGRESS: `docs/tranches/K/PROGRESS.md`.
- K W8 audit cohort: `docs/tranches/K/audit/K-audit-{α,β,γ,δ,ε,π,ι}-*.md`.
- K residuals ledger: `docs/tranches/K/audit/K-residuals.md`.
- K pre-close: `docs/tranches/K/audit/K-pre-close.md`.
- WS evidence (canonical): `docs/tranches/K/audit/W-S-bundle-evidence.md`.
- L findings (user directives): `docs/tranches/L/findings.md`.
- J Rα retrospective (this audit's pattern source): `docs/tranches/K/research/Rα-J-retrospective.md`.
- Speedtest X.W3.c re-probe (post-K-close empirical): `/Users/mkbabb/Programming/speedtest/docs/tranches/X/artefacts/W3/scc-test-result.md` + `migrations.md`.
- Speedtest W3.b.1 disposition (annotated by glass-ui K orchestrator at `6f412d89`): `/Users/mkbabb/Programming/speedtest/docs/tranches/W/artefacts/W3/b1/disposition.md`.
- Precept submodule `d4ada55` (4 K W0 + 2 K W8 LESSONS-LEARNED).

## Bounds compliance

- **Read**: K FINAL/plan/PROGRESS, 7 K audit lanes, K residuals, K pre-close, W-S evidence, L findings, K findings, J Rα retrospective, package.json exports, `dist/composables/{dark,keyboard}.d.ts` + `dist/{dark,keyboard}.d.ts` + `dist/forms.d.ts`, `src/composables/dark.ts` + `src/composables/keyboard.ts`, CHANGELOG.md v0.9.3 entry, speedtest X.W3.c + W3.b.1 docs, git log (read-only) at K commit chain, `demo/stories/primitives/buttons.vue` viz-basis cells.
- **Created**: this file (`docs/tranches/L/research/Rα-K-retrospective.md`).
- **Modified**: none.
- **Hardened agent git clause**: read-only git only (`git log --all --oneline`, `git log <sha> --stat -1`, `git stash list`). No mutating subcommands. No `git stash` even for state-probe.
