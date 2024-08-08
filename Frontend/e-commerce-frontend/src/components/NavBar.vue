<template>
  <nav>
    <div class="container">
      <h1 class="logo">E-Commerce</h1>
      <div class="nav-links">
        <router-link to="/addproduct" class="nav-link">Add Product</router-link>
        <router-link to="/products" class="nav-link">Update Product</router-link>
        <button @click="logout" class="logout-button">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$store.state.user?.username || 'Guest';
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
nav {
  background-color: #333;
  color: #fff;
  padding: 1rem;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover {
  background-color: #444;
  color: #f0f0f0;
}

.logout-button {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #444;
}

/* Responsive styles */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-links {
    flex-direction: column;
    width: 100%;
  }

  .nav-link {
    width: 100%;
    text-align: center;
    padding: 0.75rem 0;
  }

  .logout-button {
    width: 100%;
    text-align: center;
    padding: 0.75rem 0;
  }
}
</style>
