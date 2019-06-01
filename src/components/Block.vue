<template>
  <div class="Block">{{ block }}</div>
</template>

<script>
"use strict";

export default {
  name: "Block",
  props: {
    block: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="scss">
</style>
