import vueRouter from 'vue-router'

import homeContainer from './components/tabbar/HomeContainer.vue'
import memberContainer from './components/tabbar/MemberContainer.vue'
import shopcarContainer from './components/tabbar/ShopcarContainer.vue'
import searchContainer from './components/tabbar/SearchContainer.vue'

//路由
const router = new vueRouter({
    routes: [
        {path:'/home',component:homeContainer},
        {path:'/member',component:memberContainer},
        {path:'/shopcar',component:shopcarContainer},
        {path:'/search',component:searchContainer},
    ],
    linkActiveClass:'mui-active'
})
export default router