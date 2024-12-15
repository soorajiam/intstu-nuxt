<template>
  <div v-if="hasIncompleteOnboarding" class="fixed top-16 inset-x-0 z-50">
    <div class="max-w-3xl mx-auto px-4">
      <div class="bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <i class="pi pi-info-circle text-blue-600 dark:text-blue-400 text-xl"></i>
          <div>
            <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200">
              Resume your onboarding
            </h3>
            <p class="text-sm text-blue-600 dark:text-blue-300">
              You have an incomplete {{ userType }} onboarding (Step {{ currentStep + 1 }} of {{ totalSteps }})
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <Button
            label="Resume"
            severity="info"
            @click="resumeOnboarding"
          />
          <Button
            icon="pi pi-times"
            severity="secondary"
            text
            @click="dismissBanner"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  hasIncompleteOnboarding: Boolean,
  userType: String,
  currentStep: Number,
  totalSteps: Number
});

const emit = defineEmits(['resume', 'dismiss']);

const resumeOnboarding = () => {
  emit('resume');
};

const dismissBanner = () => {
  emit('dismiss');
};
</script> 