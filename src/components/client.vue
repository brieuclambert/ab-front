<template>
    <div>
        <navbar></navbar>
        <div class="row at-row no-gutter flex-center">
            <div class="col-md-4"><div class="at-box-row bg-c-brand-dark">Name : {{ client.name}} </div></div>
            <div class="col-md-4"><div class="at-box-row bg-c-brand-light">Owner : {{ client.sales_owner}}</div></div>
            <div class="col-md-4"><div class="at-box-row bg-c-brand-dark">Status : {{ client.status}}</div></div>
            <div class="col-md-4"><div class="at-box-row bg-c-brand-light">MRR : {{ client.mrr}}</div></div>
        </div>
        <div v-for="entry in entries">
            <div class="row at-row no-gutter flex-center">
                <div class="col-md-4"><div class="at-box-row bg-c-brand-dark">Name : {{ entry.task}} </div></div>
                <div class="col-md-4"><div class="at-box-row bg-c-brand-light">Description : {{ entry.description}}</div></div>
                <div class="col-md-4"><div class="at-box-row bg-c-brand-dark">Duration : {{ entry.hours}}h{{entry.minutes}}</div></div>
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
