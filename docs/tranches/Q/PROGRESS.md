# Q — Progress Log

## 2026-05-18 — Tranche open

Q opens against P close `9f774b4` (v1.8.4) + the post-P shadow cohort HEAD `d244dd5` (7 untagged commits). Inherits 29 invariants from P (V 1-20; N 21-23; O 24-27; P 28-29).

Per the user open directive ("This is NOT an implementation phase. Tranche development only."), this open round delivers the planning substrate + dispatched research only. Implementation dispatch awaits explicit subsequent user directive per the K → L → M → N → O → P pattern.

## Headline at Q open

1. **Consumer functional regression** — value.js + keyframes.js report broken dock items / animations / dropdowns / glass-cards. The Q HEADLINE.
2. **Post-P shadow cohort** — 7 untagged commits (`9f774b4..d244dd5`); 4th K-invariant-3 recurrence; 4 of 7 touch dock/toggle/timeline (the broken surfaces).
3. **Playwright online** — the visual-runtime probe (π lane), archived 3×, is now executable. Q.Rζ runs it.

## Open structure

```
docs/tranches/Q/
├── Q.md                          # plan + thesis + invariants — AUTHORED AFTER SYNTHESIS
├── findings.md                   # verbatim directive + inheritance ledger ✓
├── PROGRESS.md                   # this file ✓
├── dispatch/AGENT.md             # extends P template ✓
├── coordination/CONSTELLATION.md # Q-open multi-peer manifest ✓
├── research/                     # 6 round-1 audit deliverables — POPULATED AT ROUND-1 RETURN
│   ├── Qalpha-consumer-breakage-forensics.md
│   ├── Qbeta-core-feature-cohesion.md
│   ├── Qgamma-style-consistency-cascade.md
│   ├── Qdelta-legacy-workaround-sweep.md
│   ├── Qepsilon-recap-chronic-retrospective.md
│   └── Qzeta-visual-runtime-probe.md
├── audit/                        # round-2 consumer audit deliverables — POPULATED AT ROUND-2
└── waves/                        # AUTHORED AFTER SYNTHESIS
```

## Round-1 backend audit dispatch (2026-05-18)

6 read-only agents parallel:

1. **Qα — Consumer-breakage forensics (HEADLINE)** — reproduce + attribute the dock/animation/dropdown/glass-card breakage at value.js + keyframes.js.
2. **Qβ — Core-feature co-location + cohesion** — dock / glass-card / dropdown / animation feature families.
3. **Qγ — Style consistency + cascade** — the 15-file styles/ cascade + tokens + glass ladder.
4. **Qδ — Legacy + workaround sweep** — post-P substrate sweep + P-residual verification.
5. **Qε — Recap + chronic-defer + post-P retrospective (HEADLINE)** — full prompt recap K → Q + the 7-commit retrospective scope.
6. **Qζ — Visual-runtime probe (Playwright; BINDING)** — live browser probe of the broken surfaces.

## 2026-05-18 — Round-1 returned (6/6)

| Lane | Verdict | Headline |
|---|---|---|
| Qα consumer-breakage forensics | REAL-but-CONSUMER-SIDE | Breakage reproduced; NOT a glass-ui regression. value.js: (1) vite config demo-build clobbers its own library `dist/`; (2) 11 `<Card variant="pane">` SFCs use a prop glass-ui's Card never had → silent-swallow → hard black shadow. Dropdown/dock symptoms are layout cascades. glass-ui post-P cohort CLEAN |
| Qβ core-feature cohesion | 4 fractures (all pre-P) | dock `data-density` split-brain (dock.css + utilities.css); `cards.css` near-empty while `.glass-cartoon` lives in glass.css; dropdown lone scoped-style exception; token-home drift. Post-P cohort landed cohesively. Animation/timeline = EXEMPLARY model |
| Qγ style consistency + cascade | SOUND cascade; token defects | 16-sheet cascade principled; glass ladder intact; scoped-vs-global holds. Post-P metric-stack commits introduced an 8-token private SFC dialect (never in tokens.css). CSS budget 92.8% raw / 93.6% gzip — needs rebaseline |
| Qδ legacy + workaround sweep | MINOR; 0 genuine-legacy | Headline: the P.W5 `@mkbabb/value.js` devDep is workaround-debt (phantom dependency); P FINAL mis-declared it ADDRESSED. `beec35e` patched a fix into 2 parallel dock rule-sets (un-consolidated duplication, Q6 violation) |
| Qε recap + chronic + retrospective | recap CLEAN | All K→P prompts ADDRESSED. Post-P cohort = 7 commits / 3 sub-waves; retrospective folder recommended `docs/tranches/AB+2/`. 4th K-invariant-3 recurrence AFTER invariant 29 codified — codification necessary-but-not-sufficient. Chronic-defer: 2 of 9 P-archived items RE-OPEN (PD-3 + π) |
| Qζ visual-runtime probe (Playwright) | RAN — first live probe K→Q | B-1 (P0): value.js cannot boot — vite 500s on glass-ui animation composables because value.js hard-aliases `@mkbabb/keyframes.js` → keyframes.js's DELETED `dist/`. glass-ui demo CLEAN (dock/cards/dropdowns/timeline all render, zero console errors). π lane recommended RETIRE archived → binding canonical lane |

