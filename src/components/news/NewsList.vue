<template>
    <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id">
            <router-link :to="'/home/newsInfo/'+item.id" tag="a">
                <img class="mui-media-object mui-pull-left" :src="item.img_url">
                <div class="mui-media-body">
                    <h1>{{item.title}}</h1>
                    <div class="flexBox">
                        <p class='mui-ellipsis'>发布时间: {{item.add_time | dataFormat}}</p>
                        <span class="clickNumb">点击:{{item.click}}次</span>
                    </div>
                </div>
            </router-link>
        </li>

    </ul>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data: () => ({
    list: []
  }),
  methods: {
    getNewsListData() {
      this.$ajax.get('api/getnewslist').then(result => {
        if (result.status == '200' && result.data.status == '0') {
          this.list = result.data.message
        } else {
          Toast('获取新闻列表数据失败')
        }
      })
    }
  },
  created() {
    this.getNewsListData()
  }
}
</script>

<style lang="scss" scoped>
.mui-table-view .mui-media,
.mui-table-view .mui-media-body {
  h1 {
    font-size: 14px;
    color: #333;
  }
  .flexBox {
    display: flex;
    justify-content: space-between;
    p {
      color: #26a2ff;
    }
    span {
      font-size: 14px;
      color: #26a2ff;
    }
  }
}
</style>
