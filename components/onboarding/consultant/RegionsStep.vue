<template>
  <div class="space-y-8">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        Regional Expertise
      </h2>
      <p class="mt-2 text-gray-600 dark:text-gray-300">
        Tell us about the regions you specialize in
      </p>
    </div>

    <div class="space-y-6">
      <!-- Source Regions -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Source Regions</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="region in sourceRegions" :key="region.id"
            class="p-4 rounded-lg border-2 cursor-pointer transition-all"
            :class="[selectedSourceRegions.includes(region.id) ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700']"
            @click="toggleSourceRegion(region.id)"
          >
            <i :class="[region.icon, 'text-2xl mb-2 text-blue-600']"></i>
            <h4 class="font-medium">{{ region.name }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ region.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Destination Countries -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Destination Countries</h3>
        <div class="space-y-3">
          <div v-for="(country, index) in destinationCountries" :key="index"
            class="p-4 rounded-lg border dark:border-gray-700">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="md:col-span-2">
                <Dropdown
                  v-model="destinationCountries[index].country"
                  :options="countries"
                  optionLabel="name"
                  placeholder="Select country"
                  class="w-full mb-2"
                />
                <MultiSelect
                  v-model="destinationCountries[index].cities"
                  :options="getCitiesForCountry(destinationCountries[index].country?.code)"
                  optionLabel="name"
                  placeholder="Select cities"
                  class="w-full"
                />
              </div>
              <div>
                <InputNumber
                  v-model="destinationCountries[index].annualPlacements"
                  placeholder="Annual placements"
                  :min="0"
                  class="w-full"
                />
              </div>
            </div>
            <Button
              icon="pi pi-trash"
              severity="danger"
              class="mt-2"
              @click="removeDestination(index)"
              v-if="destinationCountries.length > 1"
            />
          </div>
          <Button
            label="Add Destination"
            icon="pi pi-plus"
            class="p-button-outlined"
            @click="addDestination"
          />
        </div>
      </div>

      <!-- Language Proficiency -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Language Proficiency</h3>
        <div class="space-y-3">
          <div v-for="(lang, index) in languages" :key="index"
            class="flex items-center gap-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
              <Dropdown
                v-model="languages[index].language"
                :options="availableLanguages"
                optionLabel="name"
                placeholder="Select language"
                class="w-full"
              />
              <Dropdown
                v-model="languages[index].level"
                :options="proficiencyLevels"
                optionLabel="name"
                placeholder="Proficiency level"
                class="w-full"
              />
            </div>
            <Button
              icon="pi pi-trash"
              severity="danger"
              @click="removeLanguage(index)"
              v-if="languages.length > 1"
            />
          </div>
          <Button
            label="Add Language"
            icon="pi pi-plus"
            class="p-button-outlined"
            @click="addLanguage"
          />
        </div>
      </div>

      <!-- Regional Success Metrics -->
      <div class="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
        <h3 class="text-lg font-semibold mb-4">Regional Success Metrics</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="metric in successMetrics" :key="metric.id"
            class="text-center p-4 rounded-lg border dark:border-gray-700">
            <i :class="[metric.icon, 'text-3xl text-blue-600 mb-2']"></i>
            <h4 class="font-medium mb-2">{{ metric.name }}</h4>
            <InputNumber
              v-model="metric.value"
              :placeholder="metric.placeholder"
              :min="0"
              :suffix="metric.suffix"
              class="w-full"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-between pt-6">
      <Button label="Back" class="p-button-secondary" @click="$emit('back')" />
      <Button label="Complete" :disabled="!isValid" @click="handleNext" />
    </div>
  </div>
</template>

<script setup>
const selectedSourceRegions = ref([]);
const destinationCountries = ref([{ country: null, cities: [], annualPlacements: null }]);
const languages = ref([{ language: null, level: null }]);

const sourceRegions = [
  {
    id: 'south_asia',
    name: 'South Asia',
    icon: 'pi pi-globe',
    description: 'India, Pakistan, Bangladesh, etc.'
  },
  {
    id: 'east_asia',
    name: 'East Asia',
    icon: 'pi pi-globe',
    description: 'China, Japan, Korea, etc.'
  },
  {
    id: 'middle_east',
    name: 'Middle East',
    icon: 'pi pi-globe',
    description: 'UAE, Saudi Arabia, etc.'
  },
  {
    id: 'africa',
    name: 'Africa',
    icon: 'pi pi-globe',
    description: 'Nigeria, Kenya, South Africa, etc.'
  }
];

const countries = [
  { name: 'United States', code: 'US', cities: ['New York', 'Boston', 'San Francisco'] },
  { name: 'United Kingdom', code: 'UK', cities: ['London', 'Manchester', 'Edinburgh'] },
  { name: 'Canada', code: 'CA', cities: ['Toronto', 'Vancouver', 'Montreal'] },
  { name: 'Australia', code: 'AU', cities: ['Sydney', 'Melbourne', 'Brisbane'] }
];

const availableLanguages = [
  { name: 'English', code: 'en' },
  { name: 'Mandarin', code: 'zh' },
  { name: 'Hindi', code: 'hi' },
  { name: 'Arabic', code: 'ar' },
  { name: 'Spanish', code: 'es' }
];

const proficiencyLevels = [
  { name: 'Native', value: 'native' },
  { name: 'Fluent', value: 'fluent' },
  { name: 'Advanced', value: 'advanced' },
  { name: 'Intermediate', value: 'intermediate' }
];

const successMetrics = ref([
  {
    id: 'visa_success',
    name: 'Visa Success Rate',
    icon: 'pi pi-check-circle',
    placeholder: 'Success rate',
    suffix: '%',
    value: null
  },
  {
    id: 'admission_rate',
    name: 'Admission Success Rate',
    icon: 'pi pi-verified',
    placeholder: 'Success rate',
    suffix: '%',
    value: null
  },
  {
    id: 'avg_processing',
    name: 'Average Processing Time',
    icon: 'pi pi-clock',
    placeholder: 'Days',
    suffix: ' days',
    value: null
  },
  {
    id: 'satisfaction',
    name: 'Student Satisfaction',
    icon: 'pi pi-star',
    placeholder: 'Rating',
    suffix: '/5',
    value: null
  }
]);

const getCitiesForCountry = (countryCode) => {
  const country = countries.find(c => c.code === countryCode);
  return country ? country.cities.map(city => ({ name: city })) : [];
};

const toggleSourceRegion = (id) => {
  const index = selectedSourceRegions.value.indexOf(id);
  if (index === -1) {
    selectedSourceRegions.value.push(id);
  } else {
    selectedSourceRegions.value.splice(index, 1);
  }
};

const addDestination = () => {
  destinationCountries.value.push({ country: null, cities: [], annualPlacements: null });
};

const removeDestination = (index) => {
  destinationCountries.value.splice(index, 1);
};

const addLanguage = () => {
  languages.value.push({ language: null, level: null });
};

const removeLanguage = (index) => {
  languages.value.splice(index, 1);
};

const isValid = computed(() => 
  selectedSourceRegions.value.length > 0 &&
  destinationCountries.value.some(d => d.country && d.cities.length > 0 && d.annualPlacements > 0) &&
  languages.value.some(l => l.language && l.level) &&
  successMetrics.value.every(m => m.value !== null)
);

const handleNext = () => {
  emit('next', {
    regions: {
      sourceRegions: selectedSourceRegions.value,
      destinationCountries: destinationCountries.value.filter(d => d.country && d.cities.length > 0),
      languages: languages.value.filter(l => l.language && l.level),
      metrics: successMetrics.value
    }
  });
};

const emit = defineEmits(['next', 'back']);
</script> 