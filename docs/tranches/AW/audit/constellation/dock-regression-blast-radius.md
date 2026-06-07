# dock-regression-blast-radius — 6 own-collapse dock instances across 4 repos are exposed; keyframes (^3.3.0) + value.js (local symlink) are LIVE-BROKEN today; the other 4 are safe on their current ^3.0/^3.1 pin and MUST hold until 3.4.0

## The regression, precisely (what is and is NOT exposed)

AV.W9 (`99a1108` — "W9 dock-rebuild") retired the AU.W8b dual-driver, fixed the `DockLayerGroup` layer-switch, and **broke the GlassDock OWN simple two-layer collapse**: the `summary`↔`full` (default + `#collapsed`) outer pair toggles state to expanded but the **width does not morph** — stuck at collapsed width. Shipped in npm 3.3.0. AW.W1 is the fix (→ 3.4.0). Verified against the AW plan: `docs/tranches/AW/AW.md:36` (D-1 row), `:70-75` (the regression narrative), `:142` (the AW.W1 gate samples "the GlassDock OWN collapse↔expand width morph (the `summary`↔`full` outer pair, **NO DockLayerGroup**)").

Mode → verdict mapping (the discriminator for every instance below):
- **simple two-layer collapse** (`start-collapsed`/`manual`/`collapse-delay`, a `#collapsed` slot, `always-expanded` falsy, no own-morph suppression) = **BROKEN in 3.3.0**.
- **`always-expanded`** (truthy) = **FINE** — the dock never runs the own-collapse morph.
- **`DockLayerGroup` layer-switch** = **FINE** — that path is the AV.W9 fix. BUT a DockLayerGroup INSIDE a dock that *also* collapses does NOT immunize the OUTER collapse (the regression is on the outer summary↔full pair, orthogonal to the inner layer swap).
- **vertical rail** = FINE (none found in the constellation).

## AW.W1 fix is NOT yet implemented at HEAD

HEAD is `afdc485` (AV close). No AW.W1 commit exists (`git log --oneline -15` shows AV waves only; the last dock touch is `99a1108`, the regression-introducing rebuild). There is no `docs/tranches/AW/PROGRESS.md`. The gate SCRIPT `scripts/proof-dock-animation-live.mjs` exists (authored Jun 6, registered at `package.json:551`) but the FIX is unimplemented — so the local glass-ui tree is **still broken**. Consequence: value.js, which symlinks the local repo, is broken NOW (not just on a future npm bump).

## Findings (per-repo blast radius)

### 1. fourier-analysis (web/) — pin `^3.1.0`, installed 3.1.0 — SAFE TODAY, 3 exposed docks on bump
Pin `web/package.json:14` `"@mkbabb/glass-ui": "^3.1.0"`; installed `node_modules/@mkbabb/glass-ui/package.json` = 3.1.0 (no symlink). Three GlassDock instances, **all simple two-layer collapse, all exposed**:
- `web/src/components/visualization/AnimationControls.vue:58` — `:collapse-delay="2000" :start-collapsed="true"`, `#collapsed` slot at `:65`, no `always-expanded`, no DockLayerGroup. EXPOSED.
- `web/src/components/visualization/CanvasControlsDock.vue:41` — `fit-content :start-collapsed="true"`, no `always-expanded`. EXPOSED.
- `web/src/components/visualization/EditorControlsDock.vue:56` — `:collapse-delay="2000" :start-collapsed="true" fit-content`, `#collapsed` slot at `:58`. EXPOSED.
Because the pin is `^3.1.0` and 3.1.0 is installed, fourier is NOT broken today. The hazard is a future `^3.x` resolve that floats to 3.3.0 (lockfile/`npm update`) — that would break all three.

### 2. value.js (demo) — `file:../glass-ui` symlink — LIVE-BROKEN ON DESKTOP TODAY
Pin `package.json:69` `"@mkbabb/glass-ui": "file:../glass-ui"`; `node_modules/@mkbabb/glass-ui` is a symlink → `../../../glass-ui` (the local repo on branch `at-dock-convergence`, which has NOT landed AW.W1). So value.js consumes the broken tree NOW.
- `demo/@/components/custom/dock/Dock.vue:93` — `:collapse-delay="5000" :start-collapsed="isDesktop" :fit-content="true" :always-expanded="!isDesktop"`, wraps a `DockLayerGroup` (`:94`) and HAS a `#collapsed` slot (`:197`). `isDesktop = useMediaQuery("(min-width: 1024px)")` (`:66`). On **desktop**: `always-expanded=false`, `start-collapsed=true` → the dock runs its OWN collapse → EXPOSED. On mobile: `always-expanded=true` → FINE. The inner DockLayerGroup does not save the outer collapse.
- `demo/@/components/custom/panes/ConfigSliderPane.vue:131` — `<GlassDock :always-expanded="true" :fit-content="true">`. FINE (never morphs).
- All other value.js dock imports are leaf controls (`DockIconButton`, `DockDropdownTrigger`, `DockSelectTrigger`, `useOptionalDockContext`) — no own-collapse surface.

