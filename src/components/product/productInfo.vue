<template>
  <div class="productInfoContainer">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag"></div>
    </transition>
    <!-- 轮播图start -->
    <div class="mui-card">
      <div class="mui-card-content-inner">
        <swipe :lbtlist="LbtList" :fullflag="false"></swipe>
      </div>
    </div>
    <!-- 轮播图end -->
    <!-- 购物模块start -->
    <div class="mui-card">
      <div class="mui-card-header">{{ProductInfodata.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>市场价：
            <s>￥{{ProductInfodata.market_price}}</s>&nbsp;&nbsp;销售价：
            <span>￥{{ProductInfodata.sell_price}}</span>
          </p>
          <div class="buy">
            <span>购买数量</span>
            <numbox @getInputCount="getInputCount" :max="ProductInfodata.stock_quantity"></numbox>
          </div>
          <mt-button size="small" type="primary">立即购买</mt-button>
          <mt-button size="small" type="danger" @click="jionShopCar">加入购物车</mt-button>
        </div>
      </div>
    </div>
    <!-- 购物模块end -->
    <!-- 商品参数  start-->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ProductInfodata.goods_no}}</p>
          <p>库存情况：{{ProductInfodata.stock_quantity}}件</p>
          <p>上架时间：{{ProductInfodata.add_time | dataFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plane @click="goContent">图文介绍</mt-button>
        <mt-button type="danger" size="large" plane @click="goComment">商品评论</mt-button>
      </div>
    </div>
    <!-- 商品参数  end-->
  </div>

</template>

<script>
import swipe from '../subComponents/Swipe.vue'
import numbox from '../subComponents/ProductNumbox.vue'
export default {
  data() {
    return {
      LbtList: [],
      ProductInfodata: {},
      ballFlag: false,
      count:1
    }
  },
  created() {
    this.getLbtData()
    this.getProductInfodata()
  },
  methods: {
    getLbtData() {
      this.$ajax
        .get('/api/getthumimages/' + this.$route.params.id)
        .then(result => {
          if (result.data.status === 0) {
            result.data.message.forEach(item => {
              item.img = item.src
            })
            this.LbtList = result.data.message
          }
        })
    },
    getProductInfodata() {
      this.$ajax
        .get('api/goods/getinfo/' + this.$route.params.id)
        .then(result => {
          if (result.data.status === 0) {
            this.ProductInfodata = result.data.message
          }
        })
    },
    goContent() {
      this.$router.push({
        name: 'productContent',
        params: {
          id: this.$route.params.id
        }
      })
    },
    goComment() {
      this.$router.push({
        name: 'productComment',
        params: {
          id: this.$route.params.id
        }
      })
    },
    jionShopCar() {
      this.ballFlag = !this.ballFlag
    },
    beforeEnter(el) {
      el.style.transform = 'translate(0, 0)'
    },
    enter(el, done) {
      el.offsetWidth;
      const oldPosition = el.getBoundingClientRect()
      const newPosition = document.getElementById('badge').getBoundingClientRect()
      const lateX = newPosition.left-oldPosition.left
      const lateY = newPosition.top-oldPosition.top
      el.style.transition = 'all 0.6s cubic-bezier(0,1.51,0,-1.38)'
      el.style.transform = `translate(${lateX}px, ${lateY}px)`
      done()
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag
    },
    getInputCount(count){
      this.count = count
      console.log(this.count);
    }
  },
  components: {
    swipe,
    numbox
  }
}
</script>

<style lang="scss" scoped>
.productInfoContainer {
  .mui-card-footer {
    button {
      margin: 15px 0;
    }
  }
  .mui-card {
    .buy {
      margin-bottom: 10px;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    background-color: red;
    position: absolute;
    left: 140px;
    top: 390px;
    z-index: 9999;
    border-radius: 50%;
  }
}
.mui-card-footer,
.mui-card-header {
  display: block;
}
</style>
