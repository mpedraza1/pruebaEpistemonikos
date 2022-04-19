<template>
  <div>
    <h2>Detalle de monedas</h2>
    <div class="container-fluid">
      <div class="row">
   
          <div class="col-1"> 
              <img src="../assets/img/btc.png" alt="">
          </div>
                    <div class="col-1"> 
              <h1>{{currencyName}}</h1>
          </div>
        <div>
          <table class="table">
            <thead>
              <tr>
                
                <th scope="col">Precio Apertura</th>
                <th scope="col">Precio Cierre</th>
                <th scope="col">Precio Apertura</th>
                <th scope="col">Precio Cierre</th>
                <th scope="col">Precio Alto</th>
                <th scope="col">Precio Bajo</th>
              </tr>
            </thead>
            <tbody>
           
              <tr v-for="(detail,index) in details" :key="index">

                <th scope="row">{{formatDate(detail.time_open)}}</th>
                <td>{{formatDate(detail.time_close)}}</td>
                <td>USD$ {{formatPrice(detail.open)}}</td>
                <td>USD$ {{formatPrice(detail.close)}}</td>
                <td>USD$ {{formatPrice(detail.high)}}</td>
                <td>USD$ {{formatPrice(detail.low)}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters,mapState } from 'vuex'
export default {
  name: 'Details',
  data(){
    return {
       btcid:this.$route.params.idbtc,
       currencyName:""
    }
  },
  computed:{
     ...mapState(["details"]),
     ...mapGetters(["getDetail"]),
  },
  methods:{
    ...mapActions(["getDetails"]),
    formatDate(date){
       return moment(date).format("YYYY-MM-DD")
     },
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    coinName(){
      let realname = this.btcid.split("-")
      this.currencyName=realname[1];
    }
  },
  created(){
    this.getDetails()
    this.coinName()
    console.log(this.btcid)
  }
}
</script>

<style>

</style>