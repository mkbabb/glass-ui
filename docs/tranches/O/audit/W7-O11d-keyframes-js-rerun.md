# O.W7 — O11/d keyframes.js consumer re-audit (post-O close-lane re-run)

## Preamble

**Scope:** `/Users/mkbabb/Programming/keyframes.js/` @ `7561af3` on `master` (v2.1.0 — AB.W6 settle release). Working tree CLEAN; no commits since the O11/d baseline (`docs/tranches/O/audit/O11-Lane-d-keyframes-js.md`, 2026-05-14 morning).

**Glass-ui reference:** `/Users/mkbabb/Programming/glass-ui/` @ O.W7 close-lane (post-W6 — `scale-on-hover` utility landed; HeaderRibbon promotion landed).

**Baseline:** O11/d (this morning). All five sub-questions in the W7 dispatch are post-O re-verifications, not new-question discoveries.

**Mission:** Verify post-O substrate non-regression + adoption opportunities for the W6-landed promotions (`scale-on-hover` utility; HeaderRibbon canonical) + carry-forward integrity for the carry-bound items (84 % scaffolding; idle-bob ad-hoc).

**Method:** READ-ONLY walk + diff. No mutations. HARD CAP 20 min.

---

## Section 1 — Per-finding disposition

### 1.1 `hover:scale-105` count + scale-on-hover utility adoption (W6 Lane C carryforward)

**Sites at HEAD:** 13 (UNCHANGED from O11/d baseline). Same file-level distribution; same per-file counts.

```
demo/@/components/custom/editor-shell/SharePopover.vue                          1
demo/@/components/custom/editor-shell/EditorShell.vue                           1
demo/@/components/custom/editor-shell/EditorHeader.vue                          1
demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue       1
demo/@/components/custom/animation-controls/keyframes/KeyframeCard.vue          1
demo/@/components/custom/animation-controls/keyframes/KeyframesEditor.vue       3
demo/@/components/custom/animation-controls/controls/TimingFunctionPanel.vue    1
demo/cube/App.vue                                                               2
demo/app/App.vue                                                                1
demo/app/scenes/CubeScene.vue                                                   1
TOTAL                                                                           13
```

**Glass-ui canonical at HEAD:** `@utility scale-on-hover` lives at `src/styles/utilities.css` (W6 Lane C land — confirmed):

```css
@utility scale-on-hover {
    @apply transition-transform duration-fast ease-standard;

    &:hover {
        transform: scale(var(--scale-hover));
    }
}
```

**Adoption count in keyframes.js at HEAD:** **0** (`rg "scale-on-hover" demo/` → 0 hits).

**Disposition:** **CARRY-FORWARD TO P** as a consumer-side migration opportunity. The utility ships in `@mkbabb/glass-ui/styles` (CSS bundle); keyframes.js already imports the styles bundle, so adoption is a pure class-rename:

```diff
- <button class="hover:scale-105 transition-transform">
+ <button class="scale-on-hover">
```

10 files / 13 sites; 0 import-rewrites required (CSS-only). Cohort with the AB-pattern (animation timing) tier of keyframes.js's next orchestrator wave.

### 1.2 84 % UI-scaffolding overfitting (consumer-owned)

**Re-verification at HEAD:** `demo/@/components/ui/` = **25 dirs** (UNCHANGED from O11/d). Same distribution:

- 20 strict-zero external consumers
- 1 marginal (`calendar`)
- 4 active-consumed (`button`, `form`, `chart`, `label`)

Per CONSTELLATION.md §6: keyframes.js orchestrates its own tranche stream — glass-ui is READER-ONLY. **No glass-ui-side action required or available.** Gate is consumer-orchestrator-blocked; remains so at O close.

**Disposition:** **CARRY-FORWARD TO P** (consumer-owned). Glass-ui's role is unchanged at O close — reader, not actor. The O11/d Section 3.2 light-weight precept proposal (L2 — "shadcn-vue init scaffolding hygiene") is unlanded at O close; carry the precept-tier proposal to P.

