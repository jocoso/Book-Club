<template>
    <nav>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/book-clubs">Book Clubs</router-link></li>
            <li><router-link to="/discussions/clubId">Discussions</router-link></li>
            <li><router-link to="/reviews/bookId">Reviews</router-link></li>
            <li v-if="user"><router-link to="/profile">Profile</router-link></li>
            <li v-if="user">
                <router-link to="/user-settings">Settings</router-link>
                <button @click="handleLogout">Logout</button>
            </li>
            <li v-else>
                <router-link to="/login">Login</router-link>
                <router-link to="/signup">Signup</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
import { useQuery } from '@vue/apollo-composable';
import { GET_ME } from '@/utils/queries/userQueries';
import { ref } from 'vue';

export default {
    name: 'Navigation',
    setup() {
        // Fetch the current logged-in user using the GET_ME query
        const { result: user, refetch } = useQuery(GET_ME, null, { fetchPolicy: 'network-only' });
        
        // Function to handle logout
        const handleLogout = () => {
            localStorage.removeItem('id_token'); // Clear token on logout
            localStorage.removeItem('user_id');
            refetch(); // Optionally refetch data or redirect after logout
            window.location.href = '/login'; // Redirect to login page
        };

        return {
            user,
            handleLogout,
        };
    },
};
</script>
