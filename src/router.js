import vueRouter from 'vue-router'

import homeContainer from './components/tabbar/HomeContainer.vue'
import memberContainer from './components/tabbar/MemberContainer.vue'
import shopcarContainer from './components/tabbar/ShopcarContainer.vue'
import searchContainer from './components/tabbar/SearchContainer.vue'
import newsList from './components/news/NewsList.vue'
import newsInfo from './components/news/NewsInfo.vue'
//路由
const router = new vueRouter({
    routes: [{
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: homeContainer
        },
        {
            path: '/member',
            component: memberContainer
        },
        {
            path: '/shopcar',
            component: shopcarContainer
        },
        {
            path: '/search',
            component: searchContainer
        },
        {
            path: '/home/newsList',
            component: newsList
        },
        {
            path: '/home/newsInfo/:id',
            component: newsInfo
        },
    ],
    linkActiveClass: 'mui-active'
})
export default router