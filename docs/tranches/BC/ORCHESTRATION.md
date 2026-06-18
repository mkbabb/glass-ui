# BC — the master orchestration anchor (the long-horizon resume contract)

> **THIS FILE IS THE RESUME ANCHOR.** On any revival (cron fire, compaction, rate-limit recovery,
> new session) READ THIS FIRST, then continue the next un-done iteration. Do NOT restart from zero.
> This is **TRANCHE DEVELOPMENT ONLY** — research, audit, plan, write, synthesize, harden, challenge.
> **NO implementation** until the user greenlights the BC execution phase.

---

## 0 — The governing mandate (verbatim intent, 2026-06-18)

The BB tranche shipped **source-green but visually-broken**: ~33 commits reported "born-RED→GREEN
complete" with master CI green, yet the live demo is destroyed — glass too dark/grey, black bars on
cards, both docks broken/unclickable, the rail totally wrong, the liquid morph white/invisible,
tabs not liquid-glass, procedural viz broken/low-res, Safari wholly broken (flashing). The user's
verdict: *"the vast majority of the current tranche, and last several tranches, have not been
implemented at all. Our glass primitives have been destroyed."*

The user's directive for BC (the new tranche):

1. **50+ waves**, each with **burning lucidity** — fully formed, pursuant, with **goals + starting
   states + acceptance**, written to `docs/tranches/BC/waves/` and the precepts.
2. **Every page audited.** **Every procedural animation audited + fully modernized.**
3. **Every ask** addressed — speedtest, fourier, sci-report's atlas, and **every chronic + every
   prior-tranche deferral**, folded in and DECIDED.
4. **Our original prompt + the last 50+ historical prompts** addressed (see `PROMPT-LEDGER.md`).
5. **20+ iterations** of audit / research / harden / challenge workflows, **maximal parallelism**,
   **batches of 3 agents** (rate-limit-safe).
6. **A cron** to revive this session on rate-limit / usage-exhaustion (see §5).
7. **Long-horizon** — do NOT plan to complete for **12 hours minimum**, through several compaction
   cycles.
8. **Triumvirate waves** for every feature: **research** (web + codebase + machine) → **plan** →
   **tranche-write + synthesize**.
9. **NO legacy code. Gestalt, idiomatic, architectural transpositions** for elegance / simplicity /
   performance. KISS.
10. Iterate until **100% convergence + hardening**, full feature specification.

---

## 1 — The convergence checklist (BC is NOT converged until EVERY box is checked)

Each box = "a fully-lucid wave (or wave-set) exists in `waves/`, with goal + starting-state +
acceptance + gate, cross-checked by a challenge pass." NOT "we mentioned it."

### Band F — FORENSICS (the post-mortems; feeds Band 0)
> *"BB, BA, AZ were FULLY formed tranches — what went so wrong in their implementation? What went right?"*
- [ ] BC.W-PM-BB — BB post-mortem: source-green/visually-broken anatomy (what was built vs claimed vs painted)
- [ ] BC.W-PM-BA — BA post-mortem (dark-material, dock-sections, glass-cal, tabs-std — what landed in paint)
- [ ] BC.W-PM-AZ — AZ post-mortem (adaptive-auto grey-glass origin, morph-showcase, rail3 — the divergence point)
- [ ] BC.W-PM-SYNTHESIS — the cross-tranche failure-class taxonomy → the Band 0 gate-redesign requirements

### Band 0 — Verification transposition (the disease root)
- [ ] BC.W-GESTALT-FIRST — per-wave gestalt-first paint verification supersedes single-terminal-reflect
- [ ] BC.W-PAINT-GATE — gates measure PAINT not source-mechanism (close the gate-paint-blindness)
- [ ] BC.W-FOLD-LEDGER — every chronic/prior-tranche deferral folded + DECIDED (the DEFERRAL-LEDGER)

