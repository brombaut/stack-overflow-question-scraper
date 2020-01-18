<template>
  <div id="app">
      <header>
          <h3>
              Stack Overflow Data Scraper
          </h3>
      </header>
      <main>
          <section>
            <h2>Newest Questions</h2>
            <SummaryTable
                title="newest"
                :rows="newestQuestions" />
          </section>

          <section>
            <h2>Most Voted Questions</h2>
            <SummaryTable
                title="most-voted"
                :rows="mostVotedQuestions" />
          </section>
      </main>
  </div>
</template>

<script>
import scraper from '@/services/scraper';
import SummaryTable from '@/components/SummaryTable.vue';


export default {
    name: 'app',
    components: {
        SummaryTable,
    },
    data() {
        return {
            newestQuestions: [],
            mostVotedQuestions: [],
        };
    },
    methods: {
        fetchData() {
            scraper.scrapeNewestAndroidQuestions().then(objects => {
                this.newestQuestions = objects;
            });
            scraper.scrapeMostVotedAndroidQuestions().then(objects => {
                this.mostVotedQuestions = objects;
            });
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

  header {
      height: 40px;
      display: flex;
      align-items: center;
      padding: 8px 16px;
      background-color: #283243;
      color: white;
  }

  main {
      margin: 0 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
  }
}
</style>
