// --- Key position types and QWERTY map ---

export interface KeyPosition {
    row: number;
    col: number;
    finger: "pinky" | "ring" | "middle" | "index" | "thumb";
    hand: "left" | "right";
}

export const QWERTY_MAP: Record<string, KeyPosition> = {
    // Row 0 - Numbers row
    "1": { row: 0, col: 1, finger: "pinky", hand: "left" },
    "2": { row: 0, col: 2, finger: "ring", hand: "left" },
    "3": { row: 0, col: 3, finger: "middle", hand: "left" },
    "4": { row: 0, col: 4, finger: "index", hand: "left" },
    "5": { row: 0, col: 5, finger: "index", hand: "left" },
    "6": { row: 0, col: 6, finger: "index", hand: "right" },
    "7": { row: 0, col: 7, finger: "index", hand: "right" },
    "8": { row: 0, col: 8, finger: "middle", hand: "right" },
    "9": { row: 0, col: 9, finger: "ring", hand: "right" },
    "0": { row: 0, col: 10, finger: "pinky", hand: "right" },

    // Row 1 - QWERTY row
    q: { row: 1, col: 1, finger: "pinky", hand: "left" },
    w: { row: 1, col: 2, finger: "ring", hand: "left" },
    e: { row: 1, col: 3, finger: "middle", hand: "left" },
    r: { row: 1, col: 4, finger: "index", hand: "left" },
    t: { row: 1, col: 5, finger: "index", hand: "left" },
    y: { row: 1, col: 6, finger: "index", hand: "right" },
    u: { row: 1, col: 7, finger: "index", hand: "right" },
    i: { row: 1, col: 8, finger: "middle", hand: "right" },
    o: { row: 1, col: 9, finger: "ring", hand: "right" },
    p: { row: 1, col: 10, finger: "pinky", hand: "right" },

    // Row 2 - ASDF row (home row)
    a: { row: 2, col: 1, finger: "pinky", hand: "left" },
    s: { row: 2, col: 2, finger: "ring", hand: "left" },
    d: { row: 2, col: 3, finger: "middle", hand: "left" },
    f: { row: 2, col: 4, finger: "index", hand: "left" },
    g: { row: 2, col: 5, finger: "index", hand: "left" },
    h: { row: 2, col: 6, finger: "index", hand: "right" },
    j: { row: 2, col: 7, finger: "index", hand: "right" },
    k: { row: 2, col: 8, finger: "middle", hand: "right" },
    l: { row: 2, col: 9, finger: "ring", hand: "right" },
    ";": { row: 2, col: 10, finger: "pinky", hand: "right" },

    // Row 3 - ZXCV row
    z: { row: 3, col: 1, finger: "pinky", hand: "left" },
    x: { row: 3, col: 2, finger: "ring", hand: "left" },
    c: { row: 3, col: 3, finger: "middle", hand: "left" },
    v: { row: 3, col: 4, finger: "index", hand: "left" },
    b: { row: 3, col: 5, finger: "index", hand: "left" },
    n: { row: 3, col: 6, finger: "index", hand: "right" },
    m: { row: 3, col: 7, finger: "index", hand: "right" },
    ",": { row: 3, col: 8, finger: "middle", hand: "right" },
    ".": { row: 3, col: 9, finger: "ring", hand: "right" },
    "/": { row: 3, col: 10, finger: "pinky", hand: "right" },

    // Space bar
    " ": { row: 4, col: 5, finger: "thumb", hand: "right" },

    // Common punctuation
    "'": { row: 2, col: 11, finger: "pinky", hand: "right" },
    '"': { row: 2, col: 11, finger: "pinky", hand: "right" },
    "?": { row: 3, col: 10, finger: "pinky", hand: "right" },
    "!": { row: 0, col: 1, finger: "pinky", hand: "left" },
    "-": { row: 0, col: 11, finger: "pinky", hand: "right" },
    "=": { row: 0, col: 12, finger: "pinky", hand: "right" },
};

// --- Key delay calculation ---

