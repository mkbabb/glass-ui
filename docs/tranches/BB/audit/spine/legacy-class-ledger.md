# BB — the legacy-class ledger (machine-marked)

The glass-ui-SIDE record of the whole-constellation dependency-modernization plan, the planning artefact the Batch-5 adopt waves (`W-LEAF-MODERNIZE` / `W-CONSUMER-MODERNIZE` / `W-SLIDES-DRIVE`) consume. Machine-marked so `proof:constellation-spine` cross-references it clause-by-clause. The canonical per-row narrative is `BB-AMENDMENT-constellation-modernize.md §2`; this ledger is the standalone index + the HEAD status snapshot + the clause↔class map.

Content-only (inv-26 — coordination for the foreign-tree scope). No source/manifest edit lands here; the load-bearing fix is `W-SPINE-LATEST` (the hub) + the Batch-5 driven adopt (the consumers).

## The clause ↔ legacy-class cross-reference map

`proof:constellation-spine`'s eight clauses (§6) machine-lock the legacy classes below. Each clause is born-RED on the pre-bump tree, GREEN at the Batch-5 close.

| `proof:constellation-spine` clause | legacy class locked | the invariant |
|---|---|---|
| **C1** value singleton IDENTITY | CLASS 2 (broken singleton / dual install) | glass-ui value peer ⊇ kf value dep + every member admits the coherent `0.13.0` floor (pre-1.0 lockstep) |
| **C2** no `@mkbabb` multi-major `\|\|` | CLASS 1 (multi-major union) | the value `^0.13.0 \|\| ^1.0.0` pre-guard bridge is the ONLY sanctioned `\|\|` |
| **C3** no dist-tag/star/next | CLASS 4 (dist-tag / star) | no `latest`/`*`/`next` on any `@mkbabb` or shared singleton |
| **C4** no stale-lineage glass-ui cap | CLASS 3 (stale-lineage cap) | every consumer's glass-ui range admits `^4.x` |
| **C5** no ancient major | CLASS 5 (ancient major) | TS `^6` · vite `^8` · vue-tsc `^3` on every JS member |
| **C6** registry-consumer probe discipline | NEW-H + inv-11 | the `dependency-order-book.md` exists; cross-refs `W-LINEAGE-PROBE` (never re-implements the live `npm view` probe) |
| **C7** WASM-leaf caret + provenance fence | NEW-K + NEW-L | morph/csp on the family-caret arm ONLY; csp from the csc411 `wasm` crate, never `muster/csp-wasm` |
| **C8** value `^1.0.0` pre-guard | CLASS 6-adjacent (the pre-1.0 → 1.0 bridge) | the hub's value range admits `^1` so value's DECIDED 1.0.0 cut cannot re-strand |

## The six legacy classes (the §2 taxonomy)

- **CLASS 1 — MULTI-MAJOR UNION (`||`).** glass-ui peer kf `^2.2.0 || ^3.0.0 || ^4.0.0` → `^4.0.0` (**FIXED at W-SPINE-LATEST**; enables the T1 code deletion). sci-report app-local `pinia ^2.3 || ^3.0` → `^3.0` (consumer-side, BEAT 5).
- **CLASS 2 — BROKEN SINGLETON / DUAL INSTALL (the ROOT CAUSE).** glass-ui peer value `^0.10.0 || ^0.11.0` capped below kf 4.3.0's value `^0.13.0` → `^0.13.0 || ^1.0.0` (**FIXED at W-SPINE-LATEST**; the keystone). The `@vueuse/core 10.x`-via-vaul-vue dual is **KILLED at W-DRAWER-ABROGATE (Batch 4)** → full `@vueuse ^14` convergence. The parse-that dual collapses downstream of value 0.13.0.
- **CLASS 3 — STALE-LINEAGE CAP on `@mkbabb/glass-ui`.** every consumer caps glass-ui at `^3.x`/exact-3.13.0 → `^4.0.0` (BEAT 5, born-RED at HEAD — see the status table).
- **CLASS 4 — DIST-TAG / STAR.** fourier's 3 stars + pencil-boil `latest` + value.js's v-calendar `next` → caret ranges (BEAT 5 / leaf).
- **CLASS 5 — ANCIENT MAJOR.** the TS5/Vite7 trio (fourier/slides/sci-report) + playground's vite-6 (the deepest lag) + colors-TS4 (moot — RETIRED) → TS `^6`/vite `^8`/vue-tsc `^3` (BEAT 5).
- **CLASS 6 — FILE LINK.** KEEP the contract-v2 file:links (T5 decision); the ONLY action is deleting the ORPHAN keyframes.js file:link (value.js intra-repo, BEAT 1).

