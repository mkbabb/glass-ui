# AY.W-LEG1 — Author the legacy gates (the AX W27a/b NEVER written)

**Band:** no god-modules · legacy excision · DI/boundaries (with W-GOD1, W-CSS1)
**Kind:** gate (structural, device-free — pure FS/JSON/source scan; no visual surface)
**State:** OPEN
**Hardening basis:** `docs/tranches/AY/audit/hardening/H-godmodule.md` (F2, F5, F6, F7),
`docs/tranches/AY/audit/hardening/H-precept-drift.md` (greenfield-no-meta / accurate-status).

---

## Goal criterion

The legacy-excision gate fleet that AX.W27a/W27b promised but never wrote actually
exists, is registered with correct manifest tags, and is GREEN. Three concrete machine
checks land: (1) every `MIGRATION.md` "RETIRED" claim resolves to zero surviving
dir/subpath/export/token — so a binding-doc retirement lie cannot ride again
(`proof:no-retired-survivor`, the gate AX docs falsely assert was "authored W21 /
registered W33"); (2) every load-bearing static src-scan gate that should run in CI
actually carries the `ci` tag — so a structural gate can never silently ship `local`-only
again while master's CI shows green (`proof:tag-parity`, the AX.W27a tag-parity
meta-assert); (3) no Tailwind-v4 var-in-arbitrary class string mixes the two
custom-property syntaxes where the `(--x)` shorthand applies, and no fallback-bearing
`[var(--x, …)]` is wrongly flattened (`proof:var-in-arbitrary-guard`, the AX.W27a F7 idiom
rule). The full-tree tranche-letter commentary disposition is DECIDED ONCE with a written
rationale and that decision is gated — not left as a ~50-file open sweep masquerading as a
"fold."

## Completion criterion

All HARD GATE clauses below verify against artefacts: the three new `proof:*` scripts
exist on disk, are registered in `package.json` AND `scripts/gates.mjs` with the tags this
spec names, and exit 0; `gates.mjs --emit-ci` re-renders `.github/workflows/ci.yml` and
`proof:gen-ci-fresh` byte-matches it; `proof:gate-script-parity` stays GREEN with **zero
NEW orphans** (the three new scripts are registered, not amnestied into `KNOWN_ORPHANS`);
`proof:tag-parity` reports **0 mis-tagged static gates**; `proof:no-retired-survivor`
reports **0 surviving retired artefacts**; `proof:var-in-arbitrary-guard` reports **0
shorthand-eligible bare `[var(--x)]`** in `:class`/CVA-base strings AND stays GREEN on the
fallback-bearing keeps; the commentary-disposition decision is recorded in `AY.md` and
encoded in whatever gate the decision selects.

---

## The verified defect (file:line, at HEAD)

The AY.md row claims W-LEG1 "folds AX W27a/b." It does not — those waves were authored as
table rows and **never executed**. `docs/tranches/AX/PROGRESS.md:72`:

```
| W27a | legacy gate hardening — barrel scrub, tag-parity, var/arbitrary guard | planned |
```

The three gates the AX corpus and AY.md name do not exist on disk:

```
$ ls scripts/proof-no-retired-survivor.mjs scripts/proof-tag-parity.mjs scripts/proof-var-in-arbitrary-guard.mjs
ls: scripts/proof-no-retired-survivor.mjs: No such file or directory
ls: scripts/proof-tag-parity.mjs: No such file or directory
ls: scripts/proof-var-in-arbitrary-guard.mjs: No such file or directory
```

This compounds a **greenfield-no-meta / accurate-status drift**: the AX hardening corpus
(`docs/tranches/AX/research/final-hardening-corpus.json:1665`) asserts
*"`proof:no-retired-survivor` is authored W21 / registered W33 / kept-GREEN by W29"* — a
claim with **zero on-disk backing**. The gate was never written. The AY plan inherits the
lie verbatim ("folds AX W27a/b").

### D1 — `proof:no-retired-survivor` ABSENT; a binding-doc retirement lie can ride

