# DOCK-crit — adversarial critique of KS-DOCK.md

**Critic: opus. Date: 2026-07-01. HEAD `29f280c8` (tranche/BG). Target: `keystones/KS-DOCK.md`.**
**Verdict: 88% converged — STRONG, near-binding-ready. 2 MAJOR executability seams (both one-sentence
fixes), 1 MODERATE numerology challenge, 4 MINOR. ZERO disk-false claims, ZERO protected-set violations,
ZERO self-inserted rows.**

The disk fidelity is exceptional — markedly better than the KS-A pair (which each carried two disk-false
claims). Every claim I re-verified on disk held, including subtle ones the KS-A critics would have prized.

---

## §A — Disk re-verification (every load-bearing claim checked; all PASS unless noted)

| spec claim | disk | verdict |
|---|---|---|
| `springPreset("dock") = {0.68, 0.64}` | `springPresets.ts` dock row = `response 0.68, dampingFraction 0.64` | ✅ EXACT |
| `DOCK_SPRING` reads `springPreset("dock")` | `dock/constants.ts` `DOCK_SPRING = { response: springPreset("dock").response, … }` | ✅ |
| `proof-dock-engine.mjs:253 DOCK_RESPONSE=0.68`; E4 @440 | disk `:253 const DOCK_RESPONSE = 0.68`; `detectE4()` @440 | ✅ |
| stale `{0.32,0.7}` at CLAUDE.md:679 · motion-canon:195 · tunable-anim:63 | all three present verbatim | ✅ |
| 5 `new SpringProgress` sites (dockMorphContext:176 · orient:204 · itemDrag:106 · layerTransition:259 · fission:484) | all five EXACT to the line | ✅ |
| GlassDock.vue 711L · silhouette 551L · layerTransition 385L · fission 604L · fission-bridge.css 552L · DockStack 238L · railProjection 133L · DockSection 115L · useDockMorphWindow 118L · useDockClickIntegrity 202L · useDockState 454L · useDockSearch 285L · proof-dock-context.mjs 341L | all verified | ✅ |
| all 11 wave ids (4.1/4.3/4.4/4.5/4.6/4.7/4.9/4.10/8.x/4.11) in cursor `EXECUTION-PROGRESS:72-80,98` | present; no self-insert; no invented 4.2/4.8 (both correctly noted folded) | ✅ |
| `proof-dock-morph-insitu.mjs:142` currently MANDATES the VT the 4.10 delete removes | disk: `assert("M2 — …VT crossfade is the shipped default", vtDefault)` requires `startViewTransition(…)` + `vtOrientation` | ✅ the born-RED→lockstep claim is real |
| `--island-t` is a LIVE fission collision → Siri uses `--siri-island-t` (§3.2 R8) | `fission-bridge.css:84 @property --island-t` + 8 live reads | ✅ subtle, correctly caught |
| `useLiquidReveal` composes `ElementMorph`, `preset:'dock'` is a type error (§3.2 R1) | disk: `preset?: LiquidRevealPreset` (snappy/bouncy…), composes `ElementMorph` | ✅ |
| SidebarDock ℱ egg (`#persistent` :269, useLongPress :38, fireRedraw :177, foundations filter :84) | all present in `demo/layout/SidebarDock.vue` | ✅ |
| `railProjection.fadeMinAlpha` default `0` (§3.3 "floors off 0") | disk default `fadeMinAlpha: 0` | ✅ |
| overflow.css/shell.css "cap⇒scroll broken at HEAD" (gated behind `dock-scroll-y` opt-in) | `shell.css:222-236` documents the opt-in gating; the "broken" = requires the prop | ✅ accurate |
| 4.3-vs-10.5 silhouette double-own residue (open q#2) | cursor row 73 says "SOLE owner"; row 83 (10.5) scope STILL lists `useDockContextSilhouette(+AppSwitcher)` | ✅ residue real; flag correct |

**Two citation-hygiene nits (findable, NOT disk-false):** (1) `bg-build-map.md:517-519` lives at
`docs/tranches/BG/execution/bg-build-map.md` — the spec drops the `execution/` prefix. (2) `SidebarDock.vue`/
`BottomDock.vue`/`AppShell.vue` are `demo/layout/*`, not the library `custom/dock/` dir; §1's facility map and
§4.6 cite them bare. §4.9 gets it right (`demo/layout/useShellNavDock.ts`). Add the prefixes.

---

## §B — MAJOR findings (must fix before binding-ready)

### B1 — The 4.1 "three-place doc reconcile" collides with the read-only precepts submodule
§0 + §4.1 bind wave 4.1 to fix `CLAUDE.md:679`, **`motion-canon.md:195`, `tunable-anim.md:63`**. The latter
two live in `docs/precepts/` — a **git submodule** (`.gitmodules: submodule.docs/precepts.url=…precepts.git`),
which the seed fence declares read-only, and which is a separate repo regardless of series (a glass-ui commit
cannot touch it; it needs its own commit + pointer bump). The spec treats all three as one in-repo "doc
reconcile" and is blind to the split. **Fix:** scope 4.1's in-repo edit to `CLAUDE.md:679` only, and record
the two precepts lines as a submodule-side note/coordination ask (or spell the submodule commit path
explicitly). As written a builder hits a read-only tree mid-wave.

### B2 — 4.5's fission tripwire can be born-RED-FOREVER against the cursor's precond list
§3.3's ≥2-consumer TRIPWIRE (machine-fail `<2`) needs two trigger-bearing consumers. Consumer #1 (shell
scroll-fission) **build-gates on 4.9's `useShellNavDock` seam** (§3.3 states this). But the cursor lists
4.5's precond as only **"4.1"** (row 75) and 4.9's as "4.1" (row 78) — **no 4.5←4.9 edge**. A topological
sort may place 4.5 before 4.9; then only consumer #2 (liquid-playground drag) exists → tripwire `<2` → the
exact born-RED-forever failure the spec condemns elsewhere. The self-challenge acknowledges "consumer #1
depends on 4.9? Yes" but stops there. **Fix:** record a fold-candidate to amend 4.5's precond to include
4.9 (shell arm), OR split 4.5 so the story+drag pair closes the tripwire independently and the shell arm
follows 4.9. A prose "build-gated on 4.9" is not a precond the orchestrator's sort will honor.

