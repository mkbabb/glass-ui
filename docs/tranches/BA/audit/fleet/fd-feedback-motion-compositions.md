# BA fleet lane — fd-feedback-motion-compositions

FRONTEND-DESIGN audit (pane 4/4): the **feedback**, **motion**, and **compositions**
story bands. Per page: verdict (does it SING in both modes) + the lifting move.
This is the design-quality sweep that sits ON TOP of the mechanical root-cause lanes
(toast-glass R8-12/13b, progress-sectioned R8-14, disco-hover R8-18, demo-affordances
R8-13a/R8-17, page-backgrounds R8-15/11, fourier-demos R8-10) — those are referenced,
not re-derived. The unique contribution here is the per-page gestalt + the
cross-band design diagnoses the mechanical lanes don't cover.

AUDIT-ONLY. Live-probed :5199 (dark is the binding register per the R8 cluster; light
reasoned + spot-checked). Captures banked beside this report:
`fd-feedback-alert-dark.png`, `fd-motion-springs-dark.png`,
`fd-motion-springs-playground-dark.png`, plus the existing fleet pngs
(`cap-curve-gallery-standard-dark.png` = the Toaster page, `curve-picker-dark-full.png`,
`fd-comp-empty-states-dark.png` → captured /containers/dialog, `fd-comp-math-paper-dark.png`
→ captured /data/table — the live session ran an auto-route-walker that drifted captures;
the source reads are the authoritative design truth and were used as primary evidence).

---

## THE CROSS-BAND DIAGNOSIS (the gestalt that subsumes most per-page notes)

Three design failures recur across ALL THREE bands and explain why R8 reads the demo
as "flat, near-black, glass-invisible" in dark:

**X-1 (S2) — The blank-backdrop void is the dominant impression.** Of the 25 pages in
my three bands, only 5 declare a `background:` (springs=constellation, hero=constellation,
auth-shell=fourier, math-paper=grid, settings=grid, empty-states=paper); the other ~19 —
EVERY feedback page (7/7), 6 motion pages, 7 composition pages — fall through to the
AppShell `<PaperBackdrop bg-background>` which in dark is a near-black void (page-backgrounds
lane §1: 81/101 routes blank). The content card then floats as a dark plate on a darker
plate, and there is nothing behind the glass to make it read as glass. The demo's own
identity (glass / grid / math / aurora / audacious type) never fires because the page is a
void. This is the single biggest lift for these bands and it is the page-backgrounds lane's
per-category map — my bands inherit it. **Lifting move: every feedback page gets a calm
paper/grid or subtle-aurora wash; motion gets the constellation band identity; each
composition gets its scene's idiom — DARK-recalibrated so the wash actually reads (the grid
is a no-op in dark today).**

**X-2 (S2) — The hand-rolled card-plate idiom is inconsistent AND off-glass.** The stories
do NOT speak one container vocabulary. Three different recipes appear for "a bounded
region": (a) the canonical `<ShowcaseFrame>`/`<Card>` chassis (toaster, settings,
empty-states, hero, gate-pattern — correct); (b) hand-rolled
`rounded-xl border border-border/60 bg-card/60` (skeleton.vue:29, notification.vue:74,
springs.vue:181/203, math-paper.vue:13) — an opaque-ish slab that is NOT a glass tier and
reads dead on dark; (c) bare `<StorySection>` with no plate (alert, toast triggers). The
`bg-card/60` hand-roll is the worst offender — it's the "near-black plate on near-black
page" that kills every feedback surface in dark. **Lifting move: collapse the demo's region
vocabulary onto ONE chassis (`<ShowcaseFrame tier=...>`/`<Card tier>`) that routes through
the glass ladder, so a demo region reads as glass-over-its-backdrop, not an opaque slab. The
hand-rolled `bg-card/60` plates retire.**

**X-3 (S2) — The CTA / trigger register is unloved and incoherent.** Across the three bands
the action affordances are: full-width flat `variant="default"` slabs that stretch in column
flex (demo-affordances R8-13a: toaster "Fire a toast"); a broken `.btn-pill.glass-btn`
collapse (demo-affordances R8-17: curve-gallery "Play family"); `primary-audacious`
disco-grain CTAs (disco-hover R8-18: hero, gate-pattern); rows of bare `outline` triggers
(toast, notification, alert demos). There is no single demo-trigger / demo-play register.
**Lifting move (sibling-owned, flagged for synthesis): one demo-trigger convention + one
play-control register (Lucide `<Play>` in a real Button/DockIconButton, never the `▶` text
glyph), and the audacious disco retires onto the glass-first button.**

