# AS.W0b — Lens 3 (re-run): PROMPT COMPLETENESS — the latest-message request ledger

Second L3 pass, scoped to THIS session's message (the screenshot/visual-evidence
ask + the publish/Fraunces/deriveAurora/CI/rounded-corners probes) and re-grounded
against HEAD reality. The first L3 (`W0-L3-prompt-completeness.md`) recapped the
whole modern-web arc as of `756adcc`; this one verifies the same arc PLUS the new
asks against the current HEAD `8c0cced` — where the picture has materially moved
(W3/W4/W5 IMPL is now COMMITTED, the visual protocol is now EXECUTING), so several
"PLANNED/BOOKED" rows from the booking docs are stale.

**Verdict in one line:** the latest message's central ask — execute the
visual-evidence protocol (inventory before/after every affected page) — is
**PARTIAL/IN-FLIGHT** (the `as-verify/*.png` captures are being written THIS session,
17:26-17:31, against HEAD committed at 16:12), and the arc's headline impl (AS
W3/W4/W5) is **DONE in source** (`8c0cced`) but **NOT closed** — version still 3.1.1,
no 3.2.0 tag/changeset, no W3-W6 audit docs, no FINAL.md, PROGRESS.md stale. The
3.2.0 publish remains HELD; the precepts re-sync remains stale.

## Request ledger (this message)

