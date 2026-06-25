# BD viz — audit of THIS SESSION'S changes (the BD-union convergence) vs the new viz/dock/GPU scope

**Question:** Did the convergence work done this session (the 61-wave roster, refinements, phrasing sweeps, un-folds, gate repairs) introduce any conflict with the new viz/dock/GPU-only-no-Canvas2D mandate? Is any viz-relevant wave now STALE given the mandate?

**Headline verdict:** The convergence did NOT *introduce* a new viz conflict — it was a dedup/phrasing/sequencing pass that touched zero viz MECHANISM. But it **carried the pre-existing BB/BC fallback architecture forward unchanged and froze it into the canonical roster**, and that is the staleness: the 61-wave union has **ZERO wave that addresses the GPU-only / no-Canvas2D / no-fallback mandate**, while **four viz waves are architecturally predicated on KEEPING the WebGL2 `.frag`/`.glsl` fallback as a fence-protected permanent path** — which the new "NO fallbacks" clause directly contradicts. The conflict is real; it is pre-existing, not session-introduced; and the convergence's silence on it is the gap to close.

---

## 1. What the session actually changed (the diff, verified)

The convergence is the `docs/tranches/BD/union/` set (untracked) + an 11-file phrasing sweep on `docs/tranches/BD/waves/*.md` (`git diff HEAD`). The viz-touching changes are:

- **`BD.W-VIZ-PARITY-METAL.md` — 3 hunks, all phrasing.** Every change replaces the deferral string `"rides W-REFLECT3"` / `"rides this wave's close"` with `"is GREEN at this wave close; W-REFLECT re-confirms on the union tree"`. ZERO mechanism change: the wave still captures WGSL-primary-vs-WebGL2-`readPixels` parity, still names the `.frag`/`.glsl` fallback as the second backend, still re-points the on-disk floor at BD parity records. The viz scope of this wave is byte-untouched by the convergence.
- **`BD.W-LESSONS-BB-BC-BACKFILL.md` — same phrasing sweep** (the gestalt-first deferral-ban example string rewritten). Not viz-mechanism.
- The other 9 touched waves (CUT, DEEP-GLASS-20PX, FORMS-CARD-FOLD, GLASS-LENS-CHROMA, PAGE-*, TOC-MENU-GLASS, TOKEN-TOUR-GLASS, ARIA-ORIENTATION-GUARD) — 2-line each, the same deferral-phrasing sweep; none are viz waves.

**The roster/DAG/ledger convergence** (UNIFIED-ROSTER, EXECUTION-DAG, HARDENING-LEDGER, SEED) deduped 133 pool files → 61 canonical waves. On the viz axis it: kept `W-VIZ-PARITY-METAL` (T8), folded the viz tails into `W-VIZ-TAILS` (T9, names CURL/STROKES/KUWAHARA-MULTIPASS/SAT-SHADE/SQUIRCLE-REFRACT/BLOB-MOTION-TUNE/VIZ-COMPUTE-DENSITY/VIZ-FALLBACK-RETIRE-WATCH), hoisted the hue-histogram (`W-HUE-HISTOGRAM-HOIST`, T1), and sequenced the aurora-album band (`W-SEED-MORPH`/`W-AUR-ALBUM`/`W-AMBIENT-TINT`, T6). **No fold or sequencing decision altered a viz substrate/backend assumption.**

→ **Conclusion: the convergence introduced NO new viz conflict.** It is a dedup + deferral-phrasing pass. The mandate-conflict below is INHERITED from the BB/BC-era wave specs the convergence canonized verbatim.

---

## 2. The STALE waves — predicated on keeping the WebGL2 fallback

The mandate is "WebGPU OR WebGL2 — ZERO Canvas2D, **NO fallbacks**, no legacy." The convergence canonized four viz waves whose CORE premise is the OPPOSITE: the `.frag`/`.glsl` WebGL2 path is a *fallback net* that `proof:gpu-substrate-single` clause B **machine-BLOCKS from ever being retired**.

