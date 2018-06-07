<template>
    <div>
        <navbar></navbar>
        <div class="row flex-center">
            <div class="col-md-16">
                <at-table :columns="columns2" :data="clients"></at-table>
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
                disabled: false,
                dashboard: null,
                clients: [],
                token: document.cookie.split('jwt=')[1],
                columns2: [
                    {
                        title: 'Name',
                        key: 'name',
                        sortType: 'normal'
                    },
                    {
                        title: 'Owner',
                        key: 'sales_owner',
                        sortType: 'normal'
                    },
                    {
                        title: 'Address',
                        key: 'status',
                        sortType: 'normal'
                    }
                ]
            }
        },
mounted () {
    this.fetchEntries()
},
methods: {
    fetchEntries() {
        console.log("start")
        this.$Loading.start()
        this.$http.get('https://abtracking.herokuapp.com/clients', { headers: { Authorization:this.token}})
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data.clients)
            this.clients = data.clients
            this.$Loading.finish()
        })
    },
    sendEntry() {
        console.log(this.token)
        this.parameters.duration = parseFloat(this.parameters.minutes / 60) + parseFloat(this.parameters.hours)
        this.$http.post('https://abtracking.herokuapp.com/clients/' + this.$route.params.id + '/entries',
            this.parameters,
            { headers: { Authorization:this.token}})
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(data => {
            console.log(data)
            this.$Notify.success({ title: "It's in the box!", message: "Spent " + this.parameters.duration + " hours on '" + this.parameters.task + "' for " })
            this.parameters = {
                description: null,
                task: null,
                hours: null,
                minutes: null,
                duration: 0
            }
            this.fetchEntries()
        })
    }
}
};
</script>

<style scoped>
.form-new-entry-container {
    margin: auto;
    padding-top: 40px;
}
.form-item {
    width: 300px;
    margin: 10px auto;
}
.form-item h1 {
    text-align: center;
}
.form-label {
    margin: 3px 5px;
    text-align: center;
}
.dashboard {
    height: 80px;
    border-bottom: solid 1px #E3ECF4;
    padding: auto;
}
</style>