These three are the design backbone; the per-page notes below are the specifics.

---

## FEEDBACK band (7 pages) — R8-flagged: "toasts/alerts/progress flat"

### /feedback/alert — VERDICT: functional, flat, tone-as-outline-only
The five tone alerts (Default/Destructive/Warning/Info/Success) render as **outlined boxes
on a flat dark plate** (`fd-feedback-alert-dark.png`): the tone shows ONLY as a faint tinted
border + a colored icon + colored title; the FILL is the same dead dark for every tone.
There is no tinted-glass body, so a Warning and an Info are distinguishable only by a
hairline border hue you have to hunt for. The page itself is the X-1 void (no backdrop).
Hierarchy is OK (h2 section headings → alert title → body), type is fine.
**Lifting move:** the alert tone should be a translucent **tinted-glass wash** (the
`color-mix(in oklab, <rung>, var(--tone> N%)` recipe the toast-glass lane proposes), so the
tone reads across the whole surface as colored glass, not a thin rim — ONE tone event
(tinted plate + full-chroma glyph), the one-color-event idiom. Stage the page over a calm
paper wash so the alerts read as glass.

### /feedback/toast — VERDICT: opaque tone slabs, no backdrop to demo glass
Covered mechanically by **toast-glass (R8-12/13b)**: the success/warning/info/destructive
variants paint 100%-opaque token plates over a pointless `backdrop-filter`; the default toast
is α0.88-dark = a flat slab. DESIGN-LAYER addition: the toast story is the ONE page whose
entire purpose is to show floating-glass feedback, and it floats the toast over a blank
near-black page — so even once the tone is fixed there is no busy backdrop to prove the blur.
**Lifting move:** stage the toast viewport over a subtle aurora/paper so the glass reads;
adopt the tinted-glass tone anatomy.

### /feedback/toaster — VERDICT: the R8-13a "large uninteresting" page
`cap-curve-gallery-standard-dark.png` (mislabeled — it IS the Toaster page) shows it exactly:
a 1036px **full-width flat grey "Fire a toast" pill** dropped into a near-black ShowcaseFrame,
with a giant ALL-CAPS mono caption below. Covered mechanically by **demo-affordances (R8-13a)**
(column-flex stretch + glass-over-dark). DESIGN-LAYER: the page is two huge dead rectangles
(the trigger frame + the code frame), no visual interest, no glass. **Lifting move:** the
trigger is a content-width interesting Button (per demo-affordances), the page sits over a
wash, and firing a toast should be the page's hero moment (a glassy toast popping over the
backdrop) — currently the toast pops into the corner and the page stays dead.

### /feedback/notification — VERDICT: OFF-MODEL parallel tone path (a real design smell)
The "tones" preview (`notification.vue:48-53,74-89`) hand-rolls raw Tailwind swatches
`bg-blue-500 / bg-emerald-500 / bg-amber-500 / bg-red-500` — NOT the house
`--info/--success/--warning/--error` tokens, NOT a glass tone — inside a flat
`bg-card/60 border` table. So the demo TEACHES a wrong, off-token tone vocabulary, and the
live Notification (the `<Notification>` component) is the opaque-`bg-<tone>/90` slab the
toast-glass lane flags (F-3). Two independent off-model tone maps on one page.
**Lifting move:** the notification tone routes through the SAME tinted-glass tone seam as the
toast (collapse the 3 tone maps — toast variant, notification type, demo swatch — onto ONE
source); the preview swatches use the house tone tokens, not `bg-emerald-500`.

### /feedback/progress — VERDICT: the sectioned variant is broken (R8-14)
Covered exhaustively by **progress-sectioned (R8-14)**: per-cell pill-capped fills + a
`mix-blend-mode:screen` seam band = hard cells, bright seam stripes, a dead notch. DESIGN-LAYER
addition for the OTHER variants on this page (determinate/animated/indeterminate/gradient):
they read fine but the page is the X-1 void and the determinate `−10/+10` controls are tiny
flat outline pills — the whole page is a stack of thin bars on black. **Lifting move:** the
sectioned re-shape (one continuous gradient, per the sibling lane) + a backdrop + lift the
control register.

### /feedback/skeleton — VERDICT: fine, but hand-rolled card plate
The pulse/shimmer variants are correct (skeleton legitimately stays opaque per the W54
allowlist). But the "card skeleton" demo (`skeleton.vue:29`) is the X-2 hand-rolled
`rounded-xl border-border/60 bg-card/60 shadow-sm` plate — an off-glass slab. Low severity.
**Lifting move:** use the `<Card>`/`<ShowcaseFrame>` chassis for the card-skeleton host.

