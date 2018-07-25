<template>
  <div class="commentContainer">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要评论的内容（最多120字）" v-model="content"></textarea>
    <mt-button type="primary" size="large" @click="postAddCmt">发表评论</mt-button>
    <div class="cmt-list" v-for="(item, i) in commentsData" :key="i">
      <div class="cmt-title">
        第{{i+1}}楼 用户：{{item.user_name}} 发表时间：{{item.add_time}}
      </div>
      <div class="cmt-body">
        {{item.content}}
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMoreComments" ref="mybtn">加载更多</mt-button>
  </div>
</template>

<script>
import moment from 'moment'
import { Toast } from 'mint-ui'
import qs from 'qs'
export default {
  data() {
    return {
      pageindex: 1,
      commentsData: [],
      content: ''
    }
  },
  props: ['id'],
  created() {
    this.getCommentList()
  },
  methods: {
    getCommentList() {
      //http://laoluo.online:5000/api/getcomments/1?pageindex=1
      this.$ajax
        .get('api/getcomments/' + this.id + '?pageindex=' + this.pageindex)
        .then(result => {
          if (result.data.status === 0) {
            if (result.data.message == 0) {
              Toast('没有更多评论了')
              this.$refs.mybtn.$el.disabled = true
              return
            } else {
              this.$refs.mybtn.$el.disabled = false
            }
            this.commentsData = this.commentsData.concat(result.data.message)
          }
        })
    },
    getMoreComments() {
      this.pageindex++
      this.getCommentList()
    },
    postAddCmt() {
      if(this.content.trim().length === 0){
        Toast('请填写评论内容')
        return;
      }
      this.$ajax
        .post(
          'api/postcomment/' + this.id,
          qs.stringify({
            content: this.content.trim()
          })
        )
        .then(result => {
          if(result.data.status === 0){
            this.commentsData.unshift({
              user_name:'匿名用户',
              add_time:moment().format('YYYY-MM-DD HH:mm:ss'),
              content:this.content
            })
            this.content = ''
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.commentContainer {
  padding-bottom: 10px;
  h3 {
    font-size: 18px;
  }
  textarea {
    height: 86px;
    font-size: 14px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    font-size: 13px;
    .cmt-title {
      background-color: #f0f0f0;
      line-height: 30px;
    }
    .cmt-body {
      text-indent: 2em;
      line-height: 40px;
    }
  }
}
</style>
