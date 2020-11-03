<template>
	<view class="content1">
		<!-- <my-upload @beforeRead="beforeRead" @success="success" @fail="fail" :file-list="fileList"
		 url="http://192.168.0.149:3000/upload" :width="100" :count="5" accept="image" @click-delete="clickDelete" @click-preview="preView"/> -->
		<!-- <my-side-bar :side-bar-list="categoryData" @change="onChange" :active-index="3" @badge-click="badgeClick" active-border-color="green" badgeBgC="green"/> -->
		<!-- <my-refresh style="flex:1">
				<view class="right">
					<view class="n" v-for="(item,index) in 999" :key="index">
						{{item}}
					</view>
				</view>
		</my-refresh> -->
		<!-- <my-tab-bar :tabBar="tabBar" @change="change"/> -->
		<!-- <my-drop-down-select :options="options" active-color="green" topAllow="green" @change="change" ref="test" /> -->
		<!-- <view class="item">
			<view class="title">
				时间选择
			</view>
			<my-time-picker :endYear="2060" time-type="normal" @submit="submit"/>
		</view> -->
		<!-- <my-place-picker initPlace="蓟州区"/> -->
		<view class="test" v-for="item in 100" :key="item">
			{{item}}
		</view>
		<my-back-top :show="show" @backTop="backTop"/>
	</view>
</template>

<script>
	import tabBarMixins from '@/config/tabBar'
	export default {
		mixins: [tabBarMixins],
		data() {
			return {
				title: 'Hello',
				show:false,
				swiperData: [
					'http://192.168.0.149:3000/public/img/55.jpg',
					'http://192.168.0.149:3000/public/img/10.jpg',
					'http://192.168.0.149:3000/public/img/11.jpg'
				],
				navData: ['最新', '福利', '你好'],
				listData: 30,
				pageNo: 1,
				currentPage: 1,
				fileList: [],
				options: [
					[{
							text: '全部商品',
							value: 0,
							children: [{
									text: 666
								},
								{
									text: 777
								},
								{
									text: 888
								}
							]
						},
						{
							text: '新款商品',
							value: 1,
							children: [{
									text: '北京'
								},
								{
									text: '上海'
								},
								{
									text: '广州'
								}
							]
						},
						{
							text: '活动商品',
							value: 2,
							children: [{
									text: 666
								},
								{
									text: 777
								},
								{
									text: 888
								}
							]
						},
					],
					[{
							text: '默认排序',
							value: 'a',
							children: [{
									text: '111'
								},
								{
									text: '222'
								},
								{
									text: '333'
								}
							]
						},
						{
							text: '好评排序',
							value: 'b',
							children: [{
									text: '444'
								},
								{
									text: '555'
								},
								{
									text: '666'
								}
							]
						},
						{
							text: '销量排序',
							value: 'c',
							children: [{
									text: '777'
								},
								{
									text: '888'
								},
								{
									text: '999'
								}
							]
						},
					],
				]
			}
		},
		onLoad() {
			// console.log(tabBar)
		},
		onPageScroll(e) {
			if (e.scrollTop > 500) {
				this.show = true
			} else {
				this.show = false
			}
		},
		methods: {
			// beforeRead(e,callback){
			// 	console.log(e)
			// 	callback(true)
			// },
			// success(file){
			// 	console.log(file)
			// 	file.forEach(item=>{
			// 		this.fileList.push({url:item.data.url})
			// 	})
			// },
			// fail(err){
			// 	console.log(err)
			// },
			// preView(index){
			// 	console.log(index)
			// },
			// clickDelete(index){
			// 	console.log(index)
			// 	this.fileList.splice(index,1)
			// },
			// onChange(index){
			// 	console.log(index)
			// },
			// badgeClick(e){
			// 	console.log(e)
			// },
			// leftClick(){
			// 	console.log('left')
			// }
			change(e) {
				console.log(e)
				console.log(this.$refs.test)
			},
			submit(time){
				console.log(time)
			},
			backTop(){
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 300
				});
			}
		}
	}
</script>

<style>
.item{
	display: flex;
	
}
</style>
