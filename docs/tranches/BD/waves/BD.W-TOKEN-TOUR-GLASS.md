# BD.W-TOKEN-TOUR-GLASS

## 1 · Band + goal

**Band 4 — Demo PAGES first-half modernization (zero src paint).** Modernize the token-tour swatch/wrapper panes + bring the BC liquid-glass band onto the foundations/display token pages.

**Goal:** Two arms. **(A) The wrapper fold** — the genuine CONTAINER wrappers in the token-tour panes (the `<table>`-bordered card + the `rounded-card border bg-card p-N shadow-cartoon` content-wrapper boxes in `motion.vue`/`section.vue`/`pulse.vue`) compose `<ShowcaseFrame>` / `<Card>` instead of the raw triplet, retiring the hand-rolled wrappers and draining them from the M9A baseline. **(B) The glass-band demo** — the newest BC liquid-glass band (deep-glass / lensing / glass-accent / liquid-hover) is DEMONSTRATED on a foundations token-tour page (the demo-consumer role: the storybook shows the band it shipped), GL-FREE over the static paper/grid wash via `ShowcaseFrame tier="field"`. Zero src paint.

**The load-bearing distinction (the core fence):** a SPECIMEN SWATCH whose box-style IS the thing being demonstrated (the radii swatch showing `rounded-card`, the shadow swatch showing `shadow-cartoon-lg`) is NOT folded onto ShowcaseFrame — ShowcaseFrame's root is itself `rounded-card shadow-cartoon`, so folding the specimen would MASK the very token it demos. Only genuine CONTAINER WRAPPERS (a box that holds content, not a box that IS the specimen) fold.

---

## 2 · Starting state — the exact on-disk reality (verified by reading)

All citations read at HEAD on branch `master`.

### Arm A — the wrapper landscape (FOLD vs KEEP, verified per site)

**FOLD (genuine container wrappers — they hold content, the box-style is incidental):**
- `foundations/motion.vue:85-100` — the easing-doctrine `<table>` inside `<div class="overflow-hidden rounded-card border border-border">` (a bordered table card — a wrapper) AND `:108-115` the transition-demo cards `<div :class="cn('flex flex-col gap-4 rounded-card border border-border bg-card p-5', 'shadow-cartoon')">` (content wrappers holding the sample + caption — the raw triplet). In M9A_BASELINE (`proof-storybook-meta.mjs:286`). (This is `foundations/motion.vue` — the easing-table tour — NOT a `display/motion.vue`; verified on disk.)
- `display/section.vue:27-29` — `<div class="flex flex-col gap-6 rounded-card border border-border bg-card p-6">` (the tone-matrix wrapper holding `<Section>` demos) AND `:51` `<div class="rounded-card border border-border bg-card p-4">` (the gap-matrix wrapper). In M9A_BASELINE (`:283`).
- `display/pulse.vue:61-63` — `<div class="flex items-center gap-3 rounded-card border border-border bg-card px-4 py-3">` (the inline-usage status-line wrapper). In M9A_BASELINE (`:282`).

**KEEP (specimen swatches — the box-style IS the demo; an allowlist, NOT a fold):**
- `foundations/radii.vue:42-49` + `:67-74` — `<div :class="cn('h-20 w-20 border border-border bg-card shadow-cartoon', r.cls)">` where `r.cls` = `rounded-xs`/`rounded-card`/etc. **The swatch demonstrates the RADIUS `r.cls`** (`:12-30` the `scale`/`semantic` radius arrays). Folding onto ShowcaseFrame (root `rounded-card`) would bake `rounded-card` over the demoed radius — FORBIDDEN. The radii page is the canonical specimen-swatch case (its docstring `:1-7`: "The token-tour boxes float over a designed substrate"). KEEP as bare swatch divs.
- `foundations/shadows.vue:43-50` — `<div :class="cn('h-[90px] w-[140px] rounded-card border border-border/60 bg-card', s.cls)">` where `s.cls` = `shadow-cartoon-sm`/`-md`/`-lg`. **The swatch demonstrates the SHADOW `s.cls`** — folding onto ShowcaseFrame (root `shadow-cartoon`) would stamp a SECOND shadow over the demoed one. KEEP. (Note: `shadows.vue` is in M9A_BASELINE `:288` but the bare swatch IS the demo — it stays an M9A allowlist entry, not a fold; see §4.)
- `display/status-dot.vue:24-53` + `:59-69` — the `<table>` matrices (variant × size) hosting `<StatusDot>`. A `<table>` matrix is a documentary spec-sheet (the icon-grid precedent, the CLAUDE.md §W-DEMO-DESIGN "legitimately-monochrome surfaces stay FLAT"). KEEP the table; no card wrapper needed.

