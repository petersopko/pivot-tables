<template>
  <button
    :type="type"
    :class="[
      'inline-flex items-center justify-center gap-1.5 font-medium transition-colors',
      sizeClasses,
      variantClasses,
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      customClasses,
    ]"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="$emit('click', $event)"
  >
    <BaseIcon v-if="iconLeft" :name="iconLeft" :size="iconSize" color="current" />
    <slot></slot>
    <BaseIcon v-if="iconRight" :name="iconRight" :size="iconSize" color="current" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseIcon from './BaseIcon.vue'

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary' | 'outline' | 'text'
    size?: 'sm' | 'md' | 'lg'
    iconLeft?: string
    iconRight?: string
    disabled?: boolean
    customClasses?: string
    ariaLabel?: string
  }>(),
  {
    type: 'button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    customClasses: '',
    ariaLabel: '',
  },
)

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

// Computed size classes
const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  }
  return sizes[props.size]
})

// Computed variant classes
const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 border border-transparent',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-transparent',
    outline: 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm',
    text: 'bg-transparent text-gray-700 hover:bg-gray-100 border border-transparent',
  }
  return variants[props.variant]
})

// Computed icon size based on button size
const iconSize = computed(() => {
  const sizes = {
    sm: 'xs',
    md: 'sm',
    lg: 'md',
  }
  return sizes[props.size] as 'xs' | 'sm' | 'md'
})
</script>
