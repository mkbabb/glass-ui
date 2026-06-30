# PT-1 — W-REFLECT3 deferral re-home onto the per-wave self-close model

**Issue:** C1 [HIGH] — the keystone tag-gate. **Mode:** spec (corrected-approach). **Pass:** 1.
**Date:** 2026-06-30 · **Branch:** tranche/BG · **HEAD (verified):** `4c761b64`
**Author:** prototyping agent (PT-1) · **Scope:** READ-MOSTLY; findings only — NO edits to src/demo/scripts/CLAUDE.md or the binding plan docs. This file PRESCRIBES the edits an execution wave applies; it does not apply them.

**Feasibility: TRUE (proven on disk).** The blocking fix is exactly **2 string edits** in one scanned file; an in-memory simulation re-run through the gate's own G8 line-scan logic drives the G8 arm to **0 hits** (§6). The coherence remediation is a mechanical 27-occurrence re-home with a single canonical replacement idiom (§4). The plan's OWN protocol docs already state the correct model verbatim, so this is an internal-consistency repair, not a design change.

---

## 1 · Ground truth re-verified against source (not trusted from the spec prose)

The PASS-1 baseline reported `EXECUTION-PROGRESS.md 10, bg-build-map 7, AMENDED 8, FINAL 4` — those are **total `W-REFLECT\d` mentions per doc** (29 ≈ "~30 occurrences"), NOT gate-violation counts. The live gate is far narrower:

- **`proof:ba-gestalt` exit = 1**; the G8 arm reports **`2 files scanned — 2 DEFERRAL HIT(S)`**, both in **`EXECUTION-PROGRESS.md` at lines 38 and 113**. Those are the ONLY live gate-reds.
- **G8 scan scope** (`proof-ba-gestalt.mjs:413–429`): `docs/tranches/BG/waves/*.md` (the dir is **ABSENT** on disk — `WAVES_DIR` does not exist) **+** every `docs/tranches/BG/**/*.md` whose **basename matches `/PROGRESS.*\.md$/`**. The regex is **CASE-SENSITIVE** (uppercase `PROGRESS`). Exactly two files qualify: `execution/EXECUTION-PROGRESS.md` and `audit/visual/BG.W-SCROLL-PROGRESS-RAIL-DELTA.md`. The second is **CLEAN** (0 W-REFLECT). `docs/tranches/BG/audit/D5-scroll-progress-bar-confirmed.md` is **out of scope** (lowercase `progress`).
- **`bg-build-map.md`, `AMENDED-WAVE-PLAN.md`, `FINAL.md` are NOT in the G8 scope** (no `PROGRESS` in their basenames). Their W-REFLECT occurrences do not red the gate today — but they are the **SOURCE** builders read to author rows, so they are the upstream cause of the blast radius (§5).
- **The detector** (`proof-ba-gestalt.mjs:358–411`): `G8A_RE = /\brides?\s+(?:the\s+)?W-REFLECT\d/i` (forward-deferral) + `G8B_RE = /gestalt verdict\s+(staged|deferred)/i`. Two exemptions: a match **within a backtick/double-quote span** (forensic citation) and a match on a line carrying a **`RETIRE_RE`** marker (`RETIRE[DS]?|forbidden|abolished|zero ["\`]?rides?|…` — narration that names the phrase to kill it). A markdown-bolded `ride **W-REFLECT3**` does NOT match G8A (the `**` breaks `\s+…W-REFLECT`) — which is why `bg-build-map:468` and the AMENDED/FINAL cells dodge the regex while still asserting the abolished model.

**The correct model already exists in the BG doc set (the contradiction is internal):**
- `execution/EXECUTION-PLAN.md §C` (the WAVE-DONE bar): *"Non-authoring gestalt verdict PASS — a FRESH agent … flips the roster row FAIL→PASS … The building agent NEVER flips its own row; there is NO terminal W-REFLECT funnel (`proof:ba-gestalt` G8 reds a wave that defers its verdict)."*
- `execution/real-paint-protocol.md §3`: *"No single terminal flipper. There is NO W-REFLECT funnel wave that flips all verdicts at the end (the write-locked-verdict deadlock that destroyed BB). Each painting wave's row is flipped at ITS OWN close by the non-authoring judge, against ITS OWN fresh capture."*

