# AP OMEGA — cross-repo perimeter map

Read-only audit lane. HEAD = AO close, `v3.0.0` staged. Probed 2026-05-30 from `/Users/mkbabb/Programming/glass-ui`. No source edits, no git mutations (sibling repos read-only too).

This lane maps the perimeter AP inherits from AO: glass-ui's push/publish state, the consumer constellation, the proof residuals, the precepts submodule, and the wider `@mkbabb` publish graph. The verdict line per item is **USER-DOMAIN** (needs the user's GitHub/npm authority) or **AP-ABSORBABLE** (AP can do it inside glass-ui).

---

## 1. glass-ui push/publish state

| Axis | State |
|---|---|
| Remote | `origin` → `git@github.com:mkbabb/glass-ui.git` (exists, fetch+push) |
| Branch | `master`, tracking `origin/master` |
| Unpushed | **99 commits ahead** of `origin/master` (`master...origin/master [ahead 99]`) |
| HEAD | `e3ac16d chore(audit): AO refresh consumer-static + theme proof baselines` |
| `package.json` version | **3.0.0** (staged via changeset; CHANGELOG.md present) |
| npm published | **2.1.0** is the latest live tag. Full published set: `0.2.0, 0.3.0, 2.0.0, 2.1.0`. **3.0.0 is NOT on npm** — local-only. |

The provenance gap AO recorded is real and is the headline perimeter liability: **npm 2.1.0 is live and consumed by speedtest, but its source tree (and 99 commits of AO + prior work) is single-copy local until pushed.** A laptop-loss event loses the source for an already-shipped artifact. One `git push` reconciles source with the live npm package; a second push (of the `v3.0.0` tag) plus a publish cuts the release.

Note the 1:1 release/wave cadence is unusual — npm shows only `2.0.0/2.1.0` in the 2.x line even though the CHANGELOG narrates `v1.1.0…v1.7.0` as the AB/AC cohort cross-reference. Those intermediate tags were either local-only or pushed-but-the-npm-dist-tag-history-is-sparse; immaterial to AP, flagged only so the "99 unpushed" number isn't mistaken for "99 unreleased versions."

**Verdict: USER-DOMAIN.** Push (provenance reconcile) + tag + `npm publish` (or `changeset publish` via `release.yml`) all need the user's push/publish authority. The irreversible op (publish) is outward-facing → confirm-first. AP cannot and should not absorb this.

---

## 2. The consumer constellation

