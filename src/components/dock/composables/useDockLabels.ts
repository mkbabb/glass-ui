/**
 * W-I.8 R-7: the labelled seat. The name is an out-of-flow span inside the seat; on
 * hover or keyboard focus the seats before it give up their slack by `translate` (CSS
 * tweens it on the dock spring), so the plate's size never changes. A name that does
 * not fit in the slack is not shown.
 */
import { onBeforeUnmount, watch, type Ref } from "vue";

const ICON_FLOOR = 4; // px of slot kept around an icon
const GAP_FLOOR = 2; // px kept of each gap
const LABEL_GAP = 6; // px between the name and its icon

export interface DockLabelReading {
    seat: number;
    need: number;
    room: number;
    fits: boolean;
}

export function useDockLabels(run: Ref<HTMLElement | null>, vertical: () => boolean) {
    let shown: HTMLElement | null = null;
    const readings: DockLabelReading[] = [];

    function seats(): HTMLElement[] {
        const el = run.value;
        return el ? (Array.from(el.children) as HTMLElement[]).filter((c) => c.offsetParent !== null) : [];
    }
    function seatOf(target: EventTarget | null): HTMLElement | null {
        const el = run.value;
        if (!el || !(target instanceof Element)) return null;
        let n: Element | null = target;
        while (n && n.parentElement !== el) n = n.parentElement;
        if (!n) return null;
        const host = n as HTMLElement;
        return host.matches("[data-dock-label]") || host.querySelector(":scope > [data-dock-label]")
            ? host
            : null;
    }
    function iconBox(seat: HTMLElement): { l: number; r: number } {
        const icon = seat.querySelector("svg, img, .dock-icon");
        const sr = seat.getBoundingClientRect();
        const tx = Number.parseFloat(seat.style.translate) || 0;
        if (!icon) return { l: sr.left - tx + sr.width / 2 - 10, r: sr.left - tx + sr.width / 2 + 10 };
        const ir = icon.getBoundingClientRect();
        return { l: ir.left - tx, r: ir.right - tx };
    }

    function show(seat: HTMLElement): void {
        if (vertical() || shown === seat) return;
        hide();
        const list = seats();
        const k = list.indexOf(seat);
        const label = seat.querySelector<HTMLElement>(".dock-seat-label");
        if (k < 0 || !label) return;
        // The name hangs off the seat's inline start, so the room it needs is measured
        // from the icon: its width, its gap, and the seat's own inset before the icon.
        const seatLeft = seat.getBoundingClientRect().left - (Number.parseFloat(seat.style.translate) || 0);
        const need = label.offsetWidth + LABEL_GAP + Math.max(0, iconBox(seat).l - seatLeft);
        // c[i]: how far icon i may close on icon i-1 (or on the plate's edge for i = 0).
        const icons = list.map(iconBox);
        const slots = list.map((s) => {
            const r = s.getBoundingClientRect();
            const tx = Number.parseFloat(s.style.translate) || 0;
            return { l: r.left - tx, r: r.right - tx };
        });
        const runBox = run.value!.getBoundingClientRect();
        const c: number[] = [];
        for (let i = 0; i <= k; i++) {
            const leftLimit = i === 0 ? runBox.left : icons[i - 1].r;
            c[i] = Math.max(0, icons[i].l - leftLimit - (i === 0 ? ICON_FLOOR : ICON_FLOOR * 2 + GAP_FLOOR));
        }
        // The space left of icon k must reach `need`.
        const m: number[] = new Array(k).fill(0);
        let want = Math.max(0, need - (icons[k].l - (k > 0 ? icons[k - 1].r : runBox.left)));
        for (let i = k - 1; i >= 0; i--) {
            m[i] = want;
            want = Math.max(0, want - c[i]);
        }
        const room = c.slice(0, k + 1).reduce((a, b) => a + b, 0);
        const fits = k === 0 ? need <= c[0] : want <= 0;
        readings.push({ seat: k, need, room, fits });
        (window as unknown as { __dockLabelReadings?: DockLabelReading[] }).__dockLabelReadings = readings;
        void slots;
        if (!fits) return;
        shown = seat;
        for (let i = 0; i < k; i++) if (m[i] > 0) list[i].style.translate = `${-m[i]}px 0`;
        seat.setAttribute("data-label-shown", "");
    }
    function hide(): void {
        if (!shown) return;
        shown.removeAttribute("data-label-shown");
        for (const s of seats()) s.style.removeProperty("translate");
        shown = null;
    }

    function onOver(e: PointerEvent): void {
        if (e.pointerType === "touch") return;
        const seat = seatOf(e.target);
        if (seat) show(seat);
        else if (shown && !shown.contains(e.target as Node)) hide();
    }
    function onLeave(): void {
        hide();
    }
    function onFocusIn(e: FocusEvent): void {
        const seat = seatOf(e.target);
        if (seat && (e.target as Element).matches(":focus-visible")) show(seat);
        else hide();
    }
    function onFocusOut(e: FocusEvent): void {
        if (shown && !shown.contains(e.relatedTarget as Node)) hide();
    }

    watch(
        run,
        (el, _o, onCleanup) => {
            if (!el) return;
            el.addEventListener("pointerover", onOver);
            el.addEventListener("pointerleave", onLeave);
            el.addEventListener("focusin", onFocusIn);
            el.addEventListener("focusout", onFocusOut);
            onCleanup(() => {
                el.removeEventListener("pointerover", onOver);
                el.removeEventListener("pointerleave", onLeave);
                el.removeEventListener("focusin", onFocusIn);
                el.removeEventListener("focusout", onFocusOut);
            });
        },
        { immediate: true },
    );
    onBeforeUnmount(hide);
    return { hide };
}
