# Convergence audit — A-waves-blob (blob / substrate wave coverage vs D4-D8)

**Lane:** blob/substrate waves W36/W42/W43 + completed W08/W15/W16 vs defects D4/D5/D6/D7/D8.
**HEAD:** `f2fc614` (3.8.0 release line, branch `at-dock-convergence`).
**Verdict (lane-level):** the blob defects D4/D5/D7 are **REGRESSIONS/insufficiencies of the already-landed
W15/W16 work** (not pre-W15 defects), D6 **CONFLICTS with W18's ratified decision**, and D8 is **out of the
blob lane** (glass-material/aurora). W36/W42/W43 have **zero bearing** on any blob defect.

---

## Timeline finding (the cardinal-lesson trigger)

The defect ledger (commit `0653a00`, base `e2c9995`) was captured AFTER the blob band landed:

```
git merge-base --is-ancestor 9d0ec2f e2c9995  → IN  (W15)
git merge-base --is-ancestor d472292 e2c9995  → IN  (W15 REDRESS)
git merge-base --is-ancestor 91fc2e0 e2c9995  → IN  (W16)
```

So the user's LIVE observations D4 (too skeuomorphic), D5 (hover broken/too dramatic), D7 (moods dead) were
made AGAINST the W15/W16 droplet **already shipped**. Both `W15-blob-contained-droplet.json` and
`W16-blob-integration.json` are stamped headless-`GREEN`/`REDRESS dev-complete`, but BOTH carry an unmet
`liveVerifyNeeded` clause ("the orchestrator MUST run the π-lane on the real Metal GPU"). The live π-lane was
the close criterion and it was NOT discharged — D4/D5/D7 are exactly the headless-green/visually-broken class
the W15/W16 audits warned about and the AX tranche exists to close.

---

## D5 (blocker) — hover "totally broken + far too dramatic" — REGRESSION from the W15 REDRESS

**Root cause (source).** `src/components/custom/goo-blob/types.ts:300` `pointerStrength: 0.45` (was `0.11`)
and `src/components/custom/goo-blob/shaders/metaball.frag.ts:322` `smoothstep(0.65, 0.0, pointerDist)` (was
`smoothstep(0.4, 0.0, …)`). The W15 redress (`W15-blob-contained-droplet.json` `failure2_hoverFlickLeanInvisible`)
bumped BOTH to drive a **synthetic gate** — the `tests-visual/blob-render.spec.ts` centroid-shift floor of
`0.012` — modeling a `≈0.078–0.111` width shift, **6.5–9× the floor**. That is tuned-to-the-gate, not
tuned-to-the-eye: the redress reasoning is explicitly "could NOT run a real browser… modeled body-integrated
centroid shift ≈0.078 width (6.5× the floor)". A `0.45` strength over a `0.65`-radius falloff drags the WHOLE
contained body bodily toward the cursor — the live "far too dramatic" read. The redress also compounded the
gate-DRIVE fix (driving the flick over the wrapper box so it reaches + holds the listener), so on the live
surface the lean now BOTH reads strongly AND holds — doubly dramatic.

**Why headless missed it.** The gate asserts a MINIMUM shift (`≥ 0.012`); there is NO upper bound. A 9×-floor
lean passes the gate maximally while reading as broken to a human. The π-lane never ran to catch it.

**Covering wave?** NONE. W15 OWNS the interaction magnitudes (its FileBounds), and W16 explicitly touches NO
interaction magnitude. The redress that introduced the over-drive is the most recent edit. There is no AX wave
that re-tunes `pointerStrength`/the falloff to a tasteful live target — this needs a re-open of W15's
interaction-magnitude block with a **floor-AND-ceiling** gate (a centroid shift band, e.g. `0.012 ≤ Δ ≤ ~0.06`)
so the next tune cannot over-shoot.

**Gestalt fix direction.** Re-tune `pointerStrength` DOWN to a tasteful felt-lean (a calm bead leaning, not a
body lunging — empirically against the live π render, likely `~0.15–0.22`) and narrow the falloff back toward
`~0.45–0.5`; replace the one-sided centroid-shift floor with a **band assertion** (min for legibility, max for
restraint) in `blob-render.spec.ts` so the gate is no longer satisfiable by over-drive. The hover-mood arc
(`curious` on `pointerActive`) compounds the drama — see D7; the two are co-tuned.

---

## D7 (blocker) — `/substrates/blob-mood` "totally broken — none of the moods work" — LIBRARY WIRING CONFLICT

**Root cause (source, two-symbol).** The manual `setMood` the demo drives is clobbered EVERY FRAME by the
internal auto-mood arc:
- `demo/stories/substrates/blob-mood.vue:32-35` `setMood(m)` → `blobRef.value?.setMood(m)` → `GooBlob.vue:160`
  → `mood.setMood(m)` (`useBlobMood.ts:139`).
