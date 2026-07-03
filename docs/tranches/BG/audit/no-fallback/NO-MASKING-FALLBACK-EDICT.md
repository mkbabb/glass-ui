# NO-MASKING-FALLBACK-EDICT — the standing no-fallback law (BG · adjudicated 2026-07-03)

**Provenance.** USER edict 2026-07-03: *"no fallbacks of that sort"* — the referent is the
drawer's CSS `--glass-drawer-t: 1` resting value that MASKED a dead `writeScalar`
(open-at-Half seated FULL-viewport, a grip drag moved nothing, zero errors —
`docs/tranches/BG/audit/ios27-motion-truth/IOS27-MOTION-TRUTH.md §2.7`). Sharpened by the
user: operate within the bounds of CSS + modern web design; the primary mechanism works
IN PAINT or fails LOUD; no legacy-engine ladders on the target engines (current Chrome +
current Safari). Applied especially to GLASS + DOCK; a GENERAL edict.

This document adjudicates the 50-finding sweep (deduped to **41 sites**: 29 EXCISE ·
4 CROSS-ENGINE-GAP · 8 KEEP-JUSTIFIED), every borderline verdict re-verified on disk at
HEAD (`tranche/BG`). Owner rows cite `docs/tranches/BG/execution/EXECUTION-PROGRESS.md`
(the cursor) + `docs/tranches/BG/execution/bg-build-map.md`. The six IOS27-MOTION-TRUTH
repair rows (F1.R1 · F3.R1 · F3.R2 · F3.R3 · F5.R1 · F5.R2) are already seated PENDING;
this edict adds THREE new rows (**NF.1 · NF.2 · NF.3**, §6) and rider clauses on the
existing rows.

---

## §1 THE EDICT (canon-ready)

> **THE NO-MASKING-FALLBACK LAW (USER, 2026-07-03).** glass-ui operates within the
> bounds of CSS + modern web design. The primary mechanism WORKS IN PAINT or FAILS
> LOUD. Four verdicts, one law:
>
> 1. **MASKING is FORBIDDEN.** Any resting value, `var()` fallback, `??`/literal
>    default, silent null-skip, or catch-all settle timer whose effect is that a dead
>    JS writer / severed ref binding / never-armed orchestrator still paints a
>    *plausible* surface is the forbidden class. The floor rubric: a JS-written
>    scalar's CSS rest is the **DORMANT/CLOSED state** of the mechanism, never a
>    mid/engaged value (the drawer `1` = fully-open was the crime; `--stage-t: 0` /
>    `--siri-island-t: 0` / `--dock-morph-t: 0` are the honest siblings); a
>    **registered `@property`'s `var()` fallback is dead weight** — it can never fire
>    on a target engine (a registered property is never guaranteed-invalid,
>    `dock/morph.css:26-29` house doctrine) — collapse to bare `var()`; a **fallback
>    literal never duplicates a same-cascade token** (the stale-literal drift class —
>    proven recurrent: the 1.08→1.14 dock cap); a **channel with no reachable writer
>    does not ship**; a **null ref at gesture/swap time on a mounted component fails
>    loud** (dev assert), never a silent skip. Where a legitimate dormant rest is
>    indistinguishable from a dead writer, the writer owes a **fired witness** (a
>    born-RED gate/π that reds when the writer never wrote — the F5.R2 shape).
> 2. **LEGACY-LADDER collapses onto modern CSS.** No `@supports not (…)` arm, JS
>    feature-detect branch, prefixed-only restatement, or API shim that serves ONLY
>    pre-target engines (target = current Chrome + current Safari/WebKit) may be
>    carried. Documentation belongs in comments, not live rules. A keep demands a
>    NAMED committed device set recorded at the site — absent that record it is a
>    hedge and it dies. (A11y STATE escapes — `forced-colors`, `prefers-contrast`,
>    `prefers-reduced-transparency/motion` — are NOT engine ladders; they stay.)
> 3. **CROSS-ENGINE-GAP-TODAY is a chosen graceful BASE, not a bolt-on.** Where a
>    target engine genuinely lacks the capability TODAY (WebKit
>    `backdrop-filter: url()`, Safari anchor positioning, `corner-shape`), the
>    un-gated base IS the design on that engine — recorded at the site with its
>    owning wave — never a JS polyfill, never a silently-broken enhanced path. The
>    enhancement rides `@supports`; the base must read as *finished* on the gap
>    engine.
> 4. **REAL-DUAL-MECHANISM survives only with a one-line load-bearing justification.**
>    Both paths must serve a committed device set or a designed second mode (the
>    WebGL2 tail under WebGPU, the no-JS `:active` press floor, the non-popper
>    `center` bloom origin), the active path must be OBSERVABLE, and where the dual
>    could hide a dead primary the primary owes a fired witness. A thin dual — one
>    whose second path exists "just in case" — is downgraded to EXCISE.
>
> Machine-locked by `proof:no-masking-fallback` (§5, born-RED on the HEAD masking
> sites). The reference POSITIVE pattern is `dock/morph.css:26-63`: the registered
> scalar's rest stated STATICALLY per state class, the live read gated on
> `[data-morphing]`, the fallback refused BY NAME in the comment.

---

## §2 THE EXCISE LEDGER — 29 rows (18 MASKING · 11 LEGACY-LADDER)

Every row re-verified on disk. "Fix" names the idiomatic modern-CSS mechanism; "Owner"
is the cursor row that lands it (NF.\* rows are minted in §6).

### §2a MASKING (M1–M18)

