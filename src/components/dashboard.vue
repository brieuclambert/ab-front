<template>
    <div>
        <navbar></navbar>
        <div class="flex-between">
            <div class="row at-row no-gutter flex-center flex-middle dashboard">
                <div class="col-md-4">
                    monthly count : {{ dashboard.sum_month}}
                </div>
                <div class="col-md-4">
                    weekly count : {{ dashboard.sum_week}}
                </div>
                <div class="col-md-4">
                    total MRR : {{ Math.round(dashboard.sum_mrr / 1000) }}K€
                </div>
                <div class="col-md-4">
                    total clients : {{ dashboard.count}}
                </div>
            </div>
        </div>
        <div class="flex-between">
            <div class="row at-row no-gutter flex-center flex-middle dashboard">
                <div class="col-md-6">
                    <at-select v-model="parameters.client" filterable size="large" style="width: 240px">
                        <at-option :key="client.id" v-bind:value="client.id" v-for="client in clients"> {{ client.name }} </at-option>
                    </at-select>
                </div>
                <div class="col-md-6">
                    <at-select v-model="parameters.project" filterable size="large" style="width: 240px" @select.native="filterTasks">
                        <at-option :key="project" v-bind:value="project" v-for="project in projects"> {{ project }} </at-option>
                    </at-select>
                </div>
                <div class="col-md-6">
                    <at-select v-model="parameters.task" filterable size="large" style="width: 240px">
                        <at-option :key="task" v-bind:value="task" v-for="task in tasks"> {{ task }} </at-option>
                    </at-select>
                </div>
                <div class="col-md-6">
                    Chart 1 (entries per week)
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
            clients: {},
            token: document.cookie.split('jwt=')[1],
            dashboard: {},
            parameters: {
                client: "",
                project: "",
                task: ""
            },
            projects: [
            "Strategic Accompaniment",
            "Technical Accompaniment",
            "Exceptionnal Accompaniment",
            "Startup",
            "Debug - Follow up",
            "Internal",
            "Support",
            "Pre-Sale",
            "Admin",
            "Others"
            ],
            tasks: []
        }
    },
    mounted () {
        this.fetchClients()
        // this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
    },
    computed: {

    },
    methods: {
        fetchClients() {
            this.$http.get('https://abtracking.herokuapp.com/myclients', { headers: { Authorization:this.token}})
            .then(response => {
                console.log(response)
                this.clients = response.body.clients
                this.dashboard = response.body.dashboard
                return response.json()
            }, response => {
                if (response.body.message == "Missing token") {
                    this.$Notify.error({ title: "Could not fetch your info", message: "You're not logged in"})
                    this.$router.push({ path: '/' })
                }

            })
        },
        filterTasks() {
            switch (this.parameters.project) {
                case 'Strategic Accompaniment':
                    this.tasks = ["Email", "Phone", "Intercom"];
                    console.log(this.tasks)
                default:
                    this.tasks = ["test", "test 2", "test 3"];
            console.log(this.parameters.project)
            }
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
