<!--
  Mark — the draw for a typographic mark.

  The mark itself is CSS (`mark.css`): a text decoration the browser places from the
  glyphs and the font. This component adds one thing, the draw. When the run is first
  seen it copies each line of the run into a clipped window, the copy carrying the same
  class with transparent glyphs, and slides the window open on the `present` spring.
  When the last line lands the copies are removed and the run's own decoration shows.
  At rest the component holds no geometry, no observer and no listener.
-->
<script lang="ts">
/** Where a draw can run: the stylesheet's own media condition (`mark.css`). */
const MOTION =
    "screen and (prefers-reduced-motion: no-preference) and (scripting: enabled) and (forced-colors: none)";

/**
 * One observer for every waiting mark. Its callback runs after layout, so reads there
 * force none. Each mark reads first and hands back its writes; the writes run after every
 * mark in the batch has read, so one mark's copies never dirty layout under another's reads.
 */
const V: Record<string, boolean> = (globalThis as any).__markVariant ?? {};
type Entered = (entry: IntersectionObserverEntry) => (() => void) | void;
const seen = new WeakMap<Element, Entered>();
let io: IntersectionObserver | null = null;
function watch(el: Element, fn: Entered): void {
    io ??= new IntersectionObserver(
        (entries) => entries.map((e) => seen.get(e.target)?.(e)).forEach((write) => write?.()),
        { threshold: V.half ? [0, 0.5] : 0 },
    );
    seen.set(el, fn);
    io.observe(el);
}
function unwatch(el: Element): void {
    seen.delete(el);
    io?.unobserve(el);
}

interface Line {
    rect: DOMRect;
    range: Range;
}

/**
 * The run's line fragments, each with the range of text it holds. One fragment is the
 * whole run. A wrapped run is walked once, a character at a time, and each character
 * joins the fragment its box sits in.
 */
function lines(host: HTMLElement, layer: HTMLElement): Line[] {
    const rects = Array.from(host.getClientRects()).filter((r) => r.width > 0 && r.height > 0);
    if (rects.length === 0) return [];
    if (rects.length === 1) {
        const range = document.createRange();
        range.selectNodeContents(host);
        range.setEndBefore(layer);
        return [{ rect: rects[0], range }];
    }
    const out: (Line | null)[] = rects.map(() => null);
    const walk = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
    const probe = document.createRange();
    for (let n = walk.nextNode(); n; n = walk.nextNode()) {
        if (layer.contains(n)) continue;
        const len = (n as Text).length;
        for (let i = 0; i < len; i++) {
            probe.setStart(n, i);
            probe.setEnd(n, i + 1);
            const c = probe.getClientRects()[0];
            if (!c || c.width === 0) continue;
            const x = c.left + c.width / 2;
            const y = c.top + c.height / 2;
            const k = rects.findIndex((r) => x >= r.left && x <= r.right && y >= r.top && y <= r.bottom);
            if (k < 0) continue;
            const line = (out[k] ??= { rect: rects[k], range: document.createRange() });
            if (line.range.collapsed && line.range.startContainer === document) line.range.setStart(n, i);
            line.range.setEnd(n, i + 1);
        }
    }
    return out.filter((l): l is Line => l !== null);
}

/** The line's text, with the inline markup between it and the host put back around it. */
function copyOf(host: HTMLElement, range: Range): HTMLElement {
    let content: Node = range.cloneContents();
    let a: Node | null = range.commonAncestorContainer;
    if (a.nodeType === Node.TEXT_NODE) a = a.parentNode;
    for (; a && a !== host; a = a.parentNode) {
        const wrap = a.cloneNode(false);
        wrap.appendChild(content);
        content = wrap;
    }
    let copy: HTMLElement;
    if (V.cloneall) {
        copy = host.cloneNode(false) as HTMLElement;
        copy.removeAttribute("data-ink");
        copy.removeAttribute("id");
    } else {
        // The copy carries what sets the decoration and nothing else: the class and the inline style.
        copy = document.createElement(host.localName);
        copy.className = host.className;
        if (host.style.cssText) copy.style.cssText = host.style.cssText;
    }
    copy.appendChild(content);
    return copy;
}
</script>

<script setup lang="ts">
import "./mark.css";
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = withDefaults(
    defineProps<{
        shape?: "underline" | "highlight";
        /** Draw the mark in when it is first seen. Off, it stands drawn. */
        draw?: boolean;
        /** Undraw on leaving the viewport and draw again on each entry. */
        retrigger?: boolean;
    }>(),
    { shape: "underline", draw: true, retrigger: false },
);

