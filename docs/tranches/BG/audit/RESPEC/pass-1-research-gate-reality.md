# PASS-1 RESEARCH — LENS: GATE REALITY

**Date:** 2026-06-29 · **Branch:** `tranche/BG` · **HEAD:** `9dfe285c` · siblings-intact exit 0 (verified)
**Method:** device-free gate battery (`gates.mjs --run ci` + 16 gates driven individually; NO browsers). Cross-referenced
against `VALIDATION-REPORT.md` (HEAD `ff0933a3`, an ancestor of HEAD) + `A-gate-system.md` (the 4.2.0 structural audit).

---

## TL;DR (the load-bearing conclusions)

1. **The core library FLOOR is sound.** `typecheck` exit 0; `build`/`profile:budget` GREEN (the CI run reached `proof:package`
   past the build step); the validation report's 122-file/1133-test unit suite was GREEN at `ff0933a3` and WS3 touched only
   CSS/tokens since. No reverted deliverable.

2. **The SYNTH fix-wave (`ea4682c0`) DID cure 9 of the 12 validation `realDefect` reds** — `alias-codemod`,
   `bc-fold-ledger`, `bg-deferred-ledger`, `motion-one-clock`, `tunable-anim`, `liquid-tab`, `storybook-complete`,
   `storybook-meta`, `story-language` are all GREEN at HEAD. The remediation worked.

3. **BUT the WS3 in-flight batch (rows 3.1/3.6/3.7, the frontier where the pause hit) RE-INTRODUCED 3 NEW reds of the
   EXACT SAME CLASS the validation report warned about** — "a wave changed code and left a registered close-gate
   un-re-pointed." This is the cardinal recurring disease, recurring AFTER it was supposedly cured. See §A.

4. **The keystone PAINT gate (`proof:ba-gestalt`) WAS genuinely re-pointed BC→BG** (Stage-0 row 0.2 real, not vacuous):
   the BG reflect roster exists, `surface-closure.mjs` derives route seeds with HARD-RED teeth, and the gate is born-RED
   (0/10 PASS) by design. `proof:ship-attestation` is born-RED (tag-blocker) with a 7/7-leg self-test that has teeth.
   These are INTENTIONAL reds, not regressions.

5. **The structural gate-vacuousness the A-gate-system audit identified (RC1-RC3) is only PARTIALLY closed.** Stage-0 closed
   F1 (frozen roster) + part of F2 (derived surface-paths). But ALL FIVE live-render gates the audit proposed —
   `proof:route-navigates`, `proof:field-aurora`, `proof:previews-render`, `proof:uniform-blur`, `proof:safari-parity` —
   are ABSENT (WS7 phase-12 rows 12.4-12.8, all PENDING). Until they land, the keystone is still an author-captured-paint
   gate; the "source-green/visually-broken" gap is structurally re-openable. See §C.

6. **The CI runner is FAIL-FAST** (bails at the first red — `scripts/gates.mjs:2334`). A naive `--run ci` bails at
   `proof:consumers:static` (a sibling red that skips in a fresh checkout) and MASKS every downstream red incl. the 3 live
   WS3 reds. The close MUST run `--run full` siblings-absent (per CLAUDE.md W-CLOSE-BATTERY) to surface them. See §D.

---

## §A — THE 3 NEW WS3-INTRODUCED REDS (genuine regressions, the recurring disease)

The WS3 batch (`3857b33b` CARTOON-INK-GAMUT → `cd9ce46c` GLASS-BLUR-PEER → `6ec81deb` GLASS-IDIOM-FACTOR →
`353eac5d` live-π sync → `9dfe285c` run-log) each landed its OWN gate GREEN (`proof:no-gray`, `proof:glass-cal`,
`proof:glass-idiom-factor`) but left 3 sibling close-gates RED. All confirmed at HEAD, all attributed:

