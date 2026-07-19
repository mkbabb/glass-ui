# CHARTER — pass 3 (IOS27-MICRO): the union charter

Seat: p3:CHARTER. Verified-model: claude-fable-5 (the system-context model ID, returned
verbatim). 2026-07-19.

Inputs consumed whole: the PASS-2 verdict organs (`../PASS-2/AGGLOMERATION.md`,
`../PASS-2/ARBITRATION.md` — the F1×F3 SPINE-CONDUCTOR merge), `../../analysis/NOVELTY-ROSTER.md`
(post-critique canon; its §6 HANDOFF and the seven QUEUED-PAINT ledgers are this charter's work
orders), the five EXEMPLARS-2 organs (`MARKS-C-MUSIC.md`, `MARKS-C-APPS.md`, `MARKS-D-SIRI.md`,
`MARKS-D-POPOVER.md`, `MARKS-E-NOTIFICATION.md`), `corpus-redo/CORPUS-SYNTHESIS.md` (the 21-item
ranked feed + the 65-row breath-of-life map), `MARKS.md` (C1–C7) + `SUFFUSION-MATRIX.md`, the
codex `../../../BJ/formation/ios27/IOS27-CODEX.md` (amended in place by this seat — §1.8), the
PASS-1 X2 research (`../PASS-1/research/X2-codebase-motion.md` §8), and the on-disk spring table
(`src/composables/motion/spring/springPresets.ts`, read this session).

The laws standing over every order: THE DRAFTING LAW (user, 2026-07-19, verbatim-standing):
"we don't want to recreate these UIs directly: just their abstract concepts, animations, etc.
We should have these generalized component facilities for their atomic affordances." Every
deliverable below is a register, contract, state machine, or component facility — never a
screen recreation. Our design language governs: warm cream, deft rounding, our palettes, our
glass (the ONE warm frosted canon, NOVELTY-ROSTER §3.5-A). Evidence discipline: file:line pins;
measured claims cite fits; MEASURED/BOUNDED/INCONCLUSIVE honestly; gate bands from MARKS with
`[DESIGN]`/`[REG-LOCK]` labels where corpus is silent; paint-side sampling; both engines; the
browser-seat singleton; DEVICE-DEFER/TOOL-DEFER fenced out of gates, never silently upgraded.
Precedence where texts disagree: this charter's §1 rulings → ARBITRATION ruling → cured spec →
prototype comment. Src stays untouched this tranche — every on-disk change ruled here is
EXACT TEXT executed at the FINAL wave set (the pass-2 U1 precedent; BJ owns src).

All spring arithmetic in §1 uses f_d = (1/response)·√(1−ζ²); every derived figure below was
re-computed by this seat, not quoted.

---

## 1. THE REGISTER RULINGS

### R-1. The arrival register, ruled per-preset — and the 0.30→0.35 question ADMITTED

The corpus union (CORPUS-SYNTHESIS §1.1): ζ 0.61–0.88, f_d 1.4–2.1Hz, single overshoot,
monotone return, overshoot velocity-BOUGHT at k≈0.02s [0.016–0.030] — eleven independent
60fps fits (CC release ×3, detent arrival, ballistic arrival, Maps fling, Music collapse ×2,
popover open ×3) across two corpora and three seats. ζ is dead-consistent at 0.80–0.83 on
every dock-class event; f_d genuinely varies per surface (~1.6Hz dock landings, ~1.8Hz
popover opens) — a real ±0.15Hz cross-surface spread no single row can center. Rulings:

