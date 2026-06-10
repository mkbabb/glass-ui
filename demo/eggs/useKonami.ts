// The konami-code detector (E2). A keystroke-buffer match for
// ↑↑↓↓←→←→ B A — when the rolling buffer ends with the sequence, fire the
// callback. Gated off input focus (the existing registry guard shape) so it
// never triggers while typing.
import { onMounted, onBeforeUnmount } from "vue";

const KONAMI = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
];

function isEditable(target: EventTarget | null): boolean {
    const el = target as HTMLElement | null;
    if (!el) return false;
    const tag = el.tagName;
    return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        el.isContentEditable === true
    );
}

export function useKonami(onMatch: () => void): void {
    const buffer: string[] = [];

    function onKey(e: KeyboardEvent) {
        if (isEditable(e.target)) return;
        // Normalize letter keys to lowercase; arrows keep their code.
        const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        buffer.push(key);
        if (buffer.length > KONAMI.length) buffer.shift();
        if (
            buffer.length === KONAMI.length &&
            buffer.every((k, i) => k === KONAMI[i])
        ) {
            buffer.length = 0;
            onMatch();
        }
    }

    onMounted(() => window.addEventListener("keydown", onKey));
    onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
}
