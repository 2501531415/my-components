<template>
	<view class="content1">
		<my-upload @beforeRead="beforeRead" @success="success" :file-list="fileList"
		 url="http://192.168.0.149:3000/upload" :width="100" :count="5" accept="media"/>
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
				fileList:[]
				
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
			}
		}
	}
</script>

<style>
</style>
