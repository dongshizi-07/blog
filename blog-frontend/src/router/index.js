import { createRouter,createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Publish from '../views/Publish.vue'
import About from '../views/About.vue'
import PostDetail from '../views/PostDetail.vue'

const routes=[
    {
        path:'/',
        name:'Home',
        component:Home
    },
    {
        path: '/publish',
        name: 'Publish',
        component: Publish
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/post/:id', // 👈 这里的 :id 代表这是个动态参数
        name: 'PostDetail',
        component: PostDetail
    }
]

const router=createRouter({
    history:createWebHistory(),
    routes: routes
})

export default router