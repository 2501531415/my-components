<template>
	<view class="my-upload" :style="getWidth">
		<view class="my-upload-fileList-item" :style="{'width':width + 'px','height':width + 'px'}" v-for="(item,index) in fileList" :key="index" v-if="(accept == 'image' && fileList.length > 0) || (accept == 'media' && mediaTypeStatus =='image')">
			<image :src="item.url" mode=""></image>
		</view>
		<view class="my-upload-video" v-if="accept == 'video' || (accept == 'media' && mediaTypeStatus =='video')" v-for="(item,index) in fileList" :key="index">
			<video :src="item.url" controls class="my-upload-video"></video>
		</view>
		<view class="my-upload-item" :style="{'width':width + 'px','height':width + 'px'}" @click="choose" v-if="(accept== 'media' && fileList.length == 0) || (accept == 'image' && count > fileList.length && count < 10) || ( accept == 'video' && fileList.length == 0) ">
			<image src="../../static/add.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import add from '@/static/add.png'
	export default {
		name:'Upload',
		data(){
			return {
				limitStatus:true,
				mediaTypeStatus:null
			}
		},
		props:{
			//获取媒体的类型 默认图片
			accept:{
				type:String,
				default:'image'
			},
			//最多可以选择的图片张数，默认9
			count:{
				type:Number,
				default:9
			},
			//original 原图，compressed 压缩图，默认二者都有
			sizeType:{
				type:Array,
				default:['original','compressed']
			},
			//album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
			sourceType:{
				type:Array,
				default:['album','camera']
			},
			//是否压缩所选的视频源文件，默认值为 true，需要压缩。
			compressed:{
				type:Boolean,
				default:true
			},
			//拍摄视频最长拍摄时间，单位秒。最长支持 60 秒。
			maxDuration:{
				type:Number,
				default:10
			},
			//'front'、'back'，默认'back'
			camera:{
				type:String,
				default:'back'
			},
			//开发者服务器 url
			url:{
				type:String
			},
			//文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
			name:{
				type:String,
				default:'file'
			},
			//HTTP 请求 Header, header 中不能设置 Referer。
			header:{
				type:Object
			},
			formData:{
				type:Object
			},
			fileList:{
				type:Array,
				default:[]
			},
			width:{
				type:Number,
				default:80,
			},
			mediaType:{
				type:Array,
				default:['image', 'video']
			}
		},
		computed:{
			getWidth() {
				let width = uni.getSystemInfoSync().windowWidth
				console.log(width)
				return `padding:0 ${(width - 3*this.width - 16 - 10) / 2}px`
			},
		},
		methods:{
			//点击upload 
			choose(){
				if(this.accept == 'image'){
					this.chooseImage().then(res=>{
						this.beforeRead(res)
					})
				}else if(this.accept == 'video'){
					this.chooseVideo().then(res=>{
						this.beforeRead(res)
					})
				}else if(this.accept == 'media'){
					this.chooseMedia().then(res=>{
						this.mediaTypeStatus = res.type
						this.beforeRead(res)
					})
				}
			},
			// 选中的emit
			beforeRead(res){
				this.$emit('beforeRead',res,this.beforeReadCallBack)
				if(this.limitStatus){
					// 上传
					if(this.accept == 'media'){
						var filePath = []
						res.tempFiles.forEach(item=>{
							filePath.push(item.tempFilePath)
						})
					}else{
						var filePath = Array.isArray(res.tempFilePaths)?res.tempFilePaths:[res.tempFilePath]
					}
					this.upload(filePath).then(res=>{
						this.$emit('success',res)
					}).catch(err=>{
						this.$emit('fail',err)
					})
				}
			},
			//beforeRead 回调函数
			beforeReadCallBack(limitStatus){
				this.limitStatus = limitStatus
			},
			//uni.uplaodFile函数
			upload(tempFilePaths){
				const {url,name,header,formData} = this
				return new Promise( async (resolve,reject)=>{
					var realPath = []
					var length = 0
					tempFilePaths.forEach(item=>{
						uni.uploadFile({
							url,
							filePath:item,
							name,
							header,
							formData,
							success:(res)=>{
								realPath.push(JSON.parse(res.data))
								length +=1
								if(tempFilePaths.length == length){
									resolve(realPath)
									length = 0
								}
							},
							fail:(err)=>{
								reject(err)
							},
						})
					})
				})
			},
			//uni.chooseImage 函数
			chooseImage(){
				const {count,sizeType,sourceType} = this
				return new Promise((resolve,reject)=>{
					uni.chooseImage({
						count,
						sizeType,
						sourceType,
						success:(res)=>{
							console.log(res)
							resolve(res)
						},
						fail:(err)=>{
							console.log(res)
							reject(err)
						}
					})
				})
			},
			//uni.chooseVideo
			chooseVideo(){
				const {sourceType,compressed,maxDuration,camera} = this
				return new Promise((resolve,reject)=>{
					uni.chooseVideo({
						sourceType,
						compressed,
						maxDuration,
						camera,
						success:(res)=>{
							resolve(res)
						},
						fail:(err)=>{
							console.log(res)
							reject(err)
						}
					})
				})
			},
			//uni.chooseMedia 函数
			chooseMedia(){
				const {count,mediaType,sourceType,maxDuration,camera,sizeType} = this
				return new Promise((resolve,reject)=>{
					uni.chooseMedia({
					  count,
					  mediaType,
					  sourceType,
					  maxDuration,
					  camera,
					  sizeType,
					  success:(res)=>{
						  resolve(res)
					    console.log(res)
					  },
					  fail:(err)=>{
						  reject(err)
						  console.log(err)
					  }
					})
				})
			}
		}
	}
</script>

<style>
	.my-upload{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
	.my-upload-item{
		border:1px solid black;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.my-upload-fileList-item{
		overflow: hidden;
		margin: 0 8px 8px 0;
		cursor: pointer;

	}
	.my-upload-fileList-item image{
		display: block;
		width: 100%;
		height:100%;
	}
	.my-upload-item:active{
		background-color: #eee;
	}
	.my-upload-item image{
		width: 28px;
		height: 28px;
	}
	.my-upload-video{
		width: 200px;
	}
</style>
