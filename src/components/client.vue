<template>
    <div>
        <navbar></navbar>
        <div class="flex-between">
            <div class="row">
                <div class="col-md-8" >

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
            this.$http.get('https://abtracking.herokuapp.com/clients', {params: {client: {sales_owner: 'Julia Simon', status: 'Ongoing'}}})
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
.coin-ticker-row {
    padding-top: 20px;
}


</style>
