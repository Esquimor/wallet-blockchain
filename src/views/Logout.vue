<template>
  <div class="Logout">
    <div class="Logout-wrapper">
      <span>Vous venez d'être déconnecter</span>
    </div>
  </div>
</template>

<script>
"use strict";

export default {
  name: "Logout",
  mounted() {
    this.$store.dispatch("logout");
  }
};
</script>

<style lang="scss">
</style>
