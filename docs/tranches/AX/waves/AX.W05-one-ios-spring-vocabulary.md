# AX.W05 — One iOS-spring vocabulary: excise the legacy apple-spring bezier

**Band** A · DOCK · **Severity** major · **dependsOn** AX.W01 (· AX.W00 for the π-lane close machinery)
· **Charter** AX.md §3 (the `### AX.W05` block, lines 449-484) + §2b band-A precept row + §4 note 12
(publish-currency: consumers MEASURED the stale 3.6.0, so the speedtest leg is a publish-gated adoption)
· **Audit** `deep-audit-corpus.json` slice `dock-top-spring` (index 5, findings F3/F4/F5) +
`constellation-analysis-corpus.json` result 14 (idiom:speedtest — the EXTERNAL consumer enumeration) +
result 28 (harden:dock-graphics — the consumer-list CORRECTION: Slider is mis-listed, the real direct set
is 4) + `converge-digest.md` (the speedtest cross-repo breakage fold).

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED on three falsifiable witnesses at HEAD `eaba94f`:

- **RED witness 1 (the headline — two parallel spring vocabularies; deletion-falsifiable).** A second
  iOS-spring authority survives the regen modernization: the predecessor cubic-bezier
  `--motion-ease-apple-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275)` (tokens.css:178) + its
  `--ease-apple-spring` alias (tokens.css:181, re-aliased theme.css:361) — a ~+27.5% overshoot curve that
  the `proof:animation-coherence` allow-list TOLERATES (it scans only for a SECOND `--spring-*:` definition,
  not for the legacy `--motion-ease-*` bezier seed). It coexists with the four regen `--spring-*` linear()
  presets (snappy ~+6.8%, bouncy ~+20.5%, dock ~+4.6%, smooth/gentle settle), each claiming "springy/iOS"
  with **no governing rationale tying a surface to a register**. Falsifiable RED: *grep
  `--ease-apple-spring`/`--motion-ease-apple-spring` over `src/` → at HEAD it returns the two
  tokens.css/theme.css definitions + 4 live consumer reads (UnderlineTabs.vue:75, BouncyToggle.vue:135,
  ContinuousMarkers.vue:385, ProgressSectioned.vue:188-fallback) (RED — the legacy authority is live). After
  the wave: 0 definitions, 0 consumers (GREEN).*

- **RED witness 2 (the slider-in-dock register mismatch — runtime-falsifiable).** The Slider thumb springs
  on `--ease-spring` → `--spring-snappy` (Slider.vue:214; theme.css:362), a DIFFERENT curve than the
  `--spring-dock` (0.32, 0.7) the `<GlassDock>` it lives inside breathes on. A slider INSIDE the dock should
  share the dock register — the concrete §1.8 "the dock and its slider run different curves" symptom.
  Falsifiable RED: *resolve the Slider-thumb `transform` timing-function vs the dock-morph timing-function on
  a `<GlassDock><Slider/></GlassDock>` mount — at HEAD they differ (snappy ≠ dock). After the wave they share
  the dock register.* (NOTE — corrected per result 28: Slider is NOT a bezier consumer; its defect is a
  register re-point, not a bezier excision. See Scope §2.)

- **RED witness 3 (the gate-truth gaps — grep + runtime-falsifiable).** (a) The comment-sync gate's target
  set is hardcoded to TWO files (`useLayerTransition.ts`, `tokens.css` — proof-spring-tokens-synced.mjs:155-158)
  and was NEVER widened to `proof-dock-motion-parity.mjs`, which carries STALE `(0.5, 0.5)` / `+18.5%` prose
  (proof-dock-motion-parity.mjs:16,188 — should be `(0.32, 0.7)` / `~+4.6%`) that no gate sees. (b) The
  `--spring-*` cohort has NO consumer-coverage gate — `--spring-gentle` is consumed ONLY via the
  `--ease-spring-gentle` theme.css:354 alias (zero direct `var(--spring-gentle)` surface), a library-orphan
  the generator can mint silently. Falsifiable RED: *the stale `(0.5,0.5)`/`+18.5%` text sits in a file the
  comment-sync gate does not scan (un-caught); a `--spring-*` preset with zero `var()` consumers passes
  `proof:animation-coherence` (which guards definition-uniqueness, not coverage).*

The wave is RED at HEAD on all three; the HardGate below drives each to GREEN.

---

## Goal

The library converges onto ONE governed iOS-spring vocabulary — the four regen `--spring-*` linear()
registers, each with a consumer and a surface-class rationale — with the legacy apple-spring cubic-bezier
EXCISED, its 4 internal + 4 external consumers re-pointed, the slider-in-dock re-registered onto the dock
curve, and the spring-pipeline gates truthed-up so no dead token or stale number can rot.

