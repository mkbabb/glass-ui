# BB — the dependency-order book (the publish beats + the cascade map)

The safe modernization sequence for the constellation: **leaves first, so consumers adopt a coherent set.** The spine of Batch C → Batch 5. Cross-referenced by `proof:constellation-spine` clause 6 (the registry-consumer probe discipline must be recorded; this book is that record). The canonical narrative is `BB-AMENDMENT-constellation-modernize.md §A4`.

Content-only (inv-26). Every irreversible registry/deploy leg is **user-domain**; the agents are read-only on git across all repos (the orchestrator owns the index).

## The beats

```
BEAT 0  (no-publish prep)      parse-that · pencil-boil(TS5→6) · colors-RETIRE · morph/csp at-latest WASM leaves   [W-LEAF-MODERNIZE prep]
BEAT 1  (leaf republish)       value.js → 0.13.x (already latest; +orphan-delete +intra-unify; 1.0.0 = N.W9′ DECIDED) [W-LEAF-MODERNIZE]
BEAT 2  (leaf republish)       keyframes.js → 4.3.x (deps value ^0.13; +.npmrc delete — AFTER BEAT 3, BINDING)        [W-LEAF-MODERNIZE]
BEAT 3  (HUB — the keystone)   glass-ui → 4.1.0 peer-widen + gate collapse/re-enumerate    [Batch C: W-SPINE-LATEST] ✅ landed at HEAD
BEAT 4  (leaf, TWO-dependent)  latex-paper → 0.2.x widened peers (gates fourier + words/frontend)                    [W-LEAF-MODERNIZE]
BEAT 5  (consumers adopt)      fourier · slides · speedtest · sci-report · words/frontend · playground · bbnf-buddy   [W-CONSUMER-MODERNIZE + W-SLIDES-DRIVE]
```

## The beats in detail

- **BEAT 0 — prep (no publish).** parse-that already `^0.9.0` everywhere (dual collapses downstream of value 0.13.0). pencil-boil TS5→6 + lockfile refresh. colors RETIRE (T6, registry 404, by-name). **morph + csp-solver-wasm: at-latest WASM leaves on the family-caret arm — NO leaf edit, NO republish** (Rust-toolchain coherence, validated through bbnf-buddy's `^0.1.1` pins; NEW-K). The csp provenance fence holds (csc411 `wasm` crate, never `muster/csp-wasm`; NEW-L).
- **BEAT 1 — value.js (leaf).** Already 0.13.0 (coherent latest). BB work: delete the orphan keyframes.js file:link; intra-repo unify; v-calendar decision; zod-4 BOOKED behind vee-validate. No new publish REQUIRED for the consumer spine.
- **BEAT 2 — keyframes.js (leaf).** Already 4.3.0 deps value `^0.13.0`. DELETE `.npmrc legacy-peer-deps` **AFTER BEAT 3 (BINDING)**: kf 4.3.0 deps value `^0.13.0`, so kf's own `npm ci` re-FAILS (ELSPROBLEMS) against glass-ui's un-widened peer until BEAT 3 lands — the `.npmrc` is the only mask, so deleting it before BEAT 3 re-breaks kf's install. Clean-caret the kf-vue peer `>=4.2.0` → `^4.0.0`.
- **BEAT 3 — glass-ui (THE HUB / keystone, W-SPINE-LATEST). ✅ LANDED at HEAD.** The load-bearing edit the whole constellation waits on. The peer-widen lands INSIDE BB and ships at the single **4.1.0** cut (NO interim 4.0.1). Per inv-11 (no out-of-band lineage publish) + the 4.0.0 lesson (the close MUST run `--run release`, not `--run local`), the publish originates from a master-ancestor commit through the gated `release.sh` path. **The user owns the irreversible 4.1.0 publish leg.**
- **BEAT 4 — latex-paper (leaf, TWO-dependent gate).** Republish 0.2.x widened peers (`vite ^6||^7` add `^8`; `katex ^0.16` add `^0.17`; `parse-that ^0.7.1` → `^0.9.0`). Gates **TWO dependents** (NEW-O): fourier (vite-8/katex-0.17/single-parse-that) AND words/frontend (vite-8/katex re-lock). After the hub, before both consumers.
- **BEAT 5 — consumers adopt** (parallelizable once BEAT 3 lands): slides (W-SLIDES-DRIVE, driven), speedtest/sci-report/fourier + the three new consumers (words/frontend, playground, bbnf-buddy) (W-CONSUMER-MODERNIZE, driven/coordinated; each publish/deploy user-domain). words/frontend + fourier are BEAT-4-gated; the others unblocked at BEAT 3.

## The cascade map

- **value 0.13.0** (BEAT 1) FORCES every consumer's direct value → `^0.13.0` + collapses the parse-that dual. value's N.W9′ 1.0.0 cut pins glass-ui `^4.0.0` (already published 4.0.0 admits it); the BB 4.1.0 fold-all is a caret re-pin value adopts for free — ALIGNED, no extra beat.
- **glass-ui peer-widen** (BEAT 3, ✅) UNBLOCKS kf's `.npmrc` delete + every consumer's value resolution (the keystone cascade).
- **latex-paper republish** (BEAT 4) UNBLOCKS TWO dependents — fourier's vite-8/katex-0.17 AND words/frontend's vite-8/katex re-lock (NEW-O, the widened blast radius).
- **morph + csp-solver-wasm**: NO cascade (Rust-toolchain coherence; validated through bbnf-buddy; no leaf edit; the provenance fence holds).
- **the @vueuse-10-via-vaul-vue dual** is KILLED at **W-DRAWER-ABROGATE (Batch 4)** — vaul-vue abrogated (re-built on reka `DialogRoot` + a `SpringProgress` snap layer), removed from package.json, dual resolves to full `@vueuse ^14`.

## The registry-consumer probe discipline (inv-11, the d6-lineage lesson made structural)

Before retiring any public symbol/subpath, the prune census probes the registry (`npm view @mkbabb/glass-ui versions/time/dist-tags`) + the known-consumer constellation; a published-but-off-mainline export forces a NAMED fold/subsume/migration line, never a silent prune. The mainline import-graph census is the FIRST consumer-truth source; the registry is the SECOND (a fork-lineage consumer is invisible to the first). `W-LINEAGE-PROBE` owns the live probe; `proof:constellation-spine` clause 6 asserts this book exists (the discipline is recorded), never re-implements it.

## The execution boundary

- **glass-ui — DIRECT** (the hub edits land directly under Batch C; the 4.1.0 publish is the user's leg).
- **slides — DRIVEN** (W-SLIDES-DRIVE, the one driven exception; the user owns publish/deploy).
- **the leaves + the other consumers — DRIVEN/COORDINATED** under the "every repo, no exceptions" authorization; each foreign-tree publish stays user-domain.
- **colors — RETIRE** (a decision, not a publish).
