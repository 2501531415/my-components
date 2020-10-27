<template>
	<!-- v-if="Object.keys(tabbar).length >0" -->
	<view class="my-tab-bar" v-if="Object.keys(tabBar).length >0 && tabBar.list.length > 1 && tabBar.list.length < 6" :style="{'border-color':tabBar.borderStyle?tabBar.borderStyle:'#eee','background-color':tabBar.backgroundColor?tabBar.backgroundColor:'white'}">
		<view class="my-tab-bar-item" v-for="(item,index) in tabBar.list" :key="index" @click="tabBarChange(item,index)">
			<view class="my-tab-bar-icon" v-if="currentIndex == index">
				<image :src="item.selectedIconPath" mode="" ></image>
				<view :style="{'background-color':tabBar.badgeBgC?tabBar.badgeBgC:'red'}" class="my-tab-bar-badge">
					{{item.badge?item.badge:''}}
				</view>
			</view>
			<view class="my-tab-bar-icon" v-else>
				<image :src="item.iconPath" mode=""></image>
				<view :style="{'background-color':tabBar.badgeBgC?tabBar.badgeBgC:'red'}" class="my-tab-bar-badge">
					{{item.badge?item.badge:''}}
				</view>
			</view>
			<view class="my-tab-bar-text" :style="{'color':(currentIndex == index?tabBar.selectedColor:tabBar.color),'font-size':tabBar.fontSize?'tabBar.fontSize':''}">
				{{item.text}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:'TabBar',
		data(){
			return {
				currentIndex:0
			}
		},
		props:{
			tabBar:{
				type:Object
			},
		},
		methods:{
			tabBarChange(item,index){
				this.currentIndex = index
				this.$emit('change',{detail:item.text,index})
			}
		}
	}
</script>

<style>
	.my-tab-bar{
		width: 100%;
		height: 50px;
		/* background-color: #007AFF; */
		border-top: 1px solid #eee;
		position: fixed;
		bottom: 0;
		right: 0;
		left:0;
		display: flex;
		align-items: center;
	}
	.my-tab-bar-item{
		flex: 1;
		text-align: center;
		user-select: none;
	},
	.my-tab-bar-item image{
		width: 20px;
		height: 20px;
	}
	.my-tab-bar-icon{
		position: relative;
		display: inline-block;
	}
	.my-tab-bar-text{
		font-size: 10px;
	}
	.my-tab-bar-badge {
		position: absolute;
		top: 0;
		right: 0;
		box-sizing: border-box;
		min-width: 16px;
		padding: 0 3px;
		color: #fff;
		font-weight: 500;
		font-size: 12px;
		line-height: 1.2;
		text-align: center;
		background-color: #ee0a24;
		border: 1px solid #fff;
		border-radius: 16px;
		transform: translate(50%, -50%);
		transform-origin: 100%;
	}
</style>
