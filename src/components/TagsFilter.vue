<template>
  <div id='tag-filter-container' class="action">
        <span class="tag-container">
            Tag:&nbsp;
            <input
                id='filter-tag-input'
                type='text'
                placeholder="Enter a tag..."
                v-model="tagsString"
                @keyup="handleTagsInputUpdated">
        </span>
        <div class="tag-error-content">
            <p class="tag-error-message">
                <b>Invalid Tag String; </b>Only alphanumeric characters and '.', '#', '+' and '-' characters are allowed. Separate tags with spaces.
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        tags: Array,
        refreshCallback: Function,
    },
    data() {
        return {
            tagsString: '',
        };
    },
    computed: {
        stringOfTags() {
            let tagsString = '';
            for (let i = 0; i < this.tags.length; ++i) {
                tagsString += `${this.tags[i]}, `;
            }
            return tagsString;
        },
    },
    methods: {
        createTagsString() {
            this.tagsString = '';
            for (let i = 0; i < this.tags.length; ++i) {
                this.tagsString += `${this.tags[i]} `;
            }
            this.tagsString = this.tagsString.substring(0, this.tagsString.length - 1);
        },
        handleTagsInputUpdated() {
            const tagsArray = this.tagsString.trim().split(' ');
            this.$emit('updateTempTags', tagsArray);
        },
    },
    watch: {
        tags() {
            this.createTagsString();
        },
    },
    mounted() {
        this.createTagsString();
    },
};
</script>

<style scoped lang="scss">

.action {
    display: flex;
    align-items: center;
    border-left: 1px solid white;
    position: relative;
}

#tag-filter-container {
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

</style>
