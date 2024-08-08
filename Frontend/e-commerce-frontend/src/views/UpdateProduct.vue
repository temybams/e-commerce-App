<!-- src/views/UpdateProduct.vue -->
<template>
  <div class="update-product">
    <h1>Update Product</h1>
    <!-- Add your update product form or details here -->
    <!-- Example form -->
    <form @submit.prevent="updateProduct">
      <label for="productName">Product Name:</label>
      <input v-model="product.name" id="productName" type="text" />

      <label for="productDescription">Description:</label>
      <textarea v-model="product.description" id="productDescription"></textarea>

      <label for="productPrice">Price:</label>
      <input v-model="product.price" id="productPrice" type="number" />

      <label for="productImageURL">Image URL:</label>
      <input v-model="product.imageURL" id="productImageURL" type="text" />

      <button type="submit">Update Product</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const product = ref({
      name: '',
      description: '',
      price: 0,
      imageURL: ''
    });

    // Fetch product details based on route parameter
    onMounted(async () => {
      const id = route.params.id as string;
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        product.value = response.data;
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    });

    const updateProduct = async () => {
      const id = route.params.id as string;
      try {
        await axios.put(`http://localhost:3000/api/products/${id}`, product.value);
        alert('Product updated successfully!');
      } catch (error) {
        console.error('Failed to update product:', error);
      }
    };

    return { product, updateProduct };
  }
});
</script>

<style scoped>
.update-product {
  padding: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-weight: bold;
}

input, textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
