import Home from './components/home.vue'
import Signup from './components/signup.vue'
import Dashboard from './components/dashboard.vue'
import Client from './components/client.vue'


export const routes = [
    {path: '/', component: Home},
    {path: '/signup', component: Signup},
    {path: '/dashboard', component: Dashboard},
    {path: '/client/:id', component: Client}
]
