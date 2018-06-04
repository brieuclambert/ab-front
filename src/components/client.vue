<template>
    <div>
        <navbar></navbar>
        <div class="flex-between">
            <div class="row at-row no-gutter flex-center">
                <div class="col-md-4"><div class="at-box-row bg-c-brand-dark">Name : {{ client.name}} </div></div>
                <div class="col-md-4"><div class="at-box-row bg-c-brand-light">Owner : {{ client.sales_owner}}</div></div>
                <div class="col-md-4"><div class="at-box-row bg-c-brand-dark">Status : {{ client.status}}</div></div>
                <div class="col-md-4"><div class="at-box-row bg-c-brand-light">MRR : {{ client.mrr}}</div></div>
                <div class="col-md-4"><div class="at-box-row bg-c-brand-light">CSM : {{ client.csm_owner}}</div></div>
            </div>

        </div>
        <div class="row at-row no-gutter">
                <div class="col-md-6" v-for="entry in entries">
                    <at-card style="width: 200px; margin: 20px auto;" :bordered="false">
                        <h4 slot="title">{{ entry.created_at.split('T')[0] }}</h4>
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

        <div class="col-md-8">
            <div class="form-new-entry-container">
                <div class="form-item">
                    <h1>New Entry</h1>
                </div>
                <div class="form-item">
                    <p class="form-label">Hours</p>
                    <at-input name="input" v-model="parameters.hours" placeholder="1"></at-input>
                </div>

                <div class="form-item">
                    <p class="form-label">Minutes</p>
                    <at-input type="input" v-model="parameters.minutes" placeholder="30"></at-input>
                </div>
                <div class="form-item">
                    <p class="form-label">Task</p>
                    <at-input name="input" v-model="parameters.task" placeholder="Email"></at-input>
                </div>
                <div class="form-item">
                    <p class="form-label">Description</p>
                    <at-input name="input" v-model="parameters.description" placeholder="did blablabla, spoke to someone etc..."></at-input>
                </div>

                <div class="form-item">
                    <at-button type="submit" ref="button-loading" v-on:click="sendEntry" >Save</at-button>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <p>{{ parameters.hours }}</p>
            <p>{{ parameters.minutes }}</p>
            <p>{{ parameters.task }}</p>
            <p>{{ parameters.description }}</p>
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
                entries: null,
                parameters: {
                    description: null,
                    task: null,
                    hours: null,
                    minutes: null,
                    test_number: '23728',
                // owner: this.client.csm_owner,
                client_id: this.$route.params.id
            }
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
            this.$http.get('https://abtracking.herokuapp.com/clients/'+ this.$route.params.id + '/entries')
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then(data => {
                        // console.log(Object.keys(data))
                        console.log(data)
                        this.entries = data
                    })
        },
        sendEntry() {
            this.$http.post('https://abtracking.herokuapp.com/clients/232/entries', this.parameters)
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then(data => {
                        // console.log(Object.keys(data))
                        console.log(data)
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

</style>