### Band 1 — Glass identity rebuild (iOS-27)
- [ ] BC.W-GLASS-IDENTITY — partial-transparency restored, warm-cream, the grey-slab killed at root
- [ ] BC.W-ADAPTIVE-RECONCILE — close the observer loop (luma is read, not decorative)
- [ ] BC.W-GLASS-LEGIBILITY-MEASURED — iOS-27 more-glass-AND-more-legible, measured
- [ ] BC.W-GLASS-PRUNE — glass-panel vs glass-card vs material: prune to **Glass CARDS + Glass MATERIALS**
- [ ] BC.W-DIALOG-GLASS — the glass dialog is actually partially-transparent + glassy
- [ ] BC.W-BUTTON-GLASS-IOS — increased button glass-morphism
- [ ] BC.W-BLACK-BAR — the card border-top dark-rim → catch-light (D2 root)

### Band 2 — Dock (the staple of liquid transition)
- [ ] BC.W-DOCK-ENGINE — buttery-smooth springy compositor-only morph (kill `transition: all`)
- [ ] BC.W-DOCK-ARBITRARY — dock animates into arbitrary sizes/shapes
- [ ] BC.W-DOCK-VERTICAL-FIX — the vertical dock works + is CLICKABLE
- [ ] BC.W-DOCK-COLLAPSED-BOTH — vertical AND bottom dock collapsed states + a few tab items + persistent controls
- [ ] BC.W-DOCK-STACK-RAIL — the macOS hover-expand stack rail (extend-beyond, hover-expand, 3-configurable, scrollable, n-stack)
- [ ] BC.W-DOCK-SHRINK-BLUR — the shrunken dock is not a blurry mess
- [ ] BC.W-LIQUID-MORPH — arbitrary-shape morph, never-white, never-invisible

### Band 3 — Tabs + underline (iOS-27 glass)
- [ ] BC.W-TABS-IOS — proper SMALL PILLS (not squared), all glassy, NOT reka/shadcn-like
- [ ] BC.W-LIQUID-TAB — pull an active tab → morph/squish to location
- [ ] BC.W-UNDERLINE-TUNE — underline retuned, audacious type, spring curve EASED (not abrupt)

