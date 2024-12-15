<template>
  <div class="space-y-8">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        What's your budget range?
      </h2>
      <p class="mt-2 text-gray-600 dark:text-gray-300">
        This helps us recommend programs within your financial comfort zone
      </p>
    </div>

    <div class="space-y-6">
      <!-- Annual Budget Range -->
      <div class="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
        <h3 class="text-lg font-semibold mb-6">Annual Budget Range (USD)</h3>
        <Slider
          v-model="budgetRange"
          :min="0"
          :max="100000"
          :step="1000"
          range
          class="mt-8"
        />
        <div class="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
          <span>${{ budgetRange[0].toLocaleString() }}</span>
          <span>${{ budgetRange[1].toLocaleString() }}</span>
        </div>
      </div>

      <!-- Funding Sources -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Funding Sources</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="source in fundingSources" :key="source.id">
            <Checkbox
              v-model="selectedSources"
              :value="source.id"
              :inputId="source.id"
            />
            <label :for="source.id" class="ml-2 text-gray-700 dark:text-gray-300">
              {{ source.name }}
            </label>
          </div>
        </div>
      </div>

      <!-- Financial Aid Interest -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Financial Aid Interest</h3>
        <div class="space-y-4">
          <div v-for="option in financialAidOptions" :key="option.id"
            class="p-4 rounded-lg border dark:border-gray-700 hover:border-blue-500 cursor-pointer transition-all"
            :class="{ 'border-blue-500 bg-blue-50 dark:bg-blue-900/20': selectedAidOptions.includes(option.id) }"
            @click="toggleAidOption(option.id)"
          >
            <div class="flex items-center">
              <i :class="[option.icon, 'text-2xl text-blue-600 mr-3']"></i>
              <div>
                <h4 class="font-medium">{{ option.name }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ option.description }}
                </p>
              </div>
            </div>
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
        label="Continue"
        :disabled="!isValid"
        @click="handleNext"
      />
    </div>
  </div>
</template>

<script setup>
const budgetRange = ref([10000, 50000]);
const selectedSources = ref([]);
const selectedAidOptions = ref([]);

const fundingSources = [
  { id: 'family', name: 'Family Support' },
  { id: 'savings', name: 'Personal Savings' },
  { id: 'loan', name: 'Student Loans' },
  { id: 'scholarship', name: 'Scholarships' },
  { id: 'work', name: 'Part-time Work' },
  { id: 'sponsor', name: 'Sponsorship' }
];

const financialAidOptions = [
  {
    id: 'scholarships',
    name: 'Scholarships & Grants',
    icon: 'pi pi-money-bill',
    description: 'Interest in merit-based and need-based scholarships'
  },
  {
    id: 'loans',
    name: 'Student Loans',
    icon: 'pi pi-percentage',
    description: 'Information about student loan options and programs'
  },
  {
    id: 'work_study',
    name: 'Work-Study Programs',
    icon: 'pi pi-briefcase',
    description: 'Opportunities to work while studying'
  }
];

const toggleAidOption = (optionId) => {
  const index = selectedAidOptions.value.indexOf(optionId);
  if (index === -1) {
    selectedAidOptions.value.push(optionId);
  } else {
    selectedAidOptions.value.splice(index, 1);
  }
};

const isValid = computed(() => 
  selectedSources.value.length > 0 && 
  budgetRange.value[0] < budgetRange.value[1]
);

const handleNext = () => {
  emit('next', {
    budget: {
      range: budgetRange.value,
      sources: selectedSources.value,
      aidInterest: selectedAidOptions.value
    }
  });
};

const emit = defineEmits(['next', 'back']);
</script> 