# C-A14 · the load law's Chromium re-reads (named acquisition CR-1, one `guarded --timeout 90`): every attack cell C-1 read FAIL on cand14,
# read twice more on cand14, each beside its passing reference in the same acquisition (A1, A2: cand13; A3: cand12; A12: cand12, cand13).
# C-1 read them at a 1-minute load of 33-104; a defect seen only under load is NOT-REPRODUCED until re-read twice.
4 cand14-ca14 chromium --only A1,A2,A3,A6,A12
4 cand14-ca14 chromium --only A1,A2,A3,A6,A12 --rr 2
4 cand13-ca14 chromium --only A1,A2,A12
4 cand12-ca14 chromium --only A3,A12
# Added 2026-11-06 18:2x by the seat's second holder, before CR-1 started (planned, not in flight): A14-A18, the families H14 drives only
# inside S14's range (M7, M8, M13, M23, M24) driven past it, on cand14 with cand13 and cand12 beside it in the same acquisition.
4 cand14-ca14 chromium --only A14,A15,A16,A17,A18
4 cand13-ca14 chromium --only A14,A15,A16,A17,A18
4 cand12-ca14 chromium --only A14,A15,A16,A17,A18
# Added with A14-A18 (before CR-1 started): the `nozoom` plant (P-E14 §B-5: red on neither engine) on this seat's past-range zoom cells.
3 plant-nozoom-ca14 chromium --only A9
