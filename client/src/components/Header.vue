<template>
    <div>
      <div v-if="authStore.isLoggedIn">Welcome! <button @click="logout">Logout</button></div>
      <div v-else><router-link to="/login">Login</router-link></div>
    </div>
  </template>
  
  <script>
  import { inject } from 'vue';
  
  export default {
    setup() {
      const authStore = inject('authStore');
  
      const logout = () => {
        authStore.logout();
      };
  
      return {
        authStore,
        logout,
      };
    },
  };
  </script>
  