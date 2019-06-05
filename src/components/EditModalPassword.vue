<template>
  <form action @submit.prevent>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Editer votre compte</p>
      </header>
      <section class="modal-card-body EditModalPassword">
        <span class="has-text-danger EditModalPassword-error" v-if="errorMsg !== ''">{{ errorMsg }}</span>
        <b-field label="Mot de passe">
          <b-input
            type="password"
            v-model="password"
            placeholder="Mot de passe"
            @input="removeErrror"
            password-reveal
          />
        </b-field>
        <b-field label="Confirmation">
          <b-input
            type="password"
            v-model="confirmation"
            placeholder="Confirmation"
            @input="removeErrror"
            password-reveal
          />
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
  name: "EditModalPassword",
  data() {
    return {
      password: "",
      confirmation: "",
      errorMsg: "",
      loading: false
    };
  },
  methods: {
    edit() {
      this.loading = true;
      this.$store
        .dispatch("editPassword", {
          password: this.password,
          confirmation: this.confirmation
        })
        .then(() => {
          this.$emit("close");
        })
        .catch(() => {
          this.loading = false;
          this.password = false;
          this.confirmation = false;
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
.EditModalPassword {
  width: 350px;
  > div:nth-child(even) {
    margin-top: 10px;
  }
}
</style>
