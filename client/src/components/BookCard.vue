<template>
    <div>
        <h3>{{ book.title }}</h3>
        <p>{{ book.author }}</p>
        <p>{{ book.description }}</p>
        <img v-if="book.image" :src="book.image" :alt="book.title" />
    </div>
</template>

<script>
export default {
    name: 'BookCard',
    props: {
        book: {
            type: Object,
            required: true,
        },
    },
};
</script>