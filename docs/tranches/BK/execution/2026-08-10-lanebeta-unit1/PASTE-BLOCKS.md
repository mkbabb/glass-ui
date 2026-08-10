# BK · Lane β · unit β0 — PASTE-BLOCKS

Literal `⊕ⁿ` / `<SHA>` placeholders throughout: this seat does not own the cursor, and the
annotation seat substitutes them at the landing. Everything else is paste-ready verbatim.

---

## §1 · CURSOR BLOCK — `docs/tranches/BK/EXECUTION-PROGRESS.md`, appended after the ⊕⁷⁵ paragraph

> **LINE-CITE DRIFT WARNING for the annotation seat**: inserting this block shifts every
> cursor self-cite BELOW it by the block's own line count. State the shift in the block, per
> ⊕⁷²/⊕⁷⁵ precedent; do not re-number committed records to chase an append.

```markdown
⊕ⁿ **LANE β UNIT β0 — THE `darkModeSyncScript` COMMIT SEAT LANDS (2026-08-10, `<SHA>`), AND THE PARKED DIFF THAT COST TWICE IS PAID OFF.** The 36/1 diff parked at `src/composables/dark/darkModeSyncScript.ts` — the one that contaminated ⊕⁷⁴'s ratchet datum (L-1) and made ⊕⁷³'s clean-tree guard unsatisfiable — is landable: three optional fields on `DarkModeSyncScriptOptions` (`defaultDark` · `queryOverride` · `normalize`), precedence **query > storage > default**, `MIGRATION.md` **§8.1.0 — UNRELEASED** authored above §8.0.0 with its own honesty detector (`node -p "require('./package.json').version"` → `8.0.0`), and **eight arms under the already-seated `G-NO-FLASH`**. **THE ROW'S HEADLINE IS A DEFECT THE LANE ORDERED NOTED AND THIS SEAT CURED INSTEAD, and the deviation is declared rather than slipped in**: the parked diff wrapped the `"os"` fallback in a paren pair that is **inert to the semantics and load-bearing to the hash**, moving the DEFAULT emission **300 B → 302 B** and its CSP digest `sha256-VTba/T+6rX/y5+Gk2oyLaaYBdLf4xSZtXnc7kMYziI8=` → `sha256-Ww9UmE068him9LdkxjP90V0vytb88DNBMippYt5AHHk=`. An inline `<head>` script is exactly what `script-src 'sha256-…'` pins, so a re-hashed default is **BLOCKED AT FIRST PAINT** — no type error, no runtime error, no console line a consumer would attribute to a bump — and the FOUC eliminator fails silently *into* FOUC. **The parens are gone, the default is byte-identical to what 8.0.0 shipped, and an arm now pins both figures**; only an opt-in arm moves bytes, and a consumer opting in is editing its head script anyway. **Both figures are DERIVED from the function** on a pristine `git archive HEAD` tree and on the working tree, never typed — the CURE-66-1 lesson. **TWO BEHAVIOURS ARE RATIFIED WITH GROUNDS, NOT INHERITED SILENTLY, and each gets its own arm so no later reader mistakes them for accidents.** (i) **`normalize` runs AFTER `queryOverride`, so a `?dark` visit PERSISTS into that browser's storage** — ratified because the reverse order is worse in the module's own terms: the runtime composable re-reads storage, finds `"auto"`, and flips the page back one frame after the stamp, which is the flash again one level down. The consequence is NAMED in MIGRATION rather than hidden: the pair is for **capture profiles, never a shared user-facing origin**, where one link would permanently change an end user's stored preference. (ii) **The query flags are PRESENCE flags, so `?dark=false` reads DARK** — `q.has("dark")` is value-blind by construction, ratified because a value grammar is a second, weaker way to say what `?light` already says; `?dark=0` / `?dark=light` / `?dark=false` / `?light&dark` all read dark, and the row tells a consumer to emit the flag or omit it. **SEATS +0, RECEIPT BYTE-IDENTICAL**: the arms file as close-battery rows under `G-NO-FLASH`, a seated MOTION name, exactly as #29's 27 route-grammar arms and #66's two did — `seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0`, unmoved. **The `SEAT-BINDING.json` promotion is REFUSED AND ROUTED, not taken**: `bound:13 → 14` would re-pin `gate-register.test.ts:172-174` and it is **#65's act**, already open as **RT-29A**; §B.5's own law is that no seat is bound on the scan alone, and a lane does not spend another row's act — **RT-β0-A** re-states the route with a second live-name file behind it. **BORN-RED IS MEASURED IN BOTH DIRECTIONS, on two scratch trees**: against `git archive HEAD`, **6 failed | 12 passed (18)**, real exit **1**, with the ONE pristine-green arm NAMED rather than counted away (`the three seams are OPT-IN` is a regression arm over pre-existing behaviour — HEAD already emits one IIFE and already reads no query); against the **parked** bytes — this unit's real pre-state — the CSP arm alone REDs, **1 failed | 17 passed (18)**, exit **1**, that tree's emission re-derived on it at **302 B / `sha256-Ww9UmE068him9LdkxjP90V0vytb88DNBMippYt5AHHk=`**. Working tree after the cure: **18 passed (18)**, exit **0**. **THE ADJUDICATION RETURNED CURE-REQUIRED ON A DEFECT IN THE GATE'S OWN BYTES, AND THE CURE IS THE DETECTOR, NOT THE PROSE**: the `no-globals` arm measured leakage as new own keys of the `with(scope)` object, which a leak never reaches — a non-strict unqualified assignment SKIPS the scope object and lands on the calling function's global (`with(scope){q=…}` → `scope` leaked `[]`, `globalThis.q` live), so Challenger A's m4 mutant passed 18/18. The arm now runs the emitted string through `node:vm` `runInNewContext(out, host)`, where **the seeded host IS the run's global** — the surface an inline `<head>` script actually has. **KILL-CHECKED in a scratch tree, never the repo tree**: dropping `var` from the queryArm emission (`darkModeSyncScript.ts:93`) FAILS the arm, `AssertionError: expected [ 'q' ] to deeply equal []`, **1 failed | 17 passed (18)** exit **1**, against a scratch control of **18 passed (18)** exit **0** on pristine source. The born-RED figure above moved for that reason and is RE-MEASURED, not carried. **THE RATCHET IS MEASURED ON A β0-ONLY COMMITTED-SHAPE TREE AND DELIBERATELY NOT REBOUND** — ⊕⁷⁴'s L-1 is this very file's lesson, so the tree was materialised by `git archive HEAD` + only β0's files, excluding three concurrent lanes by construction: `G-BUNDLE-RATCHET: bundle ratchet increase forbidden: **2634568 > 2633353**`, i.e. **β0 costs +1,215 unpacked content bytes**, and it reconciles to the byte against its parts — `darkModeSyncScript.d.ts` **990 → 1,907** (+917) and the dark chunk **2,244 → 2,542** (+298), the chunk cross-checking the cure exactly (⊕⁷⁴ measured the parked chunk at **2,544**; 2,544 − 2 = 2,542). A rebind is owner-worded at the commit (⊕¹⁶) and this is a **four-lane batch**, so the correct rebind is ONE, at batch close, over the whole committed set, as a sum of named contributions; **β0's named contribution is +1,215** and `npm run verify:package` stands RED on `G-BUNDLE-RATCHET` until then — stated, not papered over. **THE π PAIR IS ENQUEUED, NOT CLAIMED** (`PI-QUEUE.md` → the singleton browser seat; this seat opened no browser), and the enqueue had to state a finding first: **`darkModeSyncScript()` has ZERO injection sites in this repo** — the demo stamps the class itself off `?mode=dark` at `demo/main.ts:86-103` — so a π run against the demo would measure `demo/main.ts`, not this module. The pair therefore runs against a **temp-path harness**, the module's own emitted string injected as its doc comment prescribes, each cell **mode-asserted (P0)** under the OPPOSITE platform preference and the OPPOSITE stored value so only the query can produce the expected stamp; the harness body is **402 B and byte-compared against the function's output**, not transcribed. **VERIFY, verbatim, real exit codes**: `vue-tsc --noEmit` **0** · `vue-tsc --noEmit -p tsconfig.test.json` **0** · the unit file **0** (`18 passed`) · `public-surface` **0** (**87/87 unchanged** — the interface widens, the surface does not) · `gate-register` **0** (the receipt above) · the narrow battery `tests/styles tests/components tests/gates tests/composables` **1 failed | 1769 passed | 5 expected fail (1775)**. **THE STANDING BATTERY FIGURE MOVED BY GROWTH, NOT BY THIS UNIT** — the brief's `1538` is #66's line at the 8.0.0 cut and rows have landed since; the load-bearing half, `5 expected fail`, is unchanged. **AND THE ONE FAILURE IS ATTRIBUTED BY MEASUREMENT, NOT BY ASSERTION**: `boot-graph.test.ts`'s build arm walks ALL of `src/` and `demo/` for `max(mtime)` (`:545-553`), so it is a BATCH-level staleness gate any lane trips; the six newest sources at measurement are **all foreign** (`ConfiguratorRow.vue` 16:58:06Z · `expandable-container/styles.css` 16:57:56Z · `ExpandableContainer.vue` 16:57:33Z · `configurator/styles.css` 16:57:24Z · `Configurator.vue` 16:56:06Z · `typography.vue` 16:54:43Z) and β0's newest (`darkModeSyncScript.ts`, 16:52:05Z) is **seventh** — removing it does not move the maximum. Its remedy, `npm run demo:dist:build`, belongs to batch close. **THE FENCE HELD AND WAS RE-HASHED**: both UNKNOWN-OWNER surfaces re-hash to their step-0 digests **exactly** — `src/styles/glass/material.css` `5eeaf21cd508e5de…` ≡ baseline, `tests/styles/material-css-syntax.test.ts` untracked and unopened — as does foreign `aurora.vue` (`a29cc77082df8064…`); `typography.vue` moved at 16:54:43Z under a concurrent lane and this seat never opened it. Porcelain **5 → 18**, the index never staged, β0's four paths named. Record: `docs/tranches/BK/execution/2026-08-10-lanebeta-unit1/RECORD.md`.
```