`MIGRATION.md` carries 5 `RETIRED` claims (`grep -c RETIRED MIGRATION.md` → 5), incl.
`MIGRATION.md:800` *"`@mkbabb/glass-ui/metric-cell` + `@mkbabb/glass-ui/metric-stack`
subpaths RETIRED (AV.W10)"*. The AX deep-audit corpus
(`docs/tranches/AX/audit/deep-audit-corpus.json:1314`) verified these subpaths/dirs/
exports/tokens SURVIVE at HEAD (speedtest re-adopted them) — a binding-doc lie (L invariant
16) with no gate. There is no machine check that a `RETIRED` claim resolves to zero
surviving artefact.

### D2 — `proof:tag-parity` ABSENT; load-bearing static gates ship `local`-only, CI shows green

The seed's "tag-parity" is **NOT** the file↔key bijection (that is
`proof:gate-script-parity` (AX.W00), which is already GREEN — `node
scripts/proof-gate-script-parity.mjs` → `NEW orphan scripts: 0`, with a 5-entry
`KNOWN_ORPHANS` AW baseline allowlist). The AX.W27a tag-parity is the SEPARATE manifest
**tags ↔ aggregate** assertion: *"every non-sibling static src/-scan gate must carry the
`ci` tag"* (`docs/tranches/AX/audit/deep-audit-corpus.json:1972`,`:1991`). It is unwritten.
The consequence is live at HEAD — three structural gates the band depends on are
`["local"]`-only in `scripts/gates.mjs` and therefore absent from `.github/workflows/ci.yml`
(`grep no-god-module .github/workflows/ci.yml` → empty):

| gate | `gates.mjs` line | tags | in ci.yml? |
|---|---|---|---|
| `proof:no-god-module` | 385–388 | `["local"]` | NO |
| `proof:no-legacy-commentary` | 391–394 | `["local"]` | NO |
| `proof:fail-explicit` | 379–382 | `["local"]` | NO |

`proof:no-god-module` is RED on master right now (`node scripts/proof-no-god-module.mjs` →
`status: FAIL`, 4 god-modules over 500) yet CI is green — exactly the
"local-only-gate-is-RED-while-CI-green" class the manifest's own header
(`gates.mjs:1-15`) exists to prevent. The `proof:no-god-module` note (line 388) even says
*"W6 gates-close folds it into the ci aggregate"* — a ≥3-pass-deferred fold.

> **Sequencing note.** Promoting `proof:no-god-module` / `proof:no-legacy-commentary` to
> `ci` is W-GOD1/W-CSS1's deliverable (they turn those gates GREEN by carving the modules /
> scrubbing the barrels). W-LEG1 AUTHORS the `proof:tag-parity` gate that MEASURES the
> mis-tag and authors `proof:no-retired-survivor` + `proof:var-in-arbitrary-guard`.
> `proof:tag-parity` is born RED against the three `local`-only static gates and turns
> GREEN as W-GOD1/W-CSS1/W-LEG1 promote them. See §"Cross-wave coordination".

### D3 — `proof:var-in-arbitrary-guard` ABSENT; the library mixes two v4 custom-property syntaxes in one class string

`src/components/ui/tabs/TabsIndicator.vue:19` carries BOTH idioms in one string:
`w-(--reka-tabs-indicator-size)` (v4 shorthand) AND `bg-[var(--glass-bg-quiet)]`
(arbitrary-value). Shorthand-eligible no-fallback bare `[var(--x)]` sites that COULD be
`(--x)` survive at HEAD (`:class`/CVA-base strings only):

- `src/components/ui/number-field/NumberFieldInput.vue:37` — `h-[var(--control-h-md)]`
- `src/components/ui/tags-input/TagsInput.vue:25` — `bg-[var(--glass-bg-quiet)]`
- `src/components/ui/command/CommandInput.vue:36` — `h-[var(--dropdown-input-height)]`
- `src/components/custom/search/FuzzySearch.vue:132` — `w-[var(--reka-popover-trigger-width)]`
- `src/components/ui/tabs/TabsIndicator.vue:19` — `bg-[var(--glass-bg-quiet)]`

**The carve is NOT a blanket rewrite** — two legitimate keeps must stay GREEN:
1. **Fallback-bearing** — `src/components/ui/progress/ProgressDefault.vue` documents
   `bg-[var(--progress-track,var(--secondary))]` as intentional (`:10-18` header); the
   `(--x)` shorthand CANNOT express a default-value fallback. KEEP.
