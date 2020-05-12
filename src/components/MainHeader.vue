<template>
    <header>
        <img class="scraper-logo" src="@/assets/scraper.png"/>
        <h3>Stack Overflow Question Scraper</h3>
        <div class="expand"></div>
        <div class="actions-container">
            <DropdownElement
                :dropdownTitle="filterTypeDrowdownTitle"
                :dropdownOptions="filterTypeDrowdownOptions"
                :dropdownSelectCallback="handleFilterTypeDropdownSelection" />
            <DropdownElement
                :dropdownTitle="filterDateSelectorString"
                :dropdownOptions="filterDateDrowdownOptions"
                :dropdownSelectCallback="handleFilterDateRangeDropdownSelection" />
            <DropdownElement
                :dropdownTitle="filterPageSizeSelectorString"
                :dropdownOptions="filterPageSizeDrowdownOptions"
                :dropdownSelectCallback="handlePageSizeDropdownSelection" />
            <TagsFilter
                :tags="filterTags"
                @updateTempTags="handleUpdateTempTags"/>
            <RefreshButton
                :clickCallback="handleRefreshClick"
                :isRefreshing="isRefreshing" />
        </div>
    </header>
</template>

<script>
import DropdownElement from '@/components/DropdownElement.vue';
import RefreshButton from '@/components/RefreshButton.vue';
import TagsFilter from '@/components/TagsFilter.vue';


export default {
    components: {
        DropdownElement,
        RefreshButton,
        TagsFilter,
    },
    data() {
        return {
            tagsAreValid: true,
        };
    },
    props: {
        isRefreshing: Boolean,
        filterType: String,
        filterDateRange: Number,
        filterTags: Array,
        filterPageSize: Number,
    },
    computed: {
        filterTypeDrowdownTitle() {
            return `Filter By: ${this.filterType}`;
        },
        filterTypeDrowdownOptions() {
            return [
                {
                    value: 'newest',
                    title: 'Newest',
                },
                {
                    value: 'votes',
                    title: 'Most Votes',
                },
                {
                    value: 'relevance',
                    title: 'Relevance',
                },
                {
                    value: 'active',
                    title: 'Active',
                },
            ];
        },
        filterDateSelectorString() {
            return `Search Period: ${this.filterDateRange} ${this.filterDateRange === 1 ? 'Day' : 'Days'}`;
        },
        filterDateDrowdownOptions() {
            return [
                {
                    value: '1',
                    title: '1 Day',
                },
                {
                    value: '7',
                    title: '7 Days',
                },
                {
                    value: '15',
                    title: '15 Days',
                },
                {
                    value: '30',
                    title: '30 Days',
                },
            ];
        },
        filterPageSizeSelectorString() {
            return `Query Size: ${this.filterPageSize} Rows`;
        },
        filterPageSizeDrowdownOptions() {
            return [
                {
                    value: '10',
                    title: '10 Rows',
                },
                {
                    value: '15',
                    title: '15 Rows',
                },
                {
                    value: '30',
                    title: '30 Rows',
                },
                {
                    value: '50',
                    title: '50 Rows',
                },
            ];
        },
    },
    methods: {
        handleRefreshClick() {
            if (!this.tagsAreValid) {
                document.querySelector('#tag-filter-container').classList.add('tag-error');
                return;
            }
            document.querySelector('#tag-filter-container').classList.remove('tag-error');
            this.$emit('refresh');
        },
        handleFilterTypeDropdownSelection(evt) {
            const newFilterType = evt.target.dataset.value;
            this.$emit('changeFilterType', newFilterType);
        },
        handleFilterDateRangeDropdownSelection(evt) {
            const newFilterDateRange = Number(evt.target.dataset.value);
            this.$emit('changeFilterDateRange', newFilterDateRange);
        },
        handlePageSizeDropdownSelection(evt) {
            const newFilterPageSize = Number(evt.target.dataset.value);
            this.$emit('changeFilterPageSize', newFilterPageSize);
        },
        validateTag(tag) {
            if (tag.length === 0) {
                // Empty string is fine
                return true;
            }
            const isValid = tag.match(/^[0-9a-z+\-.#]+$/);
            return isValid;
        },
        handleUpdateTempTags(arr) {
            let allAreValid = true;
            for (let i = 0; i < arr.length; ++i) {
                allAreValid = allAreValid && this.validateTag(arr[i]);
            }
            if (allAreValid) {
                this.$emit('updateTempTags', arr);
                this.tagsAreValid = true;
            } else {
                this.tagsAreValid = false;
            }
        },
    },
};
</script>

<style lang='scss'>

header {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0;
    background-color: #283243;
    color: white;
    position: fixed;
    width: 100%;
    top: 0;

    .scraper-logo {
        height: 60px;
        width: 60px;
        margin: 0 16px;
    }

    h3 {
        margin: 8px 0px;
    }
    @media only screen and (max-width: 1000px) {
        h3 {
            display: none;
        }
    }

    .expand{
        flex: 1;
    }

    .actions-container {
        height: 100%;
        display: flex;

        .border-left {
            border-left: 1px solid white;
        }
    }
}

</style>
