<template>
    <div>
        <ul v-if="data && data.users && data.users.length">
            <!-- Map through the users and display each one -->
            <li v-for="user in data.users" :key="user._id">
                {{ user.username }} - {{ user.email }}
                <button @click="handleAddFriend('loggedInUserId', user._id)">Add Friend</button>
            </li>
        </ul>
        <p v-else>No users found</p> <!-- Display message when no users are available -->
    </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable';
import { GET_ALL_USERS } from '@/utils/queries/userQueries';
import { ADD_FRIEND } from '@/utils/mutations/userMutations';

export default {
    setup() {
        // Fetch all users using the GET_ALL_USERS query
        const { result, loading, error } = useQuery(GET_ALL_USERS);

        // Handler function to add a friend
        const handleAddFriend = async (userId, friendId) => {
            try {
                const response = await mutate({ variables: { userId, friendId } });
                console.log('Friend added:', response.data.addFriend);
            } catch (err) {
                console.error('Error adding friend:', err);
            }
        };

        return {
            data: result, // Automatically updated with query result
            loading,
            error,
            handleAddFriend,
        };
    },
};
</script>