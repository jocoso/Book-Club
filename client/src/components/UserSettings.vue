<template>
    <form @submit.prevent="handleUpdate">
      <input v-model="newEmail" type="email" placeholder="New Email" />
      <input v-model="newPassword" type="password" placeholder="New Password" />
      <button type="submit">Update</button>
      <p v-if="success">Profile updated successfully!</p>
      <p v-if="error">{{ error }}</p>
    </form>
  </template>
  
  <script>
  import { useMutation } from '@vue/apollo-composable';
  import { UPDATE_USER } from '@/utils/mutations/userMutations';
  
  export default {
    name: 'UserSettings',
    setup() {
      const newEmail = ref('');
      const newPassword = ref('');
      const success = ref(false);
      const error = ref(null);
  
      const { mutate: updateUser } = useMutation(UPDATE_USER);
  
      const handleUpdate = async () => {
        try {
          await updateUser({ email: newEmail.value, password: newPassword.value });
          success.value = true;
        } catch (err) {
          error.value = 'Update failed';
        }
      };
  
      return { newEmail, newPassword, success, error, handleUpdate };
    }
  };
  </script>
  