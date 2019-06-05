import * as types from "./../types";

export default {
  state: {
    chain: []
  },
  getters: {
    chain: state => state.chain,
    getAmount: state => publicKey => {
      let substract = 0;
      let addition = 0;
      state.chain.map(block => {
        block.transactions.map(transaction => {
          transaction.txOuts.map((txOut, index) => {
            if (publicKey == txOut.address) {
              addition += txOut.amount;
              state.chain.map(block2 => {
                block2.transactions.map(transaction2 => {
                  transaction2.txIns.map(txIn => {
                    if (
                      txIn.txOutId === transaction.id &&
                      txIn.txOutIndex === index
                    ) {
                      substract += txOut.amount;
                    }
                  });
                });
              });
            }
          });
        });
      });
      return addition - substract;
    }
  },
  actions: {
    setChain({ commit }, chain) {
      commit(types.SET_CHAIN, chain);
    },
    addBlock({ commit }, block) {
      commit(types.ADD_BLOCK, block);
    }
  },
  mutations: {
    [types.SET_CHAIN](state, chain) {
      state.chain = chain;
    },
    [types.ADD_BLOCK](state, block) {
      state.chain = state.chain.concat(block);
    }
  }
};
