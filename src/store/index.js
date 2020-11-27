import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import states from './states';

Vue.use(Vuex);
export function createStore(){
    return new Vuex.Store({
        state: states,
        mutations: mutations,
        actions: actions
      })
}
