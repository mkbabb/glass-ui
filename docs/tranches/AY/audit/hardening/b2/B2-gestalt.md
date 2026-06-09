# B2-gestalt — the 4 as-built substrates as ONE set: cohesion red-team

**Lane:** B2-gestalt · **Verdict:** NOT-COHESIVE · **Date:** 2026-06-09

The four AY Batch-2 surfaces — constellation (W-CON1), blob (W-BLOB2),
dock (W-DOCK1/2), fourier (W-FF2) — each passed its own gate and shipped a real
DELTA. Read TOGETHER, they are **four separate gate-passes, not one perfected,
cohesive substrate family.** The user's bar is STUNNING; what the four DELTAs show
when laid side by side is one genuinely-elegant surface (constellation), one
near-invisible one (fourier on light), and one component (blob) that fights itself
with two clashing color languages and a clipart-sticker shadow. The gates are green
because each gate measures its surface in ISOLATION (body-L floor, bbox-span floor,
onset budget) — none of them measures the four AS A SET, which is exactly the
gestalt the user cares about.

---

## The convergent-optimum reference: constellation IS the bar

Look at `W-CON1-refit-desktop-light.png` / `-dark.png` first — this is the one
surface that is actually stunning and on-brand:

- A recessive grey lattice (`--constellation-alpha` 0.80/0.88) that NEVER fights
  the content, with a single warm focal ring (red on cream, amber on ink) that is
  unmistakably glass-ui's accent language.
- The dock floats over it as a clean glass pill — the two read as ONE composed
  scene (the dock-on-substrate hero the band is supposed to deliver everywhere).
- Light↔dark is a true token re-resolution: the field recedes, the focal warms.

That is the convergent optimum. The other three are measured against THIS, and
three of three miss it on at least one axis.

---

## FINDING 1 (highest-leverage) — blob has TWO clashing identities one cell apart

`W-BLOB2-goo-blob-desktop-light.png` (the resting default) is a **muted
butter-tan / khaki bead** (OKLCh L≈0.81, hue 78 — yellow-orange).
`W-BLOB2-blob-mood-hover-frame{1..5}-desktop-light.png` (the mood hero, "idle"
mood, SAME component, SAME page, one section down) is a **hot fluorescent
coral-pink ball** (seed `oklch(0.62 0.19 25)` pushed near-neon by the shader's
SSS/iridescence). These two are the SAME `<GooBlob>` and they share NO color
language:

- The cream default reads SOTA-restrained, calm, on-brand-warm.
- The mood ball reads like a 2010 lava-lamp toy / a Poppit candy — saturated,
  juvenile, the single LEAST glass-ui-feeling pixel in the whole set.

The user scrolling `/substrates/blob` sees the calm cream bead, then the toy-pink
ball, and the page has no single blob identity. W-BLOB2's gate
(`proof:blob-warm-default`, body-L ≥ 0.62) only measures the RESTING default; the
mood hero's neon is entirely unmeasured. **This is the single highest-leverage
refinement in the set:** pull the mood/seed-derived palette into the same warm,
de-saturated, glass-ui register as the cream default (lower C, the OKLCh
chroma the shader amplifies) so the blob has ONE identity across rest+mood, in the
same family as the constellation focal and the FF comet.

## FINDING 2 — the blob shadow is a Memphis sticker stamp, not a gel-bead contact shadow

`GooBlob.vue:229-232` — the wrapper drop-shadow is
`drop-shadow(5px 5px 2.5px color-mix(in srgb, var(--blob-color) 20%, var(--foreground)))`:
an 80%-near-black, hard-offset `5px 5px` stamp. Visible in EVERY blob capture
(`goo-blob-desktop-light`, `-mobile-light`, `-desktop-dark`, all 5 mood frames) as
a harsh dark shadow flung down-right. It makes the "living gel bead" read as a
**clipart sticker pasted on the page** — a flat decal, not a lit dome sitting in a
scene. This is OUT of register with the entire rest of the set: constellation, FF,
and aurora all use soft ambient light with no hard offset. The cartoon offset-stamp
belongs on `<Card surface="cartoon">`, not on the SOTA gel bead. A gel bead wants a
soft, centered, low-offset ambient contact shadow (small blur-up, near-zero offset,
ambient-tinted), not the cartoon `5px 5px` Memphis stamp. NOT measured by any gate.

## FINDING 3 — fourier is STILL near-invisible on the light register (the headline fix half-works)

W-FF2's DELTA headline: "the chronic AX→AY visible-invisibility is CLOSED... the
`final` preset READS as a full-frame phosphor comet, light AND dark, no longer a
corner stub." The DARK capture (`W-FF2-fourier-field-desktop-dark.png`) genuinely
delivers — the additive `lighter` fork lifts a clean red beam across the frame. But
the LIGHT capture (`W-FF2-fourier-field-desktop-light.png` + `-mobile-light.png`)
shows the `final` preset as a **faint pink pencil arc** occupying ~15% of the panel,
and the `hero` preset as ghost-grey epicycle circles barely above the cream. The
gate (`proof:fourier-field-visibility-live`) asserts a bbox SPAN ≥25% and a non-zero
trail mean — both pass on a ~1px faint stroke that SPANS the frame without being
VISIBLE. Span ≠ legible. On the cream `source-over` register the `peakAlpha 0.45 ×
intensity 0.4 ≈ 0.18` stroke over warm cream is below the "reads as a comet" bar the
DELTA prose claims. The light fork needs more weight (a darker/denser stroke or a
higher light-mode peakAlpha) — the dark fork is the only one that currently looks
SOTA. The four are NOT cohesive across light mode: constellation reads on cream, FF
barely does.

