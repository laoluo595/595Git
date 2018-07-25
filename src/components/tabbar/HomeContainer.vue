<template>
    <div>
        <!-- 轮播图 start -->
        <swipe :lbtlist="LbtList" :fullflag="true">
            
        </swipe>
        <!-- 轮播图 end -->
        <!-- 六宫格 start -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newsList">
                    <img src="../../images/menu1.png">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photosList">
                    <img src="../../images/menu2.png">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/productList">
                    <img src="../../images/menu3.png">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu4.png">
                    <div class="mui-media-body">留言反馈</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu5.png">
                    <div class="mui-media-body">视频专区</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu6.png">
                    <div class="mui-media-body">联系我们</div>
                </a>
            </li>
        </ul>
        <!-- 六宫格 end -->
    </div>
</template>

<script>
import swipe from '../subComponents/Swipe.vue'
import { Toast } from 'mint-ui'
export default {
  data: () => ({
    LbtList: []
  }),
  created() {
    this.getLbtFn()
  },
  methods: {
    getLbtFn() {
      this.$ajax.get('api/getlunbo').then(result => {
        if (result.status == '200' && result.data.status == '0') {
          this.LbtList = result.data.message
        } else {
          Toast('没有获取到轮播图数据')
        }
      })
    }
  },
  components:{
      swipe
  }
}
</script>

<style lang="scss" scoped>

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: 0;
  > li {
    border: 0;
    img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>

