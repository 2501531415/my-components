<template>
	<view class="content1">
		<my-refresh @pullDown="pullDown" @pullUp="pullUp">
			<view class="tip" slot="tip">66666666666666666666</view>
				<view class="list">
					<view class="list-item" v-for="item in listData" :key="item">
						{{item}}
					</view>
				</view>
		</my-refresh>
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
				listData:30
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
					that.listData = 50
					callback()
				},5000)
			},
			pullDown(callback){
				var that = this
				setTimeout(()=>{
					console.log('我取到数据了')
					that.listData = 50
					callback()
				},1000)
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
