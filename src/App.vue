<template>
  <div id="app">
        <MainHeader
            :isRefreshing="isRefreshing"
            :filterType="filterTypes[filterType]"
            :filterDateRange="filterDateRange"
            :filterTags="filterTags"
            :filterPageSize="filterPageSize"
            @refresh="handleRefreshEvent"
            @changeFilterType="handleFilterTypeChange"
            @changeFilterDateRange="handleFilterDateRangeChange"
            @changeFilterPageSize="handleFilterPageSizeChange"
            @updateTempTags="handleUpdateTempTags" />
        <main>
            <section>
                <h2>{{ filterTypes[filterType] }} Questions</h2>
                <SummaryTable
                    v-if="questionSummaries.length > 0"
                    :title="filterType"
                    :rows="questionSummaries"
                    :filterTags="filterTags"
                    @tagClicked="updateFilterTags"
                    @rowClicked="handleQuestionSelected"/>
                <h3 v-else>No Data Found</h3>
            </section>
        </main>
        <QuestionDetailsModal
            :show="showModal"
            :questionSummaryDetails="selectedQuestionSummaryDetails"
            :questionBodyDetails="selectedQuestionBodyDetails"
            :filterTags="filterTags"
            @modalClosed="resetSelectedQuestion"
            @tagClicked="updateFilterTags" />
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
            filterTags: [
                'android',
            ],
            filterPageSize: 10,
            showModal: false,
            selectedQuestionId: null,
            tempTags: [
                'android',
            ],
        };
    },
    computed: {
        selectedQuestionSummaryDetails() {
            if (!this.selectedQuestionId) {
                return {};
            }
            return this.questionSummaries.find(q => q.id === this.selectedQuestionId);
        },
        selectedQuestionBodyDetails() {
            if (!this.selectedQuestionId) {
                return {};
            }
            return this.specificQuestionDetails[this.selectedQuestionId];
        },
    },
    methods: {
        fetchData() {
            this.isRefreshing = true;
            scraper.scrapeStackOverflowSummaryQuestions(this.filterType, this.filterTags, this.filterDateRange, this.filterPageSize).then(objects => {
                this.questionSummaries = objects.slice(0, this.filterPageSize + 1);
                this.isRefreshing = false;
            }).catch(err => {
                this.isRefreshing = false;
            });
        },
        handleRefreshEvent() {
            if (this.isRefreshing) {
                return;
            }
            this.useTempTags();
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
        updateFilterTags(newTags) {
            this.filterTags = newTags;
            this.fetchData();
        },
        handleQuestionSelected(questionId) {
            this.selectedQuestionId = questionId;
            const selectedQuestion = this.questionSummaries.find(q => q.id === questionId);
            if (!selectedQuestion.detailsFetched) {
                const selectedQuestionSummary = this.selectedQuestionSummaryDetails;
                if (selectedQuestionSummary) {
                    scraper.scrapeStackOverflowQuestionDetails(selectedQuestionSummary.absoluteHyperlink).then(details => {
                        this.addQuestionDetails(details);
                    });
                }
            }
            document.body.style.overflow = 'hidden';
            this.showModal = true;
        },
        addQuestionDetails(details) {
            const cleanedObj = { ...details };
            this.$set(this.specificQuestionDetails, `${this.selectedQuestionId}`, cleanedObj);
        },
        resetSelectedQuestion() {
            this.selectedQuestionId = null;
            document.body.style.overflow = 'auto';
            this.showModal = false;
        },
        handleUpdateTempTags(newTempTags) {
            this.tempTags = newTempTags;
        },
        useTempTags() {
            this.filterTags = [...this.tempTags];
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