- `useMetaballRenderer.ts:366-372` calls `mood.update({ pointerActive, clicked, idleMs })` on **every
  unreduced frame**, and `mood.update` (`useBlobMood.ts:154-169`) is "the single internal caller of setMood"
  with a hard priority: `clicked → excited`, `pointerActive → curious`, `idleMs > 6000 → sleepy`, else
  **`idle`**. So one frame after the demo button sets `happy`, `update()` sees no pointer/click and snaps the
  mood back to `idle`. The manual choice survives `< 16 ms`.

The auto-mood arc and the imperative `setMood` expose are in **direct contention with no latch** — the
auto-arc unconditionally wins. The `blob-mood` story's entire raison d'être (a button row exercising every
mood) is dead on the live surface. `setMood` IS on `defineExpose` (`GooBlob.vue:160,178`), so this is NOT a
missing-expose bug — it is a precedence bug in the mood state machine.

**Why headless missed it.** No unit/headless gate drives the demo button + reads a mood-derived rendered
delta; `proof:blob-mood-resolved` is a static param-resolution check, not a runtime "manual setMood persists"
assertion.

**Covering wave?** NONE. The ledger anchor lists D7 as "blob-mood wiring (library or demo)" with no wave.
W16's quiescence work TOUCHED `useBlobMood` (added `isSettled`/`nextAutoMoodMs`) but did not address the
manual-vs-auto precedence. This is net-new.

**Gestalt fix direction.** Give `setMood` (the imperative/declarative manual path) a **hold latch** the
auto-arc respects — the same `excitedHoldMs` mechanism already in `useBlobMood.ts:131,157,161` generalized:
a manual `setMood` arms a `manualHoldMs` (or a `manualOverride` flag cleared on the next genuine interaction
signal) so `update()` does not retarget while a manual mood is held. This is ONE principled precedence rule
(manual > auto until interrupted), not a demo workaround. The `blob-mood` story then demonstrates moods
honestly. (Idiomatic: the latch already exists for `excited`; this is its generalization, not a new
mechanism.)

---

## D4 (major) — `/substrates/goo-blob` "too skeuomorphic — lighting/shading must be toned down" — W15 DEFAULT-IDENTITY OVERSHOOT

**Root cause (source).** W15 flipped the lit warm-glass identity ON by default and chose the lighting floors
to PASS a dome-luminance-variance gate, which is a FLOOR (`domeLumaStd ≥ 9`), so the tune had every incentive
to be loud:
- `types.ts:269` `lit: true`, `:262` `iridescence: 0.18`, `:265` `sssScale: 0.2`, `:267` `coreGlow: 0.1`,
  `:272` `specStrength: 0.9`, `:273` `specShininess: 32`, `:275` `rimStrength: 0.5`.
- The W15 mood retune (`useBlobMood.ts:63`) ALSO raised the `iridScale` sleepy FLOOR to `0.55` and the excited
  ceiling to `1.35` — so even idle/sleepy carry a perceptible sheen.

W15's audit reasoned the floors were "LOW and TASTEFUL"; the live observation says otherwise. This is the same
gate-vs-eye gap as D5: the gate floor `std ≥ 9` rewards a HIGHER variance, so the tune drifted loud, and the
π-lane visual-truth audit (the only thing that bounds it from above) never ran.

**Why headless missed it.** `domeLumaStd ≥ 9` has no ceiling; a garish dome (`std ~18+`) passes "better."

**Covering wave?** PARTIAL. The ledger anchors D4 to W09 (specular tune-to-subtle) and W15/W16. W09 is
COMPLETE but is the `--glass-specular-*` CSS cohort (Card/Dock chrome), **not** the blob's in-shader
Blinn-Phong/Fresnel/SSS — disjoint surface (W15 FileBounds explicitly cedes `--glass-specular-*` to W09 and
keeps the blob lit block). So no landed wave tones DOWN the blob's in-shader lighting. This is an
augment/re-open of W15's default-identity floors.

**Gestalt fix direction.** Lower the default lighting cohort toward a calm wet bead — `specStrength` and
`specShininess` down (a softer, wider glint), `iridescence`/`coreGlow` down toward a whisper, keep `lit:true`
(the identity is right; the AMOUNT is wrong). Crucially, convert the blob-render dome-variance assertion from
a one-sided FLOOR to a **band** (`9 ≤ std ≤ ~14`) so "more variance" stops being "more passing" — the same
floor-AND-ceiling correction D5 needs. Co-tune with the `iridScale` mood multiplier (`useBlobMood.ts:63`) so
no mood extreme re-loudens the toned-down default.

---

## D6 (major) — "consolidate the 3-4 blob pages to ONE" — CONFLICTS WITH W18'S RATIFIED DECISION

**Finding.** There are 4 substrate stories the user reads as blob pages: `demo/stories/substrates/goo-blob.vue`,
`blob-interaction.vue`, `blob-mood.vue`, `glass-material.vue` (the last is NOT a blob page — it is a glass-
surfaces matrix over an Aurora backdrop; the ledger mis-groups it). The user wants ONE blob page.

