<template>
  <div class="container">
    <h1>Coins</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Symbol</th>
          <th scope="col">Rank</th>
          <th scope="col">Is new</th>
          <th scope="col">Is active</th>
          <th scope="col">Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(coin, i) in coins" :key="i">
          <th scope="row">{{ coin.id }}</th>
          <td>{{ coin.name }}</td>
          <td>{{ coin.symbol }}</td>
          <td>{{ coin.rank }}</td>
          <td>{{ coin.is_new }}</td>
          <td>{{ coin.is_active }}</td>
          <td>{{ coin.type }}</td>
          <td>
            <router-link :to="{ name: 'Detalle', params: { idbtc: coin.id } }">
              <button class="btn btn-success btn-sm">Detalle</button>
            </router-link>
          </td>
        </tr>
      </tbody>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li @click="changePage(dataTable.currentPage - 1)" class="page-item">
            <a class="page-link">Previous</a>
          </li>

          <li v-for="index in dataTable.end" :key="index" class="page-item">
            <router-link
              @click.native="current()"
              :to="{ name: 'Home', params: { page: index } }"
            >
              {{ index }}
            </router-link>
          </li>

          <li @click="changePage(dataTable.currentPage + 1)" class="page-item">
            <a class="page-link">Next</a>
          </li>
        </ul>
      </nav>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      dataTable: {
        currentPage: 1,
        perPage: 15,
        total: 0,
        start: 1,
        end: 15,
        previous: 1,
        next: 2,
      },
    };
  },
  computed: {
    ...mapState(["coins"]),
  },
  methods: {
    pagination() {
      this.dataTable.end = this.dataTable.currentPage * this.dataTable.perPage;
      this.dataTable.start = this.dataTable.end - this.dataTable.perPage;
      return this.dataTable.perPage;
    },
    ...mapActions(["getCoins"]),
    previous() {
      this.dataTable.previous =
        this.dataTable.currentPage == 1 ? 1 : this.dataTable.currentPage - 1;
    },
    next() {
      this.dataTable.next = this.dataTable.currentPage + 1;
    },
    current() {
      this.dataTable.currentPage = this.$route.params.page;
      this.getCoins(this.dataTable.start, this.dataTable.end);
    },
    changePage(pageTo) {
      if (pageTo > 0) {
        let redirect = pageTo == 1 ? 1 : pageTo;
        this.dataTable.currentPage = redirect;
        this.$router.push({ name: "Home", params: { page: pageTo } });
      }
    },
  },
  created() {
    this.pagination();
    this.current();
  },
};
</script>

