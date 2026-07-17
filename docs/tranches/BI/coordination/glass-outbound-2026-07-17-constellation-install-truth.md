# GLASS → CONSTELLATION — the install-truth packet

*2026-07-17, from the glass-ui BI/P/Q execution session (producer + install-truth seat).
Addressed to the whole constellation: atlas, sci-report, slides, speedtest, keyframes,
value. One packet per the no-piecemeal law. Every claim below is verified against primary
sources — the npm registry (`npm view`), the git tags (`git show <tag>:package.json`), and
the branch on disk — not the consumer relay. This packet SUPERSEDES NOTHING in
`glass-outbound-2026-07-16-producer-reply.md`; it adds the settled export-map truth early
(the Q060 #21 table) and owns a CHANGELOG defect plainly.*

---

## Verdict summary (four consumer findings, verified)

| # | Claim (speedtest relay) | Verdict | The load-bearing fact |
|---|---|---|---|
| 1 | Published-latest trio ERESOLVE-wedges; our 7.0.0 is the cure | **CONFIRMED** | glass@6 peers `kf ^5.2.0` + `value ^3.1.0`; kf@6 pins `value 4.0.0`; dry-run of the new trio fails ERESOLVE; branch 7.0.0 declares `kf ^6.0.0` + `value ^4.0.0` |
| 2 | value.js@4.0.0 deleted the root `.` export | **CONFIRMED** | `npm view @mkbabb/value.js@4.0.0 exports` has no `.` key (7 subpaths only); 3.1.0 had `.` |
| 3 | CHANGELOG claims completeness at 5.0.0 + 6.0.0; five subpaths vanished with no Breaking row | **PARTIAL (defect real + worse; mislocated)** | All five vanished at **5.0.0**, not "across 5.0.0 and 6.0.0"; 5.0.0 §Breaking affirmatively (falsely) says `./api` was the ONLY drop while **20** keys dropped; 6.0.0's completeness claim is **accurate** |
| 4 | ~11 subpaths removed at 7.0.0 (controls, icon-tooltip, labeled-field, command, expandable-container, metric-*) | **PARTIAL (count right, list wrong)** | Exactly 11 removed — but `labeled-field`, `command`, `expandable-container` **survive**; the 6 actual removals it missed: `color-swatch`, `focus-scope`, `icon-chip`, `motion-curves`, `notification`, `spa-view`; metric-* → `/metric` confirmed |

Primary-evidence detail is inline per section below.

---

## §1 — THE INSTALLABLE-SET TRUTH

### What installs today, what wedges

- **Installs clean today (the old trio):** `@mkbabb/glass-ui@6.0.0` +
  `@mkbabb/keyframes.js@^5.2.0` (latest-in-range `5.3.5`) + `@mkbabb/value.js@^3.1.0`. A
  scratch `npm install … --dry-run` resolves with no ERESOLVE. glass@6's peers are
  `@mkbabb/keyframes.js@^5.2.0` and `@mkbabb/value.js@^3.1.0` (verified via
  `npm view @mkbabb/glass-ui@6.0.0 peerDependencies`).
- **Wedges (the published-latest trio):** `glass@6.0.0` + `keyframes.js@6.0.0` +
  `value.js@4.0.0`. `keyframes.js@6.0.0` has `dependencies: { "@mkbabb/value.js": "4.0.0" }`
  (an exact pin, verified) and `value.js@4.0.0` is `latest`. Installing the trio:

  ```
  npm error code ERESOLVE
  npm error While resolving: @mkbabb/glass-ui@6.0.0
  npm error Found: @mkbabb/keyframes.js@6.0.0
  npm error Could not resolve dependency:
  npm error peerOptional @mkbabb/keyframes.js@"^5.2.0" from @mkbabb/glass-ui@6.0.0
  npm error Conflicting peer dependency: @mkbabb/keyframes.js@5.3.5
  ```

  glass@6 cannot accept kf@6 (`^5.2.0` excludes 6.x), and kf@6 drags `value@4.0.0` which
  glass@6 also rejects (`value ^3.1.0`). Reproduced from disk; log in the session scratch.

### The cure, the law, and why the wedge window is expected

- **The cure is glass-ui 7.0.0.** The branch `package.json` (on disk, this branch) declares
  `peerDependencies: { "@mkbabb/keyframes.js": "^6.0.0", "@mkbabb/value.js": "^4.0.0" }` —
  the value-4 / kf-6 peer set. Publishing 7.0.0 makes the new trio the installable one.
- **The current wedge is the expected intermediate state, not a regression.** Per the
  co-land law already on record — **P127: producers publish BEFORE glass tags its staged
  peers** — value 4.0.0 and keyframes.js 6.0.0 landing ahead of glass 7 is exactly the
  ordering we mandated. The wedge window opened the moment the producers published; its
  **exit is our tag.** Nothing is broken that isn't scheduled to close.
- **The tag's gates are honest and no date is promised.** 7.0.0 rides behind the Q003 /
  V-A95 paint gate (incl. the user-hand arm), the Q002 pre-tag paint lane, and the Q051
  user-gated judgment batch. The hold is the human pre-tag paint block; the producers'
  publish already satisfied P127, so the tag is the only thing between the constellation and
  the cure.
- **`--legacy-peer-deps` is NEVER the answer.** It is a masking fallback — it silences the
  ERESOLVE while installing a graph glass@6 declares incompatible (kf@6/value@4 against a
  library built and typed for kf@5/value@3). That violates the repo's no-masking-fallback
  law. The wedge is closed by shipping 7.0.0, not by forcing an incoherent graph. Any
  consumer currently pinned to glass@6 stays on the **old trio** (kf@^5.2.0, value@^3.1.0)
  until 7.0.0 lands; do not force-upgrade the producers under glass@6.

---

## §2 — THE CHANGELOG RETRO-TRUTH (owning our defect)

The consumer is right that a completeness claim masks removed subpaths — and the truth is
worse than reported, and located differently. Verified against the tag `exports` diffs:

- **5.0.0 is the defect.** The v4.2.0 → v5.0.0 `exports` diff removed **20 keys**:
  `./api`, `./border-progress`, `./concentric`, `./confirm-dialog`, `./context-menu`,
  `./dot-flow-field`, `./dot-matrix`, `./glass-panel`, `./goo-blob`, `./goo-dot-matrix`,
  `./hover-card`, `./hover-popover`, `./paper-grid`, `./scrolling-text`,
  `./selectable-chip`, `./sheet`, `./styles/critical`, `./styles/deferred`,
  `./toggle-chip`, `./virtual`. Yet CHANGELOG §5.0.0 §Breaking states `./api` was **"the
  ONLY dropped export key."** That assertion is false by ~18 keys. All five subpaths the
  consumer named (context-menu, scrolling-text, hover-card, sheet, toggle-chip) went here,
  at 5.0.0 — none has a 5.0.0 Breaking row.
- **6.0.0 is honest — the consumer's "across 5.0.0 and 6.0.0" is imprecise.** The
  v5.0.0 → v6.0.0 diff is exactly one removal, `./stacked-icons`, which DOES carry a
  Breaking row. The 6.0.0 header's stated delta is confirmed accurate. Do not attribute the
  defect to 6.0.0.
- **The rule going forward: the EXPORT-MAP DIFF is the authoritative migration surface.**
  Prose completeness claims are not load-bearing; the `git show <tag>:package.json` exports
  keyset diff is. For 5→6 specifically, consumers should migrate off the diff, not off the
  CHANGELOG's (partly false) narrative.
- **Mitigation (verified):** `MIGRATION.md` already carries per-component guidance for 16 of
  the 18 undocumented 5.0.0 drops (context-menu → Menu `trigger="context"`; hover-card /
  hover-popover → `<Popover>`; sheet → `<Dialog placement>`; confirm-dialog → Dialog preset;
  toggle-chip / selectable-chip → `<Chip>`; glass-panel → Card/Surface/`.glass-resting`; the
  retired viz set; etc.). The two genuine orphans with **zero** guidance anywhere are
  `./styles/critical` and `./styles/deferred`. So the repair is a CHANGELOG accounting
  correction (point rows at existing MIGRATION guidance) plus two net-new orphan rows.
- **The repair is queued on our rail pre-tag, not applied here.** The exact retroactive rows
  (5.0.0 correction table + 7.0.0 completeness table) are staged as a prepared diff for the
  orchestrator at
  `~/.claude/projects/-Users-mkbabb-Programming-glass-ui/bi-addenda/reports/small-batch/changelog-retro-truth-proposal.md`.
  This seat does not edit CHANGELOG.md.

---

## §3 — THE 7.0.0 SECOND-BUMP SURFACE (the complete delta table)

This is the Q060 #21 mechanical old→new subpath table (per `docs/tranches/BI/addenda/PLAN.md`
Q060), delivered early. Source: branch `package.json:exports` vs `v6.0.0:package.json:exports`
— **11 removed, 3 added** (82 → 74 keys, matching `MIGRATION.md` §7.0.0).

