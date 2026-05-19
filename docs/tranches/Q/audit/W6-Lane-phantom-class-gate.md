# Q.W6 — Phantom-class corpus-grep gate (invariants 32 + 33)

**Wave**: Q.W6 close — precept advance.
**Lane**: invariant-32/33 gate codification.
**Date**: 2026-05-18.
**Bounds**: `scripts/proof-phantom-classes.mjs` (new), `.retired-classes.txt`
(new), `package.json` (one script entry), `.github/workflows/ci.yml` (one CI
step). No `src/` change.
**Verification gate**: `npm run proof:phantom-classes` (the gate runs itself).

---

## 1 — Charter

Q.md §2 codifies two new invariants at W6:

- **Invariant 32 — phantom-class corpus-grep gate.** When a CSS class is
  RETIRED from glass-ui, the retiral lands with (a) an entry in
  `.retired-classes.txt` and (b) a fleet-wide grep across every `@mkbabb/*`
  consumer + glass-ui's own demo via `scripts/proof-phantom-classes.mjs`. The
  gate exits non-zero on any match.
- **Invariant 33 — dead-code-removal corpus-grep gate.** Generalises 32 from
  RETIRED-class-names to ALL "remove unused" / "cleanup" commits. A commit
  deleting a CSS class/token/utility runs a fleet-wide corpus grep FIRST; the
  gate gains a `--pre-deletion` mode that takes a class name and proves zero
  fleet consumers.

