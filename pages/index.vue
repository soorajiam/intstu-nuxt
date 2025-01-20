<script setup>
import { ref } from 'vue'

const testimonials = ref([
    {
        name: "Sarah Chen",
        university: "Stanford University",
        image: "https://ui-avatars.com/api/?name=Sarah+Chen&background=2563EB&color=fff",
        quote: "Finding my dream university was so much easier with the help of current students on this platform!"
    },
    {
        name: "James Miller",
        university: "Oxford University",
        image: "https://ui-avatars.com/api/?name=James+Miller&background=1D4ED8&color=fff",
        quote: "The direct conversations with university ambassadors helped me make my final decision."
    }
])
</script>

<template>
    <div class="min-h-screen">
        <!-- Hero Section -->
        <HomeHero />

        <!-- Social Proof Section -->
        <section class="py-12 bg-white dark:bg-gray-900">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Trusted by Students Worldwide</h2>
                    <div class="mt-8 flex justify-center space-x-8">
                        <div class="flex flex-col items-center">
                            <span class="text-4xl font-bold text-blue-600">50K+</span>
                            <span class="text-gray-600 dark:text-gray-400">Active Students</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <span class="text-4xl font-bold text-blue-600">1000+</span>
                            <span class="text-gray-600 dark:text-gray-400">Universities</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <span class="text-4xl font-bold text-blue-600">90%</span>
                            <span class="text-gray-600 dark:text-gray-400">Success Rate</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Universities -->
        <HomeIntstitutesBanner />

        <!-- How It Works Section -->
        <section class="py-16 bg-gray-50 dark:bg-gray-800">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white">How It Works</h2>
                    <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">Your journey to the perfect university in three simple steps</p>
                </div>
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                        <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                            <span class="text-2xl text-blue-600 dark:text-blue-400">1</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Ask AI Assistant</h3>
                        <p class="text-gray-600 dark:text-gray-400">Get instant answers about programs, admissions, and campus life from our AI</p>
                    </div>
                    <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                        <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                            <span class="text-2xl text-blue-600 dark:text-blue-400">2</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Join Discussion Forums</h3>
                        <p class="text-gray-600 dark:text-gray-400">Connect with verified current students in university-specific forums</p>
                    </div>
                    <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                        <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                            <span class="text-2xl text-blue-600 dark:text-blue-400">3</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Make Informed Decisions</h3>
                        <p class="text-gray-600 dark:text-gray-400">Combine AI insights with real student experiences to choose your perfect university</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Community Discussion Section -->
        <section class="py-16 bg-white dark:bg-gray-900">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                    <div class="relative">
                        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Connect with Real Students
                        </h2>
                        <p class="mt-4 text-lg text-gray-500 dark:text-gray-400">
                            Join university-specific discussion forums where verified current students share their authentic experiences and answer your questions.
                        </p>
                        <dl class="mt-10 space-y-10">
                            <div class="relative">
                                <dt>
                                    <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Verified Students</p>
                                </dt>
                                <dd class="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                                    All student contributors are verified through their university email addresses.
                                </dd>
                            </div>
                            <div class="relative">
                                <dt>
                                    <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                        </svg>
                                    </div>
                                    <p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Active Discussions</p>
                                </dt>
                                <dd class="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                                    Engage in topic-specific discussions about academics, campus life, and more.
                                </dd>
                            </div>
                            <div class="relative">
                                <dt>
                                    <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Diverse Perspectives</p>
                                </dt>
                                <dd class="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                                    Get insights from students across different years, majors, and backgrounds.
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <div class="mt-10 lg:mt-0">
                        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                            <div class="px-6 py-8">
                                <div class="space-y-6">
                                    <!-- Discussion Preview 1 -->
                                    <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
                                        <div class="flex items-center mb-4">
                                            <img src="https://ui-avatars.com/api/?name=Alex+Wang&background=4F46E5&color=fff" alt="Student" class="w-10 h-10 rounded-full">
                                            <div class="ml-3">
                                                <p class="text-sm font-medium text-gray-900 dark:text-white">Alex Wang</p>
                                                <p class="text-xs text-gray-500 dark:text-gray-400">Computer Science, Stanford '24</p>
                                            </div>
                                            <span class="ml-auto px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-200">Verified</span>
                                        </div>
                                        <p class="text-sm text-gray-600 dark:text-gray-300">"The CS program here is intense but rewarding. Happy to share my experience about classes, internships, and campus life!"</p>
                                        <div class="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <span class="flex items-center">
                                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                </svg>
                                                15 replies
                                            </span>
                                            <span class="mx-2">•</span>
                                            <span>2 hours ago</span>
                                        </div>
                                    </div>
                                    <!-- Discussion Preview 2 -->
                                    <div>
                                        <div class="flex items-center mb-4">
                                            <img src="https://ui-avatars.com/api/?name=Emma+Davis&background=3B82F6&color=fff" alt="Student" class="w-10 h-10 rounded-full">
                                            <div class="ml-3">
                                                <p class="text-sm font-medium text-gray-900 dark:text-white">Emma Davis</p>
                                                <p class="text-xs text-gray-500 dark:text-gray-400">Biology, Harvard '23</p>
                                            </div>
                                            <span class="ml-auto px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-200">Verified</span>
                                        </div>
                                        <p class="text-sm text-gray-600 dark:text-gray-300">"Just finished my research project at the lab. Ask me anything about research opportunities and pre-med track!"</p>
                                        <div class="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <span class="flex items-center">
                                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                </svg>
                                                8 replies
                                            </span>
                                            <span class="mx-2">•</span>
                                            <span>1 hour ago</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-6">
                                    <NuxtLink to="/discussion" class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        Join the Discussion
                                        <svg class="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- AI Chat Feature Highlight -->
        <section class="py-16 bg-white dark:bg-gray-900">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                    <div class="relative">
                        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Chat with Our University AI
                        </h2>
                        <p class="mt-4 text-lg text-gray-500 dark:text-gray-400">
                            Get instant, accurate answers about any university. Our AI assistant is trained on comprehensive data about universities worldwide.
                        </p>
                        <dl class="mt-10 space-y-10">
                            <div class="relative">
                                <dt>
                                    <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Instant Responses</p>
                                </dt>
                                <dd class="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                                    Get immediate answers to your questions about admissions, programs, campus life, and more.
                                </dd>
                            </div>
                            <div class="relative">
                                <dt>
                                    <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                    <p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Accurate Information</p>
                                </dt>
                                <dd class="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                                    Our AI is constantly updated with the latest information from universities worldwide.
                                </dd>
                            </div>
                            <div class="relative">
                                <dt>
                                    <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">24/7 Availability</p>
                                </dt>
                                <dd class="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                                    Get answers whenever you need them, day or night, from anywhere in the world.
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <div class="mt-10 lg:mt-0">
                        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                            <div class="px-6 py-8">
                                <div class="flex items-center justify-between mb-6">
                                    <div class="flex items-center">
                                        <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                                            </svg>
                                        </div>
                                        <span class="ml-3 font-semibold text-gray-900 dark:text-white">University AI Assistant</span>
                                    </div>
                                    <span class="flex items-center text-sm text-green-500">
                                        <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        Online
                                    </span>
                                </div>
                                <div class="space-y-4">
                                    <div class="flex items-start">
                                        <div class="flex-shrink-0">
                                            <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                        </div>
                                        <div class="ml-3 bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 max-w-[80%]">
                                            <p class="text-sm text-gray-900 dark:text-white">What are the requirements for MIT's Computer Science program?</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start justify-end">
                                        <div class="mr-3 bg-blue-500 rounded-lg px-4 py-2 max-w-[80%]">
                                            <p class="text-sm text-white">MIT's Computer Science program requires:</p>
                                            <ul class="text-sm text-white mt-2 list-disc list-inside">
                                                <li>Strong math & science background</li>
                                                <li>SAT/ACT scores in top percentiles</li>
                                                <li>Programming experience recommended</li>
                                                <li>Outstanding academic record</li>
                                            </ul>
                                        </div>
                                        <div class="flex-shrink-0">
                                            <div class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                                                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-6">
                                    <div class="relative">
                                        <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Ask about any university...">
                                        <button class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Student Testimonials -->
        <section class="py-16 bg-white dark:bg-gray-900">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white">What Students Say</h2>
                    <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">Real stories from students who found their perfect match</p>
                </div>
                <div class="grid md:grid-cols-2 gap-8">
                    <div v-for="testimonial in testimonials" :key="testimonial.name" class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                        <div class="flex items-center mb-4">
                            <img :src="testimonial.image" :alt="testimonial.name" class="w-12 h-12 rounded-full mr-4">
                            <div>
                                <h4 class="font-semibold text-gray-900 dark:text-white">{{ testimonial.name }}</h4>
                                <p class="text-sm text-gray-600 dark:text-gray-400">{{ testimonial.university }}</p>
                            </div>
                        </div>
                        <p class="text-gray-600 dark:text-gray-400 italic">"{{ testimonial.quote }}"</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Latest Blog Posts -->
        <HomeBlogList />

        <!-- Smart Notifications & Alumni Network -->
        <section class="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="lg:grid lg:grid-cols-2 lg:gap-16">
                    <!-- Smart Notifications -->
                    <div class="mb-12 lg:mb-0">
                        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                            <div class="flex items-center mb-6">
                                <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                                    <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                                    </svg>
                                </div>
                                <h3 class="ml-4 text-2xl font-bold text-gray-900 dark:text-white">Smart Notifications</h3>
                            </div>
                            <p class="text-gray-600 dark:text-gray-400 mb-6">Stay informed with personalized updates tailored to your academic journey.</p>
                            <div class="space-y-4">
                                <div class="flex items-start">
                                    <div class="flex-shrink-0 mt-1">
                                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div class="ml-3">
                                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Current Students</h4>
                                        <ul class="mt-2 text-gray-600 dark:text-gray-400 space-y-2">
                                            <li class="flex items-center">
                                                <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                                Important campus events and deadlines
                                            </li>
                                            <li class="flex items-center">
                                                <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                                Visa status updates and requirements
                                            </li>
                                            <li class="flex items-center">
                                                <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                                Academic calendar reminders
                                            </li>
                                            <li class="flex items-center">
                                                <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                                Career fairs and networking events
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Alumni Network -->
                    <div>
                        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                            <div class="flex items-center mb-6">
                                <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-xl flex items-center justify-center">
                                    <svg class="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                </div>
                                <h3 class="ml-4 text-2xl font-bold text-gray-900 dark:text-white">Alumni Network</h3>
                            </div>
                            <p class="text-gray-600 dark:text-gray-400 mb-6">Stay connected with your alma mater and fellow graduates.</p>
                            <div class="space-y-4">
                                <div class="flex items-start">
                                    <div class="flex-shrink-0 mt-1">
                                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div class="ml-3">
                                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white">For Alumni</h4>
                                        <ul class="mt-2 text-gray-600 dark:text-gray-400 space-y-2">
                                            <li class="flex items-center">
                                                <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                                                Professional networking opportunities
                                            </li>
                                            <li class="flex items-center">
                                                <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                                                Alumni events and reunions
                                            </li>
                                            <li class="flex items-center">
                                                <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                                                Job postings and career resources
                                            </li>
                                            <li class="flex items-center">
                                                <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                                                Mentorship programs
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="mt-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0">
                                            <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                            </svg>
                                        </div>
                                        <p class="ml-3 text-sm text-indigo-700 dark:text-indigo-300">
                                            Join 50K+ alumni making meaningful connections and advancing their careers
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
                <p class="text-xl text-blue-100 mb-8">Join thousands of students who found their perfect university match</p>
                <div class="flex justify-center space-x-4">
                    <NuxtLink to="/auth/signup" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                        Get Started Free
                    </NuxtLink>
                    <NuxtLink to="/universities" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                        Browse Universities
                    </NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>