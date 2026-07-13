// useCodeHighlight — the lazy highlight.js runtime the <CodeBlock> paints color
// through (BI.W-CODEBLOCK).
//
// The delivery is RUNTIME-LAZY (G2 / story/PASS-1.md §4.2): glass-ui snippets are
// authored inline literals, not `?source` file imports, so the value.js build-time
// file plugin does not apply. The model is DEFERRED COLOR, never deferred content:
// the raw fira-code text paints from frame 0 (real selectable text, copied text
// === source), and the lazy `import("highlight.js/lib/core")` swaps the
// highlighted innerHTML only ONCE the chunk resolves. A dead hljs chunk leaves
// legible mono forever — no-masking-fallback, never a blank box (the primary works
// in paint or fails to legible text, never to nothing).
//
// hljs stays entirely out of `dist/glass-ui.js` — it is a demo devDependency the
// demo bundle code-splits (the `import()` mints its own chunk), so the library's
// critical-path weight is untouched.
import { onMounted, watch, type Ref } from "vue";

// The grammar set — ts (covers js), xml (covers Vue templates + html), css, bash.
// Four grammars cover every authored snippet register in the storybook.
type Hljs = {
    registerLanguage: (name: string, def: unknown) => void;
    getLanguage: (name: string) => unknown;
    highlight: (code: string, opts: { language: string }) => { value: string };
    highlightAuto: (code: string, langs?: string[]) => { value: string };
};

// A single shared load promise — the core + grammars resolve ONCE per session and
// every subsequent block reuses the registered instance (idempotent registration).
let hljsPromise: Promise<Hljs> | null = null;

function loadHljs(): Promise<Hljs> {
    if (!hljsPromise) {
        hljsPromise = (async () => {
            const [core, ts, xml, css, bash] = await Promise.all([
                import("highlight.js/lib/core"),
                import("highlight.js/lib/languages/typescript"),
                import("highlight.js/lib/languages/xml"),
                import("highlight.js/lib/languages/css"),
                import("highlight.js/lib/languages/bash"),
            ]);
            const hljs = core.default as unknown as Hljs;
            hljs.registerLanguage("typescript", ts.default);
            // ts grammar is the js superset — one register serves both dialects.
            hljs.registerLanguage("javascript", ts.default);
            hljs.registerLanguage("xml", xml.default);
            hljs.registerLanguage("css", css.default);
            hljs.registerLanguage("bash", bash.default);
            return hljs;
        })();
    }
    return hljsPromise;
}

// The authored `lang` label → a registered grammar name. Unknown labels fall
// through to `highlightAuto` over the four registered grammars.
const LANG_GRAMMAR: Record<string, string> = {
    ts: "typescript",
    tsx: "typescript",
    typescript: "typescript",
    js: "javascript",
    jsx: "javascript",
    javascript: "javascript",
    vue: "xml",
    html: "xml",
    xml: "xml",
    svg: "xml",
    css: "css",
    scss: "css",
    bash: "bash",
    sh: "bash",
    shell: "bash",
};

// The idempotent marker: a `<pre>` already carrying the swapped innerHTML is not
// re-highlighted for the same text (the π arm reads this attr to assert "the lazy
// chunk resolved").
const HIGHLIGHTED_ATTR = "data-hljs-highlighted";

export interface UseCodeHighlightOptions {
    /** The authored language label (`ts`/`vue`/`css`/`bash`/…). Optional → auto-detect. */
    lang?: Ref<string | undefined>;
    /** The raw source text to highlight — read live off the rendered `<pre>`. */
    text: () => string;
}

/**
 * Swap the `<pre>`'s innerHTML for hljs-highlighted markup once the lazy chunk
 * resolves. The raw text is ALREADY painted by Vue before this runs — highlighting
 * only re-colors it. Re-runs when the source text changes.
 */
export function useCodeHighlight(
    preRef: Ref<HTMLElement | null>,
    opts: UseCodeHighlightOptions,
): void {
    async function highlight(): Promise<void> {
        const el = preRef.value;
        const raw = opts.text();
        if (!el || !raw) return;

        // Best-effort COLOR: a failed chunk (offline, missing dep) leaves the raw
        // fira-code text Vue already painted — legible mono, never a blank box
        // (no-masking-fallback). The primary is the text; color is the enhancement.
        let hljs: Hljs;
        try {
            hljs = await loadHljs();
        } catch {
            return;
        }

        // Re-validate after the await — the block may have unmounted, or the text
        // may have changed (a newer `highlight()` run owns it). Never clobber.
        if (preRef.value !== el || opts.text() !== raw) return;

        const label = opts.lang?.value?.toLowerCase();
        const grammar = label ? LANG_GRAMMAR[label] : undefined;
        let value: string;
        try {
            value = (
                grammar && hljs.getLanguage(grammar)
                    ? hljs.highlight(raw, { language: grammar })
                    : hljs.highlightAuto(raw, ["typescript", "xml", "css", "bash"])
            ).value;
        } catch {
            return;
        }

        // The deferred-COLOR swap: identical text, now wrapped in `.hljs-*` spans.
        // Box-identical to the raw paint (same font, same box) → CLS 0.
        el.innerHTML = value;
        el.setAttribute(HIGHLIGHTED_ATTR, "");
    }

    onMounted(highlight);
    // `post` flush so a code-prop change re-highlights AFTER Vue has repainted the
    // raw text into the `<pre>` (the raw paint always leads, color follows).
    watch(() => opts.text(), highlight, { flush: "post" });
}
