<template>
  <div class="mui-numbox" data-numbox-min='1'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input class="mui-input-numbox" type="number" @change="changeFn" ref="changecount" />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
  data(){
    return{
    }
  },
  mounted() {
    mui('.mui-numbox').numbox()
  },
  methods:{
    changeFn(){
      this.$emit("getInputCount",this.$refs.changecount.value)
    }
  },
  props: ["max"],
  watch: {
    // 属性监听
    max: function(newVal, oldVal) {
      // 使用 JS API 设置 numbox 的最大值
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newVal);
      //   console.log(this.max);
      //   console.log(newVal);
      // this.max2 = newVal
      console.log(newVal);
      console.log(oldVal);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
