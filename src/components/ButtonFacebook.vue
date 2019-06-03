<template>
  <ButtonSI @click.native="connectByFacebook" color="3b5998" label="Facebook" icon="facebook"/>
</template>

<script>
"use strict";

import ButtonSI from "@/components/ButtonSI";

export default {
  name: "ButtonFacebook",
  components: {
    ButtonSI
  },
  methods: {
    connectByFacebook() {
      let that = this;
      FB.login(
        function(response) {
          if (response.authResponse) {
            that.$emit("connect", response.authResponse.userID);
          } else {
            console.log("User cancelled login or did not fully authorize.");
          }
        },
        { scope: "email" }
      );
    }
  }
};
</script>

<style lang="scss">
</style>
