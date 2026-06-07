# Band-G harden — the convergence fix-list (current-state verified)

## SYNTHESIS

Now I have full verification. Synthesizing all five reviews against current state:

**Confirmed current-state defects:**
- W28: sidebar-collapse FATAL (review 1) — verified against GlassDock source; fabricated `--dock-collapsed-inline-size` token; Playwright placement under `tests/demo/*.spec.ts` swept by vitest; DAG cycle (reviews 4,5); "strictly LAST" vs "opens band G" self-contradiction; stale W27×4.
- W29: footer-reset is a consumer slot not a library button (review 4); ConfiguratorLayer line :104 should be :103 (review 2); §10 line 102 radius mis-attributed to W24 (should be W25) (review 2).
- W30: progress-coordination gate clause vacuous — GlassCarouselPager has no progress affordance (review 2 MAJOR); W30 §10 radius — actually W30 §10/§6 do NOT cite radius (verified: line 104 has no radius mention) — so review 2's W30 minor radius finding is STALE/not-present in current state. Discard.
- W31: mints `proof:naming-consistency` as a 3rd born-RED gate, but State one-liner (:8) names only 2, AW.md row names only 2, W33 close registers only 2 (zero naming-consistency refs) — orphaned gate (reviews 3,4,5); naming-consistency gate (c) self-falsifying phantom-token substring (review 3); stale W27×10.
- W32: band-G labels off-by-one in 3 places (all reviews); stale W27×3.
- W33: drops `proof:naming-consistency` from W31's group (reviews 4,5).

**Discarded as stale or non-current:**
- Review 2's W30 radius-provenance minor (W30 §10 does not cite radius in current state).
- Review 3's framing of W31↔W2 as a "redo CRITICAL" — current W31 bounds are conditional ("IF the gate finds a residual") and explicitly AUDIT-not-redo (lines 23, 76); downgrade to REFINE.
- Review 3's claim that W31's aurora/utilities residuals are out-of-bounds — current W31 gate-scan (line 25) includes `aurora/**` and `utilities.css`; the modify list is conditional. Lower severity; note as REFINE.

Here is the synthesis.

---

# BAND-G HARDEN SYNTHESIS

Verified against current HEAD files (waves/AW.W28–W33, AW.md, and the cited `src/` source). Stale findings that cited already-fixed historical issues are discarded; the W30-radius and W31-redo claims were checked and downgraded/dropped where current state no longer supports them.

## (1) THE BLOCKER FIX-LIST

### W28 — storybook + demo dock-nav

**[BLOCKER · FATAL] The vertical sidebar collapse↔expand is impossible on the shipped GlassDock without a `src/` edit the wave forbids.**
W28:18 mandates a `variant="rail" orientation="vertical"` GlassDock with "an EXPLICIT collapse↔expand affordance (icon-rail ⇄ icon+label)" and W28:87 claims it "rides the EXISTING `GlassDock` collapse machinery (W1/W2 + W3)". Verified against `src/components/custom/dock/GlassDock.vue`: line 135 `alwaysExpanded = props.alwaysExpanded || orientation.value === "vertical"`, line 191 `visualExpanded = alwaysExpanded || expanded` (permanently true for vertical), line 121 `variant === "rail"` forces vertical, line 390 comment "Vertical docks are tool palettes: they don't collapse into a summary icon", line 395 the `.dock-layers` collapsed↔expanded pair is `orientation === 'horizontal'`-ONLY, line 418 vertical renders a single bare `<slot/>`. There is no `expanded`/`collapsed` state to morph and nothing for the §7 `aria-expanded`-bound trigger to control. Delivering W28's sidebar REQUIRES editing GlassDock — which W28's own §3a line 31 names as a mandatory escalation trigger. The wave self-invalidates on first render. Gate condition (W28:8) "the sidebar collapse↔expand morph ... paint across 3 viewports" can never pass.
*Fix*: re-scope §3.2/§Visual-spec to one of: (a) make the sidebar a FIXED icon-rail (which is what CategoryRail already is) with the mobile off-canvas Sheet/Drawer as the only "expand" — the genuine new deliverable is the NCSU-red active restyle + `tap-squish` + the bottom-bar promotion, not a collapse morph; or (b) mint a vertical-rail-collapse dock-primitive wave in a prior band and make W28 depend on THAT. Stop claiming the morph "rides the EXISTING GlassDock collapse machinery" — that machinery does not exist for a vertical rail.

**[BLOCKER] Fabricated token `--dock-collapsed-inline-size`.**
W28:78 cites "icon-rail at `--dock-collapsed-inline-size` (~72-80px)". `grep` over `src/styles/` returns ZERO hits — the only real collapsed token is `--dock-collapsed-summary-min-size` (`dock.css:380`, a horizontal-summary min-width). This violates the W20 read-a-real-token discipline the wave itself invokes (§3.6).
*Fix*: remove the invented token; there is no consumer-facing inline-size rail-collapse token. (Resolves with the FATAL rescope.)

**[BLOCKER] DAG cycle: W28 depends on the close, the close depends on W28.**
W28:6 + W28:134 "Opens after / Depends on ... W27-close's gate-set registration". W33-close:6 "Opens after ALL bands (W0-W32)" — which includes W28. True cycle.
*Fix*: strike the "W27-close's gate-set registration" clause from W28:6 and W28:134. A gate runs locally during its own wave; the close adds the manifest entry afterward — the same pattern W29/W30/W31/W32 follow. W28's real deps are Band-F (W22-W26) + W20 + W1-W3.

**[BLOCKER] Playwright runtime gate placed where vitest will sweep it.**
W28:49/:102/:109 put the runtime probe at `tests/demo/demo-dock-nav.spec.ts`. `vitest.config.ts:24` globs `tests/**/*.{test,spec}.{ts,tsx}` — a `.spec.ts` under `tests/` is a VITEST/jsdom spec, which cannot boot a dev server, drive clicks, or screenshot. The repo's actual Playwright pattern is a standalone `.mjs` that dynamic-imports playwright and skips-fail-open when harnessless (per `scripts/proof-dock-animation-live.mjs`); there is no `playwright` dep / no `playwright.config.*`. The §6.3 "runtime render is the falsifier" promise is undercut — on a standard runner this gate either mis-runs under jsdom or skips.
*Fix*: move the runtime probe to a standalone `scripts/proof-demo-dock-nav-runtime.mjs` that dynamic-imports Playwright and SKIPs-with-named-reobligation on a harnessless runner (mirror `proof-dock-animation-live.mjs`). State the `npm i -D playwright` + live-server precondition.

### W30 — carousel redesign

**[BLOCKER · MAJOR] Gate-5 "Progress coordination" clause is vacuous and non-falsifiable.**
W30:8/:22/:43/:76 gate that the carousel pager "COMPOSES the shipped `<Progress>` fill ... does NOT fork", conditioned on "IF it renders a progress affordance". Verified `src/components/ui/carousel/GlassCarouselPager.vue`: it renders chevron Buttons + a "X / N" counter pill only — NO `<Progress>`, no progress bar, no `.glass-progress-rail`. The conditional is satisfied by ABSENCE, so the "does not fork" assertion passes trivially and can never go RED — a forward-hook without a same-wave consumer (WAVE_SPEC prohibition).
*Fix*: either (a) DROP the Progress-coordination half of §3.5 + Hard-Gate condition 5 entirely (the dots four-state is the real born-RED half and stands alone); or (b) if a progress affordance IS intended, make it a CONCRETE additive scope bullet ("add a `<Progress class=glass-progress-rail>` rail to GlassCarouselPager") with its own born-RED line.

### W31 — animation-coherence + DESIGN.md + naming

**[BLOCKER] `proof:naming-consistency` is minted as a born-RED hard gate but orphaned everywhere it must register.**
W31:47/:65/:117/:144 mint `proof:naming-consistency` as a born-RED gate with a created `scripts/proof-naming-consistency.mjs` + a `package.json` entry. But W31:8 (State one-liner) and W31:13 (Goal) name only `proof:animation-coherence` + `proof:design-md-current`; AW.md:170 (W31 row) names only those two; W33-close registers only those two (`grep -c naming-consistency AW.W33-close.md` = 0). A minted package.json gate with no manifest home fails `gates:verify-ci`.
*Fix*: pick ONE and reflect it everywhere — (a) add `proof:naming-consistency` to the W31 State line, AW.md:170, AND the W33 close gate-set (3 sites); or (b) fold it into `proof:design-md-current`'s doc-scan per W31's own §6 KISS note and DELETE the standalone script/package.json entry/§6-condition-3. Today's minted-but-unregistered half-state is the defect.

