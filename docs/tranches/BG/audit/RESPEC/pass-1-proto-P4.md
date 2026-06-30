# PASS-1 PROTOTYPE-AUGMENTED SPEC — P4: BH CLAUDE.md-delete de-risk

**Item:** "BH CLAUDE.md-delete de-risk: reader re-census + content-real `auditCanonHomes`"
**Pass:** 1 · **Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD:** `9dfe285c`
**Author fence:** read-mostly. This agent verified findings on disk; it wrote ONLY this spec under `docs/tranches/BG/audit/RESPEC/`. No `src/demo/styles/scripts` edits. `verify-siblings-intact --quiet` = exit 0.

**Feasibility verdict: FEASIBLE (high confidence).** Every mechanism the de-risk needs already exists at HEAD (the `canon-doc.mjs` seam, `readCanon` strict/soft modes, `regen-structure.mjs` already targets `docs/canon/structure.md`, the colocated-README pattern). The census is now EXACT, the content-real `auditCanonHomes` is a small additive change (a `CANON_TOKENS` manifest + a per-token check), the instrument-chassis README is a ~60-line authoring task, and the B4f gate is a standard pure-detector gate. The chain B4b-content → `auditCanonHomes` GREEN → B5c re-point → `rg=0` → B4f delete is buildable and provably ordered.

**The headline correction to the plan: the census is not just stale — the de-risk mechanism is UNWIRED.** `auditCanonHomes()` is exported from `scripts/lib/canon-doc.mjs` but **NO registered gate imports or calls it** (verified: `rg "from.*canon-doc" scripts/*.mjs` → zero importers; `gates.mjs` matches only on note prose). So "RED at HEAD" is true only in the sense that *calling* it returns `[{instrument-chassis}]` — but nothing calls it, so it REDs no close today. The de-risk must (a) make it content-real AND (b) WIRE it to a registered born-RED gate. Existence-only was the spec's complaint; **un-wired entirely** is the real state.

---

## 0. Verified ground truth (this agent's own disk checks at HEAD)

| Check | Command | Result |
|---|---|---|
| siblings intact | `node scripts/verify-siblings-intact.mjs --quiet` | exit 0 |
| `auditCanonHomes()` live | `node -e 'import auditCanonHomes'` | **1 missing: `component:instrument-chassis` → `src/.../instrument-chassis/README.md`** (dangling CANON_HOMES key) |
| `CANON_HOMES` size | same | **15 keys** (9 cross-cutting + readme + 5 component READMEs) |
| canon-doc consumers | `rg "from.*canon-doc" scripts` | **0 — `auditCanonHomes` is an UNWIRED dead export** |
| component READMEs | `ls src/components/custom/*/README.md` | dock(326L) easing(75L) handmark(75L) spa-view(59L) present; **instrument-chassis ABSENT** |
| docs/canon stubs | `ls docs/canon/` | all 9 present but **tiny skeletons** (604–2555 B; `existsSync` greens on them — the existence-only hole) |
| structure home generator | `scripts/regen-structure.mjs` | already targets `docs/canon/structure.md` (`--write`/`--check`), NOT CLAUDE.md — the generated home is correctly wired |

---

## 1. THE EXACT READER CENSUS (re-census, the plan's "16" reconciled)

Method: `rg -l 'CLAUDE\.md' scripts`, then for each candidate inspected the actual read site (`readFileSync`/`safeRead`/`read(...)`/`rd(...)`) AND its assertion behaviour. The plan's bare "16 readers" conflated three behaviourally-distinct classes. **The number that matters for the irreversible delete is not the count of files that mention CLAUDE.md — it is the count of gates that RED or THROW when CLAUDE.md content vanishes.**

### 1a. PRESENCE-ASSERTING HARD readers — RED or THROW on delete (the dangerous set: **14**)

These push a `violations.push(...)` (or THROW ENOENT) when a REQUIRED token is absent. After B4f deletes CLAUDE.md → empty/absent content → required token missing → the close breaks. **Every one must be re-pointed at B5c BEFORE B4f.**

