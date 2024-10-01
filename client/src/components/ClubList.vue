<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-if="error">Error: {{ error.message }}</div>
        <ul v-if="data && data.clubs">
            <li v-for="club in data.clubs" :key="club._id">
                <router-link to="/community">
                    <ClubCard :club="club" />
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable';
import ClubCard from '@/components/ClubCard.vue';
import { GET_ALL_CLUBS } from '@/utils/queries/clubQueries';

export default {
    name: 'ClubList',
    components: {
        ClubCard,
    },
    setup() {
        // Apollo provides these reactive variables directly
        const { result: data, loading, error } = useQuery(GET_ALL_CLUBS);

        // No need for onMounted because Apollo automatically manages the data flow
        return {
            loading,
            error,
            data,
        };
    },
};
</script>