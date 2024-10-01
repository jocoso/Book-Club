<template>
    <div>
        <h1>Welcome to the Book Club Hub</h1>
        <p>Your ultimate platform for book clubs!</p>
        <!-- Link to the user list -->
        <router-link to="/users">View All Users</router-link>

        <h1>Latest Books</h1>
        <LimitedBookList />
    </div>
</template>

<script>
import LimitedBookList from '@/components/LimitedBookList.vue';

export default {
    name: 'HomePage',
    components: {
        LimitedBookList,
    },
};
</script>