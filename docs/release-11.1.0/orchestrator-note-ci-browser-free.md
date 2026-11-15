# Orchestrator note — browser-free Actions (owner, 2026-11-13). BINDING for the close seat.

The owner: "We should not have an absurd number of expensive tests, or any playwright tests, in the action."

master carries the change as merge 4db0b22dd (branch `ci/no-playwright`: d7d9b24f4, aa0c1da88, 15ee21803, 0faf408e1, 46ac802c3, 58aa9d64e). A tag push runs the workflow files AT THE TAG, so before this branch is tagged it must carry them: merge master (or cherry-pick those six) and resolve. After it: `npm test` needs no browser; the two browser-launching unit tests are `*.browser.test.ts` under `npm run test:browser`; the pixel floor and `test:browser` run in `scripts/release.sh`; `tests/gates/ci-browser-free.test.ts` goes red if a workflow names a browser. The close runs the full suite with CI=true once to prove it, and `npm run test:browser` once locally.

## Added 2026-11-13 02:00 — the sparse checkout too

master now also carries merge ee1dc2935 (`ci/sparse-checkout`: 4cc32c066, 520091932, and a ratchet rebind): all three workflows check out everything but `docs/` plus the eight docs files a gate reads, and `tests/gates/ci-sparse-checkout.test.ts` holds the lists together. Take it with the browser-free change (merge master is simplest). If this branch adds a gate that reads another docs file, add it to both `paths` lists and both sparse blocks or that test goes red. The `test:browser` script line adds 72 B to the packed package: rebind the ratchet on the tree that is tagged.

## Added 2026-11-15, for the release-close seat (BINDING)

Before anything else, read EVERY `orchestrator-note-*.md` in this folder; all are binding. Two are new since the last critic round:

- `orchestrator-note-master-has-1102.md`: v11.0.2 is published and on master as merge 58c778ff5. Merge master first and keep both lines' behaviour; rerun the release-11-0-2 specs on the merged tree in Chromium and WebKit beside 11.1.0's own; the CHANGELOG has 11.1.0 above 11.0.2's entry; rebind the ratchet last.
- `orchestrator-note-dock-search-throw.md`: the demo route `/dock/dock-search` throws "addEventListener is not a function" at mount at 390 with touch. Reproduce on the merged tree and on v11.0.1. The watcher itself is unchanged since v11.0.1, so the cause is likely what the page hands the dock as its root. If v11.0.1 throws the same, record it for 11.1.1 and go on. If it is new on this branch, STOP and return ready_to_tag=false naming it.
