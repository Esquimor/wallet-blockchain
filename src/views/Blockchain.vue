<template>
  <div class="Blockchain">
    <div class="Blockchain-filter">
      <h2 class="title is-3">Filtres</h2>
      <div class="Blockchain-filter-fields columns">
        <BField label="Envoyeur" class="column is-6">
          <BInput v-model="sender"/>
        </BField>
        <BField label="Receveur" class="column is-6">
          <BInput v-model="receiver"/>
        </BField>
      </div>
      <div class="Blockchain-filter-fields columns">
        <BField label="Node" class="column is-6 Blockchain-filter-fields-select">
          <BSelect v-model="node">
            <option value></option>
            <option v-for="node in listNode" :value="node" :key="node.item">{{ node }}</option>
          </BSelect>
        </BField>
        <BField label="Block Hash" class="column is-6 Blockchain-filter-fields-select">
          <BSelect v-model="hash">
            <option value></option>
            <option v-for="hash in listBlockHash" :value="hash" :key="hash.item">{{ hash }}</option>
          </BSelect>
        </BField>
      </div>
    </div>
    <div class="Blockchain-chain">
      <template v-if="listChain.length > 0">
        <Blocks
          v-for="block in listChain"
          :key="block.index"
          :block="block"
          @click.native="chooseBlock(block)"
        />
      </template>
      <div v-else class="Blockchain-chain-no">Aucun Block dans la chaine</div>
    </div>
    <div v-if="block !== null">
      <Block class="Blockchain-block" :block="block" @change="hash => chooseBlockHash(hash)"/>
    </div>
    <div class="Blockchain-block-no" v-else>Aucun Block séléctionner</div>
  </div>
</template>

<script>
"use strict";

import { mapGetters } from "vuex";

import Blocks from "@/components/Blocks";
import Block from "@/components/Block";

export default {
  name: "Blockchain",
  components: {
    Blocks,
    Block
  },
  data() {
    return {
      sender: "",
      receiver: "",
      node: "",
      hash: "",
      block: null
    };
  },
  computed: {
    ...mapGetters(["user", "chain"]),
    filterByReceiverAndSender() {
      return this.chain.filter(block => {
        if (block.index === 0 && this.sender === "" && this.receiver === "")
          return true;
        const filterTxOut = (txOuts, address) => {
          return txOuts.some(txOut => txOut.address.startsWith(address));
        };
        const filterTransaction = (
          transactions,
          addressSender,
          addressReceiver
        ) => {
          return transactions.some(transaction => {
            const hasTxOut =
              addressReceiver === ""
                ? addressSender === ""
                  ? true
                  : false
                : filterTxOut(transaction.txOuts, addressReceiver);
            const hasTxIn =
              addressSender === ""
                ? addressReceiver === ""
                  ? true
                  : false
                : transaction.txIns.some(txIn => {
                    const blockSender = this.chain.find(
                      block2 => block2.index === txIn.txOutId
                    );
                    return (
                      !!blockSender &&
                      filterTxOut(blockSender.txOuts, addressSender)
                    );
                  });
            return hasTxOut || hasTxIn;
          });
        };
        return filterTransaction(
          block.transactions,
          this.sender,
          this.receiver
        );
      });
    },
    listChain() {
      let newChain = [];
      newChain = this.filterByReceiverAndSender;
      if (this.node !== "") {
        newChain = newChain.filter(b => b.node == this.node);
      }
      if (this.hash !== "") {
        newChain = newChain.filter(b => b.hash == this.hash);
      }
      return newChain.sort((a, b) => b.index - a.index);
    },
    listNode() {
      return this.chain.reduce((tab, block) => {
        const tabHasNode = tab.some(t => t === block.node);
        if (!tabHasNode) {
          tab.push(block.node);
        }
        return tab;
      }, []);
    },
    listBlockHash() {
      return this.chain.reduce((tab, block) => {
        tab.push(block.hash);
        return tab;
      }, []);
    }
  },
  methods: {
    changeSocket() {
      this.wsAddress = this.$refs.websocketInput.newValue;
    },
    removeError() {
      if (this.errorMsg !== "") {
        this.errorMsg = "";
      }
    },
    chooseBlock(block) {
      this.block = block;
    },
    chooseBlockHash(hash) {
      this.block = this.chain.find(b => b.hash === hash);
    }
  }
};
</script>

<style lang="scss">
@import "../style/buefy.scss";

.Blockchain {
  display: grid;
  grid-template:
    "filter filter" 17rem
    "chain   block" auto /
    40% 60%;
  width: 100%;
  height: 100%;
  &-filter {
    box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
    padding: 1rem;
    grid-area: filter;
    &-fields-select {
      > .control > span {
        width: 100%;
        > select {
          width: 100%;
        }
      }
    }
  }
  &-chain {
    grid-area: chain;
    &-no {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-top: 50px;
    }
  }
  &-block {
    grid-area: block;
    position: sticky;
    top: 20px;
    &-no {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
  }
}
</style>
