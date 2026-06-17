<!-- surface-paths: demo/stories/dock/overview.vue,demo/stories/dock/rail.vue,demo/stories/dock/layers.vue,demo/layout/BottomDock.vue,demo/layout/SidebarDock.vue,demo/stories/display/dark-mode-toggle.vue,demo/stories/display/metric-pill.vue -->
<!-- surface-hash: 6b9e118f295327c3590da1541d0366bc6b880228115d36cf52f419c6cb3370c5 -->
<!-- NOTE: this census was executed mid-Batch-2 with W-RAIL-EXTEND + W-DOCK-CONTEXT editing
     the rail/shell dock files concurrently. The hash above is stamped against the tree at this
     wave's close; if a sibling wave edits a census surface AFTER this close, the orchestrator owns
     the batch-close re-stamp (the contract grades are pattern-based and intact regardless of the
     line-shift drift). -->

# AZ.W-DOCK-NORMALIZE — the executed per-dock persistent-controls census (HEAD, post-W-DOCK-TAXONOMY)

The C3 census matrix EXECUTED at HEAD `tranche/AY` (AZ Batch 2a landed: W-DOCK-TAXONOMY
collapsed the variant discriminant onto the orientation axis — `rail-ness = orientation="vertical"`,
the instrument-strip removed, the vertical force-pin lifted). This doc enumerates EVERY demo
`<GlassDock>`-bearing SFC at HEAD, grades each, and records the binding verdict. The gate
`proof:dock-unify` (F4 census) mirrors this matrix as machine facts (the nav-strict lists, the
FEATURE_EXEMPT positive contract, the SHELL disposition, the W5 census-closure).

## §0 RE-GROUND verdict — the count + the @370 drift

- **Count**: a HEAD `grep -rl '<GlassDock' demo --include='*.vue'` returns **7 dock-bearing SFCs**
  carrying **23 source-tag `<GlassDock>` occurrences** (one of dark-mode-toggle.vue's two
  `<GlassDock`-matching lines is a CODE COMMENT at `:4`; the real tag is `:49`). The spec authoring
  recorded 23, the fleet 26. NOTE: this census was executed mid-Batch-2 with W-RAIL-EXTEND +
  W-DOCK-CONTEXT editing concurrently; rail.vue gained a 4th NAV dock (the `<DockRail>` beyond-dock
  rail demo at `@214`, from W-RAIL-EXTEND) and the two shell docks gained route-context wiring (line
  shifts only, contract intact, from W-DOCK-CONTEXT). The FILE count stays 7 (rail.vue's extra dock
  is the same file on the same SHOWCASE list — the W5 closure counts FILES, not tags). The
  post-taxonomy HEAD set is the truth below.
- **The @370 drift (CONFIRMED — the fleet mis-graded)**: `overview.vue:370-389` is the
  `<GlassDock overflow="wrap" always-expanded style="--dock-max-inline-size: 28rem">` 14-control
  OVERFLOW-WRAP feature demo (two `Home`/`Home (2)` filler glyphs among 14 buttons proving the
  wrap reflow at the 28rem cap). It is NOT a "bottom-nav silhouette"; the word "silhouette" in
  the prose at `:364` refers to the WRAP shape lifting onto the card tier, not navigation.
  **There is ZERO divergent nav-flavored dock at HEAD** — every genuinely nav-flavored dock
  already uses `#persistent`/`#collapsed`. The fleet's E5 "move @370's Home into #persistent"
  RETIRES: doing so would inject a home anchor onto a FEATURE-demo dock, violating this wave's
  own C3-NORMALIZATION-SCOPE verdict.
- **Consequence (orchestrator ruling HC-DOCK-A, kept thin)**: the wave's normalization edit is a
  **NO-OP** — no demo SFC is modified. The wave executes its gate-extension scope alone (the
  FEATURE_EXEMPT positive contract + the SHELL_DOCKS promotion + the W5 census-closure) and
  records this zero-divergence finding honestly.

## The per-dock census matrix (HEAD, post-taxonomy)

Legend — **class**: NAV (a navigation rail/bar — gets the home-left `#persistent` + nav +
`<DockSeparator>` pattern) · FEATURE (a teaching surface demonstrating a SPECIFIC dock facility —
home pollution forbidden). **home-status**: `#persistent` (home-left anchor present) · `#collapsed`
(collapsed-pill slot present) · none. **verdict**: NORMALIZED (carries the nav pattern) · EXEMPT
(feature demo, no home by design — recorded positively) · DRILL-IN (DockLayerGroup switcher — the
rail IS the switcher).

### File: `demo/stories/dock/overview.vue` — SHOWCASE (nav-strict, `requireHome:true`)

