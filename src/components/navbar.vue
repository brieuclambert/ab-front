<template>
    <div id="navbar">
        <at-menu mode="horizontal" active-name="1">
            <at-menu-item name="4">
                <router-link class="" to="/dashboard">
                    <i class="icon icon-clock"></i>My dashboard
                </router-link>
            </at-menu-item>
            <!-- <at-menu-item name="4">
                <router-link class="" to="/client/232">
                    <i class="icon icon-award"></i>My clients
                </router-link>
            </at-menu-item> -->
            <at-menu-item name="4" >
                <div v-on:click="logout">
                    <i class="icon icon-award"></i>logout

                </div>
            </at-menu-item>
            <at-menu-item name="4">
                <router-link class="" to="/timer">
                    <i class="icon icon-clock"></i>Timer
                </router-link>
            </at-menu-item>
            <at-menu-item name="4">
                <router-link class="" to="/report">
                    <i class="icon icon-clock"></i>Report
                </router-link>
            </at-menu-item>
        </at-menu>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            console.log('start')
            document.cookie = "jwt="
            console.log('deleted cookie')
            this.$router.push({ path: '/' })
            console.log('finished')
        }
    }
};

</script>

<style>

</style>

