<template>
    <nav>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/book-clubs">Book Clubs</router-link></li>
            <li><router-link to="/discussions/clubId">Discussions</router-link></li>
            <li><router-link to="/reviews/bookId">Reviews</router-link></li>
            <li><router-link to="/user-profile">Profile</router-link></li>
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
import { inject } from 'vue';

export default {
    name: 'Navigation',
    setup() {
        // Access the UserContext using inject
        const { user, setUser } = inject('UserContext');

        // Function to handle logout
        const handleLogout = () => {
            setUser(null); // Set user to null, effectively logging out
            // Additional logout logic like clearing tokens or redirecting
        };

        return {
            user,
            handleLogout,
        };
    },
};
</script>