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
      <button type="submit" :disabled="isSubmitting">Add Product</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'AddProduct',
  setup() {
    const toast = useToast();
    const router = useRouter();
    const store = useStore();

    const name = ref('');
    const description = ref('');
    const price = ref(0);
    const imageURL = ref('');

    const addProductHandler = async () => {
      try {
        await store.dispatch('addProduct', {
          name: name.value,
          description: description.value,
          price: price.value,
          imageURL: imageURL.value,
        });
        toast.success('Product added successfully!');
        router.push('/products');
      } catch (error) {
        toast.error('Failed to add product.');
      }
    };

    return {
      name,
      description,
      price,
      imageURL,
      addProductHandler,
      isSubmitting: computed(() => store.getters.isSubmitting),
    };
  }
});
</script>

<style scoped>
.add-product {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

form {
  display: grid;
  gap: 1rem;
}

div {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input, textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
