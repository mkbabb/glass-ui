import { it } from "vitest";

export type GovernedSemanticClass =
    | "base-product-tooling"
    | "component-behavior";

export interface GovernedCaseIdentity {
    count?: number;
    keys?: readonly string[];
    orderedKeysSha256?: string;
}

export interface GovernedInvariantMetadata {
    semanticClass: GovernedSemanticClass;
    mode: "enabled";
    caseIdentity?: GovernedCaseIdentity;
}

type GovernedHandler = Parameters<typeof it>[1];

/**
 * Runtime half of the P-EX1 semantic binding.
 *
 * The identifier, class, enabled mode, case identity, title, source location,
 * uniqueness and suite ancestry are enforced statically by the one governed
 * roster verifier before Vitest collects this registration. Runtime remains a
 * normal Vitest test so ordinary reporting, failures and teardown semantics do
 * not fork into a second runner.
 */
export function governedInvariant(
    id: string,
    metadata: GovernedInvariantMetadata,
    title: string,
    handler: GovernedHandler,
): ReturnType<typeof it> {
    void id;
    void metadata;
    return it(title, handler);
}

export namespace governedInvariant {
    export function each<const Cases extends readonly unknown[]>(
        id: string,
        metadata: GovernedInvariantMetadata,
        cases: Cases,
        title: string,
        handler: (
            ...args: Cases[number] extends readonly unknown[]
                ? Cases[number]
                : [Cases[number]]
        ) => unknown,
    ): unknown {
        void id;
        void metadata;
        return it.each(cases)(title, handler as never);
    }
}
