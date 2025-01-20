<template>
    <section class="bg-white dark:bg-gray-900 py-12">
        <div class="max-w-3xl mx-auto px-4">
            <div class="text-center">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Get Expert University Guidance
                </h2>
                <p class="text-gray-600 dark:text-gray-400 mb-6">
                    Join 10,000+ students receiving weekly updates on:
                    <span class="block mt-3 space-y-1">
                        ✓ $10,000+ in scholarships <br>
                        ✓ Admission strategies <br>
                        ✓ Career opportunities
                    </span>
                </p>
                <form class="max-w-md mx-auto">
                    <div class="flex flex-col sm:flex-row gap-3">
                        <input 
                            v-model="email"
                            type="email" 
                            placeholder="Your email address"
                            required
                            @blur="validateEmail"
                            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                        <button
                            @click.prevent="subscribe"
                            type="submit"
                            class="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Subscribe
                        </button>
                    </div>
                    
                    <NuxtTurnstile 
                        v-if="error=='' && email.length>3" 
                        v-model="token"
                        class="mt-4" 
                    />

                    <p class="mt-4 text-sm text-gray-500">
                        🔒 No spam. Unsubscribe anytime.
                    </p>

                    <p v-if="error" class="mt-2 text-sm text-red-500">
                        {{ error }}
                    </p>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup>
const email = ref('');
const error = ref('');
const token = ref('');

const subscribe = async () => {
    validateTurnstile();
    if (error.value == '' && email.value.length>3){
        try {
            const response = await useCustomFetch('marketing/newsletter/subscribe/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email.value,
                }),
            });
            error.value = '';
        } catch (error_message) {
            error.value = 'Invalid email or already subscribed';
        }
    }
};

watch(email, (newValue, oldValue) => {
    if (newValue.length === 0){
        error.value = '';
        return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newValue)) {
        error.value = 'Please enter a valid email address';
    } else {
        error.value = '';
    }
});

const validateTurnstile = async () => {
    try {
        const { data, error } = await useFetch('/_turnstile/validate', {
            method: 'POST',
            body: { token: token }
        });

        if (error.value) {
            error.value = 'Validation failed. Please try again.';
        } else {
            error.value = '';
        }
    } catch (err) {
        error.value = 'Error: ' + err.message;
    }
};
</script>