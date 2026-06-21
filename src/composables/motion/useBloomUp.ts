// BE.W-BLOOM-UP — useBloomUp: the shared-element FLIP where source≠dest, with the
// 4th COLOR channel on the destination field.
//
// THE MOVE (the iOS-27 betters-claim, f_009→f_010, exact). A SMALL source — an album
// card, the search pill, the now-playing pill — BLOOMS UP into a LARGE destination —
// the fullscreen now-playing surface, the Places sheet, the player. Tapping the source
// blooms it from blurred-small to sharp-full (the THREE compositor channels — scale,
// opacity, blur-decongest) AND the whole surrounding FIELD warms to the source's
// dominant album hue (the 4TH color channel). The bloom CARRIES the color into the
// surround: "the whole world takes on the album's color." `useLiquidReveal` ships the
// 3-channel geometry bloom but touches NO color — the f_009→f_010 field-warming is
// the load-bearing iOS move it is paint-blind to. This leaf adds the 4th channel,
// routed on the DESTINATION FIELD (not the blooming surface) so the compositor-only
// floor on the surface is preserved.
//
// THE LOAD-BEARING REUSE (no second engine — the useLiquidReveal sibling shape). This
// leaf composes the EXACT SAME kf substrate `useLiquidReveal` activates: `ElementMorph`
// (the compositor `translate()+scale()` rect-delta from `@mkbabb/keyframes.js`) +
// `springTimingFunction` (the typed `{fn,css}` spring curve sampled from the SAME
// `SPRING_PRESETS` row the `--spring-*` CSS tokens generate from — never a hand
// `(response, ζ)`). It owns NO hand-rolled rAF spring integrator and NO second physics
// core. Where `useLiquidReveal` blooms a surface FROM a TRIGGER onto its OWN settled
// rect (source IS the surface's own past), this leaf blooms a DESTINATION from a
// SEPARATE SOURCE element's rect — the shared-element FLIP for the source≠dest case.
//
// THE BLOOM MECHANISM (the FLIP inversion — identical to useLiquidReveal's). The
// destination is rendered at its SETTLED rect (its real, painted full size — it lays
// out ONCE at its full footprint; this is THE fix for the WF-1 transient crush: NEVER
// a box-scale that crushes content, only a compositor transform over the settled box).
// We construct `ElementMorph(destRect, sourceRect)` — the delta dest→source — and drive
// a spring from 1 (looks like the source: small, offset to the source's rect) DOWN to 0
// (identity: the destination's settled rect). At spring=1 the destination appears AT the
// source's origin scaled to its size; as the spring settles to 0 it blooms FORWARD onto
// its own full rect. The `transform-origin` is anchored at the source so the scale grows
// FROM the source point (the shared-element feel), NOT a center-scale.
//
// THREE COMPOSITOR CHANNELS on the spring clock (byte-shape with useLiquidReveal): (a)
// `transform: translate()+scale()` (the bloom — the SPATIAL channel, the spring
// overshoot); (b) `opacity 0→1` (the EFFECTS channel, coupled so scale+fade read as ONE
// continuous layer; the source cross-fades out via the consumer's own opacity, the dest
// fades in here); (c) `filter: blur(--bloom-up-blur)→blur(0)` (the iOS light-bending
// decongest — a `filter` radius interp on the dest's OWN pixels, COMPOSITOR-safe, NOT
// `backdrop-filter` so the resting glass-tier plate blur is never clobbered).
//
// THE 4TH COLOR CHANNEL on the DESTINATION FIELD (the load-bearing iOS move, de-risked
// per the manifest). The field re-tint does NOT animate a paint property on the BLOOMING
// surface (that would break the compositor-only floor). Instead this leaf writes the
// registered `@property --glass-ambient-hue` (the source's dominant hue — a `<color>`)
// + ramps the registered `@property --glass-ambient-strength` (`<percentage>`) from 0
// to its bounded target over the SAME `easing.fn` spring curve the geometry rides, on
// the FIELD CONTAINER (destRef's ancestor field — the DockStage / now-playing field).
// The `@property` registration (tokens/glass.css §BE.W-AMBIENT-TINT) makes the field
// re-tint INTERPOLATE — the EXISTING `--glass-tint-source` self-engage re-point biases
// toward `--glass-ambient-hue` at `--glass-ambient-strength`, so the field WARMS to the
// source's hue AS the surface blooms (a bare unregistered var() snaps — the
// `--border-progress-fill`/`--dock-morph-t` registered-property precedent). The strength
// target is BOUNDED `≤ 8%` (the AMBIENT-TINT ceiling — a sub-perceptual HUE event, never
// a flood; the warm-cream identity holds — the field warms toward, never becomes, the
// album). The source hue is read from `fieldHue` (the consumer passes the album hue) OR
// from `--glass-ambient-hue` off the source element (the AMBIENT-TINT convergence).
//
// COMPOSITOR-ONLY ON THE BLOOM SURFACE (ABSOLUTE). The leaf writes ONLY
// `transform`/`opacity`/`filter` on `destRef` — NEVER `width`/`height`/`top`/`left`/
// `padding`/`font-size` (the A'-3 lesson, enforced library-wide by W-MOTION-CANON's
// `proof:no-layout-animation`). The 4th channel is on a DIFFERENT element (the field),
// via a registered `@property` custom (a paint-prop interp, not a layout animation).
//
// SAFARI-SAFE. `ElementMorph` is a compositor transform; the field re-tint is a
// `color-mix`/`@property` interp (cross-engine; `@property` is Baseline). The decongest
// rides a regular `filter` (the surface's own pixels), never `backdrop-filter:url()`.
//
// PRM-SAFE BY CONSTRUCTION. Under `prefers-reduced-motion: reduce` the leaf SNAPS the
// surface to its settled rect (identity transform) with opacity 1 in ONE synchronous
// step — zero transform/blur frames, the fade survives — AND lands the field hue
// INSTANTLY (the strength jumps to its target). A color change is not a vestibular
// trigger; scale/translate/blur are. Mirrors `useLiquidReveal.respectReducedMotion`.
//
// NO MOUNT-FLASH (the prime seam — the 1-frame full-size flash fix). A `v-if`-mounted
// destination paints ONCE at its full settled rect BEFORE `bloom()` seats it — a sub-
// frame flash of the full-size sheet before it collapses to the source pill. The leaf
// SEATS the dest at its collapsed/hidden initial state (opacity 0 + the source-FLIP
// transform) THE MOMENT `destRef` becomes available, before the browser paints. The
// auto-prime is a `watch(dest, …, { flush: "pre" })` (pre-render: it runs in the SAME
// tick the element mounts, before paint) so a dest that hasn't bloomed yet shows
// NOTHING, never a full-size flash; `prime()` is the explicit imperative twin. Priming
// is opacity-0 + a transform (compositor-only — never a layout property), released the
// instant `bloom()`/`reset()` runs. PRM-safe: under reduce the prime seats opacity 0
// only (no transform/blur frames at rest either), and the bloom snap clears it.

