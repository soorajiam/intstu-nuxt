<template>
  <div class="space-y-8">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        What are your preferences?
      </h2>
      <p class="mt-2 text-gray-600 dark:text-gray-300">
        Help us find the perfect educational opportunities for you
      </p>
    </div>

    <div class="space-y-6">
      <!-- Study Location Preferences -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Preferred Study Locations</h3>
        <MultiSelect
          v-model="selectedCountries"
          :options="countries"
          optionLabel="name"
          placeholder="Select countries"
          class="w-full"
          :maxSelectedLabels="3"
        />
      </div>

      <!-- Field of Study -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Field of Study</h3>
        <Dropdown
          v-model="selectedField"
          :options="fields"
          optionLabel="name"
          placeholder="Select your field"
          class="w-full"
        />
      </div>

      <!-- Study Format -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Preferred Study Format</h3>
        <div class="flex flex-wrap gap-4">
          <div v-for="format in studyFormats" :key="format.id"
            class="flex-1 min-w-[200px]">
            <div
              :class="[
                'p-4 rounded-lg border-2 cursor-pointer transition-all',
                selectedFormat === format.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              ]"
              @click="selectedFormat = format.id"
            >
              <i :class="[format.icon, 'text-2xl mb-2 text-blue-600']"></i>
              <h4 class="font-medium">{{ format.name }}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ format.description }}
              </p>
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
const selectedCountries = ref([]);
const selectedField = ref(null);
const selectedFormat = ref(null);

const countries = [
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'Canada', code: 'CA' },
  { name: 'Australia', code: 'AU' },
  { name: 'Germany', code: 'DE' },
  // Add more countries...
];

const fields = [
  { name: 'Computer Science & IT', id: 'cs' },
  { name: 'Business & Management', id: 'business' },
  { name: 'Engineering', id: 'engineering' },
  { name: 'Medicine & Healthcare', id: 'medicine' },
  { name: 'Arts & Design', id: 'arts' },
  // Add more fields...
];

const studyFormats = [
  {
    id: 'on_campus',
    name: 'On Campus',
    icon: 'pi pi-building',
    description: 'Traditional in-person learning experience'
  },
  {
    id: 'online',
    name: 'Online',
    icon: 'pi pi-desktop',
    description: 'Flexible remote learning from anywhere'
  },
  {
    id: 'hybrid',
    name: 'Hybrid',
    icon: 'pi pi-sync',
    description: 'Mix of online and on-campus learning'
  }
];

const isValid = computed(() => 
  selectedCountries.value.length > 0 && 
  selectedField.value && 
  selectedFormat.value
);

const handleNext = () => {
  emit('next', {
    preferences: {
      countries: selectedCountries.value,
      field: selectedField.value,
      format: selectedFormat.value
    }
  });
};

const emit = defineEmits(['next', 'back']);
</script> 