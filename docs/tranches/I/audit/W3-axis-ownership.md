# I.W3 Lane II — Story Fidelity Policy + F-vs-G Axis Ownership

**Date**: 2026-05-05
**HEAD before W3.α**: `35773c4` (post-W1+W2 close)
**Author**: Lane α (substrate-tier hierarchy + story-fidelity policy + axis ownership + chronic-deferral assessments)
**Status**: closed.

## Purpose

Resolve the two architectural tensions flagged by W3.md Lane II:

- **Story-fidelity bifurcation** — bold-maximalist (G design language) vs specimen-quiet (pre-G shadcn-vue scaffold). 41 R-NEW-1 stories return NEEDS-REPAIR per the design-fidelity gate. The canonical story aesthetic was unsettled.
- **F instrument-cluster axis vs G design-language axis** — co-resident in `custom/` with no documented axis ownership. Aggravated by the four P-tranche silent additions (`instrument-chassis`, `glyph-face`, `disco-glyph`, `dock-group`) plus the Q-tranche silent addition (`hover-popover`).

## A. Story-fidelity policy

Bold-maximalist is canonical for primitives / containers / navigation / data / feedback / motion / compositions. Foundations stories may keep specimen-quiet because the utility-spec showcase (color palettes, radius / shadow / motion timing tables) is itself the gesture; layering audacious typography on top would obscure the spec.

The bifurcation is **binary by category**:

| Category | Mode | Rationale |
|---|---|---|
| Foundations | specimen-quiet permitted | token-spec showcase IS the gesture |
| Primitives | bold-maximalist required | the primitive is on display, not its spec |
| Containers | bold-maximalist required | substrate + chrome interaction is the story |
| Navigation | bold-maximalist required | |
| Data | bold-maximalist required | |
| Feedback | bold-maximalist required | |
| Motion | bold-maximalist required | the motion gesture is the story |
| Compositions | bold-maximalist required | the composition is the gestalt |

Each bold-maximalist story commits **one deliberate gesture visible in <2 s** per the G design-fidelity gate (lineage from `docs/tranches/G/audit/W4-design-fidelity.md` and refined through H W4 + I W4). The W4 gate-closing rerun is the binding artefact.

R-NEW-1 (the 41-story aesthetic uplift carried in I.W4) lifts the affected primitives / containers / motion / compositions stories from specimen-quiet (their pre-G shape) to bold-maximalist. Foundations stories in the 41-set list are exempt from the gate: their specimen-quiet shape is policy-correct.

Codified in `DESIGN.md ## Story Fidelity Policy`.

## B. F-vs-G axis ownership

Three named axes live inside `src/components/`. Each axis has a documented origin tranche, an identity description, and an enumerated package list. New custom packages declare which axis they belong to (or open a new axis with a tranche-letter origin).

### Glass tier — origin tranches C / D

The four-tier opacity / blur / border / shadow ladder. `.glass-{subtle,default,medium,elevated}` utilities + the `<Card>` defaults composite it. Intent: neutral substrate for content layered over arbitrary backgrounds; the canonical "container" tier.

**Belongs to this axis**: `<Card>` defaults, `.glass-{subtle,default,medium,elevated}` utility ladder, `.glass-cartoon` / `.glass-card` / `.glass-btn` utility classes, `<GlassDock>` substrate. The dock primitives (`<GlassDock>`, `<DockPopover>`, `<DockLayerGroup>`, `<DockLayer>`) sit on the glass tier as their substrate even though their motion + state-machine layers belong to the instrument-cluster axis.

### Design language — origin tranche G

The cream / paper / cartoon-shadow / Fraunces-WONK / flourish-divider / display-hero design language. Audacious typography, warm-cream substrate identity, lined-paper texture, cartoon-accent shadow semantics. Intent: editorial / dictionary / math-publication aesthetic with deliberate maximalism.

**Belongs to this axis**: `<CreamSurface>`, `<DisplayHero>`, `<FlourishDivider>`, `<MathSurface>`, `<MathFormula>`, `<MathGlyph>`, `<IconStamp>`, `<NotificationDot>`, `<Swatch>`, `<Typewriter>`, `<Pulse>`. Token surfaces: `--cream{,-warm,-cool,-edge}`, `--cream-foreground`, `.paper-{1..4}` ladder, `--shadow-cartoon{,-sm,-md,-lg,-accent}`, Fraunces variation-axis tokens (`WONK`, `SOFT`, `wdth`, `opsz`).

### Instrument-cluster — origin tranches F / P (cross-tranche absorption: Q `<HoverPopover>`)

The bezel-substrate primitives. Faceted / phase-tinted / metric-densified surfaces that read as instrument-panel chassis. Intent: speedtest-style data-heavy interfaces where the glass tier's neutrality and the design-language tier's editorial maximalism are both wrong fits — the substrate itself communicates "instrument, not document".

**Belongs to this axis**: `<InstrumentChassis>`, `<RegionDivider>`, `<GlyphFace>`, `<DiscoGlyph>`, `<DockGroup>`, `<MetricBadge>`, `<HoverPopover>`. The four P-tranche packages plus the Q-tranche `<HoverPopover>` constitute the cross-tranche silent-addition cohort that I.W1 owned for the first time.

### Axis-ownership rules going forward

1. New tranches that introduce a custom package declare the axis assignment in the tranche plan.
2. Single-package new axes are forbidden — a new axis names ≥ 2 packages or it folds into an existing one.
3. The substrate-with-consumer precept applies at the axis level: an axis with one package and no second-package roadmap is overfitting.
4. Cross-tranche silent additions (a non-glass-ui tranche adding a package to `src/components/custom/`) trigger a glass-ui-side wave-0 ownership entry in the next tranche, with explicit axis assignment + wire-or-retire pass.

Codified in `CLAUDE.md ## Design Axes`.

## Source delta summary

| File | Change |
|---|---|
| `DESIGN.md` | New `## Story Fidelity Policy` section |
| `CLAUDE.md` | New `## Design Axes` section enumerating the three axes + per-axis package lists |

## Authority

Story-fidelity policy: bold-maximalist is canonical except for foundations; R-NEW-1's 41 NEEDS-REPAIR stories lift in I.W4; the design-fidelity gate is binding for non-foundations stories. F-vs-G axis ownership: three named axes (glass tier C/D, design language G, instrument-cluster F/P) with enumerated packages; cross-tranche silent additions own a wave-0 entry; future tranches consult `CLAUDE.md ## Design Axes` before adding new packages.