const emit = defineEmits<{
    /** The mark stands complete: once per draw, one frame after its last line lands. */
    drawn: [];
}>();

const root = ref<HTMLElement | null>(null);
const layer = ref<HTMLElement | null>(null);
/** `wait` holds the ink back, `draw` runs the copies, `rest` is the stylesheet alone. */
const ink = ref<"wait" | "draw" | "rest">(props.draw ? "wait" : "rest");

let pending = 0;
let query: MediaQueryList | null = null;

const still = () => !(window.matchMedia?.(MOTION)?.matches ?? false);

function rest(): void {
    if (ink.value === "rest") return;
    ink.value = "rest";
    if (!props.retrigger) release();
    requestAnimationFrame(() => emit("drawn"));
}

function release(): void {
    query?.removeEventListener("change", rest);
    query = null;
    if (root.value) unwatch(root.value);
}

/** Reads now (the layer's origin, the line fragments); returns the writes. */
function begin(): (() => void) | void {
    const host = root.value;
    const at = layer.value;
    if (!host || !at) return;
    // The draw is for an inline box. A host its parent has made a block (a flex or grid item,
    // inline-block) has no line fragments to read, so it stands drawn.
    if (!V.noinline && getComputedStyle(host).display !== "inline") {
        if (import.meta.env.DEV) console.warn("[Mark] the host is not an inline box; the mark stands drawn with no draw.");
        return rest;
    }
    const origin = at.getBoundingClientRect();
    const found = lines(host, at);
    if (found.length === 0) return rest;
    const windows = found.map(({ rect, range }, i) => {
        const win = document.createElement("span");
        win.className = "mark-line";
        // The window is the line's box and one pixel a side (`mark.css` pads it back), so a
        // decoration the engine snaps a fraction past the box is not clipped.
        win.style.cssText =
            `left:${rect.left - origin.left - 1}px;top:${rect.top - origin.top}px;` +
            `width:${rect.width + 2}px;height:${rect.height}px;line-height:${rect.height}px;` +
            `--mark-i:${i};--mark-w:${rect.width + 2}px`;
        const slide = document.createElement("span");
        slide.className = "mark-slide";
        slide.appendChild(copyOf(host, range));
        win.appendChild(slide);
        return win;
    });
    return () => {
        at.replaceChildren(...windows);
        pending = windows.length;
        ink.value = "draw";
        // A face that lands under the draw moves the text and the copies would be stale, so the draw lands with it.
        if (!V.nofontland && document.fonts?.status === "loading")
            void document.fonts.ready.then(() => {
                if (ink.value === "draw") rest();
            });
    };
}

function onEntry(entry: IntersectionObserverEntry): (() => void) | void {
    if (still()) return rest;
    if (ink.value === "wait" && (V.half ? entry.intersectionRatio >= 0.5 : entry.isIntersecting)) return begin();
    if (ink.value === "rest" && props.retrigger && !entry.isIntersecting) ink.value = "wait";
}

function onEnd(e: AnimationEvent): void {
    if (ink.value !== "draw" || e.animationName !== "mark-window") return;
    if (--pending <= 0) rest();
}

/** Draw again from nothing. */
function play(): void {
    const host = root.value;
    if (!host || still()) return;
    layer.value?.replaceChildren();
    ink.value = "wait";
    // A fresh observation reports after the next layout, with the layer in place.
    unwatch(host);
    watch(host, onEntry);
}

onMounted(() => {
    if (ink.value === "rest") return void requestAnimationFrame(() => emit("drawn"));
    if (still() || typeof IntersectionObserver === "undefined") return rest();
    query = window.matchMedia(MOTION);
    query.addEventListener("change", rest);
    if (root.value) watch(root.value, onEntry);
});

onBeforeUnmount(release);

defineExpose({ play });
</script>

<template>
    <component
        :is="shape === 'highlight' ? 'mark' : 'span'"
        ref="root"
        :class="shape === 'highlight' ? 'mark-highlight' : 'mark-underline'"
        :data-ink="ink"
        @animationend="onEnd"
    >
        <slot /><span v-if="ink !== 'rest'" ref="layer" class="mark-layer" aria-hidden="true" :inert="!V.noinert" />
    </component>
</template>
