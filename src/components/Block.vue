<template>
  <div class="Block">
    <h2 class="title is-3">Block: {{ block.index }}</h2>
    <div class="Block-elements">
      <span class="Block-labels">Date:</span>
      <span>{{formatedDate}}</span>
    </div>
    <div class="Block-elements">
      <span class="Block-labels">Difficulté:</span>
      <span>{{ block.difficulty }}</span>
    </div>
    <div class="Block-elements">
      <span class="Block-labels">Noeud:</span>
      <span>{{ block.node }}</span>
    </div>
    <div class="Block-elements">
      <span class="Block-labels">Hash:</span>
      <span class="Block-items">{{ block.hash }}</span>
    </div>
    <div class="Block-elements">
      <span class="Block-labels">Hash précédent:</span>
      <span class="Block-items">{{ block.previousHash }}</span>
    </div>
    <div class="Block-transactions">
      <span class="Block-labels">Transactions:</span>
      <div
        class="Block-transactions-items"
        v-for="(transaction, index) in block.transactions"
        :key="transaction.index"
      >
        <div class="Block-transactions-items-title">Transaction: {{ index }}</div>
        <div class="Block-transactions-items-txIns-title">Jetons Utilisés:</div>
        <div
          class="Block-transactions-items-txIns"
          v-for="txIn in transaction.txIns"
          :key="txIn.item"
        >
          <template v-if="txIn.txOutId !=''">
            <div class="Block-transactions-items-elements">
              <span class="Block-transactions-items-items">Block Hash:</span>
              <span @click="$emit('change', txIn.txOutId)">{{ txIn.txOutId }}</span>
            </div>
            <div class="Block-transactions-items-elements">
              <span class="Block-transactions-items-items">Transaction:</span>
              <span>{{ txIn.txOutIndex }}</span>
            </div>
            <div class="Block-transactions-items-elements">
              <span class="Block-transactions-items-items">Signature:</span>
              <span>{{ txIn.signature }}</span>
            </div>
          </template>
        </div>
        <div class="Block-transactions-items-txOuts-title">Nouveaux Jetons:</div>
        <div
          class="Block-transactions-items-txOuts"
          v-for="txOut in transaction.txOuts"
          :key="txOut.item"
        >
          <div class="Block-transactions-items-elements">
            <span class="Block-transactions-items-items">Receveur:</span>
            <span>{{ txOut.address }}</span>
          </div>
          <div class="Block-transactions-items-elements">
            <span class="Block-transactions-items-items">Somme:</span>
            <span>{{ txOut.amount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
"use strict";

export default {
  name: "Block",
  props: {
    block: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    formatedDate() {
      if (this.block.index === 0) return "Block Genesis";
      const dateTimestamp = new Date(this.block.timestamp);
      return `${dateTimestamp.getDate()}/${dateTimestamp.getMonth() +
        1}/${dateTimestamp.getFullYear()} ${dateTimestamp.getHours()}:${dateTimestamp.getMinutes()}`;
    }
  }
};
</script>

<style lang="scss">
@import "../style/buefy.scss";
.Block {
  margin: 1rem;
  padding: 2rem;
  border: 5px solid $light-grey;
  border-radius: 25px;
  &-labels {
    font-weight: 700;
    min-width: 90px;
    max-width: 90px;
  }
  &-elements {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 5px;
  }
  &-items {
    word-break: break-all;
  }
  &-transactions {
    &-items {
      word-break: break-all;
      margin-left: 10px;
      &-title {
        font-weight: 600;
        text-decoration: underline;
      }
      &-items {
        min-width: 100px;
        max-width: 100px;
      }
      &-elements {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 5px;
      }
      &-txIns {
        margin-left: 10px;
        padding: 0.5rem;
        border-radius: 5px;

        &:nth-child(even) {
          background-color: #eeeeee;
        }
        &-title {
          margin-left: 10px;
        }
      }
      &-txOuts {
        margin-left: 10px;
        padding: 0.5rem;
        border-radius: 5px;

        &:nth-child(even) {
          background-color: #eeeeee;
        }

        &-title {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
