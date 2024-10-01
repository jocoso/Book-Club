<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-if="error">Error: {{ error.message }}</div>
        <ul v-if="data">
            <li v-for="book in data.books" :key="book._id">
                <router-link to="/community">
                    <BookCard :book="book" />
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable';
import { gql } from 'graphql-tag'; // Or you can use '@apollo/client/core'
import BookCard from '@/components/BookCard.vue';

const GET_X_BOOKS = gql`
    query Books($limit: Int) {
        books(limit: $limit) {
        _id
        title
        author
        description
        image
        }
    }`;

export default {
    name: 'LimitedBookList',
    components: {
        BookCard,
    },
    setup() {
        const { result, loading, error } = useQuery(GET_X_BOOKS, { limit: 10 });

        return {
            loading,
            error,
            data: result,
        };
    },
};
</script>