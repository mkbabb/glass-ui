import { type VariantProps, cva } from 'class-variance-authority'

export { default as Slider } from './Slider.vue'

/**
 * Slider variants — class-name dispatch for the four scoped-CSS recipes
 * defined in `Slider.vue`. Variant differences are *structural* CSS
 * (track height, thumb shape, custom-property fallbacks for
 * `--slider-track-bg`, `--slider-thumb-size`, etc.) that don't reduce
 * to Tailwind class deltas, so each variant value is a single modifier
 * class (`glass-slider--standard`, …) that selects the matching block
 * in the component's `<style scoped>`. Co-exporting this CVA aligns
 * Slider with the shadcn-vue `*Variants` convention used by Button,
 * Toggle, Badge, etc.
 *
 * Consumers that want a Slider preset can compose `sliderVariants({ variant })`
 * with their own classes; the runtime behaviour is unchanged.
 */
export const sliderVariants = cva(
    'glass-slider relative flex w-full touch-none select-none items-center',
    {
        variants: {
            variant: {
                standard: 'glass-slider--standard',
                spectrum: 'glass-slider--spectrum',
                timeline: 'glass-slider--timeline',
                'glass-track': 'glass-slider--glass-track',
            },
        },
        defaultVariants: {
            variant: 'standard',
        },
    },
)

export type SliderVariants = VariantProps<typeof sliderVariants>
