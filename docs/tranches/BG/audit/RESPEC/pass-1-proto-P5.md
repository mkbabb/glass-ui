# P5 — WS3-spine completion + glass-cascade carve ordering + ratchet drain-vs-accept

**PROTOTYPE-AUGMENTED SPEC · PASS 1 · 2026-06-30 · branch `tranche/BG` · HEAD `9dfe285c` (pkg 4.2.0 → cut 5.0.0)**
**Fence:** read-mostly; this agent recorded findings + verified on disk — no `src/demo/styles/scripts` edits.
**Feasible: YES** — the carve seams exist, are byte-isomorphic + gate-transparent, and the ordering amendment
is a SCHEDULE move (no DAG re-think). The drain-vs-accept decision is a gate-header + CLAUDE.md doctrine fix
plus an optional small gate hardening. Confidence high (all claims verified against live source + the gate run).

---

## 0. Verified ground truth (this agent's on-disk checks at HEAD)

| Check | Result (verified, not taken on report faith) |
|---|---|
| `verify-siblings-intact --quiet` | exit 0 (no parked siblings) |
| `proof:no-god-module` (ran it) | **status FAIL**, exactly **2 violations**: `glass/ladder.css` = **527L**, `dock/shell.css` = **510L** — both `> 500`, NEITHER in `RATCHET_BASELINES` |
| `RATCHET_BASELINES` live count | **16 entries** (re-populated at BD.W-CUT). `ratchetDrained=false` in the artifact. ladder/shell ABSENT from the 16 → genuine NEW violations |
| Is `RATCHET_BASELINES == {}` gate-ENFORCED? | **NO.** `ratchetDrained` is written as a FACT in the artifact; it is **never added to `violations`**. The gate goes GREEN with grandfathered rows. `grep ratchetDrained scripts/` outside the gate itself = 0 close-script readers. The `== {}` close-state is **DOCTRINAL** (gate-header comment + CLAUDE.md prose), not a tag blocker. |
| CLAUDE.md doctrine drift | CLAUDE.md **lines 32 + 41** both assert `RATCHET_BASELINES == {}` ("DRAINED to ∅" / "== {} again"). **FALSE at HEAD** — live = 16. Confirmed. |
| `proof:glass-cohesion` reads grain via… | `readMonolith(ROOT, "glass")` (line 453) — the **concatenated** glass monolith, NOT `ladder.css` by name. So a registered tail-carve is **gate-transparent** (the BB.W-CARVE4 precedent). |
| dock partials read via… | `readDockCss(root)` (read-dock-css.mjs) — concatenates ALL `dock/*.css` (DOCK_PARTIAL_ORDER first, unlisted appended alpha). A registered shell tail-carve is likewise gate-transparent. |
| `assertMonolithImportOrder` scope | iterates `CSS_MONOLITHS` = {tokens, glass, utilities, dock-controls, theme, typography}. **glass IS checked** (so the ladder carve must register in `glass.order` + the glass.css `@import`). **dock is NOT in CSS_MONOLITHS** (dock import-order is unchecked; byte-isomorphism is the shell-carve witness, via build-diff). |