| Gate | State | Root cause (attributed) | Class |
|------|:-----:|-------------------------|-------|
| `proof:no-god-module` | **RED** | `src/styles/glass/ladder.css` 489→**527** + `src/styles/dock/shell.css` 498→**510** crossed the 500 hard-limit. NEITHER is in `RATCHET_BASELINES` (not grandfathered). Growth landed in `cd9ce46c`/`6ec81deb`. (The validation report's #10 fix on `useGlassBackdropLuminance.ts` DID land: 534 < 542 baseline.) | new god-module |
| `proof:no-dead-token` | **RED** | `--glass-blur-dock` is now declared (`glass.css:166`, `dark-arm.css:286`) with ZERO `var(--glass-blur-dock)` readers (verified: grep empty). GLASS-BLUR-PEER re-pointed dock/button/Card/menu-row onto the unified `blur(8px)` leg, orphaning the composed dock-tier token. (The #11 fix on `--story-hero-rise` DID land — it's gone.) | new dead token |
| `proof:gen-ci-fresh` | **RED** | `ci.yml` committed 660 lines vs `--emit-ci` expected 662; first diff line 436 — the new `proof:glass-idiom-factor` gate (added in `6ec81deb`) was never regenerated into `ci.yml`. (The #5 fix DID land — the report's 638→660 drift was closed; the NEW gate re-drifted it.) | ci.yml drift |

**This is the headline gate-reality finding.** The SYNTH wave proved the fixes are mechanical; the disease is that the
build process has NO standing per-wave sibling-gate sweep, so each band that touches a hot file (glass token cascade,
`gates.mjs`, `ci.yml`) re-opens the same class. WS2/WS5/WS6/WS4/WS8/WS9 all touch these same hot files → expect more.

---

## §B — THE 12 VALIDATION `realDefect` REDS — CURRENT STATE

| # | Gate | At `ff0933a3` | At HEAD `9dfe285c` | Verdict |
|---|------|:-------------:|:------------------:|---------|
| 1 | `proof:bg-deferred-ledger` | RED | **GREEN** | SYNTH-fixed |
| 2 | `proof:liquid-tab` | RED | **GREEN** | SYNTH-fixed |
| 3 | `proof:motion-one-clock` | RED | **GREEN** | SYNTH-fixed |
| 4 | `proof:storybook-complete` | RED | **GREEN** | SYNTH-fixed |
| 5 | `proof:gen-ci-fresh` | RED | **RED** | re-reddened by WS3 (new cause) |
| 6 | `proof:alias-codemod` | RED | **GREEN** | SYNTH-fixed |
| 7 | `proof:storybook-meta` | RED | **GREEN** | SYNTH-fixed |
| 8 | `proof:tunable-anim` | RED | **GREEN** | SYNTH-fixed |
| 9 | `proof:story-language` | RED | **GREEN** | SYNTH-fixed |
| 10 | `proof:no-god-module` | RED | **RED** | re-reddened by WS3 (new files) |
| 11 | `proof:bc-fold-ledger` | RED | **GREEN** | SYNTH-fixed |
| 12 | `proof:no-dead-token` | RED | **RED** | re-reddened by WS3 (new token) |

**9 cured · 3 re-reddened (by a different, NEW cause).** The 3 reds at HEAD are NOT the validation report's reds left
unfixed — those WERE fixed; these are fresh WS3 collateral of the same class.

---

## §C — BORN-RED-BY-DESIGN + SIBLING REDS (intentional, not regressions)

Confirmed at HEAD; do NOT mistake these for defects:

- **`proof:ship-attestation`** — RED `[absent]` SHIP-ATTESTATION.json. Intended tag-blocker; flips when `release.sh --run ship`
  commits a fresh Metal attestation. 7/7-leg subprocess self-test has teeth (stale/verdict/renderer/digest/webkit/absent
  forgeries all RED). **Genuine, load-bearing.**
- **`proof:ba-gestalt`** — RED 0/10 PASS, born-RED by design. Roster GENUINELY re-pointed BC→BG (`proof-ba-gestalt.mjs:77`
  → `docs/tranches/BG/audit/reflect/`, all 10 surface `.md` records exist). `surface-closure.mjs` wired with routeSeeds
  HARD-RED. Operative verdicts flip only when paint waves land + non-authoring re-capture (W-REFLECT3). One surface ("shell")
  reads `freshness:stale` — a watched file drifted post-capture (expected mid-build). **The re-point is real; the RED is
  intentional.**
- **`proof:visual-runner`** W4 — local-paint born-RED to W-REFLECT3 (reported in facts, not a ci-failing violation).
- **Sibling reds (skip/green in fresh siblings-absent CI):** `proof:consumers:static`, `proof:phantom-classes`,
  `proof:consumer-staleness`, `proof:tier-class-staleness` — constellation imports + the retired `ui/Tabs` consumer
  migration owed at 5.0.0 (THEIR edit). `proof:dock-animation-live` (browser-π, no served demo).

---

## §D — STRUCTURAL: THE A-GATE-SYSTEM ROOT CAUSES ARE ONLY PARTIALLY CLOSED

The A-gate-system audit (4.2.0) found the keystone was vacuous: F1 frozen roster, F2 self-certified surface whitelist,
F3 tiny probe boxes, F7/F8 routing/field/previews ungated. Stage-0 (WS7 rows 0.1-0.3) addressed the FLOOR:

- **F1 (frozen roster) — CLOSED.** `proof-ba-gestalt.mjs` consts now point at `docs/tranches/BG/`. BG reflect roster +
  10 surface records on disk.
- **F2 (self-certified surface whitelist) — PARTIALLY closed.** `surface-closure.mjs` DERIVES route seeds from the demo
  route files with a HARD-RED when a 2-segment route's `story.vue` is absent on disk. This is real teeth — but the derivation
  is ROUTE-EXISTENCE-scoped, not the full transitive CSS paint-closure the audit's BG.W-GESTALT-ROSTER-RE-POINT wave specced
  (auto-including `paper.css`/`AppShell.vue`/`SectionLanding.vue` in every surface's watched set). Verify at WS12 whether the
  watched surface is genuinely derived-complete or still narrow.
- **F7/F8 (live routing/field/previews ungated) — NOT closed.** ALL FIVE proposed live-render gates are ABSENT:
  `proof:route-navigates` (12.4), `proof:field-aurora` (12.5), `proof:previews-render` (12.6), `proof:uniform-blur` (12.7),
  `proof:safari-parity` (12.8) — none built, none registered in `gates.mjs`. These are the gates that make the routing/field/
  preview defects impossible to ship-green. **They are PENDING by plan (WS7 phase-12), not broken** — but until they land,
  the keystone GREEN flip still depends on author-captured paint, and the "source-green/visually-broken" gap is re-openable.

**Net:** Stage-0 is a real floor (re-point + derivation + ship-discipline), NOT a vacuous re-point. But the live-pixel
enforcement the audit demanded is the LARGE pending bulk. The cut MUST NOT precede phase-12 + W-REFLECT3.

---

## §E — GATE-BUILD DEBT (the PENDING bulk, gate-reality lens)

360 `proof-*.mjs` scripts exist. Sampling PENDING-wave gates named in the cursor: `proof:dock-orchestrator-single` +
`proof:dock-fission` + `proof:no-shadcn-default` EXIST (prior-tranche or early-built); but `proof:glass-blur-engage`,
`proof:siri-island`, `proof:siri-waveform`, `proof:viz-resize-upload-only`, `proof:glass-clip`, `proof:safari-blur`,
`proof:de-shadcn`, `proof:story-page-api`, `proof:coherence-census`, `proof:hue-at-l`, `proof:constraint-manifest`,
`proof:flip-one`, `proof:bento-specimen` are ABSENT. This is NORMAL — each wave mints its gate born-RED — but it means the
cursor's `gate` column names many gates that don't exist yet, so they cannot be pre-verified now; their reality is
established only when the wave builds. The build-order spine (WS3 → WS2 → WS5/6 → WS4 → WS7 phase-12 → WS8/9 → WS10/11/12)
remains sound for gate sequencing (the close-machine live gates correctly land LAST, after the surfaces they probe exist).

---

## §F — RISKS AT THE 5.0.0 CUT

1. **The recurring sibling-gate disease is LIVE (3 WS3 reds).** Every band touching the glass token cascade / `gates.mjs` /
   `ci.yml` re-opens it. The `--run full` close battery REDs until each re-point lands. Mitigation owed: a STANDING per-wave
   sibling-gate sweep (or a pre-integrate `--run full` diff), not a one-shot SYNTH wave.
2. **CI fail-fast masks the truth.** `--run ci` bails at the first (sibling) red. A clean read of "all reds" requires
   `--run full` siblings-absent. Do NOT trust a green `--run ci` that bailed early.
3. **Live-render enforcement debt.** The keystone is born-RED placeholder; the gates that read real routing/field/preview
   pixels are the PENDING WS7 phase-12 bulk. A cut before phase-12 + W-REFLECT3 reproduces the BD source-green/visually-broken
   close.
4. **god-module pressure on the glass cascade.** `ladder.css` (527) + `shell.css` (510) over limit signal the WS3 spine is
   GROWING the very files WS8/WS10/WS12 will grow further. The carve/colocation discipline (WS4 rows 10.11/10.20) must run
   BEFORE those files become uncarvable — or the ratchet baseline must be explicitly re-pinned with rationale per CLAUDE.md.
5. **`--glass-blur-dock` orphan is a canary.** GLASS-BLUR-PEER's "ONE unified 8px" unification is the right direction, but it
   left a dangling token — a sign the glass-token unification (WS3 3.5 GLASS-TINT-UNIFY, still PENDING) needs a dead-token
   sweep as an explicit clause, not a trailing fixup.

---

## APPENDIX — commands run

- `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before)
- `node scripts/gates.mjs --run ci` → bailed FAIL at `proof:consumers:static` (sibling; fail-fast)
- 16 gates driven individually (`npm run proof:<g>`): see §A/§B verdicts
- `git show <commit>:<file> | wc -l` for ladder.css/shell.css line attribution
- `grep "var(--glass-blur-dock)" src/ demo/` → empty (orphan confirmed)
- `typecheck` → exit 0