| # | gate script | read site | what it asserts in CLAUDE.md | delete behaviour | re-home target |
|---|---|---|---|---|---|
| 1 | `proof-claude-structure-sync.mjs` | `:74 readFileSync(CLAUDE_MD)` **no fallback** | §Structure custom/ui/composable tree ≡ disk | **THROWS ENOENT (crashes the gate)** | `readCanon("structure")` — the GENERATED `docs/canon/structure.md` (already emitted by `regen-structure.mjs`) |
| 2 | `proof-doc-consistency.mjs` | `:197 readFileSync(CLAUDE_MD)` **no fallback** | custom-dir citations + Dependencies-table citations resolve | **THROWS ENOENT (crashes the gate)** | `readCanon("structure")` (dir tree) + `readCanon("dependencies")` (deps table) |
| 3 | `proof-close-battery-parity.mjs` | `:149 read("CLAUDE.md") ?? ""` | `--run full` close-battery rule recorded (`claudeCanon`) | RED (`claudeCanon` false → clause-4 violation) | `readCanon("build-and-gates")` |
| 4 | `proof-doc-override-idiom.mjs` | `:113 read(CLAUDE)` | the override-the-`--glass-blur-resting-radius`-PRIMITIVE consumer canon (W3/W4) | RED (W4 canon-absent) | `readCanon("consumer-wiring")` |
| 5 | `proof-dock-unify.mjs` | `:656 safeRead(CLAUDE_MD)` | F5 nav-pattern contract (home-left `#persistent` + `<DockSeparator>` + collapsed-floor tokens + glass-first active register) | RED (F5 three sub-violations) | `readCanon("component:dock")` |
| 6 | `proof-dropdown-fix.mjs` | `:419 safeRead(P.CLAUDE_MD)` | D3 `.scroll-gutter-stable` / `scrollbar-gutter: stable` consumer discipline | RED (D3 canon-note-absent) | `readCanon("consumer-wiring")` |
| 7 | `proof-easing-primitive.mjs` | `:365 safeRead(P.CLAUDE_MD)` | W5 `EasingPicker` + `/easing` + boundary law (value.js/keyframes.js) | RED (W5 claudeNamesPicker false) | `readCanon("component:easing")` (boundary law ALREADY in that README) |
| 8 | `proof-handmark.mjs` | `:249 rd("CLAUDE.md")` | W6 three-register fence (`three-underline` OR `HandMark`+`paper-ink-mark`) | RED (W6 claudeRecorded false) | `readCanon("component:handmark")` |
| 9 | `proof-on-glass-fg.mjs` | `:399 read("CLAUDE.md")` (fed to detector → `.test(claudeMd)`) | W4 the on-glass foreground family canon | RED (W4) — and `read()` may return `undefined` → `.test(undefined)` coerces to "undefined" (silent vacuous) | `readCanon("glass-system")` |
| 10 | `proof-phase-palette.mjs` | `:335 safeRead(resolve(ROOT,"CLAUDE.md"))` | W4 `--phase-complete-color` AND `InstrumentChassis phase canon` (BOTH tokens) | RED (W4 claudeRecordsSeam false) | `readCanon("component:instrument-chassis")` — **the README this spec authors (§3)** |
| 11 | `proof-readme-meta-clean.mjs` | `:221 read(CLAUDE) ?? ""` | phantom-name negatives (`useDockTransition`/`proof:glass-one-model`/`useSpringOrchestrator`) + **positive** `@mkbabb/keyframes.js ^5.0.0` peer line + luma-RESERVE sentinel | **RED** — the keyframes-peer is a POSITIVE assert: `""` → not found → violation | `readCanon("dependencies")` (peer line) + scan the canon-home set for the phantom negatives (§2 note) |
| 12 | `proof-spa-view.mjs` | `:299 safeRead(P.CLAUDE_MD)` | W5 `SpaView` + `spa-view` recorded | RED (W5 claudeNamesComponent false) | `readCanon("component:spa-view")` (ALREADY in that README) |
| 13 | `proof-split-chars.mjs` | `:447 safeRead(p.CLAUDE_MD)` | SP6 split-chars dir enumerated in §Structure | RED (`:309 if (!inClaudeStructure) violations.push`) | `readCanon("structure")` |
| 14 | `proof-surface-axis.mjs` | `:520 safeRead(P.CLAUDE_MD)` | W7 `<Toast surface=…>` + `<Button surface=…>` doc-honest examples | RED (W7 `!toastDocHonest`/`!buttonDocHonest`) | `readCanon("glass-system")` |

