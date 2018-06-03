<template>
    <div>
        <navbar></navbar>
        <div class="row at-row no-gutter flex-center">
            <div class="col-md-4"><div class="at-box-row bg-c-brand-dark">Name : {{ client.name}} </div></div>
            <div class="col-md-4"><div class="at-box-row bg-c-brand-light">Owner : {{ client.sales_owner}}</div></div>
            <div class="col-md-4"><div class="at-box-row bg-c-brand-dark">Status : {{ client.status}}</div></div>
            <div class="col-md-4"><div class="at-box-row bg-c-brand-light">MRR : {{ client.mrr}}</div></div>
        </div>
        <div class="row at-row no-gutter" v-for="entry in entries">
            <div class="col-md-4">
                <at-card style="width: 310px; margin: 20px auto;">
                    <h4 slot="title">{{ entry.created_at }}</h4>
                    <div slot="extra">
                        {{ entry.hours}}h{{entry.minutes}}
                    </div>
                    <ul>
                        <li>{{ entry.description}}</li>
                        <li>{{ entry.task }} </li>
                    </ul>
                </at-card>
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
            client: null,
            entries: null
        }
    },
    mounted () {
        this.fetchClient(),
        this.fetchEntries()
    },
    methods: {
        fetchClient() {
            this.$http.get('https://abtracking.herokuapp.com/clients/' + this.$route.params.id )
            .then(response => {
                return response.json()
            })
            .then(data => {
                        // console.log(Object.keys(data))
                        this.client = data["data"]
                        console.log(this.client)
                    })
        },
        fetchEntries() {
            this.$http.get('https://abtracking.herokuapp.com/clients/232/entries')
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then(data => {
                        // console.log(Object.keys(data))
                        console.log(data)
                        this.entries = data
                    })
        }
    }
};
</script>

<style>
.coin-ticker-row {
    padding-top: 20px;
}


</style>