import {
    ElementMorph,
    springTimingFunction,
    type Easing,
} from "@mkbabb/keyframes.js";
import { onScopeDispose, readonly, ref, watch, type Ref } from "vue";
import { springPreset, type SpringPresetName } from "./springPresets";

/** The bloom spring register — `snappy` (the quick shared-element default) or `bouncy`
 *  (the emphatic large-surface bloom). A subset of the named `SPRING_PRESETS` rows,
 *  matching `useLiquidReveal`/`useDockCtaReceive` so the bloom family reads as ONE. */
export type BloomUpPreset = Extract<SpringPresetName, "snappy" | "bouncy">;

export interface UseBloomUpOptions {
    /** The spring register (default `snappy`). */
    preset?: BloomUpPreset;
    /** The starting filter-blur radius in px on the destination (the decongest start). Default 4. */
    blur?: number;
    /**
     * The dominant source hue the FIELD warms toward — a complete `<color>` (an
     * `oklch()`/`#hex`/named). When omitted, the leaf reads `--glass-ambient-hue` off
     * the SOURCE element's computed style (the BE.W-AMBIENT-TINT convergence — the
     * album card carries its own dominant hue). A `transparent`/empty read is the
     * neutral no-op (the field tints nothing — a gray source warms nothing).
     */
    fieldHue?: string;
    /**
     * The FIELD CONTAINER the 4th color channel writes onto — the destination's
     * ancestor field (the DockStage / now-playing field). When omitted, the leaf walks
     * up from `destRef` to the nearest ancestor carrying `[data-glass-field]` (the
     * field-marker contract), falling back to `destRef.parentElement`. The hue + the
     * ramped strength are written HERE, never on the blooming surface (the
     * compositor-only floor de-risk).
     */
    field?: Ref<HTMLElement | null>;
    /**
     * The bounded ambient-strength target the field ramps to (a percentage, `0..8`).
     * Default 8 (the AMBIENT-TINT ceiling — the loudest sub-perceptual warm). Clamped
     * to `[0, 8]` so a consumer can never flood the field past the warm-cream identity.
     */
    fieldStrength?: number;
    /** Honor `prefers-reduced-motion: reduce` (snap surface to settled, land hue instantly). Default true. */
    respectReducedMotion?: boolean;
    /**
     * Auto-prime the destination the moment it mounts — seat it at the collapsed/hidden
     * initial state (opacity 0 + the source-FLIP transform) BEFORE the browser paints,
     * so a freshly-`v-if`-mounted dest never flashes its full-size frame before `bloom()`
     * fires. A `watch(dest, …, { flush: "pre" })` runs in the SAME tick the element
     * mounts. Default `true` — the no-flash floor; pass `false` to opt a consumer that
     * owns its own initial-state seating out. `prime()` is the explicit imperative twin.
     */
    autoPrime?: boolean;
    /**
     * Fired ONCE when the bloom has settled (the hand-off — the consumer marks the
     * bloom complete: hides the source, owns the destination). Fires on the animation
     * settle AND on the PRM/no-rAF snap (the bloom always completes).
     */
    onBloomed?: () => void;
}

