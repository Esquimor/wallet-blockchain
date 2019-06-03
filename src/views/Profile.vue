<template>
  <div class="Profile">
    <section class="Profile-account">
      <h2 class="title is-2">Compte</h2>
      <div class="Profile-account-field">
        <span class="Profile-elements">Pseudonyme:</span>
        <span class="Profile-labels">{{ user.pseudonyme }}</span>
        <span class="Profile-elements">Email:</span>
        <span class="Profile-labels">{{ user.email }}</span>
        <span class="Profile-elements">Crédit:</span>
        <span class="Profile-labels">{{ user.amount }}</span>
      </div>
    </section>
    <section class="Profile-rs">
      <ButtonGoogle v-if="!user.google" @connect="linkGoogle"/>
      <ButtonFacebook v-if="!user.facebook" @connect="linkFacebook"/>
    </section>
  </div>
</template>

<script>
"use strict";

import { mapGetters } from "vuex";

import ButtonFacebook from "@/components/ButtonFacebook";
import ButtonGoogle from "@/components/ButtonGoogle";
import ButtonSupBank from "@/components/ButtonSupBank";

export default {
  name: "Profile",
  components: {
    ButtonFacebook,
    ButtonGoogle,
    ButtonSupBank
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    linkGoogle(googleId) {
      this.$store.dispatch("linkGoogle", googleId);
    },
    linkFacebook(facebookId) {
      this.$store.dispatch("linkFacebook", facebookId);
    }
  }
};
</script>

<style lang="scss">
</style>
