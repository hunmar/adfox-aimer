import Vue from "vue";
import App from "./App.vue";
import VueClipboard from "vue-clipboard2";
import VueYandexMetrika from "vue-yandex-metrika";

import "./plugins/element.js";

Vue.use(VueYandexMetrika, {
  id: 56620435,
  env: process.env.NODE_ENV
});

Vue.config.productionTip = false;

Vue.use(VueClipboard);

new Vue({
  render: h => h(App)
}).$mount("#app");
