<template>
  <div class="w-full mb-8">
    <Steps 
      :model="steps" 
      :readonly="false"
      :current-step="currentStep"
      class="onboarding-steps"
    />
    <div class="text-center mt-4">
      <span class="text-sm text-gray-600 dark:text-gray-400">
        Step {{ currentStep + 1 }} of {{ steps.length }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: {
    type: Array,
    required: true
  },
  currentStep: {
    type: Number,
    required: true
  }
});
</script>

<style scoped>
.onboarding-steps :deep(.p-steps-item.p-steps-current) {
  @apply text-blue-600;
}

.onboarding-steps :deep(.p-steps-number) {
  @apply bg-blue-600;
}
</style> 