---

## §2 · COMMIT MESSAGE — the driver's, and it must NAME the ratchet posture

```
feat(dark): darkModeSyncScript gains defaultDark · queryOverride · normalize (BK β0)

The 36/1 parked diff made landable. Three optional fields on
DarkModeSyncScriptOptions; precedence query > storage > default. No export
name is added or moved — the interface widens, the surface does not
(public-surface 87/87 unchanged).

The default emission is BYTE-IDENTICAL to what 8.0.0 shipped — 300 B,
sha256-VTba/T+6rX/y5+Gk2oyLaaYBdLf4xSZtXnc7kMYziI8= — and that took a cure,
not luck: the parked diff wrapped the "os" fallback in parens that are inert
inside the && chain they substitute into and load-bearing to the hash. An
inline <head> script is what script-src 'sha256-…' pins, so a re-hashed
default is blocked at first paint and the FOUC eliminator fails silently into
FOUC. An arm pins both figures.

Two behaviours RATIFIED with grounds and stated in MIGRATION §8.1.0
(UNRELEASED; 8.0.0 is the published version): normalize runs after
queryOverride, so a ?dark visit persists into that browser's storage (the
order that makes a forced mode survive hydration — capture profiles, never a
shared user-facing origin); and the query flags are presence flags, so
?dark=false reads dark.

Eight arms under the already-seated G-NO-FLASH. SEATS +0, gate-register
receipt byte-identical. The SEAT-BINDING promotion stays #65's (RT-29A).

RATCHET, DISCLOSED AND NOT REBOUND HERE: measured on a git-archive HEAD tree
carrying only this unit's files, 2634568 > 2633353 — +1,215 unpacked content
bytes (d.ts 990 → 1,907; dark chunk 2,244 → 2,542). Per ⊕¹⁶ the rebind is
owner-worded, and in a four-lane batch it belongs at close as a sum of named
contributions. verify:package stands RED on G-BUNDLE-RATCHET until then.
```

