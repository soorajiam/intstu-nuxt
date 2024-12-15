<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
    <div v-for="type in userTypes" 
         :key="type.id"
         class="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
         @click="selectType(type.id)">
      
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0">
        <img :src="type.image" :alt="type.title" 
             class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity"></div>
      </div>

      <!-- Content -->
      <div class="relative h-80 p-6 flex flex-col justify-end">
        <!-- Icon -->
        <div class="mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <i :class="type.icon" class="text-4xl text-white opacity-90"></i>
        </div>

        <!-- Title -->
        <h3 class="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {{ type.title }}
        </h3>

        <!-- Description -->
        <p class="text-gray-200 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          {{ type.description }}
        </p>

        <!-- Hover Indicator -->
        <div class="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const userTypes = [
  {
    id: 'student',
    title: 'Student',
    description: 'Looking to pursue higher education and find the perfect program',
    image: '/images/onboarding/student.jpg',
    icon: 'pi pi-user'
  },
  {
    id: 'educator',
    title: 'Educator',
    description: 'Share your knowledge and connect with institutions worldwide',
    image: '/images/onboarding/educator.jpg',
    icon: 'pi pi-book'
  },
  {
    id: 'university',
    title: 'University Staff',
    description: 'Represent your institution and attract global talent',
    image: '/images/onboarding/university.jpg',
    icon: 'pi pi-building'
  },
  {
    id: 'consultant',
    title: 'Education Consultant', 
    description: 'Guide students in their educational journey',
    image: '/images/onboarding/consultant.jpg',
    icon: 'pi pi-compass'
  }
];

const emit = defineEmits(['select']);

const selectType = (type) => {
  emit('select', type);
};
</script>