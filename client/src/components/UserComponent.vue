<template>
    <div>
      <!-- Show loading state -->
      <div v-if="loading">Loading...</div>
  
      <!-- Show error message -->
      <div v-if="error">Error: {{ error.message }}</div>
  
      <!-- Display the list of users once data is fetched -->
      <ul v-if="data && data.users">
        <li v-for="user in data.users" :key="user._id">
          {{ user.username }} - {{ user.email }}
          <button @click="handleAddFriend(loggedInUserId, user._id)">
            Add Friend
          </button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { useQuery, useMutation } from '@vue/apollo-composable';
  import { GET_ALL_USERS } from '@/utils/queries/userQueries';
  import { ADD_FRIEND } from '@/utils/mutations/userMutations';
  import { ref } from 'vue';
  
  export default {
    setup() {
      // Fetch all users using the GET_ALL_USERS query
      const { result: data, loading, error } = useQuery(GET_ALL_USERS);
  
      // Get the logged-in user's ID from localStorage
      const loggedInUserId = ref(localStorage.getItem('user_id'));
      
      // Debugging: Log the loggedInUserId to ensure it is being retrieved correctly
      console.log('Logged-in User ID:', loggedInUserId.value);
      
      if (!loggedInUserId.value) {
        console.error('No logged-in user ID found in localStorage.');
      }
  
      // Use useMutation to add a friend
      const { mutate: addFriend } = useMutation(ADD_FRIEND);
  
      // Handler function to add a friend
      const handleAddFriend = async (user_Id, friend_Id) => {
        if (!user_Id) {
          console.error('Cannot add friend: user_Id is null or undefined.');
          return;
        }
  
        try {
          const response = await addFriend({
            variables: { user_Id, friend_Id },  // Add variables here to match GraphQL structure
          });
          console.log('Friend added:', response.data.addFriend);
        } catch (err) {
          console.error('Error adding friend:', err.message);
        }
      };
  
      return {
        data,
        loading,
        error,
        loggedInUserId,
        handleAddFriend,
      };
    },
  };
  </script>
  
  
  


  