### 1.3 idle-bob ad-hoc disposition

**Site at HEAD:** `demo/cube/CubeTarget.vue:139-146` — UNCHANGED.

```css
.idle-hover {
    animation: idle-bob 3s var(--ease-standard) infinite alternate;
}
@keyframes idle-bob {
    0% { transform: translateY(0); }
    100% { transform: translateY(5px); }
}
```

**Glass-ui canon search at HEAD:** `rg "idle-bob|@keyframes idle" src/styles/` → 0 hits. Pattern not graduated.

**Disposition:** **STILL AD-HOC.** Single-consumer (1 site), 2-stop, fixed 5px translate. Does NOT clear J invariant 10's ≥ 2-consumer bar. No glass-ui-side action; carry-forward unchanged from O11/d Section 2.

Documented carry-forward path (per O11/d): wraps under N7 `@motion-gate` / `.motion-safe` proposal alongside the 2 other raw ungated keyframes (`liftDown`, `dotFade` in `AnimatedText.vue`). All three are token-tier `prefers-reduced-motion` candidates, not animation-canon candidates.

### 1.4 HeaderRibbon adoption (W6 Lane A)

**glass-ui canonical at HEAD:**
- Path: `src/components/custom/header-ribbon/HeaderRibbon.vue` (155 LOC) + `types.ts` (10 LOC) + `index.ts` (2 LOC) = 167 LOC.
- Subpath: `@mkbabb/glass-ui/header-ribbon` (verified in `package.json` exports).
- /api surface: `HeaderRibbonProps`, `HeaderRibbonPosition` types (verified — surface 49 → 53).

**keyframes.js fork at HEAD:**
- Path: `demo/@/components/custom/header-ribbon/HeaderRibbon.vue` (152 LOC) + `index.ts` (1 LOC).
- Consumed by `demo/@/components/custom/editor-shell/EditorShell.vue:70` (1 import site).

**Fork-vs-canonical divergence (diff probe):**
- Behavioral parity: yes — both implement the same mouseenter/mouseleave + hover-guard + pinned/toggled anchor state machine. The "isMouseOver hover-tracking guard" is explicitly labeled in glass-ui's canonical as "the keyframes.js refinement" — confirming the upstream promotion landed the keyframes.js variant verbatim.
- Surface differences (cosmetic):
  - Template: `z-dock` (fork) vs `z-[var(--z-dock)]` (canonical) — semantic identical, canonical uses arbitrary-value form for explicitness.
  - `<slot name="..."></slot>` (fork) vs `<slot name="..." />` (canonical) — Vue self-closing canonicalization.
  - Inline anonymous prop type (fork) vs `HeaderRibbonProps` import from `./types` (canonical) — extracted type module.
  - `function clearHoverTimeout()` (fork) vs `function clearHoverTimeout(): void` (canonical) — explicit return type.

**Migration path (1 file, 1 import-rewrite):**

```diff
- import { HeaderRibbon } from "@components/custom/header-ribbon";
+ import { HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon";
+ // optionally: import type { HeaderRibbonProps, HeaderRibbonPosition } from "@mkbabb/glass-ui/api";
```

Then `rm -r demo/@/components/custom/header-ribbon/` (153 LOC reduction).

**Disposition:** **HIGH-VALUE ADOPTION OPPORTUNITY for P.** The promotion is glass-ui-ready; the consumer hasn't migrated yet. 1 import-rewrite + 1 dir delete. Cohort with the `scale-on-hover` adoption (same migration wave; same EditorShell.vue file even — both touch `editor-shell/` and have 1 site each in `EditorShell.vue`).

### 1.5 Renames audit (avatarVariants + installDarkModeSync)

**Verification:** `rg "avatarVariants|installDarkModeSync" demo/` → **0 hits**.

**Disposition:** **NO BREAKAGE.** Neither renamed symbol is on keyframes.js's import surface. The W4 Lane B avatarVariants rename + the install*DarkModeSync rename (if/wherever it landed) are NO-IMPACT on this consumer.

