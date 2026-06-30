# BG+BH 5.0.0 Re-Spec — PASS 1 (baseline truth)

**Date:** 2026-06-30 · **HEAD:** `9dfe285c` · **pkg:** 4.2.0 (cut target 5.0.0) · **branch:** tranche/BG
**Synthesis of 8 research lenses** (cursor-truth · gate-reality · code-vs-spec · paint-integrity · clobber-regression · bh-restructure · web-sota-dep · arch-buildorder)
**Fence:** read-mostly; this agent verified findings + records — no src/demo/styles/scripts edits.

---

## 0. Verified foundation (this agent's own checks at HEAD)

| Check | Result |
|---|---|
| `verify-siblings-intact --quiet` | exit 0 (no parked siblings) |
| `typecheck` / `build` (per cursor-truth + code-vs-spec) | exit 0 |
| working tree | clean (only untracked `RESPEC/`) |
| cursor boundary | 35 DONE / 130 PENDING, 18 phases; the 12 "spec CONVERGED" commits are tranche-DEV records, correctly NOT execution. Boundary clean. |

**The headline, directly re-confirmed (not taken on report faith):** the integrated close battery (`--run full` siblings-absent, the W-CLOSE-BATTERY tag gate) is **NOT green at HEAD**. There are **FOUR live ci/release reds**, not three — the two single-lens reports each caught only one of the two distinct `gates.mjs`-registration clobbers.

### The 4 confirmed close reds (evidence on disk)

| # | Gate | Evidence (verified) | Root commit |
|---|---|---|---|
| R1 | `proof:no-god-module` | `ladder.css` = **527L**, `shell.css` = **510L**, both > 500; neither is among the **16** active `RATCHET_BASELINES` entries (verified: the 16 are liquid-morph/GlassDock/createCanvasLifecycle/… — ladder & shell absent) | 6ec81de (3.7) + cd9ce46 (3.6) |
| R2 | `proof:no-dead-token` | `grep "var(--glass-blur-dock)" src demo` → **exit 1, ZERO readers**. The composite is orphaned. It is the tip of a **3-deep chain**: `--glass-blur-dock` (glass.css:166 + dark-arm.css:286) → `--glass-saturate-dock` (read ONLY by that dead composite) → `--glass-blur-dock-radius` 9px + the `--blur-dock` bridge (bridges.css:334, **no Tailwind `blur-dock` utility consumer** — verified empty) | cd9ce46 (3.6) |
| R3 | `proof:gen-ci-fresh` | `glass-idiom-factor` registered with `tags:["local","ci","release"]` (verified gates.mjs:1503) but `ci.yml` = **659L**, not regenerated → drift | 6ec81de (3.7) |
| R4 | `proof:tag-parity` | `proof:category-card-warm` registered `tags:["local"]` (verified gates.mjs:743) — the dual-engine-painted gate is not promoted to ci | 9e13965d (10.25) |

**`proof:ship-attestation` exit 1 and `proof:ba-gestalt` 0/10 are NOT in this table** — both are born-RED **by design** (the intended tag/paint blockers, with real forgery-proof self-tests). They discharge at the C-SAFARI Metal ceremony + W-REFLECT3, never at a fix wave.

### The silent semantic regression (no gate catches it)

GLASS-BLUR-PEER (cd9ce46) re-pointed `shell.css:29` `--dock-surface-blur: var(--glass-blur-dock)` → `var(--glass-blur-resting)` (verified). The dock's backdrop-filter went from `9px + saturate(1.4) + brightness(1.12)` to resting `8px + saturate-resting + brightness(1.14)`. `proof:glass-cal`'s peer-lock is GREEN because it deliberately scopes to the **radius leg only** (the saturate revert is excluded by comment). **The dock lost its bespoke saturate identity under green gates** — this needs a dock paint sign-off, not just a gate fix.

---

## 1. VERIFIED TRIAGE TABLE (every landed wave)

Dispositions: **keep-verified** (sound at HEAD) · **half-baked** (deliverable landed, paint/close debt owed) · **amend** (sound but needs a re-point/re-label) · **restart** (re-think from scratch). **Zero restart candidates** — all 8 lenses concur.

### Landed: keep-verified

