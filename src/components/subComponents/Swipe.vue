<template>
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in lbtlist" :key="item.img">
            <img :src="item.img" :class="{'full':fullflag}">
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted(){
  console.log(this.fullflag);
  },
  props: ['lbtlist','fullflag']
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  text-align: center;
  img {
    height: 100%;
  }
  .full{
    width: 100%;
  }
}
</style>
