# AT.W0 — Lens 3: PROMPT COMPLETENESS (the full-arc request ledger, re-grounded at 3.2.0 HEAD)

Third pass of the L3 lens. The prior two — `AS/audit/W0-L3-prompt-completeness.md`
(arc as of `756adcc`) and `AS/audit/W0b-L3-prompts.md` (re-run at `8c0cced`) — recapped
the constellation arc while AS was mid-flight. This pass re-grounds EVERY user
prompt across the whole arc against **HEAD = `06b35d9`, glass-ui @ 3.2.0 PUBLISHED**
(release run `26964913257`, provenance-signed) and folds every OPEN/PARTIAL item into AT.

**Verdict in one line:** the AS publish closed the arc's keystone (3.2.0 through the
repaired CI is the end-to-end #177-repair proof), so the headline cross-repo blocker is
discharged — but **five glass-ui-owned residuals slipped the AS close** (P5 Fraunces
`@font-face`, the `supportsPostTask` wire-or-drop, the DataTable vueuse-root-barrel leak +
its missing gate, the ι hygiene sweep, the paired-π protocol structural adoption), and the
**AT headline ask (lift goo-blob + watercolor-dot with a required injected color-resolver
seam) is a net-new wave with ZERO src today** — its cross-repo counterpart (value.js K.W3,
inv-K-3) is already specced and waiting on the glass-ui home to exist.

---

## §1 — Full-arc prompt ledger (verbatim intent → status at 3.2.0 HEAD)

Statuses: **ADDRESSED** (closed, cite commit/doc) · **PARTIAL** (intent partly met) ·
**OPEN→AT** (fold into AT). Each glass-ui-owned OPEN/PARTIAL row carries an AT target;
cross-repo rows are NAME-FORWARD under inv-16 (recorded, not absorbed).

