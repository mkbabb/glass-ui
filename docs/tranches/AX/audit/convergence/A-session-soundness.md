# A-session-soundness — AX-session commit SOUNDNESS + regression ledger

**Lane** A-session-soundness · **Verdict** audit-note (cross-cutting; routes each finding to the
covering wave, mints no net-new wave) · **HEAD** `f2fc614` (glass-ui 3.8.0 cut, AX W00–W24 band)

Scope: review the AX session commits (`git log master`, `f2fc614`…`81a9d95`) for SOUNDNESS and the
REGRESSIONS the user flagged in USER-DEFECTS-2026-06-08 — the specular "thought fixed by W09" (D11),
the chassis "thought removed" (D12), configurator/BouncyTabs (D1/D3), the bundle-budget growth — and
flag any wave marked COMPLETE that the live product contradicts. This is the cardinal-lesson meta-audit:
NOT re-deriving each fix (the D1/D3/D11/D12 convergence files already own the fix directions), but
auditing whether the *session itself* is sound — whether "complete" means complete.

The headline soundness verdict: **the session is mechanically honest but its completion semantics are
inflated.** Three waves marked `complete` in PROGRESS.md were closed on the headless gate alone while
their own JSON ledgers record the binding live-truth audit as PENDING or the defect as deliberately
PRESERVED. The user's live observations (D3, D11) are not new bugs introduced this session — they are
the **un-run close criteria of waves already marked done**. The cardinal lesson (a green headless proof
over a still-broken live surface is NOT done) was VIOLATED at the PROGRESS-ledger level even though the
individual wave JSONs encode it correctly.

---

## S1 — W09 "complete" is a status LIE: PROGRESS says complete, the JSON says live-pending (BLOCKER soundness)

**This is the load-bearing soundness defect of the session.**

- `docs/tranches/AX/PROGRESS.md:22` → `| W09 | specular tune to subtle | complete |`.
- `docs/tranches/AX/audit/W09-specular-tune.json:4` → `"status": "dev-complete-headless-green-live-pending"`.
- The JSON's own `liveVerifyHandoff.binding` (`:82-83`): *"The wave does NOT close on the headless gate
  alone — the executed live Playwright + frontend-design VISUAL-TRUTH audit … is the binding close
  criterion."* The `orchestratorMustRun` clause (`:93`) names a live π audit that the agent sandbox
  cannot run (no real-GPU browser).

So W09 was promoted to `complete` in PROGRESS **before its own binding close criterion executed.** D11
(the user's "specular egregious — thought fixed by W09," screenshot 15.03.25) is not a new regression —
it is **the finding from the live audit W09 was closed without running.** The session marked a wave done
on the exact false-GREEN the AX W00 lane was built to prevent.

**Compounding the lie: the W09 gate is scope-blind to the radials the user sees.** `scripts/proof-glass-
material-unified.mjs` asserts ONLY on `.glass-material::before` (the moving specular, `:101`) + the
`--glass-material-rim` group (`:132`). It NEVER parses `--glass-curvature-overlay` or the `ellipse at
30% 30%` corner radials. So the gate reads GREEN ("pure-white gone ✓", JSON `:16`) while THREE pure-
white / saturated-corner radials still ship at HEAD (verified, S2 below). The gate's GREEN is *true for
what it measures* and *false for what the user saw* — the textbook headless-green/visually-broken gap.

**Routing:** this is the **D11 finding** (already authored: `convergence/D11.md`, verdict augment-W09).
A-session adds the META-observation D11 does not state: **W09 must be DE-MARKED from `complete` to
`live-pending` in PROGRESS.md** before any further wave depends on its "done" status. The augment is not
just extending W09's FileBounds (D11's prescription) — it is correcting the PROGRESS ledger so "complete"
stops meaning "headless-green." Severity: blocker (a false `complete` corrupts the dependency DAG —
downstream waves that `dependsOn` a live-truth surface trust a status that never earned itself).

---

## S2 — Specular regression CONFIRMED at source: three pure-white/saturated radials W09 never touched (major)

Verified at HEAD (the user is correct; "thought fixed by W09" is accurate-but-incomplete):

1. **`--glass-curvature-overlay`** — `tokens.css:789-793` is `radial-gradient(ellipse at 50% -20%,
   hsl(0 0% 100% / 0.06), transparent 60%)` — **pure white** (L=100%), the SAME anti-pattern W09 fixed
   at `.glass-material::before`. Worse, it is defined **THREE times** with a byte-identical body:
   - `:789` the `:root` light token,
   - `:794` a `--glass-curvature-overlay-dark` sibling token (an orphan — grep shows no consumer reads
     the `-dark` suffix variant; the chassis CSS reads the base token), and
   - `:1698` a `.dark`-block override that is **byte-identical to the light arm** — the unsoftened-dark
     defect W09 explicitly fixed for the moving specular (RED-witness-1) but left here.
   The triple-definition with a dead `-dark` orphan AND an unsoftened `.dark` override is itself a
   soundness smell (token redundancy + a never-read variant — overfitting-bar adjacent).
