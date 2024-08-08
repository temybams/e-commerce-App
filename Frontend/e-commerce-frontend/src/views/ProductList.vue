<template>
  <div>
    <NavBar />
    <div class="container">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search products..."
        class="search-bar"
      />
      <div class="product-grid">
        <div v-for="product in filteredProducts" :key="product._id" class="product-card">
          <img :src="product.imageURL" alt="Product Image" class="product-image" />
          <div class="product-info">
            <h2>{{ product.name }}</h2>
            <p>{{ product.description }}</p>
            <p>{{ $filters.currency(product.price) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageURL: string;
}

export default defineComponent({
  components: { NavBar },
  setup() {
    const searchQuery = ref('');
    const products = ref<Product[]>([]);

    const filteredProducts = computed(() => {
      return products.value.filter(product =>
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    onMounted(async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:3000/api/products');
        products.value = response.data;
      } catch (error) {
        console.error('Failed to fetch products:', error);
        products.value = [];
      }
    });

    return { searchQuery, filteredProducts };
  }
});
</script>

<style scoped>
.container {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

.search-bar {
  width: 100%;
  max-width: 600px;
  margin: 0 auto 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: block;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background-color: #fff;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 1rem;
}

.product-info h2 {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
}

.product-info p {
  margin: 0;
  color: #333;
}

@media (max-width: 768px) {
  .search-bar {
    max-width: 100%;
  }
}
</style>
