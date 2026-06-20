# PRUNE-LEDGER — the demo-route + dead-CTA + platitude prune (BC.W-PAGE-PRUNE)

**Date** 2026-06-19 · **Branch** `tranche/BC` · **Wave** BC.W-PAGE-PRUNE (FIRST of Band 5)
**Directive (USER-DEFECTS §C, verbatim):** *"A page is 'totally illegible — most of it is
superfluous and useless.'"* / *"'View source' BS must be REMOVED; platitudes / useless /
out-of-date copy removed."* / *"A clipped/odd element with a grid background ('WTF is this — and
it's clipped?')."*

Every surviving page earns its place: it teaches ONE thing, in the calm legible voice. Every cut
below is recorded with its WHY + the pre-flight verification — the no-silent-prune floor (the AY
PRUNE-LEDGER precedent). `proof:page-prune` reads this ledger; a future agent cannot re-add a dead
route / dead CTA / platitude without re-tripping the gate.

The sibling demo-CONTENT prune (`BC.W-DEMO-COPY-PRUNE`) appends ITS rows below this wave's (the
de-jargon of rendered blurbs, the dead view-source SUBSYSTEM `useSourceLoader.ts`/`Story.sourceFiles`,
the orphan demo scaffolds). The split is clean: this wave = route/CTA ABSENCE; that wave =
rendered-copy de-jargon + dead-helper deletion.

---

## §1 — "View the source" BS (the dead CTA)

**CUT.** `demo/stories/compositions/hero.vue` — the `<Button size="lg" variant="ghost">View the
source</Button>` (formerly line 175) DELETED. It was a dead CTA: no `@click`, no `href`, no route —
it went nowhere (the literal "view source BS" the user demands removed). The hero CTA row now
carries the ONE real CTA, `Start building` (the primary-audacious button).

- **WHY:** a button that goes nowhere is a lie in the demo (clean break, no stub, no alias).
- **Pre-flight:** `grep -rni 'view.?(the.?)?source' demo/stories/` → this was the SOLE hit. After the
  cut: ZERO hits (P1 clean).
- **Boundary:** the whole `/compositions/hero` ==homepage re-purpose is `BC.W-COMPOSITIONS-HERO`'s;
  this wave owns ONLY the dead-CTA excision. `/compositions/hero` SURVIVES as a distinct page.
- **The dead view-source SUBSYSTEM** (`useSourceLoader.ts` + the `Story.sourceFiles` field) is
  `BC.W-DEMO-COPY-PRUNE`'s extension of this cut — not removed here.

---

## §2 — The 21 orphan composables (the AZ-retired shelf, disk never caught up)

