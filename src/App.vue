<template>
  <div id="app" class="App">
    <nav class="App-nav">
      <router-link :to="{ name: 'home' }">Accueil</router-link>
      <router-link :to="{ name: 'blockchain' }">Blockchain</router-link>
      <router-link :to="{ name: 'profile' }" v-if="hasUser">Profile</router-link>
      <router-link :to="{ name: 'login' }" v-if="!hasUser">Se connecter</router-link>
      <router-link :to="{ name: 'register' }" v-if="!hasUser">S'enregistrer</router-link>
      <router-link :to="{ name: 'logout' }" v-if="hasUser">Se déconnecter</router-link>
    </nav>
    <div class="App-main">
      <router-view/>
    </div>
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
  display: flex;
  width: 100vw;
  &-nav {
    top: 0px;
    position: sticky;
    height: 100vh;
    width: 20%;
    display: flex;
    flex-direction: column;
    background-color: $black;
    > a {
      padding: 1rem;
      color: $white;
      &:hover {
        background-color: $primary;
        color: $white;
      }
    }
  }
  &-main {
    width: 80%;
  }
}
</style>
