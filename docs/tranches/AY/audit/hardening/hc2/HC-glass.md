# HC-glass — W-GLASS capture-arm check + C6/C7 HEAD confirmation (hc2, phase Verify)

**Date** 2026-06-09 · **Lane** HC-glass · **Inputs** NECESSITY-MATRIX §2 W-GLASS rows + §5,
`research-necessity/glass-material.md` §4.2–4.4, `waves/AY.W-GLASS.md`,
`audit/visual/W-GLASS-DELTA.md` — all read in full; every claim below re-verified live at the
working tree (Batch-2 HEAD). Verdict: **GAPS-FOUND** (the matrix's overstatement claim is
CONFIRMED; C6 + C7 both confirmed OPEN at HEAD; one new R6-class finding on the π claim; one
opposite-direction PROGRESS staleness).

---

## 1. The capture-arm claim — VERIFIED (the matrix is right)

**The 8 referenced PNGs do not exist — anywhere.** `find <repo> -name "W-GLASS*.png"`
(node_modules excluded) returns **zero** matches; `docs/tranches/AY/audit/visual/` holds only
`W-GLASS-DELTA.md` (7,656 B, Jun 9 13:30) amid 100+ sibling PNGs from other waves. The DELTA's
closing verdict — `W-GLASS-DELTA.md:114` "Verdict: **PASS.** W-GLASS is live-verified" —
**overstates against the wave's own HARD GATE clause 3** (`AY.W-GLASS.md:511-517`, which
explicitly marks clause 3 "the ONE OPEN ARM … Clause-3 is NOT GREEN on the prose alone"). The
wave spec is honest; the DELTA prose is the inflation. This is the cardinal-lesson class
(`feedback_live_verify_capture`): a prose "live-verified" with no captured frame.

## 2. The owed captures — exact enumeration (8 PNGs, 3 capture moves)

Filenames as the DELTA references them (`W-GLASS-DELTA.md:35-42, 59-60, 88-89`; spec
`AY.W-GLASS.md:409-414`):

| # | Filename | What it must show |
|---|---|---|
| 1–2 | `W-GLASS-idle-tracks-before-{light,dark}.png` | Demo mounted with glass `<Button>` + Card-default + dock controls, NO pointer interaction, keyframes.js runtime active specular-track count reading **19** (pre-E4 state — reconstruct by reverting the `glass.css:175-193` scope, or record the BEFORE as the cited I.W6 measurement with honest provenance per `AY.W-GLASS.md:421-425`) |
| 3–4 | `W-GLASS-idle-tracks-after-{light,dark}.png` | Same surfaces, same no-interaction state at HEAD, count reading **0** (the specular opt-in evidence — this pair IS the "specular opt-in" capture) |
| 5–6 | `W-GLASS-drawer-glass-{light,dark}.png` | `.glass-drawer` over the busy-backdrop fixture painting a real overlay-tier `backdrop-filter` blur (backdrop bleeding through), i.e. the D1 flatten-at-level:0 surface in its glass state |
| 7–8 | `W-GLASS-notification-floating-{light,dark}.png` | Notification on `glass-floating` over the backdrop |

The Drawer/Slider/Notification **level:0 flatten** is owed as the π-spec run (clause 2's
binding half — see §3 caveat), not as additional PNGs; the spec's capture list is the 8 above.

**Capture-protocol nuances (flag for the capture run):**
- The named set carries NO viewport axis — every sibling DELTA set uses
  `-{desktop,mobile}-{light,dark}` (e.g. W-DOCK1, W-CON2). The ledger's own-surface clause
  (`proof-live-verified-ledger.mjs:125-145`) passes on a bare light/dark pair, but the protocol
  floor prose (`:24`) says ≥2 viewports × {light,dark}; capture at both viewports and either
  extend the filename set or reconcile the DELTA's references (the spec's own reconcile step,
  `AY.W-GLASS.md:415-417`).
- The own-surface regex is `^W-GLASS-` — the named files satisfy it; real IHDR dimensions
  matter once chronic-R1 lands (no renamed-desktop counterfeits).

## 3. `proof:glass-cohesion` at HEAD — GREEN, with one scope caveat

Ran live this audit: **GREEN, 19/19 checks across 9 arms** (inventory 2/2 over 45 surfaces,
drawer 4/4, slider 4/4, notification 2/2, specular 3/3, dock-shell-exempt 1/1, clean-break 1/1
incl. `proof:glass-one-model` key REMOVED — `grep package.json` shows only
`proof:glass-cohesion` at `package.json:675`, render 1/1, self-proof 1/1). Persisted artifact
`.cache/gates/AY-glass-cohesion.json` status `pass`, and it HONESTLY self-scopes: "SOURCE arm
only — the painted … blur + the level:0 flatten … is proven by
tests-visual/glass-cohesion.spec.ts (the π arm), never this gate alone".