| dock @line | class | home-status | verdict |
|---|---|---|---|
| `@111` collapse demo | NAV | `#persistent` Home + `<DockSeparator>` | NORMALIZED |
| `@128` media transport | FEATURE | none | EXEMPT (transport controls — a media-player surface, not nav) |
| `@151` select/dropdown triggers | FEATURE | none | EXEMPT (demonstrates `DockSelectTrigger`/`DockDropdownTrigger`) |
| `@217` hover-popover | FEATURE | none | EXEMPT (demonstrates `HoverPopover keep-dock-open`) |
| `@305` slider-in-dock | FEATURE | `#collapsed` | EXEMPT (the Slider keep-dock-open mechanic; `<DockSeparator>` here is a MECHANIC divider, not a nav divider) |
| `@370` overflow-wrap (14-control) | FEATURE | none | EXEMPT (`overflow="wrap"` reflow demo — the fleet's mis-graded @370; §0 drift) |
| `@398` overflow-wrap (collapsible) | FEATURE | none | EXEMPT (`overflow="wrap"` collapsible variant) |
| `@424` card-grid | FEATURE | none | EXEMPT (`shape="card" layout="grid"` 2D tile demo) |
| `@463` collapse demo (bg-toggle) | NAV | `#collapsed` Home + `<DockSeparator>` + `DockBackgroundToggle` | NORMALIZED |

The file-level `auditDock` PASSES `requireHome` (the `#persistent` at `@111` satisfies the
whole-file coarse floor) + has `<DockSeparator>` + zero raw-class separators. The feature docks
inside the same file are EXEMPT by the C3-NORMALIZATION-SCOPE verdict (a teaching surface gets no
home). Note: `auditDock` is whole-file (the recorded bite caveat) — the per-dock grade is HERE.

### File: `demo/stories/dock/rail.vue` — SHOWCASE (nav-strict, `requireHome:true`)

Line numbers below are at this close (post the concurrent W-RAIL-EXTEND edit that shifted them +
added the 4th dock).

| dock @line | class | home-status | verdict |
|---|---|---|---|
| `@85` example vertical dock | NAV | `#persistent` Home + `<DockSeparator>` | NORMALIZED |
| `@128` rounded vertical dock | NAV | `#persistent` Home + `<DockSeparator>` | NORMALIZED |
| `@164` collapsible vertical dock | NAV | `#persistent` Home + `<DockSeparator>` + `#collapsed` | NORMALIZED |
| `@214` DockRail context-rail dock (W-RAIL-EXTEND) | NAV | `#persistent` Home + `<DockSeparator>` + `#collapsed` + `#rail` | NORMALIZED |

**Post-taxonomy shift (recorded)**: the fleet graded rail.vue's `@141,155` as "bare-comparison
docks" (feature-exempt). After W-DOCK-TAXONOMY collapsed rail-ness onto `orientation="vertical"`,
ALL rail docks now carry the `#persistent` home-left + `<DockSeparator>` pattern — they are
normalized nav-rail EXEMPLARS, not bare comparisons. The fleet's bare-comparison grading does not
survive the post-taxonomy HEAD. The 4th dock (`@214`) is the sibling W-RAIL-EXTEND wave's
`<DockRail>` beyond-dock context-rail demo — also a NAV dock carrying the full pattern; it is
accounted for by rail.vue's SHOWCASE-list membership (the closure counts the FILE).

### File: `demo/stories/dock/layers.vue` — SHOWCASE (nav-strict, `requireHome:false`)

| dock @line | class | home-status | verdict |
|---|---|---|---|
| `@67` root drill-in (no rail) | NAV-showcase | none (DockLayerGroup) | DRILL-IN (the layer-group switcher IS the nav; `requireHome:false`) |
| `@120` drill-in (with rail) | NAV-showcase | none (DockLayerGroup `show-rail`) | DRILL-IN |
| `@148` vertical drill-in | NAV-showcase | none (DockLayerGroup) | DRILL-IN |
| `@191` nested collapsible drill-in | NAV-showcase | `#collapsed` (DockLayerGroup) | DRILL-IN |
| `@226` vertical drill-in | NAV-showcase | none (DockLayerGroup) | DRILL-IN |

`requireHome:false` is correct (codified in `proof-dock-unify.mjs:65`): these demonstrate the
`DockLayerGroup` layer-switching mechanic where the switcher rail IS the navigation; a home anchor
is not befitting. The file carries `<DockSeparator>` + zero raw-class separators (the file-level
audit floor). EXEMPT from `requireHome` BY the showcase declaration, not by the feature-exempt list.

### File: `demo/layout/BottomDock.vue` — SHELL (nav-strict, `requireHome:true`, PROMOTED from pendingW40)

| dock @line | class | home-status | verdict |
|---|---|---|---|
| `@94` bottom shell dock | NAV | `#persistent` category-Sheet trigger (home-left) + `<DockSeparator>` (`@148`, `@234`) | NORMALIZED |

`auditDock` over BottomDock.vue at HEAD is CLEAN (`<GlassDock>` root + `<DockSeparator>` divider +
`#persistent` anchor + zero raw-class separators). The `pendingW40` framing (AX.W61) was for the
un-run W40 rebuild; at AZ HEAD the shell dock ALREADY carries the contract, so the row promotes to
STRICT.

### File: `demo/layout/SidebarDock.vue` — SHELL (nav-strict, `requireHome:true`, PROMOTED from pendingW40)

| dock @line | class | home-status | verdict |
|---|---|---|---|
| `@136` vertical shell rail | NAV | `#persistent` ℱ wordmark (home-left) + `<DockSeparator>` (`@212`, `@261`) + `#collapsed` trailing dark toggle (`@316`) | NORMALIZED |

`auditDock` over SidebarDock.vue at HEAD is CLEAN. Promoted from `pendingW40` to STRICT (same
rationale as BottomDock).

### File: `demo/stories/display/dark-mode-toggle.vue` — FEATURE_EXEMPT

| dock @line | class | home-status | verdict |
|---|---|---|---|
| `@49` `:density` sizing host (v-for over densities) | FEATURE | none | EXEMPT (the `dock` size rung resolves only INSIDE a real `<GlassDock>`; this is a sizing-host that demonstrates `DarkModeToggle size="dock"` across density rungs — a single source tag rendered N times by `v-for`) |

A home anchor would pollute the sizing-host teaching surface. EXEMPT, recorded positively.

### File: `demo/stories/display/metric-pill.vue` — FEATURE_EXEMPT

| dock @line | class | home-status | verdict |
|---|---|---|---|
| `@80` `containerName` cluster host | FEATURE | none | EXEMPT (a `containerName="metric-pill-cluster-demo"` container-query host showing a MetricPill cluster inside a dock — the dock is the `container-type` SUBJECT, not a nav bar) |

A home anchor would pollute the container-query host teaching surface. EXEMPT, recorded positively.

### File: `demo/stories/dock/morph-showcase.vue` — FEATURE_EXEMPT (AZ.W-MORPH-SHOWCASE)

| dock @line | class | home-status | verdict |
|---|---|---|---|
| the V↔H morph docks (the arm-c VT crossfade pair + the liquid-preview two-dock pair) | FEATURE | none | EXEMPT (the docks are the MORPH SUBJECT of the vertical↔horizontal liquid-glass morph facility — both modes bidirectional on the ONE `--dock-morph-t` scalar; a home control would pollute the morph teaching surface) |

A home anchor would pollute the morph-facility teaching surface. EXEMPT, recorded positively.

### File: `demo/stories/dock/cta-receive.vue` — FEATURE_EXEMPT (BB.B2 W-DOCKMORPH-CTA)

| dock @line | class | home-status | verdict |
|---|---|---|---|
| the receive-target dock (one `<DockIconButton>` is the CTA landing site) | FEATURE | none | EXEMPT (the dock is the morph DESTINATION of the external-CTA-morphs-into-dock receive facility — an external `<Button>` CTA flies + reshapes ONTO the target control via `useDockCtaReceive`, the iOS bloom-from-source inverse; a home control would pollute the receive-seam teaching surface) |

A home anchor would pollute the receive-seam teaching surface. EXEMPT, recorded positively. (The AZ-snapshot totals below predate the BB additions — `AppShell.vue` + `cta-receive.vue`; the gate's live enumeration is the source of truth, currently 11 dock-bearing SFCs all accounted.)

## Census closure (W5 — the anti-gameability floor)

The 8 dock-bearing SFCs partition EXACTLY across the three declared lists — no unaccounted dock
file:

- **SHOWCASE_DOCKS** (3): `overview.vue`, `rail.vue`, `layers.vue`
- **SHELL_DOCKS** (2, promoted to strict): `BottomDock.vue`, `SidebarDock.vue`
- **FEATURE_EXEMPT_DOCKS** (3): `dark-mode-toggle.vue`, `metric-pill.vue`, `morph-showcase.vue`

3 + 2 + 3 = **8** = the HEAD enumeration. The gate ENUMERATES `demo/**/*.vue` (HTML-comment-stripped)
filtered to files containing `<GlassDock` and asserts each appears on exactly one list. A future
agent adding a new nav dock to a NEW story file (hand-rolled home chrome, no `#persistent`) would
land OFF all three lists → the closure RED-flags the unaccounted file, forcing it onto a list
(nav → audited strict; feature → declared exempt with a rationale). The hardcoded lists are thereby
a CLOSURE, not a snapshot.

## Verdict summary

| outcome | disposition |
|---|---|
| divergent nav docks normalized this wave | **0** (zero-divergence — the contract was already satisfied on every nav dock post-taxonomy) |
| demo SFCs modified | **0** (the normalization edit retired; the @370 fleet target is a feature dock) |
| nav-strict docks (SHOWCASE + SHELL) | 5 files, all `auditDock`-clean |
| feature-exempt docks | 2 files, recorded as a positive contract |
| SHELL_DOCKS disposition | PROMOTED `pendingW40` → STRICT (both clean at HEAD) |
| smoke frame owed | **none** (no render edit — spec §"A π readback is NOT required here") |

This is the executed census, not a re-census-from-scratch (AZ invariant 3). The gate's JSON
artefact mirrors it.
