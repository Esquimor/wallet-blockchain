<template>
  <div class="Profile">
    <section class="Profile-account">
      <h2 class="title is-2">Compte</h2>
      <div class="Profile-account-field">
        <span class="Profile-elements">Pseudonyme:</span>
        <span class="Profile-labels">{{ user.pseudonyme }}</span>
        <span class="Profile-elements">Email:</span>
        <span class="Profile-labels">{{ user.email }}</span>
        <span class="Profile-elements">Clef public:</span>
        <span class="Profile-labels">{{ user.public_key }}</span>
        <span class="Profile-elements">Crédit:</span>
        <span class="Profile-labels">{{ user.amount }}</span>
        <BButton type="is-primary" @click.native="openEdit = true">Editer votre compte</BButton>
        <BModal :active="openEdit" has-modal-card :can-cancel="false">
          <EditModalAccount @close="openEdit= false" :user="user"/>
        </BModal>
      </div>
    </section>
    <section class="Profile-rs">
      <h3 class="Profile-rs-title title is-5">Liéer votre compte avec les réseaux sociaux:</h3>
      <ButtonGoogle class="Profile-rs-buttons" v-if="!user.google" @connect="linkGoogle"/>
      <span v-else>Votre compte est déjà reliéer à un compte Google.</span>
      <ButtonFacebook class="Profile-rs-buttons" v-if="!user.facebook" @connect="linkFacebook"/>
      <span v-else>Votre compte est déjà reliéer à un compte Facebook.</span>
    </section>
  </div>
</template>

<script>
"use strict";

import { mapGetters } from "vuex";

import ButtonFacebook from "@/components/ButtonFacebook";
import ButtonGoogle from "@/components/ButtonGoogle";
import ButtonSupBank from "@/components/ButtonSupBank";
import EditModalAccount from "@/components/EditModalAccount";

export default {
  name: "Profile",
  components: {
    ButtonFacebook,
    ButtonGoogle,
    ButtonSupBank,
    EditModalAccount
  },
  data() {
    return {
      openEdit: false
    };
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
  },
  mounted() {
    if (!this.user) this.$router.push({ name: "home" });
  }
};
</script>

<style lang="scss">
.Profile {
  display: flex;
  flex-direction: column;
  padding: 2rem 20%;
  &-elements {
    margin-right: 20px;
    margin-top: 10px;
    font-weight: 800;
  }
  &-account {
    &-field {
      display: flex;
      flex-direction: column;
    }
  }
  &-rs {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    &-buttons {
      margin-bottom: 10px;
    }
  }
}
</style>
