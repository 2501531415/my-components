<template>
	<view class="content1">
		<!-- <my-upload @beforeRead="beforeRead" @success="success" @fail="fail" :file-list="fileList"
		 url="http://192.168.0.149:3000/upload" :width="100" :count="5" accept="image" @click-delete="clickDelete" @click-preview="preView"/> -->
		 <my-side-bar :side-bar-list="categoryData" @change="onChange" :active-index="3" @badge-click="badgeClick" active-border-color="green" badgeBgC="green"/>
		 <!-- <my-refresh style="flex:1">
				<view class="right">
					<view class="n" v-for="(item,index) in 999" :key="index">
						{{item}}
					</view>
				</view>
		</my-refresh> -->
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
				navData:['最新','福利','你好'],
				listData:30,
				pageNo:1,
				currentPage:1,
				fileList:[],
				categoryData: [{
						title: '推荐',
						url: 'http://learn.com/laravel/public/img/66.jpg',
						disable:true,
						badge:99
					},
					{
						title: '热门',
						url: 'http://learn.com/laravel/public/img/77.jpg',
						badge:99
					},
					{
						title: '最新',
						url: 'http://learn.com/laravel/public/img/88.jpg',
						dot:true
					},
					{
						title: '热度',
						url: 'http://learn.com/laravel/public/img/99.jpg'
					},
					{
						title: '最热',
						url: 'http://learn.com/laravel/public/img/66.jpg'
					},
					{
						title: '热门',
						url: 'http://learn.com/laravel/public/img/88.jpg'
					},
					{
						title: '附近',
						url: 'http://learn.com/laravel/public/img/99.jpg'
					},
					{
						title: '艺术',
						url: 'http://learn.com/laravel/public/img/77.jpg'
					},
					{
						title: '最热',
						url: 'http://learn.com/laravel/public/img/66.jpg'
					},
					{
						title: '热门',
						url: 'http://learn.com/laravel/public/img/88.jpg'
					},
					{
						title: '附近',
						url: 'http://learn.com/laravel/public/img/99.jpg'
					},
					{
						title: '艺术',
						url: 'http://learn.com/laravel/public/img/77.jpg'
					},
					{
						title: '最热',
						url: 'http://learn.com/laravel/public/img/66.jpg'
					},
					{
						title: '热门',
						url: 'http://learn.com/laravel/public/img/88.jpg'
					},
					{
						title: '附近',
						url: 'http://learn.com/laravel/public/img/99.jpg'
					},
					{
						title: '艺术',
						url: 'http://learn.com/laravel/public/img/77.jpg'
					}
				]
				
			}
		},
		onLoad() {

		},
		methods: {
			beforeRead(e,callback){
				console.log(e)
				callback(true)
			},
			success(file){
				console.log(file)
				file.forEach(item=>{
					this.fileList.push({url:item.data.url})
				})
			},
			fail(err){
				console.log(err)
			},
			preView(index){
				console.log(index)
			},
			clickDelete(index){
				console.log(index)
				this.fileList.splice(index,1)
			},
			onChange(index){
				console.log(index)
			},
			badgeClick(e){
				console.log(e)
			}
		}
	}
</script>

<style>
	.content1{
		display: flex;
	}
</style>