**The crux finding (resolves CONVERGENCE-GAP #4):** the close-RED is ONLY `ladder.css` + `shell.css` (no baseline).
The 16 grandfathered rows are NOT reds — the tag CAN fire with them present. So the question is two separable things:
(a) clear the 2 over-bound cascade files so they don't compound under WS8/WS9/WS12 — **CARVE both NOW**; and
(b) decide the fate of the 16 — **ACCEPT (scheduled-drain or recorded-irreducible), not force-drain to ∅**, and FIX
the false `== {}` doctrine.

---

## 1. The problem, precisely (why P5 is its own item, not folded into P2)

P2 clears the 4 close reds atomically; one of those (R1) is "ladder/shell over-bound." But R1 has a SCHEDULING
dimension P2 alone does not resolve:

- **ladder.css (527)** is grown by 3.7 GLASS-IDIOM-FACTOR (the landed cause) and **re-pointed again by WS9
  `BG.W-PAPER-GRAIN-REAL`** (`re-point cards.css/ladder.css/dock/shell.css`, build-map L487).
- **shell.css (510)** is grown by 3.6 GLASS-BLUR-PEER (the landed cause, 498→510), **edited by WS8
  `BG.W-GLASS-SUFFUSE-UNIVERSAL`** (`material.css, rim.css, glass-fx.css, glass-capsule.css, dock/shell.css, select.css`,
  build-map L443-444) AND **re-pointed by WS9 `BG.W-PAPER-GRAIN-REAL`**.
- The **97-file 301–500 WARN band** is wide; the #1 latent over-spill is **`tokens/glass-fx.css` (458L)**, which WS8
  SUFFUSE-UNIVERSAL explicitly mints `--glass-bevel-*` INTO — a bevel token family + derived tier leans can push it
  past 500, opening a THIRD no-god-module red mid-WS8.

So if R1 is cleared by a bare **ratchet re-pin** (the lazy fix), WS8/WS9 re-grow ladder/shell PAST the booked baseline
and the gate re-reds (a grandfathered row may not GROW) — the close re-opens deep in the deep-morphism band where it
is most expensive to chase. **The right fix is a CARVE that buys real headroom BEFORE the deep waves read+grow the spine.**

### Build-order facts (verified against the cursor's PHASE headers)

| Wave | Cursor phase | Touches cascade |
|---|---|---|
| WS3 (spine, incl. 3.3 CLIP-DISCIPLINE / 3.4 SAFARI-BLUR-LITERAL) | **Phase 3** | ladder.css, material.css, surfaces.css |
| WS4 carves (10.12 CANVAS-LIFECYCLE-LEAVES, 10.13 AMBIENT-HISTOGRAM, 10.14 TABS-KEYBOARD, 10.18 UNIFORM-LAYOUT) | **Phase 10** | **drain `.ts` ratchet rows — NOT ladder/shell** |
| WS8 glass-deep | **Phase 13** | material.css, rim.css, **glass-fx.css**, glass-capsule.css, **shell.css**, select.css |
| WS9 paper-deep | **Phase 14** | paper.css, scale-paper.css, cards.css, **ladder.css**, **shell.css** |
| WS10 de-shadcn | **Phase 15** | tokens/glass.css, dark-arm.css, bridges.css, scale-paper.css, select.css, menu.css |
| WS12 capstone | **Phase 17** | A6 glass-key spine read (additive) |

**Correction to the PASS-1 lens framing.** The lens said "WS4's carve discipline (10.11/10.20) is scheduled AFTER WS8."
That is imprecise: WS4 (phase 10) runs BEFORE WS8 (phase 13). The accurate statement is: **WS4's carves (10.12–10.18)
drain the `.ts`/`.wgsl`/`.glsl` ratchet rows — they do NOT touch `ladder.css`/`shell.css` AT ALL.** No scheduled wave
carves ladder/shell; they are the orphan over-bound CSS files with no draining wave. THAT is the gap P5 closes.

---

## 2. THE RATCHET DRAIN-VS-ACCEPT DECISION (the 16-entry register)

**Decision: ACCEPT-WITH-CLASSIFICATION, not force-drain to ∅.** Every grandfathered row is EITHER (a) booked to a
named draining wave already in the plan, OR (b) genuinely IRREDUCIBLE (one cohesive shader-program string, or one
ordered cascade-partial whose split reorders the cascade). The doctrine `RATCHET_BASELINES == {}` is **unachievable AND
wrong** while genuinely-irreducible artifacts exist — a single 529-line WGSL metaball program is not a "god module," it
is one compiled shader. The honest close-state is:

> **`violations == []` AND every grandfathered row carries a `// BOOK(<wave>):` marker (scheduled drain) OR an
> `// IRREDUCIBLE(<reason>):` marker (accepted permanent floor with rationale).**

### The 16-entry classification (verified against the build map's carve waves)

| # | Ratchet row | Lines | Disposition | Draining wave / irreducible reason |
|---|---|---|---|---|
| 1 | `styles/glass/liquid-morph.css` | 850 | **DRAIN** | WS3 3.11 `BG.W-DEMO-STYLE-REHOME` + WS7 `BG.W-SPIKE-DELETE` — WHOLE-rehome to `demo/` (it is a demo-surface stylesheet) |
| 2 | `components/custom/dock/GlassDock.vue` | 711 | **DRAIN** | WS2 4.4 `BG.W-DOCK-DECOMPOSE` — carve → colocated fission-wiring + touch-gate; "drain RATCHET rows" |
| 3 | `composables/glass/webgl/createCanvasLifecycle.ts` | 695 | **DRAIN** | WS4 10.12 `BG.W-CANVAS-LIFECYCLE-LEAVES` (after WS5) |
| 4 | `composables/glass/webgpu/useWebGPUCanvas.ts` | 606 | **DRAIN** | WS4 10.12 `BG.W-CANVAS-LIFECYCLE-LEAVES` (after WS5) |
| 5 | `components/custom/dock/composables/useDockFission.ts` | 604 | **DRAIN** | WS2 4.4 `BG.W-DOCK-DECOMPOSE` (fission-wiring leaf target) |
| 6 | `styles/dock/fission-bridge.css` | 552 | **IRREDUCIBLE** | ordered `@layer`/`@property` cascade partial (BD.W-CUT bucket-a; a split reorders the goo-bridge cascade) |
| 7 | `components/custom/dock/composables/useDockContextSilhouette.ts` | 551 | **DRAIN** | WS2 4.3 `BG.W-DOCK-CUT` — DELETE wholesale (0 consumers, after WS6 confirms) |
| 8 | `styles/tokens/property-regs.css` | 548 (≤566) | **IRREDUCIBLE** | ordered `@property` registration cascade partial (BD.W-CUT bucket-a) |
| 9 | `composables/glass/useGlassBackdropLuminance.ts` | 534 (≤542) | **DRAIN** | WS4 10.13 `BG.W-AMBIENT-HISTOGRAM-LEAF` → `ambientHueHistogram` + `wcagLuminance` (after WS3-M5) |
| 10 | `components/custom/goo-blob/composables/useBlobSatellites.ts` | 533 | **DRAIN** | WS5 9 `BG.W-BLOB-KINEMATICS-LEAF` — carve kinematics into a leaf |
| 11 | `components/custom/goo-blob/shaders/metaball.wgsl.ts` | 529 | **IRREDUCIBLE** | ONE metaball WGSL program (GL-shader fence; BD.W-CUT bucket-a) |
| 12 | `components/custom/dot-flow-field/shaders/flow-field.glsl.ts` | 517 | **IRREDUCIBLE** | shared GLSL chunk both GL leaves link (GL-shader fence; BD.W-CUT bucket-a) |
| 13 | `components/custom/tabs/SegmentedTabs.vue` | 512 | **DRAIN** | WS4 10.14 `BG.W-TABS-KEYBOARD-LEAF` → `useTabRovingFocus` + `useTabResponsive` |
| 14 | `components/custom/goo-blob/shaders/metaball.frag.ts` | 510 | **IRREDUCIBLE** | ONE GL fragment program (GL-shader fence; BD.W-CUT bucket-a) |
| 15 | `components/custom/goo-dot-matrix/composables/useGooDotMatrix.ts` | 508 | **DRAIN** | WS5 8 `BG.W-GOODOT-SETUP-SPLIT` — carve `setup` into the M1-adopted shape |
| 16 | `api/index.ts` | 505 | **DRAIN** | WS4 (encapsulation) / WS12 `BG.W-UNIFORM-LAYOUT-BUILDER`-adjacent api re-split; OR accept after BH /api-fold (the /api subpath retires at B2.2 → the file may shrink/move) |

**Verdict tally:** **11 DRAIN** (each booked to a named wave already in the DAG) · **5 IRREDUCIBLE**
(`fission-bridge.css`, `property-regs.css`, `metaball.wgsl.ts`, `flow-field.glsl.ts`, `metaball.frag.ts` — one shader
program or one ordered cascade-partial each). **The close-state ratchet is NOT ∅; it is the 5 IRREDUCIBLE rows, each
marked with rationale.** This is the principled drain-vs-accept answer.

> **Note on #16 (`api/index.ts`):** BH B2.2 retires the `./api` subpath. The cleanest disposition is to fold this into
> the BH restructure rather than a BG carve — flagged to P4's owner. Either way it carries a marker (BOOK or, if it
> survives, IRREDUCIBLE is wrong — it must drain).

