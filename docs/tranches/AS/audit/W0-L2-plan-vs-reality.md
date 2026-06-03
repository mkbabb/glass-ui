# AS.W0 — Lens 2: the original PLAN vs REALITY + the status of AR's remaining waves

Read-only audit. HEAD = `36fb348` on `master`, version **3.1.1** (tag `v3.1.1` at `ed2add9`). AR.W2 shipped; W3-W6 PLANNED. The cohort consumes glass-ui via `^3.1.0` (fourier `web/`, speedtest) which floats up to 3.1.1.

---

## 1 — AR.W2: plan vs reality (what landed beyond the plan's framing)

The plan (`NEXT-ROUND-EXECUTION-PLAN.md §2 M-CI`) framed glass-ui's #177 as **one node-pin bump** ("pin node 20 against `engines:>=22`; bump to 24"). REALITY at HEAD: #177 was **two independent faults**, and fixing them unmasked a **third class** the plan never anticipated.

- **Fault A — node pin.** `ci.yml:30` + `release.yml:26` now `node-version: 24`. As-framed. Done.
- **Fault B — lockfile drift (the true `npm ci` failure, NOT in the plan).** `package-lock.json` recorded `@mkbabb/keyframes.js`/`@mkbabb/value.js` as `file:` links to dev siblings and was missing `@mkbabb/parse-that`, so a clean runner failed `npm ci` (`@mkbabb/keyframes.js@2.1.1 does not satisfy @^2.2.0`) BEFORE node ever mattered. The plan's "node 20→24" framing would have left a still-red pipeline. Fixed: 4 `@mkbabb` link entries stripped + registry-re-resolved (keyframes 2.2.0, value 0.10.0, parse-that 0.8.2). `release.yml:28` `npm ci` now passes; `:50` `npm publish --access public`.
- **Class C — `proof:*` CI-portability (entirely unbudgeted; surfaced as a byproduct).** Fixing `npm ci` greened the install, which then ran the `proof:*` gates on a clean runner for the first time — and **three** of them assumed the local monorepo sibling layout and went red:
  - `proof:package` (`8515034`) — fixture resolved keyframes via `file:../keyframes.js`; now falls back to the registry peer range with no sibling.
  - `proof:resolution` (`53a0fb3`) — now skips an absent sibling publisher rather than flagging it.
  - `proof:consumers:static` — a **latent false-witness**: `collectExports` matched an `export * from` directive *inside a comment* (`src/index.ts:174`), over-collecting the motion-core leaf set and coincidentally masking a stale `Input`/`Textarea`/`Combobox*`/`Carousel*` contract. The broken install had been hiding it. Fixed by comment-stripping the collector (the AP.W4 false-witness discipline recurring a third time — `707f346`).

**The plan-vs-reality delta:** the #177 line item was a 3-fault iceberg whose deepest fault (the proof-gate portability class) is the more durable lesson. The 8 `proof:*` scripts (`scripts/proof-*.{mjs,sh}`) are now CI-portable, but the class is not closed by a gate the way `proof:vt-names` closes the binding class — it was closed by 3 point-fixes. **There is no `proof:*`-portability meta-gate** asserting every proof script runs sibling-free. That is an AS-eligible finding: the next proof script someone adds can re-introduce the sibling assumption with nothing catching it until a clean runner does.

**The headline that DID land exactly as planned:** the binding-correctness floor (inv-η). Verified at HEAD: `GlassDock.vue:111` `const dockId = \`glass-dock-${useId()}\``; the module counter deleted; the `:172-184` comment names `useId()` as the real source. `proof:vt-names` PASS (4 mints — GlassDock + DockLayerGroup `js-dynamic` via `useId()`; BouncyToggle + UnderlineTabs `css-static` page-singletons). 543 tests incl. the pairwise-distinct guard. Full gate matrix green. **AR.W2 is genuinely, verifiably done.**

---

## 2 — Do AR's W3-W6 levers still stand at HEAD (3.1.1)? Per-lever re-validation

Every named lever re-checked with a `file:line`. The gaps are all still real — AR.W2 touched none of them.

