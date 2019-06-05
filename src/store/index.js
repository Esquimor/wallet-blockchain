import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import blockchain from "./modules/blockchain";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    blockchain
  }
});
