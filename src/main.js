//项目js入口文件
import Vue from 'vue'
//引入router模块
import vueRouter from 'vue-router'
Vue.use(vueRouter)
//导入vuex并安装
import Vuex from 'vuex'
Vue.use(Vuex)
//先获取一遍localstorege，如果有就让他当shopCar的数组，如果不存在就让他当一个空数组
var shopCar = JSON.parse(localStorage.getItem('shopCar') || '[]')
const store = new Vuex.Store({
  state: {
    shopCar: shopCar
  },
  mutations: {
    addShopCar(state, obj) {
      //找shopCar里有没有相同id的数据，如果有的话，让他们的count相加
      var flag = true
      state.shopCar.some(item => {
        if (item.id == obj.id) {
          item.count += parseInt(obj.count)
          flag = false
          return true //退出循环
        }
      })
      if (flag) {
        state.shopCar.push(obj)
      }
      //存储到localstorege里去
      localStorage.setItem('shopCar', JSON.stringify(state.shopCar))
    },
    updataShopCar(state, obj) {
      //在购物车页面点击加减的时候改变数量
      state.shopCar.some(item => {
        if (item.id == obj.id) {
          item.count = parseInt(obj.count)
          return true
        }
      })
      //存储到localstorege里去
      localStorage.setItem('shopCar', JSON.stringify(state.shopCar))
    },
    removeShopCar(state, id) {
      state.shopCar.forEach((item, index) => {
        if (item.id == id) {
          state.shopCar.splice(index, 1)
        }
      })
      //存储到localstorege里去
      localStorage.setItem('shopCar', JSON.stringify(state.shopCar))
    },
    changeIsselect(state, o) {
      state.shopCar.some(item => {
        if (item.id == o.id) {
          item.isSelect = o.isSelect
          return true
        }
      })
      //存储到localstorege里去
      localStorage.setItem('shopCar', JSON.stringify(state.shopCar))
    }
  },
  getters: {
    clacCount(state) {
      var count = 0
      state.shopCar.forEach(item => {
        count += item.count
      })
      return count
    },
    calcValue(state) {
      var obj = {}
      state.shopCar.forEach(item => {
        obj[item.id] = item.count
      })
      return obj
    },
    isSelectObj(state) {
      var o = {}
      state.shopCar.forEach(item => {
        o[item.id] = item.isSelect
      })
      return o
    },
    calcPrice(state) {
      var o = {
        counts: 0,
        Allprice: 0
      }
      state.shopCar.forEach(item => {
        if (item.isSelect) {
          o.counts += item.count
          o.Allprice += item.count * item.price
        }
      })
      return o
    }
  }
})

//引入axios，将axios挂载到vue的原型上
import axios from 'axios'
Vue.prototype.$ajax = axios
axios.defaults.baseURL = 'http://laoluo.online:5000/' // 默认地址
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded' //设置表单post提交默认以application/x-www-form-urlencoded方式提交
//导入时间模块moment
import moment from 'moment'
//定义全局时间过滤器
Vue.filter('dataFormat', (data, pattern = 'YYYY-MM-DD HH:mm:ss') => {
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
  router,
  store
})