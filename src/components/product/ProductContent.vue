<template>
    <div class="productContentContainer">
        <h3>{{contentObj.title}}</h3>
        <hr>
        <div class="content">
            {{contentObj.content}}
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      contentObj: {}
    }
  },
  created() {
    this.getContentData()
  },
  methods: {
    getContentData() {
      this.$ajax
        .get('api/goods/getdesc/' + this.$route.params.id)
        .then(result => {
          console.log(result)
          if (result.data.status === 0) {
            this.contentObj = result.data.message
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.productContentContainer {
    h3{
        color:#26a2ff;
        font-size: 18px;
        text-align: center;
        padding:0 5px;
    }
    .content{
        font-size: 14px;
        color:#999;
        padding:0 5px;
        text-align: justify;
    }
}
</style>
