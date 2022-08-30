<template>
  <view class="index">
    <my-grid :column="5" @change="gridChange">
      <my-grid-item :index="0">
        <view class="title">
            <text>图表</text>
        </view>
      </my-grid-item>
      <my-grid-item>777</my-grid-item>
      <my-grid-item>777</my-grid-item>
      <my-grid-item>777</my-grid-item>
      <my-grid-item>777</my-grid-item>
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
            url:'/pages/echart/index'
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
