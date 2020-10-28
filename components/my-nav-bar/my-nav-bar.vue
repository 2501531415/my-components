<template>
	<view :style="{'background-color':bgc}" :class="[{'my-nav-bar-border':border},'my-nav-bar']">
		<view class="my-nav-bar-left" @click="leftClick">
			<slot name="left">
				<image src="../../static/iconleft.png" mode="" v-if="leftAllow"></image>
				<text style="color: #007AFF;">{{leftText}}</text>
			</slot>
		</view>
		<view class="my-nav-bar-center">
			<slot name="center">
				<text v-if="title">{{title}}</text>
			</slot>
		</view>
		<view class="my-nav-bar-right">
			<slot name="right">
				<text v-if="rightText">{{rightText}}</text>
			</slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'NavBar',
		props:{
			title:{
				type:String
			},
			leftText:{
				type:String
			},
			rightText:{
				type:String
			},
			leftAllow:{
				type:Boolean,
				default:false
			},
			bgc:{
				type:String,
				default:'white'
			},
			border:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			leftClick(){
				this.$emit('leftClick')
			},
			rightClick(){
				this.$emit('rightClick')
			}
		}
	}
</script>

<style>
	.my-nav-bar {
		height: 36px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	},
	.my-nav-bar-border{
		border-bottom: 1px solid #eee;
	}
	.my-nav-bar-left image {
		width: 12px;
		height: 12px;
	}
	.my-nav-bar-left,.my-nav-bar-right{
		height: 100%;
		flex: 1;
		text-align: center;
		line-height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding:0 16px
	}
	.my-nav-bar-center{
		height: 100%;
		flex: 2;
		text-align: center;
		line-height: 36px;
	}
</style>
