<template>
	<view class="content1">
		<my-swiper :swiperData="swiperData" :show="false" @itemClick="itemClick">
		</my-swiper>
		<my-swiper-nav :nav-data="navData"  :ellipsis="false" @navItemClick="navItemClick"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				swiperData:[
					 'http://192.168.0.149:3000/public/img/55.jpg',
					 'http://192.168.0.149:3000/public/img/10.jpg',
					 'http://192.168.0.149:3000/public/img/11.jpg'
				],
				navData:['最新','福利','你好']
			}
		},
		onLoad() {

		},
		methods: {
			navItemClick(item,index){
				console.log(item)
				console.log(index)
			},
		}
	}
</script>

<style>
</style>