| Item | Disposition | Evidence |
|---|---|---|
| **WS7 Stage-0 ground-freeze (0.1–0.6)** — PAINT-IS-THE-GATE, GESTALT-ROSTER re-point, SHIP-DISCIPLINE, 3 ledgers, DISPOSITION-RESTAMP | keep-verified | `ba-gestalt` genuinely re-pointed BC→BG (consts at proof-ba-gestalt.mjs:77 → `docs/tranches/BG/.../reflect/`, 10 surface .md on disk); `ship-attestation` born-RED tag-blocker with 7/7-leg forgery self-test; `disposition-live` 31/31 GREEN. 0.1 born-RED Metal anchor = 18 real PNGs (1440×900 / 2880×1800), flags its own dev-server limit. Born-RED states intentional. |
| **BH concurrent-safe [C] band (1.1–1.12)** — scratch-sweep, lucide-payload, value-destraddle, @glass-alias codemod, subpath-classify, carves, docs-skeleton, prompts | keep-verified | All 12 device-free gates GREEN at HEAD. @glass codemod CLEAN: 250 unique targets resolve, 3-plane alias wired (tsconfig+vite+vitest+demo-dist), 0 deep-relative survivors, 0 `@glass` leakage into src/index.ts, typecheck exit 0. B1 peers clean (value `^1.0.0` single leg, `@lucide/vue ^1.16.0`, lucide-vue-next + vaul-vue ABSENT). B2.1-mech export mechanism PROVEN (EXACT_REPRODUCTION, fail-CLOSED C2/C3). |
| **WS1 shell/routing/field (2.1–2.6)** — ROUTE-TRANSITION (linchpin), FIELD-AURORA, SCROLL-PROGRESS-RAIL, FIELD-ACCENT-RECONCILE, PAPER-GRAIN-OPTIN, HERO-FIT | keep-verified (paint floor MET) | Source matches spec exactly; own gates GREEN; **on-disk paint PNGs resolve** (rt-* 20, field-aurora 16 @2880×1800, scroll 30, hero-fit 34, pg-* 16) + 6 `BG.W-*-DELTA.md`. Genuine dual-engine provenance: Chrome JSON decodes to "ANGLE Metal Renderer: Apple M5 Max"; Safari = real off-screen WKWebView (wkshot-live compiled UNDER glass-ui). Chrome↔Safari byte-distinct, light↔dark byte-distinct — **no paint inflation**. ⚠ caveat below. |
| **WS3 row 3.1 CARTOON-INK-GAMUT** | keep-verified (paint owed) | `proof:no-gray` cartoon-ink-warm-in-gamut GREEN (hue 45–85 both modes); no sibling-gate breakage. PAINT-PENDING is honest debt at the pause frontier, not staleness. |
| **WS3 row 3.7 GLASS-IDIOM-FACTOR (core)** | keep-verified (close tail amend, see below) | `--glass-plate-tinted` DRY recipe declared once (ladder.css:67); `proof:glass-idiom-factor` GREEN; dist byte-isomorphic. The deliverable is sound — its only debt is the god-module growth + un-regen'd ci.yml (R1/R3). |
| **WS4 row 10.25 CATEGORY-CARD-WARM (source + paint)** | keep-verified (tag amend, see below) | `proof:category-card-warm` 4/4 GREEN (warm hue 47–80, chroma 2.4–3.6× gray floor); 12 PNGs @2880×1800 dual-engine PASS + DELTA; the user-reported metallic-wash defect shown structurally absent. Only debt is the `["local"]` mis-tag (R4). |

**⚠ The WS1 caveat (load-bearing, all lenses):** 2.2 FIELD-AURORA shipped **device-free GREEN while live dark-mode paint was catastrophically broken** (muted 1.04:1 over the composited field), caught ONLY by re-paint b3d65eec (→ 13.87:1). This is the standing proof that **device-free GREEN ≠ visually correct for field-composited surfaces**. The PAINT-PASS-LOG records this FAIL→fix→PASS cycle honestly. It is kept-verified BECAUSE the paint process caught and fixed it — but it sets the bar that every PENDING glass-over-field surface carries the same latent AA-collapse risk that no `getComputedStyle` token gate can see.

### Landed: half-baked (paint + close debt owed)

