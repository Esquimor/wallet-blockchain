<template>
  <ButtonSI
    class="ButtonGoogle"
    id="googleButton"
    color="dd4b39"
    label="Google"
    icon="google-plus"
  />
</template>

<script>
"use strict";

import ButtonSI from "@/components/ButtonSI";

export default {
  name: "ButtonGoogle",
  components: {
    ButtonSI
  },
  methods: {
    connectByGoogle(googleUser) {
      this.$emit("connect", googleUser.getAuthResponse().id_token);
    }
  },
  mounted() {
    let googleUser = {};
    let auth2 = null;
    let that = this;
    let startApp = function() {
      gapi.load("auth2", function() {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
          client_id:
            "449962804508-uqtd5pi2je3rot74e907cq739bga4sce.apps.googleusercontent.com",
          cookiepolicy: "single_host_origin",
          // Request scopes in addition to 'profile' and 'email'
          scope: "profile email"
        });
        attachSignin(document.getElementById("googleButton"), auth2);
      });
    };

    function attachSignin(element, auth2) {
      auth2.attachClickHandler(
        element,
        {},
        function(googleUser) {
          that.connectByGoogle(googleUser);
        },
        function(error) {
          alert(JSON.stringify(error, undefined, 2));
        }
      );
    }
    startApp();
  }
};
</script>

<style lang="scss">
</style>