2. **Type-hinted / arbitrary-selector** — `text-[length:var(--control-text)]`
   (`button/index.ts:27`, `toggle/index.ts:34`) carries a `length:` data-type prefix;
   `[&_svg:not([class*=size-])]:size-[var(--ui-glyph)]` lives inside an arbitrary variant.
   Neither is expressible as `(--x)`. KEEP.

The gate encodes the RULE, not a sweep: a bare `prop-[var(--x)]` — no fallback comma, no
`type:` prefix, NOT inside an arbitrary `[&…]` selector — must use the `prop-(--x)`
shorthand.

### D4 — `proof:no-legacy-commentary` covers EXACTLY 2 files; ~690 src survivors; disposition UNDECIDED

`scripts/proof-no-legacy-commentary.mjs:31`: `const TARGETS = ["src/api/index.ts",
"src/index.ts"]`. Full-tree reality: `grep -rnE '\b[A-Z]{1,2}\.W[0-9]' src --include='*.ts'
--include='*.vue'` → **690 hits across 195 files** (`scripts/` carries 634 more). The
"full-tree commentary sweep" AY.md names is unenforced and would be a ~195-file edit. This
wave DECIDES the disposition once (§"The disposition decision" below) rather than leaving
it as an implied blanket ban.

---

## Objective

Author the three legacy gates AX.W27a/b never wrote, register them with the manifest tags
this spec names, turn them GREEN, re-emit ci.yml, and DECIDE + gate the full-tree
commentary disposition — closing the ≥2-pass-deferred legacy-excision lane and removing the
"authored W21" accurate-status lie from the live tree (the AX docs' false claim is corrected
to "authored AY.W-LEG1" in the gate's own header — greenfield-no-meta: the gate states what
it IS, not a fabricated provenance).

---

## Edit-sites (exact)

### 1. NEW `scripts/proof-no-retired-survivor.mjs`

Parse every `## … RETIRED` / `RETIRED (…)` heading + bullet in `MIGRATION.md`; for each,
extract the named artefacts (subpath `@mkbabb/glass-ui/<x>`, dir `src/components/.../<x>`,
export symbol, token `--<x>`) and assert NONE survive:
- a claimed-retired subpath has NO `package.json` `exports` key + NO `typesVersions` entry;
- a claimed-retired dir does not exist under `src/`;
- a claimed-retired export is absent from `src/index.ts` / `src/api/index.ts` / the named
  barrel;
- a claimed-retired `--token` is absent from `src/styles/`.

Use the shared `gate-output.mjs` artefact writer (the house pattern — see
`proof-no-legacy-commentary.mjs:26`). Emit named violations
(`MIGRATION.md:<line> claims <subpath> RETIRED but package.json:<line> still exports it`).
`detect()` + `run()` split (the `proof-gate-script-parity.mjs` shape) so a test can import
`detect()`. **Born-state:** D1 names metric-cell/metric-stack as live survivors — this gate
is born RED against the current `MIGRATION.md:800` lie. W-LEG1 turns it GREEN by EITHER
(a) re-landing the metric retirement for real, OR (b) rewriting the `MIGRATION.md:800`
entry to the truth (un-retired, speedtest-consumed). DECIDE (b) — the metric family has
live speedtest consumers (deep-audit-corpus.json:1314); the honest fix is the doc
correction, not a re-retirement that breaks a real consumer. The doc edit is in-scope here.

### 2. NEW `scripts/proof-tag-parity.mjs`

Import `{ GATES }` from `./gates.mjs`. Assert: every gate that is a **static
src/scripts-scan** (its `cmd` resolves to a `scripts/proof-*.mjs` AND it is NOT
`sibling: true` AND NOT one of the `local`-only live-verification Playwright gates the
manifest header (`gates.mjs:30-44`) enumerates) carries the `ci` tag. The Playwright
live-verified set is `local`-only BY DESIGN (the cardinal-lesson architecture); read that
set from a single source — a `LIVE_VERIFIED_LOCAL_ONLY` Set the gate defines, cross-checked
against the manifest header list so it cannot silently grow. Any static src-scan gate
NOT in that set and NOT `ci`-tagged is a violation
(`proof:<id> is a static src-scan gate but carries tags [<…>] without "ci" — promote it or
justify it in LIVE_VERIFIED_LOCAL_ONLY`). This is the AX.W27a "at-LEAST-ci" form. **Born
RED** against `proof:no-god-module` / `proof:no-legacy-commentary` / `proof:fail-explicit`
(the three `["local"]`-only static gates) — turns GREEN as W-GOD1/W-CSS1/W-LEG1 promote
them to `ci`.

