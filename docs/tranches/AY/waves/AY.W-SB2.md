# AY.W-SB2 — Storybook restructure: scattered-dock triage + metric co-location

Restructure / section-coherence wave. Owns the three section-coherence residues the
H-storybook hardening lane routed here (F6 scattered-dock, F7 carousel/deck-progress
disambiguation, F8 metric badge/pill co-location) plus the speedtest-boundary
verify-only. Sibling to W-SB1 (per-route KEEP/FIX/RETIRE + orphan-component-retire)
and W-SB3 (the real language gate). This wave touches `manifest.ts`, two
staging-chrome stories, the Display section, and adds ONE new proof gate; it RETIRES
zero source components (that is W-SB1's clean-break scope).

Hardening basis: `docs/tranches/AY/audit/hardening/H-storybook.md` §2 (per-route
triage), F6/F7/F8 (§3), §5 fold-routing, §6 convergence criteria 1+2.

---

## Goal criterion

The Display IA reads true to the doc-true reconciliation: metric-badge and
metric-pill present as ONE "Metric primitives" arc (badge primitive → pill as its
baked composition), not two sibling rows that re-raise the "wtf, two metric things"
reading. Every GlassDock that lives OUTSIDE the `dock/` category is either a
recorded, defensible composition-of-dock OR has been de-docked because the dock was
mere staging chrome teaching nothing the section is about. The carousel-pager and
deck-progress concerns are disambiguated into their two distinct routes (neither is
the other's "broken progress bar"). The settled speedtest-ownership boundary is
re-confirmed unchanged — NOT re-opened.

## Completion criterion

The single hard gate below verifies: `proof:dock-staging-triage` GREEN (the
enumerated keep/de-dock allowlist is exhaustive over the actual non-`dock/`
GlassDock sites AND the metric co-location landed AND the carousel/deck-progress
routes stay distinct); `proof:speedtest-boundary` GREEN (verify-only, byte-unchanged
ledger); `proof:no-orphan-demo-route` + `proof:storybook-ia` STILL GREEN (the
manifest edits did not break the 1:1 file↔row set-equality or the category IA).

---

## The verified defects (file:line)

### D-F6 — scattered dock: per-site triage, not a blanket move

8 stories outside `dock/` reference GlassDock/dock components. Ground-truth grep at
HEAD (`at-dock-convergence`):

| Site (file) | What the dock does | Verdict |
|---|---|---|
| `demo/stories/substrates/aurora.vue` + `aurora/AuroraConfigDock.vue` + `aurora/AuroraAtomsPanel.vue` | The aurora chrome IS a `DockLayerGroup`/`DockLayer` configurator dock — the dock is the demonstrated artefact (hand-authored layer chrome, per CLAUDE.md Configurator contract). | **KEEP-AS-COMPOSITION** — the dock is load-bearing; the page is a dock-hosting composition. |
| `demo/stories/compositions/instrument-chassis.vue` | The InstrumentChassis demo hosts a GlassDock as the instrument-strip (CLAUDE.md: "the GlassDock instrument-strip host"). | **KEEP-AS-COMPOSITION** — the chassis↔dock pairing is the teaching point. |
| `demo/stories/data/search.vue` | The string `"Vertical GlassDock rail row…"` is a SEARCH-RESULT ROW LABEL (`search.vue:77`) — a text fixture for the fuzzy-search demo, NOT a mounted `<GlassDock>`. | **NO DOCK MOUNTED** — false positive; the substring is fixture data. |
| `demo/stories/navigation/header-ribbon.vue` | Hosts dock components as the ribbon chrome. | **OWNED BY W-SB1** (the whole header-ribbon route is W-SB1's retire-or-book decision; out of W-SB2 scope — do NOT edit it here). |
| `demo/stories/foundations/chart-chassis-palette.vue` | `chart-chassis-palette.vue:23` carries `{ cls: "bg-[var(--glass-bg-dock)]", label: "--glass-bg-dock", hint: "GlassDock substrate" }` — a TOKEN SWATCH in a palette table. **No `<GlassDock>` is mounted** (verified: zero `<GlassDock` and zero dock import in the file). | **NO DOCK MOUNTED** — false positive in the seed. The `--glass-bg-dock` swatch is a legitimate token-palette entry; nothing to de-dock. |
| `demo/stories/display/dark-mode-toggle.vue` | `dark-mode-toggle.vue:49-51` mounts three `<GlassDock :density>` ONLY to host `<DarkModeToggle size="dock">`. The `size="dock"` rung resolves `--dock-control-size` from the host (comment `:3-7,15-16,39-40`): shown standalone it falls through to a bare fallback and "teach nothing." | **KEEP-AS-COMPOSITION** — the dock IS the teaching point (size-inheritance has no meaning without a dock host). The seed mislabels this; the source comment already justifies the keep. |
| `demo/stories/display/metric-pill.vue` | `metric-pill.vue:80-117` mounts a `<GlassDock container-name="metric-pill-cluster-demo">` whose section teaches **`@container` queries**, not docks — the dock is a convenient named container the demo could express with any `container-name` host. The blurb (`:118-127`) is entirely about the container-query idiom. | **DE-DOCK** — this is the genuine staging-chrome scatter. The `@container` lesson is mis-placed in a metric-pill story AND uses a dock as incidental chrome. Resolve via the metric co-location (D-F8). |

So the seed's three de-dock candidates resolve to: `chart-chassis-palette` =
NO-DOCK (false positive, nothing to do), `dark-mode-toggle` =
KEEP-AS-COMPOSITION (the dock is the teaching point), `metric-pill` = the ONE real
de-dock. The work is one de-dock, not three.

### D-F7 — carousel-pager vs deck-progress conflation

The corpus §B11 "carousel-progress (bar broken)" conflates two distinct routes:

- `demo/stories/navigation/carousel.vue` uses `<CarouselPager>` + `<CarouselDots>`
  (`:70-71`) — there is NO progress bar in it. The "broken bar" reading is a
  mis-attribution.
- `demo/stories/navigation/deck-progress.vue` is the SEPARATE deck-position rail
  (`DeckProgress` + `.glass-progress-rail`, `:13,77`). Corpus #5 requires it stay a
  PAGE element (not dock-baked); grep of BottomDock + `dock/` src is already clean
  (verified in H-storybook §2). Both routes are correct and must stay distinct —
  the only defect is the conflated READING. The fix is a manifest-blurb
  cross-reference clarifying the boundary, plus the gate asserting both rows exist
  as separate routes (no merge).

### D-F8 — metric-badge/pill co-location is doc-only, not IA-true

`manifest.ts:174-175` lists `metric-badge` and `metric-pill` as two adjacent but
peer Display rows. The pill blurb says "A `MetricBadge` composition … Not a parallel
primitive" — doc-true (verified: `src/components/ui/metric-pill/MetricPill.vue`
bakes `labelPosition=stacked` + `density=spacious` + `size=lg` over `MetricBadge`).
But the IA still PRESENTS them as siblings: a visitor reads two metric rows and
re-raises "wtf, two metric things." The reconciliation lives only in a blurb, not in
the section structure.

---

## Objective

1. **De-dock the metric-pill `@container` section + co-locate the metric story
   arc.** Move the container-query teaching OUT of a dock-staged metric-pill section
   and present metric-badge → metric-pill as ONE Display sub-arc (primitive →
   baked-composition), so the "two metric things" reading is resolved by structure,
   not prose.
2. **Record the scattered-dock triage as an ENUMERATED allowlist** (the table above)
   in the wave + machine-lock it: every non-`dock/` GlassDock mount is on the
   keep-as-composition allowlist OR the file is a recorded NO-DOCK false positive;
   a NEW dock mount appearing in a non-allowlisted, non-`dock/` story REDs the gate.
3. **Disambiguate carousel ↔ deck-progress** via a manifest cross-reference and a
   gate assertion that both rows persist as distinct routes.
4. **Verify-only the speedtest boundary** — re-run `proof:speedtest-boundary`,
   confirm byte-unchanged ledger, do NOT touch `proof-speedtest-boundary.mjs` or the
   eight STAY composables.

Honors the precepts: the metric co-location is a gestalt section-arc redesign (not a
blurb patch); the de-dock removes a workaround (a dock used as incidental container
chrome) rather than papering over it; the speedtest boundary is root-decided and not
re-litigated (no re-open). D1 (the configurator-design defect) is explicitly NOT
folded here — it forwards to the aurora-configurator lane (H-storybook §5).

---

## Edit-sites (exact)

### E1 — `demo/stories/display/metric-pill.vue` (de-dock)

Remove the `<GlassDock container-name="metric-pill-cluster-demo">` cluster section
(the section label `:79`, the `<GlassDock>` mount `:80-117`, the `@container` blurb
`:118-127`) and its `GlassDock` import (`:4`). The container-query teaching either
(a) relocates to a non-dock named-container host inside the SAME metric story (a
plain `<div style="container-type: inline-size; container-name: …">` carrying the
metric cluster — the dock was never required for the `@container` lesson), or (b)
drops entirely if the metric-cell/metric-stack stories already carry the
container-query register (verify; if so, this section is redundant). Pick (a) unless
the lesson is provably duplicated elsewhere — record which in the wave PROGRESS. The
remaining sections (size ladder, density, empty states) are dock-free and stay.

### E2 — `demo/stories/manifest.ts` (metric co-location + carousel/deck cross-ref)

- Reorder the Display `stories[]` so `metric-badge` (`:174`) and `metric-pill`
  (`:175`) sit ADJACENT as the metric arc (they already are adjacent — the
  structural change is the badge/pill blurb pairing that reads as ONE arc: the badge
  blurb names it the base primitive, the pill blurb names it the baked composition OF
  that primitive). Author the badge row a blurb (currently bare,
  `s("display", "metric-badge", "Metric Badge")`) that names it the primitive of the
  pair, e.g. `"The metric primitive — amount · unit · color. <MetricPill> is its
  stacked, spacious, large baked composition."` — so the two rows read as a
  primitive→composition pair, not two peers. Keep the pill's existing
  "Not a parallel primitive" blurb.
- The deck-progress row (`:209`) and carousel row (`:211`) stay distinct. Add a
  one-clause cross-reference to the deck-progress blurb noting it is the
  position RAIL (page element), distinct from the carousel pager/dots — so a reader
  does not conflate them. No merge, no move.

### E3 — `scripts/proof-dock-staging-triage.mjs` (NEW gate, the machine lock)

Author a pure-detector proof following the `proof-no-orphan-demo-route.mjs` +
`proof-speedtest-boundary.mjs` house shape (manifest-parse + injected `fs`,
`gate-output.mjs` artefact, `constellation.mjs` ROOT, exit 0/1). It asserts FOUR
facts via device-free SOURCE scan of `demo/stories/**`:

- **A (allowlist exhaustive).** Scan every `.vue` under a manifest category folder
  EXCEPT `demo/stories/dock/**` for a mounted dock (`<GlassDock` /
  `<DockLayerGroup` / `<DockLayer ` / `<DockIconButton` — a real element tag, NOT a
  bare identifier in a string/comment/import). Every file with a mount must be on the
  `KEEP_AS_COMPOSITION` allowlist:
  `["substrates/aurora", "compositions/instrument-chassis", "navigation/header-ribbon"]`
  (the aurora panels `aurora/AuroraConfigDock`+`AuroraAtomsPanel` are helper SFCs
  under the `aurora/` helper dir, not category-story files — covered by the aurora
  story's allowlist entry; the gate's category-scoped walk excludes helper dirs,
  matching `proof-no-orphan-demo-route`). A dock mount in any other non-`dock/`
  story → RED. **`display/metric-pill` MUST NOT appear** (the de-dock proof — if a
  dock mount survives at `display/metric-pill`, RED).
- **B (no-dock false positives stay dock-free).** `foundations/chart-chassis-palette`
  and `display/dark-mode-toggle` get explicit sub-checks: chart-chassis-palette MUST
  carry zero `<GlassDock` element mount (the `--glass-bg-dock` swatch string is
  allowed); dark-mode-toggle IS allowed its dock mounts (the `size="dock"` teaching
  composition) — so dark-mode-toggle is ALSO on the `KEEP_AS_COMPOSITION` allowlist.
  (Revise A's allowlist to include `display/dark-mode-toggle`.)
- **C (metric co-location).** The manifest's `metric-badge` row carries a non-empty
  blurb that names it the base primitive of the pair (assert the row has a `blurb`
  arg AND the metric-badge + metric-pill rows are adjacent in the Display category).
  The pill row still carries "Not a parallel primitive".
- **D (carousel/deck-progress distinct).** Both `navigation/carousel` and
  `navigation/deck-progress` rows exist as separate manifest rows (no merge); the
  deck-progress blurb mentions the rail/page distinction.

Bite checklist (the gate must catch each):
- re-add a `<GlassDock>` to `display/metric-pill` → A reds.
- add a `<GlassDock>` to any non-allowlisted, non-`dock/` story (e.g.
  `data/search.vue`) → A reds.
- mount a real `<GlassDock>` in `foundations/chart-chassis-palette` → B reds.
- blank the `metric-badge` blurb or separate the badge/pill rows → C reds.
- merge `carousel` and `deck-progress` into one row → D reds.

### E4 — `scripts/gates.mjs` (register the new gate)

Add a registry entry mirroring the `proof:no-orphan-demo-route` block (`scripts/gates.mjs:420-426`):

```js
{
    id: "proof:dock-staging-triage",
    cmd: "proof:dock-staging-triage",
    tags: ["local", "ci"],
    note: "AY.W-SB2 — the scattered-dock keep/de-dock allowlist + metric co-location lock. Every non-dock/ story that mounts a <GlassDock>/<DockLayer*> is on the KEEP_AS_COMPOSITION allowlist (aurora, instrument-chassis, header-ribbon, dark-mode-toggle — each a load-bearing dock composition); chart-chassis-palette + metric-pill carry NO dock mount (the --glass-bg-dock swatch is text, not a mount); the metric-badge row carries a primitive-of-the-pair blurb adjacent to metric-pill; carousel + deck-progress stay distinct rows. Bite: re-dock metric-pill, dock a non-allowlisted story, mount a dock in chart-chassis-palette, blank the metric-badge blurb, or merge carousel/deck-progress → RED",
},
```

Add the `package.json` script line mirroring `:592` (`"proof:no-orphan-demo-route"`):
`"proof:dock-staging-triage": "node scripts/proof-dock-staging-triage.mjs",`.

---

## HARD GATE

The wave closes when ALL of the following verify (CI-wired, not grep-only):

1. **`npm run proof:dock-staging-triage` → exit 0 (GREEN)** with a written artefact
   listing: (a) the KEEP_AS_COMPOSITION allowlist matched exhaustively against the
   actual non-`dock/` dock-mount set (zero off-allowlist mounts); (b)
   `display/metric-pill` ABSENT from the mount set (the de-dock landed); (c) the
   metric-badge primitive-of-the-pair blurb present and adjacent to metric-pill; (d)
   carousel + deck-progress present as two distinct rows. The artefact's
   `mountSet`/`allowlist`/`violations` arrays are the evidence — the gate's bite
   checklist (E3) is the falsifier set.
2. **`npm run proof:speedtest-boundary` → exit 0 (GREEN), verify-only** — the
   `proof-speedtest-boundary.mjs` ledger is byte-unchanged (`git diff --stat
   scripts/proof-speedtest-boundary.mjs` empty) and all eight STAY composables remain
   present + barrel-exported. The wave does NOT re-open the boundary.
3. **`npm run proof:no-orphan-demo-route` + `npm run proof:storybook-ia` → exit 0
   (STILL GREEN)** — the manifest edits preserved the 1:1 file↔row set-equality and
   the 12-category IA (the de-dock removed a section, not a row; metric-pill stays a
   row pointing at its SFC).

The de-dock close additionally requires the cardinal DELTA for the touched
metric-pill route: a captured before/after screenshot pair of
`/display/metric-pill` (the dock-staged cluster → the de-docked container arc)
attached to the wave PROGRESS, since this is a FIX route (H-storybook §6 criterion
5; the live-verify-capture precept).
