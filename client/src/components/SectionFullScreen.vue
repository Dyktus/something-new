<script setup>
import { computed } from 'vue'
import { useDarkModeStore } from '@/stores/darkMode.js'
import { gradientBgPurplePink, gradientBgDark, gradientBgPinkRed } from '@/colors.js'

const props = defineProps({
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center" style="min-width: 50vw;" :class="gradientBgDark">
    <slot />
  </div>
</template>