### 3. NEW `scripts/proof-var-in-arbitrary-guard.mjs`

Scan `src/**/*.{vue,ts}` `:class` / `class=` strings + CVA `cva("…")` base strings. Flag a
token match `(?<![:[])(bg|h|w|min-h|max-h|min-w|max-w|size|gap|p[xytrbl]?|m[xytrbl]?|inset|top|right|bottom|left|translate-[xy]|rounded[a-z-]*)-\[var\(--[a-z0-9-]+\)\]`
ONLY when:
- there is NO `,` inside the `[var(--x, …)]` (no fallback — fallback-bearing is a KEEP);
- there is NO `type:` prefix (`text-[length:var(…)]`, `[background:var(…)]` are KEEPs);
- the match is NOT inside an arbitrary variant selector (`[&…]:` / `[&_svg…]:` — KEEP).

Emit `<file>:<line> — bare [var(--x)] where the (--x) shorthand applies; use prop-(--x)`.
**Write-scope boundary with W-CSS1 (the overlap the seed flagged): W-CSS1 OWNS the ~54
class-1 conversions in `src/`; W-LEG1 owns ONLY this gate.** W-LEG1 does NOT re-edit the
call sites — it AUTHORS + registers the gate that VERIFIES W-CSS1's conversions landed. If
W-CSS1 has landed, the gate is born-GREEN; if W-CSS1 has not yet landed when W-LEG1
dispatches, the gate lands RED-with-named-survivors (the fail-EXPLICIT shape — the ~54
class-1 sites are named + owed) and W-CSS1's conversion turns it GREEN. NO double-edit on
the same line (the D3 5-site list above is the IDENTIFICATION sample, not W-LEG1's edit
scope). The two keep-classes (ProgressDefault fallback, button/toggle `length:`/arbitrary-
selector) MUST stay GREEN — add a bite-test fixture asserting a fallback-bearing line and a
`length:`-prefixed line do NOT trip.

### 4. `scripts/gates.mjs` — register the three gates

Append three GATES rows (with `note` documenting intent per the manifest convention):
- `{ id: "proof:no-retired-survivor", cmd: "proof:no-retired-survivor", tags: ["local", "ci", "release"] }`
  — a binding-doc honesty gate is release-blocking (L inv 16); the corpus routed its
  registration to "W33" — that registration lands HERE.
- `{ id: "proof:tag-parity", cmd: "proof:tag-parity", tags: ["local", "ci"] }` — a manifest
  meta-gate; `ci`+`local` (matches the `proof:gate-script-parity` sibling meta-gate tags).
- `{ id: "proof:var-in-arbitrary-guard", cmd: "proof:var-in-arbitrary-guard", tags: ["local", "ci"] }`
  — a static idiom-scan gate; `ci`+`local`.

### 5. `package.json` — register the three scripts

Three keys mirroring the existing `proof:*` block (lines 545–681):
```
"proof:no-retired-survivor": "node scripts/proof-no-retired-survivor.mjs",
"proof:tag-parity": "node scripts/proof-tag-parity.mjs",
"proof:var-in-arbitrary-guard": "node scripts/proof-var-in-arbitrary-guard.mjs",
```

### 6. `.github/workflows/ci.yml` — REGENERATE (do not hand-edit)

Run `node scripts/gates.mjs --emit-ci`. The three new `ci`-tagged gates render as steps
automatically (the file is `DO NOT EDIT BY HAND` generated). `proof:gen-ci-fresh` (release)
+ `gates:verify-ci` byte-match the result.

### 7. The disposition decision — `proof-no-legacy-commentary.mjs` scope + `AY.md` rationale

**DECISION (this wave makes it, with rationale recorded in `AY.md` W-LEG1 row + the gate
header): option (c) — banned-in-NEW/TOUCHED-files, NOT a full-tree retroactive sweep.**