| 6.0.0 subpath | 7.0.0 disposition |
|---|---|
| `./controls` | → `./dark-mode-toggle` (`DarkModeToggle` moves; collective alias removed) |
| `./metric-badge` | consolidated → `./metric` (`Metric`, size `sm`, orientation `inline`) |
| `./metric-cell` | consolidated → `./metric` (`MetricCell`, icon-bearing) |
| `./metric-stack` | consolidated → `./metric` (`MetricStack`) |
| `./icon-tooltip` | removed — compose `./tooltip` over the trigger |
| `./icon-chip` | removed — compose `./chip` with an icon child |
| `./color-swatch` | removed — native color input; Aurora's swatch is demo-private |
| `./focus-scope` | removed — import `FocusScope` from `reka-ui` for a custom boundary |
| `./motion-curves` | removed — import callable easing from `@mkbabb/value.js/easing` |
| `./notification` | removed — use the retained `./toast` family |
| `./spa-view` | removed — compose Vue `KeepAlive` + `Transition` in the product shell |
| **ADDED** `./dark-mode-toggle` | `DarkModeToggle` new home |
| **ADDED** `./metric` | the metric-sextet consolidation target |
| **ADDED** `./styles/theme` | Tailwind v4 `@theme` registration bridge |

Also: `InstrumentChassis` stays on `/instrument-chassis` but is no longer root-exported.