---

## 3. THE CARVE MECHANISM — concrete, byte-isomorphic, gate-transparent (the prototype)

Both ladder.css and shell.css have a CLEAN COHESIVE TAIL — the cheapest, safest carve shape (the BB.W-CARVE4 /
AX.W06 precedent: carve a tail group into an adjacent `@layer components` block `@import`'d IMMEDIATELY after the
parent, in the same source position → dist byte-identical).

### 3a. ladder.css (527 → 461) — carve the grain-overlay tail

**Carve range:** `src/styles/glass/ladder.css` **lines 462–525** (the grain noise overlay register): the
`.glass-{wash,quiet,resting,floating,overlay}::after` grain rules (462–495), the PRM-reduce `transition:none`
bracket (497–511), and the `.dark …::after { mix-blend-mode: soft-light }` arm (519–525). This is the SOLE writer of
the `.glass-*::after` grain `::after` rules → cascade-order-invariant.

**New file** `src/styles/glass/grain-overlay.css`:
```css
/* glass/grain-overlay.css — the .glass-*::after grain noise register (BG carve).
 * Carved from ladder.css's tail (BB.W-LIQUIDHOVER grain group) to hold the
 * no-god-module 500-line bound. An adjacent @layer components block @import-ed
 * IMMEDIATELY AFTER ladder.css (before accent-tone.css) — the SOLE writer of the
 * .glass-*::after grain rules, so the relocation is cascade-order-invariant (the
 * dist is byte-isomorphic). proof:glass-cohesion reads it via readMonolith("glass"),
 * which follows the carve — NO gate edit. */
@layer components {
    /* ...lines 462–495 verbatim... */
    /* ...lines 497–511 (PRM bracket) verbatim... */
    /* ...lines 519–525 (.dark soft-light) verbatim... */
}
```

