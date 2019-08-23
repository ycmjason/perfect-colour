import Vue from 'vue';
import VueFunctionApi from 'vue-function-api';

import App from './components/App.vue';

Vue.use(VueFunctionApi);

new Vue({
  render: h => h(App),
}).$mount('#app');