| Item | Disposition | Why | Owed |
|---|---|---|---|
| **WS3 row 3.6 GLASS-BLUR-PEER** | half-baked | 8px peer-lock core LANDED correctly (resting/quiet/dock/btn/Card/menu-row all resolve 8px, Button demoted off glass-deep, `proof:glass-cal` GREEN). But it (a) orphaned the 3-deep `--glass-blur-dock` chain (R2), (b) grew shell.css 498→510 (R1), (c) **silently reverted the dock saturate 1.4→resting under a radius-only gate**. | Atomic sub-cascade delete (R2) + carve/rebaseline shell.css (R1) + **dock-saturate paint sign-off** + dual-engine paint. WS8/WS12 read this spine — its paint must clear first. |

### Landed: amend (sound, needs a re-point / re-label)

| Item | Disposition | Fix |
|---|---|---|
| **WS3 row 3.7 GLASS-IDIOM-FACTOR (close tail)** | amend | Carve or ratchet-rebaseline `ladder.css` (489→527 > 500, R1) + run `gates:emit-ci` (R3). |
| **WS4 row 10.25 CATEGORY-CARD-WARM (gate tag)** | amend | Promote `proof:category-card-warm` to `ci` (or record a JUSTIFIED_LOCAL_ONLY reason). Source/paint are sound. (R4) |
| **Row 2.7 BG.W-VT-ROUTE-ENHANCE** | amend (status-integrity) | Marked DONE while explicitly **DEFERRED-NOT-BUILT** ("marked DONE to skip the build frontier"). Defer reasoning is sound (optional VT polish, route-freeze risk without paint, persistent-shell-Aurora VT-snapshot GOTCHA). **Re-label DEFERRED; re-attempt at W-REFLECT3.** Now that same-doc VT reached Baseline incl. Firefox 144, promote it from "optional" to a real additive PRM-gated wave (see §3). |
| **BH B2.4a carves** | amend | `useCarouselWorm.ts` + `usePagerWorm.ts` landed; `useBloomUp.ts` relocate decision never made. Finish the audit or record the single-consumer keep. |
| **no-god-module ratchet doc-vs-code drift** | amend | CLAUDE.md (BB.W-CARVE5) asserts `RATCHET_BASELINES == {}`; live = **16 entries** (re-populated at BD.W-CUT with rationale). ladder/shell are NOT among the 16 → genuine NEW violations. **BH's canon migration must read the LIVE 16-entry state, never copy `=={}` forward.** Owe an explicit drain-vs-accept decision at the cut. |
| **The SYNTH-fix-wave remediation MODEL (process)** | amend | Worked once (cured 9–12 validation reds for ≤ff0933a3) but is NOT a standing discipline — WS3 re-introduced the same class 3 commits later. **Amend to a STANDING per-wave/per-band sibling-gate sweep** (see prototype P3). |

### BH restructure tail (landed mechanism keep-verified; content frontier amend)

| Item | Disposition | Why |
|---|---|---|
| **B2.1-mech / B2.2 /api-fold spec / B2.3 flat-barrel / B2.1-swap / B7 asks** | keep-verified (spec) | Export reshape is minimal + grepped: 1 dropped key (`./api`) + 2 sibling asks (muster /api→/aurora, speedtest /api→/timeline). EXACT_REPRODUCTION 96/96 keys. `proof:subpath-classify` + `proof:crossrepo-asks` GREEN. RESTART nothing. **Owed-in-execution:** re-author `flatten-subpath-types.mjs` against the post-delete layout (present today but written for pre-delete; else `verify-export-types` reds at the cut); re-baseline the regen against the post-WS12 surface, not the 4.2.0 snapshot. |
| **B4b resolver seams (canon-doc / design-docs fail-explicit ENOENT)** | half-baked | The fail-explicit ENOENT floor is CORRECT — keep exactly. But `auditCanonHomes()` is **existence-only** (`existsSync`; the plan specs non-empty + contract-token-present) AND is **RED at HEAD** (component:instrument-chassis → README ABSENT — a dangling CANON_HOMES reference). The content check is unbuilt; B4b-content ~15% done. |
| **B5c gate-rehome + B4f CLAUDE.md hard-delete** | amend (the most irreversible act) | Reader census is **STALE: plan says 16, disk shows ~18 hard `readFileSync` readers** (+9 comment-only). B4f is gated on B5c re-homing EVERY hard reader; an undercount of 2 → a missed gate ENOENT-breaks the close AFTER the file is irreversibly gone. Gate B4f on `rg readFileSync(...CLAUDE.md) = 0` AND every asserted token present in its new home (see prototype P4). |

