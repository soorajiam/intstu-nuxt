<template>
  <div class="space-y-8">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        What are your educational goals?
      </h2>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Help us understand what you're looking to achieve
      </p>
    </div>

    <div class="space-y-4">
      <div v-for="goal in goals" :key="goal.id" class="relative">
        <Card 
          :class="[
            'cursor-pointer transition-all hover:shadow-lg',
            'bg-white dark:bg-gray-800',
            selectedGoals.includes(goal.id) 
              ? 'ring-2 ring-blue-500 dark:ring-blue-400' 
              : 'hover:bg-gray-50 dark:hover:bg-gray-700'
          ]"
          @click="toggleGoal(goal.id)"
        >
          <template #content>
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <i :class="[
                  goal.icon,
                  'text-2xl',
                  selectedGoals.includes(goal.id)
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400'
                ]"></i>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ goal.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ goal.description }}
                </p>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <div class="flex justify-between pt-6">
      <Button
        label="Back"
        class="p-button-secondary"
        :class="{'dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600': true}"
        @click="$emit('back')"
      />
      <Button
        label="Continue"
        :disabled="selectedGoals.length === 0"
        class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
               dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600"
        @click="handleNext"
      />
    </div>
  </div>
</template>

<script setup>
const selectedGoals = ref([]);

const goals = [
  {
    id: "bachelors",
    title: "Bachelor's Degree",
    description: "Looking to start my undergraduate journey",
    icon: "pi pi-book"
  },
  {
    id: "masters",
    title: "Master's Degree",
    description: "Ready to advance my education with a graduate degree",
    icon: "pi pi-chart-line"
  },
  {
    id: "phd",
    title: "PhD/Doctorate",
    description: "Interested in research and academic excellence",
    icon: "pi pi-globe"
  },
  {
    id: "certification",
    title: "Professional Certification",
    description: "Seeking specific qualifications for career advancement",
    icon: "pi pi-certificate"
  }
];

const toggleGoal = (goalId) => {
  const index = selectedGoals.value.indexOf(goalId);
  if (index === -1) {
    selectedGoals.value.push(goalId);
  } else {
    selectedGoals.value.splice(index, 1);
  }
};

const handleNext = () => {
  emit('next', { goals: selectedGoals.value });
};

const emit = defineEmits(['next', 'back']);
</script>

<style scoped>
:deep(.p-card) {
  background: transparent;
  border: 1px solid rgb(229 231 235 / var(--tw-border-opacity));
}

:deep(.dark .p-card) {
  border-color: rgb(75 85 99 / var(--tw-border-opacity));
}

:deep(.p-button) {
  transition: all 0.2s ease;
}
</style> 