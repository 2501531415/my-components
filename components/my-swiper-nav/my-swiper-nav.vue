<template>
	<scroll-view class="scroll-view" :scroll-x="true" @scroll="scroll" :scroll-into-view="scrollTo">
		<view :class="[{'nav-bar-card':navType == 'card'},'nav-bar']" :style="{'color':(navType == 'card'?color:'')}">
			<view class="nav-bar-item" :id="`nav${index}`" :style="{'flex':(navData.length > swiperThreshold?`1 0 ${(88/(parseInt(navData.length) - 1)) + '%'}`:1),
			'border-color':(navType == 'card'?color:''),'background-color':(navType == 'card' && currentIndex == index?color:'')}"
			 :class="{activeColor:currentIndex == index,'nav-ellipsis':ellipsis}"  v-for="(item,index) in navData" :key="index" @click="navItemClick(item,index)">
				{{item}}
			</view>
			<view class="nav-line" v-if="navType == 'line'"  :style="{'transform':'translateX(' + lineTranslate +'px)'+'translateX(-50%)',
			'width':lineWidth + 'px','height':lineHeight + 'px','background-color':color}">
			</view>
		</view>
	</scroll-view> 
</template>

<script>
	export default {
		name: 'SwiperNav',
		data(){
			return {
				lineTranslate:null,
				currentIndex:0,
				scrollWidth:0,
				scrollTo:null
			}
		},
		props: {
			navData: {
				type: Array
			},
			//当前选中标签的标识符
			active:{
				type:Number,
				default:1
			//导航条数据
			},
			//滚动阈值
			swiperThreshold:{
				type:Number,
				default:5
			},
			//下划线长度
			lineWidth:{
				type:Number,
				default:40
			},
			//下划线高度
			lineHeight:{
				type:Number,
				default:3
			},
			//文字超出是否隐藏
			ellipsis:{
				type:Boolean,
				default:true
			},
			//元素滚动
			scrollView:{
				type:Boolean,
				default:false
			},
			//类型
			navType:{
				type:String,
				default:'line'
			},
			color:{
				type:String,
				default:'#ee0a24'
			}
		},
		mounted() {
			this.getBoundMessage(this.active)
			this.currentIndex = this.active
		},
		methods: {
			//获取节点信息
			getBoundMessage(index){
				var that = this
				let query = uni.createSelectorQuery().in(this);
				query.selectAll(".nav-bar-item").boundingClientRect()
				query.exec((res) => {
					console.log(res[0])
					const center = res[0][index].width / 2 + res[0][index].left
					this.lineTranslate = center + this.scrollWidth
					console.log(this.lineTranslate)
				})
			},
			navItemClick(item,index) {
				if(this.navData.length > this.swiperThreshold && this.scrollView){
					this.scrollTo = 'nav' + index
				}
				this.currentIndex = index
				this.getBoundMessage(index)
			},
			scroll(e) {
				console.log(e.detail.scrollLeft)
				this.scrollWidth = e.detail.scrollLeft
			}
		}
	}
</script>

<style scoped>
	.nav-bar {
		position: relative;
		height: 44px;
		display: flex;
		align-items: center;
		line-height: 44px;
		padding-bottom: 15px;
		
	}
	.nav-bar-card{ 
		color: #ee0a24;
		box-sizing: border-box;
		padding-bottom: 0!important;
		height:28px;
		line-height: 28px;
		font-size: 14px;
	}
	.nav-bar-item {
		height: 100%;
		text-align: center;
		white-space: nowrap;
		color: #646566;
		/* flex: 1; */
		/* overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis; */
		padding: 0 12px;
		/* flex: 1 0 auto; */
	}
	.nav-bar-card .nav-bar-item{
		border-right: 1px solid #ee0a24;
		border: 1px solid #ee0a24;
		box-sizing: border-box;
		border-right: none;
	}
	.nav-bar-item:last-child{
		border-right: 1px solid #ee0a24;
	}
	.nav-line {
		position: absolute;
		bottom: 15px;
		left: 0;
		z-index: 1;
		background-color: #ee0a24;
		border-radius: 3px;
		transition-duration: 0.3s;
	}
	.activeColor{
		color: #323233;
	}
	.nav-bar-card .activeColor{
		background-color: #ee0a24;
		color: white;
	}
	.nav-ellipsis{
		overflow: hidden;
		text-overflow: ellipsis;
		
	}
</style>
