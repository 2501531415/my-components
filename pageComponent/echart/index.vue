<template>
  <view class="index">
    <my-grid :column="5" @change="gridChange">
      <my-grid-item :index="0">
        <view class="title">
            <text>中国地图</text>
        </view>
      </my-grid-item>
      <my-grid-item :index="1">
        <view class="title">
            <text>柱状图</text>
        </view>
      </my-grid-item>
      <my-grid-item :index="2">
        <view class="title">
            <text>折线图</text>
        </view>
      </my-grid-item>
      <my-grid-item :index="3">
        <view class="title">
            <text>饼图</text>
        </view>
      </my-grid-item>
      <my-grid-item :index="4">
        <view class="title">
            <text>雷达图</text>
        </view>
      </my-grid-item>
    </my-grid>
  </view>
</template>

<script>
  export default {
    methods:{
      gridChange(e){
        console.log(e)
        if(e.detail.index == 0){
          uni.navigateTo({
            url:'/pageComponent/echart/exmaple/map'
          })
        }else if(e.detail.index == 1){
          uni.navigateTo({
            url:'/pageComponent/echart/exmaple/bar'
          })
        }else if(e.detail.index == 2){
          uni.navigateTo({
            url:'/pageComponent/echart/exmaple/line'
          })
        }else if(e.detail.index == 3){
          uni.navigateTo({
            url:'/pageComponent/echart/exmaple/pie'
          })
        }
        else if(e.detail.index == 4){
          uni.navigateTo({
            url:'/pageComponent/echart/exmaple/radar'
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .title{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
  }
</style>
