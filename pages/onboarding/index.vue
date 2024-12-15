<template>
  <div >
   
    <!-- <div class="absolute top-4 left-4 right-4 flex justify-between items-center px-4">
      <NuxtLink to="/" class="flex items-center">
        <img class="h-8" src="/images/logo/intstu_logo.png" alt="Intstu Logo">
      </NuxtLink>
      <NuxtLink 
        to="/auth/login" 
        class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
      >
        Already have an account? Sign in
      </NuxtLink>
    </div> -->

    <!-- Resume Banner -->
    <ResumeBanner
      v-if="showResumeBanner"
      :hasIncompleteOnboarding="!!savedProgress"
      :userType="savedProgress?.type"
      :currentStep="savedProgress?.step"
      :totalSteps="getTotalSteps(savedProgress?.type)"
      @resume="resumeOnboarding"
      @dismiss="dismissResumeBanner"
    />

    <div class="container mx-auto px-4 py-12">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ headerText }}
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            {{ subheaderText }}
          </p>
        </div>

        <!-- User Type Selection -->
        <div v-if="!selectedType">
          <UserTypeSelector @select="handleTypeSelection" />
        </div>

        <!-- Dynamic Steps -->
        <div v-else class="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          <ProgressBar :steps="currentSteps" :current-step="currentStepIndex" />
          
          <Suspense>
            <component
              :is="currentComponent"
              v-model="onboardingData"
              @next="handleNext"
              @back="handleBack"
            />
            <template #fallback>
              <div class="flex justify-center items-center p-8">
                <span class="text-gray-500">Loading...</span>
              </div>
            </template>
          </Suspense>
        </div>
      </div>
    </div>

    <!-- Progress Saving Notice -->
    <div v-if="selectedType" class="fixed bottom-4 left-4 right-4 text-center text-sm text-gray-600 dark:text-gray-400">
      Your progress is automatically saved. You can continue later.
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, defineComponent } from 'vue';
import UserTypeSelector from '~/components/onboarding/UserTypeSelector.vue';
import ProgressBar from '~/components/onboarding/ProgressBar.vue';
import ResumeBanner from '~/components/onboarding/ResumeBanner.vue';
import ErrorStep from '~/components/onboarding/ErrorStep.vue';

definePageMeta({
  auth: false
});

const router = useRouter();
const selectedType = ref(null);
const currentStepIndex = ref(0);
const onboardingData = ref({});
const showResumeBanner = ref(false);
const savedProgress = ref(null);

// Dynamic text based on state
const headerText = computed(() => {
  if (selectedType.value) {
    return 'Customize Your Experience';
  }
  return 'Welcome to Intstu';
});

const subheaderText = computed(() => {
  if (selectedType.value) {
    return 'Complete your profile to get personalized recommendations';
  }
  return 'Let\'s personalize your experience. Tell us about yourself.';
});

// Get total steps for a user type
const getTotalSteps = (type) => {
  const stepCounts = {
    student: 4,
    educator: 3,
    university: 3,
    consultant: 3
  };
  return type ? stepCounts[type] : 0;
};

// Check for saved progress
onMounted(() => {
  const progress = localStorage.getItem('onboardingProgress');
  if (progress) {
    savedProgress.value = JSON.parse(progress);
    showResumeBanner.value = true;
  }
});

// Resume onboarding from saved progress
const resumeOnboarding = () => {
  if (savedProgress.value) {
    selectedType.value = savedProgress.value.type;
    currentStepIndex.value = savedProgress.value.step;
    onboardingData.value = savedProgress.value.data;
    showResumeBanner.value = false;
  }
};

// Dismiss resume banner and clear saved progress
const dismissResumeBanner = () => {
  showResumeBanner.value = false;
  localStorage.removeItem('onboardingProgress');
  savedProgress.value = null;
};

// Save progress to localStorage
watch([selectedType, currentStepIndex, onboardingData], () => {
  if (selectedType.value) {
    const progress = {
      type: selectedType.value,
      step: currentStepIndex.value,
      data: onboardingData.value
    };
    localStorage.setItem('onboardingProgress', JSON.stringify(progress));
    savedProgress.value = progress;
  }
}, { deep: true });

