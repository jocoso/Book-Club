<template>
  <div>
    <h1>Create a New Club</h1>
    <CreateClubForm />
  </div>
</template>

<script>
import CreateClubForm from '../components/CreateClubForm.vue';

export default {
  name: 'CreateClubPage',
  components: {
    CreateClubForm
  }
};
</script>
