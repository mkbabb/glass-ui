# USER-HINGE REGISTER — the decision-forcing artefact (AY)

**Lane** HC-user-hinge (hc2, phase CloseOut) · **Date** 2026-06-09 · **Branch** `at-dock-convergence`
**Mechanism** trends R3 (`research-necessity/chronic-deferrals.md:202-206`, Class F): every open
user decision is held as a register row carrying the EXACT question, surfaced verbatim at every
close, so it cannot re-enter the recap as prose and re-defer.

**Reconciliation note:** the NECESSITY-MATRIX §2 USER-HINGE seed list (magnification, `uBackdrop`,
G-4/5/6) was PARTIALLY answered in-session BEFORE this register landed —
`audit/USER-DECISIONS-2026-06-09.md` is BINDING for hinges H1–H3 below. This register therefore
splits: §A re-prints the DECIDED hinges with their answers + the routing residue each decision
still owes; §B carries the OPEN hinges verbatim-ready; §C carries the standing USER-DOMAIN
*actions* (not questions); §D records near-misses deliberately EXCLUDED (decidable by invariant or
by wave, not by the user); §E records the mechanism gap (this register is the prose seed — the R3
schema disposition is UNBUILT, per `hardening/hc2/HC-mechanisms.md:121-136`).

**How to read a row:** *Question* is verbatim-ready to put to the user. *Default-if-silent* is what
the close executes if no answer arrives — every row has one, so silence cannot stall a wave.

---

## §A — DECIDED 2026-06-09 (binding; re-printed so the close shows them discharged)

### H1 — Dock magnification ship/no-ship — **DECIDED: NO. No mag.**

- **The question (as it stood):** "Ship macOS-style dock icon magnification as an opt-in
  `magnify` variant — cosine falloff over ~110 px, per-icon overdamped spring (response ≈0.15,
  ζ ≈1.4), transform-only, PRM-gated?"
- **Converged context:** the parameter model converged across TWO independent passes (kf C-tranche
  `ios-dock-animation.md` I.1/III.4 + `H-research-dock-anim.md` Part 1.B/3.4); as-built is ZERO
  (`grep -rni 'magnif|proximity'` over the dock sources → 0). **The prior "user-mandate" cite was
  FABRICATED** — `H-research-dock-anim.md:42-43` claims "AY.md §0 line 28 'the magnification'";
  AY.md contains no such text (grep 0; `research-necessity/dock.md:117-122`). It was always
  researcher-PROPOSED.
- **DECISION (`USER-DECISIONS-2026-06-09.md:8`):** **"NO. No mag."** CUT — no wave; never
  re-proposed.
- **Routing residue the decision still owes:**
  1. The converged parameter model stays ARCHIVED in `research-necessity/dock.md §5.10` for
     posterity — no W-DOCK-MAGNIFY wave is ever minted.
  2. Strike the fabricated mandate cite wherever it propagates (`H-research-dock-anim.md:42-43`
     is the origin; any doc citing "user names it explicitly" inherits the inflation — the same
     class B2-dock F6 caught on value.js).
  3. Any future "magnification" proposal must arrive as a FRESH user ask, not a corpus re-read —
     the register holds this row so the close re-prints the CUT, not the proposal.

### H2 — Blob `uBackdrop` Snell-refraction greenlight — **DECIDED: CONDITIONAL YES**

- **The question (as it stood):** "Greenlight the glass-not-enamel move — the bead refracts the
  live backdrop behind it via a `uBackdrop` FBO sampler + one-tap Snell displacement + the
  quartic-squircle dome bevel?"
- **Converged context:** recipe + edit-sites + gate design fully on disk pre-decision
  (`H-research-blob.md §1 T1/T2 + §6 waveSpecInputs`; `goo-blob/RESEARCH.md §4.2`; the concrete
  first edit `metaball.frag.ts:273` circle dome-Z → quartic squircle). The matrix graded it "a
  fully-specced recorded DECISION awaiting greenlight, not a gap" (blob lane §4.2).