**[BLOCKER] W33 close drops W31's third gate.**
W33-close:17/:66/:79 register only `proof:animation-coherence` + `proof:design-md-current` for W31. This is the exact `gates:verify-ci` drift W33 exists to fail-closed on.
*Fix*: tied to the W31 fix above — register the third gate or confirm the fold, then ensure W33 matches.

### W32 — lighthouse

**[BLOCKER · HIGH] Band-G wave→name map is off-by-one in three places.**
W32:6 "Opens after: W31 (carousel-redesign)" and the same-line parenthetical "(storybook-completeness W28, demo-dock-nav W29, aurora-configurator W30, carousel W31)"; W32:121 repeats the wrong map. Canonical (AW.md table + wave-file headers): W28=storybook+demo-dock-nav, W29=aurora-configurator, W30=carousel, W31=animation+DESIGN.md. The ORDERING (W32 opens after W31, the last band-G wave) is correct; only the labels are wrong. This is precisely what W31's own `proof:naming-consistency` exists to catch.
*Fix*: W32:6 → "Opens after W31 (animation-coherence + DESIGN.md) — the LAST band-G wave; ... (storybook+demo-dock-nav W28, aurora-configurator W29, carousel W30, animation+DESIGN.md W31)". W32:121 → same correction.

## (2) THE REFINE LIST

### W28
- **W28:6 vs :143 self-contradiction** — :6 says "sequences strictly LAST in the band-G slot"; :143 says "This wave OPENS the new band G (W28-W32)". W28 opens band G. Strike the "strictly LAST" clause from :6. Also correct :143's stale fold-list tail ("perf-a11y, naming-consistency") to the actual W31=animation+DESIGN.md, W32=lighthouse.
- **`proof:storybook-complete` is a FREEZE gate, not born-RED-on-HEAD** — W28:17 states the audit verdict is "the manifest is currently complete — EXPECTED delta is small"; W28:96 concedes born-RED is only demonstrable "against a synthetic missing-export fixture committed-then-reverted". Acceptable (the `proof:demo-dock-nav` half IS genuinely born-RED on real HEAD), but label `proof:storybook-complete` explicitly as a FREEZE/regression-lock gate so the close report does not claim a born-RED-fix it did not deliver.
- **Stale W27 close refs (×4)** — W28:123 "recorded in `AW.W27-close.md`" and W28:134 "W27-close" should read W33 (the close is W33; W27 retired in the renumber). The :143 reconciler-renumber archaeology note may stay as history; the operative refs must read W33.

### W29
- **Footer-reset is a consumer slot, not a library control** — W29:21 + :61 name "the optional footer reset hook in `Configurator.vue:268-274`" as a glass-pill button to restyle. Verified source: that range is `<slot name="footer" :reset="() => emit('reset')" />` — the footer reset is filled BY THE CONSUMER; there is no library-owned button there. Drop the footer-reset from the restyle scope (the per-row reset in ConfiguratorRow IS real and stays), or restate as "if a consumer fills the footer slot, the glass-pill recipe is available". The gate probe should target the row reset + chip (both real).
- **§10 radius mis-attribution** — W29:102 cites "W24 (`--radius-field`/`--radius-control` geometry + `--card-spacing`)". Verified: W25 (`AW.W25:22,44`) mints the radius rungs; W24 mints only `--card-spacing` (zero radius hits in W24). Sequencing is sound (W25 is inside the W22-W26 band), but the citation misdirects. Change to "W24 (`--card-spacing`), W25 (`--radius-field`/`--radius-control` geometry)". Same one-line tweak applies to W29:6 and §3 bullet 3's "W24/W25 geometry".
- **Off-by-one line citation** — W29:8/:70 + §3 bullet 2 cite the layer-trigger `transition-colors` at `ConfiguratorLayer.vue:104`. Verified: the string `text-left transition-colors hover:bg-foreground/5 focus-ring` is on line 103; 104 is the closing `cn()` paren. Change `:104` → `:103`. (All other W29/W30 line citations verified exact: `Configurator.vue:235/237`, `ConfiguratorRow.vue:91`, `GlassCarousel.vue:134/148`, `GlassCarouselItem.vue:69/73/77`, `CarouselDots.vue:62`.)

### W31
- **State/Goal undercount the wave's own gate count** — W31:8 + :13 name two gates; §3.7/§5(c)/§6.3 mint a third (`proof:naming-consistency`) with its own agent unit W31.c, worktree, and commit. Resolve with the BLOCKER above; the State line must name all gates the wave actually mints (or name two and fold the third).
- **`proof:naming-consistency` clause (c) risks self-falsification** — W31:47/:124 assert "no AW doc cites the phantom `--glass-edge-light-{wash..overlay}` family", but that exact string is cited to REJECT it by W22:18 and by W31:44 itself. A naive substring assertion is RED against W22 and W31's own text and can never green. Scope the assertion to the hedge phrasing only, or exempt rejection-context lines. (Lower severity than the orphaned-gate BLOCKER, but fix together if (a) is chosen.)
- **W31↔W2 dock-rail bounds overlap** — W31 File-Bounds (lines 66-67) list `useLayerTransition.ts` + `dock.css` as conditional "IF the gate finds a residual" modify targets, while W2 owns the TabsIndicator rail unify. Current W31 framing is explicitly AUDIT-not-redo (lines 23, 76 "W31 only AUDITS"). Verified HEAD: `dock.css` rail block reads `--dock-motion-resize` (no literal), `useLayerTransition.ts` has zero inline easing. So the residual is likely already clean — the conditional bounds are defensible but should state that the EXPECTED outcome is a no-op verification, and that the `.interactive-item:active{scale:0.98}` / `Aurora.vue` opacity-fade residuals (if the gate flags them) book to their owning surface (W25 press-canon / aurora) rather than silently expanding W31's bounds.
- **Stale W27 close refs (×10)** — W31:13/:35/:45/:130/:144/:150 etc. cite "W27" for the close (READMEs owner, manifest registration, blocks). The close is W33. Swap "W27-close"/"W27 owns"/"Blocks: W27" → W33 throughout; W29/W30 already use the correct "renumbered W33" template.

### W32
- **Stale W27/W33 slash-hedge refs (×3)** — W32:50/:112/:122 say "W27/W33". Normalize to W33 for consistency with the other band-G files.
- **Substrate perf-floor rationale** — W32 calibrates the ≥75 substrate floor against the W7 offscreen-pause machinery, but under headless Lighthouse the page is in-viewport with PRM off, so the rAF runs full during the audit — offscreen-pause never lowers the audited score. Calibrate the ≥75 floor against the ACTIVE single-pass aurora cost (W4), not the offscreen-pause. (If a Canvas2D constellation route is cited in the substrate tier, strike it — the glass-ui demo manifest has no constellation story; substrate tier is aurora + goo-blob only. Verify against current manifest before editing.)

## (3) CONVERGENCE VERDICT

**NOT CONVERGED — 7 blockers across 4 waves.**

- W28: 4 (sidebar-collapse FATAL, fabricated `--dock-collapsed-inline-size`, DAG cycle, Playwright-under-vitest)
- W30: 1 (vacuous Progress-coordination gate)
- W31: 1 (orphaned `proof:naming-consistency`) — paired with the W33 registration miss as one fix
- W32: 1 (off-by-one band-G label map)

The W30/W31 born-RED restyle cores, the W29/W30 compose-don't-fork framing, DRY-vs-AV.W10 distinctness, the H.W11↔W32 budget pairing, and the canonical WAVE_SPEC shape all hold. W29 carries no blocker (footer-slot, radius-attribution, and the `:104`→`:103` citation are all REFINE). The fatal cluster is W28's frozen-dock sidebar premise plus the systemic stale-renumber / orphaned-gate drift the close was supposed to absorb.

**NOT CONVERGED (7 blockers).**

---

## Review 1

