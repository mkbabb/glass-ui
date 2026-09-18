import { afterEach, describe, expect, it, vi } from "vitest";
import {
    formatCombo,
    formatComboLabel,
    formatComboParts,
    isMac,
    registerShortcut,
    suspendShortcuts,
    useRegisteredShortcuts,
} from "@glass/composables/keyboard";

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

    it("resolves Escape LIFO — the most-recently-registered handler wins", () => {
        // Two OPEN overlays register Escape in order; the dispatcher must fire the
        // LAST-registered (top-most) one and consume, leaving the first untouched.
        const order: string[] = [];
        register("Escape", vi.fn(() => void order.push("first")), {
            allowInInput: true,
        });
        register("Escape", vi.fn(() => void order.push("second")), {
            allowInInput: true,
        });

        window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

        // Top-most (last-registered) wins and consumes — the first does NOT fire.
        expect(order).toEqual(["second"]);
    });

    it("pops the Escape stack — a second Escape reaches the next handler down", () => {
        const first = vi.fn();
        const second = vi.fn();
        register("Escape", first, { allowInInput: true });
        const popSecond = registerShortcut("Escape", second, {
            allowInInput: true,
        });

        window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
        expect(second).toHaveBeenCalledTimes(1);
        expect(first).not.toHaveBeenCalled();

        // The top overlay closes → unregisters; a second Escape pops the next.
        popSecond();
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
        expect(first).toHaveBeenCalledTimes(1);
        expect(second).toHaveBeenCalledTimes(1);
    });

    it("keeps non-Escape keys on the forward first-registered-wins order", () => {
        const first = vi.fn();
        const second = vi.fn();
        register("k", first);
        register("k", second);

        window.dispatchEvent(new KeyboardEvent("keydown", { key: "k" }));

        // Forward first-match: the FIRST-registered handler wins for non-Escape.
        expect(first).toHaveBeenCalledTimes(1);
        expect(second).not.toHaveBeenCalled();
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

    it("speaks a combo for an accessible name, canonical alias first", () => {
        // The spoken form reads the SAME alias table the matcher reads, so a label
        // can never drift from what the binding actually answers to.
        expect(formatComboLabel("delete")).toBe("Delete or Backspace");
        expect(formatComboLabel("enter")).toBe("Enter or Return");
        // `esc` is an abbreviation of the canonical word — not a second thing to say.
        expect(formatComboLabel("escape")).toBe("Escape");
        expect(formatComboLabel("space")).toBe("Space");
        expect(formatComboLabel("mod+shift+z")).toBe(
            isMac ? "Command Shift Z" : "Control Shift Z",
        );
        expect(formatComboLabel("Shift+ArrowLeft")).toBe("Shift Left Arrow");
    });

    it("ignores a keydown another layer already consumed", () => {
        const handler = register("k");

        const e = new KeyboardEvent("keydown", { key: "k", cancelable: true });
        e.preventDefault();
        window.dispatchEvent(e);

        expect(handler).not.toHaveBeenCalled();
    });

    it("barriers app bindings behind a suspension and restores them on resume", () => {
        const app = register("k");
        const resume = suspendShortcuts();

        window.dispatchEvent(new KeyboardEvent("keydown", { key: "k" }));
        expect(app).not.toHaveBeenCalled();

        // Registered AFTER the barrier — the modal's own binding still answers.
        const modal = register("k");
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "k" }));
        expect(modal).toHaveBeenCalledTimes(1);
        expect(app).not.toHaveBeenCalled();

        resume();
        resume(); // idempotent — a second release pops nothing else off the stack.
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "k" }));
        // Forward first-match order is unchanged by the round trip: `app` registered
        // first, so it wins again.
        expect(app).toHaveBeenCalledTimes(1);
        expect(modal).toHaveBeenCalledTimes(1);
    });

    it("holds FIFO inside a layer — a late registrant cannot shadow the modal's Delete", () => {
        const resume = suspendShortcuts();
        const modalDelete = register("Delete");
        const lateDelete = register("Delete");

        window.dispatchEvent(new KeyboardEvent("keydown", { key: "Backspace" }));

        expect(modalDelete).toHaveBeenCalledTimes(1);
        expect(lateDelete).not.toHaveBeenCalled();
        resume();
    });

    it("lets Escape through the barrier, still LIFO", () => {
        const app = vi.fn();
        register("Escape", app, { allowInInput: true });
        const resume = suspendShortcuts();

        // Escape ignores the barrier: the app's dismissal is the only one on the
        // stack, so it fires even though it was registered before the suspension.
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
        expect(app).toHaveBeenCalledTimes(1);

        // A modal registered after the barrier is still top-most for Escape.
        const modal = vi.fn();
        register("Escape", modal, { allowInInput: true });
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
        expect(modal).toHaveBeenCalledTimes(1);
        expect(app).toHaveBeenCalledTimes(1);
        resume();
    });
});