| preset (on disk) | pair ⇒ f_d | ruling |
|---|---|---|
| dock {0.30, 0.82} ⇒ 1.91Hz | **AMEND response 0.30→0.35, ζ 0.82 HELD** ⇒ f_d 1.63Hz | the row is named for DOCK landings, so it centers on dock events: Music collapses ζ0.83/f_d 1.60–1.62 ×2, Maps ζ0.80/f_d 1.7, the C2 re-derivation tail 1.62Hz — MARKS-C-MUSIC's two fresh fits turn the C2-optional nudge into the centered choice (`MARKS-C-MUSIC.md:283-286`). 0.35 sits inside every dock-event bracket ([1.52,1.70], [1.36,1.80], [1.4,2.0]); zero-seed overshoot at ζ0.82 is 1.1% — the [0,10%] fence holds with room |
| — the popover residual, named honestly | D-POPOVER fits 1.7–1.95Hz | MARKS-D-POPOVER ratified dock-as-is INSIDE its brackets; at 0.35 the anchored-menu enter sits 0.065Hz below its own bracket. The residual is ~4%, under the cross-surface spread. If the popover enter reads dead after adoption, the licensed cure is a per-consumer response override at the presets-in-consumers seam — never a table fork |
| press {0.20, 0.80} ⇒ 3.0Hz | STANDS | not an arrival row — the sub-200ms tap answer; the corpus bracket does not govern it (the press-ack story is law 20's envelope + light-first ~50ms, MARKS-C-MUSIC mark 1) |
| snappy {0.48, 0.74} ⇒ 1.40Hz | STANDS | control movement at the bracket floor; corpus-compatible |
| smooth {0.58, 0.80} ⇒ 1.03Hz / gentle {0.82, 1.0} / transient {0.62, 0.90} ⇒ 0.70Hz | STAND | entrance/settle registers, not gesture arrivals; they obey codex law 19 by construction (calm geometry; any liveliness belongs to the light channel) |
| bouncy {0.60, 0.60} ⇒ 1.33Hz | STANDS as `[DESIGN]` | ζ0.60 sits just under the corpus arrival floor (0.61); it is a deliberate emphatic one-shot, never citable as corpus |

This ruling DECIDES the spring half of ARBITRATION §1.5 item 8 once: the overpull constant
(0.35, ζ0.80) and the dock row converge at response 0.35; ζ stays the table's 0.82 (the union
center of 0.80/0.82/0.83/0.83). Nobody re-litigates between here and the FINAL wave set.

### R-2. springPreset("panel") MINTED — {response 0.40, ζ 0.71} — and the roster's note corrected

The fired-presentation register, measured at MARKS-D-SIRI mark 3: ζ=0.71 [0.66–0.73],
f_d=1.75Hz [1.70–1.85], both axes ONE spring, 4.5–4.8% INTRINSIC overshoot, settle ~250ms from
rest-crossing (independently re-derived on resume, brackets held). The minted row:

```
{ name: "panel", response: 0.40, dampingFraction: 0.71 }
// A fired presentation deploy — both axes one spring, intrinsic 4-5% overshoot,
// text born blurred condensing ~190ms, the rim flare celebrating the data (+0.5s/+0.85s).
```

**Correction to NOVELTY-ROSTER (X-CHOREO row + card 7): the noted "panel (0.30-0.35, ζ0.71,
f_d 1.75Hz)" is arithmetically inconsistent** — at ζ0.71, response 0.30 ⇒ f_d 2.35Hz and
0.35 ⇒ 2.01Hz, both far outside the measured [1.70, 1.85]. Only response ≈0.40 ⇒ 1.76Hz
reproduces the fit. The measured (ζ, f_d) pair is the authority; the response figure was a
drafting slip, corrected here. Panel is the ONE class where overshoot is NOT velocity-bought
(codex law 14(e)) — a fired black dock on the gesture register lands dead; the measured
constant is already paid for.

### R-3. springPreset("orb-drop") MINTED — {response 0.22, ζ 1.0}

The invocation-drop register, MARKS-D-SIRI mark 1: 215±33ms flight, smooth deceleration,
extent pins DEAD at 60fps — zero overshoot, the underdamped alternative rejected by the
tracker; the energy display is the ~700ms aurora build AFTER geometry lands, never bounce.
ζ=1.0 is MEASURED (critical); response 0.22 is `[DESIGN]` inside the measured flight bracket
(a ζ=1 spring at response 0.22 reaches 98.5% at 215ms). The minted row:

