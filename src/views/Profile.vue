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
        <span class="Profile-labels Profile-publicKey">{{ user.public_key }}</span>
        <span class="Profile-elements">Crédit:</span>
        <span class="Profile-labels">{{ getAmount(user.public_key) }}</span>
        <BButton
          type="is-primary"
          class="Profile-buttons"
          @click.native="openEdit = true"
        >Editer votre compte</BButton>
        <BButton
          type="is-primary"
          class="Profile-buttons"
          @click.native="openEditPasswod = true"
        >Editer votre mot de passe</BButton>
        <BModal :active="openEdit" has-modal-card :can-cancel="false">
          <EditModalAccount @close="openEdit= false" :user="user"/>
        </BModal>
        <BModal :active="openEditPasswod" has-modal-card :can-cancel="false">
          <EditModalPassword @close="openEditPasswod= false"/>
        </BModal>
      </div>
    </section>
    <section class="Profile-rs">
      <h3 class="Profile-rs-title title is-5">Liéer votre compte avec les réseaux sociaux:</h3>
      <ButtonGoogle class="Profile-rs-buttons" v-if="!user.google" @connect="linkGoogle"/>
      <span v-else>Votre compte est déjà relié à un compte Google.</span>
      <ButtonFacebook class="Profile-rs-buttons" v-if="!user.facebook" @connect="linkFacebook"/>
      <span v-else>Votre compte est déjà relié à un compte Facebook.</span>
    </section>
  </div>
</template>

<script>
"use strict";

import { mapGetters } from "vuex";

import ButtonFacebook from "@/components/ButtonFacebook";
import ButtonGoogle from "@/components/ButtonGoogle";
import EditModalAccount from "@/components/EditModalAccount";
import EditModalPassword from "@/components/EditModalPassword";

export default {
  name: "Profile",
  components: {
    ButtonFacebook,
    ButtonGoogle,
    EditModalPassword,
    EditModalAccount
  },
  data() {
    return {
      openEdit: false,
      openEditPasswod: false
    };
  },
  computed: {
    ...mapGetters(["user", "getAmount"])
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
  &-publicKey {
    word-break: break-all;
  }
  &-buttons {
    margin-top: 25px;
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
