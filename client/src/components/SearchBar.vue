<template>
  <form @submit.prevent="submitSearch">
    <input 
      v-model="searchText" 
      :placeholder="text" 
      class="search-input" 
      type="text"
    />
    <button type="submit" class="search-button">Search</button>
  </form>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    text: {
      type: String,
      default: 'Search...' // Default placeholder text
    }
  },
  data() {
    return {
      searchText: ''
    };
  },
  methods: {
    submitSearch() {
      console.log('Search Text:', this.searchText);
      // Add any custom logic for search here
    }
  }
}
</script>

<style scoped>
.search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

.search-button {
  padding: 8px 15px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #27ae60;
}
</style>