**The new classes** (NEW-A..NEW-Q, the cross-survey finds): the lucide-vue-next rename (fourier 35 sites + playground), the dead deps (fourier tailwind-merge + 2 peer-dupes, words/backend dead radix-vue stub), the value-api zod dual, the @types/node split-major hazard (22/24/25), the latex-paper two-dependent republish gate (NEW-O), the WASM-leaf caret arm (NEW-K), the csp divergent-publisher fence (NEW-L). Full detail in `§2` of the amendment.

## The enrolled-member HEAD status (the born-RED anchor, grounded on-disk 2026-06-16)

| member | role | glass-ui cap | spine status at HEAD | clause |
|---|---|---|---|---|
| **glass-ui** | hub | (self) | **FIXED** — kf `^4.0.0`, value `^0.13.0 \|\| ^1.0.0`, dev spine latest | C1/C2/C8 GREEN |
| keyframes.js | leaf | — | 4.3.0 deps value `^0.13.0` (coherent); `.npmrc` delete BEAT 2 | — |
| value.js | leaf | — | 0.13.0 (coherent latest); 1.0.0 DECIDED (N.W9′) | — |
| pencil-boil | leaf | — | `^0.4.1` clean; TS5→6 BEAT 0 | — |
| latex-paper | leaf | — | republish-gated (vite/katex/parse-that peers) BEAT 4 | — |
| fourier | consumer | `^3.1.0` | **RED** — stale-lineage + 3 stars + TS5/vite7 + lucide-vue-next | C4/C3/C5 |
| slides | consumer | `3.13.0` exact | **RED** — exact stale-lineage + TS5/vite7 (driven, W-SLIDES-DRIVE) | C4/C5 |
| speedtest | consumer | `^3.10.0` | **RED** — stale-lineage + the 61-site adopt | C4 |
| sci-report | consumer | `^3.12.0` | **RED** — stale-lineage + TS5/vite7 + 2 API breaks | C4/C5 |
| words/frontend | consumer | `^3.0.0` | **RED** — stale-lineage + vue-router 4→5 + latex-paper-gated | C4 |
| bbnf-lang/playground | consumer | `^3.0.0` | **RED** — the DEEPEST lag (vite 6→8) + lucide rename | C4/C5 |
| bbnf-buddy | consumer | `^3.9.0` | **RED** — stale-lineage; the SOLE morph/csp WASM validator | C4/C7 |
| morph (WASM) | wasm leaf | — | at-latest `^0.1.1` family-caret arm; no leaf edit | C7 |
| csp-solver-wasm (WASM) | wasm leaf | — | at-latest `^0.1.1`; provenance fence vs `muster/csp-wasm` | C7 |
| words/backend | independent | — | NOT enrolled; flag dead radix-vue stub for DELETE | — |
| words/notification-server | independent | — | NOT enrolled; own track | — |
| bbnf-lang/extension | independent | — | NOT enrolled; pure LSP tooling | — |

**Born-RED confirmed:** seven enrolled consumers cap glass-ui at `^3.x` (C4) + three carry TS5/Vite7 + one carries vite-6 (C5). `proof:constellation-spine` is RED at HEAD and stays RED (tagged `["local"]`) until the Batch-5 fleet adopt — the single authorized verdict-flipper — promotes it to the operative close set.

## The pre-1.0 lockstep regime (the dissolve trigger)

value.js is pre-1.0 (every minor breaking; `^0.13.0` admits 0.13.x only) — so the whole constellation moves its value.js range in LOCKSTEP per value minor. This is a PRE-1.0 regime, NOT permanent: **value.js → 1.0.0 is DECIDED** (Tranche N, N.W9′ — a stabilization semver-major, manifest+docs only, no breaking API). At the cut the family moves to `^1` broad-caret and the recurring broken-singleton class ends structurally. `proof:constellation-spine` clause 8 is glass-ui's pre-guard (the `^1.0.0` leg, live now). BB does NOT author the 1.0.0 cut (value owns its foreign tree) — it records the decision + the dissolve trigger.
