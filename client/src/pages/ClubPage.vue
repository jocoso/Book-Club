<template>
  <div>
    <h1>Club Details</h1>
    <p>Club ID: {{ clubId }}</p>
    <!-- Add club details content here -->
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const clubId = ref(route.params.clubId);

    return { clubId };
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
