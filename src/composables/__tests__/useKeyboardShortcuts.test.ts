import { afterEach, describe, expect, it, vi } from "vitest";
import {
    formatCombo,
    formatComboParts,
    isMac,
    registerShortcut,
    useRegisteredShortcuts,
} from "../useKeyboardShortcuts";

describe("useKeyboardShortcuts", () => {
    const cleanups: Array<() => void> = [];

    afterEach(() => {
        while (cleanups.length > 0) {
            cleanups.pop()?.();
        }
        vi.restoreAllMocks();
    });

    function register(
        combo: string,
        handler = vi.fn(),
        options: Parameters<typeof registerShortcut>[2] = {},
    ) {
        const cleanup = registerShortcut(combo, handler, options);
        cleanups.push(cleanup);
        return handler;
    }

    it("matches modifier-only Shift on keydown", () => {
        const handler = register("Shift");

        window.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "Shift",
                code: "ShiftLeft",
                shiftKey: true,
            }),
        );

        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("matches modifier-only Shift on keyup", () => {
        const handler = register("Shift", vi.fn(), { event: "keyup" });

        window.dispatchEvent(
            new KeyboardEvent("keyup", {
                key: "Shift",
                code: "ShiftLeft",
                shiftKey: false,
            }),
        );

        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("keeps shifted key combinations distinct from modifier-only shortcuts", () => {
        const shiftOnly = register("Shift");
        const shiftedArrow = register("Shift+ArrowLeft");

        window.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "ArrowLeft",
                code: "ArrowLeft",
                shiftKey: true,
            }),
        );

        expect(shiftOnly).not.toHaveBeenCalled();
        expect(shiftedArrow).toHaveBeenCalledTimes(1);
    });

    it("exposes labeled registrations for shortcut help UIs", () => {
        const shortcuts = useRegisteredShortcuts();
        const cleanup = registerShortcut("Mod+K", vi.fn(), {
            label: "Open search",
            group: "Navigation",
        });
        cleanups.push(cleanup);

        expect(shortcuts.value).toContainEqual(
            expect.objectContaining({
                raw: "Mod+K",
                options: expect.objectContaining({
                    label: "Open search",
                    group: "Navigation",
                }),
            }),
        );
    });

    it("formats combo strings for keyboard displays", () => {
        expect(formatComboParts("Shift+ArrowLeft")).toEqual([
            isMac ? "⇧" : "Shift",
            "←",
        ]);
        expect(formatCombo("Ctrl+K")).toBe(
            formatComboParts("Ctrl+K").join(isMac ? "" : "+"),
        );
    });
});