Rationale (greenfield-no-meta vs. churn-risk balance):
- A blanket full-tree ban (option b) is a ~195-file edit that rewrites load-bearing design
  WHY-prose (`useRAFLoop.ts`, `useAnimatedNumber.ts` bodies cite the tranche-letter that
  records a deliberate decision) — high-churn, high-regression-risk, and the analyze-in-full
  precept says do not defer it as an implied sweep.
- The barrels (`src/index.ts`, `src/api/index.ts`) are the PUBLIC surface a consumer reads
  — they stay banned full-body (the existing `proof:no-legacy-commentary` TARGETS, kept).
- The DEMO visitor view (`demo/stories/**`) is already banned by `proof:story-language`
  (`gates.mjs:400`).
- The src/ INTERNAL bodies are DEV provenance (a changelog-substitute the next author
  reads). They are NOT consumer-facing. A blanket retroactive ban would delete genuine
  design rationale.

So the gate stays scoped to the two public barrels (option (c) realized as: the existing
2-file ban is the steady-state; NEW src/ files are expected barrel-clean, and the
≥2-consumer/overfitting audit at tranche close catches dead provenance). The
≥690-survivor figure is NOT a defect to sweep — it is DEV provenance, recorded as a
DECIDED keep. `AY.md` W-LEG1 row is amended to state this disposition so the "full-tree
commentary sweep" framing is corrected (it was a mis-scoped inheritance from the AX W27b
table row). **No code edit to `proof-no-legacy-commentary.mjs` TARGETS** — the decision is
"keep the 2-file scope; the full-tree refs are DECIDED dev-provenance, gated for the
barrels + demo only."

---

## HARD GATE

A single binding condition verified by artefacts (run from repo root):

```
# 1. The three NEW gates exist, are registered, and are GREEN:
node scripts/proof-no-retired-survivor.mjs        # exit 0; 0 surviving retired artefacts
node scripts/proof-tag-parity.mjs                 # exit 0; 0 mis-tagged static src-scan gates
node scripts/proof-var-in-arbitrary-guard.mjs     # exit 0; 0 shorthand-eligible bare [var(--x)]

# 2. The bijection meta-gate stays GREEN with the three new scripts REGISTERED
#    (NOT amnestied into KNOWN_ORPHANS):
node scripts/proof-gate-script-parity.mjs         # NEW orphan scripts: 0; gates.mjs ghost cmds: 0

# 3. ci.yml is regenerated from the manifest and byte-matches (the three new
#    ci-tagged gates render as steps; no hand-edit):
node scripts/gates.mjs --emit-ci
node scripts/proof-gen-ci-fresh.mjs               # byte-match PASS
node scripts/gates.mjs --verify-ci                # set-equality PASS
grep -c "proof:tag-parity\|proof:no-retired-survivor\|proof:var-in-arbitrary-guard" .github/workflows/ci.yml   # >= 2 (tag-parity + var-guard are ci-tagged; no-retired-survivor too)

# 4. The local aggregate runs the three new gates and passes:
node scripts/gates.mjs --run local                # PASSED (includes the 3 new gates)
```

**Binding pass condition:**
1. `proof:no-retired-survivor` exits 0 AND its artefact (`.cache/gates/*no-retired-survivor*.json`)
   shows `violations: []` — proving the `MIGRATION.md:800` metric-cell/stack lie is corrected
   (a DELETION/reconciliation proof, not a grep claim: the gate resolves each RETIRED claim
   to absent dir/subpath/export/token).
2. `proof:tag-parity` exits 0 AND its artefact lists `misTaggedStaticGates: []` — proving
   no load-bearing static src-scan gate is silently `local`-only (which requires W-GOD1 /
   W-CSS1 to have promoted `proof:no-god-module` / `proof:no-legacy-commentary` to `ci`
   first; see coordination).
3. `proof:var-in-arbitrary-guard` exits 0 AND a bite-test fixture proves a re-injected bare
   `h-[var(--control-h-md)]` REDDENS it while the ProgressDefault fallback line +
   `text-[length:var(--control-text)]` line stay GREEN (the over-correction guard).
4. `proof:gate-script-parity` reports `NEW orphan scripts: 0` (the three new scripts are in
   `KNOWN_ORPHANS`-free, properly-registered state) — a build-diff/bijection artefact.
5. `proof:gen-ci-fresh` byte-match PASS after `--emit-ci` — proving ci.yml carries the new
   `ci`-tagged steps (a generated-artefact diff).