**Covering wave / conflict.** W18 (storybook IA reinvention, `AX.W18:42`) explicitly RATIFIES the OPPOSITE:
"Confirm aurora + the blob trio (`substrates/aurora`, `goo-blob`, `blob-interaction`, `blob-mood`) **STAY** in
Substrates — they are CORRECTLY filed; the §6.2 'misfiled?' suspicion is STALE (slice 15 F0; **no move**)."
W18 keeps the blob trio as THREE separate Substrate rows. D6 asks to collapse them to ONE. The ledger's dedup
anchor (W18, W40) is WRONG here — W18 as written DENIES the consolidation.

**Verdict.** needs-user-decision. Either (a) D6 is overruled (W18's three-row keep stands — the trio
demonstrates distinct axes: base look / interaction / mood), or (b) W18 is amended to a single
`substrates/goo-blob` story with internal sections (look · interaction · mood), which then drops two manifest
rows and re-homes their content. This is a one-line IA decision the orchestrator must ratify before either
W18 or a net-new consolidation wave proceeds; it cannot be resolved at source-audit level. (Note: D6 is also
entangled with W40 demo-shell, but W40 explicitly does NOT re-order the IA tree — it navigates W18's.)

---

## D8 (blocker) — `/substrates/glass-material` "totally broken" — OUT OF THE BLOB LANE

**Finding.** `glass-material.vue` is a glass-surfaces matrix (the five `.glass-*` rungs + `.glass-refract`/
`.glass-chromatic`/squircle folds) staged over a live `<Aurora :config="DEFAULT_AURORA_CONFIG">` backdrop
(`glass-material.vue:33`). The referenced CSS classes DO exist in shipped CSS (`glass.css`, `glass-refract.css`,
`glass-specular-track.css`, `dock.css` squircle) — so this is NOT a missing-class defect. The live "totally
broken" read is most plausibly the Aurora backdrop rendering black/broken (the W07 aurora-core-unblock surface,
which had live black-canvas history) leaving the glass plates with nothing to refract/specular against, OR a
glass-material rendering issue against that backdrop.

**Verdict.** Outside the blob lane — route to the **aurora/glass-material lane** (W07 aurora core + W20
glass-panel/glass-material prune). The ledger's grouping of glass-material under "blob pages" (D6) is a
mis-classification; D8 is a glass/aurora defect, audited there, not here. Flagged so the blob lane does not
absorb it.

---

## W36 / W42 / W43 — NO bearing on the blob defects

- **W36** (forced-colors / Windows-High-Contrast glass skin, band G) — maps to D10 (dark-mode contrast), a
  glass/token defect. Touches `utilities.css` forced-colors + glass-material rungs + StatusDot. **No blob
  surface.** Not in this lane's defect set.
- **W42** (`useLiquidMorph` / `--morph-t` unified morph substrate, band A · DOCK/SUBSTRATE) — a DOCK morph
  generalization (W01 is its first consumer); writes no `goo-blob/` source. **No blob bearing.**
- **W43** (fourier-field first-class, band B/E graphics-substrates) — a SIBLING graphics substrate (Canvas2D
  comet), shares only the "graphics substrate" category with the blob. Writes no `goo-blob/` source. **No blob
  defect coverage.**

None of the three is a regression risk to, or a fix vehicle for, D4/D5/D6/D7/D8.

---

## Summary disposition

| Defect | Owner reality | Verdict | Action |
|---|---|---|---|
| D5 hover too dramatic | W15-REDRESS regression (`pointerStrength 0.45` + falloff `0.65`, tuned-to-gate) | net-new (re-open W15 interaction block) | tone DOWN + floor-AND-ceiling gate band |
| D7 moods dead | library precedence bug (`update()` clobbers manual `setMood` every frame) | net-new | manual-hold latch (generalize `excitedHoldMs`) |
| D4 too skeuomorphic | W15 default-identity overshoot (lit floors tuned to a FLOOR gate) | augment-existing-wave (W15 default-identity) | lower lighting cohort + dome-variance BAND |
| D6 consolidate to one blob page | conflicts with W18's ratified "trio stays" | needs-user-decision | orchestrator ratifies IA shape before W18/net-new |
| D8 glass-material broken | aurora/glass surface, NOT blob | audit-note (route out of lane) | route to aurora/W20 lane |
| W36/W42/W43 | dock/forced-colors/fourier — non-blob | audit-note | no blob action |

**Cross-cutting gestalt:** D4 + D5 share ONE root pathology — both blob lighting AND blob interaction were
tuned to satisfy ONE-SIDED FLOOR gates (`domeLumaStd ≥ 9`, `centroidShift ≥ 0.012`) with no upper bound, so
the tune drifted loud, and the live π-lane (the only ceiling) never ran. The single highest-leverage fix is to
convert the `blob-render.spec.ts` assertions from floors to **bands** AND discharge the deferred live π-lane,
then re-tune both cohorts DOWN against the live render. D7 is a separate, clean library precedence fix. These
fold into ONE net-new "blob live-truth tune" wave (re-opening W15's identity + interaction blocks under
band-gates + the manual-mood latch) — NOT three; the existing W15/W16 are headless-GREEN-but-live-broken, so
the convergence wave is the live-verify discharge their `liveVerifyNeeded` clauses always required.
