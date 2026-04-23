import { onBeforeUnmount, onMounted, type Ref } from "vue";
import type { AuroraConfig, AuroraNucleus } from "../presets";
import { MAX_NUCLEI } from "../presets";

export interface CursorInteractionOptions {
    /** Fires `setCursor(x,y,strength)` for continuous swirl. */
    setCursor: (x: number, y: number, strength?: number) => void;
    clearCursor: () => void;
    /**
     * Nucleus-ring hit fraction: a nucleus is "hit" when distance ≤ radius × this.
     * 0.35 matches the overlay's default ring thickness.
     */
    hitFraction?: number;
}

/**
 * Wires pointer events on the stage element to (a) continuous cursor swirl,
 * and (b) CRUD on `cfg.nuclei` — spawn (alt-click), remove (shift-click /
 * right-click), drag, delete key.
 */
export function useCursorInteraction(
    stageRef: Ref<HTMLElement | null>,
    cfg: AuroraConfig,
    options: CursorInteractionOptions,
): {
    isDragging: () => number | null;
} {
    const hitFraction = options.hitFraction ?? 0.35;
    let dragIndex: number | null = null;
    let pointerId: number | null = null;

    function norm(e: PointerEvent, el: HTMLElement): { x: number; y: number } {
        const r = el.getBoundingClientRect();
        return {
            x: (e.clientX - r.left) / Math.max(r.width, 1),
            y: (e.clientY - r.top) / Math.max(r.height, 1),
        };
    }

    /**
     * CPU-side nucleus hit-test. Nuclei live in 0..1 CSS-top-origin space.
     * Returns the INDEX of the closest nucleus within `hitFraction · radius`,
     * or null if none. On ties, picks the nearest (smallest squared distance).
     */
    function hitTest(x: number, y: number): number | null {
        let best: number | null = null;
        let bestDist = Infinity;
        for (let i = 0; i < cfg.nuclei.length; i++) {
            const nu = cfg.nuclei[i]!;
            const dx = x - nu.x;
            const dy = y - nu.y;
            const d2 = dx * dx + dy * dy;
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
     * the shader uses, without the domain-warp. Good enough for a sensible
     * starting paletteBias when spawning a new nucleus; user can refine.
     */
    function approximatePaletteId(x: number, y: number): number {
        let accum = 0;
        let w = 0;
        for (const nu of cfg.nuclei) {
            const dx = x - nu.x;
            const dy = y - nu.y;
            const d2 = dx * dx + dy * dy;
            const r = Math.max(nu.radius, 0.01);
            const wi = Math.exp(-cfg.softmaxBeta * d2 / (r * r));
            accum += wi * nu.paletteBias;
            w += wi;
        }
        return w > 1e-4 ? accum / w : 0.5;
    }

    function medianRadius(): number {
        if (cfg.nuclei.length === 0) return 0.5;
        const sorted = cfg.nuclei.map((n) => n.radius).sort((a, b) => a - b);
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
            cfg.nuclei[dragIndex]!.x = Math.max(0, Math.min(1, x));
            cfg.nuclei[dragIndex]!.y = Math.max(0, Math.min(1, y));
        }
        options.setCursor(x, y, 1.0);
    }

    function onPointerLeave() {
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
            if (cfg.nuclei.length >= MAX_NUCLEI) return;
            cfg.nuclei.push(spawn(x, y));
            e.preventDefault();
            return;
        }
        if ((e.shiftKey || e.button === 2) && hit !== null) {
            if (cfg.nuclei.length <= 1) return; // preserve at least one nucleus
            cfg.nuclei.splice(hit, 1);
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
                /* already released */
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
        if (hit !== null && cfg.nuclei.length > 1) {
            cfg.nuclei.splice(hit, 1);
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