2. **`dock-controls.css:304` + `:330`** — `.dock-tab-button[data-tier="primary"]` hover radial +
   always-on `[data-phase]` `::before`, both `ellipse at 30% 30%, …--phase-color 18%…` (top-left corner
   bloom on the dock's most-prominent control).
3. **`utilities.css:783`** — `btn-audacious` hover `ellipse at 30% 30%, …--primary 18%…` (the source
   recipe the dock-primary mirrors).

(Also `glyph-face.css:47` carries an `ellipse at 30% 30%` — a fourth site D11 did not enumerate; it is a
glyph-face backplate highlight, lower-prominence, but the same fixed-corner family. Worth folding into
the D11 sweep so the magnitude axis is genuinely library-wide.)

**Routing:** wholly the **D11 finding** (`convergence/D11.md`, augment-W09) — D11 enumerates 1-3 with
line refs and the gestalt fix (warm-cream + tokenized intensity + softened dark arm + one radial-glow
magnitude axis). A-session corroborates D11 at source and adds two notes: (a) the curvature overlay's
DEAD `-dark` orphan token + the redundant triple-definition should be collapsed in the same pass (D11's
fix re-derives the token — the cleanest form deletes the orphan and the redundant `.dark` re-declaration,
letting one `color-mix`-tokenized overlay re-resolve under `.dark` via `--foreground`, the cartoon-shadow
pattern); (b) add `glyph-face.css:47` to the D11 sweep set.

---

## S3 — BouncyTabs "egregious motion" was KNOWN and CONSCIOUSLY SHIPPED by W05 (major soundness)

W05 (`complete`) is the session commit `c6acda0` ("excise the legacy --ease-apple-spring bezier"). Its
own JSON records, in the live-arm close notes, the exact motion the user flagged:

- `W05-one-ios-spring-vocabulary.json:104` → *"Confirm the four re-pointed surfaces still read RIGHT:
  … **BouncyToggle still bounces (PLAYFUL — overshoot survives the map)** …"*

So W05 **knew the bounce survived and marked the wave complete anyway.** W05's mandate was register
coherence (excise the bezier, one `--spring-*` source) — it re-pointed `BouncyToggle.vue:139`
`readToken("--ease-apple-spring")` → `readToken("--spring-bouncy")` and DELIBERATELY preserved the
keyframe shape. Verified at source (`BouncyToggle.vue:143-151`): the press track is still
`scale(1) → scale(0.96)@0.25 → scale(1.08)@0.7 → scale(1)` over `duration: 200` with `--spring-bouncy`
easing — the **double-spring** (a baked positional overshoot keyframe × an overshooting spring easing),
which is exactly D3's root cause. The `--scale-hover` (1.08) hover-state token is mis-recruited as the
press rebound PEAK.

**Soundness verdict:** W05 is not a regression — it is a wave that closed with a known-jarring motion it
chose not to fix because the *shape* was out of its register-only scope. The defect is the un-run other
half of W05's own VISUAL-TRUTH clause. This is sound IF the PROGRESS ledger flagged the carry-forward; it
does NOT — PROGRESS.md:18 marks W05 flatly `complete` with no "bounce shape deferred" note, so the user
re-discovered a defect the session already documented internally.

**Routing:** the **D3 finding** (`convergence/D3.md`, augment-W05 with a re-opened MOTION-SHAPE arm). A-
session adds: the W05 close note "still bounces" should have been a PROGRESS carry-forward row (like the
W04-band carries the god-module/legacy-commentary REDs to W26/W27), not a buried JSON line — so the next
live pass doesn't re-file it cold.

---

## S4 — Chassis "thought removed" is SOUND: planned-pending, not a stale survivor (audit-note, no action)

The user's "I thought the instrument chassis was to be removed?" (D12) is correct that it ships, and
SOUND that it still does. Verified: `src/components/custom/instrument-chassis/` + `instrument-rail/`
ship whole; `src/index.ts:118-119` re-exports both. The retire is **cross-repo native-first sequenced**
(W28 native-receive → W29 prune, both `planned`) — the prune cannot run ahead of the speedtest/muster
native receives or every consumer build resolves a dangling import. This is fully covered by
`convergence/D12.md` (verdict augment → PROGRESS-ledger visibility note).

**No session regression here** — nothing was "un-removed"; the removal is correctly gated and pending.
The only soundness gap is VISIBILITY: a user doing a live pass sees a survivor with no signal that it is
intentional-but-pending. A-session concurs with D12: a one-line PROGRESS note under W28/W29
("instrument-chassis = REPATRIATE-pending-native-receive; instrument-rail = PRUNE-pending; not stale")
is the whole fix. Recorded for completeness; D12 owns it.

---

## S5 — Bundle-budget growth: the 7th CONSCIOUS lift + a FORWARD-SIZED ceiling (minor soundness smell)

Commit `693bf3b` lifts `dist/styles/index.css` from gzip 134k/raw 516k → **gzip 140k/raw 548k**. The
commit calls it "the SEVENTH conscious lift." The CSS-ceiling history confirms a steady creep:

- `08974c7` (AW cut) gzip 118k → 124k
- `bd7842f` (AO.W4) re-base to "the real draw"
- `3a2cf98` (AU.W9) W8/W8b lift
- `0b27f01` (AV) structural lift
- `693bf3b` (AX) 134k → 140k

Two soundness observations:

1. **The lift's stated cause is legitimate feature growth** (W04 dock wrap, W13 mediums, W17
   constellation, W22 fonts) — measured /styles draw is gzip ~134.6k, genuinely past the 134k cap. This
   is NOT masking a regression; it is real CSS the AX features added. Sound.
