# CH-demo-ia — adversarial red-team of the demo-IA band (W18 · W40 · W57 · W58 · W60)

**Lane** CH-demo-ia · **Mode** red-team / planning-only (no code edits) · **HEAD** ~89edffc (3.8.0+convergence)
**Verdict** WEAK — the band is half-spec / half-shipped, has THREE orphaned pass-3 asks with NO wave owner
(Q5 motion-union, Q8 gate-pattern blocker, Q2 aurora black-bar), a FALSE-GREEN story-language gate that is
`.vue`-only while `manifest.ts` + `aurora-hero.ts` leak tranche codes visitors read, and a cardinal-lesson
status-inflation (W57 `live-verified` in PROGRESS while its own JSON says `pi-pending` and zero screenshots
exist anywhere in the tranche).

The bar: does the demo PERFECT the showcase? Not yet. The showcase still mounts a screen-trapping modal on
one route (Q8), shows two duplicate motion pages (Q5), leaks dev meta-language into story blurbs the gate
swears are clean, and has no captured visual proof for a single "live-verified" mark in the band.

---

## A. The falsifiable challenges that FOUND a weakness

### CH-1 — `proof:story-language` is `.vue`-ONLY → FALSE-GREEN on `manifest.ts` + `aurora-hero.ts` (W58)

`scripts/proof-story-language.mjs:55-58` walks `demo/stories` and collects ONLY files where
`ent.name.endsWith(".vue")`. The manifest story BLURBS — the prose a visitor reads in every story
description — are in `demo/stories/manifest.ts`, a `.ts` file the gate never opens.

Grep at HEAD (`grep -noE '\b[A-Z]{1,2}\.W[0-9]' demo/stories/manifest.ts`) returns **14+ tranche codes inside
the `s(...)` blurbs visitors read**:
- `:97` `…(AW.W10) — frame-rate-independent spring follow…` (the blob-interaction blurb)
- `:98` `…(AW.W11) + a seed-derived multi-stop OKLCh palette…` (the blob-mood blurb)
- `:101` `…each over a working fallback (AW.W22/W23)."` (glass-material blurb)
- `:139` `AQ.W6`, `:158` `(AX.W53)`, `:159` `(AW.W16)`, `:179` `Z.W2`, `:180` `AA.W1`, `:238` `AQ.W4`,
  `:239` `(AW.W18)` (the gate-pattern blurb — see CH-2), `:81` `V.W3`, `:84` `P.W3`, `:86`/`:87`/`:271` `O.W6`.

The W58 close artefact `docs/tranches/AX/audit/W58-storybook-language-strip.json:74` explicitly records the
FALSE claim: *"demo/manifest.ts blurb strings — already clean (0 hits per A-demo-grid-text.md §note); not
touched."* It is NOT clean. The "0 hits" came from an audit note, never from running a scanner over the `.ts`
file — and the shipped gate can never catch it because it globs `.vue` only. `aurora-hero.ts` (W57's new
file) carries `AX.W57` on line 1, and `aurora/config/options.ts` also leaks — none reachable by the `.vue`-only
walker.

**This is a born-GREEN-but-incomplete gate**: it locks `.vue` bodies but leaves the manifest blurbs (which
ARE the consumer-facing story descriptions) unguarded, so the very meta-language the wave exists to kill
ships in the demo bundle and reads in the UI. Falsifiable: extend the walker to `.ts` under `demo/stories/`
and re-run → 16+ RED.

### CH-2 — Q8 gate-pattern LITERALLY traps the visitor (blocker) — NO wave owns the fix

`demo/stories/compositions/gate-pattern.vue:23` opens with `const open = ref(true)` and `:54-109` mounts a
`<Dialog v-model:open="open">` whose `<DialogContent :show-close="false" @escape-key-down.prevent
@interact-outside.prevent @pointer-down-outside.prevent>`. So the INSTANT the route mounts, a non-dismissable
modal covers the viewport refusing esc / scrim-click / close-button — the only escape is typing the magic key
`"wolfpack"` (`:30`). This is precisely the user's pass-3 Q8: *"gate-pattern literally GATES you from the page
on click (broken — it locks you out)"* (`USER-DEFECTS pass3:33`, severity **blocker**).

Ownership grep (`grep -rl "Q8\|gate-pattern" docs/tranches/AX/waves/`) returns: **NO wave owns Q8.** Only W60
mentions gate-pattern, and only to say it "should leverage glass cards" — it does NOT fix the open-on-mount
screen-trap. W60 wrapping the page in a glass card does NOTHING about a modal that covers the whole viewport
the moment you arrive. The blocker survives the entire named band.

