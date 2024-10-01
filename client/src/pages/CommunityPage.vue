<template>
    <div>
        <h1>Communities</h1>
        <p>These are some of our communities</p>
        <ClubList />
    </div>
</template>

<script>
import ClubList from '@/components/ClubList.vue';

export default {
    name: 'CommunityPage',
    components: {
        ClubList,
    },
};
</script>