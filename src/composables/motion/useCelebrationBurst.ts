// BE.W-CELEBRATE-BURST — useCelebrationBurst: the one-shot earned glass-petal radial bloom.
//
// THE iOS-27 BETTERS-CLAIM. Apple's earned moments (a completed download badge, a
// personal-best, an unlocked achievement) bloom a *material* burst — glass shards /
// confetti-of-light that read as the SAME frosted material the surface is made of, not a
// flat emoji-confetti sprite sheet. glass-ui has <CompletionSeal> (the gold-draw seal) but
// NO radial *burst* — the earned moment lands with a single seal, never the jubilant
// outward bloom. This mints the burst as a composable so any earned surface (a dock
// fission merge-splash, a now-playing completion, a form-submit success) fires the SAME
// warm-cream petal bloom, compositor-only + PRM-static.
//
// THE LOAD-BEARING REUSE (no second engine, no new spring family). This leaf mirrors
// useLiquidReveal's shape EXACTLY: `springTimingFunction(springPreset('bouncy'))` returns
// the typed {fn, css} Easing pair from the SAME SPRING_PRESETS row the `--spring-bouncy-*`
// CSS tokens generate from (the PLAYFUL register — response 0.5 / ζ 0.55, the canonical
// 12-18% overshoot), driving ONE rAF loop. It owns NO hand-rolled (response, ζ) literal +
// NO second rAF spring integrator. The chip-bloom-in settle cascade re-uses the EXISTING
// `icon-chip-reveal` `--d`-staggered keyframe (icon-chip.css) — never a fork.
//
// THE BURST MECHANISM. On `burst()`: measure the origin rect, spawn `count` (default 12)
// absolutely-positioned petal <div>s into a single short-lived overlay container appended
// to the origin's offsetParent (ONE DOM write, removed on settle). Each petal carries a
// precomputed angle (i/count·2π + seeded jitter) + a per-petal end-radius. Drive ONE rAF
// loop off the bouncy spring curve; each frame writes per-petal
// `transform: translate(cos·r·t, sin·r·t) scale(1 - 0.4t)` + `opacity: 1 - t` +
// `filter: blur(2t px)` (the petals decongest as they drift — glass-coalescing-in-reverse).
// On settle: remove the overlay (no stale DOM), then fire the destination chip-bloom-in
// cascade (the consumer's `[data-reveal]` children, `--d` set per child).
//
// COMPOSITOR-ONLY. The rAF step writes ONLY transform/opacity/filter — NEVER a layout
// property (the proof:no-layout-animation reflow set, mirrored). The `.glass-celebration-
// petal` recipe (jubilance.css) carries no layout-animating transition.
//
// PRM-STATIC (the vestibular floor). Under `prefers-reduced-motion: reduce` `burst()`
// SNAPS: it spawns NO drifting petals and fires ONLY the destination chip-bloom-in cascade
// (the content APPEARS, the radial motion is off — the earned moment still CONFIRMS). The
// useLiquidReveal.respectReducedMotion mirror.

import {
    springTimingFunction,
    type Easing,
} from "@mkbabb/keyframes.js";
import { onScopeDispose, type Ref } from "vue";
import { springPreset, type SpringPresetName } from "./springPresets";

/** The burst spring register — `bouncy` (the emphatic playful default) or `snappy`. */
export type CelebrationBurstPreset = Extract<SpringPresetName, "bouncy" | "snappy">;

