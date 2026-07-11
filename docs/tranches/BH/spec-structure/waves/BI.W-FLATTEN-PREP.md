# BI.W-FLATTEN-PREP — ATOM A steps 1–2 (generator swap + golden rebaseline + 9-barrel un-mix)

> **Wave id:** `BI.W-FLATTEN-PREP` · **band:** S1 (FLATTEN — ATOM A) · **class:** `H` (device-free) · **gate:**
> `proof:css-colocation-golden` (scoped-token-SET + one-time byte rebaseline) + `proof:barrel-pure` +
> `proof:bp-lazy` + `proof:vueuse-free-root` + `profile:budget` (per-chunk basename-keyed DIFF) · **preconds:**
> BI.W-PROOF-STRUCTURE. **ATOMIC with BI.W-FLATTEN-MOVE** (they commit together as ATOM A).
>
> The config + barrel PREP that makes every subsequent move scoped-token-set-neutral. Generator-independent; no
> `.vue` template edits.

## §0 — Verdict

Two independent-of-the-physical-move prerequisites land here: the GLOBAL parent-scoped `componentIdGenerator`
swap (so the flatten's tier-elide never rotates a scope-id) and the glass-ui 9-barrel un-mix (so every `index.ts`
is a PURE re-exporter before the move relabels its path). Both are EXECUTED-proven (the generator over 6 real
builds + live dev/HMR; the un-mix via the proto-1 slider pattern). This is riskiest-wave #5 — critical path,
value.js fence — but every step has a proven prototype.

## §1 — Step 1: the GLOBAL parent-scoped generator + golden rebaseline (R6-1)

```ts
// vite.config.ts — applied UNCONDITIONALLY (dev + build), NOT gated to command === 'build'
vue({ features: { componentIdGenerator: (fp, _s, _p, h) => {
  const a = fp.split('/'); return h(a[a.length - 2] + '/' + a[a.length - 1]);
} } })
```

Key = `immediateParentDir + '/' + basename`. It DOMINATES the round-5 basename form on 4 axes (0/428 dev
collisions vs basename's 1 `Notification` pair; no naming tax; colocation-friendly generic names; simpler config)
and is move-invariant to the flatten's tier-ABOVE-family elide.

- **The golden gate's TRUE invariant is scoped-token-SET identity, NOT byte-identity** (blocker-fold #6, a
  soundness bug the swap exposed, generator-independent). The FULL flatten REORDERS the SFC-fold blocks → the
  full-byte hash of `dist/glass-ui.css` DRIFTS HEAD↔FLAT for ALL generators; the round-4 byte-identical witness
  used a minimal move that didn't perturb block order. So: assert the **scoped-token-SET** (`data-v-` ids ∪
  `@keyframes`-hash suffixes, extracted from `dist/glass-ui.css`) — IDENTICAL HEAD↔FLAT under parent-scoped (41
  distinct ids, 0 collisions) — PLUS a ONE-TIME golden BYTE rebaseline at the cut + the sorted-block
  canonicalization (sort the SFC-fold blocks before hashing → reorder-robust).
- EXECUTE the golden gate born-RED→GREEN at the cut (default@FLAT RED — token set rotates; parent@FLAT GREEN once
  rebaselined). Run the `vite dev` HMR smoke (confirmed passing round-6: editing a `<style scoped>` fires a STYLE
  hot-update, not a reload). Run the parentDir/basename-key uniqueness arm over the GLOBAL 428 src+demo surface
  (0 today). `demo/vite.demo-dist.config.ts` may stay bare `vue()`.
- **The non-scoped-global-block disjointness is BI.W-BLOCK-DISJOINT's** (S4) — the golden gate's blind spot; this
  wave lands the golden gate, that wave adds the disjointness arm.

## §2 — Step 2: the 9-barrel un-mix (the own-runtime-sibling rule)

Un-mix glass-ui's NINE mixed barrels — every `index.ts` becomes PURE RE-EXPORT-ONLY (#21966 disqualification +
colocation clarity). The own-runtime export moves to a purpose-named SIBLING named by its KIND, re-exported via
`export * from './<sibling>'`:

