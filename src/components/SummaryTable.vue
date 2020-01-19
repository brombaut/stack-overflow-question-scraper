<template>
    <table class='summary-table'>
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Posted</th>
                <th>Votes</th>
                <th>Answers</th>
                <th>Status</th>
                <th>Tags</th>
                <th></th>  <!-- View On StackOverflow -->
                <!-- <th></th>   -->
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="row in rows"
                :key="row.id">
                <td>{{ row.id }}</td>
                <td><b>{{ row.title }}</b></td>
                <td>{{ row.relativeTime }}</td>
                <td>{{ row.voteCount }}</td>
                <td>{{ row.answers }}</td>
                <td :class="{ answered: isAnswered(row.status), accepted: isAccepted(row.status) }">
                    {{ formatStatusString(row.status) }}
                </td>
                <td class="tags-column">
                    <div
                        v-for="tag in row.tagsArray"
                        :key="tag"
                        @click="handleTagClick"
                        :class="{ 'current-tag': filterTag === tag }"
                        :data-tag-value="tag">
                        {{ tag }}
                    </div>
                </td>
                <td>
                    <a class='go-to-stack-overflow-link' :href="row.absoluteHyperlink" target="_blank">
                        Stack Overflow
                    </a>
                </td>
                <!-- <td><button>Export</button></td> -->
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        title: String,
        rows: Array,
        filterTag: String,
    },
    methods: {
        formatStatusString(statusString) {
            const words = statusString.split('-');
            let formatedString = '';
            words.forEach(word => {
                formatedString += `${word.replace(/^\w/, c => c.toUpperCase())} & `;
            });
            return formatedString.substring(0, formatedString.length - 3);
        },
        isAnswered(statusString) {
            return statusString.includes('answered') && !statusString.includes('unanswered');
        },
        isAccepted(statusString) {
            return statusString.includes('accepted');
        },
        handleTagClick(el) {
            const { tagValue } = el.target.dataset;
            this.$emit('tagClicked', tagValue);
        },
    },
};
</script>

<style lang='scss'>

.summary-table {
    border-collapse: collapse;
    width: 100%;

    td, th {
        border: 1px solid #eeeeee;
        text-align: left;
        padding: 8px;
    }

    thead {
        tr {
            background-color: #323e4f;
            color: white;
        }
    }

    tbody {
        tr:nth-child(even) {
            background-color: #eeeeee;
        }

        tr:hover {
            cursor: pointer;
            background-color: #cccccc;
        }

        .go-to-stack-overflow-link:hover {
            text-decoration: underline;
        }

        .answered {
            color: #378f54;;
        }

        .accepted {
            background-color: #5eba7d;
            color: white;
        }

        .tags-column {
            display: flex;
            flex-wrap: wrap;
            max-width: 250px;

            div {
                margin: 4px;
                padding: 4px 8px;
                border-radius: 4px;
                background-color: #546070;
                color: white;
                font-size: 0.8rem;

                &:hover {
                    background-color: #323e4f;
                    cursor: pointer;
                }
            }

            .current-tag {
                background-color: #2768bd;
            }
        }
    }

}

</style>
