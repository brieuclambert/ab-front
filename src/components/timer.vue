<template>
    <div>
        <navbar></navbar>
        <div class="row">
            <div class="col-md-6">
                <at-button type="primary" v-on:click="setStartTime">start</at-button>
                <at-button type="primary" v-on:click="computeDuration">end</at-button>
            </div>
            <div class="col-md-6">
                <p> start: {{ startTime }} </p>
                <p> end: {{ endTime }} </p>
                <p> duration : {{ durationRounded }} </p>
                <p> chronometer : {{ hours }}:{{ minutes }}:{{ seconds}} </p>
            </div>
            <div class="col-md-6">
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
            hours: 0,
            minutes: 0,
            seconds: 0,
            startTime: 0,
            endTime: 0,
            duration: 0,
            durationRounded: 0,
            parameters: {
                hours: 0,
                minutes: 0,
                project: "",
                task: "",
                duration: 0,
                description: ""
            }
        }
    },
    computed: {

    },
    methods: {
        setStartTime() {
            this.startTime = Date.now()
            this.endTime = 0
            chronometer()
        },
        chronometer() {

        },
        computeDuration() {
            this.endTime = Date.now()
            var duration = this.endTime - this.startTime
            var hours = duration / 3600000
            if (hours > 0) {
                console.log(hours)
                var reste = this.duration % 0.25
                if (reste = 0) {
                    this.durationRounded = this.duration
                } else {
                    this.durationRounded = this.duration - reste + 0.25
                }
                this.durationRounded = Math.floor(this.durationRounded * 100 ) / 100
            }

        }
    }
};
</script>

<style scoped>

</style>