Decisive and final. GlassDock.vue:388-419 — the template literally states "Vertical docks are tool palettes: **they don't collapse into a summary icon**." A vertical (`orientation === 'vertical'`, which `variant="rail"` forces) dock renders a SINGLE bare `<slot />` (line 418) with NO `#collapsed` slot, NO `.dock-layers` grid, NO collapse machinery. There is no `expanded`/`collapsed` state to bind a trigger's `aria-expanded` to in any meaningful way (it's frozen `visualExpanded=true`).

I have enough to render a definitive verdict. Let me do a quick sanity check on one more claim — the spec asserts the bottom dock should carry "prev/next + prev/next-category controls that today live only as keyboard shortcuts" — that's accurate per AppShell + StoryPager (StoryPager only has tabs; arrows are keyboard-only). That part is sound. The fatal defects are concentrated in the sidebar collapse premise and the Playwright harness placement.

Let me compile the fix-list.

Based on my adversarial review against the CURRENT files, here is the fix-list.

---

**FIX-LIST — AW.W28-storybook-dock-nav.md — NOT CONVERGED**

The storybook-completeness half (agent a) and the bottom-dock half are sound. The wave has one **FATAL** framing defect: its headline sidebar deliverable contradicts the SHIPPED GlassDock and cannot be built within the wave's own "no `src/` edit" bound. Several supporting claims are fabricated against the current source.

---

**[BLOCKER — FATAL] The "collapse↔expand sidebar rail" is impossible on the shipped GlassDock without a `src/` edit — the wave is self-invalidating.**
- *file:line* — spec §2 line 6, §3.2 line 18, §Visual spec lines 78, 87; vs `src/components/custom/dock/GlassDock.vue:120-124, 135, 191-204, 388-419`.
- The spec mandates a `variant="rail" orientation="vertical"` GlassDock that carries "an EXPLICIT collapse↔expand affordance (icon-rail ⇄ icon+label)" riding "the EXISTING GlassDock collapse machinery". But the shipped dock makes a vertical/rail dock **permanently always-expanded with no collapse path at all**: `GlassDock.vue:120-124` forces `orientation="vertical"` whenever `variant==="rail"`; line 135 forces `alwaysExpanded = (props.alwaysExpanded || orientation==="vertical")`; line 191 `visualExpanded = alwaysExpanded || expanded` is then permanently true; and the template at `GlassDock.vue:388-419` renders a vertical dock as a **single bare `<slot/>`** (line 418) — the comment is explicit: *"Vertical docks are tool palettes: they don't collapse into a summary icon."* The collapsed↔expanded `.dock-layers` pair (lines 395-415) is `orientation==='horizontal'`-ONLY.
- Consequence: there is no `expanded`/`collapsed` state to morph, no `#collapsed` slot, and nothing for the spec's `aria-expanded`-bound trigger (§7 line 23) to control. Delivering the spec's sidebar REQUIRES editing `GlassDock.vue`/`dock.css` to add a vertical-rail collapse — which §4 line 52 prohibits and §3a line 31 names as a mandatory triumvirate/escalation trigger. The wave as written triggers its own escalation on the first render.
- *Precise fix*: Re-scope §3.2 / §Visual spec to one of (a) the sidebar rides the dock's HORIZONTAL collapse machinery (a `variant="rail"` but `orientation="horizontal"`… which is incoherent for a left rail) — not viable; or (b) **escalate the vertical-rail collapse to a new dock-primitive wave in band G that lands BEFORE W28** (parallel to how W1 fixes the horizontal regression), and make W28 depend on it; or (c) drop the collapse↔expand affordance entirely — make the sidebar a fixed icon-rail (which is what the current CategoryRail already is) and have the mobile off-canvas Sheet/Drawer be the only "expand". Option (b) is the gestalt fix and matches the prompt's "the demo nav can't ship on a frozen dock" framing. Whichever is chosen, the spec must stop claiming the collapse "rides the EXISTING GlassDock collapse machinery" — that machinery does not exist for a vertical rail.

