# A-glass-material-demo — `/substrates/glass-material` STILL broken post-W52 (P9 re-confirm)

**Lane** A-glass-material-demo (convergence-2) · **Defect** P9 (USER-DEFECTS pass-2:54 — *"/substrates/glass-material is broken [D8/W48 — re-confirmed]"*) · **Severity** major · **Verdict** augment-existing-wave (**W48**) — W48 is the right owner, UNCHANGED in intent post-W52, but its plan needs ONE narration-reality reconcile fold. NOT net-new. NOT already-fixed.

---

## TL;DR

P9 is **re-confirmed broken at HEAD `b919137`**. The demo `demo/stories/substrates/glass-material.vue` is **byte-identical to its AW `8554e33` authoring** — `git log -- demo/stories/substrates/glass-material.vue` shows ONLY that one commit; it was **never rewired through the entire AX tranche, INCLUDING W52** (the liquid-glass overhaul). W52 re-authored the LIBRARY grammar (`glass.css`/`tokens.css`) and explicitly **does not touch the demo** (`grep glass-material.vue docs/.../AX.W52*.md` → NONE; W52's FileBounds excludes `demo/`). W48 (the glass-material demo reauthor) is **`planned`, NOT landed**: no `scripts/proof-glass-material-demo.mjs`, no `proof:glass-material-demo` in `package.json`, no `tests-visual/glass-material-demo.spec.ts`. All four D8 RED witnesses are live at HEAD.

The W48 plan's diagnosis remains correct and its dependency (W09 seam + tokens) is satisfied — but it was written PRE-W52 against the central-disc recipe. W52 changed the geometry (central disc → bounded gleam) and blend (`screen` → `plus-lighter`) UNDER the seam, NOT the seam contract itself. So **W48 binds the SAME seam and is still valid**, but its narration/blurb prescriptions must be reconciled to the W52 reality (the bounded gleam, `--glass-specular-size`, plus-lighter) so the reauthored demo documents what the library now paints, not the retired disc.

---

## Source-level re-confirmation (the four D8 RED witnesses, live at HEAD `b919137`)

The demo file at `demo/stories/substrates/glass-material.vue` is the broken AW version verbatim:

- **RW1 — the moving-specular seam is NEVER composed (the headline; the story reads as dead plates).**
  `grep -E "useSpecularTracking|mouse-x|onPointerMove|pointermove|specularStyle" demo/stories/substrates/glass-material.vue` → **NONE**. The SFC `<script setup>` (`:1-28`) imports only `Aurora`/`DEFAULT_AURORA_CONFIG` + the story chassis; it composes no `useSpecularTracking` and binds no `@pointermove`/`:style` specular write on any plate. With `--glass-specular-intensity-rest: 0` (W09 dormancy, still in place — `tokens.css`), the `::before` `opacity` is `0` at rest, so a static frame reads as flat dead plates. **RED.**

- **RW2 — the adaptive-tint plate is DEAD (a concrete wiring bug).** `glass-material.vue:124-126` sets only
  `--glass-tint-source` inline; it NEVER sets `--glass-tint-strength`. `grep glass-tint-strength demo/...` → **NONE**. The token default is `--glass-tint-strength: 0%` (`tokens.css:816`); the rung background is `color-mix(in oklab, <bg>, var(--glass-tint-source) var(--glass-tint-strength))` (`glass.css:220` et al.), so at `0%` strength the mix is a no-op and clicking "aurora rose"/"aurora teal" changes nothing. **RED.**

- **RW3 — `glass-btn` is ABUSED into a wide bar (3 sites).** `glass-material.vue:93` `class="glass-btn !h-12 !w-44 …"` (the squircle bar) and `:114` `class="glass-btn px-3 text-xs"` (the tint-sample buttons). `.glass-btn` is a `display:flex` circular icon button fixed at `--size-icon-btn` (2.5rem), `border-radius: var(--radius-pill)`; coercing it wide with two `!important` overrides reads as a misshapen control. The idiomatic `<Button variant="glass">` exists and was even STRENGTHENED by W52 (`.btn-glass` re-points the backdrop onto `--glass-blur-btn`, the real 10px quiet-tier blur — `button/index.ts:57-61`), so the replacement is shipped and better than at D8 time. **RED.**

- **RW4 — the subtle rim has NO contrast device.** The headline blurb (`:40`) claims "the `--glass-edge-light` rim" but stages no rim-on/rim-off or dark-plate device. `--glass-edge-light` is a deliberately sub-perceptual 0.75px 18%-α white inset ring (W09/W52 both ratify it SOTA-correct), so without a device the claim is unverifiable on screen. **RED.**

All four bite. The existing LIBRARY gates (`proof:glass-material-unified`, `proof:glass-material-sota`, and now `proof:liquid-glass-material`) assert the `glass.css`/`tokens.css` RECIPE and pass GREEN over this broken demo — they never scan `glass-material.vue`. That is the standing witness that "a sound library grammar and a demo that fails to bind it both pass the current gates."

---

## What W52 changed UNDER the demo (the post-W52 reconcile, the lane's headline finding)

W52 **landed** (`proof-liquid-glass-material.mjs` present; `--glass-specular-size: 36%` minted at `tokens.css:836`; `mix-blend-mode: plus-lighter` at `glass.css:142`; cohort hover/active reduced). It re-authored the `.glass-material::before` recipe — but the **seam contract W48 binds is UNCHANGED**:

- The host write seam is still `useSpecularTracking` → `--mouse-x`/`--mouse-y` (`useSpecularTracking.ts:58-61`).
- The CSS still maps `--specular-x: var(--mouse-x, 50%)` / `--specular-y: var(--mouse-y, 50%)` (`glass.css:101-102`).
- The W52-reauthored gleam READS those exact channels: `circle var(--glass-specular-size, 36%) at var(--specular-x) var(--specular-y)` (`glass.css:121`).
- `Card.vue:81` is the canonical consumer of this seam (`const { specularStyle, onPointerMove } = useSpecularTracking()`) — the exact pattern the demo must mirror.

So W52 changed the GEOMETRY (disc→gleam) + BLEND (screen→plus-lighter) the gleam paints, NOT the wiring the demo composes. **W48's four fixes are all still correct and binding.** The ONE consequence for W48's PLAN: it was written against the central-disc recipe (its §SOTA/blurb language predates W52), so a handful of W48's narration prescriptions must be reconciled to the W52 reality:

1. **The demo blurb must narrate the BOUNDED gleam, not the central catch-light.** The HEAD blurb (`:40`) says "pointer-anchored catch-light (`::before`)" — still broadly true (the gleam IS pointer-anchored), but the reauthor should describe it as a *thin bounded edge gleam* (the W52 identity), and the `--glass-specular-size` knob (36%, the gestalt bound) should be the demo's narrated magnitude. The reauthored story is the natural showcase for W52's bounded-gleam win — pair the two so the demo DEMONSTRATES the central-disc→gleam transposition, not just "a catch-light."
2. **The reduced cohort is the new truth.** Hover lifts intensity to ≤0.10 (was 0.22) — the demo's live hover specular is now a WHISPER, which makes the moving-specular seam (RW1) even more essential to compose (a static frame is fully dormant; the gleam only reads on actual pointer-move). The W48 π live-arm assertion ("the catch-light MOVES with the pointer") still holds and is the right falsifier.
3. **Tint ceiling is `≤30%` (unchanged) — W48's RW2 fix (`--glass-tint-strength` non-zero ≤30%) is correct as written** against `glass.css:215`'s ceiling comment.

This is a PLAN reconcile, not a new defect — W48's four FileBounds edits, its born-RED witnesses, its `proof:glass-material-demo` gate, and its `tests-visual/` π arm are all still the right shape. W48 just needs a one-paragraph note that the demo now stages the W52 bounded-gleam (consume `--glass-specular-size`, narrate plus-lighter), and a charter line bump (it was charter'd against D8; it now ALSO discharges P9 pass-2 and showcases W52's material identity).

---

## DEDUP — why W48 (augment), not net-new, not already-fixed

- **W48 (glass-material demo reauthor) is the EXACT owner.** Its FileBounds is `demo/stories/substrates/glass-material.vue` + `scripts/proof-glass-material-demo.mjs` + `tests-visual/glass-material-demo.spec.ts` + `package.json` + the audit json. Its four RED witnesses ARE D8's four, which ARE the four still-live at HEAD. P9 is literally "[D8/W48 — re-confirmed]" in the pass-2 ledger. **No new wave.** The lane's job is to confirm W48 still owns it post-W52 and surface the narration reconcile.
- **NOT already-fixed.** W48 is `planned`; the demo is unchanged AW-vintage; zero of the four fixes are present.
- **vs W52 (liquid-glass overhaul) — file-disjoint, W52 is the LIBRARY cause-side, settled.** W52 owns `glass.css`/`tokens.css`/`utilities.css`/`button/index.ts`/`Card.vue` (the grammar); it touches no `demo/`. W52 is the reason the demo's narration must be reconciled, but it does not OWN the demo repair. (W52 is the post-W48-dependsOn-W09 supersession — W48's `dependsOn AX.W09` is satisfied transitively: W09's seam + tokens are settled, and W52 re-baselined them DOWN without breaking the seam W48 binds.)
- **vs W18 (storybook IA) — sequencing note only, unchanged.** W18 moves/renames the SFC row, never edits its body. W48 rewrites the body. The W48 plan already records the SEQUENCE-AFTER-W18 (don't race the same file). No change.
- **vs W20/W25b/W40 — all leave the demo body untouched** (re-point others onto it, file-rename, demo-shell). The D8 cross-reference table holds verbatim post-W52. No change.

---

## Gestalt fix direction (the W48 reauthor, reconciled to W52)

Reauthor `glass-material.vue` to BIND the shipped seams (zero library edits), now DEMONSTRATING the W52 bounded-gleam identity:

1. **RW1** — compose `useSpecularTracking()` in `<script setup>` (`import { useSpecularTracking, Button } from "../../../src/index"`); bind `:style="specularStyle" @pointermove="onPointerMove"` on each headline rung/card plate. Mirror `Card.vue:81`'s pattern. The gleam (now bounded at `--glass-specular-size`, plus-lighter) reads as a tracked edge glint on hover — narrate it as such.
2. **RW2** — the tint control sets BOTH `--glass-tint-source` AND a non-zero `--glass-tint-strength` (≤30% house ceiling); "none (warm-white)" resolves strength `0%`, the aurora samples a non-zero strength so the `color-mix(in oklab, …)` bites.
3. **RW3** — drop all three `glass-btn` abuses: show the squircle fold on `.glass-card`; replace the tint-sample buttons + the squircle "button" with `<Button variant="glass">` (the W52-strengthened real glass button).
4. **RW4** — stage a rim-on/rim-off (or dark-plate) side-by-side so the 0.75px 18%-α `--glass-edge-light` ring is legible AS a deliberate-subtle feature.
5. **NEW (post-W52 reconcile)** — narrate the W52 identity: the blurb describes a *bounded* (`--glass-specular-size: 36%`) pointer-anchored edge gleam (plus-lighter), not a central catch-light; this demo becomes the canonical showcase for W52's central-disc→gleam transposition. P10 (no-superfluity) applies — keep the explanatory text terse, cut duplicative code-narration.

Author `scripts/proof-glass-material-demo.mjs` (the four source-structure assertions: seam composed+bound; non-zero `--glass-tint-strength` companion; ZERO `glass-btn` + ≥1 `<Button variant="glass">`; rim contrast device) + `tests-visual/glass-material-demo.spec.ts` (the π live arm: `--mouse-x` write tracks the pointer; tint click measurably shifts the plate bg). Close on the LIVE π audit, not the source gate alone (the AX cardinal lesson — a green source gate over dead plates is the exact AW failure class).

---

## Severity & dedupe note

- **Severity:** major (user-reported "broken", re-confirmed; the flagship glass-material showcase reads as dead plates — but it is a demo story, not a shipped library/consumer defect, so major not blocker).
- **Dedupe:** **augment-existing-wave → W48.** W48 owns this exactly; it is `planned`, not landed; its four RED witnesses are all live at HEAD post-W52. The only delta this lane adds: W48's plan must reconcile its narration to the W52 bounded-gleam reality (consume `--glass-specular-size`, narrate plus-lighter, the demo as the W52 showcase) and bump its charter to ALSO discharge P9 pass-2. W48's FileBounds, gates, and π arm are unchanged. No net-new wave; do not duplicate the prescription elsewhere.
