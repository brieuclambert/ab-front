import Home from './components/home.vue'
import Signup from './components/signup.vue'
import Dashboard from './components/dashboard.vue'
import Client from './components/client.vue'
import Timer from './components/timer.vue'
import Report from './components/report.vue'


export const routes = [
    {path: '/', component: Home},
    {path: '/signup', component: Signup},
    {path: '/dashboard', component: Dashboard},
    {path: '/client/:id', component: Client},
    {path: '/timer', component: Timer},
    {path: '/report', component: Report}
]
