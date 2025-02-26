<template>
  <div class="p-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
    <!-- Title / Actions -->
    <header class="flex flex-col gap-2 mb-6 md:flex-row md:items-center md:justify-between">
      <h1 class="text-2xl font-bold text-gray-800">
        <span class="text-blue-600">Westech</span> Pivot Table
      </h1>
      <div class="flex gap-2 items-center">
        <BaseButton
          v-if="sortStore"
          @click="resetSort"
          variant="outline"
          size="sm"
          icon-left="reset"
          aria-label="Reset sorting"
        >
          Reset Sorting
        </BaseButton>
      </div>
    </header>

    <!-- Error state -->
    <ErrorMessage
      v-if="error"
      :message="error"
      @retry="() => fetchData('https://hiring.wdev.sk/fe-data')"
    />

    <!-- Loading state -->
    <LoadingState v-else-if="isLoading" />

    <!-- Responsive scroll container -->
    <div
      v-else
      class="overflow-x-auto relative rounded-lg shadow-lg bg-white border border-gray-200"
    >
      <table
        class="table-auto min-w-max w-full bg-white"
        aria-label="Pivot table showing product data by store"
      >
        <!-- Table header with sorting -->
        <PivotTableHeader
          :store-names="storeNames"
          :sort-store="sortStore"
          :sort-direction="sortDirection"
          @sort="toggleSort"
        />

        <tbody>
          <!-- Render categories and their products -->
          <template v-for="(category, index) in sortedCategories" :key="category.name">
            <!-- Category row with expand/collapse -->
            <CategoryRow
              :category="category"
              :store-names="storeNames"
              :is-striped="index % 2 === 0"
              @toggle="toggleCategory"
            />

            <!-- Product rows (if category is expanded) -->
            <template v-if="category.expanded">
              <ProductRow
                v-for="product in getSortedProducts(category)"
                :key="`${category.name}-${product.name}`"
                :product="product"
                :store-names="storeNames"
              />
            </template>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePivotData } from './composables/usePivotData'
import PivotTableHeader from './components/PivotTableHeader.vue'
import CategoryRow from './components/CategoryRow.vue'
import ProductRow from './components/ProductRow.vue'
import LoadingState from './components/LoadingState.vue'
import ErrorMessage from './components/ErrorMessage.vue'
import BaseButton from './components/BaseButton.vue'

// Use our pivot data composable
const {
  storeNames,
  sortStore,
  sortDirection,
  sortedCategories,
  isLoading,
  error,
  fetchData,
  toggleCategory,
  toggleSort,
  resetSort,
  getSortedProducts,
} = usePivotData()

// Fetch data on component mount
onMounted(() => {
  fetchData('https://hiring.wdev.sk/fe-data')
})
</script>
