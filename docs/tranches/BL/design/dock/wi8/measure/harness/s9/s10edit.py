# s10edit.py <worktree>: S10 (RU-104): the units and types the branch broke. The overfit gate's export reach (two exports
# no module outside their own reads: module-private), its no-shim arm (`void t;` in the seat sweep), and the test
# config's TS2347 in DockOutlet.test.ts:64 (a type argument on an untyped call).
import sys
W = sys.argv[1]
def edit(p, pairs):
    s = open(W + "/" + p).read()
    for old, new in pairs:
        c = s.count(old); assert c == 1, (p, c, old[:100]); s = s.replace(old, new)
    open(W + "/" + p, "w").write(s)
edit("src/components/dock/composables/dockRegistry.ts", [("export const dockOutletWants = ", "const dockOutletWants = ")])
edit("src/components/dock/composables/useDockBody.ts", [
 ("export const DOCK_BODY_KEY: InjectionKey<DockBody> = ", "const DOCK_BODY_KEY: InjectionKey<DockBody> = "),
 ("""        for (const [el, t] of seats) {
            if (seen.has(el)) continue;
            el.style.removeProperty("translate");
            el.style.removeProperty("clip-path");
            seats.delete(el);
            void t;
        }""", """        for (const el of seats.keys()) {
            if (seen.has(el)) continue;
            el.style.removeProperty("translate");
            el.style.removeProperty("clip-path");
            seats.delete(el);
        }"""),
])
edit("tests/components/custom/dock/DockOutlet.test.ts", [("        const run = w.element.querySelector<HTMLElement>(\"#d1 .dock-run\")!;", "        const run = w.element.querySelector(\"#d1 .dock-run\") as HTMLElement;")])
print("s10 edits applied")
