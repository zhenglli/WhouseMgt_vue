import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:'',
    setOptionVal:'preference'
  },
  getters:{
    getUserToken(state){
      return state.userInfo.token_id;
    },
    getOption(state){
      return state.setOptionVal;
    }
  },
  mutations: {

  },
  actions: {

  }
})