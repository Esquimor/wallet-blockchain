<template>
  <div :style="styleButton" class="ButtonSI">
    <BIcon :icon="icon" size="is-medium" type="is-white"/>
    <span class="ButtonSI-label">{{ label }}</span>
  </div>
</template>

<script>
"use strict";

export default {
  name: "ButtonSI",
  props: {
    label: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    }
  },
  computed: {
    styleButton() {
      return {
        backgroundColor: `#${this.color}`
      };
    }
  }
};
</script>

<style lang="scss">
.ButtonSI {
  cursor: pointer;
  padding: 0.3rem 0 0.2rem 1rem;
  border-radius: 5px;
  &-label {
    position: relative;
    color: $white;
    font-weight: 700;
    font-size: 25px;
    margin-left: 30%;
    top: -5px;
  }
}
</style>