export interface UseCelebrationBurstOptions {
    /** The number of glass petals to bloom. Default 12. */
    count?: number;
    /** The spring register (default `bouncy` — the playful overshoot). */
    preset?: CelebrationBurstPreset;
    /** The base outward radius in px (each petal lands at `radius × 0.7..1.0` seeded). Default 64. */
    radius?: number;
    /**
     * An OPT-IN destination element whose `[data-reveal]` children get the chip-bloom-in
     * settle cascade (the burst sets `--d` per child so the EXISTING `icon-chip-reveal`
     * cascade plays). Omitted → no settle cascade (a pure radial burst).
     */
    destination?: Ref<HTMLElement | null>;
    /**
     * An OPT-IN `:tone` axis — when set, the petals tint toward this hue (a complete CSS
     * `<color>` written to `--glass-accent`, the W-GLASS-ACCENT rim-tint seam, for a
     * hue-keyed burst — a download-complete petal blooms `--viz-download`). Omitted → the
     * warm-cream identity (the default).
     */
    tone?: string;
    /** Honor `prefers-reduced-motion: reduce` (snap — terminal cascade only). Default true. */
    respectReducedMotion?: boolean;
    /** A fired-once callback when the burst settles (the overlay removed). */
    onSettled?: () => void;
}

export interface UseCelebrationBurstReturn {
    /**
     * Fire the one-shot earned-moment petal bloom from the origin's center. Idempotent per
     * call — a re-fire mid-bloom cancels the prior overlay + starts fresh. A no-op if the
     * origin element is not mounted.
     */
    burst: () => void;
}