So the re-home target is **already named on disk**. The fold simply has to make the binding cursor + planning docs SPEAK that model instead of the abolished one.

---

## 2 · The defect (precise mechanism + why it is the keystone)

`proof:ba-gestalt` is `["local","ci","release"]` — the single device-free oracle that lets the 5.0.0 tag fire. Its G8 arm runs **unconditionally, independent of the roster** (`detect()` pushes a violation per G8 hit before it even reads the roster, `proof-ba-gestalt.mjs:458–465`). Therefore:

1. **A non-zero G8 count means the keystone can never reach PASS** — even after the 10 roster verdicts legitimately flip at close, the 2 (or N) accumulated G8 violations keep the gate RED, so **the 5.0.0 tag can never fire**.
2. **The born-RED roster is NOT the issue** — the gate is born-RED by design (0/10 verdicts FAIL) and greens when the verdicts flip at each wave's own close. That is correct and untouched here. PT-1 only needs the **G8 arm clean** so the keystone is ABLE to green.
3. **The blast radius is forward-growing, not static.** The 2 retroactive reds are trivial. The real exposure: each `[P]` paint-gated wave, at its own close, WRITES a paint-status row into `EXECUTION-PROGRESS.md` (a scanned file), copying the cell idiom from `bg-build-map.md`'s resolvedBy column. While that column reads `→ W-REFLECT3`, **every one of the ~61 `[P]` waves re-emits a fresh G8 violation as it lands** — the gate's violation count climbs monotonically as the tranche progresses. That is why the SOURCE (the build-map cells + the row template), not just the 2 retroactive lines, must be corrected (§5).

---

## 3 · The replacement idiom — five semantic buckets, one canon each

The 29 occurrences are not uniform; each re-homes to a REAL self-closing owner. Five buckets:

| Bucket | What it asserts now | Canonical re-home |
|---|---|---|
| **A** — per-surface verdict | "the paint/gestalt verdict **rides W-REFLECT3**" / "the W-REFLECT3 gestalt-flip" / "the W-REFLECT3 π" | "the dual-engine paint verdict is captured + flipped at **THIS wave's OWN close** by the non-authoring judge (`real-paint-protocol §3`)" / "the per-wave own-close π" |
| **B** — `resolvedBy`/`proven-by` ledger cell | a table cell whose resolver token is `→ W-REFLECT3` / `+ W-REFLECT3` / `**W-REFLECT3**` | the **OWNING WAVE's own non-authoring close** (name the real wave; where the real wave is already named, **DELETE the `+ W-REFLECT3` tail**) |
| **C** — explicitly-deferred OPTIONAL wave (VT-ROUTE) | "re-attempt **at W-REFLECT3** … deferred **to W-REFLECT3** … when **W-REFLECT3** runs" | "re-attempt at a future **`BG.W-VT-ROUTE-ENHANCE` re-open** under live paint (the C18 `?capture=` harness) — no terminal funnel" |
| **D** — cross-page harmonized-whole / human-FEEL read | "**WS12** late capture sweep **→ W-REFLECT3**" / "defers the human read … **to a post-integration reflection pass**" | "**WS12 `BG.W-PAGE-COMPONENT-AUDIT`'s OWN close** owns the cross-page harmonized-whole read — a REAL wave with its own close, not a terminal funnel" |
| **E** — abolition narration (KEEP the fact, fix the contradiction) | "WS1 SCRUBBED the literal 'W-REFLECT3' … it is **the name for the deferred post-integration human-verdict step**" | KEEP "there is NO W-REFLECT3 wave in BG — the terminal-reflect deferral is abolished (`real-paint-protocol §3`)"; **DELETE the re-legitimizing clause** that re-defines it as a deferred step |

**Bucket-D is the load-bearing distinction.** WS12 `BG.W-PAGE-COMPONENT-AUDIT` is a GENUINE wave (the all-120-page integration audit) with its own close. The cross-page "one light reads coherent / harmonized whole" read is legitimately ITS scope. The abolished idiom is the PHANTOM `W-REFLECT3` funnel that holds **per-wave** verdicts hostage. Re-home routes the cross-page read to WS12's real own-close; it routes each per-wave verdict to that wave's own close. Both replace the phantom with a self-closing owner.