### Arm B — the BC glass-band demo coverage (the gap, verified)

`grep -rln "glass-deep|glass-lens|glass-accent|--glass-depth|--glass-refract" demo/stories/foundations/*.vue` = **ZERO**. The BC liquid-glass band is demoed ONLY on `substrates/glass-material.vue`, `substrates/glass-panel.vue`, `display/buttons.vue` (the GL-substrate routes + the button CTA). NO foundations TOKEN-TOUR page shows the deep-glass tier / the `.glass-lens` refraction / the `--glass-accent` chromatic rim. The foundations glass home is `foundations/paper-glass.vue` (the paper-vs-glass tier tour, read `:1-30` — it tours the 5-rung `--glass-opacity`/`--glass-blur` ladder over a paper-grain wash but does NOT reach the BC band's deep/lens/accent registers).

The BC band ships (verified): `src/styles/glass/deep.css`, `src/styles/tokens/glass-deep.css` (`--glass-blur-deep`, `--glass-depth`), `src/styles/glass/accent-tone.css`, `src/styles/glass-refract.css` (`.glass-lens`, `--glass-refract`). `<Card tier="deep">` ships (`Card.vue:35-42` CardTier includes `deep`). `<ShowcaseFrame tier="field">` ships (the BG-2 glass-over-field host, `ShowcaseFrame.vue:47,88`).

### The gate (verified)
`scripts/proof-storybook-meta.mjs`: M9A (`:246-307`) is the raw-triplet census + non-regression ratchet; M8 (the GL-on-static-wash detector, per the `selfTest` enumeration `:706`) blocks staging GL on a static-wash route — Arm B must stay GL-FREE.

---

## 3 · The build — precisely what changes (idiomatic, gestalt, zero src paint)

### Arm A — fold the genuine wrappers (clean break, drain the baseline)

- **`foundations/motion.vue:85`:** the table wrapper `<div class="overflow-hidden rounded-card border border-border">` → `<ShowcaseFrame pad="none">` (the `overflow-hidden rounded-card border` is exactly ShowcaseFrame's `rounded-card border` root; `pad="none"` so the table fills the frame edge-to-edge). The `<table>` stays inside.
- **`foundations/motion.vue:108`:** the transition-demo cards `<div class="… rounded-card border border-border bg-card p-5 shadow-cartoon">` → `<ShowcaseFrame pad="md">` (the `p-5`→`pad="md"` is the default; the content `flex flex-col gap-4` moves to an inner wrapper or the frame's slot — the frame owns the card chrome, the content owns its flex).
- **`section.vue:27` + `:51`:** the tone-matrix + gap-matrix wrappers → `<ShowcaseFrame>` (`p-6`→default `pad="md"`, `p-4`→`pad="sm"`), the `<Section>` demos inside.
- **`pulse.vue:61`:** the inline-status wrapper → `<ShowcaseFrame pad="sm">` (the `flex items-center gap-3` moves inside).

Each raw triplet is DELETED at the call site (clean break, no alias). The folded files LEAVE M9A_BASELINE (the ratchet-lockstep — §4).

### Arm B — the BC glass-band demo (GL-FREE, on the static wash)

Add a glass-band specimen section to `foundations/paper-glass.vue` (the canonical glass-tier home) — OR a small dedicated foundations section — demonstrating the BC band over the page's static paper-grain wash via `ShowcaseFrame tier="field"` (the BG-2 field host: the glass floats over the page wash, no opaque plate occluding it):

- **Deep-glass tier:** `<Card tier="deep">` (or a `.glass-deep` swatch) — the OPT-IN maximal-iOS-27 refractive tier (`--glass-blur-deep` 16px / saturate 1.5), read over the warm-grain wash so the thicker refraction reads against the page substrate. A `--glass-depth` slider (the inheriting `@property`) shows the calm-floating→deep lerp.
- **Lensing:** a `.glass-lens` swatch — the edge-concentrated squircle refraction (`--glass-refract`), the backdrop bending at the rim over the wash. `@supports`-gated (off-Chromium reads the blur base — the demo notes the progressive-enhancement).
- **Glass-accent:** a `--glass-accent: <section hue>; --glass-accent-strength: N%` swatch — the per-instance chromatic rim+glint (the data-keyed colored-hover the §F1 names), reading a `--section-color-N` hue so the rim glows that section's color (the warm-cream identity holds; the accent is rim DECORATION, not a plate tint).

**The ONE-GL-PER-ROUTE fence (load-bearing).** foundations/paper-glass is a STATIC-WASH route (the paper-grain manifest default). The deep-glass/lensing/glass-accent demo is a CSS-SURFACE demo — it reads over the EXISTING static paper/grid wash via `ShowcaseFrame tier="field"`, it does NOT stage a second `<Aurora>`/GL context (the budget). The glass blur/refraction is imperceptible over a flat wash, so the demo carries a designed page-wash (the paper-grain the page already declares) behind the `tier="field"` frame — NOT a new GL field. M8 (the GL-on-static-wash detector) stays GREEN.

**Fences respected:** foreign-tree (demo-private); GL-shader byte-fence (N/A — CSS demo, no shader); profile:budget (N/A — demo SFC); warm-cream identity (the glass-accent reads the `--section-color-N` ramp = library identity; no demo hue in a token); one-GL-per-route (Arm B is GL-FREE over the static wash — the binding fence); presets-in-consumers (the section ramp is library identity); substitution-vs-inheritance (`--glass-depth`/`--glass-accent` are the inheriting `@property` registers — the demo overrides them on the swatch scope, the canonical substitution). **Zero `src/` paint.**

---

## 4 · The gate — born-RED → GREEN proof design

**Extend `proof:storybook-meta`** with a **M12 — token-tour glass-band demo + the wrapper fold** clause. Born-RED on HEAD.

**Clauses (born-RED at HEAD):**
- **M12-1 — the genuine wrappers fold (Arm A).** Assert `motion.vue`/`section.vue`/`pulse.vue` compose `<ShowcaseFrame>`/`<Card>` at the cited wrapper sites AND the raw triplet is GONE there (these files LEAVE M9A_BASELINE — the ratchet-lockstep; M9A `detectRawTriplet` `:293` now reds them as NEW off-baseline if a triplet survives). RED on HEAD (raw triplets, in baseline). GREEN at Arm A (folded, removed from baseline).
- **M12-2 — the specimen-swatch KEEP fence.** Assert `radii.vue`/`shadows.vue` swatch divs are NOT folded onto ShowcaseFrame (the swatch's `r.cls`/`s.cls` radius/shadow must paint un-masked) — they STAY on a NARROW M9A allowlist (the specimen-swatch exemption, recorded with the reason "the box-style IS the demoed token"). This is the anti-over-fold fence: folding a specimen swatch reds M12-2 (the demoed token would be masked).
- **M12-3 — the BC glass-band demo is present (Arm B).** Assert a foundations page composes the BC band: `\.glass-deep|tier="deep"|\.glass-lens|--glass-refract|--glass-accent` present in `foundations/paper-glass.vue` (or the enrolled glass-tour page). RED on HEAD (zero foundations glass-band demo). GREEN at Arm B.
- **M12-4 — Arm B is GL-FREE (the one-GL-per-route fence).** Assert the glass-band demo page stages NO `<Aurora>`/`<GooBlob>`/GL `<canvas>` (M8's GL-on-static-wash detector stays GREEN). The glass-band reads over the static paper/grid wash.

**Self-test bite (planted defect that MUST red):**
- a synthetic `motion.vue` re-introducing the raw `rounded-card border bg-card p-5 shadow-cartoon` wrapper MUST red M12-1 (the M9A ratchet bite);
- a synthetic `radii.vue` folding a specimen swatch onto `<ShowcaseFrame>` MUST red M12-2 (the over-fold that masks the radius);
- a synthetic glass-band page staging an `<Aurora>` MUST red M12-4 (the GL-on-static-wash regression);
- the good state (wrappers folded, swatches kept, glass-band demoed GL-free) MUST pass all four.

**Born-RED proof:** at HEAD, M12-1 (raw wrappers) + M12-3 (no glass-band demo) RED. At the build, all four pass. The self-test reds the gate if a bite stops biting (anti-de-fang).

---

## 5 · Paint verification — the π readback (BC anti-disease law)

This wave PAINTS, so it takes a **`proof:ba-gestalt` verdict on the `page-band` aggregate surface** (the storybook-meta chassis row in the BD-grown roster — BD.W-GESTALT-ROSTER-GROW; the token-tour panes aggregate under `page-band`, the foundations/display token-page SFCs enrolled in its BD freshness record's `surface-paths`) on a fresh capture — no source-green close.

**The binding π** (both modes × desktop+mobile, on `:5199`):
- **(a) Arm A — the folded wrappers read identically** — capture `/foundations/motion`, `/display/section`, `/display/pulse` and assert the folded ShowcaseFrame wrappers read as the SAME bordered card the raw triplet did (ShowcaseFrame's `rounded-card border shadow-cartoon` IS the triplet — byte-near-identical gestalt).
- **(b) Arm A — the specimen swatches read UNCHANGED** — capture `/foundations/radii`, `/foundations/shadows` and assert each swatch paints its demoed radius/shadow un-masked (the KEEP fence's binding proof: the radius/shadow is visible, NOT overwritten by a frame chrome).
- **(c) Arm B — the BC glass-band reads over the wash** — capture `/foundations/paper-glass` (or the glass-tour page) and assert the deep-glass tier reads as the thicker refractive plate over the paper-grain, the `.glass-lens` swatch bends the wash at the rim (`@supports` engines), the glass-accent swatch glows its section hue at the rim. Both modes — the dark capture reads the BC dark-arm (the deep dark glass glows where light passes; the warm section hue over the dark plate).
- **(d) `proof:suffuse` d1-d3 + M8 stay GREEN** — the glass-accent is the single color event per swatch (rim decoration, not a plate flood); no GL staged on the static-wash route.

**The BC anti-disease law observed:** the device-free M12 clauses prove the SOURCE (folds landed, swatches kept, glass-band present, GL-free); the π proves the RENDERED pane (a fold that masks a swatch radius, or a glass-band demo that silently doesn't paint the deep refraction, passes the source gate but reds the capture). No "rides W-REFLECT3"; the readback runs at this wave's close. The demo panes have a REAL enforcement home — the `page-band` aggregate roster surface (the storybook-meta chassis; W-DEMO-DESIGN: "the demo panes JOIN the gestalt roster" — realized at BD.W-GESTALT-ROSTER-GROW).

---

## 6 · Fences + risks — what must NOT break

- **The specimen-swatch KEEP (load-bearing).** Radii/shadow swatches demonstrate the radius/shadow — folding them onto ShowcaseFrame (itself `rounded-card shadow-cartoon`) MASKS the demoed token. M12-2 guards it; the radii/shadows swatch divs STAY bare (on the narrow M9A specimen allowlist, recorded with the reason). Do NOT "consistency-fold" every box onto ShowcaseFrame — the distinction (wrapper-vs-specimen) is the whole wave.
- **One-GL-per-route (Arm B, load-bearing).** The BC glass-band demo is GL-FREE — it reads the deep-glass/lensing/glass-accent CSS surfaces over the EXISTING static paper/grid wash via `tier="field"`, NOT a second `<Aurora>` (the budget; M8 reds a GL stage on a static-wash route). The glass blur is imperceptible over a flat backdrop, so the page's designed paper-grain wash IS the field the glass reads against.
- **`@supports`-gated lensing degrades gracefully.** `.glass-lens` rides `@supports (backdrop-filter: url(#…))` — off-Chromium reads the blur base. The demo notes the progressive-enhancement (the π asserts the read on a supporting engine; the gap-engine read is the un-gated blur, not a broken demo).
- **Warm-cream identity + presets-in-consumers.** The glass-accent reads the `--section-color-N` LIBRARY ramp; no demo hue enters a token. The glass-band default is warm-cream; the accent is rim decoration, not a plate flood (one color event per swatch).
- **Ratchet-lockstep (anti-stale-grandfather).** The folded `motion`/`section`/`pulse` files LEAVE M9A_BASELINE; the kept `radii`/`shadows` specimen swatches move to the M9A specimen-allowlist (a NEW exemption category, recorded — not a stale baseline carry). The ratchet shrinks honestly.
- **Risk — medium.** The wrapper-vs-specimen distinction requires per-site judgment (Arm A fold vs KEEP); the π Arm (b) is the binding arbiter (a masked swatch reds the capture). Arm B is a net-new demo (a glass-band section) — the one-GL-free fence + the `@supports`-degrade are the subtleties. Coordinate the M9A baseline edit with Band-5's data-band drain (both touch M9A_BASELINE — the two waves' baseline removals must not collide; each removes only its own files).
