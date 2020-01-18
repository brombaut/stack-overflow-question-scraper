<template>
  <div id="app">
  </div>
</template>

<script>
import scraper from '@/services/scraper';

export default {
    name: 'app',
    components: {
    },
    methods: {
        fetchData() {
            console.log('fetchData');
            scraper.scrapeNewestAndroidQuestions();
            scraper.scrapeMostVotedAndroidQuestions();
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
  margin-top: 60px;
}
</style>
