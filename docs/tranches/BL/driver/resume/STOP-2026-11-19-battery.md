# Stop for the battery, 2026-11-19 17:03

The battery fell from 81 % at 12:26 to 14 % at 17:03 while the Mac read "charging" on AC (load 10 to 15; CrowdStrike at about 250 % CPU, gaggle builds, Home Assistant runs). The power hold paused the demo pass at 12:59, the dock pass at 13:10 and every glass run at 16:00 (40 %). At 14 % the orchestrator stopped glass's runs and the hold outright, so a shutdown loses nothing. No process of glass's is left running or frozen.

Resume when the Mac holds its charge (80 % or more and not falling), the power hold first (`python3 docs/tranches/BL/driver/power-hold.py`, in the background):

1. **11.1.1:** `Workflow({scriptPath: "docs/tranches/BL/driver/glass-11.1.1-exits.js", resumeFromRunId: "wf_7b4b4753-433", args: <driver/resume/glass-11.1.1-after-zone-stop.json>})`. The run finished at round 8 (fix seat 8 not measured: it committed its cure 02dd6a7cb and record a476d0cba, then waited on the hold). The args now carry a RESUME note for fix-1111-8 and lastRound 10, so rounds 1 to 7 and critique 7 replay from cache and fix seat 8 reruns to measure. release/11.1.1 at a476d0cba, pushed.
2. **Dock pass 8:** `Workflow({scriptPath: "docs/tranches/BL/driver/dock-pass-8.js", resumeFromRunId: "wf_e0aa83eb-d6e", args: <driver/resume/dock-pass-8-after-pause.json>})`. bl/dock/wi8 at db66eeb0e, pushed; logs uncommitted in the tree.
3. **Demo P17 close:** `Workflow({scriptPath: "docs/tranches/BL/driver/demo-p17-close.js", resumeFromRunId: "wf_dac9f195-7ba", args: <driver/resume/demo-p17-close-after-pause.json>})`. bl/demo at 4e8686d1d, pushed; items 2 and 3 uncommitted, saved as `.p17/close/wip-at-battery.patch`.

Owed after 11.1.1 lands: atlas's tarball to `/Users/mkbabb/Programming/.u-build/inbound-glass/` with its commit; the publish notices (value.js, atlas, Home Assistant, Gregg, gaggle).

Done 2026-11-19 evening (read-only, while charging): atlas's G3 to G15 (INBOUND O-413) read and placed with an adversarial verify per group, as Home Assistant's round 13 was (`docs/tranches/BL/audit/hassio-r13/triage.js` is the model), then the version list sent to sci-report-5f; and value.js's design study (INBOUND O-414, seventeen asks) placed the same way and sent to value-js-d5 (`audit/triage-1119/PLACED.md`). Owner questions gathered from both: the dock search helper (atlas G9), the hover-surface blur (atlas G10), an in-flow dock's still box (atlas G12) (study G7, G9 and G1 answered yes by the owner on 2026-11-19 evening), the dark Switch (LF-28). Dock pass 8's source seat reads ORCH-LINES-7 line 4 as restated on 2026-11-19 (the card and rounded shapes, not the pill).

## Second stop, 2026-11-19 22:22

After the owner's redeploy at 19:47 the battery fell again on the 60 W charger (18 % at 22:06, 7 % at 22:21, measured by sci-report; value.js restored the shared 40 % floor). The orchestrator stopped glass's three runs and two detached chain scripts the seats had left (`chain.sh` under critic-8, `s8/spool8.py` under the dock harness); nothing of glass's is left running. Where each stopped: 11.1.1 had fix seat 8 measured (d0f85bd29) and critic 8 just started (it reruns fresh); dock pass 8 had its harness done and its source seat at S3 (969137aac); the P17 close had items 1 to 3 committed (tip 1760c2d1e). The three resume calls above stand, with the RESUME notes now updated in the args files (the 11.1.1 args are unchanged, so fix seat 8 replays from cache; dock-pass-8.js now takes args.resume['source-8']).

**Gate for any restart (value.js, 2026-11-19 23:50):** `bash ~/.dev-logs/owner-1112/power-ok.sh` must exit 0. It holds at or under 40 %, whenever the battery drains on the charger, and after a hold until the battery passes 60 %. glass did not resume when other sessions did at 41 % (the battery then fell from 40 % at 23:17 to 20 % at 23:49).

## Third stop, 2026-11-20 01:59

