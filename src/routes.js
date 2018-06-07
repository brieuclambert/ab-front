import Home from './components/home.vue'
import Signup from './components/signup.vue'
import Dashboard from './components/dashboard.vue'
import Client from './components/client.vue'
import Clients from './components/clients.vue'


export const routes = [
    {path: '/', component: Home},
    {path: '/clients', component: Clients},
    {path: '/signup', component: Signup},
    {path: '/dashboard', component: Dashboard},
    {path: '/client/:id', component: Client}
]