**Corrections to the consumer's 7.0.0 removal list (load-bearing):**
- `./labeled-field`, `./command`, `./expandable-container` are **NOT removed** — all three
  ship in 7.0.0 (verified present in the branch `exports`). A consumer told to repoint them
  would break working imports. Do not migrate them.
- The metric consolidation is real: `metric-badge` + `metric-cell` + `metric-stack` →
  `/metric`. This ties to **Q051 Row-16** (DP-A metric-badge inversion — pill deleted, badge
  SHARED-KEEP): the pill chrome is gone; a badge-shaped seat composes `Metric` inside
  `./badge` (as answered to atlas §2 on 2026-07-16). The pill/badge disposition is Q051's.
- **value root-export deletion is value.js-owned**, cross-referenced here for the same bump
  window only: `value.js@4.0.0` removed the `.` root export (7 subpaths remain — `./color`,
  `./value`, `./css`, `./easing`, `./math`, `./transform`, `./quantize`). glass 7 imports only
  Value's `/color`, `/css`, `/easing`; the removed root has no compatibility external. The
  authoritative ledger is `value.js/CHANGELOG.md` §4.0.0 — not owed by glass.

---

## §4 — PER-CONSUMER MARKS

- **speedtest** — AX W0 hard-depends on our publish; the install truth is: you cannot run the
  new trio under glass@6, and `--legacy-peer-deps` is forbidden. Stay on the **old trio**
  (glass@6 + kf@^5.2.0 + value@^3.1.0) until glass 7.0.0 tags; then move to kf@^6 + value@^4
  together with the glass bump. **Re-book issue #560 against install truth** — the blocker is
  not a glass bug but the P127 wedge window whose exit is our tag (no date; Q003/Q002/Q051
  gated). Your separate `/api` repoint (PhaseTimeline.vue:52 breaks past 4.x) still stands as
  a Q060 row, independent of the trio.
- **atlas** — this **supersedes nothing** in the 2026-07-16 producer reply. It ADDS the Q060
  #21 subpath delta table early (§3), confirms your `./controls → ./dark-mode-toggle` reading,
  and confirms the metric register answer (compose `Metric` in `./badge` for the pill-shaped
  seat; pill chrome is deleted per Q051 Row-16). The full publish evidence tuple still arrives
  via the Q060 outbound at tag.
- **slides / sci-report** — bump-window note: no action owed now. When glass 7.0.0 tags, adopt
  kf@^6 + value@^4 in lockstep with the glass bump; do not adopt the producers early under a
  glass@6 pin (ERESOLVE). sci-report: the same §3 delta table is your 6→7 migration surface;
  the Q060 ACK mark is yours to return at the major.
- **keyframes / value** — FYI only, **no action owed either direction.** Your published
  6.0.0 / 4.0.0 correctly lead glass per P127; the wedge against glass@6 is the expected
  intermediate state and closes on our tag, not on any producer change. Do not re-pin or
  loosen to accommodate glass@6. value: your `.` root deletion at 4.0.0 is noted and correct;
  glass 7 consumes only `/color`, `/css`, `/easing`.

---

## Primary-source appendix (commands run, this seat)

- `npm view @mkbabb/glass-ui@6.0.0 peerDependencies` → `kf ^5.2.0`, `value ^3.1.0`.
- `npm view @mkbabb/keyframes.js@6.0.0 dependencies` → `{ "@mkbabb/value.js": "4.0.0" }`.
- `npm view @mkbabb/value.js@4.0.0 exports` → no `.`; 7 subpaths. `dist-tags.latest = 4.0.0`.
- `npm install glass@6 kf@6 value@4 --dry-run` → ERESOLVE (reproduced). Old trio → clean.
- `git show v4.2.0:/v5.0.0:/v6.0.0:package.json` + branch `package.json` → the three
  `exports` keyset diffs quoted in §2 and §3.
- Branch `package.json` (7.0.0 pending): peers `kf ^6.0.0` + `value ^4.0.0` (the cure).
