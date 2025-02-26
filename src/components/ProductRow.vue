<template>
  <tr class="bg-blue-50/30 hover:bg-white transition-all duration-150">
    <!-- Product name with indentation -->
    <td class="p-3 border-b border-x border-gray-200 pl-10">
      <div class="flex items-center">
        <span class="text-gray-700">{{ product.name }}</span>
      </div>
    </td>

    <!-- Store values for each product -->
    <td
      v-for="storeName in storeNames"
      :key="`${product.name}-${storeName}`"
      class="p-3 border-b border-x border-gray-200 text-right text-gray-600"
    >
      <span
        :class="[
          product.storeData[storeName] ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-500',
          'inline-block px-2 py-0.5 rounded-md font-medium',
        ]"
      >
        {{ product.storeData[storeName] ?? 0 }}
      </span>
    </td>

    <!-- Total for the product -->
    <td class="p-3 border-b border-x border-gray-200 text-right font-medium bg-blue-50/50">
      {{ product.total }}
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { ProductPivot } from '../types'

defineProps<{
  product: ProductPivot
  storeNames: string[]
}>()
</script>