2. **BUT the new ceiling (140k) is sized for UNWRITTEN features.** The commit message explicitly states
   the lift is "sized to carry the AX convergence CSS (the dock showcase section, the idiomatic
   configurator restyle, the uniform dropdown type-scale) net of the convergence trims (blob-page
   consolidation, chassis retire)." That is **pre-emptive budget sizing for waves that have not shipped**
   (W06 dock showcase, W38 configurator, D17 dropdown scale — all `planned`). A budget ceiling that
   bakes in headroom for un-merged features defeats the gate's forcing-function purpose: when W06/W38
   land, the gate will not BITE because the slack was pre-allocated. The honest re-baseline sizes to the
   ACTUAL current draw (134.6k → a 135k or 136k ceiling), and each future wave re-baselines for its own
   measured growth net of its trims (the chassis retire + blob consolidation will RECLAIM draw, possibly
   making a lift unnecessary). Forward-sizing the ceiling for trims-that-haven't-happened (chassis still
   ships, S4) is sizing against a credit that has not landed.

**Routing:** this is a process/gate-hygiene note for **W33** (close — gate fleet) and/or **W25a/W25b**
(CSS god-module/monolith carves, which will RECLAIM draw). The carves + the chassis retire (W29) +
blob-page consolidation (W18/W40) are net-NEGATIVE CSS; the 140k ceiling should be RE-TIGHTENED to the
post-carve measured draw at W33 close, not left at a forward-sized 140k. No net-new wave — fold the
re-tighten into W33's gate-fleet reconciliation. Severity minor (the lift itself is honest; the
forward-sizing is a gate-discipline smell, not a shipped defect).

---

## S6 — The release-gate unblock (`f2fc614`) is SOUND (audit-note, no action)

The final session commit `f2fc614` ("unblock the 3.8.0 publish") adds two gate exemptions:

1. `proof:consumers:static` — restores 3 single-symbol root allows for `useTextHighlight` /
   `HighlightMatcher` / `UseTextHighlightControls` after W37 re-homed `useTextHighlight` /dom→/motion-core
   (which moved it off a `rootContractFile`, dropping it from the allowlist union). The re-export is
   keyframes-/vueuse-free (the vReveal precedent). **Sound** — this is restoring a legitimate root export
   the re-home accidentally de-listed, not widening the surface to hide a leak.
2. `proof:lockfile` — exempts the in-repo `tests-visual` π-lane workspace (`link:true`, resolves to the
   committed dir) from the dev-sibling drift guard. npm ci resolves an in-repo workspace natively; only a
   `../sibling` link is the registry-resolution drift the gate guards. **Sound** — a correct narrowing of
   the gate to its actual intent (sibling links), not a blanket disable.

Both exemptions are surgical and correctly reasoned. No soundness concern. Recorded so the convergence
set has a clean bill on the publish-unblock commit (it is NOT a "make the gate pass by gutting it" move).

---

## S7 — Configurator split-brain is a session-EXPOSED, not session-INTRODUCED, defect (audit-note)

