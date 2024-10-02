<template>
  <a :href="url" class="link-button">
    <button>{{ children }}</button>
  </a>
</template>

<script>
export default {
  name: 'LinkButton',
  props: {
    children: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.link-button button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
}

.link-button button:hover {
  background-color: #2980b9;
}
</style>
