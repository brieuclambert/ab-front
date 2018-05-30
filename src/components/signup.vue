<template>
    <div class="signup">
        <navbar></navbar>
        <div class="row signup-row">
            <div class="col-xs-24 col-sm-24 col-md-24 col-lg-24">
                <div class="form-signup-container">
                    <div class="form-item">
                        <h1>Create an account</h1>
                    </div>
                    <div class="form-item">
                        <p class="form-label">Email</p>
                        <at-input name="input" v-model="emailInput" v-on:change="checkEmailValidity"  placeholder="sarah@abtasty.com" :status="emailSuccess"></at-input>
                    </div>
                    <div class="form-item">
                        <p class="form-label">First Name</p>
                        <at-input name="input"  placeholder="Sarah"></at-input>
                    </div>
                    <div class="form-item">
                        <p class="form-label">Last Name</p>
                        <at-input name="input"  placeholder="Miller"></at-input>
                    </div>
                    <div class="form-item">
                        <p class="form-label">Password</p>
                        <at-input type="password" v-model="password" placeholder="azerty"></at-input>
                    </div>
                    <div class="form-item">
                        <p class="form-label">Password Confirmation</p>
                        <at-input type="password" placeholder="azerty"></at-input>
                    </div>
                    <div class="form-item">
                        <at-button type="primary" ref="button-loading" v-on:click="addLoadingAttribute" :loading="loading">Sign-up</at-button>

                        <router-link class="" to="/">
                            <at-button type="text">Already have an account</at-button>
                        </router-link>
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
    data () {
        return {
            emailSuccess: null,
            emailInput: null,
            password: null,
            loading: false
        }
    },
    methods: {
        emailValidity () {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(this.emailInput).toLowerCase());
        },
        checkEmailValidity () {
            if (this.emailValidity()) {
                this.emailSuccess = 'success'
            } else {
                this.emailSuccess = 'error'
            }
        },
        addLoadingAttribute () {
            this.loading = !this.loading;
        }
    }
};
</script>

<style scoped>
.signup-row {
    height: calc(100vh - 48px);
}
.form-signup-container {
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
.left-signup {
    background-color: #6594E2;
    width: 100%;
    height: 100%;
}
</style>