D1 (aurora configurator not idiomatic) is real (verified: `AuroraAtomsPanel.vue` carries 9 native
`<select>`/`<input type=range|color>` controls; census `grep -cE` = 9) and fully owned by
`convergence/D1.md` (augment-W38). For SOUNDNESS the question is: did this session introduce it? **No.**
W10 (`complete`, commit `8e5b7a4`) built the atoms-door FUNCTIONAL wiring and EXPLICITLY deferred the
visual restyle to W38 (every W10 FileBound reads "NO glass-atoms VISUAL restyle (that is W38) —
FUNCTIONAL wiring only"). So W10 closed honestly within its scope; the off-idiom chrome is a
correctly-deferred-to-W38 gap, not a W10 regression. The session is SOUND here — the defect predates the
session's atoms wiring and is routed to a planned wave. D1 owns the fix. A-session adds no action.

---

## Soundness ledger summary

| # | Soundness finding | Verdict | Routes to | Severity |
|---|---|---|---|---|
| S1 | W09 marked `complete` in PROGRESS but JSON says `live-pending`; gate scope-blind to the radials the user saw | de-mark + augment | **W09** (+ PROGRESS correction) | blocker |
| S2 | 3-4 pure-white/saturated radials ship (curvature overlay triple-defined w/ dead `-dark` orphan + unsoftened `.dark`; two `30% 30%` corner radials; glyph-face) | augment | **W09** via D11 | major |
| S3 | BouncyTabs double-spring CONSCIOUSLY shipped by W05 ("still bounces" in JSON); no PROGRESS carry note | augment | **W05** via D3 | major |
| S4 | Chassis still ships — SOUND (planned-pending native-first); visibility note only | audit-note | **W28/W29** via D12 | minor |
| S5 | Bundle budget 7th lift is honest BUT forward-sized for unwritten waves; re-tighten at close | augment | **W33** (+ W25a/b reclaim) | minor |
| S6 | Release-gate unblock (`f2fc614`) exemptions are surgical + sound | audit-note | — (clean) | — |
| S7 | Configurator split-brain is session-EXPOSED, not introduced (W10 deferred correctly) | audit-note | **W38** via D1 | — |

**The meta-finding (the one thing this lane adds beyond the D-files):** the session's individual wave
JSONs are HONEST — they each record the live-pending status, the preserved bounce, the carry-forwards.
The DISHONESTY is at the **PROGRESS.md aggregation layer**, where `dev-complete-headless-green-live-
pending` (W09) and "still bounces" (W05) both collapse to a flat `complete`. The gestalt fix is a
PROGRESS-ledger discipline: a wave whose JSON status is not unconditionally `complete` MUST carry its
qualifier (or its carry-forward row) into PROGRESS, exactly as the W04/W05/W13/W22-band sections already
do for the god-module/legacy-commentary REDs. W09 and W05 broke that discipline; D11/D3 are the
consequence. No net-new wave — fold the PROGRESS-status reconciliation into **W33** (close — it already
owns the final ledger/gate-fleet pass) and the per-defect fixes into their named waves (W09, W05, W38,
W28/W29) via the existing D-convergence files.

## Verification trail

- `docs/tranches/AX/PROGRESS.md:22` (W09 `complete`) vs `docs/tranches/AX/audit/W09-specular-tune.json:4`
  (`dev-complete-headless-green-live-pending`) + `:82-93` (`liveVerifyHandoff` binding).
- `scripts/proof-glass-material-unified.mjs:101,132` — gate asserts only `.glass-material::before` + rim;
  no `--glass-curvature-overlay` / `ellipse at 30% 30%` parse.
- `src/styles/tokens.css:789-798` (light token + dead `-dark` orphan) + `:1698-1702` (byte-identical
  `.dark` override) — pure-white curvature overlay, unsoftened dark.
- `src/styles/dock-controls.css:304,330` + `src/styles/utilities.css:783` + `src/styles/glyph-face.css:47`
  — the `ellipse at 30% 30%` corner-radial family.
- `src/styles/dock-controls.css:362` — `var(--glass-highlight)` is a STATIC tier-secondary rim, NOT the
  retired hover specular (W09 hover-retire claim is SOUND; verified not a regression).
- `src/components/custom/tabs/BouncyToggle.vue:143-151` — the double-spring press track
  (`1→0.96→1.08→1` × `--spring-bouncy`, `duration:200`, `--scale-hover` as rebound peak).
- `docs/tranches/AX/audit/W05-one-ios-spring-vocabulary.json:104` — "BouncyToggle still bounces."
- `scripts/profile-bundle.mjs:153` (diff) — gzip 134k→140k, "SEVENTH conscious lift," forward-sized for
  W06/W38/D17.
- `git show f2fc614` — `proof:consumers:static` + `proof:lockfile` exemptions (both surgical, sound).
- `demo/stories/aurora/AuroraAtomsPanel.vue` — `grep -cE 'type="color"|type="range"|<select'` = 9 (D1).
- `src/components/custom/instrument-chassis/` + `instrument-rail/` ship; `src/index.ts:118-119` re-export
  (D12 — planned-pending W28/W29).
- Cross-refs: `convergence/D1.md` (W38), `convergence/D3.md` (W05), `convergence/D11.md` (W09),
  `convergence/D12.md` (W28/W29) — the per-defect fix directions; A-session is the meta-soundness overlay,
  not a duplicate prescription.