---

## Scope (the gestalt fix — no workaround, no legacy, one register source)

The audit's three findings (F3/F4/F5) are the SAME pathology — two competing spring authorities with no
governing rationale — read at three altitudes; one cohesive architectural fix:

1. **Excise the legacy apple-spring bezier (F4 — the headline root).** DELETE
   `--motion-ease-apple-spring` (tokens.css:178) + `--ease-apple-spring` (tokens.css:181, theme.css:361)
   entirely, per the no-legacy mandate (NOT deprecate, NOT alias to a `--spring-*` — excise). Re-point the
   **4 DIRECT internal consumers** onto the appropriate governed `--spring-*` register:
   - `UnderlineTabs.vue:75` (`inset` transition, primary) → the **control** register (the active-underline
     glide is a crisp position morph — `--spring-snappy`).
   - `BouncyToggle.vue:135` (`readToken("--ease-apple-spring", …)` JS primary) → the **playful** register
     (the bouncy toggle WANTS overshoot — `--spring-bouncy`; the `readToken` default literal is replaced by
     the resolved `--spring-*` value, no hand-rolled bezier fallback).
   - `ContinuousMarkers.vue:385` (`var(--ease-apple-spring, cubic-bezier(…))` fallback) → the **control**
     register (`--spring-snappy`); the inline cubic-bezier fallback is DELETED (a hand-rolled spring literal
     the coherence gate would otherwise re-tolerate).
   - `ProgressSectioned.vue:188` (`var(--spring-snappy, var(--ease-apple-spring, ease-out))` — apple-spring
     is the NESTED fallback; primary is already `--spring-snappy`) → collapse the nested fallback to a plain
     `var(--spring-snappy, ease-out)` (drop the dead apple-spring middle layer — it never resolved while
     `--spring-snappy` is defined).

   **CORRECTION (per result 28 — adversarial harden).** The charter §3 block names "5 consumers" including
   **Slider** — this is WRONG. Slider.vue:214 uses `--ease-spring` (theme.css:362 → `--spring-snappy`, a
   linear() spring), NOT the bezier. The actual DIRECT bezier consumers are **4**, not 5. Run the grep at
   wave-open (`grep var(--ease-apple-spring)|readToken("--ease-apple-spring"` over `src/`) to get the EXACT
   current set before trusting any count.

2. **Slider-in-dock register re-point (F4 — the genuine §1.8 symptom, SEPARATE concern).** The Slider's real
   defect is NOT the bezier — it is that the thumb springs on `--spring-snappy` (a sibling curve) while the
   dock it lives inside breathes on `--spring-dock`. A slider that lives INSIDE the dock should share the
   dock register. Re-point the `Slider.vue:214` thumb `transform` timing from `--ease-spring` (snappy) onto
   the **dock register** — express it as a `--slider-thumb-spring` token that DEFAULTS to `--spring-dock`,
   so a consumer can retune but the in-dock slider breathes on the dock curve by default. This is a register
   re-point, NOT a bezier excision — keep the two concerns un-conflated (the charter conflated them; result
   28 split them).

