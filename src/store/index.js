import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import axios from 'axios';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import moment from 'moment'
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

 const store = new Vuex.Store({
  state: {
    coins:[],
    details:[],
    daysAgo:0,
    today:0
  },
  getters:{
    getCoin (state) {
      return state.coins;
    },
    getDetail (state) {
      return state.details;
    },
  },
  mutations: {
    setCoins(state, coins) {
      state.coins = coins;
    },
    setDetails(state, details) {
      state.details = details;
    }
  },
  actions: {
    async getCoins({commit},data) {
      const url = "https://api.coinpaprika.com/v1/coins";
      const response = await axios.get(url);
      const {data: coins} = response;
      commit("setCoins", coins.slice(1,15));
    },
    async getDetails({commit},data) {
      this.state.daysAgo= moment().subtract(6, 'days').format('YYYY-MM-DD');
      this.state.today = moment().format('YYYY-MM-DD');
      const url = "https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/historical";
      const response = await axios.get(url,{
        params:{
          start:this.state.daysAgo,
          end:this.state.today,
        }
      });
      commit("setDetails", response.data);
    },
  }, 
})

store.dispatch("getCoins");

export default store;