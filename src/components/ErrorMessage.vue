<template>
  <div
    class="bg-white border-l-4 border-red-500 rounded-lg shadow-lg p-6 my-6"
    role="alert"
    aria-live="assertive"
  >
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <BaseIcon name="alert" size="lg" color="current" custom-classes="text-red-500" />
      </div>
      <div class="ml-3">
        <h3 class="text-lg font-medium text-red-800">Error Loading Data</h3>
        <div class="mt-2 text-red-700">
          <p>{{ message }}</p>
        </div>
        <div class="mt-4">
          <BaseButton
            @click="$emit('retry')"
            variant="primary"
            size="sm"
            icon-left="reset"
            custom-classes="bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Retry
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from './BaseIcon.vue'
import BaseButton from './BaseButton.vue'

defineProps<{
  message: string
}>()

defineEmits<{
  (e: 'retry'): void
}>()
</script>
