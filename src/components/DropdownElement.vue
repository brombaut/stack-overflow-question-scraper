<template>
  <div class="dropdown">
        <button class="dropbtn border-left">{{ dropdownTitle }}</button>
        <div class="dropdown-content">
            <span
                v-for="option in dropdownOptions"
                :key="option.value"
                @click='dropdownSelectCallback'
                :data-value="option.value"
                :data-title="option.title">
                {{ option.title }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        dropdownTitle: String,
        dropdownSelectCallback: Function,
        dropdownOptions: Array,
    },
};
</script>

<style lang="scss">
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

</style>