Both follow the canonical glass-ui pattern — every NEW invariant ships with its
tooling gate at the SAME tranche (the Q-chron-3 LL: "codification without gate
is necessary-but-not-sufficient"). The gate mirrors `audit-stash-list.mjs`
(invariant 29) and `proof-resolution-contract.mjs` (invariant 30): a maintained
registry/constellation `const`, fail-closed exit-code discipline, terse report.

W4 Lane F demonstrated the phantom-class sweep MANUALLY across two phantom
families (`.glass-{subtle,medium}` cluster C2 + the `.cartoon-card` C.W5
phantom); W6 codifies that manual sweep as a mechanical gate.

---

## 2 — Gate design

`scripts/proof-phantom-classes.mjs` — a fail-closed Node script, two modes.

### 2.1 Default mode — registry sweep (invariant 32)

```
node scripts/proof-phantom-classes.mjs        # npm run proof:phantom-classes
```

1. Reads `.retired-classes.txt` — the retired-class registry (§3).
2. For every retired class name × every constellation repo, greps the source
   roots (`*.vue *.ts *.tsx *.js *.jsx *.css *.html`).
3. A grep hit is a true phantom only when the name is used **as a CSS class**.
   The matcher is class-context-POSITIVE — a hit counts only inside:
   - an HTML/JSX `class=`/`:class=`/`className=` attribute value;
   - a class-list string literal (the `cn()` / Tailwind-string idiom — a quoted
     string of ≥ 2 space-separated, class-shaped tokens with a Tailwind-ish
     co-token);
   - a bare CSS selector (`.classname`).
   Everything else is dropped: comment prose, `<Slider variant=>` enum tokens
   (CVA map keys, `data-variant=`, TS variant-array elements), plain text
   content, `blurb=` prose, markdown inline-code (`` `.glass-cartoon` ``).
4. Exit 0 on zero matches; exit 1 naming every match (`repo/file:line`).

The class-context filter was hardened against the false positives the first
W6 run surfaced — without it the gate fired on `cards.css`'s own retirement
notes, the Slider `glass-cartoon` *variant* token (a separate artefact from the
retired `.glass-cartoon` *surface* class per W3 Lane B), and a speedtest
doc-comment. A gate must fail loud but must not over-fire; the filter is
positive (prove it IS a class) rather than negative (enumerate non-classes).

**Word-boundary fence** — the match pattern fences the class name with
non-class characters (`[^-A-Za-z0-9_]`), so `glass-medium` does not match
`glass-medium-foo` and `cartoon-card` does not match `cartoon-cards`.

### 2.2 `--pre-deletion <class>` mode — invariant 33

```
node scripts/proof-phantom-classes.mjs --pre-deletion my-old-class
```

A "cleanup" / "remove unused" / "delete orphan" commit runs this BEFORE
deleting a CSS class/token/utility, to prove zero fleet consumers. It greps the
named class across the SAME corpus and partitions the hits:

- **definition sites** inside glass-ui's own `src/styles/` — the rules being
  deleted; tolerated;
- **consumer sites** — any other site (a glass-ui `src/`+`demo/` reference, or
  any consumer-repo site) — a live consumer that BLOCKS the deletion.

Exit 0 (with a ready-to-paste grep-evidence line for the commit body) when
there are zero consumer sites; exit 1 naming every consumer site otherwise.
After the deletion lands, the class name is appended to `.retired-classes.txt`
so the default mode guards it thereafter. `--pre-deletion` with no class name
is a usage error (exit 2).

This closes the Q-chron-4 pattern — `b0debec` / `17adae2` / `c7f7c96` each
deleted a load-bearing artefact under a grep that missed a consumer. The
pre-deletion mode makes the fleet grep mechanical and mandatory.

### 2.3 Exit codes

| Code | Meaning |
|---|---|
| 0 | clean — no phantom sites / zero consumers |
| 1 | violation(s) — each named `repo/file:line` |
| 2 | usage error — missing registry, bad `--pre-deletion` arg, grep failure |

### 2.4 Constellation list

`REPOS` is a maintainable `const` mirroring `proof-resolution-contract.mjs`'s
`CONSUMER_REPOS` shape — glass-ui first (its own `src/` + `demo/` are swept;
a stale demo story is as much a phantom as a consumer one), then keyframes.js,
value.js, fourier-analysis (both `src/` and `web/src/`), bbnf-buddy,
words/frontend, speedtest. Each entry carries `{ id, base, roots }`; absent
roots are skipped gracefully (a consumer may lack a given dir; on the CI runner
the sibling repos do not exist at all).

---

## 3 — `.retired-classes.txt` registry — contents + provenance

Newline-delimited registry at the repo root; one bare class name per line, an
optional trailing `# comment` recording the tranche/commit that retired it.

| Class | Provenance | Replacement |
|---|---|---|
| `glass-subtle` | retired v0.8.0 ladder rename (`eb9c44c`) | `glass-wash` |
| `glass-medium` | never a canonical tier; Q.W4 Lane F | `glass-quiet` |
| `glass-default` | retired v0.8.0 ladder rename | `glass-resting` |
| `glass-elevated` | retired v0.8.0 ladder rename | `glass-floating` |
| `glass-cartoon` | re-modelled to `@utility cartoon-surface` at Q.W3 Lane B | `cartoon-surface` / `<Card surface="cartoon">` |
| `cartoon-card` | deleted at C.W5 `304ac78` | `<Card surface="cartoon">` / `cartoon-surface` |
| `elevated-card` | deleted at C.W5 `304ac78` (alongside `.cartoon-card`) | Card tier system |
| `icon-tooltip-trigger` | wrap-span retired at Q.W3 Lane G (`25e1b5a` revert) | n/a — the wrap-span is gone |

**NOT in the registry — re-promoted, not retired.** `rainbow-vivid`,
`rainbow-pastel` and `btn-interactive` were RE-PROMOTED as `@utility` recipes
at Q.W3 Lane E (commit `b0debec`'s false zero-site retiral was reverted). They
are live substrate again — listing them would make the gate fire on legitimate
consumers. The registry header documents this exclusion explicitly.

`.glass-medium`/`.glass-subtle` cover cluster C2 (W4 Lane F F.1);
`.cartoon-card` covers the C.W5 phantom (W4 Lane F F.2). `glass-default` +
`glass-elevated` complete the v0.8.0 ladder-rename set — W4's hard-gate (g)
greps all four ladder names (`glass-{subtle,medium,default,elevated}`), so the
registry seeds all four for parity with the manual sweep it codifies.

Note — `.status-dot--*` (Q-cos-16) is NOT in the registry: those classes were
consumer-LOCAL to the keyframes.js demo (deleted by a keyframes cleanup commit),
never glass-ui-published. The registry tracks classes retired FROM glass-ui.

---

## 4 — Gate run output (honest fleet state)

`npm run proof:phantom-classes` at W6:

```
[proof:phantom-classes] registry sweep — 8 retired class(es) × 7 repos

[proof:phantom-classes] PENDING — 31 site(s) in documented-pending repo(s):
  [pending]  fourier-analysis/web/src/components/paper/PaperView.vue:335   (glass-subtle)
  ... (31 fourier-analysis sites — 11 phantom-glass + 20 cartoon-card) ...
  fourier-analysis: Q.W4 Lane F migration delivered as the un-applied patch
  docs/tranches/Q/audit/W4-Lane-F-fourier.patch — the fourier team applies it
  after committing their in-flight WIP. Pending handoff.

[proof:phantom-classes] FAIL — 8 phantom-class site(s):
  [phantom]  words/frontend/src/components/custom/definition/components/TimeMachineExpandedView.vue:6   (glass-default)
  [phantom]  words/frontend/src/components/custom/navigation/components/SidebarPartOfSpeech.vue:27       (glass-elevated)
  [phantom]  words/frontend/src/components/custom/search/components/results/SearchResultItem.vue:88      (glass-elevated)
  [phantom]  words/frontend/src/components/custom/search/components/SearchBarShell.vue:11                (glass-elevated)
  [phantom]  words/frontend/src/components/custom/definition/components/TimeMachineExpandedView.vue:36   (glass-elevated)
  [phantom]  words/frontend/src/components/custom/definition/components/TimeMachineVersionCard.vue:10    (glass-elevated)
  [phantom]  words/frontend/src/components/custom/Sidebar.vue:7                                          (glass-elevated)
  [phantom]  words/frontend/src/views/Admin.vue:4                                                       (glass-elevated)

exit 1
```

### 4.1 glass-ui src/ + demo/ — CLEAN

Zero phantom sites. The class-context filter correctly excludes the three
documentation false positives the first run surfaced:

- `src/styles/cards.css` — the retirement-note block comment citing
  `` `.glass-cartoon` `` / `` `.cartoon-card` `` (markdown inline-code in a
  `/* */` comment);
- `src/components/ui/slider/Slider.vue` + `slider/index.ts` + the two demo
  slider stories — the Slider-local `glass-cartoon` *variant* token. W3 Lane B
  §Verification explicitly records the Slider `data-variant="glass-cartoon"`
  styling as a SEPARATE artefact from the retired `.glass-cartoon` surface
  class — same string, different namespace. The filter drops `variant=` /
  CVA-key / variant-array uses; only a real `class=` reference counts.

### 4.2 keyframes.js, value.js, bbnf-buddy, speedtest — CLEAN

Zero phantom sites in each. (speedtest's `AddressAutocomplete.vue:21`
`` `.icon-tooltip-trigger` `` markdown inline-code in a comment is correctly
excluded — documentation, not a live reference.)

### 4.3 words/frontend — 8 REAL phantom sites (gate FAIL — honest)

8 genuine dangling sites: 1 × `glass-default` + 7 × `glass-elevated`, across 7
files. These are NOT a gate false positive — `glass-default`/`glass-elevated`
have ZERO definition in glass-ui's stylesheets (confirmed:
`grep -rn 'glass-elevated\|glass-default' src/styles/` → nothing). They are the
v0.8.0 ladder-rename phantoms.

**Why W4 Lane F missed them**: W4 Lane F's words/frontend portion swept only the
4 `.glass-medium` sites — its scope (cluster C2) named `.glass-{subtle,medium}`,
not the full four-name ladder. `glass-default`/`glass-elevated` in words were
never in any Q lane's scope. This is precisely the M-class audit blind-spot the
gate exists to catch — a manual sweep scoped to two of four ladder names left
the other two dangling, and only a mechanical registry-driven gate surfaces it.

The gate reports this truthfully and FAILS. It is NOT weakened to force a pass.
Remediation (a words/frontend `glass-{default→resting, elevated→floating}`
migration) is a consumer-side fix the W6 orchestrator routes to the words
re-audit lane — out of this gate-codification lane's bounds. The gate doc
records the state; the gate stays RED until words migrates.

### 4.4 fourier-analysis — 31 PENDING sites (un-applied W4 Lane F patch)

fourier carries 31 phantom sites — 11 phantom-glass + 20 cartoon-card. This is
the documented W4 Lane F handoff: that lane delivered the fourier migration as
an **un-applied unified-diff patch** (`docs/tranches/Q/audit/W4-Lane-F-fourier.patch`)
because the fourier WIP tree was ~100 files mid-flight (W4 Lane F §3.1). fourier
still carries the phantom sites until the fourier team applies the patch.

This is an HONEST pending handoff, not a gate weakening. The gate handles it via
the `KNOWN_PENDING` mechanism: fourier-analysis is listed with a documented
reason. Its 31 sites are reported under a distinct `[pending]` heading (named,
NOT silently dropped, NOT folded into the pass) and the gate STILL exits
non-zero while they exist — the registry sweep is not green until the pending
patch lands. `PROOF_PHANTOM_ALLOW_PENDING=1` downgrades the documented-pending
repo to a warning for a glass-ui-side green run while the handoff is open; it is
never wired into CI.

The W4 Lane F count was 9 phantom-glass + 20 cartoon-card = 29; the gate finds
11 phantom-glass (the 9 plus 2 `glass-elevated` sites in `PaperSearchDropdown`
+ `EquationView` the W4 spec did not enumerate — the gate catches the wider
ladder set) + 20 cartoon-card = 31. The 2 extra strengthen the handoff note:
the fourier patch should be re-checked to also cover the `glass-elevated` sites,
or a follow-on fourier sweep filed.

---

## 5 — CI wiring

`.github/workflows/ci.yml` gains a `proof:phantom-classes` step immediately
after `proof:resolution` (the invariant-30 gate), matching the
sibling-independent `proof:*` subset placement:

```yaml
- name: proof:resolution
  run: npm run proof:resolution
# Q.W6 — phantom-class corpus-grep gate (invariants 32 + 33).
- name: proof:phantom-classes
  run: npm run proof:phantom-classes
```

On the GitHub Actions runner the sibling consumer repos do not exist — their
roots are skipped gracefully by the `existsSync` guard, exactly as
`proof:resolution` skips absent sibling publishers. The glass-ui `src/`+`demo/`
sweep DOES run every PR and closes the "did a retired class leak back into the
substrate or its demo?" question. Locally (and at a release with the full
constellation checked out) the gate sweeps all 7 repos.