The owner lifted the battery rule at 00:58 ("we have it plugged in"); the three runs resumed at 48 %. At 01:59 the battery was at 10 % and draining 2 A on the 60 W adapter (value-js-f3's alarm; power-ok.sh's emergency stop now holds at 25 % or below while draining). The orchestrator stopped all three runs; nothing of glass's is left running. Where each stopped: 11.1.1 in critic 8 (logs under critic-8/, nothing committed); dock pass 8 in its source seat after S3, with the next item uncommitted in the dock's styles (saved as `measure/harness/s8/wip-at-battery-0159.patch`); the P17 close in its fix seat, with a small StoryCode/router diff uncommitted (`.p17/close/wip-at-battery-0159.patch`). The three resume calls above stand with the updated args files. Resume only when `bash ~/.dev-logs/owner-1112/power-ok.sh` exits 0 or the owner says so.

**Resume threshold (orchestrator, 02:01):** with POWER-FULL in place, power-ok.sh passes whenever the battery is not draining at that moment, and at 02:01 it passed at 11 % only because every session had just stopped. Restarting below the 25 % emergency line would drain the battery again and hold within minutes, so glass resumes when the battery reaches 35 % and power-ok.sh passes (a background wait watches for both), or when the owner says so.

## The owner rules the battery out, 2026-11-20 08:57

The owner: "The battery is invariant. Communicate to all sessions." The battery is no longer a reason to stop, pause or gate a glass run: the 35 % wait above is withdrawn, power-ok.sh does not gate glass, and power-hold.py stays off. The three runs resumed at 08:57 (battery 28 %, charging) with the args files as they stand. Every session was told (value-js-f3, gaggle-f4, sci-report-89, hassio-config-f7, dns-analysis-b1). The guard, the zone line and one WebKit run at a time still bind.

## The weekly limit, 2026-11-20 13:00 to 2026-11-21 15:07

At 13:01 on 11-20 every seat hit the weekly usage limit ("You've hit your weekly limit"). The four runs stayed listed as running with no live seat and no journal write for 26 hours. On 11-21 the owner relayed "resume work. The limit has been reset" (via value-js-f3). The orchestrator stopped the four hung tasks, saved the cut seats' uncommitted work (the dock's as `measure/harness/s8/wip-at-limit-1121.patch`, the demo's as `.p17/close/wip-at-limit-1121.patch`), updated the RESUME notes, and resumed all four: 11.1.1 (critic 8), dock pass 8 (source-8), the P17 close (its fix seat, after c06026d5d), and the keyframes triage `wf_026dccf8-16c` (its tokens and tooltip placement cached).

## 2026-11-21 evening: the P17 close done, a cure round before the merge

The P17 close returned (bl/demo at 15863894f; verify: merge, with three items worse than P16). The merge is held for `driver/demo-p17-cure.js` (run `wf_9f2b3f06-0fa`, seats `p17-cure-fix` then `p17-cure-verify`; no args). If it stops, resume it with `Workflow({scriptPath: ".../demo-p17-cure.js", resumeFromRunId: "wf_9f2b3f06-0fa"})`. The P17 close run `wf_dac9f195-7ba` is finished and no longer needs a resume.

## 2026-11-22: dock pass 8 done (NOT READY); its ruling round

Dock pass 8 `wf_e0aa83eb-d6e` is finished and no longer needs a resume. The ruling round `driver/dock-rulings-8.js` (no args, run `wf_68a44fc8-277`) writes RULINGS-8.md; if it stops, resume it with `resumeFromRunId: "wf_68a44fc8-277"`. The P17 close and cure runs are finished; the font fix `wf_5a0fa209-03c` (no args) is live.

**Owner question added (2026-11-22):** the code font is fetched at app start on routes whose first screen shows code, so it is in hand at first paint and never swaps; on a slow network that paints those routes 30 to 34 ms after P16 (out of about 8.5 s at 400 ms RTT). The other choice starts the font after first paint, so those first screens show code in the fallback face for the rest of the visit. Default: keep the fetch at app start.

**Dock pass 9 and the step-10 check (2026-11-22).** `docs/tranches/BL/driver/dock-pass-9.js` (no args, run `wf_a9e4dc13-149`) and `dock-step10-8.js` (no args, run `wf_f88e423e-667`). If either stops, resume it with `resumeFromRunId` and its run id; a seat that returned not measured gets an `args.resume[label]` note (labels harness-9, source-9, measure-9, verify-9).
