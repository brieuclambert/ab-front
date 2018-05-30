<template>
    <div>
        <navbar></navbar>
        <div class="row flex-center at-row">
            <div class="col-lg-4" style="border: solid 1px black"> Grid 4</div>
            <div class="col-lg-8" style="border: solid 1px black"> grid 8</div>

      </div>
  </div>
</template>

<script>
    import navbar from './navbar.vue'
    export default {
        components: {
            navbar
        }
    }
</script>

<style>

</style>
