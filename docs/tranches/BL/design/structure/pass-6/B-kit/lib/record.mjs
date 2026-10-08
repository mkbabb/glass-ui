// record.mjs — text edits to the floor's entry record in its own layout (one entry per line):
// the doors list, sorted, and CSS dist names. Every B row that changes the record goes here.
export function withDoors(text, doors) {
    const sorted = [...new Set(doors)].sort();
    const body = sorted.map((d) => `        ${JSON.stringify(d)}`).join(",\n");
    const out = text.replace(/"doors": \[[^\]]*\]/, `"doors": [\n${body}\n    ]`);
    if (out === text && !text.includes(`"doors": [\n${body}\n    ]`)) throw new Error("record: doors list not found");
    return out;
}
export const doorsOf = (text) => JSON.parse(text).doors;
