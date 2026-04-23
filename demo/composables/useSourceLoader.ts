import { ref, watch, type Ref } from "vue";

export type RawLoader = () => Promise<string>;
export type RawModuleMap = Record<string, RawLoader>;

/**
 * Returns raw source strings for the story files whose paths are in `paths`.
 *
 * Callers must pre-build the module map at their own call-site because Vite
 * requires `import.meta.glob` patterns to be static string literals. A typical
 * consumer invokes it like:
 *
 *   const modules = import.meta.glob('../stories/** /*.vue',
 *     { query: '?raw', import: 'default', eager: false }) as RawModuleMap
 *   const sources = useSourceLoader(modules, toRef(() => story.sourceFiles ?? []))
 *
 * The caller still names the glob for documentation purposes via the optional
 * `label` arg.
 */
export function useSourceLoader(
    modules: RawModuleMap,
    paths: Ref<string[] | undefined> | Ref<string[]>,
): Ref<Record<string, string>> {
    const sources = ref<Record<string, string>>({});

    async function resolve(path: string): Promise<string> {
        const loader = modules[path];
        if (loader) {
            try {
                return await loader();
            } catch {
                /* fall through to fetch */
            }
        }
        try {
            const res = await fetch(path);
            if (res.ok) return await res.text();
        } catch {
            /* swallow */
        }
        return "";
    }

    watch(
        () => (paths as Ref<string[] | undefined>).value ?? [],
        async (list) => {
            const next: Record<string, string> = {};
            await Promise.all(
                list.map(async (p) => {
                    next[p] = await resolve(p);
                }),
            );
            sources.value = next;
        },
        { immediate: true },
    );

    return sources;
}
