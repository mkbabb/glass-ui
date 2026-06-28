// Worked re-point examples — proving the seam resolves real paths + fails explicit.
import { readCanon, canonDocRel, auditCanonHomes } from "./canon-doc.reporoot.mjs";

// ── EXAMPLE 1 — proof:handmark W6 (was: rd("CLAUDE.md"); now: component README) ──
// BEFORE:  const claude = rd("CLAUDE.md");
//          if (!/three.register/i.test(claude)) violations.push("W6: CLAUDE.md must record …")
function handmarkW6() {
  const doc = readCanon("component:handmark");                // strict — REDs if absent
  const ok = /three[- ]register/i.test(doc) && /HandMark|InkMark/.test(doc);
  return ok ? [] : [`W6: ${canonDocRel("component:handmark")} must record the three-register fence + the HandMark family`];
}

// ── EXAMPLE 2 — proof:on-glass-fg W4 (was: read("CLAUDE.md"); now: glass-system.md) ──
function onGlassFgW4() {
  const doc = readCanon("glass-system");
  const ok = /on-glass-muted/.test(doc) && /--input-on-glass/.test(doc) && /--progress-track-on-glass/.test(doc);
  return ok ? [] : [`W4: ${canonDocRel("glass-system")} must record the on-glass foreground three-rung family`];
}

// ── EXAMPLE 3 — proof:close-battery-parity clause-4 (was: read("CLAUDE.md")??""; now: build-and-gates.md) ──
function closeBatteryClause4() {
  const doc = readCanon("build-and-gates");
  const ok = /--run full/.test(doc) && /siblings-absent/i.test(doc);
  return ok ? [] : [`[clause 4] ${canonDocRel("build-and-gates")} must record the --run full close-battery canon`];
}

// Drive them — each THROWS today (homes absent) → proving fail-explicit ordering.
console.log("auditCanonHomes() — absent homes (must author FIRST):");
for (const a of auditCanonHomes()) console.log("  ABSENT", a.key, "→", a.rel);
console.log();
for (const [name, fn] of [["handmark.W6",handmarkW6],["on-glass-fg.W4",onGlassFgW4],["close-battery.clause4",closeBatteryClause4]]) {
  try { const v = fn(); console.log(name, v.length ? "RED: "+v[0] : "GREEN"); }
  catch (e) { console.log(name, "THROW(fail-explicit):", e.message.split(" — ")[0]); }
}
