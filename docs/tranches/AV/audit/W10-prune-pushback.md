# AV.W10 — prune-pushback BOOK (honest push-back on the removal directives)

The user's storybook audit named several components for removal. Three of them
have REAL `src/` consumers at HEAD, so removing them is not a demo-IA prune — it
is a component migration that severs a live binding. This BOOK records the
consumer evidence for each so the user can decide. **None of these are cut in
W10.** Only `metric-cell` + `metric-stack` (genuine zero-consumer orphans) were
retired this wave; that retirement is in `MIGRATION.md`, not here.

A fourth item (`metric-badge` ↔ `metric-pill`) was flagged as a possible dedup;
the evidence is a clean composition, recorded below as a correction.

---

## 1. instrument-chassis — NOT cut (live GlassDock feature)

**Real `src/` consumer.** `GlassDock.vue` ships a `variant="instrument-strip"`
mode that adopts the `<InstrumentChassis>` chrome:

- `src/components/custom/dock/GlassDock.vue:39` — `variant?: "dock" | "rail" | "instrument-strip"`
- `src/components/custom/dock/GlassDock.vue:121` — rail/instrument-strip layout branch
- `src/components/custom/dock/GlassDock.vue:139` — `instrument-strip` chassis adoption
- `src/components/custom/dock/__tests__/GlassDock.instrument-strip.test.ts` — the dedicated test

**Other consumers.** Root-barrel export (`src/index.ts:118`); 2 demo stories
(`demo/stories/compositions/instrument-chassis.vue`,
`demo/stories/foundations/chart-chassis-palette.vue`).

**Disposition.** Removing `instrument-chassis` cascades into the GlassDock
`instrument-strip` feature + its test. It is a shipped primitive with ≥2
consumers — NOT an orphan, NOT cut. If the user wants it gone, the named
migration is: **retire the GlassDock `instrument-strip` variant first** (drop the
variant union member + the two layout branches + the test), then the chassis
falls to demo-only and can be evaluated for removal.

## 2. instrument-rail — NOT cut (gated behind instrument-chassis)

**Real `src/` consumer.** `src/components/custom/instrument-chassis/InstrumentChassis.vue`
composes the rail (`InstrumentChassis.vue:45`). Root-barrel export
(`src/index.ts:119`).

**Disposition.** Its removal is GATED behind instrument-chassis's — the chassis
consumes the rail. NOT cut. If the user confirms the chassis removal above, the
rail retires with it (it is then substrate-without-consumer).

## 3. glyph-face / disco-glyph — NOT cut (provide/inject silhouette cooperation)

**They cooperate and ship.** `glyph-face/keys.ts` exports the silhouette
provide/inject contract; the two components form a cooperating pair:

- `src/components/custom/glyph-face/keys.ts` — `provideGlyphFaceSilhouette` / `useGlyphFaceSilhouette` / `useOptionalGlyphFaceSilhouette` + `GLYPH_FACE_SILHOUETTE_KEY`
- `src/components/custom/glyph-face/GlyphFace.vue:5,68` — `provideGlyphFaceSilhouette(injectedSilhouette)` (the wrapping GlyphFace reads the slot)
- `src/components/custom/disco-glyph/DiscoGlyph.vue:3,82` — `useOptionalGlyphFaceSilhouette()` (a descendant DiscoGlyph writes the path into the slot so the GlyphFace cap clips to it)

**Consumers.** Both are root-barrel primitives (`src/index.ts:120-121`); 4 demo
stories (`compositions/instrument-chassis.vue`, `foundations/chart-chassis-palette.vue`,
`primitives/disco-glyph.vue`, `primitives/glyph-face.vue`).

**Disposition.** The "demo-only" / "wtf disco-glyph" framing is incorrect: these
are public primitives wired by a live provide/inject contract with 4 demo
consumers. NOT cut on a demo-IA audit. If the user confirms removal, the named
migration is: **sever the provide/inject silhouette contract** (delete
`keys.ts`, drop the inject in DiscoGlyph + the provide in GlyphFace), **migrate
or retire the 4 demo consumers**, and **drop both root-barrel lines**.

## 4. metric-badge ↔ metric-pill — NOT a dedup (clean composition)

The digest flagged a possible dedup. The evidence is a clean composition — keep
BOTH:

- `src/components/ui/metric-pill/MetricPill.vue:4` imports `MetricBadge`
- `MetricPill.vue` (file header) states it is composition-only — `MetricPill` is
  `MetricBadge` with `labelPosition=stacked` + `density=spacious` + `size=lg`
  baked in. There is no parallel logic to dedup.

**Disposition.** No `src/` change. Both stories stay in Primitives. The sidebar
blurb for `metric-pill` names the composition relationship so the reader sees it
is a preset over `MetricBadge`, not a parallel primitive.

---

## Summary

| Target | Verdict | Real consumer evidence |
|---|---|---|
| metric-cell | **RETIRED** (this wave) | 0 SFC consumers — see MIGRATION.md |
| metric-stack | **RETIRED** (this wave) | 0 SFC consumers — see MIGRATION.md |
| instrument-chassis | **KEPT** | GlassDock `instrument-strip` + test + 2 demo + root barrel |
| instrument-rail | **KEPT** | InstrumentChassis composes it + root barrel |
| glyph-face | **KEPT** | provide/inject silhouette contract + 4 demo + root barrel |
| disco-glyph | **KEPT** | injects the silhouette slot + 4 demo + root barrel |
| metric-badge / metric-pill | **KEPT BOTH** | MetricPill composes MetricBadge (not a dedup) |
