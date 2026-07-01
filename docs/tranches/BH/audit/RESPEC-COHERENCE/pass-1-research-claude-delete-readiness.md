# BH COHERENCE — PASS 1 RESEARCH · LENS = CLAUDE.md DELETE READINESS (B4f)

**Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD:** `e550f1b0` (per SEED-CONTEXT) · **Pass:** 1 (baseline)
**Lens:** the absolute-last act — B4f hard-deletes `CLAUDE.md`. Does BH's B4 band reader-census + re-home plan account for ALL the gates that `readFileSync('CLAUDE.md')`-shaped content, after BG's coherence-audit G6 finding?
**Write-fence:** this report only. No src/scripts/CLAUDE.md/PLAN edits. Siblings verified intact (exit 0) at start AND end.

---

## 0. VERDICT (one line)

**The ground-truth census is 16 hard content-readers — NOT 15.** BH's `PLAN.md` B5c row already says **16** (correct). But **BG's just-folded coherence audit (`pass-3-resolve-G6.md §B5`) re-litigated it DOWN to 15**, explicitly mis-classifying `proof-handmark.mjs:249` as a SOFT (non-content) mention — and that 15-count is the census `proof:claude-deletable` (the gate BG G6 §B3-a makes the B4f pass-condition) is specced to measure. **The gap is a cross-tranche contradiction**: if `proof:claude-deletable` is built to BG-G6's 15-reader receiver-set, `proof-handmark` is omitted from the re-home roster and silently FALSE-FAILS its W6 clause the moment CLAUDE.md is deleted. The prompt's premise is CORRECT; BG's folded G6 is WRONG.

---

## 1. THE GROUND-TRUTH READER CENSUS (re-grepped fresh at HEAD, not inherited)

