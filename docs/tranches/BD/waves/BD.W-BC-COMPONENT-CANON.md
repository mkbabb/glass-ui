# BD.W-BC-COMPONENT-CANON — add the missing per-component/register canon for the shipped BC waves (each machine-locked by its VERIFIED proof gate)

- **Band:** 7 (CLAUDE.md coherence) · **Source dim:** CMD · Doc-only.
- **One-line goal:** Add the missing CLAUDE.md per-component/register canon for the shipped BC waves that have no note beyond a structure-ledger one-liner — SELECTION-CARD, GLASS-IDENTITY, DIALOG-GLASS, TABS-IOS, CODE-BLOCKS, GHOST-DASHED, SEPARATOR-FIX, RADIO-FIX, CONTROL-SMOOTH, PADDING-CANON — each tied to its REAL on-disk proof gate (the gate names VERIFIED, not invented).

---

## 1. Band + goal

The BC tranche shipped new components, registers, and born-RED gates (SELECTION-CARD is "the only NEW component of the Atlas set"; GLASS-IDENTITY is the warm-cream root restore; CODE-BLOCKS mints the Fira-Code register) — but most have no canonical home in CLAUDE.md beyond a structure one-liner. A future agent cannot discover them; a planner cannot trace their machine-lock. This wave adds the per-component notes, each machine-locked by its EXISTING shipped gate. The load-bearing discipline: **verify each gate name on disk before writing the canon** (the `proof:separator` caveat — do not invent a gate).

## 2. Starting state — the exact on-disk reality (VERIFIED by reading + grep)

**The 13 BC component wave docs all exist** (`ls docs/tranches/BC/waves/` verified): `BC.W-SELECTION-CARD.md`, `BC.W-GLASS-IDENTITY.md`, `BC.W-DIALOG-GLASS.md`, `BC.W-TABS-IOS.md`, `BC.W-CODE-BLOCKS.md`, `BC.W-GHOST-DASHED.md`, `BC.W-SEPARATOR-FIX.md`, `BC.W-RADIO-FIX.md`, `BC.W-CONTROL-SMOOTH.md`, `BC.W-PADDING-CANON.md` (+ DESHADCN/BUTTON-GLASS-IOS/METRIC-HOVER handled by sibling Band-7 waves).

**CLAUDE.md grep (verified):** `grep -in "code-block\|fira.code\|ghost-dashed\|selection-card\|glass-identity\|dialog-glass\|tabs-ios\|separator-fix\|radio-fix\|control-smooth" CLAUDE.md` returns ONLY :526 (`fira-code-math` — incidental, the calm-content-idiom note, NOT the BC.W-CODE-BLOCKS register). NO per-component canon for any of the 10. The `selection` Card variant is on disk (`Card.vue:81-83` ships `export type CardVariant = "selection"` — verified) but CLAUDE.md names only the `CardTier` type (the structure-ledger one-liner), never the `variant="selection"` register.

**The gate names — VERIFIED on disk (the load-bearing caveat):**

