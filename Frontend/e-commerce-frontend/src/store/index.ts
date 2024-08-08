import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {
      username: ''
    },
    isAuthenticated: false  
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = !!user.username; 
    },
    logout(state) {
      state.user = { username: '' };
      state.isAuthenticated = false;
    }
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('logout');
    }
  },
  getters: {
    user: (state) => state.user,
    isAuthenticated: (state) => state.isAuthenticated  
  }
});