---

## Section 2 — Substrate non-regression

**Subpath consumption at HEAD** (verified via `rg "from \"@mkbabb/glass-ui" demo/`):

```
"@mkbabb/glass-ui"                  ← root barrel (vueuse-FREE curated)
"@mkbabb/glass-ui/controls"         ← DarkModeToggle
"@mkbabb/glass-ui/dark"             ← useGlobalDark
"@mkbabb/glass-ui/dock"             ← GlassDock, DockLayer, DockLayerGroup, DockIconButton, DockSelectTrigger
"@mkbabb/glass-ui/forms"            ← Input, Textarea
"@mkbabb/glass-ui/icon-tooltip"     ← IconTooltip
"@mkbabb/glass-ui/keyboard"         ← registerShortcut, useRegisteredShortcuts, formatComboParts
"@mkbabb/glass-ui/labeled-field"    ← LabeledInput/Select/Slider/Switch
```

8 canonical subpaths; **zero retired-subpath drift** (`rg "composables/dark|composables/keyboard|/virtual\b|/pagination\b" demo/` → 0 hits).

**O.W2 dock typed-context refactor impact:** `rg "DockContextKey|injectDockContext|provideDockContext" demo/` → 0 hits. keyframes.js consumes the public `GlassDock` / `DockLayer` / `DockLayerGroup` / `DockIconButton` / `DockSelectTrigger` API surface only — BINARY-TRANSPARENT to the internal DI canonicalization. **Zero regression.**

**O.W3 god-module-split impact:** keyframes.js does not consume the W3-split modules directly (timeline-split, profile-aurora-harness, preset-editor — all are glass-ui-internal). **Zero regression.**

**O.W4 /api expansion impact:** keyframes.js does not consume `@mkbabb/glass-ui/api` at HEAD. The /api surface is opt-in; adoption opportunity (e.g., `HeaderRibbonProps` typing) carries forward to P.

**O.W6 substrate-promotion impact:** none of `useClipboard` / `HeaderRibbon` / `scale-on-hover` / `dock-token-ladder` are consumed at HEAD. All four are adoption opportunities, not regression risks.

**Substrate non-regression verdict: CLEAN.** Zero retired-subpath drift; zero broken imports from renames; zero internal-DI leakage. 100 % subpath migration health.

---

## Section 3 — Adoption opportunities

Ranked by leverage (LOC reduction × site count × cohesion):

### 3.1 HIGH — HeaderRibbon canonical adoption

- **Glass-ui readiness:** LANDED at W6 Lane A. Canonical subpath + /api types live.
- **Migration cost:** 1 import-rewrite + 1 dir delete (153 LOC removed from keyframes.js).
- **Cohesion:** the canonical is the keyframes.js variant verbatim with surface polish (typed import, self-closing slots, explicit return types). Risk near zero.
- **Recommended cohort:** P-tier consumer adoption wave (keyframes.js orchestrator).

### 3.2 HIGH — `scale-on-hover` utility adoption

- **Glass-ui readiness:** LANDED at W6 Lane C. CSS-only; ships in `@mkbabb/glass-ui/styles` bundle which keyframes.js already imports.
- **Migration cost:** 10 files / 13 class-rename edits. 0 JS / import changes.
- **Cohesion:** every site already wraps the scaled element in `transition-transform`; the utility canonicalizes the recipe. Some sites use compound state (`hover:scale-105 active:scale-95`) — those need finer-grained selection or token-level migration (per O11/d Section 4 + O-N-7 carry-forward).
- **Recommended cohort:** Same P-tier wave as 3.1 (HeaderRibbon).

### 3.3 MEDIUM — /api type adoption

- **Glass-ui readiness:** LANDED at W4 + W6 (49 → 53 surface). Opt-in.
- **Migration cost:** light — adds `import type { HeaderRibbonProps } from "@mkbabb/glass-ui/api"` after 3.1 lands; benefits IDE inference + future-proofing if HeaderRibbon evolves.
- **Recommended cohort:** Follow-on after 3.1 (same wave).