| # | Request | Status | Evidence (file:line / probe) | Gap |
|---|---|---|---|---|
| 1 | **Did we update precepts + tranche docs to inventory screenshots BEFORE/AFTER every affected page?** (the screenshot/visual-evidence protocol) | **PARTIAL — booked, now EXECUTING** | The protocol is RECORDED in `constellation-adoption-2026-06-02.md §(c)` (paired-π, viewport matrix 375/1280/1440 × light+dark, per-page DELTA verdict, WebGL non-empty-pixel assertion). Source spec lives in the precepts submodule (`tranche/SPEC.md §"Before/after + compare-at-close"`) — but glass-ui pins `63240e6`, which does NOT carry that subsection (precept HEAD is ahead; see row 9). The captures are NOW being produced: `as-verify/*.png` (12 files, mtime 17:26-17:31 today, HEAD committed 16:12) — aurora/aurora-configurator/dock/foundations-colors/foundations-radii × light+dark | NOT structurally adopted: no `…-visual-runtime/baseline|close/` leaf, no `DELTA.md`, no BEFORE baseline (these are AFTER-only single captures in a loose `as-verify/` dir, not the protocol's paired form). The precepts pin does not yet carry the protocol subsection. The captures are untracked scratch, mirroring the 102-PNG cruft class they were meant to retire |
| 2 | **Inventory + cleanup + categorize the 102 root PNGs** | **PARTIAL — inventoried, NOT cleaned** | Inventory DONE: `constellation-adoption-2026-06-02.md §(b)` catalogues all 102 by prefix family → owning tranche + the `-ASarchive` archival convention (archive-not-delete, zero `rm`). Verified at HEAD: `ls -1 *.png` = 102; `git ls-files '*.png' \| grep -vc docs/tranches` = 0 (all 102 untracked). 6 `.DS_Store` + 3 superseded `docs/constellation/*` plan docs also catalogued | The `git mv` archival is **BOOKED, not executed** — all 102 still loose in root; 6 `.DS_Store` still present; 3 plan docs (`MODERN-WEB-CLOSE.md`/`MODERN-WEB-EXECUTION-PLAN.md`/`NEXT-ROUND-EXECUTION-PLAN.md`) not retired. The `as-verify/` (12) + `.playwright-mcp/` (12) dirs ADD to the loose-scratch class rather than retire it |
| 3 | **App page-screenshot inventory** | **PARTIAL** | The affected-page set is DERIVED in `constellation-adoption-2026-06-02.md §(c)`: aurora configurator, dock, density-reactive components, carousel overflow-fade — the surfaces the W3/W4/W5 diff touches. The `as-verify/` captures cover aurora + aurora-configurator + dock + foundations(colors/radii) | Not a full per-route inventory of the demo/playground; foundations(typography/motion), carousel, density-reactive (metric-pill/configurator-row) surfaces touched by `8c0cced` have no capture yet. No machine-readable page→capture manifest |
| 4 | **Deep comparison for feature correctness** | **PARTIAL** | The W3/W4/W5 impl (`8c0cced`) is correctness-gated in-commit (typecheck clean, 558 tests, browser-verified Chrome 148 for G1/G2). P9 root fix (silent-styling) is the headline correctness repair. The captures enable a visual compare | No BEFORE→AFTER DELTA exists (no baseline captured at the pre-`8c0cced` HEAD); the "deep comparison" is single-state AFTER captures, not a paired diff. The protocol's close-blocker verdict (unintended delta = blocker) cannot fire without a BEFORE |
| 5 | **Validate CI + vite config** | **DONE** | `ci.yml` runs 13 gates (`gates:verify-ci` PASS: "ci.yml matches the manifest ci set (13 gates)"); `release.yml` re-runs build→typecheck→test→verify-export-types→profile:budget→proof:package/theme/resolution/vt-names before publish (`release.yml:28-52`). `vite.style-assets.ts` is the P9 root fix — generates glass-ui's OWN component vocabulary at build (`dist/styles/components.css`, 615 rules, preflight-stripped) so `rounded-panel`/`h-full`/`text-muted-foreground` resolve with NO consumer `@source`. typecheck green at HEAD; `gates.mjs --verify-ci` green | release.yml's gate set is the OLD hand-curated inline list (build/typecheck/test/verify-export-types/profile:budget/proof:package/theme/resolution/vt-names) — it does NOT derive from `gates.mjs --run release` the way `release.sh` does (`release.sh:80`). Minor inv-θ drift: the CI tag-publish path and the local release path use different gate selectors |
| 6 | **Audit recent blob/aurora/configurator/token changes (rounded corners)** | **DONE** | The rounded-corners lineage: `b6d6cf4 fix(configurator): round at the root` made Configurator `rounded-card`→`rounded-panel` + ConfiguratorLayer sections rounded (the fourier configurator-square symptom; rounding stopped one level too high). `8c0cced` P9 then fixed the ROOT cause — the utilities (incl. `rounded-panel`) never shipped in `/styles`, so a consumer without the `@source` glob computed `border-radius:0`. Current: `Configurator.vue:130` carries `glass-floating rounded-panel`; `Configurator.vue:122` documents the `--radius-panel = --radius-xl` bridge. Token additions in `8c0cced` (`tokens.css` +11: `--dock-fg-on-aurora`, `--configurator-aside-{min,max}`) are byte-identical-default, gated ≥2 | No active visual regression recorded; aurora OKLab + `--glass-opacity-dock` already shipped pre-AS (no re-mint). The "blob" is value.js's consumer concern — glass-ui is the LIFT SOURCE, not the regression site |

## The probed gaps (the message's explicit probe list)

| Probe | Status | Evidence | Gap |
|---|---|---|---|
| **The 3.2.0 publish (HELD on inv-K-4)** | **HELD — UNADDRESSED at HEAD** | Version = **3.1.1** (`package.json:3`); no `v3.2.0` tag (`git tag \| grep 3.2` empty; `git describe` = `v3.1.1`); no pending changeset (`.changeset/*.md` non-README = 0). The W3/W4/W5 leverage that 3.2.0 is supposed to fold is COMMITTED (`8c0cced`) but unversioned/unpublished. AS.W6 (the publish close) is PLANNED | The headline goal-criterion (3.2.0 minor through the repaired `release.yml` on a clean-runner tag, NPM_TOKEN-seeded, the end-to-end #177 proof) is unmet. No changeset authored → no provenance entry. inv-K-4 is the value.js cohort's dev-source-resolution invariant (`6d3e151 inv-K-2/K-4`); the publish hold is the GATE-I obligation AS.W6 owes. **AS must close W6 or explicitly re-HELD with a reason** |
| **The visual-evidence protocol (booked→now executing)** | **PARTIAL — executing, not landed** | Captures in flight (`as-verify/`, 17:26-17:31). The protocol doc exists; the precepts spec source is unreachable at the current pin | No paired BEFORE, no DELTA.md, no `…-visual-runtime/` archival leaf, captures untracked. The "inventory before/after every affected page" ask is half-met: AFTER-only, partial page set |
| **deriveAurora / Fraunces (booked)** | **BOOKED — correctly NOT shipped** | `grep -rn deriveAurora src/` = EMPTY (correctly absent; the OKLab math already ships in `aurora/composables/color.ts`, no re-mint — the VAL-1 discipline holds). Fraunces appears in `typography.css:2,150` as the pre-existing DISPLAY font reference (WONK=1 SOFT=0), NOT the P5 variable-woff2 asset, which is `8c0cced` body: "P5 Fraunces BOOKED (variable woff2 asset-gated)" | Both correctly held at the ≥2/asset bar. No gap — these are clean BOOKED items. deriveAurora gates on a live ≥2 adoption witness (else value.js executes the VAL-1 kill); P5 Fraunces gates on the woff2 asset landing |
| **The cross-repo deploys / measure** | **UNADDRESSED in glass-ui (name-forward)** | First L3 probe: babb.dev 2-of-5 live (fourier/keyframes 200; grammar/value/muster 404; babb.dev root a bare GitHub redirect); friday.institute correctly HELD. Not re-probed this pass (glass-ui-out-of-scope, name-forward inv-16; AS.md §Cross-repo perimeter items 6) | The booked AFTER measurements (muster Lighthouse/CLS, fourier e2e/axe) are unbanked; muster has no deploy target. NOT glass-ui's arm — recorded, not executed |
| **The precepts re-sync (still stale 63240e6 vs canonical?)** | **STALE — confirmed, now WORSE** | glass-ui pins `docs/precepts` at **`63240e6`** (`git -C docs/precepts log -1`). The submodule working tree is DIRTY: ` M cross-repo-dev-resolution.md` + `?? canonical-readme-shape.md` + `?? cross-repo-dev-iteration.md` — uncommitted in-flight submodule work. The parent shows ` m docs/precepts` | The pin is stale vs canonical AND the submodule now carries uncommitted local edits (the protocol subsection's home). "Synced across all" is false at HEAD. Re-sync is BOOKED user-domain (the in-flight dirty state is exactly what binding rules forbid touching) — but it now blocks the visual protocol (row 1: the spec the captures should follow isn't at the pin) |

## The load-bearing finding this pass surfaces (NEW since the first L3)

**The AS plan record is stale against its own HEAD.** PROGRESS.md (line 18-21) marks
AS.W3/W4/W5 = **PLANNED** with evidence pointing at audit docs
(`audit/W3-posttask.md`, `audit/W4-container-queries.md`, `audit/W5-as-gu.md`) that
**DO NOT EXIST** (`ls docs/tranches/AS/audit/W3* W4* W5*` → no matches). Yet
`8c0cced feat(as): AS W3/W4/W5` already COMMITTED the full impl: `usePrioritizedTask`
(`src/composables/motion/usePrioritizedTask.ts`), `useTextHighlight`
(`src/composables/dom/useTextHighlight.ts`), `platformSupport.ts`, the P9
`vite.style-assets.ts` root fix, the Configurator/Dock/GlassCarousel changes, +124/+108
test files, "558 tests pass, browser-verified Chrome 148." The impl crossed the
dev→impl boundary; the record did not follow it. This is the inverse of the first
L3's finding (there: docs claimed DONE over uncommitted trees; here: code is DONE but
docs claim PLANNED). The single AS.W5 design doc that DOES exist
(`design/AS.W5-constellation-primitives.md`) is the lone bridge.

**Consequence:** AS is mid-impl with no W3/W4/W5/W6 audit trail and no FINAL.md, the
3.2.0 fold is uncut, and the visual protocol is executing ad-hoc (`as-verify/`) rather
than into the booked `…-visual-runtime/` structure. AS.W6 must back-fill the wave
audit docs to match `8c0cced`, cut the 3.2.0 changeset/version/tag, land the visual
captures into the protocol structure, and write FINAL.md — OR the plan must be
corrected to reflect that W3/W4/W5 shipped under one squashed commit without per-wave
audits (a deviation from the bbnf wave-boundary discipline).

## What is genuinely DONE (no gap)

- **AS.W2 gate-integrity (inv-θ)** — `scripts/constellation.mjs` + `scripts/gates.mjs`
  + `proof:lockfile` + `gates:verify-ci` (13-gate match) + `release.sh` running the
  binding floor (`release.sh:80` `gates.mjs --run release`); `proof:vt-names` hardened.
  `git status` clean of gate side-effects. The headline substrate shipped (`d2d1d0b`).
- **The W3/W4/W5 IMPL source** (`8c0cced`) — committed, typecheck-green, 558 tests,
  browser-verified. P9 (the silent-styling root fix) is a real constellation-wide
  correctness repair. deriveAurora/Fraunces correctly held at the bar (no re-mint).
- **CI/vite config** (probe 5) — `ci.yml` 13-gate manifest-matched; `vite.style-assets.ts`
  P9 fix inverts the AN.W2 probe (utilities resolve with no `@source`).
- **The rounded-corners audit** (probe 6) — root cause traced (`b6d6cf4` + `8c0cced` P9);
  no active regression; Configurator `rounded-panel` confirmed at HEAD.

## Disposition for AS (inv-16 name-forward)

AS owns: (a) back-fill W3/W4/W5 wave audit docs to match `8c0cced` OR correct
PROGRESS.md; (b) cut the 3.2.0 changeset + version + tag through repaired `release.yml`
(the W6 close); (c) land the `as-verify/` captures into the booked
`…-visual-runtime/baseline|close/` structure with a BEFORE baseline + DELTA.md, OR
record the tooling-contingency provisional verdict; (d) execute the 102-PNG archival +
6 `.DS_Store` + 3-plan-doc cleanup at the close ι-sweep; (e) align `release.yml`'s gate
set to `gates.mjs --run release` (close the inv-θ CI/local drift). Cross-repo
(precepts re-sync, deploys/measure, value.js commit) stays NAME-FORWARD under inv-16 —
recorded, not absorbed.
