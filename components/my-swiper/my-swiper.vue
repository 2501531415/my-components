<template>
	<view>
		<swiper :style="{'height':swiperHeight+'px'}" class="my-swiper" @touchstart="start" @touchend="end" :current="currentTab" duration="300" @change="swiperTab">
			<swiper-item v-for="(item,index) in swiperData" :key="index">
				<image :src="swiperData[index]" mode="widthFix" class="my-swiper-image" :class="[status && index !=currentTab?'imgOver':'']" @click="imagePreView(swiperData,index)" @load="imageLoad(index)"></image>
			</swiper-item>
		</swiper>
		<view class="my-swiper-bottom-detail" :style="{'top':swiperHeight-76 +'px'}">
			<view class="my-swiper-message" v-if="!useSlot && show">
				<view class="my-image-number">
					<view class="my-imgage-number-item">
						
					</view>
					<text class="my-number-title">{{currentTab+1}}/{{swiperData.length}}</text>
				</view>
				<slot>
          <view class="my-message-bottom">
          	<view class="like">
          		{{likeNumber}}赞
          	</view>
          	<view class="read-number">
          		{{readNumber}}阅读
          	</view>
          </view>
        </slot>
			</view>
			<slot v-else-if="useSlot"></slot>
		</view>
	</view>
</template>

<script>
	export default {
			data() {
				return {
					currentTab: 0,
					swiperHeight:'',
					status:false
				}
			},
			props:{
				swiperData:{
					type:Array
				},
				likeNumber:{
					type:Number,
					default:999
				},
				readNumber:{
					type:Number,
					default:999
				},
				//自定义bottom内容
				useSlot:{
					type:Boolean,
					default:false
				},
				show:{
					type:Boolean,
					default:true
				}
			},
			methods: {
        imageLoad(index){
          if(this.currentTab == index){
            this.setSwiperHeight()
          }
        },
				swiperTab(e){
					this.currentTab = e.target.current;
					setTimeout(()=>{
						this.setSwiperHeight()
					},100)
				},
				//点击切换
				clickTab(e){
					if (this.currentTab == e.target.dataset.current) {
						return false;
					} else {
						this.currentTab = e.target.dataset.current;
						
					};
				},
				imagePreView(item,index){
					this.$emit('itemClick',item,index)
				},
				setSwiperHeight(){
					var that = this
					let query = uni.createSelectorQuery().in(this);
					query.selectAll(".my-swiper-image").boundingClientRect()
					query.exec((res) => {
						that.swiperHeight = res[0][this.currentTab].height;
					})
				},
				start(){
					this.status = true
				},
				end(){
					
					this.status = false
				}
			},
		}
</script>

<style>
	.my-swiper{
			height: 550px;
			max-width: 100vw;
			position: relative;
		}
	.imgOver{
		min-height: 100%!important;
	}
	.my-swiper-bottom-detail{
		height: 76px;
		background-color: transparent;
		position: absolute;
		left: 0;
		right: 0;
		color: white;
		font-size: 12px;
		padding: 0px 10px;
	}
	.my-swiper-message{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	.my-image-number{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 100%;
		height: 28px;
	}
	.my-number-title{
		position: absolute;
		right: 15px;
	}
	.my-message-bottom{
		display: flex;
		justify-content: space-between;
		width:100%;
		height: 48px;
		align-items: center;
	}
	.my-imgage-number-item{
		width: 28px;
		height: 28px;
		background-color: #555555;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0.6;
	}
	.my-swiper-image{
		width: 100%;
	}
</style>
