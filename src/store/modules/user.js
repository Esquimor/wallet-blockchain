import * as types from "./../types";
import api from "@services/api";

export default {
  state: {
    user: null
  },
  getters: {
    user: state => state.user
  },
  actions: {
    editPassword({ state }, { password, confirmation }) {
      return api
        .post("user/edit/password", {
          id: state.user.id,
          password,
          confirmation
        })
        .then(() => {
          return Promise.resolve();
        })
        .catch(e => {
          return Promise.reject(e);
        });
    },
    editUser({ commit, state }, { pseudonyme, email }) {
      return api
        .post("user/edit/account", {
          id: state.user.id,
          pseudonyme,
          email
        })
        .then(() => {
          commit(types.EDIT_USER, {
            email,
            pseudonyme
          });
        })
        .catch(e => {
          return Promise.reject(e);
        });
    },
    register({ commit }, { email, password, confirmation }) {
      return api
        .post("user/register/email", {
          email,
          password,
          confirmation
        })
        .then(({ data }) => {
          commit(types.LOGIN, data.user);
        })
        .catch(e => {
          return Promise.reject(e);
        });
    },
    logout({ commit }) {
      commit(types.LOGOUT);
    },
    loginEmail({ commit }, { email, password }) {
      return api
        .post("user/login/email", {
          email,
          password
        })
        .then(({ data }) => {
          commit(types.LOGIN, data.user);
        })
        .catch(e => {
          return Promise.reject(e);
        });
    },
    loginGoogle({ commit }, params) {
      return api
        .post("user/login/google", params)
        .then(({ data }) => {
          commit(types.LOGIN, data.user);
        })
        .catch(e => {
          return Promise.reject(e);
        });
    },
    loginFacebook({ commit }, { userId }) {
      return api
        .post("user/login/facebook", {
          userId: userId
        })
        .then(({ data }) => {
          commit(types.LOGIN, data.user);
        })
        .catch(e => {
          return Promise.reject(e);
        });
    },
    linkGoogle({ commit, state }, userId) {
      return api
        .post("user/link/google", {
          clientId: userId,
          id: state.user.id
        })
        .then(({ data }) => {
          commit(types.UPDATE_USER_GOOGLE, data.googleId);
        })
        .catch(e => {
          return Promise.reject(e);
        });
    },
    linkFacebook({ commit, state }, userId) {
      return api
        .post("user/link/facebook", {
          userId: userId,
          id: state.user.id
        })
        .then(({ data }) => {
          commit(types.UPDATE_USER_FACEBOOK, data.facebookId);
        })
        .catch(e => {
          return Promise.reject(e);
        });
    }
  },
  mutations: {
    [types.LOGIN](state, user) {
      state.user = user;
    },
    [types.UPDATE_USER_GOOGLE](state, googleId) {
      state.user = Object.assign({}, state.user, { google: googleId });
    },
    [types.UPDATE_USER_FACEBOOK](state, facebookId) {
      state.user = Object.assign({}, state.user, { facebook: facebookId });
    },
    [types.LOGOUT](state) {
      state.user = null;
    },
    [types.EDIT_USER](state, { email, pseudonyme }) {
      state.user = Object.assign({}, state.user, {
        email: email,
        pseudonyme: pseudonyme
      });
    }
  }
};
