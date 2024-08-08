// store/index.ts
import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {
      username: ''
    },
    isAuthenticated: false,
    toastMessage: '',
    isSubmitting: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = !!user.username; 
    },
    logout(state) {
      state.user = { username: '' };
      state.isAuthenticated = false;
    },
    setToastMessage(state, message) {
      state.toastMessage = message;
    },
    setIsSubmitting(state, status) {
      state.isSubmitting = status;
    }
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('logout');
    },
    async addProduct({ commit }, product) {
      commit('setIsSubmitting', true);
      try {
        await fetch('http://localhost:3000/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product)
        });
        commit('setToastMessage', 'Product added successfully!');
      } catch (error) {
        commit('setToastMessage', 'Failed to add product.');
      } finally {
        commit('setIsSubmitting', false);
      }
    }
  },
  getters: {
    user: (state) => state.user,
    isAuthenticated: (state) => state.isAuthenticated,
    toastMessage: (state) => state.toastMessage,
    isSubmitting: (state) => state.isSubmitting
  }
});
