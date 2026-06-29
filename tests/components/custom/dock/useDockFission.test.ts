// BE.W-DOCK-FISSION — the n-ary detach orchestrator unit half (the headless math/logic
// that is testable without a real GPU). The BINDING painted truth (the per-context
// frame-series, the seam-tension resist, box-INVIOLATE) rides tests-visual/dock-fission
// .spec.ts; this is the descriptor + orchestrator-logic half:
//   • the per-context goo-SIGNATURE map is descriptor-driven (radial/lateral/inward-merge,
//     distinct stagger orders) — the F3 floor;
//   • split()/merge() flip the ONE target (F2 bidirectional);
//   • a registered piece gets its --split-dx/--split-dy/--neck-t/--stretch written;
//   • under PRM the seat is SYNCHRONOUS at the target (F5 — instant, no spring frames).

import { afterEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import { mountComposable } from "../../../utils/mountComposable";
import {
    useDockFission,
    DOCK_SPLIT_SIGNATURES,
    type DockSplitSignature,
} from "@glass/components/custom/dock/composables/useDockFission";

function installMatchMedia(reduced: boolean): void {
    (window as unknown as { matchMedia: (q: string) => MediaQueryList }).matchMedia = (
        query: string,
    ) =>
        ({
            matches: reduced && /prefers-reduced-motion/.test(query),
            media: query,
            addEventListener: () => {},
            removeEventListener: () => {},
            addListener: () => {},
            removeListener: () => {},
            dispatchEvent: () => false,
            onchange: null,
        }) as unknown as MediaQueryList;
}

function makeEl(): HTMLElement {
    return document.createElement("div");
}

describe("DOCK_SPLIT_SIGNATURES — the per-context goo-signature descriptor (F3)", () => {
    it("carries all three contexts with distinct detach vectors", () => {
        expect(DOCK_SPLIT_SIGNATURES.search.vector).toBe("radial");
        expect(DOCK_SPLIT_SIGNATURES.media.vector).toBe("lateral");
        expect(DOCK_SPLIT_SIGNATURES.nav.vector).toBe("inward-merge");
    });

    it("each context names its own context key (no cross-talk)", () => {
        for (const [key, sig] of Object.entries(DOCK_SPLIT_SIGNATURES)) {
            expect(sig.context).toBe(key);
        }
    });

    it("search staggers innermost-first (a radial ripple, not a scatter)", () => {
        // For 5 pieces (indices 0..4), search ranks by distance from the center (idx 2):
        // the innermost piece (idx 2) has rank 0, the outermost (0,4) rank 2.
        const r = DOCK_SPLIT_SIGNATURES.search.staggerRank;
        expect(r(2, 5)).toBe(0); // center breaks first
        expect(r(0, 5)).toBe(2); // edges last
        expect(r(4, 5)).toBe(2);
    });

    it("media staggers outside-in (the flanks peel first)", () => {
        // For 5 pieces, media ranks the OUTERMOST first (rank 0 at the edges).
        const r = DOCK_SPLIT_SIGNATURES.media.staggerRank;
        expect(r(0, 5)).toBe(0); // outermost breaks first
        expect(r(2, 5)).toBe(2); // center last
    });

    it("the stagger orders DIFFER across contexts (data, not three code paths)", () => {
        const s = DOCK_SPLIT_SIGNATURES.search.staggerRank;
        const m = DOCK_SPLIT_SIGNATURES.media.staggerRank;
        // The center index: search ranks it 0 (first), media ranks it last — opposite.
        expect(s(2, 5)).not.toBe(m(2, 5));
    });
});

describe("useDockFission — the orchestrator logic", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("starts at rest (t=0, not fissioned)", () => {
        installMatchMedia(false);
        const rootEl = ref<HTMLElement | null>(makeEl());
        const signature = ref<DockSplitSignature>(DOCK_SPLIT_SIGNATURES.search);
        const { result, unmount } = mountComposable(() =>
            useDockFission({ rootEl, signature }),
        );
        expect(result.t.value).toBe(0);
        expect(result.fissioned.value).toBe(false);
        unmount();
    });

    it("PRM: split() seats SYNCHRONOUSLY at the target (instant, no spring frames) — F5", () => {
        installMatchMedia(true); // reduced motion ON
        const rootEl = ref<HTMLElement | null>(makeEl());
        const signature = ref<DockSplitSignature>(DOCK_SPLIT_SIGNATURES.search);
        const { result, unmount } = mountComposable(() =>
            useDockFission({ rootEl, signature }),
        );
        const piece = makeEl();
        const pieceRef = ref<HTMLElement | null>(piece);
        result.registerPiece({ el: pieceRef, vector: { dx: -1, dy: 0 }, rank: 0 });

        result.split();
        // Under PRM the seat is synchronous — t is at the target NOW, no rAF.
        expect(result.t.value).toBe(1);
        expect(result.fissioned.value).toBe(true);
        // The root carries the scalar + the data-attr; the seam-tension is zeroed.
        expect(rootEl.value!.style.getPropertyValue("--dock-split-t")).toBe("1");
        expect(rootEl.value!.style.getPropertyValue("--seam-tension")).toBe("0");
        // The piece carries its endpoint vector + neck-t + a rest stretch (no squish).
        expect(piece.style.getPropertyValue("--split-dx")).toBe("-1");
        expect(piece.style.getPropertyValue("--neck-t")).toBe("1");
        expect(piece.style.getPropertyValue("--stretch")).toBe("1");

        result.merge();
        expect(result.t.value).toBe(0);
        expect(result.fissioned.value).toBe(false);
        unmount();
    });

    it("PRM: merge() seats back to 0 — bidirectional on the ONE scalar (F2)", () => {
        installMatchMedia(true);
        const rootEl = ref<HTMLElement | null>(makeEl());
        const signature = ref<DockSplitSignature>(DOCK_SPLIT_SIGNATURES.nav);
        const { result, unmount } = mountComposable(() =>
            useDockFission({ rootEl, signature }),
        );
        result.split();
        expect(result.t.value).toBe(1);
        result.toggle(); // from fissioned → merge
        expect(result.t.value).toBe(0);
        expect(rootEl.value!.style.getPropertyValue("--dock-split-t")).toBe("0");
        unmount();
    });

    it("a registered piece can release without leaking (no further writes)", () => {
        installMatchMedia(true);
        const rootEl = ref<HTMLElement | null>(makeEl());
        const signature = ref<DockSplitSignature>(DOCK_SPLIT_SIGNATURES.search);
        const { result, unmount } = mountComposable(() =>
            useDockFission({ rootEl, signature }),
        );
        const piece = makeEl();
        const pieceRef = ref<HTMLElement | null>(piece);
        const handle = result.registerPiece({
            el: pieceRef,
            vector: { dx: 1, dy: 0 },
            rank: 0,
        });
        handle.release();
        // After release the piece is no longer written on a split.
        result.split();
        expect(piece.style.getPropertyValue("--split-dx")).toBe("");
        unmount();
    });

    it("a getter vector re-resolves per write (the live FLIP-measured center)", () => {
        installMatchMedia(true);
        const rootEl = ref<HTMLElement | null>(makeEl());
        const signature = ref<DockSplitSignature>(DOCK_SPLIT_SIGNATURES.search);
        const { result, unmount } = mountComposable(() =>
            useDockFission({ rootEl, signature }),
        );
        const piece = makeEl();
        const pieceRef = ref<HTMLElement | null>(piece);
        let dx = 0.5;
        result.registerPiece({ el: pieceRef, vector: () => ({ dx, dy: 0 }), rank: 0 });
        dx = -0.8;
        result.split();
        expect(piece.style.getPropertyValue("--split-dx")).toBe("-0.8");
        unmount();
    });
});
