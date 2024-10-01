<template>
    <div class="signup-form">
      <h2>Sign Up</h2>
      <form @submit.prevent="handleSignup">
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            id="username" 
            v-model="username" 
            type="text" 
            placeholder="Enter your username" 
            required 
          />
        </div>
  
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            id="email" 
            v-model="email" 
            type="email" 
            placeholder="Enter your email" 
            required 
          />
        </div>
  
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            id="password" 
            v-model="password" 
            type="password" 
            placeholder="Enter your password" 
            required 
          />
        </div>
  
        <button type="submit">Sign Up</button>
        
        <!-- Error message if signup fails -->
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useMutation } from '@vue/apollo-composable';
  import { ADD_USER } from '@/utils/mutations/userMutations';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'UserSignup',
    setup() {
      const router = useRouter();
      const username = ref('');
      const email = ref('');
      const password = ref('');
      const error = ref(null);
  
      const { mutate: addUser } = useMutation(ADD_USER);
  
      const handleSignup = async () => {
        console.log('handleSignup is called'); // Add this to check if the function is being triggered
        try {
          const response = await addUser({
            username: username.value,
            email: email.value,
            password: password.value,
          });

          // Log the response to see what data is returned from the server
           console.log('Signup response:', response); 

          const token = response.data.addUser.token;
  
          // Store token in localStorage and redirect to user profile
          localStorage.setItem('id_token', token);
          router.push('/user-profile');
        } catch (err) {
          console.error('Signup failed:', err); // Log any error that occurs
          error.value = 'Sign-up failed';
        }
      };
  
      return {
        username,
        email,
        password,
        error,
        handleSignup,
      };
    },
  };
  </script>
  
