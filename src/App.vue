<template>
  <div id="app">
      <MainHeader
        :isRefreshing="isRefreshing"
        :filterType="filterTypes[filterType]"
        :filterDateRange="filterDateRange"
        @refresh="fetchData"
        @changeFilterType="handleFilterTypeChange"
        @changeFilterDateRange="handleFilterDateRangeChange" />
      <main>
          <section>
            <h2>{{ filterTypes[filterType] }} Questions</h2>
            <SummaryTable
                :title="filterType"
                :rows="newestQuestions" />
          </section>
      </main>
  </div>
</template>

<script>
import scraper from '@/services/scraper';
import SummaryTable from '@/components/SummaryTable.vue';
import MainHeader from '@/components/MainHeader.vue';


export default {
    name: 'app',
    components: {
        SummaryTable,
        MainHeader,
    },
    data() {
        return {
            newestQuestions: [],
            mostVotedQuestions: [],
            isRefreshing: false,
            filterTypes: {
                newest: 'Newest',
                votes: 'Most Votes',
                relevance: 'Relevance',
                active: 'Active',
            },
            filterType: 'newest',
            filterDateRange: 7,
        };
    },
    methods: {
        fetchData() {
            this.isRefreshing = true;
            scraper.scrapeStackOverflowSummaryQuestions(this.filterType, 'android', this.filterDateRange).then(objects => {
                this.newestQuestions = objects;
                this.isRefreshing = false;
            }).catch(err => {
                this.isRefreshing = false;
            });
        },
        handleRefreshEvent() {
            if (this.isRefreshing) {
                return;
            }
            this.fetchData();
        },
        handleFilterTypeChange(newFilterType) {
            this.filterType = newFilterType;
            this.fetchData();
        },
        handleFilterDateRangeChange(newDateRange) {
            this.filterDateRange = newDateRange;
            this.fetchData();
        },
    },
    mounted() {
        this.fetchData();
    },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;

  main {
      margin: 80px 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
  }
}
</style>
