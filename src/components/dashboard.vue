<template>
    <div>
        <navbar></navbar>
        <div class="flex-between">
            <div class="row at-row no-gutter flex-center flex-middle dashboard">
                <div class="col-md-4">
                    total MRR : {{ dashboard.sum}}
                </div>
                <div class="col-md-4">
                    total clients : {{ dashboard.count}}
                </div>
            </div>
        </div>
        <div class="flex-between">
            <div class="row">
                <div class="col-md-8" v-for="(client, index) in clients">
                    <at-card style="width: 310px; margin: 20px auto;">
                        <h4 slot="title">{{ client.name }}</h4>
                        <div slot="extra">
                            <router-link class="" :to="'/client/' + client.id" >
                                view
                            </router-link>
                        </div>
                        <ul>
                            <li>Owner :  {{ client.sales_owner}}</li>
                            <li>MRR : {{ client.mrr }} </li>
                            <li>ID : {{ client.id }} </li>
                        </ul>
                    </at-card>
                </div>
            </div>
        </div>
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
            clients: null,
            token: document.cookie.split('jwt=')[1],
            dashboard: null
        }
    },
    mounted () {
        this.fetchClients()
    },
    methods: {

        fetchClients() {
            this.$http.get('https://abtracking.herokuapp.com/myclients', { headers: { Authorization:this.token}})
            .then(response => {
                this.clients = response.body.clients
                this.dashboard = response.body.dashboard
                return response.json()
            }, response => {
                if (response.body.message == "Missing token") {
                    this.$Notify.error({ title: "Could not fetch your info", message: "You're not logged in"})
                    this.$router.push({ path: '/' })
                }

            })
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
