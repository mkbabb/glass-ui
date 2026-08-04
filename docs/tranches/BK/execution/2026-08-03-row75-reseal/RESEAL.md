# Row #75 W-STOP-HOOK — pass-2 RESEAL record (2026-08-03, run `wf_321dd098-08e`)

Fresh-Fable adjudication over two assume-wrong Opus challengers (machine-truth · provenance):
**SEAL-CANDIDATE** — every standing machine claim re-measured TRUE-NOW by the adjudicating seat's
own instruments; the prior ⊕²¹ demotion of the round-4 ceremony seal confirmed correct. Full
verdict + per-obligation rulings: `RESEAL-ADJUDICATION.json` (this dir). The driver seals on THIS
run's measurements, never on the void ceremony seats.

## The born-RED, QUOTED (reseal obligation 1)

The pre-state receipts, recovered from the codex rollout logs and verified directly by the
adjudicating seat (chronology proven against the settings mtime chain):

> **Independent seat `019fae35-2796-70d2-9348-bb9015999809` @ 2026-07-29T14:11:57.183Z** —
> recorded `hooks=absent` for BOTH settings files (project-local `.claude/settings.local.json`
> and global `~/.claude/settings.json`).
>
> **Writing seat `019fae35-1531-7142-9d19-890d9d88cb47`** — ran `nl -ba` over the 48-line
> no-hooks settings file @ **14:20:09.833Z**, then applied the patch ADDING the `hooks` key @
> **14:21:37.147Z**.

Order proven: the absence receipts predate the write by 88 s (independent) and ~9 m 40 s
(writing seat's own read). The φ0 bank's only born-RED hit was the challenge seat DEMANDING the
cure (`journal.jsonl:11`) — the cursor's prior word "banked" was false as written and is struck
in the cell.

## The measuring seat's receipts (reseal obligation 3)

- **Strict-JSON matrix 20/20** (17 input classes + 2 jq-missing probes + idempotency), run
  against the verbatim on-disk hook command, sha256
  `f009dc173b8bf78c72ea9ecae3781c83d1eddd2202dc173e5a471267d50e1c75`. The harness is BANKED here
  (`hook.cmd` + `run.sh`, copied from the adjudication scratchpad) — the matrix is re-runnable
  from this dir, curing the F-2/G6 prose-only-evidence rot class.
- **Hooks census:** exactly ONE Stop hook in `.claude/settings.local.json` (the only
  settings*.json in the repo tree; git-ignored via `.gitignore` `.claude/` — pin by content, not
  line); ZERO global hooks; local/managed/hooks-dir variants absent.
- **Cron census, measured directly (discharges the seal-time sandbox caveat):** CronList = the
  one owner-authorized guardian `e4517d4b` only; host `crontab -l` = one commented dns-speedtest
  line, zero active.

## Standing disclosures (non-blocking, wording-scoping)

- "Zero active resume crons" is CRON-SURFACE-SCOPED: `com.mkbabb.pass11-watchdog` (launchd,
  hassio-config-design-lab, `status=paused`, never fired) is live-loaded resume machinery on
  this host, armable by a one-word state flip — the claim must never be read as "zero resume
  automation."
- Live arming in the current long-lived session is unverifiable from disk (the hook write
  post-dates the session start); the claim set asserts CONFIG state. The first graceful stop of
  a fresh session is the natural live probe.
- Out-of-scope aside for the owner, no ruling: the same settings file sets
  `defaultMode bypassPermissions` project-wide.