`package.json` `scripts` gains:

```json
"proof:phantom-classes": "node scripts/proof-phantom-classes.mjs",
```

placed next to `proof:resolution`.

---

## 6 — Verification

| Check | Result |
|---|---|
| `node --check scripts/proof-phantom-classes.mjs` | SYNTAX OK |
| default mode — glass-ui `src/`+`demo/` | CLEAN — 0 phantom sites |
| default mode — keyframes.js / value.js / bbnf-buddy / speedtest | CLEAN — 0 sites each |
| default mode — words/frontend | 8 REAL phantom sites — gate FAILs (honest) |
| default mode — fourier-analysis | 31 PENDING sites (un-applied W4 Lane F patch) |
| default mode exit code | 1 (words hard failure) — fail-closed |
| `--pre-deletion glass-quiet` (live class) | FAIL — 4 consumer sites named; 4 `src/styles/` def sites separated; exit 1 |
| `--pre-deletion zzz-nonexistent` (dead name) | PASS — 0 consumers; prints grep-evidence line; exit 0 |
| `--pre-deletion` (no arg) | usage error; exit 2 |
| false-positive filter | comment prose, Slider `variant` tokens, markdown inline-code all correctly excluded |

`npm run build` deliberately NOT run (dispatch constraint). The gate is
self-verifying — `npm run proof:phantom-classes` IS the test.