- **DECISION (`USER-DECISIONS-2026-06-09.md:9`):** **"if this is performant and actually works on
  all browsers, absolutely"** — a CONDITIONAL yes whose two conditions are BINDING GATES, not
  footnotes. Specced same-day as `AY.W-BLOB-GLASS` (§2 G-PERF: shipped frame budget unchanged on a
  mid-tier profile; G-BROWSER: WebGL2-core-only, chromium π + webkit + firefox all-three-engine
  evidence; §4: a failed condition closes the wave CONDITIONS-UNMET and the enamel state stands —
  the greenlight evaporates, never a degraded ship).
- **Routing residue the decision still owes:**
  1. The **aurora-FBO seam coordination** (`AY.W-BLOB-GLASS.md §1.1` — one shared render-target
     handshake on `useWebGLCanvas`, zero extra full-screen passes) must be specced WITH the
     aurora render loop before build.
  2. Sequencing: depends on W-GOD1 (the renderer carve — the wave edits the carved
     `useMetaballRenderer`, 692 ln at HEAD) + W-COHERE (mood/shadow cohesion lands first so the
     refraction reads on the settled bead).
  3. No further user input needed — the conditions are machine-encoded; the user re-enters ONLY
     if the wave closes CONDITIONS-UNMET (then the close re-prints the measurement, not a re-ask).

### H3 — Slides poster-pass slide-count ceiling — **DECIDED: no cap; the register decides**

- **The question (as it stood):** "Does the poster-register pass have a slide-count ceiling, or do
  the examples split to as many slides as the register needs?"
- **DECISION (`USER-DECISIONS-2026-06-09.md:10`):** **no cap** — "big animal pictures" rules; the
  examples split to as many slides as the poster register needs at the 15-min pace.
- **Routing residue the decision still owes:**
  1. Routed → **slides REFINEMENT-DECISIONS round 4** (slides repo). That round-4 row must be
     AUTHORED in `~/Programming/slides` — until it is, this is the exact Class-C shape (a
     cross-repo routing recorded only in the source repo's prose; cf. the W-DOCK3 L re-home that
     never left glass-ui prose, `HC-sld-dock.md §2.3`). Verify the slides-side row exists at the
     L close.
  2. Adjacent open slides decisions surfaced by `H-slides-567.md:98-102,164,196` (poster-carried
     vs rail-built nav; knockout-block vs blue-ink highlight) are L-tranche SPEC decisions the
     round-4 register should carry — listed here only so the cross-repo handoff is visible.

---

## §B — OPEN user hinges (verbatim-ready; each with a default-if-silent)

### H4 — G-4 directional View-Transition helper: book or retire?

- **Question (verbatim-ready):** "G-4, the directional View-Transition JS helper: the CSS half
  shipped (`src/styles/view-transition.css:38-61` — the `--vt-*` vocab + `gl-vt-slide-in/out`
  keyframes) but no JS sets `--vt-direction`/`--vt-rise` per navigation. BOOK it (a register row
  with a ≥2-consumer trigger — it graduates only when two real consumers want directional VTs), or
  RETIRE it with a named successor?"
- **Converged context:** promised as a register row at AX W62 (`AX/PROGRESS.md:269-271,282` item
  16) and never written — the canonical promise-inside-the-close relapse (`AY.W-CARRY.md §1 D2`).
  W-CARRY.2 routes it to exactly this fork; trigger grep ready:
  `--vt-direction|directionalViewTransition`.
- **Options:** (a) BOOK — `directional-view-transition` row, `min-consumers` n:2; (b) RETIRE —
  `retired` + `successor` naming an exact destination (a wave id or
  `permanent-out-of-scope: <rationale>`; never "future tranche").
- **Default-if-silent:** **BOOK with the trigger** — W-CARRY §3 rule 3 is explicit: "The DEFAULT
  is `book` with a trigger — retirement requires a stated rationale in the wave doc."
- **Unlocks:** either answer discharges the AX PROGRESS:282 promise honestly (W-CARRY HARD GATE
  Leg 3) and unblocks the W-CLOSE1 "zero chronic-defer carry" claim being gate-true.

### H5 — G-5 DrawerContent spring token: book or retire?

