# cascade-vjs — value.js's response (R.W7 close, 2026-07-04)

**From**: value.js tranche R (close) · **To**: fourier-analysis (the hub ledger's owner — `ADOPTION-ASKS.md:118`, the cascade-vjs row) · **Cc**: whoever next reconciles the constellation ledger
**Provenance**: the inbound ask is booked at fourier `ADOPTION-ASKS.md:118` (tracked value.js-side at `docs/tranches/R/audit/coordination/COORDINATION-ANALYSIS.md` E13 + `FOURIER-LATEST.md` G4). Per the ratified R rider, this is the explicit response the Q4 ratification owes — not silence.

The cascade-vjs row asks three things. Item by item:

## 1 · `unplugin-vue-markdown` bump (`^29` → `^32`, the vite `^8` peer) — **ACCEPTED; ALREADY LANDED + re-verified at R close**

The bump landed before R (the N-era D6 audit recorded it: "the `unplugin-vue-markdown ^32` half is DONE"). Re-verified and re-locked at R.W7 close, 2026-07-04:

- `package.json:158` — `"unplugin-vue-markdown": "^32.0.0"`; installed `32.0.0` == registry latest (`npm view` 2026-07-04).
- **Lockfile regen EXECUTED at close**: `npm install --package-lock-only` — the only drift was the two stale `file:`-sibling manifest snapshots, now current (`../glass-ui` 4.1.0 → **4.2.0** incl. its keyframes `^5.0.0` / value.js `^1.0.0` peer rows; `../keyframes.js` 4.4.0 → **5.1.0** incl. its value.js `^1.2.0` dep row). 30 changed lines, all inside those two stanzas.
- **Green with the regenerated lock**: vitest **1998/1998** (58 files) · `npm run gh-pages` **built ✓**.

This half of the row can close on your ledger.

## 2 · `@mkbabb/glass-ui` + `@mkbabb/keyframes.js` `file:` → `^published` re-pin — **DECLINED, on the record**

Declined per the **Q4 ratification (owner pass 2026-07-03)** — the standing §3.4 pin policy, recorded in value.js `CLAUDE.md`:

> Keep `file:../glass-ui` and `file:../keyframes.js` **deliberately**. The constellation is a paired-authorship monorepo-in-spirit; a registry pin during active co-development is theater that goes stale the day it's written ("3.13.0" and "BA 4.0.0" both proved this — and your own peer-matrix audit flagged the cascade rows' version strings as stale for the same reason). The disciplines that actually protect value.js are the **adopt-event books** (each sibling major cut is an explicit booked event — the glass-ui 5.0.0 walk is booked now), the **by-name MIGRATION tables** the relay letters demand, and **`boot-smoke` cold** as the catch-all for named-export drift (the Tabs class of failure, which a registry pin would NOT have caught — the 4.x compound-`Tabs` removal shipped with no MIGRATION row either way).

R's own execution added the strongest evidence yet for this policy: the D8-1 producer regression (glass-ui's mid-round dist rebuild re-emitting an unlayered import) was caught **the same day it happened** precisely because the `file:` link kept value.js current, escalated with the defect named (`1599c230`), and cured by the producer within hours (`4b637036`). Under a registry pin the regression would have been invisible until the next version event, then archaeological.

The decline is scoped: it is not "never" — it is "not while co-development is live." The named exit is the constellation's own: when a sibling's cut cadence stabilizes to registry-first, the adopt-event book for that sibling converts to a pin event. Nothing needs to change on fourier's side; suggest re-labelling the ledger row's `file:`→published half **DECLINED-BY-POLICY (value.js Q4, 2026-07-03)** rather than OPEN, so it stops re-surfacing in audits as an unactioned P2.

## 3 · Lockfile regen — **ACCEPTED + EXECUTED** (see item 1; committed at R.W7 close with the green evidence in the commit message).

— value.js R.W7
