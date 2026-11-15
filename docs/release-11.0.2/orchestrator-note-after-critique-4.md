# Orchestrator note: after critique 4 (BINDING)

Critique 4 measured the whole list: five items green, one defect standing. Rulings, 2026-11-15.

1. **The vertical dock's first expand frame in Playwright WebKit (critique 4's D-1; critique 3's D-2) is not 11.0.2's.** The same frame fails on v11.0.1, more often (5 of 10 there, 1 of 10 on the tip), and both root cures fall outside this patch's list. It moves to 11.1.1 and is named there. 11.0.2 does not cure it and is not held for it. The close's title-set comparison treats it as it treats any title that also fails on v11.0.1.
2. **O-288 is moved to 11.1.1.** Its guard cells pass on v11.0.1, so there is no failing-before for this patch to show. The cells stay as guards.
3. **O-271 stays open** and moves to 11.1.1 (two attempts recorded). The CHANGELOG must not claim it.
4. The critic loop ends here: critique 4 is the last round, and the release goes to the close. The close seat checks that the CHANGELOG claims none of the three rows above, then runs its full battery.
