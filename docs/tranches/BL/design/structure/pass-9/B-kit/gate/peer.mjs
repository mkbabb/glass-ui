// peer.mjs — B18's reader (LAW §5 "Peer classes", P7-R1): an entry's declared peer class holds
// over its static closure. The gate (B18) judges the two source arms; the kit's probe
// (tools/peer-closure.mjs) imports this file and adds the dist arm, which needs a build.
//
// The declarations are the root barrel's own table, "Heavy-peer exclusions", which the barrel
// cites and S55 moved beside it (src/README.md), read here and nowhere else: the heavy peers are the packages its Peer column names; the root
// is free of every one ("vueuse-free AND keyframes.js-free"); a row whose Peer column reads
// "(none …)" declares its subpath free of every one. Every other entry may bear a peer. A
// table this reader cannot find or read throws (no verdict), never an empty class.
//
// Both arms walk static value-level edges only (import, side-effect import, re-export, SFC
// script src). `import type`, type-only re-exports and dynamic `import()` load nothing when a
// module evaluates.
//   names  every runtime name the entry publishes: the closure of the file that declares it
//          (the floor's symbol origins). A runtime name is one the surface pin
//          (records/surface-pin.json) lists as runtime, or one it does not list at all.
//   files  the entry source through every door it reads: an unbundled evaluation of the
//          source barrels, so a door that mixes classes drags its heavy names into a reader.
const STATIC = new Set(["import", "import-side-effect", "reexport", "reexport-star", "reexport-ns", "sfc-script-src"]);
export const PEER_TABLE = "src/README.md";
export const SURFACE_PIN = "scripts/structure/records/surface-pin.json";

/** The declared classes from the root barrel's table: { heavy, free: { entryKey: [peer…] } }. */
export function declaredClasses(text, table = PEER_TABLE) {
    const at = text.indexOf("Heavy-peer exclusions");
    const end = text.indexOf("Mechanism:", at);
    if (at < 0 || end < 0) throw new Error(`peer: ${table} holds no "Heavy-peer exclusions" table; B18 has no declared class to judge`);
    const block = text.slice(at, end).split("\n").map((l) => l.replace(/^\s*\/\/ ?/, ""));
    const heavy = new Set(), freeRows = [];
    for (const line of block) {
        const m = /(?:^|\s)@mkbabb\/glass-ui\/([\w-]+)\s+(\S.*?)\s*$/.exec(line);
        if (!m) continue;
        const [sub, key, peer] = [`@mkbabb/glass-ui/${m[1]}`, `./${m[1]}`, m[2]];
        if (peer.startsWith("(none")) freeRows.push(key);
        else if (/^@[\w.-]+\/[\w.-]+$|^[\w.-]+$/.test(peer)) heavy.add(peer);
        else throw new Error(`peer: ${table}: the row for ${sub} names no peer ("${peer}")`);
    }
    const prose = block.join(" ");
    if (!heavy.size) throw new Error(`peer: ${table}'s table names no heavy peer`);
    if (!/root barrel is \*\*vueuse-free\*\* AND \*\*keyframes\.js-free\*\*/.test(prose)) throw new Error(`peer: ${table} no longer states the root barrel's class`);
    const all = [...heavy].sort();
    return { heavy: all, free: Object.fromEntries([[".", all], ...freeRows.map((k) => [k, all])]) };
}

/** A closure reader over the graph's static value edges: (starts) → { files, peers: { peer: "from:line" } }. */
export function peerClosure(g, heavy) {
    const out = new Map();
    for (const e of g.edges) {
        if (!STATIC.has(e.kind) || e.typeOnly) continue;
        if (!out.has(e.from)) out.set(e.from, []);
        out.get(e.from).push(e);
    }
    return (starts) => {
        const seen = new Set(starts), peers = new Map(), stack = [...starts];
        while (stack.length) {
            const f = stack.pop();
            for (const e of out.get(f) ?? []) {
                if (e.via === "package" && heavy.includes(e.external)) { if (!peers.has(e.external)) peers.set(e.external, `${e.from}:${e.line}`); continue; }
                if (e.to && !e.dir && !seen.has(e.to)) { seen.add(e.to); stack.push(e.to); }
            }
        }
        return { files: seen.size, peers: Object.fromEntries(peers) };
    };
}

/** The names and files arms of every declared-free entry: names maps a peer to { name: witness } for
 *  each published runtime name whose module reaches it; files maps a peer to its first witness. */
export function peerArms(g, O, table = PEER_TABLE) {
    const T = g.tree;
    const D = declaredClasses(T.read(table), table);
    const surface = JSON.parse(T.read(SURFACE_PIN)).entries;
    const closure = peerClosure(g, D.heavy);
    const entries = {};
    for (const [name, src] of g.record.js) {
        const key = name === "index" ? "." : `./${name}`;
        const free = D.free[key];
        if (!free) continue;
        const ex = O.exportsOf(src);
        const listed = new Set([...(surface[key]?.runtime ?? []), ...(surface[key]?.types ?? [])]);
        const runtime = [...ex.keys()].filter((n) => (surface[key]?.runtime ?? []).includes(n) || !listed.has(n));
        const origins = new Map();
        for (const n of runtime) for (const o of ex.get(n) ?? []) { if (!origins.has(o.file)) origins.set(o.file, []); origins.get(o.file).push(n); }
        const names = {};
        for (const [file, ns] of origins) {
            const c = closure([file]);
            for (const p of Object.keys(c.peers)) if (free.includes(p)) for (const n of ns) (names[p] ??= {})[n] = `${n} (${file}; first at ${c.peers[p]})`;
        }
        const fc = closure([src]);
        const files = Object.fromEntries(Object.entries(fc.peers).filter(([p]) => free.includes(p)).map(([p, at]) => [p, `${src} → … first at ${at}`]));
        entries[key] = { source: src, free, runtimeNames: runtime.length, origins: origins.size, closureFiles: fc.files, names, files };
    }
    for (const key of Object.keys(D.free)) if (!entries[key]) throw new Error(`peer: ${table} declares ${key}, which the entry record does not publish`);
    return { declared: D, entries, closure };
}
