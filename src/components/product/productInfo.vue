<template>
    <div>
        <!-- 轮播图start -->
        <div class="mui-card">
            <div class="mui-card-content-inner">
                <swipe :lbtlist="LbtList" :fullflag="false"></swipe>
            </div>
        </div>
        <!-- 轮播图end -->
        <!-- 购物模块start -->
        <div class="mui-card">
            <div class="mui-card-header">页眉</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                </div>
            </div>
        </div>
        <!-- 购物模块end -->
        <!-- 商品参数  start-->
        <div class="mui-card">
            <div class="mui-card-header">页眉</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                </div>
            </div>
            <div class="mui-card-footer">页脚</div>
        </div>
        <!-- 商品参数  end-->
    </div>

</template>

<script>
import swipe from '../subComponents/Swipe.vue'

export default {
  data() {
    return {
      LbtList: []
    }
  },
  created() {
    this.getLbtData()
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
    }
  },
  components: {
    swipe
  }
}
</script>

<style lang="scss" scoped>
</style>
