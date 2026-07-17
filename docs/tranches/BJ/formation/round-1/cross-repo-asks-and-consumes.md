# Round 1 — cross-repo asks and consumes (?)

## Summary

The 7.0.0 outbound roster is a well-organized ledger, but two live obligations are built on evidence that is false at HEAD: the "HARD pre-publish blocker" pin-guard cites sibling manifest sites and version ranges that no longer exist (sci-report's app/ dir is gone and it now pins glass 6.0.0 exact, not the OPEN >=4.2.0 that made the auto-resolve hazard real), and the icon-tooltip successor the roster/wave tells speedtest to adopt (`<Tooltip preset="icon">`) is a phantom API that speedtest has already booked into a consume. The export-map delta itself is arithmetically sound and the CHANGELOG/MIGRATION carry correct successor guidance, so the defects are ledger-vs-reality drift and a knowingly-withheld correction, not a broken export map. Two smaller obligations (atlas #22b/c dock-contract note; the atlas pre-stage "confirm-or-correct" ruling) remain undelivered and deferred to the Q060-at-tag outbound.

## Findings (4)

### [major] stale-cross-repo-pin-evidence

**Claim:** The row-6 pin-guard, declared a HARD pre-publish blocker, is predicated on sibling manifest sites and ranges that are false at HEAD: sci-report's auto-resolve premise (the OPEN >=4.2.0 range) does not exist, and both siblings have already moved off the cited value ^1.2.0 floor.

**Evidence:** Roster claims (asks-and-consumes.md:19 'each pins value at ^1.2.0'; :25 sci-report `app/package.json:17` `>=4.2.0` OPEN + value `^1.2.0`; :26 atlas `package.json:101` `^4.2.0`/`:124` `4.2.0` + value `^1.2.0`; census :91/:93). At HEAD: `sci-report/app/` is ABSENT (dir does not exist) and the real consumer `sci-report/dashboards/package.json:17` pins glass `"6.0.0"` EXACT (never auto-resolves 7.0.0), kf `5.3.5`, value `"3.1.0"` (:20) — not `>=4.2.0`/`^1.2.0`. atlas/package.json:121 is `^6.0.0`, :124 value `^3.1.0`, dev :144 `6.0.0`/:147 value `3.1.0` — not `^4.2.0`/`^1.2.0`, and line numbers 101/104/124/127 are all wrong. INBOUND-MARKS.md:360 still books the lockstep target as `^5.0.0` + value `^3.1.0` (5.0.0-era). The 'covering' gate proof:crossrepo-asks:bi is absent from the main tree (no scripts/proof-crossrepo-asks.mjs, no package.json script; only in .claude/worktrees/*) and by its own definition (asks-and-consumes.md:110) 'never probes a sibling', so it structurally cannot catch this drift. reaudit-marks item 2 (2026-07-16) warned the roster was stale at every version pin; the truth-up commit 6d4e75bf fixed the glass-ui target version but never re-verified the sibling sites.

**Proposed:** build — re-verify both sibling manifests on disk and rewrite row-6 (sites, ranges, urgency) before any 7.0.0 publish; the export-map delta is orthogonal and neither satisfies nor breaks this — the premise is stale on its own.

### [major] phantom-successor-api-adopted-by-consumer

**Claim:** The outbound roster and BI.W-SPEEDTEST-ONLY-PAIR direct speedtest to migrate IconTooltip onto `<Tooltip preset="icon">`, but Tooltip has no `preset` prop; speedtest has already 'adopted' this into a booked consume, so it will write a prop that silently no-ops (inheritAttrs:false drops it), and glass-ui knowingly withheld the correction.

**Evidence:** asks-and-consumes.md:49 (row 14) 'migrate the two <IconTooltip> sites onto the Tooltip preset' + ask-id `speedtest-icon-tooltip-to-tooltip-preset`; census :94 'migrate onto the Tooltip preset'; BI.W-SPEEDTEST-ONLY-PAIR.md:27/:39/:69 '<Tooltip preset="icon"> or equivalent'. src/components/tooltip/Tooltip.vue TooltipProps = { open, defaultOpen, delayDuration, disabled } — no `preset`; `grep IconTooltip src/` = 0 (fully removed). speedtest-inbox-2026-07-17-pass9-successor-relay.md §1: 'icon-tooltip -> FOLD onto Tooltip preset="icon": adopted ... booked as a W0.a/W2 consume row on our side.' The CHANGELOG export-map delta is CORRECT ('./icon-tooltip removed — compose ./tooltip over the trigger') and MIGRATION.md:33 says 'There is no icon-only tooltip wrapper' — but INBOUND-MARKS.md:855/:901/:910 acknowledges the mismatch yet rules the correction 'self-delivers at tag ... a proactive heads-up ... is the orchestrator's routing choice, not a new obligation', leaving the roster/wave contradicting MIGRATION. This is the exact silent-no-op prop class in the glass-ui binding-verification memory note.

**Proposed:** fold-into-<BI.W-SPEEDTEST-ONLY-PAIR> — correct row 14 + the wave to say 'compose the Tooltip family (TooltipTrigger/TooltipContent), no preset prop' and send the correction outbound now rather than deferring to tag, since the consumer has already committed the wrong form.

### [minor] deferred-behavioral-contract-relay

**Claim:** The atlas #22b/c dock-greenfield contract note (PEEK/tri-state detent + cross-layer dismiss model) remains undelivered even though its trigger (BI.W-DOCK-SPINE close) has fired and the answer is derivable from source; the 7.0.0 export-map delta ignores it.

**Evidence:** atlas-outbound-2026-07-12-decision-0.md:15+ books #22(b)(c) 'owed when BI.W-DOCK-SPINE lands'. BI.W-DOCK-SPINE.md exists and the spine is treated as landed (BI.W-SCROLL-PROGRESS-RIM.md:25 / BI.W-TEMPO.md:33 reference it as the surviving dock engine). `grep -rln PEEK|tri-state src/components/custom/dock/` = 0, so the #22b answer ('PEEK is not native to the new dock') is knowable now but unrelayed. No delivery outbound exists — grep for PEEK/dismiss/22b/22c across all atlas-outbound*/glass-outbound* matches ONLY the decision-0 deferral file. INBOUND-MARKS.md:601 confirms it is still an open Q060 row ('No change to the other Q060 rows (#22b/c dock-contract note ...)'). The 7.0.0 CHANGELOG dock row addresses only export surface (DockSection/DockStack/fisheye removal, DockSeparator) and says nothing about PEEK/dismiss — it IGNORES #22b/c.

**Proposed:** fold-into-<Q060-at-tag outbound> — acceptable to ride the tag as tracked, but draft the note now (answer: PEEK non-native; state the new dismiss model) so the trigger-fired obligation isn't carried on a stale 'owed later' with no content.

### [note] deferred-consumer-ruling-on-masking-fallback

**Claim:** Atlas explicitly asked glass-ui to 'confirm or correct' whether its pre-stage (consuming kf6/value4 under a glass ^6.0.0 peer via --legacy-peer-deps) is in-law; glass-ui's own install-truth declared --legacy-peer-deps a forbidden masking fallback, yet the ruling is deferred to tag with no interim answer.

**Evidence:** atlas-inbox-2026-07-17-adopt-confirmed-and-install-truth-ack.md §3: 'the worktree install used --legacy-peer-deps, i.e. exactly the wedged graph your §1 forbids ... Confirm or correct.' glass-outbound-2026-07-17-constellation-install-truth.md §1: '--legacy-peer-deps is NEVER the answer. It is a masking fallback ... violates the repo's no-masking-fallback law.' INBOUND-MARKS.md:601 records the reply as a 'NEW owed row ... fold into the Q060 outbound at tag' — i.e. no interim ruling despite the direct question touching the repo's own no-masking-fallback edict.

**Proposed:** fold-into-<Q060-at-tag outbound> — low risk since atlas holds the branch unpublished, but a one-line interim ruling (pre-stage lawful as an unpublished staging worktree vs. must re-order atop the glass-7 peer bump) would close an explicit open question rather than carrying it silently to tag.

