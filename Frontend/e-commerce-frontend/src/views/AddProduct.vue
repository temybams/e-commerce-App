<!-- src/views/AddProduct.vue -->
<template>
  <div class="add-product">
    <h1>Add Product</h1>
    <form @submit.prevent="addProductHandler">
      <div>
        <label for="name">Product Name:</label>
        <input type="text" v-model="name" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea v-model="description" required></textarea>
      </div>
      <div>
        <label for="price">Price:</label>
        <input type="number" v-model="price" required />
      </div>
      <div>
        <label for="imageURL">Image URL:</label>
        <input type="text" v-model="imageURL" required />
      </div>
      <button type="submit">Add Product</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
  name: 'AddProduct',
  data() {
    return {
      name: '',
      description: '',
      price: 0,
      imageURL: '',
    };
  },
  methods: {
    ...mapActions(['addProduct']),
    async addProductHandler() {
      try {
        await this.addProduct({
          name: this.name,
          description: this.description,
          price: this.price,
          imageURL: this.imageURL,
        });
        this.$router.push('/products');
      } catch (error) {
        console.error('Add product failed:', error);
      }
    },
  },
});
</script>

<style scoped>
/* Add your styles here */
</style>
