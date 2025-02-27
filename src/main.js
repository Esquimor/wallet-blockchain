import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

import Buefy from "buefy";
import "./style/buefy.scss";

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