### Synthesised root-cause model

The consumer breakage is **NOT a glass-ui substrate regression**. It is a **cross-repo dev-resolution contract desync**: the AD.W4 `development`-conditional-exports flip changed the dev-time module-resolution model, but consumer Vite configs (hard `dist/` aliases) + build configs (demo build clobbering library `dist/`) were never re-swept. Compounded by value.js's stale `<Card variant="pane">` API usage. The post-P shadow cohort is CLEAN (and is a separate K-invariant-3 process concern).

## Round-2 consumer audit dispatch (2026-05-18)

2 agents (round-1 already exhausted value.js + keyframes.js):
- **Q11** — consumer resolver-config sweep across the 4 un-audited consumers (fourier-analysis / bbnf-buddy / words/frontend / speedtest) for the same latent desync.
- **Q12** — cross-repo dev-resolution contract architecture deep-dive (the gestalt remediation design).

## 2026-05-18 — Round-2 returned (2/2) + synthesis

| Lane | Verdict | Headline |
|---|---|---|
| Q11 consumer resolver sweep | FLEET-WIDE BREAKAGE | All 4 swept consumers (fourier-analysis / bbnf-buddy / words/frontend / speedtest) CURRENTLY broken on `npm run build` + typecheck — identical `Failed to resolve "@mkbabb/keyframes.js"`. Single root cause: keyframes.js `package.json` `exports` points at `dist/` files AD.W4 deleted. The fix belongs in keyframes.js, not each consumer. bbnf-buddy ALSO carries 6 `<Card variant="pane">` sites |
| Q12 dev-resolution architecture | ONE defect, not four | The 4 round-1 band-aid-candidates are one architectural defect — the AD.W4 `development` conditional-exports model applied publisher-side, never resolver-side. Gestalt remediation = 7 one-line fossil-deletions across 3 repos + a precept edict + `proof-resolution-contract.mjs` gate. The phantom devDep RETIRES |

### Synthesis — Q.md + 6 wave specs (W0-W5) authored

| Q wave | Headline | Tag |
|---|---|---|
| W0 HEADLINE | Post-P retrospective (`docs/tranches/AB+2/`) + dev-resolution contract + `proof-resolution-contract.mjs` gate + precept edict | v1.8.5 |
| W1 HEADLINE | Fleet-wide consumer un-break — keyframes.js `exports` keystone + value.js alias/clobber + glass-ui phantom-devDep retiral + 5-consumer resolver sweep | v1.8.6 |
| W2 | Card cohesion — glass-ui `Card` props fail-explicit (invariant 31) + value.js 11-site + bbnf-buddy 6-site `variant="pane"` migration | v1.8.7 |
| W3 | Core-feature cohesion transpositions (Qβ 4 fractures + `beec35e` dock-duplication) | v1.9.0 minor |
| W4 | Style + token co-location (Qγ 6) + CSS budget rebaseline + legacy cosmetic sweep | v1.9.1 |
| W5 close | 13-lane audit + visual-runtime re-probe (π BINDING) + invariants 30-31 + FINAL.md | aggregate |

2 NEW invariants at Q: 30 (cross-repo dev-resolution contract) + 31 (component props fail-explicit). π visual-runtime lane RE-ACTIVATES from archived → binding canonical (Playwright confirmed online).

## Awaiting dispatch authorization

Per the Q-open user directive ("This is NOT an implementation phase. Tranche development only."), the planning substrate landed at the Q-open commit. Implementation dispatch awaits explicit subsequent user directive per the K → L → M → N → O → P precedent.

When dispatch authorized: W0 HEADLINE opens — 3 lanes (post-P retrospective `docs/tranches/AB+2/` + dev-resolution contract + proof-gate script).
