<template>
    <section class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div class="grid py-8 px-4 mx-auto max-w-screen-xl lg:gap-12 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div class="place-self-center mr-auto mb-10 lg:col-span-7 xl:col-span-8 xl:mb-0">
                <span class="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1.5 rounded-full dark:bg-blue-900 dark:text-blue-200 mb-4 inline-block">AI-Powered University Insights</span>
                <h1 class="mb-4 max-w-2xl text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Get Instant Answers About Any University</h1>
                <p class="mb-6 max-w-2xl text-gray-600 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300">Chat with our AI to learn everything about your dream universities. Get instant, accurate answers about programs, campus life, admissions, and more - available 24/7.</p>
                <div class="flex flex-wrap gap-4">
                    <a href="/universities" class="inline-flex items-center py-3 px-5 font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg class="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                        Ask About Universities
                    </a>
                    <a href="/explore" class="inline-flex items-center py-3 px-5 font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                        <svg class="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                        Explore Universities
                    </a>
                </div>
                <ul class="hidden xl:flex justify-between pt-8 mt-16 border-t border-gray-200/60 dark:border-gray-700/60">
                    <li class="flex items-center group transition-transform hover:transform hover:translate-y-[-2px]">
                        <span class="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">24/7</span>
                        <div class="block pl-5 text-lg">
                            <div class="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">AI Chat</div>
                            <div class="text-gray-500 dark:text-gray-400">Always Available</div>
                        </div>
                    </li>
                    <li class="flex items-center group transition-transform hover:transform hover:translate-y-[-2px]">
                        <span class="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">1000+</span>
                        <div class="block pl-5 text-lg">
                            <div class="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Universities</div>
                            <div class="text-gray-500 dark:text-gray-400">Detailed Info</div>
                        </div>
                    </li>
                    <li class="flex items-center group transition-transform hover:transform hover:translate-y-[-2px]">
                        <span class="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">100%</span>
                        <div class="block pl-5 text-lg">
                            <div class="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Accurate</div>
                            <div class="text-gray-500 dark:text-gray-400">Up-to-date Info</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="lg:col-span-5 xl:col-span-4 lg:mt-0 lg:flex">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
                    <div class="space-y-4">
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
                        <div class="relative">
                            <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Ask anything about any university...">
                            <button class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="space-y-2">
                            <button class="text-sm px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-blue-900 dark:hover:text-blue-300 w-full text-left">
                                What are the admission requirements for Harvard?
                            </button>
                            <button class="text-sm px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-blue-900 dark:hover:text-blue-300 w-full text-left">
                                Tell me about Stanford's Computer Science program
                            </button>
                            <button class="text-sm px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-blue-900 dark:hover:text-blue-300 w-full text-left">
                                What's the cost of living at MIT?
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
// Component logic can be added here if needed
</script>
