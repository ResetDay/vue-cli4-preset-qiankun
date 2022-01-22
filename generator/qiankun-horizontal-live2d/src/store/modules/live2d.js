const state = {
  showMessage: ''
};

const getters = {
  msg: state => state.showMessage
};

const mutations = {
  showMessage (state, msg) {
    state.showMessage = msg;
  }
};

const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