```
{ name: "orb-drop", response: 0.22, dampingFraction: 1.0 }
// The invocation drop — a dead critically-damped landing; the energy is the light build.
```

Gentle {0.82, 1.0} keeps the patient end; orb-drop is the brisk critical row. The
two-registers-two-intents law (orb critical / panel underdamped — NOVELTY-ROSTER H-5's codex
candidate) is hereby ADMITTED and lives in codex laws 9 + 14(e), written in place (§1.8).

### R-4. The X2 §8.1/8.2 collisions RULED — both dissolve; the header-comment drift cured

X2-codebase-motion §8 items 1/2 flagged two fence collisions against the springPresets.ts
header (`springPresets.ts:55-58`, the [0,10%] overshoot fence):

- **§8.1 (anti-taffy ≤1.2 vs overpull −21%): DISSOLVED-PENDING** — the −21% height-compression
  constant is exactly F1 OG1's open re-grade (read from burst24-overpull or re-grade to
  `[DESIGN]`, AGGLOMERATION §4-F1). No bound-compression register is minted until that
  re-grade lands; the travel-squish fence stands meanwhile.
- **§8.2 (overshoot ≤10% vs springback 30–50%): DISSOLVED OUTRIGHT** — MARKS C1 voided the
  springback bracket (finger-owned motion) and C2 killed the 32–33% overshoot class (measured
  1.3%/0.8% zero-seed). "SUFFUSION §6 q2 DISSOLVES. No 30–50% intrinsic overshoot exists
  anywhere in the corpus" (`MARKS.md:391-393`). **The [0,10%] header fence STANDS whole; no
  out-of-fence preset rows exist or will be minted.** Overshoot beyond the fence lives where
  it always did: in the scalar's velocity-seeded trajectory (the k·v law), displacement
  domain, never in a timing function. Panel's 4–5% intrinsic overshoot sits INSIDE the fence.
