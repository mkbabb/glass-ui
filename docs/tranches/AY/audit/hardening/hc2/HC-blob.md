# HC-blob — W-BLOB3 as-built re-ground + the W-BLOB2 RG-debt check (hc2)

**Lane** HC-blob (phase Reground) · **Date** 2026-06-09 · **Tree** `at-dock-convergence`
(Batch-2 complete at HEAD) · **Verdict** GAPS-FOUND — the headline VERIFIES (the DI strip is
landed + gate-proven; the lean series is READABLE this time, the B2-blob F2 class is closed;
mobile shots are genuine 375×667), but the orchestrator-authored DELTA omits both spec-mandated
numbers (the paired-π centroid shift + the frame budget), carries one false claim (the "no twin"
line), the allowlist edit-site never landed, and — the new HIGH finding — a **foreign vite server
squatting :5173 had poisoned four blob π-gate artefacts to `fail` at HEAD** while the DELTA
claimed the fleet green. All four re-run GREEN on the real surface (`GLASS_UI_DEMO_PORT=5180`);
artefacts restored to PASS by this lane.

---

## §1 — What VERIFIES (re-ground confirmations)

1. **The DI strip is AS-BUILT and gate-proven.** `npm run proof:blob3-strip` → PASS (re-run this
   lane, exit 0; artefact `.cache/gates/AY-blob3-strip.json`, facts: `seamHits: []`,
   `importsColorLeaf`, `resolveColorRePointed`, type/default/FourierField survive; self-test
   bites OK). Deletion-witness grep over `src/components/custom/goo-blob/` → 0 code hits
   (only `RESEARCH.md` prose, which narrates history). The renderer imports the `/color` leaf at
   `useMetaballRenderer.ts:8` and `resolveColor` inlines `oklchToGammaRgb(cssToOklch(css))` at
   `useMetaballRenderer.ts:162-168` (memo cache intact). 692 lines (>500 — W-GOD1 still open,
   eased from 707). `docs/consumer-evidence/goo-blob.md` exists (G2). `dist/goo-blob.d.ts` has
   0 `ColorResolver` refs. The W-BLOB3 spec's own §0 RG and the research-necessity blob lane §2
   already recorded the strip-first ordering inversion — consistent.

2. **The 14 interaction PNGs are REAL and the lean is READABLE — the B2-blob F2 failure mode is
   CLOSED.** Viewed all 5 hover frames + rest + click:
   - `W-BLOB3-goo-blob-desktop-light.png` — resting teardrop (cream/tan bead, the W-BLOB2 default);
   - `hover-frame1` — strong volume-preserving horizontal SQUASH (flat oval, unmistakable vs rest);
   - `hover-frame2`/`frame3` — a clear rightward PSEUDOPOD reach + visible centroid shift toward
     the pointer (the "creature notices you" register, legible frame-to-frame);
   - `frame4`/`frame5` — plateau at the settled pseudopod (near-identical to frame3; the legible
     arc is frames 1→3 — see §3.7);
   - `click-bounce` — a clearly deformed kidney/bean impulse shape, `clicks: 1` visible in the UI.
   All 14 byte-distinct (md5s). **IHDR-verified dimensions:** the four `mobile` shots are genuine
   **375×667** (not renamed 1280-desktop shots — the Class-E fabrication vector is clean here;
   contrast W-CON1's 1280×721 "mobile" debt). Desktop shots 1280×800.

3. **The cardinal ledger is GREEN over the row.** `npm run proof:live-verified-ledger`
   (`--tranche=AY`) → 0 violations, 48 rows, W-BLOB3 among the 9 `live-verified`; self-test bites
   OK. `PROGRESS.md:69` (W-BLOB3 row) matches the on-disk DELTA + PNGs. BUT see §3.4 — the row is
   held only at the WEAK bar because the allowlist edit never landed.

4. **G4's gate half is GREEN.** `npm run proof:offscreen-pause` → PASS (blob arm: F1
   content-visibility park ✓, F4 tab-hidden ✓, IO off-screen ✓, G1 PRM lift re-monitored ✓).

5. **RG2/RG3 are honestly routed.** The W-BLOB3-DELTA Residue section states the mood re-captures
   remain OWED on the W-BLOB2 row; `PROGRESS.md:68` carries the RG-note inline. Confirmed
   visually: `W-BLOB3-blob-mood-desktop-light.png` is the **RED seed register**
   (`blob.vue:32,:67` `oklch(0.62 0.19 25)` unfixed), not the RG3 cream-default closure. Routing
   CORRECT (W-BLOB2 RG / the W-COHERE E1 seed move).

---

## §2 — F1 (NEW, HIGH): port-squat false-RED — four blob π-gate artefacts said `fail` at HEAD while the DELTA claimed the fleet green

At lane start, the PERSISTED gate artefacts read:
`AY-blob-warm-default.json` **fail** · `AX-blob-render.json` **fail** ·
`AX-blob-live-truth.json` **fail** · `AX-blob-integration.json` **fail** (all timestamped
17:58–18:01 today; every violation `TimeoutError: locator.waitFor: Timeout 20000ms exceeded`).
The W-BLOB3-DELTA's Arm-1 claim "The `proof:blob-*` fleet stays green (the no-regression arm)"
was contradicted by the on-disk artefacts at HEAD — the exact Class-G prose-GREEN/artefact-RED
divergence.

