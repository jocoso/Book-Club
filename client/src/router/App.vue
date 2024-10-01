<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/suggestions">Suggestions</router-link>
        <router-link to="/community">Community</router-link>
        <router-link to="/create-club">Create Club</router-link>
        <router-link to="/signup">Sign Up</router-link>
        <router-link to="/login">Login</router-link>
      </nav>
    </header>

    <router-view></router-view>

    <footer>
      <p>&copy; 2024 Book Club Hub</p>
    </footer>
  </div>
</template>
