// BJ TERMINAL-ROSTER row #9 (W-GATE-TRUTH) — G-GATE-BUDGET's executable.
//
// THE INVARIANT: the two gate registers are BOTH true and BOTH measurable.
//   Figure A (doc)  — §B.5's exactly-60 seat budget.
//   Figure B (code) — GATE-SEMANTIC-ROSTER-C19.json's active/reserved/external counts.
// TR#65: "both figures ship with their detectors or neither ships." Until this file
// existed, figure B had no committed detector at all (the one that produced it was lost
// with the governance stash, cursor ⊕¹³ᵃ) and the two registers shared ZERO identifiers —
// they were only ever printed side by side, never reconciled. SEAT-BINDING.json is the
// missing bijection; this script is what makes both figures re-derivable by command.
//
// WHAT THIS DOES NOT DO, deliberately. The recovered `verify-governed-invariants.mjs`
// went green only via 3 new files, 6 enrollment edits and a 48-registration migration
// across 28 files with frozen title strings and sha-pinned ordered-id digests — an
// apparatus, and its headline figure was STILL read off the JSON rather than derived.
// This re-derives the four checks of it that carry their own weight and nothing else:
// the sha pin, the counts recomputation, the row->file->title binding, and the external
// enrollment edges. No `governedInvariant` wrapper, no setup file, no package.json chain.
//
// ON THE TITLE DRIFT. C19 is sha-pinned; the pin is quoted at TERMINAL-ROSTER.md:159 and
// :215, so row #9 may not edit it — #65 owns §B.5 and owns the successor cut. The drift
// is therefore PINNED in SEAT-BINDING.json rather than allowlisted: the detector REDs if
// a second row drifts AND REDs if the recorded row is repaired without updating the
// record. Suppression in neither direction; an allowlist only suppresses one way.
//
// ON `unbound`. 54 of 60 doc seats carry no executable of that name. That is a REPORTED
// FIGURE, not a failure: driving it to zero would mean minting 54 gate names into code,
// which is precisely the gates-abrogation mandate's forbidden class. The strike-or-rename
// decision belongs to #65. What this script DOES fail on is a binding that was CLAIMED and
// is not there — a seat declared bound whose name is absent from its named file.

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";

export const ROSTER_PATH =
    "docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GATE-SEMANTIC-ROSTER-C19.json";
export const SEAT_BINDING_PATH =
    "docs/tranches/BK/execution/2026-08-03-row9-register/SEAT-BINDING.json";

// The provenance pin. TERMINAL-ROSTER.md:159 (#9), :215 (#65), §B.5.
export const PINNED_ROSTER_SHA256 =
    "dc05df9124024d721ce3a69dca297c237c965fa31921fbae6e0e46bb72257b52";

export const SEAT_BUDGET = 60;

const sha256 = (text) => createHash("sha256").update(text).digest("hex");

