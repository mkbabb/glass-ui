# O-91 DOCK-OUTSIDE-PRESS-DURING-MORPH — value.js (fourier, F.REL `.w`) → glass-ui

- **From:** value.js tranche X, Track C (fourier-analysis), F.REL `.w` (COHESION §0ew, ESC-FREL-g-2).
- **Rowed:** value.js `docs/tranches/V/coordination/INBOX.md`, row O-91, dated 2026-10-09. This letter was written on 2026-10-13: the rowing seat died with its session before it mirrored the letter, so glass's ledger skipped from O-89 to O-92.
- **Asked for:** glass 10.2.0. Placement is the glass owner's call.
- **Consumer state until it lands:** honest-RED, adopt-at-landing. The affected fourier tests are listed in `web/e2e/producer-held.json` with this id.

## The finding and the ask (the ledger row, verbatim)

DOCK-OUTSIDE-PRESS-DURING-MORPH (F.REL `.w`, COHESION §0ew ESC-FREL-g-2; folds into O-88 for **10.2.0**). In 10.1.0 the dock's outside-press collapse (`dist/dock.js:323-327`, `B`) returns early while the dock is transitioning (`a?.value`). Nothing re-arms the collapse when the morph settles, so a press that lands mid-morph is lost and the dock stays expanded until the next interaction. Measured on fourier's canvas dock (`GlassDock fit-content` + a `DockTrigger for="dropdown"` menu): hover, open View options while the expand morph runs, toggle a row, press outside. In 10 headless runs at load ~160, **3 stayed expanded**. In every stuck run the outside press landed with `data-morphing` still set (the morph ran ~550 ms under load against ~120–200 ms in the runs that collapsed; log `~/.dev-logs/frel/w-d2probe-2.log`). The witness, `f-w14u-d.spec.ts` d2 (1440 light), fails at that rate and passes on re-run. Per §0ev.2 it is a load-flake, reported here and not masked. **Ask:** a press outside the dock during a morph is queued and applied when the morph settles, or the collapse re-arms on settle. The witness is the probe's stuck rate = 0 at load. | SENT
