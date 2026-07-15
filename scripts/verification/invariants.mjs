import { readFile } from "node:fs/promises";
import { isAbsolute, resolve } from "node:path";

const INVARIANT_PATH = "docs/tranches/BI/FORMATION/invariants.json";
const KINDS = new Set(["device-free", "browser"]);
const MODES = new Set(["local", "ci", "release"]);
const EXECUTABLE_KEYS = new Set([
    "argv",
    "caseId",
    "command",
    "executable",
    "gateId",
    "packageScript",
    "script",
    "table",
]);

export function isPlainObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
}

function pushUnknownExecutableKeys(value, path, errors) {
    if (Array.isArray(value)) {
        value.forEach((item, index) => pushUnknownExecutableKeys(item, `${path}[${index}]`, errors));
        return;
    }
    if (!isPlainObject(value)) return;
    for (const [key, nested] of Object.entries(value)) {
        if (EXECUTABLE_KEYS.has(key)) {
            errors.push(`${path}.${key}: semantic invariants cannot own executable identities`);
        }
        pushUnknownExecutableKeys(nested, `${path}.${key}`, errors);
    }
}

export function validateInvariantTaxonomy(value) {
    const errors = [];
    if (!isPlainObject(value)) {
        return { ok: false, errors: ["taxonomy: expected an object"] };
    }

    if (value.schemaVersion !== 1) errors.push("schemaVersion: expected 1");
    if (!/^[0-9a-f]{40}$/.test(value.sourceBase ?? "")) {
        errors.push("sourceBase: expected a full lowercase Git object id");
    }
    if (value.normativeCount !== false) {
        errors.push("normativeCount: must be false; the family count is not an acceptance oracle");
    }
    if (value.executableIdentities !== 0) {
        errors.push("executableIdentities: semantic families cannot be independently executable");
    }
    if (!Array.isArray(value.invariants) || value.invariants.length === 0) {
        errors.push("invariants: expected a non-empty array");
        return { ok: false, errors };
    }
    if (value.count !== value.invariants.length) {
        errors.push("count: descriptive count must match the discovered array length");
    }

    const ids = new Set();
    for (const [index, invariant] of value.invariants.entries()) {
        const path = `invariants[${index}]`;
        if (!isPlainObject(invariant)) {
            errors.push(`${path}: expected an object`);
            continue;
        }
        if (!/^[a-z]+(?:[.-][a-z]+)+$/.test(invariant.id ?? "")) {
            errors.push(`${path}.id: expected a semantic dotted identifier`);
        } else if (ids.has(invariant.id)) {
            errors.push(`${path}.id: duplicate ${invariant.id}`);
        } else {
            ids.add(invariant.id);
        }
        if (!isNonEmptyString(invariant.domain)) errors.push(`${path}.domain: expected a non-empty string`);
        if (!KINDS.has(invariant.kind)) errors.push(`${path}.kind: expected device-free or browser`);
        if (!Array.isArray(invariant.modes) || invariant.modes.length === 0) {
            errors.push(`${path}.modes: expected at least one mode`);
        } else {
            const modes = new Set(invariant.modes);
            if (modes.size !== invariant.modes.length) errors.push(`${path}.modes: duplicate mode`);
            for (const mode of modes) {
                if (!MODES.has(mode)) errors.push(`${path}.modes: unsupported mode ${String(mode)}`);
            }
        }
        if (!isNonEmptyString(invariant.invariant)) errors.push(`${path}.invariant: expected present-tense property text`);
        if (!isNonEmptyString(invariant.oracle)) errors.push(`${path}.oracle: expected semantic evidence guidance`);
        if (!Array.isArray(invariant.bites) || invariant.bites.length === 0 || invariant.bites.some((bite) => !isNonEmptyString(bite))) {
            errors.push(`${path}.bites: expected at least one realistic non-empty mutation`);
        }
        pushUnknownExecutableKeys(invariant, path, errors);
    }

    return { ok: errors.length === 0, errors };
}

export async function loadInvariantTaxonomy(rootOrPath = process.cwd()) {
    const path = isAbsolute(rootOrPath)
        ? rootOrPath.endsWith(".json")
            ? rootOrPath
            : resolve(rootOrPath, INVARIANT_PATH)
        : resolve(rootOrPath, INVARIANT_PATH);
    const value = JSON.parse(await readFile(path, "utf8"));
    const validation = validateInvariantTaxonomy(value);
    if (!validation.ok) {
        throw new Error(`invalid invariant taxonomy at ${path}:\n${validation.errors.join("\n")}`);
    }
    return value;
}

export function selectInvariantFamilies(taxonomy, requestedIds, profile = "local") {
    const validation = validateInvariantTaxonomy(taxonomy);
    if (!validation.ok) throw new Error(validation.errors.join("\n"));
    if (!Array.isArray(requestedIds) || requestedIds.length === 0) {
        throw new Error("at least one semantic invariant family must be selected by wave authority");
    }
    if (new Set(requestedIds).size !== requestedIds.length) {
        throw new Error("selected invariant families must be unique");
    }

    const mode = profile === "commit" || profile === "bootstrap" || profile === "native" ? "local" : profile;
    if (!MODES.has(mode)) throw new Error(`unsupported verification profile: ${profile}`);
    const byId = new Map(taxonomy.invariants.map((invariant) => [invariant.id, invariant]));
    return requestedIds.map((id) => {
        const invariant = byId.get(id);
        if (!invariant) throw new Error(`unknown invariant family: ${id}`);
        if (!invariant.modes.includes(mode)) {
            throw new Error(`invariant family ${id} is not applicable to ${profile}`);
        }
        if (profile === "ci" && invariant.kind === "browser") {
            throw new Error(`browser invariant family ${id} cannot claim device-free CI evidence`);
        }
        return invariant;
    });
}

export const invariantTaxonomyPath = INVARIANT_PATH;
