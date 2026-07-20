import { describe, expect, it } from "vitest";
import {
    ENGAGE_ENVELOPES,
    ENGAGE_ATTACK_CLASS,
    ACKNOWLEDGE_WINDOW_MS,
    engageEnvelope,
    engageAttackT90Ms,
} from "@glass/composables/motion/engage/engageEnvelopes";

describe("engageEnvelope", () => {
    it("looks a role up by name and throws loudly on an unknown one", () => {
        for (const row of ENGAGE_ENVELOPES) {
            expect(engageEnvelope(row.role)).toBe(row);
        }
        // @ts-expect-error — an unlisted role is a type error AND a runtime throw:
        // a silent default would be exactly the un-tabled constant the register bans.
        expect(() => engageEnvelope("press-glimmer")).toThrow(/Unknown engage envelope/);
    });

    it("holds every attack inside the ONE shared acknowledge class", () => {
        for (const row of ENGAGE_ENVELOPES) {
            expect(row.attackMs).toBeGreaterThanOrEqual(ENGAGE_ATTACK_CLASS.minMs);
            expect(row.attackMs).toBeLessThanOrEqual(ENGAGE_ATTACK_CLASS.maxMs);
        }
    });

    it("lands every acknowledge inside law-16b's window, derived not quoted", () => {
        for (const row of ENGAGE_ENVELOPES) {
            expect(engageAttackT90Ms(row.role)).toBeLessThanOrEqual(ACKNOWLEDGE_WINDOW_MS);
        }
        // The band edge is the real fence: the slowest attack the class permits must
        // still acknowledge in time, or the class itself is mis-drawn.
        expect(ENGAGE_ATTACK_CLASS.maxMs * Math.LN10).toBeLessThanOrEqual(
            ACKNOWLEDGE_WINDOW_MS,
        );
    });

    it("releases slower than it attacks — a felt decay, never a cut", () => {
        for (const row of ENGAGE_ENVELOPES) {
            expect(row.releaseMs).toBeGreaterThan(row.attackMs);
        }
    });

    it("carries no duplicate role and no duplicate rider", () => {
        const roles = ENGAGE_ENVELOPES.map((row) => row.role);
        expect(new Set(roles).size).toBe(roles.length);
        const riders = ENGAGE_ENVELOPES.map((row) => row.rider);
        expect(new Set(riders).size).toBe(riders.length);
    });
});