### /feedback/confirm-dialog — VERDICT: solid-red destructive register
Live (captured at /containers/dialog, which embeds the same ConfirmDialog,
`fd-comp-empty-states-dark.png`): the "Delete workspace" confirm shows a **solid opaque red
"Delete" pill** on a flat dark card. The destructive register is a saturated slab — the same
opaque-tone class as the toast destructive variant, now on a button. **Lifting move:** the
destructive button/dialog register should be de-saturated toward the iOS tinted-glass model
(the R8 "de-red, more glassy" through-line), consistent with the tone anatomy.

**Feedback band gestalt:** the band exists to demonstrate glass-feedback and currently
demonstrates opaque tone slabs on void pages. The unifying lift is the **tinted-glass tone
anatomy** (one seam, consumed by alert/toast/notification/destructive) + a backdrop per page
+ the trigger-register cleanup. The band should be the showcase of "colored glass that reads
its tone without being a saturated fill."

---

## MOTION band (10 pages) — the violet band: "does it sing?"

### /motion/springs — VERDICT: well-built, the violet is present but UNDER-SPENT in dark
`fd-motion-springs-dark.png`: the page IS well-architected (single-source SPRING_PRESETS,
a live playground with the `linear()` readout + copy, an overshoot meter). The
`--motion-accent` violet fires on the one "spring" chip and the playground dot — and it
pops nicely. BUT: in dark the whole content card is a dark-grey plate, the "NAMED REGISTERS"
caption + body copy are low-contrast grey-on-near-black, the constellation backdrop is a few
near-invisible dots (page-backgrounds lane D: contained constellation too dim in dark), and
the violet is a single small chip in a sea of grey. The page does NOT sing — it's a competent
control panel that reads dim. **Lifting move:** spend the violet harder (the stage frame, the
slider tracks, the overshoot meter could all read the motion-accent within proportion — the
one-color-event budget allows ONE family hue used generously); lift the contained
constellation so it reads in dark; lift the body copy off muted.

### /motion/curve-gallery — VERDICT: R8-16 "looks awful on dark" — the picker is the weak link
`curve-picker-dark-full.png`: the 12-family underline strip
(Standard/Sine/Quad/…/Springs/Custom) reads as a **flat grey row of text on near-black** —
it does not read as a navigation control, just a smudge of grey words. The curve PLOTS below
are good (thick violet 3px stroke, real twin-driven). The R8-16 complaint is precisely the
picker: it's the primary IA and it's invisible/ugly on dark. Plus the broken "Play family"
button (demo-affordances R8-17). **Lifting move:** re-conceive the family picker as a richer
scrolling control (the user floats "another dock"): a glass strip / segmented dock where each
family is a tactile, legible chip with its own register, the active family clearly lifted —
not a flat underline row. This is the R8-16 design ask. Keep the plots.

### /motion/scroll-vt, /motion/reveal, /motion/countup, /motion/animated-digit,
### /motion/typewriter, /motion/underline — VERDICT: clean mechanics, void pages
These are well-built (reveal: minimal `v-reveal` + glass-card rows; underline:
`text-display-3` audacious headlines with the draw-on pen; typewriter/countup/animated-digit:
focused single-feature demos). The mechanics sing; the PAGES don't — all are the X-1 void
(no backdrop) so the glass-cards float on black, and the motion-violet identity is NOT carried
across the band (only springs + curve-gallery read `--motion-accent`; reveal/underline/
typewriter use neutral or `--viz-fourier` red). **Lifting move:** the constellation band
identity (page-backgrounds §4: motion → constellation) + the motion-violet as the band's ONE
coherent color event across every motion page, so the band reads as a coherent place.

**Motion band gestalt:** the curve canon + spring playground are genuinely strong engineering
demos, but the band reads as a set of dim control panels rather than a celebration of motion.
The lift is band-coherence: ONE backdrop identity (constellation/drift), ONE color event
(the violet, spent generously), the picker re-conceived (R8-16), the play-control unified
(R8-17). Then the motion band sings.

---

## COMPOSITIONS band (12 pages) — the gestalt showcases

### /compositions/hero — VERDICT: STRONG, but the CTA is disco
The best-realized page: typewriter headline split around the ℱ-glyph, a live constellation
behind a glass hero, the three-claim card with section-color eyebrows. Sings. The ONE defect:
the "Start building" CTA is `variant="primary-audacious"` (hero.vue:171) = the disco-grain /
sparkle-sweep R8-18 wants retired. **Lifting move:** de-disco the CTA onto the glass-first
button (disco-hover lane); otherwise leave it — it's the gold standard.

