<template>
    <div>
      <form @submit.prevent="handleLogin">
        <input
          type="email"
          v-model="email"
          placeholder="Email"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'; // Ensure ref is imported
  
  export default {
    name: 'UserLogin',
    setup() {
      const email = ref(''); // Use ref to create a reactive reference
      const password = ref('');
      const errorMessage = ref('');
  
      const handleLogin = async () => {
        try {
          // Simulate an API call to login
          if (!email.value || !password.value) {
            throw new Error('Please enter both email and password');
          }
  
          // Normally, here you would make an actual API call
          const token = await fakeApiLogin(email.value, password.value);
          
          if (token) {
            localStorage.setItem('id_token', token); // Save the token to local storage
            console.log('Login successful');
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          errorMessage.value = error.message;
        }
      };
  
      // Simulated API call
      const fakeApiLogin = async (email, password) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (email === 'test@example.com' && password === 'password') {
              resolve('fake-jwt-token');
            } else {
              reject(new Error('Invalid credentials'));
            }
          }, 1000);
        });
      };
  
      return {
        email,
        password,
        errorMessage,
        handleLogin,
      };
    },
  };
  </script>
  