---

## §3 · TERMINAL-ROSTER / EXEC-STATE STAMP — the routed residue, verbatim

```markdown
**Lane β unit β0 routed residue (2026-08-10, `<SHA>`)** — **RT-β0-A** the `G-NO-FLASH`
register bind (`bound:13 → 14`, re-pins `gate-register.test.ts:172-174`) → **#65**, joining
the unspent **RT-29A**; two live-name files now stand behind it
(`tests/styles/route-motion.test.ts:213` + `tests/composables/dark/darkModeSyncScript.test.ts`).
**RT-β0-B** the `.bundle-ratchet` rebind, **+1,215** from β0, → **batch close**, owner-worded
per ⊕¹⁶. **RT-β0-C** the `?light`/`?dark` forced first-paint π pair → the **singleton browser
seat**, spec at `docs/tranches/BK/execution/2026-08-10-lanebeta-unit1/PI-QUEUE.md`, **OPEN**.
**RT-β0-D** the consumer addendum for the three options → **#76's channel**, at the minor cut.
**RT-β0-E** `boot-graph.test.ts:563`'s hint asserts *"npm test runs it first"*; `npm test` is
`vitest run` and runs no build — a dead hint, unclaimed.
```

---

## §4 · WHAT THE ANNOTATION SEAT MUST NOT DO

- **Do not** promote `G-NO-FLASH` in `SEAT-BINDING.json` while landing this unit. That moves
  `bound:13 → 14` and re-pins `gate-register.test.ts`; it is #65's act (RT-29A) and the
  receipt quoted in §1 would stop being true of the tree.
- **Do not** rebind `.bundle-ratchet` to `2634568`. That figure is β0 **alone**; three lanes
  are concurrent and the close figure will be larger. Rebind once, at close, and name every
  contribution.
- **Do not** attribute `boot-graph`'s build-arm failure to this unit. The mtime table in §1 is
  the measurement; the remedy is `npm run demo:dist:build` at batch close.