### 2a. `W-VIZ-FALLBACK-RETIRE-WATCH` — DIRECTLY CONTRADICTED, now stale
- **Premise:** "do NOT delete a fallback … re-affirm the fence HOLDS … the ~5-10% non-WebGPU tail has not closed … `proof:gpu-substrate-single` clause B machine-blocks a premature retirement." Its disposition is explicitly **HELD (no delete)**.
- **Conflict:** the mandate makes "NO fallbacks" the LAW. This wave exists to *keep* the fallback and *re-affirm the fence that protects it*. It is now upside-down — the trigger it waits for ("the tail closes") is superseded by a user edict that retires the *fallback layering itself* regardless of tail coverage.
- **Disposition needed:** either RETIRE the wave or INVERT it. Under the charitable reading (§4) the WebGPU↔WebGL2 GPU↔GPU pair is "two co-equal backends," not "a fallback to a lesser tier" — in which case this wave's premise survives as a **rename** ("WebGL2 backend," not "WebGL2 fallback") and clause B stays. Under the literal reading it RETIRES. The convergence made neither call — it carried the keep-the-fence wave forward as canonical.

### 2b. `W-VIZ-PARITY-METAL` — premise intact, language stale (T8 BLOCKER)
- **Premise:** capture real-GPU WGSL-primary-vs-`WebGL2 readPixels` ΔE for all 8 viz; the parity table's column header is literally `fallback .frag/.glsl`. The wave's whole purpose is proving the **two backends agree** — which is mandate-COMPATIBLE under "WebGPU OR WebGL2" (both are GPU).
- **Conflict (narrow):** the prose frames the WebGL2 path as "the fallback" throughout. If the mandate's "no fallbacks" forces a single-backend-per-device selector (literal reading), the dual-backend ΔE parity capture is partly moot (you'd only ship ONE backend, so cross-backend parity is no longer a ship-gate, only a correctness reference). Under the charitable reading the parity capture STAYS verbatim with a `fallback`→`backend` rename.
- **It is the T8 sequencing BLOCKER** for `W-GOO-SPLIT-PERF` and the cross-backend-parity tails — so a mandate decision here ripples. Convergence left it phrasing-only-touched.

### 2c. `W-VIZ-TAILS` / `W-AURORA-WGSL-CURL` / `W-AURORA-WGSL-STROKES` / `W-GOOBLOB-*` — parity-tails, fallback-assuming
- **Premise:** each closes a WGSL-vs-`.frag` PARITY gap (e.g. AURORA-WGSL-CURL adds the `warpMode==3` branch to `aurora.wgsl.ts` "so it doesn't silently degrade to fbm" — the degrade-to-the-other-backend framing). They assume BOTH a `.wgsl` primary AND a `.frag` fallback ship, and the `.frag` is the reference the WGSL must match.
- **Conflict:** if the literal "no fallbacks → single backend" reading wins, the dual-shader parity tails partly collapse (you maintain ONE shader family per viz, not a `.wgsl`+`.frag` pair). Under the charitable reading they survive intact (the `.frag` is a co-equal WebGL2 backend, parity still matters).
- Convergence folded these into one T9 `W-VIZ-TAILS` discharge row without re-examining the dual-shader premise against the mandate.

### 2d. `W-VIZ-COMPUTE-DENSITY` — explicitly "the WebGL2 fallback / low-count path is PRESERVED"
- **Premise:** the GPU compute neighbor-bin is the dense WebGPU path; "the all-pairs scan stays the WebGL2-fallback / low-count path (the graceful tail)." GATED/HELD (no trigger fired).
- **Conflict:** "the graceful tail" is fallback language the mandate purges. The wave is HELD anyway (no consumer), so the conflict is dormant — but its recorded disposition bakes the fallback-keep into the canon.

---

## 3. The Canvas2D conflict the convergence is SILENT on (the genuine new scope)

