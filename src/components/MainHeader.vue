<template>
    <header>
        <h3>Stack Overflow Data Scraper</h3>
        <div class="expand"></div>
        <div class="actions-container">
            <div class="dropdown">
                <button class="dropbtn">Filter By {{ filterType }}</button>
                <div class="dropdown-content">
                    <span
                        @click='handleFilterTypeDropdownSelection'
                        data-filter-type-string="newest"
                        data-filter-type-title="Newest">
                        Newest
                    </span>
                    <span
                        @click='handleFilterTypeDropdownSelection'
                        data-filter-type-string="votes"
                        data-filter-type-title="Most Votes">
                        Most Votes
                    </span>
                    <span
                        @click='handleFilterTypeDropdownSelection'
                        data-filter-type-string="relevance"
                        data-filter-type-title="Relevance">
                        Relevance
                    </span>
                    <span
                        @click='handleFilterTypeDropdownSelection'
                        data-filter-type-string="active"
                        data-filter-type-title="Active">
                        Active
                    </span>
                </div>
            </div>
            <div class="dropdown">
                <button class="dropbtn">{{ filterDateSelectorString }}</button>
                <div class="dropdown-content">
                    <span
                        @click='handleFilterDateRangeDropdownSelection'
                        data-filter-date-range=1>
                        1 Day
                    </span>
                    <span
                        @click='handleFilterDateRangeDropdownSelection'
                        data-filter-date-range=7>
                        7 Days
                    </span>
                    <span
                        @click='handleFilterDateRangeDropdownSelection'
                        data-filter-date-range=15>
                        15 Days
                    </span>
                    <span
                        @click='handleFilterDateRangeDropdownSelection'
                        data-filter-date-range=30>
                        30 Days
                    </span>
                </div>
            </div>
            <button
                id="refresh"
                @click='handleRefreshClick'>
                <div
                    class="lds-dual-ring"
                    v-if="isRefreshing">
                </div>
                <span v-else>Refresh</span>
            </button>
        </div>
    </header>
</template>

<script>
export default {
    props: {
        isRefreshing: Boolean,
        filterType: String,
        filterDateRange: Number,
    },
    computed: {
        filterDateSelectorString() {
            return `Search Period: ${this.filterDateRange} ${this.filterDateRange === 1 ? 'Day' : 'Days'}`;
        },
    },
    methods: {
        handleRefreshClick() {
            this.$emit('refresh');
        },
        handleFilterTypeDropdownSelection(evt) {
            const newFilterType = evt.target.dataset.filterTypeString;
            this.$emit('changeFilterType', newFilterType);
        },
        handleFilterDateRangeDropdownSelection(evt) {
            const newFilterDateRange = Number(evt.target.dataset.filterDateRange);
            this.$emit('changeFilterDateRange', newFilterDateRange);
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

    h3 {
        margin: 8px 16px;
    }

    .expand{
        flex: 1;
    }

    .actions-container {
        height: 100%;
        display: flex;

        /* The container <div> - needed to position the dropdown content */
        .dropdown {
            position: relative;
            display: inline-block;
        }

        /* Dropdown Content (Hidden by Default) */
        .dropdown-content {
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            width: 100%;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
        }

        /* Links inside the dropdown */
        .dropdown-content span {
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            text-align: left;
        }

        /* Change color of dropdown links on hover */
        .dropdown-content span:hover {
            background-color: #f1f1f1;
            cursor: pointer;
        }

        /* Show the dropdown menu on hover */
        .dropdown:hover .dropdown-content {
            display: block;
        }

        /* Change the background color of the dropdown button when the dropdown content is shown */
        .dropdown:hover .dropbtn {
            cursor: pointer;
            background-color: #323e4f;
        }

        button {
            background-color: #283243;
            color: white;
            padding: 0px 16px;
            font-size: 16px;
            border: none;
            border-left: 1px solid white;
            cursor: pointer;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 120px;

            &:hover {
                cursor: pointer;
                background-color: #323e4f;
            }
        }
    }

    .lds-dual-ring {
        display: inline-block;
    }

    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 20px;
        height: 20px;
        margin: 8px;
        border-radius: 50%;
        border: 3px solid #fff;
        border-color: #fff transparent #fff transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
}

</style>
