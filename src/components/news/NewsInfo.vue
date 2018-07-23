<template>
    <div class="newsInfoContainer">
        <div class="title">
            <h1>{{newsInfo.title}}</h1>
            <div class="timeClick">
                <p>发表时间:{{newsInfo.add_time}}</p>
                <span>点击:{{newsInfo.click}}次</span>
            </div>
        </div>
        <hr>
        <div class="newsContent">
            {{newsInfo.content}}
        </div>
        <comment :id="id"></comment>
    </div>
</template>

<script>
import comment from '../subComponents/comment.vue'
export default {
  data(){
      return{
          id:this.$route.params.id,
          newsInfo:{}
      }
  },
  created() {
    this.getNewsInfoData()
  },
  methods: {
    getNewsInfoData() {
      this.$ajax.get('api/getnew/' + this.id).then(result => {
          if(result.status == '200' && result.data.status == '0'){
              this.newsInfo = result.data.message
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
.newsInfoContainer {
  padding: 0 4px;
  .title {
    overflow: hidden;
    h1 {
      font-size: 16px;
      text-align: center;
      margin: 12px 0;
    }
    .timeClick {
      display: flex;
      justify-content: space-between;
      p,
      span {
        color: #26a2ff;
        font-size: 14px;
        margin: 0;
      }
    }
  }
  .newsContent{
      font-size: 14px;
      line-height: 26px;
      text-align: justify;
      img{
          width:100%;
      }
  }
}
</style>