// Dynamic component loading based on user type and step
const currentComponent = computed(() => {
  if (!selectedType.value) return null;
  
  const componentMap = {
    student: [
      defineAsyncComponent(() => import('~/components/onboarding/student/GoalsStep.vue')),
      defineAsyncComponent(() => import('~/components/onboarding/student/PreferencesStep.vue')),
      defineAsyncComponent(() => import('~/components/onboarding/student/BudgetStep.vue')),
      defineAsyncComponent(() => import('~/components/onboarding/student/TimelineStep.vue'))
    ],
    educator: [
      defineAsyncComponent(() => import('~/components/onboarding/educator/ExpertiseStep.vue')),
      defineAsyncComponent(() => import('~/components/onboarding/educator/TeachingStep.vue')),
      defineAsyncComponent(() => import('~/components/onboarding/educator/ResearchStep.vue'))
    ],
    university: [
      defineAsyncComponent(() => import('~/components/onboarding/university/InstitutionStep.vue')),
      defineAsyncComponent(() => import('~/components/onboarding/university/ProgramsStep.vue')),
      defineAsyncComponent(() => import('~/components/onboarding/university/RecruitmentStep.vue'))
    ],
    consultant: [
      defineAsyncComponent(() => import('~/components/onboarding/consultant/ServicesStep.vue')),
      defineAsyncComponent(() => import('~/components/onboarding/consultant/ExperienceStep.vue')),
      defineAsyncComponent(() => import('~/components/onboarding/consultant/RegionsStep.vue'))
    ]
  };

  return componentMap[selectedType.value][currentStepIndex.value];
});

const handleTypeSelection = (type) => {
  selectedType.value = type;
};

const handleNext = async (data) => {
  onboardingData.value = { ...onboardingData.value, ...data };
  
  if (currentStepIndex.value === currentSteps.value.length - 1) {
    // Save final data and redirect to registration
    localStorage.setItem('finalOnboardingData', JSON.stringify({
      type: selectedType.value,
      ...onboardingData.value
    }));
    
    // Redirect to registration with type parameter
    router.push({
      path: '/auth/signup',
      query: { 
        type: selectedType.value,
        onboarding: 'completed'
      }
    });
  } else {
    currentStepIndex.value++;
  }
};

const handleBack = () => {
  if (currentStepIndex.value === 0) {
    selectedType.value = null;
    localStorage.removeItem('onboardingProgress');
  } else {
    currentStepIndex.value--;
  }
};

const currentSteps = computed(() => {
  const stepMap = {
    student: [
      { label: 'Goals', icon: 'pi pi-flag', component: 'GoalsStep' },
      { label: 'Preferences', icon: 'pi pi-sliders-h', component: 'PreferencesStep' },
      { label: 'Budget', icon: 'pi pi-money-bill', component: 'BudgetStep' },
      { label: 'Timeline', icon: 'pi pi-calendar', component: 'TimelineStep' }
    ],
    educator: [
      { label: 'Expertise', icon: 'pi pi-book', component: 'ExpertiseStep' },
      { label: 'Teaching', icon: 'pi pi-users', component: 'TeachingStep' },
      { label: 'Research', icon: 'pi pi-chart-bar', component: 'ResearchStep' }
    ],
    university: [
      { label: 'Institution', icon: 'pi pi-building', component: 'InstitutionStep' },
      { label: 'Programs', icon: 'pi pi-list', component: 'ProgramsStep' },
      { label: 'Recruitment', icon: 'pi pi-users', component: 'RecruitmentStep' }
    ],
    consultant: [
      { label: 'Services', icon: 'pi pi-briefcase', component: 'ServicesStep' },
      { label: 'Experience', icon: 'pi pi-star', component: 'ExperienceStep' },
      { label: 'Regions', icon: 'pi pi-globe', component: 'RegionsStep' }
    ]
  };

  return selectedType.value ? stepMap[selectedType.value] : [];
});
</script>

<style scoped>
.container {
  margin-top: 2rem;
}

/* Add smooth transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>