**Wiring (3 edits, lockstep):**
1. `src/styles/glass.css` — add `@import "./glass/grain-overlay.css";` IMMEDIATELY after the `ladder.css` import
   (line 48) and BEFORE `accent-tone.css` (line 53):
   ```css
   @import "./glass/ladder.css";
   @import "./glass/grain-overlay.css";   /* BG carve — ladder's grain ::after tail */
   @import "./glass/accent-tone.css";
   ```
2. `scripts/read-css-monoliths.mjs` — `CSS_MONOLITHS.glass.order`, insert `"grain-overlay.css"` between
   `"ladder.css"` and `"accent-tone.css"` (line 95→96), so `assertMonolithImportOrder` keeps GREEN:
   ```js
   "ladder.css",
   // BG carve — the .glass-*::after grain register carved from ladder.css's tail,
   // @import-ed IMMEDIATELY AFTER ladder.css (SOLE writer of the grain ::after,
   // cascade-order-invariant; dist byte-isomorphic).
   "grain-overlay.css",
   "accent-tone.css",
   ```
3. `ladder.css` — delete 462–525 (the file ends at the line-461 `}` closing `.glass-floating[data-over-content="solid"]`,
   then the `@layer components` close brace). **Result: ladder.css = 461 lines (39 headroom).**

**Headroom analysis:** WS9 `BG.W-PAPER-GRAIN-REAL` re-points the grain texture token — and the grain register it
re-points now LIVES in `grain-overlay.css`. So WS9's ladder edit BECOMES a `grain-overlay.css` edit (a beneficial
co-location of the exact register WS9 touches). ladder.css's 39-line headroom absorbs any residual.

### 3b. shell.css (510 → 437) — carve the placement + region tail

**Carve range:** `src/styles/dock/shell.css` **lines 438–509** (the dock placement + persistent-region + vertical
layer-pane group): the positioning fence (`.glass-dock:where(.fixed)`, `.dock-inline`, `.dock-sticky`), the
`.dock-persistent` region + orientation arms + the `+ .dock-layers` gap rhythm, and the vertical `.dock-layer`
column-stack rule. Cohesive: "dock placement + region layout." ~72 lines.

