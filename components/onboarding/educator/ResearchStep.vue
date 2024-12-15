<template>
  <div class="space-y-8">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        Research Interests
      </h2>
      <p class="mt-2 text-gray-600 dark:text-gray-300">
        Share your research focus and achievements
      </p>
    </div>

    <div class="space-y-6">
      <!-- Research Areas -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Research Areas</h3>
        <div class="space-y-3">
          <div v-for="(area, index) in researchAreas" :key="index"
            class="flex items-center gap-4">
            <InputText
              v-model="researchAreas[index]"
              placeholder="Enter research area or topic"
              class="flex-grow"
            />
            <Button
              icon="pi pi-trash"
              severity="danger"
              @click="removeResearchArea(index)"
              v-if="researchAreas.length > 1"
            />
          </div>
          <Button
            label="Add Another Area"
            icon="pi pi-plus"
            class="p-button-outlined"
            @click="addResearchArea"
          />
        </div>
      </div>

      <!-- Publications -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Publications</h3>
        <InputNumber 
          v-model="publications"
          placeholder="Number of publications"
          :min="0"
          class="w-full"
        />
      </div>

      <!-- Research Interests -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Research Interests</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="interest in researchInterests" :key="interest.id"
            class="p-4 rounded-lg border-2 cursor-pointer transition-all"
            :class="[selectedInterests.includes(interest.id) ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700']"
            @click="toggleInterest(interest.id)"
          >
            <i :class="[interest.icon, 'text-2xl mb-2 text-blue-600']"></i>
            <h4 class="font-medium">{{ interest.name }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ interest.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Collaboration Preferences -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Collaboration Preferences</h3>
        <MultiSelect
          v-model="selectedCollaborations"
          :options="collaborationTypes"
          optionLabel="name"
          placeholder="Select collaboration types"
          class="w-full"
        />
      </div>
    </div>

    <div class="flex justify-between pt-6">
      <Button label="Back" class="p-button-secondary" @click="$emit('back')" />
      <Button label="Complete" :disabled="!isValid" @click="handleNext" />
    </div>
  </div>
</template>

<script setup>
const researchAreas = ref(['']);
const publications = ref(0);
const selectedInterests = ref([]);
const selectedCollaborations = ref([]);

const researchInterests = [
  {
    id: 'fundamental',
    name: 'Fundamental Research',
    icon: 'pi pi-compass',
    description: 'Basic research advancing theoretical understanding'
  },
  {
    id: 'applied',
    name: 'Applied Research',
    icon: 'pi pi-cog',
    description: 'Practical applications and solutions'
  },
  {
    id: 'interdisciplinary',
    name: 'Interdisciplinary',
    icon: 'pi pi-sitemap',
    description: 'Combining multiple fields of study'
  },
  {
    id: 'industry',
    name: 'Industry-Focused',
    icon: 'pi pi-building',
    description: 'Commercial applications and partnerships'
  }
];

const collaborationTypes = [
  { name: 'Academic Institutions', id: 'academic' },
  { name: 'Industry Partners', id: 'industry' },
  { name: 'Research Centers', id: 'research' },
  { name: 'International Collaborations', id: 'international' },
  { name: 'Government Agencies', id: 'government' }
];

const addResearchArea = () => {
  researchAreas.value.push('');
};

const removeResearchArea = (index) => {
  researchAreas.value.splice(index, 1);
};

const toggleInterest = (id) => {
  const index = selectedInterests.value.indexOf(id);
  if (index === -1) {
    selectedInterests.value.push(id);
  } else {
    selectedInterests.value.splice(index, 1);
  }
};

const isValid = computed(() => 
  researchAreas.value.some(area => area.trim() !== '') &&
  selectedInterests.value.length > 0 &&
  selectedCollaborations.value.length > 0
);

const handleNext = () => {
  emit('next', {
    research: {
      areas: researchAreas.value.filter(area => area.trim() !== ''),
      publications: publications.value,
      interests: selectedInterests.value,
      collaborations: selectedCollaborations.value
    }
  });
};

const emit = defineEmits(['next', 'back']);
</script> 