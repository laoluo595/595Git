<template>
    <div class="productListContainer">
        <div class="productItem" v-for="item in getThumImgUrlArr" :key="item.id" @click="locationProductInfo(item.id)">
            <img :src="'{{item.img_url}}'">
            <h3>{{item.title}}</h3>
            <div class="info">
                <p class="price">
                    <span class="hot">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <mt-button size="large" type="primary" class="getMore" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      pageindex: 1,
      getThumImgUrlArr: []
    }
  },
  methods: {
    getThumImgUrl() {
      this.$ajax
        .get('/api/getgoods?pageindex=' + this.pageindex)
        .then(result => {
          if (result.data.status === 0) {
            if (result.data.message.length === 0) {
              Toast('没有更多了')
              return
            }
            this.getThumImgUrlArr = this.getThumImgUrlArr.concat(
              result.data.message
            )
          }
        })
    },
    getMore() {
      this.pageindex++
      this.getThumImgUrl()
    },
    locationProductInfo(id) {
        console.log(id);
      this.$router.push({name:'productInfo',params:{id:id} })
    }
  },
  created() {
    this.getThumImgUrl()
  }
}
</script>

<style lang="scss" scoped>
.productListContainer {
  padding: 8px;
  display: flex;
  flex-wrap: wrap; //单行或者多行
  justify-content: space-between;
  .productItem {
    box-shadow: 0 0 8px #999;
    border: 1px solid #f0f0f0;
    margin: 5px 0;
    width: 49%;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 220px;
    img {
      width: 100%;
    }
    .info {
      background-color: #f0f0f0;
      p {
        margin: 0;
        color: #999;
      }
      .price {
        .hot {
          color: red;
          font-size: 16px;
          font-weight: 700;
        }
        .old {
          margin-left: 5px;
          font-size: 12px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  h3 {
    font-size: 14px;
  }
  .getMore {
    margin-top: 10px;
  }
}
</style>
