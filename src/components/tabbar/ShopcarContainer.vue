<template>
    <div class="shopCarContainer">
        <div class="shopCarList">
            <div class="mui-card" v-for="(item, index) in shopCarList" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.isSelectObj[item.id]" @change="selectChange(item.id,$store.getters.isSelectObj[item.id])"></mt-switch>
                        <img :src="item.img_url">
                        <div class="info">
                            <h3 class="title">
                                {{item.title}}
                            </h3>
                            <div class="body">
                                <span>￥{{item.sell_price}}</span>
                                <shopbutton :initvalue="$store.getters.calcValue[item.id]" :id="item.id"></shopbutton>
                                <a href="#" class="del" @click.prevent="remove(item.id,index)">删除</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner drawPriceInfo">
                    <div class="getPrice">
                        <p>总计(不含运费)</p>
                        <p>已勾选商品
                            <span>{{$store.getters.calcPrice.counts}}</span>件，总价：
                            <span>￥{{$store.getters.calcPrice.Allprice}}</span>
                        </p>
                    </div>
                    <mt-button size="small" type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import shopbutton from '../subComponents/ShopNumbox.vue'
export default {
  data() {
    return {
      shopCarList: []
    }
  },
  created() {
    this.getshopcarlist()
  },
  methods: {
    getshopcarlist() {
      var ids = []
      this.$store.state.shopCar.forEach(item => {
        ids.push(item.id)
      })
      this.$ajax
        .get('api/goods/getshopcarlist/' + ids.join(','))
        .then(result => {
          if (result.data.status === 0) {
            this.shopCarList = result.data.message
          }
        })
    },
    remove(id, index) {
      this.shopCarList.splice(index, 1)
      this.$store.commit('removeShopCar', id)
    },
    selectChange(id,isselect){
      console.log(id+'----------'+isselect);
      this.$store.commit('changeIsselect',{
        id:id,isSelect:isselect
      })
    }
  },
  components: {
    shopbutton
  }
}
</script>

<style lang="scss" scoped>
.shopCarContainer {
  .shopCarList {
    background-color: #eee;
    overflow: hidden;
  }
  .mui-card-content-inner {
    display: flex;
    justify-content: space-between;
    img {
      width: 60px;
      display: block;
      height: 100%;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 13px;
      }
      .body {
        span {
          font-weight: 700;
          color: red;
        }
      }
    }
  }
  .drawPriceInfo {
    display: flex;
    align-items: center;
    span{
        color:red;
        font-weight:700;
        font-size: 18px;
    }
  }
}
</style>

