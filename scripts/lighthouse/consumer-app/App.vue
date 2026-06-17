<script setup lang="ts">
// The smallest representative consumer: ONE Card + ONE Button over a page wash,
// importing the PUBLISHED root barrel (resolved to the built `dist/` by the
// consumer-app vite config alias — the contract-v2 dev-resolution model).
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@mkbabb/glass-ui";
</script>

<template>
    <main class="consumer-wash">
        <Card class="consumer-card">
            <CardHeader>
                <CardTitle>glass-ui consumer harness</CardTitle>
                <CardDescription>
                    The published bundle's first-paint reach over a page wash.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button>A glass button</Button>
            </CardContent>
        </Card>
    </main>
</template>

<style>
/* A page wash so the glass has something behind it to read against — the
   smallest backdrop a real consumer would paint. No library override. */
.consumer-wash {
    min-height: 100dvh;
    display: grid;
    place-items: center;
    padding: 2rem;
    background:
        radial-gradient(
            120% 120% at 50% 0%,
            color-mix(in oklab, var(--primary), transparent 88%),
            var(--background)
        );
}
.consumer-card {
    max-width: 28rem;
}
</style>
