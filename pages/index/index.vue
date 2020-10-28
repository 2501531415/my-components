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
		<!-- <my-nav-bar @left-click="leftClick" border left-text="返回" left-allow>
			<view class="b" slot="center">
				中间
			</view>
			<view class="b" slot="right">
				右边
			</view>
		</my-nav-bar> -->
		<!-- <my-tab-bar :tabBar="tabBar" @change="change"/> -->
		<my-drop-down :options="options"/>
	</view>
</template>

<script>
	import tabBarMixins from '@/config/tabBar'
	export default {
		mixins:[tabBarMixins],
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
				options:[
					[
					      { text: '全部商品', value: 0 },
					      { text: '新款商品', value: 1 },
					      { text: '活动商品', value: 2 },
					],
					[
					      { text: '默认排序', value: 'a' },
					      { text: '好评排序', value: 'b' },
					      { text: '销量排序', value: 'c' },
					],
					[
					      { text: '默认排序', value: '3' },
					      { text: '好评排序', value: '4' },
					      { text: '销量排序', value: '5' },
					],
				]
			}
		},
		onLoad() {
			// console.log(tabBar)
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
			change(e){
				console.log(e)
			}
		}
	}
</script>

<style>

</style>