**Regex-safety of the canon (verified §6):** none of the replacement strings contains `ride`/`rides` immediately followed by (`the`)?`W-REFLECT\d`, and none introduces `gestalt verdict staged|deferred` — so no replacement re-trips G8a/G8b. (A naive paraphrase like `verdict ride W-REFLECT3 at the close` DOES still trip G8a — the re-home must DROP the `W-REFLECT\d` token, not reword around it.)

---

## 4 · The exact remediation manifest (per file · per line · bucket · re-home)

The line numbers are HEAD `4c761b64`; the executing wave re-confirms them (a doc-edit may shift adjacent rows). The `**` blocking rows are the only live gate-reds.

### 4.1 `docs/tranches/BG/execution/EXECUTION-PROGRESS.md` (10 lines — the ONLY scanned file)

| Line | Bucket | Current W-REFLECT substring | Re-home |
|---|---|---|---|
| **38** ★ BLOCKING | A | `dual-engine paint verdict rides W-REFLECT3 / the WS12 late capture sweep, NOT the build frontier` | see §4.1a exact edit |
| 51 | A | `(BG.W-FIELD-AURORA's own W-REFLECT3 gestalt re-paint stays owed …` | `… own per-surface gestalt verdict stays owed at ITS OWN close — this validates the INSTRUMENT, not the wave's verdict)` |
| 96 | C | `re-attempt at W-REFLECT3 with the shell-aurora …` (+ two more on the row: "deferred to W-REFLECT3", "when W-REFLECT3 runs") | `re-attempt at a future BG.W-VT-ROUTE-ENHANCE re-open under live paint (C18 harness)` — replace all three W-REFLECT3 tokens on the row |
| **113** ★ BLOCKING | A | `binding paint rides W-REFLECT3` | see §4.1a exact edit |
| 226 | B | `grain-tail liquid-hover.spec π + ba-gestalt dock/CTA → W-REFLECT3)` | `→ BG.W-PAPER-GRAIN-REAL own close)` (the grain/liquid-hover owner) |
| 231 | D | `(WS12 late capture sweep, Model-B → W-REFLECT3)` | `(WS12 BG.W-PAGE-COMPONENT-AUDIT own close — cross-page whole)` |
| 233 | B | `F-AA-LIVE _anchor re-shoot at ebf6e45b → W-REFLECT3)` | `→ BG.W-GATE-FIELD-AURORA + BG.W-EYEBROW-LIGHT-POLISH own close)` |
| 236 | B | `(non-authoring Metal capture → close / W-REFLECT3)` | `(non-authoring Metal capture → the wave's own close)` — drop `/ W-REFLECT3` |
| 247 | B | `(WebKit compile-time + Metal drift → 13.3/close/W-REFLECT3)` | `(→ 13.3 BG.W-GLASS-BACKDROP-SAMPLE + own close)` |
| 248 | B | `(non-authoring dual-engine Metal capture → close / W-REFLECT3)` | `(non-authoring dual-engine Metal capture → own close)` — drop `/ W-REFLECT3` |

**§4.1a — the two exact BLOCKING edits (old → new, byte-precise, simulation-verified §6):**

- **L38** — within the §0 DAG paragraph. Old:
  `dual-engine paint verdict rides W-REFLECT3 / the WS12 late capture sweep, NOT the build frontier`
  New:
  `dual-engine paint verdict is captured + flipped at THAT painting wave’s OWN close by the non-authoring judge (real-paint-protocol §3) — the cross-page harmonized-whole read is WS12 BG.W-PAGE-COMPONENT-AUDIT’s own scope, NOT the build frontier`

- **L113** — the `3.12 BG.W-EYEBROW-LIGHT-POLISH` row, trailing clause. Old:
  ``` `resolvedBy` for the F-AA phantom-coupling (NOT prose); binding paint rides W-REFLECT3 ```
  New:
  ``` `resolvedBy` for the F-AA phantom-coupling (NOT prose); the binding F-AA-LIVE paint flips THIS row at the wave’s OWN close (the non-authoring dual-engine capture) ```

### 4.2 `docs/tranches/BG/execution/bg-build-map.md` (7 lines — coherence; the upstream SOURCE)

