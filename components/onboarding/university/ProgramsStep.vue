<template>
  <div class="space-y-8">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        Academic Programs
      </h2>
      <p class="mt-2 text-gray-600 dark:text-gray-300">
        Tell us about the programs your institution offers
      </p>
    </div>

    <div class="space-y-6">
      <!-- Program Levels -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Program Levels Offered</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="level in programLevels" :key="level.id"
            class="p-4 rounded-lg border-2 cursor-pointer transition-all"
            :class="[selectedLevels.includes(level.id) ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700']"
            @click="toggleLevel(level.id)"
          >
            <i :class="[level.icon, 'text-2xl mb-2 text-blue-600']"></i>
            <h4 class="font-medium">{{ level.name }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ level.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Fields of Study -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Fields of Study</h3>
        <div class="space-y-3">
          <div v-for="(field, index) in fields" :key="index"
            class="p-4 rounded-lg border dark:border-gray-700">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="md:col-span-2">
                <InputText
                  v-model="fields[index].name"
                  placeholder="Field name (e.g., Computer Science)"
                  class="w-full"
                />
              </div>
              <div>
                <InputNumber
                  v-model="fields[index].programs"
                  placeholder="# of programs"
                  :min="1"
                  class="w-full"
                />
              </div>
            </div>
            <Button
              icon="pi pi-trash"
              severity="danger"
              class="mt-2"
              @click="removeField(index)"
              v-if="fields.length > 1"
            />
          </div>
          <Button
            label="Add Field"
            icon="pi pi-plus"
            class="p-button-outlined"
            @click="addField"
          />
        </div>
      </div>

      <!-- Delivery Methods -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Program Delivery Methods</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="method in deliveryMethods" :key="method.id"
            class="p-4 rounded-lg border-2 cursor-pointer transition-all"
            :class="[selectedMethods.includes(method.id) ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700']"
            @click="toggleMethod(method.id)"
          >
            <i :class="[method.icon, 'text-2xl mb-2 text-blue-600']"></i>
            <h4 class="font-medium">{{ method.name }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ method.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Language of Instruction -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Languages of Instruction</h3>
        <MultiSelect
          v-model="selectedLanguages"
          :options="languages"
          optionLabel="name"
          placeholder="Select languages"
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
const selectedLevels = ref([]);
const fields = ref([{ name: '', programs: null }]);
const selectedMethods = ref([]);
const selectedLanguages = ref([]);

const programLevels = [
  {
    id: 'undergraduate',
    name: 'Undergraduate',
    icon: 'pi pi-book',
    description: 'Bachelor\'s degree programs'
  },
  {
    id: 'graduate',
    name: 'Graduate',
    icon: 'pi pi-bookmark',
    description: 'Master\'s degree programs'
  },
  {
    id: 'doctorate',
    name: 'Doctorate',
    icon: 'pi pi-verified',
    description: 'PhD and doctoral programs'
  },
  {
    id: 'certificate',
    name: 'Certificates',
    icon: 'pi pi-ticket',
    description: 'Professional certificates'
  }
];

const deliveryMethods = [
  {
    id: 'oncampus',
    name: 'On Campus',
    icon: 'pi pi-building',
    description: 'Traditional in-person learning'
  },
  {
    id: 'online',
    name: 'Online',
    icon: 'pi pi-desktop',
    description: 'Fully online programs'
  },
  {
    id: 'hybrid',
    name: 'Hybrid',
    icon: 'pi pi-sync',
    description: 'Mix of online and on-campus'
  }
];

const languages = [
  { name: 'English', code: 'en' },
  { name: 'Spanish', code: 'es' },
  { name: 'French', code: 'fr' },
  { name: 'German', code: 'de' },
  { name: 'Chinese', code: 'zh' },
  { name: 'Japanese', code: 'ja' },
  { name: 'Arabic', code: 'ar' }
];

const toggleLevel = (id) => {
  const index = selectedLevels.value.indexOf(id);
  if (index === -1) {
    selectedLevels.value.push(id);
  } else {
    selectedLevels.value.splice(index, 1);
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

const addField = () => {
  fields.value.push({ name: '', programs: null });
};

const removeField = (index) => {
  fields.value.splice(index, 1);
};

const isValid = computed(() => 
  selectedLevels.value.length > 0 &&
  fields.value.some(f => f.name.trim() !== '' && f.programs > 0) &&
  selectedMethods.value.length > 0 &&
  selectedLanguages.value.length > 0
);

const handleNext = () => {
  emit('next', {
    programs: {
      levels: selectedLevels.value,
      fields: fields.value.filter(f => f.name.trim() !== '' && f.programs > 0),
      methods: selectedMethods.value,
      languages: selectedLanguages.value
    }
  });
};

const emit = defineEmits(['next', 'back']);
</script> 