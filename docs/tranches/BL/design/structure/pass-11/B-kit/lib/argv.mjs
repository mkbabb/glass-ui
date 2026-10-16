// argv.mjs — a kit judge's command line, read strictly (pass 11, P10-G2; LAW §14). A judge names the
// grammar it takes; every other shape is a throw, so a malformed command line is no verdict, never
// a reading:
//   - an option the judge does not take (a typo, `--baserun`) is a throw, never ignored;
//   - a value-taking option that is present with no value (last on the line), with an empty value,
//     or followed by another option (`--base --route r.json`) is a throw, never read as absent;
//   - a single-valued option given twice is a throw (which one is the input is not the judge's guess);
//   - a switch given twice, an empty positional, or more positionals than the judge takes is a throw.
// An absent option reads as absent (`value` returns null, `list` an empty list, `on` false); what
// absence means is the judge's own stated reading (LAW §14 lists each).
export function readArgs(tool, argv, { values = [], lists = [], switches = [], positionals = 0 } = {}) {
    const one = new Map(), many = new Map(lists.map((k) => [k, []])), on = new Set(), pos = [];
    for (let i = 0; i < argv.length; i++) {
        const t = argv[i];
        if (t.startsWith("-")) {
            if (switches.includes(t)) {
                if (on.has(t)) throw new Error(`${tool}: ${t} is given twice`);
                on.add(t);
                continue;
            }
            if (!values.includes(t) && !lists.includes(t)) throw new Error(`${tool}: ${t} is not an option it takes (it takes ${[...values, ...lists, ...switches].join(", ") || "none"})`);
            const v = argv[i + 1];
            if (v === undefined) throw new Error(`${tool}: ${t} is present with no value (it ends the command line)`);
            if (v === "") throw new Error(`${tool}: ${t} is present with an empty value`);
            if (v.startsWith("--")) throw new Error(`${tool}: ${t} is present with no value (it is followed by ${v})`);
            i++;
            if (lists.includes(t)) many.get(t).push(v);
            else {
                if (one.has(t)) throw new Error(`${tool}: ${t} is given twice`);
                one.set(t, v);
            }
            continue;
        }
        if (t === "") throw new Error(`${tool}: an empty argument`);
        pos.push(t);
    }
    if (pos.length > positionals) throw new Error(`${tool}: ${pos.length} positional argument(s) (${pos.join(" ")}); it takes ${positionals}`);
    return {
        value: (k) => (one.has(k) ? one.get(k) : null),
        list: (k) => many.get(k),
        on: (k) => on.has(k),
        positional: pos,
    };
}
