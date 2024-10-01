<template>
    <div>
      <h3>{{ user.username }}</h3>
      <p>{{ user.email }}</p>
      <AddFriendButton :friendId="user._id" />
    </div>
  </template>
  
  <script>
  import AddFriendButton from './AddFriendButton.vue';
  
  export default {
    name: 'UserCard',
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
    components: {
      AddFriendButton,
    },
  };
  </script>
  