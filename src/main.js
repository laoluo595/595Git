//项目js入口文件
import Vue from 'vue'
//引入router模块
import vueRouter from 'vue-router'
Vue.use(vueRouter)


//引入axios，将axios挂载到vue的原型上
import axios from 'axios'
Vue.prototype.$ajax = axios
axios.defaults.baseURL = 'http://laoluo.online:5000/' // 默认地址
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' //设置表单post提交默认以application/x-www-form-urlencoded方式提交
//导入时间模块moment
import moment from 'moment'
//定义全局时间过滤器
Vue.filter('dataFormat', (data, pattern = "YYYY-MM-DD HH:mm:ss") => {
    return moment(data).format(pattern)
})

//导入mintUI的组件
import Mint from 'mint-ui'
Vue.use(Mint)
// import { Header,Swipe, SwipeItem,Button,Lazyload  } from 'mint-ui'
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// // Vue.component(Button.name, Button);
// Vue.use(Lazyload);


//引入veu-preview
import VuePreview from 'vue-preview'
//使用vue-preview
Vue.use(VuePreview)

//导入mui的css
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


//导入mintUI的css
import 'mint-ui/lib/style.min.css'
//引入app组件
import app from './App.vue'
//引入路由
import router from './router.js'

const vm = new Vue({
    el: '#app',
    data: {},
    methods: {},
    render: c => c(app),
    router
})