import { computed, type MaybeRef, toValue } from "vue";

/**
 * Splits text into per-character `<span>` elements with `--char-index` CSS custom
 * properties for staggered animation. Use with the `.char-stagger` CSS class.
 *
 * @example
 * ```vue
 * <template>
 *   <h1 class="char-stagger" v-html="chars" />
 * </template>
 * <script setup>
 * const chars = useCharSplit('Hello World');
 * </script>
 * ```
 */
export function useCharSplit(text: MaybeRef<string>) {
    return computed(() => {
        const str = toValue(text);
        return Array.from(str)
            .map((char, i) => {
                if (char === " ") return " ";
                const escaped = char
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;");
                return `<span class="char" style="--char-index:${i}">${escaped}</span>`;
            })
            .join("");
    });
}
