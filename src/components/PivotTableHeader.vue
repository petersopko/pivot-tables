<template>
  <thead class="bg-white sticky top-0 z-10">
    <tr class="border-t border-gray-300">
      <!-- Category Header -->
      <th
        class="p-3 border-b-2 border-x border-gray-300 text-left w-[220px] font-semibold text-gray-700 bg-white"
      >
        Category / Product
      </th>

      <!-- Store Headers -->
      <th
        v-for="(storeName, idx) in storeNames"
        :key="`store-${idx}`"
        @click="toggleSort(storeName)"
        class="p-3 border-b-2 border-x border-gray-300 text-right cursor-pointer whitespace-nowrap font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-all duration-150 bg-white group relative"
        role="columnheader"
        :aria-sort="getSortAttribute(storeName)"
        :title="`Click to sort by ${storeName} ${getSortTooltip(storeName)}`"
      >
        <div class="flex items-center justify-end space-x-1">
          <!-- Always show a sort indicator, but make it visible only on hover or when active -->
          <span
            class="inline-flex items-center justify-center h-5 w-5 rounded-full group-hover:bg-blue-100/50 transition-colors"
            aria-hidden="true"
          >
            <BaseIcon
              :name="sortStore === storeName && sortDirection === 'asc' ? 'sort-up' : 'sort-down'"
              size="xs"
              :color="sortStore === storeName ? 'primary' : 'gray'"
              custom-classes="group-hover:text-gray-500 transition-all duration-150"
            />
          </span>
          <span>{{ storeName }}</span>
        </div>
      </th>

      <!-- Total Header -->
      <th
        class="p-3 border-b-2 border-x border-gray-300 text-right font-semibold text-gray-700 bg-gray-50"
      >
        Total
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
import type { SortDirection } from '../types'
import BaseIcon from './BaseIcon.vue'

const props = defineProps<{
  storeNames: string[]
  sortStore: string | null
  sortDirection: SortDirection
}>()

const emit = defineEmits<{
  (e: 'sort', storeName: string): void
}>()

/**
 * Emit sort event when a store header is clicked
 */
const toggleSort = (storeName: string) => {
  emit('sort', storeName)
}

/**
 * Get the appropriate aria-sort attribute value based on current sort state
 */
const getSortAttribute = (storeName: string): 'ascending' | 'descending' | 'none' => {
  if (props.sortStore !== storeName) return 'none'
  return props.sortDirection === 'asc' ? 'ascending' : 'descending'
}

/**
 * Get tooltip text based on current sort state
 */
const getSortTooltip = (storeName: string): string => {
  if (props.sortStore !== storeName) return '(click to sort)'
  return props.sortDirection === 'asc'
    ? '(currently sorted ascending)'
    : '(currently sorted descending)'
}
</script>
