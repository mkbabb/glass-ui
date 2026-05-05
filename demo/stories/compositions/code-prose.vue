<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { Card } from "@/components/ui/card";
import { CreamSurface } from "@/components/custom/cream-surface";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { LiveSnippet } from "@/components/custom/live-snippet";

// Opt-in import — consumers add this line per code-prose page that needs
// syntax highlighting. The container styling lands even without a Prism
// runtime; the `.token.*` rules become live as soon as Prism is wired in.
import "@/styles/prism-theme.css";

async function runMockSnippet(): Promise<{ result?: unknown; error?: Error }> {
    await new Promise((r) => setTimeout(r, 500));
    return { result: { answer: 42, computedAt: new Date().toISOString() } };
}

// Pre-tokenized markup — emulates a `prism-react`-style render so the static
// container vocabulary is visible without bundling the Prism runtime in the
// demo. Replace with `Prism.highlight(...)` output in production.
const tokenized = `<span class="token keyword">import</span> { <span class="token function">useRAFLoop</span> } <span class="token keyword">from</span> <span class="token string">"@mkbabb/glass-ui"</span>;
<span class="token keyword">import</span> { <span class="token function">computed</span>, <span class="token function">ref</span> } <span class="token keyword">from</span> <span class="token string">"vue"</span>;

<span class="token keyword">const</span> <span class="token variable">progress</span> = <span class="token function">ref</span>(<span class="token number">0</span>);
<span class="token keyword">const</span> <span class="token variable">loop</span> = <span class="token function">useRAFLoop</span>(({ <span class="token variable">elapsed</span> }) =&gt; {
    <span class="token variable">progress</span>.value = (<span class="token variable">elapsed</span> % <span class="token number">1500</span>) / <span class="token number">1500</span>;
});
<span class="token comment">// loop.start() honors prefers-reduced-motion automatically.</span>`;
</script>

<template>
    <StoryPage>
        <!-- Hero copy: prose with inline .code-badge chips -->
        <Card variant="paper">
            <p class="section-label">recipe · code-prose</p>
            <h2 class="text-display-3 mt-[var(--space-phi-1)]">
                Inline chips, fenced blocks, runnable snippets.
            </h2>
            <p class="text-prose mt-[var(--space-phi-2)] text-foreground/85">
                A code-prose page mixes three rendering modes: inline
                <span class="code-badge">.code-badge</span>
                chips for type names and short references; fenced
                <span class="code-badge">&lt;pre&gt;&lt;code&gt;</span>
                blocks themed via the opt-in
                <span class="code-badge">prism-theme.css</span>
                stylesheet; and runnable
                <span class="code-badge">&lt;LiveSnippet&gt;</span>
                shells for examples that should execute in the page.
            </p>
            <p class="text-prose mt-[var(--space-phi-2)] text-foreground/85">
                The
                <span class="code-badge">.code-badge</span>
                pill consumes
                <span class="code-badge">--font-mono</span>
                +
                <span class="code-badge">--type-caption</span>
                and a
                <span class="code-badge">--radius-pill</span>
                rounded chassis — it sits inline alongside body text without breaking the
                vertical rhythm. Use it sparingly; the chip pulls focus.
            </p>
        </Card>

        <FlourishDivider tone="section-3" />

        <!-- Fenced block: <pre><code class="language-ts"> -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">Fenced · <code class="fira-code">language-ts</code></p>
            <CreamSurface tone="cool" class="overflow-hidden">
                <p class="text-prose mb-[var(--space-phi-2)] text-foreground/80">
                    The Prism container styling lands as soon as
                    <span class="code-badge">prism-theme.css</span>
                    is imported. Token colors arrive once a Prism runtime tokenizes the source —
                    the example below uses pre-tokenized markup to demo the theme in static form.
                </p>
                <pre class="language-ts"><code class="language-ts" v-html="tokenized" /></pre>
            </CreamSurface>
        </section>

        <FlourishDivider tone="section-3" />

        <!-- LiveSnippet runnable shell -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">Runnable · LiveSnippet</p>
            <p class="text-prose text-foreground/85">
                A <span class="code-badge">&lt;LiveSnippet&gt;</span> wraps a runnable example
                with idle/pending/success/error states and a BYO-engine slot pattern. The
                <span class="code-badge">onRun</span>
                prop returns
                <span class="code-badge">{ result, error? }</span>;
                everything else is presentation.
            </p>
            <LiveSnippet :on-run="runMockSnippet" run-label="Run example">
                <template #input>
                    <pre class="language-ts m-0"><code
                        class="language-ts"
                    >async function deepThought() {
    await sleep(500);
    return { answer: 42 };
}</code></pre>
                </template>
            </LiveSnippet>
        </section>

        <!-- Closing prose -->
        <Card variant="paper">
            <p class="text-prose-lettrine text-foreground/85">
                Documentation isn't decoration — it's the demo. A page that pairs prose with
                runnable code, themed by the same token cascade as the rest of the design system,
                stops being marketing and starts being product. The Prism theme bridge takes the
                <span class="code-badge">--viz-*</span>
                hue family and threads it through every token class so dark mode resolves
                without a JS handshake.
            </p>
        </Card>
    </StoryPage>
</template>
