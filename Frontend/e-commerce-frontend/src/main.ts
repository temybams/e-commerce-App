import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';


const currencyFilter = (value: number) => {
  if (!value) return '$0.00';
  return `$${value.toFixed(2)}`;
};

const app = createApp(App);

app.config.globalProperties.$filters = {
  currency: currencyFilter
};

const options = {
  position: 'bottom-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};



app.use(router);
app.use(store);
app.use(Toast, options);

app.mount('#app');