### G1 — container STYLE queries (`@container style(--density:…)`) — REAL, ≥2-able, not overfit
- `grep "@container style" src/styles/` → **zero hits.** Density is 100% attribute-selector: `dock.css:89/104/117/134` `.glass-dock[data-density="compact|comfortable|spacious|audacious"]`, the coarse floor at `:1080` `.glass-dock[data-density]`. The W7 no-show stands.
- ≥2-consumer: `[data-density]` is read by the dock + the coarse-pointer floor + the width-math; a style-query layer lets ANY descendant react to an ancestor `--density` set. Consumer-able. **Real.**

### G2 — scroll-state container queries (`@container scroll-state(snapped)` + `scrollsnapchange`) — REAL, ≥2-able
- `grep "scroll-state\|scrollsnapchange"` → **zero hits.** The carousel runs entirely on embla JS observers: `useCarousel.ts:36-38` wires `.on('init'|'reInit'|'select', onSelect)`. `GlassCarouselPager.vue:18` documents "embla — wire via `useCarousel`." The gap is concrete and measurable (a listener-count drop is bookable). **Real.**

### G3 — cross-document VT (`@view-transition { navigation: auto }`) — REAL
- `useViewTransition.ts` is **strictly same-document**: it wraps `document.startViewTransition` only (`:78-97`), and `:8-9` explicitly states "does NOT manage `view-transition-name` assignment." `grep "@view-transition\|navigation: auto"` → zero. The cross-document substrate + directional vocab does not exist. **Real.** CAVEAT below on the ≥2-consumer status.

### G4 — `scheduler.postTask` priority — REAL
- `useYieldToMain.ts:30` binds only `scheduler.yield`. No `postTask`/`TaskController`/`usePrioritizedTask` anywhere (`grep` confirms). `useYieldToMain` ships on `/motion-core` with its MessageChannel fallback; the priority ceiling (`user-blocking`/`user-visible`/`background`) is unbuilt. **Real.**

### The AS-GU bundle — mixed; two items are ALREADY-SHIPPED, the spec is stale on them

- **`--spring-crisp` (ζ≈0.80)** — does NOT exist. `tokens.css:158-161` ships `--spring-{smooth,snappy,bouncy,gentle}` (script-generated by `regen-spring-tokens.mjs`, "DO NOT hand-edit"). **Real gap**, but the AR.md ≥2-consumer claim ("pane-slide + ≥4 easter-eggs") has **zero in-repo sites** — `grep "spring-crisp\|pane-slide"` across `src/` + `demo/` → nothing. The consumers are all cross-repo (speedtest). **This is a substrate-without-in-repo-consumer flag** — it clears the bar only via external consumers, which the overfitting audit must verify, not assume.

- **`deriveAurora`/OKLab-LUT** — **LARGELY ALREADY SHIPPED. The AR.W5 spec is stale.** `src/components/custom/aurora/composables/color.ts` already exports `srgbToOKLab`, `oklabToOklch`, `oklchToLinear`, `flattenPalette` (the LUT writer), `cssToOklch`, `hexToOklchStop` — all PUBLIC via `aurora/index.ts:26-33`. `flattenPalette` is consumed in `runtime.ts:378`. The symbol `deriveAurora` itself does not exist (only in AR docs), but the OKLab machinery the item names is **done**. AR.W5 must be re-scoped to "what, if anything, `deriveAurora` adds over the shipped `color.ts`" — as written it risks re-implementing landed substrate. **Overfit-adjacent: the item may be a no-op.**

- **whisper-heading typography rung** — does NOT exist (`grep "whisper"` in `typography.css` → zero). Real gap. AR.md itself hedges it ("demo-or-not-shipped if thin") — correctly flagged as the weakest ≥2 candidate.

