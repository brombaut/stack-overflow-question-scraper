<template>
    <div
        id="modal-wrapper"
        @click.self="closeModal"
        :class="{modal: true, 'modal-show': isVisible, 'modal-hide': !isVisible}">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>{{ questionSummaryDetails.title }}</h4>
                    <div class='expand'></div>
                    <div class="actions-container">
                        <div class="so-link-container action">
                            <a :href="questionSummaryDetails.absoluteHyperlink" target="_blank">
                                <img class="so-link-image" src="@/assets/so_logo.png"/>
                            </a>
                        </div>
                        <span
                            class="close action"
                            @click="closeModal">
                            &times;
                        </span>
                    </div>
                </div>
                <div class="modal-body">
                    <div v-if="detailsAreLoaded">
                        <p>Body</p>
                    </div>
                    <div v-else>
                        <p>NO BODY</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class='stat-container'>
                        <span>Posted: {{ questionSummaryDetails.relativeTime }}</span>
                    </div>
                    <div class='stat-container'>
                        <span>Votes: {{ questionSummaryDetails.voteCount }}</span>
                    </div>
                    <div class='stat-container'>
                        <span>Answers: {{ questionSummaryDetails.answers }}</span>
                    </div>
                    <div
                        :class="{
                             'stat-container': true,
                             answered: isAnswered(questionSummaryDetails.status),
                             accepted: isAccepted(questionSummaryDetails.status)
                        }">
                        <span>Status: {{ formatStatusString(questionSummaryDetails.status) }}</span>
                    </div>
                    <!-- TODO: Tags -->
                </div>
            </div>
        </div>
</template>

<script>
export default {
    props: {
        show: Boolean,
        questionSummaryDetails: Object,
        questionBodyDetails: Object,
    },
    data() {
        return {
            isVisible: false,
        };
    },
    computed: {
        detailsAreLoaded() {
            return this.questionBodyDetails && Object.keys(this.questionBodyDetails).length > 0;
        },
    },
    methods: {
        closeModal() {
            this.isVisible = false;
            this.$emit('modalClosed');
        },
        formatStatusString(statusString) {
            if (!statusString) {
                return '';
            }
            const words = statusString.split('-');
            let formatedString = '';
            words.forEach(word => {
                formatedString += `${word.replace(/^\w/, c => c.toUpperCase())} & `;
            });
            return formatedString.substring(0, formatedString.length - 3);
        },
        isAnswered(statusString) {
            return statusString && statusString.includes('answered') && !statusString.includes('unanswered');
        },
        isAccepted(statusString) {
            return statusString && statusString.includes('accepted');
        },
    },
    watch: {
        show(newVal) {
            this.isVisible = newVal;
        },
        questionBodyDetails(newVal) {
            console.log('new questionBodyDetails');
            console.log(newVal);
        },
    },
    mounted() {
        document.addEventListener('keyup', (e) => {
            if (e.code === 'Escape') {
                this.closeModal();
            }
        });
    },
    beforeDestroy() {
        this.closeModal();
    },
};
</script>

<style lang='scss'>
/* The Modal (background) */
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 200px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    border: 1px solid #888;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
    from {
        top:-300px; opacity:0
    }
    to {
        top:0; opacity:1
    }
}

@keyframes animatetop {
    from {
        top:-300px; opacity:0
    }
    to {
        top:0; opacity:1
    }
}

/* The Close Button */
.close {
    color: white;
    // float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #cccccc;
    text-decoration: none;
    cursor: pointer;
}

.modal-header {
    padding: 2px 16px;
    background-color: #323e4f;
    color: white;
    display: flex;
    align-items: center;

    .expand {
        flex: 1;
    }

    .actions-container {
        display: flex;

        .action {
            margin: 0 0px;
            border-radius: 50%;
            height: 40px;
            width: 40px;

            &:hover {
                cursor: pointer;
                background-color: lighten(#323e4f, 10%);
            }
        }

        .so-link-container {
            display: flex;
            justify-content: center;
            align-items: center;

            .so-link-image {
                height: 40px;
                width: 40px;
                border-radius: 50%;
            }
        }
    }
}

.modal-body {
    padding: 2px 16px;
}

.modal-footer {
    background-color: #323e4f;
    color: white;
    display: flex;
    justify-content: space-around;

    .stat-container {
        padding: 12px 0px;
        flex: 1;
    }

    .stat-container:not(:last-child) {
        border-right: 1px solid white;
    }

    .answered {
        color: #11c04b;
        font-style: bold;
    }

    .accepted {
        background-color: #5eba7d;
        color: white;
    }
}

.modal-show {
    display: block;
}

.modal-hide {
    display: none;
}
</style>
