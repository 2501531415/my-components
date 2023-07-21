<template>
  <!--修改头像-->
  <view class="container">
    <view class='cropper-content' v-if="isShowImg">
      <view class="my-cropper"
        :style="'width:'+cropperInitW+'px;height:'+cropperInitH+';background:#000'">
        <view class="my-cropper-content"
          :style="'width:'+cropperW+'px;height:'+cropperH+'px;left:'+cropperL+'px;top:'+cropperT+'px'">
          <image :src="src" :style="'width:'+cropperW+'px;height:'+cropperH+'px'" @load="load"></image>
          <view v-if="isShowCropper" class="my-cropper-crop-box" @touchstart.stop="contentStartMove" @touchmove.stop="contentMoveing"
            @touchend.stop="contentTouchEnd"
            :style="'left:'+cutL+'px;top:'+cutT+'px;right:'+cutR+'px;bottom:'+cutB+'px'">
            <view class="my-cropper-view-box">
              <view class="my-cropper-dashed-h"></view>
              <view class="my-cropper-dashed-v"></view>
              <view class="my-cropper-line-t" data-drag="top" @touchstart.stop="dragStart"
                @touchmove.stop="dragMove"></view>
              <view class="my-cropper-line-r" data-drag="right" @touchstart.stop="dragStart"
                @touchmove.stop="dragMove"></view>
              <view class="my-cropper-line-b" data-drag="bottom" @touchstart.stop="dragStart"
                @touchmove.stop="dragMove"></view>
              <view class="my-cropper-line-l" data-drag="left" @touchstart.stop="dragStart"
                @touchmove.stop="dragMove"></view>
              <view class="my-cropper-point point-t" data-drag="top" @touchstart.stop="dragStart"
                @touchmove.stop="dragMove"></view>
              <view class="my-cropper-point point-tr" data-drag="topTight"></view>
              <view class="my-cropper-point point-r" data-drag="right" @touchstart.stop="dragStart"
                @touchmove.stop="dragMove"></view>
              <view class="my-cropper-point point-rb" data-drag="rightBottom" @touchstart.stop="dragStart"
                @touchmove.stop="dragMove"></view>
              <view class="my-cropper-point point-b" data-drag="bottom" @touchstart.stop="dragStart"
                @touchmove.stop="dragMove" @touchend.stop="dragEnd"></view>
              <view class="my-cropper-point point-bl" data-drag="bottomLeft"></view>
              <view class="my-cropper-point point-l" data-drag="left" @touchstart.stop="dragStart"
                @touchmove.stop="dragMove"></view>
              <view class="my-cropper-point point-lt" data-drag="leftTop"></view>
            </view>
          </view>
        </view>
        <slot name="operate">
          <view class="my-cropper-operate">
            <view class="my-cropper-operate-item" @click="cancel">
              <text>取消</text>
            </view>
            <view :class="[{'my-cropper-operate-item__disabled':!canRevert},'my-cropper-operate-item']" @click="revert">
              <text>还原</text>
            </view>
            <view class="my-cropper-operate-item" @click="confirm">
              <text>确定</text>
            </view>
          </view>
        </slot>
      </view>
    </view>
    <canvas canvas-id="myCanvas" :style="'position:absolute;border: 1px solid red; width:'+imageW+'px;height:'+imageH+'px;top:-9999px;left:-9999px;'"></canvas>
  </view>
</template>

