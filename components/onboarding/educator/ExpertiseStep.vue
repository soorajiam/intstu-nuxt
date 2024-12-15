<template>
  <div class="space-y-8">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        Your Academic Expertise
      </h2>
      <p class="mt-2 text-gray-600 dark:text-gray-300">
        Tell us about your academic background and specializations
      </p>
    </div>

    <div class="space-y-6">
      <!-- Academic Fields -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Fields of Expertise</h3>
        <MultiSelect
          v-model="selectedFields"
          :options="academicFields"
          optionLabel="name"
          placeholder="Select your academic fields"
          :maxSelectedLabels="3"
          class="w-full"
        />
      </div>

      <!-- Academic Level -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Academic Level</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="level in academicLevels" :key="level.id"
            class="p-4 rounded-lg border-2 cursor-pointer transition-all"
            :class="[
              selectedLevel === level.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700'
            ]"
            @click="selectedLevel = level.id"
          >
            <i :class="[level.icon, 'text-2xl mb-2 text-blue-600']"></i>
            <h4 class="font-medium">{{ level.name }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ level.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Years of Experience -->
      <div class="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
        <h3 class="text-lg font-semibold mb-4">Years of Experience</h3>
        <Slider
          v-model="yearsExperience"
          :min="0"
          :max="40"
          :step="1"
          class="mt-8"
        />
        <div class="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          {{ yearsExperience }} years
        </div>
      </div>

      <!-- Certifications -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Certifications & Qualifications</h3>
        <div class="space-y-3">
          <div v-for="(cert, index) in certifications" :key="index"
            class="flex items-center gap-4">
            <InputText
              v-model="certifications[index]"
              placeholder="Enter certification or qualification"
              class="flex-grow"
            />
            <Button
              icon="pi pi-trash"
              severity="danger"
              @click="removeCertification(index)"
              v-if="certifications.length > 1"
            />
          </div>
          <Button
            label="Add Another"
            icon="pi pi-plus"
            class="p-button-outlined"
            @click="addCertification"
          />
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
const selectedFields = ref([]);
const selectedLevel = ref(null);
const yearsExperience = ref(5);
const certifications = ref(['']);

const academicFields = [
  { name: 'Computer Science', id: 'cs' },
  { name: 'Engineering', id: 'eng' },
  { name: 'Mathematics', id: 'math' },
  { name: 'Physics', id: 'phys' },
  { name: 'Chemistry', id: 'chem' },
  { name: 'Biology', id: 'bio' },
  { name: 'Business', id: 'bus' },
  { name: 'Economics', id: 'econ' },
  { name: 'Psychology', id: 'psych' },
  { name: 'Sociology', id: 'soc' },
  { name: 'Literature', id: 'lit' },
  { name: 'History', id: 'hist' },
  { name: 'Philosophy', id: 'phil' },
  { name: 'Arts', id: 'arts' },
  { name: 'Medicine', id: 'med' }
];

const academicLevels = [
  {
    id: 'professor',
    name: 'Professor',
    icon: 'pi pi-user',
    description: 'Full-time academic faculty member'
  },
  {
    id: 'researcher',
    name: 'Researcher',
    icon: 'pi pi-chart-line',
    description: 'Focused on research and development'
  }
];

const addCertification = () => {
  certifications.value.push('');
};

const removeCertification = (index) => {
  certifications.value.splice(index, 1);
};

const isValid = computed(() => 
  selectedFields.value.length > 0 &&
  selectedLevel.value &&
  yearsExperience.value >= 0 &&
  certifications.value.some(cert => cert.trim() !== '')
);

const handleNext = () => {
  emit('next', {
    expertise: {
      fields: selectedFields.value,
      level: selectedLevel.value,
      yearsExperience: yearsExperience.value,
      certifications: certifications.value.filter(cert => cert.trim() !== '')
    }
  });
};

const emit = defineEmits(['next', 'back']);
</script> 