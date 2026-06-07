import { onBeforeUnmount, onMounted, type Ref } from "vue";
import { asGetter, type ConfigSource } from "./configSource";
import type { AuroraConfig, AuroraNucleus } from "../constants/presets";
import { MAX_NUCLEI } from "../constants/presets";

export interface CursorInteractionOptions {
    /** Fires `setCursor(x,y,strength)` for continuous swirl. */
    setCursor: (x: number, y: number, strength?: number) => void;
    clearCursor: () => void;
    /**
     * Nucleus-ring hit fraction: a nucleus is "hit" when distance ≤ radius × this.
     * 0.35 matches the overlay's default ring thickness.
     */
    hitFraction?: number;
    /**
     * AW.W8.1 — feed the per-move pointer delta into the velocity-reactive flow (a
     * fast flick → a transient swirl-burst). The runtime's `injectCursorVelocity`
     * EARLY-OUTS on reduced-motion (the cursor write-path PRM check), so a parked
     * loop with a live pointermove does NOT move the field under reduce. Optional —
     * absent keeps the position-only steady swirl.
     */
    injectVelocity?: (dx: number, dy: number) => void;
}

/**
 * Wires pointer events on the stage element to (a) continuous cursor swirl,
 * and (b) CRUD on `getCfg().nuclei` — spawn (alt-click), remove (shift-click /
 * right-click), drag, delete key.
 *
 * Accepts the config as a plain object, ref, or getter; every pointer event
 * re-resolves the current config, so CRUD always targets the active preset
 * even after a preset switch swaps the underlying config reference.
 */
