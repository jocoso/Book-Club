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

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
};
</script>