- **Question (verbatim-ready):** "G-5, a glass-ui `--drawer-spring` token re-tuning the drawer
  open/snap easing: vaul-vue owns the drag-release spring (CLAUDE.md drawer section) and
  `grep -niE 'drawer.*spring|--drawer-spring' src/styles/drawer.css` → 0. BOOK it behind a
  ≥2-consumer trigger, or RETIRE it (vaul-vue owns the physics; a glass-ui token would fight the
  upstream)?"
- **Converged context:** AX PROGRESS:282 item 17, same unfulfilled-promise class as H4
  (`AY.W-CARRY.md §1 D2`). Note the upstream limitation already on record (CLAUDE.md drawer §):
  vaul-vue does not reliably re-snap an open sheet — a deeper reason the spring lever may have no
  glass-ui-side future. Trigger grep ready: `--drawer-spring|drawer-content-spring`.
- **Options:** (a) BOOK — `drawer-content-spring`, `min-consumers` n:2; (b) RETIRE with successor
  `permanent-out-of-scope: vaul-vue owns the snap physics` (the rationale is already half-written
  in CLAUDE.md).
- **Default-if-silent:** **BOOK with the trigger** (the W-CARRY §3 rule-3 default) — though this
  is the strongest retire candidate of the three; if the user says nothing the row simply sits
  un-MET, which is honest.
- **Unlocks:** same as H4 — W-CARRY Leg 3.

### H6 — G-6 cartoon×quiet preset: book or retire?

- **Question (verbatim-ready):** "G-6, a named `cartoon-quiet` surface preset (the Memphis cartoon
  shadow over the quiet glass rung): today only prose traces exist (`cards.css:25` fallback
  comment; `Card.vue:34` history note) — no named preset/utility. BOOK it behind a ≥2-consumer
  trigger, or RETIRE it (presets-in-consumers is the house rule — a named themed preset arguably
  belongs in a consumer, not the library)?"
- **Converged context:** AX PROGRESS:282 item 18 (`AY.W-CARRY.md §1 D2`). Trigger grep ready:
  `cartoon-quiet|quiet-cartoon`. The MEMORY precept "presets live in consumers; the library's own
  default tokens are its identity" cuts toward retire UNLESS the preset is framed as a library
  identity surface (like `surface="cartoon"` already is).
- **Options:** (a) BOOK — `cartoon-quiet-preset`, `min-consumers` n:2; (b) RETIRE with successor
  `permanent-out-of-scope: presets-in-consumers precept`.
- **Default-if-silent:** **BOOK with the trigger** (rule-3 default).
- **Unlocks:** same as H4/H5 — completes the G-4/5/6 set; W-CARRY Leg 3 greps all three ids.

### H7 — W-SLD1 round-knob ratification (the short-circuited Class-F hinge)

- **Question (verbatim-ready):** "The slider knob resolution: we shipped resolution (b) — a fully
  ROUND knob (`border-radius: 50%` over `aspect-ratio: 1`, `Slider.vue:229-231`), the SAME ink as
  the `.slider-range` fill it rides (continuity-by-sameness). Looking at the recaptured PNGs: does
  this match your intent, or did 'continuous with the track' mean the iOS hardware register — a
  WHITE knob with shadow on a tinted track? Also: in light mode the unfilled quiet-glass track
  barely paints over the near-white page, so the knob reads as the bulged terminus of a dark bar —
  acceptable, or should the track gain a visible rest tint?"
- **Converged context:** `HC-sld-dock.md §1.3` — the wave spec REQUIRED a user-judged capture
  (`AY.W-SLD1.md:65` "this wave MUST decide which, by a user-judged capture, not an assumption";
  §6 condition 1 "names the chosen branch WITH the user's recorded verdict") but the DELTA
  self-served the verdict from PROMPT-CORPUS:51 standing words. Gate is GREEN
  (`proof:slider-two-only` PASS, 5 clauses, 7 consumers scanned); the JUDGED half is open.
  Pre-condition: recapture first — the binding `W-SLD1-standard-resolved-*.png` CLIP the knob's
  bottom arc (`HC-sld-dock.md §1.2`; `slider-spectrum-fallback.spec.ts:176-178` leaf-section
  clip); a shape decision needs the full silhouette.