| # | Prompt (verbatim intent) | Status | Evidence (file:line / commit / probe) |
|---|---|---|---|
| **(1)** | Execute glass-ui's constellation arm (CONSTELLATION.md re-ground); inv-16; gate on green CI; orchestrate w/ parallel agents; no workarounds/idiomatic/no-legacy. | **ADDRESSED** | glass-ui's arm ran AR.W2 → AS (gate-integrity inv-θ + leverage) → **3.2.0 published green** on a clean runner (`AS/FINAL.md:90-95`, release run `26964913257`). inv-16 held throughout (every cross-repo item name-forwarded). Idiomatic/no-legacy: inv-θ RETIRED the 5 hardcoded constellation copies, no parallel-living duplicate (`AS/FINAL.md:16-20`). |
| **(2a)** | Seed NPM token. | **ADDRESSED** | NPM_TOKEN seeded across all three publishers this session; the 3.2.0 tag is the end-to-end #177 proof the seeding works (`AS.md:84`; `AS/FINAL.md:91-95`). Secret-safe (no token in any tracked tree). |
| **(2b)** | DEEPLY audit w/ 6 agents (original plan + waves + all changes); gestalt path forward; NO quick fixes; NO legacy; delineate chronically-deferred + fold; delineate deferred + fold; recap ALL prompts; tranche-dev only. | **ADDRESSED** | AS.W0 six-lens audit (`AS/audit/W0-L{1..6}-*.md`) + the W0b second deep audit (`W0b-L1/L3/L4` + `W0b-path-forward.md`). Chronic + deferred ledger ruled to terminal verdicts (`W0b-L4-deferred.md` — "No item is left unruled", §4). Prompt recap = `W0-L3` + `W0b-L3` + THIS pass. |
| **(3)** | "Strip for publish (contract-v2)" — the development-key decision. | **ADDRESSED (glass-ui half)** | AS.W2b R2 stripped the 68 `development` exports keys; glass-ui's own package.json is contract-v2-clean (`AS/FINAL.md:52`; `W6-close.md:56-58`). **NAME-FORWARD residual:** value.js K.W2.5 reverts its `inv-K-4` `development` key in lockstep (`constellation-ordering-2026-06-04.md:6,20`) — sibling-RED locally, CI-green when absent. Not glass-ui's lever. |
| **(4a)** | Execute AS in full (incl. design/AS.W5 §6 P9 first). | **ADDRESSED** | P9 silent-styling root fix shipped FIRST (`8c0cced`; `vite.style-assets.ts` generates `dist/styles/components.css`). All AS waves DONE (`AS/PROGRESS.md:24-33`; `AS/FINAL.md:62-72`). |
| **(4b)** | Publish 3.2.0 first (+ `--provenance`/changesets; keep proof:* per DEC-6); gate on the AS fleet. | **ADDRESSED** | 3.2.0 published with `--provenance` → SLSA `provenance/v1` (`W6-close.md:101-107`). `release.yml` derives from `gates.mjs --run release` (the AS fleet); proof:* retained (`W6-close.md:71-79`). Changesets configured (hand-cut this minor, like 3.0.0/3.1.x — `W6-close.md:67`). |
| **(5a)** | Screenshot inventory EDICT — assay/clean/categorize the screenshot set; inventory app w/ page screenshots; deep comparison analysis; 6 agents. | **PARTIAL → OPEN→AT** | Inventory + categorization DONE (`constellation-adoption-2026-06-02.md §b` catalogues all 102 root PNGs → owning tranche). **But the cleanup never executed:** HEAD shows 12 root PNGs + 28 `as-verify/*.png` + `.playwright-mcp/` + 6 `.DS_Store` + 3 superseded `docs/constellation/*.md` STILL loose (probed this pass). The AS.W6 ι-sweep that `W0b-L4-deferred.md:70,102` routed it to **did not run**. See §3. |
| **(5b)** | Did the screenshot-inventory get FOLDED into the precepts (a per-tranche before/after capture convention)? | **PARTIAL → OPEN→AT (the lens's flagged item)** | The paired-π protocol is AUTHORED (`constellation-adoption-2026-06-02.md §c`) and value.js codified it as a binding tranche convention (`value.js K.W6-pi-visual-runtime.md` — the π lane, "an unintended before→after delta is a close-blocker"). **But on the glass-ui side it is NOT structurally adopted:** the precepts submodule pins `63240e6` which does NOT carry the `SPEC.md §"π visual-runtime lane"` subsection the value.js doc cites; glass-ui produced only AFTER-only loose captures (`as-verify/`), never a `…-visual-runtime/baseline\|close/` leaf + `DELTA.md`. See §2 — this is the lens's specially-flagged finding. |
| **(5c)** | The recurring deep-audit prompt + validate CI choices + validate vite configs + the Style Audit (6-agent). | **ADDRESSED** | CI/vite validated (`W0b-L3-prompts.md:27`, probe 5 — `ci.yml` 14-gate manifest-match, `vite.style-assets.ts` P9 fix). Style Audit ran (`eb028fc docs(audit): AS style audit — bidirectional self-audit (6 slices)`). |
| **(6)** | 13 visual defects; three waves (screenshot-audit 6 agents; frontend-design 6 agents; harden+challenge 6 agents); fold into the tranche; be indefatigable. | **ADDRESSED** | AS.W7 three-wave cycle (audit → frontend-design → harden) fixed all 13 (D1-D13); the harden wave caught the silent-no-op dock binding (`96858c8`, `00bd5f9`; `W7-visual-defect-ledger.md`). `deriveAurora` SHIPPED as the D10b ≥2 witness (`W6-close.md:30-31`). |
| **(7)** | 9 agents: canonical ordering of active tranches + per-session execution prompts. | **ADDRESSED** | `constellation-ordering-2026-06-04.md` (9-agent scan → keystone glass-ui 3.2.0 + 3 tiers + per-session moves). Committed `c5388be`. |
| **(8)** | continue/redeploy all agents and workflows (post-publish verification). | **ADDRESSED** | `932d2ee docs(tranche-AS): post-publish verification of 3.2.0 (13-agent workflow)`; `W6-postpublish-verify.md` confirms the published tarball's `dist/` bytes sha256-identical to local — no 3.2.1 (`AS/FINAL.md:94-95`). |
| **(9)** | THIS: P5 outer-only (RULED); create a proper wave spec for goo-blob + watercolor-dot; deep 6-agent audit; recurring prompt; tranche-dev only. | **OPEN→AT (the headline)** | P5 outer-only RULED at AS close (`AS/FINAL.md:115-119`; `779fed7` reverted the per-section rounding; fourier adjusts on its side — NOT a glass-ui change). The goo-blob + watercolor-dot LIFT has **ZERO src in glass-ui** (`grep -rln 'Metaball\|GooBlob\|watercolor' src/ = 0`) — it is the AT net-new headline wave. See §4. |

---

## §2 — The lens's flagged item #1: the screenshot-inventory precept edict (prompt 5b)

**Status: the convention is AUTHORED + cross-repo-codified, but glass-ui-side STRUCTURAL
adoption is OPEN.** Three facts, grounded this pass:

1. **The protocol exists and value.js made it binding.** value.js's
   `docs/tranches/K/design/K.W6-pi-visual-runtime.md` codifies the "π visual-runtime lane"
   as a *binding close convention*: "K ships visual changes … per the parent protocol π is
   binding when a tranche ships visual changes; an **unintended** before→after delta is a
   **close-blocker**, not an FYI." It cites a canonical home at
   `docs/precepts/…/SPEC.md §"The π visual-runtime lane"` and a per-repo execution adoption
   (`K.W1-visual-evidence-protocol.md`). So the EDICT *was* folded into the precepts — on
   value.js's authoring flow.

2. **The glass-ui precepts pin does NOT carry the subsection.** glass-ui pins
   `docs/precepts` at `63240e6` (`git -C docs/precepts log -1` this pass). The submodule
   listing shows `instructions/tranche/SPEC.md` present but the pin predates the π-lane
   subsection value.js cites. So at glass-ui HEAD the canonical protocol source the captures
   should follow **is unreachable** — exactly the gap `W0b-L3-prompts.md:38` flagged (and it
   has NOT moved: pin still `63240e6`).

3. **glass-ui never produced the paired form.** The AS visual evidence is AFTER-only loose
   captures: 28 PNGs in `as-verify/` + `.playwright-mcp/` (probed this pass) — never a
   `…-visual-runtime/baseline|close/` leaf, never a `DELTA.md`, never a BEFORE baseline. The
   protocol's close-blocker verdict (unintended delta = blocker) cannot fire without a BEFORE.
   The 3.2.0 visual work was correctness-gated in-commit, not paired-π-gated.

**AT disposition (FOLD).** AT ships visual surface (goo-blob + watercolor-dot are WebGL/CSS
render primitives — exactly the class π is binding for). AT must (a) advance the glass-ui
precepts pin to whatever canonical commit carries the π-lane subsection (USER-DOMAIN —
glass-ui writes only glass-ui; the submodule re-sync is the precepts owner's leg per inv-16,
but AT records the dependency and gates on it), and (b) structurally adopt the paired form
for its own visual waves: a `docs/tranches/AT/audit/…-visual-runtime/{baseline,close}/` leaf
+ a `DELTA.md` per affected view, with the WebGL-canvas-present + non-empty-pixel assertion
(glass-ui is the blob LIFT SOURCE — its baseline is what value.js diffs against). This is
NOT just hygiene — it is the close-gate for the AT blob waves.

---

## §3 — The ι hygiene sweep (prompt 5a) — slipped the AS.W6 close

`W0b-L4-deferred.md:70,102` routed the loose-scratch class to "AS.W6 ι-sweep
(archive-not-delete)". **It did not run.** Probed at HEAD this pass:

| Artefact | Catalogue count (2026-06-02) | HEAD count (this pass) | Disposition |
|---|---|---|---|
| Root `*.png` | 102 | **12** | partially churned (the 102 → 12, but still loose + untracked) |
| `as-verify/*.png` | 0 (new) | **28** | the AS visual scratch ADDED to the class it was meant to retire |
| `.playwright-mcp/` | 0 (new) | **present** | playwright scratch dir |
| `.DS_Store` (outside node_modules) | 1 (drifted) | **6** | gitignore + delete |
| `docs/constellation/*.md` superseded | 3 | **3** | `MODERN-WEB-CLOSE.md` + `MODERN-WEB-EXECUTION-PLAN.md` + `NEXT-ROUND-EXECUTION-PLAN.md` still present — ledger-retire |

**AT disposition (FOLD — AT ι-sweep).** The archive-not-delete discipline (`git mv` into a
baseline leaf; `.DS_Store` gitignore+delete; the 3 plan docs ledger-retire) rides the AT
close, and it now COMPOSES with §2 — the `as-verify/` + `.playwright-mcp/` loose captures
get folded INTO the paired-π structure rather than archived as orphan scratch. The sweep
never touches the dirty `docs/precepts` submodule (forbidden). Adjacent to inv-θ's
"`git status` clean" thesis but a separate class (inv-θ froze the 22 tracked gate-output
JSONs; this is visual-evidence scratch).

---

## §4 — The lens's flagged headline (prompt 9): the goo-blob + watercolor-dot LIFT

**Status: ZERO src in glass-ui; net-new AT wave.** The lift SOURCE is fully present and
clean in value.js's demo (probed this pass):

```
value.js/demo/@/components/custom/goo-blob/          GooBlob.vue + composables/{useBlobMood,useBlobPointer,useBlobSatellites,useMetaballRenderer}.ts + shaders/{metaball.frag,metaball.vert}.glsl + types.ts + index.ts
value.js/demo/@/components/custom/watercolor-dot/     WatercolorDot.vue + composables/useWatercolorBlob.ts + index.ts
```

**The color-resolver seam is the load-bearing design point — and the existing value.js code
already proves it is decoupled.** Grounded reads this pass:

- `goo-blob/GooBlob.vue:22-24` — `defineProps<{ color: string; seed?: string }>()`. Color
  enters as a **plain CSS string**, surfaced as `--blob-color` and passed to the renderer.
- `goo-blob/composables/useMetaballRenderer.ts:44-68` — the ONLY color-resolution is a
  **2D-canvas `fillStyle`/`getImageData` probe** (`cssColorToRgb`, memoised) that turns the
  CSS string into `[0,1] RGB` for the `uBaseColor` shader uniform (`:198`). There is **no
  value.js import** anywhere in goo-blob (`grep '@mkbabb/value' goo-blob/ = 0`).
- `watercolor-dot/WatercolorDot.vue:18-37` — `color: string`, consumed as
  `backgroundColor: color` passthrough; `useWatercolorBlob.ts` only hashes the string for a
  deterministic border-radius shape. **No color resolution at all** — it never needs RGB.

So today the blob primitives are *already* color-agnostic — they use the **browser canvas
resolver**, not value.js. The AT ask makes this seam a **required injected resolver** so the
glass-ui primitive ships with NO default baked in (the inv-K-3 latent-dep trap):

> **value.js K.W3 (`K.md:26,58,133`, inv-K-3, ALREADY SPECCED):** "`demo/@/components/custom/
> goo-blob/` and `watercolor-dot/` are **deleted** and imported from `@mkbabb/glass-ui` … the
> lifted blob primitive takes a *required* injected color resolver and ships NO `value.js`
> default … the primitive only ever needs RGB, so baking `parseCSSColor` as its default would
> make value.js a hard runtime dep of the glass-ui blob for *every* external consumer."

**This is a coupled cross-repo cohort, with glass-ui owning the home.** value.js K.W3 cannot
execute its delete-and-import until the glass-ui home exists. The AS design doc already booked
this (`AS.W5-constellation-primitives.md:28,61,87` — "P3 Metaballs+BlobDot SHIP→AS
post-v1.0.0"; and `:75` — "the color-resolver is INJECTED (no value.js default); confirm the
resolver stays consumer-injected"). The user's prompt 9 promotes it from BOOK to the AT
headline.

**Three AT-spec design points the source dictates (file-grounded):**

1. **The resolver seam is `(css: string) => [number, number, number]` (linear [0,1] RGB).**
   That is the exact shape `uBaseColor` consumes (`useMetaballRenderer.ts:198`). It is
   REQUIRED (no default) for the WebGL goo-blob. The watercolor-dot needs NO resolver (it is
   pure CSS passthrough) — so the seam is goo-blob-only, and AT must not over-inject the
   watercolor primitive (overfitting guard: don't add a resolver param the watercolor leaf has
   no site for). value.js's demo injects its `parseCSSColor`; an external consumer injects the
   1×1-canvas form (glass-ui MAY ship the canvas-probe as a *named optional helper*, but NOT
   as the primitive's default — that would re-introduce the canvas-2D coupling the inv-K-3
   note warns against, and would couple aurora's `color.ts` `_parseCtx` into the blob).

2. **The shared WebGL bootstrap should be ONE glass-ui helper.** `K.md:26` calls for
   `compileShader`/`linkProgram`/`createQuadVAO`/`getUniforms` to be one helper consumed by
   aurora + goo-blob (the triple-duplication retired). glass-ui's aurora already has this
   machinery (`aurora/composables/runtime.ts`); AT should extract the shared bootstrap so the
   blob does not re-mint it — this is a no-double-mint constraint, not a new substrate.

3. **The "post-v1.0.0" gate referent is STALE — re-derive it for AT.** The AS design doc
   gates P3 on "glass-ui v1.0.0 (= value.js K.W6)". glass-ui passed v1.0 at tranche L and is
   now **3.2.0** — so "post-v1.0.0" is trivially satisfied; the real gate is the cohort cadence
   (value.js K.W3 is the 2nd consumer that meets ≥2, alongside the value.js demo + any
   bbnf-buddy mascot-physics reach). AT must restate the gate as "ships in glass-ui, value.js
   K.W3 deletes-and-imports" — a coupled paired close, not a version gate.

**≥2-consumer witness (overfitting bar).** goo-blob: value.js demo hero/BlobPane (consumer 1)
+ value.js K.W3 product surfaces + a glass-ui demo story (consumer 2 within glass-ui). The
design doc names value.js + bbnf-buddy (mascot physics) + keyframes (physics driver) as the
roster (`AS.W5-constellation-primitives.md:28`). The bar is MET on the value.js side at K.W3
LIVE; AT should ship a glass-ui demo story as the in-repo 2nd context so the primitive is not
substrate-without-consumer at glass-ui HEAD (the same discipline `deriveAurora` followed —
the W7 D10b demo UI was its ≥2 witness, `W6-close.md:30-31`).

---

## §5 — The two HEAD findings AS explicitly name-forwarded to AT (FINAL.md:159-176)

These are OPEN by AS's own close record; this pass re-verified them at HEAD:

| Finding | HEAD probe | AT disposition |
|---|---|---|
| **`supportsPostTask` thin witness** — exported predicate, 0 in-repo call sites; `usePrioritizedTask` uses `getSchedulerPostTask()` directly. | CONFIRMED OPEN: `supportsPostTask` defined at `platformSupport.ts:23`, exported at `utils/index.ts:9`; `usePrioritizedTask.ts` calls `getSchedulerPostTask()` (`:38,104,187`), never `supportsPostTask`. It clears the overfitting bar AS exported-API (`W6-close.md:24`) but is a thin witness. | **FOLD — wire-or-drop.** Either route `usePrioritizedTask`'s guard through `supportsPostTask` (DRY — the predicate becomes load-bearing) OR drop the export. The lens's specially-flagged "supportsPostTask wire-or-drop open" = **OPEN**, confirmed. |
| **DataTable vueuse root-barrel re-export** — `src/index.ts` re-exports `data-table`; `DataTable.vue` imports `useElementSize` from `@vueuse/core` — a vueuse symbol reachable through the SOURCE root barrel (Design-Axis-6 nuance). No gate enforces vueuse-free-root-barrel. | CONFIRMED OPEN: `src/index.ts:104` `export * from "./components/ui/data-table"`; `DataTable.vue:3` `import { useElementSize } from "@vueuse/core"` (used `:78`). No `scripts/*` gate traces `@vueuse` reachability from `dist/glass-ui.js` (probed — "no vueuse-reachability gate script"). Build-split mitigates the bundle case (DataTable is a lazy chunk) but the SOURCE-barrel invariant is violated. | **FOLD.** Two-part: (a) make `data-table` subpath-only OR swap `useElementSize` → the in-house `useResizeObserver` (already in `composables/dom/`); (b) **add a static-import-graph gate** that fails closed on `@vueuse/core` reachability from `dist/glass-ui.js` — the gap `AS/FINAL.md:170-172` named. This extends the inv-θ gate fleet (a new `proof:*` over the `gates.mjs` manifest). |

---

## §6 — The two control-pane polish asks AS name-forwarded to AT (FINAL.md:139-157)

Both are net-new single-component P2 polish that failed AS's ≥1-release-boundary test and
lacked a ≥2 witness at AS close. Re-verified at HEAD:

| Ask | HEAD state | AT disposition |
|---|---|---|
| **A-1 — Configurator machined-groove inter-row divider opt-in** (port `.instrument-rail` twin-line groove onto the configurator chassis). | `ConfiguratorLayer.vue` flat `border-b border-border/40` today. `index.css` at ~99.5% budget — a conscious budget rebase is the precondition (`AS/FINAL.md:150-152`). | **FOLD (gated on the budget rebase).** Token-first opt-in (a `Configurator` panel `data-attr`) reusing `--surface-tint-*`. ≥2: fourier (#1) + a glass-ui demo story (#2) — greenfield-in-AT, so the demo is the 2nd context. |
| **A-2 — `label`/`sub` bound to the typography ladder at component root** (swap magic `text-sm font-semibold` + `text-micro font-mono` → ladder rungs). | `ConfiguratorLayer.vue` magic literals today (`AS/FINAL.md:155`). ≈0 net CSS (rungs ship). | **FOLD (visual-verify gated).** It restyles EVERY configurator label across all consumers — so it needs the paired-π visual verification from §2 (this is exactly the "unintended delta = close-blocker" case). Couples A-2 to the π adoption. |

---

## §7 — The residual chronic WATCH set (carried into AT, named-forward with triggers)

These are NOT AT execution items unless their trigger fires — recorded so AT does not
re-discover them. Full table in `AS/audit/W0b-L4-deferred.md §1`; the still-live triggers:

- **P2 `deriveAurora` / value.js VAL-1** — was kill-gated at value.js K.W4; **RESOLVED by
  AS.W7** — `deriveAurora` now SHIPS in glass-ui (`grep deriveAurora src/ = 3 files`;
  `aurora/index.ts:28` exports it; the W7 D10b demo is the ≥2 witness). **EXIT the watch** —
  the VAL-1 kill did NOT fire (the user's D10b ask superseded it). Note: `deriveAurora` is
  NOT on the root barrel or `/api` (`grep deriveAurora src/index.ts src/api = 0`) — it is
  `/aurora`-subpath-only, which is correct (heavy WebGL chunk). No AT action unless a
  public-surface promotion is asked.
- **P3 Metaballs+BlobDot** — was "WATCH, post-v1.0.0"; **NOW the AT headline** (§4). Trigger
  fired (user prompt 9).
- **CSS levers (interpolate-size, relative-color), G3/G5/G6/G8, text-box-trim,
  dialog-native/HoverPopover-native, G7 GlassNativeSelect** — Baseline/consumer-gated WATCH;
  no trigger fired; carry to AT's named-forward roster unchanged.
- **`--spring-crisp` / whisper-heading / CompletionSeal** — 0 consumers; default not-ship;
  carry unchanged.
- **inline-edit (3-shape convergence), dock panel-host (≥2 consumers), LabeledSlider readout,
  shadcn-parity (REJECT-leaning)** — convergence-gated WATCH; carry unchanged.
- **P7 Mascot, value.js VAL-9** — TERMINAL KILL; do not re-open.

---

## §8 — Standing constraints (re-verified at HEAD)

| Constraint | Status |
|---|---|
| NPM_TOKEN secret-safe; never commit `.env`/credentials | HELD — no token in any tracked tree; seeded as a repo secret (`AS.md:84`). |
| No `--no-verify` | HELD — the green-gated publish ran through `release.yml`'s full `gates.mjs --run release` filter (`W6-close.md:71-79`); no bypass. |
| Agents read-only on git | HELD — this audit is read-only (git log/show/diff only); the AS process note (`FINAL.md:178-188`) reinforced that agents NEVER run an irreversible release step (publish/tag-push/workflow-dispatch) — the precept reinforcement is name-forward to the precepts owner. |
| `docs/precepts` submodule + presentation/ are USER-DOMAIN; never delete user files | HELD — the precepts pin re-sync (§2) stays user-domain; the ι-sweep (§3) is archive-not-delete, never touches the submodule. |

---

## §9 — Disposition for AT (the fold)

**OPEN→AT items glass-ui owns (every one folds into a named AT wave):**

1. **Goo-blob + watercolor-dot lift** — the AT HEADLINE wave (§4). Required injected
   color-resolver seam `(css)=>[0,1]RGB` for goo-blob ONLY (watercolor needs none); shared
   WebGL bootstrap extracted (no double-mint of aurora's); demo story as the in-repo ≥2
   witness; coupled paired-close with value.js K.W3 (inv-K-3, name-forward). **Gate:**
   close-time grep of the glass-ui blob source for `parseCSSColor`/value.js → ZERO (inv-K-3
   structural enforcement) + a hue-fidelity check.
2. **P5 Fraunces `@font-face`** — the one W5-SHIP that slipped (`W0b-L4-deferred.md:50,123`;
   re-verified `grep Fraunces src/styles/fonts.css = 0`; the `--font-display-variation-settings:
   WONK/SOFT` at `typography.css:98` is STILL silently inert — glass-ui specifies axes no
   shipped face carries). Consumers: value.js + words (DEC-8). **Gate:** the woff2 asset lands;
   mirror the Plus-Jakarta/Fira `@font-face` pattern at `fonts.css:80`. Lowest-risk highest-WC
   lever; do not let it slip a 2nd tranche.
3. **`supportsPostTask` wire-or-drop** (§5) — wire into `usePrioritizedTask` OR drop.
4. **DataTable vueuse-root-barrel leak + the missing gate** (§5) — subpath-only-or-swap +
   add the `@vueuse`-reachability `proof:*` gate (extends inv-θ).
5. **paired-π structural adoption + the ι hygiene sweep** (§2, §3) — the AT visual waves gate
   on the paired form; the loose captures fold into it; the sweep is archive-not-delete at
   close. Depends on the precepts pin advancing (USER-DOMAIN edge).
6. **Configurator A-1 (groove divider) + A-2 (typography-ladder labels)** (§6) — gated on the
   `index.css` budget rebase (A-1) and the π visual verification (A-2).

**NAME-FORWARD (inv-16, recorded not absorbed):** value.js K.W2.5 `development`-key strip;
value.js K.W3 blob delete-and-import (the cohort counterpart of AT's headline); the precepts
pin re-sync; the M-CI/DEPLOY/MEASURE spine; WAVE-C application; bbnf-lang dist-alias fossil.

**No item is left unruled** — every prompt across the arc is ADDRESSED (cite) or OPEN→AT
(folded into a named wave with a gate above).
