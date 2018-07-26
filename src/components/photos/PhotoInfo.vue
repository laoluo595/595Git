<template>
    <div class="photoInfoContainer">
        <h3>{{photoInfoObj.title}}</h3>
        <div class="flex-box">
            <div class="getTIme">
                发表时间：{{photoInfoObj.add_time}}
            </div>
            <div class="getClick">
                点击：{{photoInfoObj.click}}次
            </div>
        </div>
        <hr>
        <!-- 这是图片展示区域 start -->
        <div class="imgshowBox">
            <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.id">
        </div>
        <!-- 这是图片展示区域 end -->
        <!-- 这是content start -->
        <div class="content">
            {{photoInfoObj.content}}
        </div>
        <!-- 这是content end -->
        <!-- 这是发表评论 start -->
        <comment :id="id"></comment>
        <!-- 这是发表评论 end -->

    </div>
</template>

<script>
//导入评论模块
import comment from '../subComponents/comment.vue'
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoInfoObj:{},
      list:[]
    }
  },
  created() {
    this.getimageInfo()
    this.getimgUrl()
  },
  methods: {
    getimageInfo() {
      this.$ajax.get('api/getimageInfo/' + this.id).then(result => {
        if (result.data.status === 0) {
          this.photoInfoObj = result.data.message
        }
      })
    },
    getimgUrl(){
      this.$ajax.get('/api/getthumimages/'+this.id)
      .then(result=>{
        if(result.data.status === 0){
          result.data.message.forEach(item=>{
            item.w = 600
            item.h = 400
          })
          this.list = result.data.message
        }
      })
    }
  },
  components:{
      comment
  }
}
</script>

<style lang="scss" scoped>
.photoInfoContainer {
  padding: 0 4px;
  h3 {
    font-size: 18px;
    color: #26a2ff;
    text-align: center;
  }
  .flex-box {
    display: flex;
    justify-content: space-between;
    .getTIme {
      font-size: 14px;
      color: #999;
    }
    .getClick {
      font-size: 14px;
      color: #999;
    }
  }
  .content{
      font-size: 14px;
      text-align: justify
  }
}
</style>
