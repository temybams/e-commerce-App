<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <header>
      <nav>
        <router-link class="nav-link" to="/">Home</router-link>
        <router-link class="nav-link" to="/about">About</router-link>
        <router-link class="nav-link" to="/products">Product List</router-link>
        <router-link class="nav-link" to="/login">Login</router-link>
        <router-link class="nav-link" to="/signup">Signup</router-link>
      </nav>
    </header>
    <main>
      <h1>Welcome to the E-commerce App</h1>
      <p>Your one-stop shop for amazing products. Explore our product listings or create an account to get started!</p>
    </main>
    <footer>
      <p>&copy; 2024 E-commerce App. All rights reserved.</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
});
</script>

<style scoped>
.home {
  font-family: Arial, sans-serif;
  color: #333;
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

header {
  background-color: #282c34;
  color: #61dafb;
  padding: 5px 0;
  border-redius: 5px;
}

nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.nav-link {
  color: #61dafb;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover {
  background-color: #61dafb;
  color: #fff;
}

main {
  flex: 1;
  margin: 20px auto;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

p {
  font-size: 1.2rem;
  margin: 0 auto;
  max-width: 600px;
}

footer {
  padding: 10px 0;
  background-color: #f1f1f1;
  color: #333;
  text-align: center;
}
</style>
