# AZ.W-DEPLOY — slides.friday.institute LIVE: the user-domain deploy hinge, decomposed into verifiable artefacts

**Track:** X (cross-repo) · **Type:** gate (decomposed: agent-local → USER push → agent post-push) · **Repo of effect:** slides (`/Users/mkbabb/Programming/slides`) · **Spec authored in:** glass-ui (`docs/tranches/AZ/waves/AZ.W-DEPLOY.md`)
**Depends on:** **AZ.W-ADOPT** (the EXACT `3.10.1` re-pin + the bespoke-constellation deletion — the deploy ships the re-pinned, bespoke-free deck and `proof:no-bespoke-constellation` is a precondition gate) **+ the slides content/gate/mobile/chrome waves the M tranche owns** (the deck body, the conformance gates, the mobile DELTAs). This is the terminal cross-repo node and the **second user-domain hinge** of the engagement (the first is the glass-ui publish, already cleared at 3.10.1). H5 gates: `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` must be in the environment at execution.
**STATUS: SPEC**

The standing slides.friday.institute requirement: the deck is LIVE and PROVED live by a captured artefact, not asserted. The deploy is a THREE-PHASE decomposition — (a) agent local-green; (b) USER push; (c) agent post-push probe + DELTA — with the HARD BOUNDARIES preserved (the agent is READ-ONLY on git, never holds the CF token, never holds the access key). The agent's job is the two verifiable bookends; the irreducible middle is the named hinge.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any capture)

The slides repo is on a MOVING branch (`tranche/til-briefing-M`) and the deck count drifted (the L.W-DEPLOY parent hardcoded "9 slides"; the live `deck.ts` mounts 8 active slides — A4L-2/A4L-12). RE-GREP the following at slides HEAD before capturing anything; if a cite has drifted, STOP and report a scope-reveal:

