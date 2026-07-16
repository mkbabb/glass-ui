import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import * as Deck from "@glass/components/deck";
import * as Glass from "@glass/index";
import * as MotionCore from "@glass/composables/motion/core";

describe("Deck public contract", () => {
    it("keeps navigation and announcements without the retired motion fork", () => {
        expect(Deck).not.toHaveProperty("installDeckSpring");
        expect(Deck).not.toHaveProperty("deckEase");
        expect(Deck).not.toHaveProperty("DECK_SPRING");
        expect(Deck).not.toHaveProperty("PagerWindow");
        expect(Glass).not.toHaveProperty("useGooMorph");
        expect(Glass).not.toHaveProperty("MORPH_SIGNATURES");
        expect(MotionCore).not.toHaveProperty("useGooMorph");
        expect(MotionCore).not.toHaveProperty("MORPH_SIGNATURES");

        const changed = vi.fn();
        const deck = Deck.useDeck(3, {
            label: (index) => ["Intro", "Body", "Close"][index],
            onChange: changed,
        });
        deck.next();

        expect(deck.index.value).toBe(1);
        expect(deck.progress.value).toBeCloseTo(200 / 3);
        expect(deck.liveMessage.value).toBe("Slide 2 of 3: Body");
        expect(changed).toHaveBeenCalledWith(1, 0);
    });

    it("preserves focus-guarded keyboard paging", () => {
        const moves: Deck.DeckMoves = {
            next: vi.fn(),
            prev: vi.fn(),
            first: vi.fn(),
            last: vi.fn(),
            go: vi.fn(),
        };
        const button = document.createElement("button");
        const guarded = new KeyboardEvent("keydown", { key: " " });
        Object.defineProperty(guarded, "target", { value: button });
        expect(Deck.handleDeckKey(guarded, moves)).toBe(false);
        expect(moves.next).not.toHaveBeenCalled();

        const arrow = new KeyboardEvent("keydown", { key: "ArrowRight" });
        expect(Deck.handleDeckKey(arrow, moves)).toBe(true);
        expect(moves.next).toHaveBeenCalledOnce();
    });

    it("keeps the windowed pager's presentation register", () => {
        const wrapper = mount(Deck.DeckPager, {
            props: { total: 8, index: 3, windowFit: 5 },
        });
        expect(wrapper.get('[role="group"]').attributes("aria-label")).toBe("Slides");
        expect(wrapper.get('[aria-current="true"]').attributes("aria-label")).toContain(
            "4",
        );
    });
});