**New file** `src/styles/dock/shell-regions.css`:
```css
/* dock/shell-regions.css — dock placement (fixed/inline/sticky) + the persistent
 * region (#persistent rail) + the vertical layer-pane column layout (BG carve).
 * Carved from shell.css's tail to hold the no-god-module 500-line bound. An
 * adjacent @layer components block @import-ed IMMEDIATELY AFTER shell.css (before
 * morph.css), same source position → dist byte-isomorphic. readDockCss() follows
 * the carve (concatenates all dock/*.css) — NO dock-gate edit. */
@layer components {
    /* ...lines 438–509 verbatim... */
}
```

**Wiring (2 edits + 1 order-array, lockstep):**
1. `src/styles/dock.css` root — add `@import "./dock/shell-regions.css";` IMMEDIATELY after `@import "./dock/shell.css";`
   (line 42) and before `@import "./dock/morph.css";` (line 43).
2. `scripts/read-dock-css.mjs` — `DOCK_PARTIAL_ORDER`, insert `"shell-regions.css"` between `"shell.css"` and
   `"morph.css"` (REQUIRED: the unlisted-alpha-append fallback would mis-order it after `overflow.css`, breaking
   byte-isomorphism):
   ```js
   export const DOCK_PARTIAL_ORDER = [
       "shell.css",
       "shell-regions.css",   // BG carve — shell's placement+region tail
       "morph.css",
       ...
   ];
   ```
3. `shell.css` — delete 438–509 → **shell.css = 437 lines (63 headroom)**. WS8 SUFFUSE-UNIVERSAL + WS9 PAPER-GRAIN-REAL
   edits land from 437; 63 lines absorbs both.

> **`dock` is not in `CSS_MONOLITHS`,** so `assertMonolithImportOrder` does NOT check the dock @import order. The
> byte-isomorphism witness for shell is therefore the **build-diff** (§6), not the import-order gate. (Optionally,
> add a `dock` entry to `CSS_MONOLITHS` mirroring `DOCK_PARTIAL_ORDER` so the import-order is gate-checked too — a
> small hardening, recommended but not required for this carve.)

### 3c. Preventive: glass-fx.css over-spill (the latent WS8 third-red)

`tokens/glass-fx.css` (458L) is where WS8 SUFFUSE-UNIVERSAL mints `--glass-bevel-*`. **Pre-empt:** when WS8 adds the
bevel token family, carve the bevel block into a sibling `tokens/glass-bevel.css` IN THE SAME WS8 diff
(carve-while-you-grow), registered in `CSS_MONOLITHS.tokens.order` after `glass-fx.css`. This is a WS8-owned action;
P5 records it as a REQUIRED rider on `BG.W-GLASS-SUFFUSE-UNIVERSAL` so the deep wave never re-opens R1. No P5/P2 work.

---

## 4. THE LOCKING GATE — `proof:no-god-module` BOOK/IRREDUCIBLE marker hardening

Today the gate's BOOK-marker guard is **inert** (`void baselinePaths;` at line 292 — it is documented but never
asserted). P5 ARMS it AND extends it to require an explicit disposition marker on EVERY grandfathered row. This is the
machine-lock that makes the §2 drain-vs-accept decision real (and kills the false `== {}` doctrine).

**New rule:** every `RATCHET_BASELINES` row MUST carry, on a comment line within its block in
`proof-no-god-module.mjs`, EITHER:
- `// BOOK(BG.W-<WAVE>):` — a scheduled drain (the `<WAVE>` must resolve to a real `docs/tranches/<L>/waves/` or
  build-map wave id), OR
- `// IRREDUCIBLE(<reason>):` — an accepted permanent floor (one cohesive shader program / one ordered cascade-partial).

A row with NEITHER marker → RED. (This is the standing "the count + the spec move in one commit" discipline, finally
enforced.) The close-state assertion is REPLACED:
- OLD (doctrine, wrong): `violations == [] AND RATCHET_BASELINES == {}`.
- NEW (machine-checked): `violations == [] AND every grandfathered row carries a BOOK or IRREDUCIBLE marker`.