**Two of the 14 are THROW-on-ENOENT (`readFileSync` with no fallback), not RED — they CRASH the gate.** `proof-claude-structure-sync` (#1) and `proof-doc-consistency` (#2). A crashed gate is worse than a RED gate (the JSON artifact never writes; the harness mis-reads). These two are also the gates whose ENTIRE PURPOSE is CLAUDE.md — they do not "re-home a contract", they **re-target to the generated/derived home**: structure-sync → `docs/canon/structure.md` (already generated), doc-consistency → structure.md + dependencies.md. They must additionally swap `readFileSync` → `readCanon(key)` (strict) so a future absent home REDs loud instead of crashing.

### 1b. NEGATIVE-asserting HARD reader — passes vacuously on delete (**1**, re-point for cleanliness)

| gate | read site | assert | delete behaviour |
|---|---|---|---|
| `proof-dock-rail-realize.mjs` | `:258 readRel(CLAUDE_MD)` | R5: CLAUDE.md does **not** reference the deleted `proof:rail3` / `tests-visual/rail3.spec.ts` | PASSES (empty → forbidden token absent → green). Safe, but it still reads a vanished file → re-point R5 to scan the canon-home set for the forbidden names. |

### 1c. SOFT reader — WARN-degrade, never a violation (**1**)

| gate | read site | behaviour |
|---|---|---|
| `proof-accent-tone.mjs` | `:440 safeRead(p.CLAUDE_MD)` | `inClaudeStructure` is "recorded but NOT a hard violation here" (explicit comment `:361`; `proof:claude-structure-sync` owns the hard assert). Re-point to `readCanon("structure", "soft")` — the soft mode `canon-doc.mjs` already ships precisely for this WARN-degrade reader. |

### 1d. Edge cases that touch the `"CLAUDE.md"` literal but are NOT content reads (**2** — must still be handled at B4f)

| file | site | nature | B5c/B4f action |
|---|---|---|---|
| `proof-expandable-part.mjs` | `:66 CLAUDE_MD: resolve(ROOT,"CLAUDE.md")` | **DEAD path constant** — defined in the paths object, NEVER read (no `safeRead(P.CLAUDE_MD)`, no `sources.claudeMd`). A latent unused entry. | delete the dead key (cleanliness); harmless if left, but it is a `rg`-census false-positive — the B4f gate's reader-census regex must distinguish a *read* from a *defined-but-unread path* (§4 spec handles this). |
| `proof-crossrepo-asks.mjs` | `:56 "CLAUDE.md"` in `WAVE_BOUNDS` | a touch-allowed-path list (the fence asserts no edit escapes the bounds), NOT a read | re-point the bound to the canon homes the asks redistribute to, OR drop it. If left, the bound names a vanished path — harmless to the fence (it only forbids `../` escapes) but stale. NOTE in the B4f checklist. |

### 1e. Comment/prose-only mentions — do NOT read (no action needed)

`gates.mjs` (note strings only), `proof-storybook-meta.mjs`, `proof-page-chassis.mjs`, `proof-page-hierarchy.mjs`, `proof-peer-optional.mjs`, `proof-spring-tokens-synced.mjs`, `proof-visual-runner.mjs`, `proof-viz-configurator-suite.mjs`, `proof-bc-fold-ledger.mjs`, `proof-scroll-trigger.mjs`, `regen-structure.mjs` (comment), and the `wf-*.js` agent-prompt strings (`wf-ba-fleet`, `wf-ay-*`, `wf-az-*`). These reference CLAUDE.md in prose/prompts; none `readFileSync` it for an assertion. (The `wf-*.js` prompts are dev-time orchestration scaffolds — they tell *agents* to read CLAUDE.md; after delete those prompts should point agents at `docs/canon/` + `docs/design/`, but that is a prompt-freshen, not a gate-close blocker.)

### 1f. Census reconciliation (closing the "16 vs ~18" gap)

| classification | count | gate-close relevance |
|---|---|---|
| **Presence-asserting HARD (RED/THROW on delete)** | **14** | **THE de-risk set** — every one re-pointed at B5c or the close breaks after delete |
| ↳ of which THROW-on-ENOENT (crash, not RED) | 2 | re-target + swap `readFileSync`→`readCanon` |
| Negative HARD (passes vacuously, still reads) | 1 | re-point for cleanliness |
| Soft WARN-degrade | 1 | re-point to `readCanon(...,"soft")` |
| **content-readers total** | **16** | the plan's "16" lands here — but it counted *files that read*, not the *14 that gate* |
| Dead path constant (defined-unread) | 1 | the `rg`-census false-positive the B4f regex must exclude |
| WAVE_BOUNDS touch-list (not a read) | 1 | re-point/drop the stale bound |
| **files touching the literal (non-prose)** | **18** | the plan's "~18" lands here |

**Verdict: both plan figures are partially right and dangerously ambiguous.** "16" = content-readers; "~18" = files touching the literal. Neither is the load-bearing number, which is **14 presence-asserting gates** (2 of them ENOENT-crashers). The de-risk re-census REPLACES the bare count with the §1a table — an exact per-reader re-home mapping. An undercount of 2 (the plan's risk) is exactly the THROW-on-ENOENT pair (#1, #2): if B5c re-points the 12 RED-ers but forgets the 2 crashers, the close does not just RED — it **crashes mid-battery after CLAUDE.md is gone**, with no JSON artifact, the worst failure mode.

---

## 2. CONTENT-REAL `auditCanonHomes` — the spec + sample code

**Defect at HEAD (two-fold):** (a) `auditCanonHomes` checks `existsSync` only — it greens on a 600-byte empty stub (the existence-only hole); (b) it is **unwired** — no gate calls it, so even the dangling instrument-chassis key REDs nothing. **Fix: make it content-real (non-empty + the contract token its re-pointing gate will assert is present) AND wire it to a born-RED close gate (§4).**

The mechanism is a per-key `CANON_TOKENS` manifest — the SAME tokens the §1a re-homed gates assert, declared ONCE beside `CANON_HOMES` so the home-audit and the gate-assert can never drift. A half-migrated home (authored-but-empty, or authored-but-missing-the-contract-token) REDs at the close BEFORE any individual gate re-points — the anti-evasion floor (a canon home that exists but does not yet carry its contract is the close-class lie the whole BH doc-migration kills).

### 2a. `scripts/lib/canon-doc.mjs` — additive change (sample code, drop-in)

```js
// ── The per-home contract-token manifest. Each value is the token(s) the
//    re-pointed gate(s) assert in that home — declared ONCE so the home-audit
//    and the gate-assert cannot drift. A RegExp[] is AND-joined (every pattern
//    must match). Keys MUST be a subset of CANON_HOMES; canonTokensSound() locks
//    the 1:1 below. ──
export const CANON_TOKENS = Object.freeze({
    structure: [/##\s+src\/components\/custom/, /\bui\//],          // proof:claude-structure-sync / split-chars / accent-tone(soft) / doc-consistency
    dependencies: [/@mkbabb\/keyframes\.js/, /\^5\.0\.0/],          // proof:readme-meta-clean / doc-consistency
    "build-and-gates": [/--run full/, /close.?battery|local ?∪ ?ci ?∪ ?release/i], // proof:close-battery-parity
    conventions: [/color-mix\(in srgb/, /verbatimModuleSyntax/],    // (conventions cluster — pick stable anchors)
    "design-axes": [/[Tt]oken-first/, /visual-load-bearing/i],
    "glass-system": [/--glass-level/, /--on-glass-muted/, /surface\s*=\s*["']?(glass|veil|opaque)/], // proof:on-glass-fg / surface-axis
    "motion-system": [/spring-iff-spatial|--spring-(smooth|snappy|bouncy)/],
    "consumer-wiring": [/--glass-blur-resting-radius/, /scroll-gutter-stable/, /scrollbar-gutter:\s*stable/], // proof:doc-override-idiom / dropdown-fix
    "exports-subpaths": [/@mkbabb\/glass-ui\/\w/],
    readme: [/@mkbabb\/glass-ui/],
    "component:dock": [/#persistent/, /DockSeparator/],             // proof:dock-unify F5
    "component:easing": [/EasingPicker/, /boundary law/i, /value\.?js/i, /keyframes\.?js/i], // proof:easing-primitive W5
    "component:handmark": [/three-underline|(?=[\s\S]*HandMark)[\s\S]*paper-ink-mark/i], // proof:handmark W6
    "component:spa-view": [/SpaView/, /spa-view/],                  // proof:spa-view W5
    "component:instrument-chassis": [/--phase-complete-color/, /InstrumentChassis phase canon/], // proof:phase-palette W4
});

/**
 * Content-real audit. A home is SOUND iff: present AND non-trivial (≥ MIN_BYTES
 * of non-whitespace) AND every CANON_TOKENS pattern for its key matches. Returns
 * the list of { key, rel, reason } for every UNSOUND home (empty = all sound).
 * reason ∈ {"absent","empty","missing-token:<src>"}.
 */
const MIN_CANON_BYTES = 200; // a real contract paragraph, not a one-line stub
export function auditCanonHomes() {
    const out = [];
    for (const [key, rel] of Object.entries(CANON_HOMES)) {
        const abs = resolve(ROOT, rel);
        if (!existsSync(abs)) { out.push({ key, rel, reason: "absent" }); continue; }
        const body = readFileSync(abs, "utf8");
        if (body.replace(/\s+/g, "").length < MIN_CANON_BYTES) { out.push({ key, rel, reason: "empty" }); continue; }
        const toks = CANON_TOKENS[key] ?? [];
        for (const re of toks) {
            if (!re.test(body)) { out.push({ key, rel, reason: `missing-token:${re.source.slice(0, 40)}` }); break; }
        }
    }
    return out;
}

/** Soundness lock — every CANON_HOMES key has a CANON_TOKENS entry (no silent token-less home). */
export function canonTokensSound() {
    const homes = Object.keys(CANON_HOMES);
    const toks = Object.keys(CANON_TOKENS);
    const missing = homes.filter((k) => !toks.includes(k));
    const extra = toks.filter((k) => !homes.includes(k));
    return { ok: missing.length === 0 && extra.length === 0, missing, extra };
}
```

**Migration sequencing the manifest enables (the load-bearing property):** while CLAUDE.md is still the live source (pre-B4b-content), the canon stubs do NOT yet carry the tokens → `auditCanonHomes()` returns ~14 `missing-token` rows → the B4f gate (§4) is **born-RED**. As B4b-content redistributes each contract paragraph into its home, that home's row clears. When the LAST home carries its token, `auditCanonHomes() === []` → the gate's content-leg goes GREEN → B5c may re-point + B4f may delete. The manifest IS the B4b-content completion oracle — "~15% done" becomes a measurable `14 → 0` drain, not a vibe.

### 2b. Worked example — the manifest's `missing-token` is non-vacuous

Two of the five component homes ALREADY carry their tokens at HEAD (verified): `component:easing` (the easing README carries "boundary law", "value.js", "keyframes.js"), `component:spa-view` (carries "SpaView", "spa-view"). The other three (`dock`, `handmark`, `instrument-chassis`) — dock README is 326L (likely carries `#persistent`/`DockSeparator`; verify at B4b-content), handmark is 75L (verify `paper-ink-mark`), **instrument-chassis is ABSENT** → §3 authors it. The 9 cross-cutting homes are all stubs missing their tokens → the `14 → 0` drain is real, observable today.

---

## 3. THE PROOF-OF-PATTERN — `src/components/custom/instrument-chassis/README.md`

This README closes the ONE dangling `CANON_HOMES` key AND is the re-home target for `proof:phase-palette` W4 (which asserts `--phase-complete-color` AND `InstrumentChassis phase canon` — both tokens are present below, verified against the gate at `proof-phase-palette.mjs:199-200`). It mirrors the colocated-README shape of `spa-view/README.md` + `easing/README.md` (title → one-line subpath+wave → fenced usage → mechanism sections → props/exports → consumers). **This agent cannot write under `src/` (read-mostly fence) — the exact authored content is below, ready to drop in at B4b-content / the dedicated instrument-chassis canon wave.**

> File to author: `src/components/custom/instrument-chassis/README.md`

```markdown
# InstrumentChassis

The bezel-and-groove instrument-panel chassis (`@mkbabb/glass-ui/instrument-chassis`)
— a sectioning landmark for metric/gauge surfaces with a twin-line groove divider
(`<ChassisDivider>`, the AI.W1-γ rename of the former `RegionDivider`) and a
phase-driven status register. `InstrumentChassis` + `ChassisDivider` ship from
`index.ts`; the `InstrumentChassisPhase` / `InstrumentChassisVariant` types publish
to `@mkbabb/glass-ui/api`.

```vue
<InstrumentChassis :phase="phase">
    <MeterCanvas />
    <ChassisDivider />
    <Readout :value="v" />
</InstrumentChassis>
```

## InstrumentChassis phase canon

The `InstrumentChassisPhase` union is `ready | ping | download | upload | jitter |
complete`. `"ping"` is the canonical generic-active phase — a consumer maps any
active-but-unspecialised state (scoring, validating, processing) onto `"ping"`;
the union carries NO per-domain `"scoring"` member (a speculative member with no
consumer would be overfit substrate).

The four active arms (`ping`/`download`/`upload`/`jitter`) read a
consumer-registerable `--chart-{phase}` with a `--viz-*` library fallback, so the
bus carries phase IDENTITY. The `complete` phase resolves **`--phase-complete-color`**
(default `var(--color-gold)`) + its WCAG twin `--phase-complete-color-label` (paired
1:1). Gold is EARNED at completion — it is a CONSUMER choice, NOT a hardcoded brand
metal leaking onto every completion: the `[data-phase="complete"]` arm reads ONLY
`var(--phase-complete-color)`, and the gold lives ONLY in the token's DEFAULT at the
chassis root (`--phase-complete-color: var(--color-gold)`). An un-overriding consumer
paints byte-identical gold (the back-compat floor); a consumer (or any ancestor)
overrides EITHER `--phase-complete-color` or `--phase-complete-color-label` to re-ink
completion via inheritance — no library edit. This is a clean break with a back-compat
DEFAULT, never a back-compat alias.

The `--phase-tint-amount` warmth ramp is orthogonal to the ink and stays on the arm.

## The structure variant — the silver cool-metal twin

`<InstrumentChassis variant="structure">` is W-NO-GRAY's ONE sanctioned cool-neutral
exception — the silver structure quad (`--silver`/`-light`/`-dark`/`-deep`), the cool
mirror of the warm-gold `complete`-phase affirmation. Its `--twin-line-catch` /
`--twin-line-shadow` are `color-mix(in oklab, var(--color-silver-*) …)` recipes; the
register is a brand METAL identity (hue ~255, chroma ≤ 0.016), NOT a neutral.

## Machine-locked

`proof:phase-palette` (W1 arm-reads-token-no-gold-leak · W2 root-defaults-gold ·
W3 WCAG-twin-1:1 · W4 the canon recorded here + the silver source fenced) + the
binding π `tests-visual/phase-palette.spec.ts` + the `proof:ba-gestalt` chassis
verdict. The speedtest fleet is the cross-repo consumer (it SETS
`--phase-complete-color` in its own repo — the foreign-tree fence holds).
```

This README is **also** the natural re-home for `proof:phase-palette` W4 once B4f lands: `safeRead(resolve(ROOT,"CLAUDE.md"))` → `readCanon("component:instrument-chassis")`, and the W4 regexes (`/--phase-complete-color/` + `/InstrumentChassis phase canon/`) match against it unchanged (the README uses the literal "InstrumentChassis phase canon" as a `##` heading by design).

---

## 4. THE B4f GATE — `proof:claude-deletable` (the single delete-precondition oracle)

**One gate, born-RED, that flips GREEN exactly when it is safe to delete CLAUDE.md.** It asserts BOTH legs of the chain in one place so the harness reads ONE verdict, not a hand-correlated pair. Pure-detector house pattern (mirrors `proof:precept-current` / `proof:claude-structure-sync` — static, no Playwright, `tags:["local","ci"]`). Registered in `gates.mjs`; the script is `scripts/proof-claude-deletable.mjs`.

### 4a. The three clauses

- **C1 — content-real canon homes.** `auditCanonHomes()` (the §2 content-real form) returns `[]` AND `canonTokensSound().ok` (every home has a token entry — no silent token-less home). A home that is absent / empty / missing-its-contract-token REDs with the `{key, rel, reason}` row. *(Born-RED at HEAD: ~14 `missing-token` rows + 1 `absent` = the instrument-chassis dangling key.)*
- **C2 — zero surviving hard CLAUDE.md readers.** A scoped scan of `scripts/**.mjs` for a **read** of the CLAUDE.md path = 0. The detector must distinguish a *read* from a *defined-but-unread path constant* (the `proof-expandable-part` false-positive): match `readFileSync(`/`safeRead(`/`read(`/`readRel(`/`rd(` whose argument resolves to CLAUDE.md (directly `"CLAUDE.md"` OR a `*CLAUDE*` identifier that the same file assigns `resolve(ROOT,"CLAUDE.md")` AND later passes to a reader). Equivalent operational floor: `rg -n '(readFileSync|safeRead|readRel|\brd|\bread)\([^)]*CLAUDE' scripts` returns nothing, AND for the constant form, every file defining `CLAUDE_MD: resolve(...,"CLAUDE.md")` either deletes the key or never passes it to a reader. *(Born-RED at HEAD: 16 content-reads.)*
- **C3 — the file is the LAST act.** `existsSync(resolve(ROOT,"CLAUDE.md"))` — while CLAUDE.md is present, C3 records `claudePresent:true` and the gate STAYS RED (it is the delete-precondition; it cannot go green until the irreversible act is staged). After B5c re-points all readers AND B4b-content fills all homes, the gate is GREEN-but-for-C3; the delete then flips C3 and the whole gate GREEN — proving the delete was safe at the instant it happened. *(This is the born-RED-by-design tag-blocker shape: the gate is RED for the entire tranche and turns GREEN only at the delete commit, exactly like `proof:ship-attestation`.)*

### 4b. The self-test bites (forgery-proof, the house discipline)

1. a synthetic canon home missing its token → C1 REDs (proves content-real, not existence-only);
2. a synthetic surviving `safeRead(P.CLAUDE_MD)` reader in a fixture → C2 REDs (proves the reader scan has teeth);
3. a synthetic `CLAUDE_MD: resolve(...)` defined-but-unread fixture → C2 does NOT red (proves the dead-constant false-positive is excluded);
4. the dangling-key form: a `CANON_HOMES` key whose home is absent → C1 REDs with `reason:"absent"` (the instrument-chassis class).

### 4c. The ordered close chain (what gates what)

```
B4b-content  (redistribute each CLAUDE.md contract → its canon home)
   └─ oracle: auditCanonHomes() drains 14 → 0   (proof:claude-deletable C1)
B5c          (re-point all 14+1+1 readers THROUGH readCanon; retire structure-sync/
              doc-consistency reads onto structure.md/dependencies.md; swap the 2
              readFileSync ENOENT-crashers → readCanon strict)
   └─ oracle: zero hard readers                 (proof:claude-deletable C2)
B4f          (rm CLAUDE.md — the irreversible act, LAST)
   └─ oracle: file absent + C1 + C2 still green  (proof:claude-deletable GREEN)
```

**The de-risk guarantee:** B4f is mechanically blocked until C1 (every contract re-homed AND token-present) and C2 (every reader re-pointed) are both green. An undercount of 2 readers (the plan's failure mode) cannot happen — C2 scans the live tree, not a hand-list; the 2 ENOENT-crashers (#1, #2) are caught by the same scan as the 12 RED-ers. A half-migrated home (B4b-content slip) cannot let the delete through — C1's `missing-token` row holds the gate RED.

### 4d. `gates.mjs` registration (the note, drop-in shape)

```js
{
    id: "proof:claude-deletable",
    cmd: "proof:claude-deletable",
    tags: ["local", "ci"],
    note: "BH.B4f — the CLAUDE.md hard-delete precondition oracle (born-RED for the whole tranche → GREEN only at the delete commit; the proof:ship-attestation born-RED-tag-blocker shape). ONE verdict gating the most irreversible act. C1 content-real canon homes: auditCanonHomes()==[] (every CANON_HOMES home present + non-trivial + carrying its CANON_TOKENS contract token — the existence-only hole closed) AND canonTokensSound() (no token-less home). C2 zero surviving hard CLAUDE.md readers: the scoped scripts/**.mjs scan for a READ of the CLAUDE.md path == 0, distinguishing a read from a defined-but-unread path constant (the proof-expandable-part false-positive excluded). C3 the file is the LAST act: while CLAUDE.md exists the gate STAYS RED (the delete-precondition cannot pre-green). 4 self-test bites: a token-less home REDs C1, a synthetic surviving reader REDs C2, a dead-constant does NOT red C2, an absent CANON_HOMES key REDs C1. Bite: re-introduce a readFileSync(CLAUDE.md) reader, leave a canon home token-less, or delete CLAUDE.md before C1∧C2 → RED.",
}
```

---

## 5. THE FULL B5c RE-POINT MAPPING (the executable deliverable)

The exact edit per reader (the census table §1a made actionable). Every edit is `readFileSync/safeRead/read("CLAUDE.md")` → `readCanon("<key>")` (strict) or `readCanon("<key>","soft")`, then the assertion regex runs against the canon-home body UNCHANGED (the tokens are byte-preserved by §2a's `CANON_TOKENS`, which IS the gate-assert set).

| reader | edit |
|---|---|
| proof-claude-structure-sync | `readFileSync(CLAUDE_MD)` → `readCanon("structure")`; the §Structure parser now reads the GENERATED `docs/canon/structure.md` (the tree format is the same colocated-barrel emit) |
| proof-doc-consistency | `readFileSync(CLAUDE_MD)` → `readCanon("structure")` (dir citations) + `readCanon("dependencies")` (deps table); split the single read into two homes |
| proof-close-battery-parity | `read("CLAUDE.md")` → `readCanon("build-and-gates")`; `claudeCanon` regex unchanged |
| proof-doc-override-idiom | `read(CLAUDE)` → `readCanon("consumer-wiring")`; W3/W4 regexes unchanged |
| proof-dock-unify | `safeRead(CLAUDE_MD)` → `readCanon("component:dock")`; F5 regexes unchanged |
| proof-dropdown-fix | `safeRead(P.CLAUDE_MD)` → `readCanon("consumer-wiring")`; D3 regex unchanged |
| proof-easing-primitive | `safeRead(P.CLAUDE_MD)` → `readCanon("component:easing")`; W5 regexes unchanged |
| proof-handmark | `rd("CLAUDE.md")` → `readCanon("component:handmark")`; W6 regex unchanged |
| proof-on-glass-fg | `read("CLAUDE.md")` → `readCanon("glass-system")`; W4 detector unchanged (also fixes the latent `undefined`→`.test()` coercion) |
| proof-phase-palette | `safeRead(resolve(ROOT,"CLAUDE.md"))` → `readCanon("component:instrument-chassis")`; W4 regexes unchanged (README §3 carries both tokens) |
| proof-readme-meta-clean | `read(CLAUDE)` → `readCanon("dependencies")` for the keyframes-peer positive assert + scan the canon-home set (`auditCanonHomes` file list) for the phantom-name negatives |
| proof-spa-view | `safeRead(P.CLAUDE_MD)` → `readCanon("component:spa-view")`; W5 regex unchanged |
| proof-split-chars | `safeRead(p.CLAUDE_MD)` → `readCanon("structure")`; SP6 regex unchanged |
| proof-surface-axis | `safeRead(P.CLAUDE_MD)` → `readCanon("glass-system")`; W7 regexes unchanged |
| proof-dock-rail-realize | `readRel(CLAUDE_MD)` → scan canon-home set for the forbidden `proof:rail3`/`rail3.spec.ts` names |
| proof-accent-tone | `safeRead(p.CLAUDE_MD)` → `readCanon("structure","soft")` (the WARN-degrade preserved) |
| proof-expandable-part | delete the dead `CLAUDE_MD:` key (cleanliness; not a read) |
| proof-crossrepo-asks | re-point/drop the `"CLAUDE.md"` `WAVE_BOUNDS` entry (stale path; not a read) |

---

## 6. FEASIBILITY + RISK

**Feasible — every dependency is already on disk:**
- the `canon-doc.mjs` seam + `readCanon` strict/soft modes exist (`scripts/lib/canon-doc.mjs`);
- `regen-structure.mjs` already emits `docs/canon/structure.md` (`--write`/`--check`), so the generated home is wired — structure-sync/doc-consistency/split-chars/accent-tone all re-point to a home that REGENERATES, never drifts;
- the colocated-README pattern is established (spa-view/easing/handmark/dock) — the instrument-chassis README (§3) follows it byte-for-byte;
- the content-real `auditCanonHomes` is a ~25-line additive change (§2a);
- the B4f gate is a standard pure-detector (§4), modelled on `proof:precept-current`.

**Residual risks / open items the execution must own:**
1. **The 2 ENOENT-crashers (#1, #2) need a behaviour change, not just a path swap** — they must move to `readCanon(...)` strict so a future absent home REDs loud (the fail-explicit floor the seam already ships) rather than crashing. Flagged in §5.
2. **Cross-cutting tokens are anchor-choices** — the `conventions`/`design-axes`/`motion-system`/`exports-subpaths` `CANON_TOKENS` entries (§2a) are not gate-asserted today (no reader gates them); pick STABLE anchors that B4b-content guarantees to carry, else C1 reds on a home no gate reads. Low risk — they are author-controlled.
3. **`proof:readme-meta-clean` reads MULTIPLE CLAUDE.md facts that distribute across homes** (peer line → dependencies; phantom names → cross-canon negative scan; luma RESERVE → glass-system). The §5 edit handles it but it is the one reader whose re-point is not a 1:1 home swap — verify at B5c.
4. **WAVE_BOUNDS + the wf-*.js agent prompts** name CLAUDE.md as a path/read-target; not gate-close blockers, but the post-delete tree should re-point them at `docs/canon/`+`docs/design/` (cleanliness + correct future-agent guidance).
5. **dock/handmark README token-presence is asserted-not-verified here** — dock(326L)/handmark(75L) likely carry their tokens but were not byte-confirmed in this pass; the content-real `auditCanonHomes` (§2a) will surface any gap as a `missing-token` row at B4b-content (which is the point — the manifest IS the verifier).

**Convergence:** the WHAT (exact census, the 14-not-16 dangerous set, the 2 ENOENT-crashers, the unwired-not-just-existence-only `auditCanonHomes`, the dangling instrument-chassis key) is fully verified on disk — ~95%. The HOW (the `CANON_TOKENS` manifest + the `proof:claude-deletable` gate + the §5 re-point mapping) is specified to drop-in code — ~85% (the cross-cutting anchor-token choices + the readme-meta-clean multi-home split are the open ~15%). **passConvergencePct (this item): 88.**
