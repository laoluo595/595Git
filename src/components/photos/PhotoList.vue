<template>
  <div>
    <!-- 顶部滑动导航 start-->
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item',item.id == 0 ? 'mui-active' : '']" v-for="item in lazyList" :key="item.id" @tap="getPhotosThumb(item.id)">
            {{item.title}}
          </a>
        </div>
      </div>
    </div>
    <!-- 顶部滑动导航 end-->
    <!-- 图片懒加载区域 start -->
    <ul class="lazyThumb">
      <router-link v-for="item in lazyThumb" :key="item.id" :to="'/home/photoInfo/'+item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="detail">
          <div class="title">
            {{item.title}}
          </div>
          <div class="body">
            {{item.zhaiyao}}
          </div>
        </div>
      </router-link>
    </ul>
    <!-- 图片懒加载区域 end -->
  </div>
</template>

<script>
//导入mui的js
import mui from '../../lib/mui/js/mui.min.js'
export default {
  data() {
    return {
      lazyList: [],
      lazyThumb: []
    }
  },
  methods: {
    getPhotosList() {
      this.$ajax.get('api/getimgcategory').then(result => {
        if (result.data.status === 0) {
          result.data.message.unshift({
            id: 0,
            title: '全部'
          })
          this.lazyList = result.data.message
        }
      })
    },
    getPhotosThumb(itemid) {
      var imgid = itemid 
      this.$ajax.get('api/getimages/' + imgid).then(result => {
        if (result.data.status === 0) {
          this.lazyThumb = result.data.message
        }
      })
    }
  },
  created() {
    this.getPhotosList()
    this.getPhotosThumb(0)
  },
  mounted() {
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    })
  }
}
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
img[lazy='loading'] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.lazyThumb {
  padding: 10px;
  margin: 0;
  background-color: #f0f0f0;
  li {
    list-style: none;
    -moz-box-shadow: 0px 0px 10px #999;
    -webkit-box-shadow: 0px 0px 10px #999;
    box-shadow: 0px 0px 10px #999;
    margin-bottom: 10px;
    text-align: center;
    background-color: #333;
    position: relative;
    img {
      width: 100%;
      height: 300px;
      display: block;
    }
    img[lazy='loading'] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .detail{
      position: absolute;
      min-height: 84px;
      width:100%;
      bottom:0;
      background-color:rgba(0,0,0,0.4);
      color:#fff;
      padding:4px;
      text-align: justify;
      .title{
        font-size: 16px;
      }
      .body{
        font-size: 14px;
      }
    }
  }
  li:last-child {
    margin: 0;
  }
}
</style>