**Caveat (NEW finding, R6-class):** the gate's render arm is `pi-readback-spec-exists` — a
file-existence check ONLY. The binding π run (`tests-visual/glass-cohesion.spec.ts`, exists,
206 lines) has **no persisted pass artifact anywhere** — no `test-results/`, no
`playwright-report/`, no π entry in `.cache/gates/`. The DELTA's "8/8 π … GREEN" claim
(`W-GLASS-DELTA.md:118-119`) is therefore ALSO an unpersisted prose claim — the exact
GREEN-on-real-surface gap chronic-R6 names. The capture run should persist the π PASS (named
in the DELTA) alongside the PNGs.

## 4. The ledger mechanism is not defeated — but PROGRESS is stale the OTHER way

`proof-live-verified-ledger.mjs:9-10` only REDs a PROGRESS row whose STATUS cell **is**
`live-verified`. `PROGRESS.md:60` reads W-GLASS as **"planned"** — so the DELTA's prose-only
"live-verified" is invisible to the gate (correctly: had the row been flipped today, the gate
would RED with "references 8 .png but none exist as a real on-disk PNG", `:164-174`). Two
divergences to fix at the restamp (chronic-R7):
1. **DELTA overstates** — strike/requalify `W-GLASS-DELTA.md:114` until the PNGs land.
2. **PROGRESS understates** — the row says "planned" while the wave spec records
   DEV-COMPLETE-source (gate GREEN + landed E1–E9). Flip to `dev-complete` (NOT
   `live-verified`) with the open-capture note.

## 5. C6 — per-rung AA calibration: CONFIRMED OPEN at HEAD

- `tokens.css:929` — `--glass-tint-strength-aa: 18%` is the ONE value across rungs whose base
  alphas span 0.30→0.95; **zero** per-rung `--glass-tint-strength-aa-<rung>` tokens exist
  (`grep -rn "glass-tint-strength-aa-" src/styles/` → 0).
- `tests-visual/adaptive-glass.spec.ts:242` — `const KINDS = ["glass-card", "glass-resting",
  "glass-dock"]`: wash + quiet (and floating/overlay) are UNMEASURED over synthetic white.
- The W55 bright-bucket blocks that lift the strength DO reach those rungs
  (`glass.css:371,396`; `dock/morph.css:219,238`) — so the unmeasured wash/quiet bucket path is
  a real shipped-but-untested AA surface. The matrix's prescription stands: extend `KINDS` to
  all five rungs; derive per-rung values only if 18% misses (the spec's oklab→WCAG plumbing at
  `:48-150` is sufficient — no research).

## 6. C7 — a11y cascade-guard: CONFIRMED OPEN at HEAD

- The brackets set `--glass-level` on `:root` ONLY: `glass.css:919-925`
  (`prefers-reduced-transparency: reduce` → 0), `:940-945` (`prefers-contrast: more` → 0.3 +
  the tint re-points), `:969-973` (`forced-colors: active` → 0).
- `@property --glass-level` is `inherits: true` (`tokens.css:2260-2264`); the consumption
  sites read `var(--glass-level)` RAW — blur radii `tokens.css:736-764`, bg alphas `:806-817` —
  **no `min()` guard, no non-inheriting floor token anywhere**.
- CLAUDE.md documents the ancestor-override as a FEATURE ("a host sets `--glass-level` on any
  ancestor to retune every descendant"), so a consumer ancestor declaration silently shadows
  the `:root` floor for its subtree under reduce/contrast-more — nearest-ancestor wins for
  inherited custom properties.
- **No guard assert exists:** `proof-glass-level.mjs:74-81` only source-asserts the brackets
  EXIST (`:root{--glass-level:0}` regexes); neither it nor the π specs carry the synthetic
  defeat arm (ancestor `--glass-level:1.5` + emulated reduce → surface must still flatten).
- Nuances: (a) forced-colors has a partial platform backstop — the WHC skin paints
  `background: Canvas` level-independently and the platform strips `backdrop-filter` — so the
  live defeat vector is reduce-transparency + contrast-more; (b) the contrast-more TINT legs
  (`--glass-tint-source/strength` on `:root`, same bracket) share the identical
  inherited-token defeat shape and should ride the same guard.
- Fix shapes stand as written (CH-glass-material action 4): non-inheriting floor token the
  recipes `min()` against, or bracket-scoped re-set on the material group, + the synthetic
  assert. Engineering only — no research.

## 7. Adjacent matrix-row spot-confirms (one-liners)

- `--glass-backdrop-luma` mint-only state CONFIRMED: `tokens.css:905` (prose) + `:927` (empty
  mint); zero consumers in `src/` or `demo/` — the RETIRE-or-RESERVE disposition (matrix §2
  W-GLASS row 5) stands.
- The honest open-arm record in the wave spec (`AY.W-GLASS.md §"Open arm"` :397-425) is
  accurate at HEAD line-for-line — no spec edit needed there; the defects are in the DELTA
  prose + the PROGRESS row + the missing pixels.

## Verdict

**GAPS-FOUND.** The matrix's W-GLASS row is accurate: source DONE + source-gate GREEN, the
capture arm is the binding open artefact (8 PNGs + a persisted π PASS), the DELTA's
"live-verified" must be requalified, the PROGRESS row restamped `dev-complete`, and C6/C7 are
both real, open, file:line-confirmed engineering items (no research).
