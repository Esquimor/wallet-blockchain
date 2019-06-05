<template>
  <form action @submit.prevent>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Editer votre compte</p>
      </header>
      <section class="modal-card-body EditModalPassword">
        <span class="has-text-danger EditModalPassword-error" v-if="errorMsg !== ''">{{ errorMsg }}</span>
        <b-field label="Pseudonyme">
          <b-input v-model="pseudonyme" placeholder="Pseudonyme" @input="removeErrror"></b-input>
        </b-field>
        <b-field label="Email">
          <b-input type="email" v-model="email" placeholder="Email" @input="removeErrror">></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$emit('close')">Fermer</button>
        <button class="button is-primary" @click="edit">Edit</button>
      </footer>
    </div>
  </form>
</template>

<script>
"use strict";

export default {
  name: "EditModalPassword",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.EditModalPassword {
  width: 350px;
  > div:nth-child(even) {
    margin-top: 10px;
  }
}
</style>