---

## 7 — Verdict

**PASS — invariants 32 + 33 codified.**

`scripts/proof-phantom-classes.mjs` is a fail-closed, two-mode gate matching the
`audit-stash-list.mjs` / `proof-resolution-contract.mjs` conventions. The
`.retired-classes.txt` registry seeds 8 retired classes with provenance; the
re-promoted `rainbow-*` / `btn-interactive` are correctly excluded. The default
mode codifies the W4 Lane F manual phantom-class sweep; the `--pre-deletion`
mode codifies the invariant-33 pre-deletion fleet grep. The gate is wired into
`package.json` and `ci.yml` next to `proof:resolution`.

The gate run reports the TRUE fleet state, not a forced pass:

- glass-ui `src/`+`demo/` and 4 of 6 consumers (keyframes.js, value.js,
  bbnf-buddy, speedtest) are **CLEAN**;
- **words/frontend carries 8 real `glass-default`/`glass-elevated` phantoms** —
  the v0.8.0 ladder-rename names W4 Lane F's cluster-C2 scope did not cover.
  The gate catches the blind-spot the manual sweep left; remediation routes to
  the W6 words consumer re-audit lane;
- **fourier-analysis carries 31 PENDING sites** — the documented W4 Lane F
  un-applied-patch handoff (`W4-Lane-F-fourier.patch`), surfaced under a
  distinct `[pending]` heading via the `KNOWN_PENDING` mechanism. The gate
  stays RED until the patch lands — honest, not a gate bug.

The gate was NOT weakened to force a pass. The two non-clean repos are an
accurate, mechanically-surfaced report of the fleet's real phantom-class debt —
which is exactly what invariant 32 exists to make visible.
