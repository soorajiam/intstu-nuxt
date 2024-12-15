<template>
  <div class="space-y-8">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        Institution Details
      </h2>
      <p class="mt-2 text-gray-600 dark:text-gray-300">
        Tell us about your institution
      </p>
    </div>

    <div class="space-y-6">
      <!-- Basic Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Institution Name
          </label>
          <InputText
            v-model="institutionName"
            placeholder="Enter institution name"
            class="w-full"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Founded Year
          </label>
          <InputNumber
            v-model="foundedYear"
            placeholder="Year"
            :max="new Date().getFullYear()"
            :min="1000"
            class="w-full"
          />
        </div>
      </div>

      <!-- Institution Type -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Institution Type</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="type in institutionTypes" :key="type.id"
            class="p-4 rounded-lg border-2 cursor-pointer transition-all"
            :class="[selectedType === type.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700']"
            @click="selectedType = type.id"
          >
            <i :class="[type.icon, 'text-2xl mb-2 text-blue-600']"></i>
            <h4 class="font-medium">{{ type.name }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ type.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Location -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Country
          </label>
          <Dropdown
            v-model="selectedCountry"
            :options="countries"
            optionLabel="name"
            placeholder="Select country"
            class="w-full"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            City
          </label>
          <InputText
            v-model="city"
            placeholder="Enter city"
            class="w-full"
          />
        </div>
      </div>

      <!-- Rankings & Accreditations -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Rankings & Accreditations</h3>
        <div class="space-y-3">
          <div v-for="(accreditation, index) in accreditations" :key="index"
            class="flex items-center gap-4">
            <InputText
              v-model="accreditations[index]"
              placeholder="Enter accreditation or ranking"
              class="flex-grow"
            />
            <Button
              icon="pi pi-trash"
              severity="danger"
              @click="removeAccreditation(index)"
              v-if="accreditations.length > 1"
            />
          </div>
          <Button
            label="Add Accreditation"
            icon="pi pi-plus"
            class="p-button-outlined"
            @click="addAccreditation"
          />
        </div>
      </div>

      <!-- Student Population -->
      <div class="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
        <h3 class="text-lg font-semibold mb-4">Student Population</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Total Students
            </label>
            <InputNumber
              v-model="totalStudents"
              placeholder="Number of students"
              :min="0"
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              International Students %
            </label>
            <InputNumber
              v-model="internationalPercentage"
              placeholder="Percentage"
              :min="0"
              :max="100"
              suffix="%"
              class="w-full"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-between pt-6">
      <Button label="Back" class="p-button-secondary" @click="$emit('back')" />
      <Button label="Continue" :disabled="!isValid" @click="handleNext" />
    </div>
  </div>
</template>

<script setup>
const institutionName = ref('');
const foundedYear = ref(null);
const selectedType = ref(null);
const selectedCountry = ref(null);
const city = ref('');
const accreditations = ref(['']);
const totalStudents = ref(null);
const internationalPercentage = ref(null);

const institutionTypes = [
  {
    id: 'public',
    name: 'Public University',
    icon: 'pi pi-building',
    description: 'Government-funded institution'
  },
  {
    id: 'private',
    name: 'Private University',
    icon: 'pi pi-home',
    description: 'Independently operated institution'
  },
  {
    id: 'research',
    name: 'Research Institute',
    icon: 'pi pi-chart-bar',
    description: 'Research-focused institution'
  }
];

const countries = [
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'Canada', code: 'CA' },
  { name: 'Australia', code: 'AU' },
  { name: 'Germany', code: 'DE' },
  // Add more countries...
];

const addAccreditation = () => {
  accreditations.value.push('');
};

const removeAccreditation = (index) => {
  accreditations.value.splice(index, 1);
};

const isValid = computed(() => 
  institutionName.value.trim() !== '' &&
  foundedYear.value &&
  selectedType.value &&
  selectedCountry.value &&
  city.value.trim() !== '' &&
  accreditations.value.some(a => a.trim() !== '') &&
  totalStudents.value !== null &&
  internationalPercentage.value !== null
);

const handleNext = () => {
  emit('next', {
    institution: {
      name: institutionName.value,
      foundedYear: foundedYear.value,
      type: selectedType.value,
      country: selectedCountry.value,
      city: city.value,
      accreditations: accreditations.value.filter(a => a.trim() !== ''),
      totalStudents: totalStudents.value,
      internationalPercentage: internationalPercentage.value
    }
  });
};

const emit = defineEmits(['next', 'back']);
</script> 