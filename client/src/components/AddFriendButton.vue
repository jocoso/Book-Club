<template>
    <button @click="addFriend">Add Friend</button>
  </template>
  
  <script>
  import { useMutation } from '@vue/apollo-composable';
  import { ADD_FRIEND } from '@/utils/mutations/userMutations';
  
  export default {
    props: {
      friendId: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const { mutate: addFriend } = useMutation(ADD_FRIEND);
  
      const handleAddFriend = async () => {
        try {
          await addFriend({ userId: 'loggedInUserId', friendId: props.friendId });
          console.log('Friend added');
        } catch (err) {
          console.error('Error adding friend', err);
        }
      };
  
      return { addFriend: handleAddFriend };
    }
  };
  </script>
  