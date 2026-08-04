// BJ TERMINAL-ROSTER row #9 (W-GATE-TRUTH) — G-GATE-BUDGET's vitest seat.
//
// The seat that owns "exactly 60" finally has an executable. Before this file, §B.5's 60
// and C19's 48/5/11 were two numbers printed side by side that shared no identifier and
// had no committed detector between them — the code-side one was produced by a script that
// was lost with the governance stash (cursor ⊕¹³ᵃ), which is why #9/#65 were forbidden to
// quote it at all. `scripts/gate-register.mjs` re-derives both; this seat runs it in the
// suite and proves it can fail.
//
// The bites override the injected io IN MEMORY — no disk writes, no fixtures on disk.
// One severance per check the detector claims to make.
//
// CURE ROUND (verdict CURE-REQUIRED). The adjudicating probe proved four blindnesses that
// all scored ABSENT registrations as BOUND — `it.skip(`, `it.todo(`, `// it(`, `/* it( */`
// — and one that scored an UNENROLLED gate as enrolled (every pixel-floor run step deleted
// from `ci.yml`, the word surviving in the prose comment at `:57`). Under the ⊕²⁵ status
// vocabulary each of those is ABSENT, and ABSENT is never GREEN. The bites below are the
// severances that hold the cures: revert `CALL_FORM` to admit `skip|todo`, or drop the
// comment strip, or put the substring anchor back, and one of them REDs.

import { describe, expect, it } from "vitest";
import {
    PINNED_ROSTER_SHA256,
    ROSTER_MD_PATH,
    ROSTER_PATH,
    SEAT_BINDING_PATH,
    SEAT_BUDGET,
    verifyGateRegister,
} from "../../scripts/gate-register.mjs";
import { existsSync, readFileSync } from "node:fs";

const realIo = {
    read: (path: string) => readFileSync(path, "utf8"),
    exists: (path: string) => existsSync(path),
};

/** io with ONE file's content swapped, everything else real. */
const ioWith = (path: string, content: string) => ({
    read: (target: string) => (target === path ? content : realIo.read(target)),
    exists: realIo.exists,
});

interface RosterRow {
    id: string;
    sourcePath: string;
    currentRegistration: string;
}

/**
 * A rostered row registered as a plain `it("…")`, so a bite can demote exactly that call
 * form. Never the pinned-drift row.
 */
const plainVictim = (): { row: RosterRow; quoted: string; source: string } => {
    const roster = JSON.parse(realIo.read(ROSTER_PATH));
    for (const row of roster.activeVitest as RosterRow[]) {
        if (row.id === "reka.tags-input.value-binding") continue;
        const source = realIo.read(row.sourcePath);
        for (const quote of ['"', "'", "`"]) {
            const quoted = `${quote}${row.currentRegistration}${quote}`;
            if (source.includes(`it(${quoted}`)) return { row, quoted, source };
        }
    }
    throw new Error("no plainly-registered rostered row found to demote");
};