Scope: `scripts/proof-*.mjs` (BG's scope). A HARD reader = a call that RECEIVES `CLAUDE.md`'s CONTENT into a variable that a clause then tests. Method: enumerate EVERY read-shaped helper (`readFileSync` / `safeRead` / `read` / `readRel` / `rd`) called with a CLAUDE-bearing argument, then confirm each is content-load-bearing by reading the helper body + the downstream use.

**16 hard content-readers, 16 distinct files:**

| # | File:line | Read call | On-delete behavior | Clause | Binding? |
|---|---|---|---|---|---|
| 1 | `proof-claude-structure-sync.mjs:74` | `readFileSync(CLAUDE_MD)` | **CRASH (ENOENT)** | §Structure custom/ parse | HARD |
| 2 | `proof-doc-consistency.mjs:197` | `readFileSync(CLAUDE_MD)` | **CRASH (ENOENT)** | custom-dir + deps citations | HARD |
| 3 | `proof-accent-tone.mjs:440` | `safeRead(p.CLAUDE_MD)` | `""` → WARN-fact | A6 `inClaudeStructure` | WARN (non-binding; B5c DROPS it) |
| 4 | `proof-dock-unify.mjs:656` | `safeRead(CLAUDE_MD)` | `""` → false-fail | F5 nav-pattern canon | HARD |
| 5 | `proof-easing-primitive.mjs:365` | `safeRead(P.CLAUDE_MD)` | `""` → false-fail | W5 canon + boundary law | HARD |
| 6 | `proof-dropdown-fix.mjs:419` | `safeRead(P.CLAUDE_MD)` | `""` → false-fail | D3 `.scroll-gutter-stable` | HARD |
| 7 | `proof-phase-palette.mjs:335` | `safeRead(resolve(ROOT,"CLAUDE.md"))` | `""` → false-fail | W4 `--phase-complete-color` seam | HARD |
| 8 | `proof-split-chars.mjs:447` | `safeRead(p.CLAUDE_MD)` | `""` → false-fail | SP6 §Structure (structure-sync owns hard) | HARD (WARN-ish) |
| 9 | `proof-spa-view.mjs:299` | `safeRead(P.CLAUDE_MD)` | `""` → false-fail | W5 SpaView record | HARD |
| 10 | `proof-surface-axis.mjs:520` | `safeRead(P.CLAUDE_MD)` | `""` → false-fail | W7 doc-honesty (`<Toast/Button surface>`) | HARD |
| 11 | `proof-close-battery-parity.mjs:149` | `read("CLAUDE.md")` | `null/""` → clause-4 false-fail | clause-4 close-battery canon | HARD |
| 12 | **`proof-handmark.mjs:249`** | **`rd("CLAUDE.md")`** | **`""` → W6 false-fail** | **W6 three-register fence** | **HARD — BG MISSED** |
| 13 | `proof-on-glass-fg.mjs:399` | `read("CLAUDE.md")` | `""` → false-fail | on-glass-fg canon record | HARD |
| 14 | `proof-doc-override-idiom.mjs:113` | `read(CLAUDE)` | `null` → W3/W4 false-fail | override-idiom (→ README per B5c) | HARD |
| 15 | `proof-dock-rail-realize.mjs:258` | `readRel(CLAUDE_MD)` | `""` → R5 false-fail | R5 doc-reconcile (proof:rail3 gone) | HARD |
| 16 | `proof-readme-meta-clean.mjs:221` | `read(CLAUDE)` | `null/""` → false-fail | meta-clean (phantom/peer/luma) | HARD |

**No 17th reader.** An exhaustive `identifier(...CLAUDE...)`-form scan across all `proof-*.mjs` surfaced exactly these 16 call-sites and no other helper alias. No hard reader exists OUTSIDE `scripts/proof-*.mjs` — `scripts/lib/canon-doc.mjs`, `scripts/regen-structure.mjs`, `scripts/gates.mjs`, the lighthouse config, and `scripts/__tests__/proof-doc-consistency.test.ts` (in-memory fixtures) only MENTION the string in comments; none reads the real file.

**The string-count vs reader-count split** (BG's own taxonomy, re-confirmed): `grep -lE 'CLAUDE\.md' scripts/proof-*.mjs` = **27** files (the STRING). Of those, **16** RECEIVE content (above); the other **11** carry the string only in a comment, a `resolve(ROOT,"CLAUDE.md")` path that is never read, or a path-allowlist entry (`crossrepo-asks:56` `WAVE_BOUNDS`). BG counted the soft set as 12 because it also counted `proof-handmark` as soft — the true split is **27 = 16 hard + 11 soft**, not BG's `27 = 15 + 12`.

---

## 2. WHY BG MISSED `proof-handmark.mjs:249` (the mechanism of the error)

BG's G6 §B5 receiver-grep pattern was: `readFileSync(…CLAUDE` / `safeRead(…CLAUDE` / `read(…CLAUDE` / `const CLAUDE =`. `proof-handmark` reads via a helper named **`rd`** (`const rd = (p) => existsSync(...) ? readFileSync(...) : ""` at `:56`), called as `rd("CLAUDE.md")` at `:249`. **`rd(` matches none of BG's four enumerated patterns** — the grep was incomplete (it did not enumerate the `rd` / `readRel` short-helper aliases). So `proof-handmark` fell through to the soft bucket (it IS in BG G6 §B1's "12 SOFT" list at `pass-3-resolve-G6.md:99`).

That the read is genuinely content-load-bearing is verified on disk:
```
249: const claude = rd("CLAUDE.md");
250: const w6Recorded = /three-underline/i.test(claude) || (/HandMark/.test(claude) && /paper-ink-mark/.test(claude));
252: if (!w6Recorded) violations.push("W6: CLAUDE.md must record the three-register fence + the HandMark family");
```
The clause regex-tests the file CONTENT and pushes a HARD violation on miss. On a naive delete `rd` returns `""`, so `w6Recorded` flips `false` and W6 **falsely fails** — a silent contract loss, the exact class B4f's silent-loss fence forbids.

**The same error class self-confirms elsewhere:** `scripts/lib/canon-doc.mjs:3` — the resolver's OWN header comment — says "the **~16** CLAUDE-reading gates re-point THROUGH it." The resolver author counted 16. BG G6 §B5 dropped to 15. Ground truth is 16.

---

## 3. THE ENOENT vs FALSE-FAIL TAXONOMY (a B4f-readiness nuance both prior counts under-state)

BH's PLAN.md repeatedly says the readers "**ENOENT-break** on deletion" (`:16`). That is true for only **2 of 16** — the bare `readFileSync(CLAUDE_MD)` crashers (#1 `structure-sync:74`, #2 `doc-consistency:197`, no `existsSync`/try guard). The OTHER 14 use `existsSync`-guarded or `try/catch` helpers that return `""`/`null` and **do NOT crash** — they **silently FALSE-FAIL** their CLAUDE-asserting clause (worse, because a green-looking gate run with a red clause is the headless-green/visually-broken class, not a loud crash). The re-home plan must treat BOTH failure modes; "ENOENT-break" under-describes 14 of the 16. (BH Pass-1's own "2 ENOENT-crashers" finding — flagged in SEED-CONTEXT — maps EXACTLY to these two #1/#2; that sub-finding was correct.)

---

## 4. THE GAP IN BH's B4 PLAN (the actionable finding)

BH's `PLAN.md` is **internally correct-but-inconsistent**, and **out of sync with the just-folded BG**:

- `PLAN.md:99` (B5c) — "**The 16 CLAUDE-readers** via `canon-doc.mjs`" ✓ CORRECT.
- `bh-interleave-map.md:72` (B5c) — "**16** CLAUDE-readers" ✓ CORRECT.
- `PLAN.md:16/:28/:93` — "**~16**" (hedged with `~`; should be exact 16).
- **`BG/.../pass-3-resolve-G6.md:129-131` (§B5, FOLDED into BG at `e550f1b0`)** — "the live receiver-grep finds **15** content-readers… the B4f receiver-gate measures the **15** content-readers." ✗ WRONG (omits `proof-handmark`).

**The load-bearing conflict:** BG G6 §B3-a makes the B4f gate-condition `proof:claude-deletable` GREEN (replacing the bare `rg=0`), and §B5 specs `proof:claude-deletable` C2 to measure "the 15 content-readers." `proof:claude-deletable` does not yet exist on disk (B4f/B5c unexecuted). **If it is BUILT to BG-G6's 15-reader receiver-set, `proof-handmark` is excluded from both the C2 detector AND the B5c re-home roster** → on delete it false-fails W6 with no gate catching it (C2 doesn't look at it). This is precisely the silent-loss B4f exists to prevent, re-introduced by the census-off-by-one.

**Two things must be reconciled in the BH B4 fold (Pass-1 records; the amend pass owns the edits):**
1. **The census is 16, authoritatively.** BH B5c already says 16 — KEEP it, and de-hedge the `~16` mentions to exact 16. The 16th is NOT the `instrument-chassis` README (BG §B5's claimed delta) — that is a B4b-content authorship HOME, orthogonal to the reader set. The true 16th-vs-15 delta is `proof-handmark:249`, a genuine `rd()` content-reader.
2. **`proof:claude-deletable` C2 (the B4f gate) must enumerate the `rd`/`readRel` helper aliases**, not just `readFileSync`/`safeRead`/`read`/`const CLAUDE`. A C2 detector that inherits BG-G6's 4-pattern grep re-makes the exact blind spot that lost `proof-handmark` — the de-blinded detector must match ANY local helper that wraps `readFileSync` and receives a `CLAUDE`-bearing arg. This is the "F7 4-missed-reader correction" that BG G6 §B3-a NAMES but whose receiver-set it then under-counts.

**Adjacency confirmed (not new, but B4 must carry it):** `accent-tone` (#3) is a hard reader but a NON-binding WARN-fact (`:361` "recorded but NOT a hard violation") — B5c §3's "accent-tone DROPS the read" is correct AND it ALSO reads a deleted subpath (`src/subpaths/selectable-chip.ts`) per B2 — the dual-arm re-point B5c already flags. `doc-override-idiom` (#14) re-homes to README.md (B5c). `structure-sync` (#1) splits to generated `structure.md`. These three special-cases are already in BH's B5c text and need no new finding — only the count and the C2 detector breadth do.

---

## 5. SCOPE NOTE — the "15" that is NOT a reader count (avoid conflation)

`PLAN.md:42` and `bh-interleave-map.md:98` say "`CLAUDE.md` (**15** BG specs append)". This **15** is BG's wave-APPEND count (15 BG specs that WRITE prose INTO CLAUDE.md), a DIFFERENT axis from the reader census. The amend pass must not let the two "15"s cross-contaminate — the reader census is 16; the BG-append count is 15; both can be true. (This is itself a friction-class echo: a same-number collision across two axes is the kind of thing that produced BG-G6's off-by-one in the first place.)

---

## 6. FRICTION CLASS

This is a clean instance of **Class M / gate-vacuity-via-incomplete-detector** crossed with **Class C / clean-break-misses-a-consumer**: a re-home roster (and the gate that polices it) derived from an INCOMPLETE grep silently drops one consumer (`proof-handmark`), and the drop is invisible until the irreversible act (the delete) flips a green clause red. It RECURS — it is the SAME shape as BG-G6's own "F7 4-missed-reader correction" (which corrected a 12→16 census earlier in BG), now re-occurring one level up because the receiver-grep pattern was re-applied without enumerating the `rd`/`readRel` aliases.

---

## 7. SIBLINGS

`node scripts/verify-siblings-intact.mjs --quiet` → exit **0** at start AND end. Read-only throughout (every fact a live grep/sed/Read); the only write is this report under `docs/tranches/BH/audit/RESPEC-COHERENCE/`. No path outside `/Users/mkbabb/Programming/glass-ui` touched.
