# 11.0.2 fix seat 3: D-1 from critique 2 (unfinished, guarded refused)

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.0.2`, branch `release/11.0.2`,
on critique 2 (`15a88380f`). Paths are relative to `docs/release-11.0.2/` unless they start
with `src`.

## What ran

One run, and it was refused before it started:

    guarded --timeout 5 -- node fix-3/forms-probe.mjs chromium
    [guarded] REFUSED: kernel zone data.kalloc.1024 at 8.07M (panics near 20.8M;
    heavy and browser runs stop at 8M): reboot the Mac

(`fix-3/logs/forms-chromium.log`.) Nothing in `src` or `tests` changed. D-1 is open.

## D-1, where it stands

The defect: on v11.0.1 the dock's expanded edge was `var(--glass-border-dock)`; on the tip
no rule in `src` reads that token. O-227's probe (`o227/forms-probe.mjs`,
`logs/o227-forms-2311.log`) shows what Playwright WebKit can and can't take. A `color-mix()`
whose two arms are both translucent `color-mix()` values kills the page. One nested arm
over an opaque arm survives, and so does one nested arm over `transparent`. The library
declares the token at `:root` as a translucent mix, which is why reading it as one arm
beside the collapsed end's mix brings the crash back.

### A third way, not yet tried

Neither of fix seat 2's two ways (stop declaring the token, or read it only at rest). Keep
the token as one arm, read always, and write the collapsed end so it is not a nested
`color-mix()`:

    border-color: color-mix(in srgb,
        <expanded ink: var(--glass-border-dock), or the floating strength when held or static>
            calc(var(--dock-expand-t) * 100%),
        rgb(from var(--foreground) r g b / var(--dock-plate-collapsed-edge)));

If WebKit takes a nested arm beside a relative colour of an opaque ink, this is 11.0.1's
lerp, with the token at the expanded end, and nothing is removed:

- The default paint matches 11.0.1's formula. At rest expanded it is the token itself.
- A host's value shows at the expanded end, as in 11.0.1.
- The two `-border` inputs from fix seat 2 still win as they do now.

Before any source changes, `fix-3/forms-probe.mjs` reads exactly that question. It covers
six forms in Chromium, WebKit 2311 and WebKit 2287:

- the O-227 crash as a control;
- the nested arm beside a relative-colour arm, both written out and through `var()` as the
  dock writes it;
- a relative-colour token;
- one arm only: the token scaled toward `transparent` by `s / g`. This needs typed `calc()`
  division of two percentages, so it is a fallback design only if the engines parse it.

None of these forms has been measured.

### Planned runs once guarded admits them

1. `guarded --timeout 5 -- node fix-3/forms-probe.mjs chromium`; then under
   `--exclusive webkit`, `node fix-3/forms-probe.mjs webkit` (2311) and
   `node fix-3/forms-probe.mjs webkit ~/Library/Caches/ms-playwright/webkit-2287/pw_run.sh`.
2. If the relative-colour collapsed arm survives both WebKit builds:
   - change the edge in `src/components/dock/styles/dock.css`;
   - give the expanded ink a home in `shell.css`, with the held and static arms in
     `morph.css` and `adaptive-legibility.css`;
   - add a witness cell (`edge · a host's --glass-border-dock colours the expanded edge`,
     RED on the tip at `15a88380f`, GREEN on v11.0.1 and on the cure);
   - re-run the O-227 `edge ·` cells (page alive in WebKit 2311 and 2287, the colour at
     t = 0, 0.5 and 1 in Chromium) and fix seat 2's `edge · a host's
     --dock-plate-expanded-border ...` cell;
   - the CHANGELOG's opening paragraph drops the sentence about the edge no longer
     reading the token.
3. If it does not survive, there is still no way to honour both the ruling and O-227. The
   orchestrator or the owner has to choose: waive the ruling for this token, or keep it.

## For the orchestrator

- **A related one, not on the list.** v11.0.1's collapsed end, and its held and static
  expanded end, read `--glass-border-floating`. The tip reads the `--glass-edge-floating`
  strength instead. That token is still read by other surfaces, so it isn't dead, but the
  dock edge no longer follows a host's value for it. The mechanism above could read it the
  same way. I haven't built it, since the defect names only `--glass-border-dock`.
- **bbnf-buddy** sets `--glass-border-dock: var(--glass-border-cartoon)`
  (`src/styles/preset.css:206`), and that value is itself a translucent `color-mix()` (55%
  of `--border`). Under the mechanism above, that site's edge is one nested arm beside a
  relative colour, which is the same form the probe reads.
- Measured: nothing. A reboot is owed before any seat can run a browser.