6. The `AY.md` W-LEG1 row records the DECIDED commentary disposition (option c +
   rationale) — explicit document reconciliation.

**Bite witnesses (each gate must demonstrably RED on a planted defect):**
- re-add `metric-cell` to `package.json` exports after a hypothetical re-retirement, or
  leave `MIGRATION.md:800` un-reconciled → `proof:no-retired-survivor` RED.
- flip any one of `proof:no-god-module` / `proof:no-legacy-commentary` / `proof:fail-explicit`
  back to `["local"]` (or add a new static src-scan gate without `ci`) →
  `proof:tag-parity` RED.
- re-inject `h-[var(--control-h-md)]` (or any bare shorthand-eligible `[var(--x)]`) into a
  `:class` string → `proof:var-in-arbitrary-guard` RED; conversely flattening a
  fallback-bearing `[var(--x, fallback)]` to flag it → the keep-test RED (over-correction).

---

## Cross-wave coordination

- **W-GOD1 / W-CSS1 own the PROMOTIONS that turn `proof:tag-parity` green.** They carve the
  4 god-modules / CSS monoliths and scrub the barrels, which lets `proof:no-god-module` and
  `proof:no-legacy-commentary` flip from `["local"]` to `["local","ci","release"]`.
  W-LEG1 AUTHORS the `proof:tag-parity` gate that MEASURES the mis-tag; it is born RED and
  cannot close GREEN until those two waves land their promotions. **Sequencing:** W-LEG1's
  gate-AUTHORING (scripts 1–5, 7) can land independently; the `proof:tag-parity` GREEN
  close-condition depends on W-GOD1 + W-CSS1. The band closes when all three are green
  together. If W-GOD1/W-CSS1 slip, W-LEG1 lands the gate RED-with-named-survivors (the
  fail-EXPLICIT shape — the mis-tagged gates are named + owed, never silently swept), and
  the band-close holds the line.
- **`proof:fail-explicit` promotion** (the third `local`-only static gate) is W-LEG1's to
  promote — it is already GREEN (no carve needed), so its `["local"]` → `["local","ci","release"]`
  bump lands in this wave's `gates.mjs` edit (edit-site 4 extended). This means
  `proof:tag-parity` has at most TWO remaining RED dependencies (no-god-module,
  no-legacy-commentary), both owned by W-GOD1/W-CSS1.
- **W-CSS1 owns the `var-in-arbitrary` CONVERSIONS; W-LEG1 owns only the GATE.** The ~54
  class-1 `<util>-[var(--x)]` → `<util>-(--x)` edits in `src/` are W-CSS1's write scope (its
  §O6); W-LEG1 authors `proof-var-in-arbitrary-guard.mjs` and registers it but does NOT
  re-edit the call sites. The two waves touch DISJOINT files (W-CSS1: `src/components/**`
  call sites; W-LEG1: `scripts/proof-var-in-arbitrary-guard.mjs` + `package.json` +
  `gates.mjs`). The gate is born-GREEN once W-CSS1 lands; if W-CSS1 slips, the gate lands
  RED-with-named-survivors. This deconflicts the seed-flagged W-CSS1↔W-LEG1 write overlap —
  NO double-edit on the same line.

## Precept conformance

- **Root-not-consumer / ≥2-consumer:** the gates assert library-wide invariants over
  `src/` + the manifest; no consumer edit. `proof:tag-parity` reads the single `gates.mjs`
  manifest (the source of truth), not a hand-mirror.
- **No-workaround / gestalt:** `proof:tag-parity` is authored as the manifest-tags ↔
  aggregate assertion the AX corpus specified — NOT a second copy of the file↔key bijection
  (`gate-script-parity` already owns that; this wave does not duplicate it). The two
  meta-gates are disjoint by construction.
- **Greenfield-no-meta / accurate-status:** the gate headers state what they ARE
  (`AY.W-LEG1 — …`), and the wave corrects the AX-corpus "authored W21 / registered W33"
  fabrication by simply authoring them now under the real wave. The ~690 src tranche-letter
  refs are DECIDED dev-provenance (a recorded keep), not an undeferred sweep.
- **Clean-break:** the `MIGRATION.md:800` honesty repair rewrites the lie to the truth (no
  alias, no dual claim) per the no-backwards-compat keep.
