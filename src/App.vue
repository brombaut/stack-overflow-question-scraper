<template>
  <div id="app">
      <MainHeader
        :isRefreshing="isRefreshing"
        :filterType="filterTypes[filterType]"
        :filterDateRange="filterDateRange"
        :filterTag="filterTag"
        :filterPageSize="filterPageSize"
        @refresh="handleRefreshEvent"
        @changeFilterType="handleFilterTypeChange"
        @changeFilterDateRange="handleFilterDateRangeChange"
        @changeFilterPageSize="handleFilterPageSizeChange" />
      <main>
          <section>
            <h2>{{ filterTypes[filterType] }} Questions</h2>
            <SummaryTable
                v-if="newestQuestions.length > 0"
                :title="filterType"
                :rows="newestQuestions"
                :filterTag="filterTag"
                @tagClicked="handleRefreshEvent"/>
            <h3 v-else>No Data Found</h3>
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
            filterTag: 'android',
            filterPageSize: 10,
        };
    },
    methods: {
        fetchData() {
            this.isRefreshing = true;
            scraper.scrapeStackOverflowSummaryQuestions(this.filterType, this.filterTag, this.filterDateRange, this.filterPageSize).then(objects => {
                this.newestQuestions = objects.slice(0, this.filterPageSize);
                this.isRefreshing = false;
            }).catch(err => {
                this.isRefreshing = false;
            });
        },
        handleRefreshEvent(tag) {
            if (this.isRefreshing) {
                return;
            }
            this.filterTag = tag;
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
        handleFilterPageSizeChange(newPageSize) {
            this.filterPageSize = newPageSize;
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
