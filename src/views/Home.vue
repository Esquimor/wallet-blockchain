<template>
  <div class="Home">
    <div class="Home-filter">
      <h2 class="title is-3">Filtres</h2>
      <div class="Home-filter-fields columns">
        <BField label="Envoyeur" class="column is-6">
          <BInput v-model="filter.sender"/>
        </BField>
        <BField label="Receveur" class="column is-6">
          <BInput v-model="filter.receiver"/>
        </BField>
      </div>
    </div>
    <div class="Home-chain">
      <template v-if="listChain.length > 0">
        <Blocks
          v-for="block in listChain"
          :key="block.index"
          :block="block"
          @click.native="chooseBlock(block)"
        />
      </template>
      <div v-else>Aucun Block dans la chaine</div>
    </div>
    <div v-if="block !== null">
      <Block class="Home-block" :block="block"/>
    </div>
    <div class="Home-block-no" v-else>Aucun Block séléctionner</div>
    <div class="Home-address" v-if="giveAddress">
      <div class="Home-address-background"/>
      <div class="Home-address-modal">
        <h2 class="title is-5">Adresse du noeud</h2>
        <span v-if="errorMsg !== ''" class="has-text-danger">{{ errorMsg }}</span>
        <BInput ref="websocketInput" type="text" @input="removeError"/>
        <div class="Home-address-modal-button">
          <button @click="giveAddress = false" class="button is-danger outline">Annuler</button>
          <button @click="changeSocket" class="button is-primary">Confirmer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
"use strict";

import axios from "axios";

import Blocks from "@/components/Blocks";
import Block from "@/components/Block";

const MessageType = {
  QUERY_LATEST: 0,
  QUERY_ALL: 1,
  RESPONSE_BLOCKCHAIN: 2
};

export default {
  name: "PageHome",
  components: {
    Blocks,
    Block
  },
  data() {
    return {
      wsAddress: "http://localhost:8001",
      giveAddress: false,
      errorMsg: "",
      chain: [],
      filter: {
        sender: "",
        receiver: ""
      },
      block: null
    };
  },
  computed: {
    listChain() {
      return this.chain
        .filter(block => {
          if (
            block.index === 0 &&
            this.filter.sender === "" &&
            this.filter.receiver === ""
          )
            return true;
          const filterTxOut = (txOuts, address) => {
            return txOuts.some(txOut => txOut.address === address);
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
            this.filter.sender,
            this.filter.receiver
          );
        })
        .reverse();
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
    }
  },
  watch: {
    wsAddress: {
      immediate: true,
      handler(ws) {
        if (ws !== "") {
          axios
            .post(`${ws}/addPeer`, {
              peer: `ws://${window.location.hostname}:${window.location.port}`
            })
            .then(({ data }) => {
              this.giveAddress = false;
              const ws = new WebSocket(`ws://localhost:${data.p2p}`);
              ws.onerror = () => {
                this.giveAddress = true;
                this.wsAddress = "";
                this.errorMsg = "L'adresse spécifié n'est plus joignable.";
              };
              ws.onmessage = e => {
                const data = JSON.parse(e.data);
                const element = JSON.parse(data.data);
                switch (data.type) {
                  case MessageType.QUERY_ALL:
                    this.chain = element;
                    break;
                  case MessageType.RESPONSE_BLOCKCHAIN:
                  case MessageType.QUERY_LATEST:
                    if (this.chain.length === 0) {
                      this.chain = element;
                    } else {
                      this.chain = this.chain.concat(element);
                    }
                    break;
                }
              };
            })
            .catch(() => {
              this.giveAddress = true;
              this.wsAddress = "";
              this.errorMsg = "L'adresse spécifié n'est pas joignable.";
            });
        }
      }
    }
  }
};
</script>

<style lang="scss">
@import "../style/buefy.scss";

.Home {
  display: grid;
  grid-template:
    "filter filter" 12rem
    "chain   block" auto /
    40% 60%;
  width: 100%;
  height: 100%;
  &-filter {
    background-color: #aed581;
    padding: 1rem;
    grid-area: filter;
  }
  &-chain {
    grid-area: chain;
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
  &-address {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 100;
    &-modal {
      background-color: $white;
      z-index: 150;
      width: 350px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 2px solid gray;
      padding: 2rem;
      &-button {
        margin-top: 1rem;
        display: flex;
        justify-content: flex-end;
        > button {
          margin-left: 20px;
        }
      }
    }
    &-background {
      position: fixed;
      top: 0px;
      left: 0px;
      opacity: 0.2;
      background-color: $light-grey;
      width: 100%;
      height: 100%;
      z-index: 100;
    }
  }
}
</style>