**Root cause (diagnosed live):** `/substrates/blob` on `http://localhost:5173` renders a foreign
404 ("Back to all dashboards") — the listener on :5173 is **`sci-report/usf/web`'s vite** (PID
43028, `vite --port 5173 --strictPort --host`), NOT the glass-ui demo.
`tests-visual/playwright.config.ts:92` (`reuseExistingServer: !process.env.CI`) attached every π
gate to the foreign app; the `goo-blob-canvas` locator never appears; every live spec times out.
The config has **no app-identity assertion** — any foreign vite on :5173 silently poisons the
whole live π fleet into timeout-REDs.

**Resolution (this lane):** re-ran all four with `GLASS_UI_DEMO_PORT=5180` (the config's own env
seam, `playwright.config.ts:22`) so Playwright booted the REAL demo:
- `proof:blob-warm-default` → **PASS 2/2** (cream body ≥0.62 both schemes)
- `proof:blob-render` → **PASS 3/3** (incl. the LEAN test — the CENTROID_SHIFT band owner)
- `proof:blob-live-truth` → **PASS** (arms A/B ✓, π runtime 4/0)
- `proof:blob-integration` → **PASS 3/3**
All four `.cache/gates/*.json` artefacts now read `pass`. **The blob fleet is genuinely green at
HEAD; the REDs were environmental.**

**Divined mechanism (route: W-CARDINAL-INFRA extension / the trends-lane R6 clause; NOT landed —
implementation halted):** the webServer reuse needs an identity probe before attach (a
glass-ui-demo sentinel — e.g. assert the manifest title or a `meta[name=glass-ui-demo]` marker —
else fail-closed and boot on a free port). Companion: the R6 "GREEN-on-real-surface" clause should
read the PERSISTED artefact status, not the prose claim — these four sat `fail` on disk under a
`live-verified` row and nothing flagged it.

---

## §3 — W-BLOB3-DELTA accuracy grading + remaining gaps

The DELTA (`docs/tranches/AY/audit/visual/W-BLOB3-DELTA.md`) is MOSTLY accurate — the strip
claims verify (§1.1), the 14-PNG inventory is exact, the protocol line is true (1280 + real 375
× {light,dark}), and the Residue section is honest on RG2/RG3. Four defects:

1. **(MEDIUM) The G3 paired-π numbers are MISSING.** Spec `AY.W-BLOB3.md:88,:155` requires the
   DELTA record "the paired centroid SHIFT (`restCx` → `leanCx`) INSIDE [MIN..MAX] … with the
   resting body inside the W-BLOB2 cream band." The capture spec EMITS exactly these
   (`blob3-interaction-capture.spec.ts:252-255` — `[W-BLOB3-π] restCx=… leanCx=… shift=…
   restBodyL=…`) and ASSERTS them in-run (`:259-276`: shift ∈ [0.012, 0.07], restL ≥ 0.62), but
   the DELTA records NO number — the lane agent died before harvesting the console line and the
   orchestrator wrote the doc without re-running. **Owed:** one re-run of the capture spec, paste
   the four `[W-BLOB3-π]` lines into the DELTA.
2. **(MEDIUM) The "no twin" claim is FALSE.** DELTA: "the binding numeric band is owned by
   `tests-visual/blob-render.spec.ts` … this capture does not re-assert it; one measurement path,
   no twin." In fact `blob3-interaction-capture.spec.ts:269,:273` hardcodes `0.012`/`0.07` —
   literal TWINS of `CENTROID_SHIFT_MIN`/`MAX` (`blob-render.spec.ts:149-150`). Operationally good
   (the capture is self-checking); textually a doc↔code lie + a drift hazard (re-tune the band in
   one file and the other silently diverges). Fix at next touch: import/share the constants or
   correct the DELTA sentence.
3. **(MEDIUM) The G4 frame-budget NUMBER is absent and the debt is HIDDEN.** Spec
   `AY.W-BLOB3.md:89,:157-158`: the DELTA "records the measured interaction-hero per-frame budget
   … NOT a prose 'performant'." The DELTA contains no frame-cost number, never names
   `proof:offscreen-pause`, and its Residue section ("recorded, not hidden") omits this debt —
   this one IS hidden. The gate half is GREEN (§1.4); the captured-number half is OWED on the
   W-BLOB3 row.
4. **(MEDIUM) `VISUAL-ALLOWLIST.json` lacks `"W-BLOB3"`** — spec edit-site 15
   (`AY.W-BLOB3.md:136`) mandated the add; the file holds `[W-DOCK1, W-CON1, W-DOCK2, W-BLOB2]`.
   Consequence (read from `proof-live-verified-ledger.mjs:203-218`): the W-BLOB3 row passes only
   the WEAK `live-verified` bar (any referenced real PNG); the DEEPENED own-surface bar
   (`^W-BLOB3-` + ≥2 viewports × {light,dark}) does not BIND the row — a future PNG cull would
   not RED at the depth G3 designed. The PNGs currently satisfy the deeper bar, so the one-line
   add flips enforcement on at zero cost.
