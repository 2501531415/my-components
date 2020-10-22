<template>
	<view class="content1">
		<my-refresh @pullDown="pullDown" @pullUp="pullUp" :total-page="50" :current-page="currentPage" pull-down-type="dot" border-color="red">
			<!-- <view class="tip" slot="tip">66666666666666666666</view> -->
				<view class="list">
					<view class="list-item" v-for="item in listData" :key="item">
						{{item}}
					</view>
				</view>
		</my-refresh>
		<!-- <my-refresh ref="loadRefresh" :isRefresh="true" @loadMore="loadMore" @refresh="refresh" :pageNo="pageNo" :totalPageNo="20">
			<view class="list" slot="content-list">
				<view class="list-item" v-for="item in listData" :key="item">
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
				currentPage:1
			}
		},
		onLoad() {

		},
		methods: {
			// scrolltoupper(){
			// 	console.log('顶部')
			// },
			// scrolltolower(){
			// 	console.log('底部')
			// },
			pullUp(callback){
				var that =this
				setTimeout(()=>{
					console.log('哦呦了')
					that.listData += 10 
					that.currentPage += 1 
					callback()
				},3000)
			},
			loadMore(callback){
				var that =this
				setTimeout(()=>{
					console.log('哦呦了')
					that.listData = 50
					that.pageNo += 1 
					callback()
				},5000)
			},
			pullDown(callback){
				var that = this
				setTimeout(()=>{
					console.log('我取到数据了')
					that.listData = 50
					callback()
				},6000)
			},
			navItemClick(item,index){
				console.log(item)
				console.log(index)
			},
		}
	}
</script>

<style>
</style>
