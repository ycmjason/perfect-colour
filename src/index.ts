import Vue from 'vue';
import { plugin } from 'vue-function-api';

import App from './components/App.vue';

Vue.use(plugin);

new Vue({
  render: h => h(App),
}).$mount('#app');
