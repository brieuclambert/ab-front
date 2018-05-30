<template>
    <div class="login">
        <navbar></navbar>
        <div class="row">
            <div class="col-md-12">
            </div>
            <div class="col-md-12">
                <div class="form-login-container">
                    <p class="form-label">Email</p>
                    <at-input name="input" v-model="emailInput" v-on:change="checkEmailValidity"  placeholder="Email" :status="emailSuccess"></at-input>
                    <p class="form-label">First Name</p>
                    <at-input name="input"  :placeholder="password"></at-input>
                    <p class="form-label">Last Name</p>
                    <at-input name="input"  placeholder="Last Name"></at-input>
                    <p class="form-label">Password</p>
                    <at-input type="password" v-model="password" placeholder=""></at-input>
                    <p class="form-label">Password Confirmation</p>
                    <at-input type="password" placeholder=""></at-input>
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
                password: null
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
            }
        }
    }
</script>

<style>
.form-login-container {
    margin: 20px 150px;
}
.form-label {
    margin: 3px 5px;
}
</style>
