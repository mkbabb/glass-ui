// BK #29 W-ROUTE-MOTION — the mechanism half of the grammar's arms.
//
// The CSS half lives at `tests/styles/route-motion.test.ts`. What is held here is the one
// thing the stylesheet cannot state: WINDOW-NOT-CAROUSEL. EXEMPLARS-CODEX I4b measures the
// exemplar's restraint ("only the tapped cell participates; the neighbours do not move"),
// and the View Transitions runtime turns it into a hard requirement — two elements sharing
// one `view-transition-name` in a single state skip the whole transition SILENTLY, with no
// error, no warning, and a suite that stays green. A leaked name from an aborted
// predecessor kills the NEXT navigation the same way. Those two failure modes are the
// subject of every arm below.

import { afterEach, describe, expect, it, vi } from "vitest";
import {
    ROUTE_DIRECTION_PROP,
    ROUTE_LABEL_NAME,
    ROUTE_WINDOW_NAME,
    routeTransition,
} from "@glass/composables/motion/core";

const docMut = document as unknown as { startViewTransition?: unknown };

/** The native shape, driven so the update callback runs and `finished` settles. */
function stubNativeTransition(): void {
    docMut.startViewTransition = (
        arg: (() => void | Promise<void>) | { update: () => void | Promise<void> },
    ) => {
        const update = typeof arg === "function" ? arg : arg.update;
        return { finished: Promise.resolve(update()) };
    };
}

const nameOf = (el: HTMLElement): string =>
    el.style.getPropertyValue("view-transition-name");

afterEach(() => {
    vi.restoreAllMocks();
    delete docMut.startViewTransition;
    document.body.innerHTML = "";
    document.documentElement.style.removeProperty(ROUTE_DIRECTION_PROP);
});

describe("routeTransition — one window at a time", () => {
    it("names the source window and its label, and clears both when it finishes", async () => {
        stubNativeTransition();
        document.body.innerHTML = `<a id="cell"><span data-route-label>Forms</span></a>`;
        const source = document.querySelector<HTMLElement>("#cell")!;
        const label = document.querySelector<HTMLElement>("[data-route-label]")!;

        const seen: string[] = [];
        const { finished } = routeTransition({
            nav: "zoom",
            source,
            mutate: () => {
                seen.push(nameOf(source), nameOf(label));
            },
        });

        expect(seen).toEqual([ROUTE_WINDOW_NAME, ROUTE_LABEL_NAME]);
        await finished;
        expect(nameOf(source)).toBe("");
        expect(nameOf(label)).toBe("");
    });

    it("names the destination inside the update callback, not after it", async () => {
        stubNativeTransition();
        document.body.innerHTML = `<a id="cell"></a><article id="page"></article>`;
        const target = document.querySelector<HTMLElement>("#page")!;

        let nameAtSnapshot = "";
        const { finished } = routeTransition({
            nav: "zoom",
            source: document.querySelector<HTMLElement>("#cell"),
            target: () => target,
            mutate: () => {},
        });
        // The stub resolves `finished` from the update callback's return, so reading
        // after the microtask that settles it is reading the snapshot moment.
        await Promise.resolve();
        nameAtSnapshot = nameOf(target);

        expect(nameAtSnapshot).toBe(ROUTE_WINDOW_NAME);
        await finished;
        expect(nameOf(target)).toBe("");
    });

    it("sweeps a leaked name before it writes — the silent-skip class", async () => {
        stubNativeTransition();
        document.body.innerHTML = `<a id="stale"></a><a id="cell"></a>`;
        const stale = document.querySelector<HTMLElement>("#stale")!;
        const cell = document.querySelector<HTMLElement>("#cell")!;
        // An aborted predecessor's residue: two elements would now share one name.
        stale.style.setProperty("view-transition-name", ROUTE_WINDOW_NAME);

        const named: string[] = [];
        await routeTransition({
            nav: "zoom",
            source: cell,
            mutate: () => {
                for (const el of [stale, cell]) {
                    if (nameOf(el) === ROUTE_WINDOW_NAME) named.push(el.id);
                }
            },
        }).finished;

        expect(named).toEqual(["cell"]);
    });

    it("names nothing at all on the cut, which is what makes it a cut", async () => {
        stubNativeTransition();
        document.body.innerHTML = `<a id="cell"><span data-route-label>x</span></a>`;
        const source = document.querySelector<HTMLElement>("#cell")!;

        let nameDuring = "unset";
        await routeTransition({
            nav: "route",
            source,
            mutate: () => {
                nameDuring = nameOf(source);
            },
        }).finished;

        expect(nameDuring).toBe("");
    });

    it("restores a name the caller already owned rather than clearing it", async () => {
        stubNativeTransition();
        document.body.innerHTML = `<a id="cell"></a>`;
        const source = document.querySelector<HTMLElement>("#cell")!;
        source.style.setProperty("view-transition-name", "consumer-owned");

        await routeTransition({ nav: "zoom", source, mutate: () => {} }).finished;

        expect(nameOf(source)).toBe("consumer-owned");
    });
});

