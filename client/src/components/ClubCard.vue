<template>
    <div>
        <!-- If there is no error, display club information -->
        <div v-if="!club.error">
            <h1>{{ club.name }}</h1>
            <p>{{ club.description }}</p>
            <p>Created by: {{ club.founder.username }}</p>
            <div>{{ club.img || 'Default Image' }}</div>
            <p>Members: {{ club.memberCount }}</p>
        </div>

        <!-- If there is an error, display the error message -->
        <div v-else>
            {{ club.error }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'ClubCard',
    props: {
        club: {
            type: Object,
            default: () => ({ error: "Club couldn't be displayed" })
        }
    }
};
</script>