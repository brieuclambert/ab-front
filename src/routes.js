import Home from './components/home.vue'
import Signup from './components/signup.vue'
import Dashboard from './components/dashboard.vue'


export const routes = [
    {path: '/', component: Home},
    {path: '/signup', component: Signup},
    {path: '/clients', component: Dashboard}
]
