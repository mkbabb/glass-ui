# AO.OMEGA — cross-repo + release-process perimeter

**Lane**: OMEGA (cross-repo / release-process), tranche AO.
**Vantage**: glass-ui as the suite's keystone publisher.
**State audited**: glass-ui 2.1.0, HEAD `4869b74`, master, **72 commits ahead of `origin/master`**, precepts submodule dirty.
**Mode**: read-only. No source edited, no git mutation.

---

## 1. Perimeter ledger

| # | Item | Finding | Disposition |
|---|------|---------|-------------|
| 1 | Push state — 72 unpushed commits | The G.W5 release-readiness + AN 2.1.0 cohort. Held because pushing tags/branches triggers CI (`ci.yml` + `release.yml`) which needs GitHub repo secrets (`NPM_TOKEN`) the user controls. | **USER-DOMAIN** |
| 2 | Published-vs-source skew | npm `latest` = **2.1.0**; local `package.json` = 2.1.0 at `4869b74`. The published artifact exists but its source tree is NOT on the remote. | **USER-DOMAIN** (push closes it) |
| 3 | precepts submodule dirty | Detached at `f27627e`; `cross-repo-dev-resolution.md` modified (inv-30 amendment) + 2 untracked (`canonical-readme-shape.md`, `cross-repo-dev-iteration.md`). | **USER-DOMAIN** (submodule commit + push lives in `mkbabb/precepts`) — does NOT block AO |
| 4 | CI / release workflows | `ci.yml` (G.W5, committed `827fc24`) + `release.yml` (G.W5) present. Neither has run remotely (no secrets pushed). | **USER-DOMAIN** to activate; workflow content is LANDED |
| 5 | publish-on-tag contract | `release.yml` is well-formed and gate-complete — all 8 referenced scripts PRESENT in `package.json`. But it has never fired: every 2.x publish was manual `npm publish`. The contract is **real-but-unexercised** (paper until a tag flows through it). | **LANDED** (code) / **USER-DOMAIN** (first real run) |
| 6 | changesets | `.changeset/config.json` + `README.md` landed (G.W5). **Zero pending `.md` changesets.** No changeset was authored for the 2.1.0 that shipped — 2.1.0 was hand-published, version-bumped by hand. | **LANDED** (config) / **DEFERRED → AO** (first real changeset) |
| 7 | Consumer perimeter — version | No floating `latest` glass-ui pins anywhere (the OMEGA fourier-analysis flag is pencil-boil's `latest`, not glass-ui). bbnf-buddy `^2.0.0`, speedtest `^2.1.0`. No stale seam at the pin level. | **LANDED** (no floating glass-ui pins) |
| 8 | Consumer perimeter — resolved | speedtest resolves real-dir **2.1.0** (registry, not symlink). bbnf-buddy resolves real-dir **2.0.0** under a `^2.0.0` pin — a stale **lockfile**, not a stale pin; `npm update` floats it to 2.1.0. | **USER-DOMAIN** (bbnf-buddy lock refresh, optional) |
| 9 | AN ARCHIVED-on-2-consumer items | Reorder recipe (AN.W5) + dock panel-host (AN.W6) both ARCHIVED on the substrate-without-consumer binary, each with a named ≥2-consumer realisation condition. No new consumer demand surfaced in the perimeter at AO open. | **TERMINAL** (watch only) |

---

## 2. Push-state analysis

The 72 commits span `ecd0679` (contract-v2 / v1.9.3) through `4869b74` (AN F-tranche root-redress, 2.1.0) — the entire 1.9.3 → 2.0.0 → 2.1.0 publish arc: the Vite 8 / Rolldown jump, TS 5→6, the lucide rename, the api-extractor → vue-tsc emit-types swap, the AM consumer-gap waves, and the AN root-redress.

**Why held**: pushing the branch or any `v*.*.*` tag activates `ci.yml` and `release.yml`. `release.yml` publishes to npm via `secrets.NPM_TOKEN`. Those secrets are user-controlled GitHub repository settings; an agent cannot (and must not) push or seed them. The hold is the correct posture for an agent-driven cohort — the publish authority stays with the user.

**Is the unpushed state a risk?** Low-but-real, and AO should flag it:

- **Provenance gap (the real risk)**: npm `latest` 2.1.0 is live and consumed (speedtest already resolves it), but the *source* for 2.1.0 is not on `origin`. If the local working copy were lost before the push, the published tarball would have no corresponding remote source commit. The tarball itself is recoverable from the registry, but the 72-commit history (including the AN/AM/G tranche record) is single-copy local until pushed.
- **Not a correctness risk**: GAMMA confirms every gate is GREEN locally at `4869b74` (build, typecheck, test, all four proofs, budget --enforce). The published artifact matches a green tree. There is no "shipped broken, source hidden" hazard.
- **Not a consumer risk**: consumers resolve the registry tarball, not the remote source, so the missing push does not break any downstream resolution.

**Net**: the unpushed state is a backup/provenance liability, not a functional one. AO should flag it as the single highest-priority user-domain action — one `git push` (plus the precepts submodule push) reconciles source with the already-published artifact.

---

## 3. precepts-submodule disposition

`docs/precepts` is a submodule pointing at `git@github.com:mkbabb/precepts.git`, detached at `f27627e`, with three dirty entries:

- `cross-repo-dev-resolution.md` — modified (the inv-30 amendment).
- `canonical-readme-shape.md` — untracked (new precept).
- `cross-repo-dev-iteration.md` — untracked (new precept).

**Clean disposition** (USER-DOMAIN, in the precepts repo — not glass-ui):

1. Commit the three changes inside `mkbabb/precepts` on its own branch/main.
2. Push the precepts commit to its remote.
3. In glass-ui, advance the submodule pointer to the new precepts commit and commit the gitlink bump as part of glass-ui's own push.

**Does it block AO?** No. The precepts edits are authored content that lives in a separate repo; they are reachable and readable at HEAD. AO can author its tranche plan and waves against them as-is. The submodule reconciliation is part of the same user-domain push event as item 1 — it rides along, it does not gate AO's internal work.

---

## 4. AO cross-repo posture statement

**AO is glass-ui-internal-FIRST with one optional cross-repo exercise.**

The cross-repo perimeter is healthy at the seam level: no floating glass-ui pins, no stale symlinks (H GAMMA confirmed; re-confirmed here at the version level — both consumers resolve real registry dirs), and the two AN archives are terminal-with-watch. Nothing in the consumer perimeter *demands* a glass-ui change in AO.

The one genuinely cross-repo-shaped opportunity is the **first real changeset-driven release**. To date every 2.x publish was manual; the G.W5 changeset + release.yml machinery is real code but unexercised. AO is the natural place to exercise it because:

- AO will carry its own version bump (whatever the tranche lands). Routing that bump through `changeset add` → `changeset version` → tag → `release.yml` is the first end-to-end proof of the publish-on-tag contract.
- glass-ui is the keystone — it has the heaviest gate (8 GB build prefix per the `release.yml` `NODE_OPTIONS` env, plus the four-proof suite). Proving the contract here proves it for every lighter `@mkbabb/*` publisher.

**But** the publish leg is USER-DOMAIN (it needs the push + `NPM_TOKEN` activation). So the clean AO scope is:

- **AO-internal (agent-doable)**: author the AO changeset(s), run `changeset version` to stage the bump + CHANGELOG locally, prove the full gate matrix green locally (the same eight scripts `release.yml` runs). This makes the release a *one-push* operation for the user.
- **AO cross-repo (user-domain handoff)**: the user pushes the branch + tag; `release.yml` fires; 2.x+1 (or 2.2.0) lands on npm; consumers re-pin/`npm update` at their own cadence.

AO does **not** need a forced consumer re-pin. bbnf-buddy's stale lock (2.0.0) is benign under `^2.0.0` and floats on the consumer's next `npm update`; mandating it would be busywork.

---

## 5. User-domain action list

In priority order, all requiring the user's GitHub push authority and/or `NPM_TOKEN`:

1. **`git push origin master`** (glass-ui) — reconcile the 72-commit source history with the already-published 2.1.0 artifact. Closes the provenance gap. Highest priority.
2. **Seed `NPM_TOKEN`** as a glass-ui repo secret (automation/publish scope) — activates `release.yml`. One-time.
3. **precepts submodule reconcile** — commit + push the three dirty precept files inside `mkbabb/precepts`, then bump glass-ui's submodule gitlink and include it in the push from action 1.
4. **First changeset release dry-run** — once AO stages its changeset + bump locally, push the branch and let `ci.yml` run for the first time (validates the gate matrix against GitHub's runner, not just local darwin), then cut the tag to exercise `release.yml`.
5. *(Optional, low)* **bbnf-buddy lock refresh** — `npm update @mkbabb/glass-ui` to float its resolved 2.0.0 → 2.1.0. Benign to defer.

---

## 6. Watch list (terminal items, no action)

- **AN.W5 reorder recipe** — lands at `demo/stories/compositions/metric-stack-reorder-interruptible.vue` only when ≥2 consumers declare a *mid-drag* (re-aim-while-pointer-down) reorder. muster stays settle-on-pointerup. No new demand at AO open.
- **AN.W6 dock panel-host** — lands when ≥2 consumers declare a tall-vertical stacked-control pane. muster cut "the dock IS the app"; `GlassDock` + `DockLayerGroup`/`DockLayer` cover every realised case. No new demand at AO open.

Both stay ARCHIVED. No cross-suite consumer has surfaced demand for either; the watch is passive.