- **8 CVA barrels** (alert/avatar/badge/button/sheet/slider/toggle + custom/toggle-chip) → `variants.ts`.
- **`composables/color/index.ts`** (own = 9 value.js-backed fns + 2 `useAccentTone` re-exports; ALSO the `/color`
  subpath entry) → **`composables/color/runtime.ts`** — the FE own-runtime FALLBACK kind-name (blocker-fold #8:
  renamed off `core.ts`, which collided with the BE infra-ring `core/` DIR under edict 1; `runtime.ts` FILE and
  `core/` DIR are now disjoint on disk).

The **MINIMAL barrel-preserved form is CHOSEN** (§3 step 2): same-family SFCs keep `import from '.'`; ZERO `.vue`
edits; generator-independent. The `index.ts ↔ SFC` cycle stays intact (pure re-exporter, but ZERO measured DCE —
CLARITY-justified, NOT a proven DCE win; the DCE-OPTIMAL cycle-break is BOOKED to the deferred barrel-discipline
pass R6-4, out of this cut).

- **The barrel-reader re-point clause** (blocker-fold #4, symmetric to CSS B2). The un-mix MOVES each own-runtime
  export out of `index.ts` → EVERY gate parsing a moved export by `readFileSync`+regex born-REDs at the cut and
  MUST re-point. Live witnesses: `proof-slider-two-only.mjs` (`INDEX` const + `parseVariantKeys` reads the CVA
  `variant:{}` out of `slider/index.ts`) → re-point to `slider/variants.ts`; `proof-tabs-std.mjs` reads `variant`
  out of the tabs barrel → re-point. ENUMERATE each `index.ts`-own-runtime-reader gate; assert its read follows
  `index.ts → variants.ts`/`runtime.ts`.
- **The value.js fence — the color un-mix is the ONE case with graph impact** (+1 JS chunk, 190→191).
  `composables/color` is the value.js color-math leaf three gates fence off the eager first-paint path. So the
  close carries `proof:bp-lazy` (border-progress reaches color-core ONLY via a dynamic `import("./spectrum-walk")`
  — NOT a static reach) + `proof:vueuse-free-root` + `profile:budget` (critical-path arm, re-run as a per-chunk
  BASENAME-keyed DIFF isolating the un-mix delta against the pre-existing HEAD red, NOT an absolute pass). The 8
  CVA un-mixes are chunk-neutral (190→190). CSS golden token-set identical across all forms.

## §3 — Binding criteria (born-RED → GREEN)

- `proof:barrel-pure` GREEN (0 mixed barrels; the un-mix landed). Born-RED at 9.
- `proof:css-colocation-golden` GREEN on the parent-scoped token set (rebaselined). Born-RED (token set rotates
  @flat under the default generator).
- `proof:bp-lazy` + `proof:vueuse-free-root` GREEN; `profile:budget` per-chunk basename-keyed DIFF shows ONLY the
  +1 color chunk (no other regression). *(Caveat: `profile:budget` is ALREADY RED at HEAD on PRE-EXISTING causes
  — goo-blob ceiling + stale AP D5 baseline — owned by the BG close; the DIFF isolates the un-mix delta.)*
- The barrel-reader gates (`proof-slider-two-only`, `proof-tabs-std`, + any enumerated sibling) GREEN after
  re-point.

## §4 — Fences

- ZERO `.vue` template edits (the minimal barrel-preserved form). ZERO physical family move (that is
  BI.W-FLATTEN-MOVE, atomic with this).
- The `<style>` blocks are UNTOUCHED (step 2 moves only own-runtime `.ts` exports).
- The DCE-OPTIMAL cycle-break (SFC → `./variants` direct) is NOT done here — booked to R6-4 where positive
  pure-barrel DCE is MEASURED first.
- The first post-flatten build is a COLD-CACHE event (one-time ~4s vue-tsc dts penalty; vite dep-optimize; the
  golden gate) — a one-time cost, recorded, NOT a regression.

## §5 — Cross-refs

R6-1 (parent-scoped generator SWAP); blocker-folds #4 (barrel-reader re-point), #6 (golden invariant), #8
(runtime.ts); §2.1 (own-runtime-sibling rule); §3 ATOM-A steps 1–2; §7 chunk-graph churn.
