# Input to the dock loop: the glyph is too small in its seat (O-368, 2026-11-15)

Owner, relayed: "our icons sohuld be 2x bigger with not so much padding around the icon like that. Show them more". His frame: `~/.dev-logs/owner-1112/shots/119.png` (daraksha's dock: five seats, each glyph small inside a wide seat). On 13 November he asked the same of a private page: icons 1.5 to 2 times larger without growing the bar.

The design owes one default, for every site: the glyph's size as a share of the seat (a consumer is targeting 70 % of the seat's inner box), the pitch between seats (closer), and a plate no taller than it must be, with the 44 px touch target kept on coarse pointers by the seat's hit area and not by empty painted padding. Show it as strips beside v11.0.1 at 1440 and 390, dark and light. Today's knobs: `--dock-icon-glyph-ratio`, `--dock-run-gap`, the density padding tokens, `--dock-scale`.