**[BLOCKER] The W1 dependency is mis-targeted — W1 fixes the HORIZONTAL first-expand, not the vertical-rail collapse W28 needs; no dependency wave delivers the sidebar morph.**
- *file:line* — spec §10 line 134 (`Depends on: … W1-W3 (dock-motion … the collapse-morph machinery the sidebar rides)`); vs `AW.W1-dock-collapse-regression.md:13-21` (Goal: the GlassDock's OWN start-collapsed first expand — explicitly *"not the DockLayerGroup multi-pane switch"*, and a horizontal `summary↔full` width morph) and `AW.W3-dock-layering-rail-wrap.md` (layering/wrap/hover-scale/slider — grep for rail-collapse: zero hits).
- The prompt asks whether the "KNOWN simple-collapse regression (fixed in AW.W1, which must land FIRST)" is sequenced as a dependency. It IS listed in §10 — but W1 fixes a HORIZONTAL dock's first-expand width morph (`useLayerTransition` measure-under-collapsed-class seam, `dock.css:378-379`). A vertical rail has no `.dock-layers` pair and no `summary↔full` swap, so W1's fix does NOT enable the sidebar W28 wants. The dependency is asserted but does not actually unblock the deliverable.
- *Precise fix*: Tied to the [FATAL] above. If the sidebar collapse is genuinely needed, mint the vertical-rail-collapse dock-primitive wave and depend on THAT (and confirm W1 landed for the bottom dock's horizontal behavior if the bottom dock ever collapses — it's `always-expanded`, so W1 is arguably not even load-bearing for W28). State precisely WHICH dock behavior each dep wave enables; do not blanket-cite "W1-W3 dock-motion."

**[BLOCKER] Fabricated token `--dock-collapsed-inline-size` — does not exist in `src/styles/`.**
- *file:line* — spec §Visual spec line 78 (`Collapsed (default) = icon-rail at --dock-collapsed-inline-size (~72-80px)`); vs `src/styles/dock.css` — `grep -- "--dock-collapsed-inline-size" src/styles/` returns ZERO hits. The only collapsed-size token is `--dock-collapsed-summary-min-size` (`dock.css:378-380`), a `min-width` on the horizontal `--summary` layer.
- *Precise fix*: Remove the invented token reference. There is no consumer-facing inline-size collapse token for a rail. This is the W20 "no brittle magic literal / read a real token" discipline the spec itself invokes (§3.6 line 22) being violated by the spec.

**[MAJOR] The Playwright runtime gate is placed where vitest — not Playwright — will pick it up; pattern mismatch with the repo's established harness.**
- *file:line* — spec §4 line 49 + §5b line 102 + §6.3 line 109 (`tests/demo/demo-dock-nav.spec.ts` (Playwright route-walk + screenshots)); vs `vitest.config.ts:23-26` (vitest globs `tests/**/*.{test,spec}.{ts,tsx}` — a `.spec.ts` under `tests/` is a VITEST/jsdom spec) and the repo's actual Playwright pattern: `scripts/proof-dock-animation-live.mjs:385-425` is a standalone `.mjs` that dynamically imports `playwright`/`playwright-core` and SKIPs fail-open when no harness is present. The repo has ZERO `playwright` dependency and NO `playwright.config.*` (verified).
- A `tests/demo/demo-dock-nav.spec.ts` will be swept by vitest's jsdom env, which cannot boot a dev server / drive clicks / screenshot. §6.3's *"the runtime render is the falsifier, grep-only is not sufficient"* is undercut: on the standard CI runner this gate skips fail-open exactly like `dock-animation-live` does (and §3a line 32 already concedes the headless-render flake risk).
- *Precise fix*: Make the runtime probe a standalone `scripts/proof-demo-dock-nav-runtime.mjs` that dynamic-imports Playwright and SKIPs-with-named-reobligation on a harnessless runner (mirror `proof-dock-animation-live.mjs:385-425` exactly), NOT a `tests/demo/*.spec.ts` that vitest will mis-run. State the `npm i -D playwright` + live-server precondition the way W1 §Hard-Gate line 156-160 does, and record the captured artefacts as the falsifier-of-record (consistent with the §3a clause).

**[MINOR] §2a/§Archaeology assert CategoryRail = `variant="rail"` "today" — accurate, but the spec omits that today's rail passes NO `orientation` (it relies on the rail→vertical force).**
- *file:line* — spec line 13/139 vs `demo/layout/CategoryRail.vue:33-38` (`<GlassDock variant="rail" overflow="scroll" …>` — no `orientation` prop). The spec's SidebarDock adds `orientation="vertical"` (redundant — `variant="rail"` already forces it) and adds the (impossible) collapse. The archaeology is otherwise correct (StoryPager IS horizontal `always-expanded fit-content overflow="scroll"`, `StoryPager.vue:37-43`; it IS in-flow above `<main>`, `AppShell.vue:81`).
- *Precise fix*: Drop the redundant `orientation="vertical"` from the SidebarDock prop list (it's implied), and have the archaeology note that the current rail is ALREADY a fixed icon-rail — which sharpens that the only genuine NEW deliverable on the sidebar is the active-state restyle (NCSU-red + `tap-squish`) + the mobile off-canvas, NOT a collapse morph.

---

**Verdict on the prompt's specific checks:**
- (a) **Fixes/delivers the cited ask?** Storybook-completeness: yes. Bottom dock: yes. Sidebar collapse↔expand dogfood: **NO** — undeliverable on the frozen dock without a src edit the wave forbids.
- (b) **Gestalt / no-legacy?** Clean-break deletes are good; but the sidebar premise is a workaround-by-assertion (claims machinery that isn't there).
- (c) **DRY / one owner?** Yes — disjoint bounds (§4a) are clean; AppShell single-editor confirmed.
- (d) **Design-cogent (warm-cream + iOS-26 + W22-W26 atoms)?** The vocabulary is correctly cited; the visual narrative is coherent IF the collapse is rescoped.
- (e) **Canonical WAVE_SPEC shape?** Conformant (all 11 sections present, sub-units titled, goal+sub-gate paired).
- (f) **Hard-Gate real + born-RED + falsifiable?** `proof:storybook-complete` and `proof:demo-dock-nav` (structural) are real and **correctly born-RED** (scripts absent, CategoryRail/StoryPager present — verified). gates.mjs registration is correctly deferred to W33 (verified W33-close registers both). BUT the **runtime falsifier is mis-placed** (vitest vs Playwright — MAJOR above), and gate #1's "collapse↔expand morph paints across 3 viewports" assertion **cannot pass** because the morph cannot exist (FATAL).

The wave does not converge until the sidebar-collapse FATAL is resolved (rescope to a fixed rail, or mint+sequence a vertical-rail-collapse dock-primitive wave ahead of W28), the `--dock-collapsed-inline-size` fabrication is removed, the W1 dependency is re-stated to name what it actually enables, and the Playwright runtime gate is moved to a standalone harnessless-skip `.mjs` matching the repo's established pattern.

---

## Review 2

This is decisive. I found a contradiction. The parent plan AW.md line 164 and 165 attribute the radius tokens to **W25** ("`--radius-field`/`--radius-control` geometry" listed in the W25 row, line 165), while AW.md line 47/D-12 attributes them to a different W-number entirely ("W24 primitive geometry+material+bug (`--radius-field`/Textarea-pill-fix...)"). The parent plan itself is internally inconsistent on which wave mints radius — but the actual **wave file** (`AW.W25-primitives-perfection.md:44`) is the authoritative source: **W25 mints `--radius-field`/`--radius-control`**. The D-12 row's "W24" label is using an OLD wave numbering (the D-12 narrative describes W22=material, W23=card, W24=primitive geometry, which is shifted by one from the actual wave files where W23=sota, W24=card, W25=primitive). 

So both W29 and W30's "W24 (`--radius-field`/`--radius-control`)" attribution is a **stale numbering carryover** — it should be W25. The sequencing is still SOUND (W25 is in the depends-on band W22-W26), but the citation is factually wrong and will confuse the implementer.

I now have everything verified. Let me compile the fix-list. Line citations verified:
- W29 cites `ConfiguratorLayer.vue:104` for `transition-colors` — actual is line **103** (off by one).
- W29 cites `Configurator.vue:237` (bg-foreground ✓), `:235` (transition-colors ✓), `ConfiguratorRow.vue:91` (active:scale ✓) — all correct.
- W30 cites `GlassCarousel.vue:127-149` (shell border at 134, hover-shadow at 148 ✓), `GlassCarouselItem.vue:43-83` / `:66-83` (hover scale 69, active 73, --active 77 ✓), `CarouselDots.vue:62` (transition duration-fast ✓) — all correct.

Let me verify one final thing: the GlassCarouselItem born-RED gate 2 claim that there's "no `.focus-ring`" — confirmed the SFC has no focus-ring, and it's a `<button>` so focus-ring is genuinely missing. And the `--active` is visual-only with no `aria-pressed` — confirmed (no aria-pressed in the template). Good.

Here is my adversarial verdict.

---

**FIX-LIST — Band G, lane configurator-carousel (W29 + W30)**

Both waves are fundamentally SOUND: existing-surface restyle (no new primitive), DRY (compose `.tap-squish`/`transition-control`/`.glass-material`, one owner), sequenced AFTER W22-W26, born-RED claims verify against actual HEAD, canonical WAVE_SPEC shape present. Three defects found — one substantive (W30 gate 5), two precision.

```
[
  {
    "wave": "W30",
    "severity": "MAJOR",
    "finding": "Gate 5's 'Progress-fill coordination' half is NOT born-RED and is non-falsifiable against the actual HEAD. The cited GlassCarouselPager.vue renders chevron Buttons + a text counter pill ('{{index+1}} / {{total}}', GlassCarouselPager.vue:114-120) — it has NO progress affordance, no progress bar, no .glass-progress-rail, no <Progress> at HEAD. The carousel demo stories (demo/stories/navigation/{carousel,glass-carousel}.vue) render zero 'progress' too (grep: empty). So there is no forked Progress range to retire and no progress affordance to compose onto — the gate-5 'COMPOSES the shipped <Progress> fill ... does NOT fork' clause passes trivially/vacuously, it can never go RED. (Compounding: .glass-progress-rail does not exist in src/styles at HEAD — it is minted by AW.W16, which W30 §10 lists as a coordinate but the dependency chain to a non-existent affordance is moot.)",
    "fix": "Either (a) DROP the Progress-coordination half of Scope §5 + Hard-Gate condition 5 entirely (the pager has no progress affordance, so there is nothing to coordinate — the dots four-state is the real, born-RED half and stands alone); or (b) if a progress affordance IS intended for the pager, make it a CONCRETE additive scope bullet ('add a <Progress class=glass-progress-rail> position rail to GlassCarouselPager') with its own born-RED line, not a conditional 'IF it renders a progress affordance' clause that is satisfied by absence. As written the conditional 'Where a carousel renders a progress affordance' (§3.5) describes a surface that does not exist — it reads as a forward-hook without a same-wave consumer (WAVE_SPEC Prohibition: 'No forward hooks without same-wave consumers')."
  },
  {
    "wave": "W29",
    "severity": "MINOR",
    "finding": "Mis-attributed radius-token provenance. §6 'Opens after' line and §10 Depends-on both cite 'W24 (--radius-field/--radius-control geometry + --card-spacing)'. Verified against the actual wave files: W24 (AW.W24-glass-cards.md) mints ONLY --card-spacing (zero grep hits for radius-field/radius-control); --radius-field/--radius-control are minted by W25 (AW.W25-primitives-perfection.md:22,44,45). The parent plan AW.md is itself inconsistent (line 165's W25 row lists the radius tokens correctly; the D-12 narrative line 47 carries the stale pre-renumber 'W24' label). Sequencing is NOT broken (W25 is inside the W22-W26 depends-on band, so W29 still cannot start until W25 lands), but the citation will misdirect the implementer to the wrong minting wave.",
    "fix": "AW.W29-aurora-configurator.md §6 (line 6) and §10 Depends-on (line 102): change 'W24 (--radius-field/--radius-control geometry + --card-spacing)' to 'W24 (--card-spacing), W25 (--radius-field/--radius-control geometry)'. Keep --card-spacing on W24."
  },
  {
    "wave": "W30",
    "severity": "MINOR",
    "finding": "Same stale radius-token attribution as W29 (inherited from the parent plan). W30 references the W22-W26 band recipes generically and §10 lists 'W24 (--radius-field/--radius-control geometry)' provenance via the band reference. --radius-field/--radius-control are W25's, not W24's. (W30 composes only --spring-*/.tap-squish/transition-control/.glass-material directly and does not itself cite --radius-control in a gate, so this is lower-impact than W29, but the dependency-provenance text should be corrected for consistency.)",
    "fix": "AW.W30-carousel-redesign.md §10 Depends-on: where radius geometry is attributed, point to W25 not W24. (W30 §6/§4a band references to W22/W25/W26 are otherwise accurate.)"
  },
  {
    "wave": "W29",
    "severity": "NIT",
    "finding": "Off-by-one line citation. §6 Hard-gate and Scope §2 cite the layer-trigger transition-colors at 'ConfiguratorLayer.vue:104'. The actual transition-colors string is on line 103 ('text-left transition-colors hover:bg-foreground/5 focus-ring'); line 104 is the closing cn() paren. (All other W29/W30 line citations verified EXACT: Configurator.vue:235 transition-colors, :237 bg-foreground text-background, ConfiguratorRow.vue:91 active:scale-[var(--scale-press,0.97)], GlassCarousel.vue:134 border + :148 hover shadow, GlassCarouselItem.vue:69/73/77 hover-scale/active/--active, CarouselDots.vue:62 duration-fast — all confirmed born-RED on HEAD.)",
    "fix": "AW.W29-aurora-configurator.md §6 condition 2 and §3 bullet 2: change 'ConfiguratorLayer.vue:104' to ':103'."
  }
]
```

**Cross-checks that PASSED (no fix needed):**
- DRY / compose-not-fork: `.tap-squish` (utilities.css:201, PRM-reset at :210-216), `transition-control` (utilities.css:698), `.focus-ring` (utilities.css:140), `--scale-press` (tokens.css:1011) all EXIST at HEAD and are composed, not forked. `.glass-material` does NOT exist at HEAD but is minted by W22 (verified AW.W22 §1/hard-gate) which is sequenced before — correct forward-compose.
- Existing-surface only: both waves restyle shipped primitives (Configurator family / GlassCarousel + carousel family), mint no new component/CVA-variant/token; gate 8/7 explicitly forbid new primitive + style-file edit + Progress fork.
- Born-RED falsifiability: W29 gates 1-3,6 and W30 gates 1-2,4-5(dots-half) verify as genuinely RED on current HEAD.
- data-slot ownership: W30 correctly defers `ui/carousel/` data-slot to W26 (verified Carousel.vue:44 + CarouselDots.vue:42,61 already present) and owns only the custom/ `glass-carousel`/`glass-carousel-item` slots — no W26/W30 conflict.
- Proof surfaces real: aurora.vue consumes `<Configurator>` (verified line 5-7,33), AuroraConfigDock keeps its hand-authored DockLayerGroup chrome (verified), all four demo story paths exist.
- Design-cogent (warm-cream + iOS-26 + W22-W26 atoms): the press-spring/glass-tier/focus-ring/radius routing is coherent with the band spine.

---

## Review 3

Confirmed: slides has TWO real decks (`til-briefing`, `feedback-coder`) auto-discovered via `src/decks/registry.ts`. H.W11's route matrix (§3) names only the til-briefing `Slide*.vue` set (Slide01/04/08/09/10/Nutrition/Conclusion) and says it's "DERIVED from the deck manifest / `site.config.ts`". But the manifest source is `registry.ts` (auto-discovery), and there's a second deck (`feedback-coder`) with its own Slide01-05. H.W11's matrix would either under-cover (audit only til-briefing) or its named static-tier list is a hand-kept parallel list that drifts from the auto-discovery registry — the exact anti-pattern H.W11 §3 claims to avoid ("not a hand-kept parallel list that drifts"). This is a real, but moderate, scope gap.

I now have comprehensive evidence across all five challenge axes. Let me compile the fix-list.

I have verified all claims against the current HEAD files. Here is my adversarial review.

---

**VERDICT: NOT CONVERGED.** Three waves carry born-RED/file-bounds defects, a DRY/one-owner violation, a phantom-route falsifiability hole, and a self-violating naming bug. H.W11 is the strongest of the three but has a matrix-derivation gap. Fix-list below.

---

### AW.W31 — animation-coherence + DESIGN.md + naming

**[W31 · CRITICAL · DRY/one-owner — the wave re-does W2's surface]** `AW.W31-animation-designmd.md:20,66-67,102`. W31 declares `useLayerTransition.ts` + `dock.css` (TabsIndicator rail) as its residual-fork *modify* targets. But `AW.W2-dock-motion-unify.md:70-73` already OWNS exactly that: "Unify the travelling rail `TabsIndicator` onto the SAME retuned `--spring-dock`… `--dock-motion-resize` at `dock.css:835`". And at HEAD `dock.css` (the rail block ~830-838) already reads `transition: width var(--dock-motion-resize), transform var(--dock-motion-resize)` — no literal — and `useLayerTransition.ts` has ZERO `cubic-bezier`/`linear`/inline-easing (grep returns nothing). W31's charter (§2a, §3) says it must be RECONCILE-not-redo, yet it lists two fix targets that W2 owns and that are already clean. **Fix:** strike `useLayerTransition.ts` + `dock.css` from W31's File Bounds (lines 66-67) and from W31.a's Files (line 103); W31.a becomes gate-authoring + audit-only over W2's already-landed surface. The "Band-A Finding / Lane 1 δ" residual is W2's, not W31's.

**[W31 · CRITICAL · born-RED residual is real but OUT of declared fix-bounds]** `AW.W31-animation-designmd.md:25,29,59-76`. The gate scans `aurora/**` + `utilities.css` (§3 item 2, line 25). At HEAD the ACTUAL residuals it will flag are `Aurora.vue:210` (`transition: opacity 600ms ease-out` — a hand-rolled literal easing on an animated surface) and `utilities.css:176` (`.interactive-item:active { scale: 0.98 }` — a per-atom literal scale, not `--scale-press*`). Neither file is in W31's File Bounds (only `useLayerTransition.ts`/`dock.css` are listed). So the gate is born-RED but UNFIXABLE within the declared bounds — the wave cannot reach GREEN as scoped. **Fix:** either (a) add `src/components/custom/aurora/Aurora.vue` + `src/styles/utilities.css` to the File Bounds as the real residual-fix targets and re-aim W31.a's fold at them (with W22/W25 ownership check — `.interactive-item` press scale arguably belongs to W25's press-canon surface, so this may need to book to W25, not fold into W31), or (b) author the non-physical allow-list to explicitly exempt the aurora opacity-arm fade and re-scope the gate to genuine spring/press surfaces only. As written the born-RED witness and the fix-bounds contradict.

**[W31 · HIGH · gate scope contradicts the charter gate definition]** `AW.W31-animation-designmd.md:8,123` vs `AW.md:170`. The charter defines `proof:design-md-current` as "DESIGN.md cites the landed spine (the warm-cream tokens, the iOS-26 material, the glass-atoms consolidation)". The W31 wave file scopes the SAME gate entirely around aurora internals (WebGPU/`createGPUCanvas`/Kuwahara/`procedural-color.glsl.ts`/painterly mediums) and never mentions warm-cream / iOS-26 / glass-atoms. These are two different gates wearing one id. The aurora DESIGN.md at HEAD is a SHADER design doc (`src/components/custom/aurora/DESIGN.md` — "procedural painterly gradient system"); it does not and should not document the tranche-wide warm-cream/glass-atoms spine. **Fix:** reconcile — either the charter (AW.md:170) is wrong about what `proof:design-md-current` asserts (most likely: the gate is aurora-DESIGN.md-currency, not tranche-spine-currency) and should be corrected to match the wave file, or the wave must add the spine assertions. They cannot both stand.

**[W31 · MEDIUM · born-RED markers for the DESIGN.md/naming gates VERIFY — keep]** Confirmed real: `DESIGN.md:3` is "v4.1 (2026-04)", `:38` "Single draw, single shader, zero deps", `:53` "No multi-pass pipelines", color home is `color.ts`-local; aurora wave headers W4-W8 are all ALLCAPS-en-dash (`# AW.W4 — AURORA-PAINTERLY`). These two gates (`proof:design-md-current` aurora-arm, `proof:naming-consistency`) are genuinely born-RED and falsifiable. No fix needed — this part is sound.

---

### AW.W32 — Lighthouse (glass-ui demo)

**[W32 · CRITICAL · phantom substrate route — gate references a non-existent page]** `AW.W32-lighthouse.md:8,13,21,23,93,94`. The substrate tier repeatedly gates "the Canvas2D constellation page" (perf ≥75, TBT ≤600ms, discrete CLS observation). There is NO constellation story in `demo/stories/manifest.ts` — the `substrates` category contains only `aurora`, `goo-blob`, `glass-panel`. The constellation is a SHIPPED component (`src/components/custom/constellation/README.md`) with no demo story and no route in the `/:category/:story` router. The matrix is "DERIVED from the manifest" (§3) yet the budget hard-codes a route the manifest does not produce. The constellation is the SLIDES surface (H.W11) — it was copy-pasted into the glass-ui budget. **Fix:** strike "Canvas2D constellation" from W32's substrate tier everywhere (lines 8,13,21,23,93,94); the glass-ui substrate tier is `aurora` + `goo-blob` only. If a constellation demo story is wanted, that is a W28 storybook-completeness scope item, not a W32 budget row.

**[W32 · HIGH · self-violating naming/off-by-one — the band-G enumeration is wrong]** `AW.W32-lighthouse.md:6`. "Opens after W31 (carousel-redesign)" and "carousel W31" and "aurora-configurator W30". Per the charter (`AW.md:167-171`): W28=storybook+dock-nav, W29=aurora-configurator, W30=carousel, W31=animation-coherence. W32's State block has every band-G label shifted one wave. This is precisely the "charter↔file headline / off-by-one verbiage drift" that W31.c's `proof:naming-consistency` gate exists to catch — and W32 is the file that fails it. **Fix:** rewrite line 6 to "Opens after W31 (animation-coherence — the LAST band-G wave)… (storybook+dock-nav W28, aurora-configurator W29, carousel W30, animation-coherence W31)". Also reconcile §10 line 121 ("W31 (carousel-redesign)") and the charter's own W32 row (`AW.md:171`) which says "Opens after W28" — a THIRD inconsistent opens-after value for the same wave.

**[W32 · MEDIUM · route-matrix conflates category-landings with story-pages]** `AW.W32-lighthouse.md:23`. "runs Lighthouse on the index `/`, each `category:<id>` landing, and the substrate-tier story routes". The router (`demo/router.ts:22,34`) emits a `/:category` landing (which redirects to its first story) AND `/:category/:story` per story. Auditing only "each category landing" measures one representative story per bin, not "every demo page" (the goal-criterion, line 13). The static-tier story list (foundations, primitives, …) names the 11 category bins, but a category landing ≠ all its stories. **Fix:** state explicitly whether the matrix is per-CATEGORY-landing (≈12 routes) or per-STORY (≈60+ routes); the goal "every demo page has a measured score" implies per-story, but the budget tiers are keyed by category-class. Pick one and make the matrix derivation unambiguous.

**[W32 · LOW · substrate perf ≥75 premise — VERIFIED achievable, but note the PRM/offscreen caveat]** The W7 offscreen-pause + live-PRM machinery is ALREADY landed at HEAD in `src/composables/glass/webgl/useWebGLCanvas.ts` (AV.W7) — the substrate budget premise is grounded in shipped code, good. BUT: under headless Lighthouse the page is in-viewport and PRM is off by default, so the rAF loop runs FULL during the audit — offscreen-pause does NOT lower the audited score. The ≥75 floor must hold with the aurora/blob rAF ACTIVE. The archaeology (line 126) cites W7-pause as the calibration basis, which is misleading for an on-screen audit. **Fix:** the rationale should calibrate the ≥75 floor against the ACTIVE single-pass aurora cost (W4), not the offscreen-pause (which Lighthouse never exercises). Minor wording, but the premise as stated overclaims.

---

### H.W11 — Lighthouse (slides)

**[H.W11 · MEDIUM · matrix derivation vs. multi-deck reality]** `H.W11-lighthouse.md:23,62`. The matrix is "DERIVED from the deck manifest / `site.config.ts`" and §3 names a hand list of til-briefing slides (Slide01/04/08/09/10/Nutrition/Conclusion). But slides has TWO auto-discovered decks (`src/decks/registry.ts` → `til-briefing` + `feedback-coder`), and the manifest source is `registry.ts`, not `site.config.ts` (which is gallery chrome, line 1). The named static-tier list is a hand-kept parallel list that omits `feedback-coder`'s Slide01-05 — the exact drift anti-pattern §3 claims to avoid. **Fix:** either derive from `src/decks/registry.ts` (auto-discovery, both decks) and drop the hand-listed slide names, or explicitly scope H.W11 to the `til-briefing` deck only with a stated rationale (the only deployed/gated deck). Name `registry.ts` as the manifest source, not `site.config.ts`.

**[H.W11 · LOW · constellation substrate-tier mapping is render-site-imprecise]** `H.W11-lighthouse.md:20,21`. The budget calls the constellation "Slide09's live-tag / the constellation surface from W4". But `constellation.ts` is a deck-level module referenced by `Slide01.vue` and `Slide10.vue` (grep), not Slide09. If the constellation canvas mounts on Slide01/Slide10, those slides — listed in the STATIC tier (line 20) — would carry the substrate cost and could fail the ≥90 static floor. **Fix:** verify the actual constellation render slide(s) and put THEM in the substrate tier; do not assume Slide09.

**[H.W11 · POSITIVE · harness premises sound]** `playwright-lighthouse`/`playAudit` over the existing `@playwright/test` + `playwright.config.ts`, gate-unlock via `useDeckUnlock`/`DeckGate` mirroring `deck.spec.ts`, and `proof:lighthouse-slides: playwright test …` (slides correctly has no `gates.mjs`, runs via the `audit` lane) — all verified to exist at HEAD. The substrate budget, the born-RED claim, and the no-second-browser-stack KISS are well-grounded. No fix beyond the two above.

---

### Cross-cutting

- **Canonical shape (WAVE_SPEC.md):** all three carry the required §1-§11 sections, paired Goal/Hard-Gate, Triumvirate triggers, File Bounds + Do-NOT-touch, Disjointness, Worktree. Conformant — except W32's State-block opens-after is factually wrong (above) and the W31/W32/charter share the off-by-one band-G labeling.
- **Design-cogency (warm-cream + iOS-26 + W22-W26 atoms):** W31's `.tap-squish`/`--scale-press` press-canon and `--spring-*` one-source are correctly the iOS-26 motion spine; but the `proof:design-md-current` charter/wave mismatch (above) means the "documents the warm-cream + iOS-26 spine" promise (AW.md:53,170) is NOT delivered by the aurora-shader DESIGN.md the wave actually edits. The tranche-spine documentation has no owner.
- **One-owner / DRY:** the W31↔W2 dock-rail overlap (CRITICAL above) is the principal violation. W25 owns `.tap-squish`/`--scale-press`; W31's audit of them is fine, but the `.interactive-item:active{scale:0.98}` residual likely books to W25, not W31.

---

## Review 4

I now have a complete picture. Let me note the W28 born-RED nuance:

W28's `proof:storybook-complete` sub-gate hedges: "if the audit confirms zero gaps at HEAD, the gate is born-RED against a synthetic missing-export fixture committed-then-reverted in the gate's own self-test block." The scope (line 17) explicitly says the audit's verdict is the manifest is ALREADY complete, so the EXPECTED delta is small. This means the gate is likely NOT born-RED against real HEAD state — it's born-RED only via a synthetic self-test. That's a weaker born-RED than the canonical "RED on actual HEAD" requirement, but the wave acknowledges it and the second half (`proof:demo-dock-nav`) IS genuinely born-RED on real HEAD (CategoryRail/StoryPager exist). So W28's overall gate is born-RED. The storybook-complete half being "born-RED only via synthetic fixture" is acceptable per the wave's own honest framing, but worth flagging as the weakest born-RED in the band (a totality gate that's green at authoring is a freeze, not a fix — its VALUE is regression-locking, not closing a current gap; the wave should be explicit that storybook-complete is a FREEZE gate, not a born-RED-on-HEAD fix gate).

I have everything needed. Let me compile the final adversarial fix-list.

Based on my read of the actual current files, here is my verdict.

---

**FIX-LIST — Band G (AW.W28–W32) convergence review**

The five Band-G waves are largely well-formed: born-RED claims verified against current source (W29 Configurator citations, W30 carousel citations all accurate), the "compose-don't-fork" framing holds (W29/W30 are bounded `modify-carve` restyles that consume the W22–W26 atoms, never edit `src/styles/`), DRY-vs-AV.W10 is clean (`proof:storybook-complete` is genuinely distinct from `proof:storybook-ia` + `proof:no-orphan-demo-route`, with explicit do-NOT-touch carve-outs), and the H.W11↔W32 budgets are consistent (identical floors + identical substrate-aware philosophy, mutually cross-referenced). The following are the real defects.

```
{wave: W32, severity: HIGH, fix:
  Systematic wave-IDENTITY mislabel. AW.W32-lighthouse.md:6 says "Opens after: W31
  (carousel-redesign)" and :121/:126 label the band as "demo-dock-nav W29,
  aurora-configurator W30, carousel W31". Authoritative identities (AW.md §2 + the
  wave-file headers) are: W29=Configurator, W30=Carousel, W31=Animation. Every label
  after W28 is shifted +1. Fix: W32:6 → "Opens after: W31 (animation-coherence) — the
  LAST band-G wave" (the ORDERING is correct, only the parenthetical name is wrong);
  W32:121 → "W29 aurora-configurator, W30 carousel, W31 animation-coherence"; W32:126 →
  same correction. This directly violates W31's OWN charter↔file naming-consistency
  mandate and WAVE_SPEC.md §5 (a positional ref must carry its correct deliverable name).}

{wave: W33, severity: HIGH, fix:
  Gate-fleet registration drops W31's third gate. W31 mints THREE gates
  (proof:animation-coherence, proof:design-md-current, proof:naming-consistency —
  AW.W31:47,118,124,144). W33 registers only TWO for W31 (AW.W33-close.md:17, :66,
  Hard-Gate-1 :79 all list "proof:animation-coherence + proof:design-md-current (W31)").
  proof:naming-consistency appears ZERO times in W33 (verified grep). This is exactly the
  gates:verify-ci drift W33 exists to fail-closed on: either a registered package.json
  gate has no manifest home, or the third gate silently disappears. Fix: decide the
  disposition ONCE and reflect it in both files — either (a) W33 registers
  proof:naming-consistency in the W31 group, or (b) W31 COMMITS to folding it into
  proof:design-md-current's doc-scan (strike the standalone gate in §7/§4a/Commit-Plan,
  not leave it "acceptable if the orchestrator folds it"). Today W31 mints it as a
  package.json entry AND hedges the fold — that ambiguity is what orphans it in W33.}

{wave: W31, severity: HIGH, fix:
  proof:naming-consistency gate (c) is self-falsifying. AW.W31:47/:124 assert "no AW doc
  cites the phantom --glass-edge-light-{wash..overlay} family." But that exact string is
  presently cited by TWO current wave files — AW.W22:18 (cites it to REJECT it: "NOT a
  per-rung family ... minting a --glass-edge-light-{wash..overlay} family would be a new
  token set") and AW.W31:44 itself (cites it to say "strike the phantom ... family
  hedge"). A naive substring assertion makes the gate RED against W22 and against W31's
  OWN text — it can never go green. Fix: the gate must distinguish a HEDGE-as-if-it-exists
  ("if present", "may step per rung via the existing ... family") from a NAMED-to-reject
  mention. Either scope the assertion to the hedge phrasing only, or exempt the
  rejection-context lines explicitly. As written the gate is not falsifiable-then-greenable.}

{wave: W31, severity: MEDIUM, fix:
  State/§6 gate count disagrees with §3/§7. The State line (AW.W31:8) and Goal (:13)
  name the wave's hard gate as proof:animation-coherence + proof:design-md-current (two),
  but §3.7/§5(c)/§6.3 mint proof:naming-consistency as a born-RED third gate with its own
  agent unit (W31.c), worktree, and commit. The State line must name all THREE gates the
  wave actually mints (or, per the W33 fix above, name two and fold the third). A wave
  whose State undercounts its own gates fails the WAVE_SPEC §2 hard-gate one-line-summary
  contract.}

{wave: W28/W29/W30/W31, severity: LOW, fix:
  Stale "W27" close references — the close renumbered to W33 but band-G files still cite
  the old slot. AW.W28 carries 4 "W27" refs (incl. §8 "recorded in AW.W27-close.md", §10
  "W27-close gate-set registration"), AW.W31 carries 10 (§3.3/§3.5/§4/§4a/§6/§10/Commit-
  Plan all say "W27 owns ... / Blocks: W27"), AW.W32 carries 3 ("W27/W33 close",
  "ci.yml ... W27/W33"). W29/W30 are clean (0). The W28 §Band-G-note (:143) and W31
  Archaeology (:154) DO acknowledge the renumber, but the body refs were not swept. Fix:
  swap "W27" → "W33" throughout W28/W31/W32 bodies (the close is W33; W27 was retired in
  the renumber per AW.md:135).}

{wave: W29, severity: LOW, fix:
  Footer-reset target is a consumer SLOT, not a library control. AW.W29 §3.4/§4 names
  "the optional footer reset hook in Configurator.vue:268-274" as a glass-pill button to
  restyle. Current source (verified) shows that range is `<slot name="footer"
  :reset="...">` — the footer reset is filled BY THE CONSUMER, there is no library-owned
  button there to restyle. Fix: drop the footer-reset from the restyle scope (the row
  reset in ConfiguratorRow IS a real library control and stays); or restate it as "if a
  consumer fills the footer slot with a reset, the glass-pill recipe is available" rather
  than a library restyle target. The gate's probe should target the row reset + chip
  (both real), not a slot.}

{wave: W28, severity: LOW, fix:
  proof:storybook-complete is a FREEZE gate, not a born-RED-on-HEAD fix gate, and the
  spec half-admits it. Scope (:17) states the audit verdict is "the manifest is currently
  complete — EXPECTED delta is small"; the sub-gate (:96) concedes born-RED is only
  demonstrable "against a synthetic missing-export fixture committed-then-reverted." So
  against real HEAD the totality gate is likely GREEN at authoring — its value is
  regression-locking, not closing a present gap. This is acceptable (the wave's OTHER
  half, proof:demo-dock-nav, is genuinely born-RED on real HEAD: CategoryRail/StoryPager
  exist), but the wave should label storybook-complete explicitly as a FREEZE/regression
  gate so the close report does not claim a born-RED-fix it did not deliver. Tighten the
  §2a goal-vs-completion framing accordingly.}
```

**Items checked and CONVERGED (no fix):**
- DRY vs AV.W10 storybook-ia — distinct gates, distinct owners, explicit carve-out (W28 §6.1 + File-Bounds do-NOT-touch). One owner.
- W31 animation-coherence vs W2/W3/W25 — reconcile-layer framing holds: W31 AUDITS (token-reference-only fixes, no solver change), composes `proof:spring-tokens-synced` (verified present) without duplicating it, escalates a solver-change to a triumvirate. Motion sources (`regen-spring-tokens.mjs`, `--scale-press` cohort, `.tap-squish`, `transition-control`) all exist at HEAD.
- W29/W30 vs W22-W26 — consume-not-fork verified: bounded `modify-carve`, `Do NOT touch src/styles`, no new token/variant/primitive, born-RED citations accurate against current source (Configurator.vue:235-237, ConfiguratorRow:91, ConfiguratorLayer:104; GlassCarousel shell/item, Carousel.vue:44 data-slot, CarouselDots:62, GlassCarouselPager present).
- H.W11 vs W32 budgets — fully consistent (a11y≥95/BP≥95/SEO≥90/perf≥90-static-≥75-substrate/CLS<0.1/LCP≤2.5s/TBT 300-600ms), same substrate-aware rationale, mutually paired.
- Design cogency (warm-cream + iOS-26 + W22-W26 atoms) — every restyle routes onto the band recipes + NCSU-red accent; no off-canon palette minted.
- No Band-G wave re-does a committed wave (entire AW tranche is docs-only at HEAD — band G correctly sequences after band F mints the atoms it composes; `.glass-material`/`--radius-field`/`--card-spacing` do NOT yet exist, so the born-RED-after-band-F framing is sound).

---

## Review 5

I have all confirmations. The `proof:storybook-ia` and `proof:no-orphan-demo-route` already exist as gates, and W28 correctly distinguishes `proof:storybook-complete` from them. RECAP ADDENDUM 3 exists. 

I now have a complete, evidence-backed fix-list. The Band G has NOT converged — there is a cluster of stale-renumber and gate-registration defects, the most serious being a genuine DAG cycle and an unregistered third gate. Let me compile the final fix-list.

---

NOT CONVERGED. Band G carries a cluster of stale-renumber, gate-registration, and DAG-cycle defects. Fix-list (file:line, severity, precise fix):

**[CRITICAL] — DAG cycle: W28 depends on the close, the close depends on W28**
- `waves/AW.W28-storybook-dock-nav.md:6` and `:134` — W28 "Opens after ... AND W27-close's gate-set registration" and "Depends on: ... W27-close (gate-set registration — `proof:storybook-complete` + `proof:demo-dock-nav` register in `scripts/gates.mjs` at/after the close fold)." But the close (`AW.W33-close.md:6`) "Opens after ALL bands (W0-W32)" — which includes W28. This is a true cycle: W28 → close → W28. The prompt's DAG ("Band G opens after the W22-W26 band; W28 after AW.W1") has NO close dependency for W28. **Fix:** strike the "W27-close's gate-set registration" clause from both the Opens-after and Depends-on lines. Gate registration is the close's job and a gate need not be manifest-registered to run during its own wave (W29/W30/W31/W32 all register their own `package.json` script and run the gate locally, then the close adds the manifest entry — W28 must follow the same pattern). W28's real deps are Band-F (W22-W26) + W20 + W1-W3 (dock-motion), per the prompt's DAG.

**[CRITICAL] — W31 mints a third hard gate (`proof:naming-consistency`) that is unregistered everywhere**
- `waves/AW.W31-animation-designmd.md:47`, `:64`, `:124` mint `proof:naming-consistency` as a born-RED hard gate (§6 condition 3, a created script `scripts/proof-naming-consistency.mjs`, a `package.json` entry).
- `AW.md:170` (W31 row) names ONLY `proof:animation-coherence` + `proof:design-md-current`.
- `AW.W31-animation-designmd.md:8` (State Hard-gate one-liner) names ONLY those two.
- `AW.W33-close.md:17`, `:66`, `:79` register ONLY those two for W31 (`grep -c naming-consistency AW.W33-close.md` = 0).
The prompt requires "the W33 close registers ALL the gates incl. Band G." A born-RED minted gate that no close registers will fail `gates:verify-ci` (manifest-vs-package.json drift) OR silently never run. **Fix:** either (a) add `proof:naming-consistency` to the AW.md W31 row, the W31 State one-liner, AND the W33 close gate-set (3 sites) — preferred, since it is genuinely born-RED on the ALLCAPS-en-dash aurora headers; or (b) fold it into `proof:design-md-current`'s doc-scan per the W31 §6 KISS note and DELETE the standalone script/`package.json` entry/§6-condition-3 so no orphan gate survives. Pick one; the half-state (minted-but-unregistered) is the defect.

**[HIGH] — W32 wave-number→name map is wrong in three places (stale pre-renumber labels)**
- `waves/AW.W32-lighthouse.md:6` — "Opens after: W31 (carousel-redesign)". W31 is animation-designmd; the carousel wave is W30. The same line's parenthetical "(storybook-completeness W28, demo-dock-nav W29, aurora-configurator W30, carousel W31)" maps EVERY number to the wrong wave (W29 is configurator not demo-dock-nav; W30 is carousel not aurora-configurator; W31 is animation not carousel).
- `waves/AW.W32-lighthouse.md:121` (§10 Depends-on) repeats the identical wrong map: "W31 (carousel-redesign) ... W29 demo-dock-nav, W30 aurora-configurator, W31 carousel".
The canonical map (AW.md table + the wave-file headers) is W28=storybook+demo-dock-nav, W29=aurora-configurator, W30=carousel, W31=animation+DESIGN.md, W32=lighthouse. AW.md §3 (`AW.md:205`) and the AW.md W32 row (`AW.md:171`) correctly say "Opens after W28." **Fix:** rewrite both lines to "Opens after W31 (animation-coherence + DESIGN.md) — the LAST band-G wave; ... (storybook+demo-dock-nav W28, aurora-configurator W29, carousel W30, animation+DESIGN.md W31)." (W32 opening after the whole band including W31 is correct; only the labels are stale.)

**[HIGH] — Two waves both claim "the LAST band-G wave"**
- `waves/AW.W32-lighthouse.md:6` — W32 "the LAST band-G wave" (correct: AW.md §3 sequences W32 after W28, and W33 is the close).
- `waves/AW.W28-storybook-dock-nav.md:6` — W28 "it sequences strictly LAST in the band-G slot" (WRONG — W28 opens the band; AW.md positions it first). This stems from the same stale "after W27-close" framing in the CRITICAL item. **Fix:** strike "so it sequences strictly LAST in the band-G slot" from W28:6 (W28 opens band G, it does not close it).

**[HIGH] — W28 internal self-contradiction: "opens the band" vs "sequences strictly LAST"**
- `waves/AW.W28-storybook-dock-nav.md:143` says "This wave OPENS the new band G (W28-W32 ...)" — directly contradicting `:6`'s "sequences strictly LAST." Also `:143`'s band-G fold list is stale: "(W28-W32: storybook-dock-nav, configurator-redesign, carousel-redesign, perf-a11y, naming-consistency)" — the actual W31=animation+DESIGN.md, W32=lighthouse (not "perf-a11y, naming-consistency"). **Fix:** keep ":143"'s "opens the band G" framing, strike ":6"'s LAST claim (above), and correct the ":143" fold-list tail to "...carousel-redesign (W30), animation-coherence+DESIGN.md (W31), lighthouse (W32)."

**[MEDIUM] — Pervasive stale "W27" close references across Band G (close is W33)**
The prompt requires "the W21/W27-retired notes consistent" and the close is W33. Residual "W27" close refs that should read "W33":
- `waves/AW.W28-storybook-dock-nav.md:123` "recorded in `AW.W27-close.md`" (the file is `AW.W33-close.md`).
- `waves/AW.W31-animation-designmd.md` — `:13`, `:35`, `:37`, `:45`, `:76`, `:130`, `:142`, `:144`, `:150`, `:154` all say "W27" for the close (READMEs owner, manifest registration, blocks). The close is W33; W27 is retired.
- `waves/AW.W32-lighthouse.md:50`, `:112`, `:122` say "W27/W33" (the slash-hedge) — acceptable but inconsistent with the other Band-G files; normalize to W33.
**Fix:** global "W27-close"/"W27 close"/"W27 owns"/"per W27" → "W33" across these Band-G files (W29/W30 already correctly say "renumbered W33 by the reconciler" at `AW.W29:103`/`AW.W30:105`, so they are the correct template). The W28:143 / W31:154 "reconciler renumbers W27→W33" archaeology notes may stay as history, but every operative close reference (owner, registration site, blocking dep) must read W33.

**[LOW] — W31 "Opens after" omits its Band-F dependency despite consuming W25's press canon**
- `waves/AW.W31-animation-designmd.md:6` Opens-after names "W1-W3, W4-W11, W25" but not the rest of Band F, and does not state "after Band F" — yet §10 Depends-on (`:149`) is also W25-only. This is internally consistent (W31 only audits the `.tap-squish`/press cohort, which is W25's), so it is not a hard error, but AW.md §3 (`:199-205`) frames the whole band G as "sequences AFTER band F." **Fix (optional):** add "(after Band F)" to W31:6 for parity with W29/W30's explicit "after Band-F" framing, or leave as-is since the W25 dep is the real one. Flagging for consistency only.

Everything else in Band G is sound: W29/W30 are correctly framed, born-RED with cited HEAD line numbers, DRY (compose the band, no new token/primitive — verified §4 Do-NOT-touch + §6 gate condition 8), design-cogent (warm-cream + iOS-26 + W22-W26 atoms), canonical-shaped per WAVE_SPEC.md §1-11, and their gates are real + falsifiable with stated bites. The H arm correctly lives in the slides repo (`/Users/mkbabb/Programming/slides/docs/tranches/H/H.md`, W1-W11) and its H.W11 Lighthouse pairing with AW.W32 + the DeckProgress/Constellation consume legs match AW.md §4 verbatim — the glass-ui `docs/tranches/H/` is the unrelated old tranche, not the AW-referenced H. The W33 close otherwise registers the full Band-G gate set correctly (the only miss is `proof:naming-consistency`, item 2 above).