- **Options:** (a) ratify as-shipped (same-ink round knob); (b) flip to the iOS white-knob
  register (white fill + shadow, tinted track); (c) as-shipped + a visible light-mode rest tint
  on the unfilled track (the W55 over-light class on the slider's own surface).
- **Default-if-silent:** **(a) as-shipped stands** — it implements the standing words verbatim and
  the gate locks it; but `PROGRESS.md:73` keeps the `gate-green, judgment-pending` rider until the
  one-line ratification lands (per the spec's own condition-1 letter, `HC-sld-dock.md §4`).
- **Unlocks:** the rider drops; W-SLD1 becomes honestly `live-verified`; the recapture also fixes
  the clipped-arc capture defect in the same pass.

### H8 — Aurora oil/oil-pastel single-pass ceiling: accept as permanent, or open a fresh multi-pass wave?

- **Question (verbatim-ready):** "The painterly aurora landed its arresting bands for van-Gogh and
  oil, but oil-pastel's β residual (−2.53, out of band) was routed to 'T5 anisotropic-Kuwahara,
  gated on W-AUR-WEBGPU-DECIDE' — and that wave closed TERMINAL-RETIRE the same day, scaffold
  deleted. The residual has no live owner. Accept the single-pass A/β ceiling on oil/oil-pastel as
  the permanent register, or greenlight a fresh, named greenfield multi-pass Kuwahara wave (the
  named consumer now exists: this residual)?"
- **Converged context:** `hardening/hc2/HC-aurora.md §4` (the dead pointer — DELTA, spec header,
  gate note, PROGRESS row ×4 sites all cite the retired wave) + §5: the −5/3 radii respacing
  lever (`mediums.glsl.ts:385-387`, byte-unchanged hand-set values) is the most relevant UNTOUCHED
  single-pass lever for exactly this residual — engineering, zero user cost.
- **Options:** (a) accept the ceiling — encode as a register row (`user-hinge`/`retired` with
  rationale), re-point the four dead cites to the acceptance; (b) fresh named wave (greenfield
  multi-pass Kuwahara, consistent with the RETIRE DELTA's "opens fresh with a named consumer");
  (c) defer the question behind the un-pulled respacing lever — if it lands oil-pastel's β
  in-band, the question dissolves.
- **Default-if-silent:** **(c) then (a)** — pull the −5/3 respacing lever first (already a matrix
  §2 W-AUR-PAINTERLY row, re-graded OPEN-as-a-lever by HC-aurora §5); if the band still misses,
  the ceiling is accepted-as-register at close. Either path MUST re-point the four dead
  `W-AUR-WEBGPU-DECIDE` routing cites — that half is unconditional.
- **Unlocks:** (a) closes the aurora band with an honest permanent register; (b) mints the only
  genuinely new GPU work in the tranche's orbit; (c) costs one tuning pass against the shipped
  arresting harness.

### H9 — Slides/feedback-coder audience lock: research or policymaker? (cross-repo, L tranche)

- **Question (verbatim-ready):** "Is the feedback-coder deck ever shown to the policymaker/auditor
  room, or only the technical/research audience? The S2/S4 density + math-notation trims
  (`Slide02.vue:91-92` the `(D,S,F)` tuple; `Slide03.vue:81-82` the `F: page → {(turn,label)}`
  operator) fire ONLY on the policymaker answer."
- **Converged context:** `hardening/H-feedback-coder.md` Finding 7 — "the audience lock is a USER
  decision (it is the business question)… L.W6 is a content wave; it cannot manufacture the
  answer." The wave's hard gate #5 points the decision at a nonexistent `L.md §7` — it has no
  home; this register row is its glass-ui-side surfacing (the real home is the slides decision
  register, per the H3 round-4 fold).
- **Options:** (a) research/lab only (trims do NOT fire); (b) policymaker/auditor included (trims
  fire on S2/S4).
- **Default-if-silent:** **(a) research** — SLIDES-REVIEW §232 reads the deck as "a 5-slide
  prototype account for a technical/research audience"; L.W6 proceeds on the default without
  stalling (Finding 7's own convergence requirement).
- **Unlocks:** L.W6 unblocks; the trims have a recorded gate instead of a stall.

---

## §C — Standing USER-DOMAIN hinges (actions, not questions — agents never execute these)

These are not decisions to argue; they are the two irreversible legs only the user pushes
(`EXECUTION-DAG.md §0`). Printed here so the close surfaces them instead of absorbing them — the
publish edge is the one that slipped slides H→I→K→L (four tranches).

| # | Hinge | The action | Gated behind | If not executed |
|---|---|---|---|---|
| HINGE 1 | **W-PUB1 publish** | master-merge the AY line + push the `v3.10.0` (or next-minor) tag → `release.yml` does the gated provenance publish | W-CLOSE1 (all AY gates green; `EXECUTION-DAG.md` E15) | steps 5–7 of the DAG §1 chain (slides re-pin → L.W-ADOPT → deploy) CANNOT begin; the bespoke constellation copy survives another tranche |
| HINGE 2 | **L.W5 deploy** | CF-Pages deploy + post-push live-200 probe; held until the deck is reviewed | HINGE 1 + L.W-ADOPT | slides stay un-deployed at `main 3765d52`; the agent captures the live DELTA only AFTER this push |

---

## §D — Deliberately EXCLUDED (near-misses that are NOT user hinges)

Listed to stop scope creep — each was nominated somewhere as decision-shaped and resolves WITHOUT
the user:

1. **`--glass-backdrop-luma` RETIRE-or-RESERVE** — answerable by the ≥2-consumer invariant
   (`research-necessity/glass-material.md:152-158`: "answerable by the ≥2-consumer invariant, not
   by external study"); zero consumers confirmed at HEAD (`HC-glass.md:117-119`,
   `tokens.css:905,927` mint-only). W-GLASS records the disposition; default RETIRE (L inv 8)
   unless explicitly RESERVED with a corrected CLAUDE.md:204.
2. **The W-LIQUID Siri reference-capture arm dispatch** — orchestrator-validated by the matrix
   (§3, the ONE surviving research arm); time-boxing and sequencing (after the spec compiles the
   inheritance set) are fleet mechanics, not a user fork.
3. **`/underline` vs `/handmark` packaging** — a pre-build SPEC decision; the HC-underline-spec
   lane decided its menu in-spec ("every option DECIDED so the build agent arrives to decisions,
   not menus" — `hc2/HC-underline-spec.md:6,43` §6 decision ledger).
4. **G-PERF/G-BROWSER on W-BLOB-GLASS** — already user-encoded as gates (H2); they re-surface only
   on a CONDITIONS-UNMET close, with measurements, not as a re-ask.
5. **The W-CARRY ledger onboarding itself** (the ~22 BOOK rows) — pure register mechanics; only
   the three G-item forks (H4–H6) carry a user-decidable branch, and each has a rule-3 default.

---

## §E — Mechanism status (why this file exists at all, and what supersedes it)

- **R3 (`user-hinge` register disposition) is UNBUILT** — `hc2/HC-mechanisms.md §6`:
  `DISPOSITION-REGISTER.json` dispositions are `book`/`archived` only;
  `proof-disposition-live.mjs:136-143` reads only those — a `user-hinge` row today would be
  silently ignored, not surfaced. **This file is the prose SEED; R3 is the schema.** When R3
  lands (disposition value + `question:` field, coverage-satisfying, never trigger-evaluated,
  printed verbatim in the gate artefact), the §B rows migrate into the register and every
  subsequent close re-prints them mechanically.
- **Until R3 lands, the close obligation is manual:** W-CLOSE1's FINAL must re-print §B verbatim
  (open questions + defaults taken) and §C (hinge state). A close that absorbs them re-creates
  Class F.
- **Reconciliation rule:** any future in-session user answer gets appended to
  `USER-DECISIONS-2026-06-09.md`-style dated decision docs AND flips the row here (→ §A) in the
  same change — the two artefacts must never disagree (the H1–H3 rows above are the precedent).
