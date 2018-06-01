import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import 'at-ui-style'
import AtUI from 'at-ui'
import AtComponents from 'at-ui'
import { routes } from './routes'



// import 'at-ui-style/src/index.scss'      // Or import the unbuilt version of SCSS
Vue.use(VueResource);
Vue.use(AtComponents)

Vue.use(AtUI)
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  ...App
})