**Sample patch shape (`scripts/proof-no-god-module.mjs`, replacing the `void baselinePaths;` no-op at line 292):**
```js
// ── Disposition-marker guard (BG.W-RATCHET-DISCIPLINE). Every grandfathered row
//    MUST carry a `// BOOK(<wave>):` (scheduled drain) or `// IRREDUCIBLE(<reason>):`
//    (accepted floor) marker in THIS file's source, on a comment line within ~12
//    lines preceding the row's key string. A row with neither → RED (the doctrine
//    `== {}` is replaced: a one-shader-program / one-ordered-cascade-partial is a
//    legitimate permanent floor, never a god module).
const selfSrc = readFileSync(fileURLToPath(import.meta.url), "utf8").split("\n");
for (const m of grandfathered) {
    const keyIdx = selfSrc.findIndex((l) => l.includes(`"${m.path}"`));
    if (keyIdx === -1) continue; // (a row read from disk but absent in source — impossible, defensive)
    const window = selfSrc.slice(Math.max(0, keyIdx - 12), keyIdx + 1).join("\n");
    const hasBook = /\/\/\s*BOOK\(\s*[\w.\-]+\s*\)\s*:/.test(window);
    const hasIrreducible = /\/\/\s*IRREDUCIBLE\(\s*[^)]+\)\s*:/.test(window);
    if (!hasBook && !hasIrreducible) {
        violations.push(
            `${m.path} (ratchet baseline ${m.baseline}) carries NEITHER a // BOOK(<wave>): NOR a ` +
            `// IRREDUCIBLE(<reason>): marker — every grandfathered row must declare its disposition`,
        );
    }
}
```

**Born-RED proof:** at HEAD, NONE of the 16 rows carry a `// BOOK(`/`// IRREDUCIBLE(` marker (they carry prose
comments, not the structured marker). So the hardened gate is born-RED on **all 16 + the 2 new violations (ladder/shell)
= 18**, and goes GREEN only after (a) the 2 carves land (ladder/shell drop out of `over`), and (b) every surviving
grandfathered row gets its BOOK/IRREDUCIBLE marker per §2.

