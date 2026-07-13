# BI.W-CONFIG-IN-SHEET — configurator sections on the chassis, concentric + un-indented

Band B1 (geometry grammar). Wires the Law-1 concentric relay's two configurator reader sites (ruling 11 sites
#1 + #3). Depends on W-RADIUS-GRAMMAR (relay tokens) + W-SHEET-RADIUS (the gear-sheet parent ctx).

## §Mandate

Discharges (registry rows this wave OWNS):
- **UF-A4** — "This section is not rounded either" (ss-24; the Configurator "Appearance" section is a square
  hairline-bordered block inside the rounded sheet).
- **UF-A5** — "Why is this indented?" (ss-25; the section body insets from the sheet title for no structural
  reason).
- **FAM-4** "Configurator sections square + indented (UF-A4/A5) | PresetEditor bypasses `<Configurator>` chassis
  (bare div)" · **GEO-9** (the section-vs-chrome inline padding mismatch: sheet chrome `px-6`=24px vs section
  rows `px-3`=12px).
- **Ruling 11** (PASS-4B) — the Law-1 relay WIRES to the configurator-section nesting sites (site #1: sections
  in the `<Configurator>` root clip; site #3: sections nested in the gear sheet).

## §Design

Decided mechanism — D-GLASS PASS-1 §4 Law 1 (concentric relay) + Law 2 (a multi-row section wears a card radius,
never flush-square) + GEO-9 disposition (reconcile section-vs-chrome padding onto ONE anchor). NO re-litigating:
ruling 11 makes the wiring a wave landing obligation.

- **PresetEditor routes through the real `<Configurator>` chassis** (kills the bare-div bypass): the gear sheet's
  sections compose `<ConfiguratorLayer>`/`<ConfiguratorRow>` on the shipped chassis, not a hand-rolled div, so
  they inherit the concentric relay + the padding anchor by construction.
- **Sections read the concentric card rung** (Law 1): each section derives `border-radius: max(--radius-floor,
  calc(--radius-ctx − --radius-inset))` from its parent ctx — the `<Configurator>` root (site #1) OR the gear
  Sheet (site #3, the ctx W-SHEET-RADIUS publishes). A section reads as a CARD inside the clip (UF-A4), not a
  flush-square hairline block. The prior "no per-section radius, flush border-b" note (ConfiguratorLayer.vue:92)
  is SUPERSEDED — the concentric card rung replaces the flush divider (clean break).
- **ONE inline-padding anchor** (`--configurator-pad-inline`) drives BOTH the sheet chrome (header/footer) AND
  the section rows — the section content no longer indents 12px while the chrome sits at 24px (UF-A5/GEO-9 dead).

## §Work

- `demo/configurator/PresetEditor.vue:165,384` — the SheetHeader (`px-6 pt-6 pb-4`) + footer (`px-6 py-4`) and
  the section body re-point onto `--configurator-pad-inline` (ONE anchor); the sections compose the
  `<ConfiguratorLayer>`/`<ConfiguratorRow>` chassis (drop any bare-div section wrapper).
- `src/components/custom/configurator/ConfiguratorLayer.vue:92,102,118` — the section rung derives the concentric
  card radius from the parent ctx (replace the "no per-section radius / flush border-b" contract with the Law-1
  reader `border-radius: max(--radius-floor, calc(--radius-ctx − --radius-inset))`); the section reads
  `--configurator-pad-inline` for its inline padding.
- `src/components/custom/configurator/Configurator.vue:154` — the root publishes `--radius-ctx` (its resolved
  `--radius-panel`) + `--radius-inset` (its section inset) so sections derive concentric (Law-1 site #1).
- `src/styles/configurator.css` — mint `--configurator-pad-inline` (the ONE section-vs-chrome inline anchor);
  re-point the section/chrome padding onto it.

## §Acceptance

Gate: **`proof:config-chassis`** (extended) OR a `proof:geometry-grammar` Law-1 reader-site clause.
Born-RED at HEAD: the PresetEditor bypasses the chassis (bare div); sections are flush-square (no radius); the
section inline padding (12px) ≠ chrome padding (24px).
- Clause: the configurator sections read `var(--radius-ctx)` (the Law-1 reader — sites #1 + #3 present; the
  relay is not dead).
- Clause: ONE `--configurator-pad-inline` anchor drives section + chrome inline padding (born-RED: two literals
  `px-3`/`px-6`; GREEN here).
- Clause: no bare-div section bypass of the `<ConfiguratorLayer>` chassis in PresetEditor.
- Self-test: a flush-square section flags; a concentric-card section passes; a padding-mismatch flags.

## §π/DELTA

`tests-visual/config-in-sheet.spec.ts` — the ss-24/ss-25 before/after:
- the gear sheet's configurator sections read as CONCENTRIC CARDS inside the sheet clip (inner radius =
  sheet radius − inset; getComputedStyle);
- the section inline padding == the sheet chrome inline padding (no indent — UF-A5 dead);
- Chromium + real WebKit, BOTH modes. LOCAL-only.

## §Obligations

- Depends on W-RADIUS-GRAMMAR (the `--radius-ctx`/`-inset`/`-floor`/`-strip` relay) + W-SHEET-RADIUS (the
  gear-sheet parent ctx). Sequence after both.
- No cross-repo ask (demo-side PresetEditor + library configurator chassis; no consumer surface change).

## §Dispositions

- **UF-A1 application** (the over-rounded configurator section, ss-04/05) — the capsule-vs-card LAW is
  W-RADIUS-GRAMMAR's mandate; its CONCRETE configurator paint lands HERE (a section reads a card rung, never a
  capsule). Cited, not a second mandate row.
- Liveness probe: a configurator section that does NOT read `var(--radius-ctx)` (a dead relay site) OR a
  padding-mismatch REDs.

## §Inbound acceptance constraints (the 2026-07-12 marking pass)

- **value.js L14 — the ConfiguratorRow double-label API** lands here (the configurator chassis
  wave): label + sub-label as first-class props, no consumer `:deep()` reach. The crayon Slider
  VARIANT half is DECLINED-TERMINAL (consumer-taste variant; presets-in-consumers; re-trigger ≥2).
