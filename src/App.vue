<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        methods: {
            handleClick () {
                this.$Message('It works! We believe that you can save your time with AT-UI.')
            }
        }
    };
</script>

<style lang="scss">

</style>