export function useCursorInteraction(
    stageRef: Ref<HTMLElement | null>,
    configSource: ConfigSource<AuroraConfig>,
    options: CursorInteractionOptions,
): {
    isDragging: () => number | null;
} {
    const getCfg = asGetter(configSource);
    const hitFraction = options.hitFraction ?? 0.35;
    let dragIndex: number | null = null;
    let pointerId: number | null = null;
    // AW.W8.1 — the previous pointer position (normalized) for the per-move delta the
    // velocity-reactive flow consumes. null until the first move.
    let lastX: number | null = null;
    let lastY: number | null = null;

    function norm(e: PointerEvent, el: HTMLElement): { x: number; y: number } {
        const r = el.getBoundingClientRect();
        return {
            x: (e.clientX - r.left) / Math.max(r.width, 1),
            y: (e.clientY - r.top) / Math.max(r.height, 1),
        };
    }

    /**
     * Anisotropic squared distance in a nucleus's local frame — mirrors the
     * shader's `nucleiField` so CPU-side hit-testing and palette estimation
     * agree with the on-screen field. Defaults `elongation = 1` / `angle = 0`
     * reduce to the isotropic dot(diff, diff).
     */
    function anisotropicD2(nu: AuroraNucleus, x: number, y: number): number {
        const dx = x - nu.x;
        const dy = y - nu.y;
        const angleRad = ((nu.angle ?? 0) * Math.PI) / 180;
        const ca = Math.cos(angleRad);
        const sa = Math.sin(angleRad);
        const localX = ca * dx + sa * dy;
        const localY = -sa * dx + ca * dy;
        const elong = Math.max(nu.elongation ?? 1, 0.01);
        const along = localX / elong;
        const across = localY;
        return along * along + across * across;
    }

    /**
     * CPU-side nucleus hit-test. Nuclei live in 0..1 CSS-top-origin space.
     * Returns the INDEX of the closest nucleus within `hitFraction · radius`,
     * or null if none. On ties, picks the nearest (smallest anisotropic d²).
     */
    function hitTest(x: number, y: number): number | null {
        let best: number | null = null;
        let bestDist = Infinity;
        for (let i = 0; i < getCfg().nuclei.length; i++) {
            const nu = getCfg().nuclei[i]!;
            const d2 = anisotropicD2(nu, x, y);
            const r = nu.radius * hitFraction;
            if (d2 < r * r && d2 < bestDist) {
                bestDist = d2;
                best = i;
            }
        }
        return best;
    }

    /**
     * Approximate the baked palette-id at (x,y) by running the same softmax
     * the shader uses (anisotropic distance, no domain-warp). Good enough for
     * a sensible starting paletteBias when spawning a new nucleus; the user
     * can refine via the Nuclei layer afterwards.
     */
    function approximatePaletteId(x: number, y: number): number {
        let accum = 0;
        let w = 0;
        for (const nu of getCfg().nuclei) {
            const d2 = anisotropicD2(nu, x, y);
            const r = Math.max(nu.radius, 0.01);
            const wi = Math.exp((-getCfg().softmaxBeta * d2) / (r * r));
            accum += wi * nu.paletteBias;
            w += wi;
        }
        return w > 1e-4 ? accum / w : 0.5;
    }

    function medianRadius(): number {
        if (getCfg().nuclei.length === 0) return 0.5;
        const sorted = getCfg().nuclei.map((n) => n.radius).sort((a, b) => a - b);
        return sorted[Math.floor(sorted.length / 2)]!;
    }

    function spawn(x: number, y: number): AuroraNucleus {
        return {
            x,
            y,
            radius: medianRadius(),
            paletteBias: approximatePaletteId(x, y),
            valueBias: 0,
            driftRadius: 0.012,
            driftPhase: Math.random() * Math.PI * 2,
        };
    }

    function onPointerMove(e: PointerEvent) {
        const el = stageRef.value;
        if (!el) return;
        const { x, y } = norm(e, el);
        if (dragIndex !== null) {
            getCfg().nuclei[dragIndex]!.x = Math.max(0, Math.min(1, x));
            getCfg().nuclei[dragIndex]!.y = Math.max(0, Math.min(1, y));
        }
        options.setCursor(x, y, 1.0);
        // AW.W8.1 — feed the per-move delta into the velocity-reactive flow. The
        // runtime's injectCursorVelocity EARLY-OUTS on reduced-motion (the cursor
        // write-path PRM check), so a parked loop with a live pointermove does not
        // move the field under reduce.
        if (options.injectVelocity && lastX !== null && lastY !== null) {
            options.injectVelocity(x - lastX, y - lastY);
        }
        lastX = x;
        lastY = y;
    }

    function onPointerLeave() {
        lastX = null;
        lastY = null;
        if (dragIndex !== null) return; // hold swirl active while dragging
        options.clearCursor();
    }

    function onPointerDown(e: PointerEvent) {
        const el = stageRef.value;
        if (!el) return;
        const { x, y } = norm(e, el);
        const hit = hitTest(x, y);

        // Modifier + click paths first — they short-circuit drag.
        if (e.altKey && hit === null) {
            if (getCfg().nuclei.length >= MAX_NUCLEI) return;
            getCfg().nuclei.push(spawn(x, y));
            e.preventDefault();
            return;
        }
        if ((e.shiftKey || e.button === 2) && hit !== null) {
            if (getCfg().nuclei.length <= 1) return; // preserve at least one nucleus
            getCfg().nuclei.splice(hit, 1);
            e.preventDefault();
            return;
        }

        if (hit !== null && e.button === 0) {
            dragIndex = hit;
            pointerId = e.pointerId;
            el.setPointerCapture(e.pointerId);
            e.preventDefault();
        }
    }

    function onPointerUp(e: PointerEvent) {
        const el = stageRef.value;
        if (!el) return;
        if (pointerId !== null && e.pointerId === pointerId) {
            try {
                el.releasePointerCapture(e.pointerId);
            } catch {
                // fail-explicit: befitting — releasePointerCapture throws only
                // when the capture is already gone (the pointer left the element
                // / was cancelled). The release is idempotent cleanup; there is
                // no real failure to surface.
            }
            pointerId = null;
            dragIndex = null;
        }
    }

    function onContextMenu(e: MouseEvent) {
        const el = stageRef.value;
        if (!el) return;
        const fake = { clientX: e.clientX, clientY: e.clientY };
        const r = el.getBoundingClientRect();
        const x = (fake.clientX - r.left) / Math.max(r.width, 1);
        const y = (fake.clientY - r.top) / Math.max(r.height, 1);
        const hit = hitTest(x, y);
        if (hit !== null && getCfg().nuclei.length > 1) {
            getCfg().nuclei.splice(hit, 1);
            e.preventDefault();
        }
    }

    onMounted(() => {
        const el = stageRef.value;
        if (!el) return;
        el.addEventListener("pointermove", onPointerMove);
        el.addEventListener("pointerleave", onPointerLeave);
        el.addEventListener("pointerdown", onPointerDown);
        el.addEventListener("pointerup", onPointerUp);
        el.addEventListener("pointercancel", onPointerUp);
        el.addEventListener("contextmenu", onContextMenu);
    });

    onBeforeUnmount(() => {
        const el = stageRef.value;
        if (!el) return;
        el.removeEventListener("pointermove", onPointerMove);
        el.removeEventListener("pointerleave", onPointerLeave);
        el.removeEventListener("pointerdown", onPointerDown);
        el.removeEventListener("pointerup", onPointerUp);
        el.removeEventListener("pointercancel", onPointerUp);
        el.removeEventListener("contextmenu", onContextMenu);
    });

    return {
        isDragging: () => dragIndex,
    };
}