### 3.4 LOW — 84 % UI-scaffolding cleanup

- **Glass-ui readiness:** N/A (consumer-owned per CONSTELLATION.md §6).
- **Migration cost:** 23-path `rm -r` + 0 import-rewrites required (per O11/d §3.3 import-graph proof).
- **Recommended cohort:** keyframes.js orchestrator wave; light-weight precept candidate (L2 carry-forward) for the constellation.

### 3.5 LOW — idle-bob `prefers-reduced-motion` gating

- **Glass-ui readiness:** unlanded (N7 token-tier utility proposal carry-forward).
- **Migration cost:** dependent on N7 shape; either consumer-local `@media (prefers-reduced-motion: reduce)` wrap, or glass-ui `@utility motion-safe` adoption once landed.
- **Recommended cohort:** P-tier token-tier wave.

---

## Section 4 — Verdict

**CLEAN.**

- All five W7 dispatch sub-questions verified at HEAD; no new findings beyond O11/d.
- Subpath migration health 100 %; zero retired-subpath drift; renames NO-IMPACT.
- O-tranche substrate refactors (W2 dock-DI / W3 god-module-splits / W4 /api expansion / W6 four promotions) are all BINARY-TRANSPARENT or NO-IMPACT to keyframes.js.
- Two HIGH-leverage adoption opportunities (HeaderRibbon + `scale-on-hover`) ready for P-tier consumer wave; both glass-ui-LANDED, awaiting consumer-orchestrator dispatch.
- Carry-bound items (84 % scaffolding; idle-bob; `hover:scale-105` regression) unchanged in shape; all consumer-owned or token-tier-deferred per established disposition.

No BLOCKER; no MINOR. Substrate is clean across the close-lane window. Adoption opportunities documented for P.

---

## Section 5 — Carry-forward to P (per-item named destination)

| Item | Disposition | Destination |
|---|---|---|
| HeaderRibbon canonical adoption | HIGH adoption opportunity; glass-ui-LANDED | P-tier consumer adoption wave (keyframes.js orchestrator); cohort with 3.2 |
| `scale-on-hover` utility adoption | HIGH adoption opportunity; glass-ui-LANDED | P-tier consumer adoption wave; cohort with 3.1 |
| /api type adoption | MEDIUM follow-on; opt-in | Same wave, post-3.1 |
| 84 % UI-scaffolding cleanup | LOW; consumer-owned | keyframes.js orchestrator wave; L2 precept proposal carry-forward |
| `hover:scale-105` 13-site regression | LOW; resolves via 3.2 adoption | Subsumed into `scale-on-hover` adoption |
| idle-bob `prefers-reduced-motion` gating | LOW; token-tier deferred | P-tier token-tier wave (N7 + L3 cohort) |
| L2 precept "shadcn-vue init scaffolding hygiene" | UNLANDED at O close | P-tier precept-tier wave |
| N6 Button focus-ring slot-class prop | UNLANDED at O close | P-tier token-tier wave |
| N7 `.motion-safe` / `@motion-gate` utility | UNLANDED at O close | P-tier token-tier wave |

---

**Audit signature:** O.W7 O11/d re-run — CLEAN. 13 hover:scale-105 sites unchanged; 25 ui dirs (84 % overfitting) unchanged; idle-bob ad-hoc unchanged; HeaderRibbon fork (152 LOC) unchanged; avatarVariants + installDarkModeSync renames NO-IMPACT (zero usage). Two HIGH-leverage P-tier adoption opportunities cataloged: (1) HeaderRibbon canonical (153 LOC reduction; 1 import-rewrite), (2) scale-on-hover utility (10 files / 13 class-rename edits; 0 JS changes). Substrate non-regression CLEAN; O-tranche refactors BINARY-TRANSPARENT to keyframes.js.
