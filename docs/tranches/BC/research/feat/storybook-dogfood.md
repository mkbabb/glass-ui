# BC storybook-dogfood research — does the storybook EAT ITS OWN components?

**Assignment:** the frontend-design dogfood lens. The user: *"demo storybook hardening with proper design hierarchy to DOGFOOD and leverage our own components."* Audit whether the storybook (`demo/`) composes `<Card>`/`<SegmentedTabs>`/`<Configurator>`/`<IconChip>`/`<Button>`/the type ladder for its OWN chrome + story scaffolding, or hand-rolls bespoke markup that should be a glass-ui component (the dogfood gap). EXTEND `BC.W-STORYBOOK-META`; do NOT duplicate. Converges with `BC.W-PAGE-CHASSIS` + the demo-prune.

All findings GROUNDED — file:line + measured grep counts on HEAD (`tranche/AY`, 2026-06-18).

---

## 0 — The dogfood thesis (the binding principle this assay defends)

**Every demo markup pattern repeated ≥2 sites is either a shipped library component, or a demo-private chassis primitive that COMPOSES a shipped library component — never a hand-rolled CSS class-triplet.** This is the demo-side application of the J-invariant ("component over CSS class") + MEMORY ("every src/ artefact has ≥2 sites or is exported or is a private demo helper"). The storybook is the SHIPPING proof surface (a consumer's first read of glass-ui), so a storybook that hand-rolls `rounded-card border bg-card` instead of `<Card>` is **proving the opposite of what it ships** — it demonstrates that the platform's own showcase author found the components insufficient and reached for raw CSS. That is the dogfood gap.

This is DISTINCT from the existing waves' angle: `BC.W-PAGE-HIERARCHY`/`BC.W-CODE-BLOCKS`/`BC.W-HERO-AUDACIOUS` audit the storybook's PRESENTATION (the hierarchy reads right, code is Fira, heroes are audacious). The dogfood lens audits the storybook's COMPOSITION SOURCE — is the right read achieved by composing our components, or by re-pasting their CSS? A page can read perfectly while hand-rolling everything; that passes the presentation gate and FAILS the dogfood gate.

---

## 1 — What ALREADY dogfoods (the chassis primitives — the good news)

The demo-private chassis primitives are the strong dogfood story; they DO eat library components. Recorded so the waves do not re-litigate a solved problem:

| chassis | file | dogfoods | evidence |
|---|---|---|---|
| `StoryHero` | `demo/stories/StoryHero.vue:303-339` | `<Card :tier>` + `<Aurora>`/`<Constellation>`/`<FourierField>` | the body sits in a real `<Card>`; the live field is a shipped viz, `:16-19` imports |
| `StoryPlayButton` | `demo/stories/StoryPlayButton.vue:18` | `<Button>` + Lucide `<Play>/<Pause>` | header comment: *"Every demo motion-fire site reaches for THIS, never a hand-rolled control"* — the ONE play register |
| `PresetEditor` (the gear) | `demo/configurator/PresetEditor.vue:4-27,159,192-201` | `<Sheet>` + `<ConfiguratorLayer>`/`<ConfiguratorRow>` + live `<DarkModeToggle>` | the gear is recomposed on the Configurator chassis (BA.W-CONFIG-CHASSIS.3); no raw control fork |
| `StorySection` | `demo/stories/StorySection.vue:71-87` | the `.section-label` eyebrow + `text-subheading` heading rung | the canonical heading/eyebrow register (AZ.W-HIERARCHY); 74 stories import it |
| `ShowcaseFrame` | `demo/stories/ShowcaseFrame.vue:102-128` | the `rounded-card border shadow-cartoon` + `paper-grain-overlay` triplet, tier-axis | 49 stories use it; the captioned-frame footer band |
| `StoryHeader` | `demo/stories/StoryHeader.vue:53-86` | the ordered eyebrow→title→blurb cluster (BB.W-HIERARCHY2) | the hero-cluster reading-order fix |

**The dogfood story is therefore NUANCED, not "nothing dogfoods":** the chassis layer is healthy; the gap is (a) the per-page story BODIES that bypass the chassis, and (b) the missing chassis primitives where a repeated pattern has NO home and is pasted per-page.

---

## 2 — The dogfood GAPS (measured, the binding defect set)

### GAP-1 — 52 raw `rounded-card border bg-card` triplets vs 5 stories importing `<Card>` (the headline)
```
grep -rn "rounded-card border" demo/stories/ | grep -iE "bg-card|shadow-cartoon"  → 52
grep -rln "import.*Card.*from" demo/stories/                                       → 5
grep -rln "ShowcaseFrame" demo/stories/                                            → 49
```
`<Card>` IS the component that paints `rounded-card border bg-card shadow-cartoon` (it is the glass-tier surface — CLAUDE.md §card). `ShowcaseFrame` already wraps that triplet (its whole reason for existing, `ShowcaseFrame.vue:6-8`). Yet 52 sites re-paste the raw triplet inline. Some are legitimate (`ShowcaseFrame.vue` itself defines it; a `tier="field"` specimen host genuinely wants no plate), but the bulk are stories that SHOULD compose `<ShowcaseFrame>` or `<Card>` and instead hand-roll. **This is the dogfood headline: the showcase author found the showcase frame insufficient 52 times.** The fix is the `BC.W-PAGE-PRUNE`/`W-STORYBOOK-META` sweep, but no wave currently MEASURES "raw-triplet count → 0 off an allowlist" as a dogfood acceptance.

### GAP-2 — 41 idiom-B `border-l-[3px]` IconChip section headers with NO chassis primitive (the per-page paste)
```
grep -rln "border-l-[3px]" demo/stories/  → 41
```
Canonical paste, `demo/stories/forms/inputs.vue:21-43`:
```vue
<header class="flex items-center gap-4 border-l-[3px] pl-5"
    :style="{ '--section-label-accent': `var(--section-color-${FORMS_STOP})`,
        borderColor: 'color-mix(in srgb, var(--section-label-accent) 55%, transparent)' }">
    <IconChip :icon="TextCursorInput" :section="FORMS_STOP" />
    <div class="flex flex-col gap-1">
        <span class="section-label--tinted text-admin-label">Forms · Text entry</span>
        <p class="text-small text-muted-foreground">Inputs and search…</p>
    </div>
</header>
```
This exact shape (`border-l-[3px]` accent rail + `<IconChip>` + `text-admin-label` eyebrow + `text-small` blurb + the inline `--section-label-accent` style) is pasted across 41 SFCs. `BC.W-PAGE-HIERARCHY` Part C DELETES it (folds the identity UP into the chassis hero icon) — which is correct for the DOUBLE-DESCRIPTOR redundancy. **But the dogfood observation is different: this is a repeated 20-line markup pattern with NO chassis primitive.** Even where a section LEGITIMATELY wants an IconChip-led section header (not a redundant page header), there is no `<StorySectionHeader>` to compose — so it gets pasted. `W-PAGE-HIERARCHY` assumes the pattern just disappears; the dogfood lens says: where it survives as a genuine section header, it needs a chassis home (the `<IconChip>` + `--section-color-N` + eyebrow + blurb composed once), not a 42nd paste. This is the `<StorySection>`/`<ShowcaseFrame>` fold precedent applied to the section-header cluster.

### GAP-3 — 298 bare `<code>` + 134 `font-mono`, no code-block chassis exists (W-CODE-BLOCKS owns the FIX, dogfood owns the COMPLETENESS)
```
grep -rn "<code"      demo/stories/  → 298
grep -rn "font-mono"  demo/stories/  → 134
grep -rn "fira-code"  demo/stories/  → 162   (3-way fork)
find demo -iname "*code*"            → only StoryHeader.vue (false positive); NO Code.vue / CodeBlock.vue
```
`display/card.vue` is the worst: 45 `<code class="font-mono text-xs">` runs (`card.vue:104-263`). `BC.W-CODE-BLOCKS` mints `<Code>`/`<CodeBlock>` demo-private primitives and sweeps the 3-way fork — this is correct + owns the fix. **The dogfood completeness note:** `<Code>`/`<CodeBlock>` are the canonical EXAMPLE of the dogfood principle (a repeated `<code class="...">` paste → a chassis primitive composing the `fira-code` utility). W-CODE-BLOCKS should be CITED by the dogfood-completeness arm as the model the other folds follow, and the dogfood gate should assert these primitives EXIST + are consumed (no surviving raw `font-mono`/`fira-code` `<code>`), which W-CODE-BLOCKS C2/C3 already does — so this gap is OWNED, recorded here as the model.

### GAP-4 — 39 raw `<button>` vs 50 stories importing `<Button>` (the control dogfood gap)
```
grep -rn "<button"             demo/stories/  → 39
grep -rln "import.*Button.*from" demo/stories/ → 50
```
Distribution: foundations 9, dock 8, data 5, motion 4, display 4, substrates 3, aurora 3. Some are legitimate (a raw `<button>` inside a configurator pane that needs no glass register, a demo-local toggle), but 39 raw `<button>` on a platform whose flagship is the glass `<Button>` is a dogfood signal. The fix routes to `BC.W-PAGE-PRUNE`/`W-STORYBOOK-META`; no wave measures it.

### GAP-5 — AppShell hand-rolls the morph-stage controls (the SHELL dogfood gap — UN-OWNED)
The storybook's OWN shell chrome (`demo/layout/AppShell.vue`) hand-rolls controls the platform ships:
- `AppShell.vue:366-374` — a `btn-pill btn-interactive focus-ring inline-flex … rounded-pill border bg-card/60 px-4 py-2` raw chain (the "Morph to {facing}" button) → should be `<Button variant="...">`.
- `AppShell.vue:375-383` — a raw `<input type="checkbox" class="focus-ring size-4 rounded">` (the "Liquid teardrop" toggle) → should be `<Switch>` or `<Checkbox>` (the platform ships both).
- `AppShell.vue:298-308` — the "Pick a story" empty state is a raw `rounded-[var(--radius)] border bg-background/40 p-8` div → should be a `<Card>` (or an `EmptyState` register; the platform has `empty-states` demos but no `<EmptyState>` component — a possible book).
- `AppShell.vue:564-577` — the keyboard-help `<dl>`/`<kbd>` is hand-rolled (`bg-muted px-1.5 font-mono`); the `<kbd>` chip is a candidate for a shared register but is a thin one-off (KISS — likely a KEEP, recorded).

**No existing wave audits the SHELL chrome for raw controls.** `W-STORYBOOK-META` axis 1 ("frontend-design audit of ALL UI panes") could reach it, but its acceptance is presentation (padding/occlusion/fontsize), not dogfood-composition. The shell is the most-seen surface in the storybook (it frames every route) — its hand-rolled controls are a high-visibility dogfood miss.

### GAP-6 — 91 hand-rolled `<h2 class="text-subheading">` bypass StorySection (OWNED by W-PAGE-HIERARCHY PH1)
```
grep -rn 'class="text-subheading"' demo/stories/  → 91
grep -rln "StorySection" demo/stories/            → 74   (only 13 pass heading=, per route-census)
```
`BC.W-PAGE-HIERARCHY` PH1 owns this (the 38-count it cites is now 91 on a fresh grep — the gap GREW since the census; the dogfood arm should re-baseline PH1's count). Recorded as OWNED; the dogfood gate composes PH1's assertion (no re-litigation).

### GAP-7 — the `SectionPreviewCard` bento chassis is REFERENCED but does not exist
```
find demo -iname "*preview*" -o -iname "*bento*" -o -iname "*section-land*"  → (empty)
grep -rln "SectionPreviewCard" demo/stories/                                  → (empty)
```
`BC.W-HERO-AUDACIOUS` Part C/E references `demo/stories/SectionPreviewCard.vue` as a `BC.W-PAGE-CHASSIS` chassis shell consumed by the 11 section landings — but it does NOT exist on disk, and the 11 section-landing routes do NOT exist (`grep "hero: true" manifest.ts` → 12 substrate heroes, NO per-category landings; no `landing`/`sectionHero` manifest concept). This is a genuine MISSING chassis primitive — the bento redirect card (IconChip + title + blurb + Fira-Code subpath chip + inline live preview) — that W-HERO-AUDACIOUS/W-PAGE-CHASSIS specify but no wave OWNS the chassis-mint as a discrete dogfood deliverable. Recorded as a dependency the dogfood arm verifies exists (it should compose `<Card>` + `<IconChip>` + `<CodeBlock>` — three library/chassis primitives — the dogfood exemplar).

---

## 3 — The dogfood census table (the measured baseline → target)

| pattern | HEAD count | should-be | owning wave | dogfood-target |
|---|---|---|---|---|
| raw `rounded-card border bg-card` triplet | 52 | `<Card>` / `<ShowcaseFrame>` | W-PAGE-PRUNE (fix) | 0 off allowlist (DOGFOOD gate) |
| `border-l-[3px]` IconChip section header | 41 | `<StorySectionHeader>` (MINT) or fold to hero | W-PAGE-HIERARCHY PH3 (fold) | 0 paste; chassis where genuine |
| bare `<code>` | 298 | `<Code>` | W-CODE-BLOCKS C2 | 0 raw (OWNED) |
| `font-mono` on `<code>` | 134 | `<Code>` | W-CODE-BLOCKS C2 | 0 (OWNED) |
| raw `<button>` | 39 | `<Button>` | W-PAGE-PRUNE | 0 off allowlist (DOGFOOD gate) |
| hand-rolled `<h2 text-subheading>` | 91 | `StorySection heading` | W-PAGE-HIERARCHY PH1 | 0 (OWNED, RE-BASELINE 38→91) |
| AppShell raw `btn-pill` chain | 1 | `<Button>` | UN-OWNED | 0 (DOGFOOD gate, SHELL) |
| AppShell raw `<input type=checkbox>` | 1 | `<Switch>`/`<Checkbox>` | UN-OWNED | 0 (DOGFOOD gate, SHELL) |
| AppShell "Pick a story" raw card | 1 | `<Card>` | UN-OWNED | 0 (DOGFOOD gate, SHELL) |
| `SectionPreviewCard` bento chassis | 0 (missing) | MINT (composes Card+IconChip+CodeBlock) | W-HERO-AUDACIOUS refs, UN-MINTED | exists + composes ≥2 primitives |

Library-component imports across stories (the dogfood reach): `Card` 5, `Badge` 9, `IconChip` 41 (healthy — the SUFFUSE fold worked), `SegmentedTabs` 7, `Configurator` 9, `Button` 50, `StorySection` 74, `ShowcaseFrame` 49. The IconChip count (41) shows the SUFFUSE consolidation succeeded — that is the MODEL the other folds should match.

---

## 4 — Design-hierarchy fixes (the audacious large-title idiom — the dogfood angle)

The hierarchy work is largely OWNED (`W-PAGE-HIERARCHY` 8-page-type ladder, `W-HERO-AUDACIOUS` depth-keyed √φ rungs, `W-PAGE-CHASSIS` scroll-shrink). The dogfood-specific hierarchy notes (where the storybook fails to DEMONSTRATE the ladder it ships):

1. **The hero caps at `text-display-3` (67.78px) — the storybook under-runs its own type system on its own front door.** `StoryHero.vue:292,333` hardcode `text-display-3`; the √φ ladder peaks at `--type-display-audacious` (352px), `-mega` (177px), `-hero` (287px) — NEVER reached. herostudios runs 89-122px display (research/awwwards-herostudios.md §1.1). The storybook should DOGFOOD its own audacious tiers on the heroes (W-HERO-AUDACIOUS HA1 owns this; the dogfood note is that the under-run is itself the anti-dogfood — the showcase doesn't show the showpiece type).
2. **The section-heading rung IS dogfooded where StorySection is used** (`text-subheading` 20.4px √φ, `StorySection.vue:79`) — but bypassed 91× (GAP-6). The fix is migration, not invention.
3. **The herostudios light-huge-vs-heavy-tiny contrast** (research §1.4): the `text-hero` weight-300 light-display utility ships (`semantic.css`) but is NEVER composed on a hero (W-HERO-AUDACIOUS Part A books it). The storybook does not dogfood its own light-display register.
4. **No section delimiters** (route-census §2: 3 `<Separator>` + 1 `<hr>` / 108 routes) — the storybook ships `<Separator>` but barely uses it for its own section delimiting (W-PAGE-HIERARCHY PH2 owns the fix; the dogfood note: the platform's own separator is un-eaten).

---

## 5 — Recommendation: EXTEND W-STORYBOOK-META, MINT StorySectionHeader, verify the bento chassis

The existing wave-set covers the per-slice FIXES. The dogfood lens adds a CROSS-CUTTING completeness layer that NO wave owns. Three moves, all converging with the band-5 set (no new build band):

**A. EXTEND `BC.W-STORYBOOK-META` with a DOGFOOD-COMPLETENESS arm (the headline ask).** Add a `M9 — dogfood-completeness` clause to `proof:storybook-meta`: the storybook composes library/chassis components, not hand-rolled CSS triplets. Born-RED on HEAD's 52 raw-card + 39 raw-button + the AppShell shell controls. Self-test bites per pattern. This is the dogfood gate the user's "DOGFOOD and leverage our own components" ask demands — it is currently authored as prose ("the storybook IS the proof surface") with no compositional acceptance. Includes the SHELL sweep (`demo/layout/AppShell.vue` — GAP-5, currently UN-OWNED).

**B. MINT `<StorySectionHeader>` (the 42nd-paste preventer).** Where a section genuinely wants an IconChip-led header (not a redundant page header W-PAGE-HIERARCHY deletes), it composes `<StorySectionHeader :section :icon eyebrow blurb>` — the `border-l-[3px]` rail + `<IconChip>` + eyebrow + blurb composed ONCE (the `<StorySection>`/`<ShowcaseFrame>`/`<IconChip>` fold precedent). This is the dogfood-architectural complement to W-PAGE-HIERARCHY's fold: PH3 DELETES the redundant double-headers; this gives the SURVIVING genuine section headers a chassis home so the pattern is never re-pasted. Demo-private (zero src/ paint). Routes to W-PAGE-HIERARCHY (couples PH3) or a new thin W-STORYBOOK-DOGFOOD wave.

**C. VERIFY `<SectionPreviewCard>` exists + composes ≥2 primitives (the bento dogfood exemplar).** W-HERO-AUDACIOUS references it but no wave owns the chassis-MINT. The dogfood arm asserts it exists and composes `<Card>` + `<IconChip>` + the subpath `<CodeBlock>` (the canonical dogfood card — three primitives in one). This closes the "referenced but un-minted" gap as a measured dependency.

**FENCES (the dogfood arm must respect):**
- **The allowlist is binding** — a `tier="field"` specimen host that genuinely wants no plate, a raw `<button>` inside a configurator pane that needs no glass register, the `<kbd>` help chip (a thin one-off, KISS-KEEP) are legitimate non-dogfood and stay on a NARROW recorded allowlist (the `card-padding-roster.md` precedent). The gate flags only OFF-allowlist hand-rolls.
- **DRY/KISS — abstract only ≥2 consumers** — `<StorySectionHeader>` has 41 consumers (overwhelmingly met); `<SectionPreviewCard>` has 11+1 (the section landings + front door). The `<kbd>` chip (1 site) is NOT folded (KISS). No contrivance.
- **Zero src/ paint** — every dogfood fix is a demo-private chassis primitive composing SHIPPED library components; the library is byte-fenced (a residual tracing to a primitive defect routes to its Band-1/6 wave).
- **No re-litigation** — W-CODE-BLOCKS owns the code rung, W-PAGE-HIERARCHY owns the heading/delimiter/idiom-B-fold, W-HERO-AUDACIOUS owns the hero size + bento content; the dogfood arm COMPOSES their gates + adds the cross-cutting completeness assertion + the SHELL sweep no wave owns. Re-baseline PH1's count (38→91 on fresh grep).

---

## 6 — Source ledger (file:line + measured)

- `demo/stories/StoryHero.vue:303-339` — `<Card :tier>` body (dogfoods).
- `demo/stories/StoryPlayButton.vue:18` — `<Button>` wrap (dogfoods).
- `demo/configurator/PresetEditor.vue:159,192-201` — `<Sheet>` + `<ConfiguratorLayer>`/`<ConfiguratorRow>` (dogfoods).
- `demo/stories/StorySection.vue:79` — `text-subheading` heading rung canon.
- `demo/stories/ShowcaseFrame.vue:102-128` — the `rounded-card border shadow-cartoon` chassis (49 consumers).
- `demo/stories/forms/inputs.vue:21-43` — the canonical idiom-B `border-l-[3px]` IconChip header paste (41 sites).
- `demo/stories/display/card.vue:104-263` — 45 `<code class="font-mono text-xs">` runs (the code-fork worst offender).
- `demo/layout/AppShell.vue:366-383` — raw `btn-pill` chain + raw `type="checkbox"` (SHELL dogfood gap, UN-OWNED).
- `demo/layout/AppShell.vue:298-308` — "Pick a story" raw card (should be `<Card>`).
- `demo/layout/AppShell.vue:564-577` — hand-rolled `<dl>`/`<kbd>` help (thin KEEP).
- Grep baselines (HEAD, `demo/stories/`): raw-triplet 52, idiom-B 41, bare-`<code>` 298, `font-mono` 134, `fira-code` 162, raw-`<button>` 39, hand-rolled `text-subheading` 91, `Card` imports 5, `IconChip` imports 41, `StorySection` 74, `ShowcaseFrame` 49.
- `docs/tranches/BC/research/awwwards-herostudios.md §1.1-1.4` — the herostudios north-star (89-122px light-display, warm #F5F4F3, color-deferred-to-motion).
- `docs/tranches/BC/research/route-census.md §0-1` — the chassis stack + the 3 competing header idioms.
- `docs/tranches/BC/waves/BC.W-{STORYBOOK-META,PAGE-HIERARCHY,CODE-BLOCKS,HERO-AUDACIOUS}.md` — the existing owning waves (composed, not duplicated).
- `find demo -iname "*preview*"` → empty (`SectionPreviewCard` referenced by W-HERO-AUDACIOUS but UN-MINTED).