describe("routeTransition — an unmatched window degrades to the root cross-fade", () => {
    // A NAMED half with no partner is not a transition, it is an extra layer. The runtime
    // composites it over the root pair under `plus-lighter`, so an arrival reaching α=1 on
    // the handover clock lands on a root pair still conserving to 1 and the rect sums to
    // ~1.9 — the flash G-NO-FLASH names, pointed the other way. The demo's primary rail
    // path reaches it: the catalog declares section paths, a category chip pushes a story
    // path, so `zoom` resolves a destination window with no source to hand over from.
    //
    // The two directions are not symmetric, and only one of them is JS's to fix. A source
    // that resolved nothing is known BEFORE the old state is captured, so the mechanism
    // simply declines to name the destination and the class degrades to the conserved root
    // cross-fade it already documents. A source that resolved and a destination that did
    // not is known only AFTER the capture, and a captured name cannot be un-named — that
    // half is conserved in the sheet, by the `:only-child` forks the CSS arms hold.
    it("declines to name the destination when the source resolved nothing", async () => {
        stubNativeTransition();
        document.body.innerHTML = `<article id="page"></article>`;
        const target = document.querySelector<HTMLElement>("#page")!;

        const { finished } = routeTransition({
            nav: "zoom",
            source: null,
            target: () => target,
            mutate: () => {},
        });
        await Promise.resolve();
        const nameAtSnapshot = nameOf(target);

        expect(nameAtSnapshot).toBe("");
        await finished;
        expect(nameOf(target)).toBe("");
    });

    it("keeps the captured source named when the destination resolves nothing", async () => {
        stubNativeTransition();
        document.body.innerHTML = `<a id="cell"></a>`;
        const source = document.querySelector<HTMLElement>("#cell")!;
        const resolve = vi.fn(() => null);

        let nameDuring = "";
        const { finished } = routeTransition({
            nav: "collapse",
            source,
            target: resolve,
            mutate: () => {
                nameDuring = nameOf(source);
            },
        });
        await finished;

        // The old state is captured with the name — that is the irreversible half, and the
        // sheet conserves it. What the mechanism owes is that it asked, and that it
        // fabricated nothing on the new side.
        expect(nameDuring).toBe(ROUTE_WINDOW_NAME);
        expect(resolve).toHaveBeenCalledTimes(1);
        expect(nameOf(source)).toBe("");
        expect(document.querySelectorAll(`[style*="${ROUTE_WINDOW_NAME}"]`)).toHaveLength(
            0,
        );
    });
});

describe("routeTransition — the lateral push's sign", () => {
    it("writes the direction for the duration and removes it after", async () => {
        stubNativeTransition();
        const root = document.documentElement;

        let during = "";
        await routeTransition({
            nav: "lateral",
            direction: -3,
            mutate: () => {
                during = root.style.getPropertyValue(ROUTE_DIRECTION_PROP);
            },
        }).finished;

        // The sign, never the magnitude — a caller's index delta is not a distance.
        expect(during).toBe("-1");
        expect(root.style.getPropertyValue(ROUTE_DIRECTION_PROP)).toBe("");
    });

    it("leaves the property unwritten when the direction is unknown", async () => {
        stubNativeTransition();
        const root = document.documentElement;

        let during = "unset";
        await routeTransition({
            nav: "lateral",
            mutate: () => {
                during = root.style.getPropertyValue(ROUTE_DIRECTION_PROP);
            },
        }).finished;

        expect(during).toBe("");
    });
});

describe("routeTransition — the substrate's fallbacks still apply", () => {
    it("runs the mutation with no snapshot when the API is absent", async () => {
        delete docMut.startViewTransition;
        document.body.innerHTML = `<a id="cell"></a>`;
        const source = document.querySelector<HTMLElement>("#cell")!;
        const mutate = vi.fn();

        await routeTransition({ nav: "zoom", source, mutate }).finished;

        expect(mutate).toHaveBeenCalledTimes(1);
        expect(nameOf(source)).toBe("");
    });
});