### Band 4 — Procedural viz (WebGPU-first, no fallback where Safari is capable)
> **The procedural-item roster (the user: "for each ... a full SOTA research wave + full WebGPU/WebGL2
> prototype + full configurator + comprehensive demo suite").** 7-member suite + 2 backgrounds + 2
> new viz = **11 items.** EACH owed: (a) a SOTA-research doc (iter 1d), (b) a WebGPU-first + WebGL2
> prototype, (c) a full `useConfiguratorState` studio, (d) a comprehensive demo suite. All Safari-OK.
>
> **Cross-cutting:**
- [ ] BC.W-WEBGPU-EVERYWHERE — WebGPU-first substrate everywhere; WGSL primary; WebGL2 only where WebGPU truly absent; no Canvas2D viz; no fallback where Safari 26+ is capable
- [ ] BC.W-VIZ-INTERACTION — EVERY procedural bg responds to cursor/touch with velocity + acceleration (usePointerVelocityField everywhere)
- [ ] BC.W-VIZ-CHOREOGRAPHY — start/transition/end/restart choreography via keyframes.js (ONE source + clock)
- [ ] BC.W-VIZ-CONFIGURATOR-SUITE — the shared "full configurator + comprehensive demo suite per viz" discipline + gate
- [ ] BC.W-TEAL-NAVY-PURGE — remove the teal-on-navy reference entirely (warm-cream identity)
>
> **Per-viz (SOTA-research → WebGPU/WebGL2 prototype → configurator → demo):**
- [ ] BC.W-VIZ-AURORA — aurora: WGSL primary, painterly mediums, the kuwahara finish, full configurator + demo
- [ ] BC.W-GOOBLOB-PLAIN — goo-blob STAGE 1: re-written as JUST a blob, from first principles, Safari-OK
- [ ] BC.W-GOOBLOB-MEATBALL — goo-blob STAGE 2: + shadowing + meatballing from first principles, Safari-OK, hover-interactive
- [ ] BC.W-VIZ-DOTFLOW — dot-flow: subtle, LARGE sweeping waves (Claude co-work ref), curl-noise + Gerstner, not noise
- [ ] BC.W-VIZ-CONCENTRIC — concentric: ELLIPSOID LINES forming distinct waves (not noise)
- [ ] BC.W-VIZ-FOURIER — fourier: collapse to ONE view (kill duplicates), full epicycle demo
- [ ] BC.W-VIZ-CONSTELLATION — constellation: WebGPU, hi-res (kill the low-res circles), in a card
- [ ] BC.W-VIZ-WATERCOLOR — watercolor-dot: the decorative mark, audited + Safari-OK
- [ ] BC.W-VIZ-PAPERGRID — paper-grid: evenly-spaced + larger + LIQUID-waving lines, suffusable site-wide subtle
- [ ] BC.W-GRID-SIMPLE — the blurry grid abrogated → SIMPLE grid like keyframes.js (not in-card)
- [ ] BC.W-VIZ-DOTMATRIX — NEW: the dot-matrix sphere viz (Claude co-work fine-dot spheres)
- [ ] BC.W-VIZ-HYBRID — NEW: the goo+dot-matrix HYBRID

### Band 5 — Page standardization (EVERY page)
- [ ] BC.W-PAGE-CHASSIS — every page: audacious LARGE hero title + subtitle + explicit subpath + scroll-to-shrink + ONE glass card + procedural bg
- [ ] BC.W-PAGE-HIERARCHY — hr/card section delimiting, design hierarchy suffused, EVERY PAGE STANDARDIZED
- [ ] BC.W-CODE-BLOCKS — component names + technical values → proper code blocks + Fira Code
- [ ] BC.W-PAGE-PRUNE — prune superfluity, remove "view source"/platitudes/out-of-date copy
- [ ] BC.W-HERO-AUDACIOUS — the herostudios.tv audacious-type hero pages, per-category icons, distinct (not duplicated)
- [ ] BC.W-COMPOSITIONS-HERO — /compositions/hero distinct from homepage; /foundations/intro three-heroes → one
- [ ] BC.W-PADDING-CANON — the padding ladder applied; /display/card every-card-right; dialog padding
- [ ] BC.W-GHOST-DASHED — ghost items dashed outline; rounded everywhere it should be
- [ ] BC.W-SEPARATOR-FIX — /display/separator rebuilt; text centering

### Band 6 — Controls
- [ ] BC.W-RADIO-FIX — radios work + proper toggle states
- [ ] BC.W-DROPDOWN-FIX — dropdown trigger no-shift, aligned, dot not occluded
- [ ] BC.W-CONTROL-SMOOTH — kill control lag; square borders → rounded
- [ ] BC.W-CONFIG-RIGHT — all configurators: controls on the RIGHT on desktop

### Band 7 — Motion canon + interaction affordances
- [ ] BC.W-MOTION-ONE-CLOCK — keyframes.js as the ONE source + clock for all sophisticated animation
- [ ] BC.W-SPRING-EASE — all springs squishy/quick/coupled-fade; the abrupt curves eased; web-animation principles
- [ ] BC.W-AFFORDANCE-MAP — interaction affordances baked into every element (the brainstorm + the map)
- [ ] BC.W-TUNABLE-ANIM — the tunable-animation brainstorm + registry

### Band 8 — Safari
- [ ] BC.W-SAFARI-WEBGL — WebGL context-loss lifecycle; the flashing killed; liquid morph works on WebKit

### Band 9 — Storybook meta-design
- [ ] BC.W-STORYBOOK-META — frontend-design meta-pass: padding/usability/spacing/occlusion/fontsize/idiom adherence across the storybook itself

### Band 10 — Cross-repo + close
- [ ] BC.W-SPEEDTEST-ADOPT — the speedtest fleet asks (4.0.1 → 4.1.0 + the AW v3 relay)
- [ ] BC.W-FOURIER-ASK — the fourier asks
- [ ] BC.W-ATLAS-ASK — sci-report's atlas asks
- [ ] BC.W-DIST-COMMENT-FIX — the dist CSS-comment source-side balance + guard gate (converge with 4.0.1)
- [ ] BC.W-CUT — the honest 4.x cut + slides redeploy (EXECUTION-phase only)

### Process gates (the user's explicit process demands)
- [ ] ≥ 20 audit/research/harden/challenge iterations executed (see §3 log) — _at 4 (0,1,1b,1-sweep); 1c+1d next_
- [x] SOTA research corpus: apple.com + iOS-27, awwwards, herostudios, procedural-refs — DONE (research/)
- [x] keyframes.js + value.js facility inventory — DONE (research/kf-vjs-facilities.md: Oscillator/sampleColorRamp/republish-ask)
- [x] Every demo route enumerated + audited — DONE (research/route-census.md, 6 impacts)
- [ ] **BB/BA/AZ forensic post-mortems** (research/postmortem/*.md) + the failure-class synthesis — 1c LAUNCHING
- [ ] **Per-viz SOTA research doc ×11** (research/viz/*.md — aurora · goo-blob · dot-flow · concentric · fourier · constellation · watercolor · paper-grid · grid-simple · dot-matrix · hybrid)
- [ ] A challenge/adversarial pass over the full wave-set (every wave attacked for gaps)
- [ ] PROMPT-LEDGER.md: original + 50+ historical prompts, each mapped to a covering wave

---

## 2 — The iteration protocol (each iteration = one triumvirate sweep)

Each iteration is a Workflow run, **batches of 3 opus/sonnet agents** (rate-safe), of one kind:
- **RESEARCH** (web + codebase + machine): grounded findings → `research/`.
- **PLAN**: author/refine waves with goal + starting-state + acceptance → `waves/`.
- **HARDEN**: tighten a band's waves (gates, edge cases, fences, precept conformance).
- **CHALLENGE**: adversarial — attack the wave-set for gaps/contradictions/un-covered asks.

After each iteration: **update §3 log**, **re-tick §1 checklist**, **commit**. The orchestrator (core
model) synthesizes; the fanout is opus/sonnet.

**Convergence test:** §1 fully checked AND ≥2 consecutive CHALLENGE iterations find no new gaps.

---

## 3 — The iteration log (append-only; the resume cursor)

| # | kind | bands | workflow | status | output |
|---|------|-------|----------|--------|--------|
| 0 | audit | all | bc-audit.mjs (32 agents) | DONE | FINDINGS-DIGEST.md, DEFECT-LEDGER.md, USER-DEFECTS.md |
| 1 | research | SOTA + codebase + deferral | bc-iter1-research.mjs (way3dy2jj / wf_82240b8d-5f0) | 7/9 HARVESTED | research/*.md ×7 + WAVE-IMPACTS.md (50 rows / 49 waves) |
| 1b | research-rerun | route-census + viz-codebase | resume (wiremj4eb) — re-ran ALL 9 | DONE 9/9 | research/*.md ×9 + WAVE-IMPACTS (70 rows/57 waves) |
| 1-sweep | deferral fold | AX/AY/AZ/BA/BB/memory/hero | wcbitsihm (213 items) | DONE | research/deferral/*.md ×7 + herostudios-design.md |
| 1c | forensics | BB/BA/AZ post-mortems | bc-iter1c-forensics.mjs | LAUNCHING | research/postmortem/*.md |
| 1d | per-viz SOTA | 11 procedural items | bc-iter1d-viz-sota.mjs | QUEUED | research/viz/*.md ×11 |
| 2 | plan | all bands (expanded: +Band F, +per-viz families) | bc-iter2-plan.mjs (18 agents) | STAGED | waves/*.md (~60) + DEFERRAL-LEDGER |

> **HARVESTED (7/9):** apple-ios27, awwwards-herostudios, procedural-refs, glass-dock-codebase,
> deferral-sweep, cross-repo-asks, kf-vjs-facilities → `research/`. KEY: WebGPU Baseline since
> Jan-2026 (Safari 26+ ships it → the no-fallback ask is reachable); D2 black-bar = warm-ink TOP
> border; BB never closed (no FINAL, W-REFLECT3 never ran); both kf/vjs local sibling repos exist.
> 2 codebase agents (route-census, viz-codebase) hit a TRANSIENT server rate-limit → re-running via
> resume (caches the 7, re-runs the 2).
>
> **NEXT CURSOR: iteration 1b resume IN-FLIGHT (wiremj4eb). RESEARCH-before-PLAN order (the
> triumvirate). On 1b completion → re-harvest route-census + viz-codebase, then the research-deepening
> iterations BEFORE the PLAN fan-out:**
> 1. **1c FORENSICS** — `bc-iter1c-forensics.mjs` (3 agents: BB/BA/AZ post-mortems — what was built
>    vs claimed vs painted; the failure-class taxonomy → Band 0 gate-redesign reqs).
> 2. **1d PER-VIZ SOTA** — `bc-iter1d-viz-sota.mjs` (11 agents, batches of 3: one deep SOTA-research
>    doc per procedural item → research/viz/*.md, each pinning the WebGPU/WebGL2 technique + configurator
>    axes + demo-suite scope; uses web.dev/MDN/Baseline guidance).
> 3. **2 PLAN** — `bc-iter2-plan.mjs` (expanded: +Band F post-mortem-informed gates, +the per-viz
>    families consuming research/viz/*.md, +goo-blob staging). Authors 50+ waves/*.md + DEFERRAL-LEDGER.
>
> Do NOT double-spawn while wiremj4eb is in flight (check TaskList / TaskOutput first).**

---

## 4 — The resume protocol (do this on every revival)

1. Read this file (§3 cursor) + `PLAN.md` + `DEFERRAL-LEDGER.md` (when authored).
2. `TaskList` — is a workflow in flight? If yes, wait/harvest; do NOT double-spawn.
3. `curl -s -o /dev/null -w "%{http_code}" http://localhost:5199/` — dev server up? (restart if down: `npm run demo` background).
4. Continue the next un-done iteration per §2. Update §3. Re-tick §1. Commit.
5. If §1 fully checked AND convergence test met → write `FINAL.md`, report converged, STOP, delete the cron.
6. Keep the revival cron alive until convergence.

---

## 5 — The revival cron (the hardening against rate-limit / usage-exhaustion)

A **durable, recurring** CronCreate job fires every ~20 min at off-minutes. While the REPL is busy
it is a no-op (cron fires only when idle); when the session has died/stalled (rate-limit, usage cap,
crash) it re-enters via the resume protocol. Auto-expires after 7 days (re-arm if BC runs longer).

- Cron prompt: *"RESUME BC. Read docs/tranches/BC/ORCHESTRATION.md §3 cursor + §4 resume protocol
  and continue the next un-done iteration. TRANCHE DEVELOPMENT ONLY — no implementation. If §1 is
  fully checked and the convergence test is met, do nothing and report converged. Keep the cron
  alive."*
- Cron id: **17dd706c** (`9,29,49 * * * *`). NOTE: the runtime reported it **session-only** despite
  `durable:true` — so it revives within THIS session's life (rate-limit recovery while the process
  lives) but a full process-death needs a fresh `claude` launch + the resume protocol. Re-arm a
  durable cron if the runtime supports it on a later launch.

---

## 6 — Invariants (the binding precepts this loop must never violate)

- NO backwards compat / legacy aliases (clean breaks).
- Presets-in-consumers (library tokens evolve as identity; named presets live in consumers).
- Live-verify needs a CAPTURED delta, not a commit-message claim.
- Gestalt redesigns over incremental patches; no workarounds.
- Tailwind-first (re-express references via @theme + @utility).
- Opus/sonnet for fanout, never inherit fable on spawns.
- Every src/ artefact has ≥2 sites OR is exported OR is a private demo helper.
- Writing style: no grandiloquence, em-dashes-no-spaces, levity.
- **MCP at every juncture (user-mandated).** Research + verification agents use the **modern-web-
  guidance** sources (web.dev / MDN / Baseline / caniuse via WebSearch+WebFetch — no dedicated
  "modern web guidance MCP" is registered this session, so its INTENT is fulfilled via these) for
  every web-platform-feature decision (WebGPU/backdrop-filter/scroll-timeline support), AND the
  **dev-tools MCP** (chrome-devtools + Playwright + claude-in-chrome) for every live paint/perf
  verification. No "I assume it is supported" — cite the Baseline status. No "looks fixed" — capture
  the paint. (Binds the EXECUTION phase especially; in tranche-dev the research agents cite the
  Baseline facts the waves bake.)
- **Per-viz completeness (user-mandated).** Every procedural item ships a WebGPU-first + WebGL2
  prototype + a FULL configurator + a COMPREHENSIVE demo suite. A viz wave without all four is
  incomplete. Goo-blob is staged: plain blob first, then meatball/shadow from first principles.