**CUT — all 21 DELETED; `demo/stories/composables/` dir REMOVED.** The Composables reference shelf
was retired at AZ.W-SHELL-CONFIG (`manifest.ts:13-15` comment: "the demo IA no longer carries the
22-story reference category; clean break, no alias"). The IA dropped the rows; the disk never caught
up. These 21 SFCs had NO manifest row → NO route → were unreachable dead code on disk.

The 21 deleted (`demo/stories/composables/*.vue`):

```
use-animated-number   use-clipboard         use-dark-mode-sync    use-global-dark
use-infinite-scroll   use-intersection-pause use-interval         use-keyboard-shortcuts
use-raf-loop          use-resize-observer   use-scroll-progress   use-scroll-tracker
use-sidebar-follow    use-sidebar-state     use-sortable          use-spring-orchestrator
use-stagger-reveal    use-timer             use-token-color       use-touch-gate
use-tree-index
```

- **WHY:** orphaned dead code — the manifest retired the shelf; the disk is the last fragment.
- **Pre-flight (the BINDING route-census caveat — the AV consumer-mis-prune fix-class, intra-repo
  arm):** a per-file grep proved EVERY SFC has zero `import` / `<route>` / `RouterView` reference
  outside its own dead tree. Specifically:
  - **ZERO module imports** of any `composables/*.vue` SFC anywhere in `src/` or `demo/`
    (`grep -rn "from .*composables/use-"` → none outside the `/composables/{dark,keyboard}` *library*
    leaves, which are unrelated `src/composables/` paths).
  - **ZERO router/RouterView refs** — the manifest `import.meta.glob("./*/*.vue")` loader only resolves
    SFCs whose `category/id` appears in a manifest row; the `composables` category has NO row.
  - **The `use-spring-orchestrator` caveat CLEARS** — its only repo-wide references are in FROZEN-tranche
    audit docs (AO/AS/AY/AZ), this wave's own research notes (`BC/research/demo-prune.md:74` itself
    confirms "all 21 unreferenced, 0 refs"), and the wave specs. ZERO live code.
  - **The 3 `use-token-color` hits are STALE doc/test** — `docs/tranches/AZ/audit/ground/d4-capture.mjs`
    (frozen AZ ground-capture), `scripts/wf-az-r4-corrective.js` (stale AZ workflow note), and
    `tests-visual/shell-config.spec.ts:218` (a test that NAVIGATES to `/composables/use-token-color`
    to assert the route FALLS THROUGH to "no match" — it EXPECTS the route dead; deleting the SFC
    reinforces the test's intent, never breaks it).
- **VERDICT:** all 21 clean-deletable. The IA now ≡ disk (no orphan, no dangling row).

---

## §3 — The "coming soon" platitude (the never-arriving option)

**CUT.** `demo/stories/forms/select.vue` — the `<SelectItem value="brutalist" disabled>Brutalist
(coming soon)</SelectItem>` (formerly lines 121-123) replaced with an honest disabled item
`<SelectItem value="spacious" disabled>Spacious</SelectItem>`.

- **WHY:** an option labelled "coming soon" that never arrives is a lie in the demo (clean break).
  The Density select demonstrates a `disabled` SelectItem — that teaching value is REAL — so a
  disabled item is KEPT, but made honest: "Spacious" is a real density rung, read as "unavailable in
  this context," not a never-arriving fiction.
- **Pre-flight:** `grep -rni 'coming soon' demo/stories/` → this was the SOLE hit. After: ZERO (P3
  clean). No `lorem`, no stray `TODO`-in-template platitudes elsewhere (the `sortable-list.vue`
  "Todo" is the legitimate KANBAN column label, allowlisted by exact context).

---

## §4 — The verbose route name (rename, NOT fold)

**RENAMED.** `/foundations/paper-backdrop-texture-system` → `/foundations/paper-texture`.

- The SFC `demo/stories/foundations/paper-backdrop-texture-system.vue` → `paper-texture.vue`
  (the `import.meta.glob` loader resolves `./<category>/<id>.vue`, so the file basename MUST track
  the manifest id).
- `manifest.ts` row: id `paper-backdrop-texture-system` → `paper-texture`; title `"Paper Backdrop
  Texture System"` → `"Paper Texture"`; the blurb trimmed (the long four-clause run tightened, the
  teaching content kept).
- `demo/stories/dock-layer-contexts.ts:103` cross-link updated in LOCKSTEP (`storyId:
  "paper-backdrop-texture-system"` → `"paper-texture"`, label → `"Paper Texture"`).
- The SFC header comment de-jargoned — the stale `AZ.W-PRUNE2 (E4-5) absorbed the near-duplicate
  paper-backdrop.vue twin` provenance line (out-of-date authoring metadata, not teaching content)
  cut; the concise register description kept.

- **WHY do NOT fold into `/foundations/paper-glass`** (the spec's fold-IF-duplicate clause): VERIFIED
  against `paper-glass.vue` — it teaches the FIVE GLASS TIERS (wash/quiet/resting/floating/overlay
  over paper grain); `paper-texture` teaches the PaperBackdrop TEXTURE REGISTER (frequency / cascade
  retint / opacity knob / layered composition). They are DISTINCT teaching surfaces (zero
  `PaperBackdrop`/`frequency`/texture-system content in `paper-glass.vue`). Rename only — no fold,
  no content loss. Clean break, no slug alias (no redirect for the old route).
- The 14 `fira-code` runs the route-census flagged are LOAD-BEARING code-token captions (they label
  `frequency="clean"`, the cascade token names, the subpath) — not superfluous; KEPT.

---

## §5 — The "illegible" settings page (AUDIT — no copy cut)

**AUDITED — no superfluous copy found; the composition stays.** `demo/stories/compositions/settings.vue`
is a real settings composition (Account / Appearance / Notifications / Accessibility, each a
label + one-line blurb + Card of labeled fields). Reading the full page: every group blurb is a
concise functional purpose, every field tooltip describes a real field's function. There is NO
duplicate field description, NO marketing prose, NO decorative filler to cut.

- **The "illegible wall" read is the missing section-HEADING hierarchy** — the
  `section-label--tinted` eyebrow caption reads below body weight, so the four sections do not stand
  apart. That is `BC.W-PAGE-HIERARCHY`'s coordinating concern (delimiters + headings that make it
  legible), NOT a copy cut. The PRUNE deliverable is honored: every field has a purpose, no copy is
  decorative filler.
- **Fence:** the settings COMPOSITION is a real demo (settings IS a teaching surface) — the
  "NO over-prune of TEACHING content" fence holds. An audit verdict of "no cut needed, copy is
  load-bearing" is a valid ledger row.

---

## §6 — The "WTF is this — clipped?" offender (CONFIRMED — un-wall deferred)

**CONFIRMED + deferred.** The clipped-with-grid-background offender is the
`expandable-container` FULLSCREEN register: when an `<ExpandableContainer>` promotes to fullscreen
(Teleport-to-body) it paints an `overflow-hidden` wall over the page's grid background — the "WTF is
this — and it's clipped?" surface.

- The demo PAGE itself (`demo/stories/containers/expandable-container.vue`) is a clean teaching page
  (header + StorySections); there is NO genuinely-orphaned/superfluous framing ELEMENT in the page
  to remove.
- **The un-wall onto glass is `BC.W-PAGE-CHASSIS`'s** (spec item 6 verbatim: "the un-wall onto glass
  is BC.W-PAGE-CHASSIS's; this wave identifies the offender"). This wave records the confirmation;
  the chassis wave repairs the fullscreen wall.

---

## §7 — Return summary

```json
{
  "wave": "BC.W-PAGE-PRUNE",
  "routesDeleted": 21,
  "deadCTAsDeleted": 1,
  "platitudesDeleted": 1,
  "routesRenamed": 1,
  "audited_no_cut": ["compositions/settings.vue"],
  "confirmed_deferred": ["containers/expandable-container.vue (fullscreen wall → BC.W-PAGE-CHASSIS)"],
  "preFlightCleared": "all 21 orphan composables proven zero-inbound-reference (the use-spring-orchestrator caveat clears); the route-census intra-repo mis-prune blind-spot defended",
  "iaEqualsDisk": true,
  "srcPaint": "ZERO (demo-route + demo-copy prune only; no src/ symbol pruned — that is BC.W-GLASS-PRUNE's)"
}
```

The surface is honestly cut to what is load-bearing: every surviving page earns its place, every cut
is recorded with its pre-flight, and the IA matches the disk exactly. No dead route, no dead CTA, no
platitude, no never-arriving option.

---
---

# DEMO-CONTENT PRUNE (BC.W-DEMO-COPY-PRUNE)

**Date** 2026-06-19 · **Branch** `tranche/BC` · **Wave** BC.W-DEMO-COPY-PRUNE (AFTER BC.W-PAGE-PRUNE)
**Directive (USER-DEFECTS §C, verbatim):** *"remove view-source BS + platitudes / useless / out-of-date
copy"* — EXTENDED demo-wide: the route prune (above) cut the dead `View the source` button; this wave
cuts the leaked wave-ID / precept jargon rendered to demo consumers, the dead view-source SUBSYSTEM, and
the orphan demo scaffolds.

The demo speaks to a DESIGNER (component capability, usage), NOT tranche-jargon / internal-mechanism prose.
Every rendered word teaches the COMPONENT, in the calm legible voice, with zero view-source / repo-internal
residue. The census (`research/feat/demo-prune.md`) was clear: the demo is OVERWHELMINGLY disciplined — this
is a NARROW, conservative three-cluster cut of the genuine residue, NOT a rewrite. The conservatism fence is
binding: source COMMENTS (`<!-- … -->` / `//`) are NEVER pruned (they are provenance, never rendered); the
settings page, the dock-overview, the substrate studios, and the eggs all STAY.

## §8 — De-jargon the user-facing copy (Cluster 1: rendered blurb / label / text-node)

**REWRITTEN — the leaked internal jargon de-jargoned to component-describing copy.** Each rewrite drops
wave-IDs (`AZ.W-`, `W-NOGRAY`), tokens-§-numbers (`§6`, `§N6`), φ-notation (`φ^(…)`), and build-provenance
phrasing (`byte-identical` / `byte-unchanged` / `PRM=static`-as-aside / `SOTA fold`) and KEEPS the factual
measurements (177px / 352px / saturate 1.5 / blur 16px) + the public RETUNE-knob token names a consumer
actually uses (`--glass-specular`, `--scale-hover-btn`, `--glass-accent`, `--dock-morph-t` — those are
legitimate teaching; the FENCE is the section-NUMBER / wave-ID, not the `--token`).

| file:line (HEAD) | rendered string | de-jargoned to |
|---|---|---|
| `demo/stories/substrates/glass-material.vue` | metal-triad `label`/`blurb` (`W-NO-GRAY`, `§N6`, `W-GLASS-ACCENT`, `PRM=static`) | describe the three metals + what they paint; reduced-motion phrased plainly |
| `demo/stories/substrates/glass-material.vue` | deep-glass `label`/`blurb` (`W-GLASS-CAL`, `W55`, `BYTE-UNCHANGED`, `.glass-deep`) | describe `.glass-deep`/`<Card tier='deep'>` behaviour (deeper blur+saturation, opt-in) |
| `demo/stories/substrates/glass-material.vue` | glass-accent `label`/`blurb` (`(BB)`, `§F1`, `W55`, `byte-identical`) | describe the third glass axis (per-instance rim+glint) |
| `demo/stories/substrates/glass-material.vue` | `(AZ Arm 2)`, `(W09 …)`, `(W56 re-home)`, `(… PE)`, `SOTA fold` label asides | dropped / spelled out ("progressively enhanced") |
| `demo/stories/display/buttons.vue` | `W-BUTTON-GLASS` / `W-LENSING` / `§6 spring register` (1 text-node + 2 blurbs) | "lit glass over the field…", "press scale + lens-swell ride the library register", "library's spring register" |
| `demo/stories/data/metric-stack.vue` | poster blurb (`φ^(9/2)`, `φ^(11/2)`, `AZ.W-SUFFUSE D2-3`) | "the audacious display tiers (mega 177px / audacious 352px)…" |
| `demo/stories/data/metric-cell.vue` | hero blurb (`φ^(9/2)`, `φ^(11/2)`, `AZ.W-SUFFUSE D2-3`) | same — drop φ-notation + wave-ID; keep mega/audacious + measurements |
| `demo/stories/substrates/constellation.vue` | pinned-anomaly blurb (`R5-6 … made first-class`, `zero-deck-domain canon`); opacityCeiling blurb (`byte-identical`); freeze blurb (`byte-identical`) | describe the pinned node / recession knob / freeze determinism (pixel-identical) |
| `demo/stories/display/card.vue` | scroll-shrink text-node (`BB.W-CARD-COMPOSITE`, `A'-3`); cartoon-accent labels (`Rose §0` / `Amber §5` / `Teal §3`) | "compositor-safe (transform/opacity only), no layout-shift"; "Rose"/"Amber"/"Teal" |
| `demo/stories/compositions/labeled-field.vue` | `(kf-G3)` label + `byte-identical` blurb | dropped / "leaves the plain stacked field unchanged" |
| `demo/stories/motion/curve-gallery.vue`, `demo/stories/foundations/motion.vue` | `Easing doctrine (§6)` labels | `Easing doctrine` |
| `demo/stories/motion/curve-families.ts` | Steps family blurb (`BA.W-FOURIER-STUDIO / REC-6`, `W-EASING-PRIMITIVE`) | "the published <EasingPicker> primitive authors these live…" |
| `demo/stories/dock/layers.vue` | switcher-rail `<h2>` (`BB.W-DRAG-MORPH`) | "Switcher rail — pull-to-switch" (text only; the `<h2>` rung untouched) |
| `demo/stories/manifest.ts` | rendered `s(…)` blurbs (`BC.W-ACCENT-TONE`, `AZ.W-MORPH-SHOWCASE`/`AX.W42`/`W-LIQUID`, `BA.W-DOCK-SECTIONS`, `BB.B2 W-DOCKMORPH-CTA`, `W-PHASE-PALETTE`/`W-AX-METAL-GLOW`, the retired `multi-select` axis) | component-describing prose; the retired "multi-select" axis dropped from the tabs intro |

- **WHY:** a designer reading the storybook does not need the wave/precept/build-diff that produced a surface
  — only what it paints + how to use it. Wave-IDs, §-numbers, and φ-notation are repo-internal machinery.
- **Pre-flight (the comment fence):** the de-jargon target is RENDERED copy ONLY (`blurb` / `label` / `heading`
  attrs, `blurb:` data fields, text nodes). Every `<!-- … -->` / `//` provenance comment is left intact — the
  ~28 jargon hits the census counted in comments (`StoryPage.vue`, `shadows.vue`, `blob.vue`, the `// section`
  banners, …) are NOT touched. `proof:demo-copy-prune` D1 strips comments before scanning, so a provenance
  comment never reds (the comment-strip distinguishing self-test bite locks it).
- **The conservatism KEEP:** the public RETUNE-knob token names (`--glass-*` / `--scale-*` / `--dock-*`) and the
  factual measurements stay — they are legitimate teaching, not jargon.

## §9 — De-history the refactor framing (Cluster 1b)

**DELETED.** `demo/stories/navigation/tabs.vue` — the `<StorySection heading="Retired axes">` whose entire
blurb was an internal refactor changelog (*"No legacy code. variant=segmented FOLDED into pill… The overflow
axis retired… A multi-pressed strip is a ToggleGroup… ui/Tabs left the public surface… See MIGRATION.md."*)
removed WHOLE. A demo user does not need the SegmentedTabs retirement history; "See MIGRATION.md" is the
demo-content twin of "View the source." The factual one-liner (*"two variants — pill and underline"*) is folded
into the page's main intro `<p>` (no separate section).

**EDITED (de-history).** `demo/stories/dock/rail.vue` — the rendered `<p>` *"A vertical dock now carries the
SAME collapse / morph / shrink machinery a horizontal dock does (AZ.W-DOCK-TAXONOMY) — … the machinery the old
rail variant denied."* rewritten to present-tense behaviour: *"A vertical dock collapses and morphs its height
like a horizontal dock does its width — … hover to expand; the dock grows its block axis open and shrinks back
to the collapsed circle on idle."* The out-of-date "now carries / old rail variant denied" framing is gone.

- **No double-ownership:** the `rail.vue` `<h2 class="text-subheading">` heading + the inline `<code>` are NOT
  touched (BC.W-PAGE-HIERARCHY / BC.W-CODE-BLOCKS own them); this wave rewrote ONLY the prose between them. The
  `layers.vue` `<h2>` text de-jargon (above) is a rendered-copy concern, not a heading-rung migration.

## §10 — Kill the dead view-source SUBSYSTEM (Cluster 2)

**DELETED.** `demo/composables/useSourceLoader.ts` (60 lines) — the raw-source loader composable.
**EDITED.** `demo/stories/manifest.ts:39` — the `Story.sourceFiles?: string[]` field removed (the dead manifest
field; no row ever SET it).

- **WHY:** the view-source SUBSYSTEM is the machinery behind the dead "View the source" button BC.W-PAGE-PRUNE cut
  (§1 above). The user's "remove view-source BS" is only fully discharged by deleting all three (the button, the
  loader, the field). A loader with zero callers + a field zero rows set is dead code.
- **Pre-flight (BINDING — the intra-repo consumer-mis-prune fence):** `grep -rn "useSourceLoader" demo/ src/ tests/`
  → the ONLY hits were its own def + docstring (ZERO live callers). `grep "sourceFiles:" demo/stories/manifest.ts`
  → 0 rows SET it (only the type declaration `:39`). Re-confirmed at execution; re-run in the gate (D2).

## §11 — Prune the orphan demo scaffolds (Cluster 2)

**DELETED in lockstep.** `demo/composables/useStoryDemo.ts` (159 lines) + `tests/useStoryDemo.spec.ts` (a test
that tests nothing reachable) + `demo/stories/ToneSwatch.vue` (63 lines).

- **`useStoryDemo`** — the "canonical play/reset/status harness" (V.W4). ZERO story consumers (the 22-story
  Composables shelf it served was retired at AZ.W-SHELL-CONFIG; the `use-story-demo.vue` story was deleted at
  AV.W10). The play/reset register is now `StoryPlayButton.vue` (2 consumers: `motion/springs`, `motion/curve-gallery`).
- **`ToneSwatch`** — built to "replace raw Tailwind palette literals across the feedback/containers sites" (its
  own docstring). ZERO consumers — the migration it was built for never landed. (KEEP `TokenLadder.vue` — 2
  consumers, `foundations/chart-chassis-palette` + `foundations/overlays-scrims`; KEEP `StoryPlayButton.vue` — 2
  consumers.)
- **WHY:** orphaned dead code — an unreachable harness + an unused swatch. Clean break, no alias, no stub.
- **Pre-flight (BINDING):** `grep -rn "useStoryDemo" demo/ src/ tests/` → its own def + its test + the
  `src/index.ts` demo-private comment (reconciled below) — ZERO story consumers. `grep -rn "ToneSwatch" demo/ src/
  tests/` → ONLY its own def. Re-confirmed at execution; re-run in the gate (D2).
- **DOC-RECONCILE (zero `src/` paint — a deleted demo-private helper's stale mention):**
  - `src/index.ts` — the `useStoryDemo` demo-private comment dropped (it named a now-deleted helper; no library
    symbol or behaviour changes — the helper was demo-private, never on the library surface).
  - `CLAUDE.md §"Demo storybook chassis"` — the `useStoryDemo` "canonical" entry removed (no live consumer); the
    `<ToneSwatch>` token-tour mention removed (the line keeps `<TokenLadder>`); the play/reset register re-pointed to
    `<StoryPlayButton>`.

## §12 — Return summary

```json
{
  "wave": "BC.W-DEMO-COPY-PRUNE",
  "blurbsDeJargoned": 14,
  "changelogSectionsDeleted": 1,
  "refactorFramingDeHistoried": 1,
  "viewSourceSubsystemDeleted": ["demo/composables/useSourceLoader.ts", "Story.sourceFiles field"],
  "orphanScaffoldsDeleted": ["demo/composables/useStoryDemo.ts", "tests/useStoryDemo.spec.ts", "demo/stories/ToneSwatch.vue"],
  "docReconciles": ["src/index.ts useStoryDemo comment", "CLAUDE.md useStoryDemo + ToneSwatch entries"],
  "keptByConsumerCount": ["TokenLadder.vue (2)", "StoryPlayButton.vue (2)"],
  "preFlightCleared": "useSourceLoader / sourceFiles / useStoryDemo / ToneSwatch all proven zero live reference before delete; re-run in proof:demo-copy-prune D2",
  "commentsUntouched": true,
  "srcPaint": "ZERO (demo-content de-jargon + dead-helper deletion; the src/index.ts comment + CLAUDE.md edits are doc-reconciles of stale mentions, no library symbol/behaviour change)"
}
```

Every rendered word now teaches the component, in the calm voice; every dead orphan is gone; every cut is recorded
with its pre-flight. The conservatism fence held: comments are intact, the settings page + dock-overview + studios +
eggs stay, and the public retune knobs are kept.