export interface UseBloomUpReturn {
    /**
     * Bloom the destination up from the source's rect. Idempotent per call — measures
     * the source + destination rects fresh, drives the FLIP inversion spring 1→0 on the
     * surface AND ramps the field hue 0→target. A no-op if the destination element is
     * not yet mounted (no `onBloomed`).
     */
    bloom: () => void;
    /**
     * Clear the bloom transform (restore the destination to its settled identity,
     * opacity 1) AND release the field hue (strength → 0). The abort/reset seam —
     * cancels any in-flight bloom; does NOT fire `onBloomed`.
     */
    reset: () => void;
    /**
     * Seat the destination at its collapsed/hidden initial state (opacity 0 + the
     * source-FLIP transform) WITHOUT animating — so a freshly-mounted dest shows
     * NOTHING until `bloom()` fires (the no-mount-flash seam). Idempotent; a no-op if
     * the dest is not yet mounted. The auto-prime (`autoPrime`, default on) calls this
     * for the consumer; `prime()` is the explicit imperative twin.
     */
    prime: () => void;
    /** The reactive bloom state — `true` while a bloom is in flight, `false` at rest. */
    blooming: Readonly<Ref<boolean>>;
}

const AMBIENT_STRENGTH_CEILING = 8; // the BE.W-AMBIENT-TINT bound (sub-perceptual; never a flood)