- **dock dark `--glass-opacity-dock` rung + `always-expanded` overflow fix** — `.always-expanded` exists (`dock.css:479/487`, `GlassDock.vue:296`); `--glass-opacity-dock` does NOT (`grep` → zero). The overflow fix is correctness (ungated, like AP's DockLayerGroup). **Real, partially landed.**

- **CompletionSeal / GlassNativeSelect** — neither exists in `src/` OR `demo/` (`grep` → zero hits both). Both correctly demo-gated/not-shipped in the plan; **no substrate leak risk** since nothing is built. They are pure forward-work, not flags.

- **standalone-`DockIconButton` coarse floor (S-2)** — **REAL and precisely located.** `DockIconButton.vue:24` emits class `dock-icon-button`; `dock.css:659-680` sizes it via `--dock-control-size, var(--size-icon-btn)`. The 44px coarse floor ONLY fires under `.glass-dock[data-density]` (`:1080`, the AP.W3 R0G-6 fix). A DockIconButton rendered OUTSIDE a `.glass-dock` ancestor (e.g. `demo/layout/CategoryRail.vue`) has **no coarse floor** — it inherits `--size-icon-btn` with no `@media (pointer: coarse)` bump. The lift-to-the-button item is correct.
  - NOTE a latent doc-drift: CLAUDE.md + `index.css:56` say `.dock-icon-btn`; the live class is `.dock-icon-button`. Cosmetic, but worth folding.

**Verdict:** G1/G2/G3/G4 + `--spring-crisp` + whisper-heading + dock-dark-rung + DockIconButton-floor + CompletionSeal + GlassNativeSelect are all real forward-work. **Two stale items: `deriveAurora` (the OKLab work is already shipped — re-scope or drop) and the `--spring-crisp` ≥2-claim (in-repo sites are zero — verify cross-repo, don't assume).**

---

## 3 — The two-gate spine: does the cohort now unblock correctly?

**GATE I (3.1.1, AR.W2) — MET.** The dock VT-name collision is fixed; 3.1.1 is tagged + published (locally — `NPM_TOKEN` not seeded, so the CI-publish *proof* is still owed, but the artifact exists). The two booked cohort asks landed inside it: `glass-ui-a11y` (`ConfiguratorLayer` `:inert="!internalOpen"`) and `glass-ui-P5-inner-rounding` (corrected — b6d6cf4's per-section radius DEFORMED dividers; the fix REMOVES it and lets the container clip own root rounding). Both fourier (`web/package.json` `^3.1.0`) and speedtest (`^3.1.0`) float to 3.1.1. **The cohort's GATE-I dependency (CONSTELLATION §3 "design waves wait for glass-ui's release") is satisfied for the patch-level asks.**

**One un-discharged GATE-I obligation:** fourier's console-error e2e (the original bug-catcher) green-status is asserted-not-witnessed in AR — the W2 audit books it as "the fourier-class catcher the static gate complements," but the actual fourier CI green run is cross-repo (USER-DOMAIN, inv-16). glass-ui's gate (`proof:vt-names`) proves the SOURCE is collision-free; the consumer-side e2e green is owed by the cohort, not by glass-ui. **glass-ui has discharged its half.**

**GATE II (3.2.0, AR.W3-W6) — NOT STARTED.** The plan's GATE-II payload is "container/scroll-state queries + cross-doc VT + postTask + AS-GU + the NATIVE DRAWER." Re-reading the plan vs AR.md surfaces a **scope mismatch the plan-author left**: `NEXT-ROUND-EXECUTION-PLAN.md §3 GATE II` and `§6` both list **"the NATIVE DRAWER substrate"** as a GATE-II deliverable ("muster+speedtest native drawer"). **AR.md carries NO native-drawer wave.** AR's W3-W6 are container-queries / cross-doc-VT / postTask / AS-GU — the native drawer is absent from AR entirely. Either the plan over-promised or the drawer was silently dropped when AR was authored. **This is a real plan-vs-reality gap the forward tranche must resolve:** is the native `<dialog>`/`commandfor`/invoker-driven drawer still owed to muster+speedtest, or refuted? It is named in `MODERN-WEB` lineage but has no home wave at HEAD.

**What glass-ui still owes the cohort:**
1. The `NPM_TOKEN` secret seed → the CI-publish proof for 3.1.1 (USER-DOMAIN; the only blocker on proving the repaired pipeline).
2. The GATE-II leverage as 3.2.0 (container-query density, cross-doc VT, postTask) — speedtest's `as-close` adoption waits on it.
3. A ruling on the native-drawer (owed-or-refuted) — currently in limbo between the plan and AR.

---

## 4 — RECOMMENDATION: the forward-tranche shape

**Close AR clean at W2. Open AS to carry the leverage + the new findings.** Rationale:

1. **The AR headline shipped and is structurally complete.** AR's thesis is "make the binding silent-no-op impossible" (inv-η). That is DONE and gated. The binding-correctness floor + CI repair + the two cohort asks form a coherent, releasable unit (3.1.1) — a clean tranche boundary. Forcing W3-W6 to stay under AR conflates a *correctness* tranche with a *leverage* tranche; they have different binding questions, different gate shapes, and a SemVer boundary (patch vs minor) between them.

2. **AR.W2 invalidated two of AR's own forward assumptions** — the `deriveAurora` item (OKLab already shipped in `color.ts`) and the `--spring-crisp` ≥2-claim (zero in-repo sites). A forward tranche should re-derive its AS-GU roster against HEAD, not inherit AR's stale A1-era roster. Re-opening the audit under a fresh letter (AS) is the honest move; continuing AR would carry the stale dispositions forward unexamined.

3. **AR.W2 surfaced a NEW class AR never scoped — proof-gate CI-portability.** Three `proof:*` scripts were sibling-coupled; they were point-fixed, but no meta-gate asserts portability. This is exactly the kind of substrate-level closure AS should own (the dual of what inv-η did for binding): a `proof:*`-portability assertion so the next proof script can't re-introduce the sibling assumption. This finding did not exist when AR was authored — it belongs to AS.

4. **The native-drawer limbo needs an owner.** The plan promised it to GATE II; AR dropped it. AS should either author the drawer wave (if muster+speedtest still want it — ≥2-consumer check) or refute-in-record. Leaving it half-promised is the worst state.

**Proposed AS shape (the leverage tranche + the new findings):**
- **AS.W0/W1** (DEV) — re-run the modern-web baseline against 3.1.1 HEAD; re-derive the AS-GU roster (kill `deriveAurora` as a no-op or re-scope to its delta over `color.ts`; verify `--spring-crisp`'s cross-repo consumers exist before shipping the token; confirm whisper-heading clears ≥2 or demote to demo); rule on the native drawer (owe-or-refute with a ≥2 check against muster+speedtest); spec the `proof:*`-portability meta-gate.
- **AS.W2-W4** (IMPL) — G1 container-style-queries + G2 scroll-state (the CSS-platform headline); G3 cross-doc-VT + G4 postTask; the re-scoped AS-GU survivors. Folds as **3.2.0** atop 3.1.1, exactly as AR planned the *fold* — just under a clean letter.
- **AS close** — overfitting audit + the proof-portability meta-gate + 3.2.0 fold.

**Why NOT continue as AR W3-W6:** AR's `PROGRESS.md` already books W3-W6 as PLANNED, so mechanically they could continue. But the tranche-format precept (multi-wave reforms adopt a coherent binding question per letter) cuts against bolting a leverage arc onto a correctness tranche whose headline is shipped. A clean AR close at W2 IS the gestalt move — the binding-correctness headline landed, the CI is repaired, the cohort is unblocked at the patch level. AS carries the leverage with a roster re-derived against reality + the two new substrate-closure findings (proof-portability, native-drawer ruling) that AR could not have known.

---

## Fold candidates for the AS tranche

1. **`proof:*`-portability meta-gate** — 3 proof scripts were sibling-coupled (point-fixed in `8515034`/`53a0fb3`/`707f346`); no gate asserts portability. NEW class from AR.W2. (chronic: surfaced once, but a recurring false-witness lineage — AP.W4, AR.W2 ×2.)
2. **`deriveAurora` re-scope-or-drop** — the OKLab/LUT work is already shipped in `aurora/composables/color.ts`; the AR.W5 item may be a no-op.
3. **`--spring-crisp` ≥2-verification** — zero in-repo sites; the ≥2 claim rests entirely on cross-repo consumers that must be witnessed, not assumed.
4. **Native-drawer ruling** — plan promised GATE II; AR dropped it. Owe-or-refute against muster+speedtest.
5. **`.dock-icon-btn` vs `.dock-icon-button` doc-drift** — CLAUDE.md + `index.css:56` name the wrong class.
6. **`NPM_TOKEN` seed + the CI-publish proof for 3.1.1** — USER-DOMAIN; the only un-discharged GATE-I obligation.