| # | Site | Defect (verified) | Fix | Owner |
|---|------|-------------------|-----|-------|
| M1 | `src/styles/drawer.css:23-27` | `@property --glass-drawer-t { initial-value: 1 }` — the EDICT REFERENT. Rest = fully-OPEN while the sole writer is JS (`useDrawerSnap.writeScalar`); a dead writer seats every snap sheet full-viewport, silently. The honest siblings rest at 0 (`--stage-t` drawer.css:48-52, `--siri-island-t` dock/siri.css). | `initial-value: 0` (the CSS CLOSED state IS the rest — per the seated F5.R2 clause: "the resting state is the CSS CLOSED state (the design)"); the open-seat write + spring settle own every non-zero frame; a `[data-glass-drawer-snap-points]` sheet whose scalar was never written by first interaction is a hard gate RED. | **F5.R2 BG.W-DRAWER-PAINT-BIND** (clause seated) |
| M2 | `src/components/ui/drawer/DrawerContent.vue:111-116` | `var(--glass-drawer-t, 1)` inline-transform fallback — dead on a loaded cascade (registered property never guaranteed-invalid), and where the registration is absent (a broken `/styles` install that should fail loud) it seats the sheet fully open anyway. Unreachable-or-masking. | Bare `var(--glass-drawer-t)` (the registration ships in the same package; a missing cascade fails VISIBLE). | **F5.R2** |
| M3 | `src/components/ui/drawer/composables/useDrawerSnap.ts:97-101` (+ `:184`, `:247-253`) | `writeScalar`'s `if (el)` silently drops the SHEET leg while unconditionally writing `:root --stage-t` (scrim deepens, sheet frozen); `dragSpan()` returns `1`px on null el; `readScalar()` NaN-falls to the MODEL fraction — the release decision completes with zero paint truth. | A null `contentEl` during an active open/drag/snap on a mounted `<DrawerContent>` is a broken `$el`-unwrap binding → dev-assert/`console.error` + gate RED; no silent leg-skip, no synthetic 1px span, no model echo standing in for paint. | **F5.R2** |
| M4 | `src/styles/drawer.css:66` | `var(--spring-snappy-duration, 0.4s) var(--spring-snappy, ease)` — drift-hedge duplicates of GENERATED spring tokens (real settle clock 0.34s); a dead token silently runs a wrong clock on a non-spring curve. | Bare `var()` — the generated tokens ship in the same cascade. | **F5.R2** (rider) |
| M5 | `src/styles/drawer.css:228` (×2) | `var(--glass-blur-overlay-radius, 20px)` — the token's base value is 13px; 20px is only the `@2dppx` restore arm. A broken cascade silently paints the HEAVIER blur on standard density (stale-literal drift class). | Bare `var()`. | **F5.R2** (rider) |
| M6 | `src/styles/glass/material.css:460` | `.glass-clear` MANDATORY legibility scrim: `calc(var(--glass-backdrop-luma, 0.5) * 40%)`. The `0.5` fallback is DEAD (registered `@property`, `initial-value: 0`, property-regs.css:329-333) and the actual unwired resolve is `calc(0 * 40%) = 0%` — the scrim the canon calls FORBIDDEN-to-omit paints NOTHING; `proof:glass-foundation` A3 greens on the rule's TEXT. | A STATIC scrim floor the sampled luma can only LIFT (`calc(<floor>% + var(--glass-backdrop-luma) * <ramp>%)`) + delete the dead `0.5`; a resolved-strength π bite (the computed scrim layer ≥ floor on an unwired clear plate). | **NF.3 BG.W-GLASS-SIGNAL-TRUTH** |
| M7 | `src/styles/glass/ladder.css:337-345` (+ `:272-280` overlay band) | The "continuous earned darken" clamp reads `var(--glass-backdrop-luma, 0)` and its own comment RETIRES the `@container` bucket as the strength driver — but the SOLE luma writer is dock-scoped (`GlassDock.vue:86` `autoLuminance`; 13.3 W-GLASS-BACKDROP-SAMPLE is DROPPED-WITH-TRIGGER). Every content-tier Card + overlay Dialog/Popover reads the initial 0 forever → permanent calm floor; a bright-backdrop modal silently misses the AA darken. The π injects the luma synthetically (proves the READ, never a writer). Contradictory canon on disk: `glass-fx.css:202-208` (bucket-is-default, observer demo-private) vs `ladder.css:334` (clamp retires the bucket). | DESIGN DECISION, resolved by NF.3: either (a) wire a band-level luma contract (an inheriting ancestor write the shell/AppShell owns — the `getImageData` proxy is the shipped path per the 13.3 drop), or (b) re-canonize the declarative bucket as the BAND driver and scope the continuous clamp to the dock (where the writer lives). Either way the two canon texts reconcile to ONE, and the chosen driver gets a fired witness. | **NF.3** |
| M8 | `src/styles/dock/adaptive-legibility.css:56-64` | The dock clamp reads `var(--glass-backdrop-luma, 0)`: a dead/silently-failed observer is indistinguishable from a calm backdrop — the G2 "unreadable over very light materials" defect silently reverts. The writer IS wired (dock default-on) but owes a fired witness; the covering π is local-only. | The observer stamps a WITNESS on write (e.g. `data-backdrop-sampled` / a paired `--glass-backdrop-sampled: 1`); the gate REDs a wired-but-never-written channel on the enrolled dock route (writer-fired arm, §5 Arm F). | **NF.3** |
| M9 | `src/styles/glass/material.css:229` (comment `:210-216`) | `var(--glass-backdrop-hue, transparent) var(--glass-backdrop-hue-strength, 0%)` — a WRITER-LESS channel under neutral no-op defaults. The comment claims the observer writes `--glass-backdrop-hue`; FALSE on disk — the observer writes `--glass-ambient-hue` (useGlassBackdropLuminance.ts:344; tokens/glass.css:411), a different name. `proof:glass` GD3 asserts the seam TEXT with neutral defaults — greens on prose forever. | ONE hue channel: bridge `--glass-ambient-hue` into the catch-light seam (rename the seam read or the observer write — one name, one writer), fix the false comment, and give GD3 a non-neutral resolved-value arm; OR delete the seam until its writer lands. | **NF.3** |
| M10 | `src/styles/glass/material.css:233` | `conic-gradient(from var(--specular-angle, 0deg) …)` — the motion-reactive EDGE glint's angle channel has ZERO reachable writers: `useSpecularPointer` (the only writer) has zero src/demo consumers (grep: its own file + the `/glass` barrel; `glass-specular-track.css:52` pins `0deg` statically). The glint still wakes via the intensity lift, so a static top-edge arc LOOKS alive while the motion-reactivity is dead; the π asserts `typeof angle === "string"` (a tautology). | WS8.4 already plans the `useSpecularPointer.ts` DELETE (the 28-file retire fan-out): the angle axis retires with its leaf (the conic keys off a static or Tier-1-GL-driven angle), OR — if the glint's motion is kept — the angle sink wires into the ONE `vSpecular`/`createSpecularWriter` tier delivery (single-writer discipline) and the π asserts two pointer positions → two DISTINCT angles. | **WS8.4 BG.W-GLASS-SOTA-LADDER** (build-map) |
| M11 | `src/styles/dock/morph.css:47-63` | The static per-class `--dock-expand-t` endpoints + `[data-morphing]`-gated live tracking are the CORRECT anti-masking design (the rest stated per class; the fallback refused by name at `:26-29`) — but the consequence is a dead spring/armer degrades every collapse/expand to a discrete class snap that looks settled-correct; the covering frame-series π is LOCAL-only. | KEEP the static rest (the reference pattern); bind the IN-FLIGHT paint with the born-RED writer-fired witness — the F3.R1 CDP screencast series (≥ intermediate frames, per-frame glyph-bbox) is exactly that witness; 17.4 re-sweeps. | **F3.R1 BG.W-DOCK-GLYPH-RIGID** (+ 17.4) |
| M12 | `src/styles/dock/layers.css:95-111` | `var(--dock-expanded-px, 0px)` / `var(--dock-collapsed-px, …)` endpoint defaults + the surviving `clamp(0.06, …)` scale floor: a dead endpoint writer resolves `--dock-live: 0px` → the 0.06 sliver — bounded-but-wrong instead of REDing. | An unwritten endpoint pair during `[data-morphing]` fails loud (dev assert at the measure site + gate); the 0.06 floor survives only as the divide-by-zero guard it claims to be, with the comment reconciled. F3.R1's clause already re-authors this exact `--dock-size-scale` composition. | **F3.R1** |
| M13 | `src/styles/dock/shape.css:154-168` (+ `morph-bridge.css:130,161`, `dock-controls/icon-button.css:56-59`) | The `var(--stretch, 1)` identity-rest fleet under a JS-only squish writer — the liquid weight silently absent is the exact dead-decorative-motion class the liquid-weight-universal edict targets; the weight signature is read only by a local π. | The weight signature becomes a NON-LOCAL witness: F5.2's frame-series rows bind mid-flight stretch ≥ its pass bar (travel-stretch ≥1.30 tabs; squish engaged on dock press/morph) born-RED; F3.R1 re-authors the shape.css scale composition (rigid content over the morphing plate). The `, 1` identity rest itself is honest (dormant = identity) and stays. | **F5.2 BG.W-LIQUID-WEIGHT-DEFAULT** (witness) + **F3.R1** (shape re-author) |
| M14 | `src/styles/dock/layers.css:187-231` | Layer-crossfade: base `.is-leaving { opacity: 0 }` with the `calc(1 - var(--dock-morph-t))` fade authored ONLY under `[data-morphing]` — a dead orchestrator yields an instant discrete pane swap that silently "works"; the visibility hold rides `var(--duration-normal)` (`:190`), a second clock under the morph (the real clock is `--spring-dock-duration` 0.28s… now the `useDockSpring` settle). | F3.R2 re-authors the swap as the OVERLAPPED crossfade on the ONE scalar (both panes co-present, no blank-plate window) with a born-RED screencast π — the writer-fired witness; the hold clock re-keys to the spring's own settle (one clock). | **F3.R2 BG.W-DOCK-PANE-OVERLAP** |
| M15 | `src/components/custom/dock/composables/useLayerTransition.ts:280-284` + `dockMorphContext.ts:214-217` | Both engines, on a null container/root ref, swap `currentLayer`/`leavingLayer` and return — no morph, no error. A broken template-ref binding (the reka silent-no-op class) turns every layer transition into a permanent discrete snap no gate reds. | A null ref at swap time on a MOUNTED component fails loud (dev assert/`console.error` + the F3.R2 gate counts painted swap frames — 0 frames REDs). The SSR/unmounted early-return stays (that is a legitimate no-DOM case), distinguished by mount state. | **F3.R2** |
| M16 | `src/styles/dock/morph-bridge.css:41` | `opacity: var(--dock-bridge-opacity, 1)` — a default-VISIBLE goo bridge whose endpoint gate lives only in the JS writer (`useDockOrientationMorph.bridgeStyle`); a dead/unbound in-place writer leaves the teardrop painting at full opacity over the resting dock. One var, two contracts (AZ showcase default-1 vs BG in-place JS-gated). | The dormant-rest doctrine: default **0** (dormant), the showcase arms `1` explicitly on its own scope; the in-place writer drives the mid-morph window. Rides F3.R3's teardrop-legible-mid-morph born-RED screencast (which also REDs a bridge visible at rest). | **F3.R3 BG.W-SHELL-MORPH-PAINT-REPAIR** |
| M17 | `src/styles/dock/morph.css:90` fleet (`:127,137,164,174,219,248`; `shape.css:72`; `shell.css:440`; `layers.css:102`) + `layers.css:133-135` | The pervasive `var(--dock-expand-t, 1)` fallback — default-EXPANDED chrome on a MISSING state class (the `??`-default shape on a state channel; a broken class binding paints the expanded look silently). Plus the DEAD contradictory arm `var(--dock-morph-t, 1)` at `layers.css:133-135` — unreachable (registered, initial 0) AND contradicting the initial. | Collapse to bare `var(--dock-expand-t)` where a declaring ancestor is guaranteed (the state classes mint it) — a missing class then fails VISIBLE (guaranteed-invalid → unset chrome) instead of plausibly-expanded; delete the dead `, 1` on the registered scalar outright. | **NF.1 BG.W-FALLBACK-EXCISE** |
| M18 | `useDockOrientationMorph.ts:125-134` (JS `1.14` ×2) · `dockMorphMeasure.ts:77-83` (JS `44`) · `var(--glass-backdrop-luma-knee, 0.6)` (ladder.css/adaptive-legibility.css vs glass-fx.css:249) · `dock/stack-rail.css:211-216` (`var(--spring-dock-duration, var(--duration-normal))` / `var(--spring-dock, var(--ease-out))`) | The stale-fallback-literal / drift-hedge class: JS and CSS fallback literals duplicating same-cascade tokens (`--dock-morph-max-stretch` density.css:69, `--dock-morph-min` density.css:81, `--glass-backdrop-luma-knee` glass-fx.css:249, the generated spring pair). The 1.14 site's own comment records the PRIOR drift (1.08 stale, hand-re-pinned at BD) — the recurrence is proven. | Single-source: JS literals import from `constants.ts` (one declaration the token generator/reader shares) or fail loud on an unreadable token at a mounted root; CSS var-fallback literals collapse to bare `var()` (same-cascade tokens). Gate Arm C (§5) fences the class permanently. | **NF.1** |

