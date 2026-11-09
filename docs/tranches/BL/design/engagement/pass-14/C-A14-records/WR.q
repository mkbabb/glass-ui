# C-A14-complete · WebKit re-reads (class 8 of §P14-5: a WebKit act-frame cell is read again before it grades), recorded 2026-11-09 02:2x
# before it runs. WK-1's cand14-E-10 webkit failed one cell, "slider anim · waapi translate", 0.60 px off its own motion against 0.5 at
# load 5.3 (C-E14 read it 0.30 / 0.40 / 0.00 px). E-10 has no per-cell switch for that family, so the stage re-runs whole, twice.
# Named acquisition WR-1 (guarded --exclusive webkit --timeout 90), after WA-1.
18 cand14-E-10 webkit --rr 2
18 cand14-E-10 webkit --rr 3
