<template>
    <table class='summary-table'>
        <thead>
            <tr>
                <th>Title</th>
                <th>Time</th>
                <th>Vote Count</th>
                <th>Answers</th>
                <th>Status</th>
                <th></th>  <!-- View On StackOverflow -->
                <th></th>  <!-- Export -->
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="row in rows"
                :key="row.id">
                <td><b>{{ row.title }}</b></td>
                <td>{{ row.relativeTime }}</td>
                <td>{{ row.voteCount }}</td>
                <td>{{ row.answers }}</td>
                <td :class="{ answered: isAnswered(row.status), accepted: isAccepted(row.status) }">
                    {{ formatStatusString(row.status) }}
                </td>
                <td><a class='go-to-stack-overflow-link' :href="row.absoluteHyperlink" target="_blank">View on Stack Overflow</a></td>
                <td><button>Export</button></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        title: String,
        rows: Array,
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
            color: #4fa16b;;
        }

        .accepted {
            background-color: #5eba7d;
            color: white;
        }
    }

}

</style>
