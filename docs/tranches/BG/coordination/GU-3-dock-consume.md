# GU-3 — the dock-consume cross-repo asks (the L-DOCK root cut · BG-coord OFFER)

**Cross-repo ASK from the atlas/sci-report agent (L-arc / L-DOCK), received 2026-06-28.**
**Canonical source-of-record: `atlas/docs/tranches/L/glass-ui-asks/GU-DOCK.md`** (atlas commit `ec6cdd7`).
This BG-side file is an **OFFER for BG triage** — additive (the GU-1 precedent), authored after BG LOCKED,
so it **never edits a BG wave**. No ingestion is asserted (WS9 is paper-scoped); this is a triage hand-off.
*(GU-2 is the atlas-side `defineExpose({pixels})` on VizTextOverlay — not a glass-ui ask; this is GU-3.)*

**Version line.** BG cuts onto the **4.2.0-line** (`FINAL.md:8, :333, :447`). atlas pins `"@mkbabb/glass-ui":
"4.1.0"` exact (`package.json:37`); it consumes fallback-first on its next bump. Of the asks below, only
**ASK A** rides the **4.4.0-line behind GU-1** (it is a NET-NEW a11y delta, not part of the locked dock cut);
ASK B + the QUESTIONS ride the **dock cut already in BG scope** (WS2/WS10). No version is owed beyond these.

**Anchors HEAD-VALIDATED 2026-06-28** — glass-ui on `tranche/BG` (`552cc9e7`), atlas on `feat/...` (`ec6cdd7`).
All line numbers exact; every BG cite is to a LOCKED spec (no wave is reopened).

---

## ASK A — `GU-DOCK-STATUSDOT-PROPS`: a custom-variant forced-colors ON-signal opt-in (4.4.0-line, behind GU-1)

**Repo:** `~/Programming/glass-ui` — the `StatusDot` recipe + `src/styles/glass/a11y-fallback.css`.
**Justification: primitive-correctness, not dedup. BG never touches this block** — the StatusDot
forced-colors rules (`a11y-fallback.css:134-166`) are line-disjoint from every WS3/WS10 edit; the
`custom → Canvas` default is left deliberate. So this is a genuine NET-NEW, offered for a *future* BG a11y pass.

**The shipped default (HEAD-verified `a11y-fallback.css`).** Inside `@media (forced-colors: active)` (`:61`),
`.status-dot__dot` maps by `data-status`:

```
active → Highlight    (the affirmative system accent)            [:155-156]
paused → Mark         (a marked/attention weight)                [:158-160]
error  → CanvasText   (a solid filled dot — strongest weight)    [:161-162]
idle / custom → Canvas (a hollow dot — only the CanvasText ring reads) [:164-166]
```

So `variant="custom"` resolves to the `Canvas`/idle **hollow** by design — a custom dot carries no WHC
ON/selected signal. **This is exactly why the atlas Dock hand-rolls a `custom → Highlight` override**
(`atlas Dock.vue:973-979`, inside its own `@media (forced-colors: active)`): the platform dock's custom
selection dot *is* a selected-signal, but the shipped default paints it as a hollow idle dot in Windows
High-Contrast.