### 3. keyframes.js (demo) — pin `^3.3.0`, installed 3.3.0 — LIVE-BROKEN ON DESKTOP TODAY
Pin `package.json:89` `"@mkbabb/glass-ui": "^3.3.0"`; installed 3.3.0 (npm, no symlink) → **already on the broken version**.
- `demo/@/components/custom/dock/TopDock.vue:118` — `:collapse-delay="2500" :start-collapsed="true" :fit-content="true" :always-expanded="isMobile"`, wraps `DockLayerGroup` (`:119`), `#collapsed` slot at `:213`. `isMobile = useMediaQuery("(max-width: 1023px)")` (`:65`). On **desktop** (`isMobile=false`): the dock runs its OWN collapse → EXPOSED/BROKEN NOW. On mobile: `always-expanded` → FINE.
- `demo/@/components/custom/animation-controls/AnimationMenuBar.vue:17` — `:always-expanded="true" :fit-content="true"`. FINE.
- Other keyframes dock imports are leaf controls (`DockDropdownTrigger`, `DockSelectTrigger`, `DockIconButton`).

### 4. speedtest (src/) — pin `^3.1.0`, installed 3.1.0 — FULLY SAFE (no exposed instance)
Pin `package.json:88` `"@mkbabb/glass-ui": "^3.1.0"`; installed 3.1.0. Two GlassDock instances, **neither exposed**:
- `src/components/Dock.vue:166` — `:always-expanded="true"` (`:171`) AND wraps a `DockLayerGroup` (`:196`). Doubly fine: always-expanded suppresses own-collapse; the inner layer-switch is the AV.W9 fix.
- `src/components/survey/SurveyResultDock.vue:28` — `always-expanded` (`:32`). FINE.
speedtest is the heaviest dock consumer yet is the ONLY repo with zero own-collapse exposure — a bump to 3.4.0 is unconditionally safe for the dock surface (and even 3.3.0 would not have hit this regression). Other dock imports are leaf controls (`DockIconButton` in `AppSettingsButton.vue`).

### 5. muster (frontend/) — pin `^3.1.0`, installed 3.1.0 — SAFE TODAY, 1 exposed dock on bump
Pin `frontend/package.json:19` `"@mkbabb/glass-ui": "^3.1.0"`; installed 3.1.0.
- `frontend/src/components/dock/CommandDock.vue:118` — `variant="dock" position="fixed" :start-collapsed="true" :collapse-delay="2500"`, `#collapsed` slot at `:129`, no `always-expanded`, no DockLayerGroup. **Simple two-layer collapse → EXPOSED.** The docstring (`:12-14`) confirms the corrected `variant="dock"` DOES render `#collapsed` (vs the rejected `variant="instrument-strip"` which forces alwaysExpanded). The `#collapsed` "verdict-at-a-glance" pill is "the dock's whole reason for existing" (`:7-8`) — the collapse morph is core UX here, so the regression is squarely felt. NOT broken today (3.1.0); hazard is a `^3.3.0` bump.

### 6. words (frontend/) — pin `^3.0.0`, glass-ui not installed — SAFE TODAY, 1 exposed dock on install+bump
Pin `frontend/package.json:19` `"@mkbabb/glass-ui": "^3.0.0"`; `node_modules/@mkbabb/glass-ui` is not present/resolvable (no version line). Two SFCs mount docks:
- `frontend/src/components/custom/definition/components/ThemeSelector.vue:6` — `<GlassDock ref="dockRef" manual :start-collapsed="!editModeEnabled">`, `#collapsed` slot at `:8`, no `always-expanded`, no DockLayerGroup. **Simple two-layer collapse → EXPOSED.** Note: admin-gated (`v-if="isMounted && isAdmin"`, `:3`) — narrow audience, but the dock IS the edit-mode affordance.
- `frontend/src/components/custom/wordlist/views/WordListView.vue:22` + `:109` — both `<GlassDock always-expanded …>`. FINE.
words floats `^3.0.0`, so an `npm install` today could resolve to 3.3.0 and break ThemeSelector. Lowest blast radius (one admin-only dock).

## Wave-forming input (sequencing edges for every adoption wave)

- **The 3.4.0 publish (AW.W1 fix) GATES every dock-mounting consumer's bump.** No consumer that mounts an own-collapse dock may move to `^3.3.0`; the consume path is 3.4.0. Exposed instances: fourier ×3, value.js ×1 (desktop), keyframes ×1 (desktop), muster ×1, words ×1 = **6 own-collapse instances across 4 repos**.
- **LIVE-BROKEN now (fix on first opportunity, do NOT wait for a tagged bump):**
  - keyframes.js — pinned `^3.3.0`, on the broken npm build → TopDock desktop collapse is broken in the live demo TODAY. Either downpin to `~3.1.0` until 3.4.0, or accept the desktop-collapse defect until the 3.4.0 bump.
  - value.js — `file:../glass-ui` symlink → consumes the local repo, which has NOT landed AW.W1 → Dock.vue desktop collapse is broken whenever the local glass-ui is built at HEAD. **A `npm run build` of glass-ui after AW.W1 lands fixes value.js automatically (no pin edit).** This makes value.js the natural 3.4.0 dogfood site — its symlink picks up the fix the instant AW.W1 is committed+built.
