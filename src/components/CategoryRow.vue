<template>
  <tr
    :class="[
      isStriped ? 'bg-gray-50' : 'bg-white',
      'hover:bg-blue-50 hover:text-blue-800 transition-all duration-150 cursor-pointer font-medium group',
    ]"
    @click="toggleCategory"
    :aria-expanded="category.expanded"
  >
    <td class="p-3 border-b border-x border-gray-200">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <!-- Expand/Collapse indicator using BaseIcon -->
          <span
            class="mr-2 flex items-center justify-center h-5 w-5 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-colors"
            aria-hidden="true"
          >
            <BaseIcon
              :name="category.expanded ? 'chevron-down' : 'chevron-right'"
              size="xs"
              color="gray"
              custom-classes="group-hover:text-blue-600"
            />
          </span>
          <span class="font-semibold">{{ category.name }}</span>
        </div>
      </div>
    </td>

    <!-- Store sums for each category -->
    <td
      v-for="storeName in storeNames"
      :key="storeName"
      class="p-3 border-b border-x border-gray-200 text-right font-medium"
    >
      {{ category.storeData[storeName] ?? 0 }}
    </td>

    <!-- Total sum for the category -->
    <td
      class="p-3 border-b border-x border-gray-200 text-right font-semibold bg-gray-50 group-hover:bg-blue-50 transition-colors"
    >
      {{ category.total }}
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { CategoryPivot } from '../types'
import BaseIcon from './BaseIcon.vue'

const props = defineProps<{
  category: CategoryPivot
  storeNames: string[]
  isStriped?: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle', category: CategoryPivot): void
}>()

/**
 * Emit toggle event when category row is clicked
 */
const toggleCategory = () => {
  emit('toggle', props.category)
}
</script>