| Line | Bucket | Current | Re-home |
|---|---|---|---|
| 198 | A | `un-regressed (rides W-REFLECT3)` | `un-regressed (verified at THIS wave's own non-authoring close)` |
| 468 | A | `the proof:ba-gestalt dock/CTA verdict ride **W-REFLECT3**` | `… verdict flips at THIS wave's own close (real-paint-protocol §3)` |
| 575 | B | `W-REFLECT3 + the light-eyebrow polish landing` | name the real waves — `BG.W-GATE-FIELD-AURORA + BG.W-EYEBROW-LIGHT-POLISH own close` (drop `W-REFLECT3`) |
| 655 | A | `LOCAL-only, rides W-REFLECT3` | `LOCAL-only; flips at THIS wave's own close` |
| 675 | B | `proven by THIS keystone (C17 calibration) + W-REFLECT3 / the close` | `proven by THIS keystone (C17 calibration) + the wave's own non-authoring close` (drop `W-REFLECT3`) |
| 951 | B | resolvedBy cell `**W-REFLECT3**` | `**BG.W-PAPER-GRAIN-REAL own close**` |
| 953 | B | `**BG.W-GATE-FIELD-AURORA** + **BG.W-EYEBROW-LIGHT-POLISH** + W-REFLECT3` | DELETE the `+ W-REFLECT3` tail (the real waves already own the resolution) |

### 4.3 `docs/tranches/BG/audit/RESPEC/AMENDED-WAVE-PLAN.md` (8 lines — coherence)

| Line | Bucket | Current | Re-home |
|---|---|---|---|
| 33 | A | `+ the W-REFLECT3 gestalt-flip` | `+ the per-wave gestalt-flip at each painting wave's own close` |
| 95 | A | `the proof:ba-gestalt dock/CTA verdict ride **W-REFLECT3**` | `… verdict flips at THIS wave's own close` |
| 97 | A | `The −10 is the W-REFLECT3 π ceremony` | `The −10 is the own-close π ceremony` |
| 152 | B | `BG.W-GATE-FIELD-AURORA (device-free) + W-REFLECT3 (the live arm …)` | `… + the F-AA-LIVE arm at BG.W-GATE-FIELD-AURORA's own close` (drop `W-REFLECT3`) |
| 171 | B | `BG.W-GLASS-BACKDROP-SAMPLE (…) + W-REFLECT3 / the close` | `… + the wave's own non-authoring close` (drop `W-REFLECT3`) |
| 223 | B | resolvedBy cell `**W-REFLECT3** (rides the WS12/close gestalt sweep)` | `**BG.W-PAPER-GRAIN-REAL own close**` |
| 225 | B | `… + **BG.W-EYEBROW-LIGHT-POLISH** (WS3) + W-REFLECT3` | DELETE the `+ W-REFLECT3` tail |
| 255 | A | `G4 the W-REFLECT3 π` | `G4 the own-close π` |

### 4.4 `docs/tranches/BG/FINAL.md` (4 lines — coherence; incl. the §E narration contradiction)

| Line | Bucket | Current | Re-home |
|---|---|---|---|
| 344–345 | D | `The W-REFLECT3-deferred human FEEL verdicts — WS12 defers the human read … to a post-integration reflection pass` | `The cross-page human-FEEL verdicts — WS12 BG.W-PAGE-COMPONENT-AUDIT's OWN close owns the harmonized-whole read (a real wave, not a terminal funnel)` |
| 346–347 | E | `WS1 SCRUBBED the literal "W-REFLECT3" wave-label — there is no W-REFLECT3 wave in BG; it is the name for the deferred post-integration human-verdict step, not a build wave.` | KEEP `there is no W-REFLECT3 wave in BG — the terminal-reflect deferral is abolished (real-paint-protocol §3)`; **DELETE** `it is the name for the deferred post-integration human-verdict step` (the re-legitimizing clause is the contradiction) |
| 549 | B | resolvedBy cell `… + **W-REFLECT3**` | DELETE the `+ W-REFLECT3` tail (real waves named) |
| 550 | B | resolvedBy cell `**W-REFLECT3** (rides the WS12/close gestalt sweep)` | `**BG.W-PAPER-GRAIN-REAL own close**` |

---

## 5 · The ordering fix (the durable half — without it the blast radius regrows)

The 27-line re-home is retroactive cleanup. The forward-growing exposure (§2.3) needs three ordering corrections:

