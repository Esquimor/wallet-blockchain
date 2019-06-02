<template>
  <div class="Blocks">
    <h3 class="title is-5">Block: {{ block.index }}</h3>
    <div class="Blocks-elements">
      <span class="Blocks-labels">Date:</span>
      <span>{{ formatedDate }}</span>
    </div>
    <div class="Blocks-elements">
      <span class="Blocks-labels">Difficulté:</span>
      <span>{{ block.difficulty }}</span>
    </div>
    <div class="Blocks-elements">
      <span class="Blocks-labels">Noeud:</span>
      <span>{{ block.node }}</span>
    </div>
    <div class="Blocks-elements">
      <span class="Blocks-labels">Hash:</span>
      <span class="Blocks-items">{{ block.hash }}</span>
    </div>
    <div class="Blocks-elements">
      <span class="Blocks-labels">Hash précédent:</span>
      <span class="Blocks-items">{{ block.previousHash }}</span>
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
  &-labels {
    font-weight: 700;
    min-width: 90px;
    max-width: 90px;
  }
  &-elements {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 5px;
  }
  &-items {
    word-break: break-all;
  }
}
</style>
