import vueRouter from 'vue-router'

import homeContainer from './components/tabbar/HomeContainer.vue'
import memberContainer from './components/tabbar/MemberContainer.vue'
import shopcarContainer from './components/tabbar/ShopcarContainer.vue'
import searchContainer from './components/tabbar/SearchContainer.vue'
import newsList from './components/news/NewsList.vue'
import newsInfo from './components/news/NewsInfo.vue'
import photosList from './components/photos/PhotoList.vue'
import photoInfo from './components/photos/PhotoInfo.vue'
import productList from './components/product/ProductList.vue'
import productInfo from './components/product/productInfo.vue'
import productContent from './components/product/ProductContent.vue'
import productComment from './components/product/ProductComment.vue'
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
        {
            path: '/home/photosList',
            component: photosList
        },
        {
            path: '/home/photoInfo/:id',
            component: photoInfo
        },
        {
            path: '/home/productList',
            component: productList
        },
        {
            path: '/home/productInfo/:id',
            component: productInfo,
            name: 'productInfo'
        },
        {
            path: '/home/productContent/:id',
            component: productContent,
            name: 'productContent'
        },
        {
            path: '/home/productComment/:id',
            component: productComment,
            name: 'productComment'
        },
    ],
    linkActiveClass: 'mui-active'
})
export default router