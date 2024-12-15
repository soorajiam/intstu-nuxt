<template>
  <div class="space-y-8">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        Your Services
      </h2>
      <p class="mt-2 text-gray-600 dark:text-gray-300">
        Tell us about the services you offer to students
      </p>
    </div>

    <div class="space-y-6">
      <!-- Service Categories -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Service Categories</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="service in serviceCategories" :key="service.id"
            class="p-4 rounded-lg border-2 cursor-pointer transition-all"
            :class="[selectedServices.includes(service.id) ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700']"
            @click="toggleService(service.id)"
          >
            <i :class="[service.icon, 'text-2xl mb-2 text-blue-600']"></i>
            <h4 class="font-medium">{{ service.name }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Service Packages -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Service Packages</h3>
        <div class="space-y-4">
          <div v-for="(pkg, index) in packages" :key="index"
            class="p-4 rounded-lg border dark:border-gray-700">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="md:col-span-2">
                <InputText
                  v-model="packages[index].name"
                  placeholder="Package name"
                  class="w-full mb-2"
                />
                <InputTextarea
                  v-model="packages[index].description"
                  placeholder="Package description"
                  rows="2"
                  class="w-full"
                />
              </div>
              <div>
                <InputNumber
                  v-model="packages[index].price"
                  placeholder="Price (USD)"
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
              @click="removePackage(index)"
              v-if="packages.length > 1"
            />
          </div>
          <Button
            label="Add Package"
            icon="pi pi-plus"
            class="p-button-outlined"
            @click="addPackage"
          />
        </div>
      </div>

      <!-- Success Metrics -->
      <div class="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
        <h3 class="text-lg font-semibold mb-4">Success Metrics</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Students Placed
            </label>
            <InputNumber
              v-model="metrics.studentsPlaced"
              placeholder="Number"
              :min="0"
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Success Rate (%)
            </label>
            <InputNumber
              v-model="metrics.successRate"
              placeholder="Rate"
              :min="0"
              :max="100"
              suffix="%"
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Average Response Time (hrs)
            </label>
            <InputNumber
              v-model="metrics.responseTime"
              placeholder="Hours"
              :min="0"
              :max="72"
              class="w-full"
            />
          </div>
        </div>
      </div>

      <!-- Additional Features -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Additional Features</h3>
        <MultiSelect
          v-model="selectedFeatures"
          :options="additionalFeatures"
          optionLabel="name"
          placeholder="Select features"
          class="w-full"
        />
      </div>
    </div>

    <div class="flex justify-between pt-6">
      <Button label="Back" class="p-button-secondary" @click="$emit('back')" />
      <Button label="Continue" :disabled="!isValid" @click="handleNext" />
    </div>
  </div>
</template>

<script setup>
const selectedServices = ref([]);
const packages = ref([{ name: '', description: '', price: null }]);
const metrics = ref({
  studentsPlaced: null,
  successRate: null,
  responseTime: null
});
const selectedFeatures = ref([]);

const serviceCategories = [
  {
    id: 'admissions',
    name: 'Admissions Consulting',
    icon: 'pi pi-file',
    description: 'Application strategy and documentation'
  },
  {
    id: 'test_prep',
    name: 'Test Preparation',
    icon: 'pi pi-pencil',
    description: 'IELTS, TOEFL, GRE, GMAT preparation'
  },
  {
    id: 'visa',
    name: 'Visa Support',
    icon: 'pi pi-id-card',
    description: 'Visa application and documentation'
  },
  {
    id: 'career',
    name: 'Career Guidance',
    icon: 'pi pi-briefcase',
    description: 'Career planning and counseling'
  },
  {
    id: 'accommodation',
    name: 'Accommodation',
    icon: 'pi pi-home',
    description: 'Housing assistance and placement'
  },
  {
    id: 'financial',
    name: 'Financial Advisory',
    icon: 'pi pi-money-bill',
    description: 'Scholarships and funding guidance'
  }
];

const additionalFeatures = [
  { name: '24/7 Support', id: 'support_247' },
  { name: 'Virtual Consultations', id: 'virtual' },
  { name: 'Document Review', id: 'doc_review' },
  { name: 'Interview Preparation', id: 'interview' },
  { name: 'University Tours', id: 'tours' },
  { name: 'Alumni Network', id: 'alumni' },
  { name: 'Post-Arrival Support', id: 'post_arrival' }
];

const toggleService = (id) => {
  const index = selectedServices.value.indexOf(id);
  if (index === -1) {
    selectedServices.value.push(id);
  } else {
    selectedServices.value.splice(index, 1);
  }
};

const addPackage = () => {
  packages.value.push({ name: '', description: '', price: null });
};

const removePackage = (index) => {
  packages.value.splice(index, 1);
};

const isValid = computed(() => 
  selectedServices.value.length > 0 &&
  packages.value.some(p => p.name.trim() !== '' && p.description.trim() !== '' && p.price > 0) &&
  metrics.value.studentsPlaced > 0 &&
  metrics.value.successRate > 0 &&
  metrics.value.responseTime > 0 &&
  selectedFeatures.value.length > 0
);

const handleNext = () => {
  emit('next', {
    services: {
      categories: selectedServices.value,
      packages: packages.value.filter(p => p.name.trim() !== '' && p.price > 0),
      metrics: metrics.value,
      features: selectedFeatures.value
    }
  });
};

const emit = defineEmits(['next', 'back']);
</script> 