<template>
  <view class="index">
    <my-grid :column="5" @change="gridChange">
      <my-grid-item :index="index" v-for="(item,index) in gridList" :key="index">
        <view class="title">
            <text>{{item.title}}</text>
        </view>
      </my-grid-item>
    </my-grid>
  </view>
</template>

<script>
  export default {
    name:"Index",
    data(){
      return {
        gridList:[
          {title:'图表',link:"/pageComponent/echart/index"},
          {title:'头像裁剪',link:"/pageComponent/cropper/index"},
          {title:'轮播',link:"/pageComponent/swiper/index"},
        ]
      }
    },
    methods:{
      gridChange(e){
        const {index} = e.detail
        uni.navigateTo({
          url:this.gridList[index].link
        })
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
