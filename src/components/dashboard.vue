<template>
    <div>
        <navbar></navbar>
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
            token: document.cookie.split('=')[1],
            dashboard: null
        }
    },
    mounted () {
        this.fetchClients()
    },
    methods: {
        fetchClients() {
            console.log("starting request")
            this.$http.get('https://abtracking.herokuapp.com/myclients', { headers: { Authorization:this.token}})
            .then(response => {
                console.log(response)
                console.log("received response")
                return response.json()
            })
            .then(data => {
                console.log(data)
                this.clients = data['clients']
                this.dashboard = data['dashboard']
            })
        }
    }
};
</script>

<style>


</style>
