<template>
    <div>
        <navbar></navbar>
        <div class="row">
            <div class="col" v-for="(value, symbol) in ticker">
                <at-card style="width: 300px;">
                  <h4 slot="title">{{ symbol }}</h4>
                  <div slot="extra"><a>Learn more</a></div>
                  <div>
                    {{ value['USD'] }}
                </div>
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
            ticker: null
        }
    },
    mounted () {
        this.fetchTicker()
    },
    methods: {
        fetchTicker() {
            this.$http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,ZRX,EOS,ADA&tsyms=USD')
            .then(response => {
                return response.json()
            })
            .then(data => {
                        // console.log(Object.keys(data))
                        this.ticker = data
                        console.log(this.ticker)
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
