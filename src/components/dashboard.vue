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
            clients: null
        }
    },
    mounted () {
        this.fetchTicker()
    },
    methods: {
        fetchTicker() {
            this.$http.get('https://abtracking.herokuapp.com/clients', {params: {client: {sales_owner: 'Antoine Rault', status: 'Ongoing'}}})
            .then(response => {
                return response.json()
            })
            .then(data => {
                        // console.log(Object.keys(data))
                        this.clients = data["data"]
                        console.log(this.clients)
                    })
        }
    }
};
</script>

<style>


</style>
