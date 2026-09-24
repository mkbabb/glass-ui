// dominance.mjs — immediate dominators (Cooper, Harvey, Kennedy, "A Simple, Fast Dominance
// Algorithm", 2001) over a directed graph given as successor sets, from one start node.
// Nodes unreachable from the start have no dominator and are returned in `unreached`.
//   idoms(succ: Map<node, Set<node>>, start) → { idom: Map<node, node>, rpo: node[], unreached: node[] }
export function idoms(succ, start) {
    const order = [];
    const seen = new Set();
    // iterative DFS postorder (deep unit graphs would overflow a recursive walk)
    const stack = [[start, [...(succ.get(start) ?? [])].sort()]];
    seen.add(start);
    while (stack.length) {
        const top = stack[stack.length - 1];
        const next = top[1].shift();
        if (next === undefined) { order.push(top[0]); stack.pop(); continue; }
        if (seen.has(next)) continue;
        seen.add(next);
        stack.push([next, [...(succ.get(next) ?? [])].sort()]);
    }
    const rpo = order.reverse();
    const index = new Map(rpo.map((n, i) => [n, i]));
    const pred = new Map(rpo.map((n) => [n, []]));
    for (const n of rpo) for (const s of succ.get(n) ?? []) if (index.has(s)) pred.get(s).push(n);
    const idom = new Map([[start, start]]);
    const intersect = (a, b) => {
        while (a !== b) {
            while (index.get(a) > index.get(b)) a = idom.get(a);
            while (index.get(b) > index.get(a)) b = idom.get(b);
        }
        return a;
    };
    for (let changed = true; changed;) {
        changed = false;
        for (const n of rpo) {
            if (n === start) continue;
            let d;
            for (const p of pred.get(n)) if (idom.has(p)) d = d === undefined ? p : intersect(p, d);
            if (d !== undefined && idom.get(n) !== d) { idom.set(n, d); changed = true; }
        }
    }
    const unreached = [...succ.keys()].filter((n) => !seen.has(n));
    return { idom, rpo, unreached };
}