function prefersReducedMotion(): boolean {
    return (
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

/** Clamp the ambient-strength target into the bounded warm-cream-identity band. */
function clampStrength(n: number | undefined): number {
    const v = n ?? AMBIENT_STRENGTH_CEILING;
    if (!Number.isFinite(v)) return AMBIENT_STRENGTH_CEILING;
    return Math.min(AMBIENT_STRENGTH_CEILING, Math.max(0, v));
}

/**
 * Resolve the FIELD container the 4th color channel writes onto. Explicit `field` ref
 * wins; else walk up from `dest` to the nearest `[data-glass-field]` ancestor (the
 * field-marker contract); else `dest.parentElement`. The field is a DIFFERENT element
 * from the blooming surface — the compositor-only de-risk.
 */
function resolveField(
    dest: HTMLElement,
    explicit: Ref<HTMLElement | null> | undefined,
): HTMLElement | null {
    if (explicit?.value) return explicit.value;
    let node: HTMLElement | null = dest.parentElement;
    while (node) {
        if (node.hasAttribute("data-glass-field")) return node;
        node = node.parentElement;
    }
    return dest.parentElement;
}

/**
 * Read the source's dominant hue — the explicit `fieldHue` OR the `--glass-ambient-hue`
 * computed off the source element (the AMBIENT-TINT source). Returns `null` for a
 * neutral/absent hue (the field tints nothing).
 */
function resolveHue(
    source: HTMLElement | null,
    explicit: string | undefined,
): string | null {
    if (explicit && explicit.trim() && explicit.trim() !== "transparent") {
        return explicit.trim();
    }
    if (!source || typeof getComputedStyle !== "function") return null;
    const read = getComputedStyle(source).getPropertyValue("--glass-ambient-hue").trim();
    if (!read || read === "transparent") return null;
    return read;
}

/**
 * The iOS-27 shared-element bloom with the 4th color channel. Composes the kf
 * `ElementMorph` + `springTimingFunction` into the three-channel geometry bloom on the
 * DESTINATION surface (scale+fade+blur-decongest from the SOURCE's origin) PLUS a 4th
 * color channel on the destination FIELD (the field warms to the source's hue on the
 * SAME spring curve). Compositor-only on the surface + Safari-safe + PRM-snap. See the
 * module header for the REUSE + the FLIP inversion + the channel split.
 *
 * @example
 * ```ts
 * const { bloom, reset, blooming } = useBloomUp(albumCardRef, fullscreenRef, {
 *   preset: "bouncy",
 *   fieldHue: albumDominantHue, // or omit to read --glass-ambient-hue off the card
 *   field: nowPlayingFieldRef,
 *   onBloomed: () => (fullscreenOpen.value = true),
 * })
 * function onTapAlbum() { bloom() }
 * ```
 */
export function useBloomUp(
    source: Ref<HTMLElement | null>,
    dest: Ref<HTMLElement | null>,
    options: UseBloomUpOptions = {},
): UseBloomUpReturn {
    const respectPRM = options.respectReducedMotion !== false;
    const blurStart = options.blur ?? 4;
    const strengthTarget = clampStrength(options.fieldStrength);
    const autoPrime = options.autoPrime !== false;

    // The spring curve — the typed {fn, css} pair from the SAME SPRING_PRESETS row the
    // --spring-<name> CSS tokens generate from (never a hand (response, ζ)). The same
    // sampling useLiquidReveal/useDockCtaReceive do, so the bloom family reads as ONE
    // spring family. `.fn` is the callable easing the ElementMorph plays on AND the
    // curve the field-strength ramp rides — ONE spring drives all four channels.
    const presetName: BloomUpPreset = options.preset ?? "snappy";
    const { response, dampingFraction } = springPreset(presetName);
    const easing: Easing = springTimingFunction({ response, dampingFraction });
    // The bloom duration in ms — the spring's analytic settle horizon (response * 4,
    // the kf `springTimingFunction` default maxDuration). Mirrors the per-spring clock
    // without re-deriving a token (the W-GLASS-CAL fence — no second clock).
    const durationMs = response * 4 * 1000;

    const blooming = ref(false);

    let morph: ElementMorph | null = null;
    let raf = 0;
    let startTs = 0;
    // Whether the dest is currently SEATED at its primed (hidden) initial state. Set by
    // prime(), cleared the instant bloom()/reset() runs (those own the surface from then).
    let primed = false;
    // The field the 4th channel is biasing (held across the rAF loop so the cleanup +
    // reset can release the hue from the SAME element it was written to).
    let activeField: HTMLElement | null = null;

    function clearSurface(el: HTMLElement): void {
        el.style.transform = "";
        el.style.transformOrigin = "";
        el.style.opacity = "";
        el.style.filter = "";
        primed = false;
    }

    // Seat the dest at its collapsed/hidden INITIAL state — opacity 0 + the source-FLIP
    // transform — WITHOUT animating, so a freshly-mounted (v-if) dest shows NOTHING until
    // bloom() fires (the no-mount-flash floor). The load-bearing leg is opacity 0; the
    // transform is the best-effort FLIP toward the source so a prime read MID-frame
    // already shows the collapsed geometry (never the full-size frame). bloom() always
    // re-measures fresh, so an imprecise prime rect is harmless. Compositor-only.
    function prime(): void {
        const el = dest.value;
        if (!el) return;
        // Never clobber an in-flight bloom (raf running) — that already owns the surface.
        if (raf) return;
        const settled = el.getBoundingClientRect();
        const sourceEl = source.value;
        const sourceRect = sourceEl
            ? sourceEl.getBoundingClientRect()
            : {
                  x: settled.x + settled.width * 0.04,
                  y: settled.y + settled.height * 0.04,
                  width: settled.width * 0.92,
                  height: settled.height * 0.92,
              };
        el.style.opacity = "0";
        // Seat the FLIP transform at progress=1 (looks like the source) so the geometry is
        // already collapsed — but ONLY when the rects measure (a zero-rect dest mid-mount
        // still shows nothing via opacity 0). The ElementMorph at progress 1 writes the
        // source-rect delta; transform-origin at the source point (the shared-element feel).
        if (settled.width > 0 && settled.height > 0) {
            const originX = sourceRect.x - settled.x;
            const originY = sourceRect.y - settled.y;
            const primeMorph = new ElementMorph(
                { x: settled.x, y: settled.y, width: settled.width, height: settled.height },
                {
                    x: sourceRect.x,
                    y: sourceRect.y,
                    width: sourceRect.width,
                    height: sourceRect.height,
                },
                { transformOrigin: `${originX}px ${originY}px` },
            );
            primeMorph.apply(el, 1);
        }
        primed = true;
    }

    // The 4th color channel writes — the hue + the ramped strength on the FIELD (a
    // DIFFERENT element from the blooming surface). The strength is the only animated
    // value (the registered @property interpolates it); the hue is set ONCE.
    function writeFieldHue(field: HTMLElement, hue: string): void {
        field.style.setProperty("--glass-ambient-hue", hue);
    }
    function writeFieldStrength(field: HTMLElement, pct: number): void {
        field.style.setProperty("--glass-ambient-strength", `${pct.toFixed(3)}%`);
    }
    function releaseField(field: HTMLElement | null): void {
        if (!field) return;
        // Release the bias back to the no-op floor (0%) and clear the hue so the field
        // returns to its un-biased --glass-tint-ink (the warm-cream identity).
        field.style.setProperty("--glass-ambient-strength", "0%");
        field.style.removeProperty("--glass-ambient-hue");
    }

    function cancelRaf(): void {
        if (raf && typeof cancelAnimationFrame === "function") cancelAnimationFrame(raf);
        raf = 0;
    }

    function settle(): void {
        blooming.value = false;
        options.onBloomed?.();
    }

    function bloom(): void {
        const el = dest.value;
        if (!el) return;
        cancelRaf();
        primed = false; // bloom() owns the surface from here (clears any primed seat)

        // The settled rect (the destination's real, painted FULL position — it lays out
        // ONCE at its full footprint). The source rect (the small element it blooms FROM).
        const settled = el.getBoundingClientRect();
        const sourceEl = source.value;
        const sourceRect = sourceEl
            ? sourceEl.getBoundingClientRect()
            : // No source bound — bloom from a 92%-inset of the destination's own centre
              // (the self-scale fallback; still spring-clocked, never a flat zoom).
              {
                  x: settled.x + settled.width * 0.04,
                  y: settled.y + settled.height * 0.04,
                  width: settled.width * 0.92,
                  height: settled.height * 0.92,
              };

        // The 4th-channel field + hue — resolved fresh (the field may have mounted/moved).
        activeField = resolveField(el, options.field);
        const hue = resolveHue(sourceEl, options.fieldHue);
        if (activeField && hue) writeFieldHue(activeField, hue);

        // The transform-origin anchored at the source's top-left relative to the
        // destination, so the scale grows FROM the source point (not centre).
        const originX = sourceRect.x - settled.x;
        const originY = sourceRect.y - settled.y;
        const transformOrigin = `${originX}px ${originY}px`;

        blooming.value = true;

        // PRM: snap the surface to settled identity with opacity 1 in ONE step — zero
        // transform/blur frames, the fade survives — and LAND the field hue instantly
        // (a colour change is not a vestibular trigger; scale/translate/blur are).
        if (respectPRM && prefersReducedMotion()) {
            clearSurface(el);
            el.style.opacity = "1";
            if (activeField && hue) writeFieldStrength(activeField, strengthTarget);
            settle();
            return;
        }

        // The FLIP inversion: ElementMorph(settled → source) gives the delta
        // settled→source. At progress=1 the destination looks like the source (small,
        // offset to the source's rect); at progress=0 it is identity (its settled full
        // rect). We drive the spring inversion 1→0 so it blooms FORWARD onto its own
        // rect — the shared-element open (source≠dest).
        morph = new ElementMorph(
            { x: settled.x, y: settled.y, width: settled.width, height: settled.height },
            {
                x: sourceRect.x,
                y: sourceRect.y,
                width: sourceRect.width,
                height: sourceRect.height,
            },
            { transformOrigin },
        );

        // Drive ALL FOUR channels off ONE spring sample. The spring eases 0→1 over the
        // duration; the SPATIAL inversion reads (1 - eased) so the surface starts at the
        // source (eased=0 → inv=1) and blooms to settled (eased=1 → inv=0). Opacity +
        // blur couple on `eased`/`inv` (fade in, decongest out). The FIELD strength
        // ramps on the SAME `eased` (0 → target), so the field warms AS the surface
        // blooms. Compositor-only on the surface — transform/opacity/filter ONLY.
        startTs = 0;
        const step = (ts: number): void => {
            if (!morph || !dest.value) return;
            if (startTs === 0) startTs = ts;
            const t = Math.min(1, (ts - startTs) / durationMs);
            const eased = easing.fn(t); // the spring curve (overshoot interior)
            const inv = 1 - eased; // 1 at source → 0 at settled
            morph.apply(el, inv); // writes transform + transform-origin
            el.style.opacity = String(Math.min(1, Math.max(0, eased)));
            const blurPx = blurStart * inv;
            // The decongest on the surface's OWN pixels (`filter`), so the resting
            // glass-tier `backdrop-filter` plate blur is never clobbered.
            el.style.filter = `blur(${blurPx.toFixed(2)}px)`;
            // The 4th channel — the field strength ramps on the SAME spring curve
            // (clamped at the easing range so an overshoot interior never exceeds the
            // bounded warm-cream target).
            if (activeField && hue) {
                const k = Math.min(1, Math.max(0, eased));
                writeFieldStrength(activeField, strengthTarget * k);
            }
            if (t < 1 && typeof requestAnimationFrame === "function") {
                raf = requestAnimationFrame(step);
            } else {
                // Settled — clear the inline transform so the CSS recipe/layout owns the
                // resting frame; pin the field at its full target hue.
                clearSurface(el);
                el.style.opacity = "1";
                if (activeField && hue) writeFieldStrength(activeField, strengthTarget);
                morph = null;
                raf = 0;
                settle();
            }
        };
        if (typeof requestAnimationFrame === "function") {
            raf = requestAnimationFrame(step);
        } else {
            // SSR / no-rAF — snap to settled + land the hue + hand off.
            clearSurface(el);
            el.style.opacity = "1";
            if (activeField && hue) writeFieldStrength(activeField, strengthTarget);
            settle();
        }
    }

    function reset(): void {
        cancelRaf();
        morph = null;
        blooming.value = false;
        const el = dest.value;
        if (el) clearSurface(el);
        releaseField(activeField);
        activeField = null;
    }

    // Auto-prime — seat the dest hidden the MOMENT it mounts (the no-mount-flash floor).
    // `flush: "pre"` runs the callback in the SAME tick the ref resolves, BEFORE the
    // browser paints, so a freshly-v-if-mounted dest never shows its full-size frame. We
    // only prime a dest that is NOT mid-bloom and NOT already settled-open (blooming false
    // + no raf): a re-resolve of the dest ref during an open state must not hide it.
    if (autoPrime) {
        watch(
            dest,
            (el) => {
                if (el && !raf && !blooming.value) prime();
            },
            { flush: "pre" },
        );
    }

    onScopeDispose(() => {
        cancelRaf();
        morph = null;
        releaseField(activeField);
        activeField = null;
    });

    return { bloom, reset, prime, blooming: readonly(blooming) };
}