1. **Home the re-home at STAGE-0 (LANDS FIRST, before WS1/any `[P]` close).** The execution sequence already front-loads a STAGE-0 ground-freeze + the WS7 Band-0 no-silent-drop ledger + `BG.W-CLOSEFIX-9SITE` (G4) before WS1 (`bg-build-map.md:13,36,66`; `EXECUTION-PROGRESS.md:30–33`). Add a STAGE-0 `[H]` doc-correction micro-wave **`BG.W-REFLECT3-REHOME`** (a pure doc edit + the §7 gate-clean verification; zero integration dependency, so it sits beside `BG.W-DISPOSITION-RESTAMP` / the no-silent-drop ledger). It MUST land before any `[P]` wave close, because a `[P]` close that copies a still-`→ W-REFLECT3` build-map cell into a new `EXECUTION-PROGRESS.md` row re-reds G8. (Alternatively, fold this into the existing Band-0 ledger wave that already reconciles claim-rows — but a dedicated micro-wave keeps the verification check legible.)

2. **Correct the ROW TEMPLATE the builders copy from.** The `EXECUTION-PROGRESS.md` legend (lines 11–19) already defines `PAINT-PENDING` CORRECTLY (`device-free gate GREEN + integrated; awaiting the NON-AUTHORING dual-engine paint verdict` — no funnel). Add one TEMPLATE NOTE under the legend, binding the row idiom:
   > **Paint-cell idiom (binding).** A `[P]` wave's paint cell records the verdict at the wave's OWN close (`real-paint-protocol §3`). NEVER write `rides W-REFLECT3` / `→ W-REFLECT3` / `deferred to W-REFLECT3` — there is no terminal reflect wave; `proof:ba-gestalt` G8 reds it. The cross-page harmonized-whole read is `WS12 BG.W-PAGE-COMPONENT-AUDIT`'s own-close scope.

   This makes the SOURCE every future row is copied from carry the correct idiom — the durable fix for the ~61-wave blast radius.

