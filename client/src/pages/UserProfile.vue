<!-- <template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-if="error">Error: {{ error.message }}</div>
        <div v-if="data">
            <h1>{{ data.user.username }}'s Profile</h1>
            <p>Email: {{ data.user.email }}</p>
            <h3>Friends:</h3>
            <ul>
                <li v-for="friend in data.user.friends" :key="friend._id">
                    {{ friend.username }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable'; 
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { GET_USER_BY_ID } from '@/utils/queries/userQueries';

export default {
    name: 'UserProfile',
    setup() {
        const route = useRoute();
        const userId = route.params.userId;

        const loading = ref(true);
        const error = ref(null);
        const data = ref(null);

        const { result, loading: apolloLoading, error: apolloError } = useQuery(GET_USER_BY_ID, {
            variables: { id: userId },
        });

        onMounted(() => {
            loading.value = apolloLoading;
            error.value = apolloError;
            data.value = result;
        });

        return { loading, error, data };
    },
};
</script> -->


<template>
    <div>
      <div v-if="loading">Loading...</div>
      <div v-if="error">Error: {{ error.message }}</div>
      <div v-if="data">
        <h1>{{ data.me.username }}'s Profile</h1>
        <p>Email: {{ data.me.email }}</p>
        <h3>Friends:</h3>
        <ul>
          <li v-for="friend in data.me.friends" :key="friend._id">
            {{ friend.username }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { useQuery } from '@vue/apollo-composable'; 
  import { GET_ME } from '@/utils/queries/userQueries';
  
  export default {
    name: 'UserProfile',
    setup() {
      const { result, loading, error } = useQuery(GET_ME);
  
      return {
        loading,
        error,
        data: result,
      };
    },
  };
  </script>
  
  