---

## 2. AMENDED WAVE PLAN — the PENDING bulk (~110 waves)

**The DAG is sound — KEEP the order, AMEND the SCHEDULE of the ceiling.** All four code-touching lenses concur: zero workstream-level restart, the dependency graph is acyclic, every gating edge validates against live code (the WS8 `[data-glass-field-canvas]` marker is already laid at AppShell.vue:328; WS2's 5→1 SpringProgress target is exactly 5 sites today; `useDockSpring` correctly ABSENT so WS6 SIRI is properly born-RED; the glass-deep tier SURVIVES 3.6 — primary-audacious/:liquid/Card keep it, so the feared 3.6→WS8 forward-clobber is a sign-off not a re-open).

### Build order (KEEP as-spec'd)
`WS1→WS3→WS2→WS5→WS6→WS4→WS7(core)` → `WS8→WS9→WS10→WS11` → `WS12(capstone)` → `BH[WS12] restructure tail`

### The five SEQUENCING amendments (not spec re-thinks)

1. **Clear the 4 close reds FIRST, in ONE atomic sweep** (before any further WS3/WS8 lands). The fix-wave checklist MUST name all four (R1–R4) — a "fix the 3" sweep re-opens the close. The no-dead-token fix MUST delete the **whole** dock-blur sub-cascade atomically (deleting only `--glass-blur-dock` cascade-reveals `--glass-saturate-dock` dead next sweep). It MUST also paint-sign-off the dock-saturate change. (→ prototype P2)

2. **Adopt a STANDING per-band close-battery sweep** (`--run full` siblings-absent + `gates:emit-ci` + tag-parity + no-god-module + no-dead-token) before any PAINT-PENDING flip on any token/CSS-heavy wave. The recurring/compounding `wave-greens-own-gate / leaves-sibling-RED` disease is endemic, not one-shot; with ~110 waves remaining (the MAJORITY mint a gate), every band will re-seed it absent a standing guard. (→ prototype P3)

3. **Front-load the C-SAFARI feasibility spike.** The ★★★-rated 3-tranche chronic (the single likeliest miss) is currently scheduled LAST (WS8 phase 13 atop ~9 workstreams), with ZERO paint coverage and the WKWebView leg proven only for WS1 FLAT surfaces. The spec **already separated** the field-independent WS8 waves (`W-REFRACT-WEBGL` "lands in src/ NOW" + `W-GLASS-SUFFUSE-UNIVERSAL` "field-independent, lands NOW") precisely so an early spike is possible. **Extract a real-WKWebView refraction fixture-π BEFORE the ~50-wave WS5/WS6/WS4 investment** — prove or escape the Safari deep-glass divergence at the front. (→ prototype P1)

4. **Complete the WS3 spine's BLOCKING rows + move a glass-cascade carve EARLIER.** Only the easy half of WS3 landed (field-independent 3.1/3.6/3.7); the literal "convergence CEILING (BLOCKING)" rows **3.3 GLASS-CLIP-DISCIPLINE + 3.4 SAFARI-BLUR-LITERAL** (the Safari-26 Job-B sign-off) + the WS1-field-gated chromatic rows (3.5/3.8/3.9/3.10) are PENDING. WS8/WS12 read this spine. ladder.css (527) + shell.css (510) are over-bound NOW and WS8/WS9/WS10/WS12 grow them further while WS4's carve discipline (10.11/10.20) is scheduled AFTER WS8. **Build the Safari ceiling + a cascade carve (or explicit ratchet re-pin with rationale) before the deep-morphism band reads the spine.** (→ prototype P5)

5. **Convert the back-loaded BH [WS12] restructure tail to incremental per-WS doc-redistribute.** B4b-content→B5c→B4f is a strict serial chain stacked AFTER the WS12 480-capture capstone (the biggest paint risk), with B4f (CLAUDE.md delete) the absolute-last irreversible act. Author canon homes as each WS lands; make `auditCanonHomes` content-real; re-census the exact ~18 readers before B5c — so a B4b-content slip cannot stall the irreversible delete. Confirm BG-WS5 carries the viz-subpath consumer migration (SLIDES) at the post-WS12 re-baseline (cross-ownership seam between BH-B7 and BG-WS5). (→ prototype P4)

### Mechanical now-shipped CONSUMEs (keep-as-spec'd, fire at their waves — low uncertainty)
- kf **5.1.0** ships `DragOptions.snap` (W-DRAG-MORPH native fling-snap; drop the interim snap-projection) + `Oscillator` (EasingPicker loop / viz idle-breathe).
- value.js **1.2.0** ships `sampleColorRamp`/`sampleColorRampAt`/`interpolateHue('shorter')`/`gamutMapOKLab` + `wcagRelativeLuminance`/`wcagContrastRatio`/`contrastColor`/`deltaEOK`. **Repoint the stale BorderProgress `// CONSUME(value.js 0.13.0 oklchSpectrum)` marker** — that name does not exist in 1.2.0. Evaluate consuming `wcagRelativeLuminance` in the WS4 AMBIENT-HISTOGRAM carve rather than hand-rolling (the one-color-math discipline).
- **perfect-freehand** is vendored + uninstalled yet still listed `optionalPeer` at HEAD → WS9 correctly drops it.
- **W-TAILWIND4-IDIOM (WS10):** record "evaluated, not applicable" — token-first is already more SOTA; v4.1 mask utilities cannot cover the `mask-composite` border-band trick. Don't let the next audit re-flag a non-existent modernization.

### SOTA / identity fences to HOLD (web-sota lens)
- **C-SAFARI design is AHEAD of SOTA, not behind:** the viral CSS-SVG `feDisplacementMap` liquid-glass is Chromium-ONLY, unchanged in 2026. The WebGL2+WGSL refraction dual-stack is the correct cross-browser bet. The risk is the Metal capture, not the architecture.
- **iOS-27 VALIDATES the adaptive stack** (continuous strength slider = `--glass-level`/`--glass-depth`; readability-over-transparency = bright-bucket + on-glass-fg + dark-material). One DELIBERATE divergence: W-GLASS-BLUR-PEER dials blur DOWN (calm) while iOS-27 dialed it up — **record as deliberate** (warm-tint legibility carries it; keep `--glass-depth` deep tier robust) so a future "match iOS-27" doesn't reopen the settled calm-blur.
- **contrast-color() is now Baseline 2026** but returns BLACK/WHITE only — it CANNOT be the warm-amber primary ink. Hold the existing fence: flip the **surface** (`contrast-color(var(--card))`), never the ink. Gate-guard it against a future "self-correcting color" swap.

---

## 3. CONVERGENCE GAPS (open questions the next steps must resolve)

1. **Is the C-SAFARI deep-glass refraction actually renderable in real Safari/Metal?** The single dominant cut-risk. WKWebView proven only for flat WS1 surfaces; deep-glass `backdrop-filter:url(#glass-refract)` + `feDisplacementMap` refraction in real WebKit is UNPROVEN. The whole paint-verification machine is a single point of dependency on the C18 `?capture=` harness + wkshot-live binary — no evidenced fallback. **→ P1.**

2. **Can a device-capable gate catch the field-composited-AA class before W-REFLECT3?** 2.2 shipped device-free-GREEN at 1.04:1. The 5 WS7 phase-12 live-render gates (`route-navigates`/`field-aurora`/`previews-render`/`uniform-blur`/`safari-parity`) are entirely ABSENT — none built, none registered. Until they land, every glass-over-field "DONE" rests on author-captured paint, not an automated net. Is `proof:field-aurora` (the composited-over-field AA gate whose absence let 2.2 ship) buildable as the early net? **→ P6.**

3. **What is the true blast radius of the dock-saturate revert?** Does the resting saturate read acceptably on the dock, or is 1.4 the intended look? No device-free gate sees it; needs a dock-specific paint sign-off against the pre-unify look. **→ folded into P2.**

4. **Drain-vs-accept the 16-entry ratchet, and where does the cascade carve sit?** ladder/shell are over-bound NOW; WS8/WS9/WS10/WS12 grow the glass cascade further before WS4's carve runs. Is the answer a carve, a per-file ratchet re-pin with rationale, or both — and at what point in the order? **→ P5.**

5. **Exactly how many hard CLAUDE.md readers, and is every asserted contract token re-homed before the irreversible delete?** Census stale (16 vs ~18); `auditCanonHomes` existence-only + RED at HEAD; B4b-content ~15%. The most irreversible act in the tranche sits on an under-baked, existence-checked (not content-checked) chain. **→ P4.**

6. **Does the gestalt close cost match the plan?** `proof:ba-gestalt` is born-RED on ALL 10 roster surfaces; 8 of 10 owned by unstarted PENDING bands. The 5.0.0 tag requires every roster row PASS — estimate the cut against **~16 surface-flips × 2 engines × 2 modes** still owed, NOT against the 7 done. This is the dominant remaining paint cost and bounds the wall-clock floor (WS11/WS12 are a serial post-integration tail, un-parallelizable). Open: confirm `proof:ba-gestalt` G1 pngDimensions floor tolerates the Chrome-desktop @1x (1440×900) vs Safari @2x asymmetry, or roster captures trip a strict dimension assert at the close.

7. **Process hygiene gap:** standalone `proof-*.mjs` scripts print `status: FAIL` but **exit 0** (the harness reads the JSON artifact, not `$?`). Any fix-agent/CI checking the exit code reads a FALSE GREEN. The standing discipline (P3) MUST mandate "trust only `gates.mjs --run full` siblings-absent."

---

## 4. PROTOTYPE TASKS (≤6, ordered by uncertainty reduction)

See the structured-output `prototypeTasks` array. Rationale summary:

- **P1 (implement) — C-SAFARI refraction feasibility spike.** Highest-uncertainty item; the ★★★ chronic; field-independent and front-loadable by spec design. A worktree PoC of `W-REFRACT-WEBGL` (WebGL2 + WGSL refraction) captured in real off-screen WKWebView. Proves or escapes the Safari deep-glass divergence BEFORE the ~50-wave investment.
- **P2 (implement) — the 4-red atomic close-fix wave.** Blocks the tag; has a trap (whole dock-blur sub-cascade delete) + a silent-regression sign-off (dock saturate). A worktree that clears R1–R4 atomically + records the dock-saturate paint decision proves the fix shape and surfaces any cascade-reveal.
- **P3 (spec) — the standing per-band close-battery sweep discipline.** Kills the recurring/compounding disease. Written process spec (run `--run full` siblings-absent + `emit-ci` + tag-parity + no-god-module + no-dead-token before any PAINT-PENDING flip; trust JSON-not-`$?`), prototyped against the WS3 recurrence.
- **P4 (spec) — BH CLAUDE.md-delete de-risk.** Most irreversible act. Re-census the exact hard readers (`rg readFileSync`), make `auditCanonHomes` content-real (non-empty + token-present), author the missing instrument-chassis README as proof-of-pattern; gate B4f on `rg=0` + token-present.
- **P5 (spec) — WS3-spine completion + cascade-carve ordering.** Re-think the ORDER so the BLOCKING Safari-ceiling rows (3.3/3.4) + a glass-cascade carve land BEFORE WS8/WS9 read the spine; record the ratchet drain-vs-accept decision.
- **P6 (spec) — `proof:field-aurora` composited-over-field-AA gate.** The net 2.2 lacked. A prototype-augmented spec for the device-capable gate that captures composited-over-field AA, so the field-AURORA class becomes impossible-to-ship-green rather than caught-only-by-luck-at-paint.

**passConvergencePct: 62.** The triage of WHAT-is-built is ~90% converged (8 lenses concur, zero restart candidates, boundary clean, 4 reds directly verified, foundation green). The re-spec of HOW-the-bulk-converges is ~55% (C-SAFARI feasibility unproven, ba-gestalt 0/10, ~16 paint-flips owed, cascade-carve order + ratchet decision open, CLAUDE-delete content-completeness owed). PASS 1 establishes baseline truth and identifies the sequencing amendments; the prototype tasks exist to prove them. Honest blended: 62.
