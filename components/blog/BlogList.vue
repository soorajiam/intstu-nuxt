<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});

if (props.item.featured_image === null) {
    props.item.featured_image = "https://via.placeholder.com/800x400";
}

const localePath = useLocalePath();

</script>

<template>
    <article>
        <a :href="localePath('/blog/' + item.slug)">
            <img :src="item.featured_image" class="mb-5 w-full max-w-full rounded-lg h-64" :alt="item.title">
        </a>
        <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
            <a :href="localePath('/blog/' + item.slug)">{{ item.title }}</a>
        </h2>
        <a :href="localePath('/blog/' + item.slug)"
            class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:text-blue-600 hover:no-underline">
            Read more
        </a>
    </article>
</template>