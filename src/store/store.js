import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store =  new Vuex.Store({
  state: {
    count: 0,
    name: null
  },
  getters:{
    getName: state => {
      return state.name
    }
  },
  mutations:{
    setName(state,payload){
      console.log(payload);
      return this.state.name = payload;
    }
  },
  actions:{
    setName(context,payload){
      context.commit('setName',payload.name)
    }
  }

});

export default store;