<template>
  <div class="mui-numbox" data-numbox-min='1'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input class="mui-input-numbox" type="number" :value="initvalue" @change="changeFn" ref="changecount" readonly/>
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
      this.$store.commit("updataShopCar",{
        id:this.id,
        count:this.$refs.changecount.value
      })
    }
  },
  props:[
      "initvalue","id"
  ]
}
</script>

<style lang="scss" scoped>
</style>
