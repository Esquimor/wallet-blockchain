<template>
  <div class="Logout">
    <div class="Logout-wrapper">
      <span>Vous venez d'être déconnecter</span>
    </div>
  </div>
</template>

<script>
"use strict";

import { mapGetters } from "vuex";

export default {
  name: "Logout",
  computed: {
    ...mapGetters(["user"])
  },
  mounted() {
    if (!this.user) this.$router.push({ name: "home" });
    this.$store.dispatch("logout");
  }
};
</script>

<style lang="scss">
</style>