3. **Govern the vocabulary (F4 — the rationale layer).** Establish a SMALL named iOS-spring vocabulary from
   the regen pipeline and document which surface-class uses which — a `src/styles/` doc-comment rationale
   table (the regen `PRESETS` array already carries per-preset `comment` strings; extend them to name the
   surface-class). The governing map: **dock + everything inside it** (the dock-morph + the keepDockOpen
   Slider thumb) → the **dock register** `--spring-dock` (0.32, 0.7, ~+4.6%); crisp position morphs (tab
   underline, progress) → **control** `--spring-snappy`; emphatic toggles → **playful** `--spring-bouncy`;
   patient settles → **gentle**/**smooth**. Pin the dock register to the published `(0.32, 0.7)`
   `--spring-dock` curve keyframes live-measures as the system-dock baseline (§4 note 23) — the W01 single-
   scalar morph COMPOSES with it (no re-bounce).

4. **Truth-up the spring pipeline (F3 — the comment-sync widening).** Widen the comment-sync gate's target
   set in `proof-spring-tokens-synced.mjs` to EVERY file that quotes a dock-spring number — add
   `proof-dock-motion-parity.mjs` (which carries the stale `(0.5,0.5)`/`+18.5%` prose). BETTER (the gestalt
   choice, per F3): retire the prose-number duplication — have the gates IMPORT `DOCK_SPRING` / the regen
   PRESET and RENDER the overshoot at runtime in their summary, so there is **no hand-typed number to rot**.
   The recommended path is the import-and-render (no hand-typed number); the widened target-set is the
   fallback if a prose reference must survive. Fix the stale `(0.5,0.5)`/`+18.5%` text in
   `proof-dock-motion-parity.mjs:16,188` to `(0.32,0.7)`/`~+4.6%` regardless.

5. **Consumer-coverage gate on `--spring-*` (F5 — the overfitting census, fail-closed).** Run the
   overfitting census on all FIVE `--spring-*` presets (smooth/snappy/bouncy/gentle/dock); a preset with
   < 2 consumers is RETIRED (or formally justified as a documented public register per the presets-in-
   consumers split). Add a lightweight consumer-coverage assertion to the spring gate so a generated preset
   with **zero** `var(--spring-X)` / `var(--ease-spring-X)`-alias consumers FAILS CLOSED — the generator
   must not mint dead tokens. (Witness: `--spring-gentle` is consumed only via the `--ease-spring-gentle`
   alias today — the census decides whether the alias-only reach counts as a consumer or the preset is
   retired; RATIFY — see Open Questions.)

### CONVERGE folds (cross-repo — the charter CORRECTION)

- **EXTERNAL consumer enumeration (result 14 — speedtest, cross-repo blocker).** The W05 scope as charter-
  written names only INTERNAL consumers, but **speedtest is an EXTERNAL consumer of `--ease-apple-spring`
  at 4 sites**, inheriting the token from glass-ui's tokens.css (confirmed: NO local
  `--ease-apple-spring:` declaration in speedtest — sibling `../speedtest` @ `3be10905`):
  `MeterColumn.vue:291-292` (`transform`/`width` dial-out) + `SpeedtestResults.vue:842` (the complete-morph
  re-seat). Deleting the token leaves speedtest's `var(--ease-apple-spring)` **resolving empty → the
  dial-out / complete-morph transitions degrade to instant/linear with NO error** — the silent clean-break
  breakage that is the exact headless-green/visually-broken gap AX.W00 was built to close, transposed to the
  cross-repo seam. The MeterColumn comment (`:281` — "`--ease-apple-spring` is the DEPARTURE spring") already
  documents apple-spring as the intended departure curve → it maps to the **settle/control register**.
  **Resolution:** re-point speedtest's 4 sites onto the governed `--spring-*` register as part of the clean
  break (the consumer-side edit is a CROSS-REPO PR — it **routes to W34**, gated on the AX publish per §4
  note 12); this wave authors the annex, NOT the sibling edit. The **W05 gate is the FORCING FUNCTION**: a
  no-`--ease-apple-spring`-in-consumers constellation census (see HardGate) goes RED until the speedtest leg
  lands, so the token cannot silently break a consumer.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/styles/tokens.css` | **DELETE** `--motion-ease-apple-spring` (`:178`) + `--ease-apple-spring` alias (`:181`); strike/rewrite the apple-spring history comments (`:1304-1317`) to the excision rationale (no live dependency on the deleted token). EXTEND the regen-emitted PRESETS-comment surface to name the surface-class per register (or the rationale rides the regen script — see below). |
| `src/styles/theme.css` | **DELETE** the `--ease-apple-spring: var(--motion-ease-apple-spring)` re-alias (`:361`). ADD `--slider-thumb-spring: var(--spring-dock)` if the slider re-point is expressed as a token (the dock-register default for the in-dock thumb). |
| `src/components/custom/tabs/UnderlineTabs.vue` | `:75` — `var(--ease-apple-spring)` → `var(--spring-snappy)` (control register). |
| `src/components/custom/tabs/BouncyToggle.vue` | `:135` — `readToken("--ease-apple-spring", …)` → `readToken("--spring-bouncy", …)`; the cubic-bezier default literal replaced by the playful register (no hand-rolled bezier fallback). |
| `src/components/custom/timeline/ContinuousMarkers.vue` | `:385` — `var(--ease-apple-spring, cubic-bezier(…))` → `var(--spring-snappy)`; DELETE the inline cubic-bezier fallback. |
| `src/components/ui/progress/ProgressSectioned.vue` | `:188` — collapse `var(--spring-snappy, var(--ease-apple-spring, ease-out))` → `var(--spring-snappy, ease-out)` (drop the dead apple-spring middle layer). |
| `src/components/ui/slider/Slider.vue` | `:214` — the thumb `transform` timing re-pointed from `--ease-spring` (snappy) onto the dock register (`var(--slider-thumb-spring, var(--spring-dock))`). |
| `scripts/proof-spring-tokens-synced.mjs` | Widen the comment-sync target set (add `proof-dock-motion-parity.mjs`) OR (preferred) import-and-render the overshoot; ADD the `--spring-*` consumer-coverage assertion (fail-closed on zero consumers). |
| `scripts/proof-dock-motion-parity.mjs` | Fix the stale `(0.5,0.5)`/`+18.5%` prose (`:16,188`) → `(0.32,0.7)`/`~+4.6%`. |
| `scripts/regen-spring-tokens.mjs` | Extend the PRESETS `comment` strings to name the surface-class register rationale (`:30-61`) — the single source the doc-table derives from. |
| `package.json` | The widened/new spring-gate script entries + the W00 meta-gate parity match. |
| `docs/tranches/AX/audit/W05-one-ios-spring-vocabulary.json` | **NEW** — the wave's born-RED→GREEN audit artefact + the consumer-census + the cross-repo annex. |

**OUT of bounds:** `src/styles/dock.css` + `GlassDock.vue` (the dock-morph driver rows — that is W01; this
wave touches NO dock.css spring rule, only the token cohort + the SFC consumers); `useLayerTransition.ts`
(the JS `DOCK_SPRING` const — W01 owns the morph driver; this wave does NOT retune the dock spring, it
GOVERNS the vocabulary around it); the wrap/`--dock-overflow-bp`/`--shadow-dock-wrap` rows of tokens.css —
those are W04; `src/styles/view-transition.css` (`--vt-ease` / the VT fork — W01 retires it). The speedtest
sibling source — that is W34 (this wave authors the annex, writes NO sibling source).

---

## Disjointness (sibling waves it must NOT overlap)

The dock band (W01-W06) all mutate `dock.css` and/or `GlassDock.vue` — but **W05 is the band member that
does NOT touch either of those two files** (it touches the token cohort + SFC consumers + gate scripts). Its
collision surface is narrower; the dispatch contract:

- **vs W01 (single-scalar morph — `useLayerTransition` + dock.css morph rules + GlassDock.vue VT removal).**
  W05 **dependsOn W01**. W01 owns the dock MORPH DRIVER and the `--spring-dock` retune authority (the
  `DOCK_SPRING` const + the dock.css morph transition). W05 GOVERNS the vocabulary AROUND the settled
  `--spring-dock` — it must run AFTER W01 so the dock register it pins to (and the slider-in-dock re-point)
  composes with the settled single-scalar curve, not a curve W01 then rips out. Disjoint files entirely
  (W01: dock.css/useLayerTransition.ts/GlassDock.vue/view-transition.css; W05: tokens.css/theme.css spring
  rows + 4 SFC + gate scripts) — sequential, not concurrent.
- **vs W03 (keepDockOpen — `Slider.vue` + new `useDockHold.ts`).** **BOTH edit `Slider.vue`** — W03 the
  hold-state wiring (the `@pointerdown`/`@touchstart` → `useDockHold` re-seat + the `data-held` halo),
  W05 the thumb `transform` timing-function (`:214`, a different CSS region — the `.slider-thumb`
  transition rule, not the listener wiring). Coordinate the two `Slider.vue` hunks (disjoint template/style
  regions) so they land in dependency order (W03 also dependsOn W01). The W05 thumb re-point composes with
  the W03 `data-held` halo (both want the in-dock slider to breathe with the dock).
- **vs W04 (dock overflow/wrap — `dock.css` wrap rules + `tokens.css` wrap tokens + `GlassDock.vue`).**
  **BOTH edit `tokens.css`** — W04 the `--dock-overflow-bp` (delete) + `--shadow-dock-wrap` (add) rows;
  W05 the `--motion-ease-apple-spring`/`--ease-apple-spring` (delete) + the regen `--spring-*` PRESETS-comment
  rows. **Disjoint token cohorts** (wrap-layout vs spring-easing) — coordinate the `tokens.css` hunks; no
  semantic overlap.
- **vs W06 (dock.css → `src/styles/dock/` partials split + storybook consolidation).** W06 **dependsOn
  W01 + W04** and lands LAST in the dock band. W05 touches NO dock.css rule, so the W06 dock.css carve does
  NOT collide with W05; the only shared concern is the `--spring-dock`-pinning rationale W05 documents (W06
  must preserve it through the partials split — it carries the dock register into the split model).
- **vs W34 (cross-repo consumer adoption).** W05 authors the speedtest 4-site re-point ANNEX (MeterColumn.vue
  :291-292 + SpeedtestResults.vue:842 → the governed `--spring-*` register); the actual sibling-repo edit
  executes in W34 (gated on the AX publish per §4 note 12). W05 writes NO sibling source — it ships the
  forcing-function census gate that goes RED until the consumer leg lands.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤1 agent — one cohesive token-excise + SFC re-point fold).** Lands the apple-spring token
  deletion (tokens.css + theme.css), the 4 internal consumer re-points (UnderlineTabs/BouncyToggle/
  ContinuousMarkers/ProgressSectioned onto the governed registers), the Slider-in-dock register re-point
  (the `--slider-thumb-spring` → `--spring-dock` default), the regen PRESETS-comment surface-class
  rationale, and the stale-prose fix in `proof-dock-motion-parity.mjs`. Lint + typecheck at every interval.
- **Adversarially-verify (≤1 read-only lane).** Re-runs the grep at wave-open to confirm the EXACT direct
  consumer set is **4 internal, NOT 5** (the charter mis-listed Slider — re-prove it is on `--ease-spring`,
  not the bezier). Confirms ZERO `--ease-apple-spring`/`--motion-ease-apple-spring` survivors in `src/`
  after the wave; confirms the slider-in-dock now resolves the dock curve on a live `<GlassDock><Slider/>`
  mount; A/B-screenshots the four re-pointed surfaces (underline glide, bouncy toggle, continuous markers,
  progress sectioned) to confirm the motion reads RIGHT on the new register (the underline still glides, the
  toggle still bounces — the register-map is correct, not just compiling). Runs the constellation census:
  greps `../speedtest` for `--ease-apple-spring` (confirms the 4 external sites + no local def). ADVERSARIAL
  twist: tries to make the consumer-coverage gate PASS on a freshly-minted dead `--spring-*` preset (zero
  consumers) and confirms it goes RED; tries to leave a stale spring number in a third file and confirms the
  widened/import-render gate catches it.
- **Gate-author (≤1 agent — born-RED→GREEN).** Authors the widened `proof:spring-tokens-synced` (import-and-
  render the overshoot OR the widened comment-sync target set) + the `--spring-*` consumer-coverage assertion
  + the no-`--ease-apple-spring`-survivor sweep (library) + the no-`--ease-apple-spring`-in-consumers
  constellation census + the `package.json` entries + the W00 meta-gate parity. Confirms each FAILS at
  `eaba94f` and PASSES on the patched tree (the constellation census stays RED until the W34 speedtest leg
  lands — it is the publish-gated forcing function).

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 3.)

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / runtime gates — born-RED→GREEN.**

- **`proof:spring-tokens-synced` (WIDENED).** Either (preferred) IMPORTS `DOCK_SPRING` / the regen PRESET and
  RENDERS the overshoot at runtime (no hand-typed number to rot), OR widens the comment-sync target set to
  include `proof-dock-motion-parity.mjs`. **Born-RED at HEAD** (the stale `(0.5,0.5)`/`+18.5%` text in
  `proof-dock-motion-parity.mjs:16,188` sits in a file the gate does not scan → un-caught). GREEN after the
  prose is fixed + the gate import-renders.
- **`--spring-*` consumer-coverage assertion (NEW, fail-closed).** A `--spring-X` preset with zero
  `var(--spring-X)` (or `--ease-spring-X`-alias, per the RATIFY decision) consumers FAILS the gate.
  **Born-RED** if the census finds a dead preset (the generator can mint one); GREEN once every emitted
  preset has a consumer or is formally justified/retired. This is a **runtime/source-resolution** gate
  (it resolves the cohort + counts consuming declarations), a precept-valid artefact form.
- **No-`--ease-apple-spring`-survivor sweep (library, deletion-PROOF).** `grep
  -- "--ease-apple-spring|--motion-ease-apple-spring"` over `src/` → **0** definitions + **0** consumers.
  **Born-RED at HEAD** (2 definitions + 4 consumers). GREEN after the excise. This is a **deletion-proof** (a
  valid hard-gate form per SPEC.md §Hard Gates), NOT a grep-for-runtime-behaviour.
- **No-`--ease-apple-spring`-in-consumers constellation census (cross-repo forcing function).** Greps the
  constellation consumers (at minimum `../speedtest`) for `var(--ease-apple-spring)` reads with no local
  definition. **Born-RED** (speedtest has 4) and STAYS RED until the W34 speedtest re-point leg lands —
  the publish-gated forcing function that prevents the silent clean-break (the token cannot be deleted in a
  way that breaks a consumer without the census flagging it). Recorded as a {receiver: W34, close-gate: this
  census} per the §16.4 zero-loss mandate.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass on the four re-pointed surfaces + the slider-in-dock, at ≥ 2 viewports in light AND dark:

- **Slider-in-dock breathes on the dock spring (the headline visual).** On a `<GlassDock><Slider/></GlassDock>`
  mount, the slider thumb morph and the dock collapse/expand read as ONE coherent iOS spring — the thumb does
  NOT snap on a sibling-snappier curve while the dock breathes. Side-by-side BEFORE (snappy thumb vs dock
  curve mismatch) / AFTER (shared dock register).
- **The four re-pointed surfaces still read RIGHT.** The UnderlineTabs underline still glides cleanly (control
  register), the BouncyToggle still bounces (playful register — the overshoot survives the map), the
  ContinuousMarkers still tracks smoothly, ProgressSectioned still fills correctly — the register-map is
  perceptually correct, NOT just compiling. Any surface that reads WORSE on its new register is a RATIFY
  (the surface-class map is wrong for it).
- **Affordance / hierarchy / spacing / NO visual occlusion** per the AX cardinal gate.

**The wave does NOT close on the headless gates alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`) is the binding close criterion. The
slider-in-dock shared-spring is the load-bearing visual proof.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-run the grep against HEAD `eaba94f`: confirm the EXACT
   direct apple-spring consumer set is **4 internal** (NOT the charter's 5 — re-prove Slider is on
   `--ease-spring`, not the bezier), confirm the 2 token definitions, confirm the stale parity-gate prose,
   confirm `--spring-gentle`'s alias-only reach, and grep `../speedtest` for the 4 external sites. Record all
   in `audit/W05-one-ios-spring-vocabulary.json` as the born-RED baseline. Do NOT proceed on the charter's
   count — re-prove.
2. **Author the born-RED gates.** The widened `proof:spring-tokens-synced` (import-render) + the
   consumer-coverage assertion + the survivor sweep + the constellation census + `package.json` entries;
   confirm each FAILS at HEAD.
3. **Excise the bezier + re-point the 4 internal consumers.** DELETE the two tokens (tokens.css + theme.css);
   re-point UnderlineTabs/BouncyToggle/ContinuousMarkers/ProgressSectioned onto the governed registers; delete
   the inline cubic-bezier fallbacks. Lint + typecheck.
4. **Slider-in-dock register re-point.** Slider.vue:214 thumb `transform` → the dock register
   (`--slider-thumb-spring` → `--spring-dock`); coordinate the hunk with W03's Slider.vue region.
5. **Govern the vocabulary.** Extend the regen PRESETS `comment` surface-class rationale; document the
   dock-register-for-dock-and-its-slider map.
6. **Truth-up the pipeline.** Fix the stale `(0.5,0.5)`/`+18.5%` prose in `proof-dock-motion-parity.mjs`; run
   the `--spring-*` overfitting census + resolve `--spring-gentle` (alias-only) per the RATIFY decision.
7. **Author the cross-repo annex.** Record the speedtest 4-site re-point (MeterColumn.vue:291-292 +
   SpeedtestResults.vue:842 → governed register) for W34; confirm the constellation census stays RED until
   the leg lands.
8. **Gates GREEN.** Confirm the library gates pass; run the VISUAL-TRUTH live audit (slider-in-dock shared
   spring + the four re-pointed surfaces); capture the paired-π BEFORE/AFTER + DELTA; write
   `audit/W05-one-ios-spring-vocabulary.json` to GREEN (the constellation census recorded RED-pending-W34).

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W05-one-ios-spring-vocabulary.json` — the born-RED→GREEN ledger: the three RED
  witnesses (the 2 token defs + 4 internal consumers, the slider register mismatch, the gate-truth gaps), the
  CORRECTED direct-consumer set (4 internal, not 5 — Slider re-classified), the per-finding (F3/F4/F5)
  disposition, the `--spring-*` consumer census, and the post-wave GREEN measurements.
- The widened `scripts/proof-spring-tokens-synced.mjs` + the `--spring-*` consumer-coverage assertion + the
  survivor sweep + the constellation census script.
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the slider-in-dock spring-mismatch BEFORE
  (snappy thumb vs dock curve) vs AFTER (shared dock register), and the four re-pointed surfaces on their new
  registers, at ≥ 2 viewports × light/dark.
- A consumer-NOTE annex (folded into the W34 coordination ledger, NOT executed here): the speedtest
  `MeterColumn.vue:291-292` + `SpeedtestResults.vue:842` `--ease-apple-spring` → governed `--spring-*`
  re-point (the MeterColumn `:281` "departure spring" comment maps to the settle/control register), gated on
  the AX publish.

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(motion): widen proof:spring-tokens-synced + --spring-* consumer-coverage + apple-spring survivor sweep born-RED (AX.W05)`
2. `refactor(motion): excise the legacy --ease-apple-spring bezier — re-point UnderlineTabs/BouncyToggle/ContinuousMarkers/ProgressSectioned onto the governed --spring-* registers (AX.W05 F4)`
3. `fix(slider): re-point the in-dock thumb spring onto the dock register — --slider-thumb-spring defaults to --spring-dock (AX.W05 F4)`
4. `docs(motion): govern the iOS-spring vocabulary — surface-class register rationale in regen-spring PRESETS (AX.W05 F4)`
5. `fix(gates): truth-up the spring pipeline — stale (0.5,0.5)/+18.5% prose, import-render overshoot, --spring-gentle census (AX.W05 F3+F5)`
6. `chore(AX.W05): audit ledger GREEN + speedtest cross-repo annex (W34) + paired-π BEFORE/AFTER + DELTA capture`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per
the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W01 (single-scalar morph) — HARD.** W01 owns the dock morph driver and the `--spring-dock` retune
  authority. W05 GOVERNS the vocabulary around the settled `--spring-dock` and re-points the in-dock slider
  ONTO the dock register — it must run AFTER W01 so the register it pins to (and the slider re-point) compose
  with the settled single-scalar curve, not a curve W01 then rips out. Sequencing W05 before W01 would govern
  a vocabulary around a spring W01 replaces. (Charter §3 dependsOn AX.W01.)
- **AX.W00 (π visual-runtime lane) — the close machinery.** The widened spring gates + the consumer-coverage
  assertion ride the W00 fail-CLOSED lane, and the slider-in-dock shared-spring VISUAL-TRUTH audit is the
  binding close criterion. W05 cannot close on a headless gate alone; W00 stands up the lane it closes on.
- **Downstream:** **AX.W06** must preserve the dock-register rationale through the dock.css→partials split.
  **AX.W34** receives the speedtest 4-site re-point annex (gated on the AX publish per §4 note 12 — the
  constellation census stays RED until the leg lands). **AX.W03** coordinates the shared `Slider.vue` hunk
  (the thumb timing-function region vs the hold-state wiring region).

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **`53c1b07`** (`feat(dock): retune --spring-dock to the iOS-control settled band (AW.W2 part 1)`) — the
  retune off the `(0.5,0.5)`/`+18.5%` playful register to the `(0.32,0.7)`/`~+4.6%` dock curve. This is the
  retune that left the STALE `(0.5,0.5)`/`+18.5%` prose in `proof-dock-motion-parity.mjs:16,188` (a file the
  comment-sync gate never scanned) — the F3 doc-rot / gate-blindspot.
- **`6dd0d14`** (`feat(tranche-AU): W8 — dock-motion overhaul … --spring-dock … settle/vocabulary gates`) —
  where the `--spring-dock` register + the settle/vocabulary gates were minted; the regen pipeline modernized
  the spring tokens here but NEVER excised the predecessor `--motion-ease-apple-spring` bezier (the F4
  two-vocabularies root — the regen added the new register beside the old one).
- **The regen pipeline** (`scripts/regen-spring-tokens.mjs:30-61`) — the generator whose PRESETS table emits
  the 5 `--spring-*` tokens regardless of consumer count (the F5 dead-token-minting root; `--spring-gentle`'s
  alias-only reach is the live witness).
- **§4 note 23 (the dock-spring ORACLE).** keyframes.js's published `(0.32,0.7)` `--spring-dock` curve
  (sampled peak ~+4.6%) is the system-dock baseline the vocabulary pins to; W05 governs the register
  rationale around it, W01 owns the curve, and the in-dock slider re-point shares it.
- **HEAD `eaba94f`** (batch-1 integration, UNPUBLISHED) — the audit baseline; the 2 token definitions + 4
  internal consumers + the slider register mismatch are live here, and the published-registry 3.6.0 the
  speedtest consumer MEASURED still carries the inherited `--ease-apple-spring` (§4 note 12 — the cross-repo
  leg is publish-gated).

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-A binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **one-path / no-legacy-code.** Two parallel iOS-spring vocabularies (the regen `--spring-*` cohort + the
  legacy apple-spring bezier the allow-list tolerates) is the canonical no-legacy violation. The wave
  EXCISES the bezier and governs ONE register source — no alias bridge, no deprecation shim (the
  no-backwards-compat MEMORY: clean break, no legacy aliases). MUST NOT re-point a consumer onto a
  hand-rolled `cubic-bezier`/`linear()` literal (the coherence-gate anti-pattern) — every re-point composes a
  governed `--spring-*` token.
- **abrogate-before-patch.** The bezier is DELETED and its consumers re-derived onto the governed registers,
  NOT bridged (no `--ease-apple-spring: var(--spring-snappy)` alias — that would preserve the second name).
  Aligns with the §0 "excise or fail explicitly" mandate.
- **no-overfitting (substrate-without-consumer-binary; the overfitting-audit MEMORY).** The F5 consumer-
  coverage census on all five `--spring-*` presets: every emitted token has ≥ 2 consumers or is formally
  justified/retired (the generator cannot mint dead tokens). `--spring-gentle`'s alias-only reach is the live
  test of the bar. The fail-closed coverage assertion makes the bar machine-enforced.
- **substrate-with-consumer / wire-before-retire.** The token excision is NOT shipped in a way that silently
  breaks a consumer — the no-`--ease-apple-spring`-in-consumers constellation census stays RED until the W34
  speedtest re-point lands, so the deletion is wired-through-its-consumers before it is trusted. The
  cross-repo-dev-resolution precept (contract-v2, invariant 30) binds: speedtest dev-resolves glass-ui's
  `dist/`, so an emptied `var(--ease-apple-spring)` is a real consumer break, not a befitting degradation.
- **no-silent-deferrals.** The speedtest external-consumer leg is NOT silently dropped — it is routed to W34
  with a named annex + a forcing-function census {receiver: W34, close-gate: the constellation census}, per
  the §16.4 zero-loss mandate. The slider-in-dock register fix is ADDRESSED here, not deferred.
- **fail-explicit on library-internal violations (vs befitting-silent browser-API degradation).** A
  generated `--spring-*` preset with zero consumers is a library-internal contract violation — the
  coverage gate FAILS LOUD, not a silent dead token. (No browser-API degradation is involved — this is a
  library-token-contract fix.)
- **π visual-runtime lane / Gates-close-on-evidence (SPEC.md §Hard Gates).** The survivor sweep + the
  constellation census are DELETION-PROOFS (a valid artefact form); the consumer-coverage + the import-render
  overshoot are RUNTIME/source-resolution observations, NOT "grep found a source string for runtime
  behaviour." The wave's close is the executed slider-in-dock VISUAL-TRUTH audit, never a headless proof
  alone — the cardinal AX precept.
- **binding-verification (glass-ui MEMORY — stale bindings silently no-op).** Deleting `--ease-apple-spring`
  while a consumer (internal OR external) still reads it is a binding-verification-class break (the
  `var()` resolves empty → instant/linear with no error; vue-tsc + units miss it). The survivor sweep +
  constellation census are exactly the binding-verification sweep this class demands.

---

## Open questions / RATIFY-BEFORE-IMPL

1. **The surface-class register map — RATIFY-BEFORE-IMPL.** The recommended map: UnderlineTabs →
   `--spring-snappy` (control), BouncyToggle → `--spring-bouncy` (playful), ContinuousMarkers →
   `--spring-snappy` (control), ProgressSectioned → `--spring-snappy` (already primary), the in-dock Slider
   thumb → `--spring-dock` (dock register). RATIFY each at the VISUAL-TRUTH audit — if a re-pointed surface
   reads WORSE on its mapped register (e.g. the bouncy toggle loses its bounce on snappy, or the markers feel
   stiff), the map for that surface is wrong. The bezier (~+27.5%) overshot more than any `--spring-*`; the
   nearest is `--spring-bouncy` (~+20.5%) — confirm none of the four NEEDS the larger overshoot (if one does,
   that is the genuine "the register vocabulary is too small" finding, not an excuse to keep the bezier).
2. **`--spring-gentle` consumer-coverage — RATIFY.** It is consumed ONLY via the `--ease-spring-gentle`
   theme.css alias (zero direct `var(--spring-gentle)` surface). RATIFY whether the alias-only reach counts
   as a consumer (the alias IS a public `@theme` surface a consumer can use) or the preset is RETIRED per the
   overfitting bar. Recommendation: the `@theme` alias is a documented public register (presets-in-consumers
   split) → it counts; the coverage gate accepts an alias-reach as a consumer. DECIDE at the census.
3. **Slider re-point as a token vs a direct `var(--spring-dock)` — RATIFY.** The recommendation is a
   `--slider-thumb-spring` token defaulting to `--spring-dock` (consumer-overridable, dock-register by
   default), NOT a bare `var(--spring-dock)` on Slider.vue:214 (which would hardcode the dock curve onto a
   slider that is sometimes NOT in a dock). RATIFY whether a standalone (non-dock) Slider should default to
   the dock register or to `--spring-snappy` — the token default lets both cases resolve correctly.
4. **Comment-sync gate: import-render vs widened target-set — RATIFY the import-render path.** The
   recommended F3 resolution is the import-and-render (the gates import `DOCK_SPRING`/the PRESET and render
   the overshoot at runtime — NO hand-typed number to rot). RATIFY that this is genuinely cleaner than
   widening the file-set (which only defers the rot to the next file that quotes a number). Recommendation:
   import-render is the gestalt fix (the number is sourced once, never restated).
5. **The cross-repo gate posture — RATIFY (the §4 note 12 publish-currency hinge).** RATIFY whether the W05
   excision lands in glass-ui FIRST (with the constellation census recorded RED-pending-W34, gated on the AX
   publish) OR is held until the speedtest adoption PR is ready. Recommendation: land the library excision +
   the RED-pending census in W05 (the forcing function), execute the speedtest re-point in W34 on the AX
   publish — the census prevents a silent break either way, matching the cross-repo-dev-resolution contract-v2.
