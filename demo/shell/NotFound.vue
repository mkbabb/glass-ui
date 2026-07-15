<script setup lang="ts">
// The minimal shell 404. The prior 404 was a demo/eggs constellation piece —
// the eggs family was deleted whole (user order 2026-07-13); an unknown path
// now reads a plain glass card and a way home.
import { useRouter } from "vue-router";
import { Button } from "@glass/components/button";
import { Card } from "@glass/components/card";

const router = useRouter();
</script>

<template>
    <div class="grid min-h-[60vh] place-items-center p-8">
        <Card tier="floating" class="max-w-sm text-center">
            <p class="text-title">404</p>
            <p class="text-muted-foreground mt-2">
                Nothing lives at this route.
            </p>
            <Button variant="outline" class="mt-6" @click="router.push('/')">
                Back to the stories
            </Button>
        </Card>
    </div>
</template>