<script>
  let sysInfo = uni.getSystemInfoSync();
  let SCREEN_WIDTH = sysInfo.screenWidth
  let SCREEN_HEIGHT = sysInfo.screenHeight
  let PAGE_X, // 手按下的x位置
    PAGE_Y, // 手按下y的位置
    PR = sysInfo.pixelRatio, // dpi
    T_PAGE_X, // 手移动的时候x的位置
    T_PAGE_Y, // 手移动的时候Y的位置
    CUT_L, // 初始化拖拽元素的left值
    CUT_T, // 初始化拖拽元素的top值
    CUT_R, // 初始化拖拽元素的
    CUT_B, // 初始化拖拽元素的
    CUT_W, // 初始化拖拽元素的宽度
    CUT_H, //  初始化拖拽元素的高度
    IMG_RATIO, // 图片比例
    IMG_REAL_W, // 图片实际的宽度
    IMG_REAL_H, // 图片实际的高度
    DRAFG_MOVE_RATIO = 1, //移动时候的比例,
    INIT_DRAG_POSITION = 100, // 初始化屏幕宽度和裁剪区域的宽度之差，用于设置初始化裁剪的宽度
    DRAW_IMAGE_W = sysInfo.screenWidth // 设置生成的图片宽度

  export default {
    name:"MyCropperAvatar",
    props:{
      src:{
        required:true,
        type:String
      }
    },
    data() {
      return {
        isShowImg:false,
        isShowCropper:false,
        imgSrc:"",
        // 初始化的宽高
        cropperInitW: SCREEN_WIDTH,
        cropperInitH: '100vh',
        // 动态的宽高
        cropperW: SCREEN_WIDTH,
        cropperH: SCREEN_WIDTH,
        // 动态的left top值
        cropperL: 0,
        cropperT: 0,

        transL: 0,
        transT: 0,

        // 图片缩放值
        scaleP: 0,
        imageW: 0,
        imageH: 0,

        // 裁剪框 宽高
        cutL: 0,
        cutT: 0,
        cutB: SCREEN_WIDTH,
        cutR: '100%',
        qualityWidth: DRAW_IMAGE_W,
        innerAspectRadio: DRAFG_MOVE_RATIO,
        canRevert:false,//还原操作
      }
    },
    mounted() {
      this.getImageDetail()
    },
    methods: {
      setData(obj) {
      	let that = this;
      	Object.keys(obj).forEach(function (key) {
      		that.$set(that.$data, key, obj[key])
      
      	});
      },
      load(){
        this.isShowCropper = true
      },
      getImageDetail() {
        var _this = this
        uni.getImageInfo({
          src: this.src,
          success: function success(res) {
            _this.imgSrc = res.path
            IMG_RATIO = res.width / res.height
            if (IMG_RATIO >= 1) {
              IMG_REAL_W = SCREEN_WIDTH
              IMG_REAL_H = SCREEN_WIDTH / IMG_RATIO
            } else {
              IMG_REAL_W = SCREEN_WIDTH * IMG_RATIO
              IMG_REAL_H = SCREEN_WIDTH
            }
            let minRange = IMG_REAL_W > IMG_REAL_H ? IMG_REAL_W : IMG_REAL_H
            INIT_DRAG_POSITION = minRange > INIT_DRAG_POSITION ? INIT_DRAG_POSITION : minRange
            // 根据图片的宽高显示不同的效果   保证图片可以正常显示
            if (IMG_RATIO >= 1) {
              let cutT = Math.ceil((SCREEN_WIDTH / IMG_RATIO - (SCREEN_WIDTH / IMG_RATIO - INIT_DRAG_POSITION)) /
                2);
              let cutB = cutT;
              let cutL = Math.ceil((SCREEN_WIDTH - SCREEN_WIDTH + INIT_DRAG_POSITION) / 2);
              let cutR = cutL;
              _this.setData({
                cropperW: SCREEN_WIDTH,
                cropperH: SCREEN_WIDTH / IMG_RATIO,
                // 初始化left right
                cropperL: Math.ceil((SCREEN_WIDTH - SCREEN_WIDTH) / 2),
                cropperT: SCREEN_HEIGHT / 2,
                cutL: cutL,
                cutT: cutT,
                cutR: cutR,
                cutB: cutB,
                // 图片缩放值
                imageW: IMG_REAL_W,
                imageH: IMG_REAL_H,
                scaleP: IMG_REAL_W / SCREEN_WIDTH,
                qualityWidth: DRAW_IMAGE_W,
                innerAspectRadio: IMG_RATIO
              })
            } else {
              let cutL = Math.ceil((SCREEN_WIDTH * IMG_RATIO - (SCREEN_WIDTH * IMG_RATIO)) / 2);
              let cutR = cutL;
              let cutT = Math.ceil((SCREEN_WIDTH - INIT_DRAG_POSITION) / 2);
              let cutB = cutT;
              _this.setData({
                cropperW: SCREEN_WIDTH * IMG_RATIO,
                cropperH: SCREEN_WIDTH,
                // 初始化left right
                cropperL: Math.ceil((SCREEN_WIDTH - SCREEN_WIDTH * IMG_RATIO) / 2),
                cropperT: SCREEN_HEIGHT / 2,

                cutL: cutL,
                cutT: cutT,
                cutR: cutR,
                cutB: cutB,
                // 图片缩放值
                imageW: IMG_REAL_W,
                imageH: IMG_REAL_H,
                scaleP: IMG_REAL_W / SCREEN_WIDTH,
                qualityWidth: DRAW_IMAGE_W,
                innerAspectRadio: IMG_RATIO
              })
            }
            _this.isShowImg = true
          }
        })
      },

      // 拖动时候触发的touchStart事件
      contentStartMove(e) {
        PAGE_X = e.touches[0].pageX
        PAGE_Y = e.touches[0].pageY
        this.canRevert = true
      },

      // 拖动时候触发的touchMove事件
      contentMoveing(e) {
        var _this = this
        var dragLengthX = (PAGE_X - e.touches[0].pageX) * DRAFG_MOVE_RATIO
        var dragLengthY = (PAGE_Y - e.touches[0].pageY) * DRAFG_MOVE_RATIO
        // 左移
        if (dragLengthX > 0) {
          if (this.cutL - dragLengthX < 0) dragLengthX = this.cutL
        } else {
          if (this.cutR + dragLengthX < 0) dragLengthX = -this.cutR
        }

        if (dragLengthY > 0) {
          if (this.cutT - dragLengthY < 0) dragLengthY = this.cutT
        } else {
          if (this.cutB + dragLengthY < 0) dragLengthY = -this.cutB
        }
        this.setData({
          cutL: this.cutL - dragLengthX,
          cutT: this.cutT - dragLengthY,
          cutR: this.cutR + dragLengthX,
          cutB: this.cutB + dragLengthY
        })

        PAGE_X = e.touches[0].pageX
        PAGE_Y = e.touches[0].pageY
      },

      contentTouchEnd() {

      },

      // 获取图片
      getImageInfo() {
        var _this = this;
        uni.showLoading({
          title: '图片生成中...',
        });
        // 将图片写入画布
        const ctx = uni.createCanvasContext('myCanvas',_this);
        ctx.drawImage(_this.imgSrc, 0, 0, IMG_REAL_W, IMG_REAL_H);
        ctx.draw(true)
        ctx.draw(true, () => {
          // 获取画布要裁剪的位置和宽度   均为百分比 * 画布中图片的宽度    保证了在微信小程序中裁剪的图片模糊  位置不对的问题 canvasT = (_this.cutT / _this.cropperH) * (_this.imageH / pixelRatio)
          var canvasW = ((_this.cropperW - _this.cutL - _this.cutR) / _this.cropperW) * IMG_REAL_W;
          var canvasH = ((_this.cropperH - _this.cutT - _this.cutB) / _this.cropperH) * IMG_REAL_H;
          var canvasL = (_this.cutL / _this.cropperW) * IMG_REAL_W;
          var canvasT = (_this.cutT / _this.cropperH) * IMG_REAL_H;
          uni.canvasToTempFilePath({
            x: canvasL,
            y: canvasT,
            width: canvasW,
            height: canvasH,
            destWidth: canvasW,
            destHeight: canvasH,
            quality: 0.5,
            canvasId: 'myCanvas',
            success: function(res) {
              _this.$emit('confirm',res.tempFilePath)
            },
            complete:function(){
              uni.hideLoading()
            }
          },_this);
        });
      },
      // 设置大小的时候触发的touchStart事件
      dragStart(e) {
        T_PAGE_X = e.touches[0].pageX
        T_PAGE_Y = e.touches[0].pageY
        CUT_L = this.cutL
        CUT_R = this.cutR
        CUT_B = this.cutB
        CUT_T = this.cutT
        this.canRevert = true
      },

      // 设置大小的时候触发的touchMove事件
      dragMove(e) {
        var _this = this
        var dragType = e.target.dataset.drag
        switch (dragType) {
          case 'right':
            var dragLength = (T_PAGE_X - e.touches[0].pageX) * DRAFG_MOVE_RATIO
            if (CUT_R + dragLength < 0) dragLength = -CUT_R
            this.setData({
              cutR: CUT_R + dragLength
            })
            break;
          case 'left':
            var dragLength = (T_PAGE_X - e.touches[0].pageX) * DRAFG_MOVE_RATIO
            if (CUT_L - dragLength < 0) dragLength = CUT_L
            if ((CUT_L - dragLength) > (this.cropperW - this.cutR)) dragLength = CUT_L - (this.cropperW - this.cutR)
            this.setData({
              cutL: CUT_L - dragLength
            })
            break;
          case 'top':
            var dragLength = (T_PAGE_Y - e.touches[0].pageY) * DRAFG_MOVE_RATIO
            if (CUT_T - dragLength < 0) dragLength = CUT_T
            if ((CUT_T - dragLength) > (this.cropperH - this.cutB)) dragLength = CUT_T - (this.cropperH - this.cutB)
            this.setData({
              cutT: CUT_T - dragLength
            })
            break;
          case 'bottom':
            var dragLength = (T_PAGE_Y - e.touches[0].pageY) * DRAFG_MOVE_RATIO
            if (CUT_B + dragLength < 0) dragLength = -CUT_B
            this.setData({
              cutB: CUT_B + dragLength
            })
            break;
          case 'rightBottom':
            var dragLengthX = (T_PAGE_X - e.touches[0].pageX) * DRAFG_MOVE_RATIO
            var dragLengthY = (T_PAGE_Y - e.touches[0].pageY) * DRAFG_MOVE_RATIO

            if (CUT_B + dragLengthY < 0) dragLengthY = -CUT_B
            if (CUT_R + dragLengthX < 0) dragLengthX = -CUT_R
            let cutB = CUT_B + dragLengthY;
            let cutR = CUT_R + dragLengthX;

            this.setData({
              cutB: cutB,
              cutR: cutR
            })
            break;
          default:
            break;
        }
      },
      // 取消
      cancel(){
        this.$emit("cancel")
      },
      //还原
      revert(){
        this.canRevert = false
        this.getImageDetail()
      },
      confirm(){
        this.getImageInfo()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cropper-content {
    width: 100%;
  }

  .my-cropper {
    position: relative;
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    box-sizing: border-box;
  }

  .my-cropper-content {
    position: relative;
    transform: translate(0, -60%);
  }

  .my-cropper-content image {
    display: block;
    width: 100%;
    min-width: 0 !important;
    max-width: none !important;
    height: 100%;
    min-height: 0 !important;
    max-height: none !important;
    image-orientation: 0deg !important;
    margin: 0 auto;
  }

  /* 移动图片效果 */

  .my-cropper-drag-box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    cursor: move;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }

  /* 内部的信息 */

  .my-cropper-crop-box {
    position: absolute;
    background: rgba(255, 255, 255, 0.3);
    z-index: 2;
  }

  .my-cropper-crop-box .my-cropper-view-box {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
    outline: 1rpx solid #69f;
    outline-color: rgba(102, 153, 255, .75)
  }

  /* 横向虚线 */

  .my-cropper-dashed-h {
    position: absolute;
    top: 33.33333333%;
    left: 0;
    width: 100%;
    height: 33.33333333%;
    border-top: 1rpx dashed rgba(255, 255, 255, 0.5);
    border-bottom: 1rpx dashed rgba(255, 255, 255, 0.5);
  }

  /* 纵向虚线 */

  .my-cropper-dashed-v {
    position: absolute;
    left: 33.33333333%;
    top: 0;
    width: 33.33333333%;
    height: 100%;
    border-left: 1rpx dashed rgba(255, 255, 255, 0.5);
    border-right: 1rpx dashed rgba(255, 255, 255, 0.5);
  }

  /* 四个方向的线  为了之后的拖动事件*/

  .my-cropper-line-t {
    position: absolute;
    display: block;
    width: 100%;
    background-color: #69f;
    top: 0;
    left: 0;
    height: 1rpx;
    opacity: 0.1;
    cursor: n-resize;
  }

  .my-cropper-line-t::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 0rpx;
    width: 100%;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
    bottom: 0;
    height: 41rpx;
    background: transparent;
    z-index: 11;
  }

  .my-cropper-line-r {
    position: absolute;
    display: block;
    background-color: #69f;
    top: 0;
    right: 0rpx;
    width: 1rpx;
    opacity: 0.1;
    height: 100%;
    cursor: e-resize;
  }

  .my-cropper-line-r::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 41rpx;
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
    bottom: 0;
    height: 100%;
    background: transparent;
    z-index: 11;
  }

  .my-cropper-line-b {
    position: absolute;
    display: block;
    width: 100%;
    background-color: #69f;
    bottom: 0;
    left: 0;
    height: 1rpx;
    opacity: 0.1;
    cursor: s-resize;
  }

  .my-cropper-line-b::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 0rpx;
    width: 100%;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
    bottom: 0;
    height: 41rpx;
    background: transparent;
    z-index: 11;
  }

  .my-cropper-line-l {
    position: absolute;
    display: block;
    background-color: #69f;
    top: 0;
    left: 0;
    width: 1rpx;
    opacity: 0.1;
    height: 100%;
    cursor: w-resize;
  }

  .my-cropper-line-l::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 41rpx;
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
    bottom: 0;
    height: 100%;
    background: transparent;
    z-index: 11;
  }

  .my-cropper-point {
    width: 5rpx;
    height: 5rpx;
    background-color: #69f;
    opacity: .75;
    position: absolute;
    z-index: 3;
  }

  .point-t {
    top: -3rpx;
    left: 50%;
    margin-left: -3rpx;
    cursor: n-resize;
  }

  .point-tr {
    top: -3rpx;
    left: 100%;
    margin-left: -3rpx;
    cursor: n-resize;
  }

  .point-r {
    top: 50%;
    left: 100%;
    margin-left: -3rpx;
    margin-top: -3rpx;
    cursor: n-resize;
  }

  .point-rb {
    left: 100%;
    top: 100%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    cursor: n-resize;
    width: 36rpx;
    height: 36rpx;
    background-color: #69f;
    position: absolute;
    z-index: 1112;
    opacity: 1;
  }

  .point-b {
    left: 50%;
    top: 100%;
    margin-left: -3rpx;
    margin-top: -3rpx;
    cursor: n-resize;
  }

  .point-bl {
    left: 0%;
    top: 100%;
    margin-left: -3rpx;
    margin-top: -3rpx;
    cursor: n-resize;
  }

  .point-l {
    left: 0%;
    top: 50%;
    margin-left: -3rpx;
    margin-top: -3rpx;
    cursor: n-resize;
  }

  .point-lt {
    left: 0%;
    top: 0%;
    margin-left: -3rpx;
    margin-top: -3rpx;
    cursor: n-resize;
  }

  /* 裁剪框预览内容 */

  .my-cropper-viewer {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .my-cropper-viewer image {
    position: absolute;
    z-index: 2;
  }
  .my-cropper-operate{
    position: absolute;
    bottom: 20rpx;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40rpx;
    box-sizing: border-box;
    &-item{
      color: #fff;
      &__disabled{
        color: #ccc!important;
      }
    }
  }
</style>
