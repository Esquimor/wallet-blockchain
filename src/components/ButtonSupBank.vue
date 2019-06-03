<template>
  <div>
    <ButtonSI
      class="ButtonSupBank"
      color="1565c0"
      label="SupBank"
      icon="bank"
      @click.native="isComponentModalActive = true"
    />
    <BModal :active="isComponentModalActive" has-modal-card :can-cancel="false">
      <SupBankModal @close="isComponentModalActive = false"/>
    </BModal>
  </div>
</template>

<script>
"use strict";

import ButtonSI from "@/components/ButtonSI";

import SupBankModal from "@/components/SupBankModal";

export default {
  name: "ButtonSupBank",
  components: {
    ButtonSI,
    SupBankModal
  },
  data() {
    return {
      isComponentModalActive: false
    };
  }
};
</script>

<style lang="scss">
</style>