1. **The served deck count.** `grep -c 'markRaw(Slide' /Users/mkbabb/Programming/slides/src/decks/til-briefing/deck.ts` → expect `8` (verified: Intro, SuccessFigure, SuccessDelivered, ExampleInvoice, ExampleFanin, IdeaBoard, Xray, Closer). The gate's served-count assertion uses the ACTUAL live count read at capture time, NOT a hardcoded 9. Re-derive the count from `deck.ts` at HEAD — the M tranche may have re-composed it.
2. **The deploy scripts ship.** `ls slides/scripts/deploy.sh slides/scripts/pages-deploy.sh slides/scripts/export-pptx.mjs` → expect all present (verified). These are the CF-token-gated, CI-gated deploy path — the agent never runs them; they are the USER/CI break-glass.
3. **AZ.W-ADOPT has closed.** `test ! -f slides/src/decks/til-briefing/constellation.ts` (the adopt deletion landed) AND `npm run proof:no-bespoke-constellation` GREEN. The deploy ships the bespoke-free deck; it cannot open until adopt closes.
4. **The pin is 3.10.1.** `grep '"@mkbabb/glass-ui"' slides/package.json` → expect `"3.10.1"` exact (AZ.W-ADOPT landed it). This wave INHERITS the pin; it does NOT re-pin.
5. **The branch is M-owned.** This wave touches NO `docs/tranches/M/**` file and NO `src/decks/**` SFC or `deck.ts` (the deck is FROZEN at AZ.W-ADOPT's close). It writes ONLY doc/PNG/log artefacts under `docs/tranches/L/audit/`.
6. **H5 creds present.** Confirm `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` are in the environment (the USER provides at the deploy hinge). If absent, the agent does the pre-push arm + captures the BEFORE + STOPS at the named hinge — it never needs the token (the CF push is USER/CI domain).

## §1 — Goal criterion

The re-pinned, bespoke-free til-briefing deck is LIVE at `slides.friday.institute/til-briefing` and the live surface is PROVED live by a captured before/after DELTA, not asserted. The agent does everything verifiable WITHOUT touching the git index or the CF token (the pre-push local-green arm + the post-push live-probe + capture arm); the USER owns the one irreducible hinge between them — the forward-cut → merge-to-main → CF-Pages push (which the green-CI `deploy-pages.yml` then runs). The wave succeeds when the live deck serves the deck body, the two `?freeze` PPTX artefacts (`/exports/til-briefing.pptx` + `-dark.pptx`) resolve, and the before/after DELTA is on disk and registered so the cardinal-lesson ledger gate passes on this row.

## §2 — Completion criterion

The hard gate (§6) verifies, on artefacts: the pre-push local gates GREEN (`vue-tsc --noEmit && vite build`, `proof:deck-copy-conformance`, `proof:live-verified-ledger --tranche=…`, `proof:no-bespoke-constellation`); the deterministic-capture path serves POSTERS not live/broken frames; the USER-DOMAIN hinge is NAMED not agent-run (no git stage/commit/merge/push, no `wrangler`/CF-token in the agent transcript); the live surface returns HTTP 200; the LIVE deck is the NEW deck (the served-count readback matches the HEAD `deck.ts` count, guarding against a stale CF cache); the PPTX artefacts resolve (or a recorded graceful-404); the paired before/after DELTA is captured on disk; `proof:live-verified-ledger` GREEN with this row at `live-verified`.

## §3 — The hinge anatomy (agent-domain vs USER-domain)

| Phase | Owner | What happens | Why this owner |
|---|---|---|---|
| (a) pre-push local-green | **AGENT** (W-DEPLOY.1) | run the device-free gates GREEN; verify the deploy preconditions (the build emits `dist/`, the `?export`/`?freeze` static capture renders posters, the PPTX export runs locally, the access-key build-inline is wired); capture the BEFORE (current live) frames | no git/token needed — pure local verification + the BEFORE half of the DELTA |
| (b) forward-cut → merge-to-main → CF-Pages push | **USER** (the HINGE) | the user forward-cuts the slides tranche branch onto `main`, pushes; the green-CI `deploy-pages.yml` `workflow_run` trigger ships `dist/` + the two PPTX artefacts to the `slides` Pages project on `main`; `slides.friday.institute` is the attached custom domain | the git index, the merge-to-main, the CF token (`CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` GH secrets — H5), and the access key (`VITE_TIL_ACCESS_KEY` secret) are USER-DOMAIN |
| (c) post-push live-200 + DELTA | **AGENT** (W-DEPLOY.2) | AFTER the user confirms the push landed: probe for HTTP 200; capture the AFTER (live) frames; assemble the before/after paired DELTA; probe the two PPTX URLs for 200; register the DELTA so `proof:live-verified-ledger` passes | no git/token needed — read-only HTTP probes + the AFTER half of the DELTA + the ledger registration |

The wave's "deploy" is NOT an agent `npm run deploy` — that script (`scripts/deploy.sh` → `pages-deploy.sh` + `attach-domain.sh`) needs the CF token and is the CI/USER break-glass path. The agent's job is the two verifiable bookends; the irreducible middle is the named hinge.

## §4 — Agent units (serial across the USER push, never parallel)

### AZ.W-DEPLOY.1 — the pre-push local-green + BEFORE-capture arm

- **Goal.** Every device-free deploy precondition is GREEN locally and the BEFORE half of the deploy DELTA (the current live surface) is captured, so the only thing standing between HEAD and the live deck is the named USER push.
- **Mechanism.** Run, against the reviewed slides tranche HEAD: `vue-tsc --noEmit && vite build` (assert `dist/` emits); `npm run proof:deck-copy-conformance` (exit 0); `npm run proof:live-verified-ledger -- --tranche=…` (self-test OK + zero violations on closed rows); `npm run proof:no-bespoke-constellation` (the AZ.W-ADOPT gate — the deck is bespoke-free); render the `?export`/`?freeze` static captures of every slide and confirm the deterministic-capture path serves POSTERS (the Xray portal poster, the SuccessDelivered map/speed-test posters) not live/broken frames; run `npm run export:pptx -- til-briefing both --no-build` and confirm `dist/exports/til-briefing.pptx` + `til-briefing-dark.pptx` emit; then capture the CURRENT live deck (`https://slides.friday.institute/til-briefing`, landscape 1280×720 + portrait 390×844) as the BEFORE frames via Chrome DevTools MCP. Author `HANDOFF-DEPLOY.md` (the USER hinge note).
- **Files (create):** `docs/tranches/L/audit/visual/AZ.W-DEPLOY-1280x720-before.png`, `…-390x844-before.png`, `docs/tranches/L/audit/HANDOFF-DEPLOY.md`.
- **Sub-gate.** All device-free gates exit GREEN (terminal output pasted into the DELTA); `dist/` + `dist/exports/*.pptx` exist (a directory listing); the `?export` capture renders the committed posters (a DOM readback — `<img class="poster">` present, not an `<iframe>` or a broken frame); the BEFORE frames are real on-disk PNGs; `HANDOFF-DEPLOY.md` names the exact forward-cut → merge → push sequence. The agent STOPS here for the USER hinge.

### AZ.W-DEPLOY.2 — the post-push live-200 + AFTER-capture + ledger-registration arm

- **Goal.** The live `slides.friday.institute/til-briefing` serves the NEW deck, proved by an HTTP-200 probe + a captured AFTER frame set, and the before/after DELTA is registered so the cardinal-lesson ledger gate passes on this row.
- **Mechanism.** Runs ONLY AFTER the user confirms the merge-to-main + push landed (the `deploy-pages.yml` deploy completed). Probe `https://slides.friday.institute/til-briefing` for HTTP 200 (`curl -sS -o /dev/null -w '%{http_code}'`); probe `…/exports/til-briefing.pptx` + `…-dark.pptx` for 200; load the live deck via Chrome DevTools MCP and READBACK the served deck count (the pager total / `data-slide` count — confirm it equals the HEAD `deck.ts` count from §0 step 1, not a stale cache of an older deck); capture the AFTER frames (landscape 1280×720 + portrait 390×844 × {light, dark}); assemble `AZ.W-DEPLOY-DELTA.md` with the before/after pairs, the probe results, and the verdict; register the row.
- **Files (create):** `docs/tranches/L/audit/visual/AZ.W-DEPLOY-1280x720-light.png`, `…-1280x720-dark.png`, `…-390x844-light.png`, `…-390x844-dark.png`, `docs/tranches/L/audit/visual/AZ.W-DEPLOY-probe.log`, `docs/tranches/L/audit/visual/AZ.W-DEPLOY-DELTA.md`; (orchestrator) `docs/tranches/L/PROGRESS.md` row flip.
- **Sub-gate.** The live `…/til-briefing` returns `200`; the served deck count reads the HEAD count (not a stale cache); the two PPTX URLs return 200 (or a recorded graceful-404 with the reason); the four AFTER own-surface PNGs (`-light.png` + `-dark.png` at both viewports) are real on-disk PNGs; `AZ.W-DEPLOY-DELTA.md` references them; `npm run proof:live-verified-ledger` passes with this row at `live-verified`.

## §5 — File bounds + disjointness

| File | Access |
|---|---|
| `docs/tranches/L/audit/visual/AZ.W-DEPLOY-DELTA.md` | create |
| `docs/tranches/L/audit/visual/AZ.W-DEPLOY-1280x720-before.png` | create (W-DEPLOY.1) |
| `docs/tranches/L/audit/visual/AZ.W-DEPLOY-390x844-before.png` | create (W-DEPLOY.1) |
| `docs/tranches/L/audit/visual/AZ.W-DEPLOY-1280x720-light.png` | create (W-DEPLOY.2) |
| `docs/tranches/L/audit/visual/AZ.W-DEPLOY-1280x720-dark.png` | create (W-DEPLOY.2) |
| `docs/tranches/L/audit/visual/AZ.W-DEPLOY-390x844-light.png` | create (W-DEPLOY.2) |
| `docs/tranches/L/audit/visual/AZ.W-DEPLOY-390x844-dark.png` | create (W-DEPLOY.2) |
| `docs/tranches/L/audit/visual/AZ.W-DEPLOY-probe.log` | create (W-DEPLOY.2) |
| `docs/tranches/L/audit/HANDOFF-DEPLOY.md` | create (W-DEPLOY.1) |
| `docs/tranches/L/PROGRESS.md` | modify (row flip — orchestrator-owned status commit) |

**Do NOT touch:** any `src/decks/til-briefing/**` SFC or `deck.ts` (the deck is FROZEN at AZ.W-ADOPT's close); `package.json` / `package-lock.json` (the pin is AZ.W-ADOPT's); `scripts/deploy.sh`, `scripts/pages-deploy.sh`, `scripts/attach-domain.sh`, `.github/workflows/deploy-pages.yml` (the CF-token-gated deploy path — USER/CI domain); ANY `docs/tranches/M/**` (M-owned, foreign session); the git index; the CF token, the access key, any `.env`.

The two agent units are SERIAL across the USER push — W-DEPLOY.1 writes only the `-before.png` pair + `HANDOFF-DEPLOY.md`; W-DEPLOY.2 writes only the AFTER pairs + the `probe.log` + the DELTA. No two units share a `create` path; the per-wave PNG prefix `AZ.W-DEPLOY-` is the ledger's own-surface key. The PROGRESS flip is the orchestrator's single status commit.

## §6 — HARD GATE

This wave closes when ALL of the following verify on artefacts:

1. **Pre-push local gates GREEN (agent, phase a).** `vue-tsc --noEmit && vite build` exits 0 and emits `dist/`; `proof:deck-copy-conformance` exits 0; `proof:live-verified-ledger` exits 0 (self-test OK + zero violations); `proof:no-bespoke-constellation` exits 0 (the bespoke-free deck the deploy ships). The four terminal exit lines are pasted into `AZ.W-DEPLOY-DELTA.md`.
2. **The deterministic-capture path serves POSTERS, not live/broken frames.** Under `?export`/`?freeze` the Xray portal renders its committed poster `<img>` and the SuccessDelivered map/speed-test insets render their posters — a DOM readback (not an `<iframe>`, not a broken frame). The `dist/exports/til-briefing.pptx` + `…-dark.pptx` files emit from the local `export:pptx` run (a directory listing in the probe log).
3. **The USER-DOMAIN hinge is NAMED, not agent-run.** `HANDOFF-DEPLOY.md` exists and states the exact sequence the USER runs: forward-cut → merge-to-main → push (the green-CI `deploy-pages.yml` `workflow_run` then ships `dist/` + the PPTX to the `slides` Pages project; `slides.friday.institute` is the attached custom domain). The agent transcript shows NO git stage/commit/merge/push and NO `wrangler`/CF-token invocation (the HARD BOUNDARIES; H5 creds are USER-held).
4. **The live surface returns HTTP 200 (agent, phase c).** AFTER the user push: `curl -sS -o /dev/null -w '%{http_code}' https://slides.friday.institute/til-briefing` prints `200`; the result is in `AZ.W-DEPLOY-probe.log`. A runtime observation of the deployed surface, not a localhost build.
5. **The LIVE deck is the NEW deck (not a stale cache).** A Chrome DevTools MCP readback of the live `…/til-briefing` shows the pager total / `data-slide` count equal to the HEAD `deck.ts` count (re-derived in §0 step 1 — do NOT hardcode 9; the live deck mounts 8 at this writing, the M tranche may re-compose). Guards against a 200 that serves a stale deployment. Recorded in the probe log.
6. **The PPTX artefacts resolve (or a recorded graceful-404).** `…/exports/til-briefing.pptx` + `…-dark.pptx` return 200; if the runner Chrome was unavailable and the export was skipped (the deploy still ships per `pages-deploy.sh`), the 404 is RECORDED with the reason in the probe log (not a silent miss).
7. **The paired before/after DELTA is captured on disk (the cardinal lesson).** `AZ.W-DEPLOY-1280x720-before.png` + `-390x844-before.png` (the old live) AND the four AFTER own-surface frames `AZ.W-DEPLOY-{1280x720,390x844}-{light,dark}.png` (the new live) are real on-disk PNGs referenced by `AZ.W-DEPLOY-DELTA.md`. The DELTA shows the change is LIVE — a captured pixel delta, never a commit-message claim.
8. **`proof:live-verified-ledger` GREEN with this row at `live-verified`.** The PROGRESS row reads `live-verified` and its `AZ.W-DEPLOY-DELTA.md` references the own-surface `-light.png` + `-dark.png` pair. The deploy DELTA is machine-required THROUGH the cardinal gate.

## §7 — Triumvirate dispatch (mandatory recovery)

A triumvirate (research → plan augment → redress) is MANDATORY — the orchestrator may not redispatch the failing unit alone — when:

- **A pre-push local gate REDs and is not local-edit-recoverable.** A `vue-tsc`/`vite build` red, a `proof:deck-copy-conformance` violation, a `proof:no-bespoke-constellation` red, or a ledger self-test failure that is NOT a one-line fix in this wave's bounds is a scope-reveal back into AZ.W-ADOPT or the M content/gate waves — the deploy cannot ship a red tree; the triumvirate roots the failure upstream, not here.
- **The post-push live probe returns non-200 (or the wrong deck).** A 4xx/5xx, OR a 200 that serves a STALE deck (a stale CF cache / a failed `workflow_run` trigger / a deploy that shipped the wrong SHA), is a deploy-infra root-cause the third diagnostic iteration must halt on — research the CF Pages deployment list + the `deploy-pages.yml` run conclusion + the served `data-slide` count before any further probe.
- **The file bounds expand past the deploy artefacts.** If closing the wave requires editing a slide SFC, `deck.ts`, the gate scripts, or the deploy shell scripts (beyond the DELTA + PROGRESS + hand-off note), the bounds are invalidated — a scope-reveal triumvirate opens the correct content/gate/adopt wave; the deploy wave never patches a slide to make the live surface pass.

## §8 — Scope fence + HARD BOUNDARIES

- The agent does NOT merge, push, hold the CF token, run `wrangler`, or author the deploy workflow (`deploy-pages.yml` is shipped + CI-gated). The agent does NOT re-pin the library (that is AZ.W-ADOPT — this wave INHERITS the EXACT `3.10.1` pin). The access key remains a build-inline GH secret (USER-DOMAIN). A rollback (`wrangler pages deployment rollback`) is the USER's break-glass, not an agent action.
- **READ-ONLY in slides docs/tranches/M/** — foreign session.
- The deck is FROZEN at AZ.W-ADOPT's close — a deploy wave NEVER edits the deck to make the live surface pass.

## §9 — Named successors

- A stale-cache 200 (gate item 5 fails because CF served an older deploy) → the triumvirate research arm + a re-push hinge note in `HANDOFF-DEPLOY.md`; not a silent close.
- A PPTX graceful-404 (gate item 6) → recorded with the reason in the probe log; the gear's "Download PowerPoint" target is named as a follow-up on the next deploy, not blocked here.

## §10 — Cross-references

- Parent spec: `slides/docs/tranches/L/waves/L.W-DEPLOY.md` (re-stamped here — the 9-slide gate → the HEAD-derived count; the M tranche's `M.W-DEPLOY` supersedes the L deploy per `M.md:109`, but the standing requirement folds into AZ per the R3 corpus "Constraints carried into AZ").
- `AZ.W-ADOPT` — the upstream re-pin + bespoke-constellation deletion (this wave's precondition).
- FLEET-DIGEST findings A4L-12 (the stale "=9" gate + the M supersession), A4L-2 (the deck evolved to 8 active slides), F3-M2-slides-adopt-deploy (the unowned cross-repo deploy arm, owned here).
- The MEMORY `live-verify capture` note ("live-verified needs a captured DELTA, not a commit claim") — the cardinal lesson this wave's two-arm split structurally enforces.
