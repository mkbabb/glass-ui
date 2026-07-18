# REFABLE crit — RU-07 GF-AURORA + RU-08 GF-BLOB (fresh-critic pass)

- verified-model: claude-fable-5—read verbatim from this seat's system context ("The exact model
  ID is claude-fable-5").
- role: fresh Fable critic on the REFABLE greenfield redo; authored none of the unioned designs;
  every decision presumed wrong until it convinced me against disk, the 18-law codex
  (`../ios27/IOS27-CODEX.md`), the suffusion matrix
  (`../../../IOS27-MICRO/analysis/SUFFUSION-MATRIX.md`), the measured timelines
  (`../ios27/refable-timelines/`), the feedback ledger (`../../FEEDBACK-LEDGER.md`), REFABLE-RF-3,
  SUPERFLUITY, and the sources at HEAD.
- inputs read in full: `GF-AURORA-PASS3.md`, `GF-BLOB-PASS3.md`, `REFABLE-RU-07.md`,
  `REFABLE-RU-08.md`, the codex, the matrix, `sr-0624-2144.md`, RF-3, SUPERFLUITY F08/F33/C-H,
  `round-3-live/07-08-aurora-va95-notes.json`, and the aurora/blob sources at HEAD (shaders,
  bridges, presets, tests, demo studio). Era-1 claims checked in value.js at `88f8f09^`
  (read-only).

## 0. What survived scrutiny (stated so the findings below are calibrated)

The two unions are substantially sound. Facts I independently re-verified and confirm:

- Aurora: the WGSL collapse (`aurora-mediums.wgsl.ts:399-401`), zero WGSL derivative use
  (comment-only hits), `relightImpasto`'s `dFdx/dFdy` (`brush.glsl.ts:269-273`), `mediumVangogh`'s
  unconditional relight call (`vangogh-medium.glsl.ts:226`), the false parity comment
  (`vangogh-medium.glsl.ts:8`), the `profileFor(MEDIUM_OILPASTEL)` skin (`mediums.glsl.ts:493-496`),
  the stale `uniformBridge.ts:76-79` smooth-core claim, the 17-preset register with the exact line
  anchors (591/624/656, 320/360/462, SPEEDTEST in the 685-703 map), the stale lib header
  (`constants/presets.ts:4-6`, 11 names), the broken 13-pin
  (`tests-visual/substrate-paints-color.spec.ts:148`), the CANDIDATES trio
  (`aurora-vibrancy.spec.ts:33`), both studio reachability defects (`config/options.ts` — no
  `curl`, no `tensor`; the types carry both), the DUSK/SUNSET L-spans (0.50-0.91 vs 0.52-0.93,
  same drift-ladder family), and the 17→11 arithmetic (4 solar + 7 heroes + 6 removed = 17, keys
  map 1:1 to disk). The `cfg()` wrapper genuinely merges `overrides.interactivity`
  (§3.8's "dead by omission" correction of RF-3 row 28's "FORCED" is right), and
  `AuroraInteractivity.light` exists, so METAL's exerciser is type-legal.
- Aurora V-A95: the re-frame matches `07-08-aurora-va95-notes.json` exactly — 3/3 reverse-drags
  clean on live WebGPU, the only black state self-inflicted by `getContext()`. The W6 shrink to
  retire-or-confirm is the correct reading.
- Blob: the gel-dome pair (`Blob.vue:355`), `morphT` as a surface axis (`types.ts:274,430`),
  orbit 0.17 < body 0.22 (`types.ts:297-300`), `BLOB_HERO` orbit 0.30 (`presets.ts:53-70`),
  the settled/U3 seam (`useMetaballRenderer.ts:74-88`), `uShadow` as interior-only AO
  (`metaball.frag.ts:423-427`), sleepy `pointerAttraction` computing +0.1144 and curious +0.248
  from the authored surface, `specStrength 0.16 / iridescence 0.09`, WebGPU-first
  (`README.md`, `useMetaballRenderer.ts:92-95`), the 50ms hard dt clamp
  (`blobSimulation.ts:114`), and the era-1 references byte-exact in value.js at
  `88f8f09^`=`06929a4b` (`cursor-repulsion.ts:6-8` — 1.2/0.25/0.08; HeroBlob shadow
  `5px 5px 2.5px` @20%, hover `7px 7px 3px` @25%).