The mandate names four live Canvas2D-leaning paths to purge (confirmed live by the sibling `live-audit.md` §"Canvas2D purge targets confirmed live"): dot-flow-field (Canvas2D fallback), aurora (`getContext("2d")` software-raster ground), constellation + fourier-field (`useCanvas2D`/2D paths per inventory). **NONE of the 61 canonical waves touches any of these.** Cross-checked: the only union waves matching `canvas2d|fallback|getContext|webgl` are incidental (Safari stacking, filter floor, maps card, dock constellation). The sibling `gpu-only-conflict.md` is the deep delete/migrate map; this audit confirms the convergence did NOT add a wave to execute it — **a 62nd `[NEW]` GPU-only/Canvas2D-purge wave (or band) is owed and absent from the converged roster.** That is the convergence's load-bearing miss against the new scope.

Specifically the convergence canonized, with NO mandate-reconcile flag:
- **CLAUDE.md §"The Canvas2D substrate is single-source (BB.W-CANVAS-UNIFY)"** — documents `useCanvas2D`, which the mandate deletes. No fold/retire wave.
- **CLAUDE.md §"The software-raster guard + luminance-faithful headless fallback (BB.W-AURORA-SWRASTER)"** — the `getContext("2d")` aurora ground + `proof:aurora-swraster`; the mandate retires it. No wave. (And its raison d'être — speedtest's headless AA certification without a GPU — is a cross-repo coordination ask the convergence did NOT book.)
- **`proof:gpu-substrate-single` clause B** — the machine-block on fallback retirement; under "no fallbacks → single backend" it must INVERT or relax. The convergence's gate-repair pass left it intact.

---

## 4. The unresolved fork the convergence should have surfaced (but didn't)

The mandate "NO fallbacks" has two readings (the sibling audit §F flags the same fork) and **the convergence picked neither, freezing the ambiguity into the canon:**

- **Literal:** ONE backend per device — a pure feature-detect *selector* (no try-rebuild, no dual `setup`), OR standardize universally on WebGL2. This collapses every `.wgsl`+`.frag` pair, RETIRES the parity tails (2b/2c) and FALLBACK-RETIRE-WATCH (2a) outright, and the dual-backend ΔE capture becomes a correctness reference, not a ship-gate.
- **Charitable:** WebGPU↔WebGL2 is "two GPU backends," not "a fallback to a lesser tier." Keep `useGpuSubstrate`'s GPU↔GPU net; the forbidden fallbacks are ONLY the Canvas2D/CSS-gradient sub-GPU tiers (§3). The parity waves survive verbatim with a `fallback`→`backend` rename.

**Recommendation for the orchestrator:** the charitable reading is the architecturally-sound one (the GPU↔GPU net is genuine no-black insurance, the language is the legacy). It KEEPS `W-VIZ-PARITY-METAL` + the parity tails (with a global `fallback`→`backend` rename sweep), KEEPS clause B (re-phrased to "the WebGL2 backend bootstrap is in exactly one file"), and SCOPES the deletes to the genuine Canvas2D/CSS sub-GPU tiers (§3 + sibling §A/B/C1). Under this reading the only STALE-needs-action waves are: `W-VIZ-FALLBACK-RETIRE-WATCH` (rename or retire), the absent Canvas2D-purge wave (MINT it), and the SWRASTER cross-repo ask (BOOK it). The literal reading is heavier (collapses the whole dual-shader suite) and is likely over-reading the user's "no fallbacks" against a co-equal GPU pair.

---

## 5. Bottom line for the executor

1. **The convergence introduced no NEW viz conflict** — it was dedup + a deferral-phrasing sweep; zero viz mechanism touched.
2. **It carried 4 fallback-architecture waves forward as canonical** (FALLBACK-RETIRE-WATCH directly contradicted; PARITY-METAL + the WGSL parity tails + COMPUTE-DENSITY fallback-assuming) — STALE under the GPU-only mandate, pending the §4 reading decision.
3. **It added ZERO wave for the GPU-only/Canvas2D-purge mandate** — a 62nd `[NEW]` viz-GPU-only wave/band (executing the sibling `gpu-only-conflict.md` delete/migrate map) is OWED and absent. This is the biggest gap.
4. **The §4 literal-vs-charitable fork is unresolved in the canon** — surface it to the orchestrator before any viz wave executes; it decides whether the parity suite survives or collapses.