**The ask (ONE substantive root edit — an OPT-IN, not a default flip).** Add a custom-variant ON-signal
opt-in (a prop / `data-attribute` on `StatusDot`) letting a `variant="custom"` dot declare *"active →
`Highlight` in forced-colors"*, **superseding the `custom → Canvas` default for the opted-in dot ONLY**.
- NOT a blanket forced-colors default (named statuses already ship one, `:155-166`).
- NOT a blanket `custom` override — `custom → Canvas` (`:164-166`) stays the default for non-opted dots
  (glass-ui's deliberate choice for a signal-less custom dot). **NEG-control:** a `custom` dot *without* the
  opt-in must still resolve `Canvas`.
- The minimal correct primitive: a custom dot that *is* a selection signal says so once, at the root,
  instead of every consumer hand-rolling a `:deep` override.

**Out of scope (DROP the "PRM-kill" half).** The shipped `status-dot` carries no transition (the pulse uses
`motion-safe:animate-ping` — PRM-correct); there is no root transition to kill. The atlas `Dock.vue:962`
transition + its PRM kill are consumer-skin that STAYS atlas-side.

**Sequencing.** Rides the **4.4.0-line behind GU-1** (after the parked 4.3.0 publishes). The atlas carries a
born-RED consume-contract gate that flips green only when the opted-in active dot maps to `Highlight` on the
published dist; it never re-tests a glass-ui internal.

---

## ASK B — `GU-DOCK-RING-ALIAS`: a transition `--ring` alias OR a pinned migration note (the WS10 rename fallout — HIGHEST-VALUE record)

**Repo:** `~/Programming/glass-ui` — the WS10 cascade (`tokens/*` / `color-radius` / `dark-arm` / `light-dark`).
**The conflict.** BG-WS10 `BG.W-DESHADCN-TOKEN-REPLACE` renames `--ring → --focus-ring-color` and **deletes
the alias** — *"the last shadcn-named token retired, clean break, no alias"* (`SPEC-pass2:185-186`). WS10
believes the rename has **"EXACTLY ONE consumer (`--focus-ring-shadow`)"** (`SPEC-pass2:187`) — its internal
reader count (the WS10 14-reader blast radius, `SPEC-pass4:80, :89`, is glass-ui-OWN SFCs/recipes).

**What WS10 cannot see.** The atlas carries **12 BARE `var(--ring)` sites (no fallback) across 11 files** that
resolve to *nothing* the instant the rename lands with no alias (HEAD-verified census):

| atlas file | line(s) |
|---|---|
| `src/views/GalleryView.vue` | 847 |
| `src/dashboards/ecf/features/filter/EcfFilter.vue` | 346 |
| `src/platform/chrome/filter/components/FilterDrawerFoot.vue` | 165, 193 |
| `src/platform/chrome/filter/components/YearScrubber.vue` | 158 |
| `src/platform/charts/SelectionRegion.vue` | 156 |
| `src/platform/editorial/EasterEgg.vue` | 156 |
| `src/platform/charts/GeoChoropleth.vue` | 468 |
| `src/platform/charts/GeoPointLayer.vue` | 596 |
| `src/platform/charts/ReadoutDrill.vue` | 164 (nested `var(--accent, var(--ring))`) |
| `src/platform/charts/VizOptions.vue` | 406 |
| `src/platform/charts/VizFilterDock.vue` | 409 |

(8 further atlas sites carry a fallback — `Dock.vue:889/957/1017` `var(--ring, currentColor)`,
`ScrollTimeline.vue:270`, `BrandMark.vue:116`, `styles/index.css:74/81`, `TaxonomyApparatus.vue:447` — these
DEGRADE, not break. The vft dashboard SETS `--ring: var(--vft-accent)` locally (`vft-tokens.css:56`) and is
self-immune.)

**The ask (EITHER, BG's choice — both let the atlas land atomically).**
1. **Keep a transition `--ring` alias** one minor-line — `--ring: var(--focus-ring-color)` — for downstream
   migration; OR
2. **Hold the clean break** but publish a **pinned migration note** naming the exact landing commit, so the
   atlas re-points all 12 bare sites ATOMIC with the cut.

Either way the atlas owns the re-point; this ask only asks WS10 to **correct the "one consumer" premise** and
declare the alias/commit so the 12-site re-point is not stranded. Additive — an OFFER, not an edit to WS10.

---

## QUESTIONS (BG-coord confirms — no engine edit owed; each implied by a LOCKED wave but not named)

| QUESTION | Asks BG to confirm | BG anchor (LOCKED) | atlas anchor |
|---|---|---|---|
| **Q1 · anchor consumer-bless** | the per-orientation `side`/placement prop is NOT owed — placement is sanctioned consumer-side, and a documented left-margin override is the blessed pattern. | WS2 INPLACE-MORPH: orientation is a LOCAL `t≥0.5` `boundOrientation` (`SPEC-pass3:103-105, :133`), composes `useDockSpring`, ships **no `side` prop**. | `Dock.vue:613-628` (the left-margin anchor that clears glass-ui's `bottom left-1/2 -translate-x-1/2`). |
| **Q2 · persistent-foot cap⟹scroll** | a NEW bottom band distinct from `#persistent` is out-of-scope for WS2 — the cap⟹scroll model is the sanctioned interim (drop the "TOP iOS-Now-Playing" framing). | WS2 PERSISTENT-CUT keeps `#persistent` as the BottomDock trigger, adds no foot band (`SPEC-pass3:258, :340`); CAP-SCROLLS makes a capped axis intrinsically scroll (`SPEC-pass3:189, :202`). | `Dock.vue:367-540` (the foot-in-scroller interim). |
| **Q3 · leg-b class-name survival** | WS2 DECOMPOSE preserves the `.dock-layer--full` class name (or exposes a stable layout hook) — the atlas `:deep` matches by class and survives the relocation, breaking only on a RENAME. | WS2 DECOMPOSE extracts `components/DockMorphRegion.vue` to own the full/summary/search panes (`audit/A-dock-arch.md:172, :175, :252`). | `Dock.vue:717` `:deep(.dock-layer--full)` column re-seat. |
| **Q4 · token-name survival** | `--dock-selected-accent` / `--dock-control-floor` / `--dock-touch-target` survive WS2/WS3/WS10 under the same names. | WS2 CAP-SCROLLS reworks `styles/dock/overflow.css`, affirms the WCAG floor; WS3/WS10 repaint the dock button without renaming these tokens. | `Dock.vue:588` (`--dock-control-size` re-point target) + the consume of `DockIconButton`. |

**Coupled CONSUME lane (atlas-side, no engine ask — recorded for BG awareness).** When CAP-SCROLLS publishes,
the atlas **drops** the `overflow="scroll"` prop (`Dock.vue:252`) — WS2 retires the union member
(`overflow?: "grow" | "wrap" | "scroll"` → drop `"scroll"`, `SPEC-pass3:202`). The atlas gate asserts the
dist no longer accepts `"scroll"`. This is a consume, not an ask; it confirms Q4's reworked `overflow.css`.

---

## NOTE — `j0-glass-expand-reparent` is owed-on-a-FURTHER-republish (not in BG scope)

The `?fig=` enlarge single-`renderSlot` + `settle` emit is **un-owned by BG** — grep-empty across WS2/4/5/7/8/10.
The atlas keeps its `useEChart` settle-mask interim (not retirable) and treats this as owed on a *further*
glass-ui republish. **The only confirm asked of BG:** that no successor BG wave silently adopts a `?fig=`
reparent before it is treated as a fresh root cut. No edit owed now.

---

## Root-repo law + fences (the closing boundary)

- The atlas authors **no engine line** — these are asks (ASK A/B), confirms (Q1-Q4), and a note. Every fix
  lands at `~/Programming/glass-ui`, named, never atlas-patched.
- This file is **ADDITIVE** (GU-1 precedent) and does not edit any BG wave. The **canonical source-of-record
  is `atlas/docs/tranches/L/glass-ui-asks/GU-DOCK.md`**; this is the OFFER for BG triage.
- The atlas dock consume is **V-fenced** (`Dock.vue` / `DockTocView.vue` are live-edited by the V-arc) AND
  **BG-build-fenced** (BG is LOCKED but UN-BUILT — nothing published on `tranche/BG` yet). Every consume pins
  the **exact BG landing commit at consume-time** (don't pin a version number; pin the commit).
