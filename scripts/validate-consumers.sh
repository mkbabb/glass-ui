#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
PARENT="$(dirname "$ROOT")"
CONSUMERS=(
    "fourier-analysis/web"
    "words/frontend"
    "bbnf-lang/playground"
)

echo "Consumer build validation"
echo "========================="

status=0
for consumer in "${CONSUMERS[@]}"; do
    consumer_dir="$PARENT/$consumer"

    echo
    echo "[$consumer] npm run build"
    echo "path: $consumer_dir"

    if [[ ! -d "$consumer_dir" ]]; then
        echo "[$consumer] FAIL: missing consumer directory"
        status=1
        continue
    fi

    if (cd "$consumer_dir" && time npm run build); then
        echo "[$consumer] PASS"
    else
        rc=$?
        echo "[$consumer] FAIL: npm run build exited $rc"
        status=1
    fi
done

echo
echo "Consumer package-contract validation"
echo "===================================="

if ROOT="$ROOT" PARENT="$PARENT" node --input-type=module <<'NODE'
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const parent = process.env.PARENT;

const packages = {
    glassUi: path.join(parent, "glass-ui"),
    keyframes: path.join(parent, "keyframes.js"),
    speedtest: path.join(parent, "speedtest"),
};

function readPackage(packageDir) {
    return JSON.parse(
        fs.readFileSync(path.join(packageDir, "package.json"), "utf8"),
    );
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function ok(message) {
    console.log(`ok: ${message}`);
}

function targetExists(packageDir, packageName, label, target) {
    assert(typeof target === "string", `${packageName} ${label} is not a string`);

    if (target.includes("*")) {
        const prefix = target.slice(0, target.indexOf("*"));
        const base = prefix.endsWith("/")
            ? prefix.slice(0, -1)
            : path.dirname(prefix);
        const absoluteBase = path.resolve(packageDir, base);

        assert(
            fs.existsSync(absoluteBase),
            `${packageName} ${label} wildcard base missing: ${target}`,
        );
        ok(`${packageName} ${label} wildcard base -> ${base}`);
        return;
    }

    const absoluteTarget = path.resolve(packageDir, target);

    assert(
        fs.existsSync(absoluteTarget),
        `${packageName} ${label} target missing: ${target}`,
    );
    ok(`${packageName} ${label} -> ${target}`);
}

function validateExportTargets(packageDir, packageName) {
    const pkg = readPackage(packageDir);

    if (pkg.main) {
        targetExists(packageDir, packageName, "main", pkg.main);
    }
    if (pkg.types) {
        targetExists(packageDir, packageName, "types", pkg.types);
    }

    assert(pkg.exports, `${packageName} has no exports field`);

    for (const [exportName, exportTarget] of Object.entries(pkg.exports)) {
        if (typeof exportTarget === "string") {
            targetExists(
                packageDir,
                packageName,
                `exports.${exportName}`,
                exportTarget,
            );
            continue;
        }

        if (exportTarget && typeof exportTarget === "object") {
            for (const condition of ["types", "import"]) {
                if (condition in exportTarget) {
                    targetExists(
                        packageDir,
                        packageName,
                        `exports.${exportName}.${condition}`,
                        exportTarget[condition],
                    );
                }
            }
            continue;
        }

        throw new Error(`${packageName} exports.${exportName} is unsupported`);
    }
}

function packageDependency(pkg, dependencyName) {
    return {
        ...(pkg.dependencies ?? {}),
        ...(pkg.devDependencies ?? {}),
        ...(pkg.peerDependencies ?? {}),
    }[dependencyName];
}

function assertDependency(pkg, packageName, dependencyName, expected) {
    const actual = packageDependency(pkg, dependencyName);

    assert(
        actual === expected,
        `${packageName} expected ${dependencyName} ${expected}, found ${
            actual ?? "missing"
        }`,
    );
    ok(`${packageName} declares ${dependencyName} ${expected}`);
}

function resolveFrom(packageDir, specifier) {
    const parentUrl = pathToFileURL(path.join(packageDir, "src", "index.html"));
    const resolved = import.meta.resolve(specifier, parentUrl.href);
    const resolvedPath = fileURLToPath(resolved);

    assert(
        fs.existsSync(resolvedPath),
        `${specifier} resolved from ${packageDir} to missing file ${resolvedPath}`,
    );
    ok(`${path.basename(packageDir)} resolves ${specifier} -> ${resolvedPath}`);
    return resolved;
}

validateExportTargets(packages.glassUi, "@mkbabb/glass-ui");
validateExportTargets(packages.keyframes, "@mkbabb/keyframes.js");

const keyframesPackage = readPackage(packages.keyframes);
const keyframesExports = Object.keys(keyframesPackage.exports ?? {});
assert(
    keyframesExports.length === 1 && keyframesExports[0] === ".",
    `@mkbabb/keyframes.js must keep a single "." export; found ${keyframesExports.join(", ")}`,
);
ok("@mkbabb/keyframes.js exposes only the root export");

const speedtestPackage = readPackage(packages.speedtest);
assertDependency(
    speedtestPackage,
    "speedtest",
    "@mkbabb/glass-ui",
    "file:../glass-ui",
);
assertDependency(
    speedtestPackage,
    "speedtest",
    "@mkbabb/keyframes.js",
    "file:../keyframes.js",
);

resolveFrom(packages.speedtest, "@mkbabb/glass-ui");
resolveFrom(packages.speedtest, "@mkbabb/glass-ui/tokens");
resolveFrom(packages.speedtest, "@mkbabb/glass-ui/styles");
const keyframesResolution = resolveFrom(packages.speedtest, "@mkbabb/keyframes.js");
const keyframesModule = await import(keyframesResolution);
assert(
    typeof keyframesModule.NumericAnimation === "function",
    "speedtest keyframes.js root import lacks NumericAnimation",
);
assert(
    typeof keyframesModule.SmoothProgress === "function",
    "speedtest keyframes.js root import lacks SmoothProgress",
);
ok("speedtest keyframes.js root import exposes NumericAnimation and SmoothProgress");

const keyframesConsumerPackage = readPackage(packages.keyframes);
assertDependency(
    keyframesConsumerPackage,
    "@mkbabb/keyframes.js",
    "@mkbabb/glass-ui",
    "file:../glass-ui",
);
resolveFrom(packages.keyframes, "@mkbabb/glass-ui");
resolveFrom(packages.keyframes, "@mkbabb/glass-ui/styles");
NODE
then
    echo "[package-contract] PASS"
else
    rc=$?
    echo "[package-contract] FAIL: package contract check exited $rc"
    status=1
fi

exit "$status"
