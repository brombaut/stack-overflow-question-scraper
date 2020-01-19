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
                    v-if="questionSummaries.length > 0"
                    :title="filterType"
                    :rows="questionSummaries"
                    :filterTag="filterTag"
                    @tagClicked="handleRefreshEvent"
                    @rowClicked="handleQuestionSelected"/>
                <h3 v-else>No Data Found</h3>
            </section>
        </main>
        <QuestionDetailsModal
            :show="showModal"
            :questionSummaryDetails="selectedQuestionSummaryDetails"
            @modalClosed="resetSelectedQuestion" />
  </div>
</template>

<script>
import scraper from '@/services/scraper';
import SummaryTable from '@/components/SummaryTable.vue';
import MainHeader from '@/components/MainHeader.vue';
import QuestionDetailsModal from '@/components/QuestionDetailsModal.vue';


export default {
    name: 'app',
    components: {
        SummaryTable,
        MainHeader,
        QuestionDetailsModal,
    },
    data() {
        return {
            questionSummaries: [],
            specificQuestionDetails: {},
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
            showModal: false,
            selectedQuestionId: null,
        };
    },
    computed: {
        stacktackString() {
            return `stacktack-${this.stacktackId}`;
        },
        selectedQuestionSummaryDetails() {
            if (!this.selectedQuestionId) {
                return {};
            }
            return this.questionSummaries.find(q => q.id === this.selectedQuestionId);
        },
    },
    methods: {
        fetchData() {
            this.isRefreshing = true;
            scraper.scrapeStackOverflowSummaryQuestions(this.filterType, this.filterTag, this.filterDateRange, this.filterPageSize).then(objects => {
                this.questionSummaries = objects.slice(0, this.filterPageSize + 1);
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
        handleQuestionSelected(questionId) {
            this.selectedQuestionId = questionId;
            const selectedQuestion = this.questionSummaries.find(q => q.id === questionId);
            if (!selectedQuestion.detailsFetched) {
                const selectedQuestionSummary = this.selectedQuestionSummaryDetails;
                if (selectedQuestionSummary) {
                    scraper.scrapeStackOverflowQuestionDetails(selectedQuestionSummary.absoluteHyperlink).then(this.addQuestionDetails);
                }
            }
            this.showModal = true;
        },
        addQuestionDetails(details) {
            this.$set(this.specificQuestionDetails, `${this.selectedQuestionId}`, details);
            // this.specificQuestionDetails[`${this.selectedQuestionId}`] = details;
            // this.$nextTick().then(() => {
            //     const selectedQuestion = this.questionSummaries.find(q => q.id === this.selectedQuestionId);
            //     selectedQuestion.detailsFetched = true;
            //     selectedQuestion.fullTitle = details.fullTitle;
            // });
        },
        resetSelectedQuestion() {
            this.selectedQuestionId = null;
            this.showModal = false;
        },
    },
    watch: {
        specificQuestionDetails: {
            handler(newVal) {
                console.log('WATCHER', newVal);
            },
            deep: true,
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
