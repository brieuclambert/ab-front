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
                    <at-select v-model="parameters.client" filterable size="large" style="width: 200px" placeholder="client">
                        <at-option :key="client.id" v-bind:value="client.id" v-for="client in clients"> {{ client.name }} </at-option>
                    </at-select>
                </div>
                <div class="col-md-6">
                    <at-select v-model="parameters.project" filterable size="large" style="width: 200px" v-on:change="clearTask" placeholder="project">
                        <at-option v-bind:value="key" v-for="(value, key) in projects" v-on:change="clearTask" > {{ key }} </at-option>
                    </at-select>
                </div>
                <div class="col-md-6">
                    <at-select v-model="parameters.task" filterable size="large" style="width: 200px" placeholder="task">
                        <at-option :key="task" v-bind:value="task" v-for="task in projects[parameters.project]"> {{ task }} </at-option>
                    </at-select>
                </div>
                <div class="col-md-6">
                    Client : {{parameters.client }} <br>
                    Project : {{parameters.project }} <br>
                    task : {{parameters.task }}
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
            projects: {
                "Strategic Accompaniment" : ["Email", "Phone", "Intercom", "Meeting", "Roadmap"],
                "Technical Accompaniment" : ["Email", "Phone", "Intercom", "Meeting", "Roadmap"],
                "Exceptionnal Accompaniment" : ["Email", "Phone", "Intercom", "Meeting", "Roadmap"],
                "Startup" : ["Formation", "Set-up"],
                "Debug - Follow up" : ["Email", "Slack"],
                "Internal" : ["Case-Study", "Handover", "Meeting", "Agency"],
                "Support" : ["Email", "Phone", "Intercom"],
                "Pre-Sale" : ["Email", "Phone", "Meeting"],
                "Admin" : ["Big-up", "RH", "BYS"],
                "Others" : ["Others"]
            },
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
        clearTask() {
            this.parameters.task = ""
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
