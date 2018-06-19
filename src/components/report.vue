<template>
    <div>
        <navbar></navbar>
    </div>
</template>

<script>
import navbar from './navbar.vue'
export default {
    components: {
        navbar
    },
    data() {
        return {
            token: document.cookie.split('jwt=')[1],
            report : []
        }
    },
    mounted () {
        this.fetchReport()
        // this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
    },
    computed: {

    },
    methods: {
        fetchReport() {
            this.$http.get('https://abtracking.herokuapp.com/report',{params:  {period: "this_month", breakdown: "week", team_id: 1}}, { headers: { Authorization:this.token}})
            .then(response => {
                console.log(response)
                // this.report = response.body.clients
                return response.json()
            }, response => {
                // if (response.body.message == "Missing token") {
                //     this.$Notify.error({ title: "Could not fetch your info", message: "You're not logged in"})
                //     this.$router.push({ path: '/' })
                }

            )
        }
    }
};
</script>

<style>
.dashboard {
    height: 80px;
    border-bottom: solid 1px #E3ECF4;
    padding: auto;
}

</style>
