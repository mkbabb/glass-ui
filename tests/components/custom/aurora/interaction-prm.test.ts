// The interaction PRM-suppression suite (re-pointed off the retired
// cursorModel onto the shared `usePointerVelocityField`, the aurora cursor's successor).
//
// Every cursor-field axis routes
// through the MASTER TEMPO SCALAR — the single suppression seam PRM + the DockBackgroundToggle
// pause converge on. In the field era the tempo gates the field TICK: `pointerField.tick(0)`
// (the deterministic FREEZE) zeroes the velocity + burst; a live tick retains them. This suite
// asserts the tempo-scalar contract on the FIELD (the CPU cursor now IS the field):
//
//   - tick(0) (PRM/tempo=0) FREEZES the velocity + burst to stillness.
//   - a live tick with movement RETAINS/GROWS them (the axis animates when not suppressed).
//   - the flick burst is bounded [0,1].
//   - the field DERIVES velocity (no per-move re-implementation — the double-smooth is dead).
//   - `auroraCursorMapping` projects engagement→strength (the cursor-local luminance lean that
//     reads on the smooth medium — the T-38 fix), attractor→cursor position.

import { describe, expect, it } from "vitest";
import { effectScope } from "vue";
import { usePointerVelocityField } from "@glass/composables/motion/pointer/usePointerVelocityField";
import {
    auroraCursorMapping,
    snapshotField,
} from "@glass/composables/motion/pointer/pointerFieldMappings";
import {
    isAuroraPointerEnabled,
    resolveAuroraRenderTime,
} from "@glass/components/aurora/composables/runtime";
import { DEFAULT_AURORA_CONFIG } from "@glass/components/aurora/constants/presets";

// The field calls `onScopeDispose`; run it inside an effect scope so the disposer registers.
// `respectReducedMotion:false` so the deterministic tick(0) drives the freeze (not the env's
// matchMedia, which happy-dom may not provide).
function withField<T>(fn: (field: ReturnType<typeof usePointerVelocityField>) => T): T {
    const scope = effectScope();
    const out = scope.run(() =>
        fn(usePointerVelocityField({ respectReducedMotion: false })),
    ) as T;
    scope.stop();
    return out;
}

// Drive a flick: move from centre toward a corner over a few ticks so the smoothed position
// moves and the derived velocity + burst grow.
function flick(field: ReturnType<typeof usePointerVelocityField>): void {
    field.setActive(true);
    field.setPointer(0.5, 0.5);
    field.tick(16);
    field.setPointer(0.9, 0.9);
    field.tick(16);
    field.tick(16);
}

describe("the master tempo scalar (tick(0)) freezes the interactive field under PRM", () => {
    it("uses one medium-aware predicate for pointer writes and uniforms", () => {
        expect(
            isAuroraPointerEnabled({
                ...DEFAULT_AURORA_CONFIG,
                medium: "smooth",
                interactivity: { light: true },
            }),
        ).toBe(false);
        expect(
            isAuroraPointerEnabled({
                ...DEFAULT_AURORA_CONFIG,
                medium: "smooth",
                interactivity: { swirl: true },
            }),
        ).toBe(true);
        expect(
            isAuroraPointerEnabled({
                ...DEFAULT_AURORA_CONFIG,
                medium: "oil",
                interactivity: { light: true },
            }),
        ).toBe(true);
    });

    it("maps opt-in scroll progress to shader time while PRM stays frozen", () => {
        const config = {
            ...DEFAULT_AURORA_CONFIG,
            breathPeriod: 40,
            interactivity: { scroll: true },
        };
        expect(resolveAuroraRenderTime(config, 2, 0.5, false)).toBe(22);
        expect(resolveAuroraRenderTime(config, 2, 2, false)).toBe(42);
        expect(resolveAuroraRenderTime(config, 2, 0.5, true)).toBe(3.7);
        expect(
            resolveAuroraRenderTime(
                { ...config, interactivity: undefined },
                2,
                0.5,
                false,
            ),
        ).toBe(2);
    });

    it("tick(0) FREEZES the velocity + burst to stillness", () => {
        withField((field) => {
            flick(field);
            expect(field.burst.value).toBeGreaterThan(0);
            expect(Math.hypot(field.velocity.value.x, field.velocity.value.y)).toBeGreaterThan(0);
            // tick(0) is the deterministic FREEZE (the tempo=0 / PRM seam).
            field.tick(0);
            expect(field.burst.value).toBe(0);
            expect(Math.abs(field.velocity.value.x)).toBe(0);
            expect(Math.abs(field.velocity.value.y)).toBe(0);
        });
    });

    it("a live tick RETAINS/GROWS the velocity + burst (the axis animates when not suppressed)", () => {
        withField((field) => {
            flick(field);
            const burst0 = field.burst.value;
            // Another live tick keeps the field alive (a decaying burst is still > 0).
            field.tick(16);
            expect(field.burst.value).toBeGreaterThan(0);
            expect(burst0).toBeGreaterThan(0);
        });
    });

    it("the burst is bounded [0,1] even under a large teleport move", () => {
        withField((field) => {
            field.setActive(true);
            field.setPointer(0, 0);
            field.tick(16);
            field.setPointer(1, 1); // a full-span jump
            field.tick(16);
            field.tick(16);
            expect(field.burst.value).toBeLessThanOrEqual(1);
            expect(field.burst.value).toBeGreaterThanOrEqual(0);
        });
    });

    it("auroraCursorMapping drives strength off engagement (the smooth-medium luminance lean)", () => {
        withField((field) => {
            // Inactive → engagement decays → strength 0.
            field.setActive(false);
            field.tick(16);
            const rest = auroraCursorMapping(snapshotField(field), { strength: 0.8 });
            expect(rest.strength).toBeLessThan(0.05);
            // Engaged → engagement ramps → strength rises toward the ceiling.
            field.setActive(true);
            field.setPointer(0.7, 0.3);
            for (let i = 0; i < 30; i++) field.tick(16);
            const active = auroraCursorMapping(snapshotField(field), { strength: 0.8 });
            expect(active.strength).toBeGreaterThan(rest.strength);
            expect(active.strength).toBeLessThanOrEqual(0.8);
        });
    });

    it("folds the named burst amplitude into the shared bounded strength", () => {
        withField((field) => {
            flick(field);
            const snap = snapshotField(field);
            const steady = auroraCursorMapping(snap, { strength: 0.8, amplitude: 0 });
            const responsive = auroraCursorMapping(snap, { strength: 0.8, amplitude: 0.75 });
            expect(responsive.strength).toBeGreaterThan(steady.strength);
            expect(responsive.strength).toBeLessThanOrEqual(1);
        });
    });

    it("the attractor eases toward the pointer (the ONE smoothing stage — no double-smooth)", () => {
        withField((field) => {
            field.setActive(true);
            field.setPointer(0.9, 0.1);
            const start = { ...field.attractor.value };
            for (let i = 0; i < 40; i++) field.tick(16);
            const end = field.attractor.value;
            // The attractor moved from centre toward the target (a real mass-spring follow).
            expect(Math.abs(end.x - 0.9)).toBeLessThan(Math.abs(start.x - 0.9));
            expect(Math.abs(end.y - 0.1)).toBeLessThan(Math.abs(start.y - 0.1));
        });
    });
});