The correct fix (gestalt): the gate demonstration must be a CONTAINED inline preview (the dialog rendered
inside a bounded glass-card frame, opened by a button on the page), NOT a viewport-trapping `open=true`
on-mount modal. The user can SEE the non-dismissable-modal idiom without being held hostage by it.

### CH-3 — Q5 motion-page UNION has NO wave owner; W18's own tree PRESERVES the duplication

The user asked (Q5, `USER-DEFECTS pass3:30`): *"/motion/transitions should be UNIONED with /foundations/motion
— deduplicate (one motion page)."* At HEAD there are TWO motion pages:
- `manifest.ts:78` `s("foundations", "motion", "Motion", "Easings, damped spring linear() curves.")`
- `manifest.ts:202-211` an entire top-level `motion` category: `transitions`, `springs`, `countup`, `reveal`,
  `typewriter`, `animated-digit`.

`foundations/motion.vue` tours the `--spring-*` + easing register; `motion/springs.vue` tours the spring
orchestrator; `motion/transitions.vue` tours the `<Transition>` class-sets — overlapping motion surfaces split
across two top-level categories. **W18's scope LISTS BOTH** as separate categories (W18 Scope-1, line 41:
`…Navigation · Dock · Data · Feedback · Motion · Compositions…` AND keeps `foundations` with `motion`). The
re-baselined `EXPECTED_TREE` in `proof-storybook-ia.mjs:34-35` keeps `"motion"` under `foundations` AND a
top-level `motion` category (`:67`). So **W18 freezes the Q5 duplication into the new gate**, not dissolves it.

`grep -rl "Q5\|motion.*union\|foundations/motion"` over the waves returns only a W38 false-positive (no actual
Q5 reference). MASTER-PLAN Batch 5 (`:30-31`) lists "Q5 motion-page union" as a loose bullet assigned to NO
concrete wave — it is named but un-owned. The union will not happen under the named band.

### CH-4 — CARDINAL-LESSON inflation: W57 is `live-verified` in PROGRESS while its JSON says π-PENDING + zero captures exist