## FINDING 4 — cross-substrate RECESSION knob parity is broken

Three of the four live substrates expose an outer-envelope intensity knob so the
substrate can RECEDE behind content (the band's "live substrate behind a glass
card" pattern):
- Aurora: `opacityCeiling` (default 1; `StoryHero` sets 0.4–0.6).
- FourierField: `intensity` (default 1; `StoryHero` threads `opacityCeiling` →
  `:intensity`, W-FF2 D11 parity).
- Blob: config-level palette/quality atoms.

**Constellation has NONE** (`Constellation.vue:58-102` — no `opacityCeiling`/
`intensity`/`alpha` prop; it paints at the full `--constellation-alpha`). So in
`StoryHero.vue` the aurora and fourier heroes recede to 0.4–0.6 behind the prose,
but a constellation hero CANNOT — it sits at full strength while its siblings dim.
The four don't share the ONE compositing-envelope contract that would let them be
dropped behind content interchangeably. This is the W-FF2 "3-substrate parity" claim
left at 3-of-4: fourier was threaded, constellation was skipped. (The
`--constellation-alpha` token is mode-tuned but it is NOT the per-instance outer
envelope the other three carry.)

## FINDING 5 — the unifying accent fractures at the blob

The accent that SHOULD bind the set is a warm red:
- Constellation focal: `--primary` (warm red-ink).
- FourierField: `--viz-fourier` = `oklch(0.579 0.201 30.4)` (red-orange).
- Blob mood seed: `oklch(0.62 0.19 25)` (red basis) — but RENDERS fluorescent
  coral-pink (Finding 1).
- Blob default: hue 78, butter-tan — abandons the red family ENTIRELY.

So three of four nominally share a red basis (good — that IS a latent cohesion
seam), but the blob breaks it twice: its default leaves the red family for khaki,
and its mood over-saturates the red into neon. If the blob were brought into the
warm-red-but-desaturated register (Findings 1+2), all four would share ONE accent
identity — that is the cohesion win sitting right there, unclaimed.

## FINDING 6 — the dock's own-surface DELTA is OWED, so the dock half of the set is unverified in-context

W-DOCK2's HG6 own-surface frame-series (`^W-DOCK2-.*-light/dark.png`) is OWED
(`live-pending`, on `VISUAL-ALLOWLIST.json`). The only dock captures that exist are
W-DOCK1's `/dock/overview` overview page, which is a PROSE+CODE documentation page
(`W-DOCK1-dock-overview-hover-expand-desktop-light.png` is a wall of body text with
a vertical icon rail) — NOT a dock-over-living-substrate hero. So for the gestalt
question "do the 4 cohere," the dock's contribution is evidenced ONLY by the clean
glass pill incidentally visible in the constellation captures. The dock-as-its-own-
surface is not capture-verified in the set. Until W-DOCK2's PNGs land, the dock leg
of the gestalt is asserted, not shown.

## FINDING 7 — light-vs-dark cohesion is uneven across the set

- Constellation: both modes stunning (field recedes, focal warms). PASS.
- Blob: both modes hold the cream bead, but BOTH carry the sticker shadow (F2) and
  the dark-mode shadow `goo-blob-desktop-dark` flings a hard black halo that reads
  even worse on the dark ground.
- FF: dark STUNNING, light NEAR-INVISIBLE (F3). The asymmetry is the opposite of
  the blob's.
- Dock: unverified (F6).

There is no single "the set looks great in light, the set looks great in dark"
statement that holds. Each surface is strong in a DIFFERENT mode. A cohesive set
would be strong in both, together.

---

## Deferred / booked items that touch the gestalt

- W-DOCK2 HG6 own-surface DELTA — OWED (orchestrator-captured), dock not shown
  in-set.
- W-DOCK2 HG4 (ONE FLIP engine), HG5 (rail persistence), §F2 (#persistent
  first-mount mis-seat) — all BOOKED to W-GOD1; the dock's structural cohesion is
  not yet whole.
- Constellation outer-envelope recession prop — never specced (F4); the 3-substrate
  parity is really 3-of-4.

---

## Gestalt verdict

**The component-SET is NOT perfected end-to-end.** It is one perfected surface
(constellation — the bar), one strong-but-light-broken surface (fourier), one
self-fighting surface (blob: two color identities + a sticker shadow), and one
unverified-in-context surface (dock). The gates are green because they measure each
surface alone; the SET-level cohesion (one accent family, one recession contract,
one shadow/lighting language, both-mode strength) is unmeasured and, as built,
absent.

**Highest-leverage refinement (one move, biggest cohesion gain):** bring the blob
into the set's language — (1) de-saturate the mood/seed palette into the warm-red,
lower-chroma register the constellation focal and the FF comet already speak so the
blob has ONE identity that matches its siblings, and (2) replace the `5px 5px`
near-black cartoon offset-stamp shadow (`GooBlob.vue:229`) with a soft ambient
contact shadow. That single move fixes Findings 1, 2, and 5 at once and pulls the
worst-offending surface into the constellation-defined optimum. Second-highest:
lift the FF LIGHT-mode stroke weight (F3) so cream-mode fourier is as legible as its
dark fork. Third: give constellation the outer-envelope recession prop (F4) so all
four share the compositing contract.
