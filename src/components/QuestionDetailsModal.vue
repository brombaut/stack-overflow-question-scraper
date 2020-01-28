<template>
    <div
        id="modal-wrapper"
        @click.self="closeModal"
        :class="{modal: true, 'modal-show': isVisible, 'modal-hide': !isVisible}">
        <div class="modal-content">
            <div class="modal-header">
                <h4 v-if="detailsAreLoaded">{{ questionBodyDetails.fullTitle }}</h4>
                <h4 v-else>{{ questionSummaryDetails.title }}</h4>
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
                <div v-show="detailsAreLoaded" class="question-body-container">
                    <div id="question-body-question-container"></div>
                    <div id="question-body-tags-contaer">
                        <div
                            v-for="tag in questionSummaryDetails.tagsArray"
                            :key="tag"
                            @click.stop="handleTagClick"
                            :class="{ 'current-tag': filterTags.includes(tag) }"
                            :data-tag-value="tag">
                            {{ tag }}
                        </div>
                    </div>
                </div>
                <div v-show="!detailsAreLoaded" class="lds-dual-ring"></div>
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
        filterTags: Array,
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
        handleTagClick(el) {
            const { tagValue } = el.target.dataset;
            const tagsArray = [tagValue];
            this.$emit('tagClicked', tagsArray);
            this.closeModal();
        },
    },
    watch: {
        show(newVal) {
            this.isVisible = newVal;
        },
        detailsAreLoaded(newVal) {
            const bodyContainerEl = document.querySelector('#question-body-question-container');
            if (newVal) {
                bodyContainerEl.innerHTML = this.questionBodyDetails.questionBodyRawHtml;
            } else {
                bodyContainerEl.innerHTML = '';
            }
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

<style scoped lang='scss'>
.modal {
    display: none;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
}

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

.close {
    color: white;
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

    h4 {
        text-align: left;
        margin-right: 8px;
    }

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

            &:hover {
                cursor: alias;
            }

            .so-link-image {
                height: 40px;
                width: 40px;
                border-radius: 50%;
            }
        }
    }
}

.modal-body {
    .question-body-container {
        display: flex;

        #question-body-question-container {
            text-align: left;
            flex: 1;
            max-height: 600px;
            overflow-y: auto;
            padding: 16px;
            margin-right: 8px;
        }

        #question-body-tags-contaer {
            padding: 16px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            background-color: #dddddd;
            box-shadow: -4px 0px 8px -2px #aaaaaa;

            div {
                margin: 4px;
                padding: 4px 8px;
                border-radius: 4px;
                background-color: #546070;
                color: white;
                font-size: 1rem;

                &:hover {
                    background-color: #323e4f;
                    cursor: pointer;
                }
            }

            .current-tag {
                background-color: #2768bd;

                &:hover {
                    background-color: darken(#2768bd, 10%);
                }
            }
        }
    }

    .lds-dual-ring {
        display: inline-block;
    }

    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 80px;
        height: 80px;
        margin: 8px;
        border-radius: 50%;
        border: 8px solid #323e4f;
        border-color: #323e4f transparent #323e4f transparent;
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
    display: flex;
}

.modal-hide {
    display: none;
}
</style>
