<template>
  <button
        id="refresh"
        class="border-left"
        @click='clickCallback'>
        <div
            class="lds-dual-ring"
            v-if="isRefreshing">
        </div>
        <span v-else>Refresh</span>
    </button>
</template>

<script>
export default {
    props: {
        clickCallback: Function,
        isRefreshing: Boolean,
    },
};
</script>

<style lang="scss">

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

</style>