export const calculateKeyDelay = (prevChar: string, nextChar: string): number => {
    const prev = QWERTY_MAP[prevChar.toLowerCase()];
    const next = QWERTY_MAP[nextChar.toLowerCase()];

    if (!prev || !next) return 250;

    // Fastest: alternating hands
    if (prev.hand !== next.hand) {
        return 150 + Math.random() * 50;
    }

    // Same key pressed twice
    if (prev.row === next.row && prev.col === next.col) {
        return 350 + Math.random() * 100;
    }

    // Adjacent fingers, same hand
    const colDiff = Math.abs(prev.col - next.col);
    if (colDiff === 1 && prev.row === next.row) {
        return 180 + Math.random() * 40;
    }

    // Home row combinations
    if (prev.row === 2 && next.row === 2) {
        return 200 + Math.random() * 50;
    }

    // Reaching from home row
    if ((prev.row === 2 && next.row !== 2) || (prev.row !== 2 && next.row === 2)) {
        return 280 + Math.random() * 70;
    }

    // Bottom row with pinky/ring fingers
    if (
        (prev.row === 3 || next.row === 3) &&
        (["pinky", "ring"].includes(prev.finger) || ["pinky", "ring"].includes(next.finger))
    ) {
        return 320 + Math.random() * 80;
    }

    // Large movements
    const rowDiff = Math.abs(prev.row - next.row);
    if (rowDiff > 1 || colDiff > 2) {
        return 300 + Math.random() * 100;
    }

    // Default
    return 250 + Math.random() * 50;
};

// --- Adjacency map for typo generation ---

/** Physical row stagger offsets (in key-width units) */
const ROW_STAGGER: Record<number, number> = {
    0: 0,
    1: 0.25,
    2: 0.5,
    3: 0.75,
    4: 0, // space bar row
};

/** Maximum distance for keys to be considered adjacent */
const MAX_DISTANCE = 1.2;
const MAX_ROW_DIFF = 1;

function physicalDistance(a: KeyPosition, b: KeyPosition): number {
    const staggerA = ROW_STAGGER[a.row] ?? 0;
    const staggerB = ROW_STAGGER[b.row] ?? 0;
    const dx = a.col + staggerA - (b.col + staggerB);
    const dy = a.row - b.row;
    return Math.sqrt(dx * dx + dy * dy);
}

/** Precomputed adjacency: for each key char, the list of adjacent key chars */
const ADJACENCY_MAP: Record<string, string[]> = {};

// Build adjacency map at module load
const alphaKeys = Object.entries(QWERTY_MAP).filter(([ch]) => /^[a-z]$/.test(ch));
for (const [charA, posA] of alphaKeys) {
    const neighbors: string[] = [];
    for (const [charB, posB] of alphaKeys) {
        if (charA === charB) continue;
        if (Math.abs(posA.row - posB.row) > MAX_ROW_DIFF) continue;
        if (physicalDistance(posA, posB) <= MAX_DISTANCE) {
            neighbors.push(charB);
        }
    }
    ADJACENCY_MAP[charA] = neighbors;
}

export function getAdjacentKeys(char: string): string[] {
    return ADJACENCY_MAP[char.toLowerCase()] ?? [];
}

/**
 * Pick a plausible typo character for the intended character.
 * Weighted: same-finger 2x, same-hand 1.5x, other 1x.
 * Preserves case. Falls back to home row for unmapped chars.
 */
export function pickTypoChar(intendedChar: string): string {
    const lower = intendedChar.toLowerCase();
    const isUpper = intendedChar !== lower;
    const intended = QWERTY_MAP[lower];
    const adjacent = ADJACENCY_MAP[lower];

    // Fallback: random home row key
    if (!intended || !adjacent || adjacent.length === 0) {
        const homeRow = "asdfghjkl";
        const fallback = homeRow[Math.floor(Math.random() * homeRow.length)];
        return isUpper ? fallback.toUpperCase() : fallback;
    }

    // Build weighted pool
    const pool: { char: string; weight: number }[] = [];
    for (const adj of adjacent) {
        const pos = QWERTY_MAP[adj];
        if (!pos) continue;

        let weight = 1;
        if (pos.finger === intended.finger) {
            weight = 2;
        } else if (pos.hand === intended.hand) {
            weight = 1.5;
        }
        pool.push({ char: adj, weight });
    }

    // Weighted random selection
    const totalWeight = pool.reduce((sum, p) => sum + p.weight, 0);
    let roll = Math.random() * totalWeight;
    for (const entry of pool) {
        roll -= entry.weight;
        if (roll <= 0) {
            return isUpper ? entry.char.toUpperCase() : entry.char;
        }
    }

    throw new Error(
        "[typewriter:weighted-pool] pool exhausted without selection — " +
        "invariant violation; ADJACENCY_MAP integrity check needed.",
    );
}