- **SAFE-TODAY, bump-gated (hold the pin):** fourier (^3.1.0), speedtest (^3.1.0), muster (^3.1.0), words (^3.0.0) all run a non-broken installed build. Action for the adoption-wave writer: do NOT bump these to 3.3.x; sequence any glass-ui bump for fourier/muster/words onto **≥ 3.4.0** (speedtest may bump freely — no dock exposure). For any caret-pinned repo, ALSO note the silent-float hazard: a stray `npm update`/lockfile regen during the 3.3.0 window resolves the caret to the broken 3.3.0; pin-pin to `3.1.0` or skip straight to `3.4.0`.
- **The conditional-`always-expanded` trap (gate-design input for AW.W1):** value.js Dock + keyframes TopDock are the subtle cases — a DockLayerGroup inside a dock that ALSO collapses, with `always-expanded` flipped by viewport. They are FINE on mobile (always-expanded) and BROKEN on desktop (own-collapse). The AW.W1 `proof:dock-animation-live` gate already samples the outer pair with "NO DockLayerGroup" (`AW.md:142`); these two consumers prove that's the right frame — a layer-group child must not be allowed to mask the outer-collapse regression. Recommend the gate also assert the outer morph **with a DockLayerGroup present** (the value.js/keyframes shape) as a second sample, since that is the live constellation pattern, not just the bare summary↔full.
- **Cross-doc sequencing:** this verdict is the upstream edge for the value.js-demo dock adoption named in `docs/tranches/AV/UNION-COORDINATION.md` and the keyframes-demo `/keyboard` adoption — both demos already mount exposed docks, so their adoption waves cannot land their dock-touching scope until 3.4.0 (value.js auto-fixes via symlink; keyframes needs the bump).

## Anti-findings (verified FINE / no action)

- **speedtest** has zero own-collapse exposure despite being the heaviest dock consumer — `Dock.vue` is always-expanded + DockLayerGroup, `SurveyResultDock` is always-expanded. Verified `Dock.vue:171,196` and `SurveyResultDock.vue:32`. No bump-gating needed for speedtest's dock surface.
- **All `always-expanded` instances** are correctly immune (they never invoke the broken own-collapse morph): value.js ConfigSliderPane `:131`, keyframes AnimationMenuBar `:17`, words WordListView `:22`+`:109`, speedtest both. Confirmed by reading each tag.
- **DockLayerGroup layer-switch itself is FINE** (it is the AV.W9 fix). The 3 DockLayerGroup consumers (value.js Dock, keyframes TopDock, speedtest Dock) get correct layer-swap behavior; only their OUTER collapse (where present + not always-expanded) is at issue.
- **Leaf dock controls carry zero exposure** — every `DockIconButton`/`DockTabButton`/`DockSelectTrigger`/`DockDropdownTrigger`/`useOptionalDockContext` import (the bulk of the grep hits, esp. across value.js's color-tool SFCs and speedtest AppSettingsButton) is a child control, not an own-collapse surface. They render identically on 3.3.0 and 3.4.0.
- **No vertical-rail dock** anywhere in the constellation (the vertical orientation path is also unaffected by this regression regardless).

## Summary

The 3.3.0 GlassDock simple-collapse regression exposes **6 own-collapse dock instances across 4 of 6 repos**: fourier ×3 (AnimationControls/CanvasControlsDock/EditorControlsDock), value.js ×1 (Dock.vue, desktop only), keyframes ×1 (TopDock, desktop only), muster ×1 (CommandDock), words ×1 (ThemeSelector). speedtest and the words WordListView docks are FINE (always-expanded / DockLayerGroup). LIVE-BROKEN TODAY: keyframes (pinned ^3.3.0, on the broken npm build) and value.js (file:../glass-ui symlink to the local repo, which has not landed AW.W1). SAFE-TODAY-but-bump-gated: fourier/speedtest/muster (^3.1.0, installed 3.1.0) and words (^3.0.0, not installed). The consume path for every dock-mounting consumer is **3.4.0** — no own-collapse consumer may move to ^3.3.0. value.js is the natural 3.4.0 dogfood site (its symlink auto-fixes the instant AW.W1 is committed+built). The conditional-always-expanded shape (value.js/keyframes: DockLayerGroup inside a viewport-collapsing dock) is the subtle case and argues the AW.W1 gate should sample the outer morph WITH a layer-group child present, not just the bare summary↔full pair. AW.W1 is unimplemented at HEAD (afdc485); the gate script exists but the fix does not.

Digest path: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/constellation/dock-regression-blast-radius.md
