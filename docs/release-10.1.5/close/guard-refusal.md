# 10.1.5 release close: NOT RUN, guarded REFUSED

Seat: release close, claude-opus-5-5, 2026-11-04 12:10 EST, branch `release/10.1.5` at `2ad00aca4`.

Before any battery step, guarded refused heavy and browser runs:

```
$ ~/.claude/guard/guarded --timeout 2 -- echo heavy-ok
[guarded] REFUSED: kernel zone data.kalloc.1024 at 8.05M (panics near 20.8M; heavy and browser runs stop at 8M): reboot the Mac
exit=75
$ ~/.claude/guard/guarded --timeout 2 --exclusive webkit -- echo webkit-ok
[guarded] REFUSED: kernel zone data.kalloc.1024 at 8.05M (...)
exit=75
$ ~/.claude/guard/guarded --light --timeout 2 -- echo light-ok
light-ok
exit=0   (with the ZONE-ARMED warning)
```

`~/.claude/guard/log/zone.log` reads 8,052,525 at 12:09:15, slope about 150/s.

None of these ran: prepublishOnly, verify:package, demo:dist:build, vitest, the visual suite
(Chromium or WebKit), the pixel floors and their planted self-tests, the bundle-ratchet
rebind, and the CHANGELOG cut date. No tag, push or publish.

Still owed once guarded admits (after the owner's reboot): the full `scripts/release.sh v10.1.5`
battery, every `.github/workflows/release.yml` check, and the first WebKit witness of
`3d811caba` (critique-3 "Owed").