`grep -rl '@mkbabb/glass-ui'` across `/Users/mkbabb/Programming/*/package.json` plus the named siblings yields four real consumers (excluding glass-ui's own worktree copies `glass-ui-w234-V`, `glass-ui-w2.1-W`).

| Consumer | Pinned range | Installed in node_modules | Seam | In-flight tranche |
|---|---|---|---|---|
| **speedtest** | `^2.1.0` | `2.1.0` (real dir) | **published npm** | **AQ** — Gate-2 impl complete; waiting on 3.0.0 publish to bump pin |
| **bbnf-buddy** | `^2.0.0` | `2.0.0` (real dir) | **published npm** | none touching glass-ui |
| **keyframes.js** | `file:../glass-ui` | `3.0.0` (symlink → `../../../glass-ui`) | **local file seam** | (demo/dev consumer) |
| **value.js** | `file:../glass-ui` | `3.0.0` (symlink → `../../../glass-ui`) | **local file seam** | (demo/dev consumer) |

Two consumption modes coexist by design (the cross-repo-dev-resolution contract-v2): production consumers (speedtest, bbnf-buddy) pin a published `^semver` and resolve npm; dev/demo consumers (keyframes.js, value.js) use a `file:` seam and already see the local `3.0.0` via symlink. The `file:` seam is why keyframes.js/value.js "have" 3.0.0 before it is published — that is the seam working as intended, not a leak.

### speedtest AQ readiness — CONFIRMED ready, blocked only on publish

speedtest's AQ tranche (`docs/tranches/AQ/FINAL.md`, tagged `aq-close`, 20 commits on `ap-close`) is **Gate-2 implementation complete**. Its glass-ui-side work is entirely publisher-gated: it consumes published **2.1.0 + keyframes.js 2.1.1** today and the *only* residual user item recorded on the speedtest side is "the `npm publish` GO when glass-ui AO cuts the release." After publish speedtest bumps `^2.1.0` → `^3.0.0`, re-typechecks against the published version (per its `feedback_published_dep_drift` lesson), and adopts per each R0G acceptance gate. speedtest itself is **551 commits ahead** of its own origin — a separate user-domain push debt, speedtest-side, not glass-ui's to fix.

The R0G coordination spec lists **7** items (R0G-1..5 at AQ-open; R0G-6..7 surfaced during AQ R2 implementation). AO's CHANGELOG cuts **5** (R0G-1..5). Disposition of all seven:

| # | Item | AO disposition | Evidence |
|---|---|---|---|
| R0G-1 | Aurora demand-driven loop | **SHIPPED** | CHANGELOG 3.0.0 |
| R0G-2 | InstrumentChassis breakpoint reserve | **SHIPPED** | CHANGELOG 3.0.0 |
| R0G-3 | `useIdleReady` | **SHIPPED** | `src/composables/dom/useIdleReady.ts` + barrel + test |
| R0G-4 | Toaster `position` prop | **SHIPPED** | CHANGELOG 3.0.0 |
| R0G-5 | `--surface-public-data-panel` token | **SHIPPED** | CHANGELOG 3.0.0 |
| R0G-6 | DockIconButton coarse-pointer 44px floor | **PARTIAL / VERIFY-AT-AP** | see below |
| R0G-7 | motion-barrel split (keyframes eager-pull) | **NOT LANDED** | no commit, absent from CHANGELOG |

**R0G-6 (the trap).** `src/styles/dock.css:1036` carries a `@media (pointer: coarse)` block that lifts `--size-icon-btn`/`--dock-control-size` to `2.75rem` (44px) on `.glass-dock`. But `git log -L` blames that block to **`25e1b5a` (v1.4.0, O.W6, 2026-05-14)** — it predates AQ. speedtest AQ R2 then **measured `DockIconButton` at 40×40 on the real coarse edge** (390×844, `hasTouch`), which *disproves* that the existing floor is effective for the icon-button path — that measurement is the whole reason R0G-6 was raised. So either (a) the coarse block does not reach the actual `DockIconButton` size chain (the measured-vs-CSS contradiction suggests the rule targets a wrapper var the button doesn't consume), or (b) speedtest measured against published 2.1.0 where the chain differs. **AP should treat R0G-6 as an open correctness question, not closed** — the CSS existing since v1.4.0 while the real edge measures 40×40 is exactly the "close-by-construction" failure AQ called out. This is AP-absorbable: re-derive the `DockIconButton` → `--size-icon-btn` cascade and prove the 44px floor lands on the rendered button box, not just on `.glass-dock`'s vars.

**R0G-7 (deferred).** The `motion` subpath split that takes keyframes (~125 KB) off the eager entry graph did **not** land in AO. The `./motion` subpath exists (it predates AQ) but still pulls keyframes eagerly; no lazy animation-primitive carve shipped. speedtest's in-repo analysis stands (`persisted/aqp4-keyframes-chunk-analysis.md`) and no brittle consumer-side carve was landed. **AP candidate work** — this is a glass-ui bundle-shape fix; the consumer cannot do it without coupling to glass-ui's hash-bearing internal filenames (`feedback_library_gaps`).

**bbnf-buddy** pins `^2.0.0` and is on 2.0.0 — it lags one minor behind 2.1.0 already and two majors behind staged 3.0.0. It has no in-flight glass-ui tranche; the 3.0.0 break (`useSpringOrchestrator` alias removal) will require a bbnf-buddy migration *if* it ever bumps, but `^2.0.0` will not auto-pull 3.0.0 (major boundary), so no forced break. Not an AP blocker.

**muster** — exists at `/Users/mkbabb/Programming/muster` with a full tranche ladder (A..H). It has **no `@mkbabb` dependencies at all** — `package.json` carries zero `glass-ui`/`@mkbabb/*`. **muster H does not need glass-ui** and is not a glass-ui consumer; it is out of glass-ui's perimeter entirely. (The muster-pass*.jpeg files dirtying glass-ui's working tree are stray screenshots, not a dependency signal — they are untracked junk, see §6.)

---

## 3. Cross-repo proof residuals

Both residuals are recorded in AO FINAL as consumer-domain and absent from CI (CI runs on a fresh checkout with no sibling repos).

| Residual | What fails | Whose | Resolution path |
|---|---|---|---|
| `proof:consumers:static` | Flags speedtest's own consumer debt (`useTimer`/`useTouchGate` root-imports, `style.css` paths) **plus dozens of stale `.claude/worktrees/agent-*` copies inside speedtest** | **Consumer (speedtest) + environmental** | speedtest resolves the import/style debt when it adopts 3.0.0 (its AQ tranche tracks exactly these — the `useIdleReady` collapse, the `/styles` cleanup). The stale worktree copies are environmental cruft on the dev machine — neither glass-ui's nor truly speedtest-source's; they vanish on a clean checkout. glass-ui's own root-surface arm is **green** (AO resynced it). |
| `proof:phantom-classes` | Pending a documented `fourier-analysis` handoff; escape-hatched `PROOF_PHANTOM_ALLOW_PENDING=1` | **Consumer (fourier-analysis)** | fourier-analysis is not a current glass-ui dependency (`grep` finds no `@mkbabb/glass-ui` in its package.json — in fact it has no package.json at the probed path). The phantom-classes gate is pending *that repo's* handoff; never wired into CI. glass-ui's own src/+demo is **CLEAN**. |

**Disposition for AP:** neither residual is glass-ui's to fix in source. Both are (a) green for glass-ui-internal scope and (b) gated by consumer-side work or by dev-machine environmental cruft that CI never sees. **AP should NOT chase either as a glass-ui defect.** The honest AP move is to leave them as documented consumer-domain residuals; if AP wants to harden, the only AP-absorbable sliver is tightening `proof:consumers:static` to scope-out `.claude/worktrees/` stale copies so the signal isn't drowned by environmental noise — but that is a proof-script ergonomics nicety, not a correctness fix, and risks masking real consumer debt. Recommend leaving as-is and re-confirming green after speedtest adopts 3.0.0.

---

## 4. The precepts submodule

`docs/precepts` is a git submodule (gitlink `160000`), remote `git@github.com:mkbabb/precepts.git`, detached HEAD at `f27627e precept: codify goal criterion + completion criterion (paired) at every unit level`.

- **gitlink drift: NONE.** glass-ui's tree points at `f27627e` and the submodule HEAD *is* `f27627e`. The submodule is not pointing at a stale commit — the dirtiness is working-tree-only, not a gitlink mismatch.
- **Uncommitted in the submodule working tree:**
  - `M cross-repo-dev-resolution.md` — 28 insertions (a +28-line amendment; the existing canonical doc grew).
  - `?? canonical-readme-shape.md` — untracked new precept (the perimeter-wide README shape, authored G.W5 sub-wave D).
  - `?? cross-repo-dev-iteration.md` — untracked new precept (the cross-repo consume+iterate workflow, authored G.W5 sub-wave E; it enumerates the npm/crates.io perimeter members).

These three are the dirty submodule files AO recorded. The +28-line `cross-repo-dev-resolution.md` amendment is the most likely **cross-repo invariant amendment AO should have committed** there — it is the contract-v2 doc the CLAUDE.md cites as authoritative (invariant 30). It is uncommitted in the submodule and the submodule itself is unpushed past `f27627e`.

**Verdict: USER-DOMAIN.** Committing the submodule's 3 dirty files, pushing the precepts repo, and bumping glass-ui's gitlink all need the user's authority on the `mkbabb/precepts` remote. Read-only lane — NOT committed here. AP cannot absorb it (cross-repo push authority). AP *can* surface it as a perimeter ledger item, which is what AO did and this lane re-confirms.

---

## 5. Other @mkbabb publishers — graph health

| Package | npm latest | local source version | glass-ui pin | Drift? |
|---|---|---|---|---|
| `@mkbabb/keyframes.js` | **2.1.1** | 2.1.1 | `^2.1.1` (runtime) / a stale `^2.0.0` line also present | **minor** — see below |
| `@mkbabb/value.js` | **0.10.0** | 0.10.0 | `^0.10.0` | clean |
| `@mkbabb/csp-solver-wasm` | 0.1.1 | — | not a glass-ui dep | clean (out of glass-ui perimeter) |
| `@mkbabb/morph` | 0.1.1 | — | not a glass-ui dep | clean (out of glass-ui perimeter) |
| `pencil-boil` | 0.3.0 | — | not a glass-ui dep | clean (out of glass-ui perimeter) |

The publish/consume graph is **broadly healthy**: keyframes.js (2.1.1) and value.js (0.10.0) are both published-and-current, and glass-ui's runtime pin matches the live versions. csp-solver-wasm / morph / pencil-boil are published but are NOT in glass-ui's reach — no stale-seam liability touches glass-ui from them.

**One real find — a duplicate/stale keyframes.js pin inside glass-ui's own package.json.** The grep returns **two** lines for `@mkbabb/keyframes.js`: a `^2.0.0` and a `^2.1.1`. That is a `dependencies` vs `peerDependencies` (or `devDependencies`) split where the two declarations disagree by a minor — `^2.0.0` in one stanza, `^2.1.1` in another. Both satisfy at install time (2.1.1 ⊇ both ranges) so nothing breaks today, but the `^2.0.0` declaration is a stale floor that should converge to `^2.1.1` for honesty. **AP-ABSORBABLE** — a one-line pin-floor reconcile in glass-ui's own package.json, no cross-repo authority needed. Low priority, but it is a genuine in-repo drift AP can clean.

---

## 6. Working-tree noise (flagged, not actionable in this lane)

glass-ui's working tree carries untracked junk that is neither AO output nor a dependency signal: `ao-gamma-demo.jpeg`, `build_time.txt`, `emit_time.txt`, and seven `muster-pass*.jpeg` / `muster-final-light.jpeg` screenshots. These are stray artifacts (profiling scratch + cross-repo screenshot spillover). They dirty `git status` but are not tracked and not glass-ui source. **AP can `.gitignore` or delete them** (in-repo, AP-absorbable) — purely housekeeping. The muster jpegs are NOT evidence muster consumes glass-ui (§2 confirms it does not).

---

## Perimeter verdict — what blocks 3.0.0, what speedtest needs

**The 3.0.0 release is blocked on exactly one thing, and it is USER-DOMAIN:** the user must push the 99 held commits + the `v3.0.0` tag and run `npm publish` (or seed `NPM_TOKEN` and let `release.yml` `changeset publish`). Everything glass-ui-internal is green and staged. There is no AP source work that unblocks the release — the release is gated on push/publish authority only.

**speedtest needs only the publish.** Its AQ tranche is Gate-2 complete and waiting; on publish it bumps `^2.1.0` → `^3.0.0`, re-typechecks, and adopts the 5 shipped R0G items. The two R0G items that did NOT fully land (R0G-6 dock 44px — the CSS predates the disproving measurement; R0G-7 motion-barrel split — not landed) are the candidate cross-repo coordination work **AP can absorb** as glass-ui source fixes, since neither is consumer-fixable.

### Ledger

| Item | Verdict | Priority |
|---|---|---|
| Push 99 held commits to origin (provenance reconcile) | **USER-DOMAIN** | **highest** — provenance liability |
| Tag `v3.0.0` + `npm publish` 3.0.0 | **USER-DOMAIN** | high (unblocks speedtest AQ) |
| Seed `NPM_TOKEN` repo secret (activate `release.yml`) | **USER-DOMAIN** | medium |
| Commit + push precepts submodule (3 dirty files) + bump gitlink | **USER-DOMAIN** | medium |
| R0G-6 DockIconButton 44px floor — prove it reaches the rendered button | **AP-ABSORBABLE** | high (open correctness, measured-vs-CSS contradiction) |
| R0G-7 motion-barrel split (keyframes off eager graph) | **AP-ABSORBABLE** | medium (consumer cannot do it) |
| keyframes.js pin-floor reconcile (`^2.0.0` → `^2.1.1`) | **AP-ABSORBABLE** | low (in-repo drift) |
| `proof:consumers:static` / `proof:phantom-classes` residuals | **CONSUMER-DOMAIN** | leave as-is — green for glass-ui scope |
| Working-tree junk (jpegs, *_time.txt) | **AP-ABSORBABLE** | trivial housekeeping |

The release perimeter is clean on glass-ui's side and gated entirely on the user's push/publish leg. AP's only genuine cross-repo *coordination* surface is the two unlanded R0G items (R0G-6 correctness, R0G-7 bundle-shape) — both glass-ui-internal fixes that speedtest is waiting on but cannot make itself.
