<template>
    <header>
        <img class="scraper-logo" src="@/assets/scraper.png"/>
        <h3>Stack Overflow Data Scraper</h3>
        <div class="expand"></div>
        <div class="actions-container">
            <div class="dropdown">
                <button class="dropbtn border-left">Filter By: {{ filterType }}</button>
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
                <button class="dropbtn border-left">{{ filterDateSelectorString }}</button>
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
            <div class="dropdown">
                <button class="dropbtn border-left">Query Size: {{ filterPageSize }} Rows</button>
                <div class="dropdown-content">
                    <span
                        @click='handlePageSizeDropdownSelection'
                        data-filter-page-size=10>
                        10 Rows
                    </span>
                    <span
                        @click='handlePageSizeDropdownSelection'
                        data-filter-page-size=15>
                        15 Rows
                    </span>
                    <span
                        @click='handlePageSizeDropdownSelection'
                        data-filter-page-size=30>
                        30 Rows
                    </span>
                    <span
                        @click='handlePageSizeDropdownSelection'
                        data-filter-page-size=50>
                        50 Rows
                    </span>
                </div>
            </div>
            <div id='tag-filter-container' class="action">
                <span class="tag-container">
                    Tag:&nbsp;
                    <input
                        id='filter-tag-input'
                        type='text'
                        placeholder="Enter a tag..."
                        :value="filterTag"
                        @keyup.enter="handleRefreshClick"/>
                </span>
                <div class="tag-error-content">
                    <p class="tag-error-message"><b>Invlid Tag. </b>Only alphanumeric characters and '.', '#', '+' and '-' characters are allowed.</p>
                </div>
            </div>
            <button
                id="refresh"
                class="border-left"
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
        filterTag: String,
        filterPageSize: Number,
    },
    computed: {
        filterDateSelectorString() {
            return `Search Period: ${this.filterDateRange} ${this.filterDateRange === 1 ? 'Day' : 'Days'}`;
        },
    },
    methods: {
        handleRefreshClick() {
            const tagInputEl = document.querySelector('#filter-tag-input');
            const tag = tagInputEl.value.toLowerCase();
            if (!this.validateTag(tag)) {
                document.querySelector('#tag-filter-container').classList.add('tag-error');
                return;
            }
            document.querySelector('#tag-filter-container').classList.remove('tag-error');
            this.$emit('refresh', tag);
        },
        handleFilterTypeDropdownSelection(evt) {
            const newFilterType = evt.target.dataset.filterTypeString;
            this.$emit('changeFilterType', newFilterType);
        },
        handleFilterDateRangeDropdownSelection(evt) {
            const newFilterDateRange = Number(evt.target.dataset.filterDateRange);
            this.$emit('changeFilterDateRange', newFilterDateRange);
        },
        handlePageSizeDropdownSelection(evt) {
            const newFilterPageSize = Number(evt.target.dataset.filterPageSize);
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

    .expand{
        flex: 1;
    }

    .actions-container {
        height: 100%;
        display: flex;

        .action {
            display: flex;
            align-items: center;
            border-left: 1px solid white;
            position: relative;

            .tag-container {
                height: 100%;
                display: flex;
                align-items: center;
                padding: 0 8px;
            }

            input {
                font-size: 1rem;
                height: 50%;
                margin: 0 4px;
                width: 200px;
            }

            .tag-error-content {
                opacity: 0;
                visibility: hidden;
                position: absolute;
                padding: 0 8px;
                left: 0;
                top: calc(100% + 28px);
                background-color: #777777;
                box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
                width: auto;
            }
            .tag-error-content:before {
                position: absolute;
                z-index: -1;
                content: "";
                right: calc(50% - 10px);
                top: -8px;
                border-style: solid;
                border-width: 0 10px 10px 10px;
                border-color: transparent transparent #777777 transparent;
                transition-duration: 0.3s;
                transition-property: transform;
            }
            .tag-error-message {
                text-align: left;
            }
        }

        .tag-error .tag-error-content {
            z-index: 10;
            opacity: 1;
            visibility: visible;
            transform: translate(0, -20px);
            transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);
        }

        .dropdown {
            position: relative;
            display: inline-block;
        }

        .dropdown-content {
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            width: 100%;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
        }

        .dropdown-content span {
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            text-align: left;
        }

        .dropdown-content span:hover {
            background-color: #f1f1f1;
            cursor: pointer;
        }

        .dropdown:hover .dropdown-content {
            display: block;
        }

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

        .border-left {
            border-left: 1px solid white;
        }
    }
}

</style>
