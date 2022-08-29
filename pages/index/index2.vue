<template>
  <view class="test">
    <my-side-bar :sideBarList="list" activeBorderColor="yellow"></my-side-bar>
  </view>
</template>

<script>
  export default{
    data(){
      return {
        list:[{'title':'电器','badge':10},{'title':'相机','badge':10},{'title':'家具','badge':10},{'title':'电器','badge':10}]
      }
    }
  }
</script>

<style>
</style>
