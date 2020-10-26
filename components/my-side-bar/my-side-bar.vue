<template>
	<view class="my-side-bar" :style="{width:width + 'px'}">
		<scroll-view  :scroll-y="true" style="height:100vh">
			<view v-for="(item,index) in sideBarList" :key="index" :style="{'border-color':(currentIndex == index?activeBorderColor:'')}"
			 :class="[{'my-side-bar-item-active':currentIndex == index},'my-side-bar-item']" @click="itemClick(item,index)" v-if="!item.disable">
				<view class="my-side-bar-title">
					<text>{{item.title}}</text>
					<view :style="{'background-color':badgeBgC}" :class="[{'my-side-bar-dot':item.dot && !item.badge},'my-side-bar-badge']" v-if="item.badge || item.dot" @click.stop="badgeClick(item,index)">
						{{item.badge?item.badge:''}}
					</view>
				</view>
			</view>
			<view class="my-side-bar-item" v-else style="color: #c8c9cc;">
				<text>{{item.title}}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'SideBar',
		data() {
			return {
				currentIndex: 0
			}
		},
		created() {
			this.currentIndex = this.activeIndex
		},
		props: {
			activeIndex:{
				type:Number,
				default:0
			},
			sideBarList: {
				type: Array,
				default: []
			},
			width: {
				type: Number,
				default: 85
			},
			activeBorderColor: {
				type: String,
				default: '#ee0a24'
			},
			badgeBgC:{
				type:String,
				default:'#ee0a24'
			}
		},
		methods: {
			itemClick(item,index) {
				const data = {
					detail:item.title,
					index:index
				}
				this.currentIndex = index
				this.$emit('change', data)
			},
			badgeClick(item,index){
				if(item.badge){
					const data = {
						detail:item.badge,
						index:index
					}
					this.$emit('badgeClick',data)
				}else{
					this.$emit('badgeClick',index)
				}
			}
		}
	}
</script>

<style>
	.my-side-bar {
		height: 100%;
	}

	.my-side-bar-item {
		box-sizing: border-box;
		padding: 20px 12px;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 20px;
		word-wrap: break-word;
		background-color: #f7f8fa;
		user-select: none;
		border-left: 3px solid #f7f8fa;
	}

	.my-side-bar-item-active {
		border-left: 3px solid #ee0a24;
		background-color: white;
	}

	.my-side-bar-not-allow {
		user-select: none;
	}

	.my-side-bar-title {
		position: relative;
		display: inline-block;
	}

	.my-side-bar-dot {
		width: 8px;
		min-width: 0 !important;
		height: 8px;
		background-color: #ee0a24;
		border-radius: 100%;
	}

	.my-side-bar-badge {
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
	/* ::-webkit-scrollbar{
	  width: 0;
	  height: 0;
	  color: transparent;
	} */
</style>
