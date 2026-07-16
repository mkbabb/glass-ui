<script setup lang="ts">
import { Button } from "@glass/components/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@glass/components/card";
import TransitionRouteLink from "../chassis/TransitionRouteLink.vue";
</script>

<template>
    <div class="grid min-h-[60vh] place-items-center p-8">
        <Card tier="floating" class="w-full max-w-sm text-center">
            <CardHeader>
                <CardTitle as="h1">Page not found</CardTitle>
                <CardDescription>Nothing lives at this address.</CardDescription>
            </CardHeader>
            <CardFooter class="justify-center">
                <Button as-child>
                    <TransitionRouteLink to="/">Browse stories</TransitionRouteLink>
                </Button>
            </CardFooter>
        </Card>
    </div>
</template>
