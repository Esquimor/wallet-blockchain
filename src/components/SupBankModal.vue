<template>
  <form action @submit.prevent>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Se connecter</p>
      </header>
      <section class="modal-card-body SupBandModal">
        <span class="has-text-danger SupBandModal-error" v-if="errorMsg !== ''">{{ errorMsg }}</span>
        <b-field label="Email">
          <b-input type="email" v-model="email" placeholder="Your email" required></b-input>
        </b-field>
        <b-field label="Password">
          <b-input
            type="password"
            v-model="password"
            password-reveal
            placeholder="Your password"
            required
          ></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$emit('close')">Fermer</button>
        <button class="button is-primary" @click="login">Se connecter</button>
      </footer>
    </div>
  </form>
</template>

<script>
"use strict";

export default {
  name: "SupBankModal",
  data() {
    return {
      email: "",
      password: "",
      errorMsg: ""
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("loginEmail", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: "profile" });
        })
        .catch(() => {
          this.password = "";
          this.errorMsg = "Une erreur est survenue. Merci de réessayer.";
        });
    }
  }
};
</script>

<style lang="scss">
.SupBandModal {
  width: 350px;
  > div:nth-child(even) {
    margin-top: 10px;
  }
}
</style>
