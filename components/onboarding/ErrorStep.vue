<template>
  <div class="text-center py-12">
    <i class="pi pi-exclamation-triangle text-4xl text-red-500 mb-4"></i>
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      Something went wrong
    </h3>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      We couldn't load this step. Please try again.
    </p>
    <div class="flex justify-center gap-4">
      <Button
        label="Try Again"
        icon="pi pi-refresh"
        @click="reloadStep"
      />
      <Button
        label="Go Back"
        icon="pi pi-arrow-left"
        class="p-button-secondary"
        @click="$emit('back')"
      />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['back']);

const reloadStep = () => {
  window.location.reload();
};
</script> 