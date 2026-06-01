# AP.W4 — false-witness coda + hygiene

The cheap tail of AO's self-measurement-truth thesis, plus the stray-tree clearance. Two of the
gates AP touched were lying; W4 makes them honest. All gates verified.

## 1. proof scan-scope — `ignoredDirs += .claude`/`worktrees` + the comment-stripping false-witness fix

`proof-consumers-static.mjs` walked the sibling consumer trees and lint-flagged abandoned
`speedtest/.claude/worktrees/agent-*/` checkouts as live consumer source. Adding `.claude` +
`worktrees` to `ignoredDirs` dropped the count from **212 → 3** (the speedtest sibling had
accumulated 38 stale `agent-*` worktrees since the GAMMA-era 78; 209 were stale-worktree noise).

The 3 RESIDUAL were a SECOND, deeper false witness the W1 design did not anticipate: the CSS-directive
scan (`@import`/`@source` matchAll over whole-file source) flagged directives that live inside
COMMENTS — `speedtest:src/fonts/loadFonts.ts:13` (a JSDoc block documenting "re-adding
`@import …/styles/fonts` would recreate the regression"), `styles/style.css:10` + `:23` (CSS
`/* */` blocks documenting the retired double-import + the pre-AH.W5 `@source` escape). A gate that
flags a directive a consumer wrote in PROSE to document a retired pattern is lying — exactly the
class W4 exists to fix.

**The honest fix (glass-ui-domain):** a source-aware `stripComments()` blanks comment bodies (with
spaces, newlines + length preserved so match positions + line numbers stay exact) before the
CSS-directive scan. It is a full lexical state machine — `code` / `line` / `block` / string
(`'…'`/`"…"`/`` `…` ``) / `regex` (`/…/`) — so `//` and `/* */` inside a string OR a regex literal
are NOT treated as comments, and a regex-internal quote does not open a phantom string state. (The
`regex` state was added at the AP+I cross-tranche verification, which surfaced a LATENT gap: the
original code/line/block/string machine carried no regex state, so a regex bearing `//` could swallow
a same-line live `@source` and a regex bearing a quote could leak a next-line commented `@import`. No
consumer file at HEAD triggered either, but the machine now closes the class.) The import-declaration
scan was already comment-safe (its per-line guard skips lines that do not start with `import`). After
the fix: `proof:consumers:static` exits 0 — the live consumer trees ARE clean (the only "violations"
were the gate mis-reading prose). Zero signal loss: a LIVE directive (outside a comment, a string, or
a regex) still fails the gate; CI never sees the siblings via the `existsSync` guard.

## 2. D5 self-erasing-baseline split

The D5 per-subpath drift gate read its baseline from the SAME path it overwrote each run, so every
run clobbered the baseline it just gated against — drift was structurally always ~0%. Split:
`profile-bundle.mjs` now READS a committed `docs/tranches/AP/W4-bundle-profile.baseline.json`
(`GLASS_UI_BUNDLE_BASELINE`-overridable), and ONLY a deliberate `--rebaseline` flag updates it; the
ephemeral per-run profile keeps writing its own artifact (not gated against). The W2-era CSS-ceiling
logic is untouched.

**Stability proven:** the committed baseline's SHA-256 (`7777bbf5…`) is identical across the seed +
3 consecutive `profile:budget` runs — no self-erase. The new `dist/motion-core.js` (2170 gz) is
seeded onto the baseline, so it gates `[PASS] drift +0.0%` rather than the prior informational
`[NEW]`.

## 3. Stray cleanup + `.gitignore`

Deleted the 10 untracked root scratch files (8 jpegs: `ao-gamma-demo.jpeg` + 7 `muster-*`
screenshots; `build_time.txt` + `emit_time.txt`, the `/usr/bin/time` RSS captures from the AO
heap-prefix probe). Added a `.gitignore` pattern (`*.jpeg` / `*.jpg` / `*_time.txt`) so audit /
profiling scratch never re-collects at root (verified: a re-emitted `*_time.txt` stays
untracked-and-ignored).

## 4. keyframes.js pin reconcile

`package.json` carried two `@mkbabb/keyframes.js` floors — `^2.0.0` (peerDependencies) + `^2.1.1`
(devDependencies). Converged the stale `^2.0.0` → `^2.1.1`; both now read the single honest floor.
Installed 2.1.1 satisfies; `typecheck` exit 0 under it. The `exports`/`typesVersions` stanzas
(W3's `/motion-core`) untouched.

## 5. CLAUDE.md §Build + the cherry-pick-count reconcile

§Build confirmed already clean on-disk (no residual `8 GB`/`api-extractor`/heap-prefix prose; matches
the real `vite build && vue-tsc --project tsconfig.build.json` toolchain). The cherry-pick count:
EMPIRICALLY 7 custom packages re-exported by `src/index.ts` — `instrument-chassis`,
`instrument-rail`, `glyph-face`, `disco-glyph`, `hover-popover`, `configurator`, `scrolling-text`
(33 total custom dirs → 26 subpath-only). Reconciled the stale prose: `src/index.ts` header
(6 → 7, added `instrument-rail`, fixed the excluded count 23 → 26); `CLAUDE.md` (swapped the stale
`dock-group` → `instrument-rail` in the cherry-pick LIST, 24 → 26 remaining). The named list was
WRONG in the prose — it listed `dock-group` (which is a subpath-only package), not the actual
seventh member `instrument-rail`.

## 6. Handoff record reconcile (the zero-deferral repair, documented)

`docs/tranches/AO/CONSUMER-REQUEST-speedtest-AQ.md` updated "The five" → "The seven" with the R0G-6
(dock 44px floor) + R0G-7 (motion barrel split) rows — the two items AO under-folded that AP.W3
delivered. The handoff record now matches what the constellation shipped (closing the P-inv-28 paper
trail).

## Gate matrix

| Gate | Status | Evidence |
|---|---|---|
| `proof:consumers:static` exit 0 locally | MET | 212 → 0 (ignoredDirs + comment-stripping, incl. the AP+I regex-state hardening); live trees clean; zero signal loss |
| D5 baseline stable across runs (no self-erase) | MET | committed baseline SHA `7777bbf5…` identical across seed + 3 runs; `--rebaseline` the only writer |
| `git status` clean of strays; `.gitignore` carries the pattern | MET | 10 strays deleted; re-emitted scratch stays ignored |
| `package.json` single converged keyframes floor; `typecheck` 0 | MET | both `^2.1.1`; typecheck exit 0 |
| CLAUDE.md §Build current; cherry-pick count 7 everywhere | MET | §Build clean on-disk; count + named list reconciled to the empirical 7 in `src/index.ts` + CLAUDE.md |

## Note for W5

The `docs/precepts` submodule is dirty (working-tree-only, no gitlink drift) — USER-DOMAIN, recorded
in the cross-repo perimeter, not absorbed.
