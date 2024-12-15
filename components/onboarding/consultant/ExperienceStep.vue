<template>
  <div class="space-y-8">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        Professional Experience
      </h2>
      <p class="mt-2 text-gray-600 dark:text-gray-300">
        Tell us about your experience in education consulting
      </p>
    </div>

    <div class="space-y-6">
      <!-- Years of Experience -->
      <div class="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
        <h3 class="text-lg font-semibold mb-4">Years in Education Consulting</h3>
        <Slider
          v-model="yearsExperience"
          :min="0"
          :max="30"
          :step="1"
          class="mt-8"
        />
        <div class="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          {{ yearsExperience }} years
        </div>
      </div>

      <!-- Specializations -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Areas of Specialization</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="specialization in specializations" :key="specialization.id"
            class="p-4 rounded-lg border-2 cursor-pointer transition-all"
            :class="[selectedSpecializations.includes(specialization.id) ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700']"
            @click="toggleSpecialization(specialization.id)"
          >
            <i :class="[specialization.icon, 'text-2xl mb-2 text-blue-600']"></i>
            <h4 class="font-medium">{{ specialization.name }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ specialization.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Certifications -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Professional Certifications</h3>
        <div class="space-y-3">
          <div v-for="(cert, index) in certifications" :key="index"
            class="flex items-center gap-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
              <InputText
                v-model="certifications[index].name"
                placeholder="Certification name"
                class="w-full"
              />
              <InputText
                v-model="certifications[index].issuer"
                placeholder="Issuing organization"
                class="w-full"
              />
            </div>
            <Button
              icon="pi pi-trash"
              severity="danger"
              @click="removeCertification(index)"
              v-if="certifications.length > 1"
            />
          </div>
          <Button
            label="Add Certification"
            icon="pi pi-plus"
            class="p-button-outlined"
            @click="addCertification"
          />
        </div>
      </div>

      <!-- Institution Partnerships -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Institution Partnerships</h3>
        <div class="space-y-3">
          <div v-for="(partner, index) in partnerships" :key="index"
            class="p-4 rounded-lg border dark:border-gray-700">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="md:col-span-2">
                <InputText
                  v-model="partnerships[index].name"
                  placeholder="Institution name"
                  class="w-full mb-2"
                />
                <Dropdown
                  v-model="partnerships[index].type"
                  :options="partnershipTypes"
                  optionLabel="name"
                  placeholder="Partnership type"
                  class="w-full"
                />
              </div>
              <div>
                <InputNumber
                  v-model="partnerships[index].placements"
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
              @click="removePartnership(index)"
              v-if="partnerships.length > 1"
            />
          </div>
          <Button
            label="Add Partnership"
            icon="pi pi-plus"
            class="p-button-outlined"
            @click="addPartnership"
          />
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
const yearsExperience = ref(0);
const selectedSpecializations = ref([]);
const certifications = ref([{ name: '', issuer: '' }]);
const partnerships = ref([{ name: '', type: null, placements: null }]);

const specializations = [
  {
    id: 'undergrad',
    name: 'Undergraduate Studies',
    icon: 'pi pi-book',
    description: 'Bachelor\'s degree admissions'
  },
  {
    id: 'graduate',
    name: 'Graduate Studies',
    icon: 'pi pi-bookmark',
    description: 'Master\'s and PhD programs'
  },
  {
    id: 'mba',
    name: 'MBA Programs',
    icon: 'pi pi-briefcase',
    description: 'Business school admissions'
  },
  {
    id: 'medicine',
    name: 'Medical Education',
    icon: 'pi pi-heart',
    description: 'Medical and healthcare programs'
  }
];

const partnershipTypes = [
  { name: 'Official Representative', id: 'official' },
  { name: 'Preferred Partner', id: 'preferred' },
  { name: 'Recruitment Partner', id: 'recruitment' },
  { name: 'Strategic Alliance', id: 'strategic' }
];

const toggleSpecialization = (id) => {
  const index = selectedSpecializations.value.indexOf(id);
  if (index === -1) {
    selectedSpecializations.value.push(id);
  } else {
    selectedSpecializations.value.splice(index, 1);
  }
};

const addCertification = () => {
  certifications.value.push({ name: '', issuer: '' });
};

const removeCertification = (index) => {
  certifications.value.splice(index, 1);
};

const addPartnership = () => {
  partnerships.value.push({ name: '', type: null, placements: null });
};

const removePartnership = (index) => {
  partnerships.value.splice(index, 1);
};

const isValid = computed(() => 
  yearsExperience.value > 0 &&
  selectedSpecializations.value.length > 0 &&
  certifications.value.some(c => c.name.trim() !== '' && c.issuer.trim() !== '') &&
  partnerships.value.some(p => p.name.trim() !== '' && p.type && p.placements > 0)
);

const handleNext = () => {
  emit('next', {
    experience: {
      years: yearsExperience.value,
      specializations: selectedSpecializations.value,
      certifications: certifications.value.filter(c => c.name.trim() !== '' && c.issuer.trim() !== ''),
      partnerships: partnerships.value.filter(p => p.name.trim() !== '' && p.type && p.placements > 0)
    }
  });
};

const emit = defineEmits(['next', 'back']);
</script> 