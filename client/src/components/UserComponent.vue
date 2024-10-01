<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-if="error">Error: {{ error.message }}</div>
        <ul v-if="data">
            <li v-for="user in data.users" :key="user._id">
                {{ user.username }} - {{ user.email }}
                <!-- Add friend button, replace 'loggedInUserId' with actual ID -->
                <button @click="handleAddFriend(loggedInUserId, user._id)">Add Friend</button>
            </li>
        </ul>
    </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable'; 
import { useMutation } from '@vue/apollo-composable';
import { ref } from 'vue';
import { GET_ALL_USERS } from '@/utils/queries/userQueries.js';
import { ADD_FRIEND } from '@/utils/mutations/userMutations.js';

export default {
    name: 'UserComponent',
    setup() {
        const loading = ref(true);
        const error = ref(null);
        const data = ref(null);
        const loggedInUserId = 'loggedInUserId'; // Replace this with the actual logged-in user's ID

        const { result, loading: apolloLoading, error: apolloError } = useQuery(GET_ALL_USERS);
        const [addFriend] = useMutation(ADD_FRIEND);

        const handleAddFriend = (userId, friendId) => {
            addFriend({ variables: { userId, friendId } })
                .then((response) => {
                    console.log('Friend added:', response.data.addFriend);
                })
                .catch((err) => {
                    console.error('Error adding friend:', err);
                });
        };

        // Update data states on mount
        loading.value = apolloLoading;
        error.value = apolloError;
        data.value = result;

        return {
            loading,
            error,
            data,
            handleAddFriend,
            loggedInUserId,
        };
    },
};
</script>