### /compositions/math-paper — VERDICT: STRONG (the user's reference idiom)
The section-accent `border-l-[3px]` rail, mono `§ 3 · Convergence` eyebrow, fira-code math
block, du Bois-Reymond blockquote on a paper-grain article. This is the calm-content gold
standard CLAUDE.md cites. Sings in both modes (grid backdrop, though the grid is dim in dark —
page-backgrounds C). One nit: it uses a hand-rolled `bg-card/60 backdrop-blur-sm` article
(X-2) rather than a glass tier — deliberate for the paper feel, acceptable. **Lifting move:**
none structural; just lift the dark grid so the backdrop reads.

### /compositions/auth-shell — VERDICT: STRONG, carefully-engineered
A contained purple→tomato aurora brand panel (the FD §9.2.10 palette, un-orphaned) with a
careful light-locked dark-ink pin so the heading stays legible over the bright field; a
calmer `bg-card/70` form half. This is sophisticated work — the dark-ink-over-bright-panel
trap is solved correctly. Sings. **Lifting move:** none; reference exemplar. (Minor: the form
half is the X-2 hand-rolled plate, acceptable here for legibility-over-aurora.)

### /compositions/empty-states — VERDICT: STRONG, the GooBlob mascot is a delight
A pointer-leaning GooBlob mascot + six empty-state cards with section-color icon chips
(the one-color-event idiom done right: `color-mix(... 25%) chip + full-chroma glyph`), good
hierarchy (`text-heading` titles). Sings. The `border-2 border-foreground/10` cards are a hair
flat in dark but the section-color chips carry the color event. **Lifting move:** none
structural; the paper backdrop could lift in dark.

### /compositions/settings — VERDICT: SOLID, clean
LabeledField-based, the `.section-label--tinted` ONE-coherent-eyebrow register (the prior
four-hue rainbow was killed at W-SUFFUSE D1-8), proper Cards, Separators. Reads well. Nits:
the "Theme: Auto/Warm cream/Neutral" select is a non-functional demo control (fine), and the
page is grid-backed but the grid is dim in dark. **Lifting move:** none structural.

### /compositions/gate-pattern — VERDICT: SOLID, but two disco CTAs
A well-composed non-dismissable-modal idiom (show-close=false, esc/scrim suppressed, the
shake + aria-invalid ring). The two CTAs ("Open the modal demo", "Unlock") are both
`primary-audacious` = disco (gate-pattern.vue:100,155). **Lifting move:** de-disco the CTAs
(R8-18); otherwise clean.

### /compositions/form-validation, /labeled-field, /icon-tooltip, /instrument-chassis,
### /configurator, /drawer-live-behind — VERDICT: functional demos, mostly void pages
These are competent feature demos. instrument-chassis uses the dock-disco primary action
(disco-hover A2); configurator is the chassis the studios compose (covered by the
configurator-occlusion + hierarchy lanes). The common thread is again X-1 (void backdrop) +
X-2 (mixed plate vocabulary). **Lifting move:** the per-category backdrop map + the chassis
unification.

**Compositions band gestalt:** this is the STRONGEST of my three bands — hero, math-paper,
auth-shell, empty-states are genuinely well-designed and demonstrate the house language
(glass, grid, math, audacious type, one-color-event) at its best. The defects are narrow:
the disco CTAs (R8-18, sibling-owned) and the systemic void backdrops (X-1). The compositions
band proves the design language WORKS when a page is fully realized — the lesson for the
weaker feedback/motion bands is to bring them up to this standard (a backdrop, a coherent
color event, a glass chassis, an interesting affordance).

---

## Summary of the lifting program for these three bands

1. **Backdrop every page** (X-1 / page-backgrounds §4) — feedback→paper/subtle-aurora,
   motion→constellation, compositions→per-scene — DARK-recalibrated. The single biggest lift.
2. **Tinted-glass tone anatomy** (feedback band) — ONE tone seam (alert/toast/notification/
   destructive), colored glass not saturated slab, the one-color-event idiom. (toast-glass lane.)
3. **Unify the demo container vocabulary** (X-2) — one glass-routed chassis, retire the
   hand-rolled `bg-card/60` plates.
4. **Unify the trigger + play register** (X-3 / demo-affordances) — content-width interesting
   triggers, ONE play control (Lucide `<Play>`), de-disco the audacious CTAs (disco-hover).
5. **Motion band coherence** — the violet as ONE generous color event across the band, the
   curve-family picker re-conceived as a richer scrolling control (R8-16).
6. **Hold the compositions standard** — hero/math-paper/auth-shell/empty-states are the bar;
   bring feedback + motion up to it.