describe("the gate register binds (G-GATE-BUDGET)", () => {
    it("every seat and every rostered row resolves to an executable", () => {
        const report = verifyGateRegister(realIo);
        expect(report.violations, report.violations.join("\n")).toEqual([]);
    });

    it("states both figures — the 60 doc seats and the measured code register", () => {
        const report = verifyGateRegister(realIo);

        // Figure A — §B.5, exactly 60, user-mandated ceiling.
        expect(report.seats.total).toBe(SEAT_BUDGET);

        // Figure B — recomputed from the C19 arrays, never read off `counts`.
        expect(report.counts.activeVitest).toBe(48);
        expect(report.counts.hardReservedVitest).toBe(4);
        expect(report.counts.conditionalReservedVitest).toBe(1);
        expect(report.counts.worstCaseCountedSeats).toBe(53);
        expect(report.counts.remainingSeats).toBe(7);
        expect(report.counts.externalEnforcement).toBe(11);

        // The provenance pin #9/#65 quote.
        expect(report.rosterSha256).toBe(PINNED_ROSTER_SHA256);

        // Figure A is read from its AUTHORITY, not from the register's own copy: §B.5's
        // heading, its family table and its sum line all re-derive the same 60.
        expect(report.authority.budget).toBe(SEAT_BUDGET);
        expect(
            Object.values(report.authority.families as Record<string, number>).reduce(
                (a, b) => a + b,
                0,
            ),
        ).toBe(SEAT_BUDGET);
        expect(report.authority.declaredSum).toBe(SEAT_BUDGET);

        // The bijection, stated honestly and never rounded up: 6 seats carried a verbatim
        // executable before this row, G-GATE-BUDGET is the 7th and it binds HERE. Two more
        // are named by their arms only and are deliberately NOT counted as bound.
        expect(report.seats.bound).toBe(7);
        expect(report.seats.armOnly).toBe(2);
        expect(report.seats.unbound).toBe(51);
        expect(report.seats.bound + report.seats.armOnly + report.seats.unbound).toBe(
            SEAT_BUDGET,
        );
    });

    it("holds the ONE roster drift as a pinned record, not an allowlist", () => {
        const report = verifyGateRegister(realIo);
        // Exactly one active row's title no longer matches HEAD. It is recorded, routed to
        // #65 (which owns §B.5 and the C19 successor cut), and NOT suppressed: the next
        // bite proves a second drift REDs, and the equality check means repairing this one
        // without updating the record REDs too.
        expect(report.titleDrift.map((d) => d.id)).toEqual([
            "reka.tags-input.value-binding",
        ]);
    });

    // ── mutation bites ────────────────────────────────────────────────────────────────

    it("BITE — a mutated roster byte REDs the sha pin", () => {
        const mutated = realIo.read(ROSTER_PATH).replace("schemaVersion", "schemaVersioN");
        const report = verifyGateRegister(ioWith(ROSTER_PATH, mutated));
        expect(report.violations.some((v) => v.includes("sha256"))).toBe(true);
    });

    it("BITE — a stale `counts` object REDs the recomputation", () => {
        const roster = JSON.parse(realIo.read(ROSTER_PATH));
        roster.counts.activeVitest = 47;
        const report = verifyGateRegister(ioWith(ROSTER_PATH, JSON.stringify(roster)));
        // The sha necessarily moves too; the counts violation must be there on its own.
        expect(
            report.violations.some((v) =>
                v.includes("counts.activeVitest: roster states 47"),
            ),
        ).toBe(true);
    });

    it("BITE — severing a rostered `it(` title REDs as an undeclared drift", () => {
        const roster = JSON.parse(realIo.read(ROSTER_PATH));
        const victim = roster.activeVitest.find(
            (r: { id: string }) => r.id !== "reka.tags-input.value-binding",
        );
        const severed = realIo
            .read(victim.sourcePath)
            .replace(victim.currentRegistration, "a title nobody rostered");
        const report = verifyGateRegister({
            read: (target: string) =>
                target === victim.sourcePath ? severed : realIo.read(target),
            exists: realIo.exists,
        });
        expect(report.titleDrift.map((d) => d.id)).toContain(victim.id);
        expect(report.violations.some((v) => v.includes("title drift set moved"))).toBe(
            true,
        );
    });

    it("BITE — a rostered title that survives only in a COMMENT does not count as bound", () => {
        // The difference between "the words appear in the file" and "an executable case
        // asserts this". Demote a real registration to prose and the row must drift.
        const roster = JSON.parse(realIo.read(ROSTER_PATH));
        const victim = roster.activeVitest.find(
            (r: { id: string }) => r.id !== "reka.tags-input.value-binding",
        );
        const source = realIo.read(victim.sourcePath);
        for (const quote of ['"', "'", "`"]) {
            const needle = `${quote}${victim.currentRegistration}${quote}`;
            if (!source.includes(needle)) continue;
            // the title still reads verbatim in the file — but only as narration
            const demoted = source.replace(needle, `\n// see ${needle} — retired\n`);
            expect(demoted).toContain(needle);
            const report = verifyGateRegister({
                read: (target: string) =>
                    target === victim.sourcePath ? demoted : realIo.read(target),
                exists: realIo.exists,
            });
            expect(report.titleDrift.map((d) => d.id)).toContain(victim.id);
            return;
        }
        throw new Error("no quoted registration found to demote");
    });

    it("BITE — an `it.skip(`'d registration is ABSENT, not bound", () => {
        // Probe-proven pre-cure: `it.skip(` scored BOUND because `CALL_FORM` admitted the
        // modifier. A skipped case is never executed, so under PASS/FAIL/ABSENT it is
        // ABSENT — and a register that calls it live reports GREEN for nothing.
        const { row, quoted, source } = plainVictim();
        const skipped = source.replace(`it(${quoted}`, `it.skip(${quoted}`);
        expect(skipped).toContain(quoted); // the title text is untouched
        const report = verifyGateRegister({
            read: (target: string) =>
                target === row.sourcePath ? skipped : realIo.read(target),
            exists: realIo.exists,
        });
        expect(report.titleDrift.map((d: { id: string }) => d.id)).toContain(row.id);
        expect(
            report.violations.some((v: string) => v.includes("title drift set moved")),
        ).toBe(true);
    });

    it("BITE — a registration commented out with `// it(` is ABSENT, not bound", () => {
        // The second probe-proven blindness: the whole call survives as text, so a
        // substring matcher sees a live registration. Comments are stripped before any
        // match now, so the title is not in the live bytes at all.
        const { row, quoted, source } = plainVictim();
        const commented = source.replace(`it(${quoted}`, `// it(${quoted}`);
        expect(commented).toContain(quoted);
        const report = verifyGateRegister({
            read: (target: string) =>
                target === row.sourcePath ? commented : realIo.read(target),
            exists: realIo.exists,
        });
        expect(report.titleDrift.map((d: { id: string }) => d.id)).toContain(row.id);
    });

    it("BITE — gutting every pixel-floor run step from ci.yml REDs, comment or no comment", () => {
        // The challenger's exact probe: delete the four pixel-floor step lines and the
        // word still survives in the prose comment at ci.yml:57. Pre-cure this yielded
        // `badAnchors: [] violations: []` — C-13's own class ("an unwired gate cannot
        // fail") reproduced inside the detector that scopes C-13.
        const ci = realIo.read(".github/workflows/ci.yml");
        const gutted = ci
            .split("\n")
            .filter((line) => !/^\s*(- name:.*pixel floor|run:.*pixel-floor)/.test(line))
            .join("\n");
        expect(gutted).toContain("pixel-floor"); // survives in the comment
        expect(gutted).not.toMatch(/run:.*pixel-floor/);
        const report = verifyGateRegister(ioWith(".github/workflows/ci.yml", gutted));
        expect(
            report.badAnchors.some((a: string) =>
                a.includes(".github/workflows/ci.yml#pixel-floor"),
            ),
        ).toBe(true);
    });

    it("BITE — gutting release.sh's pixel-floor commands REDs the supplemental anchor", () => {
        // C19 anchors `scripts/release.sh` as a BARE PATH, so existsSync alone answered
        // it. #9's supplemental anchors (SEAT-BINDING.json, routed to #65) bind the
        // release edge to a real command line — never an allowlist, they can only add.
        const sh = realIo.read("scripts/release.sh");
        const gutted = sh
            .split("\n")
            .filter((line) => !/^\s*npm .*gate:pixel-floor/.test(line))
            .join("\n");
        expect(gutted).toContain("pixel floor"); // the prose comment survives
        const report = verifyGateRegister(ioWith("scripts/release.sh", gutted));
        expect(
            report.violations.some((v: string) =>
                v.includes("supplemental external.browser.aurora-floor"),
            ),
        ).toBe(true);
    });

    it("BITE — a seat name surviving only in a COMMENT does not count as bound", () => {
        // The seat side of the same law: `:206` was a bare `includes`, so a seat named in
        // a header comment scored bound. Demote the arm host's describe title and both
        // arm-only seats must RED.
        const trap = realIo.read("tests/gates/trap-gates.test.ts");
        const demoted = trap.replace(
            /describe\("trap gates[^\n]*\n/,
            'describe("trap gates — the B4/B5 arms", () => {\n',
        );
        expect(demoted).toContain("G-RUNG-ONLY"); // still there — in comments only
        const report = verifyGateRegister(ioWith("tests/gates/trap-gates.test.ts", demoted));
        expect(
            report.violations.some(
                (v: string) =>
                    v.includes("seat G-RUNG-ONLY") && v.includes("only in prose"),
            ),
        ).toBe(true);
    });

    it("BITE — a §B.5 family movement REDs Figure A against its authority", () => {
        // Before the cure the detector never opened TERMINAL-ROSTER.md: `seats.length ===
        // 60` and the family tally compared SEAT-BINDING.json to itself. Move a seat at
        // the authority and the register must notice.
        const md = realIo.read(ROSTER_MD_PATH);
        const moved = md.replace("| MOTION | 4 |", "| MOTION | 5 |");
        expect(moved).not.toBe(md);
        const report = verifyGateRegister(ioWith(ROSTER_MD_PATH, moved));
        expect(
            report.violations.some(
                (v: string) => v.includes("family MOTION") && v.includes("§B.5 allocates 5"),
            ),
        ).toBe(true);
    });

    it("BITE — a seat claiming a binding its file does not carry REDs", () => {
        const seatFile = JSON.parse(realIo.read(SEAT_BINDING_PATH));
        const unbound = seatFile.seats.find(
            (s: { binding: string }) => s.binding === "none",
        );
        unbound.binding = "seat-detector";
        unbound.paths = ["scripts/gate-register.mjs"];
        const report = verifyGateRegister(
            ioWith(SEAT_BINDING_PATH, JSON.stringify(seatFile)),
        );
        expect(
            report.violations.some((v) => v.includes("only in prose")),
        ).toBe(true);
    });

    it("BITE — a seat register that is not exactly 60 rows REDs the budget", () => {
        const seatFile = JSON.parse(realIo.read(SEAT_BINDING_PATH));
        seatFile.seats.pop();
        const report = verifyGateRegister(
            ioWith(SEAT_BINDING_PATH, JSON.stringify(seatFile)),
        );
        expect(report.violations.some((v) => v.includes("budget is exactly 60"))).toBe(
            true,
        );
    });

    it("BITE — a missing external enrollment anchor REDs", () => {
        const roster = JSON.parse(realIo.read(ROSTER_PATH));
        roster.externalEnforcement[0].enrollment.push(
            "package.json#scripts.a-script-that-does-not-exist",
        );
        const report = verifyGateRegister(ioWith(ROSTER_PATH, JSON.stringify(roster)));
        expect(
            report.violations.some((v) => v.includes("enrollment anchor unresolved")),
        ).toBe(true);
    });
});
