<template>
  <form action @submit.prevent>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Editer votre compte</p>
      </header>
      <section class="modal-card-body EditModalAccount">
        <span class="has-text-danger EditModalAccount-error" v-if="errorMsg !== ''">{{ errorMsg }}</span>
        <b-field label="Pseudonyme">
          <b-input v-model="pseudonyme" placeholder="Pseudonyme" @input="removeErrror"></b-input>
        </b-field>
        <b-field label="Email">
          <b-input type="email" v-model="email" placeholder="Email" @input="removeErrror">></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$emit('close')" :disabled="loading">Fermer</button>
        <button class="button is-primary" @click="edit" :loading="loading">Edit</button>
      </footer>
    </div>
  </form>
</template>

<script>
"use strict";

export default {
  name: "EditModalAccount",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      pseudonyme: this.user.pseudonyme || "",
      email: this.user.email || "",
      errorMsg: "",
      loading: false
    };
  },
  methods: {
    edit() {
      this.loading = true;
      this.$store
        .dispatch("editUser", {
          pseudonyme: this.pseudonyme,
          email: this.email
        })
        .then(() => {
          this.$emit("close");
        })
        .catch(() => {
          this.loading = false;
          this.errorMsg = "Une erreur est survenue. Merci de réessayer.";
        });
    },
    removeErrror() {
      if (this.errorMsg !== "") this.errorMsg = "";
    }
  }
};
</script>

<style lang="scss">
.EditModalAccount {
  width: 350px;
  > div:nth-child(even) {
    margin-top: 10px;
  }
}
</style>
