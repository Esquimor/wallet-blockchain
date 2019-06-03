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
        <BField label="Node" class="column is-6">
          <BInput v-model="node"/>
        </BField>
        <BField label="Block Hash" class="column is-6">
          <BInput v-model="hash"/>
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
      <div v-else>Aucun Block dans la chaine</div>
    </div>
    <div v-if="block !== null">
      <Block class="Blockchain-block" :block="block" @change="hash => chooseBlockHash(hash)"/>
    </div>
    <div class="Blockchain-block-no" v-else>Aucun Block séléctionner</div>
    <div class="Blockchain-address" v-if="giveAddress">
      <div class="Blockchain-address-background"/>
      <div class="Blockchain-address-modal">
        <h2 class="title is-5">Adresse du noeud</h2>
        <span v-if="errorMsg !== ''" class="has-text-danger">{{ errorMsg }}</span>
        <BInput ref="websocketInput" type="text" @input="removeError"/>
        <div class="Blockchain-address-modal-button">
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
  name: "Blockchain",
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
      sender: "",
      receiver: "",
      node: "",
      hash: "",
      block: null
    };
  },
  computed: {
    filterByReceiverAndSender() {
      return this.chain.filter(block => {
        if (block.index === 0 && this.sender === "" && this.receiver === "")
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
      }, tab);
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
                let element;
                switch (data.type) {
                  case MessageType.QUERY_ALL:
                    element = JSON.parse(data.data);
                    this.chain = element;
                    break;
                  case MessageType.RESPONSE_BLOCKCHAIN:
                  case MessageType.QUERY_LATEST:
                    element = JSON.parse(data.data);
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
