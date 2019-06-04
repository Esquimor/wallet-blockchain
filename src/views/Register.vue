<template>
  <div class="Register">
    <h1 class="title is-3">S'enregistrer</h1>
    <span class="Register-error has-text-danger" v-if="errorMsg !== ''">{{ errorMsg }}</span>
    <b-field label="Email">
      <BInput v-model="email" @input="removeError"/>
    </b-field>
    <b-field label="Mot de passe">
      <BInput v-model="password" type="password" password-reveal @input="removeError"/>
    </b-field>
    <b-field label="Confirmation">
      <BInput v-model="confirmation" type="password" password-reveal @input="removeError"/>
    </b-field>
    <BButton type="is-primary" @click.native="register">Créer votre compte</BButton>
  </div>
</template>

<script>
"use strict";

import { mapGetters } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      confirmation: "",
      errorMsg: ""
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    register() {
      this.$store
        .dispatch("register", {
          email: this.email,
          password: this.password,
          confirmation: this.confirmation
        })
        .then(() => {
          this.$router.push({ name: "profile" });
        })
        .catch(() => {
          this.password = "";
          this.confirmation = "";
          this.errorMsg = "Une erreur est survenue, merci de réessayer";
        });
    },
    removeError() {
      if (this.errorMsg !== "") this.errorMsg = "";
    }
  },
  mounted() {
    if (!!this.user) this.$router.push({ name: "home" });
  }
};
</script>

<style lang="scss">
.Register {
  display: flex;
  flex-direction: column;
  padding: 2rem 20%;
  &-error {
    margin: 10px 0px;
  }
}
</style>
