<template>
  <div>
    <h1>{{ productId ? 'Edit Product' : 'Add Product' }}</h1>
    <form @submit.prevent="saveProduct">
      <input v-model="name" type="text" placeholder="Name" />
      <input v-model="description" type="text" placeholder="Description" />
      <input v-model="price" type="number" placeholder="Price" />
      <input v-model="imageURL" type="text" placeholder="Image URL" />
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'ProductForm',
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const productId = route.params.id as string;
    const name = ref('');
    const description = ref('');
    const price = ref(0);
    const imageURL = ref('');

    const loadProduct = async () => {
      if (productId) {
        const product = store.state.products.find((p: any) => p._id === productId);
        if (product) {
          name.value = product.name;
          description.value = product.description;
          price.value = product.price;
          imageURL.value = product.imageURL;
        }
      }
    };

    onMounted(() => {
      loadProduct();
    });

    const saveProduct = async () => {
      const product = {
        _id: productId,
        name: name.value,
        description: description.value,
        price: price.value,
        imageURL: imageURL.value,
      };
      if (productId) {
        await store.dispatch('updateProduct', product);
      } else {
        await store.dispatch('addProduct', product);
      }
      router.push('/');
    };

    return {
      name,
      description,
      price,
      imageURL,
      saveProduct,
      productId,
    };
  },
});
</script>
