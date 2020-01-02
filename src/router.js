import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Register from './views/Register'
import Index from './views/Index'
import Repertory from './views/Repertory'
import OrderPage from './views/OrderPage'
import Setting from './views/Setting'
import ProductPage from './views/ProductPage'
import Limit from './views/Limit'
import NotFound from './views/NotFound'
import Newbie from './views/Newbie'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {path:"/",component:Login,},
    {path:"/login",component:Login},
    {path:"/register",component:Register},
    {path:"/index",component:Index},
    {path:"/repertory",component:Repertory},
    {path:"/orderpage",component:OrderPage},
    {path:"/setting",component:Setting},
    {path:"/productpage",component:ProductPage},
    {path:"/limit",component:Limit},
    {path:"/newbie",component:Newbie},
    {path:"/*",component:NotFound}
  ]
})

export default router;