### §2b LEGACY-LADDER (L1–L11)

| # | Site | Defect (verified) | Fix | Owner |
|---|------|-------------------|-----|-------|
| L1 | `src/styles/glass/a11y-fallback.css:187` | GUARD-1 `@supports not ((backdrop-filter…) or (-webkit-backdrop-filter…))` opaque-plate arm — engines supporting NEITHER form are years pre-target; paints for no target engine. | Delete (clean break). A keep demands a NAMED committed device set recorded at the site (none exists). The forced-colors/reduced-transparency/contrast blocks in the same file are a11y STATE escapes — KEEP, out of scope. | **NF.2 BG.W-LEGACY-LADDER-COLLAPSE** |
| L2 | `src/styles/glass/a11y-fallback.css:217` | GUARD-2 `@supports ((-webkit-…) and (not (backdrop-filter…)))` — self-described Safari ≤17 arm that "exists to DOCUMENT-and-confirm" (a no-op re-statement carried as live documentation). Nine majors below target. | Delete; the documentation moves to a comment. The REAL mechanism is the build-emitted `-webkit-` prefix pass (O-2a); `proof:webkit-backdrop` re-points at the dist prefix pair, not the live arm. | **NF.2** |
| L3 | `src/styles/glass/a11y-fallback.css:246` (comment `:239-244`) | `@supports not selector(:has(*))` `.is-focus-within` arm — `:has()` is Chrome 105+/Safari 15.4+, far pre-target. DOUBLY dead: the comment claims a ≤6-LOC focusin/focusout toggler in `Card.vue`; repo-wide grep finds NO toggler anywhere (the only `is-focus-within` hits are this file) — an orphaned arm behind a comment that lies about disk truth. | Delete the arm + the phantom-toggler comment; `.glass-card:has(:focus-visible)` (surfaces.css) is the sole mechanism. | **NF.2** |
| L4 | `src/styles/glass/liquid-enter.css:209` + `src/styles/scroll-choreography.css:77-83` | `@supports not (animation-timing-function: linear(0, 1))` cubic-bezier/`--ease-out` floors — the comments name "Safari < 17.2" verbatim; both targets parse `linear()` spring curves. Serves no target engine. | Delete both arms; `linear()` is the sole timing source (the spring tokens are Baseline on the target set). | **NF.2** |
| L5 | `src/styles/tokens/light-dark.css:85` + `dark-arm.css` COLOR witness table | `light-dark()` is Chrome 123+/Safari 17.5+ — both targets take the light-dark() path; the duplicated `.dark {}` COLOR re-declarations are recorded "fallback-floor LOCKSTEP WITNESSES only" + a full byte-lockstep gate clause (`proof:glass` DA1, 60 witnesses). A carried pre-target ladder — BUT the keep was recorded INTENTIONALLY at F2.2 (DONE `d437cf52`, same tranche) and DA1 makes drift fail-LOUD (it cannot mask). | **ESCALATED DESIGN DECISION** — adjudicator's ruling: collapse (delete the `.dark` COLOR witnesses + DA1's lockstep clause; light-dark() sole color source) is mechanical and zero-risk on targets, but it OVERTURNS a same-tranche recorded keep, so the orchestrator decides. SCOPE FENCE either way: `.dark { color-scheme: dark }`, the SHADOW/INSET plain `.dark` arms (the inset-shadow trap), and `accent-color` are NOT the ladder — they stay. | **F2.2 BG.W-GLASS-BASIS-CONSOLIDATE** (re-ratify-or-collapse clause) |
| L6 | `src/composables/glass/useGlassRenderer.ts:21` + `GlassPanel.vue:62-123` | The three-tier JS detection ladder (`svg-filter \| css \| fallback`): (a) the `fallback` arm duplicates GUARD-1 for pre-target engines; (b) the `svg-filter` arm — default-on via the `!!(window as any).chrome` UA sniff — is a SECOND hand-rolled lens engine (canvas-baked displacement, per-element SVG mount, `toDataURL` re-bake on EVERY resize) duplicating the shipped refraction register — dual-path shelf-ware on the DDR-LENS-BAKE-forbidden path; (c) its inline styles bypass `--glass-level`/the tint seam/dark mode with hardcoded light-mode literals. | WS8.4's planned delete: `useGlassRenderer.ts` DEFINITION-ABSENT, GlassPanel collapses onto the CSS tier ladder (+ the Tier-1 WebGL2 refraction where wanted), the `/glass-panel` subpath survives via the bounded re-point-vs-retire executor call the build map owes BEFORE build (28-file fan-out roster, §A-§F). | **WS8.4 BG.W-GLASS-SOTA-LADDER** (build-map) |
| L7 | `src/styles/glass/control-surfaces.css:118,129` + `useUserInvalidAria.ts` fallback arm | `.user-invalid-fallback` — `:user-invalid` is Chrome 119+/Safari 16.5+, both targets ship it; the JS toggler is correctly gated `!CSS.supports('selector(:user-invalid)')` so it never runs on targets — a correctly-fenced arm that still serves NO target engine. | Collapse: drop the class member from the `:where()` selectors + the `fallbackClasses` auto-arm (the explicit-boolean test escape may stay or die with it). The `[aria-invalid="true"]` member is the PROGRAMMATIC-invalid axis, NOT legacy — KEEP. The aria-BRIDGE half of the composable (`:user-invalid` → `aria-invalid`) is a11y, NOT a ladder — KEEP. | **NF.2** |
| L8 | `src/composables/motion/useRAFLoop.ts:238-259` | The `LegacyMediaQueryList` `addListener`/`removeListener` shim under the `addEventListener`-preferred branch — MQL `addEventListener('change')` is Safari 14+; the shim serves no target engine. | Delete the type + the `else if` arm; `addEventListener` is the sole path. | **NF.2** |
| L9 | `src/components/custom/dock/composables/useDockMorphWindow.ts:31-51` + `GlassDock.vue:372-373` `@transitionend/@transitioncancel` bindings | The CSS-transition-era `isTransitioning` ladder: the file's own comment admits "the root carries no width/padding transition whose transitionend would resolve isTransitioning" — the dead `transitionend` primary + the load-bearing settle timer (`max(2×--duration-normal, 600ms)+50`, the WRONG clock) is an INVERTED ladder carried past the AX.W01 spring migration. Live misfire hazard: the vertical dock's decorative `transform` transition ∈ `RESIZE_MORPH_PROPS` can clear the flag mid-morph. | Resolve `isTransitioning` from the spring's OWN settle — 4.1 W-DOCK-ENGINE-UNIFY (DONE) minted `useDockSpring`; the flag becomes a read of the orchestrator's `live`/onSettle. Delete the timer heuristic + the `transitionend` arm + the SFC bindings. | **NF.1** |
| L10 | `dockMorphContext.ts:269-286` + `useLayerTransition.ts:366-377` + `DockLayerGroup.vue:234-235` | Three self-described vestigial `transitionend` arms ("the vestigial defensive settle" / "kept for call-site parity" / "defensive no-op … binding parity") retained after the CSS-transition morph was deleted; the spring is the sole clock at HEAD. | Delete the bindings + handlers (clean break, no parity shims — the no-legacy law). | **NF.1** |
| L11 | `src/styles/dock/shell.css:273-291` + `src/styles/dock/overflow.css:84-101` | `@supports (animation-timeline: scroll())` co-gated scroll-fade mask+driver — the co-gating SHAPE is correct (never a permanently-opaque mask), but on the target floor the ungated no-mask arm serves pre-target engines only. The Safari-26 `scroll()` floor is now RATIFIED BY EVIDENCE: 4.7 W-DOCK-CAP-SCROLL-FADE closed with a dual-engine paint PASS incl. Safari/WebKit 26.4 driving the `gl-fade-start-in/-out` ScrollTimelines live. | Collapse the `@supports` gate (scroll-driven animations are the un-gated mechanism on the target set); if a real 26.x gap ever surfaces, re-verdict CROSS-ENGINE-GAP with the plain-scroll base as the recorded design. | **NF.2** |

