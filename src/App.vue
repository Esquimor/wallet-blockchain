<template>
  <div id="app">
    <nav class="App-nav">
      <div class="App-nav-right">
        <router-link :to="{ name: 'home' }">Home</router-link>
        <router-link :to="{ name: 'blockchain' }" v-if="hasUser">Blockchain</router-link>
        <router-link :to="{ name: 'profile' }" v-if="hasUser">Profile</router-link>
      </div>
      <div class="App-nav-left">
        <router-link :to="{ name: 'login' }" v-if="!hasUser">Login</router-link>
        <router-link :to="{ name: 'register' }" v-if="!hasUser">Register</router-link>
        <router-link :to="{ name: 'logout' }" v-if="hasUser">Logout</router-link>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
"use strict";

import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters(["user"]),
    hasUser() {
      return !!this.user;
    }
  }
};
</script>


<style lang="scss">
.App {
  &-nav {
    display: flex;
    justify-content: space-between;
    background-color: $primary;
    height: 3rem;
    padding-top: 0.5rem;
    &-left,
    &-right {
      > a {
        padding: 1rem;
        width: 200px;
        color: $white;
        &:hover {
          background-color: $primary-dark;
          color: $white;
        }
      }
    }
  }
}
</style>