| BC wave | Gate the wave doc cites | Gate ACTUALLY on disk (package.json + scripts/) | Verdict |
|---|---|---|---|
| SELECTION-CARD | `proof:selection-card` | `proof:selection-card` (pkg:961, `scripts/proof-selection-card.mjs`) | ✓ MATCH |
| GLASS-IDENTITY | `proof:glass-identity` | `proof:glass-identity` (pkg:956, `scripts/proof-glass-identity.mjs`) | ✓ MATCH |
| DIALOG-GLASS | `proof:dialog-glass` | `proof:dialog-glass` (pkg:962, `scripts/proof-dialog-glass.mjs`) | ✓ MATCH |
| TABS-IOS | `proof:tabs-ios` | `proof:tabs-ios` (pkg:979, `scripts/proof-tabs-ios.mjs`) | ✓ MATCH |
| CODE-BLOCKS | `proof:code-blocks` | `proof:code-blocks` (pkg:1019, `scripts/proof-code-blocks.mjs`) | ✓ MATCH |
| GHOST-DASHED | `proof:ghost-dashed` | `proof:ghost-dashed` (pkg:1017, `scripts/proof-ghost-dashed.mjs`) | ✓ MATCH |
| **SEPARATOR-FIX** | `proof:separator` (the wave doc string) | **`proof:separator-fix`** (pkg:1020, `scripts/proof-separator-fix.mjs`) | ✗ **MISMATCH — cite `proof:separator-fix`** |
| RADIO-FIX | `proof:radio-fix` | `proof:radio-fix` (pkg:990, `scripts/proof-radio-fix.mjs`) | ✓ MATCH |
| CONTROL-SMOOTH | `proof:control-smooth` | `proof:control-smooth` (pkg:992, `scripts/proof-control-smooth.mjs`) | ✓ MATCH |
| **PADDING-CANON** | `proof:card-padding` (per the wave doc) | **`proof:card-padding`** (pkg:743, `scripts/proof-card-padding.mjs`); **`proof:padding-canon` does NOT exist** (verified absent) | ✓ cite `proof:card-padding` (BB.W-CARD-PAD's gate, which PADDING-CANON extends) |

**The two load-bearing corrections:** the SEPARATOR-FIX wave doc cites `proof:separator` but the real gate is **`proof:separator-fix`**; the PADDING-CANON canon must cite **`proof:card-padding`** (there is NO `proof:padding-canon` on disk — the wave extends the existing BB.W-CARD-PAD gate). These are EXACTLY the "do not invent a gate" caveat the CANDIDATE-WAVES.md names.

## 3. The build — precisely what changes

**Add ONE per-component/register canon note per BC wave** to CLAUDE.md, each in its natural home (beside the related existing note — the orchestrator picks exact placement; the clause TEXT + the VERIFIED gate name is the deliverable). Each note is a single dense paragraph (MEMORY no-grandiloquence), faithful to its wave doc, naming its REAL gate:

1. **`<Card variant="selection">` (BC.W-SELECTION-CARD)** — the ONE new component of the Atlas set. An additive default-OFF `variant="selection"` (default UNSET — a bare `<Card>` is byte-identical to HEAD; `Card.vue:81-83`). It binds `:data-variant="selection"` + ROUTES the chromatic-rim (`--glass-accent`, BB.W-GLASS-ACCENT) + the selected metal-shimmer (`.metal-*-border`, BB.W-METAL-SHIMMER) through the SHARED BUILT seams — mints NO new sub-system. ORTHOGONAL to `tier`/`surface`/`pressable` (a `variant="selection" surface="glass" tier="resting" pressable` card is valid). The hue is a CONSUMER value (`data-hue`/`data-hue-strength` per-instance — NO consumer hue enters a token; presets-in-consumers). The earned metal for a SELECTED card is gold (BA.W-PHASE-PALETTE "gold is earned"). Machine-locked by **`proof:selection-card`**.

2. **The warm-cream partial-transparency floor restored at root (BC.W-GLASS-IDENTITY)** — the grey-slab killed: the canonical translucent warm-cream glass material is the floor every component reads, restored at root (the HEAD defect: the floor read as a flat grey slab). It is the FLOOR the adaptive observer (BC.W-ADAPTIVE-RECONCILE) drives ABOVE + the AA bar (BC.W-GLASS-LEGIBILITY-MEASURED) measures on. Machine-locked by **`proof:glass-identity`** (+ `proof:glass-cal` + `proof:adaptive-glass-live`).

3. **The glass dialog reads as ACTUAL liquid glass (BC.W-DIALOG-GLASS)** — partially transparent, iOS-27: the dialog is a SPECIMEN of the rebuilt glass floor (it re-bases the ConfirmDialog opaque scaffold onto `<Dialog surface="glass">`, the BC.W-DESHADCN A2 finding). It inherits the rim→catch-light token fix (BC.W-BLACK-BAR) + the gated `contrast-color()` flip (BC.W-ADAPTIVE-RECONCILE). Machine-locked by **`proof:dialog-glass`** (+ `proof:no-shadcn-default` + `proof:binding-verification`).

4. **The iOS-27 glass tab DEFAULT + the value.js-pinned PILL variant (BC.W-TABS-IOS)** — the tab strip is the headline case of the de-shadcn `reka=behavior/glass-ui=100%-material` invariant. The pill reads warm glass over a live field (not grey); the indicator/track inherit the corrected directional rim (never the dark D2 hairline). **The SFC is MARKER-FENCED** by `proof:tabs-ios` T4 (`detectEngineFence` — a marker-presence + constant-band fence asserting `aria-pressed`/`aria-selected`/roving-tabindex/`onStripKeydown` markers + the squish-cap/release constants + the engine files, NOT a content-hash; `grep -cE 'createHash|content-hash|sha256' scripts/proof-tabs-ios.mjs` = 0). BD.W-ARIA-ORIENTATION-GUARD is the ONLY authorized SFC-touch; its one-attribute edit touches NONE of T4's checked markers, so T4 stays GREEN by construction — there is NO hash to re-snapshot. Machine-locked by **`proof:tabs-ios`** (+ `proof:no-shadcn-default`).

5. **Component names + technical values → ONE Fira-Code code-block register (BC.W-CODE-BLOCKS)** — the `<Code>` / `<CodeBlock>` demo-chassis primitives: every component name + technical value renders in the ONE Fira-Code register (a chrome refinement ON the standardized page). Machine-locked by **`proof:code-blocks`** (+ `proof:hierarchy` + `proof:suffuse`).

6. **The ONE ghost/empty-slot dashed register + rounded-everywhere (BC.W-GHOST-DASHED)** — the single ghost/dashed empty-slot register (consumed by `/compositions/empty-states` + the 6 ad-hoc placeholder sites) + the rounded-corner sweep, read against the rebuilt material. The WatercolorDot `ghost` variant is the seeded-blob-as-stroke empty affordance (already canon at the §Self-emission note). Machine-locked by **`proof:ghost-dashed`** (+ `proof:no-gray`).

7. **The Separator label-centering rebuilt (BC.W-SEPARATOR-FIX)** — the centered-label chip layout repair + the `/display/separator` page re-author on the rebuilt `<Card>` material. Separator stays on the legibility allowlist (the hairline + label-chip is legitimately opaque — the SANCTIONED survivor). Machine-locked by **`proof:separator-fix`** (THE VERIFIED gate name — NOT `proof:separator`, which does not exist) (+ `proof:no-gray`).

8. **Radios toggle on every input path + a clear glass selected-state (BC.W-RADIO-FIX)** — a binding bug fix: the radio toggles on every input path (click/keyboard) AND reads a clear glass selected-state. Machine-locked by **`proof:radio-fix`**.

9. **Kill the control lag — quick coupled response + square→rounded borders (BC.W-CONTROL-SMOOTH)** — the control CLOCK across every control: the quick coupled response (reading the re-timed spring register, not re-authoring springs — coordinates with BC.W-SPRING-EASE) + the square-border→rounded reskin (the toggle/tags-input/switch de-shadcn reskins land here, the BC.W-DESHADCN census verdicts). Machine-locked by **`proof:control-smooth`** (+ `proof:animation-coherence` + `proof:no-layout-animation`).

10. **The golden padding ladder MADE TO PAINT (BC.W-PADDING-CANON)** — the BB.W-CARD-PAD φ-derived ladder made to actually paint on every `/display/card` card + the dialog padding (the overlay PADDING ladder, coordinating with BC.W-DIALOG-GLASS on `DialogContent.vue`). Machine-locked by **`proof:card-padding`** (THE VERIFIED gate — the BB.W-CARD-PAD gate this wave extends; there is NO `proof:padding-canon` on disk).

Each note is faithful to its wave doc — no invented detail, no embellishment.

## 4. The gate — the existing shipped locks (no new gate)

This wave mints NO gate — it CANONIZES 10 existing ones. Each note NAMES its REAL gate (the verified names in §2's table), so each doc principle is load-bearing (the Q-chron-3 discipline: the gates already exist + are shipped; the canon is sufficient on landing). The two corrections (`proof:separator-fix` not `proof:separator`; `proof:card-padding` not `proof:padding-canon`) are the load-bearing precision — a canon citing a non-existent gate is WORSE than no canon (it sends a planner to a dead gate name).

The OPTIONAL reinforcement: a thin grep-presence clause (mirroring `proof:claude-structure-sync`'s prose arm) asserting each per-component canon names a gate that resolves to a real `package.json` script — this would catch a future canon citing an invented gate. Born-RED on HEAD (the notes absent), GREEN after the build. OPTIONAL; the canon's primary lock is the 10 shipped gates.

## 5. Paint verification — the device-free assertion (no paint)

DOC-only — **zero pixels** (BB inv-4: no `proof:ba-gestalt` verdict; the canon records already-shipped + already-paint-verified BC waves). The verification:

- **The gate-name-resolves assertion (the load-bearing check):** every gate named in the 10 notes resolves to a real `package.json` script + a real `scripts/proof-*.mjs` file. A reviewer re-runs `grep -n "proof:<name>" package.json` for each — all 10 resolve (the two corrected names included). NO invented gate.
- **The grep-presence assertion:** after the build, `grep -in "selection-card\|glass-identity\|dialog-glass\|tabs-ios\|code-blocks\|ghost-dashed\|separator-fix\|radio-fix\|control-smooth\|card-padding" CLAUDE.md` returns the 10 new notes (empty/incidental-only at HEAD — the born-RED state).
- **The faithfulness check:** each note traces to its BC wave doc's headline + gate — a reviewer cross-reads and finds no invented or drifted detail.

The BC anti-disease law is satisfied: a canon wave's "paint" is the per-component discoverability + the machine-lock binding, checkable device-free — each underlying component (the actual paint) already landed + was paint-verified in its owning BC band wave (each carries its own `tests-visual/*.spec.ts` + `proof:ba-gestalt` verdict from BC).

## 6. Fences + risks

- **VERIFY EVERY GATE NAME ON DISK (the cardinal fence).** The two corrections — `proof:separator-fix` (NOT `proof:separator`) and `proof:card-padding` (NOT `proof:padding-canon`) — are VERIFIED in §2. Any other gate name the canon cites MUST resolve to a real `package.json` script. A canon that invents a gate name is the disease this wave's caution exists to prevent.
- **FAITHFUL to the BC wave docs.** Every per-component fact traces to its wave doc — no embellishment, no scope-creep beyond what BC shipped (MEMORY no-editorializing).
- **Card variant="selection" is ADDITIVE default-OFF.** The canon states a bare `<Card>` is byte-identical to HEAD; the variant is the opt-in. Do NOT mis-state it as a default behavior.
- **The hue is a CONSUMER value.** The selection-card note states the hue is per-instance (`data-hue`), NEVER a library token (presets-in-consumers, the ppmycota fence). Do NOT imply a library accent hue.
- **No double-owning the per-band paint.** These are CANON notes for shipped waves — the actual paint + the `proof:ba-gestalt` verdicts already landed in BC. This wave does NOT re-earn a paint verdict (BB inv-4: a doc wave changes zero paint).
- **TABS-IOS marker-fence cross-reference (NOT a content-hash).** The TABS-IOS note records the `proof:tabs-ios` T4 SFC marker-fence (a marker-presence + constant-band fence — `detectEngineFence`, NOT a content-hash; grep `createHash` in `scripts/proof-tabs-ios.mjs` = 0). The cross-coupling is that BD.W-ARIA-ORIENTATION-GUARD's one-attribute edit touches NONE of T4's checked markers, so T4 stays GREEN by construction — there is NO hash to re-snapshot and the orchestrator must NOT introduce a phantom hash re-snapshot step (the SEED §2 / FOLD-LEDGER:57 / ARIA-GUARD:122 reconcile). Keep this cross-reference accurate — a "content-hash re-snapshot in lockstep" assertion is the phantom the rest of the corpus refutes.
- **No-silent-drop (CMD Class H).** This discharges FOLD-LEDGER Class H row 4 ("BC per-component canon … each machine-locked by its existing proof gate"). The 77-of-96 unmentioned BC waves (Class H row 7) stay HELD-no-op (the legitimate no-ops carry no new canon — terminal, not re-booked).
