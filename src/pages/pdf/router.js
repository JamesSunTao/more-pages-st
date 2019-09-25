import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/containner/Home'
import About from '@/containner/About'

Vue.use(Router);

export default new Router({
    routes:[
        {
            path:'/',
            name:'home',
            component:Home
        },
        {
            path:'/about',
            name:'about',
            component:About
        },
        {
            path:'*',
            component:Home   
        }

    ]
})