# AS — Constellation-adoption fold (dev/deploy standard · screenshot inventory · visual-evidence protocol · cruft) — 2026-06-02

**Tranche**: AS (active; HEAD `756adcc`, branch `master`, `@mkbabb/glass-ui@3.1.1`).
**Disposition**: DEV — audit/record. **Additive only.** This doc folds the four
constellation deliverables value.js authored into glass-ui's own tranche record,
grounded in glass-ui's real state. Every item below is **BOOKED, not executed** —
no script is written, no screenshot moved, no submodule pin bumped, nothing
committed. The standard, the inventory, and the protocol are RECORDED here as
glass-ui's arm of the constellation work, named-forward under inv-16 (glass-ui
writes only glass-ui), to be discharged at the glass-ui visual close paired with
K.W6 (per the source catalogue's rollout booking).

Source deliverables (in value.js, the owning repo):
`docs/dev-deploy-standard.md` · `docs/tranches/K/audit/screenshot-catalogue-2026-06-02.md`
· `docs/tranches/K/design/K.W1-visual-evidence-protocol.md` ·
`docs/precepts/instructions/tranche/SPEC.md`.

> The grep-based `proof:*` codification idiom is RETIRED (SPLIT-K-PLUS-L); none of
> the four items below adds a `proof:*` script. The visual-evidence protocol is
> enforced **structurally** (the paired-π close lane in `tranche/SPEC.md`), not by
> a committed gate. This is consistent with AS's own thesis — AS makes the gate
> fleet *singular*, it does not mint new gates.

---

## §0 — Current-app-state record (glass-ui at HEAD `756adcc`)

| Fact | Value | Source |
|---|---|---|
| Package | `@mkbabb/glass-ui` | `package.json:2` |
| Version | **3.1.1** (last published locally; the 3.2.0 minor is AS.W6's CI-publish proof) | `package.json:3` |
| HEAD | `756adcc` — *"author AS — the gate-integrity class (inv-θ) + the re-derived modern-web leverage; close AR at W2"* | `git log -1` |
| Branch | `master` | `git branch` |
| Active tranche | **AS** (AR closed at AR.W2; AS PLANNED, W0 audit DONE, W1-W6 specified) | `docs/tranches/AS/` |
| App SHAPE | **library** — one Vite dev server (`dev: vite`); `demo/` is the playground/Storybook surface, not a deployed app shell. No backend, no mongo, no `REQUIRED_ENV` | `package.json` scripts; `demo/`; standard §1 per-SHAPE |
| Build | `vite build && npm run emit-types` (flat dist + per-export `.d.ts` map) | `package.json` scripts + `typesVersions` |
| Watch | `vite build --watch` (the sibling-consumed watch-build the standard's `SIBLING_WATCH_BUILDS` targets in fullstack consumers) | `package.json:build:watch` |
| Publish | npm on `v*.*.*` tag from CI via `release.sh` (never from a dev machine) | standard §4; `scripts/release.sh` |
| Working tree | clean except `docs/precepts` (submodule, working-tree-dirty `-dirty`) — **in-flight, NOT touched by this doc** | `git status --short` (` m docs/precepts`) |
| Known visual state | No active visual REGRESSION recorded at HEAD. **The value.js blob-position regression does NOT apply to glass-ui** — glass-ui ships the WatercolorDot/aurora/blob primitives as the LIFT SOURCE; the disappearing-blob incident is in value.js's *consumer* mount (`ColorPicker.vue:22`), not in glass-ui's library surface. glass-ui's aurora OKLab machinery + `--glass-opacity-dock` already ship at HEAD (per AS.md §goal-criterion) | AS.md; value.js K.W1 protocol §4 |

**Constellation role.** glass-ui is the **cohort hub + the shared design system**
(reka-ui-based) and the **lift TARGET** for value.js-K's goo-blob / WatercolorDot /
aurora-derive consummation. That makes the four deliverables doubly load-bearing
here: glass-ui is both a `SHAPE=library` adopter of the dev/deploy standard AND the
upstream owner of the aurora/blob primitives whose before/after fidelity the
visual-evidence protocol guards as they land in value.js.

---

## §(a) — dev.sh / deploy.sh standard adoption (BOOKED)

The constellation runs **one CLI shape** for local dev (`scripts/dev.sh`) and deploy
across all 8 repos; value.js owns the standard and is the DONE + validated reference
(`docs/dev-deploy-standard.md §3`). glass-ui has **no `scripts/dev.sh` or
`scripts/deploy.sh` today** (verified: `scripts/` holds only the proof-gate fleet +
`release.sh` + `audit-stash-list.mjs`; `package.json:dev` is bare `vite`). The
standard's per-repo table books glass-ui as **`SHAPE=library`, draft ready,
NOT done** (standard §4).

### glass-ui's dev.sh DRAFT (the canonical template's CONFIG block, library shape)

Per standard §1 (per-SHAPE: library) + §4 (glass-ui row): glass-ui is the *simplest*
SHAPE — one Vite dev server, no mongo, no backend, no `REQUIRED_ENV`. The draft fills
ONLY the `# ── CONFIG ──` block of `deploy/templates/dev.sh`; the runtime below it is
copied verbatim:

```bash
# ╔══ CONFIG (library SHAPE) ══╗
PROJECT_NAME="glass-ui"
SHAPE="library"                   # one Vite dev server
REQUIRED_BINS=(node npm)          # no docker — library SHAPE provisions nothing
REQUIRED_ENV=()                   # no secrets; .env.example defaults suffice
FRONTEND_PORT_DEFAULT=5173        # the standard library Vite port (= keyframes.js)
NEEDS_MONGO=0
SIBLING_WATCH_BUILDS=()           # glass-ui IS the sibling others watch-build; it watches none
# overrides:
#   start_frontend → npx vite --port "$FRONTEND_PORT" --strictPort (the template default)
#   start_backend  → : (no backend)
#   do_build       → npm run build   (vite build && emit-types)
#   do_test        → npm test
```

Library-SHAPE divergence (standard §1): `up` free-port-resolves :5173 → spawns
`vite --strictPort` → trap-kills; `build` = `npm run build`; `test` = `npm test`.
glass-ui's existing `release.sh` is **kept** — npm publish from CI on a `v*.*.*` tag
is the library publish path (standard §4, §5), distinct from `deploy.sh`. glass-ui
ships no backend webhook and no CF Pages frontend, so it needs **no `deploy.sh`**:
the constellation deploy alignment (standard §5) routes libraries through
CI-tag-publish, not through `deploy-hook.sh` (backends) or `deploy.sh frontend` (CF
Pages SPAs).

### The adoption ask (BOOKED — cross-repo IMPL, not this tranche)

| Item | Disposition |
|---|---|
| Land `scripts/dev.sh` (library CONFIG above, runtime from `deploy/templates/dev.sh`) | **BOOKED** — its own per-repo commit when the rollout dispatches; NOT written here |
| `deploy.sh` | **N/A** — library publishes via CI tag (`release.sh` kept); no backend/CF surface |
| Validate the uniform surface (`up`/`down`/`status`/`logs`/`build`/`test` + exit-code table + `kill_tree`) on the library shape | **BOOKED** with the dev.sh landing |

This is a **booked IMPL rollout**, outside AS's tranche-writing scope and outside its
wave set (AS.W2-W6 are gate-integrity + leverage + folds, not the dev-CLI standard).
It does not touch `scripts/release.sh` or any in-flight surface. The DONE reference
(value.js) and the canonical template home (`deploy/templates/dev.sh`) are the input.

---

## §(b) — Screenshot INVENTORY + date-stamped ARCHIVAL plan (archive-not-delete) (BOOKED)

The source catalogue (`screenshot-catalogue-2026-06-02.md §1`) records glass-ui as
the **largest loose-scratch backlog in the constellation**: **102 root PNGs**
(verified at HEAD: `ls -1 *.png | wc -l` = 102; newest `v2-10-close.png`, 2026-06-02
— matches the catalogue exactly), against ~327 already-archived under
`docs/tranches/{E,F,K,L,Q}`. Other cruft: **6 `.DS_Store`** (catalogue said 1 — the
count drifted; HEAD shows 6) + **3 top-level `docs/constellation/*` plan/close docs**
(`MODERN-WEB-CLOSE.md`, `MODERN-WEB-EXECUTION-PLAN.md`, `NEXT-ROUND-EXECUTION-PLAN.md`).

### Loose root-PNG inventory (by prefix family → owning surface/tranche)

Catalogued at HEAD (`ls -1 *.png`); the prefix encodes the owning surface/tranche, so
each family archives into that tranche's `…-visual-runtime/baseline/` leaf:

| Root prefix family | Count (approx) | Owning surface / tranche | Archival target (booked) |
|---|---|---|---|
| `aurora-*` / `aurora-v*` | ~12 | aurora derive/configurator (E/F/K aurora work) | `docs/tranches/{E,F,K}/audit/…-visual-runtime/baseline/2026-06-02-ASarchive/` (family maps to existing E/F/K aurora `screenshots/` leaves) |
| `v2-*` / `v3-*` / `v*` | ~17 | recent slide/cover/billing/monitor compositions (newest, 2026-06-02) | latest-owning tranche `…-visual-runtime/baseline/2026-06-02-ASarchive/` |
| `E-W0-*` | 5 | E.W0 hero/results/topcard/topbar probes | `docs/tranches/E/audit/E.W0-visual-runtime/baseline/2026-06-02-ASarchive/` |
| `wave2-*` / `wave*` | ~6 | wave-2 design pass | owning tranche baseline leaf |
| `aurora-config-*` / `audit-*` | ~7 | aurora configurator + audit probes | owning tranche baseline leaf |
| `slider-*` / `number-field*` / `carousel-*` | ~7 | controls (slider/number-field/carousel) | controls-owning tranche baseline leaf |
| `btn-*` / `j-r*` / `q-tau*` / `search-*` / `typography-*` / misc | balance to 102 | per-prefix owning surface | per-prefix owning tranche baseline leaf |

> The precise per-file `git mv` set is derived at archival time from `ls -1 *.png`;
> this table is the prefix-family routing, matching the catalogue's value.js §3
> shape (route by prefix → owning-tranche baseline leaf).

### Archival plan (ARCHIVE, never delete — date+tranche stamped)

- **Convention** (from `K.W1-visual-evidence-protocol.md §2`):
  `docs/tranches/<T>/audit/<T>.W<N>-visual-runtime/baseline/<YYYY-MM-DD>-<T>archive/<page>-<WxH>-<light|dark>.png`.
  glass-ui's loose root PNGs **predate the protocol** — they are first-time
  retroactive archivals, not protocol BEFORE/AFTER captures, so they land under a
  **`-ASarchive`** retroactive leaf (the `-<T>archive` form; value.js used `-Karchive`),
  distinct from an `open`/`close` capture leaf.
- **Stamp**: `2026-06-02` (today) on the archival run; the `<T>.W<N>` parent + the
  `-ASarchive` leaf make the path self-describing (repo, tranche, retroactive-run).
- **Rule**: zero `rm`. Each `git mv` is ledgered with rationale at the executing
  ι-sweep. These 102 are the only captures of the aurora/slider/dock/wave design
  history; they become retroactive baselines for the tranches that owned that work.
- **`.DS_Store`** (6) is a **separate hygiene sweep** (gitignore + delete), out of
  visual-protocol scope — booked at the same sweep, not part of the archival `git mv`.

### Rollout booking (from catalogue §4, glass-ui row)

> **glass-ui** — Adopt the protocol at the next glass-ui tranche close **paired with
> K.W6's source-boundary open**. Archive the 102 loose root PNGs (largest backlog)
> into per-tranche baseline dirs; aurora/blob/dock families map to existing E/F/K
> `screenshots/` leaves. Retire the 3 superseded `docs/constellation/*` plan/close
> docs via ledger.

**No file is moved by this doc.** The `git mv` set is the booked action the paired
glass-ui visual close executes. The 3 `docs/constellation/*` docs retire via the same
ledger (archive-or-ledger-delete, not naive `rm`).

---

## §(c) — Visual-evidence before/after protocol adoption + precepts-sync (BOOKED)

### The paired-π protocol (adopt at the paired glass-ui visual close)

`K.W1-visual-evidence-protocol.md` + the new `tranche/SPEC.md §"Before/after +
compare-at-close"` subsection make π a **paired** probe for any tranche that ships
visual changes: BEFORE (open-HEAD or last archived close-baseline) → AFTER (close
HEAD) across the viewport matrix (375×667 / 1280×800 / 1440×900, light + dark) → a
per-page `DELTA.md` before→after verdict where an unintended delta is a
**close-blocker, not an FYI**. WebGL/canvas surfaces get an explicit
present/positioned + non-empty-pixel assertion (static capture alone reads a
non-rasterized canvas as a false blank).

**glass-ui adoption (booked):**

- **Affected-page set** is derived from each tranche's wave diff, not memory. AS's
  current waves are gate-integrity (tooling, no visual surface) + perf/CSS leverage
  (G4 postTask, G1 density container-queries, G2-rescoped scroll-state); the
  visually-load-bearing surfaces are the **demo/playground** routes that render the
  affected primitives (aurora configurator, dock, density-reactive components,
  carousel overflow-fade). The catalogue books glass-ui's adoption at the **next
  glass-ui tranche close paired with K.W6**, not retroactively mid-AS.
- **WatercolorDot / aurora / blob assertion (load-bearing for the lift).** Because
  glass-ui is the **lift SOURCE** of the goo-blob / WatercolorDot / aurora-derive
  primitives that value.js-K consumes, glass-ui's paired-π must capture these
  primitives' demo render with the canvas present/positioned + non-empty-pixel
  assertion — this is the upstream baseline value.js's K.W1 §4 blob assertion diffs
  *against*. A glass-ui-side aurora/blob fidelity regression would surface in
  value.js's consumer mount as the disappearing-blob class; the paired baseline at
  the source closes that blind spot.
- **Archival dir**: reuse the existing per-tranche `…-visual-runtime/` leaves
  (no parallel top-level `screenshots/`); add only the `baseline/`+`close/` split +
  `DELTA.md` + the date+tranche stamp.
- **Tooling-contingency**: if browser automation is unavailable at a close, π runs at
  the build-verification floor (surface builds + typechecks + dev server boots
  clean), the verdict is explicitly provisional, and the re-probe is inherited as a
  named close obligation (per `SPEC.md §"Tooling-contingency clause"`).

### Precepts-sync (BOOKED — submodule pin bump; user-domain)

The `tranche/SPEC.md §"Before/after + compare-at-close"` subsection lives in the
**shared `docs/precepts` submodule**, vendored across all repos. glass-ui pins
`docs/precepts` at **`63240e6`** (`git -C docs/precepts log -1`), the same pin every
repo carries; canonical precept HEAD is ahead (AS.md §Cross-repo perimeter item 7
records `63240e6` vs canonical `458c2d1` — "synced across all" is false at HEAD).
Picking up the new paired-π subsection requires **bumping glass-ui's `docs/precepts`
pointer** to the canonical HEAD that carries it.

> **CRITICAL — DO NOT EXECUTE.** `docs/precepts` is presently **working-tree-dirty**
> (`git status` shows ` m docs/precepts`, ` -dirty` on the pin) — there is in-flight
> submodule work. This is exactly the uncommitted state the binding rules forbid
> touching. The pin bump is **BOOKED as a user-domain submodule re-sync**, performed
> deliberately when the in-flight work settles — NOT by this doc, NOT under AS's
> tranche-writing scope. It is the same booked re-sync AS.md §Cross-repo perimeter
> item 7 already names; this doc only cross-references it for the protocol's sake.

---

## §(d) — Cruft / temp-file cleanup booking (BOOKED)

From the catalogue's glass-ui row (`screenshot-catalogue §1`) + HEAD verification:

| Cruft class | Count (HEAD-verified) | Disposition (BOOKED) |
|---|---|---|
| Loose root PNGs | 102 | ARCHIVE per §(b) — `git mv` into `-ASarchive` baseline leaves; zero `rm` |
| `.DS_Store` | 6 (catalogue said 1 — drifted) | gitignore + delete — separate hygiene sweep, not the archival `git mv` |
| `docs/constellation/MODERN-WEB-CLOSE.md` · `MODERN-WEB-EXECUTION-PLAN.md` · `NEXT-ROUND-EXECUTION-PLAN.md` | 3 | Superseded constellation plan/close docs — retire via **ledger** (archive-or-ledger-delete, not naive `rm`); the `docs/constellation/next/` audit+design tree is current, **kept** |
| `.playwright-mcp/` scratch (if present) | — | per-catalogue §5: scratch, gitignore + per-repo triage — not a glass-ui-specific concern beyond this record |

All four cleanup actions are **BOOKED at the paired glass-ui visual close (with
K.W6)**, ledgered, archive-not-delete. None is executed here; none touches the
in-flight `docs/precepts` submodule or any uncommitted surface.

---

## §E — Booking summary (all BOOKED — nothing executed)

| Deliverable | glass-ui disposition | When |
|---|---|---|
| (a) dev.sh standard | DRAFT recorded (library SHAPE, :5173, no mongo/backend/deploy.sh); landing the script | **BOOKED** — cross-repo IMPL rollout (own commit) |
| (b) screenshot inventory + archival | 102 root PNGs catalogued by prefix family → `-ASarchive` baseline leaves; date-stamped 2026-06-02; archive-not-delete | **BOOKED** — glass-ui visual close paired with K.W6 |
| (c) paired-π protocol + precepts-sync | protocol adopted at paired close (aurora/blob source-baseline assertion); `docs/precepts` pin bump | **BOOKED** — protocol at paired close; pin bump is user-domain (submodule dirty, NOT touched) |
| (d) cruft cleanup | 6 `.DS_Store` (gitignore+delete) + 3 `docs/constellation/*` plan/close docs (ledger-retire) | **BOOKED** — same paired close |

**Open question.** The catalogue books glass-ui's adoption at *"the next glass-ui
tranche close paired with K.W6"* — but AS's current wave set (gate-integrity + perf
/CSS leverage, closing at AS.W6 with the 3.2.0 publish) does not list the
screenshot-archival/protocol-adoption among its hard gates, and the 102 loose PNGs +
6 `.DS_Store` are exactly the tracked-state hygiene that AS.W2's inv-θ ("`git status`
clean after a gate run") cares about adjacently. **Does the constellation visual
close ride AS.W6's ι-sweep (folding the archival `git mv` + the cruft retirement +
the precepts re-sync into AS's close ceremony), or does it open as a dedicated
glass-ui visual-close tranche after AS?** The catalogue's "paired with K.W6" wording
is repo-coordination, not a glass-ui wave assignment; resolving it is the user's
call. This doc records the booking; it does not assign it to an AS wave.