---

## §C — MODERATE finding

### C1 — The Siri `SIRI_FORMS` √φ ladder risks decorative numerology (over-engineered / un-subtle)
§3.2/§6 assert four forms (`pill | droplet | stadium | panel`) "step ×1.272 from the pill base —
proportioned, not four magic numbers." But those four states differ in **aspect ratio and corner
morphology** (a droplet ≠ a stadium ≠ a full answer panel by a uniform scale multiplier), not in a single
size dimension. A lone ×1.272 scalar cannot express a pill→droplet→stadium→panel shape change — so the
"√φ ladder" framing may be exactly the "four magic numbers dressed as proportion" the spec warns against.
**Fix:** name WHICH dimension steps √φ (inline-size? area? diagonal?) and how corner/aspect is derived, OR
drop the numerology and call them four designed forms with an explicit rationale. Don't assert proportion
you can't ground.

---

## §D — MINOR findings

- **D1 — the frozen-constant substitution must BLOCK, not proceed speculatively.** §0 is CORRECT that the
  frozen bytes are the disk-true `{0.68,0.64}` (E4 pins 0.68) and honestly flags it as open-question #1 —
  the right move. But it should state explicitly that 4.1's prose change `{0.32,0.7}→{0.68,0.64}` (which
  edits the protected-set's own stated wording in SYNTHESIS §4 + the seed) is **held until the orchestrator
  rules q#1**; a unilateral "correction" of the protected value without a fence-lift is precisely what the
  protected set forbids, disk-correct or not.
- **D2 — 10.5's now-redundant silhouette clause disposition unspecified.** §4.3 correctly flags the
  double-own (q#2), but after 4.3 deletes `useDockContextSilhouette`, 10.5's grep-gated DELETE of the same
  symbol finds nothing — spell whether that clause becomes a verify-ABSENT (green) or a dead assert (red),
  so the orchestrator's "strike the residue" has a target shape.
- **D3 — weak file-length anchors.** Several `:N` cites point at EOF, not the definition: `useScrollChrome.ts:264`
  (EOF; export @110), `useDockSearch.ts:285` (EOF; export @138). Harmless but off-brand for a
  "zero-interpretation" builder spec — point at the symbol line.
- **D4 — the "ONE endorsed ADD" is real weight in a COLLAPSE tranche.** 8.x adds a ≤500L composable + a
  WebGL2 waveform + siri.css + @property + a story, sequenced BEFORE the cuts (8.x→4.3), so the tree grows
  before it shrinks. Synthesis §1 sanctions Siri, and the "compose useDockSearch so no silhouette reader
  survives → 4.3 deletes clean" rationale is sound — but the spec should acknowledge the transient LOC bump
  honestly rather than let COLLAPSE read as the whole verb.

---

## §E — What is genuinely strong (not padding — the bar is high and it clears most of it)

- **Greenfield loop is REAL, not theater.** §3.1/§3.2/§3.3 each carry ≥3 substantive directions with
  disk-grounded rejections (velocity-bleed across the one-spring-per-container; the fission data-model
  contortion; the vacuous import-count probe class) → a GOLDEN → a "what breaks it" self-challenge with the
  gate-drift lockstep named. This is the loop run properly.
- **Protected set respected AND stress-tested.** DOCK_SPRING, E4, 4.10-verbatim, the `.glass-dock-frame`
  box-inviolate escape, the ratio-free blend + punch channel — all preserved; the two genuinely-contestable
  points (the frozen-value staleness, the 4.3/10.5 double-own) are FLAGGED as orchestrator questions, never
  self-resolved. The §4.10 elaboration adds nothing to scope/mechanism (checked against the cursor row).
- **SOTA is cited + verifiable.** motion.dev (VT non-interruptible), GSAP Flip / Material ContainerTransform,
  CSS-Tricks Gooey + WebKit bug 245510 (backdrop-filter:url), W3C APG Toolbar, Heckel/Comeau spring physics —
  all real and current. The iOS-26/27/Siri refs are forward-dated but consistent with the tranche's
  established framing and marked "north-star," Apple's proprietary timing explicitly REJECTED for our clock.
- **Precepts conformance is concrete** (§5): the punch-on-`--ease-cartoon-punch`-not-a-SPRING_PRESETS-row
  argument (a monotone damped spring can't anticipate) is the correct motion-canon reading; PRM one-assignment
  zeroing; net-negative gate count (`proof-dock-context.mjs` retired, three gates re-pointed not forked).

**Convergence 88.** Fix B1 + B2 (each a sentence) and ground-or-drop C1 → binding-ready.