- **The on-disk header-comment drift (X2 §8.3's kin, re-flagged by CORPUS-SYNTHESIS §1.4-5):**
  `src/styles/tokens/scheme-spring.css:31` still carries the refuted "dock: (0.68s, ζ=0.64)"
  comment against the table. CURE ORDERED at the FINAL wave set: one regen pass re-derives the
  scheme-spring header from `SPRING_PRESETS` (the no-second-authority root), which also lands
  the R-1/R-2/R-3 rows and their curves in the same stroke. Until then the table is the truth
  and every comment is suspect — never trust a remembered literal.

### R-5. NEW codex law 19 ADMITTED — overshoot lives in the light channel; position lands dead

Cross-video, three independent measurements (V-B §1.2 condensation humps in both CC opens;
V-A §1 the a1 arrival bloom 15–20% wide cooling ~250ms; V-B §1.4 the b3 held-light release
~250ms after a ≤17ms cut): geometry never overshoots without velocity, entrance LUMINANCE
does. ADMITTED as codex law 19, exact text written in place (§1.8). Consequence for the
architecture: the light channel is a NAMED trailing channel of the merged kernel (ARBITRATION
R1's three lens-light inputs), and corpus feed #5 (the light-cool clock, in 0 files on disk)
becomes SPINE-CONDUCTOR + F5 build work with a law behind it.

### R-6. NEW codex law 20 ADMITTED — the hold envelope: engagement light is state, not event

V-B §1.5/C-B5, measured through a multi-second hold: charge +15L at the birth frame → peak
+41L (~+35%) at +160ms → SUSTAIN for the hold's entire life → release ~250ms after commit;
the endcap strain light (+65%, BOUNDED) its kin. ADMITTED as codex law 20, written in place
(§1.8). It generalizes MARKS §3's press-charge and gives `--engage-t` its full measured arc;
`engageEnvelope(role)` (§3.5-B) is its shipped vocabulary; corpus feed #2 (the tabs/dock wash)
is its first consumer.

### R-7. The τ half of ARBITRATION §1.5 item 8 — release arm RATIFIED, attack arms to the battery

The content-channel release τ is now corpus-attested at the ~55ms class THREE independent
ways (Music transport τ≈54ms, art tail τ≈57ms, Codex/Gemini composer τ≈58ms) — both dialects'
release arm (55ms) is corpus-true and RATIFIED. The attack arms (F1 65 vs F3 70ms content;
20 vs 30ms medium) remain inside the measured bands (the medium cliff is a ≤33ms slam,
CORPUS-SYNTHESIS §1.1 — both dialects comply) and are decided ONCE by the merged union
battery, not by taste and not here. The superseded dialect becomes history in the probe
supersession headers, per the worklist.

### R-8. The codex reconciled ON DISK — 8 amendments + the 7(b) void + 2 new laws, written in place

Executed by this seat, 2026-07-19, provenance-stamped `[CORPUS-REDO 2026-07-19, p3:CHARTER]`
in `IOS27-CODEX.md` (header provenance line added; the recorder-hitch METHOD LAW added to the
evidence basis):

| law | amendment written |
|---|---|
| 1(a) | amended to a bound — ramp distance 60–85pt; "~20pt" ceiling unprovable; backplate = full-width band, never an ellipse |
| 6 | waist 59% (0.55–0.63); content-never-crosses EXACT; lobes mass-equal 0.4% |
| 7(b) | **VOID as mechanism** — one register + k·v explains every arrival; no per-detent ζ table; observations stand, causal story replaced |
| 9 | squash overshoots final height (trough ~3.7× net), widen during squash; staging lives across CHANNELS not axes; orb-critical vs panel-underdamped split |
| 11 | partial INCONCLUSIVE-DOWNGRADE — bt709/tv-range artifacts; structure/timing stand; the exemplar is warm-cream |
| 14(c) | ζ 0.61–0.74, f_d 1.54–1.90Hz, 5.0–7.4%; the k·v law; NEW 14(e) preset split incl. the R-1/R-2/R-3 rows |
| 16(b) | cut ≤17–33ms; travel BOUNDED [84,183]ms; destination press-charge clause; arrival bloom 15–20%/~250ms cool |
| 16(c) | commit = hard cut ≤17ms both directions, content pre-staged; tail is light decay; wash → law 20 |
| 18 | banner entry ≈550ms — the band holds at its top |
| 19, 20 | NEW — §R-5/R-6 texts, verbatim |

No wave may cite a pre-amendment figure (corpus feed #21, discharged).

### R-9. The H-7 disposition sweep — MARKS-C-MUSIC + MARKS-E-NOTIFICATION, mark by mark

The B1 standing law (a union re-bases on every measured organ) applied to the two organs that
landed after the novelty brainstorm:

| mark | disposition |
|---|---|
| C-MUSIC 1 (breath: transitional + transmissive; press-light ~50ms before geometry; iOS idle parks) | REFINES SUFFUSION — the transmission scalar + light-first press-ack enter the engagement scalars at the H-6 sync; the law-11 idle floor stays OUR declared divergence (iOS parks, we never do) |
| C-MUSIC 2 (the eyeglass lens: literal refraction, destination press-charge, ≤17–33ms cut) | codex 16(b) amendment (done, §1.8) + the slot-axis lens artifact's acceptance set gains the destination-charge row; sibling legibility under the traveling lens stays our named improvement |
| C-MUSIC 3 (dock-expand choreography: one body, channels 0/+50/+170/+230ms, shared τ≈55ms, arrival ζ≈0.96) | MEASURED CORPUS, adopted-not-novel — the SPINE-CONDUCTOR dock grow-to-card manifest's measured anchor (feeds R-7 + worklist item 3's census); no roster row |
| C-MUSIC 4 (card-window morph; the dock-invariance rule) | the card-window recipe banks in the X-CHOREO orbit; **the dock-invariance rule ("no page transition may perturb dock geometry, ever") enters the SPINE-CONDUCTOR spec as a named invariant** — single-app attestation, so spec-law, not codex-law |
| C-MUSIC 5 (the double dock: conservation discipline; landings ζ0.83/f_d 1.6) | the R-1 ruling's two decisive votes; the fission conservation discipline (every body has a parent + a carrier) enters the constellation continuation's battery |
| E-NOTIF S1-PERCH-SEAT | **V-PERCH card 6 AMENDED by order** — and RE-RULED ONCE `[P3-AGG 2026-07-19, CRIT-ASSEMBLY A1 SUSTAINED: the two halves of the original ruling were mutually unsatisfiable — apex-exact seating yields 56–59%, not 62–69%]`: seat = the corner-curve APEX via `R·(1−2^(−1/n))` off the concentric relay, EXACT — a derived geometry, no magic numbers; n derives from the AUTHORED corner shape, never engine capability. The primary gate is GEOMETRIC (seat point == apex, residual ≤0.5px). Fraction-outside is a derived TELLTALE re-banded **[0.55, 0.63]** (n 3–5, r=10 class). The corpus 62–69% is DEMOTED to corpus observation: it embeds the +1.6–2.5pt outward bias E-NOTIF measured on Apple's chip, which we do NOT adopt; if paint ever wants more protrusion, the licensed dial is a MINTED derived nudge token along the corner ray (MARKS-E §2 cited), never a band fork. D1's cure order, the assembly gate, and card 6 all cite THIS text. v-perch QP row 3 (squircle seat) upgrades from assumption to the formula |
| E-NOTIF S1-PERCH-MATERIAL | the chip register folds into the card: control-tier fill (+12–15 lum), unbroken hairline ring, ZERO shadow, 20pt optic over a ≥44px invisible hit pad |
| E-NOTIF S1-CORNER | no action — our `--corner-k-squircle` (n=4) / `--corner-k-sharp` (n=4.8) sit inside the measured exponent band; registry note at the H-4 sync |
| E-NOTIF S1-VAPOR (the §4 brief) | ADMITTED as PROTO-ASSEMBLY's integration spec for the PERCH→VAPOR organ (§2, O-2) — it cures CRIT m1 (fired tail 170–250ms) and M2 (the positive 80–140ms beat) by construction |

---

## 2. THE SPEC ORDERS — what pass 3 builds

### O-1. The SPINE-CONDUCTOR spec draft (the merged spec seat)

ONE spec absorbing SPEC-F1 + SPEC-F3 per ARBITRATION §1.3–1.5: the ten-item worklist verbatim,
the F1 closes (OG1/OG2/OG3/OG8/OG9) and F3 closes (OG1–OG4) from AGGLOMERATION §4, the
no-second-authority section carried verbatim, the compositor-first invariant re-sworn once.
What this charter has already decided FOR it: worklist item 8 whole (R-1 spring half + R-7 τ
release arm; only the attack arms remain, battery-adjudicated); the light channel's law
grounding (R-5/R-6); the dock-invariance invariant (R-9). Named spec sections it must carry
from the corpus feed: the close order that kills the mirrored exit (feed #4 — `glass-reveal-out`
CONTRADICTS law 8 on disk, `animations.css:146-157`), the detuned three-channel growth register
(feed #11, its founding demand, anchor timings V-A R3/R4), the light channel as a named
trailing channel (feed #5), the status-migration recipe (feed #17), and the drawer
velocity-projection cure spec (feed #3 — `target = detentNearest(frac + v·τ)`, τ≈0.2s, against
`useDrawerSnap.ts:361-365`, the one outright physics contradiction on disk).

### O-2. PROTO-ASSEMBLY (the composed organs — MECH m9's named owner)

The page that earns "proven together." Two organs, one artifact set, video-arbitrated:

1. **V-WAVE-in-V-BLACKDOCK with the dark-mass occlusion grammar.** The sea (card 5's re-skin:
   standing interference field, phase pinned, lull filament, flare→pin→cut) living inside the
   black dock's surface. The occlusion grammar, measured at MARKS-D-SIRI mark 3 and binding
   here: **focus is carried entirely by the surface's own dark mass and rim — NO SCRIM, ever;
   background dim ±2% max; non-modal truth (taps beneath still land)**; the luminance floor
   split per §3.5-C (ghost-through ~0.70, warm charcoal, R>B); FIRED deploys on
   `springPreset("panel")` {0.40, ζ0.71} (R-2), gesture-scrubbed growth on the dock register;
   the channel ladder as measured (geometry → text born-blurred ~190ms → data upgrade in place
   → rim flare +0.5s/+0.85s); the rim breathes ±18% at rest (law 11's floor, our arm).
2. **V-PERCH→V-VAPOR across the `vapor-handoff` seam.** Integration spec = MARKS-E §4
   verbatim (R-9): apex-seated chip (the derived formula), press-charge on the engage
   envelope, commit → text ≤50ms → body erosion 170–250ms → POSITIVE 80–140ms empty-medium
   beat (sign-verified, the M2 cure) → medium 300–400ms decelerating; direction-by-transform
   toward the perch corner, chip vaporizes first; scrub-mapped and catchable pre-commit;
   `claimMediumWriter` one-writer contract exercised across the handoff.

Acceptance: both organs on the WebKit video path + Chrome parity, captures stamped and paired;
the handoff beat measured by sign; the one-writer contract witnessed (no second medium writer
at any frame); until this page runs on video, no adoption language may say "proven together"
(the m9 ban stands). The two new-prototype seats (PROTO-MORPH-THINK: V-MORPHDOCK duel arm 3,
V-THINKFIELD, R-CONDENSE) and the H-1 continuation rows (sea re-skin, canon repaint, vapor
fired re-band, panel fired-deploy arm, frozen-ferry arm) run beside it per the HANDOFF table —
build FIRST, so their paint rows land in the §O-3 queue while it drains.

> **STAMP `[P3-AGG 2026-07-19]` (CRIT-COVERAGE MAJOR-1/-2 SUSTAINED — silence was the
> defect; this stamp is the cure, the WORK carries):** V-MORPHDOCK (the three-armed N1 duel
> decider) and V-THINKFIELD (the two-texture thinking grammar) did NOT build in pass 3 —
> the PROTO-MORPH-THINK seat never ran. Both are **DEFERRED-TO-PASS-4, owner
> PROTO-MORPH-THINK** (its third deliverable, R-CONDENSE, is DISCHARGED-BOUNDED — it rode
> the assembly harness as the HANDOFF licensed). Their §O-3 order-9 ledger slots re-open in
> the pass-4 paint queue; feed #7's modal-slider half keeps a NAMED decider dependency.

### O-3. The paint-arm work order (the serialized browser arm)

One browser-owning seat at a time — the singleton law; every trace with `?hud=0`; WebKit
material verdicts ride the VIDEO path only (Playwright-WebKit screenshots are
backdrop-filter-blind); frame-gap statistics, never raw performance.now deltas (1ms
quantization); live-π per band with the oklab paint-arm parse; sibling contrast as paired-π on
real pixels; no `@supports` gate exists in any page (battery-verified). The ledger, enumerated
— 48 rows: 42 standing PROBE-NOTES rows + the 6 union-added checks (a)–(f):

| order | page | rows |
|---|---|---|
| 1 | proto-frosted-cure (the canon referent — judged FIRST; every later video is judged against its register) | QP-1 frost read · QP-2 idle darkness · QP-3 engagement light · QP-4 sibling legibility · QP-5 effervescence · QP-6 micro-demo referent · QP-7 cost trace |
| 2 | v-alens | 1 blur-rides-opacity on the masked stack · 2 Chromium parity, no clipping wrapper · 3 mask re-seat repaint cost · 4 live-π sibling contrast · 5 rAF parks at settled hold · (a) the re-banded annulus video (halo local, world crisp, no ring banding) |
| 3 | v-perch | 1 protrusion reads · 2 charge register · 3 squircle seat — now the R-9 apex formula · 5 backdrop-filter on a 30px dot · (row 4 handoff composition TRANSFERS to PROTO-ASSEMBLY) |
| 4 | v-vapor | 1 erosion read · 2 empty-medium beat · 3 masked backdrop body under scrub · 4 compositor-only channels · 5 catch mid-snap · (c) ghost-park cost delta (the F5 r3 question, parked vs mounted) — run AFTER the fired re-band lands |
| 5 | v-dotrel | 1 wave reads as a message · 2 zero idle rAF · 3 event-window frame budget · 4 hsl() hue truth · 5 PRM still-step · (b) breath-under-park trace (CSS breath runs, rAF counter 0) |
| 6 | v-wave | 2 transform-only trace · 3 law-13 register read · 4 idle breath · 5 PRM organ — ALL after the sea re-skin lands; row 1 (mic session end-to-end) is **DEVICE-DEFER**, fenced, never a gate |
| 7 | proto-constellation | QP-1 frost both phones · QP-2 goo double-darkening · QP-3 black-register ghosting · QP-4 backdrop census per posture · QP-5 ferry continuity · QP-6 re-home decider live · QP-7 momentum legibility · QP-8 non-modal truth · QP-9 frame-gap budget · QP-10 PRM sweep — after the panel-arm + canon repaint land |
| 8 | (d)+(e)+(f) cross-page | the night-dock warm read on BOTH engines · live-π per band, oklab parse · N3 sibling contrast paired-π — run against pages 2/5/7 as they pass |
| 9 | PROTO-ASSEMBLY + PROTO-MORPH-THINK | their PROBE-NOTES ledgers join the tail when built; the transferred v-perch row 4 runs here |

Sequencing law: amendment-bearing pages (sea re-skin, panel arm, canon repaint, vapor re-band)
build BEFORE their videos run — a video of a superseded register is spent evidence. The ledger
is DRAINED when every row is run or carries an explicit DEVICE/TOOL-DEFER stamp with its named
re-entry point (the v-wave mic row → the campaign device-lane decision).

> **AMENDED `[P3-AGG 2026-07-19]` (CRIT-ASSEMBLY A8 + n6(ii) + CRIT-COVERAGE minor 4
> SUSTAINED).** (1) Two further stamps are CHARTERED so the drain vocabulary matches the
> arm's honest reality: **PAGE-DEFER** (the row's page precondition — a re-skin, re-band, or
> referent — has not landed; named re-entry mandatory) and **RERUN-OWED** (a verdict banked
> against a register an ordered amendment will supersede; it is an OPEN row for every
> roll-up, convergence figure, and cut condition — never final register evidence). A ledger
> claiming DRAINED while carrying plain-DEFER/BLOCKED/RERUN-OWED rows is misstating; the
> honest roll-up is DRAINED-except-named-remainder. (2) The order-4 v-vapor beat row (c) and
> any fired-path band read are PAGE-DEFER behind the vapor fired re-band by this charter's
> own sequencing law — the original order-4 scheduling contradicted it; the ~660ms
> contentless-window figure banked this pass is INPUT to the m1 re-band arbitration, not a
> band verdict.

### O-4. The standing lanes (by pointer — chartered in AGGLOMERATION §5, not re-drafted here)

The integration prototype seat(s): the slot-axis lens artifact per R2's fixed acceptance set
(+ the R-9 destination-charge row) and the union interrupt battery + H1 ladder + R4
three-spine swap. The F4 seat: §3.2-F4 (i)–(v) + P3/P5/P7/P8/P9 — the frozen-Jacobian gauge
cure is the headline; its C¹ work now cites law 19 (the light clock may overshoot, the
geometry seam must not). The F5 seat: §3.2-F5 (i)–(v) + OG2/OG5/OG7 — the per-engine contrast
recalibration before any sibling-gate re-run. The campaign-decision block: Web Inspector
session or explicit park; the device-lane charter or documented non-goal (F2's bank and the
v-wave mic row both hang on it); the MARKS c≈0.55 `[DESIGN]` note; the observation-tension
stamp. Paperwork riders H-4 (registry sync incl. R-2/R-3 + the S1-CORNER note) and H-6
(SUFFUSION §1.3 dose column + the B1 self-binding clause + the R-9 transmission scalar).
`[P3-AGG 2026-07-19, CRIT-COVERAGE minor 1]`: H-4 LANDS AT THE FINAL WAVE SET'S REGISTRY
STROKE (one writer, with SPEC §9 row 5's names) — that is its timing, in writing; H-6 was
EXECUTED at the pass-3 agglomeration (CRIT-COVERAGE MAJOR-3's cure).
Fresh adversarial critiques by non-authors close the pass; they inherit the AGGLOMERATION §4
ledger AND this charter's §1 rulings as their opening claim-set.

---

## 3. THE CONVERGENCE CONTRACT

**What CLEAN means for pass 3.** Fresh critics — non-authors of every artifact they read —
file ZERO blockers and ZERO majors against the pass-3 artifact set, with every pin re-verified
on disk. Minors do not break cleanliness; they must be disposed (cured or explicitly carried)
before the pass banks. Additionally, ALL of: every AGGLOMERATION §4 ledger row green or
explicitly parked with a named owner; every §1 ruling above either executed (codex — done) or
carried as exact wave text (spring rows, scheme-spring regen, roster/card amendments); the §O-3
ledger drained; the two composed organs on video with the m9 ban lifted or honestly kept; zero
new gaps at the critique. A pass that convicts its own numbers is a working apparatus but NOT
a clean pass — pass 2 proved both halves.

**What carries to pass 4.** The confirmation audit (fresh critics again, zero-finding bar at
blocker+major); anything §1/§2 parked-with-owner (DEVICE-DEFER rows, the TOOL-DEFER class if
the Web Inspector session is parked, F2's bank pending the device lane); the FINAL wave-set
drafting itself (tier 1 + surviving tier 2 of NOVELTY-ROSTER H-3, the registers-as-tokens
list now including panel {0.40, 0.71}, orb-drop {0.22, 1.0}, and the dock 0.35 amendment);
and the BJ handoff addenda (the src cures ruled here: spring rows, scheme-spring regen, drawer
projection, mirrored-exit kill — all EXACT TEXT, consumer updates per the consumer-updates
ruling).

**The FINAL wave-set cut condition.** The wave set cuts when and only when: (1) TWO
CONSECUTIVE CLEAN PASSES stand banked — earliest arithmetic: pass 3 clean + pass 4 clean;
(2) ZERO GAPS against the 21-item corpus feed — every row landed in a spec/prototype,
chartered to a named owner (SPINE-CONDUCTOR, F4, F5, a band, a greenfield, BJ), or
parked-with-reason in writing; silence on any row blocks the cut (the B1 law, applied to the
feed); (3) the QUEUED-PAINT ledger DRAINED per §O-3's definition; (4) the registers ship as
tokens regardless of tier (H-3's list + this charter's three spring rulings); (5) the codex is
current — no wave cites a stale figure (discharged at §1.8 and held by the critique).

**The arithmetic, restated so no seat can misread it.** The loop charter requires ≥3 full
passes, zero open gaps, a fresh adversarial audit, and two consecutive clean passes. Pass 2
was NOT clean. Pass 3 is therefore the FIRST pass eligible to begin the clean chain, and the
earliest possible convergence is PASS 4. Any seat claiming convergence at pass 3 is wrong by
arithmetic, whatever its evidence shows.

---

## Honesty line

This seat drove no browser and touched no prototype or src file; the only files written are
this charter and the codex amendments (§1.8), both provenance-stamped. Every spring figure in
§1 was re-derived from (response, ζ) arithmetic against the fits quoted at their pins, not
copied; the panel-response correction (R-2) and the popover residual (R-1) are this seat's own
findings, stated with their brackets. Rulings that need paint (the fired-tail drama, the
bloom-license question, every §O-3 row) name their video arbiter instead of pretending a
charter settles them.
