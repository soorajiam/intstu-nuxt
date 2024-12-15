<template>
  <div class="space-y-8">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        Teaching Experience
      </h2>
      <p class="mt-2 text-gray-600 dark:text-gray-300">
        Tell us about your teaching methods and preferences
      </p>
    </div>

    <div class="space-y-6">
      <!-- Teaching Levels -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Teaching Levels</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="level in teachingLevels" :key="level.id"
            class="p-4 rounded-lg border-2 cursor-pointer transition-all"
            :class="[selectedLevels.includes(level.id) ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700']"
            @click="toggleLevel(level.id)"
          >
            <i :class="[level.icon, 'text-2xl mb-2 text-blue-600']"></i>
            <h4 class="font-medium">{{ level.name }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ level.description }}</p>
          </div>
        </div>
      </div>

      <!-- Teaching Methods -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Teaching Methods</h3>
        <MultiSelect
          v-model="selectedMethods"
          :options="teachingMethods"
          optionLabel="name"
          placeholder="Select your preferred teaching methods"
          class="w-full"
        />
      </div>

      <!-- Course Types -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Course Types</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="type in courseTypes" :key="type.id"
            class="p-4 rounded-lg border-2 cursor-pointer transition-all"
            :class="[selectedCourseTypes.includes(type.id) ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700']"
            @click="toggleCourseType(type.id)"
          >
            <i :class="[type.icon, 'text-2xl mb-2 text-blue-600']"></i>
            <h4 class="font-medium">{{ type.name }}</h4>
          </div>
        </div>
      </div>

      <!-- Languages -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Teaching Languages</h3>
        <Chips v-model="teachingLanguages" placeholder="Add a language and press enter" />
      </div>
    </div>

    <div class="flex justify-between pt-6">
      <Button label="Back" class="p-button-secondary" @click="$emit('back')" />
      <Button label="Continue" :disabled="!isValid" @click="handleNext" />
    </div>
  </div>
</template>

<script setup>
const selectedLevels = ref([]);
const selectedMethods = ref([]);
const selectedCourseTypes = ref([]);
const teachingLanguages = ref([]);

const teachingLevels = [
  {
    id: 'undergraduate',
    name: 'Undergraduate',
    icon: 'pi pi-users',
    description: 'Bachelor level courses'
  },
  {
    id: 'graduate',
    name: 'Graduate',
    icon: 'pi pi-briefcase',
    description: 'Master\'s and PhD level'
  }
];

const teachingMethods = [
  { name: 'Lecture-Based', id: 'lecture' },
  { name: 'Project-Based Learning', id: 'project' },
  { name: 'Case Studies', id: 'case' },
  { name: 'Flipped Classroom', id: 'flipped' },
  { name: 'Problem-Based Learning', id: 'problem' },
  { name: 'Group Discussions', id: 'group' }
];

const courseTypes = [
  { id: 'inperson', name: 'In-Person', icon: 'pi pi-users' },
  { id: 'online', name: 'Online', icon: 'pi pi-desktop' },
  { id: 'hybrid', name: 'Hybrid', icon: 'pi pi-sync' }
];

const toggleLevel = (id) => {
  const index = selectedLevels.value.indexOf(id);
  if (index === -1) {
    selectedLevels.value.push(id);
  } else {
    selectedLevels.value.splice(index, 1);
  }
};

const toggleCourseType = (id) => {
  const index = selectedCourseTypes.value.indexOf(id);
  if (index === -1) {
    selectedCourseTypes.value.push(id);
  } else {
    selectedCourseTypes.value.splice(index, 1);
  }
};

const isValid = computed(() => 
  selectedLevels.value.length > 0 &&
  selectedMethods.value.length > 0 &&
  selectedCourseTypes.value.length > 0 &&
  teachingLanguages.value.length > 0
);

const handleNext = () => {
  emit('next', {
    teaching: {
      levels: selectedLevels.value,
      methods: selectedMethods.value,
      courseTypes: selectedCourseTypes.value,
      languages: teachingLanguages.value
    }
  });
};

const emit = defineEmits(['next', 'back']);
</script> 