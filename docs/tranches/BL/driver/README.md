# BL driver: the workflow scripts and watcher helpers

These are the scripts of record for every BL workflow run. They live here because `/tmp` and the session scratchpad are wiped on reboot (owner rule, 2026-10-06: nothing that must survive a run or a boot goes in `/tmp`).

- `bl-*.js`: one workflow script per run. Resume a run with `Workflow({scriptPath: <this dir>/<script>, resumeFromRunId})`. The run ids are in `../FORMATION-PROGRESS.md`.
- `next.sh <run ids…>`: blocks until any listed run banks a new seat result.
- `w.sh <run ids…>`: prints one line per new journal event, and one STALL line for a run whose newest seat transcript is quiet for over 25 minutes.

Scripts written before 2026-10-06 point seat worktrees at the session scratchpad under `/private/tmp`. Changing that path changes the seat prompts and breaks resume caching, so those runs finish as launched. Every script written from now on puts seat worktrees under `.claude/worktrees/bl/` in the repo (gitignored), and every artifact under `docs/`.
