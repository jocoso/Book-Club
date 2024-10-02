<template>
  <div>
    <Header />
    <div class="container">
      <router-view /> <!-- Dynamically load the route content here -->
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { provide } from 'vue';
import { useAuthStore } from '@/store/authStore'; // Adjust path accordingly

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  setup() {
    // Create and provide the authStore globally
    const authStore = useAuthStore();
    provide('authStore', authStore);
  },
};
</script>