// A roster row binds only to a LIVE registration: the title must be the first argument of
// an `it(` / `test(` call (with any chained modifier — `.each(...)`, `.fails`, `.only`,
// `.skip`, `.concurrent`, `.sequential`). Matched as a whole quoted string so a substring
// of a longer title can never satisfy a row, and titles carry backticks and apostrophes so
// all three quote forms are admitted with the delimiter matching at both ends.
//
// The call-form requirement is the difference between "the words appear in the file" and
// "an executable case asserts this". A title sitting in a comment, a doc string or a
// deleted-but-narrated block would satisfy the former; it must not satisfy a register.
const CALL_FORM =
    /(^|[^.\w$])(it|test)(\.(each|fails|only|skip|todo|concurrent|sequential)(\([\s\S]*?\))?)*\(\s*$/;

const titleIsRegistered = (source, title) => {
    for (const quote of ['"', "'", "`"]) {
        const needle = `${quote}${title}${quote}`;
        let index = source.indexOf(needle);
        while (index >= 0) {
            // 260 chars is comfortably past the longest `it.each([...])(` table head in
            // the suite; the anchored `$` means only the text abutting the title counts.
            if (CALL_FORM.test(source.slice(Math.max(0, index - 260), index))) return true;
            index = source.indexOf(needle, index + 1);
        }
    }
    return false;
};

const resolveAnchor = (anchor, io) => {
    if (anchor.includes("#scripts.")) {
        const [file, key] = anchor.split("#scripts.");
        if (!io.exists(file)) return false;
        const pkg = JSON.parse(io.read(file));
        return Object.prototype.hasOwnProperty.call(pkg.scripts ?? {}, key);
    }
    if (anchor.includes("#")) {
        const [file, fragment] = anchor.split("#");
        return io.exists(file) && io.read(file).includes(fragment);
    }
    return io.exists(anchor);
};

const defaultIo = {
    read: (path) => readFileSync(path, "utf8"),
    exists: (path) => existsSync(path),
};

/**
 * Re-derives both register figures. Pure over the injected io, so the self-test bites can
 * sever a byte in memory without writing to disk.
 */
export function verifyGateRegister(io = defaultIo) {
    const violations = [];
    const rosterText = io.read(ROSTER_PATH);
    const rosterSha256 = sha256(rosterText);

    // 1 · the sha pin — the figure #9/#65 quote is now backed by a committed detector.
    if (rosterSha256 !== PINNED_ROSTER_SHA256) {
        violations.push(
            `roster sha256 ${rosterSha256} != pinned ${PINNED_ROSTER_SHA256} — the C19 pin quoted at TERMINAL-ROSTER.md:159/:215 no longer describes the file on disk`,
        );
    }

    const roster = JSON.parse(rosterText);
    const active = roster.activeVitest ?? [];
    const reserved = roster.reservedVitest ?? [];
    const external = roster.externalEnforcement ?? [];

    // 2 · counts recomputed from the arrays, never read off the stored object.
    const hardReserved = reserved.filter((r) => r.reservation === "hard").length;
    const conditionalReserved = reserved.filter(
        (r) => r.reservation === "conditional",
    ).length;
    const recomputed = {
        activeVitest: active.length,
        hardReservedVitest: hardReserved,
        conditionalReservedVitest: conditionalReserved,
        worstCaseCountedSeats: active.length + hardReserved + conditionalReserved,
        remainingSeats:
            SEAT_BUDGET - (active.length + hardReserved + conditionalReserved),
        externalEnforcement: external.length,
    };
    for (const [key, value] of Object.entries(recomputed)) {
        if (roster.counts?.[key] !== value) {
            violations.push(
                `counts.${key}: roster states ${roster.counts?.[key]}, recomputation over the arrays gives ${value}`,
            );
        }
    }

    // 3 · every rostered row resolves to an executable: file present, title live.
    const measuredDrift = [];
    for (const row of active) {
        if (!io.exists(row.sourcePath)) {
            violations.push(`active ${row.id}: sourcePath missing — ${row.sourcePath}`);
            continue;
        }
        if (!titleIsRegistered(io.read(row.sourcePath), row.currentRegistration)) {
            measuredDrift.push({
                id: row.id,
                sourcePath: row.sourcePath,
                rosterTitle: row.currentRegistration,
            });
        }
    }

    const badAnchors = [];
    for (const row of external) {
        if (!io.exists(row.sourcePath)) {
            violations.push(`external ${row.id}: sourcePath missing — ${row.sourcePath}`);
            continue;
        }
        for (const anchor of row.enrollment ?? []) {
            if (!resolveAnchor(anchor, io)) {
                badAnchors.push(`${row.id} -> ${anchor}`);
                violations.push(`external ${row.id}: enrollment anchor unresolved — ${anchor}`);
            }
        }
    }

    // 4 · the 60 doc seats bind to a path or are declared unbound.
    const seatFile = JSON.parse(io.read(SEAT_BINDING_PATH));
    const seats = seatFile.seats ?? [];
    if (seats.length !== SEAT_BUDGET) {
        violations.push(
            `seat register holds ${seats.length} rows, budget is exactly ${SEAT_BUDGET} (§B.5, user-mandated ceiling)`,
        );
    }
    const familyTally = {};
    for (const seat of seats) {
        familyTally[seat.family] = (familyTally[seat.family] ?? 0) + 1;
    }
    for (const [family, declared] of Object.entries(seatFile.familyCounts ?? {})) {
        if ((familyTally[family] ?? 0) !== declared) {
            violations.push(
                `family ${family}: declared ${declared} seats, rows carry ${familyTally[family] ?? 0}`,
            );
        }
    }

    let bound = 0;
    let armOnly = 0;
    for (const seat of seats) {
        if (seat.binding === "none") {
            if (seat.paths?.length) {
                violations.push(
                    `seat ${seat.seat}: declared unbound but names paths — a seat is bound or it is not`,
                );
            }
            continue;
        }
        if (!seat.paths?.length) {
            violations.push(`seat ${seat.seat}: declared ${seat.binding} with no path`);
            continue;
        }
        // Every CLAIMED binding is verified against the file. This is the bite: delete the
        // name from the executable and the register REDs.
        for (const path of seat.paths) {
            if (!io.exists(path)) {
                violations.push(`seat ${seat.seat}: bound to a missing file — ${path}`);
            } else if (!io.read(path).includes(seat.seat)) {
                violations.push(
                    `seat ${seat.seat}: claimed bound to ${path}, but that file does not carry the name`,
                );
            }
        }
        if (seat.binding === "seat-detector") bound += 1;
        else armOnly += 1;
    }

    // 5 · the drift set is PINNED — a second drift REDs, and a silent repair REDs too.
    const declaredDrift = seatFile.declaredTitleDrift ?? [];
    const measuredIds = measuredDrift.map((d) => d.id).sort();
    const declaredIds = declaredDrift.map((d) => d.id).sort();
    if (measuredIds.join("|") !== declaredIds.join("|")) {
        violations.push(
            `title drift set moved: measured [${measuredIds.join(", ")}], declared [${declaredIds.join(", ")}] — update SEAT-BINDING.json and route the change to #65`,
        );
    }

    return {
        rosterSha256,
        counts: recomputed,
        activeRows: active.length,
        reservedRows: reserved.length,
        externalRows: external.length,
        titleDrift: measuredDrift,
        badAnchors,
        seats: {
            total: seats.length,
            bound,
            armOnly,
            unbound: seats.length - bound - armOnly,
        },
        violations,
    };
}

export const formatRegisterLine = (r) =>
    `seats:${r.seats.total} active:${r.counts.activeVitest} reserved:${r.reservedRows} ` +
    `worstCase:${r.counts.worstCaseCountedSeats} remaining:${r.counts.remainingSeats} ` +
    `external:${r.counts.externalEnforcement} bound:${r.seats.bound} armOnly:${r.seats.armOnly} ` +
    `unbound:${r.seats.unbound} drift:${r.titleDrift.length} ` +
    `rosterSha256:${r.rosterSha256.slice(0, 8)} violations:${r.violations.length}`;

const invokedDirectly =
    process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop());

if (invokedDirectly) {
    const report = verifyGateRegister();
    console.log(formatRegisterLine(report));
    for (const drift of report.titleDrift) {
        console.log(`  DRIFT (routed to #65) ${drift.id} — ${drift.sourcePath}`);
        console.log(`    roster title: ${drift.rosterTitle}`);
    }
    for (const violation of report.violations) {
        console.error(`  VIOLATION ${violation}`);
    }
    process.exit(report.violations.length ? 1 : 0);
}
