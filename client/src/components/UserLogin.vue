<template>
    <div>
      <form @submit.prevent="handleLogin">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script>
  import { ref, inject } from 'vue';
  import { useRouter } from 'vue-router';
  import { useMutation } from '@vue/apollo-composable';
  import { LOGIN_USER } from '@/utils/mutations/userMutations';  // Adjust path accordingly
  
  export default {
    setup() {
      const authStore = inject('authStore');  // Inject the auth store
      const email = ref('');
      const password = ref('');
      const errorMessage = ref('');
      const router = useRouter();
  
      const { mutate: login } = useMutation(LOGIN_USER);
  
      const handleLogin = async () => {
        try {
          if (!email.value || !password.value) {
            throw new Error('Please enter both email and password');
          }
  
          const { data } = await login({
            variables: {
              email: email.value,
              password: password.value,
            },
          });
  
          // Use the authStore to set the token globally
          authStore.setLogin(data.login.token);
  
          router.push('/');
        } catch (error) {
          errorMessage.value = error.message;
        }
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
  
  
  
  
  
  