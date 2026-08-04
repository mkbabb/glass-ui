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
// Four severances, one per check the detector claims to make.

import { describe, expect, it } from "vitest";
import {
    PINNED_ROSTER_SHA256,
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
            report.violations.some((v) =>
                v.includes("does not carry the name"),
            ),
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
