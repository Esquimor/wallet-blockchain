<template>
  <div class="Login">
    <h1 class="title is-3">Se connecter</h1>
    <span class="Login-description">Choissisez un mode de connection:</span>
    <div class="Login-buttons">
      <span v-if="errorMsg !== ''" class="has-text-danger">{{ errorMsg }}</span>
      <ButtonSupBank class="Login-buttons-button" @connect="connectSupBank"/>
      <ButtonGoogle class="Login-buttons-button" @connect="connectGoogle"/>
      <ButtonFacebook class="Login-buttons-button" @connect="connectFacebook"/>
    </div>
  </div>
</template>

<script>
"use strict";

import ButtonFacebook from "@/components/ButtonFacebook";
import ButtonGoogle from "@/components/ButtonGoogle";
import ButtonSupBank from "@/components/ButtonSupBank";

export default {
  name: "Login",
  components: {
    ButtonFacebook,
    ButtonGoogle,
    ButtonSupBank
  },
  data() {
    return {
      errorMsg: ""
    };
  },
  methods: {
    connectSupBank({ email, password }) {
      this.$store
        .dispatch("loginEmail", {
          email: email,
          password: password
        })
        .then(() => {
          this.$router.push({ name: "profile" });
        })
        .catch(e => {
          console.log(e);
          this.errorMsg = "Une erreur est survenue, merci de réessayer";
        });
    },
    connectGoogle(idGoogle) {
      this.$store
        .dispatch("loginGoogle", {
          clientId: idGoogle
        })
        .then(() => {
          this.$router.push({ name: "profile" });
        })
        .catch(e => {
          console.log(e);
          this.errorMsg = "Une erreur est survenue, merci de réessayer";
        });
    },
    connectFacebook(idFacebook) {
      that.$store
        .dispatch("loginFacebook", {
          userId: idFacebook
        })
        .then(() => {
          this.$router.push({ name: "profile" });
        })
        .catch(e => {
          console.log(e);
          this.errorMsg = "Une erreur est survenue, merci de réessayer";
        });
    }
  }
};
</script>

<style lang="scss">
.Login {
  display: flex;
  flex-direction: column;
  padding: 2rem 20%;
  &-buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &-button {
      margin-top: 20px;
      width: 400px;
    }
  }
}
</style>
