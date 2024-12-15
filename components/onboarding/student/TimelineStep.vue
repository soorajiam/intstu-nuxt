<template>
  <div class="space-y-8">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        When do you plan to start?
      </h2>
      <p class="mt-2 text-gray-600 dark:text-gray-300">
        Help us understand your timeline to provide relevant opportunities
      </p>
    </div>

    <div class="space-y-6">
      <!-- Start Date Selection -->
      <div class="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
        <h3 class="text-lg font-semibold mb-4">Preferred Start Date</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Calendar
            v-model="startDate"
            :minDate="minDate"
            :maxDate="maxDate"
            selectionMode="single"
            dateFormat="mm/yy"
            view="month"
            class="w-full"
          />
          <div class="md:col-span-2 flex items-center">
            <div class="space-y-2">
              <h4 class="font-medium text-gray-900 dark:text-white">
                {{ getFormattedDate }}
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Select your preferred start date. This helps us show you programs with matching intake periods.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Application Timeline -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Application Readiness</h3>
        <div class="space-y-4">
          <div v-for="item in readinessItems" :key="item.id"
            class="p-4 rounded-lg border dark:border-gray-700">
            <div class="flex items-start gap-4">
              <Checkbox
                v-model="selectedReadiness"
                :value="item.id"
                :inputId="item.id"
              />
              <div>
                <label :for="item.id" class="block font-medium text-gray-900 dark:text-white mb-1">
                  {{ item.title }}
                </label>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Urgency Level -->
      <div>
        <h3 class="text-lg font-semibold mb-4">How urgent is your search?</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="level in urgencyLevels" :key="level.id"
            class="p-4 rounded-lg border-2 cursor-pointer transition-all"
            :class="[
              selectedUrgency === level.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700'
            ]"
            @click="selectedUrgency = level.id"
          >
            <i :class="[level.icon, 'text-2xl mb-2 text-blue-600']"></i>
            <h4 class="font-medium">{{ level.name }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ level.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-between pt-6">
      <Button
        label="Back"
        class="p-button-secondary"
        @click="$emit('back')"
      />
      <Button
        label="Complete"
        :disabled="!isValid"
        @click="handleNext"
      />
    </div>
  </div>
</template>

<script setup>
const startDate = ref(null);
const selectedReadiness = ref([]);
const selectedUrgency = ref(null);

const minDate = new Date();
const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 2));

const readinessItems = [
  {
    id: "tests",
    title: "Standardized Tests",
    description: "IELTS, TOEFL, GRE, GMAT, etc."
  },
  {
    id: "documents",
    title: "Academic Documents",
    description: "Transcripts, degrees, certificates"
  },
  {
    id: "recommendations",
    title: "Recommendations",
    description: "Letters of recommendation from academics/employers"
  },
  {
    id: "portfolio",
    title: "Portfolio/Work Samples",
    description: "Required for specific programs"
  }
];

const urgencyLevels = [
  {
    id: "immediate",
    name: "Immediate",
    icon: "pi pi-bolt",
    description: "Looking to start within 3 months"
  },
  {
    id: "moderate",
    name: "Moderate",
    icon: "pi pi-clock",
    description: "Planning for 3-6 months ahead"
  },
  {
    id: "planning",
    name: "Planning Ahead",
    icon: "pi pi-calendar",
    description: "Researching for 6+ months ahead"
  }
];

const getFormattedDate = computed(() => {
  if (!startDate.value) return "No date selected";
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long'
  }).format(startDate.value);
});

const isValid = computed(() => 
  startDate.value &&
  selectedReadiness.value.length > 0 &&
  selectedUrgency.value
);

const handleNext = () => {
  emit('next', {
    timeline: {
      startDate: startDate.value,
      readiness: selectedReadiness.value,
      urgency: selectedUrgency.value
    }
  });
};

const emit = defineEmits(['next', 'back']);
</script> 