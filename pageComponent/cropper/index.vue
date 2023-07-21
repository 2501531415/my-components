<template>
  <view class="test">
    <my-cropper-avatar src="http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg" @cancel="cancel" @confirm="confirm"/>
  </view>
</template>

<script>
  export default {
    methods:{
      cancel(){
        uni.navigateBack({
          delta:1
        })
      },
      confirm(url){
        uni.previewImage({
          current:url,
          urls:[url]
        })
      }
    }
  }
</script>

<style>
</style>
 