---

## §3 THE CROSS-ENGINE-GAP REGISTER — 4 real target-engine gaps (KEEP, base-is-the-design)

| # | Gap | Sites | The chosen graceful BASE (recorded design) | Owner |
|---|-----|-------|--------------------------------------------|-------|
| G1 | **WebKit cannot `backdrop-filter: url(#…)`** (bug 245510 OPEN; Firefox not shipping) — the SVG edge-refraction lens is Chromium-only TODAY. | `src/styles/glass-refract.css:106` | The un-gated `--glass-blur-*` + tint base IS the Safari design ("the no-workaround degrade floor, PRESERVED" — the file header); NO JS polyfill. The forward answer is the **Tier-1 WebGL2 refraction floor** (13.2, PRIMARY, cross-engine — full→drapery-dropped→flat-blur ladder), with the SVG-url lens retiring under WS8.4's SOTA ladder rather than being carried as a Chromium-only fork. | **13.2 BG.W-GLASS-REFRACT-WEBGL** (PAINT-PENDING) + **WS8.4 W-GLASS-SOTA-LADDER** (the retire) |
| G2 | **`corner-shape: superellipse()` is Chrome 139+ only** ("no FF/Safari 2026" recorded in-file). | `src/styles/glass/squircle.css:41` · `src/styles/dock/shell.css:455-459` | The un-gated `border-radius` round is the recorded cross-engine CONTRACT; the squircle is "the better tier, NOT a degraded fallback" (AX.W56 canon). Tokenized on `--corner-shape-*`. | **F2.4 corner-alias** (USER-directive row) / standing W42-W56 canon |
| G3 | **`contrast-color()` is the literal target frontier** (Chrome 147+/Safari 26+; slightly-older current engines lack it). | `src/styles/glass/ladder.css:361` · `src/styles/dock/adaptive-legibility.css:92-104` | The declarative bucket/self-engage darken is the ratified AA FLOOR on ALL engines (Open-Q #5); `contrast-color()` refines the INK where supported. The `@supports` gate is STRUCTURAL beyond engine age: an un-gated `--foreground: contrast-color(…)` custom-prop assignment would NOT parse-drop on a non-supporting engine (custom props accept any token stream) — every `var(--foreground)` would go guaranteed-invalid. The gate stays even post-frontier. | standing AX.W55/BA.W-DARK-MATERIAL canon (no wave) |
| G4 | **Safari has not shipped CSS anchor positioning** — `position-anchor` is Chrome 125+ only. | `src/styles/segmented-tabs.css:373` (+ `useTabIndicator.ts:47-57`) | The dual-path SINGLE-WRITER: the native `position-anchor` rules are the primary; the JS slider + ResizeObserver attach ONLY on the `@supports not (position-anchor: --x)` branch — a load-bearing MECHANISM for a target engine TODAY, not a ladder (no both-writers overlap). Collapse onto CSS anchor is BOOKED for the day Safari ships (a clean-break candidate then). | standing (collapse booked on Safari anchor-positioning ship) |

---

## §4 THE KEEP-JUSTIFIED LEDGER — 8 REAL-DUAL-MECHANISM survivors

Each keep is one line of load-bearing justification; a thin dual would have been downgraded.

| # | Site | Justification (why BOTH paths are load-bearing) |
|---|------|--------------------------------------------------|
| K1 | `useGpuSubstrate.ts` (WebGPU-first `armAsync` → dispose → WebGL2 rebuild) | The WebGL2 leg serves a COMMITTED device tail (~5-10%: Linux Firefox, pre-A12 iPhones, headless/blocklist `requestAdapter()`-null) — not an engine hedge; the active `backend` is observable and `proof:gpu-substrate-single` bounds WGSL↔GLSL parity (ΔE mean≤2.0/p99≤5.0), so a broken WGSL leg cannot hide behind the fallback. |
| K2 | `material.css:149` `var(--mouse-x, 50%)` centred rest | CSS structurally cannot know pointer position: 50% is the designed pre-first-pointermove/PRM pin; rest intensity is 0 (an unwired surface paints nothing); the writer-fired witness EXISTS sharp (`tests-visual/liquid-hover.spec.ts` asserts two pointer positions → two DISTINCT `--mouse-x` off dead-centre). Dormant=50% is recorded in the §5 manifest. |
| K3 | `material.css:169` `--glass-btn-press-t` spring drive over the CSS `:active` floor | The `:active` floor is the DOCUMENTED no-JS press floor (W-PRESS-UNIFY) for every surface that never composes `useSpringPress` + pre-hydration frames; the registered `initial-value: 0` keeps the unwired read byte-identical (no false lift); the press-unify/button-glass frame-series π prove the spring fires. |
| K4 | `useGlassBackdropLuminance.ts:360` `sampleAnimated(el) ?? sampleStatic(el)` | Two genuine samplers for two backdrop CLASSES (a live `<canvas>` needs the downsampled `getImageData` read; a static page needs the `elementsFromPoint` paint-layer walk) — no web API reads pixels behind a `backdrop-filter`, so the chain is the sanctioned proxy. CAVEAT stands: a tainted/zero-size canvas silently degrades to the static walk — NF.3's writer-witness (M8) makes that degrade observable; add the one-line bite if the observer is ever promoted public. |
| K5 | `accent-tone.css:64` `--accent-ink: var(--accent-ink-resolved, var(--foreground))` | The JS half is live-wired (SelectableChip → `useAccentTone.ts:139` writes the resolved ink) + gate-locked (`proof:accent-tone` lifts the real value.js `safeAccentColor`); the warm-ink fallback is the sanctioned CSS floor (CSS cannot call value.js at the token tier). The sweep's collapse-onto-`contrast-color()` flag is REJECTED as a drop-in: `safeAccentColor` derives a TONE-family OKLCh ink (lifts L away from the band), which `contrast-color()`'s black/white pick cannot reproduce — a design change, not an equivalence; a post-frontier re-evaluation is booked, not owed. |
| K6 | `reveal.css:61` `transform-origin: var(--reka-popper-transform-origin, center)` | Two legitimate anchoring MODES, not a degrade: `center` is the design for non-popper surfaces (a centered Dialog has no anchor edge); the reka write is the anchored case; a dead popper write still blooms VISIBLY (from center) and the anchored case is π-covered. |
| K7 | `renderMode.ts:129` software-raster guard forcing the CSS ground | The guard chooses `css` because a full-viewport software-rastered GL layer genuinely WEDGES the target-class device (proven live under SwiftShader); the escape (`forceWebGLUnderSoftwareRaster`) is named + default-off; the `auroraFallbackGround` is luminance-FAITHFUL to the shader composite (mean ΔL ≤ 0.05) so a headless capture certifies the right floor — a committed device tail + an honest ground, not a mask. |
| K8 | `useLayerTransition.ts:37-49` standalone engine beside the `dockMorphContext` orchestrator | A standalone `<DockLayerGroup>` outside a dock has no dock root to defer to (+ the public `/dock` re-export an external consumer binds); byte-drift is gate-guarded (`proof:dock-orchestrator-single` FLIP drift-guard) and the fold is BOOKED (AY.W-GOD1) in the engine's own header — justified until the fold lands. (Its null-ref silent swap is EXCISED separately — M15.) |

---

## §5 THE GATE SPEC — `proof:no-masking-fallback`

`scripts/proof-no-masking-fallback.mjs`, tags `["local","ci"]` (device-free arms A–E; the
writer-fired Arm F rides the owning waves' π). Born-RED on the HEAD masking sites, GREEN
as the §2 owners land. Owned/minted by **NF.1**. The core input is a small declared
**DORMANT-STATE MANIFEST** (`scripts/no-masking-manifest.mjs`): every JS-written CSS
scalar/channel → its designed dormant value + its writer symbol(s) + (optional) a
recorded keep-rationale — the manifest is what keeps the detector sharp WITHOUT
false-positiving the §4 survivors.

- **Arm A — MASKING-REST.** For every registered `@property` (parse the `@property`
  corpus) whose writers are JS-only (the manifest's writer roster, cross-checked by a
  `setProperty("--x"` grep), assert `initial-value` == the manifest dormant value.
  Born-RED: `--glass-drawer-t` (initial 1, dormant 0). GREEN by manifest: `--stage-t` 0,
  `--siri-island-t` 0, `--dock-morph-t` 0, `--glass-btn-press-t` 0,
  `--glass-backdrop-luma` 0 (dormant-calm is its recorded design pending M7's decision).
- **Arm B — DEAD-REGISTERED-FALLBACK.** Any `var(--x, F)` in src/styles + SFC styles +
  inline `:style` strings where `--x` is registered and `F` ≠ `initial-value` is
  unreachable-or-contradictory → RED (collapse to bare `var()`; `F` == initial is
  tolerated-but-flagged). For UNREGISTERED state channels in the manifest (e.g.
  `--dock-expand-t`), a fallback ≠ the dormant state → RED. Born-RED:
  `DrawerContent.vue` `var(--glass-drawer-t, 1)`, `layers.css:133` `var(--dock-morph-t, 1)`,
  the `var(--dock-expand-t, 1)` fleet.
- **Arm C — STALE-LITERAL.** A `var(--token, <literal>)` (CSS) or
  `getPropertyValue("--token") … ?? <literal>` (JS) fallback whose literal ≠ the token's
  declared value in the SAME shipped cascade → RED; tokens not declared in src/styles
  (consumer-owned, reka-written) are exempt via the manifest. Born-RED:
  `drawer.css:228` (20px vs 13px), `drawer.css:66` (0.4s/ease vs generated 0.34s/spring).
  Preventive fence over the 1.14/44/knee-0.6 sites once single-sourced.
- **Arm D — WRITER-LESS CHANNEL.** Every manifest channel must have ≥1 REACHABLE writer:
  the writer symbol exists AND has ≥1 src/demo consumer (an exported-but-consumed-by-nobody
  composable counts as writer-less). Born-RED: `--glass-backdrop-hue` (0 writers — the
  observer writes `--glass-ambient-hue`), `--specular-angle` (writer exported, 0 consumers).
- **Arm E — LEGACY-LADDER CENSUS.** Every `@supports not (…)` arm + prefixed-only
  restatement in src/styles, and every JS `CSS.supports`/API-presence fallback branch,
  must appear in the census register (`docs/tranches/BG/audit/no-fallback/`
  ladder rows or the manifest) with a verdict: `collapse-owed` → RED until deleted;
  `gap-today` → GREEN with the named base (G1–G4); `a11y-state` → GREEN. An UNREGISTERED
  arm → RED. Born-RED: GUARD-1/GUARD-2/`:has` arm/the two `linear()` floors/
  `.user-invalid-fallback`/the MQL shim (all `collapse-owed` until NF.2 lands).
- **Arm F — WRITER-FIRED WITNESS (the local π half, owned by the waves).** For the
  channels where dormant ≡ dead (the luma clamp, the morph scalar, the drawer scalar,
  the stretch fleet), the owning waves' born-RED frame-series/witness arms are the
  binding proof the writer FIRED (F5.R2 live-gesture series; F3.R1/R2/R3 screencasts;
  F5.2 weight signature; NF.3 `data-backdrop-sampled`). The device-free gate asserts the
  witness MECHANISMS exist + are enrolled (spec on disk, non-excluded), the CI-honest half.
- **Self-test bites** (`--self-test`): a synthetic registered scalar with a masked
  initial (fixture `initial-value: 1`, dormant 0) MUST flag; a synthetic
  `var(--registered, 1)` MUST flag; a synthetic stale literal MUST flag; a synthetic
  writer-less channel MUST flag; a synthetic unregistered `@supports not` arm MUST flag;
  AND the keep-survivor fixtures (`var(--mouse-x, 50%)` with manifest dormant=50%,
  `var(--glass-btn-press-t, 0)` == initial, `var(--reka-popper-transform-origin, center)`
  manifest-exempt) MUST NOT flag — the false-positive fence demonstrated every run.

---

## §6 WAVE-BINDING CLAUSES — paste-ready blocks (the orchestrator applies)

### NEW ROW — NF.1 · BG.W-FALLBACK-EXCISE (band: F8 beside 17.4, or F3-adjacent; gate `proof:no-masking-fallback`; P; precond: none — mechanical)

> BG.W-FALLBACK-EXCISE — the NO-MASKING-FALLBACK clause (`docs/tranches/BG/audit/no-fallback/NO-MASKING-FALLBACK-EDICT.md` §2 M17/M18/L9/L10 + §5): MINT `proof:no-masking-fallback` (arms A–E + the dormant-state manifest + the 6 self-test bites, born-RED on the HEAD sites) and land the mechanical purge: (a) the `var(--dock-expand-t, 1)` fleet collapses to bare `var()` (morph.css:90,127,137,164,174,219,248 · shape.css:72 · shell.css:440 · layers.css:102) + the dead `var(--dock-morph-t, 1)` at layers.css:133-135 deletes; (b) the stale-literal duplicates single-source: `useDockOrientationMorph` 1.14 + `dockMorphMeasure` 44 import the token-mirroring constant (fail loud on an unreadable token at a mounted root), the `--glass-backdrop-luma-knee, 0.6` + `stack-rail.css:211-216` spring fallbacks go bare-var; (c) `useDockMorphWindow`'s inverted ladder dies — `isTransitioning` resolves from `useDockSpring`'s OWN settle (4.1 DONE minted it), the settle timer + the `transitionend` arm + GlassDock's `@transitionend/@transitioncancel` bindings delete; (d) the three vestigial transitionend arms delete (dockMorphContext:269-286 · useLayerTransition:366-377 · DockLayerGroup:234-235 — self-described "vestigial"/"parity", the no-legacy law). Zero paint delta by construction (every collapse is a dead/identical read); `proof:dock`/`proof:dock-engine` E4/`proof:dock-morph-insitu` stay GREEN. MIGRATION: none.

### NEW ROW — NF.2 · BG.W-LEGACY-LADDER-COLLAPSE (band: F2-adjacent; gate `proof:no-masking-fallback` Arm E; P; precond: none)

> BG.W-LEGACY-LADDER-COLLAPSE — the NO-MASKING-FALLBACK clause (EDICT §2b L1-L4/L7/L8/L11): every pre-target engine ladder collapses onto modern CSS (target = current Chrome + current Safari), clean break: (a) a11y-fallback.css GUARD-1 (:187) + GUARD-2 (:217) delete — `proof:webkit-backdrop` re-points at the build-emitted `-webkit-` dist pair (O-2a, the real mechanism); (b) the `@supports not selector(:has(*))` arm + its PHANTOM-toggler comment (:239-251) delete — no `.is-focus-within` toggler exists on disk, `:has()` is the sole mechanism; (c) the two `linear()` bezier floors delete (liquid-enter.css:209 + scroll-choreography.css:77-83 — "Safari < 17.2" arms on a Safari-26 target); (d) `.user-invalid-fallback` collapses (control-surfaces.css:118,129 class member + the `useUserInvalidAria` auto-fallback arm; the `[aria-invalid="true"]` member + the aria-BRIDGE half KEEP — a11y, not a ladder); (e) the `useRAFLoop` MQL `addListener` shim deletes (:238-259); (f) the dock scroll-fade `@supports (animation-timeline: scroll())` co-gates collapse (shell.css:273-291 + overflow.css:84-101) — the Safari-26 `scroll()` floor is RATIFIED by 4.7's dual-engine paint PASS (WebKit 26.4 drove the ScrollTimelines live). The a11y STATE escapes (forced-colors/prefers-contrast/reduced-transparency/motion) are FENCED-KEEP. Arm E flips `collapse-owed` → deleted; zero target-engine paint delta by construction. MIGRATION: none.

### NEW ROW — NF.3 · BG.W-GLASS-SIGNAL-TRUTH (band: F2, after 3.5/3.10; gate `proof:glass` signal-truth arm + `proof:no-masking-fallback` Arm D/F; P; precond: 3.5 (DONE), 13.3-drop acknowledged)

> BG.W-GLASS-SIGNAL-TRUTH — the NO-MASKING-FALLBACK clause (EDICT §2a M6-M9): the glass adaptive SIGNAL channels become writer-true or die: (a) the `.glass-clear` MANDATORY scrim gains a STATIC floor the sampled luma can only LIFT (`calc(<floor>% + luma·ramp)` — an unwired clear plate paints the floor scrim, never `calc(0·40%) = 0%`), the dead `, 0.5` deletes, + a resolved-strength π bite (material.css:460); (b) THE BAND-DRIVER DECISION (design decision, USER-visible): the content-tier + overlay-band luma clamp (ladder.css:337/:272) currently reads a channel ONLY the dock writes (13.3 W-GLASS-BACKDROP-SAMPLE is DROPPED-WITH-TRIGGER) — either wire a band-level inheriting luma write (the shipped `getImageData` proxy at the shell scope) OR re-canonize the declarative `@container` bucket as the BAND driver and scope the continuous clamp to the dock; the contradictory canon pair (glass-fx.css:202-208 bucket-default vs ladder.css:334 clamp-retires-bucket) reconciles to ONE recorded text; (c) ONE backdrop-hue channel: bridge `--glass-ambient-hue` (the observer's real write, useGlassBackdropLuminance.ts:344) into the catch-light seam that reads the never-written `--glass-backdrop-hue` (material.css:229) — one name, one writer — the false "companion write" comment fixed, `proof:glass` GD3 gains a non-neutral resolved arm; OR the seam deletes until its writer lands; (d) the WRITER-FIRED WITNESS: the observer stamps `data-backdrop-sampled` (or a paired `--glass-backdrop-sampled: 1`) on write; the enrolled dock-route π REDs a wired-but-never-written channel (the dead-observer≡calm-backdrop mask, adaptive-legibility.css:56-64). Born-RED on Arm D (`--glass-backdrop-hue` 0 writers) → GREEN at the bridge/delete. MIGRATION: none (signal plumbing; the calm identity is byte-held at dormant).

### F5.R2 · BG.W-DRAWER-PAINT-BIND — RIDER (append to the seated clause)

> \+ the NO-MASKING-FALLBACK riders (EDICT §2a M1-M5): the seated "resting state is the CSS CLOSED state" clause is EXECUTED as `@property --glass-drawer-t { initial-value: 0 }` (drawer.css:23-27 — the open-seat write owns every non-zero frame; SSR/no-JS renders closed-offscreen, the honest `--stage-t`/`--siri-island-t` sibling shape); the inline `var(--glass-drawer-t, 1)` fallbacks collapse to bare `var()` (DrawerContent.vue:111-116 — the registration ships in the same cascade, a missing cascade fails VISIBLE); `writeScalar`'s `if (el)` sheet-leg skip becomes a fail-loud dev assert on a mounted content (useDrawerSnap.ts:97-101; the `dragSpan()` 1px + `readScalar()` model-echo null-paths likewise — no model write may stand in for paint truth); the drawer.css stale literals go bare-var (`:66` `0.4s/ease` vs the generated 0.34s spring pair; `:228` ×2 `20px` vs the 13px token). `proof:no-masking-fallback` arms A/B/C flip GREEN on these sites at this wave.

### F3.R1 · BG.W-DOCK-GLYPH-RIGID — RIDER

> \+ the NO-MASKING-FALLBACK clause (EDICT §2a M11-M13): the static per-class `--dock-expand-t` rest (morph.css:47-63) is the KEPT reference anti-masking pattern — the excision is the missing NON-LOCAL witness, which THIS row's born-RED CDP screencast series IS (a dead spring/armer that degrades to a discrete class snap now REDs); the `--dock-size-scale` re-author makes an UNWRITTEN endpoint pair fail loud (layers.css:95-111 — the `clamp(0.06, …)` survives only as the divide-by-zero guard; a dead `useDockExpandedSize`/onSwap writer during `[data-morphing]` dev-asserts instead of painting the bounded 0.06 sliver) and reconciles the "the two endpoints ARE the floors" comment with the code.

### F3.R2 · BG.W-DOCK-PANE-OVERLAP — RIDER

> \+ the NO-MASKING-FALLBACK clause (EDICT §2a M14/M15): the overlapped-crossfade re-author retires the discrete-swap degrade (layers.css:187-231 — `.is-leaving` base opacity 0 with the scalar fade only under `[data-morphing]` let a dead orchestrator swap panes silently; the born-RED no-blank-plate screencast IS the writer-fired witness) and re-keys the visibility hold off `var(--duration-normal)` onto the spring's OWN settle (one clock); a null container/root ref at swap time on a MOUNTED group fails LOUD (useLayerTransition.ts:280-284 + dockMorphContext.ts:214-217 — dev assert + the painted-swap-frames count REDs at 0; the unmounted/SSR early-return stays, distinguished by mount state).

### F3.R3 · BG.W-SHELL-MORPH-PAINT-REPAIR — RIDER

> \+ the NO-MASKING-FALLBACK clause (EDICT §2a M16): the goo bridge flips to the dormant rest — `--dock-bridge-opacity` defaults **0** (morph-bridge.css:41; a dead in-place writer leaves NO teardrop painting over the resting dock), the AZ showcase arms `1` explicitly on its own scope, the in-place writer (`bridgeStyle`) drives the mid-morph window; this row's teardrop-legible-in-0.18<t<0.82 screencast arm ALSO asserts the bridge is NOT visible at rest (t=0/t=1) — the default-visible mask REDs both ways.

### F5.2 · BG.W-LIQUID-WEIGHT-DEFAULT — RIDER

> \+ the NO-MASKING-FALLBACK clause (EDICT §2a M13): the `var(--stretch, 1)` identity rest is HONEST (dormant = identity) and stays; the mask was the absent witness — this row's frame-series pass bars (travel-stretch ≥1.30 mid-flight; the dock press/morph squish engaged) are the NON-LOCAL weight-signature witness, born-RED where a dead squish writer leaves `--stretch` pinned at 1 through a full gesture (the dead-decorative-motion class the liquid-weight-universal edict targets).

### WS8.4 · BG.W-GLASS-SOTA-LADDER — RIDER (build-map row; carries at the seat)

> \+ the NO-MASKING-FALLBACK clause (EDICT §2a M10 + §2b L6): the planned deletes ARE the excision — `useGlassRenderer.ts` (the UA-sniffed three-tier JS ladder: the `fallback` arm duplicates GUARD-1, the `svg-filter` arm is a second resize-re-baking lens engine whose inline styles bypass `--glass-level`/tint/dark) and `useSpecularPointer.ts` (the `--specular-angle` channel's only writer, ZERO consumers — the "motion-reactive" glint has been a static top-edge arc since birth, and the π's `typeof swept.angle` assert is a tautology). At the delete: the conic's angle read either retires with the leaf or gains a REAL writer via the Tier-1 GL path — if kept live, the π upgrades to a two-position DISTINCT-angle assert (the liquid-hover `--mouse-x` shape) so a writer-less channel REDs; the GlassPanel re-point-vs-retire executor call precedes the build (the 28-file §A-§F fan-out roster is binding); `proof:no-masking-fallback` Arm D flips GREEN on `--specular-angle` here.

### F2.2 · BG.W-GLASS-BASIS-CONSOLIDATE — ESCALATION clause (re-open, decision-only)

> \+ the NO-MASKING-FALLBACK escalation (EDICT §2b L5 — ORCHESTRATOR DECISION): the `.dark {}` COLOR witness table (dark-arm.css) + `proof:glass` DA1's byte-lockstep clause serve only pre-`light-dark()` engines (Chrome 123+/Safari 17.5+ both far below target) — a carried legacy floor by the edict's letter, though fail-LOUD (DA1 reds divergence; it cannot MASK). The F2.2 keep was recorded INTENTIONALLY this tranche. Ruling owed: **re-ratify** the keep under the edict's named exception (a lockstep-gated witness, not a silent ladder — record the rationale at the site) OR **collapse** (delete the 60 COLOR witnesses + DA1's lockstep arm; `light-dark()` sole color source — mechanical + zero-risk on targets). SCOPE FENCE either way: `.dark { color-scheme: dark }`, the SHADOW/INSET plain `.dark` arms (the inset-shadow trap), and `accent-color` are NOT the ladder — untouchable.

---

## §7 Disposition summary

| Verdict | Count | Disposition |
|---------|-------|-------------|
| MASKING | 18 | EXCISE (F5.R2 ×5 · NF.3 ×4 · F3.R1 ×2(+shape) · F3.R2 ×2 · F3.R3 ×1 · F5.2 ×1 · WS8.4 ×1 · NF.1 ×2) |
| LEGACY-LADDER | 11 | EXCISE (NF.2 ×7 · NF.1 ×2 · WS8.4 ×1 · F2.2-escalation ×1) |
| CROSS-ENGINE-GAP-TODAY | 4 | KEEP — base-is-the-design, recorded + owned (G1-G4) |
| REAL-DUAL-MECHANISM | 8 | KEEP-JUSTIFIED (K1-K8; K5's contrast-color collapse flag REJECTED as non-equivalent) |

Sequencing note: NF.1 (the gate mint) lands FIRST so `proof:no-masking-fallback` is
born-RED before the owners flip it; F5.R2 remains the P0 of the drawer chain per the
seated cursor row; NF.3's band-driver decision (M7) is the one USER-visible design
choice in the set. This document is the census register Arm E reads until the ladder
rows delete.