/** A small seeded PRNG (mulberry32) — deterministic per-petal jitter, no Math.random churn. */
function mulberry32(seed: number): () => number {
    let a = seed >>> 0;
    return () => {
        a = (a + 0x6d2b79f5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function prefersReducedMotion(): boolean {
    return (
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

/**
 * Fire the destination chip-bloom-in settle cascade — set `--d` per `[data-reveal]` child
 * so the EXISTING `icon-chip-reveal` `--d`-staggered keyframe (icon-chip.css) plays. Re-use,
 * never re-author. PRM-safe by the keyframe's own `animation: none` carve.
 */
function fireSettleCascade(destination: HTMLElement | null): void {
    if (!destination) return;
    const children = destination.querySelectorAll<HTMLElement>("[data-reveal]");
    children.forEach((child, i) => {
        child.style.setProperty("--d", String(i));
    });
}

/**
 * The library's ONE EARNED-moment celebration primitive — a one-shot radial bloom of N
 * warm-cream glass petals (scale + fade + decongest from the origin on the bouncy spring),
 * then a coupled chip-bloom-in cascade settles the destination. Compositor-only + PRM-static.
 * See the module header for the REUSE + burst-mechanism + the channel writes.
 *
 * @example
 * ```ts
 * const { burst } = useCelebrationBurst(metricCardRef, { preset: "bouncy", destination })
 * onPersonalBest(() => burst())
 * ```
 */
export function useCelebrationBurst(
    origin: Ref<HTMLElement | null>,
    options: UseCelebrationBurstOptions = {},
): UseCelebrationBurstReturn {
    const respectPRM = options.respectReducedMotion !== false;
    const count = Math.max(1, Math.floor(options.count ?? 12));
    const baseRadius = options.radius ?? 64;
    const presetName: CelebrationBurstPreset = options.preset ?? "bouncy";
    const { response, dampingFraction } = springPreset(presetName);
    const easing: Easing = springTimingFunction({ response, dampingFraction });
    // The bloom duration — the spring's analytic settle horizon (response × 4, the kf
    // springTimingFunction default maxDuration). Mirrors the per-spring clock without
    // re-deriving a token (the useLiquidReveal precedent).
    const durationMs = response * 4 * 1000;

    let overlay: HTMLElement | null = null;
    let petals: HTMLElement[] = [];
    let raf = 0;
    let startTs = 0;

    function cancelRaf(): void {
        if (raf && typeof cancelAnimationFrame === "function") cancelAnimationFrame(raf);
        raf = 0;
    }

    function teardown(): void {
        cancelRaf();
        if (overlay && overlay.parentElement) overlay.parentElement.removeChild(overlay);
        overlay = null;
        petals = [];
    }

    function burst(): void {
        const el = origin.value;
        if (!el) return;
        // Re-fire mid-bloom: cancel the prior overlay + start fresh (idempotent per call).
        teardown();

        // PRM: spawn NO drifting petals — fire ONLY the destination settle cascade (the
        // content APPEARS, the radial motion is off — the earned moment still CONFIRMS).
        if (respectPRM && prefersReducedMotion()) {
            fireSettleCascade(options.destination?.value ?? null);
            options.onSettled?.();
            return;
        }

        // SSR / no-rAF — snap to the terminal cascade.
        if (typeof requestAnimationFrame !== "function") {
            fireSettleCascade(options.destination?.value ?? null);
            options.onSettled?.();
            return;
        }

        const rect = el.getBoundingClientRect();
        const parent = (el.offsetParent as HTMLElement | null) ?? el.parentElement ?? el;
        const parentRect = parent.getBoundingClientRect();
        // The origin center in the parent's coordinate space (the overlay is positioned
        // relative to the offsetParent — one DOM write, removed on settle).
        const cx = rect.left - parentRect.left + rect.width / 2;
        const cy = rect.top - parentRect.top + rect.height / 2;

        overlay = document.createElement("div");
        overlay.className = "glass-celebration-overlay";
        overlay.setAttribute("aria-hidden", "true");
        overlay.style.position = "absolute";
        overlay.style.left = `${cx}px`;
        overlay.style.top = `${cy}px`;
        overlay.style.width = "0";
        overlay.style.height = "0";
        overlay.style.pointerEvents = "none";
        overlay.style.zIndex = "var(--celebration-z, 60)";

        // Seed the per-petal jitter deterministically off the origin's rounded geometry so
        // a given origin blooms reproducibly (the determinism witness — no Math.random).
        const rng = mulberry32(
            (Math.round(rect.left) * 73856093) ^ (Math.round(rect.top) * 19349663) ^ count,
        );

        const angleStep = (Math.PI * 2) / count;
        const ends: { dx: number; dy: number }[] = [];
        for (let i = 0; i < count; i++) {
            const petal = document.createElement("div");
            petal.className = "glass-celebration-petal";
            if (options.tone) petal.style.setProperty("--glass-accent", options.tone);
            // The petal seats AT the origin center; the transform drives it outward.
            petal.style.position = "absolute";
            petal.style.left = "0";
            petal.style.top = "0";
            overlay.appendChild(petal);
            petals.push(petal);

            const jitter = (rng() - 0.5) * angleStep * 0.6;
            const angle = i * angleStep + jitter;
            const r = baseRadius * (0.7 + rng() * 0.3);
            ends.push({ dx: Math.cos(angle) * r, dy: Math.sin(angle) * r });
        }

        parent.appendChild(overlay);

        startTs = 0;
        const step = (ts: number): void => {
            if (!overlay) return;
            if (startTs === 0) startTs = ts;
            const raw = Math.min(1, (ts - startTs) / durationMs);
            const eased = easing.fn(raw); // the bouncy spring curve (overshoot interior)
            for (let i = 0; i < petals.length; i++) {
                const p = petals[i];
                const { dx, dy } = ends[i];
                const tx = dx * eased;
                const ty = dy * eased;
                const scl = Math.max(0, 1 - 0.4 * eased);
                const blur = 2 * eased;
                // COMPOSITOR-ONLY — transform / opacity / filter, NEVER a layout property.
                p.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) scale(${scl.toFixed(3)})`;
                p.style.opacity = String(Math.max(0, 1 - eased));
                p.style.filter = `blur(${blur.toFixed(2)}px)`;
            }
            if (raw < 1) {
                raf = requestAnimationFrame(step);
            } else {
                // Settled — remove the overlay (no stale DOM), fire the settle cascade.
                teardown();
                fireSettleCascade(options.destination?.value ?? null);
                options.onSettled?.();
            }
        };
        raf = requestAnimationFrame(step);
    }

    onScopeDispose(teardown);

    return { burst };
}