- Physics: the deflate correction (D2) matches `sr-0624-2144.md` P5 verbatim — staged axes,
  squash completes before width, critically damped width, sparkle bloom carries the energy,
  light leads ~80ms (P1). The law-6 fence matches P9. The dot-ring demotion matches P8.
- Process: both consumer-relay obligations are present (aurora RT8 speedtest-preset relay in the
  one batch; blob R6 value.js addendum at W-FINAL) — no consumer breakage without an addendum.
  Both designs fence the dock explicitly (aurora: no dock contact; blob §2.2: the codex `:44` goo
  bullet names the dock's nav surface) — no scope duplication against IOS27-MICRO. Ledger counts
  reconcile (RU-07 8/8/12; RU-08 3/7/6 over D1-D16). The RU-07 anchor map matches the file on
  disk section-by-section.

The findings below are what did NOT convince me.

---

## RU-07 GF-AURORA

### A-1 [MAJOR] — DUSK re-found + DAWN/DUSK death clauses contradict named user verdicts with no routed ask

A13: "Extant exemplars (sky, dawn, dusk) good — how can they be better." F08: "focus on the
best-designed auroras (sky, sunset, dusk, …)." The user names dawn and dusk positively, twice.
The union (§3.6) replaces DUSK's entire visual identity (warm coral-rose mass → low-L
indigo/violet twilight) and arms capture-judged death clauses on BOTH re-founded configs ("Round-2
death clause applies to THIS config"; DAWN "dies in round two only if capture still confounds").
§8 then declares "User ASKs: none open." F04 is explicit that reduction questions are relayed to
the user; deleting or wholesale re-founding an exemplar the user called good is exactly that class
of question, and a π-QUARTET capture judge is not the user. The duplication charge against extant
DUSK is real (verified: same value structure, same ladder family), so re-founding is defensible —
but it must be ratified, not self-ratified. Note also the §3.6 arithmetic line names only the OIL
contingency (11 → 10) while the live DUSK/DAWN death clauses can take the register to 9 — the
headline's elasticity is understated.

**Fix**: add one routed user question (Q-AURORA-QUARTET class): (a) ratify the DUSK re-found
(before/after captures at π-QUARTET), (b) convert the DAWN/DUSK death clauses to
user-judged — default if silent: harden-not-delete, slots retained. Restate the headline as
"17 → 11 (floor 9 under the W4-KILL + death-clause contingencies)."

### A-2 [MINOR] — G-MODE-DISTINCT binds the (metal, metal-gradient) pair with no owning disposition

The gate demands descriptor distance D ≥ τ for EVERY unordered pair of shipped mediums, and §3.3
keeps both 8 and 9 selectable. RF-3 row 22 (RATIFIED) establishes metal-gradient as a near-skin of
metal — the same `metalShade` BRDF over a luma-flattened base plus sparkle
(`metal-medium.glsl.ts:90-115`). If that pair lands D < τ at W0, no wave authors a cure, no arm
deletes id 9, and no gate clause exempts it — the suite could be terminally RED with no owner. The
"RED today" enumeration names only the painterly collapse rows; the design is silent on this pair.

**Fix**: at W0, when τ is pinned, measure the (metal, metal-gradient) pair FIRST and declare its
terminal disposition in the gate text: either it clears τ (record it), or an explicit named
finish-pair exemption with rationale, or a fold/kill arm for id 9.

### A-3 [MINOR] — the law-11 "visible-migration floor" is BINDING but unmeasured

§3.1 declares, "NEW and binding on the register: every survivor preset must visibly migrate over
tens of seconds… while staying under the churn ceiling," with the SPEEDTEST B21 anchor. No gate
carries it: W0 pins only ε and τ; G-PRESET-HONEST judges authored-field duplication; π-QUARTET
judges L-histogram separation, not drift. "Visibly migrate" and "the churn ceiling" have no
numbers anywhere — a binding constraint with no falsifier, the exact vacuous-language class this
campaign is supposed to kill.

**Fix**: pin the floor at W0 with the τ/ε batch — e.g. minimum nucleus-centroid displacement over
a 30s capture (in field-normalized units) plus a churn ceiling (max L-delta rate), attached as one
clause to G-PRESET-HONEST and sampled at π-QUARTET/π-GALLERY.

### A-4 [MINOR] — METAL's cursor-as-light self-licenses against suffusion row K's dash-is-law, unrouted

Row K withholds engagement light from substrates ("its own light economy admits no second light
system"; "must never read as clickable"), and the matrix preamble makes a dash law. §3.8 arms
`interactivity:{ light: true }` on METAL and §3.1 waves the conflict off inline ("metal's
cursor-raked catch is the field's own relight — licensed"). The argument is decent — pointer
parameterizes the EXISTING `uLightDir` system, no second system is added — but a license against a
matrix dash is exactly what RU-08 routed properly (R5, the mascot-register annotation on row K).
RU-07 proposes no matrix annotation; the license lives only inside the aurora doc.

**Fix**: add an RT row proposing the row-K annotation (cursor-as-light on the metal medium =
pointer-parameterization of the field's one light system; position-mapped, no press affordance),
or drop `light:true` and leave the axis documented-dead.

### A-5 [MINOR] — sidecar provenance contradicts the file's own materialization note

`REFABLE-RU-07.md` Step-3 states "GF-AURORA-PASS3.md rewritten in place" by the union seat. The
PASS3 materialization note states the union seat's rewrite never landed and the file on disk is a
walled predecessor's salvage draft, verdict-checked and written by a third seat. The note is
honest; the sidecar alone now misleads — a reader of the canon ledger learns a false chain of
custody in a campaign whose whole premise is provenance discipline.

**Fix**: one-line amendment to the sidecar's Step-3 (salvage-materialized per the PASS3 note,
verdict-conformance checked), nothing else.

---

## RU-08 GF-BLOB

### B-1 [MAJOR] — grab-and-fling conflates two measured spring regimes into one impossible spec

§2.7/D12: "release absorbs v0 as an initial condition (duration-stable τ≈130ms class), at most
one ~9% overshoot." The codex separates these by construction: law 14(a) is the duration-stable
snap — ζ≥1, τ≈130ms, NO overshoot, and "single-channel flight—no scale, fade, blur, or parallax";
law 14(c) is the release spring — ζ≈0.75-0.85, ~250ms flight, the single ~9% overshoot. One spring
cannot be ζ≥1 and overshoot 9%; citing "τ≈130ms class" with an overshoot allowance is a physics
claim contradicting the measured record it cites. The squash-and-stretch channel compounds this:
if the release claims 14(a), deformation-in-flight violates its single-channel clause verbatim.

**Fix**: split the regimes per law 15's own seam — slow place/short release rides 14(a) (ζ≥1,
τ≈130ms, no overshoot, deformation released BEFORE flight); flick release rides 14(c)
(ζ≈0.75-0.85, ~250ms, ≤ one ~9% overshoot). Name which preset each gesture path takes in the W0
contract; never blend constants across the (a)/(c) rows.

### B-2 [MINOR] — G-SAT-INK's RED-at-HEAD is wrong, and the WGSL twin is unbudgeted

The gate claims "*RED:* one body color for all bodies." HEAD already ships the per-satellite ink
seam on the WebGL2 path — `uSatColor[]`/`uSatColorAmt[]`/`uSatColorActive`
(`metaball.frag.ts:227-245`, `uploadBlobUniforms.ts:109-117`), default-off. Meanwhile the WGSL
PRIMARY has no such seam at all (zero `satColor` hits in `metaball.wgsl.ts`/the WGPU bridge). So
the true state is: capability present-but-off on the fallback, absent on the primary. As written,
W-IDENT could go green by flipping defaults on WebGL2 while the WebGPU-first default renders no
ink — caught only later at π-PARITY, with the primary-side shader authorship never costed.

**Fix**: restate the RED ("seam default-off on WebGL2; seam ABSENT on the WGSL primary") and add
the WGSL `uSatColor` twin explicitly to W-IDENT's scope line; G-SAT-INK judges on the primary.

### B-3 [MINOR] — "no new config axis" is contradicted by BLOB_GLASS's own requirements

§2.1 claims the two surface presets carry the registers with "no new config axis." `BlobSurface`
at HEAD (`types.ts:180-238`) has no aurora-streak term, no velocity-keyed caustic term, no
refraction term, and no provided-backdrop-texture input; `BlobColor` has no technicolor multi-ink
path beyond the satellite seam. BLOB_GLASS ("low backdrop ghosting against a PROVIDED texture,
strong rim refraction, the same streak") is not expressible as a preset of the existing config —
W-STREAK/W-IDENT must add real config surface, and a provided-texture input is a genuinely new
input axis (the class aurora ruled studio-only for `source:"image"` on asset-dependency grounds,
§3.8 of the sibling doc). The claim reads as the elegant-reduction reflex the self-critique says
it avoided.

**Fix**: own the additions — enumerate the new `BlobSurface` fields (streak, caustic, refraction,
texture source) in W0's contract-lock, and either justify the texture input against the
asset-dependency objection or scope BLOB_GLASS's ghosting to a procedural stand-in.

### B-4 [MINOR] — the sleepy sign is an authored-surface output, not a wiring defect, and the cure is undesigned

§2.4 frames +0.114 as "only the sign reaching it is wrong." The value is the correct output of the
RATIFIED `paramsFor` surface: `lerp(-0.2, 0.6, valence·0.5+0.5)` crosses zero at valence −0.5, and
sleepy sits at −0.1 by authored intent (`constants.ts:52,95` — "Pleasant + activated leans IN;
unpleasant shies AWAY"). Making sleepy repel while keeping "one principled surface, five named
moods as samples" requires either moving MOOD_AVA.sleepy's valence below the crossing (dragging
satShift/brightness/hueRange with it) or special-casing the sign and breaking the one-surface
principle. The design ratifies the surface AND demands the repel without choosing.

**Fix**: decide in W0's contract-lock. Recommended: re-place sleepy in the circumplex (valence
≈ −0.6, arousal 0.1) and accept the derived palette-cooling as the point of the derivation — a
sleepy blob goes dim and withdrawn on ONE surface; no sign special-case.

### B-5 [MINOR] — G-MOOD-READ names no judge

"Each named mood is identifiable from a 3s silent capture by its channel signature" — identifiable
by WHOM, at what threshold? Without a pinned protocol this is taste wearing a gate's name (the
design itself flags it as softest). Every other gate in the suite names a measurable.

**Fix**: pin the protocol at W0 — either blinded-agent identification (N captures, majority label,
threshold ≥ k/N) or a descriptor-stat separation (per-channel signature vectors pairwise-separated
by a pinned margin), and write the chosen falsifier into the gate text.

---

## Disposition summary

| unit | finding | severity |
|---|---|---|
| RU-07 | A-1 DUSK/DAWN re-found + death clauses vs A13/F08/F04, no user ask | MAJOR |
| RU-07 | A-2 (metal, metal-gradient) pair unowned under G-MODE-DISTINCT | MINOR |
| RU-07 | A-3 law-11 migration floor binding but unmeasured | MINOR |
| RU-07 | A-4 METAL cursor-light license unrouted vs matrix row K | MINOR |
| RU-07 | A-5 sidecar Step-3 provenance contradicts the materialization note | MINOR |
| RU-08 | B-1 grab-and-fling mixes law 14(a)/(c) regimes | MAJOR |
| RU-08 | B-2 G-SAT-INK RED wrong; WGSL ink twin unbudgeted | MINOR |
| RU-08 | B-3 "no new config axis" false against BLOB_GLASS | MINOR |
| RU-08 | B-4 sleepy-repel mechanism undesigned vs the ratified surface | MINOR |
| RU-08 | B-5 G-MOOD-READ judge unpinned | MINOR |

Neither union is overturned: the aurora thesis (mode ⊥ palette ⊥ backend, dedicated bodies under
parity, the honest register) and the blob identity inversion (technicolor creature wearing the iOS
light grammar; staged-axis deflate; the sparkle nucleus) both convinced this critic against disk
and the measured record. The two MAJORs are a user-sovereignty breach (A-1) and a physics-spec
contradiction (B-1); both are cheap to cure and neither invalidates the wave shapes.
