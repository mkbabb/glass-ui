# Q.Rα — Consumer-breakage forensics (HEADLINE round-1 lane)

**Lane**: Q.Rα — consumer functional-regression attribution.
**Date**: 2026-05-18.
**Mode**: READ-ONLY audit. No source mutations; no mutating git in any repo. (One non-source side-effect noted in §2.1 — a consumer *build* was run per the dispatch's explicit allowance, which rebuilt `value.js/dist/`.)
**Verdict summary**: the user's "totally broken" report is REAL and reproduced. Two distinct root causes, neither is a glass-ui post-P substrate regression.

---

## §1 Scope

The user reports value.js + keyframes.js have "totally broken" surfaces — **dock items, animations, dropdowns, glass-cards**. This lane reproduces the breakage, attributes each surface to a concrete cause, and classifies it (a) P.W5 cross-repo write error / (b) post-P shadow-cohort substrate regression / (c) un-migrated glass-ui v1.8.x change / (d) pre-existing.

Repos walked:
- glass-ui `@ HEAD d244dd5` (v1.8.5 — note: `package.json` says `1.8.5`, the post-P `beec35e` patch-bumped it; the dispatch's "v1.8.4" is the P-close tag, HEAD is one patch beyond).
- value.js `@ 70e61e9` on branch `w.w2.1-value-js-prebuild` (P.W5's `755b3cd` IS in this branch's history).
- keyframes.js `@ master` (`7561af3` family; v2.1.0).

Both consumers link glass-ui via `"@mkbabb/glass-ui": "file:../glass-ui"` — `node_modules/@mkbabb/glass-ui` resolves to glass-ui HEAD v1.8.5 in both. So both consumers DO consume the post-P shadow cohort.

---

## §2 Reproduction — per-consumer build/typecheck results

### §2.1 keyframes.js — demo build BROKEN (then fixed by a value.js rebuild)

| Step | Result |
|---|---|
| `npm run build` (library entry) | GREEN — `dist/keyframes.js 50.19 kB` |
| `npm run check` (`tsc --noEmit`) | GREEN — 0 errors |
| `npm run gh-pages` (demo app, production mode) — **first run** | **FAILED** |

First `gh-pages` error (verbatim):
```
[commonjs--resolver] Failed to resolve entry for package "@mkbabb/value.js".
The package may have incorrect main/module/exports specified in its package.json.
```

Root cause: keyframes.js depends on `@mkbabb/value.js` via `file:../value.js`. value.js's `package.json` `exports."."` `import` branch points at `./dist/value.js`. At the moment of the first keyframes.js demo build, `value.js/dist/` did **not** contain `value.js` — it contained a *demo app* (`index.html`, `assets/`, `CNAME`). The library entry had been clobbered (see §2.2).

After running `npm run build` in value.js to restore the library `dist/`, the keyframes.js `gh-pages` build was re-run and **PASSED** (`✓ built in 7.54s`). This proves the keyframes.js breakage is 100% the value.js `dist/` clobber — keyframes.js itself, against glass-ui HEAD, has zero regressions.

### §2.2 value.js — library build GREEN, demo build clobbers the library

| Step | Result |
|---|---|
| `npm run build` (library, `production` mode → `dist/value.js`) | GREEN — `dist/value.js 139.31 kB` |
| `npm run gh-pages` (demo app, `gh-pages` mode → `dist/`) | GREEN (build succeeds) BUT see below |
| typecheck | `vue-tsc` not installed; `tsconfig.json` covers `src/` only, not `demo/` — no demo typecheck path exists |

**The cohesion defect** — `value.js/vite.config.ts`:
- `production` mode: `build.lib.entry = src/index.ts`, `fileName: "value"` → emits `dist/value.js` (the LIBRARY).
- `gh-pages` mode: `outDir: ./dist/`, `emptyOutDir: true`, `root: ./demo/color-picker/` → emits the color-picker DEMO APP into the **same `dist/`**, wiping `dist/value.js`.

So `npm run gh-pages` in value.js destroys the value.js library artifact that `package.json` `exports` advertises. Any downstream consumer (keyframes.js) that resolves `@mkbabb/value.js` afterward fails with "Failed to resolve entry". The two build modes share one output directory with `emptyOutDir: true` — they are mutually destructive.

`value.js/q-audit-crash-state.png` (committed-tree screenshot, dated 2026-05-18 10:21 — the user's own capture) shows the resulting broken color-picker render: see §5.

---

## §3 Per-surface attribution table

| Surface | Symptom | Root cause (commit + file + line) | Category |
|---|---|---|---|
| **keyframes.js demo build** | `Failed to resolve entry for package "@mkbabb/value.js"` — total demo build failure | value.js `vite.config.ts:91-113` `gh-pages` mode shares `outDir: ./dist/` + `emptyOutDir:true` with `production` mode's `dist/value.js` library entry → library clobbered. `package.json` `exports."."` `import: ./dist/value.js` then dangles. | **(d)** pre-existing value.js config defect, surfaced by the AD.W4 `70e61e9` `"development"` condition work + a demo build run |
| **value.js glass-cards** | Hard black drop-shadow on the card, no soft glass shadow; card reads as a plain elevated panel | `<Card variant="pane">` at 11 SFCs (`ColorPicker.vue:3`, `panes/*.vue` ×10). glass-ui `Card` (`src/components/ui/card/Card.vue:18-32`) has **no `variant` prop** — only `tier` (`wash\|quiet\|resting\|floating\|overlay`) + `shadow` + `grain`. `variant="pane"` falls through as an inert DOM attr; Card renders default `tier:"resting"` + `shadow:true` → the default `--shadow-card`. | **(c)** un-migrated glass-ui surface change — value.js never dropped the pre-glass-ui `variant` API after `c3e2216` flipped the barrel to re-export glass-ui |
| **value.js dropdowns** | Orphaned floating chevron glyphs (`˅`) with no label — visible top-left of the color-picker card + near the blob in the crash screenshot | `ColorSpaceSelector.vue` — `<Select>`/`<SelectTrigger variant="ghost">` with `<SelectValue/>`. `SelectValue` renders empty when no `model-value` resolves a label; the `ghost` SelectTrigger then shows only the chevron. Layout (`variant="pane"` non-shadowed-card expectation broken → §glass-cards) compounds the visual orphaning. SelectTrigger `ghost` variant IS valid (`SelectTrigger.vue:11`). | **(c)** + cascade from glass-cards row — the dropdown surface itself is intact; the symptom is layout/empty-label, not a missing export |
| **value.js dock items** | Dock pill renders but the swatch/icon overflows; dock content cramped | Dock SFC imports (`Dock.vue:4-6`) all resolve against glass-ui HEAD (`GlassDock/DockLayerGroup/DockLayer/DockIconButton/DockSelectTrigger` all exported from `src/components/custom/dock/index.ts`). P.W5 Lane A's `useOptionalDockContext` migration (`ActionButton.vue:43`) resolves correctly. No broken import. The visual cramping is downstream of the §glass-cards layout break + value.js demo running inside the clobbered/odd build state. | **(c)/(d)** — no dock substrate regression; symptom is layout cascade |
| **animations** | Dock collapse/expand + dropdown open transitions | post-P `099d51e` (dock edge-fade mask retire) + `beec35e` (inactive-layer `visibility:hidden`) reviewed line-by-line — both are SOUND. `3cb70db` timeline gradient has **zero consumers** in value.js or keyframes.js (`GlassTimeline` not imported in either). | **(b) — RULED OUT** — no post-P animation regression reaches these consumers |

---

## §4 Dock subsystem deep-dive

`src/styles/dock.css` diffed `9f774b4` (P-close) → HEAD. The only changes are the two post-P commits:

**`099d51e` — edge-fade mask retire.** Removed two `mask-image: linear-gradient(...)` blocks (the horizontal `.dock-layers` rule + the vertical `.glass-dock.vertical` rule). The rationale is correct: once the dock grows-to-fit (Z.W2.T2) it never scrolls, so a scroll-feather mask only bled a 1rem transparent ramp onto the first/last item. `--mask-fade-width` is retained (utilities.css still uses it). **No interaction contract touched; pure cosmetic improvement. CLEAN.**

**`beec35e` — inactive-layer hit-test + toggle card variant.**
- dock.css: `.dock-layer:not(.layer-active)` and `.dock-layer-item-host` (inactive) now add `visibility:hidden` alongside `opacity:0`, with a delayed `visibility 0s linear var(--duration-fast)` transition so a leaving layer still paints through its crossfade. This FIXES a real dead-control bug (`opacity:0` boxes still answered `elementFromPoint()`). The box stays in layout flow so `useLayerTransition` FLIP width measurement is intact. **Correct and idiomatic. CLEAN.**
- `toggle/index.ts`: a `compoundVariants` rule re-asserts `h-auto` for `variant:'card'` × every size. CVA emits compound classes last, so the card toggle now sizes to content. **Correct. CLEAN.**

**Conclusion**: the post-P dock cohort is NOT the cause of any consumer dock breakage. value.js's `Dock.vue` + keyframes.js's `TopDock.vue` both import the dock family from the canonical `@mkbabb/glass-ui/dock` subpath and every symbol resolves. The dock-item cramping in the crash screenshot is a *layout cascade* from the glass-card defect (§5), not a dock substrate regression.

---

## §5 Glass-card + dropdown + animation findings

### Glass-cards — the load-bearing consumer defect

`value.js/q-audit-crash-state.png` shows the color-picker `<Card variant="pane">` rendering with a heavy hard-edged black drop-shadow on its right/bottom edges — a `--shadow-card` elevated-panel look, not a glass surface. value.js authored these cards expecting a `pane` variant (no shadow, flat workspace chrome). glass-ui's `Card` exposes `tier` + `shadow` + `grain` — there is **no `variant` axis**. The `variant="pane"` prop is swallowed as an inert attribute; the card silently falls back to `tier:"resting"` + `shadow:true`.

This is consumer migration debt: commit `c3e2216` ("re-export all shadcn-vue components from glass-ui") flipped value.js's `ui/card/index.ts` barrel to re-export glass-ui's `Card`, but the **11 consuming SFCs were never updated** to the glass-ui Card API. The canonical migration is `variant="pane"` → `tier="wash" :shadow="false"` (wash is the documented "inline workspace chrome / scroll-pane host" tier).

Affected SFCs (11): `color-picker/ColorPicker.vue:3`, `panes/GradientPane.vue:20`, `panes/AuroraPane.vue:111`, `panes/BlobPane.vue:102`, `panes/BrowsePane.vue:2`, `panes/MixPane.vue:61`, `panes/GeneratePane.vue:32`, `panes/AdminPane.vue:2`, `panes/ExtractPane.vue:3`, `panes/PalettesPane.vue:2`, (+ `color-picker/ColorPicker.vue` counted once).

### Dropdowns — surface intact

The `Select`/`DropdownMenu` family is fully exported from glass-ui HEAD; value.js's `ui/select/index.ts` + `ui/dropdown-menu/index.ts` barrels re-export cleanly. `SelectTrigger`'s `ghost` variant (used by `ColorSpaceSelector.vue`) is a real glass-ui prop (`SelectTrigger.vue:11`). The orphaned-chevron symptom in the screenshot is an empty `<SelectValue/>` (no resolved label) made visually conspicuous by the broken card layout — not a missing/renamed export. No glass-ui dropdown substrate regression.

### Animations — RULED OUT

- `3cb70db` (timeline stitched gradient): `GlassTimeline` is imported by **neither** value.js nor keyframes.js. The timeline change cannot be the "animations" the user sees broken.
- The dock collapse/expand + dropdown open transitions run through `transitions.css` / `animations.css` / `dock.css` — all reviewed; the post-P cohort touched only the two sound dock.css edits in §4. No animation-contract break.
- The "animations broken" perception is most plausibly the dock/dropdown rendering *inside* the layout-broken color-picker (cards mis-sized → children clip → transitions look wrong).

---

## §6 Recommended Q-wave remediation

### R1 — value.js build-config split (BLOCKER; consumer-side; substrate-adjacent)
**Destination**: `value.js/vite.config.ts:91-113`. The `gh-pages` demo build must NOT share `dist/` with the `production` library build. Route the demo to `dist/gh-pages/` (mirroring the existing `hero-lab` → `dist/hero-lab/` precedent at line 71). This removes the library-clobber class permanently. Q-plan: a `value.js` cross-repo write wave, one-line `outDir` change. Also add a `default` condition to value.js `package.json` `exports."."` as a belt-and-braces fallback (currently only `development`/`types`/`import` — fine for Vite but fragile).

### R2 — value.js Card API migration (BLOCKER; consumer-side)
**Destination**: 11 SFCs listed in §5. Rewrite `<Card variant="pane">` → `<Card tier="wash" :shadow="false">` (or `tier="quiet"` if the design wants a faint surface). Q-plan: a `value.js` cross-repo write wave. This is the load-bearing fix for the user-reported "glass-cards broken".

### R3 — glass-ui Card cohesion review (MINOR; substrate)
**Destination**: `src/components/ui/card/Card.vue`. The `Card` accepting an unknown `variant` prop *silently* (attr-fallthrough, no warn) is the cohesion gap that let R2 rot undetected for multiple tranches. Q-plan (Qβ co-location lane): consider whether `Card` should expose a named `pane`-like preset, OR document that consumers must not pass `variant`. Either way the silent-swallow is the substrate-side half of the bug. Not a code-fix mandate — a Q-design decision item.

### R4 — value.js demo typecheck gate (MINOR; consumer-side)
**Destination**: `value.js` — there is no `vue-tsc`/demo `tsconfig` path. A `<Card variant="pane">` prop mismatch on a typed Vue component WOULD be caught by `vue-tsc` against the demo. Q-plan: recommend value.js add a demo typecheck step. This is the gate that would have caught R2 at P.W5.

### R5 — keyframes.js — NO ACTION
keyframes.js against glass-ui HEAD is CLEAN once value.js's library `dist/` exists. Its only failure was transitive through R1. R1 fixes it.

---

## §7 Verdict per surface

| Surface | Verdict |
|---|---|
| keyframes.js demo build | **BLOCKER** — fully broken; root cause is value.js R1; trivially fixed |
| value.js glass-cards | **BLOCKER** — 11-SFC `variant="pane"` API mismatch; the headline consumer regression |
| value.js dropdowns | **MINOR** — surface intact; orphaned-chevron is a cascade of the glass-card break |
| value.js dock items | **MINOR** — no dock substrate regression; visual cramping is a layout cascade |
| animations | **CLEAN** — post-P timeline change has zero consumers; dock cohort changes are sound |
| glass-ui post-P dock cohort (`099d51e` + `beec35e`) | **CLEAN** — both commits reviewed line-by-line; correct, idiomatic, no regression |
| glass-ui post-P timeline (`3cb70db`) | **CLEAN** (for this lane) — zero consumers among the named-broken apps |

**Headline finding**: the user's "totally broken" report is REAL, but NOT caused by the glass-ui post-P shadow cohort and NOT caused by a P.W5 cross-repo write *error* (P.W5's writes — `avatarVariants`, `useOptionalDockContext` — all resolve correctly). The two true causes are: **(1)** a value.js `vite.config.ts` defect where the demo build clobbers the library `dist/` (category d, pre-existing), and **(2)** value.js's 11 SFCs passing a stale pre-glass-ui `<Card variant="pane">` API that glass-ui's `Card` never had (category c, un-migrated — debt dating to the `c3e2216` barrel flip). The glass-ui substrate is clean; the breakage is consumer-side, and the *cohesion gap* the user asked us to find is the silent prop-swallow on `Card` (R3).

---

## §8 Status

COMPLETE — round-1 Qα forensic deliverable. All four named surfaces attributed with concrete commit/file/line citations. Reproduction verified live (consumer builds run; keyframes.js fix confirmed by re-build). Recommendations R1–R5 each cite a concrete destination. Handoff to Q orchestrator for synthesis into `Q.md` + waves. No source mutations made; the only side-effect was rebuilding `value.js/dist/` (library) to restore the clobbered artifact — a build, explicitly allowed by the dispatch.
