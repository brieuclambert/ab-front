<template>
    <div>
        <navbar></navbar>
        <div class="flex-between">
            <div class="row at-row no-gutter flex-center flex-middle dashboard">
                <div class="col-md-4">
                    <div class="at-box-row bg-c-brand-dark">
                        <i class="icon icon-star"></i>
                        &nbsp{{ client.name}} </div>
                    </div>
                <div class="col-md-4">
                    <div class="at-box-row bg-c-brand-light">
                            {{ client.sales_owner}}
                        <br>{{ client.csm_owner}}
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="at-box-row bg-c-brand-dark">
                        <i class="icon icon-star"></i>
                        &nbsp {{ client.status}}
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="at-box-row bg-c-brand-light">
                        <i class="icon icon-star"></i>
                        &nbsp{{ client.mrr}}
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="at-box-row bg-c-brand-light">
                        <i class="icon icon-star"></i>
                        &nbsp{{ client.csm_owner}}
                    </div>
                </div>
            </div>
        </div>
        <div class="row at-row no-gutter">
            <div class="col-md-8">
                <div class="form-new-entry-container">
                    <div class="form-item">
                        <h1>New Entry</h1>
                    </div>
                    <div class="form-item flex-center" >
                        <p class="form-label">Hours</p>
                        <at-radio-group v-model="parameters.hours">
                            <at-radio-button label="0">0</at-radio-button>
                            <at-radio-button label="1">1</at-radio-button>
                            <at-radio-button label="2">2</at-radio-button>
                            <at-radio-button label="3">3</at-radio-button>
                            <at-radio-button label="4">4</at-radio-button>
                            <at-radio-button label="5">5</at-radio-button>
                            <at-radio-button label="6">6</at-radio-button>
                        </at-radio-group>
                    </div>
                    <div class="form-item flex-center" >
                        <p class="form-label">Minutes</p>
                        <at-radio-group v-model="parameters.minutes">
                            <at-radio-button label="0">0</at-radio-button>
                            <at-radio-button label="15">15</at-radio-button>
                            <at-radio-button label="30">30</at-radio-button>
                            <at-radio-button label="45">45</at-radio-button>
                        </at-radio-group>
                    </div>

                    <div class="form-item flex-center" >
                        <p class="form-label">Task</p>
                        <at-radio-group v-model="parameters.task">
                            <at-radio-button label="Email"><i class="icon icon-mail"></i></at-radio-button>
                            <at-radio-button label="Phone"><i class="icon icon-phone"></i></at-radio-button>
                            <at-radio-button label="Trip"><i class="icon icon-sun"></i></at-radio-button>
                            <at-radio-button label="Test"><i class="icon icon-settings"></i></at-radio-button>
                        </at-radio-group>
                    </div>

                    <div class="form-item">
                        <p class="form-label">Description</p>
                        <at-input name="input" v-model="parameters.description" placeholder="did blablabla, spoke to someone etc..."></at-input>
                    </div>

                    <div class="form-item">
                        <at-button type="primary" ref="button-loading" v-on:click="sendEntry" :disabled="checkEntryCompletion">Save</at-button>
                    </div>
                </div>
            </div>
            <div class="col-md-16" >
                <div class="row">
                    <div class="col-md-12" v-for="entry in entries">
                        <at-card style="width: 300px; margin: 20px ;" :bordered="false" >
                            <h4 slot="title">{{ entry.created_at.split('T')[0] }}</h4>
                            <div slot="extra">
                                {{ entry.duration}}
                            </div>
                            <ul>
                                <li>{{ entry.description}}</li>
                                <li>{{ entry.task }} </li>
                            </ul>
                        </at-card>
                    </div>
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
                disabled: false,
                dashboard: null,
                client: null,
                entries: null,
                parameters: {
                    description: null,
                    task: null,
                    hours: 0,
                    minutes: 0,
                    test_number: '23728',
                    duration: 0
                }
            }
        },
        mounted () {
            this.fetchEntries()
        },
        computed: {
            checkEntryCompletion: function() {
                if (this.parameters.description != "" &&
                    this.parameters.task != null &&
                    this.parameters.minutes != null &&
                    this.parameters.hours != null &&
                    this.parameters.description != null) {
                    return false
                } else {
                    return true
                }
            }
        },
        methods: {
            fetchEntries() {
                this.$http.get('https://abtracking.herokuapp.com/clients/'+ this.$route.params.id + '/entries', { header: {Authorization:document.cookie.split('=')[0]}})
                .then(response => {
                    console.log(response)
                    return response.json()
                })
                .then(data => {
                            // console.log(Object.keys(data))
                            console.log(data)
                            // this.entries = data['entries']
                            // this.client = data['client']
                            // this.dashboard = data['dashboard']
                        })
            },
            sendEntry() {
                this.parameters.duration = parseFloat(this.parameters.minutes / 60) + parseFloat(this.parameters.hours)
                this.$http.post('https://abtracking.herokuapp.com/clients/' + this.$route.params.id + '/entries', this.parameters)
                .then(response => {
                    console.log(response)
                    return response.json()
                })
                .then(data => {
                        // console.log(Object.keys(data))
                        console.log(data)
                        this.$Notify.success({ title: "It's in the box!", message: "Spent " + this.parameters.duration + " hours on '" + this.parameters.task + "' for " + this.client.name })
                        this.parameters = {
                            description: null,
                            task: null,
                            hours: null,
                            minutes: null,
                            test_number: '23728',
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
