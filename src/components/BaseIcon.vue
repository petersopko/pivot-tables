<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="[sizeClasses, colorClasses, customClasses]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    :aria-hidden="!ariaLabel"
    :aria-label="ariaLabel"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
      :d="getIconPath(name)"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Define available icons
const iconPaths = {
  'sort-up': 'M5 15l7-7 7 7',
  'sort-down': 'M19 9l-7 7-7-7',
  reset:
    'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  'chevron-right': 'M9 5l7 7-7 7',
  'chevron-down': 'M19 9l-7 7-7-7',
  plus: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
  minus: 'M18 12H6',
  check: 'M5 13l4 4L19 7',
  x: 'M6 18L18 6M6 6l12 12',
  search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  filter:
    'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z',
  alert:
    'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
}

// Props
const props = withDefaults(
  defineProps<{
    name: keyof typeof iconPaths | string
    size?: 'xs' | 'sm' | 'md' | 'lg'
    color?: 'default' | 'primary' | 'gray' | 'current'
    strokeWidth?: number
    customClasses?: string
    ariaLabel?: string
  }>(),
  {
    size: 'md',
    color: 'default',
    strokeWidth: 2,
    customClasses: '',
    ariaLabel: '',
  },
)

// Computed size classes
const sizeClasses = computed(() => {
  const sizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }
  return sizes[props.size]
})

// Computed color classes
const colorClasses = computed(() => {
  const colors = {
    default: 'text-gray-700',
    primary: 'text-blue-600',
    gray: 'text-gray-400',
    current: 'text-current',
  }
  return colors[props.color]
})

// Get the path for the icon
const getIconPath = (iconName: string): string => {
  return iconPaths[iconName as keyof typeof iconPaths] || ''
}
</script>
