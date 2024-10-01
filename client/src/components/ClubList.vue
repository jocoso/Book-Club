<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-if="error">Error: {{ error.message }}</div>
        <ul v-if="data">
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
import { ref, onMounted } from 'vue';
import ClubCard from '@/components/ClubCard.vue';
import { GET_ALL_CLUBS } from '@/utils/queries/clubQueries';

export default {
    name: 'ClubList',
    components: {
        ClubCard,
    },
    setup() {
        const loading = ref(true);
        const error = ref(null);
        const data = ref(null);

        const { result, loading: apolloLoading, error: apolloError } = useQuery(GET_ALL_CLUBS);

        onMounted(() => {
            loading.value = apolloLoading;
            error.value = apolloError;
            data.value = result;
        });

        return {
            loading,
            error,
            data,
        };
    },
};
</script>