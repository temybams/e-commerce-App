import axios from 'axios';
import { ActionContext } from 'vuex';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageURL: string;
  createdBy: string;
}

export interface ProductState {
  products: Product[];
}

const state: ProductState = {
  products: [],
};

const mutations = {
  setProducts(state: ProductState, products: Product[]) {
    console.log('Mutating products:', products); // Log products being set
    state.products = products;
  },
};

const actions = {
  async fetchProducts({ commit }: ActionContext<ProductState, any>) {
    try {
      console.log('Fetching products...');
      const response = await axios.get('http://localhost:3000/api/products');
      console.log('Products fetched:', response.data);
      commit('setProducts', response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  },
};

const getters = {
  products: (state: ProductState) => state.products,
};

export default {
  namespaced: true, // Ensure the module is namespaced
  state,
  mutations,
  actions,
  getters,
};
