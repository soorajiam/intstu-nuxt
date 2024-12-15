<template>
  <div class="space-y-8">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        Student Recruitment
      </h2>
      <p class="mt-2 text-gray-600 dark:text-gray-300">
        Tell us about your recruitment goals and preferences
      </p>
    </div>

    <div class="space-y-6">
      <!-- Target Regions -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Target Regions</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="region in regions" :key="region.id"
            class="p-4 rounded-lg border-2 cursor-pointer transition-all"
            :class="[selectedRegions.includes(region.id) ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700']"
            @click="toggleRegion(region.id)"
          >
            <i :class="[region.icon, 'text-2xl mb-2 text-blue-600']"></i>
            <h4 class="font-medium">{{ region.name }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ region.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Recruitment Goals -->
      <div class="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
        <h3 class="text-lg font-semibold mb-4">Annual Recruitment Goals</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              International Students
            </label>
            <InputNumber
              v-model="recruitmentGoals.international"
              placeholder="Target number"
              :min="0"
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Domestic Students
            </label>
            <InputNumber
              v-model="recruitmentGoals.domestic"
              placeholder="Target number"
              :min="0"
              class="w-full"
            />
          </div>
        </div>
      </div>

      <!-- Recruitment Methods -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Recruitment Methods</h3>
        <div class="space-y-4">
          <div v-for="method in recruitmentMethods" :key="method.id"
            class="p-4 rounded-lg border-2 cursor-pointer transition-all"
            :class="[selectedMethods.includes(method.id) ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700']"
            @click="toggleMethod(method.id)"
          >
            <div class="flex items-center">
              <i :class="[method.icon, 'text-2xl text-blue-600 mr-3']"></i>
              <div>
                <h4 class="font-medium">{{ method.name }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ method.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Support Services -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Student Support Services</h3>
        <MultiSelect
          v-model="selectedServices"
          :options="supportServices"
          optionLabel="name"
          placeholder="Select available services"
          class="w-full"
        />
      </div>

      <!-- Scholarship Information -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Scholarship Availability</h3>
        <div class="space-y-3">
          <div v-for="(scholarship, index) in scholarships" :key="index"
            class="p-4 rounded-lg border dark:border-gray-700">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="md:col-span-2">
                <InputText
                  v-model="scholarships[index].name"
                  placeholder="Scholarship name"
                  class="w-full"
                />
              </div>
              <div>
                <InputNumber
                  v-model="scholarships[index].amount"
                  placeholder="Amount (USD)"
                  :min="0"
                  mode="currency"
                  currency="USD"
                  class="w-full"
                />
              </div>
            </div>
            <Button
              icon="pi pi-trash"
              severity="danger"
              class="mt-2"
              @click="removeScholarship(index)"
              v-if="scholarships.length > 1"
            />
          </div>
          <Button
            label="Add Scholarship"
            icon="pi pi-plus"
            class="p-button-outlined"
            @click="addScholarship"
          />
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
const selectedRegions = ref([]);
const recruitmentGoals = ref({ international: null, domestic: null });
const selectedMethods = ref([]);
const selectedServices = ref([]);
const scholarships = ref([{ name: '', amount: null }]);

const regions = [
  {
    id: 'asia',
    name: 'Asia',
    icon: 'pi pi-globe',
    description: 'East, South, and Southeast Asia'
  },
  {
    id: 'europe',
    name: 'Europe',
    icon: 'pi pi-globe',
    description: 'EU and non-EU countries'
  },
  {
    id: 'namerica',
    name: 'North America',
    icon: 'pi pi-globe',
    description: 'USA and Canada'
  },
  {
    id: 'africa',
    name: 'Africa',
    icon: 'pi pi-globe',
    description: 'All African regions'
  }
];

const recruitmentMethods = [
  {
    id: 'agents',
    name: 'Education Agents',
    icon: 'pi pi-users',
    description: 'Partner with international education agents'
  },
  {
    id: 'fairs',
    name: 'Education Fairs',
    icon: 'pi pi-calendar',
    description: 'Participate in international education fairs'
  },
  {
    id: 'digital',
    name: 'Digital Marketing',
    icon: 'pi pi-desktop',
    description: 'Online campaigns and social media'
  },
  {
    id: 'partnerships',
    name: 'Institution Partnerships',
    icon: 'pi pi-building',
    description: 'Collaborate with other institutions'
  }
];

const supportServices = [
  { name: 'Airport Pickup', id: 'airport' },
  { name: 'Accommodation Support', id: 'housing' },
  { name: 'Language Support', id: 'language' },
  { name: 'Career Services', id: 'career' },
  { name: 'Cultural Integration', id: 'cultural' },
  { name: 'Academic Counseling', id: 'academic' },
  { name: 'Visa Assistance', id: 'visa' }
];

const toggleRegion = (id) => {
  const index = selectedRegions.value.indexOf(id);
  if (index === -1) {
    selectedRegions.value.push(id);
  } else {
    selectedRegions.value.splice(index, 1);
  }
};

const toggleMethod = (id) => {
  const index = selectedMethods.value.indexOf(id);
  if (index === -1) {
    selectedMethods.value.push(id);
  } else {
    selectedMethods.value.splice(index, 1);
  }
};

const addScholarship = () => {
  scholarships.value.push({ name: '', amount: null });
};

const removeScholarship = (index) => {
  scholarships.value.splice(index, 1);
};

const isValid = computed(() => 
  selectedRegions.value.length > 0 &&
  recruitmentGoals.value.international > 0 &&
  recruitmentGoals.value.domestic > 0 &&
  selectedMethods.value.length > 0 &&
  selectedServices.value.length > 0 &&
  scholarships.value.some(s => s.name.trim() !== '' && s.amount > 0)
);

const handleNext = () => {
  emit('next', {
    recruitment: {
      regions: selectedRegions.value,
      goals: recruitmentGoals.value,
      methods: selectedMethods.value,
      services: selectedServices.value,
      scholarships: scholarships.value.filter(s => s.name.trim() !== '' && s.amount > 0)
    }
  });
};

const emit = defineEmits(['next', 'back']);
</script> 