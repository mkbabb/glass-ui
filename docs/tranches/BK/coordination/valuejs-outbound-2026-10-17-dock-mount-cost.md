SERVED MODEL: claude-opus-5-5

# O-99 — value.js X·V → glass-ui BK: the dock's first-mount cost (X-W12U `.o5c`), 2026-10-17

**From:** value.js X·V, Track A, the X-W12U `.o5c` seat (COHESION §0fv.3, arm (c); W12U.md ADDENDUM (k) :138-143).
**To:** glass-ui, the BK coordination inbox (BL is the newest tranche). **Pin read:** value.js `package.json:89` `"@mkbabb/glass-ui": "10.1.0"`; glass HEAD `87ab56235` (read-only).
**Disposition asked:** ADOPT-AT-LANDING. **Informational:** this row does not gate anything in value.js. §0fv.3 files it so the producer share of value's boot task has an owner.

## What value.js measured (X-W12U `.o5b`, `W12U-evidence/o5b/`)
The real-GPU boot profile (headless real Chrome, ANGLE on Metal, 1280×720, `/`) samples only the single synchronous boot task (`router.isReady() → app.mount`). Files: `o5b/base-profile-r{1,2}.txt` and `o5b/boot-task-profile.mjs`.
- `npm:@mkbabb/glass-ui/dist/dock.js` is the **top self-time module** in the boot task: 18.9 / 18.5 ms self, and 26.3 / 27.4 ms inclusive (r1 s1 / s2). Next come `@vue/runtime-core` at 17.0 ms self and `color.wgsl` (aurora) at 13.5 ms.
- Floor arm `expD` (the `<Dock/>` removed from the boot task, scratch only): the longtask fell from [15,121] / [17,115] to [14,103] / [15,87] ms. The dock's share is about 20–28 ms.
- A forced first layout inside glass `scrollReader` (`position`, 17 ms) took over the cost when the aurora canvas was also removed (`expAD`). It is named here only as a side reading.

## What value.js did on its side (`.o5c`, `9e0212c46`)
- The band is veiled at first paint (the overture), so value.js now mounts `<GlassDock>` in the **task after first paint**, under the veil (`demo/app/composables/boot/useDockArrival.ts`, `dockMounted`). The dock's cost has left the boot task and runs as its own short task, under 50 ms with no longtask entry (`W12U-evidence/o5c/o5-mv-r{1,2}.txt`, `preT0`).
- **A side effect glass may want to know about:** when the dock was mounted inside the long boot task, its subtree ran incidental first-mount transitions:
  - `border-*-radius` 600 ms on the seal and watercolor seats;
  - `opacity` 200 ms on `.dock-icon-button`.

  They ran because the boot task's own forced style flush landed between the insert and the post-mount style writes. Mounted in a short task, the dock arrives settled and no finite transition runs (`o5c/reveal-r{1,2}.txt` `dockAnims=[]`; base `o5c/base-reveal-r{1,2}.txt`). This is the "arrive expanded" shape the M-14 veil has been waiting for (P7).

## The ask (informational, ADOPT-AT-LANDING)
**R-1. Make the dock's first mount cheap.** About 19 ms of self time at setup/mount is the largest producer share of a consumer's boot. Glass owns the shape of the cure. Measurement-heavy setup could run after mount, or setup could avoid forced layout and style reads. When it lands, value.js re-reads its boot task with the committed witness `W12U-evidence/o5c/o5-mv-witness.mjs`.

**R-2 (re-cite, not new). The pill-height rung.** A consumer that mounts the dock after first paint has to reserve the band from tokens alone. With no producer pill-height token (`--dock-pill-h`, communiqué §1.9c), value.js still floors the band with measured constants:
- `--size-icon-btn + 2rem` = 72 px everywhere else;
- `--size-icon-btn + 1.5rem` = 64 px on short landscape (`demo/styles/foundation.css`, this unit).

Both retire to that rung when it ships.

Nothing in value.js waits on this row.

## ADDENDUM (same seat, after the post-cure profile, 2026-10-17)
**R-3 (informational, ADOPT-AT-LANDING). `useScrollTrigger` forces the first layout inside the boot task.**
- Post-cure profile on the committed tree `9e0212c46` (`X/waves/W12U-evidence/o5c/boot-profile-r1.txt`, the `o5b/boot-task-profile.mjs` instrument): `dock.js` no longer appears in the boot task, which sampled 111.8 / 96.2 ms.
- The top glass self time is now:
  - `color.wgsl` (aurora palette derive), 23.1 ms;
  - `scrollReader-*.js`, 17.4 ms: `useScrollTrigger:T → scrollReader:cc → position`, a synchronous layout read at mount.
- The callers are the first-paint pane primitives (`demo/shell/PaneShell.vue`, `demo/shared/ui/PaneHeader.vue`, glass `card`). The pane is first-paint state and stays in the first task (§0fv.2).
- This is the same forced layout `.o5b`'s `expAD` arm saw. While the dock mounted in the boot task, the dock paid for it. Now the next layout reader pays.
- **The ask:** read the first scroll position after the frame, or from an observer, instead of forcing layout at setup. The browser then lays out once, in the frame. Nothing in value.js waits on this row.
