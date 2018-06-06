<template>
    <div>
        <navbar></navbar>
        <div class="row login-row">
            <div class="col-xs-24 col-sm-24 col-md-24 col-lg-24">
                <div class="form-login-container">
                    <div class="form-item">
                        <h1>Login</h1>
                    </div>
                    <div class="form-item">
                        <p class="form-label">Email</p>
                        <at-input name="input" v-model="params.email" v-on:change="checkEmailValidity"  placeholder="sarah@abtasty.com" :status="emailSuccess"></at-input>
                    </div>

                    <div class="form-item">
                        <p class="form-label">Password</p>
                        <at-input type="password" v-model="params.password" placeholder="azerty"></at-input>
                    </div>

                    <div class="form-item">
                        <at-button type="primary" ref="button-loading" v-on:click="signin">Login</at-button>
                        <router-link class="" to="/signup">
                            <at-button type="text">Don't have an account yet?</at-button>
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
            params: {
                email: null,
                password: null
            }
        }
    },
    methods: {
        signin () {
            this.$http.post('https://abtracking.herokuapp.com/auth/login', this.params)
                .then(response => {
                    this.loading = !this.loading
                    console.log(response)
                    return response.json()
                })
                .then(data => {
                    console.log(data)
                    document.cookie = "jwt=" + data['auth_token']
                })
        }
    }
};
</script>

<style>
.login-row {
    height: calc(100vh - 48px);
}
.form-login-container {
    margin: auto;
    padding-top: 40px;
}
.form-item{
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
.left-login {
    background-color: #6594E2;
    width: 100%;
    height: 100%;
}
</style>