3. **Re-home the SOURCE cells first, then the cursor.** Within `BG.W-REFLECT3-REHOME`, apply §4.2 (`bg-build-map.md`, the builders' source) and §4.3/§4.4 (the planning record) BEFORE/with §4.1 (the cursor), so no [P] wave can pull a stale cell between the cursor fix and the build-map fix.

**OPTIONAL hardening (defense-in-depth, booked not required):** widen the G8 scan to ALSO cover `bg-build-map.md` (an explicit-path add to `g8ScopedFiles()`, since it has no `PROGRESS` basename). This is only safe AFTER §4.2 lands (else `bg-build-map:198,655` become 2 fresh reds). It converts the build-map source from "linted by convention" to "linted by gate." Recommend booking it to the close-machine wave that already owns G8 (`BG.W-PAINT-IS-THE-GATE`), NOT folding it into this doc-correction — gate surgery is a separate concern from the prose re-home.

---

## 6 · Feasibility proof (run on disk this pass)

**(a) The 2 blocking edits drive the G8 arm to 0.** A node simulation read `EXECUTION-PROGRESS.md`, applied the §4.1a old→new strings IN MEMORY, and re-ran the gate's exact G8 line-scan (`G8A_RE`/`G8B_RE` + the quote-span + `RETIRE_RE` exemptions) over BOTH scanned files:
```
edit-anchors present: L38=1 L113=1
POST-FIX G8 hits across BOTH scanned files: 0
FEASIBLE: G8 arm clean after the 2-line fix
```
The old-strings exist verbatim (anchors=1), and the new-strings match neither G8 regex.

**(b) The canon replacements are regex-safe.** Each Bucket-A/B/C/D replacement string was tested against `G8A_RE`/`G8B_RE`: all `ok` (no hit). A control string `verdict ride W-REFLECT3 at the close` correctly registered `HIT` — confirming the test has teeth and that the re-home MUST drop the `W-REFLECT\d` token (not reword around it).

**(c) The abolition narration stays exempt.** A `there is NO W-REFLECT3 wave … abolished` line matches `RETIRE_RE` → exempt (and carries no `rides` anyway). FINAL §4.4 L346's KEEP half is safe.

**(d) The keystone behaviour after the fix is correct, not green-yet.** With G8 clean, `proof:ba-gestalt` still exits 1 — on the **born-RED roster** (0/10 verdicts FAIL by design). That is the INTENDED state mid-tranche; the keystone greens when the 10 roster verdicts flip at each painting wave's own close. PT-1's job is solely to ensure the G8 arm is **clean and stays clean**, so the keystone is ABLE to green at the close. The fix HOLDS.

---

## 7 · The verifying check (what the executing wave runs to prove the re-home landed)

1. **Primary — the gate G8 arm is clean:**
   ```
   node scripts/proof-ba-gestalt.mjs 2>&1 | grep 'G8 no-terminal-reflect'
   # MUST read: "… files scanned — 0 DEFERRAL HIT(S)"   (no "✗ [G8-NO-TERMINAL-REFLECT/…]" lines)
   ```
   (The gate overall stays exit 1 on the born-RED roster — that is correct; assert the G8 line specifically.)

2. **Coherence guard — every surviving `W-REFLECT\d` mention is narration/citation, not assertion** (covers the 3 un-scanned planning docs too):
   ```
   node -e '
   const fs=require("fs");
   const RETIRE=/\b(RETIRE[DS]?|forbidden|abolished|SCRUBBED|no W-REFLECT\d wave|zero ["`]?rides?)\b/i;
   const files=["docs/tranches/BG/execution/EXECUTION-PROGRESS.md","docs/tranches/BG/execution/bg-build-map.md","docs/tranches/BG/audit/RESPEC/AMENDED-WAVE-PLAN.md","docs/tranches/BG/FINAL.md"];
   let bad=0;
   for(const f of files) fs.readFileSync(f,"utf8").split("\n").forEach((l,i)=>{
     if(/W-REFLECT\d/.test(l) && !RETIRE.test(l)){ console.log(`${f}:${i+1}  ${l.trim().slice(0,90)}`); bad++; }
   });
   console.log(bad===0 ? "GUARD CLEAN — every W-REFLECT mention is abolition-narration" : `GUARD: ${bad} un-narration deferral mention(s) survive`);
   '
   ```
   Expect `GUARD CLEAN`. (Today this prints all 29; after the re-home only the FINAL §346 abolition line — which carries `SCRUBBED`/`no W-REFLECT3 wave` — survives, and it is narration.)

3. **Template guard — the source builders copy from is corrected:**
   ```
   grep -nE 'rides? .*W-REFLECT|→ *W-REFLECT|deferred to W-REFLECT' docs/tranches/BG/execution/bg-build-map.md docs/tranches/BG/execution/EXECUTION-PROGRESS.md
   # MUST be empty; AND the EXECUTION-PROGRESS legend MUST carry the "Paint-cell idiom (binding)" note (§5.2).
   ```

4. **Regression floor — siblings + scope:** `node scripts/verify-siblings-intact.mjs --quiet` (exit 0). Note the G8 scope regex is **case-sensitive uppercase `PROGRESS`** — a future agent must not assume a lowercase-`progress` doc is guarded; the coherence guard (check 2) is path-explicit and covers that gap.

---

## 8 · Verdict

**Feasible — TRUE.** The fix HOLDS and is small:

- **Blocking (gate-red today):** 2 byte-precise edits in `EXECUTION-PROGRESS.md` (§4.1a), proven to drive the G8 arm to 0 hits (§6a).
- **Coherence (prevents the blast radius):** a mechanical 27-occurrence re-home across all 4 binding docs under 5 named buckets with one canon each (§3–§4), all regex-safe (§6b).
- **Durable (stops regrowth):** a STAGE-0 `[H]` doc-correction wave `BG.W-REFLECT3-REHOME` that lands FIRST, the `bg-build-map` source cells corrected ahead of the cursor, and a one-line binding paint-cell TEMPLATE NOTE in the legend so no future `[P]` close re-emits the idiom (§5).
- **Verified by:** the gate's own G8 line (`0 DEFERRAL HIT(S)`) + a path-explicit coherence guard over the un-scanned planning docs + a template guard (§7).

The re-home target is not invented — the plan's OWN `EXECUTION-PLAN.md §C` + `real-paint-protocol.md §3` already state the per-wave self-close model verbatim. PT-1 makes the binding cursor and planning docs SPEAK that model. **No feasibility blocker; a pure internal-consistency repair with the highest leverage in the set (it is the only thing standing between a closed tranche and a tag that can never fire).**
