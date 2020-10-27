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
		<my-tab-bar :tabBar="tabBar" @change="change"/>
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
				tabBar: {
					color:"#444444",
					selectedColor: "#f77d8b",
					borderStyle: "#eee",
					backgroundColor: "#ffffff",
					list: [
						{
							"pagePath": "pages/index/index",
							"iconPath": "../../static/img/tabbar/tag-0.png",
							"selectedIconPath": "../../static/img/tabbar/tag-1.png",
							"text": "首页",
							badge:'99'
						},
						{
							"pagePath": "pages/live/live",
							"iconPath": "../../static/img/tabbar/hot-0.png",
							"selectedIconPath": "../../static/img/tabbar/hot-1.png",
							"text": "直播",
							badge:'100'
						},
						{
							"pagePath": "pages/profile/profile",
							"iconPath": "../../static/img/tabbar/me.png",
							"selectedIconPath": "../../static/img/tabbar/meactive.png",
							"text": "我的"
						}
					]
				
				},
				
			}
		},
		onLoad() {

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
	.content1{
		display: flex;
	}
</style>