**Self-test bites (append to the gate's `--self-test` arm, ≥4 bites):**
1. a synthetic grandfathered row with NO marker → MUST flag.
2. a row with a `// BOOK(BG.W-NONEXISTENT):` whose wave id resolves to no wave → MUST flag (wave-resolution bite —
   mirror `proof:disposition-live`'s decided-destination soundness clause; resolve against build-map wave ids +
   `docs/tranches/*/waves/`).
3. a row with `// IRREDUCIBLE(<reason>):` → MUST pass (accepted floor).
4. a grandfathered file that GROWS past its baseline → MUST flag (the existing growth guard, kept).
5. (kept) a 501-line src file with no baseline → MUST flag.

**Gate registration:** `proof:no-god-module` stays `["local","ci","release"]` (no tag change — it already blocks the
close). The hardening is in-place (no new gate key), so `proof:gen-ci-fresh`/`proof:tag-parity` are untouched.

---

## 5. THE ORDERING AMENDMENT (where the carve + Safari ceiling sit)

The DAG is sound; this is a SCHEDULE move, not a re-think.

### 5a. The two carves land in P2's atomic close-fix sweep (Phase 2/3, BEFORE WS8)

R1 is one of P2's four reds. **P2 clears R1 by CARVING (not ratchet-re-pinning) ladder.css + shell.css** per §3a/§3b —
both seams are available NOW (field-independent, no wave dependency), both buy headroom (39/63 lines) that absorbs the
WS8/WS9/WS12 growth, both are byte-isomorphic + gate-transparent. The hardened gate (§4) lands in the SAME sweep (it
is the lock that keeps the carve honest + records the §2 decision). **This is a hand-off to P2: P5 specs the carve
shape + the gate; P2 executes it inside the 4-red atomic wave.**

### 5b. The Safari ceiling (3.3 CLIP-DISCIPLINE + 3.4 SAFARI-BLUR-LITERAL) is ALREADY correctly ordered — confirm + front-spike

Verified: WS8 #1 `BG.W-GLASS-SUFFUSE-UNIVERSAL` `Precond: consumes WS3-M3 contain clip host + WS3 saturate(~1.2)
revert`. WS3-M3 = **3.3 GLASS-CLIP-DISCIPLINE** (phase 3) lands before WS8 (phase 13). **The ordering is sound.** The
real risk is not order but PROVENANCE — 3.3's "Safari-26 Job-B sign-off is the convergence CEILING (BLOCKING)" needs
a real-WKWebView capture, and the deep-glass refraction is the ★★★ chronic. P5's ordering contribution: **3.3/3.4 land
in the WS3 spine-completion (M4) and their Job-B Safari sign-off is the gating artifact WS8 consumes** — so WS8's
`contain` clip-host + saturate-revert do not land until 3.3's Safari paint passes. This dovetails with **P1's
front-loaded C-SAFARI feasibility spike**: P1 proves the WebGL2+WGSL refraction renders in real Safari; 3.3 proves the
`contain:paint` clip discipline survives Safari's Popper-arrow + corner-bleed matrix. **Both must clear before the
~50-wave WS5/WS6/WS4 investment is committed atop an unproven Safari ceiling.**

### 5c. The amended micro-order (WS3 spine completion → deep band)

```
WS1 (done) → [P2 sweep: clear R1–R4, CARVE ladder+shell, ARM the marker gate]
           → WS3 spine completion: 3.3 CLIP-DISCIPLINE (Safari Job-B sign-off, BLOCKING)
                                   3.4 SAFARI-BLUR-LITERAL (real-Safari differential)
                                   3.5/3.8/3.9/3.10 chromatic (WS1-field-gated)
           → WS2 → WS5 → WS6 → WS4 (10.12–10.18 DRAIN .ts ratchet rows) → WS7(core)
           → WS8 (consumes 3.3 clip host; RIDER: carve glass-fx bevel block in-diff §3c)
           → WS9 (re-points grain-overlay.css + shell-regions.css from 437/461 headroom)
           → WS10 → WS11 → WS12 → BH[WS12]
```

---

## 6. ≥2 CONSUMERS + the verifying π (byte-isomorphism, the binding truth)

**The "≥2-consumer" framing for a carve.** A carve mints no new primitive — it RELOCATES a register, so the
J-inv-10 ≥2-consumer bar maps to "the carved register has ≥2 reader surfaces" (trivially met, recorded for completeness):
- `grain-overlay.css`: the `.glass-*::after` grain covers **5 tiers** (wash/quiet/resting/floating/overlay) — 5 consumers.
- `shell-regions.css`: the placement fence (`.fixed`/`.dock-inline`/`.dock-sticky`) + `.dock-persistent` + vertical
  `.dock-layer` — ≥3 distinct consumer selectors, consumed by both shell docks (SidebarDock/BottomDock) + the showcase
  docks.

**The binding π is BYTE-ISOMORPHISM (a carve must change ZERO painted pixels):**

1. **Dist byte-diff (the carve-discipline witness):**
   ```
   npm run build                       # baseline
   cp dist/glass-ui.css /tmp/ladder-shell-pre.css      # (use the scratchpad, not /tmp if fenced)
   # apply the two carves + the 5 wiring edits
   npm run build
   diff dist/glass-ui.css /tmp/ladder-shell-pre.css    # MUST be empty (byte-identical)
   ```
   Empty diff = the carve is a pure relocation (lightningcss merges the adjacent same-name `@layer components` blocks;
   the BB.W-CARVE4 / AX.W06 carves all proved dist byte-identical with the `@layer` seam). A NON-empty diff means the
   carve reordered the cascade → reject.

2. **Gate battery GREEN post-carve (no gate edits beyond the §4 hardening):**
   - `proof:no-god-module` → GREEN (ladder 461, shell 437, both ≤ 500; the 16 rows carry markers).
   - `proof:glass-cohesion` (reads `readMonolith("glass")`) → GREEN (grain follows the carve).
   - `assertMonolithImportOrder` (in proof:no-god-module) → GREEN (glass.order updated in lockstep).
   - every dock gate via `readDockCss` → GREEN (shell-regions concatenated in order).
   - full `--run full` siblings-absent → no new red (the standing P3 discipline).

3. **No paint π is OWED for the carve itself** (zero painted-pixel delta by construction — the dist byte-diff IS the
   proof). The deep waves that GROW the carved files (WS8/WS9) carry their OWN `proof:ba-gestalt` glass/paper verdicts;
   the carve does not change paint, so it changes zero gestalt rows. (Contrast the dock-saturate revert in 3.6, which
   DID change paint and owes a sign-off — that is P2's concern, not this carve's.)

---

## 7. THE CLAUDE.md DOCTRINE FIX (the false `== {}`)

CLAUDE.md lines 32 (BB.W-CARVE4) + 41 (BB.W-CARVE5) assert `RATCHET_BASELINES == {}` / "DRAINED to ∅". **Both are
stale** — BD.W-CUT re-populated 16 entries. The fix (a BG doc-reconcile, owed in the close-fix sweep or the BH
doc-redistribute, whichever owns CLAUDE.md last before its B4f delete):

- Replace the absolute "DRAINED to ∅ … close-state `RATCHET_BASELINES == {}`" with the ACCEPT-WITH-CLASSIFICATION
  doctrine: "BD.W-CUT re-populated the ratchet with legitimate capability-growth bookings; the close-state is
  `violations == []` AND every grandfathered row carries a `// BOOK(<wave>):` or `// IRREDUCIBLE(<reason>):` marker
  (machine-locked by `proof:no-god-module`'s disposition-marker guard). The genuinely-irreducible floor (one cohesive
  shader program / one ordered cascade-partial) is an ACCEPTED permanent ratchet residual, not a god module."
- **Caveat (P4 cross-ownership):** CLAUDE.md is HARD-DELETED at BH B4f. If this reconcile lands in CLAUDE.md, it must
  be re-homed to the no-god-module CANON home (`docs/precepts/` or the gate-header comment) BEFORE B4f, per P4's
  reader-census. The SAFEST home for this doctrine is the **gate-header comment in `proof-no-god-module.mjs` itself**
  (it survives B4f and is the authoritative single source) — update lines 14–21 of the gate header to the new
  close-state, and let CLAUDE.md's mention POINT at it rather than restate it.

---

## 8. FEASIBILITY VERDICT + risks

**FEASIBLE — high confidence.** Every load-bearing claim is verified on disk:
- The two carve seams (ladder 462–525 grain tail; shell 438–509 placement/region tail) are cohesive, tail-positioned
  (byte-isomorphic), and SOLE-writers of their registers (cascade-order-invariant).
- The reader gates use `readMonolith`/`readDockCss` (concatenation) → the carves are gate-transparent (zero gate edits
  beyond the §4 hardening + the two order-array registrations).
- The ratchet is NOT gate-enforced to ∅ → the drain-vs-accept decision is a doctrine + optional-hardening change, not
  a forced 16-file carve sprint.
- The Safari-ceiling ordering is already correct in the DAG; P5 confirms + couples it to P1's front-spike.

**Risks / open items handed off:**
1. **The §4 marker-gate's wave-resolution bite (bite #2)** needs the build-map wave-id set as its resolution source.
   If a BOOK names a wave that gets renamed/folded later, the gate reds — that is the intended discipline (the count +
   spec move together), but it adds a maintenance edge. Mitigation: resolve leniently (wave-id substring in the
   build-map OR a `docs/tranches/*/waves/` file), like `proof:disposition-live`.
2. **shell-regions byte-isomorphism is witnessed only by build-diff** (dock not in `CSS_MONOLITHS`). RECOMMENDED rider:
   add a `dock` entry to `CSS_MONOLITHS` mirroring `DOCK_PARTIAL_ORDER` so `assertMonolithImportOrder` gate-checks the
   dock import order too (closes the gap that the dock carve has no import-order gate).
3. **glass-fx.css (458) WS8 over-spill (§3c)** is a WS8-owned rider, not P5/P2 work — but if WS8 lands the bevel family
   without the in-diff carve, R1 re-opens mid-deep-band. Record §3c as a HARD precondition on
   `BG.W-GLASS-SUFFUSE-UNIVERSAL`.
4. **api/index.ts (#16)** disposition is entangled with BH B2.2 /api-fold — coordinate with P4's owner (it must drain,
   not be marked IRREDUCIBLE).
5. **The dock-saturate paint sign-off (3.6 silent regression)** is NOT this carve's concern — it rides P2. Flagged so
   the carve of shell.css is not mistaken for resolving it.

**passConvergencePct (this item): 80.** The carve mechanism, gate hardening, drain-vs-accept classification, and
ordering are fully specified + verified. The residual 20% is execution-coupled: the §4 wave-resolution bite's exact
resolution source, the glass-fx WS8 rider's timing, and the api/index.ts BH cross-ownership — all hand-offs with
named owners, none a re-think.
