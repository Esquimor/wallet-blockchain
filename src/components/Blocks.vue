<template>
  <div class="Blocks">
    <h3 class="title is-5">Block: {{ block.index }}</h3>
    <div class="Blocks-date">
      <span class="Blocks-date-label">Date:</span>
      <span class="Blocks-date-item">{{ formatedDate }}</span>
    </div>
    <div class="Blocks-date">
      <span class="Blocks-date-label">Difficulté:</span>
      <span class="Blocks-date-item">{{ block.difficulty }}</span>
    </div>
    <div class="Blocks-hash">
      <span class="Blocks-hash-label">Hash:</span>
      <span class="Blocks-hash-item">{{ block.hash }}</span>
    </div>
    <div class="Blocks-previoushash">
      <span class="Blocks-previoushash-label">Hash précédent:</span>
      <span class="Blocks-previoushash-item">{{ block.previousHash }}</span>
    </div>
  </div>
</template>

<script>
"use strict";

export default {
  name: "Blocks",
  props: {
    block: {
      type: Object,
      required: true
    }
  },
  computed: {
    formatedDate() {
      if (this.block.index === 0) return "Block Genesis";
      const dateTimestamp = new Date(this.block.timestamp);
      return `${dateTimestamp.getDate()}/${dateTimestamp.getMonth() +
        1}/${dateTimestamp.getFullYear()} ${dateTimestamp.getHours()}:${dateTimestamp.getMinutes()}`;
    }
  }
};
</script>

<style lang="scss">
@import "../style/buefy.scss";

.Blocks {
  margin: 2rem;
  padding: 1rem;
  border: 3px solid $light-grey;
  border-radius: 25px;
  &-date {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &-item {
      margin-left: 10px;
    }
  }
  &-hash {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &-item {
      word-break: break-all;
      margin-left: 10px;
    }
  }
  &-previoushash {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &-item {
      word-break: break-all;
      margin-left: 10px;
    }
  }
}
</style>
