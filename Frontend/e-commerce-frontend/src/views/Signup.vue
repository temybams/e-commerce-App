<template>
  <div class="signup">
    <div class="container">
      <h1>Signup</h1>
      <form @submit.prevent="registerHandler">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Signing up...' : 'Signup' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';

export default defineComponent({
  name: 'Signup',
  setup() {
    const store = useStore();
    const email = ref('');
    const username = ref('');
    const password = ref('');
    const loading = ref(false);
    const toast = useToast();

    const registerHandler = async () => {
      loading.value = true;
      try {
        await store.dispatch('register', { email: email.value, username: username.value, password: password.value });
        toast.success('Registration successful! Redirecting...');
        setTimeout(() => {
          loading.value = false;
          window.location.href = '/products';
        }, 2000);
      } catch (error) {
        toast.error('Registration failed. Please try again.');
        loading.value = false;
      }
    };

    return {
      email,
      username,
      password,
      loading,
      registerHandler,
    };
  },
});
</script>

<style scoped>
.signup {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
}

.container {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:disabled {
  background-color: #007bff;
  cursor: not-allowed;
}

button:hover {
  background-color: #0056b3;
}
</style>
