import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import Http from "@/api/axios"

Vue.prototype.Http = Http;

Vue.use(Vuex);

const store = new Vuex.Store({
    state
})

export default store;