5. **(LOW) The mood arm deviates from the spec letter, honestly.** Edit-site 14
   (`AY.W-BLOB3.md:134`) asked the blob-mood quad to show "the resting cream default"; the
   captured quad is the red seed register (the demo's mood seed default IS red —
   `blob.vue:32,:67`). The DELTA flags it as residue routed to W-BLOB2 RG3 — correct routing, but
   the W-BLOB3 spec row should be re-grounded so G3's mood-cream clause formally transfers to
   W-BLOB2 RG3 + W-COHERE E1 (the seed move) rather than dangling unmet.
6. **(LOW) Loose prose:** "rAF-sampled" — the series is timeout-sampled at a 45 ms cadence after
   an 8-step real pointer travel (`blob3-interaction-capture.spec.ts:205-213,:146-160`); and the
   spec's named routes `/substrates/goo-blob` + `/substrates/blob-mood` are not routes — the real
   surface is `/substrates/blob` with two heroes (filenames encode the hero names; the DELTA's
   "/substrates/blob" is the accurate one).
7. **(NIT) The lean series plateaus at frames 3–5** (near-identical settled pseudopod); the
   legible motion lives in frames 1→3. The B2-F2 bar (readable lean) is MET; a future re-capture
   could sample earlier in the travel for a fuller 5-frame arc.

---

## §4 — The W-BLOB2 RG debts: still owed, routing check

| Debt | Still owed at HEAD? | Routed where | Routing correct? |
|---|---|---|---|
| **RG2** mood lean re-capture (demonstrative series + per-frame offset numbers) | YES — no readable-lean mood series exists (`W-BLOB2-blob-mood-hover-frame{1..5}` static red; W-BLOB3's series is the goo-blob hero, not the mood hero) | W-BLOB2 row (`PROGRESS.md:68` RG-note) ; W-BLOB3-DELTA residue concurs | ✓ |
| **RG3** mood cream-default resting frame | YES — mood quad captured RED (seed `blob.vue:32,:67`) | W-BLOB2 RG + W-COHERE E1 (the seed move to the warm-red desaturated register) | ✓ (add the formal G3-clause transfer per §3.5) |
| **RG4** stale source comments | YES — `types.ts:260-261` still reads "~0.87 light / ~0.83 dark"; `types.ts:292` still reads "(L≈0.86) … sits 0.31 away" vs the authoritative 0.814/0.775, L≈0.81, 0.26 | W-BLOB2 RG batch (comment-only edit; blocked by the implementation halt) | ✓ — NOTE the matrix/lane cite says `:293`; the actual line is **292** |
| **RG6** gel-bead stunning-bar tune | YES — `types.ts:298-307` unchanged (`specStrength 0.16`, `specShininess 20`, `iridescence 0.09`, `sssScale 0.1`, `coreGlow 0.06`) | Named-successor **W-BLOB-TUNE** coordinated with W-COHERE E1 ("serialize W-BLOB-TUNE before W-COHERE, or fold the two into one blob-register pass") | ✓ with a CAVEAT: **no `AY.W-BLOB-TUNE.md` spec exists** — the fold-into-W-COHERE escape is the live default; the orchestrator must RECORD which branch at W-COHERE dispatch, else the gel tune re-enters as prose (Class-F) |
| README stale stop literal | YES — `README.md` (~:183-185) still documents `["#cbad99","#ebcc99","#f3f1ce"]` vs shipped `types.ts:267` `["#b5947f","#d4b27d","#dad6b1"]` | W-DOC1-adjacent (matrix §2) | ✓ |
| W-COHERE D2 sticker shadow | YES — all THREE sites unfixed: `GooBlob.vue:225` (rest `5px 5px 2.5px`), `:233` (hover `7px 7px 3px`), `:255` (PRM `!important` re-pin) | W-COHERE E2 | ✓ |

---

## §5 — Disposition

- The W-BLOB3 **headline survives re-ground**: strip landed + bites, interaction READABLE +
  device-honest, ledger GREEN, fleet GREEN on the real surface. The wave's remaining debt is
  exactly two numbers (the `[W-BLOB3-π]` console line + the frame-budget reading) + one allowlist
  line + two DELTA sentence fixes — all doc/capture work, no source.
- The **port-squat finding (F1) generalizes beyond the blob**: any live π gate run while a
  foreign vite holds :5173 persists a false `fail` (or, with matching selectors, risks a false
  pass). Every other lane re-running gates today should check `lsof -iTCP:5173` first or export
  `GLASS_UI_DEMO_PORT`. Mechanism owed to W-CARDINAL-INFRA (identity-probe before
  `reuseExistingServer`) + the R6 persisted-artefact clause.
- Artefact state after this lane: `.cache/gates/{AY-blob-warm-default, AX-blob-render,
  AX-blob-live-truth, AX-blob-integration}.json` all restored to `pass` (real-surface runs);
  `AY-blob3-strip.json` re-confirmed `pass`.