`PROGRESS.md:75` marks W57 `live-verified (DEVELOPED)`. But:
- W57 wave doc Status (`:53`): **`DEV-COMPLETE` … "the π live arm is handed to the orchestrator"** (i.e. NOT run).
- W57 audit json: `:99` `"status": "handed-to-orchestrator"`, `:125` `"status": "dev-complete-source-green-pi-pending"`.
- `find docs/tranches/AX -name "*.png" -o -name "*.jpg"` → **0 screenshots in the entire tranche.**
- `docs/tranches/AX/audit/visual/` contains ONLY `CAPTURE-PROTOCOL.md` — which itself (its "Retroactive
  backfill owed" section) names **W45, W52, W53, W56, W57, W59** as marked `live-verified` but lacking a
  `DELTA.md`, i.e. the protocol KNOWS the marks are unproven.

So W57's PROGRESS row claims the highest status (`live-verified`) while every primary artefact says the live
arm was never executed and no DELTA/screenshot exists. This is the exact "live-verified inflation" the
CAPTURE-PROTOCOL.md was written to stop, recurring at the PROGRESS roll-up. The source legs ARE real (heros
render `<Aurora>`, `aurora-hero.ts` exists, radials gone — verified) — but "source-green" was rolled up to
"live-verified" with no capture. By the band's own rule ("A wave's PROGRESS status is `live-verified` ONLY
when its DELTA.md exists"), W57 should read `live-pending`, not `live-verified`.

### CH-5 — W60 is SPEC-ONLY; the headline page-redesign primitives do NOT exist (umbrella un-shipped)

`grep -rln "StoryHero" demo/` → ZERO. `grep -rln "story-bg-grid" demo/` → ZERO. The `Story` interface
(`manifest.ts:31`) has no `background` field. So the ENTIRE Q4/Q7/Q9 page-redesign umbrella — the glass-card
container, the per-page background descriptor, the grid substrate, the glassy hero-over-rich-background
demonstration — is unbuilt; W60 is a spec doc only (its own Status `:119`: "SPEC (this doc). DEV-only; writes
no `src` from this session"). This is expected (W60 is Batch 4, blocked on W54) — but it means the demo-IA
band's HEADLINE deliverable (every story in a glass card, Q7) is 0% shipped, and W60 itself carries a coverage
gap (CH-6).

### CH-6 — W60's "every page wrapped" gate will MISS the 5 non-StoryPage SFCs (coverage hole in the spec)

W60 claims "128 of 145 SFCs use `<StoryPage>`" and proposes the lowest-friction path: extend `<StoryPage>` to
host `<StoryHero>` so 128 consumers gain the container free. But the actual non-StoryPage set
(`for f in …; grep -q StoryPage`) is: `StorySection.vue`, `ToneSwatch.vue`, `TokenLadder.vue`,
`ShowcaseFrame.vue` (all CHASSIS, correctly excluded) AND **`substrates/aurora.vue`** — a real navigable story
page that does NOT use `<StoryPage>`. If W60 routes the container through `<StoryPage>`, `substrates/aurora.vue`
gets NO container and the "every page wrapped" gate either falsely passes (if it only checks StoryPage pages)
or hard-REDs with no migration path specified. W60's FileBounds/gate does not name the aurora-page exception.
(133 navigable `.vue`, not 145 — W60's count is also stale: 145 predates the W19/W20 prune-row drops the band
already shipped.)

---

## B. Chronic deferrals / repeated misses (with slip history)

### CHRONIC-1 — the "gate exists, gate not wired" / gate-scope-hole class (recurs every IA wave)
- AW.W28 (`04ba0dd`): `proof:storybook-complete` added WITHOUT `gates.mjs` registration — the 272-line
  totality gate never ran. STILL UNREGISTERED at HEAD (`grep storybook-complete scripts/gates.mjs` → empty;
  only `story-language`/`storybook-ia`/`no-orphan-demo-route`/`demo-radial-calm` are registered). W18 is
  planned to fix it — but W18 is `planned`, so the gap is open going on 2 tranches.
- W40: SAME class — `proof:demo-dock-nav` + its runtime falsifier + the 3 coherence gates have package.json
  entries but NO `gates.mjs` rows (W40 doc RED witness 1). Still unwired (W40 `planned`).
- W58: a NEW variant of the class — the gate IS registered but its SCOPE is holed (`.vue`-only, misses the
  `.ts` manifest blurbs, CH-1). The miss moved from "not wired" to "wired but blind."
- Slip count: the storybook-totality gate has been unwired across AW → AX (2 tranches); the scope-hole is the
  3rd incarnation of the same "the gate doesn't actually cover the surface" pattern.

### CHRONIC-2 — manifest-blurb tranche-code leak survives every "language-clean" pass
- W58 swept 49 `.vue` SFCs to 0 hits (real, verified) but recorded `manifest.ts` "already clean (0 hits)"
  (W58 json:74) — FALSE. The manifest blurbs have leaked tranche codes since at least AW (the `AW.W10`/`AW.W11`
  blob blurbs predate AX). Every greenfield-no-meta sweep (a standing MEMORY precept) has skipped the manifest.
- W57 then ADDED a fresh leak (`aurora-hero.ts:1` `AX.W57`) inside the same band that is supposed to be
  stripping meta-language. The leak is self-replenishing because no gate covers the `.ts` surface.

### CHRONIC-3 — live-verified inflation at the PROGRESS roll-up (the cardinal lesson, recurring)
- The MEMORY note "Live-verify capture" and `audit/visual/CAPTURE-PROTOCOL.md` BOTH exist precisely because
  this recurred (round 1: AW commit-message "playwright MCP" claims with no artefact; round 2: the convergence
  waves). It is recurring a 3rd time in THIS band: W57 (demo-band) is `live-verified` in PROGRESS with a
  `pi-pending` JSON and 0 screenshots. The protocol names 6 waves owed a backfill; 0 have been captured
  (`find … -name "*.png"` → 0). The discipline is DECLARED but not yet INSTITUTED — the cardinal lesson is
  documented, not enforced.

### CHRONIC-4 — pass-3 visual blockers routed to no concrete owner
- Q5 (motion union), Q8 (gate-pattern lockout, severity BLOCKER), Q2 (aurora preview black-bar) are all
  listed in MASTER-PLAN Batch 5 as loose bullets with NO wave assignment. Q8 is a BLOCKER that traps the user
  and has zero owning wave in the entire `waves/` set. This is the recurring "the umbrella lists it, no leaf
  owns it" gap that lets a named defect slip a whole tranche.

---

## C. Gestalt HARDENING actions (planning only — to PERFECT the showcase)

### H-1 (W58 amend — close the scope hole). Extend `proof:story-language` to scan `demo/stories/**/*.{vue,ts}`
(add `.ts` to the `:58` extension filter), then sweep `manifest.ts` blurbs + `aurora-hero.ts` + `aurora/config/
options.ts` to 0 hits. Re-baseline the W58 json:74 "manifest already clean" claim to the TRUE post-sweep state.
Add a bite that injects a tranche code into a `.ts` blurb. This converts the false-green gate to a real one and
kills CHRONIC-2 at the root (the surface, not the file-type). LOW effort, high leverage — the manifest blurbs
are read on every story page.

### H-2 (NEW wave — Q8 gate-pattern de-trap). Mint a wave (or fold into W60's "broken composition" scope with
explicit ownership) that re-authors `gate-pattern.vue` from an `open=ref(true)` viewport-trapping modal to a
CONTAINED inline demonstration: the dialog rendered inside a bounded glass-card preview frame, opened by an
explicit on-page button, dismissable within the frame. Born-RED witness: `grep "open = ref(true)"
gate-pattern.vue` + a live π check that navigating to `/compositions/gate-pattern` does NOT cover the viewport
with a non-dismissable modal. This is a BLOCKER with zero current owner — it must get one.

### H-3 (W18 amend — own Q5 explicitly). Add the motion-union to W18's tree authoring: fold `foundations/motion`
+ `motion/transitions` + `motion/springs` into ONE coherent `motion` category (the easing+spring register +
the `<Transition>` gallery + the orchestrator as stacked `<StorySection>` blocks on one page), and re-baseline
`EXPECTED_TREE` to the UNIONED tree (remove the duplicate `foundations/motion` row). Today W18 freezes the
duplication; the amend makes Q5 a falsifiable assertion (no two motion categories survive). Couple with the
W60 background descriptor so the unioned motion page declares its own background.

### H-4 (PROGRESS soundness — de-inflate W57 + institute the capture gate NOW). Per the band's own
CAPTURE-PROTOCOL rule, revert W57 (and the 5 other named waves) from `live-verified` to `live-pending` in
PROGRESS UNTIL a `audit/visual/W57-DELTA.md` + ≥1 screenshot per route × {light,dark} × ≥2 viewports exists.
Run the owed chrome-devtools-mcp capture sweep for the demo-band waves (W57 heros, W58 prose render) as a
prototype of the discipline, producing the FIRST real `.png` in the tranche. Wire `proof:live-verified-ledger`
(asserts every `live-verified` PROGRESS row has a DELTA.md) into the fleet so CHRONIC-3 cannot recur silently.

### H-5 (W40/W18 — wire the totality gate, close the 2-tranche slip). Register `proof:storybook-complete` +
the 5 W40 gates in `gates.mjs` with the W00 bijection meta-gate (`proof:gate-script-parity`) proving no
script lacks a registration. This is a one-commit close of CHRONIC-1's oldest incarnation.

### H-6 (W60 spec amend — name the aurora-page exception + refresh the count). Before W60 drives, amend its
gate to handle `substrates/aurora.vue` (the navigable non-StoryPage page): either migrate it onto `<StoryPage>`
or explicitly allowlist it in the "every page wrapped" assertion with a documented rationale (its studio-stage
hosts a live Aurora — a hero by nature). Refresh the "145 SFCs" count to the post-prune 133, so the gate's
denominator is true.

### H-7 (prototype — run the `.ts` scanner now as a falsification). Before any code lands, run a one-off
`grep -rnE '\b[A-Z]{1,2}\.W[0-9]' demo/stories/*.ts demo/stories/aurora/**/*.ts` to enumerate the full leak
set (≈16 hits across manifest/aurora-hero/options) and attach it to the W58 amend as the born-RED witness set.
This is the falsifiable evidence H-1's gate must drive to zero.

---

## Verdict detail

The demo-IA band is **WEAK**: the heavy waves are real where shipped (W57 heros, W58 `.vue` sweep, W56 squircle)
but the BAND as a whole does not yet perfect the showcase. It carries (a) a false-green gate that ships the
meta-language it claims to kill, (b) an unowned viewport-trapping BLOCKER (Q8), (c) an unowned dedup ask (Q5)
that W18 actively freezes into the gate, (d) a cardinal-lesson status inflation with zero captured proof, and
(e) a headline umbrella (W60 glass-card containers) that is 0% shipped with a coverage hole in its own spec.
None of these are "merely passing a gate over a broken surface" by accident — they are the precise chronic
classes (gate-scope-hole, live-verified-inflation, umbrella-lists-but-no-leaf-owns) the tranche's own precepts
were written to close, recurring inside the band meant to close them.
